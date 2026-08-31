import React from "react";
import type { BranchLeadItem, DepartmentLeadItem } from "../types";
import { MapPin, Building2, PhoneCall, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "../../../utils";

interface BranchLeadsCardsProps {
  branches: BranchLeadItem[];
  departments: DepartmentLeadItem[];
}

export const BranchLeadsCards: React.FC<BranchLeadsCardsProps> = ({ branches, departments }) => {
  return (
    <div className="space-y-6">
      {/* Branch Leads Section */}
      <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#063669] dark:text-blue-400" />
            Branch Leads Performance
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Lead distribution, active call activity, and overdue leads across hospital locations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {branches.map((branch) => (
            <div
              key={branch.branch_id}
              className="p-4 rounded-2xl bg-slate-50/70 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-800 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300">
                    {branch.branch_id}
                  </span>
                  {branch.overdue_leads > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {branch.overdue_leads} Overdue
                    </span>
                  )}
                </div>

                <h4 className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100 mt-2 line-clamp-1" title={branch.branch_name}>
                  {branch.branch_name}
                </h4>
                <p className="text-[11px] text-zinc-400 font-medium truncate" title={branch.location}>
                  {branch.location}
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Total Leads</span>
                    <p className="text-base font-black text-[#063669] dark:text-blue-400">{branch.total_leads}</p>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Calls Logged</span>
                    <p className="text-base font-black text-blue-600 dark:text-blue-400">{branch.total_calls}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between text-[11px]">
                <span className="text-zinc-500 font-medium">Converted:</span>
                <span className="font-extrabold text-emerald-600">
                  {branch.converted_leads} ({Math.round((branch.converted_leads / branch.total_leads) * 100)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Leads Cards */}
      <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-teal-600" />
            Department Leads Breakdown
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Lead acquisition & conversion metrics by medical specialty department
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {departments.map((dept) => (
            <div
              key={dept.department_name}
              className="p-4 rounded-2xl bg-slate-50/70 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: dept.color }}
                  />
                  <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200">
                    {Math.round((dept.converted_count / dept.lead_count) * 100)}% Conv.
                  </span>
                </div>

                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mt-2 line-clamp-2 min-h-[32px]">
                  {dept.department_name}
                </h4>

                <div className="mt-2">
                  <span className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
                    {dept.lead_count}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium ml-1">Leads</span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between text-[11px]">
                <span className="text-zinc-500 font-medium">Converted:</span>
                <span className="font-extrabold text-zinc-900 dark:text-zinc-100">
                  {dept.converted_count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
