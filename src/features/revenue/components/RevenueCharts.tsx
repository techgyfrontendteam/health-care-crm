import React from "react";
import type { MonthlyRevenueTrend } from "../types";
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
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, PieChart as PieIcon, BarChart3, Layers } from "lucide-react";

interface RevenueChartsProps {
  data: MonthlyRevenueTrend[];
}

const formatLakhs = (val: number) => {
  return `₹${(val / 100000).toFixed(0)}L`;
};

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
              ₹{(p.value / 100000).toFixed(2)} Lakhs
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const RevenueCharts: React.FC<RevenueChartsProps> = ({ data }) => {
  const latestData = data[data.length - 5] || data[0]; // Aug data
  const pieData = [
    { name: "OPD Revenue", value: latestData.opd_revenue, color: "#3b82f6" },
    { name: "IPD Revenue", value: latestData.ipd_revenue, color: "#8b5cf6" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Monthly Revenue Growth Area Chart */}
      <div className="lg:col-span-2 bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#063669] dark:text-blue-400" />
              Monthly Revenue Trend (OPD vs IPD)
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Comparative breakdown of outpatient vs inpatient monthly revenue
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-blue-600">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> OPD
            </span>
            <span className="flex items-center gap-1.5 text-purple-600">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> IPD
            </span>
          </div>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorOpd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorIpd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#64748b", fontWeight: 600 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={formatLakhs}
                tick={{ fontSize: 11, fill: "#64748b", fontWeight: 600 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="opd_revenue"
                name="OPD Revenue"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorOpd)"
              />
              <Area
                type="monotone"
                dataKey="ipd_revenue"
                name="IPD Revenue"
                stroke="#8b5cf6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorIpd)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. OPD vs IPD Donut Share */}
      <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <PieIcon className="h-5 w-5 text-purple-600" />
            Revenue Distribution
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Share of revenue between OPD and IPD departments
          </p>
        </div>

        <div className="h-[220px] w-full relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs font-bold text-zinc-400">Total</span>
            <span className="text-sm font-black text-zinc-900 dark:text-zinc-100">
              ₹61.86L
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 text-center">
            <span className="text-[10px] font-bold text-zinc-400 uppercase">OPD Share</span>
            <p className="text-sm font-extrabold text-blue-600 dark:text-blue-400">24.8%</p>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 text-center">
            <span className="text-[10px] font-bold text-zinc-400 uppercase">IPD Share</span>
            <p className="text-sm font-extrabold text-purple-600 dark:text-purple-400">75.2%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
