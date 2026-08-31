import React, { useState, useMemo } from "react";
import { SlidersHorizontal, Calendar as CalendarIcon } from "lucide-react";
import { useGetAllMasterDataQuery } from "../../master/api/masterApi";
import { ReportFilterDialog } from "../../reports/components/ReportFilterDialog";
import type { FilterTab } from "../../reports/components/ReportFilterDialog";
import { ReportKpiCard } from "../../reports/components/ReportKpiCard";
import { ReportProgressBar } from "../../reports/components/ReportProgressBar";
import { LeadQualityDistribution } from "../components/LeadQualityDistribution";
import { IdealCustomerProfile } from "../components/IdealCustomerProfile";
import { PipelineFunnel } from "../components/PipelineFunnel";
import { TopHighestScoredLeads } from "../components/TopHighestScoredLeads";
import {
  useGetProjectAnalysisDateWiseDataQuery,
  useGetProjectAnalysisDataQuery,
} from "../api/analyticsApi";

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
  if (!end) return `${startMonth} ${startDay}`;

  const endMonth = months[end.getMonth()];
  const endDay = end.getDate();
  return `${startMonth} ${startDay}–${endDay}`;
};

export const ProjectAnalyticsPage: React.FC = () => {
  const { data: masterData } = useGetAllMasterDataQuery();

  // Selected project state
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  // Default Planet Green project ID resolution
  const resolvedProjectId = useMemo(() => {
    if (masterData?.projects && masterData.projects.length > 0) {
      const pgProject = masterData.projects.find((p: any) =>
        p.description.toLowerCase().includes("planet green")
      );
      return pgProject ? pgProject.id : masterData.projects[0].id;
    }
    return 1;
  }, [masterData]);

  const activeProjectId = selectedProjectId ?? resolvedProjectId;

  // Selected Date Range state: defaults to Current Month
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [startDate, setStartDate] = useState<Date | null>(firstDay);
  const [endDate, setEndDate] = useState<Date | null>(lastDay);

  // Dialog Controls
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [dialogTabs, setDialogTabs] = useState<FilterTab[]>(["projects"]);
  const [activeDialogTab, setActiveDialogTab] = useState<FilterTab>("projects");

  // Master Data Options Map
  const projectOptions = useMemo(() => {
    return (
      masterData?.projects?.map((p: any) => ({
        value: String(p.id),
        label: p.description,
      })) || [{ value: "1", label: "Planet Green" }]
    );
  }, [masterData]);

  const activeProjectLabel = useMemo(() => {
    const opt = projectOptions.find((p) => Number(p.value) === activeProjectId);
    return opt ? opt.label : "Planet Green";
  }, [projectOptions, activeProjectId]);

  const formattedStartDate = useMemo(() => formatDateForApi(startDate), [startDate]);
  const formattedEndDate = useMemo(() => formatDateForApi(endDate), [endDate]);

  // 1. Fetch date-wise analysis data (funnel, lead quality, top source, total leads, junk rate, conv rate, bookings)
  const {
    data: dateWiseResponse,
    isFetching: isDateWiseFetching,
    error: dateWiseError,
  } = useGetProjectAnalysisDateWiseDataQuery({
    project_id: activeProjectId,
    start_date: formattedStartDate,
    end_date: formattedEndDate,
  }, {
    skip: !activeProjectId || !formattedStartDate || !formattedEndDate,
  });

  // 2. Fetch general analysis data (today's leads, top 10 leads, ideal customer profile)
  const {
    data: generalResponse,
    isFetching: isGeneralFetching,
    error: generalError,
  } = useGetProjectAnalysisDataQuery({
    project_id: activeProjectId,
  }, {
    skip: !activeProjectId,
  });

  const isLoading = (isDateWiseFetching && !dateWiseResponse) || (isGeneralFetching && !generalResponse);
  const isError = !!(dateWiseError || generalError);

  const parsePercent = (val: string | undefined | null): number => {
    if (!val) return 0;
    return parseFloat(val.replace("%", "")) || 0;
  };

  // Map API responses to UI data structures
  const resolvedData = useMemo(() => {
    const leadQualityList = dateWiseResponse?.lead_quality_distribution || [];
    const getQualityPercentage = (name: string): number => {
      const match = leadQualityList.find(item => item.name.toLowerCase() === name.toLowerCase());
      return match ? parsePercent(match.percentage) : 0;
    };

    const junkPercent = parsePercent(dateWiseResponse?.junk_rate);
    const hot = getQualityPercentage("hot");
    const warm = getQualityPercentage("warm") + getQualityPercentage("nurture");
    const cold = getQualityPercentage("cold");
    const junk = getQualityPercentage("junk") || junkPercent;
    
    const hasQualityData = hot > 0 || warm > 0 || cold > 0 || junk > 0;

    const activeRateVal = hasQualityData
      ? Math.max(0, Math.min(100, Math.round(100 - junk)))
      : 0;

    const leadQuality = {
      hot,
      warm,
      cold,
      junk,
      activeRate: activeRateVal,
    };

    const topSource = {
      name: dateWiseResponse?.top_source?.name || "None",
      percentage: parsePercent(dateWiseResponse?.top_source?.percentage),
    };

    const funnelList = dateWiseResponse?.pipeline_funnel_information || [];
    const getFunnelCount = (keywords: string[]): number => {
      const match = funnelList.find(item =>
        keywords.some(keyword => item.name.toLowerCase().includes(keyword.toLowerCase()))
      );
      return match ? match.count : 0;
    };

    const funnel = {
      newLeads: getFunnelCount(["new"]),
      contacted: getFunnelCount(["contact", "call"]),
      siteVisit: getFunnelCount(["visit", "site"]),
      negotiation: getFunnelCount(["negotiat", "advance"]),
      booked: getFunnelCount(["book", "close", "won"]),
    };

    const topLeads = (generalResponse?.top_10_highest_score_leads || []).map((lead, idx) => {
      const getAvatarColorClass = (index: number) => {
        const colors = [
          "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
          "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
          "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
          "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
          "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
          "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300",
        ];
        return colors[index % colors.length];
      };

      const firstName = lead.customer_first_name || "";
      const lastName = lead.customer_last_name || "";
      const fullName = `${firstName} ${lastName}`.trim() || "Unnamed";

      return {
        id: String(lead.lead_id || idx),
        name: fullName,
        leadId: String(lead.lead_id || ""),
        score: Number(lead.score || 0),
        project: lead.project_name || activeProjectLabel,
        avatarColor: getAvatarColorClass(idx),
      };
    });

    const topPersona = {
      occupation: generalResponse?.ideal_customer_profile?.occupation || "—",
      ageBracket: generalResponse?.ideal_customer_profile?.age ? String(generalResponse.ideal_customer_profile.age) : "—",
      avgIncome: generalResponse?.ideal_customer_profile?.avg_income ? String(generalResponse.ideal_customer_profile.avg_income) : "—",
      state: generalResponse?.ideal_customer_profile?.state_name || "—",
    };

    return {
      kpis: {
        newLeadsToday: generalResponse?.new_leads_today || 0,
        junkRate: junkPercent,
        leadToBookingConv: parsePercent(dateWiseResponse?.lead_conv_rate),
        totalBookings: dateWiseResponse?.total_bookings || 0,
      },
      leadQuality,
      totalLeads: dateWiseResponse?.total_leads || 0,
      topSource,
      topLeads,
      funnel,
      topPersona,
      avgScore: generalResponse?.ideal_customer_profile?.avg_leads_score || 0,
    };
  }, [dateWiseResponse, generalResponse, activeProjectLabel]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] w-full space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0f3d6b] dark:border-blue-400" />
        <span className="text-sm font-semibold text-slate-550 dark:text-zinc-400 animate-pulse">
          Loading project analytics...
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] w-full space-y-4 text-center">
        <div className="text-red-500 dark:text-red-400 text-lg font-bold">
          Failed to load project analytics data.
        </div>
        <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-md">
          Please check your connection and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] xl:max-w-[1920px] 2xl:max-w-[2560px] mx-auto space-y-6 xl:space-y-8 2xl:space-y-10 px-4 sm:px-6 md:px-8 py-6 animate-in fade-in duration-300">

      {/* Top Header Panel (Unified White Card) */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-3xl p-5 xl:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Page Title */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-black text-slate-850 dark:text-zinc-150 tracking-tight">
            Project Analytics Hub
          </h1>
          {(isDateWiseFetching || isGeneralFetching) && (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#0f3d6b] dark:border-blue-400 border-t-transparent" />
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Project Filter Button */}
          <button
            onClick={() => {
              setDialogTabs(["projects", "date"]);
              setActiveDialogTab("projects");
              setIsFilterDialogOpen(true);
            }}
            className="flex items-center gap-1.5 bg-slate-50 dark:bg-zinc-800/60 hover:bg-slate-100 dark:hover:bg-zinc-750/60 border border-slate-200/50 dark:border-zinc-700/50 px-3.5 py-2 rounded-xl text-xs font-extrabold text-slate-700 dark:text-zinc-300 transition-colors shadow-sm cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            {activeProjectLabel}
          </button>

          {/* Date Range Button */}
          <button
            onClick={() => {
              setDialogTabs(["projects", "date"]);
              setActiveDialogTab("date");
              setIsFilterDialogOpen(true);
            }}
            className="flex items-center gap-1.5 bg-slate-50 dark:bg-zinc-800/60 hover:bg-slate-100 dark:hover:bg-zinc-750/60 border border-slate-200/50 dark:border-zinc-700/50 px-3.5 py-2 rounded-xl text-xs font-extrabold text-slate-700 dark:text-zinc-300 transition-colors shadow-sm cursor-pointer"
          >
            <CalendarIcon className="w-3.5 h-3.5 text-slate-400" />
            {formatSelectedSpan(startDate, endDate)}
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <ReportKpiCard
          title="New Leads Today"
          value={resolvedData.kpis.newLeadsToday.toLocaleString()}
        />
        <ReportKpiCard
          title="Junk Rate"
          value={`${resolvedData.kpis.junkRate}%`}
          valueClassName="text-[#de3d53] dark:text-red-400"
        />
        <ReportKpiCard
          title="Lead to Booking Conv."
          value={`${resolvedData.kpis.leadToBookingConv}%`}
        />
        <ReportKpiCard
          title="Total Bookings"
          value={resolvedData.kpis.totalBookings.toLocaleString()}
        />
      </div>

      {/* Redesigned 2-Column Dashboard Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column: Lead Quality, Total Leads & Top Source, and Top Scored Leads */}
        <div className="space-y-6 flex flex-col">
          <LeadQualityDistribution data={resolvedData.leadQuality} />

          <div className="grid gap-6 md:grid-cols-2">
            {/* Total Leads */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[24px] p-5 xl:p-6 2xl:p-8 shadow-sm flex flex-col justify-center h-[125px] xl:h-[135px] 2xl:h-[165px] min-[2560px]:h-[225px]">
              <span className="block text-[10px] xl:text-[10px] 2xl:text-xs font-extrabold text-slate-400 dark:text-zinc-500 tracking-widest uppercase">
                Total Leads
              </span>
              <span className="block text-3xl xl:text-3xl 2xl:text-4xl font-black text-slate-800 dark:text-zinc-100 mt-1 xl:mt-2">
                {resolvedData.totalLeads.toLocaleString()}
              </span>
            </div>

            {/* Top Source */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[24px] p-5 xl:p-6 2xl:p-8 shadow-sm flex flex-col justify-center h-[125px] xl:h-[135px] 2xl:h-[165px] min-[2560px]:h-[225px]">
              <span className="block text-[10px] xl:text-[10px] 2xl:text-xs font-extrabold text-slate-400 dark:text-zinc-500 tracking-widest uppercase">
                Top Source
              </span>
              <span className="block text-xl xl:text-xl 2xl:text-2xl font-bold text-slate-800 dark:text-zinc-100 mt-1 xl:mt-2 truncate">
                {resolvedData.topSource.name}
              </span>
              <div className="mt-2.5 xl:mt-3.5 flex items-center gap-3">
                <ReportProgressBar value={resolvedData.topSource.percentage} className="flex-1" />
                <span className="text-xs xl:text-xs 2xl:text-sm font-extrabold text-slate-700 dark:text-zinc-300">
                  {resolvedData.topSource.percentage}%
                </span>
              </div>
            </div>
          </div>

          <TopHighestScoredLeads leads={resolvedData.topLeads} />
        </div>

        {/* Right Column: Pipeline Funnel and Ideal Customer Profile */}
        <div className="space-y-6 flex flex-col">
          <PipelineFunnel data={resolvedData.funnel} />
          <IdealCustomerProfile data={resolvedData.topPersona} avgScore={resolvedData.avgScore} />
        </div>
      </div>

      {/* Reused Report Filter Dialog */}
      <ReportFilterDialog
        open={isFilterDialogOpen}
        initialTab={activeDialogTab}
        onClose={() => setIsFilterDialogOpen(false)}
        tabs={dialogTabs}
        onApply={(filters) => {
          if (filters.projectIds && filters.projectIds.length > 0) {
            setSelectedProjectId(Number(filters.projectIds[0]));
          }
          if (filters.startDate) {
            setStartDate(filters.startDate);
          }
          if (filters.endDate) {
            setEndDate(filters.endDate);
          }
          setIsFilterDialogOpen(false);
        }}
        onReset={() => {
          setSelectedProjectId(null);
          setStartDate(firstDay);
          setEndDate(lastDay);
          setIsFilterDialogOpen(false);
        }}
        projectOptions={projectOptions}
        appliedProjectIds={[String(activeProjectId)]}
        appliedStartDate={startDate}
        appliedEndDate={endDate}
      />
    </div>
  );
};
