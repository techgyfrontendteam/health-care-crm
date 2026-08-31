import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  AlertCircle,
  ChevronRight,
  Search,
  X,
  Calendar,
  ListFilter,
  Building,
  User,
  ChevronLeft,
} from "lucide-react";
import { cn } from "../../../utils";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useGetAllUsersByRoleIdQuery } from "../../users/api/usersApi";
import { useGetWarRoomDataQuery } from "../api/warRoomApi";
import { useGetAllMasterDataQuery } from "../../master/api/masterApi";
import { useGetAllProjectEmAndRmDataQuery } from "../../leads/api/leadsApi";
import { ReportProgressBar } from "../../reports/components/ReportProgressBar";
import { usePermissions } from "../../../hooks/usePermissions";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "sonner";

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

export const WarRoomPage: React.FC = () => {
  const navigate = useNavigate();
  const { roleCode } = usePermissions();
  const { user } = useAuth();
  const isRmLocked = useMemo(() => {
    return roleCode === "RELMNG";
  }, [roleCode]);

  const [selectedRmName, setSelectedRmName] = useState<string>("All Sales Heads");
  const [isRmDropdownOpen, setIsRmDropdownOpen] = useState(false);
  const [rmSearchQuery, setRmSearchQuery] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState<number>(1);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isSiteVisitsModalOpen, setIsSiteVisitsModalOpen] = useState(false);
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);
  const [isMissedFollowUpsModalOpen, setIsMissedFollowUpsModalOpen] = useState(false);
  const [isVisitLogModalOpen, setIsVisitLogModalOpen] = useState(false);

  // Date Filters State
  const today = useMemo(() => new Date(), []);
  const last7Days = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() - 6);
    return d;
  }, [today]);

  const [startDate, setStartDate] = useState<Date>(today);
  const [endDate, setEndDate] = useState<Date>(today);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(today);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(today);
  const [activeMonth, setActiveMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
  const [quickSelect, setQuickSelect] = useState<string>("Today");
  const [appliedQuickSelect, setAppliedQuickSelect] = useState<string>("Today");
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const calendarDays = useMemo(() => {
    return getDaysInMonth(activeMonth.getFullYear(), activeMonth.getMonth());
  }, [activeMonth]);

  // Fetch RMs mapped to projects
  const { data: projectRmEm = [] } = useGetAllProjectEmAndRmDataQuery(undefined, { skip: isRmLocked });

  const rms = useMemo(() => {
    const projectEntry = projectRmEm.find((p: any) => p.project_id === selectedProjectId);
    const rmData = projectEntry?.rm_data || [];
    return rmData.map((rm: any) => ({
      ...rm,
      first_name: rm.rm_first_name,
      last_name: rm.rm_last_name
    }));
  }, [projectRmEm, selectedProjectId]);

  const { data: masterData } = useGetAllMasterDataQuery();

  const projectOptions = useMemo(() => {
    if (!masterData?.projects) return [{ id: 1, description: "Planet Green" }];
    return masterData.projects;
  }, [masterData]);

  const selectedProject = useMemo(() => {
    return projectOptions.find((p: any) => p.id === selectedProjectId) || projectOptions[0] || { id: 1, description: "Planet Green" };
  }, [projectOptions, selectedProjectId]);

  // Default RM selection is "All RM's"
  // (We intentionally do NOT auto-select the first RM based on user feedback)

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClose = () => {
      setIsRmDropdownOpen(false);
      setIsProjectDropdownOpen(false);
    };
    if (isRmDropdownOpen || isProjectDropdownOpen) {
      window.addEventListener("click", handleClose);
    }
    return () => window.removeEventListener("click", handleClose);
  }, [isRmDropdownOpen, isProjectDropdownOpen]);

  // Filter RMs list in dropdown by search query
  const filteredRms = useMemo(() => {
    const list = rms.map((r) => `${r.first_name} ${r.last_name}`.trim());
    const uniqueList = Array.from(new Set(list));
    if (!rmSearchQuery.trim()) return uniqueList;
    return uniqueList.filter((name) =>
      name.toLowerCase().includes(rmSearchQuery.toLowerCase())
    );
  }, [rms, rmSearchQuery]);

  // Find selected RM object — for locked RM, use the logged-in user directly
  const selectedRm = useMemo(() => {
    if (isRmLocked) return { id: Number(user?.id) };
    return rms.find((r) => `${r.first_name} ${r.last_name}`.trim() === selectedRmName);
  }, [rms, selectedRmName, isRmLocked, user]);

  // Fetch War Room data dynamically
  const queryParams = useMemo(() => {
    return {
      project_id: selectedProjectId,
      start_date: formatApiDate(startDate),
      end_date: formatApiDate(endDate),
      user_id: selectedRm?.id,
    };
  }, [startDate, endDate, selectedRm, selectedProjectId]);

  const { data: apiResponse, isLoading, isError } = useGetWarRoomDataQuery(queryParams);
  const responseData = apiResponse ? ("data" in apiResponse ? apiResponse.data : apiResponse) : undefined;

  // Date Modal Handlers
  const handleQuickSelect = (option: string) => {
    setQuickSelect(option);
    if (option === "Today") {
      setTempStartDate(today);
      setTempEndDate(today);
    } else if (option === "Last 7 Days") {
      setTempStartDate(last7Days);
      setTempEndDate(today);
    } else if (option === "This Month") {
      setTempStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
      setTempEndDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
    }
  };

  const handleDayClick = (date: Date) => {
    const isFuture = new Date(date.getFullYear(), date.getMonth(), date.getDate()) > new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (isFuture) return;

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
    toast("Date range filter applied successfully!");
  };

  const handleClearDates = () => {
    setTempStartDate(today);
    setTempEndDate(today);
    setQuickSelect("Today");
  };

  // 1. kpis mapping
  const kpis = useMemo(() => {
    return {
      newLeadsToday: typeof responseData?.new_leads_today === 'object' ? ((responseData.new_leads_today as any)?.count || 0) : (responseData?.new_leads_today ?? 0),
      siteVisitsCompleted: typeof responseData?.site_visits_completed === 'object' ? ((responseData.site_visits_completed as any)?.count || 0) : (responseData?.site_visits_completed ?? 0),
      bookingsClosed: typeof responseData?.bookings_closed === 'object' ? ((responseData.bookings_closed as any)?.count || 0) : (responseData?.bookings_closed ?? 0),
      missedFollowUps: typeof responseData?.missed_follow_ups === 'object' ? ((responseData.missed_follow_ups as any)?.missed_follow_ups_count || (responseData.missed_follow_ups as any)?.count || 0) : (responseData?.missed_follow_ups ?? 0),
    };
  }, [responseData]);

  // 2. leadQuality mapping
  const leadQuality = useMemo(() => {
    const hotItem = responseData?.lead_quality_distribution?.find(
      (item) => item.name.toLowerCase() === "hot"
    );
    const warmItem = responseData?.lead_quality_distribution?.find(
      (item) => item.name.toLowerCase() === "warm"
    );
    const coldItem = responseData?.lead_quality_distribution?.find(
      (item) => item.name.toLowerCase() === "cold"
    );
    const junkItem = responseData?.lead_quality_distribution?.find(
      (item) => item.name.toLowerCase() === "junk"
    );

    const hot = hotItem?.count ?? 0;
    const warm = warmItem?.count ?? 0;
    const cold = coldItem?.count ?? 0;
    const junk = junkItem?.count ?? 0;

    const total = hot + warm + cold + junk;
    const activeRate = total > 0 ? Math.round(((hot + warm + cold) / total) * 100) : 0;

    return {
      hot,
      warm,
      cold,
      junk,
      activeRate,
      total,
    };
  }, [responseData]);

  // 3. activeObjections mapping
  const activeObjections = useMemo(() => {
    if (!responseData?.active_objections_today) return [];
    const totalObjections = responseData.active_objections_today.reduce((sum, item) => sum + item.count, 0);
    return responseData.active_objections_today.map((item) => ({
      label: item.name,
      percentage: totalObjections > 0 ? Math.round((item.count / totalObjections) * 100) : 0,
    }));
  }, [responseData]);

  // 4. visitLog mapping
  const visitLog = useMemo(() => {
    if (!responseData?.today_visit_logs) return [];
    return responseData.today_visit_logs.map((log) => {
      let formattedTime = "12:00 PM";
      try {
        if (log.datetime) {
          const dateObj = new Date(log.datetime);
          formattedTime = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        }
      } catch (e) { }

      let status: "Negotiation" | "Booking Done" | "Follow Up" = "Follow Up";
      const statusLower = log.lead_status?.toLowerCase() ?? "";
      if (statusLower.includes("negotiation")) {
        status = "Negotiation";
      } else if (
        statusLower.includes("booking") ||
        statusLower.includes("close") ||
        statusLower.includes("done")
      ) {
        status = "Booking Done";
      }

      return {
        time: formattedTime,
        leadName: `${log.first_name ?? ""} ${log.last_name ?? ""}`.trim() || "Unknown Lead",
        projectName: log.project_name || "Planet Green",
        status,
      };
    });
  }, [responseData]);

  // 5. siteVisitsCompletedList mapping
  const siteVisitsCompletedList = useMemo(() => {
    if (!responseData?.today_visit_logs) return [];
    return responseData.today_visit_logs
      .filter(
        (log) =>
          (log.lead_status?.toLowerCase() ?? "").includes("visit") ||
          (log.lead_status?.toLowerCase() ?? "").includes("complete")
      )
      .map((log, idx) => {
        let formattedTime = "12:00 PM";
        try {
          if (log.datetime) {
            const dateObj = new Date(log.datetime);
            formattedTime = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          }
        } catch (e) { }

        return {
          leadName: `${log.first_name ?? ""} ${log.last_name ?? ""}`.trim() || "Unknown Lead",
          time: formattedTime,
          leadId: `#LD-984${idx}`,
          projectName: log.project_name || "Planet Green",
          emName: log.lead_status || "site Visit completed",
        };
      });
  }, [responseData]);

  // 6. bookingsClosedList mapping
  const bookingsClosedList = useMemo(() => {
    if (!responseData?.today_visit_logs) return [];
    return responseData.today_visit_logs
      .filter(
        (log) =>
          (log.lead_status?.toLowerCase() ?? "").includes("booking") ||
          (log.lead_status?.toLowerCase() ?? "").includes("close") ||
          (log.lead_status?.toLowerCase() ?? "").includes("done")
      )
      .map((log, idx) => {
        let formattedTime = "12:00 PM";
        let formattedDate = "Today";
        try {
          if (log.datetime) {
            const dateObj = new Date(log.datetime);
            formattedTime = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            formattedDate = dateObj.toLocaleDateString([], { day: "numeric", month: "short" });
          }
        } catch (e) { }

        return {
          leadName: `${log.first_name ?? ""} ${log.last_name ?? ""}`.trim() || "Unknown Lead",
          date: formattedDate,
          time: formattedTime,
          leadId: `#LD-90${idx}`,
          rmName: `Sales Head: ${selectedRmName}`,
        };
      });
  }, [responseData, selectedRmName]);

  // 7. missedFollowUpsList mapping
  const missedFollowUpsList = useMemo(() => {
    const missedData = typeof responseData?.missed_follow_ups === 'object'
      ? (responseData.missed_follow_ups as any)?.data
      : null;

    if (Array.isArray(missedData) && missedData.length > 0) {
      return missedData.map((log: any, idx: number) => {
        let formattedTime = "12:00 PM";
        let formattedDate = "Today";
        try {
          if (log.followup_date_time) {
            const dateObj = new Date(log.followup_date_time);
            formattedTime = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            formattedDate = dateObj.toLocaleDateString([], { day: "numeric", month: "short" });
          }
        } catch (e) { }

        const assignedName = `${log.assigned_first_name ?? ""} ${log.assigned_last_name ?? ""}`.trim() || selectedRmName;

        return {
          leadName: `${log.first_name ?? ""} ${log.last_name ?? ""}`.trim() || "Unknown Lead",
          date: formattedDate,
          time: formattedTime,
          leadId: log.lead_id || `#LD-90${idx}`,
          assignedTo: `Assigned: ${assignedName}`,
        };
      });
    }

    if (!responseData?.today_visit_logs) return [];
    return responseData.today_visit_logs
      .filter(
        (log) =>
          (log.lead_status?.toLowerCase() ?? "").includes("miss") ||
          (log.lead_status?.toLowerCase() ?? "").includes("follow")
      )
      .map((log, idx) => {
        let formattedTime = "12:00 PM";
        let formattedDate = "Today";
        try {
          if (log.datetime) {
            const dateObj = new Date(log.datetime);
            formattedTime = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            formattedDate = dateObj.toLocaleDateString([], { day: "numeric", month: "short" });
          }
        } catch (e) { }

        return {
          leadName: `${log.first_name ?? ""} ${log.last_name ?? ""}`.trim() || "Unknown Lead",
          date: formattedDate,
          time: formattedTime,
          leadId: `#LD-90${idx}`,
          assignedTo: `Assigned: ${selectedRmName}`,
        };
      });
  }, [responseData, selectedRmName]);

  // 8. metrics mapping
  const metrics = useMemo(() => {
    return {
      callsMade: responseData?.no_of_calls_made ?? 0,
      callsCompleted: responseData?.no_of_calls_completed ?? 0,
      followUps: responseData?.no_of_follow_ups ?? 0,
    };
  }, [responseData]);

  const hasLeadQualityData = leadQuality.hot > 0 || leadQuality.warm > 0 || leadQuality.cold > 0 || leadQuality.junk > 0;
  const donutChartData = hasLeadQualityData
    ? [
      { name: "Hot", value: leadQuality.hot, color: "#ef4444" },
      { name: "Warm", value: leadQuality.warm, color: "#f97316" },
      { name: "Cold", value: leadQuality.cold, color: "#3b82f6" },
      { name: "Junk", value: leadQuality.junk, color: "#94a3b8" },
    ].filter((item) => item.value > 0)
    : [{ name: "Placeholder", value: 100, color: "#e2e8f0" }];

  const getInitials = (name: string) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getAvatarColorClass = (name: string) => {
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
      "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
      "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
      "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
      "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
      "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300",
    ];
    return colors[hash % colors.length];
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[600px] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#002d62] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full min-h-[600px] flex flex-col items-center justify-center gap-3">
        <AlertCircle className="w-10 h-10 text-red-500" />
        <p className="text-slate-500 font-bold text-sm">Failed to load war room metrics.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] xl:max-w-[1920px] mx-auto px-6 py-8 space-y-6 animate-in fade-in duration-300 relative text-slate-800">

      {/* Header Row */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-0.5">
          <h1 className="font-['Plus_Jakarta_Sans'] text-[24px] font-bold leading-[28px] tracking-[-0.5px] text-[#063669] flex items-center h-[28px]">
            Management War Room
          </h1>
          {/* <p className="text-xs text-slate-400 font-medium">
            Monitor real-time sales team statistics and operations.
          </p> */}
        </div>

        {/* Filters Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Manager Dropdown */}
          {!isRmLocked && (
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setIsRmDropdownOpen(!isRmDropdownOpen)}
                className="flex items-center gap-2 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-slate-200/50 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-sm cursor-pointer min-w-[155px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="truncate max-w-[120px]">
                    {selectedRmName === "All Sales Heads" ? "Select Sales Head" : selectedRmName}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {isRmDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl py-3 z-40 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 pb-2.5 border-b border-slate-100 flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search Sales Head..."
                      value={rmSearchQuery}
                      onChange={(e) => setRmSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-slate-700 outline-none placeholder:text-slate-455"
                    />
                  </div>

                  <div className="px-2 pt-2">
                    <button
                      onClick={() => {
                        setSelectedRmName("All Sales Heads");
                        setIsRmDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-bold hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                    >
                      <span>All Sales Heads</span>
                      {selectedRmName === "All Sales Heads" && (
                        <div className="w-4 h-4 rounded-md bg-[#002d62] text-white flex items-center justify-center shrink-0">
                          <svg className="w-3 h-3 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                      )}
                    </button>
                  </div>

                  <div className="px-5 py-2">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">
                      SELECT SALES HEAD
                    </span>
                  </div>

                  <div className="max-h-56 overflow-y-auto px-2 space-y-0.5 scrollbar-thin">
                    {filteredRms.length === 0 ? (
                      <div className="px-3 py-2.5 text-xs text-slate-400 font-medium">
                        No managers found
                      </div>
                    ) : (
                      filteredRms.map((name) => {
                        const isSelected = selectedRmName === name;
                        return (
                          <button
                            key={name}
                            onClick={() => {
                              setSelectedRmName(name);
                              setIsRmDropdownOpen(false);
                              setRmSearchQuery("");
                            }}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold uppercase shrink-0 shadow-xs ${getAvatarColorClass(
                                  name
                                )}`}
                              >
                                {getInitials(name)}
                              </div>
                              <span className="font-bold text-slate-700 truncate max-w-[130px]">
                                {name}
                              </span>
                            </div>
                            {isSelected && (
                              <div className="w-4 h-4 rounded-md bg-[#002d62] text-white flex items-center justify-center shrink-0">
                                <svg className="w-3 h-3 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                              </div>
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Project Dropdown */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
              className="flex items-center gap-2 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-slate-200/50 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-sm cursor-pointer min-w-[155px] justify-between"
            >
              <div className="flex items-center gap-2">
                <ListFilter className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate max-w-[120px]">
                  {selectedProject?.description || "Select Project"}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {isProjectDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-40 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-5 py-2">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">
                    SELECT PROJECT
                  </span>
                </div>
                <div className="max-h-56 overflow-y-auto px-2 space-y-0.5 scrollbar-thin">
                  {projectOptions.map((proj: any) => {
                    const isSelected = selectedProjectId === proj.id;
                    return (
                      <button
                        key={proj.id}
                        onClick={() => {
                          setSelectedProjectId(proj.id);
                          setSelectedRmName("All Sales Heads"); // Reset RM selection when project changes
                          setIsProjectDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <span className="text-slate-700 truncate max-w-[140px]">
                          {proj.description}
                        </span>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-md bg-[#002d62] text-white flex items-center justify-center shrink-0">
                            <svg className="w-3 h-3 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Date Picker Range */}
          <button
            onClick={() => {
              setTempStartDate(startDate);
              setTempEndDate(endDate);
              setQuickSelect(appliedQuickSelect);
              setIsDateModalOpen(true);
            }}
            className="flex items-center gap-2 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-slate-200/50 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-sm cursor-pointer min-w-[140px] min-h-[42px]"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{appliedQuickSelect ? appliedQuickSelect : formatShortDateSpan(startDate, endDate)}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1: New Leads Today */}
        <div className="bg-white dark:bg-zinc-900 rounded-[24px] pt-[24px] px-[24px] pb-[26px] gap-[4px] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between h-[164px]">
          <div className="flex items-center justify-between">
            <div className="w-[40px] h-[34px] rounded-[12px] bg-[rgba(0,35,111,0.05)] dark:bg-zinc-800 flex items-center justify-center shrink-0">
              <img src="/icons/profile.png" className="w-[24px] h-[16px] object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(11%) sepia(87%) saturate(3015%) hue-rotate(216deg) brightness(97%) contrast(106%)' }} alt="Profile" />
            </div>
          </div>
          <div className="flex flex-col mt-auto pt-[12px]">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-[12px] leading-[16px] tracking-[1.2px] uppercase text-[#191C1E] dark:text-zinc-300 block mb-1">
              NEW LEADS TODAY
            </span>
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[36px] leading-[36px] tracking-[-0.72px] text-[#00236F] dark:text-blue-400">
              {kpis.newLeadsToday}
            </h3>
          </div>
        </div>

        {/* KPI 2: Site Visits Completed (Clickable) */}
        <button
          onClick={() => setIsSiteVisitsModalOpen(true)}
          className="bg-white dark:bg-zinc-900 hover:bg-slate-50/50 dark:hover:bg-zinc-800/50 rounded-[24px] pt-[24px] px-[24px] pb-[26px] gap-[4px] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between h-[164px] text-left w-full transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-[40px] h-[34px] rounded-[12px] bg-[rgba(0,35,111,0.05)] dark:bg-zinc-800 flex items-center justify-center shrink-0">
              <img src="/icons/location.png" className="w-[24px] h-[24px] object-contain" alt="Location" />
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="flex flex-col mt-auto pt-[12px]">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-[12px] leading-[16px] tracking-[1.2px] uppercase text-[#191C1E] dark:text-zinc-300 block mb-1">
              SITE VISITS COMPLETED
            </span>
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[36px] leading-[36px] tracking-[-0.72px] text-[#00236F] dark:text-blue-400">
              {kpis.siteVisitsCompleted}
            </h3>
          </div>
        </button>

        {/* KPI 3: Bookings Closed (Clickable) */}
        <button
          onClick={() => setIsBookingsModalOpen(true)}
          className="bg-white dark:bg-zinc-900 hover:bg-slate-50/50 dark:hover:bg-zinc-800/50 rounded-[24px] pt-[24px] px-[24px] pb-[26px] gap-[4px] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between h-[164px] text-left w-full transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-[40px] h-[34px] rounded-[12px] bg-[rgba(0,35,111,0.05)] dark:bg-zinc-800 flex items-center justify-center shrink-0">
              <img src="/icons/bookings.png" className="w-[24px] h-[24px] object-contain" alt="Bookings" />
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="flex flex-col mt-auto pt-[12px]">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-[12px] leading-[16px] tracking-[1.2px] uppercase text-[#191C1E] dark:text-zinc-300 block mb-1">
              BOOKINGS CLOSED
            </span>
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[36px] leading-[36px] tracking-[-0.72px] text-[#00236F] dark:text-blue-400">
              {kpis.bookingsClosed}
            </h3>
          </div>
        </button>

        {/* KPI 4: Missed Follow-ups (Clickable, soft red alert layout) */}
        <button
          onClick={() => setIsMissedFollowUpsModalOpen(true)}
          className="bg-[#fef2f2] dark:bg-red-950/20 hover:bg-[#fee2e2]/60 dark:hover:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-[24px] pt-[24px] px-[24px] pb-[26px] gap-[4px] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between h-[164px] text-left w-full transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-[40px] h-[34px] rounded-[12px] bg-[#fee2e2] dark:bg-red-950/50 flex items-center justify-center text-[#991b1b] dark:text-red-400 shrink-0">
              <AlertCircle className="w-[20px] h-[20px]" />
            </div>
            <ChevronRight className="w-5 h-5 text-[#f87171] group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="flex flex-col mt-auto pt-[12px]">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-[12px] leading-[16px] tracking-[1.2px] uppercase text-[#b91c1c] dark:text-red-400 block mb-1">
              MISSED FOLLOW-UPS
            </span>
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[36px] leading-[36px] tracking-[-0.72px] text-[#991b1b] dark:text-red-300">
              {kpis.missedFollowUps}
            </h3>
          </div>
        </button>
      </div>

      {/* Row 2: Charts (Lead Quality Donut & Active Objections) */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Card: Lead Quality Distribution */}
        <div className="bg-white dark:bg-zinc-900 border border-[#F3F4F6] dark:border-zinc-800 rounded-[24px] p-[25px] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between h-[345px] w-full">
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-[18px] leading-[28px] text-[#191C1E] dark:text-zinc-100 flex items-center h-[28px] pb-[16px]">
            Lead Quality Distribution
          </h2>

          <div className="flex flex-col items-center justify-center my-auto w-full">
            {/* Donut Chart */}
            <div className="relative w-[153.6px] h-[153.6px] flex items-center justify-center shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius="72%"
                    outerRadius="90%"
                    paddingAngle={0}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {donutChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="font-['Plus_Jakarta_Sans'] font-black text-[24px] leading-[29px] text-[#191C1E] dark:text-zinc-100">
                  {leadQuality.total}
                </span>
                <span className="font-['Inter'] font-bold text-[8px] leading-[12px] text-[#757682] dark:text-zinc-400 uppercase tracking-widest mt-0.5">
                  ACTIVE
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-x-[36px] gap-y-[8px] w-full mt-4 px-[16px]">
              {/* Hot */}
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-[8px]">
                  <span className="w-[8px] h-[8px] rounded-full shrink-0 bg-[#EF4444]" />
                  <span className="font-['Inter'] font-medium text-[14px] leading-[20px] text-[#444651] dark:text-zinc-300">Hot</span>
                </div>
                <span className="font-['Inter'] font-bold text-[14px] leading-[20px] text-[#191C1E] dark:text-zinc-150">{leadQuality.hot}</span>
              </div>

              {/* Warm */}
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-[8px]">
                  <span className="w-[8px] h-[8px] rounded-full shrink-0 bg-[#FB923C]" />
                  <span className="font-['Inter'] font-medium text-[14px] leading-[20px] text-[#444651] dark:text-zinc-300">Warm</span>
                </div>
                <span className="font-['Inter'] font-bold text-[14px] leading-[20px] text-[#191C1E] dark:text-zinc-150">{leadQuality.warm}</span>
              </div>

              {/* Cold */}
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-[8px]">
                  <span className="w-[8px] h-[8px] rounded-full shrink-0 bg-[#3B82F6]" />
                  <span className="font-['Inter'] font-medium text-[14px] leading-[20px] text-[#444651] dark:text-zinc-300">Cold</span>
                </div>
                <span className="font-['Inter'] font-bold text-[14px] leading-[20px] text-[#191C1E] dark:text-zinc-150">{leadQuality.cold}</span>
              </div>

              {/* Junk */}
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-[8px]">
                  <span className="w-[8px] h-[8px] rounded-full shrink-0 bg-[#9CA3AF]" />
                  <span className="font-['Inter'] font-medium text-[14px] leading-[20px] text-[#444651] dark:text-zinc-300">Junk</span>
                </div>
                <span className="font-['Inter'] font-bold text-[14px] leading-[20px] text-[#191C1E] dark:text-zinc-150">{leadQuality.junk}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Active Objections Today */}
        <div className="bg-white dark:bg-zinc-900 border border-[#F3F4F6] dark:border-zinc-800 rounded-[24px] p-[25px] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between h-[345px] w-full">
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-[18px] leading-[28px] text-[#191C1E] dark:text-zinc-100 flex items-center h-[28px] pb-[16px]">
            Active Objections Today
          </h2>

          <div className="my-auto flex flex-col gap-[12px] justify-center">
            {activeObjections.length === 0 ? (
              <div className="text-center py-12 text-xs font-semibold text-slate-400">
                There is no data available
              </div>
            ) : (
              activeObjections.map((objection) => (
                <div key={objection.label} className="space-y-2">
                  <div className="flex items-center justify-between font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] text-[#001549] dark:text-blue-400">
                    <span className="truncate pr-2">{objection.label}</span>
                    <span className="shrink-0">{objection.percentage}%</span>
                  </div>
                  <div className="h-[8px] w-full bg-[#E1E5ED] dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#001549] dark:bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(Math.max(objection.percentage, 0), 100)}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Row 3: Today's Visit Log & Call Metrics Stack */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Today's Visit Log (takes 2/3 width) */}
        <div className="bg-white dark:bg-zinc-900 rounded-[24px] pt-[24px] px-[24px] pb-[97px] gap-[24px] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] flex flex-col lg:col-span-2 h-[450px]">
          <div className="flex items-center justify-between">
            <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-[18px] leading-[24px] text-[#00236F] dark:text-blue-400 flex items-center h-[24px]">
              Today's Visit Log
            </h2>
            {visitLog.length > 4 && (
              <button
                onClick={() => setIsVisitLogModalOpen(true)}
                className="font-['Inter'] font-bold text-[14px] leading-[20px] text-[#00236F] dark:text-blue-400 hover:underline cursor-pointer flex items-center h-[20px]"
              >
                View All ({visitLog.length})
              </button>
            )}
          </div>

          <div className="flex flex-col gap-[16px] overflow-y-auto h-[350px]">
            {visitLog.length === 0 ? (
              <div className="text-center py-12 text-xs font-semibold text-slate-400">
                There is no data available
              </div>
            ) : (
              visitLog.slice(0, 4).map((visit, index) => (
                <div
                  key={index}
                  className="bg-[#F8F9FB] dark:bg-zinc-950/40 rounded-[24px] p-[16px] gap-[16px] h-[75.5px] flex items-center justify-between shrink-0"
                >
                  <div className="flex items-center gap-[16px] min-w-0 flex-1">
                    <div className="w-[70px] min-w-[70px] flex justify-center items-center">
                      <span className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] text-[#00236F] dark:text-blue-400 text-center">
                        {visit.time}
                      </span>
                    </div>
                    <div className="w-[2px] h-[40px] bg-[#002d62]/10 dark:bg-zinc-800 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] leading-[24px] text-[#191C1E] dark:text-zinc-150 truncate">
                        {visit.leadName}
                      </h4>
                      <span className="flex items-center gap-[4px] mt-[2px] text-[14px] font-normal font-['Inter'] text-[#575E70] dark:text-zinc-400">
                        <Building className="w-[12px] h-[12px] shrink-0 text-[#575E70] dark:text-zinc-400" />
                        {visit.projectName}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span
                      className={`flex items-center justify-center px-[12px] py-[4px] h-[26px] rounded-full text-[12px] font-bold font-['Inter'] shrink-0 ${visit.status === "Negotiation"
                          ? "bg-[rgba(0,35,111,0.05)] text-[#00236F] dark:bg-blue-950/30 dark:text-blue-300"
                          : visit.status === "Booking Done"
                            ? "bg-[#00236F] text-white dark:bg-blue-600 dark:text-white"
                            : "bg-[#E1E2E4] text-[#191C1E] dark:bg-zinc-800 dark:text-zinc-300"
                        }`}
                    >
                      {visit.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Three stacked cards (calls & follow-ups) */}
        <div className="flex flex-col gap-4 lg:col-span-1 justify-between">
          {/* Card 1 */}
          <div className="bg-white border border-slate-100 rounded-[24px] pt-[38px] pb-[32px] px-[32px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col gap-2 justify-center h-[140px]">
            <span className="block text-[10px] font-bold text-slate-500 tracking-widest uppercase">
              NO. OF CALLS MADE
            </span>
            <span className="text-[32px] leading-none font-black text-[#002d62]">
              {metrics.callsMade}
            </span>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-100 rounded-[24px] pt-[38px] pb-[32px] px-[32px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col gap-2 justify-center h-[140px]">
            <span className="block text-[10px] font-bold text-slate-500 tracking-widest uppercase">
              NO. OF CALLS COMPLETED
            </span>
            <span className="text-[32px] leading-none font-black text-[#002d62]">
              {metrics.callsCompleted}
            </span>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-100 rounded-[24px] pt-[38px] pb-[32px] px-[32px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col gap-2 justify-center h-[140px]">
            <span className="block text-[10px] font-bold text-slate-500 tracking-widest uppercase">
              NO. OF FOLLOWUPS
            </span>
            <span className="text-[32px] leading-none font-black text-[#002d62]">
              {metrics.followUps}
            </span>
          </div>
        </div>
      </div>

      {/* Site Visits Completed Popup/Modal */}
      {isSiteVisitsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            className="bg-white border border-slate-150 rounded-[32px] shadow-2xl w-full max-w-lg p-6 space-y-6 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-slate-850">
                    Site Visits Completed
                  </h3>
                  <span className="bg-blue-50 text-[#002d62] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#002d62]" />
                    {siteVisitsCompletedList.length.toString().padStart(2, "0")} Completed
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-semibold">
                  {siteVisitsCompletedList.length} completions tracked
                </p>
              </div>
              <button
                onClick={() => setIsSiteVisitsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="max-h-[350px] overflow-y-auto space-y-3 pr-1">
              {siteVisitsCompletedList.length === 0 ? (
                <div className="text-center py-12 text-xs font-semibold text-slate-400">
                  There is no data available
                </div>
              ) : (
                siteVisitsCompletedList.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black uppercase shrink-0 ${getAvatarColorClass(
                          item.leadName
                        )}`}
                      >
                        {getInitials(item.leadName)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 truncate">
                          {item.leadName}
                        </h4>
                        <div className="text-[9px] text-slate-400 font-bold flex items-center gap-1.5 mt-1">
                          <span>{item.leadId}</span>
                          <span>•</span>
                          <span>{item.projectName}</span>
                          <span>•</span>
                          <span className="text-[#002d62]">{item.emName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-bold text-[#002d62]">
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* View All Button */}
            <button
              onClick={() => setIsSiteVisitsModalOpen(false)}
              className="w-full bg-[#002d62] hover:bg-[#081a3e] text-white py-3 rounded-2xl text-xs font-bold shadow-md shadow-[#002d62]/20 transition-all cursor-pointer text-center"
            >
              View All Activity
            </button>
          </div>
        </div>
      )}

      {/* Bookings Completed Popup/Modal */}
      {isBookingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            className="bg-white border border-slate-150 rounded-[32px] shadow-2xl w-full max-w-lg p-6 space-y-6 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-slate-850">
                    Bookings Completed
                  </h3>
                  <span className="bg-rose-50 text-rose-500 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    {bookingsClosedList.length.toString().padStart(2, "0")} Bookings
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsBookingsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="max-h-[350px] overflow-y-auto space-y-3 pr-1">
              {bookingsClosedList.length === 0 ? (
                <div className="text-center py-12 text-xs font-semibold text-slate-400">
                  There is no data available
                </div>
              ) : (
                bookingsClosedList.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-black uppercase shrink-0 ${getAvatarColorClass(
                          item.leadName
                        )}`}
                      >
                        {getInitials(item.leadName)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-850 truncate">
                          {item.leadName}
                        </h4>
                        <div className="text-[10px] text-slate-400 font-bold flex items-center gap-2 mt-1">
                          <span>{item.date}</span>
                          <span>•</span>
                          <span>{item.time}</span>
                        </div>
                        <div className="text-[10px] text-[#002d62] font-semibold mt-0.5">
                          {item.rmName}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-slate-400">
                        {item.leadId}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Missed Follow-ups Popup/Modal */}
      {isMissedFollowUpsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            className="bg-white border border-slate-150 rounded-[32px] shadow-2xl w-full max-w-lg p-6 space-y-6 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-slate-850">
                    Missed Follow-ups
                  </h3>
                  <span className="bg-rose-50 text-rose-500 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    {missedFollowUpsList.length.toString().padStart(2, "0")} Overdue
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsMissedFollowUpsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="max-h-[350px] overflow-y-auto space-y-3 pr-1">
              {missedFollowUpsList.length === 0 ? (
                <div className="text-center py-12 text-xs font-semibold text-slate-400">
                  There is no data available
                </div>
              ) : (
                missedFollowUpsList.slice(0, 10).map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#f8fafc] dark:bg-zinc-850/50 border border-slate-100 dark:border-zinc-800 rounded-2xl p-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-black uppercase shrink-0 ${getAvatarColorClass(
                          item.leadName
                        )}`}
                      >
                        {getInitials(item.leadName)}
                      </div>
                      <div className="min-w-0 space-y-1">
                        <h4 className="text-[13px] font-extrabold text-slate-800 dark:text-zinc-100 truncate tracking-tight">
                          {item.leadName}
                        </h4>
                        <div className="text-[10px] text-slate-500 dark:text-zinc-400 font-bold flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 opacity-70" />
                          <span>{item.date} • {item.time}</span>
                        </div>
                        <div className="text-[10px] text-slate-600 dark:text-zinc-400 font-semibold flex items-center gap-1.5">
                          <User className="w-3 h-3 opacity-70" />
                          <span>{item.assignedTo}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 self-start mt-1">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500">
                        {item.leadId}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      {/* Today's Visit Log — Full List Modal */}
      {isVisitLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            className="bg-white border border-slate-150 rounded-[32px] shadow-2xl w-full max-w-lg p-6 space-y-6 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-slate-850">
                    Today's Visit Log
                  </h3>
                  <span className="bg-blue-50 text-[#002d62] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#002d62]" />
                    {visitLog.length.toString().padStart(2, "0")} Total
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-semibold">
                  All scheduled visits for today
                </p>
              </div>
              <button
                onClick={() => setIsVisitLogModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Full List */}
            <div className="max-h-[400px] overflow-y-auto space-y-3 pr-1">
              {visitLog.map((visit, index) => (
                <div
                  key={index}
                  className="bg-[#eef2f6] rounded-2xl p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-[#002d62] shrink-0 w-20 text-left">
                      {visit.time}
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 truncate">
                        {visit.leadName}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-1.5 mt-0.5">
                        <img src="/icons/building.png" className="w-3.5 h-3.5 object-contain shrink-0" alt="Project" />
                        {visit.projectName}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span
                      className={`text-[9px] font-black uppercase tracking-wider inline-flex items-center justify-center rounded-full ${visit.status === "Negotiation"
                        ? "bg-blue-100 text-blue-800 px-3 h-[26px]"
                        : visit.status === "Booking Done"
                          ? "bg-[#002d62] text-white px-3 h-[26px]"
                          : "bg-slate-200 text-slate-700 w-[81px] h-[26px]"
                        }`}
                    >
                      {visit.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigate Button */}
            <button
              onClick={() => {
                setIsVisitLogModalOpen(false);
                navigate("/scheduled-visits");
              }}
              className="w-full bg-[#002d62] hover:bg-[#081a3e] text-white py-3 rounded-2xl text-xs font-bold shadow-md shadow-[#002d62]/20 transition-all cursor-pointer text-center"
            >
              View All in Scheduled Visits →
            </button>
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
                        onClick={() => !isFuture && handleDayClick(date)}
                        className={cn(
                          "relative py-2 text-xs font-bold select-none flex items-center justify-center transition-all duration-150",
                          isCurrentMonth && !isFuture ? "text-slate-800 dark:text-zinc-200" : "text-slate-300 dark:text-zinc-600/60",
                          isFuture ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
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
