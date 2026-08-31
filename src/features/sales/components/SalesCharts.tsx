import React from "react";
import type { DailySalesTrend, LeadSourceItem, DepartmentLeadItem } from "../types";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { PhoneCall, Share2, Building, BarChart3, PieChart as PieIcon } from "lucide-react";

interface SalesChartsProps {
  dailyTrends: DailySalesTrend[];
  leadSources: LeadSourceItem[];
  departmentLeads: DepartmentLeadItem[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl text-xs space-y-1">
        <p className="font-bold text-zinc-900 dark:text-zinc-100">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-zinc-500">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              {p.name}:
            </span>
            <span className="font-extrabold text-zinc-900 dark:text-zinc-100">
              {p.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const SalesCharts: React.FC<SalesChartsProps> = ({
  dailyTrends,
  leadSources,
  departmentLeads,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Daily Calls & New Leads Trend Chart */}
      <div className="lg:col-span-2 bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#063669] dark:text-blue-400" />
              Daily Calls Logged & New Leads Volume
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              10-day tracking of phone outreach vs incoming lead acquisition
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-blue-600">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Calls Logged
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> New Leads
            </span>
          </div>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#64748b", fontWeight: 600 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#64748b", fontWeight: 600 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="calls"
                name="Calls Logged"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorCalls)"
              />
              <Area
                type="monotone"
                dataKey="new_leads"
                name="New Leads"
                stroke="#10b981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorLeads)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Lead Source Distribution Breakdown */}
      <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Share2 className="h-5 w-5 text-purple-600" />
            Lead Source Breakdown
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Performance & conversions by lead acquisition channel
          </p>
        </div>

        <div className="space-y-3">
          {leadSources.map((item) => (
            <div key={item.source} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-zinc-700 dark:text-zinc-300 truncate max-w-[160px]">
                  {item.source}
                </span>
                <span className="text-zinc-900 dark:text-zinc-100">
                  {item.count} leads ({item.percentage}%)
                </span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${item.percentage * 2.5}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
