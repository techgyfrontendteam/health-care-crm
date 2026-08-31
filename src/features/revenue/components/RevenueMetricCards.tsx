import React from "react";
import type { RevenueMetrics } from "../types";
import {
  Calendar,
  CheckCircle2,
  Stethoscope,
  Building2,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  Activity,
  Award,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "../../../utils";

interface RevenueMetricCardsProps {
  metrics: RevenueMetrics;
}

const formatCurrency = (val: number) => {
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  }
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  }
  return `₹${val.toLocaleString()}`;
};

export const RevenueMetricCards: React.FC<RevenueMetricCardsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {/* 1. OPD Booked */}
      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-900 transition-all group flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              OPD Booked
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#063669] dark:text-blue-400 flex items-center justify-center shrink-0">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
              {metrics.opd_booked_count.toLocaleString()}
            </h3>
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5">
              {formatCurrency(metrics.opd_booked_revenue)}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px]">
          <span className="text-zinc-400 font-medium">Monthly Bookings</span>
          <span className="font-extrabold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp className="h-3 w-3" />+{metrics.opd_booked_growth}%
          </span>
        </div>
      </div>

      {/* 2. OPD Completed */}
      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-900 transition-all group flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              OPD Completed
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
              {metrics.opd_completed_count.toLocaleString()}
            </h3>
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {formatCurrency(metrics.opd_completed_revenue)}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px]">
          <span className="text-zinc-400 font-medium">Completion Rate</span>
          <span className="font-extrabold text-emerald-600">
            {metrics.opd_completed_rate}%
          </span>
        </div>
      </div>

      {/* 3. IPD Prescribed */}
      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-900 transition-all group flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              IPD Prescribed
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Stethoscope className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
              {metrics.ipd_prescribed_count.toLocaleString()}
            </h3>
            <p className="text-xs font-bold text-purple-600 dark:text-purple-400 mt-0.5">
              Est. {formatCurrency(metrics.ipd_prescribed_estimated_value)}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px]">
          <span className="text-zinc-400 font-medium">OPD to IPD Conversion</span>
          <span className="font-extrabold text-purple-600">
            {metrics.ipd_prescribed_rate}%
          </span>
        </div>
      </div>

      {/* 4. IPD Completed */}
      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md hover:border-teal-300 dark:hover:border-teal-900 transition-all group flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              IPD Completed
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
              <Building2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
              {metrics.ipd_completed_count.toLocaleString()}
            </h3>
            <p className="text-xs font-bold text-teal-600 dark:text-teal-400 mt-0.5">
              {formatCurrency(metrics.ipd_completed_revenue)}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px]">
          <span className="text-zinc-400 font-medium">Prescribed Conv.</span>
          <span className="font-extrabold text-teal-600">
            {metrics.ipd_completed_rate}%
          </span>
        </div>
      </div>

      {/* 5. Monthly Revenue */}
      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-900 transition-all group flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              Monthly Revenue
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <IndianRupee className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-black text-indigo-600 dark:text-indigo-400 truncate">
              {formatCurrency(metrics.monthly_revenue)}
            </h3>
            <p className="text-xs font-bold text-zinc-500 mt-0.5">
              Target: {formatCurrency(metrics.monthly_revenue_target)}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px]">
          <span className="text-zinc-400 font-medium">MoM Growth</span>
          <span className="font-extrabold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp className="h-3 w-3" />+{metrics.monthly_revenue_growth}%
          </span>
        </div>
      </div>

      {/* 6. Yearly Revenue */}
      <div className="bg-gradient-to-br from-[#063669] to-[#0b4b8c] p-4 rounded-2xl text-white shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-blue-200 uppercase tracking-wider">
              Yearly Revenue
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-xl font-black text-white truncate">
              {formatCurrency(metrics.yearly_revenue)}
            </h3>
            <p className="text-xs font-semibold text-blue-200 mt-0.5">
              Target: {formatCurrency(metrics.yearly_revenue_target)}
            </p>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
          <span className="text-blue-200 font-medium">YoY Growth</span>
          <span className="font-black text-emerald-300 flex items-center gap-0.5">
            <TrendingUp className="h-3 w-3" />+{metrics.yearly_revenue_growth}%
          </span>
        </div>
      </div>
    </div>
  );
};
