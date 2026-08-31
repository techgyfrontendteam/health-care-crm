import React from "react";
import type { SalesMetrics } from "../types";
import {
  PhoneCall,
  Users,
  AlertTriangle,
  Layers,
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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
              {metrics.total_calls.toLocaleString()}
            </h3>
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5">
              {metrics.calls_connected.toLocaleString()} Connected
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px]">
          <span className="text-zinc-400 font-medium">Monthly Growth</span>
          <span className="font-extrabold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp className="h-3 w-3" />+{metrics.calls_growth}%
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
              {metrics.total_leads.toLocaleString()}
            </h3>
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              +{metrics.new_leads_this_month} New This Month
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px]">
          <span className="text-zinc-400 font-medium">Acquisition Rate</span>
          <span className="font-extrabold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp className="h-3 w-3" />+{metrics.leads_growth}%
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
              {metrics.overdue_leads}
            </h3>
            <p className="text-xs font-bold text-rose-500 mt-0.5">
              {metrics.overdue_high_priority} High Priority Urgent
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px]">
          <span className="text-zinc-400 font-medium">SLA Breach</span>
          <span className="font-extrabold text-rose-600">
            {metrics.overdue_percentage}% of total
          </span>
        </div>
      </div>

      {/* 4. Lead Source */}
      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-900 transition-all group flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              Lead Source
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Layers className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100 truncate">
              WhatsApp (33%)
            </h3>
            <p className="text-xs font-bold text-purple-600 dark:text-purple-400 mt-0.5">
              Top Channel (480 Leads)
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px]">
          <span className="text-zinc-400 font-medium">Active Channels</span>
          <span className="font-extrabold text-purple-600">6 Sources</span>
        </div>
      </div>

      {/* 5. Department Leads */}
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
            <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100">
              {metrics.total_opd_leads} OP / {metrics.total_ipd_leads} IP
            </h3>
            <p className="text-xs font-bold text-teal-600 dark:text-teal-400 mt-0.5">
              Cardiology & Ortho Top
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px]">
          <span className="text-zinc-400 font-medium">Departments</span>
          <span className="font-extrabold text-teal-600">6 Specialties</span>
        </div>
      </div>

      {/* 6. Branch Leads */}
      <div className="bg-gradient-to-br from-[#063669] to-[#0b4b8c] p-4 rounded-2xl text-white shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-blue-200 uppercase tracking-wider">
              Branch Leads
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
              <MapPin className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-black text-white truncate">
              {metrics.total_branches_count} Branches
            </h3>
            <p className="text-xs font-semibold text-blue-200 mt-0.5 truncate">
              Top: {metrics.top_performing_branch}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
          <span className="text-blue-200 font-medium">Leading Branch</span>
          <span className="font-black text-emerald-300">520 Leads</span>
        </div>
      </div>
    </div>
  );
};
