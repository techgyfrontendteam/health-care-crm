import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  SlidersHorizontal, 
  Download, 
  Calendar,
  ChevronLeft, 
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  Check,
  LayoutGrid,
  ChevronDown
} from "lucide-react";
import { toast } from "sonner";
import { useGetAllMasterDataQuery } from "../../master/api/masterApi";
import { useGetAllUsersByRoleIdQuery } from "../../users/api/usersApi";
import { useGetLeadSourceReportsCardDataQuery, useGetSourceQualityBreakdownDataQuery, useDownloadSourceQualityBreakdownDataMutation } from "../api/reportsApi";
import { cn } from "../../../utils";
import type { LeadSourceQualityRow } from "../types";
import { ReportProgressBar } from "../components/ReportProgressBar";
import { getInitialLeadSourceData } from "../constants/leadSourceQualityData";

// Date utility functions
const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days = [];
  
  let firstDayIndex = date.getDay(); 
  firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Map Sunday to 6, Mon to 0
  
  const prevMonth = new Date(year, month, 0);
  const prevMonthDaysCount = prevMonth.getDate();
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthDaysCount - i),
      isCurrentMonth: false
    });
  }
  
  const currentMonthDaysCount = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= currentMonthDaysCount; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true
    });
  }
  
  const totalCells = days.length > 35 ? 42 : 35;
  const nextDaysCount = totalCells - days.length;
  for (let i = 1; i <= nextDaysCount; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false
    });
  }
  
  return days;
};

const isSameDay = (d1: Date | null, d2: Date | null) => {
  if (!d1 || !d2) return false;
  return d1.getDate() === d2.getDate() && 
         d1.getMonth() === d2.getMonth() && 
         d1.getFullYear() === d2.getFullYear();
};

