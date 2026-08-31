import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  ChevronDown,
  Calendar,
  Clock,
  X,
  Check,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "../../../utils";
import { usePermissions } from "../../../hooks/usePermissions";
import { useGetLeadsQuery } from "../../leads/api/leadsApi";
import { initialFollowUps } from "../data/followUpsData";
import type { FollowUp } from "../data/followUpsData";
import { useAuth } from "../../../context/AuthContext";
import { useMasterDataLookup } from "../../../shared/hooks/useMasterDataLookup";
import {
  useGetAllFollowupsByUserIdQuery,
  useCreateFollowUpMutation,
} from "../api";
import { useGetReporteesQuery } from "../../users/api/usersApi";

// Date utility functions
const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days = [];

  let firstDayIndex = date.getDay();
  firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Map Sunday to 6, Mon to 0

  const prevMonth = new Date(year, month, 0);
  const prevMonthDaysCount = prevMonth.getDate();
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthDaysCount - i),
      isCurrentMonth: false
    });
  }

  const currentMonthDaysCount = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= currentMonthDaysCount; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true
    });
  }

  const totalCells = days.length > 35 ? 42 : 35;
  const nextDaysCount = totalCells - days.length;
  for (let i = 1; i <= nextDaysCount; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false
    });
  }

  return days;
};

const isSameDay = (d1: Date | null, d2: Date | null) => {
  if (!d1 || !d2) return false;
  return d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear();
};

const isWithinRange = (d: Date, start: Date | null, end: Date | null) => {
  if (!start || !end) return false;
  const time = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const startTime = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const endTime = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return time >= startTime && time <= endTime;
};

