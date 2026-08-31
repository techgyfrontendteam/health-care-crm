import React from "react";
import { Link } from "react-router-dom";
import { Radio, FileText, Layers, Clock, AlertCircle, Sparkles, ArrowRight } from "lucide-react";
import { masterDataCards } from "../data/masterData";

const getCardIcon = (iconName: string) => {
  switch (iconName) {
    case "radio":
      return <Radio className="w-6 h-6 text-[#00236F] dark:text-blue-400" />;
    case "file-text":
      return <FileText className="w-6 h-6 text-[#00236F] dark:text-blue-400" />;
    case "layers":
      return <Layers className="w-6 h-6 text-[#00236F] dark:text-blue-400" />;
    case "clock":
      return <Clock className="w-6 h-6 text-[#00236F] dark:text-blue-400" />;
    case "alert-circle":
      return <AlertCircle className="w-6 h-6 text-[#00236F] dark:text-blue-400" />;
    case "hash-100":
      return <div className="text-sm font-black text-[#00236F] dark:text-blue-400 leading-none">100</div>;
    case "sparkles":
      return <Sparkles className="w-6 h-6 text-[#00236F] dark:text-blue-400" />;
    default:
      return <FileText className="w-6 h-6 text-[#00236F] dark:text-blue-400" />;
  }
};

export const MasterDataPage: React.FC = () => {
  return (
    <div className="w-full max-w-[1440px] xl:max-w-[1920px] 2xl:max-w-[2560px] mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-8 animate-in fade-in duration-300">
      {/* Header Section */}
      <div className="flex flex-col gap-[11.38px] max-w-[672px]">
        <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-[32px] leading-[40px] text-[#001549] dark:text-zinc-100">
          Master Data
        </h1>
        <p className="font-['Inter'] font-normal text-[14px] leading-[21px] text-[#575E70] dark:text-zinc-400">
          Select a report to view live metrics, filter by project, and export data. Your dashboard is configured for real time tracking across all residential pipelines.
        </p>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {masterDataCards.map((card) => (
          <Link
            to={card.path}
            key={card.id}
            className="group block bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-[24px] p-6 hover:shadow-md hover:scale-[1.005] hover:border-slate-200 dark:hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between min-h-[190px] cursor-pointer"
          >
            {/* Top row: Icon and View Link */}
            <div className="flex items-center justify-between">
              <div className="w-[48px] h-[48px] rounded-[12px] bg-[#F1F5F9] dark:bg-zinc-950/40 border border-slate-100/50 dark:border-zinc-800 flex items-center justify-center shadow-sm shrink-0">
                {getCardIcon(card.iconName)}
              </div>
              <div
                className="w-[48px] h-[20px] inline-flex items-center justify-end text-[11px] font-black text-[#002d62] group-hover:text-[#063669] dark:text-blue-400 dark:group-hover:text-blue-300 transition-colors gap-1 shrink-0"
              >
                View
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Content: Title & Description */}
            <div className="mt-5 space-y-2 flex-1">
              <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-[16px] leading-[24px] text-[#191C1E] dark:text-zinc-100">
                {card.title}
              </h2>
              <p className="font-['Inter'] font-normal text-[14px] leading-[21px] text-[#575E70] dark:text-zinc-400">
                {card.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
