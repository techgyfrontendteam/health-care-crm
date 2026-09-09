import React, { useState, useMemo, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useGetVisitsByUserIdQuery } from "../../leads/api/leadsApi";
import { useGetAllMasterDataQuery } from "../../master/api/masterApi";
import {
  Calendar as CalendarIcon,
  Plus,
  Search,
  MapPin,
  Clock,
  ChevronDown,
  Check,
  Minus,
  User,
  Activity,
  Phone,
} from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { ScheduleVisitDialog } from "../../leads/components/ScheduleVisitDialog";
import {
  useGetAllUsersByRoleIdQuery,
  useGetReporteesQuery,
} from "../../users/api/usersApi";
import { usePermissions } from "../../../hooks/usePermissions";
import { cn } from "../../../utils";

// Date formatting helpers
const formatApiDate = (d: Date | null | undefined) => {
  if (!d) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDisplayDate = (dateString: string) => {
  if (!dateString) return "TBD";
  try {
    const safeDate = dateString.endsWith("Z") ? dateString.slice(0, -1) : dateString;
    const d = new Date(safeDate.replace(" ", "T"));
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

const formatDisplayTime = (dateString: string) => {
  if (!dateString) return "TBD";
  try {
    const safeDate = dateString.endsWith("Z") ? dateString.slice(0, -1) : dateString;
    const d = new Date(safeDate.replace(" ", "T"));
    if (isNaN(d.getTime())) return "TBD";
    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "TBD";
  }
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

const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days = [];

  let firstDayIndex = date.getDay();
  firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const prevMonth = new Date(year, month, 0);
  const prevMonthDaysCount = prevMonth.getDate();
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthDaysCount - i),
      isCurrentMonth: false,
    });
  }

  const currentMonthDaysCount = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= currentMonthDaysCount; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  const totalCells = days.length > 35 ? 42 : 35;
  const nextDaysCount = totalCells - days.length;
  for (let i = 1; i <= nextDaysCount; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  return days;
};

const getInitials = (firstName: string, lastName: string) => {
  const fn = (firstName || "").trim();
  const ln = (lastName || "").trim();
  if (!fn && !ln) return "PT";
  return `${fn.charAt(0)}${ln.charAt(0)}`.toUpperCase();
};

const getStatusBadgeStyle = (codeOrDesc: string) => {
  const str = (codeOrDesc || "").toUpperCase();
  if (str.includes("OPDBKD") || str.includes("BOOKED")) {
    return {
      bg: "bg-blue-50 text-blue-700 border border-blue-200/80 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800",
      dot: "bg-blue-500",
      label: "OPD Booked",
    };
  }
  if (str.includes("OPDCMP") || str.includes("COMPLETED")) {
    return {
      bg: "bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
      dot: "bg-emerald-500",
      label: "OPD Completed",
    };
  }
  if (str.includes("NOTVIS") || str.includes("NOT VISITED")) {
    return {
      bg: "bg-amber-50 text-amber-700 border border-amber-200/80 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
      dot: "bg-amber-500",
      label: "Not Visited",
    };
  }
  if (str.includes("CANCEL")) {
    return {
      bg: "bg-rose-50 text-rose-700 border border-rose-200/80 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800",
      dot: "bg-rose-500",
      label: "Appointment Cancelled",
    };
  }
  if (str.includes("RESCHD") || str.includes("RESCHEDULED")) {
    return {
      bg: "bg-purple-50 text-purple-700 border border-purple-200/80 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800",
      dot: "bg-purple-500",
      label: "Appointment Rescheduled",
    };
  }
  return {
    bg: "bg-zinc-100 text-zinc-700 border border-zinc-200/80 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700",
    dot: "bg-zinc-400",
    label: codeOrDesc || "Unknown",
  };
};

const BRANCH_CITIES = ["All", "Hyderabad", "Bengaluru", "Mumbai", "Delhi", "Chennai", "Pune"];

