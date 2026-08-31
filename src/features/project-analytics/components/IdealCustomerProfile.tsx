import React from "react";
import { Briefcase, Calendar, Wallet, MapPin, BadgeCheck } from "lucide-react";
import avatarImg from "../../../assets/avatar-3d.png";

interface IdealCustomerProfileProps {
  data: {
    occupation: string;
    ageBracket: string;
    avgIncome: string;
    state: string;
  };
  avgScore: number;
}

export const IdealCustomerProfile: React.FC<IdealCustomerProfileProps> = ({ data, avgScore }) => {
  const { occupation, ageBracket, avgIncome, state } = data;

  const items = [
    {
      label: "Occupation",
      value: occupation,
      icon: Briefcase,
    },
    {
      label: "Age Bracket",
      value: ageBracket,
      icon: Calendar,
    },
    {
      label: "Avg Income",
      value: avgIncome,
      icon: Wallet,
    },
    {
      label: "State",
      value: state,
      icon: MapPin,
    },
    {
      label: "Avg score",
      value: String(avgScore),
      icon: BadgeCheck,
    },
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[24px] p-6 xl:p-8 2xl:p-10 min-[2560px]:p-14 shadow-sm flex flex-col justify-between h-[520px] xl:h-[604px] 2xl:h-[754px] min-[2560px]:h-[1016px] animate-in fade-in duration-200">
      {/* Header */}
      <h2 className="text-base xl:text-lg 2xl:text-xl min-[2560px]:text-2xl font-extrabold tracking-tight text-slate-800 dark:text-zinc-100">
        Ideal Customer Profile
      </h2>

      {/* Avatar Container */}
      <div className="flex-1 flex items-center justify-center my-3 xl:my-4">
        <img
          src={avatarImg}
          alt="Ideal Customer Character"
          className="h-44 xl:h-56 2xl:h-72 min-[2560px]:h-[400px] object-contain drop-shadow-md transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Attributes Grid (Figma style: 2-column cards grid) */}
      <div className="grid grid-cols-2 gap-4 xl:gap-5 min-[2560px]:gap-8 mt-2 xl:mt-4">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-[#f8fafc] dark:bg-zinc-800/40 border border-slate-100/60 dark:border-zinc-800/60 rounded-2xl p-3.5 xl:p-4 2xl:p-5 flex items-center gap-3.5 xl:gap-4.5 min-w-0 shadow-sm"
            >
              {/* Icon (Figma: directly placed with brand blue color) */}
              <Icon className="w-5 h-5 xl:w-[22px] xl:h-[22px] 2xl:w-[28px] 2xl:h-[28px] min-[2560px]:w-[38px] min-[2560px]:h-[38px] text-[#0f3d6b] dark:text-blue-400 shrink-0" />

              {/* Text Group */}
              <div className="min-w-0">
                <span className="block text-[9px] xl:text-[9px] 2xl:text-[10px] min-[2560px]:text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest truncate">
                  {item.label}
                </span>
                <span className="block text-xs xl:text-xs 2xl:text-sm min-[2560px]:text-base font-extrabold text-slate-800 dark:text-zinc-200 mt-0.5 truncate">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
