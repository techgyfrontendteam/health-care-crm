import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  Building2, 
  Users, 
  Star, 
  Gauge
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Report } from "../types";
import { toast } from "sonner";

interface ReportCardProps {
  report: Report;
}

interface IconConfig {
  src: string;
  fallback: LucideIcon;
}

const iconMap: Record<number, IconConfig> = {
  1: { src: "/icons/daily-sales.png", fallback: BarChart3 },
  2: { src: "/icons/project-wise-objection.png", fallback: Building2 },
  3: { src: "/icons/persona.png", fallback: Users },
  4: { src: "/icons/lead-quality.png", fallback: Star },
  5: { src: "/icons/campaign-perf.png", fallback: Gauge },
};

export const ReportCard = ({ report }: ReportCardProps) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const iconConfig = iconMap[report.id] || { src: "", fallback: BarChart3 };

  const handleClick = () => {
    if (report.id === 1) {
      navigate("/reports/daily-sales");
    } else if (report.id === 2) {
      navigate("/reports/project-objections");
    } else if (report.id === 3) {
      navigate("/reports/persona");
    } else if (report.id === 4) {
      navigate("/reports/lead-quality");
    } else if (report.id === 5) {
      navigate("/reports/campaigns");
    } else {
      toast.info(`Opening ${report.title}...`, {
        description: "This report detail view is currently under development.",
      });
    }
  };

  const renderIcon = () => {
    if (iconConfig.src && !imageError) {
      return (
        <img
          src={iconConfig.src}
          alt={report.title}
          onError={() => setImageError(true)}
          className="w-[18px] h-[18px] object-contain transition-transform duration-300 group-hover:scale-110"
        />
      );
    }
    const FallbackIcon = iconConfig.fallback;
    return <FallbackIcon className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" />;
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 
        rounded-[24px] p-6 lg:p-8 transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1.5 
        hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]
        flex flex-col justify-between min-h-[180px] h-full"
    >
      {/* Icon Container */}
      <div 
        className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center 
          text-zinc-600 dark:text-zinc-400 group-hover:bg-[#0f3d6b]/10 group-hover:text-[#0f3d6b] 
          dark:group-hover:bg-[#0f3d6b]/20 dark:group-hover:text-blue-400 transition-all duration-300 ease-out"
      >
        {renderIcon()}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-[#0f3d6b] dark:group-hover:text-blue-400 transition-colors duration-200">
          {report.title}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
          {report.description}
        </p>
      </div>
    </div>
  );
};
