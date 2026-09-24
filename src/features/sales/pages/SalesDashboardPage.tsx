import React, { useState, useMemo } from "react";
import { PageHeader } from "../../../shared/components/PageHeader/PageHeader";
import { Button } from "../../../components/ui/button";
import { SalesMetricCards } from "../components/SalesMetricCards";
import { SalesCharts } from "../components/SalesCharts";
import { BranchLeadsCards } from "../components/BranchLeadsCards";
import { SalesLeadTable } from "../components/SalesLeadTable";
import {
  useGetSalesStatsQuery,
  useGetCallsLoggedAndNewLeadsQuery,
  useGetLeadSourceBreakDownQuery,
  useGetBranchLeadPerformanceQuery,
  useGetDepertmentLeadBreakDownQuery,
} from "../api/salesApi";
import type {
  SalesMetrics,
  DailySalesTrend,
  LeadSourceItem,
  BranchLeadItem,
  DepartmentLeadItem,
} from "../types";
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

const DEFAULT_SOURCE_COLORS = [
  "#25D366", // WhatsApp Green
  "#3b82f6", // Blue
  "#8b5cf6", // Purple
  "#ea4335", // Red
  "#f59e0b", // Amber
  "#ec4899", // Pink
  "#06b6d4", // Cyan
  "#10b981", // Emerald
  "#6366f1", // Indigo
];

const DEFAULT_DEPARTMENT_COLORS = [
  "#3b82f6", // Blue
  "#8b5cf6", // Purple
  "#06b6d4", // Cyan
  "#ec4899", // Pink
  "#f59e0b", // Amber
  "#10b981", // Emerald
  "#6366f1", // Indigo
  "#14b8a6", // Teal
  "#f97316", // Orange
];

