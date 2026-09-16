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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
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
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="!w-auto inline-flex items-center justify-start gap-1.5 px-4 !rounded-lg h-11 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-700 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-[#063669] shadow-xs hover:border-zinc-300 transition-colors cursor-pointer [&>svg]:opacity-60 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:shrink-0">
                <SelectValue placeholder="This Month (Aug 2026)">
                  {dateFilter === "This Month"
                    ? "This Month (Aug 2026)"
                    : dateFilter === "Last Month"
                    ? "Last Month (Jul 2026)"
                    : dateFilter === "Q3 2026"
                    ? "Q3 2026"
                    : dateFilter === "YTD 2026"
                    ? "Year-to-Date 2026"
                    : dateFilter}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-zinc-900 z-50 text-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg min-w-[190px]">
                <SelectItem value="This Month" className="text-xs font-semibold cursor-pointer">This Month (Aug 2026)</SelectItem>
                <SelectItem value="Last Month" className="text-xs font-semibold cursor-pointer">Last Month (Jul 2026)</SelectItem>
                <SelectItem value="Q3 2026" className="text-xs font-semibold cursor-pointer">Q3 2026</SelectItem>
                <SelectItem value="YTD 2026" className="text-xs font-semibold cursor-pointer">Year-to-Date 2026</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={handleExport}
              className="gap-2 bg-[#063669] hover:bg-[#063669]/90 text-white rounded-lg h-11 px-6 font-bold text-sm shadow-sm"
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
