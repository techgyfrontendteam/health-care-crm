import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Search, ChevronDown, Check, X } from "lucide-react";
import { toast } from "sonner";
import type { Status } from "../data/masterData";
import { useCreateLeadStatusMutation, useCreateProjectWiseLeadStatusMutation, useUpdateLeadStatusMutation } from "../api/manageMasterDataSlice";
import { useMasterDataLookup } from "../../../shared/hooks/useMasterDataLookup";

export const LeadStatusesPage: React.FC = () => {
  const navigate = useNavigate();
  const [createLeadStatus] = useCreateLeadStatusMutation();
  const [updateLeadStatus] = useUpdateLeadStatusMutation();
  const [createProjectWiseLeadStatus] = useCreateProjectWiseLeadStatusMutation();
  const { masterData, projectLeadStatuses } = useMasterDataLookup();

  // State initialized from the dynamic data file
  const projects = useMemo(() => {
    if (!masterData?.projects) return [];
    return masterData.projects.map((p: any) => ({
      id: String(p.id),
      name: p.description || p.code,
    }));
  }, [masterData]);

  const [globalStatuses, setGlobalStatuses] = useState<Status[]>([]);

  // Sync global statuses from API
  useEffect(() => {
    if (masterData?.lead_statuses) {
      const apiStatuses = masterData.lead_statuses.map((s: any) => ({
        code: s.code,
        name: s.description || s.code,
        id: s.id,
        is_editable: s.is_editable,
      }));
      setGlobalStatuses(apiStatuses);
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

  // Draft IDs (numeric, unique) for statuses added by user but not yet saved
  const [tempSelectedIds, setTempSelectedIds] = useState<number[]>([]);

  // Derive the backend-saved statuses for the selected project directly from API data
  const backendSelectedStatuses = useMemo(() => {
    if (!selectedProjectId || !projectLeadStatuses || !globalStatuses.length) return [];
    const projectEntry = projectLeadStatuses.find(
      (p: any) => String(p.project_id) === selectedProjectId
    );
    if (!projectEntry || !Array.isArray(projectEntry.status)) return [];
    // projectEntry.status is already converted: [{ id, lead_status_id, description }]
    const backendIds = projectEntry.status.map((s: any) => s.lead_status_id);
    return (globalStatuses as any[]).filter((gs) => backendIds.includes(gs.id));
  }, [selectedProjectId, projectLeadStatuses, globalStatuses]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingStatusCode, setEditingStatusCode] = useState<string>("");
  const [editingStatusId, setEditingStatusId] = useState<number | null>(null);
  const [statusName, setStatusName] = useState("");
  const [statusCode, setStatusCode] = useState("");

  // UI Notification State
  // (Replaced custom toast with sonner)

  // Success Modal State after Save Changes
  const [isSaveSuccessModalOpen, setIsSaveSuccessModalOpen] = useState(false);

  // Clear drafts when selected project changes
  useEffect(() => {
    setTempSelectedIds([]);
  }, [selectedProjectId]);

  // Timer for automatic redirect after 3 seconds when success modal is open
  useEffect(() => {
    let timer: any;
    if (isSaveSuccessModalOpen) {
      timer = setTimeout(() => {
        handleRedirectToLeadStatus();
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isSaveSuccessModalOpen]);

  const handleRedirectToLeadStatus = () => {
    setIsSaveSuccessModalOpen(false);
    setSelectedProjectId(""); // Clears selected project so page returns to default state (first image)
    navigate("/master-data/lead-statuses");
  };

  // Removed custom showToast in favor of sonner
  // Find label of active project
  const selectedProjectLabel = useMemo(() => {
    const proj = projects.find((p) => p.id === selectedProjectId);
    return proj ? proj.name : "Select Project";
  }, [selectedProjectId, projects]);

  // Handle Name change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatusName(e.target.value);
  };

  // Open Modal for adding
  const openAddModal = () => {
    setModalMode("add");
    setStatusName("");
    setStatusCode("");
    setEditingStatusId(null);
    setIsModalOpen(true);
  };

  // Open Modal for editing global status
  const openEditModal = (status: Status) => {
    setModalMode("edit");
    setEditingStatusCode(status.code);
    setEditingStatusId(status.id as number);
    setStatusName(status.name);
    setStatusCode(status.code);
    setIsModalOpen(true);
  };

  // Handle Add/Edit Form Submit
  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusName.trim() || !statusCode.trim()) {
      toast.error("Please fill in both fields");
      return;
    }

    const cleanCode = statusCode.trim().toUpperCase();

    try {
      if (modalMode === "add") {
        // Check duplicate code
        if (globalStatuses.some((s) => s.code === cleanCode)) {
          toast.error(`Status code "${cleanCode}" already exists.`);
          return;
        }

        await createLeadStatus({
          code: cleanCode,
          description: statusName.trim(),
          user_id: null
        }).unwrap();

        toast.success(`Status "${statusName}" added successfully.`);
      } else {
        // Edit mode
        if (editingStatusId === null) {
          toast.error("Invalid status ID.");
          return;
        }

        // Check if the user changed the code to something that already exists
        if (cleanCode !== editingStatusCode && globalStatuses.some((s) => s.code === cleanCode)) {
          toast.error(`Status code "${cleanCode}" already exists.`);
          return;
        }

        await updateLeadStatus({
          id: editingStatusId,
          code: cleanCode,
          description: statusName.trim(),
          user_id: null
        }).unwrap();

        setGlobalStatuses(
          globalStatuses.map((s) =>
            s.id === editingStatusId ? { ...s, name: statusName.trim(), code: cleanCode } : s
          )
        );
        toast.success("Status updated successfully.");
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

  // Handle Project funnel changes (Add status to selected project)
  const handleAddStatusToProject = (id: number) => {
    if (!tempSelectedIds.includes(id)) {
      setTempSelectedIds([...tempSelectedIds, id]);
    }
  };

  // Handle Project funnel changes (Remove status from selected project)
  const handleRemoveStatusFromProject = (id: number) => {
    setTempSelectedIds(tempSelectedIds.filter((i) => i !== id));
  };

  // Save changes to project statuses map via backend
  const handleSaveChanges = async () => {
    if (!selectedProjectId || tempSelectedIds.length === 0) return;

    try {
      await createProjectWiseLeadStatus({
        project_id: Number(selectedProjectId),
        lead_status_id: tempSelectedIds,
        user_id: null
      }).unwrap();

      setIsSaveSuccessModalOpen(true);
      setTempSelectedIds([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save some statuses");
    }
  };

  // Computed data lists
  // 1. Selected statuses: backend-saved + frontend drafts
  const displayedSelectedStatuses = useMemo(() => {
    if (!selectedProjectId) return [];
    const draftStatuses = (globalStatuses as any[]).filter((s) =>
      tempSelectedIds.includes(s.id)
    );
    const combined = [...backendSelectedStatuses, ...draftStatuses];
    return combined.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedProjectId, backendSelectedStatuses, tempSelectedIds, globalStatuses, searchQuery]);

  // 2. Available statuses:
  // - If NO project selected: all global statuses.
  // - If project IS selected: global statuses NOT in backend-saved and NOT in draft ids.
  const displayedAvailableStatuses = useMemo(() => {
    const backendIds = backendSelectedStatuses.map((s: any) => s.id);
    return (globalStatuses as any[])
      .filter((s) => {
        if (!selectedProjectId) return true;
        return !backendIds.includes(s.id) && !tempSelectedIds.includes(s.id);
      })
      .filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [selectedProjectId, backendSelectedStatuses, tempSelectedIds, globalStatuses, searchQuery]);

  const hasChanges = useMemo(() => {
    return tempSelectedIds.length > 0;
  }, [tempSelectedIds]);

  return (
    <div className="w-full max-w-[1440px] xl:max-w-[1920px] 2xl:max-w-[2560px] mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-6 animate-in fade-in duration-300 relative">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/master-data")}
          className="flex items-center gap-[8px] font-['Plus_Jakarta_Sans'] font-bold text-[24px] leading-[28px] tracking-[-0.5px] text-[#001549] dark:text-blue-400 hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-0 h-[44px]"
        >
          <ArrowLeft className="w-6 h-6 text-[#001549] dark:text-blue-400" />
          Lead Statuses
        </button>

        <button
          onClick={openAddModal}
          disabled={!!selectedProjectId}
          className="bg-[#001549] hover:bg-[#001549]/90 text-white px-[24px] py-[12px] gap-[8px] rounded-full w-[192.67px] h-[48px] font-['Inter'] font-semibold text-[16px] leading-[24px] transition-all shadow-sm cursor-pointer flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-[11.67px] h-[11.67px] text-white shrink-0" />
          <span className="w-[125px] h-[24px] flex items-center justify-center text-center shrink-0">
            Add New Status
          </span>
        </button>
      </div>

      {/* Main Container Card */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-3xl p-6 xl:p-8 shadow-sm space-y-6">
        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Project Dropdown */}
          <div className="flex items-center gap-[16px] relative z-20">
            <span className="font-['Inter'] font-bold text-[14px] leading-[24px] tracking-[1.6px] uppercase text-[rgba(0,21,73,0.6)] flex items-center w-[76px] h-[24px]">
              PROJECT
            </span>
            <div className="relative">
              <button
                onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                className="flex items-center justify-between bg-[#F2F4F6] dark:bg-zinc-850 hover:bg-slate-200/40 border border-slate-200/20 px-[24px] rounded-[8px] w-[287px] h-[48px] font-['Inter'] font-semibold text-[16px] leading-[24px] text-[#063669] dark:text-blue-400 transition-colors shadow-sm cursor-pointer"
              >
                <span>{selectedProjectLabel}</span>
                <ChevronDown className="w-5 h-5 text-[#063669] dark:text-blue-400" />
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
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${selectedProjectId === "" ? "bg-blue-600" : "bg-slate-300"
                        }`}
                    />
                    Select Project (All Statuses)
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
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${selectedProjectId === p.id ? "bg-blue-600" : "bg-slate-350"
                          }`}
                      />
                      {p.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Statuses */}
          <div className="relative w-full sm:w-[401px]">
            <Search className="absolute left-[16px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#434653]" />
            <input
              type="text"
              placeholder="Search Statuses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[48px] pl-[40px] pr-4 rounded-full border-none bg-[#F2F4F6] dark:bg-zinc-800 text-[14px] font-normal text-[#434653] dark:text-zinc-200 placeholder-[#434653] focus:outline-none focus:ring-1 focus:ring-[#002d62]"
            />
          </div>
        </div>

        <div className="border-b border-slate-100 dark:border-zinc-800/80" />

        {/* Selected Statuses Area (Only shown when project is selected) */}
        {selectedProjectId && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-[18px] leading-[27px] font-semibold text-[#191C1E] dark:text-zinc-200">
                  Selected Statuses
                </h3>
                <p className="font-['Inter'] text-[14px] leading-[21px] font-normal text-[#575E70] dark:text-zinc-400 mt-1">
                  Statuses currently enabled for <span className="font-bold">{selectedProjectLabel}</span>
                </p>
              </div>

              <button
                disabled={!hasChanges}
                onClick={handleSaveChanges}
                className="bg-[#002d62] hover:bg-[#063669] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>

            {displayedSelectedStatuses.length === 0 ? (
              <div className="bg-slate-50/50 dark:bg-zinc-950/20 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-6 text-center text-xs font-bold text-slate-400">
                No statuses currently enabled. Click "Add" below to add a status to this project.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {displayedSelectedStatuses.map((status: any) => (
                  <div
                    key={status.code}
                    className="flex items-center justify-between bg-slate-50 dark:bg-zinc-900/50 border border-slate-100/50 dark:border-zinc-800/85 rounded-2xl px-4 min-h-[66px] py-3 w-full transition-colors"
                  >
                    <div className="flex items-center gap-3 w-[calc(100%-60px)]">
                      <span className="bg-white dark:bg-zinc-800 text-[#002d62] dark:text-blue-400 border border-slate-200 dark:border-zinc-700 text-[11px] font-bold px-3 py-1.5 rounded-lg min-w-[64px] text-center uppercase shrink-0 shadow-sm">
                        {status.code}
                      </span>
                      <span className="font-semibold text-sm text-[#001549] dark:text-zinc-150 break-words line-clamp-2">
                        {status.name}
                      </span>
                    </div>
                    {/* Only show Remove for draft (not yet saved) statuses */}
                    {tempSelectedIds.includes(status.id) && (
                      <button
                        onClick={() => handleRemoveStatusFromProject(status.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-extrabold cursor-pointer transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="border-b border-slate-100 dark:border-zinc-800/80 pt-2" />
          </div>
        )}

        {/* Available Statuses Area */}
        <div className="space-y-4">
          <div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-[18px] leading-[27px] font-semibold text-[#191C1E] dark:text-zinc-200">
              {selectedProjectId ? "Available Statuses" : "Available Statuses"}
            </h3>
            {selectedProjectId && (
              <p className="font-['Inter'] text-[14px] leading-[21px] font-normal text-[#575E70] dark:text-zinc-400 mt-1">
                Global statuses not yet added to this project funnel.
              </p>
            )}
          </div>

          {displayedAvailableStatuses.length === 0 ? (
            <div className="bg-slate-50/50 dark:bg-zinc-950/20 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-6 text-center text-xs font-bold text-slate-400">
              No statuses found. Click "Add New Status" above to create one.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {displayedAvailableStatuses.map((status) => (
                <div
                  key={status.code}
                  className="flex items-center justify-between bg-slate-50 dark:bg-zinc-900/50 hover:bg-slate-100/60 dark:hover:bg-zinc-800/40 border border-slate-100/50 dark:border-zinc-800/80 rounded-2xl px-4 min-h-[66px] py-3 w-full transition-colors"
                >
                  <div className="flex items-center gap-3 w-[calc(100%-60px)]">
                    <span className="bg-white dark:bg-zinc-800 text-[#002d62] dark:text-blue-400 border border-slate-200 dark:border-zinc-700 text-[11px] font-bold px-3 py-1.5 rounded-lg min-w-[64px] text-center uppercase shrink-0 shadow-sm">
                      {status.code}
                    </span>
                    <span className="font-bold text-sm text-slate-800 dark:text-zinc-150 break-words line-clamp-2">
                      {status.name}
                    </span>
                  </div>
                  {selectedProjectId ? (
                    <button
                      onClick={() => handleAddStatusToProject((status as any).id)}
                      className="bg-[#0c1a30] hover:bg-slate-800 text-white text-[11px] font-extrabold px-4 py-1.5 rounded-lg cursor-pointer transition-colors"
                    >
                      Add
                    </button>
                  ) : (
                    <button
                      onClick={() => openEditModal(status)}
                      disabled={status.is_editable === 0}
                      className={`bg-[#0c1a30] text-white text-[11px] font-extrabold px-4 py-1.5 rounded-lg transition-colors ${
                        status.is_editable === 0
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-slate-800 cursor-pointer"
                      }`}
                    >
                      Edit
                    </button>
                  )}
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
              <h2 className="text-[18px] font-bold text-[#00236F] dark:text-blue-400">
                {modalMode === "add" ? "Add New Status" : "Edit Status"}
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
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 tracking-wider uppercase">
                    {modalMode === "edit" ? "EDIT STATUS" : "ENTER STATUS"}
                  </label>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500">
                    {statusName.length}/15 characters
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="New Lead"
                  value={statusName}
                  maxLength={15}
                  onChange={handleNameChange}
                  className="w-full h-[48px] px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 text-[14px] font-semibold text-[#00236F] dark:text-blue-400 focus:outline-none focus:ring-1 focus:ring-[#002d62]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 tracking-wider uppercase">
                    CODE
                  </label>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500">
                    {statusCode.length}/6 characters
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="NLEAD"
                  value={statusCode}
                  maxLength={6}
                  onChange={(e) => setStatusCode(e.target.value)}
                  disabled={modalMode === "edit"}
                  className="w-full h-[48px] px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-[#F4F3FA] dark:bg-zinc-950/60 text-[14px] font-semibold text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#002d62] disabled:opacity-60 disabled:cursor-not-allowed uppercase"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-50 dark:border-zinc-850">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-2 py-1 text-base font-medium text-[#002d62] hover:text-[#063669] dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-[175px] h-[44px] bg-[#002d62] hover:bg-[#063669] text-white rounded-xl text-base font-semibold transition-all cursor-pointer shadow-sm flex items-center justify-center"
                >
                  {modalMode === "add" ? "Add New Status" : "Update Status"}
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

                {/* Small teal decorative dots to match Figma/Image 3 */}
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
              <span className="font-extrabold text-slate-700 dark:text-zinc-350">Lead Statuses</span>{" "}
              <span className="italic text-slate-400 dark:text-zinc-500">Changes have been securely applied to</span>{" "}
              <span className="font-extrabold text-slate-700 dark:text-zinc-350">{selectedProjectLabel}</span>.{" "}
              <span className="italic text-slate-400 dark:text-zinc-500">You'll be redirected to your Home Page in just a moment.</span>
            </p>

            {/* Return to Home Button */}
            <div className="flex justify-center w-full pt-2">
              <button
                onClick={handleRedirectToLeadStatus}
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
