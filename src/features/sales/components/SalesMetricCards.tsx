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
  isLoading?: boolean;
}

export const SalesMetricCards: React.FC<SalesMetricCardsProps> = ({ metrics, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm animate-pulse flex flex-col justify-between h-[155px]"
          >
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800" />
            </div>
            <div className="space-y-2 mt-2">
              <div className="h-7 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-3.5 w-28 bg-zinc-100 dark:bg-zinc-800 rounded" />
            </div>
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex justify-between">
              <div className="h-3 w-16 bg-zinc-100 dark:bg-zinc-800 rounded" />
              <div className="h-3 w-12 bg-zinc-100 dark:bg-zinc-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const noOfCalls = Number(metrics?.no_of_calls ?? metrics?.total_calls ?? 0);
  const callsConnected = metrics?.calls_connected ? Number(metrics.calls_connected) : null;
  const callsGrowth = metrics?.calls_growth !== undefined ? Number(metrics.calls_growth) : null;

  const noOfLeads = Number(metrics?.no_of_leads ?? metrics?.total_leads ?? 0);
  const newLeads = metrics?.new_leads_this_month !== undefined ? Number(metrics.new_leads_this_month) : null;
  const leadsGrowth = metrics?.leads_growth !== undefined ? Number(metrics.leads_growth) : null;

  const overdueLeads = Number(metrics?.overdue_leads ?? metrics?.no_of_overdue ?? 0);
  const overdueHighPriority = Number(metrics?.overdue_high_priority ?? 0);
  const overduePercentage = metrics?.overdue_percentage !== undefined
    ? Number(metrics.overdue_percentage)
    : (noOfLeads > 0 ? Number(((overdueLeads / noOfLeads) * 100).toFixed(1)) : 0);

  const noOfDepartments = Number(metrics?.no_of_depertments ?? metrics?.no_of_departments ?? metrics?.total_departments ?? 0);
  const totalOpd = metrics?.total_opd_leads !== undefined ? Number(metrics.total_opd_leads) : null;
  const totalIpd = metrics?.total_ipd_leads !== undefined ? Number(metrics.total_ipd_leads) : null;

  const noOfBranches = Number(metrics?.no_of_branches ?? metrics?.total_branches_count ?? 0);
  const topBranch = metrics?.top_performing_branch || "Main Hospital";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {/* 1. Number of Calls */}
      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-900 transition-all group flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              Number of Calls
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#063669] dark:text-blue-400 flex items-center justify-center shrink-0">
              <PhoneCall className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
              {noOfCalls.toLocaleString()}
            </h3>
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5">
              {callsConnected !== null ? `${callsConnected.toLocaleString()} Connected` : "Total Telephony Calls"}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px]">
          <span className="text-zinc-400 font-medium">Activity</span>
          <span className="font-extrabold text-emerald-600 flex items-center gap-0.5">
            {callsGrowth !== null ? (
              <>
                <TrendingUp className="h-3 w-3" />+{callsGrowth}%
              </>
            ) : (
              <span className="text-blue-600 dark:text-blue-400 font-bold">Calls Logged</span>
            )}
          </span>
        </div>
      </div>

      {/* 2. Number of Leads */}
      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-900 transition-all group flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              Number of Leads
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
              {noOfLeads.toLocaleString()}
            </h3>
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {newLeads !== null ? `+${newLeads.toLocaleString()} New This Month` : "Active Pipeline"}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px]">
          <span className="text-zinc-400 font-medium">Pipeline</span>
          <span className="font-extrabold text-emerald-600 flex items-center gap-0.5">
            {leadsGrowth !== null ? (
              <>
                <TrendingUp className="h-3 w-3" />+{leadsGrowth}%
              </>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Total Leads</span>
            )}
          </span>
        </div>
      </div>

      {/* 3. Overdue Leads */}
      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md hover:border-rose-300 dark:hover:border-rose-900 transition-all group flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wider">
              Overdue Leads
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-rose-600 dark:text-rose-400">
              {overdueLeads.toLocaleString()}
            </h3>
            <p className="text-xs font-bold text-rose-500 mt-0.5">
              {overdueHighPriority > 0
                ? `${overdueHighPriority.toLocaleString()} High Priority Urgent`
                : "0 Urgent Leads"}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px]">
          <span className="text-zinc-400 font-medium">SLA Status</span>
          <span className="font-extrabold text-rose-600">
            {overduePercentage > 0 ? `${overduePercentage}% SLA Breach` : "0% SLA Breach"}
          </span>
        </div>
      </div>

      {/* 4. Department Leads */}
      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md hover:border-teal-300 dark:hover:border-teal-900 transition-all group flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              Department Leads
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
              <Building className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
              {noOfDepartments.toLocaleString()}
            </h3>
            <p className="text-xs font-bold text-teal-600 dark:text-teal-400 mt-0.5">
              {totalOpd !== null && totalIpd !== null
                ? `${totalOpd.toLocaleString()} OP / ${totalIpd.toLocaleString()} IP`
                : "Specialties & Clinical Units"}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px]">
          <span className="text-zinc-400 font-medium">Departments</span>
          <span className="font-extrabold text-teal-600">Active Units</span>
        </div>
      </div>

      {/* 5. Branch Leads */}
      <div className="bg-[#0f1a34] p-4 rounded-2xl text-white shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-white uppercase tracking-wider">
              Branch Leads
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
              <MapPin className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-white truncate">
              {noOfBranches} Branches
            </h3>
            <p className="text-xs font-semibold text-white/80 mt-0.5 truncate">
              Top: {topBranch}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
          <span className="text-white/70 font-medium">Network</span>
          <span className="font-black text-white">All Locations</span>
        </div>
      </div>
    </div>
  );
};
