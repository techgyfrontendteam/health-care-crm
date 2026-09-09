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
import { FileSpreadsheet, Calendar, Filter } from "lucide-react";
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
    <div className="space-y-6 w-full px-2 sm:px-4 lg:px-6 pb-12">
      {/* Header */}
      <PageHeader
        title="Sales & Lead Pipeline Dashboard"
        description="Real-time analytics for calls, lead sources, overdue follow-ups, departments, and hospital branches"
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
