import { baseApi } from '../../app/api/baseApi';

export interface UploadFileResponse {
  message: string;
  key: string;
  url: string;
}

export interface DownloadUrlRequest {
  key: string;
  bucketName?: string;
}

export interface DownloadUrlResponse {
  presignedUrl?: string;
  downloadUrl?: string;
  key?: string;
  url?: string;
}

export interface MultipartStartRequest {
  filename: string;
  contentType: string;
}

export interface MultipartStartResponse {
  uploadId: string;
  key: string;
}

export interface MultipartGetUrlsRequest {
  key: string;
  uploadId: string;
  parts: number;
}

export interface PresignedUrl {
  partNumber: number;
  url: string;
}

export interface MultipartGetUrlsResponse {
  presignedUrls: PresignedUrl[];
}

export interface PartItem {
  ETag: string;
  PartNumber: number;
}

export interface MultipartCompleteRequest {
  key: string;
  uploadId: string;
  partsArray: PartItem[];
}

export interface MultipartCompleteResponse {
  message: string;
  url: string;
}

export const s3ApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<UploadFileResponse, FormData>({
      query: (body) => ({
        url: '/s3/uploadFile',
        method: 'POST',
        body,
      }),
    }),
    downloadUrl: builder.mutation<DownloadUrlResponse, DownloadUrlRequest>({
      query: (body) => ({
        url: '/s3/downloadUrl',
        method: 'POST',
        body,
      }),
    }),
    startMultipartUpload: builder.mutation<MultipartStartResponse, MultipartStartRequest>({
      query: (body) => ({
        url: '/s3/multipart/start',
        method: 'POST',
        body,
      }),
    }),
    getMultipartUrls: builder.mutation<MultipartGetUrlsResponse, MultipartGetUrlsRequest>({
      query: (body) => ({
        url: '/s3/multipart/getUrls',
        method: 'POST',
        body,
      }),
    }),
    completeMultipartUpload: builder.mutation<MultipartCompleteResponse, MultipartCompleteRequest>({
      query: (body) => ({
        url: '/s3/multipart/complete',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { 
  useUploadFileMutation, 
  useDownloadUrlMutation,
  useStartMultipartUploadMutation,
  useGetMultipartUrlsMutation,
  useCompleteMultipartUploadMutation
} = s3ApiSlice;
