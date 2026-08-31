import React from "react";
import { cn } from "../../../utils";

interface ReportKpiCardProps {
  title: string;
  value: string;
  valueClassName?: string;
}

export const ReportKpiCard = ({ title, value, valueClassName }: ReportKpiCardProps) => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[24px] 2xl:rounded-[32px] min-[2560px]:rounded-[42px] p-6 xl:p-8 2xl:p-10 min-[2560px]:p-14 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h2 className="text-[12px] font-bold tracking-[1.2px] text-[#191C1E] dark:text-zinc-300 uppercase">
        {title}
      </h2>
      <p className={cn(
        "text-[36px] font-bold text-[#00236F] dark:text-blue-400 mt-1 tracking-tight",
        valueClassName
      )}>
        {value}
      </p>
    </div>
  );
};
