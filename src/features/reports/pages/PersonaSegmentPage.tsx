import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  SlidersHorizontal,
  Download,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { toast } from "sonner";
import { useGetAllMasterDataQuery } from "../../master/api/masterApi";
import { useGetAllUsersByRoleIdQuery } from "../../users/api/usersApi";
import { ReportFilterDialog } from "../components/ReportFilterDialog";
import { cn } from "../../../utils";
import type { PersonaSegmentRow, VolumeMetric } from "../types";
import { ReportProgressBarCard } from "../components/ReportProgressBarCard";
import {
  occupationData,
  ageData,
  stateData,
  getInitialPersonaData
} from "../constants/personaData";
import {
  useGetPersonaSegmentCardsDataQuery,
  useGetPersonaSegmentAnalysisQuery,
  useDownloadPersonaSegmentAnalysisMutation,
} from "../api/reportsApi";

type SortField = "name" | "junkRate" | "conversionRate";
type SortOrder = "asc" | "desc";

const stateIconMap: Record<string, string> = {
  "Telangana": "/icons/state-telangana.png",
  "Andhra Pradesh": "/icons/state-andhra.png",
  "Karnataka": "/icons/state-karnataka.png",
  "Others": "/icons/state-others.png",
};

export const PersonaSegmentPage = () => {
  const navigate = useNavigate();

  // Master Data & Users for reused filters
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
  }>({
    statusIds: [],
    projectIds: [],
    rmIds: [],
    emIds: [],
  });

  // Sort States
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Options mapping
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

  const resolvedProjectId = useMemo(() => {
    const pgProject = masterData?.projects?.find((p: any) =>
      p.description.toLowerCase().includes("planet green")
    );
    return pgProject ? pgProject.id : 1;
  }, [masterData]);

  const resolvedRms = useMemo(() => {
    return rms.map((r: any) => r.id);
  }, [rms]);

  // Selected Project ID based on filters
  const selectedProjectId = useMemo(() => {
    return appliedFilters.projectIds.length > 0
      ? Number(appliedFilters.projectIds[0])
      : resolvedProjectId;
  }, [appliedFilters.projectIds, resolvedProjectId]);

  // Active filter count (excluding default selections)
  const activeFilterCount = useMemo(() => {
    return appliedFilters.projectIds.length + appliedFilters.statusIds.length;
  }, [appliedFilters]);

  // API Calls
  const { data: cardsResponse, refetch: refetchCards } = useGetPersonaSegmentCardsDataQuery({
    project_id: selectedProjectId,
  }, {
    refetchOnMountOrArgChange: true,
  });

  const { data: tableResponse, isFetching: isTableFetching, refetch: refetchTable } = useGetPersonaSegmentAnalysisQuery({
    project_id: selectedProjectId,
    offset: (currentPage - 1) * itemsPerPage,
  }, {
    refetchOnMountOrArgChange: true,
  });

  const [downloadReport] = useDownloadPersonaSegmentAnalysisMutation();

  // Resolved card stats response
  const resolvedCardData = useMemo(() => {
    if (!cardsResponse) return null;
    const raw = cardsResponse as any;
    if (raw.data && typeof raw.data === "object" && !Array.isArray(raw.data)) {
      return raw.data;
    }
    return raw;
  }, [cardsResponse]);

  const rawList = useMemo(() => {
    if (!tableResponse) return null;
    const raw = tableResponse as any;
    if (Array.isArray(raw)) {
      return raw;
    }
    if (raw && Array.isArray(raw.data)) {
      return raw.data;
    }
    return null;
  }, [tableResponse]);

  // Occupation metric mapping
  const apiOccupationData = useMemo((): VolumeMetric[] => {
    if (!cardsResponse) {
      return occupationData;
    }
    const dataList = resolvedCardData?.occupation_data || [];
    if (dataList.length === 0) return occupationData;
    return dataList.map((item: any) => ({
      label: item.occ_name || "Unknown",
      value: parseFloat(item.occ_percentage) || 0,
    }));
  }, [cardsResponse, resolvedCardData]);

  // Age group metric mapping
  const apiAgeData = useMemo((): VolumeMetric[] => {
    if (!cardsResponse) {
      return ageData;
    }
    const dataList = resolvedCardData?.age_data || [];
    if (dataList.length === 0) return ageData;
    return dataList.map((item: any) => ({
      label: item.age_group || item.age_name || "Unknown",
      value: parseFloat(item.percentage) || parseFloat(item.age_percentage) || 0,
    }));
  }, [cardsResponse, resolvedCardData]);

  // State region metric mapping
  const apiStateData = useMemo((): VolumeMetric[] => {
    if (!cardsResponse) {
      return stateData;
    }
    const dataList = resolvedCardData?.state_data || resolvedCardData?.region_data || [];
    if (dataList.length === 0) return stateData;
    return dataList.map((item: any) => {
      const stateName = item.state_name || masterData?.states?.find((s: any) => s.id === item.state_id)?.description || `State ${item.state_id}`;
      return {
        label: stateName,
        value: Number(item.count) || Number(item.state_percentage) || 0,
      };
    });
  }, [cardsResponse, resolvedCardData, masterData]);

  // Initial records
  const initialData = useMemo(() => {
    return getInitialPersonaData(resolvedProjectId, resolvedRms);
  }, [resolvedProjectId, resolvedRms]);

  // Map API response to PersonaSegmentRow structure
  const apiPersonaRows = useMemo((): PersonaSegmentRow[] => {
    if (!rawList) return [];

    return rawList.map((item: any, index: number) => {
      return {
        id: index + 1,
        name: item.segment_name || "Unknown Segment",
        projectId: selectedProjectId,
        projectName: projectOptions.find(opt => opt.value === String(selectedProjectId))?.label || "",
        rmId: resolvedRms[0] || 1,
        emId: 10,
        topObjections: Array.isArray(item.top_objections) ? item.top_objections : [],
        avgIncome: typeof item.avg_income === "number" ? `₹${(item.avg_income / 100000).toFixed(1)}L+` : "—",
        junkRate: parseFloat(item.junk_rate) || 0,
        conversionRate: parseFloat(item.conversion_rate) || 0,
      };
    });
  }, [rawList, selectedProjectId, projectOptions, resolvedRms]);

  // Base rows prioritizing API rows
  const baseData = useMemo((): PersonaSegmentRow[] => {
    if (rawList !== null) {
      return apiPersonaRows;
    }
    return initialData;
  }, [rawList, apiPersonaRows, initialData]);

  // Filters logic
  const filteredData = useMemo((): PersonaSegmentRow[] => {
    if (rawList !== null) {
      return baseData;
    }
    return baseData.filter((row) => {
      // Project filter
      if (appliedFilters.projectIds.length > 0) {
        if (!appliedFilters.projectIds.includes(String(row.projectId))) {
          return false;
        }
      }
      return true;
    });
  }, [baseData, rawList, appliedFilters]);

  // Sort logic
  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;

    const dataCopy = [...filteredData];
    dataCopy.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === "string" && typeof valB === "string") {
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      } else {
        // Numbers
        const numA = Number(valA);
        const numB = Number(valB);
        return sortOrder === "asc" ? numA - numB : numB - numA;
      }
    });

    return dataCopy;
  }, [filteredData, sortField, sortOrder]);

  // Pagination logic
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1); // Reset page on sort
  };

  const handleApplyFilters = (filters: {
    projectIds: string[];
    statusIds: string[];
    startDate: Date | null;
    endDate: Date | null;
    campaignIds: string[];
  }) => {
    const nextFilters = {
      ...appliedFilters,
      projectIds: filters.projectIds || [],
      statusIds: filters.statusIds || [],
    };
    setAppliedFilters(nextFilters);
    setCurrentPage(1);
    setIsFilterDialogOpen(false);

    // Force refetch to ensure API calls are made and display in network tab
    setTimeout(() => {
      refetchCards();
      refetchTable();
    }, 0);
  };

  const handleResetFilters = () => {
    const reset = {
      statusIds: [],
      projectIds: [],
      rmIds: [],
      emIds: [],
    };
    setAppliedFilters(reset);
    setCurrentPage(1);
    setIsFilterDialogOpen(false);
  };

  const handleDownload = async () => {
    try {
      toast.loading("Compiling persona segment analysis report...", { id: "download-report" });
      const res = await downloadReport({
        project_id: selectedProjectId,
      }).unwrap();

      if (res.file_url) {
        const link = document.createElement("a");
        link.href = res.file_url;
        link.setAttribute("download", `persona_segment_report_${selectedProjectId}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Download completed", {
          id: "download-report",
          description: "The Persona Segment Report CSV was downloaded successfully.",
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

  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-slate-350 dark:text-zinc-600 transition-colors" />;
    }
    return sortOrder === "asc"
      ? <ArrowUp className="w-4 h-4 text-[#0f3d6b] dark:text-blue-400" />
      : <ArrowDown className="w-4 h-4 text-[#0f3d6b] dark:text-blue-400" />;
  };

  return (
    <div className="w-full mx-auto space-y-6 xl:space-y-8 2xl:space-y-10 px-4 sm:px-6 md:px-8 lg:px-10 py-6 animate-in fade-in duration-300">

      {/* Title & Actions Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Back navigation & Title */}
        <div className="flex items-center gap-4 xl:gap-6">
          <button
            onClick={() => navigate("/reports")}
            className="p-2 -ml-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors duration-200"
            title="Back to Reports"
          >
            <ArrowLeft className="w-7 h-7 xl:w-8 xl:h-8 text-[#0f3d6b] dark:text-blue-400" />
          </button>
          <h1 className="text-[24px] font-bold text-[#00236F] dark:text-blue-400 tracking-tight">
            Persona Segment Report
          </h1>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
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

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-[#0f3d6b] hover:bg-[#0c3156] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download Report
          </button>
        </div>
      </div>

      {/* Visual Breakdowns Top Cards Row */}
      <div className="grid gap-6 md:grid-cols-3 xl:gap-8 2xl:gap-10">

        {/* Card 1: Volume by Occupation */}
        <ReportProgressBarCard title="Volume by Occupation" data={apiOccupationData} />

        {/* Card 2: Volume by Age */}
        <ReportProgressBarCard title="Volume by Age" data={apiAgeData} />

        {/* Card 3: Volume by States */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-3xl p-6 xl:p-8 2xl:p-10 shadow-sm flex flex-col gap-6">
          <h2 className="text-sm xl:text-base font-bold tracking-tight text-slate-700 dark:text-zinc-400">
            Volume by States
          </h2>
          <div className="space-y-4 xl:space-y-5 flex-1 flex flex-col">
            {apiStateData.map((item, idx) => {
              const iconSrc = stateIconMap[item.label] || "/icons/state-others.png";
              return (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-zinc-850 flex items-center justify-center text-slate-500 dark:text-zinc-400 shadow-sm border border-zinc-100/30 dark:border-zinc-800/30 overflow-hidden">
                      <img src={iconSrc} alt={item.label} className="w-5 h-5 object-contain" />
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-zinc-300">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-sm xl:text-base font-extrabold text-slate-800 dark:text-zinc-200">
                    {item.value.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Bottom Card: Buyer Segment Analysis Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-3xl shadow-sm overflow-hidden flex flex-col">

        {/* Table Header block */}
        <div className="border-b border-zinc-100 dark:border-zinc-800/50 p-6 xl:p-8 2xl:p-10 pb-6">
          <h2 className="text-lg xl:text-xl 2xl:text-2xl font-bold text-slate-800 dark:text-zinc-100 tracking-tight">
            Buyer Segment Analysis
          </h2>
        </div>

        {/* Edge-to-edge Table wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left min-w-[900px]">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800/50">

                {/* Persona Segment Header (Sortable) */}
                <th
                  onClick={() => handleSort("name")}
                  className="py-4 xl:py-5 pl-6 xl:pl-8 2xl:pl-10 pr-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-[#0f3d6b] dark:hover:text-blue-400 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    Persona Segment
                    {renderSortIndicator("name")}
                  </div>
                </th>

                <th className="py-4 xl:py-5 px-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider text-center">
                  Top Objections
                </th>

                <th className="py-4 xl:py-5 px-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider text-center">
                  Avg Income
                </th>

                {/* Junk Rate Header (Sortable) */}
                <th
                  onClick={() => handleSort("junkRate")}
                  className="py-4 xl:py-5 px-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-[#0f3d6b] dark:hover:text-blue-400 transition-colors text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    Junk Rate
                    {renderSortIndicator("junkRate")}
                  </div>
                </th>

                {/* Conv. Rate Header (Sortable) */}
                <th
                  onClick={() => handleSort("conversionRate")}
                  className="py-4 xl:py-5 pl-3 pr-6 xl:pr-8 2xl:pr-10 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-[#0f3d6b] dark:hover:text-blue-400 transition-colors text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    Conv. Rate
                    {renderSortIndicator("conversionRate")}
                  </div>
                </th>

              </tr>
            </thead>

            {/* Table Body (Clean style - no row divider borders) */}
            <tbody className="divide-none">
              {isTableFetching ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-slate-450 dark:text-zinc-500 italic">
                    Loading buyer segment analysis report...
                  </td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-slate-450 dark:text-zinc-500 italic">
                    No persona segments matches current selection
                  </td>
                </tr>
              ) : (
                paginatedData.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-zinc-55/40 dark:hover:bg-zinc-800/10 transition-colors duration-150"
                  >
                    {/* Persona Segment (Bold blue text link-style) */}
                    <td className="py-5 xl:py-6 pl-6 xl:pl-8 2xl:pl-10 pr-3 text-sm xl:text-base font-bold text-[#0f3d6b] dark:text-blue-400">
                      {row.name}
                    </td>

                    {/* Top Objections Badges */}
                    <td className="py-5 xl:py-6 px-3 text-center">
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        {row.topObjections.map((objection, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400 text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm border border-zinc-200/20 dark:border-zinc-700/20"
                          >
                            {objection}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Avg Income */}
                    <td className="py-5 xl:py-6 px-3 text-sm xl:text-base font-semibold text-slate-700 dark:text-zinc-300 text-center">
                      {row.avgIncome}
                    </td>

                    {/* Junk Rate */}
                    <td className="py-5 xl:py-6 px-3 text-sm xl:text-base font-semibold text-slate-700 dark:text-zinc-300 text-center">
                      {row.junkRate}%
                    </td>

                    {/* Conv Rate (Bold Blue) */}
                    <td className="py-5 xl:py-6 pl-3 pr-6 xl:pr-8 2xl:pr-10 text-sm xl:text-base font-extrabold text-[#0f3d6b] dark:text-blue-400 text-center">
                      {row.conversionRate}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Controls (Pagination & Showing stats) */}
        {totalItems > 0 && (
          <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/50 p-6 xl:p-8 2xl:p-10">
            {/* Show stats */}
            <span className="text-sm font-semibold text-slate-400 dark:text-zinc-500">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} persona segments
            </span>

            {/* Prev/Next buttons */}
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={cn(
                  "p-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 transition-colors shadow-sm",
                  currentPage === 1
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer"
                )}
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={cn(
                  "p-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 transition-colors shadow-sm",
                  currentPage === totalPages
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer"
                )}
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

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
