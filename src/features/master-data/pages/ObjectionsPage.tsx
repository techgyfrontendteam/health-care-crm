import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Search, Check, X } from "lucide-react";
import { toast } from "sonner";
import { useCreateObjectionsMutation, useUpdateObjectionsMutation } from "../api/manageMasterDataSlice";
import { useMasterDataLookup } from "../../../shared/hooks/useMasterDataLookup";

interface LocalObjection {
  id: number | string;
  code: string;
  name: string;
}

export const ObjectionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [createObjections] = useCreateObjectionsMutation();
  const [updateObjections] = useUpdateObjectionsMutation();
  const { masterData } = useMasterDataLookup();

  const [globalObjections, setGlobalObjections] = useState<LocalObjection[]>([]);

  useEffect(() => {
    if (masterData?.objections) {
      const apiObjections = masterData.objections.map((o: any) => ({
        id: o.id,
        code: o.code,
        name: o.description || o.code,
      }));
      setGlobalObjections(apiObjections);
    }
  }, [masterData]);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingObjectionId, setEditingObjectionId] = useState<number | string | null>(null);
  const [objectionName, setObjectionName] = useState("");
  const [objectionCode, setObjectionCode] = useState("");

  // Open Modal for adding
  const openAddModal = () => {
    setModalMode("add");
    setObjectionName("");
    setObjectionCode("");
    setEditingObjectionId(null);
    setIsModalOpen(true);
  };

  // Open Modal for editing global objection
  const openEditModal = (obj: LocalObjection) => {
    setModalMode("edit");
    setEditingObjectionId(obj.id);
    setObjectionName(obj.name);
    setObjectionCode(obj.code);
    setObjCodeToEdit(obj.code);
    setIsModalOpen(true);
  };

  const [objCodeToEdit, setObjCodeToEdit] = useState("");

  // Handle Add/Edit Form Submit
  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!objectionName.trim() || !objectionCode.trim()) {
      toast.error("Please fill in both fields");
      return;
    }

    const cleanCode = objectionCode.trim().toUpperCase();

    try {
      if (modalMode === "add") {
        if (globalObjections.some((o) => o.code === cleanCode)) {
          toast.error(`Objection code "${cleanCode}" already exists.`);
          return;
        }

        await createObjections({
          code: cleanCode,
          description: objectionName.trim(),
          user_id: null
        }).unwrap();

        toast.success("Objection added successfully.");
      } else {
        if (editingObjectionId === null) {
          toast.error("Invalid objection ID.");
          return;
        }

        // Check if the user changed the code to something that already exists
        if (cleanCode !== objCodeToEdit && globalObjections.some((o) => o.code === cleanCode)) {
          toast.error(`Objection code "${cleanCode}" already exists.`);
          return;
        }

        await updateObjections({
          id: editingObjectionId as number,
          code: cleanCode,
          description: objectionName.trim(),
          user_id: null
        }).unwrap();

        setGlobalObjections(
          globalObjections.map((o) =>
            o.id === editingObjectionId ? { ...o, name: objectionName.trim(), code: cleanCode } : o
          )
        );
        toast.success("Objection updated successfully.");
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
  const displayedObjections = useMemo(() => {
    return globalObjections.filter((o) =>
      o.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [globalObjections, searchQuery]);

  return (
    <div className="w-full max-w-[1440px] xl:max-w-[1920px] 2xl:max-w-[2560px] mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-6 animate-in fade-in duration-300 relative">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/master-data")}
          className="flex items-center gap-[8px] font-['Plus_Jakarta_Sans'] font-bold text-[24px] leading-[28px] tracking-[-0.5px] text-[#001549] dark:text-blue-400 hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-0 h-[44px]"
        >
          <ArrowLeft className="w-6 h-6 text-[#001549] dark:text-blue-400" />
          Objections
        </button>

        <button
          onClick={openAddModal}
          className="bg-[#002d62] hover:bg-[#063669] text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Add New Objection
        </button>
      </div>

      {/* Main Container Card */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-3xl p-6 xl:p-8 shadow-sm space-y-6">
        {/* Filters Row */}
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-zinc-200">
            Active Objections
          </h3>

          {/* Search Input */}
          <div className="relative w-full sm:w-[401px]">
            <Search className="absolute left-[16px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#434653]" />
            <input
              type="text"
              placeholder="Search Objections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[48px] pl-[40px] pr-4 rounded-full border-none bg-[#F2F4F6] dark:bg-zinc-800 text-[14px] font-normal text-[#434653] dark:text-zinc-200 placeholder-[#434653] focus:outline-none focus:ring-1 focus:ring-[#002d62]"
            />
          </div>
        </div>

        <div className="border-b border-slate-100 dark:border-zinc-800/80" />

        {/* Objections List Area */}
        <div className="space-y-4">
          {displayedObjections.length === 0 ? (
            <div className="bg-slate-50/50 dark:bg-zinc-950/20 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-6 text-center text-xs font-bold text-slate-400">
              No objections found. Click "Add New Objection" above to create one.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedObjections.map((obj) => (
                <div
                  key={obj.id}
                  className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/60 rounded-2xl px-6 py-4 shadow-sm transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1 mr-2">
                    <span className="bg-[#f0f4f8] dark:bg-zinc-800 text-[#002d62] dark:text-blue-450 text-[10px] font-black px-2.5 py-1 rounded-[6px] min-w-[64px] max-w-[80px] truncate text-center uppercase shrink-0" title={obj.code}>
                      {obj.code}
                    </span>
                    <span className="font-bold text-sm text-slate-850 dark:text-zinc-150 truncate" title={obj.name}>
                      {obj.name}
                    </span>
                  </div>
                  <button
                    onClick={() => openEditModal(obj)}
                    className="bg-[#0c1a30] hover:bg-slate-800 text-white text-[11px] font-extrabold px-4 py-1.5 rounded-lg cursor-pointer transition-colors mr-1 shrink-0"
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
                {modalMode === "add" ? "Add New Objection" : "Edit Objection"}
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
                  DESCRIPTION
                </label>
                <input
                  type="text"
                  placeholder="Enter objection description..."
                  value={objectionName}
                  onChange={(e) => setObjectionName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 text-xs font-semibold text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#002d62]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-550 tracking-wider uppercase">
                    CODE
                  </label>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500">
                    {objectionCode.length}/6 characters
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="BUDGET"
                  value={objectionCode}
                  maxLength={6}
                  onChange={(e) => setObjectionCode(e.target.value)}
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
                  {modalMode === "add" ? "Add objection" : "Update Objection"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
