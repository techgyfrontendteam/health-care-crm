import React from "react";
import type { DailySalesTrend, LeadSourceItem, DepartmentLeadItem } from "../types";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Layers, BarChart3 } from "lucide-react";

interface SalesChartsProps {
  dailyTrends: DailySalesTrend[];
  leadSources: LeadSourceItem[];
  departmentLeads: DepartmentLeadItem[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="crm-soft-surface space-y-1 rounded-md border border-[#e2e8f0] bg-white p-3 text-xs">
        <p className="font-bold text-[#111625]">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-slate-500">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              {p.name}:
            </span>
            <span className="font-extrabold text-[#111625]">
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
    <section aria-label="Sales trend charts" className="grid grid-cols-1 gap-4 xl:grid-cols-3">
      {/* 1. Daily Calls & New Leads Trend Chart */}
      <div className="crm-soft-surface flex min-h-[390px] flex-col justify-between rounded-md border border-[#e2e8f0] bg-white p-5 sm:p-6 xl:col-span-2">
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div>
            <h3 className="flex items-center gap-2 text-base font-extrabold text-[#111625]">
              <BarChart3 className="h-5 w-5 text-[#0022ff]" />
              Daily Calls Logged & New Leads Volume
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              10-day tracking of phone outreach vs incoming lead acquisition
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold sm:justify-end">
            <span className="flex items-center gap-1.5 text-[#0022ff]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#0022ff]" /> Calls Logged
            </span>
            <span className="flex items-center gap-1.5 text-[#111625]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#111625]" /> New Leads
            </span>
          </div>
        </div>

        <div className="h-[280px] w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0022ff" stopOpacity={0.32} />
                  <stop offset="95%" stopColor="#0022ff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#111625" stopOpacity={0.24} />
                  <stop offset="95%" stopColor="#111625" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#111625", fontWeight: 600 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#111625", fontWeight: 600 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="calls"
                name="Calls Logged"
                stroke="#0022ff"
                strokeWidth={2.25}
                fillOpacity={1}
                fill="url(#colorCalls)"
              />
              <Area
                type="monotone"
                dataKey="new_leads"
                name="New Leads"
                stroke="#111625"
                strokeWidth={2.25}
                fillOpacity={1}
                fill="url(#colorLeads)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Lead Source Distribution Breakdown */}
      <div className="crm-soft-surface flex min-h-[390px] flex-col justify-between space-y-5 rounded-md border border-[#e2e8f0] bg-white p-5 sm:p-6">
        <div>
          <h3 className="flex items-center gap-2 text-base font-extrabold text-[#111625]">
            <Layers className="h-5 w-5 text-[#0022ff]" />
            Lead Source Breakdown
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Performance & conversions by lead acquisition channel
          </p>
        </div>

        <div className="space-y-3">
          {leadSources.map((item) => (
            <div key={item.source} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="max-w-[160px] truncate text-[#111625]">
                  {item.source}
                </span>
                <span className="text-[#111625]">
                  {item.count} leads ({item.percentage}%)
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#e2e8f0]">
                <div
                  className="h-full rounded-full transition-[width] duration-500"
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
    </section>
  );
};