const isWithinRange = (d: Date, start: Date | null, end: Date | null) => {
  if (!start || !end) return false;
  const time = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const startTime = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
  const endTime = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
  return time >= startTime && time <= endTime;
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

const formatApiDate = (d: Date | null) => {
  if (!d) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatShortDateSpan = (start: Date | null, end: Date | null) => {
  if (!start) return "Select Date";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const startMonth = months[start.getMonth()];
  const startDay = start.getDate();
  if (!end) return `${startMonth} ${startDay}`;
  
  const endMonth = months[end.getMonth()];
  const endDay = end.getDate();
  
  if (start.getMonth() !== end.getMonth() || start.getFullYear() !== end.getFullYear()) {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
  }
  
  return `${startMonth} ${startDay} - ${endDay}`;
};

const formatMonthYear = (date: Date) => {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

type SortField = "source" | "count" | "quantityDistribution" | "conversionRate" | "junkRate";
type SortOrder = "asc" | "desc";

export const LeadSourceQualityPage = () => {
  const navigate = useNavigate();

  // Master Data & Users for filters
  const { data: masterData } = useGetAllMasterDataQuery();
  const { data: rms = [] } = useGetAllUsersByRoleIdQuery({
    role_id: 3,
    offset: 0,
  });

  // Filter States
  const [appliedFilters, setAppliedFilters] = useState<{
    statusIds: string[];
    projectId: string;
    rmIds: string[];
    emIds: string[];
  }>({
    statusIds: [],
    projectId: "1", // Default to Planet Green (which is 1)
    rmIds: [],
    emIds: [],
  });

  // Modal & Temporary States
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [tempProjectId, setTempProjectId] = useState<string>("1");

  // Date states - Default to Last 7 Days
  const today = useMemo(() => new Date(), []);
  const last7Days = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() - 6);
    return d;
  }, [today]);

  const [startDate, setStartDate] = useState<Date>(last7Days);
  const [endDate, setEndDate] = useState<Date>(today);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(last7Days);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(today);
  const [activeMonth, setActiveMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
  const [quickSelect, setQuickSelect] = useState<string>("Last 7 Days");
  const [appliedQuickSelect, setAppliedQuickSelect] = useState<string>("Last 7 Days");

  const calendarDays = useMemo(() => {
    return getDaysInMonth(activeMonth.getFullYear(), activeMonth.getMonth());
  }, [activeMonth]);

  // Sort States
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const { data: cardData, isFetching: isCardDataFetching } = useGetLeadSourceReportsCardDataQuery({
    project_id: Number(appliedFilters.projectId)
  });

  const { data: tableResponse, isFetching: isTableDataFetching } = useGetSourceQualityBreakdownDataQuery({
    project_id: Number(appliedFilters.projectId),
    offset: (currentPage - 1) * itemsPerPage,
    start_date: formatApiDate(startDate),
    end_date: formatApiDate(endDate)
  });

  const tableData = tableResponse?.data || [];
  const totalItems = tableResponse?.total_count || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [downloadReport, { isLoading: isDownloading }] = useDownloadSourceQualityBreakdownDataMutation();

  const currentTotalLeads = useMemo(() => {
    return tableData.reduce((sum, row) => sum + (Number(row.count) || 0), 0);
  }, [tableData]);

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
    return masterData?.projects?.map((p: any) => ({
      value: String(p.id),
      label: p.description
    })) || [];
  }, [masterData]);

  const selectedProjectLabel = useMemo(() => {
    const proj = projectOptions.find(p => p.value === appliedFilters.projectId);
    return proj ? proj.label : "Project";
  }, [appliedFilters.projectId, projectOptions]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1); // Reset page on sort
  };

  const handleQuickSelect = (option: string) => {
    setQuickSelect(option);
    if (option === "Today") {
      setTempStartDate(today);
      setTempEndDate(today);
    } else if (option === "Last 7 Days") {
      setTempStartDate(last7Days);
      setTempEndDate(today);
    } else if (option === "This Month") {
      setTempStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
      setTempEndDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
    }
  };

  const handleDayClick = (date: Date) => {
    const isFuture = new Date(date.getFullYear(), date.getMonth(), date.getDate()) > new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (isFuture) return;

    setQuickSelect(""); 
    if (!tempStartDate || (tempStartDate && tempEndDate)) {
      setTempStartDate(date);
      setTempEndDate(null);
    } else {
      if (date < tempStartDate) {
        setTempStartDate(date);
      } else {
        setTempEndDate(date);
      }
    }
  };

  const prevMonth = () => {
    setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() + 1, 1));
  };

  const handleApplyDateRange = () => {
    if (tempStartDate && tempEndDate) {
      setStartDate(tempStartDate);
      setEndDate(tempEndDate);
    } else if (tempStartDate) {
      setStartDate(tempStartDate);
      setEndDate(tempStartDate);
    }
    setAppliedQuickSelect(quickSelect);
    setIsDateModalOpen(false);
    toast.success("Date range filter applied successfully!");
  };

  const handleClearDates = () => {
    setTempStartDate(last7Days);
    setTempEndDate(today);
    setQuickSelect("Last 7 Days");
  };

  const handleDownload = async () => {
    try {
      const response = await downloadReport({
        project_id: Number(appliedFilters.projectId),
        start_date: formatApiDate(startDate),
        end_date: formatApiDate(endDate)
      }).unwrap();
      
      if (response.file_url) {
        window.open(response.file_url, '_blank');
        toast.success("Lead source & quality report downloaded successfully!");
      }
    } catch (error) {
      toast.error("Failed to download report.");
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
            Lead Source & Quality Report
          </h1>
        </div>

        {/* Action button */}
        <div className="flex items-center">
          <button
            onClick={() => {
              setTempProjectId(appliedFilters.projectId);
              setIsProjectModalOpen(true);
            }}
            className="flex items-center gap-2 border border-zinc-250 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 px-4 py-2.5 rounded-full text-sm font-semibold text-slate-700 dark:text-zinc-300 transition-colors duration-200 shadow-sm"
          >
            {selectedProjectLabel}
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8 2xl:gap-10">
        
        {/* Card 1: TOP SOURCE (with custom progress bar) */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-3xl p-6 xl:p-8 shadow-sm flex flex-col justify-between min-h-[140px] xl:min-h-[160px]">
          <div>
            <span className="text-xs xl:text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              TOP SOURCE
            </span>
            <h3 className="text-xl xl:text-2xl font-black text-slate-800 dark:text-zinc-100 mt-2 tracking-tight">
              {cardData?.top_source?.name || "-"}
            </h3>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <ReportProgressBar value={parseFloat(cardData?.top_source?.percentage || "0")} className="flex-1" />
            <span className="text-xs xl:text-sm font-extrabold text-slate-600 dark:text-zinc-400">{cardData?.top_source?.percentage || "0%"}</span>
          </div>
        </div>

        {/* Card 2: TOTAL LEADS */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-3xl p-6 xl:p-8 shadow-sm flex flex-col justify-between min-h-[140px] xl:min-h-[160px]">
          <div>
            <span className="text-xs xl:text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              TOTAL LEADS
            </span>
            <h3 className="text-2xl xl:text-3xl font-black text-slate-800 dark:text-zinc-100 mt-2 tracking-tight">
              {cardData?.total_leads?.toLocaleString() || 0}
            </h3>
          </div>
          <p className="text-xs xl:text-sm font-semibold text-slate-400 dark:text-zinc-500 mt-2">
            Obtained Through All Sources
          </p>
        </div>

        {/* Card 3: CONVERSION RATE */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-3xl p-6 xl:p-8 shadow-sm flex flex-col justify-between min-h-[140px] xl:min-h-[160px]">
          <div>
            <span className="text-xs xl:text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              CONVERSION RATE
            </span>
            <h3 className="text-2xl xl:text-3xl font-black text-[#0f3d6b] dark:text-blue-400 mt-2 tracking-tight">
              {cardData?.conversion_rate || "0%"}
            </h3>
          </div>
          <p className="text-xs xl:text-sm font-semibold text-slate-400 dark:text-zinc-500 mt-2">
            New Lead to Booking
          </p>
        </div>

        {/* Card 4: JUNK RATE */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-3xl p-6 xl:p-8 shadow-sm flex flex-col justify-between min-h-[140px] xl:min-h-[160px]">
          <div>
            <span className="text-xs xl:text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              JUNK RATE
            </span>
            <h3 className="text-2xl xl:text-3xl font-black text-slate-800 dark:text-zinc-100 mt-2 tracking-tight">
              {cardData?.junk_rate || "0%"}
            </h3>
          </div>
          <p className="text-xs xl:text-sm font-semibold text-slate-400 dark:text-zinc-500 mt-2">
            Verified spam/wrong numbers
          </p>
        </div>

      </div>

      {/* Source Quality Breakdown Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-3xl shadow-sm overflow-hidden flex flex-col">
        
        {/* Table Header block with Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-100 dark:border-zinc-800/50 p-6 xl:p-8 2xl:p-10 gap-4">
          <h2 className="text-lg xl:text-xl 2xl:text-2xl font-bold text-slate-800 dark:text-zinc-100 tracking-tight">
            Source Quality Breakdown
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setTempStartDate(startDate);
                setTempEndDate(endDate);
                setQuickSelect(appliedQuickSelect);
                setIsDateModalOpen(true);
              }}
              className="flex items-center gap-2 border border-zinc-250 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 px-4 py-2.5 rounded-full text-sm font-semibold text-slate-700 dark:text-zinc-300 transition-colors duration-200 shadow-sm"
            >
              <Calendar className="w-4 h-4 text-slate-500" />
              {appliedQuickSelect ? appliedQuickSelect : formatShortDateSpan(startDate, endDate)}
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2 bg-[#0f3d6b] hover:bg-[#0c3156] disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 shadow-sm"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? "Downloading..." : "Download Report"}
            </button>
          </div>
        </div>

        {/* Edge-to-edge Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left min-w-[900px]">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                
                {/* Lead Source (Sortable) */}
                <th 
                  onClick={() => handleSort("source")}
                  className="py-4 xl:py-5 pl-6 xl:pl-8 2xl:pl-10 pr-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-[#0f3d6b] dark:hover:text-blue-400 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    Lead Source
                    {renderSortIndicator("source")}
                  </div>
                </th>

                {/* Count (Sortable) */}
                <th 
                  onClick={() => handleSort("count")}
                  className="py-4 xl:py-5 px-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-[#0f3d6b] dark:hover:text-blue-400 transition-colors text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    Count
                    {renderSortIndicator("count")}
                  </div>
                </th>

                {/* Quantity Distribution (Sortable) */}
                <th 
                  onClick={() => handleSort("quantityDistribution")}
                  className="py-4 xl:py-5 px-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-[#0f3d6b] dark:hover:text-blue-400 transition-colors text-center w-64"
                >
                  <div className="flex items-center justify-center gap-2">
                    Quantity Distribution
                    {renderSortIndicator("quantityDistribution")}
                  </div>
                </th>

                {/* Conversion % (Sortable) */}
                <th 
                  onClick={() => handleSort("conversionRate")}
                  className="py-4 xl:py-5 px-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-[#0f3d6b] dark:hover:text-blue-400 transition-colors text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    Conversion %
                    {renderSortIndicator("conversionRate")}
                  </div>
                </th>

                {/* Junk % (Sortable) */}
                <th 
                  onClick={() => handleSort("junkRate")}
                  className="py-4 xl:py-5 pl-3 pr-6 xl:pr-8 2xl:pr-10 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-[#0f3d6b] dark:hover:text-blue-400 transition-colors text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    Junk %
                    {renderSortIndicator("junkRate")}
                  </div>
                </th>

              </tr>
            </thead>
            
            <tbody className="divide-none">
              {tableData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-slate-450 dark:text-zinc-500 italic">
                    No lead source data matches current selection
                  </td>
                </tr>
              ) : (
                tableData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-zinc-55/40 dark:hover:bg-zinc-800/10 transition-colors duration-150"
                  >
                    {/* Lead Source */}
                    <td className="py-5 xl:py-6 pl-6 xl:pl-8 2xl:pl-10 pr-3 text-sm xl:text-base font-semibold text-slate-700 dark:text-zinc-300">
                      {row.lead_source}
                    </td>

                    {/* Count */}
                    <td className="py-5 xl:py-6 px-3 text-sm xl:text-base font-bold text-slate-800 dark:text-zinc-200 text-center">
                      {row.count.toLocaleString()}
                    </td>

                    {/* Quantity Distribution (Dynamic reused progress bars) */}
                    <td className="py-5 xl:py-6 px-3 text-center">
                      <div className="flex justify-center">
                        <div className="flex items-center gap-3 w-48 justify-between">
                          <ReportProgressBar value={parseFloat(row.quantity_distribution) || 0} className="flex-1" />
                          <span className="text-xs xl:text-sm font-extrabold text-slate-600 dark:text-zinc-400 w-8 text-right">
                            {row.quantity_distribution}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Conversion % */}
                    <td className="py-5 xl:py-6 px-3 text-sm xl:text-base font-semibold text-slate-700 dark:text-zinc-300 text-center">
                      {row.conversion_rate}
                    </td>

                    {/* Junk % */}
                    <td className="py-5 xl:py-6 pl-3 pr-6 xl:pr-8 2xl:pr-10 text-sm xl:text-base font-semibold text-slate-700 dark:text-zinc-300 text-center">
                      {row.junk_rate}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Controls */}
        {totalItems > 0 && (
          <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/50 p-6 xl:p-8 2xl:p-10">
            {/* Show stats */}
            <span className="text-xs xl:text-sm font-semibold text-slate-400 dark:text-zinc-500">
              Showing analysis for <strong className="text-slate-600 dark:text-zinc-350">{currentTotalLeads.toLocaleString()} leads</strong> collected between {formatSelectedSpan(startDate, endDate)}.
            </span>

            {/* Prev/Next buttons */}
            <div className="flex items-center gap-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={cn(
                  "p-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 transition-colors shadow-sm",
                  currentPage === 1 
                    ? "opacity-45 cursor-not-allowed" 
                    : "hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer"
                )}
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs xl:text-sm font-bold text-slate-700 dark:text-zinc-300">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={cn(
                  "p-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 transition-colors shadow-sm",
                  currentPage === totalPages 
                    ? "opacity-45 cursor-not-allowed" 
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

      {/* Custom Select Your Project Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-[2px] animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-950 w-full max-w-[680px] rounded-[24px] shadow-2xl overflow-hidden flex flex-col border border-zinc-150 dark:border-zinc-800/80 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-100 dark:border-zinc-850">
              <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">Select Your Project</h3>
              <button 
                onClick={() => setIsProjectModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-850 text-slate-400 dark:text-zinc-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-1 min-h-[320px]">
              {/* Left Sidebar */}
              <div className="w-[200px] border-r border-zinc-100 dark:border-zinc-850 p-5 bg-zinc-50/50 dark:bg-zinc-900/30">
                <button className="w-full flex items-center gap-2.5 px-4 py-3 bg-[#0f3d6b] text-white rounded-xl text-sm font-semibold shadow-sm transition-all duration-200">
                  <LayoutGrid className="w-4 h-4" />
                  Projects
                </button>
              </div>

              {/* Right checklist */}
              <div className="flex-1 p-6 space-y-3 overflow-y-auto max-h-[350px]">
                {projectOptions.map((proj) => {
                  const isChecked = tempProjectId === proj.value;
                  return (
                    <div 
                      key={proj.value}
                      onClick={() => setTempProjectId(proj.value)}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-250 select-none",
                        isChecked 
                          ? "border-[#0f3d6b] bg-slate-50/30 dark:border-blue-500/50 dark:bg-blue-950/10" 
                          : "border-zinc-150 hover:border-zinc-250 dark:border-zinc-800/60 dark:hover:border-zinc-700/60"
                      )}
                    >
                      <span className="text-sm font-bold text-slate-700 dark:text-zinc-200">
                        {proj.label}
                      </span>
                      <div className={cn(
                        "w-5 h-5 rounded-lg flex items-center justify-center border transition-all duration-250",
                        isChecked 
                          ? "bg-[#0f3d6b] border-[#0f3d6b] text-white" 
                          : "border-zinc-300 dark:border-zinc-650 bg-white dark:bg-zinc-900"
                      )}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-8 py-5 bg-zinc-50/50 dark:bg-zinc-900/40 border-t border-zinc-100 dark:border-zinc-850">
              <button 
                onClick={() => setTempProjectId("1")}
                className="text-sm font-extrabold text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
              >
                Clear Filters
              </button>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-6 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-750 text-sm font-bold text-slate-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-850 transition-colors"
                >
                  Dismiss
                </button>
                <button 
                  onClick={() => {
                    setAppliedFilters(prev => ({ ...prev, projectId: tempProjectId }));
                    setIsProjectModalOpen(false);
                    toast.success("Project filter applied successfully!");
                  }}
                  className="px-6 py-2.5 bg-[#0f3d6b] hover:bg-[#0c3156] text-white rounded-full text-sm font-bold shadow-md transition-colors animate-in fade-in duration-200"
                >
                  Apply Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Select Date Range Modal */}
      {isDateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-[2px] animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-950 w-full max-w-[680px] rounded-[24px] shadow-2xl overflow-hidden flex flex-col border border-zinc-150 dark:border-zinc-800/80 animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-100 dark:border-zinc-850">
              <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-100">Select Date Range</h3>
              <button 
                onClick={() => setIsDateModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-850 text-slate-400 dark:text-zinc-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-1 min-h-[320px]">
              {/* Left Sidebar */}
              <div className="w-[220px] border-r border-zinc-100 dark:border-zinc-850 p-5 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col justify-between">
                <div className="space-y-5">
                  <button className="w-full flex items-center gap-2.5 px-4 py-3 bg-[#0f3d6b] text-white rounded-xl text-sm font-semibold shadow-sm transition-all duration-200">
                    <Calendar className="w-4 h-4" />
                    Date Range
                  </button>

                  <div>
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 px-2 mb-2">
                      QUICK SELECTS
                    </span>
                    <div className="space-y-1">
                      {["Today", "Last 7 Days", "This Month"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleQuickSelect(opt)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all duration-150",
                            quickSelect === opt
                              ? "bg-slate-50 text-slate-850 border border-zinc-150 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700"
                              : "text-slate-500 hover:text-slate-800 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/40"
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-150 dark:border-zinc-800 pt-4">
                  <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 px-2 mb-1">
                    SELECTED SPAN
                  </span>
                  <span className="block text-xs font-extrabold text-[#0f3d6b] dark:text-blue-400 px-2">
                    {formatSelectedSpan(tempStartDate, tempEndDate)}
                  </span>
                </div>
              </div>

              {/* Right Calendar Month View */}
              <div className="flex-1 p-6 flex flex-col">
                {/* Month Header controls */}
                <div className="flex items-center justify-between mb-4 px-1">
                  <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">
                    {formatMonthYear(activeMonth)}
                  </span>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={prevMonth}
                      className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={nextMonth}
                      className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Weekdays */}
                <div className="grid grid-cols-7 gap-y-2 text-center mb-2">
                  {["MO", "TU", "WE", "TH", "FR", "SA", "SU"].map((day) => (
                    <span key={day} className="text-[10px] font-extrabold text-slate-400 dark:text-zinc-500 tracking-wider">
                      {day}
                    </span>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-y-1 text-center">
                  {calendarDays.map(({ date, isCurrentMonth }: { date: Date; isCurrentMonth: boolean }, idx: number) => {
                    const isFuture = new Date(date.getFullYear(), date.getMonth(), date.getDate()) > new Date(today.getFullYear(), today.getMonth(), today.getDate());
                    const isSelectedStart = isSameDay(date, tempStartDate);
                    const isSelectedEnd = isSameDay(date, tempEndDate);
                    const isInRange = isWithinRange(date, tempStartDate, tempEndDate);
                    
                    let bgClass = "";
                    if (isSelectedStart && tempEndDate && !isSelectedEnd) {
                      bgClass = "bg-[#f4f7fb] dark:bg-blue-950/20 rounded-l-full";
                    } else if (isSelectedEnd && tempStartDate && !isSelectedStart) {
                      bgClass = "bg-[#f4f7fb] dark:bg-blue-950/20 rounded-r-full";
                    } else if (isInRange) {
                      bgClass = "bg-[#f4f7fb] dark:bg-blue-950/20";
                    }

                    return (
                      <div
                        key={idx}
                        onClick={() => !isFuture && handleDayClick(date)}
                        className={cn(
                          "relative py-2 text-xs font-bold select-none flex items-center justify-center transition-all duration-150",
                          isCurrentMonth && !isFuture ? "text-slate-800 dark:text-zinc-200" : "text-slate-300 dark:text-zinc-600/60",
                          isFuture ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
                          bgClass
                        )}
                      >
                        {/* Circle highlight container */}
                        {(isSelectedStart || isSelectedEnd) && (
                          <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-[#0f3d6b] dark:bg-[#1a5b9b] z-0 shadow-sm animate-in zoom-in-75 duration-150" />
                        )}
                        <span className={cn(
                          "relative z-10",
                          (isSelectedStart || isSelectedEnd) && "text-white font-bold"
                        )}>
                          {date.getDate()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-8 py-5 bg-zinc-50/50 dark:bg-zinc-900/40 border-t border-zinc-100 dark:border-zinc-850">
              <button 
                onClick={handleClearDates}
                className="text-sm font-extrabold text-slate-500 hover:text-slate-850 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
              >
                Clear Filters
              </button>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsDateModalOpen(false)}
                  className="px-6 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-750 text-sm font-bold text-slate-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-850 transition-colors"
                >
                  Dismiss
                </button>
                <button 
                  onClick={handleApplyDateRange}
                  className="px-6 py-2.5 bg-[#0f3d6b] hover:bg-[#0c3156] text-white rounded-full text-sm font-bold shadow-md transition-colors animate-in fade-in duration-200"
                >
                  Apply Selection
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
