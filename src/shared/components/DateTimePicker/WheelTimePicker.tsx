import React, { useRef, useEffect, useCallback } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "../../../utils";

interface WheelColumnProps<T> {
  items: T[];
  value: T;
  onChange: (val: T) => void;
  formatLabel?: (item: T) => string;
  itemHeight?: number;
  containerHeight?: number;
  className?: string;
  pillClassName?: string;
  showArrows?: boolean;
}

export function WheelColumn<T extends string | number>({
  items,
  value,
  onChange,
  formatLabel = (item) => String(item),
  itemHeight = 38,
  containerHeight = 190,
  className,
  pillClassName,
  showArrows = false,
}: WheelColumnProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastUserInteraction = useRef<number>(0);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const startYRef = useRef<number>(0);
  const startScrollTopRef = useRef<number>(0);

  const spacerHeight = (containerHeight - itemHeight) / 2;
  const currentIndex = items.indexOf(value);

  const scrollToItem = useCallback(
    (index: number, smooth = true) => {
      if (!containerRef.current) return;
      const targetScroll = Math.max(0, index * itemHeight);
      containerRef.current.scrollTo({
        top: targetScroll,
        behavior: smooth ? "smooth" : "auto",
      });
    },
    [itemHeight]
  );

  // Position on mount or when value changes externally
  useEffect(() => {
    if (Date.now() - lastUserInteraction.current > 350 && currentIndex >= 0) {
      const timer = setTimeout(() => {
        scrollToItem(currentIndex, false);
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, scrollToItem]);

  // Handle scroll events with debounce to snap & emit
  const handleScroll = () => {
    if (!containerRef.current) return;
    lastUserInteraction.current = Date.now();

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (!containerRef.current) return;
      const scrollTop = containerRef.current.scrollTop;
      const rawIndex = Math.round(scrollTop / itemHeight);
      const clampedIndex = Math.max(0, Math.min(items.length - 1, rawIndex));

      if (items[clampedIndex] !== undefined && items[clampedIndex] !== value) {
        onChange(items[clampedIndex]);
      }
      scrollToItem(clampedIndex, true);
    }, 70);
  };

  // Mouse wheel handler
  const handleWheel = (e: React.WheelEvent) => {
    if (!containerRef.current) return;
    lastUserInteraction.current = Date.now();
    e.stopPropagation();
    containerRef.current.scrollTop += e.deltaY * 0.7;
  };

  // Drag to scroll support (mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    startScrollTopRef.current = containerRef.current.scrollTop;
    lastUserInteraction.current = Date.now();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const deltaY = e.clientY - startYRef.current;
    containerRef.current.scrollTop = startScrollTopRef.current - deltaY;
    lastUserInteraction.current = Date.now();
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    handleScroll();
  };

  const handleStep = (direction: "up" | "down", e: React.MouseEvent) => {
    e.stopPropagation();
    lastUserInteraction.current = Date.now();
    let newIdx = currentIndex;
    if (direction === "up") {
      newIdx = Math.max(0, currentIndex - 1);
    } else {
      newIdx = Math.min(items.length - 1, currentIndex + 1);
    }
    onChange(items[newIdx]);
    scrollToItem(newIdx, true);
  };

  return (
    <div
      className={cn("relative flex-1 flex flex-col items-center select-none touch-pan-y group", className)}
      style={{ height: containerHeight }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Center highlight pill */}
      <div
        className={cn(
          "absolute left-1 right-1 pointer-events-none rounded-xl bg-slate-100 dark:bg-zinc-800/90 border border-slate-200/60 dark:border-zinc-700/60 transition-all duration-150 shadow-2xs",
          pillClassName
        )}
        style={{
          top: spacerHeight,
          height: itemHeight,
        }}
      />

      {/* Up Arrow (Optional hover helper) */}
      {showArrows && (
        <button
          type="button"
          onClick={(e) => handleStep("up", e)}
          className="absolute top-1 z-20 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Scrollable list */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        className="w-full h-full overflow-y-auto overscroll-contain text-center z-2 cursor-grab active:cursor-grabbing no-scrollbar"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollBehavior: "smooth",
        }}
      >
        {/* Top spacer */}
        <div style={{ height: spacerHeight }} className="shrink-0 pointer-events-none" />

        {items.map((item, idx) => {
          const isSelected = item === value;
          const diff = Math.abs(idx - (currentIndex >= 0 ? currentIndex : 0));

          return (
            <div
              key={String(item)}
              onClick={(e) => {
                e.stopPropagation();
                lastUserInteraction.current = Date.now();
                onChange(item);
                scrollToItem(idx, true);
              }}
              style={{ height: itemHeight }}
              className={cn(
                "h-[38px] flex items-center justify-center transition-all duration-150 text-sm font-semibold cursor-pointer select-none",
                isSelected
                  ? "text-slate-900 dark:text-zinc-50 font-black scale-105"
                  : diff === 1
                  ? "text-slate-500 dark:text-zinc-400 font-medium scale-95 opacity-75 hover:text-slate-800 dark:hover:text-zinc-200"
                  : "text-slate-400 dark:text-zinc-500 font-normal scale-90 opacity-40 hover:opacity-80"
              )}
            >
              {formatLabel(item)}
            </div>
          );
        })}

        {/* Bottom spacer */}
        <div style={{ height: spacerHeight }} className="shrink-0 pointer-events-none" />
      </div>

      {/* Down Arrow (Optional hover helper) */}
      {showArrows && (
        <button
          type="button"
          onClick={(e) => handleStep("down", e)}
          className="absolute bottom-1 z-20 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

export interface WheelTimePickerProps {
  hour: number; // 1 - 12
  minute: number; // 0 - 59
  period: "AM" | "PM";
  onHourChange: (h: number) => void;
  onMinuteChange: (m: number) => void;
  onPeriodChange: (p: "AM" | "PM") => void;
  minuteStep?: number; // default 1
  className?: string;
  showArrows?: boolean;
}

export const WheelTimePicker: React.FC<WheelTimePickerProps> = ({
  hour,
  minute,
  period,
  onHourChange,
  onMinuteChange,
  onPeriodChange,
  minuteStep = 1,
  className,
  showArrows = false,
}) => {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from(
    { length: Math.floor(60 / minuteStep) },
    (_, i) => i * minuteStep
  );
  const periods: ("AM" | "PM")[] = ["AM", "PM"];

  return (
    <div className={cn("relative w-full py-1 bg-transparent select-none overflow-hidden", className)}>
      {/* Top gradient fade mask */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white via-white/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80 dark:to-transparent z-10" />

      {/* Columns Container */}
      <div className="flex items-center justify-center gap-2 px-2 relative">
        {/* Hours */}
        <WheelColumn
          items={hours}
          value={hour}
          onChange={onHourChange}
          formatLabel={(h) => String(h)}
          showArrows={showArrows}
        />

        {/* Minutes */}
        <WheelColumn
          items={minutes}
          value={minute}
          onChange={onMinuteChange}
          formatLabel={(m) => String(m).padStart(2, "0")}
          showArrows={showArrows}
        />

        {/* Period */}
        <WheelColumn
          items={periods}
          value={period}
          onChange={onPeriodChange}
          formatLabel={(p) => p}
          showArrows={showArrows}
        />
      </div>

      {/* Bottom gradient fade mask */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80 dark:to-transparent z-10" />
    </div>
  );
};
