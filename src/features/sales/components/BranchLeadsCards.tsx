import React from "react";
import type { BranchLeadItem, DepartmentLeadItem } from "../types";
import { MapPin, Building2, AlertTriangle } from "lucide-react";

interface BranchLeadsCardsProps {
  branches: BranchLeadItem[];
  departments: DepartmentLeadItem[];
}

export const BranchLeadsCards: React.FC<BranchLeadsCardsProps> = ({ branches, departments }) => {
  return (
    <div className="space-y-4">
      {/* Branch Leads Section */}
      <section className="crm-soft-surface space-y-4 rounded-md border border-[#e2e8f0] bg-white p-5 sm:p-6">
        <div>
          <h3 className="flex items-center gap-2 text-base font-extrabold text-[#111625]">
            <MapPin className="h-5 w-5 text-[#0022ff]" />
            Branch Leads Performance
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Lead distribution, active call activity, and overdue leads across hospital locations
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {branches.map((branch) => (
            <div
              key={branch.branch_id}
              className="crm-soft-surface-quiet flex min-h-[198px] flex-col justify-between rounded-md border border-[#e2e8f0] bg-[#f8f9fa] p-4 transition-colors duration-200 hover:border-[#0022ff]/35"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-md border border-[#e2e8f0] bg-white px-2 py-0.5 text-[10px] font-extrabold uppercase text-[#111625]">
                    {branch.branch_id}
                  </span>
                  {branch.overdue_leads > 0 && (
                    <span className="flex items-center gap-1 rounded-md border border-[#111625] bg-white px-2 py-0.5 text-[10px] font-bold text-[#111625]">
                      <AlertTriangle className="h-3 w-3" />
                      {branch.overdue_leads} Overdue
                    </span>
                  )}
                </div>

                <h4 className="mt-2 line-clamp-1 text-sm font-extrabold text-[#111625]" title={branch.branch_name}>
                  {branch.branch_name}
                </h4>
                <p className="truncate text-[11px] font-medium text-slate-500" title={branch.location}>
                  {branch.location}
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                  <div className="rounded-md border border-[#e2e8f0] bg-white p-2">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Total Leads</span>
                    <p className="text-base font-black text-[#0022ff]">{branch.total_leads}</p>
                  </div>
                  <div className="rounded-md border border-[#e2e8f0] bg-white p-2">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Calls Logged</span>
                    <p className="text-base font-black text-[#111625]">{branch.total_calls}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-[#e2e8f0] pt-2 text-[11px]">
                <span className="font-medium text-slate-500">Converted:</span>
                <span className="font-extrabold text-[#0022ff]">
                  {branch.converted_leads} ({Math.round((branch.converted_leads / branch.total_leads) * 100)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Department Leads Cards */}
      <section className="crm-soft-surface space-y-4 rounded-md border border-[#e2e8f0] bg-white p-5 sm:p-6">
        <div>
          <h3 className="flex items-center gap-2 text-base font-extrabold text-[#111625]">
            <Building2 className="h-5 w-5 text-[#0022ff]" />
            Department Leads Breakdown
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Lead acquisition & conversion metrics by medical specialty department
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {departments.map((dept) => (
            <div
              key={dept.department_name}
              className="crm-soft-surface-quiet flex min-h-[168px] flex-col justify-between rounded-md border border-[#e2e8f0] bg-[#f8f9fa] p-4 transition-colors duration-200 hover:border-[#0022ff]/25"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: dept.color }}
                  />
                  <span className="rounded-md border border-[#e2e8f0] bg-white px-2 py-0.5 text-[10px] font-extrabold text-[#0022ff]">
                    {Math.round((dept.converted_count / dept.lead_count) * 100)}% Conv.
                  </span>
                </div>

                <h4 className="mt-2 min-h-[32px] line-clamp-2 text-xs font-bold text-[#111625]">
                  {dept.department_name}
                </h4>

                <div className="mt-2">
                  <span className="text-2xl font-black text-[#111625]">
                    {dept.lead_count}
                  </span>
                  <span className="ml-1 text-xs font-medium text-slate-500">Leads</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-[#e2e8f0] pt-2 text-[11px]">
                <span className="font-medium text-slate-500">Converted:</span>
                <span className="font-extrabold text-[#0022ff]">
                  {dept.converted_count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
