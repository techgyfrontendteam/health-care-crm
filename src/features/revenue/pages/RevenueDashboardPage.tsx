import React, { useState, useMemo } from "react";
import { PageHeader } from "../../../shared/components/PageHeader/PageHeader";
import { Button } from "../../../components/ui/button";
import { RevenueMetricCards } from "../components/RevenueMetricCards";
import { RevenueCharts } from "../components/RevenueCharts";
import { DoctorRevenueTable } from "../components/DoctorRevenueTable";
import { RevenueTransactionTable } from "../components/RevenueTransactionTable";
import { BranchCityDetailsCard } from "../components/BranchCityDetailsCard";
import {
  revenueMetricsData,
  monthlyRevenueTrendsData,
  doctorRevenueData,
  recentTransactionsData,
  branchesData,
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
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import type { RevenueMetrics } from "../types";

export const RevenueDashboardPage: React.FC = () => {
  const [dateFilter, setDateFilter] = useState<string>("This Month");
  const [selectedBranchId, setSelectedBranchId] = useState<string>("all");

  const selectedBranchInfo = useMemo(() => {
    if (selectedBranchId === "all") return null;
    return branchesData.find((b) => b.id === selectedBranchId) || null;
  }, [selectedBranchId]);

  // Dynamic Metrics based on selected branch
  const filteredMetrics = useMemo<RevenueMetrics>(() => {
    if (!selectedBranchInfo) return revenueMetricsData;

    const branchRev = selectedBranchInfo.monthlyRevenue;
    const opdRev = Math.round(branchRev * (selectedBranchInfo.opdShare / 100));
    const ipdRev = Math.round(branchRev * (selectedBranchInfo.ipdShare / 100));
    const opdCount = Math.round(opdRev / 1200);
    const ipdCount = Math.round(ipdRev / 15000);

    return {
      opd_booked_count: Math.round(opdCount * 1.1),
      opd_booked_revenue: Math.round(opdRev * 1.1),
      opd_booked_growth: 12.5,

      opd_completed_count: opdCount,
      opd_completed_revenue: opdRev,
      opd_completed_rate: 91.0,

      ipd_prescribed_count: Math.round(ipdCount * 1.15),
      ipd_prescribed_estimated_value: Math.round(ipdRev * 1.15),
      ipd_prescribed_rate: 29.5,

      ipd_completed_count: ipdCount,
      ipd_completed_revenue: ipdRev,
      ipd_completed_rate: 87.0,

      monthly_revenue: branchRev,
      monthly_revenue_target: Math.round(branchRev * 1.08),
      monthly_revenue_growth: 15.2,

      yearly_revenue: branchRev * 9.2,
      yearly_revenue_target: branchRev * 10,
      yearly_revenue_growth: 21.0,
    };
  }, [selectedBranchInfo]);

  // Dynamic Trends based on selected branch
  const filteredTrends = useMemo(() => {
    if (!selectedBranchInfo) return monthlyRevenueTrendsData;
    const ratio = selectedBranchInfo.monthlyRevenue / revenueMetricsData.monthly_revenue;

    return monthlyRevenueTrendsData.map((t) => ({
      ...t,
      opd_revenue: Math.round(t.opd_revenue * ratio),
      ipd_revenue: Math.round(t.ipd_revenue * ratio),
      total_revenue: Math.round(t.total_revenue * ratio),
      opd_count: Math.round(t.opd_count * ratio),
      ipd_count: Math.round(t.ipd_count * ratio),
    }));
  }, [selectedBranchInfo]);

  // Filtered Doctors list
  const filteredDoctors = useMemo(() => {
    if (selectedBranchId === "all") return doctorRevenueData;
    return doctorRevenueData.filter((doc) => doc.branch_id === selectedBranchId);
  }, [selectedBranchId]);

  // Filtered Transactions list
  const filteredTransactions = useMemo(() => {
    if (selectedBranchId === "all") return recentTransactionsData;
    return recentTransactionsData.filter((txn) => txn.branch_id === selectedBranchId);
  }, [selectedBranchId]);

  const handleExport = () => {
    const branchLabel = selectedBranchInfo
      ? `${selectedBranchInfo.name} (${selectedBranchInfo.city})`
      : "All Branches";
    toast.success(`Revenue report exported for ${branchLabel} successfully`);
  };

  return (
    <div className="space-y-6 w-full px-2 sm:px-4 lg:px-6 pb-12">
      {/* Header */}
      <PageHeader
        title="Revenue & Financial Analytics"
        description="Comprehensive analytics dashboard for OPD, IPD, and hospital financial performance"
        actions={
          <div className="flex flex-wrap items-center gap-3">
            {/* Branch Selector Dropdown */}
            <div className="relative">
              <select
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                className="h-11 px-4 pr-9 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-extrabold text-zinc-800 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-[#063669] shadow-sm hover:border-blue-400 transition-all cursor-pointer appearance-none"
              >
                <option value="all">🏢 All Branches (All Cities)</option>
                {branchesData.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    📍 {branch.name} — {branch.city}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                <Building2 className="h-4 w-4 text-[#063669] dark:text-blue-400" />
              </div>
            </div>

            {/* Date Filter */}
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

      {/* 0. Branch & City Details Banner */}
      <BranchCityDetailsCard
        selectedBranch={selectedBranchInfo}
        allBranches={branchesData}
      />

      {/* 1. Top Metrics Banner Cards */}
      <RevenueMetricCards metrics={filteredMetrics} />

      {/* 2. Visual Charts (Monthly Trend & Revenue Share) */}
      <RevenueCharts data={filteredTrends} />

      {/* 3. Doctor-wise Revenue Breakdown Table */}
      <DoctorRevenueTable doctors={filteredDoctors} />

      {/* 4. Recent Revenue Transactions Audit Table */}
      <RevenueTransactionTable transactions={filteredTransactions} />
    </div>
  );
};
