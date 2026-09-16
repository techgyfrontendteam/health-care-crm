import React, { useState } from "react";
import { PageHeader } from "../../../shared/components/PageHeader/PageHeader";
import { Button } from "../../../components/ui/button";
import { SalesMetricCards } from "../components/SalesMetricCards";
import { SalesCharts } from "../components/SalesCharts";
import { BranchLeadsCards } from "../components/BranchLeadsCards";
import { SalesLeadTable } from "../components/SalesLeadTable";
import {
  salesMetricsData,
  leadSourcesData,
  departmentLeadsData,
  branchLeadsData,
  dailySalesTrendsData,
  salesLeadRecordsData,
} from "../data/salesData";
import { FileSpreadsheet, ChevronDown } from "lucide-react";
import { toast } from "sonner";

export const SalesDashboardPage: React.FC = () => {
  const [metrics] = useState(salesMetricsData);
  const [leadSources] = useState(leadSourcesData);
  const [departments] = useState(departmentLeadsData);
  const [branches] = useState(branchLeadsData);
  const [trends] = useState(dailySalesTrendsData);
  const [leads] = useState(salesLeadRecordsData);

  const [dateFilter, setDateFilter] = useState<string>("This Month");

  const handleExport = () => {
    toast.success("Sales Analytics report exported to Excel successfully");
  };

  return (
    <div className="mx-auto w-full max-w-[1920px] space-y-5 px-4 py-6 sm:px-6 md:px-8">
      {/* Header */}
      <PageHeader
        title="Sales & Lead Pipeline Dashboard"
        description="Real-time analytics for calls, lead sources, overdue follow-ups, departments, and hospital branches"
        actions={
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
            <div className="relative">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                aria-label="Sales dashboard date range"
                className="h-10 min-w-[190px] rounded-md border border-[#e2e8f0] bg-white pl-3.5 pr-9 text-xs font-semibold text-[#111625] outline-none appearance-none transition-colors hover:border-slate-300 focus:border-[#0022ff] focus:ring-2 focus:ring-[#0022ff]/10 cursor-pointer"
              >
                <option value="This Month">This Month (Aug 2026)</option>
                <option value="Last Month">Last Month (Jul 2026)</option>
                <option value="Q3 2026">Q3 2026</option>
                <option value="YTD 2026">Year-to-Date 2026</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            </div>

            <Button
              onClick={handleExport}
              className="h-10 gap-2.5 rounded-md bg-[#0022ff] px-5 text-xs font-bold text-white shadow-none transition-colors hover:bg-[#001bd1]"
            >
              <FileSpreadsheet className="h-4 w-4 shrink-0" />
              <span>Export Report</span>
            </Button>
          </div>
        }
      />

      {/* 1. Top Metrics Banner Cards */}
      <SalesMetricCards metrics={metrics} />

      {/* 2. Visual Charts (Daily Calls & Lead Trends, Lead Sources) */}
      <SalesCharts
        dailyTrends={trends}
        leadSources={leadSources}
        departmentLeads={departmentLeadsData}
      />

      {/* 3. Branch Leads & Department Leads Cards */}
      <BranchLeadsCards branches={branches} departments={departmentLeadsData} />

      {/* 4. Active Sales Leads & Overdue Follow-ups Audit Table */}
      <SalesLeadTable leads={leads} />
    </div>
  );
};
