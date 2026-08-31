import React from "react";

interface ReportProgressBarProps {
  value: number;
  className?: string;
}

export const ReportProgressBar = ({ value, className }: ReportProgressBarProps) => {
  return (
    <div className={`h-2 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden ${className || ""}`}>
      <div 
        className="h-full bg-[#0f3d6b] dark:bg-blue-500 rounded-full transition-all duration-500" 
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
};
