import React, { useState, useEffect, useMemo } from "react";
import { X, Search, Check, Loader2, Calendar as CalendarIcon, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Dialog, DialogContent } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { cn } from "../../../utils";
import { useGetReporteesQuery } from "../../../features/users/api/usersApi";

type FilterSection = "status" | "date" | "projects" | "opdLeads" | "ipdLeads" | "rms" | "ems";

interface Option {
  value: string;
  label: string;
}

/*
const OPD_OPTIONS: Option[] = [
  { value: "opd_consultation", label: "OPD Consultation" },
  { value: "opd_followup", label: "OPD Follow-up" },
  { value: "opd_new", label: "OPD New Patient" },
  { value: "opd_active", label: "OPD Active" },
];

const IPD_OPTIONS: Option[] = [
  { value: "ipd_admission", label: "IPD Admission" },
  { value: "ipd_surgery", label: "IPD Surgery" },
  { value: "ipd_inpatient", label: "IPD In-Patient" },
  { value: "ipd_discharge", label: "IPD Discharge" },
  { value: "ipd_active", label: "IPD Active" },
];
*/

interface UserOption {
  id: number;
  first_name: string;
  last_name: string;
}

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: {
    statusIds: string[];
    projectIds: string[];
    rmIds: string[];
    emIds: string[];
    startDate?: string | null;
    endDate?: string | null;
    dateQuickSelect?: string;
    opdLeads?: string[];
    ipdLeads?: string[];
  }) => void;
  onReset: () => void;
  // Current applied values
  statusIds: string[];
  projectIds: string[];
  rmIds: string[];
  emIds: string[];
  startDate?: string | null;
  endDate?: string | null;
  dateQuickSelect?: string;
  opdLeads?: string[];
  ipdLeads?: string[];
  // Options
  statusOptions: Option[];
  projectOptions: Option[];
  rmOptions: UserOption[];
  // Visibility
  showRmFilter?: boolean;
  showEmFilter?: boolean;
  showProjectFilter?: boolean;
  showDateFilter?: boolean;
}

