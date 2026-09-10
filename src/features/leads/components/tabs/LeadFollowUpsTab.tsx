import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  User,
  FileText,
  Sparkles,
  X,
  Plus,
  Loader2,
  Lock,
  Pencil,
} from 'lucide-react';
import { useCreateFollowUpMutation, useUpdateFollowUpMutation } from '../../../follow-ups/api/followUpsApi';
import { useMasterDataLookup } from '../../../../shared/hooks/useMasterDataLookup';
import { usePermissions } from '../../../../hooks/usePermissions';
import { PERMISSIONS } from '../../../../config/permissions';
import { toast } from 'sonner';
import { Button } from '../../../../components/ui/button';

interface LeadFollowUpsTabProps {
  lead: any;
  masterData?: any;
  hideHeader?: boolean;
  createModalOpen?: boolean;
  setCreateModalOpen?: (open: boolean) => void;
}

const getInitials = (name: string) => {
  if (!name) return 'L';
  return name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getStatusBadgeStyle = (status: string) => {
  const s = status.toUpperCase();
  if (s.includes('UPCOMING') || s.includes('SCHEDULED')) {
    return 'bg-blue-50 text-[#063669] dark:bg-blue-950/50 dark:text-blue-400 border-blue-200 dark:border-blue-900';
  }
  if (s.includes('MISSED') || s.includes('OVERDUE')) {
    return 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border-rose-200 dark:border-rose-900';
  }
  if (s.includes('COMPLETED') || s.includes('DONE')) {
    return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900';
  }
  return 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700';
};

interface FollowUpListItem {
  followup_id: number;
  name: string;
  leadIdStr: string;
  day: string;
  month: string;
  date: string;
  time: string;
  rmName: string;
  status: string;
  typeName?: string;
  remarks?: string;
  user_id?: number;
}

export const LeadFollowUpsTab = ({
  lead,
  masterData,
  hideHeader = false,
  createModalOpen,
  setCreateModalOpen,
}: LeadFollowUpsTabProps) => {
  const [createFollowUp, { isLoading: isCreating }] = useCreateFollowUpMutation();
  const [updateFollowUp, { isLoading: isUpdating }] = useUpdateFollowUpMutation();
  const { masterData: lookupMasterData, getRmLabel, getProjectLabel } = useMasterDataLookup();
  const { roleCode, can, user: currentUser } = usePermissions();

  const [internalModalOpen, setInternalModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<FollowUpListItem | null>(null);
  const [editingFollowUp, setEditingFollowUp] = useState<FollowUpListItem | null>(null);
  const [editNotes, setEditNotes] = useState('');

  const isCreateModalOpen = createModalOpen !== undefined ? createModalOpen : internalModalOpen;
  const setIsCreateModalOpen = (open: boolean) => {
    if (setCreateModalOpen) {
      setCreateModalOpen(open);
    } else {
      setInternalModalOpen(open);
    }
  };

  // Form states for creating follow-up
  const [formDate, setFormDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [formTime, setFormTime] = useState(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  });
  const [purpose, setPurpose] = useState('1');
  const [notes, setNotes] = useState('');

  React.useEffect(() => {
    if (isCreateModalOpen) {
      const todayStr = new Date().toISOString().split('T')[0];
      setFormDate(todayStr);
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      setFormTime(timeStr);
      if (!purpose) setPurpose('1');
      setNotes('');
    }
  }, [isCreateModalOpen]);

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (item: FollowUpListItem) => {
    setEditingFollowUp(item);
    setEditNotes(item.remarks || '');
  };

  const leadName = useMemo(() => {
    const fn = lead?.first_name ? lead.first_name.charAt(0).toUpperCase() + lead.first_name.slice(1) : "";
    const ln = lead?.last_name ? lead.last_name.charAt(0).toUpperCase() + lead.last_name.slice(1) : "";
    return `${fn} ${ln}`.trim() || "Lead";
  }, [lead]);

  const projectLabel = useMemo(() => {
    if (!lead?.project_id) return "--";
    return getProjectLabel(lead.project_id) || "--";
  }, [lead, getProjectLabel]);

  const rmName = useMemo(() => {
    const directRmName = `${lead?.rm_first_name || ""} ${lead?.rm_last_name || ""}`.trim();
    if (directRmName) return directRmName;
    if (!lead?.assigned_to_rm) return "--";
    return getRmLabel(lead.assigned_to_rm) || "--";
  }, [lead, getRmLabel]);

  const followupsList = useMemo<FollowUpListItem[]>(() => {
    const apiFollowups = lead?.follow_ups || lead?.followups;
    if (apiFollowups && apiFollowups.length > 0) {
      const nowMs = Date.now();

      return apiFollowups.map((item: any) => {
        const typeObj = lookupMasterData?.lead_followup_types?.find((t: any) => t.id === item.followup_type_id);
        const statusObj = lookupMasterData?.lead_followup_statuses?.find((s: any) => s.id === item.followup_status_id);

        // Date extraction matching Appointments style (Month + Day)
        let day = "01";
        let month = "JAN";
        let formattedDate = "";
        let formattedTime = "";
        let isPast = false;

        const rawDateTimeStr = item.date_time || item.followup_date_time || item.follow_up_time;

        if (rawDateTimeStr) {
          const validStr = String(rawDateTimeStr).replace(/Z/g, '').split('+')[0].replace(' ', 'T');
          const dateObj = new Date(validStr);
          if (!isNaN(dateObj.getTime())) {
            day = String(dateObj.getDate()).padStart(2, "0");
            month = dateObj.toLocaleString("default", { month: "short" }).toUpperCase();
            formattedDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
            formattedTime = dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
            if (dateObj.getTime() < nowMs) {
              isPast = true;
            }
          } else {
            const datePart = String(rawDateTimeStr).split(/[T ]/)[0];
            const [y, m, d] = datePart.split("-");
            day = (d || "01").padStart(2, "0");
            month = new Date(Number(y), Number(m) - 1, Number(d || 1))
              .toLocaleString("default", { month: "short" })
              .toUpperCase();
            formattedDate = String(rawDateTimeStr);
            formattedTime = "";
          }
        }
        
        let statusLabel = "UPCOMING";
        if (statusObj) {
          const desc = statusObj.description.toUpperCase();
          if (desc.includes("COMPLETED") || desc.includes("DONE")) {
            statusLabel = "COMPLETED";
          } else if (desc.includes("MISSED") || desc.includes("OVERDUE")) {
            statusLabel = "MISSED FOLLOW-UP";
          } else if (desc.includes("UPCOMING") || desc.includes("SCHEDULED")) {
            statusLabel = isPast ? "MISSED FOLLOW-UP" : "UPCOMING";
          } else {
            statusLabel = isPast ? "MISSED FOLLOW-UP" : statusObj.description;
          }
        } else {
          if (item.followup_status_id === 2) {
            statusLabel = "COMPLETED";
          } else if (item.followup_status_id === 4) {
            statusLabel = "MISSED FOLLOW-UP";
          } else {
            statusLabel = isPast ? "MISSED FOLLOW-UP" : "UPCOMING";
          }
        }

        const assignedLabel = getRmLabel(item.user_id);
        
        return {
          followup_id: item.followup_id,
          name: leadName,
          leadIdStr: lead?.lead_id ? `#${lead.lead_id}` : `#LD-${lead?.id || "N/A"}`,
          day,
          month,
          date: formattedDate,
          time: formattedTime,
          rmName: assignedLabel === '--' ? rmName : assignedLabel,
          status: statusLabel,
          typeName: typeObj?.description,
          remarks: item.remarks || '',
          user_id: item.user_id,
        };
      });
    }
    return [];
  }, [lead, leadName, rmName, lookupMasterData, getRmLabel]);

  const handleCreate = async () => {
    if (!formDate || !formTime || !purpose) {
      toast.error("Please fill in the date, time, and purpose.");
      return;
    }
    try {
      const followup_date_time = `${formDate} ${formTime}:00`;
      const targetUserId =
        lead?.assigned_to_rm !== undefined && lead?.assigned_to_rm !== null && Number(lead.assigned_to_rm) !== 0
          ? Number(lead.assigned_to_rm)
          : currentUser?.id
          ? Number(currentUser.id)
          : 1;

      await createFollowUp({
        lead_uuid: lead.uuid,
        user_id: targetUserId,
        followup_type_id: Number(purpose),
        followup_date_time,
        followup_status_id: 1, // Default status: Upcoming
        remarks: notes.trim() || lookupMasterData?.lead_followup_types?.find((t: any) => t.id === Number(purpose))?.description || "Scheduled follow-up"
      }).unwrap();
      toast.success("Follow-up created successfully.");
      setIsCreateModalOpen(false);
      setNotes('');
    } catch (err: any) {
      console.error("Failed to create follow-up:", err);
      toast.error(err?.data?.message || "Failed to create follow-up");
    }
  };

  const handleUpdate = async () => {
    if (!editingFollowUp) return;
    try {
      const targetUserId = currentUser?.id
        ? Number(currentUser.id)
        : lead?.assigned_to_rm !== undefined && lead?.assigned_to_rm !== null && Number(lead.assigned_to_rm) !== 0
        ? Number(lead.assigned_to_rm)
        : 1;

      await updateFollowUp({
        lead_uuid: lead.uuid,
        followup_id: editingFollowUp.followup_id,
        remarks: editNotes.trim(),
        user_id: targetUserId,
      }).unwrap();

      toast.success("Follow-up note updated successfully.");
      setEditingFollowUp(null);
    } catch (err: any) {
      console.error("Failed to update follow-up note:", err);
      toast.error(err?.data?.message || "Failed to update follow-up note");
    }
  };

  return (
    <div className="space-y-4">
      {/* HEADER (Only when not embedded in Card 3) */}
      {!hideHeader && (
        <div className="flex justify-between items-center pb-1">
          <h4 className="font-bold text-sm text-zinc-800 dark:text-zinc-200">
            Followups &amp; Notes ({followupsList.length})
          </h4>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-1.5 bg-[#063669] hover:bg-[#063669]/90 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Create Follow-Up</span>
          </button>
        </div>
      )}

      {/* LIST OF FOLLOWUPS - Matches Appointments Card UI 1:1 */}
      <div className="space-y-3.5">
        {followupsList.length > 0 ? (
          followupsList.map((item) => {
            const isLongNote = item.remarks && (item.remarks.length > 70 || item.remarks.includes('\n'));

            return (
              <div
                key={item.followup_id}
                className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 transition-all hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs"
              >
                <div className="flex gap-4 sm:gap-6 items-center flex-1 min-w-0">
                  {/* DATE BADGE (Identical to Appointments card) */}
                  <div className="flex flex-col items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-blue-50/50 dark:bg-zinc-900 border border-blue-100 dark:border-zinc-800 shrink-0">
                    <span className="text-[10px] font-bold text-[#063669] dark:text-blue-400 tracking-tighter mb-0.5">
                      {item.month}
                    </span>
                    <span className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100 leading-none">
                      {item.day}
                    </span>
                  </div>

                  {/* DETAILS */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    {/* Status & Type badge */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[9px] px-2.5 py-0.5 rounded-md border font-bold uppercase tracking-wider ${getStatusBadgeStyle(item.status)}`}>
                        {item.status}
                      </span>
                      {item.typeName && (
                        <span className="text-[9px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold uppercase tracking-wider border border-zinc-200 dark:border-zinc-700">
                          {item.typeName}
                        </span>
                      )}
                    </div>

                    {/* Metadata: Sales Executive & Time */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-zinc-500 font-medium">
                      <span className="flex items-center gap-1.5 font-bold text-zinc-800 dark:text-zinc-200">
                        <User className="h-3.5 w-3.5 text-[#063669] dark:text-blue-400" />
                        {item.rmName || "Sales Executive"}
                      </span>

                      {item.time && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-zinc-400" />
                          {item.time}
                        </span>
                      )}
                    </div>

                    {/* Notes / Remarks with View More - strictly 2 lines */}
                    {item.remarks && (
                      <div className="flex items-start gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 pt-0.5">
                        <FileText className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 italic break-words leading-relaxed">
                            {item.remarks}
                          </p>
                          {isLongNote && (
                            <button
                              type="button"
                              onClick={() => setSelectedNote(item)}
                              className="text-[#063669] dark:text-blue-400 font-bold hover:underline text-[11px] not-italic cursor-pointer inline-flex items-center mt-0.5"
                            >
                              View more
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Edit Icon Button */}
                <div className="flex items-center gap-1 shrink-0 ml-3">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="p-2 rounded-xl text-zinc-400 hover:text-[#063669] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    title="Edit Follow-up Note"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[220px] border border-zinc-100 dark:border-zinc-800 rounded-2xl bg-white/50 dark:bg-zinc-900/50 p-6 text-center space-y-2">
            <Calendar className="w-8 h-8 text-zinc-300 dark:text-zinc-700 mb-1" />
            <h5 className="font-bold text-sm text-zinc-800 dark:text-zinc-200">No follow-ups found</h5>
            <p className="text-xs text-zinc-400 max-w-sm">There are currently no follow-ups recorded for this lead.</p>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* VIEW MORE NOTES POPUP MODAL                                 */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-950 w-full max-w-md rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col max-h-[85vh] relative overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-[#063669] dark:text-blue-400 shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    Follow-up Note
                  </h3>
                  <p className="text-[11px] text-zinc-500">
                    {selectedNote.name} • {selectedNote.date} {selectedNote.time}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedNote(null)}
                className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Note Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar space-y-4">
              {/* Metadata chips */}
              <div className="flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-blue-50/40 dark:bg-zinc-900/50 border border-blue-100 dark:border-zinc-800 text-xs">
                <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-medium">
                  <User className="w-3.5 h-3.5 text-[#063669] dark:text-blue-400" />
                  Sales Exec: <strong className="text-zinc-900 dark:text-zinc-200">{selectedNote.rmName}</strong>
                </span>
                {selectedNote.typeName && (
                  <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-[#063669] dark:text-blue-400" />
                    Type: <strong className="text-zinc-900 dark:text-zinc-200">{selectedNote.typeName}</strong>
                  </span>
                )}
                <span className={`text-[9px] px-2 py-0.5 rounded-md border font-bold uppercase tracking-wider ${getStatusBadgeStyle(selectedNote.status)}`}>
                  {selectedNote.status}
                </span>
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                  Full Note Content
                </p>
                <div className="p-4 rounded-2xl bg-zinc-50/80 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed whitespace-pre-wrap break-words max-h-60 overflow-y-auto custom-scrollbar font-medium">
                  {selectedNote.remarks}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedNote(null)}
                className="rounded-xl text-xs font-bold h-9 px-5 cursor-pointer"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* EDIT FOLLOW-UP NOTE MODAL                                   */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {editingFollowUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-950 w-full max-w-lg rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col max-h-[90vh] relative overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Pencil className="h-5 w-5 text-[#063669] dark:text-blue-400" />
                  Edit Follow-Up Note
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Update remarks and notes for {leadName}
                </p>
              </div>
              <button
                onClick={() => setEditingFollowUp(null)}
                className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-4">
              {/* Lead Info block */}
              <div className="p-3.5 rounded-2xl bg-blue-50/40 dark:bg-zinc-900/50 border border-blue-100 dark:border-zinc-800 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#063669] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    {getInitials(leadName)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 truncate">
                      {leadName}
                    </h4>
                    <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                      Lead ID: {lead?.lead_id ? `#${lead.lead_id}` : (lead?.id || "N/A")} • {projectLabel}
                    </p>
                  </div>
                </div>
                <Lock className="w-4 h-4 text-zinc-400 shrink-0" />
              </div>

              {/* Read-only Follow-up Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Scheduled Date &amp; Time
                  </label>
                  <div className="w-full h-11 px-3.5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 flex items-center">
                    {editingFollowUp.date} {editingFollowUp.time}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Follow-up Purpose
                  </label>
                  <div className="w-full h-11 px-3.5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 flex items-center">
                    {editingFollowUp.typeName || "Scheduled follow-up"}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Assigned Sales Executive
                </label>
                <div className="w-full h-11 px-3.5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 flex items-center">
                  {editingFollowUp.rmName || rmName}
                </div>
              </div>

              {/* Editable Notes / Remarks */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Notes / Remarks <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] text-zinc-400 font-bold">{editNotes.length}/500</span>
                </div>
                <textarea
                  rows={4}
                  maxLength={500}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Enter notes (up to 500 characters)..."
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-1 focus:ring-[#063669] outline-none transition-all resize-none placeholder:text-zinc-400"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-end gap-2.5">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingFollowUp(null)}
                disabled={isUpdating}
                className="rounded-xl text-xs font-bold h-10 px-5 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleUpdate}
                disabled={isUpdating}
                className="rounded-xl text-xs font-bold bg-[#063669] hover:bg-[#063669]/90 text-white h-10 px-6 gap-2 cursor-pointer"
              >
                {isUpdating && <Loader2 className="w-4 h-4 animate-spin" />}
                Update Note
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* CREATE FOLLOW-UP MODAL (Modernized dialog layout)            */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-950 w-full max-w-lg rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col max-h-[90vh] relative overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#063669] dark:text-blue-400" />
                  Create Follow-Up
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Schedule next follow-up and add notes for {leadName}
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-4">
              {/* Lead Info block */}
              <div className="p-3.5 rounded-2xl bg-blue-50/40 dark:bg-zinc-900/50 border border-blue-100 dark:border-zinc-800 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#063669] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    {getInitials(leadName)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 truncate">
                      {leadName}
                    </h4>
                    <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                      Lead ID: {lead?.lead_id ? `#${lead.lead_id}` : (lead?.id || "N/A")} • {projectLabel}
                    </p>
                  </div>
                </div>
                <Lock className="w-4 h-4 text-zinc-400 shrink-0" />
              </div>

              {/* Form Fields */}
              <div className="space-y-4 text-sm">
                {/* Date and Time row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      Schedule Date <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="date"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full h-11 px-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-medium text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[#063669]"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      Time <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="time"
                      value={formTime}
                      onChange={(e) => setFormTime(e.target.value)}
                      className="w-full h-11 px-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-medium text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[#063669]"
                    />
                  </div>
                </div>

                {/* Follow-up purpose */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Follow-up Purpose <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full h-11 px-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-medium text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[#063669] cursor-pointer"
                  >
                    {lookupMasterData?.lead_followup_types?.map((t: any) => (
                      <option key={t.id} value={t.id}>{t.description}</option>
                    )) || (
                      <>
                        <option value="1">Site Visit Pitch</option>
                        <option value="2">General Discussion</option>
                        <option value="3">Document Collection</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Assigned Sales Executive */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Assigned Sales Executive
                  </label>
                  <input 
                    type="text"
                    readOnly
                    value={rmName}
                    className="w-full h-11 px-3.5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-medium text-zinc-500 dark:text-zinc-400 cursor-not-allowed"
                  />
                </div>

                {/* Notes / Remarks (up to 500 characters) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      Notes
                    </label>
                    <span className="text-[10px] text-zinc-400 font-bold">{notes.length}/500</span>
                  </div>
                  <textarea 
                    rows={3}
                    maxLength={500}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter notes (up to 500 characters)..."
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs font-medium focus:ring-1 focus:ring-[#063669] outline-none transition-all resize-none placeholder:text-zinc-400"
                  />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-end gap-2.5">
              <Button 
                type="button"
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
                disabled={isCreating}
                className="rounded-xl text-xs font-bold h-10 px-5 cursor-pointer"
              >
                Cancel
              </Button>
              <Button 
                type="button"
                onClick={handleCreate}
                disabled={isCreating}
                className="rounded-xl text-xs font-bold bg-[#063669] hover:bg-[#063669]/90 text-white h-10 px-6 gap-2 cursor-pointer"
              >
                {isCreating && <Loader2 className="w-4 h-4 animate-spin" />}
                Create Follow-Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

