import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface LeadQualityDistributionProps {
  data: {
    hot: number;
    cold: number;
    warm: number;
    junk: number;
    activeRate: number;
  };
}

export const LeadQualityDistribution: React.FC<LeadQualityDistributionProps> = ({ data }) => {
  const { hot, cold, warm, junk, activeRate } = data;

  // Prepare chart data array for Recharts in Figma order
  const hasData = hot > 0 || cold > 0 || warm > 0 || junk > 0;
  const chartData = hasData
    ? [
        { name: "Hot", value: hot, color: "#ef4444" },    // Red-500
        { name: "Warm", value: warm, color: "#f59e0b" },  // Amber-500
        { name: "Cold", value: cold, color: "#3b82f6" },  // Blue-500
        { name: "Junk", value: junk, color: "#94a3b8" },  // Slate-400
      ].filter(item => item.value > 0)
    : [{ name: "Placeholder", value: 100, color: "#e2e8f0" }]; // Grey ring if all 0%

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[24px] p-6 xl:p-8 shadow-sm flex flex-col justify-between animate-in fade-in duration-200 h-full">
      <h2 className="text-base xl:text-lg font-extrabold tracking-tight text-slate-800 dark:text-zinc-100 mb-2">
        Lead Quality Distribution
      </h2>

      <div className="flex flex-col items-center justify-center my-auto w-full gap-4 xl:gap-6">
        {/* Recharts Donut Container */}
        <div className="relative w-36 h-36 xl:w-40 xl:h-40 flex items-center justify-center shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius="72%"
                outerRadius="90%"
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                isAnimationActive={true}
                animationDuration={600}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-2xl xl:text-3xl font-black text-slate-800 dark:text-zinc-100">
              {activeRate}%
            </span>
            <span className="text-[8px] xl:text-[9px] font-bold tracking-widest text-slate-400 dark:text-zinc-500 uppercase mt-0.5">
              ACTIVE
            </span>
          </div>
        </div>

        {/* Legend - 2x2 Grid below the chart */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 xl:gap-x-10 xl:gap-y-3 w-full max-w-[285px] mx-auto mt-2">
          {/* Hot */}
          <div className="flex items-center justify-between text-xs xl:text-sm font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] shrink-0" />
              <span className="text-slate-600 dark:text-zinc-400">Hot</span>
            </div>
            <span className="text-slate-800 dark:text-zinc-200 font-extrabold">{hot}%</span>
          </div>

          {/* Warm */}
          <div className="flex items-center justify-between text-xs xl:text-sm font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shrink-0" />
              <span className="text-slate-600 dark:text-zinc-400">Warm</span>
            </div>
            <span className="text-slate-800 dark:text-zinc-200 font-extrabold">{warm}%</span>
          </div>

          {/* Cold */}
          <div className="flex items-center justify-between text-xs xl:text-sm font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#3b82f6] shrink-0" />
              <span className="text-slate-600 dark:text-zinc-400">Cold</span>
            </div>
            <span className="text-slate-800 dark:text-zinc-200 font-extrabold">{cold}%</span>
          </div>

          {/* Junk */}
          <div className="flex items-center justify-between text-xs xl:text-sm font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#94a3b8] dark:bg-zinc-600 shrink-0" />
              <span className="text-slate-600 dark:text-zinc-400">Junk</span>
            </div>
            <span className="text-slate-800 dark:text-zinc-200 font-extrabold">{junk}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
