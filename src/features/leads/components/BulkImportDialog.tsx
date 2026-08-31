import React, { useState, useRef } from "react";
import {
  X,
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Download,
  Loader2,
  Trash2
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { toast } from "sonner";
import { useUploadFileMutation } from "../../../shared/api/s3ApiSlice";
import { useBulkImportLeadsMutation } from "../api/leadsApi";

interface BulkImportDialogProps {
  open: boolean;
  onClose: () => void;
  projectOptions: { value: string; label: string }[];
  onImportComplete: () => void;
}

export const BulkImportDialog: React.FC<BulkImportDialogProps> = ({
  open,
  onClose,
  projectOptions,
  onImportComplete,
}) => {
  const [uploadFile] = useUploadFileMutation();
  const [bulkImportLeads] = useBulkImportLeadsMutation();

  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [importSummary, setImportSummary] = useState<{
    success: boolean;
    total: number | string;
    imported: number | string;
    failed: number | string;
    message?: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  // Handle Drag Events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle Drop Event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  // Handle File Input Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  // Validate File Format
  const validateAndSetFile = (selectedFile: File) => {
    setErrorMessage(null);
    const extension = selectedFile.name.split(".").pop()?.toLowerCase();
    if (extension !== "csv") {
      const msg = "Invalid file type. Only CSV (.csv) files are supported.";
      setErrorMessage(msg);
      toast.error(msg);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }
    if (selectedFile.size === 0) {
      const msg = "The selected CSV file is empty.";
      setErrorMessage(msg);
      toast.error(msg);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      const msg = "File size exceeds 10MB limit. Please upload a smaller CSV file.";
      setErrorMessage(msg);
      toast.error(msg);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }
    setFile(selectedFile);
    setErrorMessage(null);
    setImportSummary(null);
  };

  // Remove Selected File
  const handleRemoveFile = () => {
    setFile(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImportSummary(null);
  };

  // Trigger File Input Click
  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Generate and Download CSV Template
  const downloadTemplate = () => {
    const headers = [
      "first_name",
      "last_name",
      "phone_number",
      "email_address",
      "occupation",
      "address",
      "city",
      "state",
      "country",
      "zip",
    ];
    const sampleRows = [
      ["Aarav", "Sharma", "9876543210", "aarav.sharma@example.com", "Software Engineer", "123 Green Valley Road", "Bengaluru", "Karnataka", "India", "560001"],
      ["Dia", "Patel", "9123456789", "dia.patel@example.com", "Business Analyst", "456 Sunrise Apartments", "Mumbai", "Maharashtra", "India", "400001"],
    ];

    const csvContent = [
      headers.join(","),
      ...sampleRows.map((row) => row.map((val) => `"${val}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "lead_bulk_import_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV template downloaded!");
  };

  // Handle Import Submit
  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!selectedProjectId) {
    //   toast.error("Please select a target Project.");
    //   return;
    // }
    if (!file) {
      toast.error("Please upload a file.");
      return;
    }

    setUploading(true);
    setProgress(10);

    // Simulate progress bar increase during upload
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          return 90;
        }
        return prev + Math.floor(Math.random() * 10) + 5;
      });
    }, 200);

    try {
      // 1. Send file to S3 bucket
      const cleanFilename = file.name.trim().replace(/\s+/g, '_');
      const key = `leads-bulk-import/${selectedProjectId}/${Date.now()}_${cleanFilename}`;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('key', key);

      const uploadResult = await uploadFile(formData).unwrap();
      const finalS3Key = uploadResult.key || key;

      // 2. Send s3_key to backend bulk import API
      const importResult = await bulkImportLeads({
        s3_key: finalS3Key,
      }).unwrap();

      clearInterval(interval);
      setProgress(100);

      setTimeout(() => {
        setUploading(false);
        const totalRows = importResult.total_records ?? importResult.total ?? importResult.affectedRows ?? importResult.count ?? "0";
        const importedRows = importResult.success_count ?? importResult.imported ?? importResult.affectedRows ?? "0";
        const failedRows = importResult.skipped_count ?? importResult.failed ?? importResult.error_count ?? 0;

        setImportSummary({
          success: true,
          total: totalRows,
          imported: importedRows,
          failed: failedRows,
          message: importResult.message,
        });
        toast.success(importResult.message || "Successfully imported leads!");
        // 3. Reload leads
        onImportComplete();
      }, 300);
    } catch (err: any) {
      clearInterval(interval);
      setUploading(false);
      setProgress(0);
      const errorMsg = err?.data?.message || err?.data?.error || err?.message || "Failed to import leads. Please try again.";
      toast.error(errorMsg);
    }
  };

  // Reset and Close
  const handleDone = () => {
    setSelectedProjectId("");
    setFile(null);
    setImportSummary(null);
    setProgress(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-xl rounded-3xl shadow-2xl border border-zinc-150/80 dark:border-zinc-800 flex flex-col max-h-[85vh] relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-900/30">
          <div>
            <h2 className="text-xl font-black text-[#002d62] dark:text-zinc-100 flex items-center gap-2">
              <FileSpreadsheet className="w-5.5 h-5.5 text-blue-600" />
              Bulk Import Leads
            </h2>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              Upload CSV file to create multiple leads simultaneously.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-650 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
          {!importSummary ? (
            <form id="bulk-import-form" onSubmit={handleImport} className="space-y-5">

              {/* Project Selection */}
              {/* <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-600 dark:text-zinc-350">
                  Select Target Project <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={selectedProjectId}
                  onValueChange={setSelectedProjectId}
                  disabled={uploading}
                >
                  <SelectTrigger className="rounded-2xl h-12 border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-800 shadow-sm focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
                    <SelectValue placeholder="Select target project for leads" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-900 text-black dark:text-zinc-100 border-zinc-100 dark:border-zinc-800">
                    {projectOptions.map((proj) => (
                      <SelectItem
                        key={proj.value}
                        value={proj.value}
                        className="text-black dark:text-zinc-100 cursor-pointer"
                      >
                        {proj.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}

              {/* Template Download Box */}
              <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/30 rounded-2xl flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <h4 className="text-xs font-extrabold text-blue-900 dark:text-blue-350">
                    Need a CSV Template?
                  </h4>
                  <p className="text-[11px] font-semibold text-blue-700/80 dark:text-blue-400/80">
                    Use our pre-formatted template to ensure matching headers.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={downloadTemplate}
                  disabled={uploading}
                  className="gap-1.5 h-9 rounded-xl border-blue-200 dark:border-blue-900 text-xs font-bold text-blue-750 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-950/50 cursor-pointer shadow-xs shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  Template
                </Button>
              </div>

              {/* File Upload Zone */}
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-600 dark:text-zinc-350">
                  Upload CSV File <span className="text-red-500">*</span>
                </Label>

                <input
                  ref={fileInputRef}
                  type="file"
                  id="csv-file-upload"
                  className="hidden"
                  accept=".csv"
                  onChange={handleFileChange}
                  disabled={uploading}
                />

                {!file ? (
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={onButtonClick}
                    className={`border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ${dragActive
                        ? "border-blue-500 bg-blue-50/30 dark:bg-blue-950/10"
                        : "border-slate-200 dark:border-zinc-800 hover:border-slate-350 hover:bg-slate-50/40 dark:hover:bg-zinc-900/40"
                      }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-zinc-900 flex items-center justify-center shadow-inner mb-3">
                      <UploadCloud className="w-6 h-6 text-slate-450 dark:text-zinc-550" />
                    </div>
                    <p className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                      Drag & drop your file here, or <span className="text-blue-600 hover:underline">browse</span>
                    </p>
                    <p className="text-[10px] font-semibold text-slate-400 mt-1">
                      Supports CSV up to 10MB
                    </p>
                  </div>
                ) : (
                  <div className="border border-slate-200 dark:border-zinc-800 rounded-3xl p-4 bg-slate-50/40 dark:bg-zinc-900/30 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 truncate">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center shrink-0">
                        <FileSpreadsheet className="w-5 h-5 text-blue-600 dark:text-blue-450" />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-extrabold text-slate-700 dark:text-zinc-200 truncate">
                          {file.name}
                        </p>
                        <p className="text-[10px] font-semibold text-slate-400 mt-0.5">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    {!uploading && (
                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Inline Validation Error Banner */}
              {errorMessage && (
                <div className="p-3.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl flex items-center gap-2.5 text-xs font-bold text-red-600 dark:text-red-400 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Upload Progress */}
              {uploading && (
                <div className="space-y-2 p-4 border border-zinc-100 dark:border-zinc-850 bg-slate-50/30 dark:bg-zinc-900/20 rounded-2xl animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-zinc-350">
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-650" />
                      Uploading and parsing leads...
                    </span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-blue-650 h-full rounded-full transition-all duration-150"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </form>
          ) : (
            /* Summary View */
            <div className="py-6 flex flex-col items-center text-center space-y-5 animate-in fade-in zoom-in-98 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-800 dark:text-zinc-100">
                  Import Process Completed!
                </h3>
                <p className="text-xs font-semibold text-slate-550 max-w-sm">
                  {importSummary.message || "Leads have been successfully parsed and appended to your active leads queue."}
                </p>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-3 gap-4 w-full max-w-md pt-2">
                <div className="bg-slate-50/50 dark:bg-zinc-900/30 border border-slate-100 dark:border-zinc-850 rounded-2xl p-4 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-slate-450 dark:text-zinc-500 uppercase tracking-wider">
                    Total Rows
                  </span>
                  <span className="text-2xl font-black text-slate-800 dark:text-zinc-150 mt-1">
                    {importSummary.total}
                  </span>
                </div>
                <div className="bg-emerald-50/20 dark:bg-emerald-950/10 border border-emerald-100/30 dark:border-emerald-900/20 rounded-2xl p-4 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-emerald-650/80 dark:text-emerald-500 uppercase tracking-wider">
                    Imported
                  </span>
                  <span className="text-2xl font-black text-emerald-700 dark:text-emerald-450 mt-1">
                    {importSummary.imported}
                  </span>
                </div>
                <div className="bg-slate-50/50 dark:bg-zinc-900/30 border border-slate-100 dark:border-zinc-850 rounded-2xl p-4 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-slate-450 dark:text-zinc-500 uppercase tracking-wider">
                    Skipped / Failed
                  </span>
                  <span className="text-2xl font-black text-slate-800 dark:text-zinc-150 mt-1">
                    {importSummary.failed}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/20 flex items-center justify-end gap-3 rounded-b-3xl shrink-0">
          {!importSummary ? (
            <>
              <Button
                variant="outline"
                onClick={onClose}
                disabled={uploading}
                className="rounded-xl border-zinc-200 dark:border-zinc-800 font-bold hover:bg-slate-50 cursor-pointer shadow-xs text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="bulk-import-form"
                disabled={uploading || !file}
                className="gap-2 bg-[#063669] hover:bg-[#063669]/90 text-white rounded-xl h-10 px-5 font-bold shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs"
              >
                {uploading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Import Leads
              </Button>
            </>
          ) : (
            <Button
              onClick={handleDone}
              className="bg-[#063669] hover:bg-[#063669]/90 text-white rounded-xl h-10 px-6 font-bold shadow-sm cursor-pointer text-xs"
            >
              Done
            </Button>
          )}
        </div>

      </div>
    </div>
  );
};
