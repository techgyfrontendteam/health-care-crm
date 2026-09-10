import React, { useState } from 'react';
import { PageHeader } from "../../../shared/components/PageHeader/PageHeader";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useAnalyzeCallMutation } from "../api/callAnalyzerApiSlice";
import { toast } from "sonner";
import { FileAudio, PlayCircle, Loader2, Link2 } from "lucide-react";

export const CallAnalyzerPage = () => {
  const [formData, setFormData] = useState({
    call_id: "1",
    lead_uuid: "lead_90210",
    lead_name: "Ravi Kumar",
    from_number: "+919876543210",
    to_number: "1800-123-4567",
    file: "https://cloudphone.tatateleservices.com/file/recording?callId=DR4-D1-1788958048.540619&type=rec&token=cDBnNWlrNVFPcFM4NVloaDBSRk16RU9VUzc1UTBHYkVkeGtlVEZWSFQ5N2JHQlE5RDkvcmQ3RmJ2K3VMeTAyVjo6YWIxMjM0Y2Q1NnJ0eXl1dQ%3D%3D"
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [analyzeCall] = useAnalyzeCallMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file?.trim()) {
      toast.error("Please enter a recording URL");
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      toast.info("Analyzing call recording...");
      const analyzeRes = await analyzeCall(formData).unwrap();

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
        description="Provide call recording details and direct audio URL to analyze lead sentiment and interaction."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">Call Details & Recording URL</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="call_id" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Call ID</Label>
                <Input
                  id="call_id"
                  name="call_id"
                  value={formData.call_id}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. 1"
                  className="rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-[#063669]"
                />
              </div>
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
              <div className="space-y-2 md:col-span-2">
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
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="file" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Link2 className="h-3.5 w-3.5 text-[#063669] dark:text-blue-400" />
                  Recording / S3 URL (File)
                </Label>
                <Input
                  id="file"
                  name="file"
                  value={formData.file}
                  onChange={handleInputChange}
                  required
                  placeholder="https://..."
                  className="rounded-xl border-zinc-200 dark:border-zinc-800 focus-visible:ring-[#063669]"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isProcessing || !formData.file?.trim()}
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
               <p className="text-sm font-semibold animate-pulse">Analyzing your call...</p>
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
              <p className="text-xs text-center mt-1 max-w-[200px]">Enter a recording URL and hit Analyze to see the results here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
