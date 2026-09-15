import React, { useState, useMemo, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../utils";

export interface DatePickerProps {
  value?: string | Date | null;
  onChange?: (val: string, date?: Date) => void;
  outputFormat?: "iso" | "date-only" | "datetime-string";
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

const formatDateOnly = (d: Date) => {
  const yyyy = d.getFullYear();
  const mm = formatTwoDigits(d.getMonth() + 1);
  const dd = formatTwoDigits(d.getDate());
  return `${yyyy}-${mm}-${dd}`;
};

const formatReadableDate = (date: Date) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const m = months[date.getMonth()];
  const d = date.getDate();
  const y = date.getFullYear();
  return `${d} ${m} ${y}`;
};

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  outputFormat = "date-only",
  placeholder = "Select date",
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
      }
    } catch {
      // Ignore
    }
  }, [value]);

  const emitDate = (d: Date | null) => {
    if (!d) {
      onChange?.("", undefined);
      return;
    }
    if (outputFormat === "iso") {
      onChange?.(d.toISOString(), d);
    } else if (outputFormat === "datetime-string") {
      const yyyy = d.getFullYear();
      const mm = formatTwoDigits(d.getMonth() + 1);
      const dd = formatTwoDigits(d.getDate());
      onChange?.(`${yyyy}-${mm}-${dd} 00:00:00`, d);
    } else {
      onChange?.(formatDateOnly(d), d);
    }
  };

  const calendarDays = useMemo(() => {
    const year = activeMonth.getFullYear();
    const month = activeMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    let firstDayIndex = firstDay.getDay();
    firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

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

  const handleSelectDay = (d: Date) => {
    if (isDateDisabled(d)) return;
    setSelectedDate(d);
    emitDate(d);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDate(null);
    emitDate(null);
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
              {selectedDate ? formatReadableDate(selectedDate) : placeholder}
            </span>
          </div>

          {selectedDate && !disabled && (
            <span
              onClick={handleClear}
              className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 transition-colors cursor-pointer shrink-0"
              title="Clear date"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-[300px] p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-150 dark:border-zinc-800/90 shadow-2xl z-[99999] overflow-hidden space-y-3.5 animate-in fade-in zoom-in-95 duration-200"
      >
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
      </PopoverContent>
    </Popover>
  );
};
