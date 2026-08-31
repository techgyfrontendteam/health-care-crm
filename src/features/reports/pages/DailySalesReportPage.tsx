import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, SlidersHorizontal, Download } from "lucide-react";
import { toast } from "sonner";
import { useGetAllMasterDataQuery } from "../../master/api/masterApi";
import { useGetAllUsersByRoleIdQuery } from "../../users/api/usersApi";
import { ReportFilterDialog } from "../components/ReportFilterDialog";
import { cn, getProjectStatusOptions } from "../../../utils";
import { useMasterDataLookup } from "../../../shared/hooks/useMasterDataLookup";
import { ReportKpiCard } from "../components/ReportKpiCard";
import type { ExecutiveRow } from "../types";
import { getInitialDailySalesData } from "../constants/dailySalesData";
import {
  useGetDailySalesReportCardDataQuery,
  useGetDailySalesReportDataQuery,
  useDownloadDailySalesReportDataMutation,
} from "../api/reportsApi";

const formatDateForApi = (date: Date | null): string => {
  if (!date) return "";
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const formatSelectedSpan = (start: Date | null, end: Date | null) => {
  if (!start) return "Select Date";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const startMonth = months[start.getMonth()];
  const startDay = start.getDate();
  const startYear = start.getFullYear();
  if (!end) return `${startMonth} ${startDay}, ${startYear}`;

  const endMonth = months[end.getMonth()];
  const endDay = end.getDate();
  const endYear = end.getFullYear();
  return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${endYear}`;
};

export const DailySalesReportPage = () => {
  const navigate = useNavigate();
  const { projectLeadStatuses } = useMasterDataLookup();

  // Master Data & Users
  const { data: masterData } = useGetAllMasterDataQuery();
  const { data: rms = [] } = useGetAllUsersByRoleIdQuery({
    role_id: 3,
    offset: 0,
  });

  // Date states
  const [startDate, setStartDate] = useState<Date | null>(() => {
    const saved = localStorage.getItem("dailySalesReportFilters");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.startDate) return new Date(parsed.startDate);
      } catch (e) { }
    }
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d;
  });

  const [endDate, setEndDate] = useState<Date | null>(() => {
    const saved = localStorage.getItem("dailySalesReportFilters");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.endDate) return new Date(parsed.endDate);
      } catch (e) { }
    }
    return new Date();
  });

  // Filter States
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<{
    statusIds: string[];
    projectIds: string[];
    rmIds: string[];
    emIds: string[];
  }>(() => {
    const saved = localStorage.getItem("dailySalesReportFilters");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          statusIds: parsed.statusIds || [],
          projectIds: parsed.projectIds || [],
          rmIds: parsed.rmIds || [],
          emIds: parsed.emIds || [],
        };
      } catch (e) { }
    }
    return {
      statusIds: [],
      projectIds: [],
      rmIds: [],
      emIds: [],
    };
  });

  // Resolve dynamic IDs from master data or use fallbacks
  const resolvedProjectId = useMemo(() => {
    if (masterData?.projects && masterData.projects.length > 0) {
      return masterData.projects[0].id;
    }
    return 1;
  }, [masterData]);

  const selectedProjectId = appliedFilters.projectIds.length > 0
    ? Number(appliedFilters.projectIds[0])
    : resolvedProjectId;

  // Map master data for options, filtered by selected project
  const statusOptions = useMemo(() => {
    if (projectLeadStatuses && projectLeadStatuses.length > 0) {
      const opts = getProjectStatusOptions(selectedProjectId, projectLeadStatuses);
      if (opts && opts.length > 0) {
        return opts.map((opt: any) => ({
          value: String(opt.value),
          label: opt.label,
        }));
      }
    }
    return (
      masterData?.lead_statuses?.map((s: any) => ({
        value: String(s.id),
        label: s.description,
      })) || []
    );
  }, [masterData, selectedProjectId, projectLeadStatuses]);

  const projectOptions = useMemo(() => {
    return (
      masterData?.projects?.map((p: any) => ({
        value: String(p.id),
        label: p.description,
      })) || []
    );
  }, [masterData]);

  const resolvedRms = useMemo(() => {
    return rms.map((r: any) => r.id);
  }, [rms]);

  // Mock data of sales executives mapped to projects, RMs, and EMs
  const initialData: ExecutiveRow[] = useMemo(() => {
    return getInitialDailySalesData(resolvedProjectId, resolvedRms);
  }, [resolvedProjectId, resolvedRms]);

  const formattedStartDate = startDate ? formatDateForApi(startDate) : undefined;
  const formattedEndDate = endDate ? formatDateForApi(endDate) : undefined;

  // 1. Fetch card data
  const { data: cardResponse, refetch: refetchCard } = useGetDailySalesReportCardDataQuery({
    project_id: selectedProjectId,
    start_date: formattedStartDate,
    end_date: formattedEndDate,
  }, {
    refetchOnMountOrArgChange: true,
  });

  // 2. Fetch table data
  const { data: tableResponse, isFetching: isTableFetching, refetch: refetchTable } = useGetDailySalesReportDataQuery({
    project_id: selectedProjectId,
    start_date: formattedStartDate,
    end_date: formattedEndDate,
    offset: 0,
  }, {
    refetchOnMountOrArgChange: true,
  });

  // 3. Download mutation
  const [downloadReport] = useDownloadDailySalesReportDataMutation();

  // console.log("DEBUG - cardResponse:", cardResponse);
  // console.log("DEBUG - tableResponse:", tableResponse);

  const resolvedCardData = useMemo(() => {
    if (!cardResponse) return null;
    const raw = cardResponse as any;
    if (raw.data && typeof raw.data === "object" && !Array.isArray(raw.data)) {
      return raw.data;
    }
    return raw;
  }, [cardResponse]);

  const rawList = useMemo(() => {
    if (!tableResponse) return null;
    const raw = tableResponse as any;
    if (Array.isArray(raw)) {
      return raw;
    }
    if (raw && Array.isArray(raw.data)) {
      return raw.data;
    }
    if (raw && raw.data && Array.isArray(raw.data.data)) {
      return raw.data.data;
    }
    return null;
  }, [tableResponse]);

  const currentProjectStatuses = useMemo(() => {
    if (!projectLeadStatuses || projectLeadStatuses.length === 0) return [];
    return getProjectStatusOptions(selectedProjectId, projectLeadStatuses);
  }, [selectedProjectId, projectLeadStatuses]);

  const tableColumns = useMemo(() => {
    if (rawList !== null && currentProjectStatuses.length > 0) {
      return currentProjectStatuses.map((status: any) => ({
        id: status.lead_status_id,
        label: status.label,
        key: `status_${status.lead_status_id}`,
      }));
    }
    return [
      { id: "newLeads", label: "New Leads", key: "newLeads" },
      { id: "calls", label: "Calls", key: "calls" },
      { id: "followups", label: "Follow-ups", key: "followups" },
      { id: "missed", label: "Missed", key: "missed" },
      { id: "siteVisits", label: "Site Visits", key: "siteVisits" },
      { id: "advance", label: "Advance", key: "advance" },
      { id: "booking", label: "Booking", key: "booking" },
      { id: "payment", label: "Payment", key: "payment" },
      { id: "reg", label: "Reg.", key: "reg" },
      { id: "junk", label: "Junk", key: "junk" },
    ];
  }, [rawList, currentProjectStatuses]);

  const visibleColumns = useMemo(() => {
    if (!appliedFilters.statusIds || appliedFilters.statusIds.length === 0) {
      return tableColumns;
    }
    return tableColumns.filter((col: any) => {
      if (typeof col.id === "number") {
        return appliedFilters.statusIds.includes(String(col.id));
      }
      return appliedFilters.statusIds.some((statusId) => {
        const option = statusOptions.find((opt: any) => opt.value === statusId);
        if (!option) return false;

        const colKeyLower = col.key.toLowerCase();
        const optLabelLower = option.label.toLowerCase();

        return (
          colKeyLower.includes(optLabelLower) ||
          optLabelLower.includes(colKeyLower) ||
          (colKeyLower === "newleads" && optLabelLower.includes("new")) ||
          (colKeyLower === "followups" && optLabelLower.includes("follow")) ||
          (colKeyLower === "sitevisits" && optLabelLower.includes("visit")) ||
          (colKeyLower === "missed" && optLabelLower.includes("no resp")) ||
          (colKeyLower === "missed" && optLabelLower.includes("missed"))
        );
      });
    });
  }, [tableColumns, appliedFilters.statusIds, statusOptions]);

  const apiExecutiveRows = useMemo(() => {
    if (!rawList) return [];

    return rawList.map((item: any, index: number) => {
      const row: ExecutiveRow = {
        id: index + 1,
        name: item.ex_name || "Unknown",
        projectId: (() => {
          const proj = masterData?.projects?.find((p: any) =>
            p.description.trim().toLowerCase() === item.project_name?.trim().toLowerCase()
          );
          return proj ? proj.id : selectedProjectId;
        })(),
        projectName: item.project_name || "",
        rmId: 1,
        emId: 1,
        newLeads: 0,
        calls: 0,
        followups: 0,
        missed: 0,
        siteVisits: 0,
        advance: null,
        booking: null,
        payment: null,
        reg: null,
        junk: 0,
      };

      // Populate dynamic status counts
      currentProjectStatuses.forEach((statusOption: any) => {
        const key = `status_${statusOption.lead_status_id}`;
        let count = 0;
        if (item.status_data) {
          const match = item.status_data.find((statusObj: any) => {
            const matchId = Number(statusObj.id) === Number(statusOption.lead_status_id);
            const matchName = (statusObj.name || "").trim().toLowerCase() === (statusOption.label || "").trim().toLowerCase();
            return matchId || matchName;
          });
          count = match ? Number(match.count || 0) : 0;
        }
        row[key] = count;
      });

      if (item.status_data) {
        item.status_data.forEach((statusObj: any) => {
          const name = (statusObj.name || "").toLowerCase();
          const count = Number(statusObj.count || 0);

          if (name.includes("new")) {
            row.newLeads += count;
          } else if (name.includes("call") || name.includes("contact")) {
            row.calls += count;
          } else if (name.includes("follow")) {
            row.followups += count;
          } else if (name.includes("missed") || name.includes("no response")) {
            row.missed += count;
          } else if (name.includes("visit")) {
            row.siteVisits += count;
          } else if (name.includes("advance") || name.includes("negotiat")) {
            row.advance = (row.advance || 0) + count;
          } else if (name.includes("book")) {
            row.booking = (row.booking || 0) + count;
          } else if (name.includes("payment") || name.includes("won")) {
            row.payment = (row.payment || 0) + count;
          } else if (name.includes("reg") || name.includes("win")) {
            row.reg = (row.reg || 0) + count;
          } else if (name.includes("junk") || name.includes("lost") || name.includes("spam")) {
            row.junk += count;
          }
        });
      }

      return row;
    });
  }, [rawList, selectedProjectId, masterData, currentProjectStatuses]);

  // Use API data if available, otherwise fallback to initialData (scaled by dates)
  const baseData = useMemo(() => {
    if (rawList !== null) {
      return apiExecutiveRows;
    }
    return initialData;
  }, [rawList, apiExecutiveRows, initialData]);

  // Filtered rows based on selected filter dialog filters
  const filteredData = useMemo(() => {
    const isMock = rawList === null;
    let processed = baseData;

    if (isMock) {
      const daysCount = (startDate && endDate)
        ? Math.max(1, Math.ceil(Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1)
        : 7;
      const scale = daysCount / 7;

      processed = processed.map((row: ExecutiveRow) => {
        const scaleVal = (val: number | null) => {
          if (val === null) return null;
          const scaled = Math.round(val * scale);
          return scaled === 0 && val > 0 ? 1 : scaled;
        };

        return {
          ...row,
          newLeads: scaleVal(row.newLeads) ?? 0,
          calls: scaleVal(row.calls) ?? 0,
          followups: scaleVal(row.followups) ?? 0,
          missed: scaleVal(row.missed) ?? 0,
          siteVisits: scaleVal(row.siteVisits) ?? 0,
          advance: scaleVal(row.advance),
          booking: scaleVal(row.booking),
          payment: scaleVal(row.payment),
          reg: scaleVal(row.reg),
          junk: scaleVal(row.junk) ?? 0,
        };
      });
    }

    return processed.filter((row: ExecutiveRow) => {
      // Filter by Project
      if (
        appliedFilters.projectIds.length > 0 &&
        !appliedFilters.projectIds.includes(String(row.projectId))
      ) {
        return false;
      }
      // Filter by RM
      if (
        appliedFilters.rmIds.length > 0 &&
        !appliedFilters.rmIds.includes(String(row.rmId))
      ) {
        return false;
      }
      // Filter by EM
      if (
        appliedFilters.emIds.length > 0 &&
        !appliedFilters.emIds.includes(String(row.emId))
      ) {
        return false;
      }
      // Filter by Lead Status
      if (appliedFilters.statusIds.length > 0) {
        if (!isMock && currentProjectStatuses.length > 0) {
          const matchesStatus = appliedFilters.statusIds.some((statusId) => {
            const key = `status_${statusId}`;
            return Number(row[key] || 0) > 0;
          });
          if (!matchesStatus) return false;
        } else {
          const matchesStatus = appliedFilters.statusIds.some((statusId) => {
            const status = statusOptions.find((opt: any) => opt.value === statusId);
            if (!status) return false;
            const label = status.label.toLowerCase();

            if (label.includes("new") && row.newLeads > 0) return true;
            if ((label.includes("call") || label.includes("contact")) && row.calls > 0) return true;
            if (label.includes("follow") && row.followups > 0) return true;
            if ((label.includes("missed") || label.includes("no response")) && row.missed > 0) return true;
            if (label.includes("visit") && row.siteVisits > 0) return true;
            if ((label.includes("advance") || label.includes("negotiat")) && row.advance && row.advance > 0) return true;
            if (label.includes("book") && row.booking && row.booking > 0) return true;
            if ((label.includes("payment") || label.includes("won")) && row.payment && row.payment > 0) return true;
            if ((label.includes("reg") || label.includes("win")) && row.reg && row.reg > 0) return true;
            if ((label.includes("junk") || label.includes("lost") || label.includes("spam")) && row.junk > 0) return true;

            return false;
          });
          if (!matchesStatus) {
            return false;
          }
        }
      }
      return true;
    });
  }, [baseData, appliedFilters, startDate, endDate, statusOptions, tableResponse, currentProjectStatuses]);

  // Table Totals calculation
  const totals = useMemo(() => {
    const initialTotals: Record<string, number> = {};
    tableColumns.forEach((col: any) => {
      initialTotals[col.key] = 0;
    });

    return filteredData.reduce(
      (acc: Record<string, number>, curr: any) => {
        tableColumns.forEach((col: any) => {
          acc[col.key] += curr[col.key] || 0;
        });
        return acc;
      },
      initialTotals
    );
  }, [filteredData, tableColumns]);

  const handleApplyFilters = (filters: {
    statusIds: string[];
    projectIds: string[];
    rmIds: string[];
    emIds: string[];
  }) => {
    setAppliedFilters(filters);
  };

  const handleResetFilters = () => {
    setAppliedFilters({
      statusIds: [],
      projectIds: [],
      rmIds: [],
      emIds: [],
    });
  };

  const handleDownload = async () => {
    try {
      toast.loading("Compiling daily sales report...", { id: "download-report" });
      const res = await downloadReport({
        project_id: selectedProjectId,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      }).unwrap();

      if (res.file_url) {
        const link = document.createElement("a");
        link.href = res.file_url;
        link.setAttribute("download", `daily_sales_report_${formattedStartDate}_to_${formattedEndDate}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Download completed", {
          id: "download-report",
          description: "The Daily Sales Report CSV was downloaded successfully.",
        });
      } else {
        toast.error("Download failed", {
          id: "download-report",
          description: res.message || "Failed to retrieve the download link.",
        });
      }
    } catch (err: any) {
      toast.error("Download failed", {
        id: "download-report",
        description: err?.data?.message || err?.message || "An unexpected error occurred.",
      });
    }
  };

  const formatNumber = (val: number | null, isMissed = false) => {
    if (val === null) return "—";
    if (val === 0) {
      return isMissed ? "00" : "—";
    }
    return val < 10 ? `0${val}` : String(val);
  };

  return (
    <div className="w-full mx-auto space-y-6 xl:space-y-8 2xl:space-y-10 px-4 sm:px-6 md:px-8 lg:px-10 py-6 animate-in fade-in duration-300">
      {/* Title & Back Arrow */}
      <div className="flex items-center gap-4 xl:gap-6">
        <button
          onClick={() => navigate("/reports")}
          className="p-2 -ml-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors duration-200"
          title="Back to Reports"
        >
          <ArrowLeft className="w-7 h-7 xl:w-8 xl:h-8 text-[#0f3d6b] dark:text-blue-400" />
        </button>
        <h1 className="text-[24px] font-bold text-[#00236F] dark:text-blue-400 tracking-tight">
          Daily Sales Report
        </h1>
      </div>

      {/* KPI Cards Row */}
      <div className="grid gap-6 md:grid-cols-3 xl:gap-8 2xl:gap-10">
        <ReportKpiCard
          title="Avg. User Engagement Time"
          value={
            (() => {
              if (!resolvedCardData) return "1.2 Days";
              const val = resolvedCardData.avg_user_engagement_time_in_mins !== undefined
                ? resolvedCardData.avg_user_engagement_time_in_mins
                : (resolvedCardData.avg_user_engagement_time || resolvedCardData.avgUserEngagementTime);
              if (val === null || val === undefined || String(val).trim() === "" || String(val) === "null") {
                return "0";
              }
              return `${val}`;
            })()
          }
        />
        <ReportKpiCard
          title="Avg. Days to Site Visit Completion"
          value={
            (() => {
              if (!resolvedCardData) return "6 Days";
              const val = resolvedCardData.avg_days_to_site_visit_completion_in_days !== undefined
                ? resolvedCardData.avg_days_to_site_visit_completion_in_days
                : (resolvedCardData.avg_site_visit_completion_days || resolvedCardData.avgDaysToSiteVisitCompletion);
              if (val === null || val === undefined || String(val).trim() === "" || String(val) === "null") {
                return "0";
              }
              return `${val}`;
            })()
          }
        />
        <ReportKpiCard
          title="Follow-up Efficiency"
          value={
            (() => {
              if (!resolvedCardData) return "94.2%";
              const val = resolvedCardData.follow_efficiency !== undefined
                ? resolvedCardData.follow_efficiency
                : (resolvedCardData.followup_efficiency || resolvedCardData.followupEfficiency);
              if (val === null || val === undefined || String(val).trim() === "" || String(val) === "null") {
                return "0";
              }
              return `${val}`;
            })()
          }
        />
      </div>

      {/* Main Table Card Container (Edge-to-edge layout) */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-3xl 2xl:rounded-[36px] shadow-sm overflow-hidden flex flex-col">
        {/* Table Header Controls (With padding) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800/50 p-6 xl:p-8 2xl:p-10 pb-6">
          <div>
            <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-[18px] leading-[24px] text-[#191C1E] dark:text-zinc-150 flex items-center h-[24px] tracking-tight">
              Booking Pipeline Progress
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs font-semibold text-slate-400 dark:text-zinc-500">
              {startDate && endDate && (
                <span>
                  Showing data for {formatSelectedSpan(startDate, endDate)}
                </span>
              )}
              {appliedFilters.statusIds.length > 0 && (
                <>
                  <span className="text-zinc-300 dark:text-zinc-700">|</span>
                  <span>
                    Status: {
                      appliedFilters.statusIds
                        .map(id => statusOptions.find((opt: any) => opt.value === id)?.label)
                        .filter(Boolean)
                        .join(", ")
                    }
                  </span>
                </>
              )}
              {appliedFilters.projectIds.length > 0 && (
                <>
                  <span className="text-zinc-300 dark:text-zinc-700">|</span>
                  <span>
                    Projects: {
                      appliedFilters.projectIds
                        .map(id => projectOptions.find(opt => opt.value === id)?.label)
                        .filter(Boolean)
                        .join(", ")
                    }
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter Button */}
            <button
              onClick={() => setIsFilterDialogOpen(true)}
              className="flex items-center justify-center gap-2 border border-[rgba(0,51,102,0.24)] bg-white dark:bg-zinc-900 px-[24px] py-[10px] h-[36px] rounded-[24px] font-['Inter'] font-semibold text-[14px] leading-[20px] text-[#003366] dark:text-blue-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-200 shadow-sm cursor-pointer relative"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filter
              {(appliedFilters.projectIds.length + appliedFilters.statusIds.length) > 0 && (
                <span className="flex items-center justify-center min-w-[18px] h-4.5 px-1 text-[9px] font-bold bg-[#003366] dark:bg-blue-500 text-white rounded-full">
                  {appliedFilters.projectIds.length + appliedFilters.statusIds.length}
                </span>
              )}
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 bg-[#0f3d6b] hover:bg-[#0c3156] text-white w-[185px] h-[36px] rounded-full text-sm font-semibold transition-colors duration-200 shadow-sm cursor-pointer"
            >
              <Download className="w-[14px] h-[14px]" />
              Download Report
            </button>
          </div>
        </div>

        {/* Responsive Table Wrapper (No outer margin/padding, edge-to-edge) */}
        <div className="overflow-x-auto max-h-[550px] overflow-y-auto relative">
          <table className="w-full border-collapse text-left min-w-[1100px]">
            <thead className="sticky top-0 bg-[#f8fafc] dark:bg-[#18181b] z-20 shadow-[0_2px_5px_rgba(0,0,0,0.02)]">
              <tr>
                <th className="py-4 xl:py-5 pl-6 xl:pl-8 2xl:pl-10 pr-3 text-[13px] leading-[18px] font-bold tracking-[0.13px] text-[#444651] dark:text-zinc-300 bg-[#f8fafc] dark:bg-[#18181b] whitespace-nowrap">
                  Executive
                </th>
                <th className="py-4 xl:py-5 px-3 text-[13px] leading-[18px] font-bold tracking-[0.13px] text-[#444651] dark:text-zinc-300 bg-[#f8fafc] dark:bg-[#18181b] whitespace-nowrap">
                  Project
                </th>
                {visibleColumns.map((col: any) => (
                  <th
                    key={col.key}
                    className="py-4 xl:py-5 px-3 text-[13px] leading-[18px] font-bold tracking-[0.13px] text-[#444651] dark:text-zinc-300 text-center bg-[#f8fafc] dark:bg-[#18181b] whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {isTableFetching ? (
                <tr>
                  <td colSpan={2 + visibleColumns.length} className="py-8 text-center text-sm text-slate-450 dark:text-zinc-500 italic">
                    Loading daily sales report data...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={2 + visibleColumns.length} className="py-8 text-center text-sm text-slate-400 dark:text-zinc-500 italic">
                    No records matches applied filters
                  </td>
                </tr>
              ) : (
                filteredData.map((row: ExecutiveRow) => (
                  <tr
                    key={row.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors duration-150"
                  >
                    <td className="py-5 xl:py-6 pl-6 xl:pl-8 2xl:pl-10 pr-3 font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] text-[#191C1E] dark:text-zinc-150 whitespace-nowrap">
                      {row.name}
                    </td>
                    <td className="py-5 xl:py-6 px-3 font-['Inter'] font-semibold text-[14px] leading-[20px] text-[#444651] dark:text-zinc-300">
                      {row.projectName}
                    </td>
                    {visibleColumns.map((col: any) => {
                      const val = row[col.key];
                      const colLabel = (col.label || "").toLowerCase();
                      const isNewLeads = col.key === "newLeads" || col.key.includes("new") || colLabel.includes("new");
                      const isMissed = col.key === "missed" || col.key.toLowerCase().includes("missed") || colLabel.includes("missed") || colLabel.includes("no response");
                      return (
                        <td
                          key={col.key}
                          className={cn(
                            "py-5 xl:py-6 px-3 text-center font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px]",
                            isNewLeads && !isMissed
                              ? "text-[#00236F] dark:text-blue-400"
                              : "text-[#191C1E] dark:text-zinc-150",
                            isMissed && val > 0 ? "text-red-500 font-bold" : ""
                          )}
                        >
                          {formatNumber(val, isMissed)}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}

              {/* TOTAL SUMMARY ROW (Shaded full-width block) */}
              {filteredData.length > 0 && (
                <tr className="sticky bottom-0 bg-[#f8fafc] dark:bg-[#18181b] font-bold shadow-[0_-4px_10px_rgba(0,0,0,0.08)] border-t border-zinc-200 dark:border-zinc-800 z-10">
                  <td className="py-5 xl:py-6 pl-6 xl:pl-8 2xl:pl-10 pr-3 font-['Plus_Jakarta_Sans'] font-extrabold text-[14px] leading-[20px] text-[#191C1E] dark:text-zinc-150 bg-[#f8fafc] dark:bg-[#18181b]">
                    TOTAL SUMMARY
                  </td>
                  <td className="py-5 xl:py-6 px-3 font-['Inter'] font-semibold text-[14px] leading-[20px] text-slate-400 dark:text-zinc-500 bg-[#f8fafc] dark:bg-[#18181b]">
                    —
                  </td>
                  {visibleColumns.map((col: any) => {
                    const totalVal = totals[col.key];
                    const colLabel = (col.label || "").toLowerCase();
                    const isNewLeads = col.key === "newLeads" || col.key.includes("new") || colLabel.includes("new");
                    const isMissed = col.key === "missed" || col.key.toLowerCase().includes("missed") || colLabel.includes("missed") || colLabel.includes("no response");
                    return (
                      <td
                        key={col.key}
                        className={cn(
                          "py-5 xl:py-6 px-3 text-center font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] bg-[#f8fafc] dark:bg-[#18181b]",
                          isNewLeads && !isMissed
                            ? "text-[#00236F] dark:text-blue-400"
                            : "text-[#191C1E] dark:text-zinc-150",
                          isMissed && totalVal > 0 ? "text-red-500" : ""
                        )}
                      >
                        {formatNumber(totalVal, isMissed)}
                      </td>
                    );
                  })}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Report Filter Dialog */}
      <ReportFilterDialog
        open={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
        tabs={["projects", "status", "date"]}
        onApply={(filters) => {
          const newFilters = {
            projectIds: filters.projectIds || [],
            statusIds: filters.statusIds || [],
            rmIds: [],
            emIds: [],
            startDate: filters.startDate ? filters.startDate.toISOString() : null,
            endDate: filters.endDate ? filters.endDate.toISOString() : null,
          };
          localStorage.setItem("dailySalesReportFilters", JSON.stringify(newFilters));

          setAppliedFilters(prev => ({
            ...prev,
            projectIds: filters.projectIds || [],
            statusIds: filters.statusIds || [],
          }));
          setStartDate(filters.startDate);
          setEndDate(filters.endDate);

          // Force refetch to ensure API calls are made and display in network tab
          setTimeout(() => {
            refetchCard();
            refetchTable();
          }, 0);
        }}
        onReset={() => {
          localStorage.removeItem("dailySalesReportFilters");
          setAppliedFilters({
            statusIds: [],
            projectIds: [],
            rmIds: [],
            emIds: [],
          });
          const today = new Date();
          const start = new Date();
          start.setDate(today.getDate() - 7);
          setStartDate(start);
          setEndDate(today);
        }}
        projectOptions={projectOptions}
        statusOptions={statusOptions}
        appliedProjectIds={appliedFilters.projectIds}
        appliedStatusIds={appliedFilters.statusIds}
        appliedStartDate={startDate}
        appliedEndDate={endDate}
      />
    </div>
  );
};
