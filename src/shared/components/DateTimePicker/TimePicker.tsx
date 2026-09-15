import React, { useState, useEffect } from "react";
import { Clock, Check, X, Sparkles } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../utils";
import { WheelTimePicker } from "./WheelTimePicker";

export interface TimePickerProps {
  value?: string | null; // "10:30", "14:30:00", "02:30 PM", etc.
  onChange?: (val: string) => void;
  outputFormat?: "12h" | "24h"; // "12h" -> "10:30 AM", "24h" -> "10:30:00" or "10:30"
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string | boolean;
  minuteStep?: number; // 1 or 5
}

const formatTwoDigits = (n: number) => String(n).padStart(2, "0");

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  outputFormat = "24h",
  placeholder = "Select time",
  disabled = false,
  className,
  error,
  minuteStep = 1,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hour, setHour] = useState<number>(10);
  const [minute, setMinute] = useState<number>(0);
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const [hasSelected, setHasSelected] = useState<boolean>(false);

  useEffect(() => {
    if (!value) {
      setHasSelected(false);
      return;
    }
    const valStr = String(value).trim();
    if (valStr.toUpperCase().includes("AM") || valStr.toUpperCase().includes("PM")) {
      // 12-hour string (e.g., "10:30 AM")
      const parts = valStr.split(" ");
      const timeParts = parts[0]?.split(":") || [];
      const h = parseInt(timeParts[0] || "10", 10);
      const m = parseInt(timeParts[1] || "0", 10);
      const p = parts[1]?.toUpperCase() === "PM" ? "PM" : "AM";
      setHour(h || 12);
      setMinute(m || 0);
      setPeriod(p);
      setHasSelected(true);
    } else if (valStr.includes(":")) {
      // 24-hour string (e.g., "14:30" or "14:30:00")
      const timeParts = valStr.split(":");
      let h = parseInt(timeParts[0] || "10", 10);
      const m = parseInt(timeParts[1] || "0", 10);
      const p = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      setHour(h);
      setMinute(m || 0);
      setPeriod(p);
      setHasSelected(true);
    }
  }, [value]);

  const emitValue = (h: number, m: number, p: "AM" | "PM") => {
    setHasSelected(true);
    if (outputFormat === "12h") {
      onChange?.(`${formatTwoDigits(h)}:${formatTwoDigits(m)} ${p}`);
    } else {
      let h24 = h % 12;
      if (p === "PM") h24 += 12;
      onChange?.(`${formatTwoDigits(h24)}:${formatTwoDigits(m)}:00`);
    }
  };

  const handleHourChange = (newHour: number) => {
    setHour(newHour);
    emitValue(newHour, minute, period);
  };

  const handleMinuteChange = (newMinute: number) => {
    setMinute(newMinute);
    emitValue(hour, newMinute, period);
  };

  const handlePeriodChange = (newPeriod: "AM" | "PM") => {
    setPeriod(newPeriod);
    emitValue(hour, minute, newPeriod);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasSelected(false);
    onChange?.("");
  };

  const displayTime = hasSelected ? `${formatTwoDigits(hour)}:${formatTwoDigits(minute)} ${period}` : "";

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
            <Clock className="w-4 h-4 text-slate-400 group-hover:text-[#063669] dark:group-hover:text-blue-400 transition-colors shrink-0" />
            <span className={cn("truncate", !hasSelected && "text-slate-400 dark:text-zinc-500 font-normal")}>
              {displayTime || placeholder}
            </span>
          </div>

          {hasSelected && !disabled && (
            <span
              onClick={handleClear}
              className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 transition-colors cursor-pointer shrink-0"
              title="Clear time"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-[280px] p-4 rounded-3xl bg-white dark:bg-zinc-950 border border-slate-150 dark:border-zinc-800/90 shadow-2xl z-[99999] overflow-hidden space-y-3.5 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header with Title & Active Badge */}
        <div className="flex items-center justify-between px-1 pb-1 border-b border-slate-100 dark:border-zinc-850">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#063669] dark:text-blue-400" />
            <span className="text-xs font-bold text-slate-800 dark:text-zinc-100">Select Time</span>
          </div>
          <div className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-zinc-850 text-slate-700 dark:text-zinc-200 text-xs font-black">
            {formatTwoDigits(hour)}:{formatTwoDigits(minute)} {period}
          </div>
        </div>

        {/* Smooth Wheel Scroll Selector (iOS Drum Style) */}
        <div className="rounded-2xl bg-slate-50/70 dark:bg-zinc-900/40 p-1 border border-slate-200/50 dark:border-zinc-800/60">
          <WheelTimePicker
            hour={hour}
            minute={minute}
            period={period}
            minuteStep={minuteStep}
            onHourChange={handleHourChange}
            onMinuteChange={handleMinuteChange}
            onPeriodChange={handlePeriodChange}
          />
        </div>

        {/* Done Button */}
        <div className="pt-1">
          <Button
            type="button"
            size="sm"
            onClick={() => {
              emitValue(hour, minute, period);
              setIsOpen(false);
            }}
            className="w-full h-8 rounded-xl text-xs font-bold bg-[#063669] hover:bg-[#052b53] text-white shadow-xs"
          >
            <Check className="w-3.5 h-3.5 mr-1" />
            Done ({formatTwoDigits(hour)}:{formatTwoDigits(minute)} {period})
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

