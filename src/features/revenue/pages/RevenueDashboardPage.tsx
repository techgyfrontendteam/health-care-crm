import React, { useState, useMemo } from "react";
import { PageHeader } from "../../../shared/components/PageHeader/PageHeader";
import { Button } from "../../../components/ui/button";
import { RevenueMetricCards } from "../components/RevenueMetricCards";
import { RevenueCharts } from "../components/RevenueCharts";
import { DoctorRevenueTable } from "../components/DoctorRevenueTable";
import { RevenueTransactionTable } from "../components/RevenueTransactionTable";
import {
  revenueMetricsData,
  monthlyRevenueTrendsData,
  doctorRevenueData,
  recentTransactionsData,
} from "../data/revenueData";
import {
  Calendar,
  Download,
  Filter,
  RefreshCw,
  TrendingUp,
  IndianRupee,
  Building2,
  FileSpreadsheet,
} from "lucide-react";
import { toast } from "sonner";

export const RevenueDashboardPage: React.FC = () => {
  const [metrics] = useState(revenueMetricsData);
  const [trends] = useState(monthlyRevenueTrendsData);
  const [doctors] = useState(doctorRevenueData);
  const [transactions] = useState(recentTransactionsData);

  const [dateFilter, setDateFilter] = useState<string>("This Month");

  const handleExport = () => {
    toast.success("Revenue report exported to Excel successfully");
  };

  return (
    <div className="space-y-6 w-full px-2 sm:px-4 lg:px-6 pb-12">
      {/* Header */}
      <PageHeader
        title="Revenue & Financial Analytics"
        description="Comprehensive analytics dashboard for OPD, IPD, and hospital financial performance"
        actions={
          <div className="flex items-center gap-3">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="h-11 px-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-700 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-[#063669] shadow-sm"
            >
              <option value="This Month">This Month (Aug 2026)</option>
              <option value="Last Month">Last Month (Jul 2026)</option>
              <option value="Q3 2026">Q3 2026</option>
              <option value="YTD 2026">Year-to-Date 2026</option>
            </select>

            <Button
              onClick={handleExport}
              className="gap-2 bg-[#063669] hover:bg-[#063669]/90 text-white rounded-2xl h-11 px-6 font-bold text-sm shadow-sm"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        }
      />

      {/* 1. Top Metrics Banner Cards */}
      <RevenueMetricCards metrics={metrics} />

      {/* 2. Visual Charts (Monthly Trend & Revenue Share) */}
      <RevenueCharts data={trends} />

      {/* 3. Doctor-wise Revenue Breakdown Table */}
      <DoctorRevenueTable doctors={doctors} />

      {/* 4. Recent Revenue Transactions Audit Table */}
      <RevenueTransactionTable transactions={transactions} />
    </div>
  );
};
