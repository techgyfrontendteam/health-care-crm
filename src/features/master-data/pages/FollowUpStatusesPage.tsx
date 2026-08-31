import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Search, ChevronDown, Check, X } from "lucide-react";
import { toast } from "sonner";
import type { FollowUpStatus } from "../data/masterData";
import { useCreateLeadFollowUpTypeMutation, useUpdateLeadFollowUpTypeMutation } from "../api/manageMasterDataSlice";
import { useMasterDataLookup } from "../../../shared/hooks/useMasterDataLookup";

export const FollowUpStatusesPage: React.FC = () => {
  const navigate = useNavigate();
  const [createLeadFollowUpType] = useCreateLeadFollowUpTypeMutation();
  const [updateLeadFollowUpType] = useUpdateLeadFollowUpTypeMutation();
  const { masterData } = useMasterDataLookup();

  const [globalStatuses, setGlobalStatuses] = useState<FollowUpStatus[]>([]);

  useEffect(() => {
    if (masterData?.lead_followup_types) {
      const apiStatuses = masterData.lead_followup_types.map((t: any) => ({
        code: t.code,
        name: t.description || t.code,
        id: t.id,
      }));
      setGlobalStatuses(apiStatuses);
    }
  }, [masterData]);

  const [searchQuery, setSearchQuery] = useState("");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingStatusCode, setEditingStatusCode] = useState<string>("");
  const [editingTypeId, setEditingTypeId] = useState<number | null>(null);
  const [statusName, setStatusName] = useState("");
  const [statusCode, setStatusCode] = useState("");

  // Success Modal State after Save Changes
  const [isSaveSuccessModalOpen, setIsSaveSuccessModalOpen] = useState(false);

  // Timer for automatic redirect after 3 seconds when success modal is open
  useEffect(() => {
    let timer: any;
    if (isSaveSuccessModalOpen) {
      timer = setTimeout(() => {
        handleRedirectToHome();
      }, 3000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isSaveSuccessModalOpen]);

  const handleRedirectToHome = () => {
    setIsSaveSuccessModalOpen(false);
    navigate("/master-data/follow-up-statuses");
  };

  // Handle Name change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatusName(e.target.value);
  };

  // Open Modal for adding
  const openAddModal = () => {
    setModalMode("add");
    setStatusName("");
    setStatusCode("");
    setEditingTypeId(null);
    setIsModalOpen(true);
  };

  // Open Modal for editing global status
  const openEditModal = (status: any) => {
    setModalMode("edit");
    setEditingStatusCode(status.code);
    setEditingTypeId(status.id);
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
    const cleanName = statusName.trim();

    try {
      if (modalMode === "add") {
        if (globalStatuses.some((s) => s.code.toUpperCase() === cleanCode)) {
          toast.error(`Type code "${cleanCode}" already exists.`);
          return;
        }
        if (globalStatuses.some((s) => s.name.trim().toLowerCase() === cleanName.toLowerCase())) {
          toast.error(`Type name "${cleanName}" already exists.`);
          return;
        }

        await createLeadFollowUpType({
          code: cleanCode,
          description: cleanName,
          user_id: null
        }).unwrap();

        toast.success(`Type "${cleanName}" added successfully.`);
      } else {
        if (!editingTypeId) {
          toast.error("Invalid follow-up type ID.");
          return;
        }

        await updateLeadFollowUpType({
          id: editingTypeId,
          code: cleanCode,
          description: cleanName,
          user_id: null
        }).unwrap();

        setGlobalStatuses(
          globalStatuses.map((s) =>
            s.code === editingStatusCode ? { ...s, name: statusName.trim(), code: cleanCode } : s
          )
        );
        toast.success("Type updated successfully.");
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

  // Computed data lists
  const displayedStatuses = useMemo(() => {
    return globalStatuses.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [globalStatuses, searchQuery]);

  return (
    <div className="w-full max-w-[1440px] xl:max-w-[1920px] 2xl:max-w-[2560px] mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-6 animate-in fade-in duration-300 relative">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/master-data")}
          className="flex items-center gap-[8px] font-['Plus_Jakarta_Sans'] font-bold text-[24px] leading-[28px] tracking-[-0.5px] text-[#001549] dark:text-blue-400 hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-0 h-[44px]"
        >
          <ArrowLeft className="w-6 h-6 text-[#001549] dark:text-blue-400" />
          Lead Follow-up Types
        </button>

        <button
          onClick={openAddModal}
          className="bg-[#002d62] hover:bg-[#063669] text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Add New Type
        </button>
      </div>

      {/* Main Container Card */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-3xl p-6 xl:p-8 shadow-sm space-y-6">
        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:w-[401px]">
            <Search className="absolute left-[16px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#434653]" />
            <input
              type="text"
              placeholder="Search Lead Follow-up Types..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[48px] pl-[40px] pr-4 rounded-full border-none bg-[#F2F4F6] dark:bg-zinc-800 text-[14px] font-normal text-[#434653] dark:text-zinc-200 placeholder-[#434653] focus:outline-none focus:ring-1 focus:ring-[#002d62]"
            />
          </div>
        </div>

        <div className="border-b border-slate-100 dark:border-zinc-800/80" />

        {/* Available Statuses Area */}
        <div className="space-y-6">
          <h3 className="text-base font-extrabold text-slate-800 dark:text-zinc-200">
            Available Follow-up Types
          </h3>

          {displayedStatuses.length === 0 ? (
            <div className="bg-slate-50/50 dark:bg-zinc-950/20 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-6 text-center text-xs font-bold text-slate-400">
              No follow-up types found. Click "Add New Type" above to create one.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {displayedStatuses.map((status) => (
                <div
                  key={status.code}
                  className="flex items-center justify-between bg-[#f4f7f9] dark:bg-zinc-800/60 rounded-2xl p-2 pr-3 shadow-sm transition-colors gap-2"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span 
                      className="bg-white dark:bg-zinc-900 text-[#002d62] dark:text-blue-450 text-[10px] font-black px-3 py-2 rounded-xl min-w-[64px] max-w-[100px] text-center uppercase shrink-0 border border-slate-100/50 dark:border-zinc-800 shadow-sm truncate"
                      title={status.code}
                    >
                      {status.code}
                    </span>
                    <span 
                      className="font-bold text-xs text-slate-850 dark:text-zinc-150 truncate"
                      title={status.name}
                    >
                      {status.name}
                    </span>
                  </div>
                  <button
                    onClick={() => openEditModal(status)}
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
                {modalMode === "add" ? "Add New Type" : "Edit Type"}
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
                  ENTER TYPE
                </label>
                <input
                  type="text"
                  placeholder="New Lead"
                  value={statusName}
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
                  {modalMode === "add" ? "Add New Type" : "Update Type"}
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
              <span className="font-extrabold text-slate-700 dark:text-zinc-350">Lead Follow-up Types</span>{" "}
              <span className="italic text-slate-455 dark:text-zinc-500">Changes have been securely applied.</span>{" "}
              <span className="italic text-slate-455 dark:text-zinc-500">You'll be redirected to Home Page in just a moment.</span>
            </p>

            {/* Return to Home Button */}
            <div className="flex justify-center w-full pt-2">
              <button
                onClick={handleRedirectToHome}
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
