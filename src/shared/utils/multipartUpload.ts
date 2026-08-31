import { store } from '../../app/store';
import { s3ApiSlice, type PresignedUrl, type PartItem } from '../api/s3ApiSlice';
import { manageMasterDataSlice } from '../../features/master-data/api/manageMasterDataSlice';

const CHUNK_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_CONCURRENCY = 5;
const MAX_RETRIES = 3;

async function uploadChunkWithRetry(
    url: string,
    chunk: Blob,
    contentType: string,
    partNumber: number
): Promise<PartItem> {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            console.log(`[Multipart] Part ${partNumber} (Attempt ${attempt}): Sending PUT request to S3 Presigned URL...`, {
                url: url.split('?')[0] + '?...', // log URL without sensitive query parameters
                chunkSize: chunk.size
            });
            
            // NOTE: We intentionally omit custom headers (like Content-Type) here because 
            // AWS S3 Presigned URLs for UploadPart are typically signed without them.
            // Adding unsigned headers will trigger 403 Forbidden (SignatureDoesNotMatch) / CORS errors.
            const response = await fetch(url, {
                method: 'PUT',
                body: chunk
            });

            console.log(`[Multipart] Part ${partNumber} S3 Response Status: ${response.status} ${response.statusText}`);
            
            // Log all accessible response headers for CORS debugging
            const headerObj: Record<string, string> = {};
            response.headers.forEach((val, key) => { headerObj[key] = val; });
            console.log(`[Multipart] Part ${partNumber} S3 Response Headers accessible to JS:`, headerObj);

            if (!response.ok) {
                throw new Error(`S3 PUT upload failed with status ${response.status} (${response.statusText}). Check if URL is expired or signature mismatched.`);
            }

            const eTag = response.headers.get("ETag") || response.headers.get("etag");
            if (!eTag) {
                console.error(`[CORS ERROR] S3 returned 200 OK for Part ${partNumber}, but 'ETag' header is NULL in JavaScript!`);
                console.error(`[CORS ERROR] -> This confirms AWS S3 CORS configuration is missing "ExposeHeaders": ["ETag"]. Please add it to your S3 bucket CORS policy!`);
                throw new Error(`ETag header missing from S3 response for part ${partNumber} (CORS ExposeHeaders issue)`);
            }

            // Keep raw ETag as returned by S3 (most Node.js AWS SDKs require quotes intact)
            console.log(`[Multipart] Part ${partNumber} uploaded successfully! Saved raw ETag: ${eTag}`);
            return {
                PartNumber: partNumber,
                ETag: eTag
            };
        } catch (error: any) {
            console.error(`[Multipart] Attempt ${attempt} failed for part ${partNumber}:`, error);
            if (error?.name === 'TypeError' && error?.message?.includes('fetch')) {
                console.error(`[CORS / NETWORK ERROR] Browser blocked or failed to fetch S3 URL for Part ${partNumber}. Possible causes:`);
                console.error(`1. AWS S3 rejected CORS Preflight (OPTIONS request). Check AllowedMethods and AllowedOrigins in S3 CORS.`);
                console.error(`2. S3 Presigned URL signature is invalid or expired.`);
            }
            
            if (attempt === MAX_RETRIES) {
                throw error;
            }
            // Exponential backoff
            const delayMs = Math.pow(2, attempt - 1) * 1000;
            console.log(`[Multipart] Waiting ${delayMs}ms before retrying part ${partNumber}...`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }
    throw new Error(`Part ${partNumber} failed after ${MAX_RETRIES} attempts`);
}