const formatSelectedSpan = (start: Date | null, end: Date | null) => {
  if (!start) return "Select Date";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const startMonth = months[start.getMonth()];
  const startDay = start.getDate();
  const startYear = start.getFullYear();
  if (!end) return `${startMonth} ${startDay}, ${startYear}`;

  const endMonth = months[end.getMonth()];
  const endDay = end.getDate();
  const endYear = end.getFullYear();
  return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${endYear}`;
};

const formatApiDate = (d: Date | null) => {
  if (!d) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatShortDateSpan = (start: Date | null, end: Date | null) => {
  if (!start) return "Select Date";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const startMonth = months[start.getMonth()];
  const startDay = start.getDate();
  if (!end) return `${startMonth} ${startDay}`;

  const endMonth = months[end.getMonth()];
  const endDay = end.getDate();

  if (start.getMonth() !== end.getMonth() || start.getFullYear() !== end.getFullYear()) {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
  }

  return `${startMonth} ${startDay} - ${endDay}`;
};

const formatMonthYear = (date: Date) => {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

const formatFollowUpDate = (dateString: string) => {
  if (!dateString) return { date: '', time: '' };
  const safeDateString = dateString.endsWith('Z') ? dateString.slice(0, -1) : dateString;
  const d = new Date(safeDateString);
  if (isNaN(d.getTime())) return { date: safeDateString, time: '' };

  const day = d.getDate();
  const monthShort = d.toLocaleDateString('en-US', { month: 'short' });
  const year = d.getFullYear();

  // Calculate suffix
  let suffix = 'th';
  if (day === 1 || day === 21 || day === 31) suffix = 'st';
  else if (day === 2 || day === 22) suffix = 'nd';
  else if (day === 3 || day === 23) suffix = 'rd';

  const monthsMap: { [key: string]: string } = {
    'Jan': 'Jan', 'Feb': 'Feb', 'Mar': 'March', 'Apr': 'Apr', 'May': 'May',
    'Jun': 'Jun', 'Jul': 'Jul', 'Aug': 'Aug', 'Sep': 'Sep', 'Oct': 'Oct',
    'Nov': 'Nov', 'Dec': 'Dec'
  };
  const displayMonth = monthsMap[monthShort] || monthShort;

  const timeStr = d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const displayDay = displayMonth === 'March' ? `${day}${suffix}` : (day < 10 ? `0${day}` : `${day}`);

  return {
    date: `${displayDay} ${displayMonth}, ${year}`,
    time: timeStr
  };
};

export const FollowUpsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { rms, ems, masterData: lookupMasterData, getRmLabel, getEmLabel } = useMasterDataLookup();
  const { roleCode } = usePermissions();
  const isRM = roleCode === 'RELMNG';
  const isEM = roleCode === 'EXPMNG';
  const isSalesAdmin = roleCode === 'SADMIN' || user?.role_id === 2 || (user?.email && user.email.toLowerCase().includes("mahidhar"));
  const isRoleScoped = isRM || isEM; // either role sees only their own follow-ups

  // API Mutations/Queries
  const [createFollowUpApi, { isLoading: isCreating }] = useCreateFollowUpMutation();

  // State
  const [followUps, setFollowUps] = useState<FollowUp[]>(initialFollowUps);

  // Tab State: "Scheduled" or "Completed" or "Missed"
  const [activeTab, setActiveTab] = useState<"Scheduled" | "Completed" | "Missed">(
    (location.state as any)?.tab || "Scheduled"
  );

  // Create Follow-up Modal State (General page version)
  const [isGeneralCreateModalOpen, setIsGeneralCreateModalOpen] = useState(false);
  const [selectedLeadUuid, setSelectedLeadUuid] = useState("");
  const [createFormDate, setCreateFormDate] = useState('2026-06-25');
  const [createFormTime, setCreateFormTime] = useState('');
  const [createAmPm, setCreateAmPm] = useState<'AM' | 'PM'>('AM');
  const [createPurpose, setCreatePurpose] = useState('1');
  const [createRemarks, setCreateRemarks] = useState('');
  const [createFormRm, setCreateFormRm] = useState('');
  const [createFormEm, setCreateFormEm] = useState('');

  // Fetch leads to select one
  const { data: leadsData } = useGetLeadsQuery({ offset: 0 });
  const leads = useMemo(() => Array.isArray(leadsData) ? leadsData : (leadsData?.data || []), [leadsData]);

  // Filters State
  const [selectedRm, setSelectedRm] = useState<string>("All Sales Heads");
  const [selectedEm, setSelectedEm] = useState<string>("All Sales Executives");
  const [searchQuery, setSearchQuery] = useState("");

  const today = useMemo(() => new Date(), []);
  const next7Days = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + 7);
    return d;
  }, [today]);
  
  const last7Days = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() - 6);
    return d;
  }, [today]);

  const [startDate, setStartDate] = useState<Date>(today);
  const [endDate, setEndDate] = useState<Date>(next7Days);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(today);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(next7Days);
  const [activeMonth, setActiveMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
  const [quickSelect, setQuickSelect] = useState<string>("Next 7 Days");
  const [appliedQuickSelect, setAppliedQuickSelect] = useState<string>("Next 7 Days");

  const calendarDays = useMemo(() => {
    return getDaysInMonth(activeMonth.getFullYear(), activeMonth.getMonth());
  }, [activeMonth]);

  // Dropdown UI Open/Close States
  const [isRmDropdownOpen, setIsRmDropdownOpen] = useState(false);
  const [isEmDropdownOpen, setIsEmDropdownOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);



  // Quick Complete Modal State
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [completingFollowUp, setCompletingFollowUp] = useState<FollowUp | null>(null);
  const [outcomeNotes, setOutcomeNotes] = useState("");
  const [scheduleNextFollowUp, setScheduleNextFollowUp] = useState(false);
  const [nextFollowUpDate, setNextFollowUpDate] = useState("");
  const [nextFollowUpTime, setNextFollowUpTime] = useState("");
  const [nextFollowUpRemarks, setNextFollowUpRemarks] = useState("");

  // UI Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Helper: Get Lead Initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  // Date Formatting Helper YYYY-MM-DD
  const formatDateISO = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  // Date filters are controlled directly by startDate and endDate states

  // Find matching RM or EM
  const selectedRmUser = useMemo(() => {
    if (selectedRm === "All Sales Heads") return null;
    return rms.find(r => `${r.first_name} ${r.last_name}`.trim() === selectedRm);
  }, [selectedRm, rms]);

  // Fetch EMs reporting to selected RM
  const selectedRmId = selectedRmUser?.id;
  const { data: rmReportees = [] } = useGetReporteesQuery(
    { reporting_manager_id: Number(selectedRmId), offset: 0 },
    { skip: !selectedRmId }
  );

  const displayEms = useMemo(() => {
    if (selectedRmId) return rmReportees;
    return ems;
  }, [selectedRmId, rmReportees, ems]);

  const selectedEmUser = useMemo(() => {
    if (selectedEm === "All Sales Executives") return null;
    return displayEms.find(e => `${e.first_name} ${e.last_name}`.trim() === selectedEm);
  }, [selectedEm, displayEms]);

  // The user IDs to query the API for
  const queryUserIds = useMemo(() => {
    // For role-scoped users (RM/EM), always use their own ID silently
    if (isRoleScoped) return [Number(user?.id || 0)];
    
    const ids = [];
    if (selectedRmUser) ids.push(Number(selectedRmUser.id));
    if (selectedEmUser) ids.push(Number(selectedEmUser.id));

    if (ids.length > 0) return ids;

    if (isSalesAdmin && rms.length > 0) {
      return rms.map(r => Number(r.id));
    }
    return [Number(user?.id || 0)];
  }, [selectedRmUser, selectedEmUser, user, isRoleScoped, isSalesAdmin, rms]);

  // Get the display name of the queried user
  const queriedUserDisplayName = useMemo(() => {
    if (selectedRmUser) {
      return `${selectedRmUser.first_name} ${selectedRmUser.last_name}`.trim();
    }
    if (selectedEmUser) {
      return `${selectedEmUser.first_name} ${selectedEmUser.last_name}`.trim();
    }
    return user?.name || "Self";
  }, [selectedRmUser, selectedEmUser, user]);

  // Fetch Follow-ups from API dynamically
  const { data: apiData, refetch } = useGetAllFollowupsByUserIdQuery(
    {
      user_id: queryUserIds,
      start_date: "2020-01-01",
      end_date: "2030-12-31",
      offset: "0",
    },
    {
      skip: queryUserIds.length === 0 || (queryUserIds.length === 1 && queryUserIds[0] === 0),
    }
  );

  // Map API response to UI follow-ups format
  const apiFollowUps = useMemo(() => {
    if (!apiData?.followups) return [];
    const mapped = apiData.followups.map((item, idx) => {
      const dateDetails = formatFollowUpDate(item.followup_date_time);

      const statusObj = lookupMasterData?.lead_followup_statuses?.find((s: any) => s.id === item.followup_status_id);
      let status: "Pending" | "Completed" | "Overdue" | "Cancelled" = "Pending";
      if (statusObj) {
        const desc = statusObj.description.toUpperCase();
        if (desc.includes("COMPLETED") || desc.includes("DONE")) status = "Completed";
        else if (desc.includes("MISSED") || desc.includes("OVERDUE")) status = "Overdue";
        else if (desc.includes("CANCEL")) status = "Cancelled";
        else status = "Pending";
      } else {
        if (item.followup_status_id === 2) status = "Completed";
        else if (item.followup_status_id === 3) status = "Cancelled";
        else if (item.followup_status_id === 4) status = "Overdue";
        else status = "Pending";
      }

      const typeObj = lookupMasterData?.lead_followup_types?.find((t: any) => t.id === item.follow_type_id);
      let type: "Call" | "WhatsApp" | "Email" | "Site Visit" = "Call";
      if (typeObj) {
        const desc = typeObj.description.toUpperCase();
        if (desc.includes("WHATSAPP")) type = "WhatsApp";
        else if (desc.includes("EMAIL")) type = "Email";
        else if (desc.includes("SITE VISIT")) type = "Site Visit";
      } else {
        if (item.follow_type_id === 2) type = "WhatsApp";
        else if (item.follow_type_id === 3) type = "Email";
        else if (item.follow_type_id === 4) type = "Site Visit";
      }

      const fn = item.first_name ? item.first_name.charAt(0).toUpperCase() + item.first_name.slice(1) : "";
      const ln = item.last_name ? item.last_name.charAt(0).toUpperCase() + item.last_name.slice(1) : "";
      const leadName = `${fn} ${ln}`.trim() || "Lead Name";

      return {
        id: `api-${item.lead_uuid}-${idx}`,
        leadId: item.lead_id ? (item.lead_id.startsWith("#") ? item.lead_id : `#${item.lead_id}`) : "Lead ID",
        leadUuid: item.lead_uuid,
        leadName,
        leadPhone: "",
        leadEmail: "",
        projectName: "Planet Green",
        type,
        status,
        scheduledAt: dateDetails.date,
        scheduledTime: dateDetails.time,
        rawDate: item.followup_date_time,
        assignedRm: (() => {
          if ((item as any).user_id) {
             const rmLabel = getRmLabel(Number((item as any).user_id));
             if (rmLabel !== '--') return rmLabel;
             const emLabel = getEmLabel(Number((item as any).user_id));
             if (emLabel !== '--') return emLabel;
          }
          const label = getRmLabel(queryUserIds.length === 1 ? queryUserIds[0] : 0);
          return label !== '--' ? label : queriedUserDisplayName;
        })(),
        assignedEm: (() => {
          if ((item as any).user_id) {
             const emLabel = getEmLabel(Number((item as any).user_id));
             if (emLabel !== '--') return emLabel;
          }
          return "";
        })(),
        remarks: item.remarks || "No remarks provided.",
        lastAction: "Retrieved from server",
      };
    });

    // Sort descending by rawDate
    return mapped.sort((a, b) => {
      const dateA = new Date(a.rawDate || 0).getTime();
      const dateB = new Date(b.rawDate || 0).getTime();
      return dateB - dateA;
    });
  }, [apiData, queriedUserDisplayName, selectedRmUser, selectedEmUser, getRmLabel, getEmLabel, user, queryUserIds, lookupMasterData]);

  // Combine Mock Data & API Data
  const mergedFollowUps = useMemo(() => {
    return apiFollowUps;
  }, [apiFollowUps]);

  // Filter Data based on Tab and Dropdowns
  const filteredFollowUps = useMemo(() => {
    return mergedFollowUps.filter((item) => {
      // 1. Tab Filter
      if (activeTab === "Scheduled") {
        if (item.status !== "Pending") return false;
      } else if (activeTab === "Completed") {
        if (item.status !== "Completed" && item.status !== "Cancelled") return false;
      } else if (activeTab === "Missed") {
        if (item.status !== "Overdue") return false;
      }

      // 2. Date Filter (Scheduled Date)
      if (startDate && endDate && item.rawDate) {
        const itemDate = new Date(item.rawDate);
        const itemDay = new Date(itemDate.getFullYear(), itemDate.getMonth(), itemDate.getDate()).getTime();
        const startDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();
        const endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime();
        if (itemDay < startDay || itemDay > endDay) {
          return false;
        }
      }

      // 3. Search Query (Lead Name, Lead ID, RM)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const nameMatch = item.leadName.toLowerCase().includes(query);
        const idMatch = item.leadId.toLowerCase().includes(query);
        const rmMatch = item.assignedRm.toLowerCase().includes(query);
        return nameMatch || idMatch || rmMatch;
      }

      return true;
    });
  }, [mergedFollowUps, activeTab, searchQuery]);

  // Date Modal Handlers
  const handleQuickSelect = (option: string) => {
    setQuickSelect(option);
    if (option === "Today") {
      setTempStartDate(today);
      setTempEndDate(today);
    } else if (option === "Next 7 Days") {
      setTempStartDate(today);
      setTempEndDate(next7Days);
    } else if (option === "Last 7 Days") {
      setTempStartDate(last7Days);
      setTempEndDate(today);
    } else if (option === "This Month") {
      setTempStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
      setTempEndDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
    }
  };

  const handleDayClick = (date: Date) => {
    setQuickSelect("");
    if (!tempStartDate || (tempStartDate && tempEndDate)) {
      setTempStartDate(date);
      setTempEndDate(null);
    } else {
      if (date < tempStartDate) {
        setTempStartDate(date);
      } else {
        setTempEndDate(date);
      }
    }
  };

  const prevMonth = () => {
    setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() + 1, 1));
  };

  const handleApplyDateRange = () => {
    if (tempStartDate && tempEndDate) {
      setStartDate(tempStartDate);
      setEndDate(tempEndDate);
    } else if (tempStartDate) {
      setStartDate(tempStartDate);
      setEndDate(tempStartDate);
    }
    setAppliedQuickSelect(quickSelect);
    setIsDateModalOpen(false);
    showToast("Date range filter applied successfully!");
  };

  const handleClearDates = () => {
    setTempStartDate(last7Days);
    setTempEndDate(today);
    setQuickSelect("Last 7 Days");
  };

  // Open Log Outcome Modal
  const openCompleteModal = (item: FollowUp) => {
    setCompletingFollowUp(item);
    setOutcomeNotes("");
    setScheduleNextFollowUp(false);

    // Default to tomorrow in YYYY-MM-DD format
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];

    setNextFollowUpDate(tomorrowStr);
    setNextFollowUpTime("10:00");
    setNextFollowUpRemarks("");
    setIsCompleteModalOpen(true);
  };

  // Save Outcome & Complete Call
  const handleCompleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!outcomeNotes.trim()) {
      showToast("Please enter outcome notes.");
      return;
    }
    if (!completingFollowUp) return;

    let updatedList = followUps.map((item) =>
      item.id === completingFollowUp.id
        ? {
          ...item,
          status: "Completed" as const,
          outcome: outcomeNotes.trim(),
          lastAction: `Completed call - ${outcomeNotes.substring(0, 30)}...`,
        }
        : item
    );

    if (scheduleNextFollowUp && nextFollowUpDate) {
      // Build ISO Date Time
      const isoDateTime = `${nextFollowUpDate}T${nextFollowUpTime || "12:00"}:00.000Z`;

      createFollowUpApi({
        lead_uuid: completingFollowUp.leadUuid || "string",
        user_id: parseInt(user?.id || "0"),
        followup_type_id: 1, // e.g. 1 for Call
        followup_date_time: isoDateTime,
        followup_status_id: 0, // Pending
        remarks: nextFollowUpRemarks.trim() || "Follow up after previous outcome.",
      })
        .unwrap()
        .then(() => {
          showToast("Subsequent follow-up successfully scheduled on server.");
          refetch();
        })
        .catch((err) => {
          console.error("Failed to create follow up:", err);
          showToast("Scheduled locally (server returned an error).");
        });

      const nextId = `fu-${Date.now()}`;
      const newFollowUp: FollowUp = {
        id: nextId,
        leadId: completingFollowUp.leadId,
        leadUuid: completingFollowUp.leadUuid,
        leadName: completingFollowUp.leadName,
        leadPhone: completingFollowUp.leadPhone,
        leadEmail: completingFollowUp.leadEmail,
        projectName: completingFollowUp.projectName,
        type: "Call",
        status: "Pending",
        scheduledAt: new Date(isoDateTime).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        scheduledTime: new Date(isoDateTime).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        assignedRm: completingFollowUp.assignedRm,
        assignedEm: completingFollowUp.assignedEm,
        remarks: nextFollowUpRemarks.trim() || "Follow up after previous outcome.",
        lastAction: "Scheduled subsequent call",
      };
      updatedList = [newFollowUp, ...updatedList];
    }

    setFollowUps(updatedList);
    setIsCompleteModalOpen(false);
    setCompletingFollowUp(null);
    showToast("Follow-up marked as completed.");
  };

  const handleGeneralCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLeadUuid) {
      showToast("Please select a lead.");
      return;
    }
    try {
      const selectedLead = leads.find((l: any) => l.uuid === selectedLeadUuid);
      
      // Parse custom 12-hour time if provided
      let formattedTime = '00:00:00';
      if (createFormTime) {
        let [hours, minutes] = createFormTime.split(':');
        let h = parseInt(hours || '0', 10);
        if (createAmPm === 'PM' && h < 12) h += 12;
        if (createAmPm === 'AM' && h === 12) h = 0;
        formattedTime = `${String(h).padStart(2, '0')}:${minutes || '00'}:00`;
      }

      const followup_date_time = `${createFormDate} ${formattedTime}`;
      await createFollowUpApi({
        lead_uuid: selectedLeadUuid,
        user_id: selectedLead?.assigned_to_rm || Number(user?.id) || 1,
        followup_type_id: Number(createPurpose),
        followup_date_time,
        followup_status_id: 1, // Default status: Upcoming/Pending
        remarks: createRemarks.trim() || lookupMasterData?.lead_followup_types?.find((t: any) => t.id === Number(createPurpose))?.description || "Scheduled follow-up"
      }).unwrap();
      setIsGeneralCreateModalOpen(false);
      setSelectedLeadUuid("");
      setCreateRemarks("");
      showToast("Follow-up successfully created.");
      refetch();
    } catch (err) {
      console.error("Failed to create follow-up:", err);
      showToast("Failed to create follow-up.");
    }
  };

  // Dynamic Options lists
  const relationshipManagers = useMemo(() => {
    const list = rms.map((r) => `${r.first_name} ${r.last_name}`.trim());
    return ["All Sales Heads", ...list];
  }, [rms]);

  const experienceManagers = useMemo(() => {
    const list = displayEms.map((e) => `${e.first_name} ${e.last_name}`.trim());
    return ["All Sales Executives", ...list];
  }, [displayEms]);

  // Date range filter options

  return (
    <div className="w-full max-w-[1440px] xl:max-w-[1920px] mx-auto px-6 py-8 space-y-6 animate-in fade-in duration-300 relative text-slate-800">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 bg-[#002d62] text-white px-5 py-3.5 rounded-full shadow-xl z-50 flex items-center gap-3 animate-in slide-in-from-top duration-300 font-bold text-xs">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-[#002d62] tracking-tight">Followups</h1>
          <p className="text-xs text-slate-400 font-medium">Track and manage lead follow-ups efficiently.</p>
        </div>
      </div>

      {/* Filters & Navigation Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        <div className="flex flex-wrap items-center gap-6">
          {/* Relationship Manager Dropdown — hidden for RM and EM roles */}
          {!isRoleScoped && (
            <>
              <div className="relative">
                <span className="text-[9px] font-black text-slate-400 block mb-1 uppercase tracking-wider">
                  SALES HEAD
                </span>
                <button
                  onClick={() => {
                    setIsRmDropdownOpen(!isRmDropdownOpen);
                    setIsEmDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-slate-200/50 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-sm cursor-pointer min-w-[150px] justify-between"
                >
                  <span className="truncate max-w-[120px]">{selectedRm === "All RM's" ? "All Sales Heads" : selectedRm}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>
                {isRmDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 max-h-60 overflow-y-auto scrollbar-thin bg-white border border-slate-100 rounded-xl shadow-lg py-1.5 z-30">
                    {relationshipManagers.map((rm) => (
                      <button
                        key={rm}
                        onClick={() => {
                          setSelectedRm(rm);
                          setSelectedEm("All Sales Executives"); // Reset EM when RM changes
                          setIsRmDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        {rm}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Experience Manager Dropdown */}
              <div className="relative">
                <span className="text-[9px] font-black text-slate-400 block mb-1 uppercase tracking-wider">
                  SALES EXECUTIVE
                </span>
                <button
                  onClick={() => {
                    setIsEmDropdownOpen(!isEmDropdownOpen);
                    setIsRmDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-slate-200/50 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-sm cursor-pointer min-w-[150px] justify-between"
                >
                  <span className="truncate max-w-[120px]">{selectedEm === "All Managers" ? "All Sales Executives" : selectedEm}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>
                {isEmDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 max-h-60 overflow-y-auto scrollbar-thin bg-white border border-slate-100 rounded-xl shadow-lg py-1.5 z-30">
                    {experienceManagers.map((em) => (
                      <button
                        key={em}
                        onClick={() => {
                          setSelectedEm(em);
                          setIsEmDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Date Picker Range */}
          <div className="relative">
            <span className="text-[9px] font-black text-slate-455 block mb-1 uppercase tracking-wider">
              SELECT DATE RANGE
            </span>
            <button
              onClick={() => {
                setTempStartDate(startDate);
                setTempEndDate(endDate);
                setQuickSelect(appliedQuickSelect);
                setIsDateModalOpen(true);
              }}
              className="flex items-center gap-3 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-slate-200/50 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 shadow-sm transition-colors cursor-pointer min-w-[140px] min-h-[42px]"
            >
              <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{appliedQuickSelect ? appliedQuickSelect : formatShortDateSpan(startDate, endDate)}</span>
            </button>
          </div>
        </div>

        {/* Scheduled / Completed / Missed Segmented Pill Tab */}
        <div className="bg-[#f1f5f9] p-1 rounded-full flex items-center shrink-0 self-end md:self-auto shadow-sm border border-slate-100">
          {(["Scheduled", "Completed", "Missed"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${activeTab === tab
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-400 hover:text-slate-650"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Search leads Input bar */}
      <div className="relative w-full pt-1">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search leads....."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-13 pr-6 py-3 w-full rounded-full border border-slate-200/80 bg-white text-sm font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#002d62] placeholder-slate-400 shadow-sm transition-all"
        />
      </div>

      {/* List cards section */}
      <div className="space-y-4 pt-2">
        {filteredFollowUps.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-200 rounded-[20px] p-12 text-center text-xs font-bold text-slate-400 shadow-sm">
            No {activeTab.toLowerCase()} follow-ups found for your selection.
          </div>
        ) : (
          filteredFollowUps.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E5E7EB] rounded-[24px] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-md transition-shadow"
            >
              {/* Left Side: Avatar & Details */}
              <div className="flex items-center gap-5">
                {/* Initials Avatar Squircle */}
                <div className="w-14 h-14 rounded-[20px] flex items-center justify-center font-bold text-[16px] bg-[#EFF6FF] text-[#1E40AF] shrink-0 border border-blue-50/50 shadow-sm">
                  {getInitials(item.leadName)}
                </div>

                {/* Text details */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] leading-[24px] text-[#063669]">
                      {item.leadName}
                    </h4>
                    <span className="text-[12px] text-[#64748B] font-medium">
                      • {item.leadId}
                    </span>
                  </div>

                  {/* Scheduled Date and Time */}
                  <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.scheduledAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.scheduledTime}
                    </span>
                  </div>

                  {/* Assignee */}
                  <p className="text-[11px] text-[#64748B] font-medium pt-0.5">
                    {isRM || selectedRmUser ? item.assignedRm : (item.assignedEm || item.assignedRm)}
                  </p>
                </div>
              </div>

              {/* Right Side: Action buttons */}
              <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                {activeTab !== "Completed" ? (
                  isRM || isSalesAdmin ? (
                    <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider cursor-default">
                      POST CALL FOLLOW UP
                    </span>
                  ) : (
                    <button
                      onClick={() => openCompleteModal(item)}
                      className="text-[#0B3565] hover:underline font-bold text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      POST CALL FOLLOW UP
                    </button>
                  )
                ) : (
                  <span className="text-emerald-600 bg-emerald-55 font-bold text-[11px] uppercase tracking-wider cursor-default">
                    COMPLETED
                  </span>
                )}

                <button
                  onClick={() => {
                    // Navigate to details if uuid is present, or fallback
                    if (item.leadUuid) {
                      navigate(`/leads/${item.leadUuid}?tab=followups`);
                    } else {
                      navigate(`/leads`);
                    }
                  }}
                  className="bg-[#0B3565] text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-[#072445] transition-colors shadow-md"
                >
                  View Lead
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Log Outcome & Complete Modal */}
      {isCompleteModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] border border-slate-100 w-full max-w-xl p-6 shadow-2xl relative space-y-6 mx-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-50 pb-4">
              <div>
                <h2 className="text-base font-extrabold text-[#002d62]">
                  Log Interaction Outcome
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                  Log the results for lead: <span className="font-extrabold text-[#002d62]">{completingFollowUp?.leadName}</span> ({completingFollowUp?.leadId})
                </p>
              </div>
              <button
                onClick={() => setIsCompleteModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCompleteSubmit} className="space-y-4">
              {/* Outcome Notes */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-450 tracking-wider uppercase">
                  INTERACTION OUTCOME / NOTES *
                </label>
                <textarea
                  required
                  placeholder="Detail the discussion points, client feedback, or outcome summary..."
                  value={outcomeNotes}
                  onChange={(e) => setOutcomeNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#002d62] resize-none"
                />
              </div>

              {/* Next Schedule Toggle */}
              <div className="bg-[#f8fafc] p-4 rounded-2xl border border-slate-200/50 space-y-4">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={scheduleNextFollowUp}
                    onChange={(e) => setScheduleNextFollowUp(e.target.checked)}
                    className="w-4 h-4 rounded text-[#002d62] focus:ring-[#002d62] border-slate-300"
                  />
                  <div>
                    <span className="text-xs font-black text-slate-700">
                      Schedule next follow-up action?
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">
                      Automatically schedules the next communication touch for this lead.
                    </p>
                  </div>
                </label>

                {scheduleNextFollowUp && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-200/60 animate-in slide-in-from-top-2 duration-250">
                    {/* Next Date */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                        NEXT SCHEDULE DATE
                      </label>
                      <input
                        type="date"
                        required={scheduleNextFollowUp}
                        value={nextFollowUpDate}
                        onChange={(e) => setNextFollowUpDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#002d62]"
                      />
                    </div>

                    {/* Next Time */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                        NEXT SCHEDULE TIME
                      </label>
                      <input
                        type="time"
                        required={scheduleNextFollowUp}
                        value={nextFollowUpTime}
                        onChange={(e) => setNextFollowUpTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#002d62]"
                      />
                    </div>

                    {/* Next Remarks */}
                    <div className="space-y-1 col-span-1 md:col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                        NEXT OBJECTIVE / INSTRUCTIONS
                      </label>
                      <textarea
                        placeholder="What needs to be discussed next?"
                        value={nextFollowUpRemarks}
                        onChange={(e) => setNextFollowUpRemarks(e.target.value)}
                        rows={2}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#002d62] resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-50">
                <button
                  type="button"
                  onClick={() => setIsCompleteModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-extrabold text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#002d62] hover:bg-[#08305c] text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md"
                >
                  Save Outcome & Complete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GENERAL CREATE FOLLOW-UP MODAL */}
      {isGeneralCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setIsGeneralCreateModalOpen(false)} />
          
          <div className="relative bg-white w-full max-w-[500px] mx-4 rounded-[20px] shadow-2xl p-6 md:p-8 flex flex-col gap-5 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-[18px] text-[#002d62]">
                Create a new follow-up
              </h3>
              <button
                type="button"
                onClick={() => setIsGeneralCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleGeneralCreateSubmit} className="flex flex-col gap-5">
              {/* Select Lead */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Select Lead</label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    required
                    value={selectedLeadUuid}
                    onChange={(e) => setSelectedLeadUuid(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-[#f8fafc] text-sm font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0B3565] appearance-none"
                  >
                    <option value="" disabled>Search and select lead...</option>
                    {leads.map((l: any) => {
                      const fn = l.first_name || "";
                      const ln = l.last_name || "";
                      const leadName = `${fn} ${ln}`.trim() || "Lead Name";
                      return (
                        <option key={l.uuid} value={l.uuid}>
                          {leadName} ({l.lead_id || `#LD-${l.id}`})
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* RM and EM Selects */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Sales Head</label>
                  <select
                    value={createFormRm}
                    onChange={(e) => setCreateFormRm(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#f8fafc] text-sm font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0B3565]"
                  >
                    <option value="">Select Sales Head</option>
                    {rms.map(r => (
                      <option key={r.id} value={r.id}>{r.first_name} {r.last_name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Sales Executive</label>
                  <select
                    value={createFormEm}
                    onChange={(e) => setCreateFormEm(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#f8fafc] text-sm font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0B3565]"
                  >
                    <option value="">Select Sales Executive</option>
                    {ems.map(e => (
                      <option key={e.id} value={e.id}>{e.first_name} {e.last_name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Follow-up Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={createFormDate}
                      onChange={(e) => setCreateFormDate(e.target.value)}
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 bg-[#f8fafc] text-sm font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0B3565] cursor-pointer"
                      style={{ colorScheme: "light" }}
                    />
                    <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Follow-up Time</label>
                  <div className="flex bg-[#f8fafc] border border-slate-200 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-[#0B3565]">
                    <input
                      type="text"
                      placeholder="00:00"
                      required
                      value={createFormTime}
                      onChange={(e) => setCreateFormTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-transparent text-sm font-medium text-slate-700 focus:outline-none"
                    />
                    <div className="flex items-center text-xs font-bold border-l border-slate-200 divide-x divide-slate-200 shrink-0">
                      <button 
                        type="button" 
                        onClick={() => setCreateAmPm('AM')}
                        className={`px-3 py-2.5 transition-colors ${createAmPm === 'AM' ? 'bg-[#002d62] text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                      >
                        AM
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setCreateAmPm('PM')}
                        className={`px-3 py-2.5 transition-colors ${createAmPm === 'PM' ? 'bg-[#002d62] text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                      >
                        PM
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purpose */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Follow-up Purpose</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Briefly describe the objective..."
                  value={createRemarks}
                  onChange={(e) => setCreateRemarks(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-[#f8fafc] text-sm font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0B3565] resize-none"
                />
              </div>

              {/* Footer Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isCreating}
                  className="w-full bg-[#002d62] text-white text-sm font-bold py-3.5 rounded-xl hover:bg-[#08305c] transition-all disabled:opacity-50 cursor-pointer shadow-md"
                >
                  {isCreating ? 'Scheduling...' : 'Create follow-up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Custom Select Date Range Modal */}
      {isDateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-[2px] animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-950 w-full max-w-[680px] rounded-[24px] shadow-2xl overflow-hidden flex flex-col border border-zinc-150 dark:border-zinc-800/80 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-100 dark:border-zinc-850">
              <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">Select Date Range</h3>
              <button
                onClick={() => setIsDateModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-850 text-slate-400 dark:text-zinc-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-1 min-h-[320px]">
              {/* Left Sidebar */}
              <div className="w-[220px] border-r border-zinc-100 dark:border-zinc-850 p-5 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col justify-between">
                <div className="space-y-5">
                  <button className="w-full flex items-center gap-2.5 px-4 py-3 bg-[#0f3d6b] text-white rounded-xl text-sm font-semibold shadow-sm transition-all duration-200">
                    <Calendar className="w-4 h-4" />
                    Date Range
                  </button>

                  <div>
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 px-2 mb-2">
                      QUICK SELECTS
                    </span>
                    <div className="space-y-1">
                      {["Today", "Last 7 Days", "This Month"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleQuickSelect(opt)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all duration-150",
                            quickSelect === opt
                              ? "bg-slate-50 text-slate-850 border border-zinc-150 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
                              : "text-slate-500 hover:text-slate-800 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/40"
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-150 dark:border-zinc-800 pt-4">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 px-2 mb-1">
                    SELECTED SPAN
                  </span>
                  <span className="block text-xs font-extrabold text-[#0f3d6b] dark:text-blue-400 px-2">
                    {formatSelectedSpan(tempStartDate, tempEndDate)}
                  </span>
                </div>
              </div>

              {/* Right Calendar Month View */}
              <div className="flex-1 p-6 flex flex-col">
                {/* Month Header controls */}
                <div className="flex items-center justify-between mb-4 px-1">
                  <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">
                    {formatMonthYear(activeMonth)}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={prevMonth}
                      className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={nextMonth}
                      className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Weekdays */}
                <div className="grid grid-cols-7 gap-y-2 text-center mb-2">
                  {["MO", "TU", "WE", "TH", "FR", "SA", "SU"].map((day) => (
                    <span key={day} className="text-[10px] font-extrabold text-slate-400 dark:text-zinc-500 tracking-wider">
                      {day}
                    </span>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-y-1 text-center">
                  {calendarDays.map(({ date, isCurrentMonth }: { date: Date; isCurrentMonth: boolean }, idx: number) => {
                    const isFuture = new Date(date.getFullYear(), date.getMonth(), date.getDate()) > new Date(today.getFullYear(), today.getMonth(), today.getDate());
                    const isSelectedStart = isSameDay(date, tempStartDate);
                    const isSelectedEnd = isSameDay(date, tempEndDate);
                    const isInRange = isWithinRange(date, tempStartDate, tempEndDate);

                    let bgClass = "";
                    if (isSelectedStart && tempEndDate && !isSelectedEnd) {
                      bgClass = "bg-[#f4f7fb] dark:bg-blue-950/20 rounded-l-full";
                    } else if (isSelectedEnd && tempStartDate && !isSelectedStart) {
                      bgClass = "bg-[#f4f7fb] dark:bg-blue-950/20 rounded-r-full";
                    } else if (isInRange) {
                      bgClass = "bg-[#f4f7fb] dark:bg-blue-950/20";
                    }

                    return (
                      <div
                        key={idx}
                        onClick={() => handleDayClick(date)}
                        className={cn(
                          "relative py-2 text-xs font-bold select-none flex items-center justify-center transition-all duration-150 cursor-pointer",
                          isCurrentMonth ? "text-slate-800 dark:text-zinc-200" : "text-slate-300 dark:text-zinc-600/60",
                          bgClass
                        )}
                      >
                        {/* Circle highlight container */}
                        {(isSelectedStart || isSelectedEnd) && (
                          <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-[#0f3d6b] dark:bg-[#1a5b9b] z-0 shadow-sm animate-in zoom-in-75 duration-150" />
                        )}
                        <span className={cn(
                          "relative z-10",
                          (isSelectedStart || isSelectedEnd) && "text-white font-bold"
                        )}>
                          {date.getDate()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-8 py-5 bg-zinc-50/50 dark:bg-zinc-900/40 border-t border-zinc-100 dark:border-zinc-850">
              <button
                onClick={handleClearDates}
                className="text-sm font-extrabold text-slate-500 hover:text-slate-850 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
              >
                Clear Filters
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsDateModalOpen(false)}
                  className="px-6 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-750 text-sm font-bold text-slate-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-850 transition-colors"
                >
                  Dismiss
                </button>
                <button
                  onClick={handleApplyDateRange}
                  className="px-6 py-2.5 bg-[#0f3d6b] hover:bg-[#0c3156] text-white rounded-full text-sm font-bold shadow-md transition-colors animate-in fade-in duration-200"
                >
                  Apply Selection
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
