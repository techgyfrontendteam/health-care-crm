import React from "react";

interface LeadItem {
  id: string;
  name: string;
  leadId: string;
  score: number;
  project: string;
  avatarColor: string;
}

interface TopHighestScoredLeadsProps {
  leads: LeadItem[];
}

export const TopHighestScoredLeads: React.FC<TopHighestScoredLeadsProps> = ({ leads }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getProjectBadgeClass = (proj: string) => {
    const p = proj.toUpperCase();
    if (p.includes("GREEN")) {
      return "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-100/30";
    }
    if (p.includes("NATURA")) {
      return "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-100/30";
    }
    return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-100/30";
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[24px] p-6 xl:p-10 2xl:p-12 min-[2560px]:p-16 xl:h-[445px] 2xl:h-[565px] min-[2560px]:h-[767px] shadow-sm flex flex-col gap-6 justify-between animate-in fade-in duration-200">
      <h2 className="text-base xl:text-lg 2xl:text-xl min-[2560px]:text-2xl font-extrabold tracking-tight text-[#0f3d6b] dark:text-blue-400">
        Top 10 Highest–Scored Leads (Unworked)
      </h2>

      <div className="flex-1 overflow-y-auto max-h-[280px] xl:max-h-[290px] 2xl:max-h-[380px] min-[2560px]:max-h-[545px] pr-2 mt-2 scrollbar-thin divide-y divide-slate-100 dark:divide-zinc-800">
        {leads.length === 0 ? (
          <div className="py-8 text-center text-sm text-slate-400 dark:text-zinc-500 italic">
            No high-scored leads match the current filters.
          </div>
        ) : (
          leads.slice(0, 10).map((lead) => (
            <div
              key={lead.id}
              className="flex items-center justify-between gap-4 py-3.5 xl:py-4 2xl:py-5 min-[2560px]:py-7 hover:bg-slate-50/50 dark:hover:bg-zinc-850/10 transition-colors duration-150 first:pt-0 last:pb-0"
            >
              {/* Left Side: Avatar & Details */}
              <div className="flex items-center gap-3 xl:gap-3.5 2xl:gap-4.5">
                <div
                  className={`w-10 h-10 xl:w-[44px] xl:h-[44px] 2xl:w-[54px] 2xl:h-[54px] min-[2560px]:w-[70px] min-[2560px]:h-[70px] rounded-full flex items-center justify-center font-bold text-sm xl:text-sm 2xl:text-base min-[2560px]:text-xl shrink-0 shadow-sm ${lead.avatarColor}`}
                >
                  {getInitials(lead.name)}
                </div>
                <div className="min-w-0">
                  <span className="block text-sm xl:text-sm 2xl:text-base min-[2560px]:text-xl font-extrabold text-slate-800 dark:text-zinc-200 truncate">
                    {lead.name}
                  </span>
                  <span className="block text-xs xl:text-xs 2xl:text-sm min-[2560px]:text-base font-semibold text-slate-400 dark:text-zinc-500">
                    Lead ID: {lead.leadId}
                  </span>
                </div>
              </div>

              {/* Right Side: Score & Project Pills */}
              <div className="flex items-center gap-2.5 xl:gap-3 2xl:gap-4 shrink-0">
                {/* Score badge */}
                <span className="inline-flex items-center bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 text-xs xl:text-xs 2xl:text-sm min-[2560px]:text-base font-extrabold px-3 py-1 xl:px-3.5 xl:py-1 2xl:px-4 2xl:py-1.5 min-[2560px]:px-5 min-[2560px]:py-2 rounded-full border border-amber-200/20 shadow-sm">
                  Score: {lead.score}
                </span>

                {/* Project Badge */}
                <span
                  className={`inline-flex items-center text-[10px] xl:text-[10px] 2xl:text-xs min-[2560px]:text-sm font-black tracking-wider px-2.5 py-1 xl:px-3 xl:py-1 2xl:px-3.5 2xl:py-1.5 min-[2560px]:px-4.5 min-[2560px]:py-2 rounded-md border ${getProjectBadgeClass(
                    lead.project
                  )}`}
                >
                  {lead.project}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
