import React from "react";
import type { SalesMetrics } from "../types";
import {
  PhoneCall,
  Users,
  AlertTriangle,
  Building,
  MapPin,
  TrendingUp,
  Clock,
  CheckCircle2,
  Award,
} from "lucide-react";

interface SalesMetricCardsProps {
  metrics: SalesMetrics;
}

export const SalesMetricCards: React.FC<SalesMetricCardsProps> = ({ metrics }) => {
  return (
    <section aria-label="Sales overview metrics" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {/* 1. Number of Calls */}
      <div className="crm-soft-surface-quiet flex min-h-[168px] flex-col justify-between rounded-md border border-[#e2e8f0] bg-white p-4 transition-colors duration-200 hover:border-[#0022ff]/35">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Number of Calls
            </span>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#0022ff] text-white">
              <PhoneCall className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-[#111625]">
              {metrics.total_calls.toLocaleString()}
            </h3>
            <p className="mt-0.5 text-xs font-bold text-[#0022ff]">
              {metrics.calls_connected.toLocaleString()} Connected
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-[#e2e8f0] pt-2 text-[11px]">
          <span className="font-medium text-slate-500">Monthly Growth</span>
          <span className="flex items-center gap-0.5 font-extrabold text-[#0022ff]">
            <TrendingUp className="h-3 w-3" />+{metrics.calls_growth}%
          </span>
        </div>
      </div>

      {/* 2. Number of Leads */}
      <div className="crm-soft-surface-quiet flex min-h-[168px] flex-col justify-between rounded-md border border-[#e2e8f0] bg-white p-4 transition-colors duration-200 hover:border-[#0022ff]/35">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Number of Leads
            </span>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#0022ff] text-white">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-[#111625]">
              {metrics.total_leads.toLocaleString()}
            </h3>
            <p className="mt-0.5 text-xs font-bold text-[#0022ff]">
              +{metrics.new_leads_this_month} New This Month
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-[#e2e8f0] pt-2 text-[11px]">
          <span className="font-medium text-slate-500">Acquisition Rate</span>
          <span className="flex items-center gap-0.5 font-extrabold text-[#0022ff]">
            <TrendingUp className="h-3 w-3" />+{metrics.leads_growth}%
          </span>
        </div>
      </div>

      {/* 3. Overdue Leads */}
      <div className="crm-soft-surface-quiet flex min-h-[168px] flex-col justify-between rounded-md border border-[#e2e8f0] bg-white p-4 transition-colors duration-200 hover:border-[#0022ff]/35">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Overdue Leads
            </span>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#111625] text-white">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-[#111625]">
              {metrics.overdue_leads}
            </h3>
            <p className="mt-0.5 text-xs font-bold text-[#111625]">
              {metrics.overdue_high_priority} High Priority Urgent
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-[#e2e8f0] pt-2 text-[11px]">
          <span className="font-medium text-slate-500">SLA Breach</span>
          <span className="font-extrabold text-[#111625]">
            {metrics.overdue_percentage}% of total
          </span>
        </div>
      </div>

      {/* 4. Department Leads */}
      <div className="crm-soft-surface-quiet flex min-h-[168px] flex-col justify-between rounded-md border border-[#e2e8f0] bg-white p-4 transition-colors duration-200 hover:border-[#0022ff]/35">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Department Leads
            </span>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#0022ff] text-white">
              <Building className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-black text-[#111625]">
              {metrics.total_opd_leads} OP / {metrics.total_ipd_leads} IP
            </h3>
            <p className="mt-0.5 text-xs font-bold text-[#0022ff]">
              Cardiology & Ortho Top
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-[#e2e8f0] pt-2 text-[11px]">
          <span className="font-medium text-slate-500">Departments</span>
          <span className="font-extrabold text-[#0022ff]">6 Specialties</span>
        </div>
      </div>

      {/* 5. Branch Leads */}
      <div className="dashboard-focus-card crm-soft-focus flex min-h-[168px] flex-col justify-between rounded-md border border-[#0F1A34] bg-[#0F1A34] p-4 text-white">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-white/80">
              Branch Leads
            </span>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white">
              <MapPin className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-black text-white truncate">
              {metrics.total_branches_count} Branches
            </h3>
            <p className="mt-0.5 truncate text-xs font-semibold text-white/80">
              Top: {metrics.top_performing_branch}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
          <span className="font-medium text-white/80">Leading Branch</span>
          <span className="font-black text-white">520 Leads</span>
        </div>
      </div>
    </section>
  );
};
