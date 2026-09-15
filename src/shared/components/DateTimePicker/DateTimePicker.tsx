import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../utils";
import { WheelTimePicker } from "./WheelTimePicker";

export interface DateTimePickerProps {
  value?: string | Date | null;
  onChange?: (val: string, date?: Date) => void;
  outputFormat?: "iso" | "datetime-string" | "date-only" | "timestamp";
  placeholder?: string;
  disabled?: boolean;
  disablePastDates?: boolean;
  className?: string;
  error?: string | boolean;
  minDate?: Date;
  maxDate?: Date;
  showQuickPresets?: boolean;
}

const formatTwoDigits = (n: number) => String(n).padStart(2, "0");

const formatDateString = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = formatTwoDigits(date.getMonth() + 1);
  const dd = formatTwoDigits(date.getDate());
  const hh = formatTwoDigits(date.getHours());
  const min = formatTwoDigits(date.getMinutes());
  const ss = formatTwoDigits(date.getSeconds());
  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
};

const formatReadable = (date: Date) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const m = months[date.getMonth()];
  const d = date.getDate();
  const y = date.getFullYear();
  let h = date.getHours();
  const period = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  const mins = formatTwoDigits(date.getMinutes());
  return `${d} ${m} ${y}, ${formatTwoDigits(h)}:${mins} ${period}`;
};

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  outputFormat = "datetime-string",
  placeholder = "Select date & time",
  disabled = false,
  disablePastDates = false,
  className,
  error,
  minDate,
  maxDate,
  showQuickPresets = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeMonth, setActiveMonth] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<"date" | "time">("date");

  // Time state (12-hour format)
  const [hour, setHour] = useState<number>(10);
  const [minute, setMinute] = useState<number>(0);
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  // Parse initial or controlled value
  useEffect(() => {
    if (!value) {
      setSelectedDate(null);
      return;
    }
    try {
      let d: Date;
      if (value instanceof Date) {
        d = value;
      } else if (typeof value === "string") {
        const clean = value.replace(/Z/g, "").split("+")[0].replace(" ", "T");
        d = new Date(clean);
        if (isNaN(d.getTime())) d = new Date(value);
      } else {
        d = new Date(value);
      }

      if (!isNaN(d.getTime())) {
        setSelectedDate(d);
        setActiveMonth(new Date(d.getFullYear(), d.getMonth(), 1));
        let h = d.getHours();
        const p = h >= 12 ? "PM" : "AM";
        h = h % 12 || 12;
        setHour(h);
        setMinute(d.getMinutes());
        setPeriod(p);
      }
    } catch {
      // Ignore parse error
    }
  }, [value]);

  const emitChange = (d: Date | null) => {
    if (!d) {
      onChange?.("", undefined);
      return;
    }
    if (outputFormat === "iso") {
      onChange?.(d.toISOString(), d);
    } else if (outputFormat === "date-only") {
      const yyyy = d.getFullYear();
      const mm = formatTwoDigits(d.getMonth() + 1);
      const dd = formatTwoDigits(d.getDate());
      onChange?.(`${yyyy}-${mm}-${dd}`, d);
    } else {
      onChange?.(formatDateString(d), d);
    }
  };

  const computeCurrentDateTime = (baseDate: Date | null, h: number, m: number, p: "AM" | "PM") => {
    const target = baseDate ? new Date(baseDate) : new Date();
    let hours24 = h % 12;
    if (p === "PM") hours24 += 12;
    target.setHours(hours24);
    target.setMinutes(m);
    target.setSeconds(0);
    target.setMilliseconds(0);
    return target;
  };

  // Calendar matrix calculation
  const calendarDays = useMemo(() => {
    const year = activeMonth.getFullYear();
    const month = activeMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    let firstDayIndex = firstDay.getDay(); // 0 = Sun
    firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // 0 = Mon, 6 = Sun

    const prevMonthLastDate = new Date(year, month, 0).getDate();
    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDate - i),
        isCurrentMonth: false,
      });
    }

    const currentMonthLastDate = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= currentMonthLastDate; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    const remaining = (days.length > 35 ? 42 : 35) - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [activeMonth]);

  const isDateDisabled = (d: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(d);
    target.setHours(0, 0, 0, 0);

    if (disablePastDates && target < today) return true;
    if (minDate && target < new Date(new Date(minDate).setHours(0, 0, 0, 0))) return true;
    if (maxDate && target > new Date(new Date(maxDate).setHours(23, 59, 59, 999))) return true;
    return false;
  };

  const handleSelectDay = (day: Date) => {
    if (isDateDisabled(day)) return;
    const combined = computeCurrentDateTime(day, hour, minute, period);
    setSelectedDate(combined);
    emitChange(combined);
  };

  const handleApplyHour = (h: number) => {
    setHour(h);
    const combined = computeCurrentDateTime(selectedDate, h, minute, period);
    setSelectedDate(combined);
    emitChange(combined);
  };

  const handleApplyMinute = (m: number) => {
    setMinute(m);
    const combined = computeCurrentDateTime(selectedDate, hour, m, period);
    setSelectedDate(combined);
    emitChange(combined);
  };

  const handleApplyPeriod = (p: "AM" | "PM") => {
    setPeriod(p);
    const combined = computeCurrentDateTime(selectedDate, hour, minute, p);
    setSelectedDate(combined);
    emitChange(combined);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDate(null);
    emitChange(null);
  };

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "group w-full h-11 px-3.5 flex items-center justify-between rounded-xl bg-white dark:bg-zinc-900 border text-xs font-semibold text-slate-800 dark:text-zinc-100 transition-all duration-200 outline-none shadow-xs text-left cursor-pointer",
            error
              ? "border-red-400 focus:ring-2 focus:ring-red-400/20"
              : "border-slate-200/90 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 focus:ring-2 focus:ring-[#063669]/15 focus:border-[#063669]",
            disabled && "opacity-50 cursor-not-allowed bg-slate-50/80 dark:bg-zinc-900/40",
            className
          )}
        >
          <div className="flex items-center gap-2.5 truncate">
            <CalendarIcon className="w-4 h-4 text-slate-400 group-hover:text-[#063669] dark:group-hover:text-blue-400 transition-colors shrink-0" />
            <span className={cn("truncate", !selectedDate && "text-slate-400 dark:text-zinc-500 font-normal")}>
              {selectedDate ? formatReadable(selectedDate) : placeholder}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {selectedDate && !disabled && (
              <span
                onClick={handleClear}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                title="Clear date"
              >
                <X className="w-3.5 h-3.5" />
              </span>
            )}
            <Clock className="w-3.5 h-3.5 text-slate-350 dark:text-zinc-600" />
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-[340px] sm:w-[580px] p-0 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-150 dark:border-zinc-800/90 shadow-2xl z-[99999] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header Tabs on Mobile / Unified layout on tablet+ */}
        <div className="flex sm:hidden border-b border-slate-100 dark:border-zinc-850 bg-slate-50/60 dark:bg-zinc-900/40 p-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("date")}
            className={cn(
              "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5",
              activeTab === "date"
                ? "bg-white dark:bg-zinc-900 text-[#063669] dark:text-blue-400 shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:text-zinc-400"
            )}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Date</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("time")}
            className={cn(
              "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5",
              activeTab === "time"
                ? "bg-white dark:bg-zinc-900 text-[#063669] dark:text-blue-400 shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:text-zinc-400"
            )}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Time ({formatTwoDigits(hour)}:{formatTwoDigits(minute)} {period})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 sm:grid-cols-12 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-zinc-850">
          
          {/* ════════════════ LEFT: CALENDAR ════════════════ */}
          <div className={cn("p-4 sm:p-5 sm:col-span-7 space-y-3.5", activeTab !== "date" && "hidden sm:block")}>
            {/* Month & Navigation */}
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-800 dark:text-zinc-100 tracking-tight">
                {activeMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() - 1, 1))}
                  className="p-1.5 rounded-lg border border-slate-200/70 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-850 text-slate-600 dark:text-zinc-400 transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() + 1, 1))}
                  className="p-1.5 rounded-lg border border-slate-200/70 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-850 text-slate-600 dark:text-zinc-400 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                <span key={d} className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase">
                  {d}
                </span>
              ))}
            </div>

            {/* Date Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {calendarDays.map(({ date: dayDate, isCurrentMonth }, idx) => {
                const disabledDay = isDateDisabled(dayDate);
                const isSelected = selectedDate &&
                  dayDate.getDate() === selectedDate.getDate() &&
                  dayDate.getMonth() === selectedDate.getMonth() &&
                  dayDate.getFullYear() === selectedDate.getFullYear();

                const isToday =
                  dayDate.getDate() === todayDate.getDate() &&
                  dayDate.getMonth() === todayDate.getMonth() &&
                  dayDate.getFullYear() === todayDate.getFullYear();

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={disabledDay}
                    onClick={() => handleSelectDay(dayDate)}
                    className={cn(
                      "relative h-8 w-8 mx-auto rounded-full text-xs font-semibold flex items-center justify-center transition-all duration-150 cursor-pointer",
                      !isCurrentMonth && "text-slate-300 dark:text-zinc-700 opacity-60",
                      isCurrentMonth && "text-slate-700 dark:text-zinc-200",
                      disabledDay && "opacity-25 cursor-not-allowed hover:bg-transparent",
                      !disabledDay && !isSelected && "hover:bg-slate-100 dark:hover:bg-zinc-850",
                      isSelected && "bg-[#063669] dark:bg-blue-600 text-white font-bold shadow-md scale-105",
                      isToday && !isSelected && "border border-[#063669]/40 dark:border-blue-500/50 font-bold"
                    )}
                  >
                    {dayDate.getDate()}
                    {isToday && (
                      <span
                        className={cn(
                          "absolute bottom-1 w-1 h-1 rounded-full",
                          isSelected ? "bg-white" : "bg-[#063669] dark:bg-blue-400"
                        )}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ════════════════ RIGHT: TIME SELECTOR ════════════════ */}
          <div className={cn("p-4 sm:p-5 sm:col-span-5 bg-slate-50/40 dark:bg-zinc-900/20 space-y-3.5", activeTab !== "time" && "hidden sm:block")}>
            
            {/* Header with Title & Active Badge */}
            <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-zinc-850">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#063669] dark:text-blue-400" />
                <span className="text-xs font-bold text-slate-800 dark:text-zinc-100">Time</span>
              </div>
              <div className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-zinc-850 text-slate-700 dark:text-zinc-200 text-xs font-black">
                {formatTwoDigits(hour)}:{formatTwoDigits(minute)} {period}
              </div>
            </div>

            {/* Smooth Wheel Scroll Selector (iOS Drum Style) */}
            <div className="rounded-2xl bg-white dark:bg-zinc-900/60 p-1 border border-slate-200/50 dark:border-zinc-800/60">
              <WheelTimePicker
                hour={hour}
                minute={minute}
                period={period}
                onHourChange={handleApplyHour}
                onMinuteChange={handleApplyMinute}
                onPeriodChange={handleApplyPeriod}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 sm:px-5 sm:py-3.5 bg-slate-50 dark:bg-zinc-900/60 border-t border-slate-100 dark:border-zinc-850 flex items-center justify-between gap-3">
          <div className="truncate">
            <span className="text-[11px] font-bold text-slate-500 dark:text-zinc-400">
              {selectedDate ? (
                <>
                  <span className="text-slate-400 mr-1">Set:</span>
                  <span className="text-[#063669] dark:text-blue-400 font-extrabold">{formatReadable(selectedDate)}</span>
                </>
              ) : (
                "No date selected"
              )}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 px-3 rounded-lg text-xs font-bold border-slate-200 dark:border-zinc-800"
            >
              Close
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                if (!selectedDate) {
                  const now = computeCurrentDateTime(new Date(), hour, minute, period);
                  setSelectedDate(now);
                  emitChange(now);
                }
                setIsOpen(false);
              }}
              className="h-8 px-4 rounded-lg text-xs font-bold bg-[#063669] hover:bg-[#052b53] text-white shadow-xs"
            >
              <Check className="w-3.5 h-3.5 mr-1" />
              Done
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