export async function uploadLargeFile(
    file: File,
    projectId: number,
    contentTypeId: number,
    onProgress?: (percentage: number) => void
): Promise<void> {
    console.log(`[Multipart] Starting large file upload for: ${file.name}`);
    
    // Step 1: Generate S3 key
    const cleanFilename = file.name.trim().replace(/\s+/g, '_');
    const key = `projectwisecontent/${projectId}/${contentTypeId}/${cleanFilename}`;
    const contentType = file.type || "application/octet-stream";

    // Step 2: Start Multipart Upload
    console.log("[Multipart] Calling /s3/multipart/start");
    const startRes = await store.dispatch(
        s3ApiSlice.endpoints.startMultipartUpload.initiate({ filename: key, contentType })
    ).unwrap();
    
    const uploadId = startRes.uploadId;
    const finalKey = startRes.key || key;

    // Step 3: Calculate chunks
    const totalParts = Math.ceil(file.size / CHUNK_SIZE);
    console.log(`[Multipart] File size: ${file.size} bytes. Created chunks: ${totalParts}`);

    // Step 4: Get Presigned URLs
    console.log("[Multipart] Calling /s3/multipart/getUrls");
    const urlsRes = await store.dispatch(
        s3ApiSlice.endpoints.getMultipartUrls.initiate({ key: finalKey, uploadId, parts: totalParts })
    ).unwrap();

    if (!urlsRes.presignedUrls || urlsRes.presignedUrls.length !== totalParts) {
        throw new Error("Returned presigned URLs count does not match total parts.");
    }

    // Step 5, 6, 7: Parallel uploads with concurrency limit
    const partsArray: PartItem[] = [];
    let completedParts = 0;

    const processPart = async (partIndex: number): Promise<void> => {
        const partNumber = partIndex + 1;
        const start = partIndex * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);

        const urlObj = urlsRes.presignedUrls.find((u: PresignedUrl) => u.partNumber === partNumber);
        if (!urlObj) {
            throw new Error(`Presigned URL missing for part ${partNumber}`);
        }

        const partResult = await uploadChunkWithRetry(urlObj.url, chunk, contentType, partNumber);
        partsArray.push(partResult);
        
        completedParts++;
        if (onProgress) {
            const percentage = Math.round((completedParts / totalParts) * 100);
            onProgress(percentage);
        }
    };

    const partIndices = Array.from({ length: totalParts }, (_, i) => i);
    const activeTasks = new Set<Promise<void>>();
    
    for (const idx of partIndices) {
        const task = processPart(idx);
        activeTasks.add(task);
        task.finally(() => activeTasks.delete(task));

        if (activeTasks.size >= MAX_CONCURRENCY) {
            await Promise.race(activeTasks);
        }
    }
    
    // Wait for all remaining active uploads
    await Promise.all(activeTasks);

    // Sort partsArray by PartNumber before calling complete
    partsArray.sort((a, b) => a.PartNumber - b.PartNumber);

    // Step 8: Complete Multipart Upload
    console.log("[Multipart] Step 4 - Calling /s3/multipart/complete with payload:", {
        key: finalKey,
        uploadId,
        partsCount: partsArray.length,
        partsArray: JSON.parse(JSON.stringify(partsArray))
    });
    
    try {
        await store.dispatch(
            s3ApiSlice.endpoints.completeMultipartUpload.initiate({
                key: finalKey,
                uploadId,
                partsArray
            })
        ).unwrap();
        console.log("[Multipart] /s3/multipart/complete succeeded!");
    } catch (completeErr: any) {
        console.error("[Multipart ERROR] /s3/multipart/complete failed on backend! Error details:", completeErr);
        console.error("[Multipart ERROR] Common backend causes for failure during complete:");
        console.error("1. ETag format mismatch (e.g., backend SDK expected quotes around ETags or expected stripped quotes).");
        console.error("2. One of the uploaded chunk sizes was smaller than 5MB (S3 requires minimum 5MB per chunk except for the final chunk).");
        throw completeErr;
    }

    // Step 9: Create Project Contents
    console.log("[Multipart] Calling /master/createProjectContents");
    await store.dispatch(
        manageMasterDataSlice.endpoints.createProjectContents.initiate({
            project_id: projectId,
            content_type_id: contentTypeId,
            s3_key: finalKey
        })
    ).unwrap();
    
    console.log("[Multipart] Upload and backend mapping completed successfully.");
}

export async function uploadLargeFileToS3Only(
    file: File,
    keyPrefix: string = "whatsapp_attachments",
    onProgress?: (percentage: number) => void
): Promise<{ key: string; url?: string }> {
    console.log(`[Multipart S3 Only] Starting large file upload for: ${file.name}`);
    
    // Step 1: Generate S3 key
    const cleanFilename = file.name.trim().replace(/\s+/g, '_');
    const timestamp = Date.now();
    const key = `${keyPrefix}/${timestamp}_${cleanFilename}`;
    const contentType = file.type || "application/octet-stream";

    // Step 2: Start Multipart Upload
    console.log("[Multipart S3 Only] Calling /s3/multipart/start");
    const startRes = await store.dispatch(
        s3ApiSlice.endpoints.startMultipartUpload.initiate({ filename: key, contentType })
    ).unwrap();
    
    const uploadId = startRes.uploadId;
    const finalKey = startRes.key || key;

    // Step 3: Calculate chunks
    const totalParts = Math.ceil(file.size / CHUNK_SIZE);
    console.log(`[Multipart S3 Only] File size: ${file.size} bytes. Created chunks: ${totalParts}`);

    // Step 4: Get Presigned URLs
    console.log("[Multipart S3 Only] Calling /s3/multipart/getUrls");
    const urlsRes = await store.dispatch(
        s3ApiSlice.endpoints.getMultipartUrls.initiate({ key: finalKey, uploadId, parts: totalParts })
    ).unwrap();

    if (!urlsRes.presignedUrls || urlsRes.presignedUrls.length !== totalParts) {
        throw new Error("Returned presigned URLs count does not match total parts.");
    }

    // Step 5, 6, 7: Parallel uploads with concurrency limit
    const partsArray: PartItem[] = [];
    let completedParts = 0;

    const processPart = async (partIndex: number): Promise<void> => {
        const partNumber = partIndex + 1;
        const start = partIndex * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);

        const urlObj = urlsRes.presignedUrls.find((u: PresignedUrl) => u.partNumber === partNumber);
        if (!urlObj) {
            throw new Error(`Presigned URL missing for part ${partNumber}`);
        }

        const partResult = await uploadChunkWithRetry(urlObj.url, chunk, contentType, partNumber);
        partsArray.push(partResult);
        
        completedParts++;
        if (onProgress) {
            const percentage = Math.round((completedParts / totalParts) * 100);
            onProgress(percentage);
        }
    };

    const partIndices = Array.from({ length: totalParts }, (_, i) => i);
    const activeTasks = new Set<Promise<void>>();
    
    for (const idx of partIndices) {
        const task = processPart(idx);
        activeTasks.add(task);
        task.finally(() => activeTasks.delete(task));

        if (activeTasks.size >= MAX_CONCURRENCY) {
            await Promise.race(activeTasks);
        }
    }
    
    await Promise.all(activeTasks);
    partsArray.sort((a, b) => a.PartNumber - b.PartNumber);

    // Step 8: Complete Multipart Upload
    try {
        const completeRes = await store.dispatch(
            s3ApiSlice.endpoints.completeMultipartUpload.initiate({
                key: finalKey,
                uploadId,
                partsArray
            })
        ).unwrap();
        console.log("[Multipart S3 Only] /s3/multipart/complete succeeded!");
        return { key: finalKey, url: completeRes.url };
    } catch (completeErr: any) {
        console.error("[Multipart S3 Only ERROR] /s3/multipart/complete failed on backend!", completeErr);
        throw completeErr;
    }
}
