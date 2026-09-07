import React, { useState } from 'react';
import { PageHeader } from "../../../shared/components/PageHeader/PageHeader";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useUploadFileMutation } from "../../../shared/api/s3ApiSlice";
import { useAnalyzeCallMutation } from "../api/callAnalyzerApiSlice";
import { toast } from "sonner";
import { UploadCloud, FileAudio, PlayCircle, Loader2 } from "lucide-react";

export const CallAnalyzerPage = () => {
  const [formData, setFormData] = useState({
    lead_uuid: "lead_90210",
    lead_name: "Ravi Kumar",
    from_number: "+919876543210",
    to_number: "1800-123-4567"
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [uploadFile] = useUploadFileMutation();
  const [analyzeCall] = useAnalyzeCallMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please upload an audio file");
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      // 1. Upload to S3
      toast.info("Uploading audio file...");
      const fileFormData = new FormData();
      const finalKey = `call_recordings/${formData.lead_uuid}/${formData.from_number}/${selectedFile.name}`;
      fileFormData.append("file", selectedFile);
      fileFormData.append("key", finalKey);

      const uploadRes = await uploadFile(fileFormData).unwrap();
      const s3Url = uploadRes.url || uploadRes.key; // Using whatever format s3ApiSlice returns
      toast.success("File uploaded successfully");

      // 2. Call Analyzer API
      toast.info("Analyzing call recording...");
      const analyzeRes = await analyzeCall({
        ...formData,
        file: s3Url
      }).unwrap();

      toast.success("Analysis complete");
      setResult(analyzeRes);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || error?.message || "An error occurred during processing");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 w-full px-2 sm:px-4 lg:px-6 pb-12">
      <PageHeader
        title="Call Analyzer"
        description="Upload audio recordings to analyze lead sentiment and interaction details."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">Upload Recording</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lead_uuid" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Lead UUID</Label>
                <Input
                  id="lead_uuid"
                  name="lead_uuid"
                  value={formData.lead_uuid}
                  onChange={handleInputChange}
                  required
                  className="rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-[#063669]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lead_name" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Lead Name</Label>
                <Input
                  id="lead_name"
                  name="lead_name"
                  value={formData.lead_name}
                  onChange={handleInputChange}
                  required
                  className="rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-[#063669]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="from_number" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">From Number</Label>
                <Input
                  id="from_number"
                  name="from_number"
                  value={formData.from_number}
                  onChange={handleInputChange}
                  required
                  className="rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-[#063669]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="to_number" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">To Number</Label>
                <Input
                  id="to_number"
                  name="to_number"
                  value={formData.to_number}
                  onChange={handleInputChange}
                  required
                  className="rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-[#063669]"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Audio File</Label>
              <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                <input
                  type="file"
                  id="audio-upload"
                  accept="audio/*,video/mpeg,audio/mpeg,.mpeg,.mpg"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label htmlFor="audio-upload" className="cursor-pointer flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-[#063669] dark:text-blue-400 mb-3">
                    <UploadCloud className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    {selectedFile ? selectedFile.name : "Click to upload recording"}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">MP3, WAV, M4A, MPEG up to 50MB</p>
                </label>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isProcessing || !selectedFile}
              className="w-full mt-6 bg-[#063669] hover:bg-[#063669]/90 text-white rounded-xl h-11 font-bold shadow-sm flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <PlayCircle className="h-4 w-4" />
                  Analyze Recording
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Results Section */}
        <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col h-full min-h-[400px]">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center gap-2">
            <FileAudio className="h-5 w-5 text-[#063669] dark:text-blue-400" />
            Analysis Results
          </h2>
          
          {isProcessing ? (
             <div className="flex-1 flex flex-col items-center justify-center text-zinc-500">
               <Loader2 className="h-8 w-8 animate-spin text-[#063669] mb-4" />
               <p className="text-sm font-semibold animate-pulse">Uploading and analyzing your call...</p>
             </div>
          ) : result ? (
             <div className="flex-1 bg-zinc-50 dark:bg-zinc-900 rounded-xl p-4 overflow-auto border border-zinc-100 dark:border-zinc-800">
               <pre className="text-xs font-mono text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap break-words">
                 {JSON.stringify(result, null, 2)}
               </pre>
             </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-xl p-6 bg-zinc-50/50 dark:bg-zinc-900/30">
              <FileAudio className="h-10 w-10 mb-3 opacity-50" />
              <p className="text-sm font-semibold text-center">No analysis yet</p>
              <p className="text-xs text-center mt-1 max-w-[200px]">Upload an audio file and hit Analyze to see the results here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