// ── Date Utility Helpers ──
const formatApiDate = (d: Date | null): string => {
  if (!d) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseDateSafe = (val: string | null | undefined): Date | null => {
  if (!val) return null;
  try {
    const clean = val.replace(/Z/g, "").split("+")[0].replace(" ", "T");
    const d = new Date(clean);
    if (!isNaN(d.getTime())) return d;
    const fallback = new Date(val);
    return isNaN(fallback.getTime()) ? null : fallback;
  } catch {
    return null;
  }
};

const formatShortDate = (d: Date | null): string => {
  if (!d) return "";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${d.getDate()} ${months[d.getMonth()]}`;
};

const formatRangeLabel = (start: Date | null, end: Date | null, quickSelect?: string): string => {
  if (quickSelect && quickSelect !== "Custom Range" && quickSelect !== "All Time") {
    return quickSelect;
  }
  if (!start && !end) return "All Time";
  if (start && !end) return formatShortDate(start);
  if (!start && end) return `Until ${formatShortDate(end)}`;
  if (start && end) {
    if (start.toDateString() === end.toDateString()) {
      return formatShortDate(start);
    }
    return `${formatShortDate(start)} – ${formatShortDate(end)}`;
  }
  return "All Time";
};

const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days = [];

  let firstDayIndex = date.getDay();
  firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Mon = 0

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

const isSameDay = (d1: Date | null, d2: Date | null) => {
  if (!d1 || !d2) return false;
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

const isWithinRange = (d: Date, start: Date | null, end: Date | null) => {
  if (!start || !end) return false;
  const time = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const startTime = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const endTime = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return time >= startTime && time <= endTime;
};

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-orange-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-teal-500",
  "bg-indigo-500",
];

function getAvatarColor(id: number) {
  return AVATAR_COLORS[id % AVATAR_COLORS.length];
}

export const FilterDialog = ({
  open,
  onClose,
  onApply,
  onReset,
  statusIds,
  projectIds,
  rmIds,
  emIds,
  startDate = null,
  endDate = null,
  dateQuickSelect = "",
  opdLeads = [],
  ipdLeads = [],
  statusOptions,
  projectOptions,
  rmOptions,
  showRmFilter = true,
  showEmFilter = false,
  showProjectFilter = false,
  showDateFilter = true,
}: FilterDialogProps) => {
  const [activeSection, setActiveSection] = useState<FilterSection>("status");
  const [localStatus, setLocalStatus] = useState<string[]>(statusIds);
  const [localProjects, setLocalProjects] = useState<string[]>(projectIds);
  const [localRmId, setLocalRmId] = useState<string>(rmIds[0] || "");
  const [localEmIds, setLocalEmIds] = useState<string[]>(emIds);
  const [localOpdLeads, setLocalOpdLeads] = useState<string[]>(opdLeads);
  const [localIpdLeads, setLocalIpdLeads] = useState<string[]>(ipdLeads);
  const [localStartDate, setLocalStartDate] = useState<Date | null>(() => parseDateSafe(startDate));
  const [localEndDate, setLocalEndDate] = useState<Date | null>(() => parseDateSafe(endDate));
  const [localDateQuickSelect, setLocalDateQuickSelect] = useState<string>(dateQuickSelect || "");
  const [activeMonth, setActiveMonth] = useState<Date>(() => parseDateSafe(startDate) || new Date());
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [userSearch, setUserSearch] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  const { data: liveEms = [], isFetching: isFetchingEms } = useGetReporteesQuery(
    { reporting_manager_id: Number(localRmId), offset: 0 },
    { skip: !localRmId },
  );

  // Sync local state when dialog opens
  useEffect(() => {
    if (!open) {
      setIsInitialized(false);
      return;
    }

    if (open && !isInitialized) {
      setLocalStatus(statusIds || []);
      setLocalProjects(projectIds || []);
      setLocalRmId(rmIds[0] || "");
      setLocalEmIds(emIds || []);
      setLocalOpdLeads(opdLeads || []);
      setLocalIpdLeads(ipdLeads || []);
      const parsedStart = parseDateSafe(startDate);
      const parsedEnd = parseDateSafe(endDate);
      setLocalStartDate(parsedStart);
      setLocalEndDate(parsedEnd);
      setLocalDateQuickSelect(dateQuickSelect || "");
      if (parsedStart) {
        setActiveMonth(new Date(parsedStart.getFullYear(), parsedStart.getMonth(), 1));
      }
      setUserSearch("");
      setActiveSection("status");
      setIsInitialized(true);
    }
  }, [open, isInitialized, projectIds, rmIds, emIds, statusIds, opdLeads, ipdLeads, startDate, endDate, dateQuickSelect]);

  const sections: { key: FilterSection; label: string; show: boolean }[] = [
    // { key: "projects" as FilterSection, label: "Projects", show: showProjectFilter },
    { key: "status" as FilterSection, label: "Status", show: true },
    { key: "date" as FilterSection, label: "Date Range", show: showDateFilter },
    // { key: "opdLeads" as FilterSection, label: "OPD Leads", show: true },
    // { key: "ipdLeads" as FilterSection, label: "IPD Leads", show: true },
    { key: "rms" as FilterSection, label: "Sales Executives", show: showRmFilter },
    // { key: "ems" as FilterSection, label: "Sales Executives", show: showEmFilter },
  ].filter((s) => s.show);

  const toggleMulti = (
    value: string,
    current: string[],
    setter: (v: string[]) => void,
  ) => {
    setter(
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    );
  };

  const handleSelectRm = (id: string) => {
    if (localRmId === id) {
      setLocalRmId("");
      setLocalEmIds([]);
    } else {
      setLocalRmId(id);
      setLocalEmIds([]);
    }
  };

  const handleQuickSelect = (preset: string) => {
    setLocalDateQuickSelect(preset);
    const today = new Date();

    if (preset === "Today") {
      setLocalStartDate(today);
      setLocalEndDate(today);
      setActiveMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    } else if (preset === "Yesterday") {
      const y = new Date();
      y.setDate(today.getDate() - 1);
      setLocalStartDate(y);
      setLocalEndDate(y);
      setActiveMonth(new Date(y.getFullYear(), y.getMonth(), 1));
    } else if (preset === "Last 7 Days") {
      const s = new Date();
      s.setDate(today.getDate() - 6);
      setLocalStartDate(s);
      setLocalEndDate(today);
      setActiveMonth(new Date(s.getFullYear(), s.getMonth(), 1));
    } else if (preset === "Last 30 Days") {
      const s = new Date();
      s.setDate(today.getDate() - 29);
      setLocalStartDate(s);
      setLocalEndDate(today);
      setActiveMonth(new Date(s.getFullYear(), s.getMonth(), 1));
    } else if (preset === "This Month") {
      const s = new Date(today.getFullYear(), today.getMonth(), 1);
      const e = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      setLocalStartDate(s);
      setLocalEndDate(e);
      setActiveMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    } else if (preset === "Last Month") {
      const s = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const e = new Date(today.getFullYear(), today.getMonth(), 0);
      setLocalStartDate(s);
      setLocalEndDate(e);
      setActiveMonth(new Date(s.getFullYear(), s.getMonth(), 1));
    } else if (preset === "All Time") {
      setLocalStartDate(null);
      setLocalEndDate(null);
    }
  };

  const handleDayClick = (dayDate: Date) => {
    const today = new Date();
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const clickMidnight = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate()).getTime();
    if (clickMidnight > todayMidnight) {
      return; // Disallow future dates
    }

    setLocalDateQuickSelect("");
    if (!localStartDate || (localStartDate && localEndDate)) {
      setLocalStartDate(dayDate);
      setLocalEndDate(null);
    } else {
      if (dayDate < localStartDate) {
        setLocalStartDate(dayDate);
        setLocalEndDate(localStartDate);
      } else {
        setLocalEndDate(dayDate);
      }
    }
  };

  const handleApply = () => {
    const effectiveEndDate = localStartDate && !localEndDate ? localStartDate : localEndDate;
    onApply({
      statusIds: localStatus,
      projectIds: localProjects,
      rmIds: localRmId ? [localRmId] : [],
      emIds: localEmIds,
      startDate: formatApiDate(localStartDate) || null,
      endDate: formatApiDate(effectiveEndDate) || null,
      dateQuickSelect: localDateQuickSelect,
      opdLeads: localOpdLeads,
      ipdLeads: localIpdLeads,
    });
    onClose();
  };

  const handleReset = () => {
    setLocalStatus([]);
    setLocalProjects([]);
    setLocalRmId("");
    setLocalEmIds([]);
    setLocalOpdLeads([]);
    setLocalIpdLeads([]);
    setLocalStartDate(null);
    setLocalEndDate(null);
    setLocalDateQuickSelect("");
    onReset();
    onClose();
  };

  const filteredRms = rmOptions.filter((u) =>
    `${u.first_name} ${u.last_name}`
      .toLowerCase()
      .includes(userSearch.toLowerCase()),
  );

  const filteredEms = liveEms.filter((u) =>
    `${u.first_name} ${u.last_name}`
      .toLowerCase()
      .includes(userSearch.toLowerCase()),
  );

  const monthDays = useMemo(() => {
    return getDaysInMonth(activeMonth.getFullYear(), activeMonth.getMonth());
  }, [activeMonth]);

  const renderChips = (
    selected: string[],
    options: Option[],
    onRemove: (v: string) => void,
  ) => {
    if (selected.length === 0)
      return (
        <p className="text-sm text-muted-foreground italic">None selected</p>
      );
    return (
      <div className="flex flex-wrap gap-2">
        {selected.map((v) => {
          const label = options.find((o) => o.value === v)?.label ?? v;
          return (
            <span
              key={v}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-primary-foreground"
            >
              {label}
              <button onClick={() => onRemove(v)} className="hover:opacity-70 cursor-pointer">
                <X className="h-3 w-3" />
              </button>
            </span>
          );
        })}
      </div>
    );
  };

  const renderUserRow = (
    u: UserOption,
    isSelected: boolean,
    onClick: () => void,
    role: string,
  ) => (
    <button
      key={u.id}
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer",
        isSelected
          ? "bg-primary/8 dark:bg-primary/10"
          : "hover:bg-muted/40",
      )}
    >
      <div
        className={cn(
          "w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold",
          getAvatarColor(u.id),
        )}
      >
        {getInitials(u.first_name, u.last_name)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">
          {u.first_name} {u.last_name}
        </p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>
      {/* Jira-style check indicator */}
      <div
        className={cn(
          "shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
          isSelected
            ? "border-primary bg-primary"
            : "border-border/60",
        )}
      >
        {isSelected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </div>
    </button>
  );

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="p-0 w-[95vw] max-w-5xl gap-0 overflow-hidden rounded-2xl border-border-2 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-border-2">
          <h2 className="text-lg font-bold text-foreground">Filter leads</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Filter by the following options
          </p>
        </div>

        {/* Body */}
        <div className="flex flex-col md:flex-row h-[70vh] min-h-0 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-full md:w-40 border-r border-border-2 shrink-0 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.key}
                onClick={() => {
                  setActiveSection(section.key);
                  setUserSearch("");
                }}
                className={cn(
                  "w-full text-left px-4 py-4 text-sm font-medium border-b border-border-2 transition-colors cursor-pointer",
                  activeSection === section.key
                    ? "bg-blue-50 dark:bg-blue-950/20 text-primary font-bold border-l-2 border-l-primary"
                    : "text-muted-foreground hover:bg-muted/50",
                )}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Right Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-5 py-4 space-y-5 min-w-0">
            {/* ── Status ── */}
            {activeSection === "status" && (
              <>
                <div>
                  <p className="text-sm font-bold text-foreground mb-3">
                    Selected
                  </p>
                  {renderChips(localStatus, statusOptions, (v) =>
                    setLocalStatus(localStatus.filter((s) => s !== v)),
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground mb-3">
                    Select from
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions
                      .filter((o) => !localStatus.includes(o.value))
                      .map((o) => (
                        <button
                          key={o.value}
                          onClick={() =>
                            toggleMulti(o.value, localStatus, setLocalStatus)
                          }
                          className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border-2 text-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
                        >
                          {o.label}
                        </button>
                      ))}
                  </div>
                </div>
              </>
            )}

            {/* ── Date Range ── */}
            {activeSection === "date" && (
              <div className="space-y-6">
                {/* 1. Selected Range Preview */}
                <div>
                  <p className="text-sm font-bold text-foreground mb-2.5">
                    Selected Range
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {localStartDate || localEndDate || (localDateQuickSelect && localDateQuickSelect !== "All Time") ? (
                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-primary text-primary-foreground shadow-xs">
                        <CalendarIcon className="w-3.5 h-3.5 opacity-80" />
                        {formatRangeLabel(localStartDate, localEndDate, localDateQuickSelect)}
                        <button
                          type="button"
                          onClick={() => {
                            setLocalStartDate(null);
                            setLocalEndDate(null);
                            setLocalDateQuickSelect("All Time");
                          }}
                          className="hover:opacity-75 cursor-pointer ml-1 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">All Time (No date constraint applied)</p>
                    )}
                  </div>
                </div>

                {/* 2. Quick Select Presets */}
                <div>
                  <p className="text-sm font-bold text-foreground mb-2.5">
                    Quick Select Presets
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["All Time", "Today", "Yesterday", "Last 7 Days", "Last 30 Days", "This Month", "Last Month"].map(
                      (preset) => {
                        const isSelected = localDateQuickSelect === preset;
                        return (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => handleQuickSelect(preset)}
                            className={cn(
                              "px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer",
                              isSelected
                                ? "bg-primary text-primary-foreground border-primary shadow-xs"
                                : "border-border-2 text-foreground hover:border-primary hover:text-primary bg-background"
                            )}
                          >
                            {preset}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* 3. Interactive Calendar & Manual Inputs */}
                <div className="pt-2 border-t border-border-2">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Calendar Month View */}
                    <div className="w-full sm:w-[280px] p-3 rounded-2xl border border-border-2 bg-muted/20 space-y-3">
                      {/* Month Navigation Header */}
                      <div className="flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() - 1, 1))
                          }
                          className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs font-bold text-foreground">
                          {activeMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                        </span>
                        <button
                          type="button"
                          disabled={
                            activeMonth.getFullYear() > new Date().getFullYear() ||
                            (activeMonth.getFullYear() === new Date().getFullYear() && activeMonth.getMonth() >= new Date().getMonth())
                          }
                          onClick={() => {
                            const now = new Date();
                            const isCurrentOrFuture =
                              activeMonth.getFullYear() > now.getFullYear() ||
                              (activeMonth.getFullYear() === now.getFullYear() && activeMonth.getMonth() >= now.getMonth());
                            if (!isCurrentOrFuture) {
                              setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() + 1, 1));
                            }
                          }}
                          className={cn(
                            "p-1.5 rounded-lg transition-colors",
                            activeMonth.getFullYear() > new Date().getFullYear() ||
                            (activeMonth.getFullYear() === new Date().getFullYear() && activeMonth.getMonth() >= new Date().getMonth())
                              ? "opacity-30 cursor-not-allowed text-muted-foreground/40"
                              : "hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                          )}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Day of Week Headers */}
                      <div className="grid grid-cols-7 text-center">
                        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                          <span key={d} className="text-[10px] font-bold text-muted-foreground py-0.5">
                            {d}
                          </span>
                        ))}
                      </div>

                      {/* Days Grid */}
                      <div className="grid grid-cols-7 gap-y-1">
                        {monthDays.map((item, index) => {
                          const today = new Date();
                          const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
                          const cellMidnight = new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate()).getTime();
                          const isFuture = cellMidnight > todayMidnight;

                          const isStart = isSameDay(item.date, localStartDate);
                          const isEnd = isSameDay(item.date, localEndDate || (localStartDate && hoverDate && hoverDate > localStartDate ? hoverDate : null));
                          const inRange = isWithinRange(
                            item.date,
                            localStartDate,
                            localEndDate || (localStartDate && hoverDate && hoverDate > localStartDate ? hoverDate : null)
                          );
                          const isToday = isSameDay(item.date, today);

                          return (
                            <div
                              key={index}
                              className={cn(
                                "relative py-0.5 flex items-center justify-center transition-colors",
                                !isFuture && inRange && !isStart && !isEnd && "bg-blue-50/80 dark:bg-blue-950/40",
                                !isFuture && isStart && (localEndDate || hoverDate) && "bg-gradient-to-r from-transparent to-blue-50/80 dark:to-blue-950/40 rounded-l-full",
                                !isFuture && isEnd && localStartDate && "bg-gradient-to-l from-transparent to-blue-50/80 dark:to-blue-950/40 rounded-r-full"
                              )}
                              onMouseEnter={() => {
                                if (localStartDate && !localEndDate && !isFuture) {
                                  setHoverDate(item.date);
                                }
                              }}
                            >
                              <button
                                type="button"
                                onClick={isFuture ? undefined : () => handleDayClick(item.date)}
                                disabled={isFuture}
                                className={cn(
                                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all relative z-10",
                                  isFuture && "opacity-25 cursor-not-allowed pointer-events-none text-muted-foreground/30",
                                  !isFuture && !item.isCurrentMonth && "text-muted-foreground/40 cursor-pointer",
                                  !isFuture && item.isCurrentMonth && "text-foreground hover:bg-muted cursor-pointer",
                                  !isFuture && isToday && !isStart && !isEnd && "border border-primary font-bold text-primary",
                                  !isFuture && (isStart || isEnd) &&
                                    "bg-primary text-primary-foreground font-bold shadow-xs hover:bg-primary scale-105"
                                )}
                              >
                                {item.date.getDate()}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Direct Inputs & Summary */}
                    <div className="flex-1 space-y-4 flex flex-col justify-between">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-foreground mb-1.5">
                            From Date
                          </label>
                          <input
                            type="date"
                            value={formatApiDate(localStartDate)}
                            onChange={(e) => {
                              const d = parseDateSafe(e.target.value);
                              setLocalStartDate(d);
                              setLocalDateQuickSelect("Custom Range");
                              if (d) setActiveMonth(new Date(d.getFullYear(), d.getMonth(), 1));
                            }}
                            className="w-full rounded-xl border border-border-2 bg-background px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-foreground mb-1.5">
                            To Date
                          </label>
                          <input
                            type="date"
                            value={formatApiDate(localEndDate)}
                            onChange={(e) => {
                              const d = parseDateSafe(e.target.value);
                              setLocalEndDate(d);
                              setLocalDateQuickSelect("Custom Range");
                            }}
                            className="w-full rounded-xl border border-border-2 bg-background px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => handleQuickSelect("All Time")}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-muted cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Reset Date Filter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Projects (Commented out) ── */}
            {/*
            {activeSection === "projects" && (
              <>
                <div>
                  <p className="text-sm font-bold text-foreground mb-3">
                    Selected
                  </p>
                  {renderChips(localProjects, projectOptions, (v) =>
                    setLocalProjects(localProjects.filter((p) => p !== v)),
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground mb-3">
                    Select from
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {projectOptions
                      .filter((o) => !localProjects.includes(o.value))
                      .map((o) => (
                        <button
                          key={o.value}
                          onClick={() =>
                            toggleMulti(o.value, localProjects, setLocalProjects)
                          }
                          className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border-2 text-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
                        >
                          {o.label}
                        </button>
                      ))}
                  </div>
                </div>
              </>
            )}
            */}

            {/* ── OPD Leads (Commented out) ── */}
            {/*
            {activeSection === "opdLeads" && (
              <>
                <div>
                  <p className="text-sm font-bold text-foreground mb-3">
                    Selected
                  </p>
                  {renderChips(localOpdLeads, OPD_OPTIONS, (v) =>
                    setLocalOpdLeads(localOpdLeads.filter((t) => t !== v)),
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground mb-3">
                    Select from
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {OPD_OPTIONS.filter((o) => !localOpdLeads.includes(o.value)).map((o) => (
                      <button
                        key={o.value}
                        onClick={() =>
                          toggleMulti(o.value, localOpdLeads, setLocalOpdLeads)
                        }
                        className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border-2 text-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            */}

            {/* ── IPD Leads (Commented out) ── */}
            {/*
            {activeSection === "ipdLeads" && (
              <>
                <div>
                  <p className="text-sm font-bold text-foreground mb-3">
                    Selected
                  </p>
                  {renderChips(localIpdLeads, IPD_OPTIONS, (v) =>
                    setLocalIpdLeads(localIpdLeads.filter((t) => t !== v)),
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground mb-3">
                    Select from
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {IPD_OPTIONS.filter((o) => !localIpdLeads.includes(o.value)).map((o) => (
                      <button
                        key={o.value}
                        onClick={() =>
                          toggleMulti(o.value, localIpdLeads, setLocalIpdLeads)
                        }
                        className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border-2 text-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            */}

            {/* ── RM's (Sales Heads, single-select, Jira-style) ── */}
            {activeSection === "rms" && (
              <>
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search Sales Executives..."
                    className="pl-9 rounded-lg h-10 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  {filteredRms.map((u) =>
                    renderUserRow(
                      u,
                      localRmId === String(u.id),
                      () => handleSelectRm(String(u.id)),
                      "Sales Executive",
                    ),
                  )}
                </div>
              </>
            )}

            {/* ── EM's (Sales Executives, commented out) ── */}
            {/*
            {activeSection === "ems" && (
              <>
                {!localRmId ? (
                  <div className="flex flex-col items-center justify-center h-40 gap-2 text-muted-foreground">
                    <p className="text-sm font-medium">Select a Sales Head first</p>
                    <p className="text-xs">Go to the Sales Heads tab to pick a Sales Head.</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="text-sm font-bold text-foreground mb-3">Selected</p>
                      {localEmIds.length === 0 ? (
                        <p className="text-sm text-muted-foreground italic">None selected</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {localEmIds.map((v) => {
                            const user = filteredEms.find((u) => String(u.id) === v) ||
                              liveEms.find((u) => String(u.id) === v);
                            const label = user ? `${user.first_name} ${user.last_name}` : v;
                            return (
                              <span
                                key={v}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-primary-foreground"
                              >
                                {label}
                                <button
                                  onClick={() => setLocalEmIds(localEmIds.filter((e) => e !== v))}
                                  className="hover:opacity-70"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-foreground mb-3">Select from</p>
                      <div className="relative mb-3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          value={userSearch}
                          onChange={(e) => setUserSearch(e.target.value)}
                          placeholder="Search Sales Executives..."
                          className="pl-9 rounded-lg h-10 text-sm"
                        />
                      </div>

                      {isFetchingEms ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        </div>
                      ) : filteredEms.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-6">
                          No sales executives found.
                        </p>
                      ) : (
                        <div className="space-y-1 overflow-y-auto">
                          {filteredEms
                            .filter((u) => !localEmIds.includes(String(u.id)))
                            .map((u) =>
                              renderUserRow(
                                u,
                                false,
                                () => toggleMulti(String(u.id), localEmIds, setLocalEmIds),
                                "Sales Executive",
                              ),
                            )}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
            */}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 md:px-6 py-4 border-t border-border-2 bg-background">
          <Button
            variant="ghost"
            onClick={handleReset}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
          >
            Clear filters
          </Button>
          <div className="flex w-full sm:w-auto gap-3 justify-end">
            <Button variant="ghost" onClick={onClose} className="text-muted-foreground cursor-pointer">
              Cancel
            </Button>
            <Button onClick={handleApply} className="cursor-pointer">Apply filter</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
