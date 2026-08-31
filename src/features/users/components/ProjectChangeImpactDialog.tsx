import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Search, AlertTriangle, X, Info } from "lucide-react";
import { useBulkAssignLeadsToRmMutation, useGetAllProjectEmAndRmDataQuery } from "../../leads/api/leadsApi";
import { useMasterDataLookup } from "../../../shared/hooks/useMasterDataLookup";
import { cn } from "../../../utils";
import { toast } from "sonner";

interface ProjectChangeImpactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentRmId: number;
  currentRmName: string;
  currentProjectId: number;
  newProjectId: number;
  activeLeads: any[];
}

export const ProjectChangeImpactDialog: React.FC<ProjectChangeImpactDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  currentRmId,
  currentRmName,
  currentProjectId,
  newProjectId,
  activeLeads,
}) => {
  const { getProjectLabel, ems: emUsers = [] } = useMasterDataLookup();
  const { data: projectRmEm = [] } = useGetAllProjectEmAndRmDataQuery();

  // State for search and dropdown
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRm, setSelectedRm] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Bulk assign mutation
  const [bulkAssignRM, { isLoading: isAssigning }] = useBulkAssignLeadsToRmMutation();

  // Create an EM lookup map
  const emMap = useMemo(() => {
    const map: Record<number, string> = {};
    emUsers.forEach((u: any) => {
      map[u.id] = `${u.first_name || ""} ${u.last_name || ""}`.trim();
    });
    return map;
  }, [emUsers]);

  // Filter target RMs (exclude current RM, and only show those assigned to the newly selected project in the project-wise API)
  const targetRms = useMemo(() => {
    const projectEntry = projectRmEm.find((p) => Number(p.project_id) === Number(newProjectId));
    const projectRms = projectEntry?.rm_data || [];
    return projectRms.filter((rm: any) => Number(rm.id) !== Number(currentRmId));
  }, [projectRmEm, newProjectId, currentRmId]);

  // Filter RMs by search query
  const filteredRms = useMemo(() => {
    if (!searchQuery) return targetRms;
    const query = searchQuery.toLowerCase();
    return targetRms.filter((rm: any) => {
      const name = `${rm.rm_first_name || ""} ${rm.rm_last_name || ""}`.toLowerCase();
      return name.includes(query);
    });
  }, [targetRms, searchQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelectRm = (rm: any) => {
    setSelectedRm(rm);
    setSearchQuery(`${rm.rm_first_name} ${rm.rm_last_name}`);
    setIsDropdownOpen(false);
  };

  const handleReassignAndConfirm = async () => {
    if (!selectedRm) {
      toast.error("Please select a Sales Head to reassign the leads to.");
      return;
    }

    try {
      const leadUuids = activeLeads.map((lead) => lead.uuid);

      // Call bulk assign endpoint
      await bulkAssignRM({
        lead_uuids: leadUuids,
        assigned_to_rm: selectedRm.id,
      }).unwrap();

      toast.success(`Successfully reassigned leads to ${selectedRm.rm_first_name} ${selectedRm.rm_last_name}`);

      // Trigger update/confirm flow in parent
      onConfirm();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to reassign leads.");
    }
  };

  const currentProjectName = getProjectLabel(currentProjectId);
  const newProjectName = getProjectLabel(newProjectId);

  const getInitials = (first?: string, last?: string) => {
    return `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();
  };

  const avatarColors = [
    "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
    "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
    "bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300",
    "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300",
    "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-[640px] w-full overflow-hidden flex flex-col p-6 gap-6 border-none shadow-3xl bg-white dark:bg-zinc-950 rounded-[28px] animate-in fade-in duration-200"
        style={{ maxWidth: "640px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <DialogTitle className="text-lg font-black text-slate-800 dark:text-zinc-100 tracking-tight">
            Project Change Impact
          </DialogTitle>
        </div>

        {/* Warning/Info Banner */}
        {activeLeads.length > 0 ? (
          <div className="bg-[#FFF9E6] border border-[#FFE8B3] text-[#805B00] rounded-2xl p-4.5 flex gap-3 text-xs font-semibold leading-relaxed">
            <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold capitalize">{currentRmName}</span> has {activeLeads.length} active leads in{" "}
              <span className="font-extrabold">{currentProjectName}</span>. Changing the project to{" "}
              <span className="font-extrabold">{newProjectName}</span> requires reassigning these leads to another sales head.
            </div>
          </div>
        ) : (
          <div className="bg-[#EBF5FF] border border-[#BFDBFE] text-[#1E3A8A] rounded-2xl p-4.5 flex gap-3 text-xs font-semibold leading-relaxed">
            <Info className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold capitalize">{currentRmName}</span> has no active leads in{" "}
              <span className="font-extrabold">{currentProjectName}</span>. You can safely change the project to{" "}
              <span className="font-extrabold">{newProjectName}</span>.
            </div>
          </div>
        )}

        {/* Search RM Input & Dropdown */}
        {activeLeads.length > 0 && (
          <div className="flex items-center gap-3 relative z-[110]" ref={dropdownRef}>
            <label className="text-xs font-bold text-slate-800 dark:text-zinc-300 shrink-0">
              Reassign active leads to:
            </label>
            <div className="relative flex-1 max-w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
              <input
                type="text"
                placeholder="Search sales heads..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);
                  if (selectedRm) setSelectedRm(null);
                }}
                onFocus={() => setIsDropdownOpen(true)}
                onClick={() => setIsDropdownOpen(true)}
                className="w-full pl-8 pr-4 py-1.5 bg-[#f8fafc] dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800 rounded-full text-xs font-medium text-slate-750 dark:text-zinc-350 placeholder-slate-400 dark:placeholder-zinc-550 focus:outline-none focus:border-[#0f3d6b] dark:focus:border-blue-500 transition-all shadow-xs"
              />

              {/* Dropdown Box */}
              {isDropdownOpen && (
                <div className="absolute left-0 right-0 top-[38px] bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-[18px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] max-h-56 overflow-y-auto z-[120] p-2 space-y-0.5 scrollbar-thin">
                  {filteredRms.length === 0 ? (
                    <div className="py-4 text-center text-xs font-bold text-slate-400 dark:text-zinc-500">
                      No sales heads found
                    </div>
                  ) : (
                    filteredRms.map((rm: any) => {
                      const initials = getInitials(rm.rm_first_name, rm.rm_last_name);
                      const avatarBg = avatarColors[rm.id % avatarColors.length];
                      const projLabel = getProjectLabel(newProjectId);

                      return (
                        <div
                          key={rm.id}
                          onClick={() => handleSelectRm(rm)}
                          className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-zinc-300 hover:bg-[#eef2f6]/60 dark:hover:bg-zinc-800/60 cursor-pointer py-2 px-2.5 rounded-xl transition-all"
                        >
                          <div className="flex items-center gap-2">
                            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center font-extrabold text-[9px] shrink-0", avatarBg)}>
                              {initials}
                            </div>
                            <span className="truncate">{rm.rm_first_name} {rm.rm_last_name}</span>
                          </div>

                          {/* Project Badge */}
                          {projLabel && projLabel !== "--" && (
                            <span className="bg-[#f1f5f9] dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 px-2 py-0.5 rounded-full text-[8px] font-extrabold tracking-wider">
                              {projLabel}
                            </span>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Leads Table */}
        {activeLeads.length > 0 && (
          <div className="space-y-2 flex-1 min-h-0 flex flex-col">
            <div className="overflow-x-auto border border-slate-100 dark:border-zinc-800 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800 text-[10px] font-extrabold text-slate-400 dark:text-zinc-500 tracking-wider uppercase">
                    <th className="py-3 px-4">Lead ID</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Project</th>
                    <th className="py-3 px-4">Sales Executive</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-zinc-900 text-xs font-bold text-slate-700 dark:text-zinc-300">
                  {activeLeads.map((lead) => {
                    const emName = emMap[lead.assigned_to_em] || "—";
                    return (
                      <tr key={lead.uuid} className="hover:bg-slate-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                        <td className="py-3 px-4 text-zinc-400 dark:text-zinc-500">#{lead.lead_id}</td>
                        <td className="py-3 px-4 font-extrabold text-slate-800 dark:text-zinc-150">
                          {lead.first_name} {lead.last_name}
                        </td>
                        <td className="py-3 px-4">{currentProjectName}</td>
                        <td className="py-3 px-4">{emName}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-100 dark:border-zinc-800 pt-4.5">
          <button
            onClick={onClose}
            disabled={isAssigning}
            className="text-xs font-extrabold text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <Button
            onClick={activeLeads.length > 0 ? handleReassignAndConfirm : onConfirm}
            disabled={activeLeads.length > 0 ? (!selectedRm || isAssigning) : isAssigning}
            className="bg-[#0f3d6b] hover:bg-[#0c2f54] text-white rounded-2xl px-6 py-5.5 text-xs font-black uppercase tracking-wider shadow-lg shadow-[#0f3d6b]/10 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isAssigning
              ? "Confirming..."
              : activeLeads.length > 0
                ? "Reassign Leads & Confirm"
                : "Confirm Project Change"}
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};