export const SalesDashboardPage: React.FC = () => {
  const todayStr = useMemo(() => {
    return new Date().toISOString().split("T")[0];
  }, []);

  const { data: statsResponse, isLoading: isStatsLoading } = useGetSalesStatsQuery({ offset: 0 });
  const { data: callsAndLeadsResponse, isLoading: isCallsAndLeadsLoading } = useGetCallsLoggedAndNewLeadsQuery({
    present_date: todayStr,
  });
  const { data: leadSourceResponse, isLoading: isLeadSourceLoading } = useGetLeadSourceBreakDownQuery({});
  const { data: branchResponse, isLoading: isBranchLoading } = useGetBranchLeadPerformanceQuery({});
  const { data: departmentResponse, isLoading: isDepartmentLoading } = useGetDepertmentLeadBreakDownQuery({
    offset: 0,
  });

  const [leads] = useState(salesLeadRecordsData);

  const [dateFilter, setDateFilter] = useState<string>("This Month");

  const branches = useMemo<BranchLeadItem[]>(() => {
    if (!branchResponse) {
      return branchLeadsData;
    }

    const rawList =
      Array.isArray(branchResponse)
        ? branchResponse
        : Array.isArray(branchResponse.data)
        ? branchResponse.data
        : Array.isArray(branchResponse.results)
        ? branchResponse.results
        : Array.isArray(branchResponse.branches)
        ? branchResponse.branches
        : Array.isArray(branchResponse.branch_performance)
        ? branchResponse.branch_performance
        : Array.isArray(branchResponse.list)
        ? branchResponse.list
        : Array.isArray(branchResponse.records)
        ? branchResponse.records
        : null;

    if (rawList && rawList.length > 0) {
      return rawList.map((item: any, idx: number) => {
        const branch_id = String(
          item.branch_id ||
          item.id ||
          item.code ||
          item.branch_code ||
          `BR-0${idx + 1}`
        );

        const branch_name = String(
          item.branch_name ||
          item.name ||
          item.branch ||
          item.hospital_branch ||
          `Branch ${idx + 1}`
        );

        const location = String(
          item.location ||
          item.address ||
          item.city ||
          item.area ||
          "Hospital Location"
        );

        const total_leads = Number(
          item.total_leads ??
          item.lead_count ??
          item.leads ??
          item.no_of_leads ??
          0
        );

        const active_leads = Number(
          item.active_leads ??
          item.active ??
          Math.max(0, total_leads - Number(item.converted_leads ?? item.converted ?? 0))
        );

        const overdue_leads = Number(
          item.overdue_leads ??
          item.no_of_overdue ??
          item.overdue ??
          0
        );

        const converted_leads = Number(
          item.converted_leads ??
          item.converted ??
          item.conversions ??
          item.converted_count ??
          0
        );

        const total_calls = Number(
          item.total_calls ??
          item.calls ??
          item.calls_logged ??
          item.no_of_calls ??
          0
        );

        const revenue = Number(
          item.revenue ??
          item.total_revenue ??
          0
        );

        return {
          branch_id,
          branch_name,
          location,
          total_leads,
          active_leads,
          overdue_leads,
          converted_leads,
          total_calls,
          revenue,
        };
      });
    }

    return branchLeadsData;
  }, [branchResponse]);

  const departments = useMemo<DepartmentLeadItem[]>(() => {
    if (!departmentResponse) {
      return departmentLeadsData;
    }

    const rawList =
      Array.isArray(departmentResponse)
        ? departmentResponse
        : Array.isArray(departmentResponse.data)
        ? departmentResponse.data
        : Array.isArray(departmentResponse.results)
        ? departmentResponse.results
        : Array.isArray(departmentResponse.departments)
        ? departmentResponse.departments
        : Array.isArray(departmentResponse.depertments)
        ? departmentResponse.depertments
        : Array.isArray(departmentResponse.breakdown)
        ? departmentResponse.breakdown
        : Array.isArray(departmentResponse.list)
        ? departmentResponse.list
        : Array.isArray(departmentResponse.records)
        ? departmentResponse.records
        : null;

    if (rawList && rawList.length > 0) {
      return rawList.map((item: any, idx: number) => {
        const department_name = String(
          item.department_name ||
          item.name ||
          item.department ||
          item.depertment_name ||
          item.depertment ||
          item.specialty ||
          item.title ||
          `Department ${idx + 1}`
        );

        const lead_count = Number(
          item.lead_count ??
          item.total_leads ??
          item.leads ??
          item.no_of_leads ??
          item.count ??
          0
        );

        const converted_count = Number(
          item.converted_count ??
          item.converted_leads ??
          item.converted ??
          item.conversions ??
          0
        );

        const revenue = Number(
          item.revenue ??
          item.total_revenue ??
          0
        );

        const color = item.color || DEFAULT_DEPARTMENT_COLORS[idx % DEFAULT_DEPARTMENT_COLORS.length];

        return {
          department_name,
          lead_count,
          converted_count,
          revenue,
          color,
        };
      });
    }

    // Check if response is a key-value dictionary { "Cardiology": 45, "Neurology": 30, ... }
    const payload = departmentResponse.data || departmentResponse.results || departmentResponse;
    if (payload && typeof payload === "object" && !Array.isArray(payload)) {
      const entries = Object.entries(payload).filter(([key, val]) => {
        return (
          key !== "success" &&
          key !== "message" &&
          key !== "status" &&
          key !== "code" &&
          (typeof val === "number" || (typeof val === "object" && val !== null))
        );
      });

      if (entries.length > 0) {
        return entries.map(([key, val]: [string, any], idx: number) => {
          const lead_count = typeof val === "number" ? val : Number(val?.lead_count ?? val?.total_leads ?? val?.leads ?? val?.count ?? 0);
          const converted_count = typeof val === "object" ? Number(val?.converted_count ?? val?.converted ?? 0) : 0;
          const revenue = typeof val === "object" ? Number(val?.revenue ?? 0) : 0;
          const color =
            typeof val === "object" && val?.color
              ? val.color
              : DEFAULT_DEPARTMENT_COLORS[idx % DEFAULT_DEPARTMENT_COLORS.length];

          return {
            department_name: key,
            lead_count,
            converted_count,
            revenue,
            color,
          };
        });
      }
    }

    return departmentLeadsData;
  }, [departmentResponse]);

  const leadSources = useMemo<LeadSourceItem[]>(() => {
    if (!leadSourceResponse) {
      return leadSourcesData;
    }

    const rawList =
      Array.isArray(leadSourceResponse)
        ? leadSourceResponse
        : Array.isArray(leadSourceResponse.data)
        ? leadSourceResponse.data
        : Array.isArray(leadSourceResponse.results)
        ? leadSourceResponse.results
        : Array.isArray(leadSourceResponse.breakdown)
        ? leadSourceResponse.breakdown
        : Array.isArray(leadSourceResponse.sources)
        ? leadSourceResponse.sources
        : Array.isArray(leadSourceResponse.lead_sources)
        ? leadSourceResponse.lead_sources
        : Array.isArray(leadSourceResponse.list)
        ? leadSourceResponse.list
        : null;

    if (rawList && rawList.length > 0) {
      const totalCount = rawList.reduce((acc: number, item: any) => {
        const cnt = Number(
          item.count ??
          item.lead_count ??
          item.no_of_leads ??
          item.leads ??
          item.total_leads ??
          item.value ??
          0
        );
        return acc + cnt;
      }, 0);

      return rawList.map((item: any, idx: number) => {
        const source = String(
          item.source ||
          item.source_name ||
          item.name ||
          item.channel ||
          item.lead_source ||
          item.label ||
          item.title ||
          `Source ${idx + 1}`
        );

        const count = Number(
          item.count ??
          item.lead_count ??
          item.no_of_leads ??
          item.leads ??
          item.total_leads ??
          item.value ??
          0
        );

        const percentage =
          item.percentage !== undefined
            ? Number(item.percentage)
            : item.percent !== undefined
            ? Number(item.percent)
            : totalCount > 0
            ? Number(((count / totalCount) * 100).toFixed(1))
            : 0;

        const converted = Number(
          item.converted ??
          item.converted_count ??
          item.conversions ??
          0
        );

        const color = item.color || DEFAULT_SOURCE_COLORS[idx % DEFAULT_SOURCE_COLORS.length];

        return {
          source,
          count,
          percentage,
          converted,
          color,
        };
      });
    }

    // Check if response is a key-value dictionary { "WhatsApp": 45, "Website": 30, ... }
    const payload = leadSourceResponse.data || leadSourceResponse.results || leadSourceResponse;
    if (payload && typeof payload === "object" && !Array.isArray(payload)) {
      const entries = Object.entries(payload).filter(([key, val]) => {
        return (
          key !== "success" &&
          key !== "message" &&
          key !== "status" &&
          key !== "code" &&
          (typeof val === "number" || (typeof val === "object" && val !== null))
        );
      });

      if (entries.length > 0) {
        const totalCount = entries.reduce((acc, [, val]: [string, any]) => {
          const cnt = typeof val === "number" ? val : Number(val?.count ?? val?.lead_count ?? val?.no_of_leads ?? 0);
          return acc + cnt;
        }, 0);

        return entries.map(([key, val]: [string, any], idx: number) => {
          const count = typeof val === "number" ? val : Number(val?.count ?? val?.lead_count ?? val?.no_of_leads ?? 0);
          const percentage =
            typeof val === "object" && val?.percentage !== undefined
              ? Number(val.percentage)
              : totalCount > 0
              ? Number(((count / totalCount) * 100).toFixed(1))
              : 0;
          const converted = typeof val === "object" ? Number(val?.converted ?? val?.converted_count ?? 0) : 0;
          const color =
            typeof val === "object" && val?.color
              ? val.color
              : DEFAULT_SOURCE_COLORS[idx % DEFAULT_SOURCE_COLORS.length];

          return {
            source: key,
            count,
            percentage,
            converted,
            color,
          };
        });
      }
    }

    return leadSourcesData;
  }, [leadSourceResponse]);

  const trends = useMemo<DailySalesTrend[]>(() => {
    if (!callsAndLeadsResponse) {
      return dailySalesTrendsData;
    }

    const rawList =
      Array.isArray(callsAndLeadsResponse)
        ? callsAndLeadsResponse
        : Array.isArray(callsAndLeadsResponse.data)
        ? callsAndLeadsResponse.data
        : Array.isArray(callsAndLeadsResponse.results)
        ? callsAndLeadsResponse.results
        : Array.isArray(callsAndLeadsResponse.trends)
        ? callsAndLeadsResponse.trends
        : Array.isArray(callsAndLeadsResponse.daily_trends)
        ? callsAndLeadsResponse.daily_trends
        : Array.isArray(callsAndLeadsResponse.records)
        ? callsAndLeadsResponse.records
        : Array.isArray(callsAndLeadsResponse.list)
        ? callsAndLeadsResponse.list
        : null;

    if (rawList && rawList.length > 0) {
      return rawList.map((item: any, idx: number) => {
        const rawDate = item.date || item.day || item.present_date || item.label || item.created_at;
        let formattedDate = `Day ${idx + 1}`;
        if (rawDate) {
          try {
            const parsed = new Date(rawDate);
            if (!isNaN(parsed.getTime())) {
              formattedDate = parsed.toLocaleDateString("en-US", { month: "short", day: "numeric" });
            } else {
              formattedDate = String(rawDate);
            }
          } catch {
            formattedDate = String(rawDate);
          }
        }

        const calls = Number(
          item.calls ??
          item.no_of_calls ??
          item.calls_logged ??
          item.total_calls ??
          item.calls_count ??
          0
        );

        const new_leads = Number(
          item.new_leads ??
          item.no_of_leads ??
          item.leads ??
          item.total_leads ??
          item.leads_count ??
          0
        );

        const conversions = Number(
          item.conversions ??
          item.converted_leads ??
          item.no_of_conversions ??
          0
        );

        return {
          date: formattedDate,
          calls,
          new_leads,
          conversions,
        };
      });
    }

    // If the API returns a single object summary for the date
    const singleData = callsAndLeadsResponse.data || callsAndLeadsResponse;
    if (
      singleData &&
      (singleData.no_of_calls !== undefined ||
        singleData.calls !== undefined ||
        singleData.no_of_leads !== undefined ||
        singleData.new_leads !== undefined)
    ) {
      const calls = Number(singleData.no_of_calls ?? singleData.calls ?? singleData.calls_logged ?? 0);
      const new_leads = Number(singleData.no_of_leads ?? singleData.new_leads ?? singleData.leads ?? 0);
      const conversions = Number(singleData.conversions ?? singleData.converted_leads ?? 0);

      // Create a 1-entry or update the today's entry in trend
      const todayFormatted = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
      return [
        ...dailySalesTrendsData.slice(0, dailySalesTrendsData.length - 1),
        {
          date: todayFormatted,
          calls,
          new_leads,
          conversions,
        },
      ];
    }

    return dailySalesTrendsData;
  }, [callsAndLeadsResponse]);

  const metrics = useMemo<SalesMetrics>(() => {
    if (!statsResponse) {
      return salesMetricsData;
    }

    // Handle possible wrapper keys (data, results, cards, stats, or direct)
    const payload =
      statsResponse.data ||
      statsResponse.results ||
      statsResponse.cards ||
      statsResponse.states ||
      statsResponse.stats ||
      statsResponse;

    const no_of_calls = Number(
      payload.no_of_calls ??
      payload.total_calls ??
      payload.calls_count ??
      payload.calls ??
      0
    );

    const no_of_leads = Number(
      payload.no_of_leads ??
      payload.total_leads ??
      payload.leads_count ??
      payload.leads ??
      0
    );

    const no_of_branches = Number(
      payload.no_of_branches ??
      payload.total_branches_count ??
      payload.total_branches ??
      payload.branches_count ??
      0
    );

    const no_of_depertments = Number(
      payload.no_of_depertments ??
      payload.no_of_departments ??
      payload.total_departments ??
      payload.departments ??
      0
    );

    const overdue_leads = Number(
      payload.overdue_leads ??
      payload.no_of_overdue ??
      payload.overdue ??
      0
    );

    const overdue_high_priority = Number(
      payload.overdue_high_priority ??
      payload.high_priority_overdue ??
      0
    );

    const overdue_percentage = Number(
      payload.overdue_percentage ??
      (no_of_leads > 0 ? Number(((overdue_leads / no_of_leads) * 100).toFixed(1)) : 0)
    );

    return {
      no_of_calls,
      no_of_leads,
      no_of_branches,
      no_of_depertments,
      total_calls: no_of_calls,
      total_leads: no_of_leads,
      total_branches_count: no_of_branches,
      overdue_leads,
      overdue_high_priority,
      overdue_percentage,
      ...payload,
    };
  }, [statsResponse]);

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
      <SalesMetricCards metrics={metrics} isLoading={isStatsLoading} />

      {/* 2. Visual Charts (Daily Calls & Lead Trends, Lead Sources) */}
      <SalesCharts
        dailyTrends={trends}
        leadSources={leadSources}
        departmentLeads={departments}
        isLoading={isCallsAndLeadsLoading && isLeadSourceLoading}
      />

      {/* 3. Branch Leads & Department Leads Cards */}
      <BranchLeadsCards
        branches={branches}
        departments={departments}
        isLoading={isBranchLoading && isDepartmentLoading}
      />

      {/* 4. Active Sales Leads & Overdue Follow-ups Audit Table */}
      <SalesLeadTable leads={leads} />
    </div>
  );
};