export const ScheduledVisitsPage = () => {
  const { emId: paramEmId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { roleCode } = usePermissions();
  const isAdmin = roleCode === "SADMIN" || roleCode === "ADMIN";
  const isRM = roleCode === "RELMNG";
  const isEM = roleCode === "EXPMNG";

  // Master Data & Users Queries
  const { data: masterData } = useGetAllMasterDataQuery();
  const { data: rms = [] } = useGetAllUsersByRoleIdQuery({
    role_id: 3,
    offset: 0,
  });
  const { data: allEms = [] } = useGetAllUsersByRoleIdQuery(
    { role_id: 4, offset: 0 },
    { skip: !isAdmin },
  );
  const { data: reportees = [] } = useGetReporteesQuery(
    { reporting_manager_id: Number(user?.id) || 0, offset: 0 },
    { skip: !isRM || !user?.id },
  );

  // Available EM / Sales Executive options
  const emOptions = useMemo(() => {
    if (isAdmin) {
      const combined = [...allEms, ...rms];
      return Array.from(new Map(combined.map((u: any) => [Number(u.id), u])).values());
    }
    if (isRM) {
      const nameParts = (user?.name || "").split(" ");
      const rmUser = user
        ? ({
            ...user,
            id: Number(user.id),
            first_name: nameParts[0] || "",
            last_name: nameParts.slice(1).join(" "),
          } as any)
        : null;
      return rmUser ? [rmUser, ...reportees] : reportees;
    }
    if (isEM && user) {
      const nameParts = (user.name || "").split(" ");
      return [
        {
          ...user,
          id: Number(user.id),
          first_name: nameParts[0] || "",
          last_name: nameParts.slice(1).join(" "),
        } as any,
      ];
    }
    return [];
  }, [isAdmin, isRM, isEM, allEms, rms, reportees, user]);

  // Appointment Statuses extracted from Master Data
  const appointmentStatuses = useMemo(() => {
    const list =
      (masterData as any)?.appointment_status ||
      (masterData as any)?.appointment_statuses ||
      (masterData as any)?.site_visit_status ||
      (masterData as any)?.site_visit_statuses ||
      [];
    if (Array.isArray(list) && list.length > 0) {
      return list;
    }
    // Fallback to standard master data statuses
    return [
      { id: 1, code: "OPDBKD", description: "OPD Booked" },
      { id: 2, code: "OPDCMP", description: "OPD Completed" },
      { id: 3, code: "NOTVIS", description: "Not Visited" },
      { id: 4, code: "CANCEL", description: "Appointment Cancelled" },
      { id: 5, code: "RESCHD", description: "Appointment Rescheduled" },
    ];
  }, [masterData]);

  // ═══════════════════════════════════════════════════════
  // Filter States
  // ═══════════════════════════════════════════════════════

  // 1. Sales Executive Multi-select Checkboxes
  const [selectedEmIds, setSelectedEmIds] = useState<number[]>([]);
  const [hasInitializedEms, setHasInitializedEms] = useState(false);
  const [isEmDropdownOpen, setIsEmDropdownOpen] = useState(false);
  const emDropdownRef = useRef<HTMLDivElement>(null);

  // Initialize selected EM IDs with all available IDs on load
  useEffect(() => {
    if (emOptions.length > 0 && !hasInitializedEms) {
      if (paramEmId) {
        setSelectedEmIds([Number(paramEmId)]);
      } else {
        setSelectedEmIds(emOptions.map((e: any) => Number(e.id)));
      }
      setHasInitializedEms(true);
    }
  }, [emOptions, hasInitializedEms, paramEmId]);

  // 2. Appointment Status Filter State
  const [selectedStatusId, setSelectedStatusId] = useState<number>(0); // 0 = All Appointments
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement>(null);

  // 3. Date Range Filter State
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
  const [endDate, setEndDate] = useState<Date>(today);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(today);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(today);
  const [activeMonth, setActiveMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
  const [quickSelect, setQuickSelect] = useState<string>("Today");
  const [appliedQuickSelect, setAppliedQuickSelect] = useState<string>("Today");
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const dateDropdownRef = useRef<HTMLDivElement>(null);

  const calendarDays = useMemo(() => {
    return getDaysInMonth(activeMonth.getFullYear(), activeMonth.getMonth());
  }, [activeMonth]);

  // 4. Branch & Search Filters
  const [branchFilter, setBranchFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emDropdownRef.current && !emDropdownRef.current.contains(event.target as Node)) {
        setIsEmDropdownOpen(false);
      }
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setIsStatusDropdownOpen(false);
      }
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target as Node)) {
        setIsDateModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Multi-select EM Helpers
  const isAllEmsSelected = useMemo(() => {
    return emOptions.length > 0 && selectedEmIds.length === emOptions.length;
  }, [emOptions, selectedEmIds]);

  const isPartialEmsSelected = useMemo(() => {
    return selectedEmIds.length > 0 && selectedEmIds.length < emOptions.length;
  }, [emOptions, selectedEmIds]);

  const handleToggleSelectAllEms = () => {
    if (isAllEmsSelected) {
      setSelectedEmIds([]);
    } else {
      setSelectedEmIds(emOptions.map((e: any) => Number(e.id)));
    }
  };

  const handleToggleEm = (emId: number) => {
    setSelectedEmIds((prev) =>
      prev.includes(emId) ? prev.filter((id) => id !== emId) : [...prev, emId]
    );
  };

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

  const handleDayClick = (dayDate: Date) => {
    setQuickSelect("");
    if (!tempStartDate || (tempStartDate && tempEndDate)) {
      setTempStartDate(dayDate);
      setTempEndDate(null);
    } else {
      if (dayDate < tempStartDate) {
        setTempStartDate(dayDate);
      } else {
        setTempEndDate(dayDate);
      }
    }
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
  };

  // ═══════════════════════════════════════════════════════
  // API Query
  // ═══════════════════════════════════════════════════════
  const apiStartDate = useMemo(() => formatApiDate(startDate) || "2026-09-08", [startDate]);
  const apiEndDate = useMemo(() => formatApiDate(endDate) || "2026-09-08", [endDate]);

  const queryUserIds = useMemo(() => {
    if (isEM && user?.id) return [Number(user.id)];
    if (selectedEmIds.length > 0) return selectedEmIds;
    if (hasInitializedEms && selectedEmIds.length === 0) return [0];
    if (emOptions.length > 0) return emOptions.map((e: any) => Number(e.id));
    return [0];
  }, [isEM, user, selectedEmIds, hasInitializedEms, emOptions]);

  const queryPayload = useMemo(
    () => ({
      user_ids: queryUserIds,
      offset: 0,
      start_date: apiStartDate,
      end_date: apiEndDate,
      appointments_status_id: selectedStatusId,
    }),
    [queryUserIds, apiStartDate, apiEndDate, selectedStatusId]
  );

  const {
    data: visitsData,
    isLoading,
    isFetching,
    error: visitsError,
    refetch,
  } = useGetVisitsByUserIdQuery(queryPayload);

  // Log API response to console
  useEffect(() => {
    console.log("=== [API] appointments/getVisitsByUserId ===");
    console.log("Request Payload:", queryPayload);
    console.log("Response Data:", visitsData);
    if (visitsError) {
      console.error("API Error:", visitsError);
    }
  }, [visitsData, visitsError, queryPayload]);

  // Extract visits list safely
  const rawVisitsList = useMemo(() => {
    if (!visitsData) return [];
    if (Array.isArray(visitsData)) return visitsData;
    if (Array.isArray((visitsData as any).visits)) return (visitsData as any).visits;
    if (Array.isArray((visitsData as any).appointments)) return (visitsData as any).appointments;
    if (Array.isArray((visitsData as any).data)) return (visitsData as any).data;
    return [];
  }, [visitsData]);

  // Local Search & Branch Filtering
  const filteredVisits = useMemo(() => {
    let list = rawVisitsList;

    // Search query filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter((v: any) => {
        const name = `${v.c_first_name || v.first_name || ""} ${v.c_last_name || v.last_name || ""}`.toLowerCase();
        const leadId = (v.lead_id || v.lead_uuid || "").toString().toLowerCase();
        const phone = (v.phone_number || v.c_phone_number || "").toLowerCase();
        const doctor = (v.doctor_name || v.doctor || "").toLowerCase();
        const location = (v.visit_location_url || v.hospital_branch || v.branch || "").toLowerCase();
        return name.includes(q) || leadId.includes(q) || phone.includes(q) || doctor.includes(q) || location.includes(q);
      });
    }

    // Branch filter
    if (branchFilter !== "All") {
      const bQuery = branchFilter.toLowerCase();
      list = list.filter((v: any) => {
        const branchStr = (v.hospital_branch || v.branch_name || v.branch || v.visit_location_url || "").toLowerCase();
        return branchStr.includes(bQuery);
      });
    }

    return list;
  }, [rawVisitsList, searchTerm, branchFilter]);

  // Pagination
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, branchFilter, selectedStatusId, selectedEmIds, startDate, endDate]);

  const totalPages = Math.max(1, Math.ceil(filteredVisits.length / ITEMS_PER_PAGE));
  const paginatedVisits = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredVisits.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredVisits, currentPage]);

  const selectedStatusObj = useMemo(() => {
    if (selectedStatusId === 0) return null;
    return appointmentStatuses.find((s: any) => Number(s.id) === selectedStatusId);
  }, [selectedStatusId, appointmentStatuses]);

  return (
    <div className="flex flex-col h-full bg-transparent pt-6 pb-20 px-4 sm:px-6 space-y-6 font-['Inter']">
      
      {/* ═══════════════════════════════════════════════════════ */}
      {/* Header Row: Title & Action Button                      */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#063669] dark:text-blue-300 font-['Plus_Jakarta_Sans'] tracking-tight">
            Appointments
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium mt-0.5">
            Track and manage patient hospital visits &amp; OPD appointments.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsScheduleOpen(true)}
          className="flex items-center justify-center gap-1.5 px-5 h-9 bg-[#063669] hover:bg-[#052b53] text-white rounded-full text-xs font-semibold transition-all cursor-pointer active:scale-95 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Schedule Appointment</span>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* Filters Bar: Sales Exec, Status, Date Range, Branch     */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-3">
          
          {/* 1. SALES EXECUTIVE MULTI-SELECT FILTER */}
          {!isEM && (
            <div className="relative" ref={emDropdownRef}>
              <span className="text-[9px] font-bold text-slate-400 dark:text-zinc-500 block mb-1 uppercase tracking-wider">
                SALES EXECUTIVE
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsEmDropdownOpen(!isEmDropdownOpen);
                  setIsStatusDropdownOpen(false);
                  setIsDateModalOpen(false);
                }}
                className="flex items-center gap-2.5 bg-white dark:bg-zinc-900 hover:bg-slate-50 border border-slate-200/80 dark:border-zinc-800 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-200 transition-colors cursor-pointer min-w-[170px] justify-between shadow-2xs"
              >
                <span className="truncate max-w-[125px]">
                  {selectedEmIds.length === 0
                    ? "None Selected"
                    : isAllEmsSelected
                    ? "All Sales Executives"
                    : selectedEmIds.length === 1
                    ? `${emOptions.find((e: any) => Number(e.id) === selectedEmIds[0])?.first_name || ""} ${emOptions.find((e: any) => Number(e.id) === selectedEmIds[0])?.last_name || ""}`.trim()
                    : `${selectedEmIds.length} Selected`}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-blue-50 text-[#063669] dark:bg-blue-950 dark:text-blue-300">
                    {selectedEmIds.length}/{emOptions.length}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </button>

              {isEmDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-64 max-h-72 overflow-y-auto scrollbar-thin bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl p-2 z-30 space-y-1">
                  {/* Select All */}
                  <div
                    onClick={handleToggleSelectAllEms}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-[#063669] dark:text-blue-300 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer border-b border-slate-100 dark:border-zinc-800 pb-2 mb-1"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                          isAllEmsSelected
                            ? "bg-[#063669] border-[#063669] text-white"
                            : isPartialEmsSelected
                            ? "bg-blue-100 border-[#063669] text-[#063669]"
                            : "border-slate-300 bg-white dark:bg-zinc-900"
                        }`}
                      >
                        {isAllEmsSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        {isPartialEmsSelected && <Minus className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>Select All Sales Executives</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">{emOptions.length}</span>
                  </div>

                  {/* Options List */}
                  {emOptions.length === 0 ? (
                    <div className="px-3 py-3 text-center text-xs text-slate-400 font-medium">
                      No Sales Executives found
                    </div>
                  ) : (
                    emOptions.map((em: any) => {
                      const emId = Number(em.id);
                      const isSelected = selectedEmIds.includes(emId);
                      const fullName = `${em.first_name || ""} ${em.last_name || ""}`.trim() || "Sales Executive";
                      return (
                        <div
                          key={emId}
                          onClick={() => handleToggleEm(emId)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer select-none"
                        >
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                              isSelected
                                ? "bg-[#063669] border-[#063669] text-white"
                                : "border-slate-300 bg-white dark:bg-zinc-900"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="truncate flex-1">{fullName}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          )}

          {/* 2. APPOINTMENT STATUS DROPDOWN FILTER */}
          <div className="relative" ref={statusDropdownRef}>
            <span className="text-[9px] font-bold text-slate-400 dark:text-zinc-500 block mb-1 uppercase tracking-wider">
              APPOINTMENT STATUS
            </span>
            <button
              type="button"
              onClick={() => {
                setIsStatusDropdownOpen(!isStatusDropdownOpen);
                setIsEmDropdownOpen(false);
                setIsDateModalOpen(false);
              }}
              className="flex items-center gap-2.5 bg-white dark:bg-zinc-900 hover:bg-slate-50 border border-slate-200/80 dark:border-zinc-800 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-200 transition-colors cursor-pointer min-w-[180px] justify-between shadow-2xs"
            >
              <div className="flex items-center gap-2 truncate">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    selectedStatusId === 0
                      ? "bg-slate-400"
                      : getStatusBadgeStyle(selectedStatusObj?.code || "").dot
                  }`}
                />
                <span className="truncate">
                  {selectedStatusId === 0
                    ? "All Statuses"
                    : selectedStatusObj?.description || "Select Status"}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
            </button>

            {isStatusDropdownOpen && (
              <div className="absolute left-0 mt-1.5 w-60 max-h-72 overflow-y-auto scrollbar-thin bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl p-2 z-30 space-y-1">
                {/* Option 0: All Appointments */}
                <div
                  onClick={() => {
                    setSelectedStatusId(0);
                    setIsStatusDropdownOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-colors",
                    selectedStatusId === 0
                      ? "bg-blue-50 text-[#063669] font-bold dark:bg-blue-950/60 dark:text-blue-300"
                      : "text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    <span>All Appointments</span>
                  </div>
                  {selectedStatusId === 0 && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                </div>

                <div className="h-px bg-slate-100 dark:border-zinc-800 my-1" />

                {/* Statuses from Master Data */}
                {appointmentStatuses.map((status: any) => {
                  const sId = Number(status.id);
                  const isSelected = selectedStatusId === sId;
                  const style = getStatusBadgeStyle(status.code || status.description);
                  return (
                    <div
                      key={sId}
                      onClick={() => {
                        setSelectedStatusId(sId);
                        setIsStatusDropdownOpen(false);
                      }}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-colors",
                        isSelected
                          ? "bg-blue-50 text-[#063669] font-bold dark:bg-blue-950/60 dark:text-blue-300"
                          : "text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900"
                      )}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${style.dot}`} />
                        <span className="truncate">{status.description}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. CALENDAR DATE RANGE PICKER */}
          <div className="relative" ref={dateDropdownRef}>
            <span className="text-[9px] font-bold text-slate-400 dark:text-zinc-500 block mb-1 uppercase tracking-wider">
              DATE RANGE
            </span>
            <button
              type="button"
              onClick={() => {
                setTempStartDate(startDate);
                setTempEndDate(endDate);
                setIsDateModalOpen(!isDateModalOpen);
                setIsEmDropdownOpen(false);
                setIsStatusDropdownOpen(false);
              }}
              className="flex items-center gap-2.5 bg-white dark:bg-zinc-900 hover:bg-slate-50 border border-slate-200/80 dark:border-zinc-800 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-200 transition-colors cursor-pointer min-w-[160px] justify-between shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-3.5 h-3.5 text-[#063669] dark:text-blue-400 shrink-0" />
                <span>{appliedQuickSelect ? appliedQuickSelect : formatShortDateSpan(startDate, endDate)}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isDateModalOpen && (
              <div className="absolute left-0 mt-1.5 w-[330px] bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl p-4 z-30 space-y-3">
                {/* Quick select buttons */}
                <div className="grid grid-cols-2 gap-1.5">
                  {["Today", "Next 7 Days", "Last 7 Days", "This Month"].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleQuickSelect(preset)}
                      className={cn(
                        "py-1.5 px-2 text-[11px] font-semibold rounded-lg border transition-all cursor-pointer",
                        quickSelect === preset
                          ? "bg-[#063669] text-white border-[#063669]"
                          : "border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900"
                      )}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <div className="h-px bg-slate-100 dark:border-zinc-800" />

                {/* Mini Calendar Month Grid */}
                <div>
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                      {activeMonth.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() - 1, 1))
                        }
                        className="px-2 py-0.5 text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded"
                      >
                        &lt;
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() + 1, 1))
                        }
                        className="px-2 py-0.5 text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded"
                      >
                        &gt;
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-1">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                      <span key={i}>{d}</span>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((item, idx) => {
                      const isStart =
                        tempStartDate && item.date.toDateString() === tempStartDate.toDateString();
                      const isEnd = tempEndDate && item.date.toDateString() === tempEndDate.toDateString();
                      const inRange =
                        tempStartDate &&
                        tempEndDate &&
                        item.date >= tempStartDate &&
                        item.date <= tempEndDate;

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleDayClick(item.date)}
                          className={cn(
                            "h-7 w-7 text-xs rounded-lg flex items-center justify-center font-medium transition-all mx-auto cursor-pointer",
                            !item.isCurrentMonth && "text-slate-300 dark:text-zinc-700",
                            item.isCurrentMonth && "text-slate-700 dark:text-zinc-200",
                            inRange && "bg-blue-50 text-[#063669] dark:bg-blue-950/60 dark:text-blue-300",
                            (isStart || isEnd) && "bg-[#063669] text-white font-bold"
                          )}
                        >
                          {item.date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setIsDateModalOpen(false)}
                    className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleApplyDateRange}
                    className="px-4 py-1.5 bg-[#063669] hover:bg-[#052b53] text-white text-xs font-semibold rounded-lg transition-all cursor-pointer"
                  >
                    Apply Range
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 4. BRANCH FILTER */}
          <div>
            <span className="text-[9px] font-bold text-slate-400 dark:text-zinc-500 block mb-1 uppercase tracking-wider">
              BRANCH
            </span>
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-zinc-200 outline-none focus:ring-1 focus:ring-[#063669] cursor-pointer shadow-2xs h-[37px]"
            >
              {BRANCH_CITIES.map((b) => (
                <option key={b} value={b}>
                  {b === "All" ? "All Branches" : b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Count Summary Indicator */}
        <div className="text-xs text-slate-500 dark:text-zinc-400 font-medium self-end pb-1">
          Showing <strong className="text-slate-800 dark:text-zinc-100 font-bold">{filteredVisits.length}</strong> appointments
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* Search Input Bar                                       */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Search appointments by patient name, lead ID, doctor, or branch..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 h-11 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 text-xs font-medium placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-[#063669]"
        />
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* Appointment Cards List                                 */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="space-y-3 pt-1">
        {isLoading || isFetching ? (
          <div className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-2xl p-12 text-center text-xs font-semibold text-slate-500 dark:text-zinc-400 flex flex-col items-center justify-center gap-3">
            <div className="w-7 h-7 border-3 border-[#063669] border-t-transparent rounded-full animate-spin" />
            <span>Loading appointments...</span>
          </div>
        ) : filteredVisits.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-12 text-center text-xs font-semibold text-slate-400 dark:text-zinc-500 flex flex-col items-center justify-center gap-3">
            <CalendarIcon className="w-9 h-9 text-slate-300 dark:text-zinc-700" />
            <span>No appointments found for the selected filters.</span>
            <button
              type="button"
              onClick={() => setIsScheduleOpen(true)}
              className="flex items-center gap-1.5 bg-[#063669] hover:bg-[#052b53] text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Schedule New Appointment
            </button>
          </div>
        ) : (
          paginatedVisits.map((visit: any, index: number) => {
            const firstName = visit.c_first_name || visit.first_name || "";
            const lastName = visit.c_last_name || visit.last_name || "";
            const fullName = `${firstName} ${lastName}`.trim() || "Patient";
            const initials = getInitials(firstName, lastName);
            const leadIdStr = visit.lead_id || `LEAD-${visit.id || "N/A"}`;
            const statusStyle = getStatusBadgeStyle(
              visit.visit_status_description || visit.status_code || visit.status || ""
            );
            const rawDateTime = visit.visit_date_time || visit.appointment_date_time || visit.created_on || "";

            return (
              <div
                key={visit.id || visit.uuid || index}
                className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col gap-3"
              >
                {/* Card Top Row: Patient Info & Status Pill */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Avatar initials */}
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#063669] dark:text-blue-300 border border-blue-100 dark:border-blue-900 flex items-center justify-center text-xs font-bold shrink-0">
                      {initials}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#191C1E] dark:text-zinc-100 leading-snug">
                          {fullName}
                        </h3>
                        <span className="text-zinc-400 text-xs font-medium">
                          • #{leadIdStr}
                        </span>
                      </div>
                      {(visit.phone_number || visit.c_phone_number) && (
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium mt-0.5">
                          <Phone className="w-3 h-3 text-[#063669] dark:text-blue-400" />
                          <span>{visit.phone_number || visit.c_phone_number}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Pill */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${statusStyle.bg}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                    <span>{visit.visit_status_description || statusStyle.label}</span>
                  </span>
                </div>

                {/* Card Middle Row: Date, Time, Doctor, Branch, Sales Executive */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-500 font-medium pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
                  {/* Date */}
                  <span className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 font-semibold">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#063669] dark:text-blue-400" />
                    {formatDisplayDate(rawDateTime)}
                  </span>
                  <span className="text-zinc-300 dark:text-zinc-700">•</span>

                  {/* Time */}
                  <span className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#063669] dark:text-blue-400" />
                    {formatDisplayTime(rawDateTime)}
                  </span>

                  {/* Doctor Name */}
                  {(visit.doctor_name || visit.doctor) && (
                    <>
                      <span className="text-zinc-300 dark:text-zinc-700">•</span>
                      <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-300">
                        Doctor: <strong className="text-zinc-800 dark:text-zinc-100 font-semibold">{visit.doctor_name || visit.doctor}</strong>
                      </span>
                    </>
                  )}

                  {/* Department / Branch */}
                  {(visit.hospital_branch || visit.branch || visit.department || visit.specialization) && (
                    <>
                      <span className="text-zinc-300 dark:text-zinc-700">•</span>
                      <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-300">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{visit.hospital_branch || visit.branch || visit.department || visit.specialization}</span>
                      </span>
                    </>
                  )}

                  {/* Sales Executive */}
                  {(visit.assigned_to_em_name || visit.assigned_em || visit.em_name) && (
                    <>
                      <span className="text-zinc-300 dark:text-zinc-700">•</span>
                      <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-300">
                        <User className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Executive: <strong className="text-zinc-800 dark:text-zinc-100">{visit.assigned_to_em_name || visit.assigned_em || visit.em_name}</strong></span>
                      </span>
                    </>
                  )}
                </div>

                {/* Card Remarks / Notes */}
                {(visit.visit_remarks || visit.remarks || visit.notes) && (
                  <div className="bg-slate-50/90 dark:bg-zinc-950/60 border border-slate-200/70 dark:border-zinc-800/80 rounded-lg px-2.5 py-1.5 text-xs flex items-start gap-2 mt-0.5">
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-[#063669] bg-blue-50 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-100 dark:border-blue-900/50 px-1.5 py-0.5 rounded">
                      NOTES
                    </span>
                    <p className="text-zinc-700 dark:text-zinc-300 text-[11.5px] leading-snug whitespace-pre-wrap break-words">
                      {visit.visit_remarks || visit.remarks || visit.notes}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* Pagination Controls                                     */}
      {/* ═══════════════════════════════════════════════════════ */}
      {filteredVisits.length > ITEMS_PER_PAGE && (
        <div className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-xl px-5 py-3 text-xs font-semibold">
          <span className="text-slate-500">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 text-xs font-semibold cursor-pointer"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 text-xs font-semibold cursor-pointer"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Schedule Dialog context */}
      {isScheduleOpen && (
        <ScheduleVisitDialog
          open={isScheduleOpen}
          onClose={() => setIsScheduleOpen(false)}
          lead={null as any}
          siteVisitStatuses={appointmentStatuses}
          rms={rms}
          onSubmit={async () => {}}
          isLoading={false}
        />
      )}
    </div>
  );
};
