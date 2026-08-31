import React from "react";
import type { VolumeMetric } from "../types";
import { ReportProgressBar } from "./ReportProgressBar";

interface ReportProgressBarCardProps {
  title: string;
  data: VolumeMetric[];
}

export const ReportProgressBarCard = ({ title, data }: ReportProgressBarCardProps) => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-3xl p-6 xl:p-8 2xl:p-10 shadow-sm flex flex-col gap-6">
      <h2 className="text-sm xl:text-base font-bold tracking-tight text-slate-700 dark:text-zinc-400">
        {title}
      </h2>
      <div className="space-y-4 flex-1 flex flex-col">
        {data.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex justify-between text-sm font-semibold text-slate-800 dark:text-zinc-200">
              <span className="text-slate-600 dark:text-zinc-400">{item.label}</span>
              <span className="text-[#0f3d6b] dark:text-blue-400 font-extrabold">{item.value}%</span>
            </div>
            {/* Progress bar */}
            <ReportProgressBar value={item.value} />
          </div>
        ))}
      </div>
    </div>
  );
};
