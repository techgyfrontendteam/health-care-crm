import React, { useState, useMemo } from 'react';
import { Calendar, Clock, ChevronRight, X, Lock, Plus } from 'lucide-react';
import { useCreateFollowUpMutation } from '../../../follow-ups/api/followUpsApi';
import { useMasterDataLookup } from '../../../../shared/hooks/useMasterDataLookup';
import { usePermissions } from '../../../../hooks/usePermissions';
import { PERMISSIONS } from '../../../../config/permissions';
import { toast } from 'sonner';

interface LeadFollowUpsTabProps {
  lead: any;
  masterData?: any;
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

const formatFollowUpDate = (dateString: string) => {
  if (!dateString) return { date: '', time: '' };
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return { date: dateString, time: '' };
  
  const day = d.getDate();
  const monthShort = d.toLocaleDateString('en-US', { month: 'short' });
  const year = d.getFullYear();
  
  const timeStr = d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  const monthFull = d.toLocaleDateString('en-US', { month: 'long' });
  const displayMonth = monthFull === 'March' ? 'March' : monthShort;
  
  let suffix = 'th';
  if (day === 1 || day === 21 || day === 31) suffix = 'st';
  else if (day === 2 || day === 22) suffix = 'nd';
  else if (day === 3 || day === 23) suffix = 'rd';
  
  const displayDay = displayMonth === 'March' ? `${day}${suffix}` : (day < 10 ? `0${day}` : `${day}`);
  
  return {
    date: `${displayDay} ${displayMonth}, ${year}`,
    time: timeStr
  };
};

const getStatusBadgeStyle = (status: string) => {
  switch (status.toUpperCase()) {
    case 'UPCOMING':
    case 'SCHEDULED':
      return 'bg-[#EEF2F6] text-[#6366F1]';
    case 'MISSED':
    case 'OVERDUE':
      return 'bg-[#EF4444] text-white';
    case 'COMPLETED':
    case 'DONE':
      return 'bg-[#10B981] text-white';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

interface FollowUpListItem {
  followup_id: number;
  name: string;
  leadIdStr: string;
  date: string;
  time: string;
  rmName: string;
  status: string;
}



export const LeadFollowUpsTab = ({ lead, masterData }: LeadFollowUpsTabProps) => {
  const [createFollowUp, { isLoading: isCreating }] = useCreateFollowUpMutation();
  const { masterData: lookupMasterData, getRmLabel, getProjectLabel } = useMasterDataLookup();
  const { roleCode, can, user: currentUser } = usePermissions();

  const canCreate = can(PERMISSIONS.FOLLOWUP_CREATE) && (roleCode === 'RELMNG' || roleCode === 'EXPMNG');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form states
  const [formDate, setFormDate] = useState('');
  const [formTime, setFormTime] = useState('');
  const [purpose, setPurpose] = useState('');

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
      return apiFollowups.map((item: any) => {
        const typeObj = lookupMasterData?.lead_followup_types?.find((t: any) => t.id === item.followup_type_id);
        const statusObj = lookupMasterData?.lead_followup_statuses?.find((s: any) => s.id === item.followup_status_id);
        
        let statusLabel = "UPCOMING";
        if (statusObj) {
          const desc = statusObj.description.toUpperCase();
          if (desc.includes("COMPLETED") || desc.includes("DONE")) statusLabel = "COMPLETED";
          else if (desc.includes("MISSED") || desc.includes("OVERDUE")) statusLabel = "MISSED";
          else if (desc.includes("UPCOMING") || desc.includes("SCHEDULED")) statusLabel = "UPCOMING";
        } else {
          if (item.followup_status_id === 2) statusLabel = "COMPLETED";
          else if (item.followup_status_id === 4) statusLabel = "MISSED";
          else statusLabel = "UPCOMING";
        }

        const dateDetails = formatFollowUpDate(item.date_time);
        
        const assignedLabel = getRmLabel(item.user_id);
        
        return {
          followup_id: item.followup_id,
          name: leadName,
          leadIdStr: lead?.lead_id || `#LD-${lead?.id || "N/A"}`,
          date: dateDetails.date,
          time: dateDetails.time,
          rmName: assignedLabel === '--' ? rmName : assignedLabel,
          status: statusLabel
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
      await createFollowUp({
        lead_uuid: lead.uuid,
        user_id: currentUser?.id ? Number(currentUser.id) : (lead.assigned_to_rm || 1),
        followup_type_id: Number(purpose),
        followup_date_time,
        followup_status_id: 1, // Default status: Upcoming
        remarks: lookupMasterData?.lead_followup_types?.find((t: any) => t.id === Number(purpose))?.description || "Scheduled follow-up"
      }).unwrap();
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error("Failed to create follow-up:", err);
    }
  };

  return (
    <div className="-mx-6 -my-6 bg-[#F7F9FB] relative overflow-hidden font-['Inter'] min-h-[600px] p-6 md:p-10 space-y-8">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[20px] leading-[28px] text-[#063669]">
          Follow-up History
        </h4>
        {canCreate && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-[#0B3565] text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-[#072445] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Create Follow-Up
          </button>
        )}
      </div>

      {/* LIST OF FOLLOWUPS */}
      <div className="space-y-4">
        {followupsList.length > 0 ? (
          followupsList.map((item) => (
            <div 
              key={item.followup_id}
              className="bg-white border border-[#E5E7EB] rounded-[24px] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-5">
                {/* Initials Circle */}
                <div className="w-14 h-14 rounded-[20px] flex items-center justify-center font-bold text-[16px] bg-[#EFF6FF] text-[#1E40AF]">
                  {getInitials(item.name)}
                </div>
                
                {/* Info details */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] leading-[24px] text-[#1F2937]">
                      {item.name}
                    </span>
                    <span className="text-[#94A3B8] text-sm font-medium">
                      - {item.leadIdStr}
                    </span>
                  </div>
                  
                  {/* Date & Time Row */}
                  <div className="flex items-center gap-3 text-xs text-[#94A3B8] font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.time}
                    </span>
                  </div>

                  {/* Assigned RM */}
                  <p className="text-[11px] text-[#64748B] font-medium pt-0.5">
                    Assigned RM: {item.rmName}
                  </p>
                </div>
              </div>

              {/* Right block: Status badge */}
              <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${getStatusBadgeStyle(item.status)}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white border border-[#E5E7EB] rounded-[24px] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] p-10 flex flex-col items-center justify-center text-center">
            <Calendar className="w-12 h-12 text-slate-300 mb-3" />
            <h5 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#0F172A]">No follow-ups found</h5>
            <p className="text-sm text-[#64748B] mt-1 max-w-sm">There are currently no follow-ups recorded for this lead.</p>
          </div>
        )}
      </div>

      {/* CREATE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          {/* Backdrop click close */}
          <div className="absolute inset-0" onClick={() => setIsCreateModalOpen(false)} />

          {/* Modal box */}
          <div className="bg-white rounded-[32px] w-full max-w-md p-6 md:p-8 shadow-2xl relative space-y-6 z-10 mx-4">
            
            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#0F172A]">Create Follow-Up</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-[#64748B] hover:text-[#0F172A] p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lead Info block */}
            <div className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-[24px] p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-sm">
                  {getInitials(leadName)}
                </div>
                <div className="min-w-0">
                  <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0F172A] truncate">
                    {leadName}
                  </h4>
                  <p className="text-[11px] text-[#64748B] truncate mt-0.5">
                    Lead ID: {lead?.lead_id || lead?.id || "N/A"} • {projectLabel}
                  </p>
                </div>
              </div>
              <Lock className="w-4 h-4 text-[#94A3B8] shrink-0" />
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Date and Time row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider text-[#94A3B8] uppercase">Schedule Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
                    <input 
                      type="date"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full bg-[#F1F5F9] text-[#1E293B] font-medium text-xs border-0 rounded-2xl py-3.5 pl-10 pr-4 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider text-[#94A3B8] uppercase">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8] pointer-events-none" />
                    <input 
                      type="time"
                      value={formTime}
                      onChange={(e) => setFormTime(e.target.value)}
                      className="w-full bg-[#F1F5F9] text-[#1E293B] font-medium text-xs border-0 rounded-2xl py-3.5 pl-10 pr-4 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Follow-up purpose */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider text-[#94A3B8] uppercase">Follow-up Purpose</label>
                <div className="relative">
                  <select 
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full bg-[#F1F5F9] text-[#1E293B] font-medium text-xs border-0 rounded-2xl py-3.5 px-4 focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer pr-10"
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#94A3B8]">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Assigned Sales Head */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider text-[#94A3B8] uppercase">Assigned Sales Head</label>
                <input 
                  type="text"
                  readOnly
                  value={rmName}
                  className="w-full bg-[#F1F5F9] text-[#64748B] font-medium text-xs border-0 rounded-2xl py-3.5 px-4 focus:ring-0 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-xs font-bold text-[#64748B] hover:text-[#0F172A] px-4 py-3"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreate}
                disabled={isCreating}
                className="bg-[#0B3565] text-white text-xs font-semibold px-6 py-3.5 rounded-full hover:bg-[#072445] transition-colors disabled:opacity-50"
              >
                {isCreating ? 'Creating...' : 'Create Follow-Up'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
