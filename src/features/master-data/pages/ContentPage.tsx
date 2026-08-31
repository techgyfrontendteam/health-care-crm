import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Search, ChevronDown, Check, X, FileText, Table, Image as ImageIcon, Play, UploadCloud, Trash2, Loader2 } from "lucide-react";
import { useGetAllMasterDataQuery } from "../../master/api/masterApi";
import {
  useCreateProjectContentsMutation,
  useDeleteProjectContentsMutation,
  useGetProjectWiseContentsMutation,
} from "../api/manageMasterDataSlice";
import { useUploadFileMutation, useDownloadUrlMutation } from "../../../shared/api/s3ApiSlice";
import { ConfirmDialog } from "../../../shared/components/ConfirmDialog/ConfirmDialog";
import { uploadLargeFile } from "../../../shared/utils/multipartUpload";

export const ContentPage: React.FC = () => {
  const navigate = useNavigate();

  // RTK Queries
  const { data: masterData, isLoading: isMasterLoading } = useGetAllMasterDataQuery();
  const [getProjectContents, { data: projectContents, isLoading: isContentsLoading }] = useGetProjectWiseContentsMutation();
  const [createProjectContent, { isLoading: isCreating }] = useCreateProjectContentsMutation();
  const [deleteProjectContent, { isLoading: isDeleting }] = useDeleteProjectContentsMutation();
  const [uploadFile] = useUploadFileMutation();
  const [downloadUrl, { isLoading: isGeneratingUrl }] = useDownloadUrlMutation();

  const projects = masterData?.projects || [];
  const contentTypes = masterData?.content_types || [];

  // Selected Project State
  const [selectedProjectId, setSelectedProjectIdState] = useState<number | "">(() => {
    const saved = localStorage.getItem("crm_selected_project_id");
    return saved ? parseInt(saved) : "";
  });

  const setSelectedProjectId = (id: number | "") => {
    setSelectedProjectIdState(id);
    if (id) {
      localStorage.setItem("crm_selected_project_id", id.toString());
    } else {
      localStorage.removeItem("crm_selected_project_id");
    }
  };

  // Set default project on load
  useEffect(() => {
    if (!selectedProjectId && projects.length > 0) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  // Fetch contents when selected project changes
  useEffect(() => {
    if (selectedProjectId) {
      getProjectContents({ project_ids: [selectedProjectId] });
    }
  }, [selectedProjectId, getProjectContents]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);

  // Success Modal State
  const [isSaveSuccessModalOpen, setIsSaveSuccessModalOpen] = useState(false);

  // Upload Modal States
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedContentTypeId, setSelectedContentTypeId] = useState<number | "">("");
  const [isContentTypeDropdownOpen, setIsContentTypeDropdownOpen] = useState(false);

  // File Upload States
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Delete Content State
  const [contentToDelete, setContentToDelete] = useState<number | null>(null);

  // Timer for automatic redirect
  useEffect(() => {
    let timer: any;
    if (isSaveSuccessModalOpen) {
      timer = setTimeout(() => {
        setIsSaveSuccessModalOpen(false);
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isSaveSuccessModalOpen]);

  // Find label of active project
  const selectedProjectLabel = useMemo(() => {
    const proj = projects.find((p) => p.id === selectedProjectId);
    return proj ? proj.description : "Select Project";
  }, [selectedProjectId, projects]);

  const selectedContentTypeLabel = useMemo(() => {
    const type = contentTypes.find((t) => t.id === selectedContentTypeId);
    return type ? type.description : "Select Content Type";
  }, [selectedContentTypeId, contentTypes]);

  // File selection handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  // Handle submit new content
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !selectedProjectId || !selectedContentTypeId) return;

    try {
      setIsUploading(true);
      setUploadProgress(0);

      if (selectedFile.size > 5 * 1024 * 1024) {
        // Multipart upload for > 5MB
        await uploadLargeFile(
          selectedFile,
          Number(selectedProjectId),
          Number(selectedContentTypeId),
          (progress) => setUploadProgress(progress)
        );
      } else {
        // Standard upload for <= 100MB
        const cleanFilename = selectedFile.name.trim().replace(/\s+/g, '_');
        const key = `projectwisecontent/${selectedProjectId}/${selectedContentTypeId}/${cleanFilename}`;

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('key', key);

        const uploadResult = await uploadFile(formData).unwrap();

        // Save mapping to master backend
        await createProjectContent({
          project_id: Number(selectedProjectId),
          content_type_id: Number(selectedContentTypeId),
          s3_key: uploadResult.key || key
        }).unwrap();
      }

      // 3. Refresh contents
      getProjectContents({ project_ids: [Number(selectedProjectId)] });

      // 4. Cleanup and show success
      setIsUploadModalOpen(false);
      setSelectedFile(null);
      setSelectedContentTypeId("");
      setIsSaveSuccessModalOpen(true);
      setUploadProgress(0);
    } catch (error) {
      console.error("Failed to upload content", error);
      alert("Failed to upload content. Please try again.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const confirmDelete = async (id: number) => {
    try {
      await deleteProjectContent({ ids: [id] }).unwrap();
      if (selectedProjectId) {
        getProjectContents({ project_ids: [selectedProjectId] });
      }
      setContentToDelete(null);
    } catch (error) {
      console.error("Failed to delete content", error);
      alert("Failed to delete content.");
    }
  };

  const handleDeleteContent = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setContentToDelete(id);
  };

  const handlePreviewFile = async (content: any) => {
    try {
      console.log(`[Preview] Calling /s3/downloadUrl for key: "${content.s3_key}" (without bucketName)`);

      const response = await downloadUrl({
        key: content.s3_key
      }).unwrap();

      const targetUrl = response.downloadUrl || response.presignedUrl || response.url;
      if (targetUrl) {
        window.open(targetUrl, "_blank");
      } else {
        console.error("No valid URL returned from /s3/downloadUrl:", response);
        alert("Failed to retrieve download URL.");
      }
    } catch (error) {
      console.error("Failed to generate download URL", error);
      alert("Failed to load the file preview.");
    }
  };

  // Computed list
  const displayedContent = useMemo(() => {
    if (!projectContents || !projectContents.data || projectContents.data.length === 0) return [];

    // Find the project's data (though there should only be one since we pass one project_id)
    const projectData = projectContents.data.find(d => d.project_id === selectedProjectId);
    if (!projectData || !projectData.contents) return [];

    return projectData.contents.map(content => {
      let fileName = content.s3_key ? content.s3_key.split('/').pop() : "Unknown File";
      if (!fileName) fileName = "Unknown File";

      const fileExt = fileName.split('.').pop()?.toLowerCase() || "pdf";
      let type: "pdf" | "xlsx" | "dwg" | "png" | "mp4" = "pdf";
      if (fileExt === "xlsx" || fileExt === "xls") type = "xlsx";
      else if (fileExt === "dwg") type = "dwg";
      else if (fileExt === "png" || fileExt === "jpg" || fileExt === "jpeg") type = "png";
      else if (fileExt === "mp4" || fileExt === "mov") type = "mp4";

      return {
        id: content.id,
        fileName,
        fileType: type,
        title: content.content_type_description || fileName,
        s3_key: content.s3_key
      };
    }).filter(
      (c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.fileName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projectContents, searchQuery, selectedProjectId]);

  // Icon renderer helper
  const renderFileIcon = (fileType: "pdf" | "xlsx" | "dwg" | "png" | "mp4") => {
    switch (fileType) {
      case "pdf":
        return (
          <div className="w-12 h-12 rounded-[14px] bg-red-50 dark:bg-red-950/20 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-red-500" />
          </div>
        );
      case "xlsx":
        return (
          <div className="w-12 h-12 rounded-[14px] bg-slate-100 dark:bg-zinc-800/30 flex items-center justify-center shrink-0">
            <Table className="w-5 h-5 text-slate-500" />
          </div>
        );
      case "dwg":
        return (
          <div className="w-12 h-12 rounded-[14px] bg-blue-50 dark:bg-blue-950/20 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-blue-500" />
          </div>
        );
      case "png":
        return (
          <div className="w-12 h-12 rounded-[14px] bg-slate-100 dark:bg-zinc-800/30 flex items-center justify-center shrink-0">
            <ImageIcon className="w-5 h-5 text-slate-500" />
          </div>
        );
      case "mp4":
        return (
          <div className="w-12 h-12 rounded-[14px] bg-[#eef4ff] dark:bg-blue-950/20 flex items-center justify-center shrink-0">
            <Play className="w-5 h-5 fill-current text-[#002d62]" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-[14px] bg-slate-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-slate-500" />
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-[1440px] xl:max-w-[1920px] 2xl:max-w-[2560px] mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-6 animate-in fade-in duration-300 relative">

      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/master-data")}
          className="flex items-center gap-[8px] font-['Plus_Jakarta_Sans'] font-bold text-[24px] leading-[28px] tracking-[-0.5px] text-[#001549] dark:text-blue-400 hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-0 h-[44px]"
        >
          <ArrowLeft className="w-6 h-6 text-[#001549] dark:text-blue-400" />
          Content
        </button>
      </div>

      {/* Main Container Card */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-3xl p-6 xl:p-8 shadow-sm space-y-6">

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* Left: Project Selector & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 relative z-20">
            {/* Project Dropdown */}
            <div className="flex items-center">
              <span className="text-[10px] tracking-wider font-extrabold text-slate-400 dark:text-zinc-550 uppercase mr-3">
                SELECT PROJECT
              </span>
              <div className="relative">
                <button
                  onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                  className="flex items-center gap-2 bg-[#f0f4f8] dark:bg-zinc-850 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200/20 px-4 py-2 rounded-xl text-xs font-extrabold text-[#002d62] dark:text-blue-450 transition-colors shadow-sm cursor-pointer min-w-[150px] justify-between"
                >
                  <span>{selectedProjectLabel}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#002d62] dark:text-blue-450 transition-transform ${isProjectDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isProjectDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl shadow-lg py-2 z-30 max-h-60 overflow-y-auto">
                    {projects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSelectedProjectId(p.id);
                          setIsProjectDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${selectedProjectId === p.id ? "bg-blue-600" : "bg-slate-350"
                            }`}
                        />
                        {p.description}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Search Content */}
            <div className="relative w-full sm:w-[401px]">
              <Search className="absolute left-[16px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#434653]" />
              <input
                type="text"
                placeholder="Search Content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[48px] pl-[40px] pr-4 rounded-full border-none bg-[#F2F4F6] dark:bg-zinc-800 text-[14px] font-normal text-[#434653] dark:text-zinc-200 placeholder-[#434653] focus:outline-none focus:ring-1 focus:ring-[#002d62]"
              />
            </div>
          </div>

          {/* Right: + Upload Button */}
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-[#002d62] hover:bg-[#063669] text-white px-6 py-2.5 rounded-full text-xs font-black transition-all shadow-sm cursor-pointer flex items-center gap-1.5 self-end sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Upload
          </button>
        </div>

        <div className="border-b border-slate-100 dark:border-zinc-800/80" />

        {/* Content Area */}
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-zinc-200">
                Uploaded Content
              </h3>
              <p className="text-[11px] text-slate-450 dark:text-zinc-500 mt-0.5">
                Files currently associated with <span className="font-bold text-[#002d62] dark:text-blue-450">{selectedProjectLabel}</span>
              </p>
            </div>
          </div>

          {isContentsLoading ? (
            <div className="flex justify-center items-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#002d62] dark:text-blue-450" />
            </div>
          ) : displayedContent.length === 0 ? (
            <div className="bg-slate-50/50 dark:bg-zinc-950/20 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-6 text-center text-xs font-bold text-slate-400">
              No content uploaded yet for this project.
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(336px,1fr))] gap-6">
              {displayedContent.map((content) => (
                <div
                  key={content.id}
                  onClick={() => handlePreviewFile(content)}
                  className={`bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/60 rounded-3xl p-6 relative flex flex-col justify-between shadow-sm group cursor-pointer hover:border-slate-300 dark:hover:border-zinc-700 transition-all w-full h-[150px] ${isGeneratingUrl ? "opacity-70 pointer-events-none" : ""}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-extrabold text-sm text-slate-800 leading-[24px] dark:text-zinc-150">
                      {content.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold text-[#1E3A8A] dark:text-blue-400 group-hover:opacity-0 transition-opacity">View</span>
                      <button
                        onClick={(e) => handleDeleteContent(content.id, e)}
                        disabled={isDeleting}
                        className="absolute right-6 text-red-500 hover:text-red-700 text-xs font-extrabold cursor-pointer transition-all opacity-0 group-hover:opacity-100 p-1.5 bg-red-50 dark:bg-red-950/30 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {renderFileIcon(content.fileType)}
                    <div className="overflow-hidden flex flex-col justify-center gap-1">
                      <p className="text-[14px] font-medium text-[#191C1E] dark:text-zinc-200 truncate" title={content.fileName}>
                        {content.fileName}
                      </p>
                      <p className="text-[12px] font-normal text-[#575E70] dark:text-zinc-400">
                        2.4 MB • 12 Oct 2023
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="border-b border-slate-100 dark:border-zinc-800/80 pt-2" />
        </div>

      </div>

      {/* Save Changes Success Modal */}
      {isSaveSuccessModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-[32px] border border-slate-100 dark:border-zinc-800/80 w-full max-w-[400px] p-8 shadow-2xl relative text-center space-y-6 mx-4 animate-in zoom-in-95 duration-200">
            {/* Checkmark Icon Container */}
            <div className="flex justify-center">
              <div className="relative w-16 h-16 rounded-full bg-[#002d62] flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
            </div>

            {/* Heading */}
            <h3 className="text-xl font-extrabold text-[#002d62] dark:text-zinc-150 tracking-tight px-4">
              Upload Successful
            </h3>

            {/* Subtext */}
            <p className="text-[11px] text-slate-450 dark:text-zinc-550 font-medium leading-relaxed max-w-[280px] mx-auto">
              <span className="font-extrabold text-slate-700 dark:text-zinc-350">File</span>{" "}
              <span className="italic text-slate-400 dark:text-zinc-500">has been successfully added to</span>{" "}
              <span className="font-extrabold text-slate-700 dark:text-zinc-350">{selectedProjectLabel}</span>.
            </p>

            <div className="flex justify-center w-full pt-2">
              <button
                onClick={() => setIsSaveSuccessModalOpen(false)}
                className="bg-[#1a365d] hover:bg-[#2a4365] text-white text-xs font-black tracking-wider py-3.5 px-8 rounded-full transition-colors cursor-pointer w-full max-w-[240px] shadow-sm uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Content Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-slate-100 dark:border-zinc-800/80 w-full max-w-md p-8 shadow-2xl relative mx-4 flex flex-col animate-in zoom-in-95 duration-200 xl:w-[640px] xl:h-[624px] xl:max-w-none w1440:w-[720px] w1440:h-[702px] w1920:w-[960px] w1920:h-[936px] w2560:w-[1280px] w2560:h-[1248px]">

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 shrink-0">
              <h2 className="text-[20px] font-black text-[#002d62] dark:text-zinc-150 tracking-tight">
                Add New Content
              </h2>
              <button
                onClick={() => {
                  if (isUploading) return;
                  setIsUploadModalOpen(false);
                  setSelectedFile(null);
                  setSelectedContentTypeId("");
                  setIsContentTypeDropdownOpen(false);
                }}
                disabled={isUploading}
                className="text-slate-400 hover:text-slate-655 dark:hover:text-zinc-350 cursor-pointer disabled:opacity-50 transition-colors p-1"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUploadSubmit} className="flex-1 flex flex-col justify-between mt-4">

              <div className="space-y-4 shrink-0">
                {/* Content Type Select */}
                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-zinc-800/50 relative z-30">
                  <label className="text-[10px] font-extrabold text-[#002d62]/60 dark:text-zinc-400 tracking-widest uppercase">
                    CONTENT TYPE
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => !isUploading && setIsContentTypeDropdownOpen(!isContentTypeDropdownOpen)}
                      disabled={isUploading}
                      className="flex items-center gap-2 bg-[#f0f4f8] dark:bg-zinc-850 hover:bg-slate-100 dark:hover:bg-zinc-800 px-4 py-2.5 rounded-xl text-xs font-bold text-[#002d62] dark:text-zinc-200 transition-colors cursor-pointer min-w-[220px] justify-between disabled:opacity-50"
                    >
                      <span>{selectedContentTypeId ? selectedContentTypeLabel : "Select Content Type"}</span>
                      <ChevronDown className="w-4 h-4 text-slate-455" />
                    </button>

                    {isContentTypeDropdownOpen && (
                      <div className="absolute right-0 mt-1 w-56 bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-xl shadow-lg py-1.5 z-50 max-h-48 overflow-y-auto">
                        {contentTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => {
                              setSelectedContentTypeId(type.id);
                              setIsContentTypeDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-750 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-855 transition-colors"
                          >
                            {type.description}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* File upload drag-and-drop zone */}
              <div className="flex-1 flex flex-col my-4 min-h-[220px] xl:min-h-0">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.zip"
                  disabled={isUploading}
                  className="hidden"
                />

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={isUploading ? undefined : handleFileDrop}
                  onClick={isUploading ? undefined : triggerFileSelect}
                  className={`flex-1 border-2 border-dashed rounded-xl p-8 text-center transition-all flex flex-col items-center justify-center group ${isUploading
                    ? 'border-slate-200 bg-slate-50/50 opacity-50 cursor-not-allowed'
                    : 'border-slate-300 dark:border-zinc-850 hover:border-slate-450 dark:hover:border-zinc-700 bg-slate-50/30 dark:bg-zinc-950/20 cursor-pointer'
                    }`}
                >
                  <div className="w-16 h-16 rounded-full bg-blue-50/80 dark:bg-blue-950/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shrink-0">
                    <UploadCloud className="w-7 h-7 text-[#002d62] dark:text-blue-450" />
                  </div>

                  <div className="mt-4 space-y-1.5 shrink-0">
                    {selectedFile ? (
                      <>
                        <p className="text-xs font-extrabold text-[#002d62] dark:text-blue-450">
                          {selectedFile.name}
                        </p>
                        <p className="text-[10px] font-bold text-slate-455">
                          Size: {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-extrabold text-[#002d62] dark:text-zinc-200">
                          Drag & Drop your file here
                        </p>
                        <p className="text-xs text-slate-455 dark:text-zinc-450 font-bold">
                          or <span className="underline text-blue-600 hover:text-blue-750 font-extrabold">click to browse</span> from your computer
                        </p>
                      </>
                    )}
                  </div>

                  <p className="text-[10px] font-extrabold text-slate-400 dark:text-zinc-550 tracking-widest mt-3 uppercase shrink-0">
                    PDF &nbsp;&nbsp;&nbsp; DOCX &nbsp;&nbsp;&nbsp; ZIP &nbsp;&nbsp;&nbsp; MAX 50MB
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100 dark:border-zinc-800/80 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    if (isUploading) return;
                    setIsUploadModalOpen(false);
                    setSelectedFile(null);
                    setSelectedContentTypeId("");
                    setIsContentTypeDropdownOpen(false);
                  }}
                  disabled={isUploading}
                  className="px-4 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-750 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer bg-transparent border-0 disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedFile || !selectedContentTypeId || !selectedProjectId || isUploading}
                  className="bg-[#002d62] hover:bg-[#063669] disabled:bg-[#002d62]/35 disabled:text-white/60 text-white px-8 py-3 rounded-full text-xs font-black tracking-wider uppercase transition-all cursor-pointer disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isUploading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {isUploading ? `Uploading... ${uploadProgress > 0 ? `(${uploadProgress}%)` : ''}` : "Upload File"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        open={contentToDelete !== null}
        onClose={() => setContentToDelete(null)}
        onConfirm={() => contentToDelete && confirmDelete(contentToDelete)}
        title="Delete Content"
        description="Are you sure you want to delete this content? This action cannot be undone."
        confirmLabel="Delete"
        isLoading={isDeleting}
      />
    </div>
  );
};
