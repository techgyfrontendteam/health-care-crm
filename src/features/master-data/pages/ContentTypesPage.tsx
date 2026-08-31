import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Search, ChevronDown, Check, X } from "lucide-react";
import { toast } from "sonner";
import { initialProjects, initialProjectContentTypes } from "../data/masterData";
import type { ContentType } from "../data/masterData";
import { useCreateContentTypeMutation, useUpdateContentTypeMutation } from "../api/manageMasterDataSlice";
import { useMasterDataLookup } from "../../../shared/hooks/useMasterDataLookup";

export const ContentTypesPage: React.FC = () => {
  const navigate = useNavigate();
  const [createContentType] = useCreateContentTypeMutation();
  const [updateContentType] = useUpdateContentTypeMutation();
  const { masterData } = useMasterDataLookup();

  // State initialized from the dynamic data file
  const [projects] = useState(initialProjects);
  const [globalContentTypes, setGlobalContentTypes] = useState<ContentType[]>([]);
  const [projectContentTypes, setProjectContentTypes] = useState<Record<string, string[]>>(initialProjectContentTypes);

  useEffect(() => {
    if (masterData?.content_types) {
      const apiTypes = masterData.content_types.map((t: any) => ({
        code: t.code,
        name: t.description || t.code,
        id: t.id,
      }));
      setGlobalContentTypes(apiTypes);
    }
  }, [masterData]);

  // Filter & Selection States
  const [selectedProjectId, setSelectedProjectIdState] = useState<string>(() => {
    return localStorage.getItem("crm_selected_project_id") || "";
  });

  const setSelectedProjectId = (id: string) => {
    setSelectedProjectIdState(id);
    localStorage.setItem("crm_selected_project_id", id);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);

  // Temporary selected content types copy for active project editing
  const [tempSelectedCodes, setTempSelectedCodes] = useState<string[]>([]);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingTypeCode, setEditingTypeCode] = useState<string>("");
  const [editingTypeId, setEditingTypeId] = useState<number | null>(null);
  const [typeName, setTypeName] = useState("");
  const [typeCode, setTypeCode] = useState("");

  // Success Modal State after Save Changes
  const [isSaveSuccessModalOpen, setIsSaveSuccessModalOpen] = useState(false);

  // Sync tempSelectedCodes when selected project changes
  useEffect(() => {
    if (selectedProjectId) {
      setTempSelectedCodes(projectContentTypes[selectedProjectId] || []);
    } else {
      setTempSelectedCodes([]);
    }
  }, [selectedProjectId, projectContentTypes]);

  // Timer for automatic redirect after 3 seconds when success modal is open
  useEffect(() => {
    let timer: any;
    if (isSaveSuccessModalOpen) {
      timer = setTimeout(() => {
        handleRedirectToContentHome();
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isSaveSuccessModalOpen]);

  const handleRedirectToContentHome = () => {
    setIsSaveSuccessModalOpen(false);
    setSelectedProjectId(""); // Clears selected project so page returns to default state
    navigate("/master-data/content-types");
  };

  // Toast replaced with sonner

  // Find label of active project
  const selectedProjectLabel = useMemo(() => {
    const proj = projects.find((p) => p.id === selectedProjectId);
    return proj ? proj.name : "Select Project";
  }, [selectedProjectId, projects]);

  // Handle Name change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypeName(e.target.value);
  };

  // Open Modal for adding
  const openAddModal = () => {
    setModalMode("add");
    setTypeName("");
    setTypeCode("");
    setEditingTypeId(null);
    setIsModalOpen(true);
  };

  // Open Modal for editing global content type
  const openEditModal = (contentType: any) => {
    setModalMode("edit");
    setEditingTypeCode(contentType.code);
    setEditingTypeId(contentType.id);
    setTypeName(contentType.name);
    setTypeCode(contentType.code);
    setIsModalOpen(true);
  };

  // Handle Add/Edit Form Submit
  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!typeName.trim() || !typeCode.trim()) {
      toast.error("Please fill in both fields");
      return;
    }

    const cleanCode = typeCode.trim().toUpperCase();

    try {
      if (modalMode === "add") {
        if (globalContentTypes.some((t) => t.code === cleanCode)) {
          toast.error(`Content type code "${cleanCode}" already exists.`);
          return;
        }

        await createContentType({
          code: cleanCode,
          description: typeName.trim(),
          user_id: null
        }).unwrap();

        toast.success(`Content type "${typeName}" added successfully.`);
      } else {
        if (editingTypeId === null) {
          toast.error("Invalid content type ID.");
          return;
        }

        await updateContentType({
          id: editingTypeId,
          code: cleanCode,
          description: typeName.trim(),
          user_id: null
        }).unwrap();

        setGlobalContentTypes(
          globalContentTypes.map((t) =>
            t.code === editingTypeCode ? { ...t, name: typeName.trim(), code: cleanCode } : t
          )
        );
        toast.success("Content type updated successfully.");
      }
      setIsModalOpen(false);
    } catch (err: any) {
      console.error("Modal Submit Error:", err);
      if (err?.status === 409) {
        toast.error("Already code is existed");
      } else {
        toast.error("Failed to save changes. Please try again.");
      }
    }
  };

  // Handle Project funnel changes (Add content type to selected project)
  const handleAddTypeToProject = (code: string) => {
    if (!tempSelectedCodes.includes(code)) {
      setTempSelectedCodes([...tempSelectedCodes, code]);
    }
  };

  // Handle Project funnel changes (Remove content type from selected project)
  const handleRemoveTypeFromProject = (code: string) => {
    setTempSelectedCodes(tempSelectedCodes.filter((c) => c !== code));
  };

  // Save changes to project content types map
  const handleSaveChanges = () => {
    if (!selectedProjectId) return;
    setProjectContentTypes({
      ...projectContentTypes,
      [selectedProjectId]: tempSelectedCodes,
    });
    setIsSaveSuccessModalOpen(true);
  };

  // Computed data lists
  const displayedContentTypes = useMemo(() => {
    return globalContentTypes.filter(
      (t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [globalContentTypes, searchQuery]);

  return (
    <div className="w-full max-w-[1440px] xl:max-w-[1920px] 2xl:max-w-[2560px] mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-6 animate-in fade-in duration-300 relative">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/master-data")}
          className="flex items-center gap-[8px] font-['Plus_Jakarta_Sans'] font-bold text-[24px] leading-[28px] tracking-[-0.5px] text-[#001549] dark:text-blue-400 hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-0 h-[44px]"
        >
          <ArrowLeft className="w-6 h-6 text-[#001549] dark:text-blue-400" />
          Content Types
        </button>

        <button
          onClick={openAddModal}
          className="bg-[#002d62] hover:bg-[#063669] text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Add Content Type
        </button>
      </div>

      {/* Main Container Card */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-3xl p-6 xl:p-8 shadow-sm space-y-6">
        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Project Dropdown - Commented out as requested */}
          {/* <div className="flex items-center relative z-20">
            <span className="text-[10px] tracking-wider font-extrabold text-slate-400 dark:text-zinc-550 uppercase mr-3">
              PROJECT
            </span>
            <div className="relative">
              <button
                onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                className="flex items-center gap-2 bg-[#f0f4f8] dark:bg-zinc-850 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200/20 px-4 py-2 rounded-xl text-xs font-extrabold text-[#002d62] dark:text-blue-450 transition-colors shadow-sm cursor-pointer min-w-[150px] justify-between"
              >
                <span>{selectedProjectLabel}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#002d62] dark:text-blue-450" />
              </button>

              {isProjectDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl shadow-lg py-2 z-30">
                  <button
                    onClick={() => {
                      setSelectedProjectId("");
                      setIsProjectDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        selectedProjectId === "" ? "bg-blue-600" : "bg-slate-300"
                      }`}
                    />
                    Select Project
                  </button>
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
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          selectedProjectId === p.id ? "bg-blue-600" : "bg-slate-350"
                        }`}
                      />
                      {p.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div> */}

          {/* Search Content Types */}
          <div className="relative w-full sm:w-[401px] ml-auto">
            <Search className="absolute left-[16px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#434653]" />
            <input
              type="text"
              placeholder="Search Content Types..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[48px] pl-[40px] pr-4 rounded-full border-none bg-[#F2F4F6] dark:bg-zinc-800 text-[14px] font-normal text-[#434653] dark:text-zinc-200 placeholder-[#434653] focus:outline-none focus:ring-1 focus:ring-[#002d62]"
            />
          </div>
        </div>

        <div className="border-b border-slate-100 dark:border-zinc-800/80" />

        {/* Content Types Grid */}
        <div className="space-y-6">
          <h3 className="text-base font-extrabold text-slate-800 dark:text-zinc-200">
            Available Content Types
          </h3>

          {displayedContentTypes.length === 0 ? (
            <div className="bg-slate-50/50 dark:bg-zinc-950/20 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-6 text-center text-xs font-bold text-slate-400">
              No content types found. Click "Add Content Type" above to create one.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {displayedContentTypes.map((type) => (
                <div
                  key={type.code}
                  className="flex items-center justify-between bg-[#f4f7f9] dark:bg-zinc-800/60 rounded-2xl p-2 pr-3 shadow-sm transition-colors gap-2"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span
                      className="bg-white dark:bg-zinc-900 text-[#002d62] dark:text-blue-450 text-[10px] font-black px-3 py-2 rounded-xl min-w-[64px] max-w-[100px] text-center uppercase shrink-0 border border-slate-100/50 dark:border-zinc-800 shadow-sm truncate"
                      title={type.code}
                    >
                      {type.code}
                    </span>
                    <span
                      className="font-bold text-xs text-slate-850 dark:text-zinc-150 truncate"
                      title={type.name}
                    >
                      {type.name}
                    </span>
                  </div>
                  <button
                    onClick={() => openEditModal(type)}
                    className="bg-[#0c1a30] hover:bg-[#1e2f4a] text-white text-[11px] font-extrabold px-4 py-1.5 rounded-lg cursor-pointer transition-colors shrink-0"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal Backdrop & Container */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-[24px] border border-slate-100 dark:border-zinc-800/80 w-full max-w-md p-6 shadow-2xl relative space-y-6 mx-4 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-50 dark:border-zinc-850 pb-4">
              <h2 className="text-base font-extrabold text-[#002d62] dark:text-blue-450">
                {modalMode === "add" ? "Add New Content Type" : "Edit Content Type"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-350 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-550 tracking-wider uppercase">
                  ENTER DESCRIPTION
                </label>
                <input
                  type="text"
                  placeholder="Brochures"
                  value={typeName}
                  onChange={handleNameChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 text-xs font-semibold text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#002d62]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-550 tracking-wider uppercase">
                    CODE
                  </label>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500">
                    {typeCode.length}/6 characters
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="BROCHE"
                  value={typeCode}
                  maxLength={6}
                  onChange={(e) => setTypeCode(e.target.value)}
                  disabled={modalMode === "edit"}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-slate-50/80 dark:bg-zinc-950/60 text-xs font-semibold text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#002d62] disabled:opacity-60 disabled:cursor-not-allowed uppercase"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-50 dark:border-zinc-850">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-extrabold text-slate-550 dark:text-zinc-450 hover:text-slate-750 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#002d62] hover:bg-[#063669] text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer"
                >
                  {modalMode === "add" ? "Add Content Type" : "Update Content Type"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Save Changes Success Modal */}
      {isSaveSuccessModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-[32px] border border-slate-100 dark:border-zinc-800/80 w-full max-w-[400px] p-8 shadow-2xl relative text-center space-y-6 mx-4 animate-in zoom-in-95 duration-200">
            {/* Checkmark Icon Container */}
            <div className="flex justify-center">
              <div className="relative w-16 h-16 rounded-full bg-[#002d62] flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <Check className="w-8 h-8 stroke-[3]" />

                {/* Small teal decorative dots to match Figma */}
                <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#34d399] border-2 border-white dark:border-zinc-900 -translate-y-1/3 translate-x-1/3" />
                <span className="absolute bottom-2 left-0 w-1.5 h-1.5 rounded-full bg-[#34d399] -translate-x-2" />
              </div>
            </div>

            {/* Heading */}
            <h3 className="text-xl font-extrabold text-[#002d62] dark:text-zinc-150 tracking-tight px-4">
              Changes Saved Successfully
            </h3>

            {/* Subtext */}
            <p className="text-[11px] text-slate-450 dark:text-zinc-550 font-medium leading-relaxed max-w-[280px] mx-auto">
              <span className="font-extrabold text-slate-700 dark:text-zinc-350">Content Types</span>{" "}
              <span className="italic text-slate-450 dark:text-zinc-500">Changes have been securely applied to</span>{" "}
              <span className="font-extrabold text-slate-700 dark:text-zinc-350">{selectedProjectLabel}</span>.{" "}
              <span className="italic text-slate-450 dark:text-zinc-500">You'll be redirected to Home Page in just a moment.</span>
            </p>

            {/* Return to Home Button */}
            <div className="flex justify-center w-full pt-2">
              <button
                onClick={handleRedirectToContentHome}
                className="bg-[#1a365d] hover:bg-[#2a4365] text-white text-xs font-black tracking-wider py-3.5 px-8 rounded-full transition-colors cursor-pointer w-full max-w-[240px] shadow-sm uppercase"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};