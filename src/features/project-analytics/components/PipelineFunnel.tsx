import React from "react";

interface PipelineFunnelProps {
  data: {
    newLeads: number;
    contacted: number;
    siteVisit: number;
    negotiation: number;
    booked: number;
  };
}

export const PipelineFunnel: React.FC<PipelineFunnelProps> = ({ data }) => {
  const { newLeads, contacted, siteVisit, negotiation, booked } = data;

  const maxVal = Math.max(newLeads, 1); // Avoid division by zero

  const stages = [
    { label: "NEW LEADS", value: newLeads, color: "bg-[#0b2559] dark:bg-[#1a3d7d]" },
    { label: "CONTACTED", value: contacted, color: "bg-[#274f8f] dark:bg-[#3d6db8]" },
    { label: "SITE VISIT", value: siteVisit, color: "bg-[#597db8] dark:bg-[#6e93cc]" },
    { label: "NEGOTIATION", value: negotiation, color: "bg-[#8da8cf] dark:bg-[#a1bce0]" },
    { label: "BOOKED", value: booked, color: "bg-[#c5d4ea] dark:bg-[#d5e2f2]" }
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[24px] p-6 xl:p-10 2xl:p-12 min-[2560px]:p-16 xl:h-[338px] 2xl:h-[450px] min-[2560px]:h-[600px] shadow-sm flex flex-col justify-between animate-in fade-in duration-200">
      <h2 className="text-base xl:text-lg 2xl:text-xl min-[2560px]:text-2xl font-extrabold tracking-tight text-slate-800 dark:text-zinc-100">
        Pipeline Funnel
      </h2>

      <div className="flex-1 flex items-end justify-between gap-1 sm:gap-2 xl:gap-3 2xl:gap-4 mt-6 w-full h-[180px] xl:h-[220px] 2xl:h-[280px] min-[2560px]:h-[380px]">
        {stages.map((stage, idx) => {
          const heightPct = (stage.value / maxVal) * 100;
          return (
            <div key={idx} className="flex flex-col items-center flex-1 h-full justify-end min-w-0">
              {/* Value on top */}
              <span className="text-[10px] xl:text-[10px] 2xl:text-xs min-[2560px]:text-sm font-bold text-slate-500 dark:text-zinc-400 mb-1.5 xl:mb-2 text-center truncate w-full">
                {stage.value.toLocaleString()}
              </span>
              
              {/* Bar */}
              <div
                className={`w-6 sm:w-8 xl:w-9 2xl:w-11 min-[2560px]:w-16 rounded-t-lg transition-all duration-750 ease-out ${stage.color}`}
                style={{ height: `${Math.max(heightPct, 4)}%` }}
              />

              {/* Label at bottom */}
              <span className="text-[8px] xl:text-[9px] 2xl:text-[10px] min-[2560px]:text-xs font-black text-slate-400 dark:text-zinc-500 tracking-wider text-center mt-2.5 xl:mt-3 uppercase truncate w-full">
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
