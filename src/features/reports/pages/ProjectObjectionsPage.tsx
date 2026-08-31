import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, SlidersHorizontal, Download } from "lucide-react";
import { toast } from "sonner";
import { useGetAllMasterDataQuery } from "../../master/api/masterApi";
import { useGetAllUsersByRoleIdQuery } from "../../users/api/usersApi";
import { ReportFilterDialog } from "../components/ReportFilterDialog";
import { ReportKpiCard } from "../components/ReportKpiCard";
import { cn } from "../../../utils";
import type { ObjectionRow } from "../types";
import { getInitialObjectionData } from "../constants/objectionData";
import {
  useGetProjectWiseObjectionReportByCardsDataQuery,
  useGetProjectWiseObjectionDataQuery,
  useDownloadProjectWiseObjectionDataMutation,
} from "../api/reportsApi";

export const ProjectObjectionsPage = () => {
  const navigate = useNavigate();

  // Master Data & Users
  const { data: masterData } = useGetAllMasterDataQuery();
  const { data: rms = [] } = useGetAllUsersByRoleIdQuery({
    role_id: 3,
    offset: 0,
  });

  // Filter States
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<{
    statusIds: string[];
    projectIds: string[];
    rmIds: string[];
    emIds: string[];
  }>(() => {
    const saved = localStorage.getItem("projectObjectionReportFilters");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          statusIds: parsed.statusIds || [],
          projectIds: parsed.projectIds || [],
          rmIds: parsed.rmIds || [],
          emIds: parsed.emIds || [],
        };
      } catch (e) {}
    }
    return {
      statusIds: [],
      projectIds: [],
      rmIds: [],
      emIds: [],
    };
  });

  // Map master data for options
  const statusOptions = useMemo(() => {
    return (
      masterData?.lead_statuses?.map((s: any) => ({
        value: String(s.id),
        label: s.description,
      })) || []
    );
  }, [masterData]);

  const projectOptions = useMemo(() => {
    return (
      masterData?.projects?.map((p: any) => ({
        value: String(p.id),
        label: p.description,
      })) || []
    );
  }, [masterData]);

  // Resolve dynamic Dates County project ID from master data
  const resolvedProjectId = useMemo(() => {
    const defaultProject = masterData?.projects?.find((p: any) =>
      p.description.toLowerCase().includes("dates county")
    );
    return defaultProject ? defaultProject.id : 1;
  }, [masterData]);

  const resolvedRms = useMemo(() => {
    return rms.map((r: any) => r.id);
  }, [rms]);

  const selectedProjectId = appliedFilters.projectIds.length > 0
    ? Number(appliedFilters.projectIds[0])
    : resolvedProjectId;

  // Dynamically resolve card header project title
  const selectedProjectTitle = useMemo(() => {
    if (appliedFilters.projectIds.length === 1) {
      const match = projectOptions.find((p) => p.value === appliedFilters.projectIds[0]);
      if (match) return match.label;
    }
    return "Dates County";
  }, [appliedFilters.projectIds, projectOptions]);

  // 1. Fetch card data
  const { data: cardResponse, refetch: refetchCards } = useGetProjectWiseObjectionReportByCardsDataQuery({
    project_id: selectedProjectId,
  }, {
    refetchOnMountOrArgChange: true,
  });

  // 2. Fetch table data
  const { data: tableResponse, isFetching: isTableFetching, refetch: refetchTable } = useGetProjectWiseObjectionDataQuery({
    project_id: selectedProjectId,
    offset: 0,
  }, {
    refetchOnMountOrArgChange: true,
  });

  // 3. Download mutation
  const [downloadReport] = useDownloadProjectWiseObjectionDataMutation();

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

  // Initialize fallback mock data based on project/RM API info
  const initialData = useMemo(() => {
    return getInitialObjectionData(resolvedProjectId, resolvedRms);
  }, [resolvedProjectId, resolvedRms]);

  // Map API response to ObjectionRow structure
  const apiObjectionRows = useMemo((): ObjectionRow[] => {
    if (!rawList) return [];

    return rawList.map((item: any, index: number) => {
      return {
        id: index + 1,
        name: item.ex_name || "Unknown",
        projectId: selectedProjectId,
        projectName: selectedProjectTitle,
        rmId: 1,
        emId: 1,
        objectionsCount: Number(item.objections || 0),
        uniqueTypesCount: Number(item.unique_types_count || 0),
        primaryConcern: item.primary_concern || "—",
        conversionRate: parseFloat(item.conv_rate || "0"),
        objectionTypes: item.unique_types_details || [],
      };
    });
  }, [rawList, selectedProjectId, selectedProjectTitle]);

  const baseData = useMemo((): ObjectionRow[] => {
    if (rawList !== null) {
      return apiObjectionRows;
    }
    return initialData;
  }, [rawList, apiObjectionRows, initialData]);

  // Apply filters locally (Project & RM & EM)
  const filteredData = useMemo((): ObjectionRow[] => {
    return baseData.filter((row: ObjectionRow) => {
      // Project filter
      if (appliedFilters.projectIds.length > 0) {
        if (!appliedFilters.projectIds.includes(String(row.projectId))) {
          return false;
        }
      }
      // RM filter
      if (appliedFilters.rmIds.length > 0) {
        if (!appliedFilters.rmIds.includes(String(row.rmId))) {
          return false;
        }
      }
      // EM filter
      if (appliedFilters.emIds.length > 0) {
        if (!appliedFilters.emIds.includes(String(row.emId))) {
          return false;
        }
      }
      return true;
    });
  }, [baseData, appliedFilters]);



  const handleApplyFilters = (filters: {
    projectIds: string[];
    statusIds: string[];
    startDate: Date | null;
    endDate: Date | null;
    campaignIds: string[];
    adSetIds?: string[];
    creativeIds?: string[];
  }) => {
    const newFilters = {
      projectIds: filters.projectIds || [],
      statusIds: filters.statusIds || [],
      rmIds: [],
      emIds: [],
    };
    localStorage.setItem("projectObjectionReportFilters", JSON.stringify(newFilters));
    setAppliedFilters(newFilters);
    setIsFilterDialogOpen(false);

    // Force refetch to ensure API calls are made and display in network tab
    setTimeout(() => {
      refetchCards();
      refetchTable();
    }, 0);
  };

  const handleResetFilters = () => {
    localStorage.removeItem("projectObjectionReportFilters");
    setAppliedFilters({
      statusIds: [],
      projectIds: [],
      rmIds: [],
      emIds: [],
    });
    setIsFilterDialogOpen(false);
  };

  const handleDownload = async () => {
    try {
      toast.loading("Compiling project wise objection report...", { id: "download-report" });
      const res = await downloadReport({
        project_id: selectedProjectId,
      }).unwrap();
      
      if (res.file_url) {
        const link = document.createElement("a");
        link.href = res.file_url;
        link.setAttribute("download", `project_objection_report_${selectedProjectId}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Download completed", {
          id: "download-report",
          description: "The Project Wise Objection Report CSV was downloaded successfully.",
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
          Project Wise Objection Report
        </h1>
      </div>

      {/* KPI Cards Row (Reusing shared card style) */}
      <div className="grid gap-6 md:grid-cols-3 xl:gap-8 2xl:gap-10">
        <ReportKpiCard
          title="Total Objections"
          value={
            resolvedCardData?.total_objections !== undefined
              ? `${resolvedCardData.total_objections}`
              : "—"
          }
        />
        <ReportKpiCard
          title="Conversion Rate"
          value={
            resolvedCardData?.conversion_rate !== undefined
              ? `${resolvedCardData.conversion_rate}`
              : "—"
          }
        />
        <ReportKpiCard
          title="Primary Objection"
          value={
            resolvedCardData?.primary_objection !== undefined
              ? `${resolvedCardData.primary_objection}`
              : "—"
          }
        />
      </div>

      {/* Main Table Card Container (Edge-to-edge layout) */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-3xl 2xl:rounded-[36px] shadow-sm overflow-hidden flex flex-col">
        
        {/* Table Header Controls (With padding) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800/50 p-6 xl:p-8 2xl:p-10 pb-6">
          <h2 className="text-lg xl:text-xl 2xl:text-2xl font-bold text-slate-800 dark:text-zinc-100 tracking-tight">
            {selectedProjectTitle}
          </h2>
          
          <div className="flex items-center gap-3">
            {/* Filter Button */}
            <button
              onClick={() => setIsFilterDialogOpen(true)}
              className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-55 dark:hover:bg-zinc-800 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-zinc-300 transition-colors duration-200 shadow-sm relative cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
              {appliedFilters.projectIds.length > 0 && (
                <span className="flex items-center justify-center min-w-[18px] h-4.5 px-1 text-[9px] font-bold bg-[#0f3d6b] dark:bg-blue-500 text-white rounded-full">
                  {appliedFilters.projectIds.length}
                </span>
              )}
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-[#0f3d6b] hover:bg-[#0c3156] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Report
            </button>
          </div>
        </div>

        {/* Responsive Table Wrapper (No outer margin/padding, edge-to-edge) */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left min-w-[900px]">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                <th className="py-4 xl:py-5 pl-6 xl:pl-8 2xl:pl-10 pr-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                  Sales Executive
                </th>
                <th className="py-4 xl:py-5 px-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider text-center">
                  Objections
                </th>
                <th className="py-4 xl:py-5 px-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider text-center">
                  Unique Types
                </th>
                <th className="py-4 xl:py-5 px-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider text-center">
                  Primary Concern
                </th>
                <th className="py-4 xl:py-5 pl-3 pr-6 xl:pr-8 2xl:pr-10 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider text-center">
                  Conv. Rate
                </th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
              {isTableFetching ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-slate-450 dark:text-zinc-500 italic">
                    Loading project wise objection report data...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-slate-400 dark:text-zinc-500 italic">
                    No records matches applied filters
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-zinc-55/40 dark:hover:bg-zinc-800/10 transition-colors duration-150"
                  >
                    {/* Sales Executive (Single line) */}
                    <td className="py-5 xl:py-6 pl-6 xl:pl-8 2xl:pl-10 pr-3 text-sm xl:text-base font-bold text-slate-800 dark:text-zinc-200">
                      {row.name}
                    </td>

                    {/* Objections count (Centered) */}
                    <td className="py-5 xl:py-6 px-3 text-sm xl:text-base font-semibold text-slate-700 dark:text-zinc-300 text-center">
                      {row.objectionsCount}
                    </td>

                    {/* Unique Types (Pill border badge + Sparkles icon with hover popover) */}
                    <td className="py-5 xl:py-6 px-3 text-center">
                      <div className="flex justify-center">
                        <div className="relative group/tooltip">
                          <span className="inline-flex items-center gap-1.5 border border-zinc-250 dark:border-zinc-700 rounded-full px-3 py-1 text-sm font-semibold text-slate-700 dark:text-zinc-300 shadow-sm cursor-pointer transition-colors duration-200 group-hover/tooltip:bg-[#0f3d6b] group-hover/tooltip:text-white group-hover/tooltip:border-transparent">
                            {row.uniqueTypesCount}
                            <img src="/icons/objection-sparkle.png" alt="sparkle" className="w-3.5 h-3.5 object-contain group-hover/tooltip:brightness-0 group-hover/tooltip:invert transition-all duration-200" />
                          </span>

                          {/* Hover Popover */}
                          <div className={cn(
                            "absolute z-50 left-1/2 -translate-x-1/2 w-72 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 rounded-2xl p-5 shadow-[0_10px_35px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.3)] pointer-events-none opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-200 text-left",
                            row.id <= 3 ? "top-full mt-3 bottom-auto origin-top" : "bottom-full mb-3 top-auto origin-bottom"
                          )}>
                            <span className="block text-xs font-extrabold tracking-wider text-[#0f3d6b] dark:text-blue-400 uppercase mb-3">
                              Unique Objection Types
                            </span>
                            <ul className="space-y-2 text-sm font-semibold text-slate-600 dark:text-zinc-350 list-disc pl-4">
                              {row.objectionTypes.map((type, idx) => (
                                <li key={idx} className="leading-snug">
                                  {type}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Primary Concern (Blue badge uppercase) */}
                    <td className="py-5 xl:py-6 px-3 text-center">
                      <div className="flex justify-center">
                        <span className="inline-flex items-center bg-blue-50 text-[#0f3d6b] dark:bg-blue-950/20 dark:text-blue-300 font-bold text-xs tracking-wider uppercase px-3 py-1.5 rounded-lg shadow-sm">
                          {row.primaryConcern}
                        </span>
                      </div>
                    </td>

                    {/* Conv. Rate */}
                    <td className="py-5 xl:py-6 pl-3 pr-6 xl:pr-8 2xl:pr-10 text-sm xl:text-base font-bold text-slate-800 dark:text-zinc-200 text-center">
                      {row.conversionRate}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Report Filter Dialog */}
      <ReportFilterDialog
        open={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
        tabs={["projects"]}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
        projectOptions={projectOptions}
        appliedProjectIds={appliedFilters.projectIds.length > 0 ? appliedFilters.projectIds : [String(resolvedProjectId)]}
      />
    </div>
  );
};

