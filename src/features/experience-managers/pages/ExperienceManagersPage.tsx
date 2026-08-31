import React, { useState, useMemo } from "react";
import {
  ChevronRight,
  SlidersHorizontal,
  Calendar as CalendarIcon,
  Clock,
  PhoneOff,
  ArrowLeft,
  Search,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  AlertCircle,
  ThumbsDown,
  Users,
  Sparkles,
  ChevronDown,
  Check,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetAllMasterDataQuery } from "../../master/api/masterApi";
import { usePermissions } from "../../../hooks/usePermissions";
import {
  useGetAllUsersByRoleIdQuery,
  useGetEmDashboardDateWiseDataQuery,
  useGetEmDashboardTodaysDataQuery,
  useGetReporteesQuery,
} from "../../users/api/usersApi";
import { UsersFeaturePage } from "../../users/pages/UsersFeaturePage";
import { ReportFilterDialog } from "../../reports/components/ReportFilterDialog";
import type { FilterTab } from "../../reports/components/ReportFilterDialog";
import { ReportProgressBar } from "../../reports/components/ReportProgressBar";
import { getEMDashboardData } from "../data/emDashboardData";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, LabelList } from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { cn } from "../../../utils";

const formatSelectedSpan = (start: Date | null, end: Date | null) => {
  if (!start) return "All Time";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const startMonth = months[start.getMonth()];
  const startDay = start.getDate();
  if (!end) return `${startMonth} ${startDay}`;

  const endMonth = months[end.getMonth()];
  const endDay = end.getDate();
  return `${startMonth} ${startDay}–${endDay}`;
};

// Radial ring for Missed Follow-up
const EMRadialRing = ({ value }: { value: number }) => {
  return (
    <div className="relative flex items-center justify-center w-36 h-36 mx-auto my-2">
      {/* Soft light pink/rose outer circle */}
      <div className="absolute w-32 h-32 rounded-full bg-[#fff1f2] dark:bg-rose-950/20 flex items-center justify-center shadow-sm">
        {/* Inner white circle with dark blue border */}
        <div className="w-24 h-24 rounded-full bg-white dark:bg-zinc-900 border-[4.5px] border-[#002d62] flex flex-col items-center justify-center shadow-md">
          <span className="text-4xl font-black text-[#002d62] dark:text-zinc-100 leading-none">
            {value}
          </span>
          <span className="text-[10px] font-black uppercase text-[#002d62] dark:text-zinc-400 tracking-wider mt-1">
            OVERDUE
          </span>
        </div>
      </div>
    </div>
  );
};

// Bar chart for Lead Quality
const EMQualityDistributionBarChart = ({ data }: { data: { totalLeads: number; hotLeads: number; warmLeads: number; coldLeads: number; junkLeads: number } }) => {
  const chartData = [
    { name: "Total Leads", value: data.totalLeads, color: "#1c448e" },
    { name: "Hot Leads", value: data.hotLeads, color: "#5b7dbd" },
    { name: "Warm Leads", value: data.warmLeads, color: "#82a6f5" },
    { name: "Cold Leads", value: data.coldLeads, color: "#06246e" },
    { name: "Junk Leads", value: data.junkLeads, color: "#9ca3af" }
  ];

  return (
    <div className="h-[210px] w-full pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
        >
          <CartesianGrid vertical={false} stroke="#f1f5f9" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 10, fontWeight: 600 }}
            interval={0}
          />
          <YAxis hide={true} domain={[0, 'dataMax + 10']} />
          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]}
            maxBarSize={44}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <LabelList
              dataKey="value"
              position="top"
              offset={8}
              style={{ fill: "#1e293b", fontSize: 13, fontWeight: 800 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Segmented Progress Bar for Leads by Status
const EMLeadsByStatusSegmentedBar = ({ statusData }: { statusData: Array<{ label: string; count: number; colorClass: string }> }) => {
  const total = statusData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="space-y-6 py-2">
      {/* Labels row: Label name at top, Value in center, Dot at bottom */}
      <div className="flex justify-between items-center text-center px-1">
        {statusData.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center flex-1">
            <span className="text-[8px] xl:text-[9px] font-extrabold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
              {item.label}
            </span>
            <span className="text-sm font-black text-[#002d62] dark:text-zinc-200 mt-1">
              {item.count}
            </span>
            <div className={`w-1.5 h-1.5 rounded-full ${item.colorClass} mt-2`} />
          </div>
        ))}
      </div>

      {/* Segmented bar */}
      <div className="h-6 w-full rounded-full overflow-hidden flex shadow-inner bg-slate-100 dark:bg-zinc-950">
        {statusData.map((item, idx) => {
          const widthPercent = total > 0 ? `${(item.count / total) * 100}%` : "16.66%";
          return (
            <div
              key={idx}
              style={{ width: widthPercent }}
              className={`${item.colorClass} border-r border-white/20 last:border-0 h-full`}
            />
          );
        })}
      </div>
    </div>
  );
};

// Radial ring for Bookings Achievement
const EMTotalBookingsRing = ({ units }: { units: number }) => {
  return (
    <div className="relative flex items-center justify-center w-36 h-36 mx-auto my-2">
      {/* White circle with border */}
      <div className="w-28 h-28 rounded-full border-[5px] border-white flex items-center justify-center">
        <span className="text-6xl font-black text-white leading-none">
          {units}
        </span>
      </div>
    </div>
  );
};

interface ExperienceManagersPageProps {
  lockedEmId?: number;
  lockedRmId?: number;
}

export const ExperienceManagersPage: React.FC<ExperienceManagersPageProps> = ({ lockedEmId, lockedRmId }) => {
  const navigate = useNavigate();
  const { roleCode } = usePermissions();
  const [view, setView] = useState<"dashboard" | "followups" | "visits" | "objections" | "table">("dashboard");
  const { data: masterData } = useGetAllMasterDataQuery();

  // Dialog & Filter States
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [dialogTabs, setDialogTabs] = useState<FilterTab[]>(["date"]);
  const [appliedProjectIds, setAppliedProjectIds] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [selectedEmLabel, setSelectedEmLabel] = useState("All");
  const [selectedEmId, setSelectedEmId] = useState<number | null>(lockedEmId ?? null);
  const [emSearchQuery, setEmSearchQuery] = useState("");

  // Search States for Detailed List Views
  const [followupsSearchTerm, setFollowupsSearchTerm] = useState("");
  const [visitsSearchTerm, setVisitsSearchTerm] = useState("");
  const [objectionsSearchTerm, setObjectionsSearchTerm] = useState("");
  const [hoveredObjectionIdx, setHoveredObjectionIdx] = useState<number | null>(null);
  const [isObjectionsModalOpen, setIsObjectionsModalOpen] = useState(false);
  const [hoveredModalObjectionIdx, setHoveredModalObjectionIdx] = useState<number | null>(null);

  // Default Planet Green project ID resolution
  const resolvedProjectId = useMemo(() => {
    if (masterData?.projects && masterData.projects.length > 0) {
      const pgProject = masterData.projects.find((p: any) =>
        p.description.toLowerCase().includes("planet green")
      );
      return pgProject ? String(pgProject.id) : String(masterData.projects[0].id);
    }
    return "1";
  }, [masterData]);

  // Master Data Options Map
  const projectOptionsForDialog = useMemo(() => {
    return (
      masterData?.projects?.map((p: any) => ({
        value: String(p.id),
        label: p.description,
      })) || [
        { value: "1", label: "Planet Green" },
        { value: "2", label: "Farm Natura" },
        { value: "3", label: "Eco World" }
      ]
    );
  }, [masterData]);

  const activeProjectId = useMemo(() => {
    return appliedProjectIds.length > 0 ? appliedProjectIds[0] : resolvedProjectId;
  }, [appliedProjectIds, resolvedProjectId]);

  const activeProjectLabel = useMemo(() => {
    const found = projectOptionsForDialog.find((p) => p.value === activeProjectId);
    return found ? found.label : "Planet Green";
  }, [activeProjectId, projectOptionsForDialog]);

  // Fetch all EMs (role 4) — only used when NOT locked to an RM
  const { data: allEmUsers = [], isLoading: isAllEmLoading } = useGetAllUsersByRoleIdQuery(
    { role_id: 4, offset: 0 },
    { skip: !!lockedRmId }
  );

  // Fetch EMs under a specific RM (RELMNG login)
  const { data: rmReportees = [], isLoading: isRmReporteesLoading } = useGetReporteesQuery(
    { reporting_manager_id: lockedRmId as number, offset: 0 },
    { skip: !lockedRmId }
  );

  // The effective EM list depends on whether we're locked to an RM
  const emUsers = lockedRmId ? rmReportees : allEmUsers;
  const isEmUsersLoading = lockedRmId ? isRmReporteesLoading : isAllEmLoading;

  const emIds = useMemo(() => {
    return emUsers.map((u: any) => u.id);
  }, [emUsers]);

  const filteredEmUsers = useMemo(() => {
    return emUsers.filter((user: any) => {
      const uName = (user.name || `${user.first_name || ""} ${user.last_name || ""}`).trim().toLowerCase();
      return uName.includes(emSearchQuery.toLowerCase());
    });
  }, [emUsers, emSearchQuery]);

  const formatDateForApi = (date: Date | null): string => {
    if (!date) return "";
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const formattedStartDate = useMemo(() => formatDateForApi(startDate), [startDate]);
  const formattedEndDate = useMemo(() => formatDateForApi(endDate), [endDate]);
  const formattedTodayDate = useMemo(() => formatDateForApi(new Date()), []);

  const {
    data: dateWiseResponse,
    isLoading: isDateWiseLoading,
    isFetching: isDateWiseFetching,
    error: dateWiseError,
  } = useGetEmDashboardDateWiseDataQuery(
    {
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      em_ids: selectedEmId ? [selectedEmId] : emIds,
      project_ids: [Number(activeProjectId)],
    },
    { skip: emIds.length === 0 || !activeProjectId }
  );

  const {
    data: todaysResponse,
    isLoading: isTodaysLoading,
    isFetching: isTodaysFetching,
    error: todaysError,
  } = useGetEmDashboardTodaysDataQuery(
    {
      em_ids: selectedEmId ? [selectedEmId] : emIds,
      date: formattedTodayDate,
      project_ids: [Number(activeProjectId)],
    },
    { skip: emIds.length === 0 || !formattedTodayDate || !activeProjectId }
  );

  const isLoading = isEmUsersLoading || (emUsers.length > 0 && ((isDateWiseLoading && !dateWiseResponse) || (isTodaysLoading && !todaysResponse)));
  const isFetching = isDateWiseFetching || isTodaysFetching;
  const isError = !!(dateWiseError || todaysError);

  // Map API responses to UI data structures
  const emData = useMemo(() => {
    const rawMissed = dateWiseResponse?.missed_follow_up || dateWiseResponse?.missed_follow_ups;
    const missedFollowUps = {
      overdueCount: rawMissed?.overdue_count ?? rawMissed?.count ?? 0,
      avgDelay: rawMissed?.avg_delay || "0h",
    };

    const todayFollowUps = (todaysResponse?.today_follow_up_due || []).map((item, idx) => {
      const initials = `${item.first_name?.[0] || ""}${item.last_name?.[0] || ""}`.toUpperCase() || "C";

      const avatarColors = [
        "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
        "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400",
        "bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400",
        "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400",
      ];
      const avatarBg = avatarColors[idx % avatarColors.length];

      let formattedTime = "12:00 PM";
      if (item.follow_up_time) {
        try {
          const d = new Date(item.follow_up_time);
          formattedTime = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch (e) {
          formattedTime = item.follow_up_time;
        }
      }

      return {
        initials,
        avatarBg,
        customerName: `${item.first_name || ""} ${item.last_name || ""}`.trim() || "Customer",
        details: "Follow-up Due",
        time: formattedTime,
        action: item.follow_up_type || "Call",
      };
    });

    const rawQuality = dateWiseResponse?.lead_quality_distribution || (dateWiseResponse as any)?.quality_distribution;
    let totalLeads = 0;
    let hotLeads = 0;
    let warmLeads = 0;
    let coldLeads = 0;
    let junkLeads = 0;

    if (rawQuality) {
      if (Array.isArray(rawQuality)) {
        const hotObj = rawQuality.find((item: any) => item.name?.toLowerCase() === "hot" || item.label?.toLowerCase() === "hot");
        const warmObj = rawQuality.find((item: any) => item.name?.toLowerCase() === "warm" || item.label?.toLowerCase() === "warm");
        const coldObj = rawQuality.find((item: any) => item.name?.toLowerCase() === "cold" || item.label?.toLowerCase() === "cold");
        const junkObj = rawQuality.find((item: any) => item.name?.toLowerCase() === "junk" || item.label?.toLowerCase() === "junk");

        hotLeads = hotObj?.count ?? hotObj?.no_of_leads ?? hotObj?.value ?? 0;
        warmLeads = warmObj?.count ?? warmObj?.no_of_leads ?? warmObj?.value ?? 0;
        coldLeads = coldObj?.count ?? coldObj?.no_of_leads ?? coldObj?.value ?? 0;
        junkLeads = junkObj?.count ?? junkObj?.no_of_leads ?? junkObj?.value ?? 0;
        totalLeads = hotLeads + warmLeads + coldLeads + junkLeads;
      } else {
        totalLeads = rawQuality.total_leads ?? rawQuality.total ?? 0;
        hotLeads = rawQuality.hot_leads ?? rawQuality.hot ?? 0;
        warmLeads = rawQuality.warm_leads ?? rawQuality.warm ?? 0;
        coldLeads = rawQuality.cold_leads ?? rawQuality.cold ?? 0;
        junkLeads = (rawQuality as any).junk_leads ?? (rawQuality as any).junk ?? 0;
        if (!rawQuality.total_leads && !rawQuality.total) {
          totalLeads = hotLeads + warmLeads + coldLeads + junkLeads;
        }
      }
    }

    const leadQualityDistribution = {
      totalLeads,
      hotLeads,
      warmLeads,
      coldLeads,
      junkLeads,
    };

    const rawStatusList = [...(dateWiseResponse?.status_distribution || dateWiseResponse?.leads_by_status || [])]
      .sort((a, b) => (b.count || 0) - (a.count || 0))
      .slice(0, 6);
    const colorClasses = [
      "bg-blue-900 dark:bg-blue-900",
      "bg-blue-800 dark:bg-blue-850",
      "bg-blue-700 dark:bg-blue-800",
      "bg-blue-500 dark:bg-blue-700",
      "bg-blue-400 dark:bg-blue-600",
      "bg-blue-300 dark:bg-blue-500",
    ];

    const leadsByStatus = rawStatusList.map((item, idx) => {
      const label = (item.status_name || item.name || item.label || "Status").toUpperCase();
      return {
        label,
        count: item.count || 0,
        colorClass: colorClasses[idx % colorClasses.length],
      };
    });


    const finalLeadsByStatus = leadsByStatus.length > 0 ? leadsByStatus : [
      { label: "NEW LEADS", count: 0, colorClass: "bg-blue-900" },
      { label: "CALLS", count: 0, colorClass: "bg-blue-800" },
      { label: "FOLLOW-UPS", count: 0, colorClass: "bg-blue-700" },
      { label: "MISSED", count: 0, colorClass: "bg-blue-500" },
      { label: "SITE VISITS", count: 0, colorClass: "bg-blue-400" },
      { label: "PAYMENT", count: 0, colorClass: "bg-blue-300" }
    ];

    const rawVisitOverview = dateWiseResponse?.site_visit_overview || dateWiseResponse?.site_visit_statistics || (dateWiseResponse as any)?.site_visits || (dateWiseResponse as any)?.site_visit || {};
    const siteVisitOverview = {
      scheduled: rawVisitOverview?.scheduled || rawVisitOverview?.scheduled_count || rawVisitOverview?.scheduled_visits || 0,
      completed: rawVisitOverview?.completed || rawVisitOverview?.completed_count || rawVisitOverview?.completed_visits || 0,
    };

    const siteVisitsToday = (todaysResponse?.today_site_visits || []).map((item) => {
      let formattedTime = "12:00 PM";
      if (item.site_visit_time_date) {
        try {
          const d = new Date(item.site_visit_time_date);
          formattedTime = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch (e) {
          formattedTime = item.site_visit_time_date;
        }
      }

      return {
        customerName: `${item.first_name || ""} ${item.last_name || ""}`.trim() || "Customer",
        time: formattedTime,
        details: item.em_name ? `Assigned to: ${item.em_name}` : "Site Visit Scheduled",
      };
    });

    const recentObjections = (dateWiseResponse?.recent_objections || []).map((item) => {
      let lastContactedStr = "Last contacted: —";
      if (item.last_contacted_on) {
        try {
          const d = new Date(item.last_contacted_on);
          lastContactedStr = `Last contacted: ${d.toLocaleDateString()}`;
        } catch (e) {
          lastContactedStr = `Last contacted: ${item.last_contacted_on}`;
        }
      } else if (item.last_contacted) {
        lastContactedStr = item.last_contacted;
      }

      return {
        customerName: item.customer_name || `${item.customer_first_name || ""} ${item.customer_last_name || ""}`.trim() || "Customer",
        lastContacted: lastContactedStr,
        objectionsCount: item.objections_count || 0,
        objectionTypes: item.objection_types || ["Has Budget Limitation"],
      };
    });

    let rawBookings = dateWiseResponse?.booking_count || dateWiseResponse?.total_bookings;
    if (rawBookings === undefined && (dateWiseResponse as any)?.total_booking_count !== undefined) {
      rawBookings = { count: (dateWiseResponse as any).total_booking_count };
    }
    const totalBookings = {
      units: rawBookings?.units ?? rawBookings?.count ?? 0,
      target: rawBookings?.target || 10,
    };

    return {
      missedFollowUps,
      todayFollowUps,
      leadQualityDistribution,
      leadsByStatus: finalLeadsByStatus,
      siteVisitOverview,
      siteVisitsToday,
      recentObjections,
      totalBookings,
    };
  }, [dateWiseResponse, todaysResponse]);

  const handleEmSelect = (em: { id: number | null; name: string }) => {
    setSelectedEmLabel(em.name);
    setSelectedEmId(em.id);
  };

  // Detailed lists search filters
  const filteredFollowups = useMemo(() => {
    return emData.todayFollowUps.filter(item =>
      item.customerName.toLowerCase().includes(followupsSearchTerm.toLowerCase()) ||
      item.action.toLowerCase().includes(followupsSearchTerm.toLowerCase())
    );
  }, [followupsSearchTerm, emData]);

  const filteredVisits = useMemo(() => {
    return emData.siteVisitsToday.filter(item =>
      item.customerName.toLowerCase().includes(visitsSearchTerm.toLowerCase()) ||
      item.details.toLowerCase().includes(visitsSearchTerm.toLowerCase())
    );
  }, [visitsSearchTerm, emData]);

  const filteredObjections = useMemo(() => {
    return emData.recentObjections.filter(item =>
      item.customerName.toLowerCase().includes(objectionsSearchTerm.toLowerCase())
    );
  }, [objectionsSearchTerm, emData]); if (view === "table") {
    return (
      <div className="w-full max-w-[1440px] xl:max-w-[1920px] 2xl:max-w-[2560px] mx-auto space-y-6 px-4 sm:px-6 md:px-8 py-6 animate-in fade-in duration-300">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setView("dashboard")}
            className="flex items-center gap-2 text-sm font-extrabold text-[#002d62] dark:text-blue-400 hover:underline transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            Back to Sales Executive Dashboard
          </button>
        </div>

        <UsersFeaturePage
          roleId={4}
          roleLabel="Sales Executive"
          title="Sales Executives"
          description="Manage Sales Executives registry and view their assigned leads."
          permissionPrefix="agent"
        />
      </div>
    );
  }

  // ----------------------------------------------------
  // TODAY'S FOLLOW-UPS DUE DETAILED LIST VIEW
  // ----------------------------------------------------
  if (view === "followups") {
    return (
      <div className="w-full max-w-[1440px] xl:max-w-[1920px] 2xl:max-w-[2560px] mx-auto space-y-6 px-4 sm:px-6 md:px-8 py-6 animate-in fade-in duration-300">

        {/* Header Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            onClick={() => setView("dashboard")}
            className="flex items-center gap-2 text-sm font-extrabold text-[#002d62] dark:text-blue-400 hover:underline transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            Back to Sales Executive Dashboard
          </button>

          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search follow-ups..."
              value={followupsSearchTerm}
              onChange={(e) => setFollowupsSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-semibold"
            />
          </div>
        </div>

        {/* List Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[24px] p-6 xl:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-50 dark:border-zinc-800/50 pb-4">
            <h2 className="text-lg font-black text-slate-800 dark:text-zinc-100 tracking-tight">
              Today's Follow-ups Due
            </h2>
          </div>

          <div className="bg-slate-50/50 dark:bg-zinc-950/20 rounded-[20px] p-4 xl:p-6 space-y-3">
            {/* Header row */}
            <div className="grid grid-cols-4 text-[10px] font-extrabold text-slate-400 dark:text-zinc-500 tracking-wider uppercase px-6">
              <div>Customer Name</div>
              <div className="text-center">Details</div>
              <div className="text-center">Scheduled Time</div>
              <div className="text-center">Action Required</div>
            </div>

            {/* Row cards */}
            {filteredFollowups.length === 0 ? (
              <div className="py-12 text-center text-xs font-semibold text-slate-400 dark:text-zinc-500">
                No follow-ups found
              </div>
            ) : (
              filteredFollowups.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-4 items-center bg-white dark:bg-zinc-900 rounded-[18px] py-4.5 px-6 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${item.avatarBg} flex items-center justify-center font-extrabold text-xs shrink-0`}>
                      {item.initials}
                    </div>
                    <span className="font-bold text-sm text-slate-800 dark:text-zinc-100">{item.customerName}</span>
                  </div>
                  <div className="text-center text-sm font-semibold text-slate-600 dark:text-zinc-400">{item.details}</div>
                  <div className="text-center text-sm font-bold text-slate-800 dark:text-zinc-200">{item.time}</div>
                  <div className="text-center text-sm font-black text-[#002d62] dark:text-blue-400">{item.action}</div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-zinc-100 dark:border-zinc-800 pt-6 gap-4">
            <span className="text-[11px] font-extrabold text-slate-400 dark:text-zinc-500">
              Showing 1 - {filteredFollowups.length} of {filteredFollowups.length} Follow-ups
            </span>
          </div>
        </div>

      </div>
    );
  }

  // ----------------------------------------------------
  // SITE VISITS TODAY DETAILED LIST VIEW
  // ----------------------------------------------------
  if (view === "visits") {
    return (
      <div className="w-full max-w-[1440px] xl:max-w-[1920px] 2xl:max-w-[2560px] mx-auto space-y-6 px-4 sm:px-6 md:px-8 py-6 animate-in fade-in duration-300">

        {/* Header Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            onClick={() => setView("dashboard")}
            className="flex items-center gap-2 text-sm font-extrabold text-[#002d62] dark:text-blue-400 hover:underline transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            Back to Sales Executive Dashboard
          </button>

          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search site visits..."
              value={visitsSearchTerm}
              onChange={(e) => setVisitsSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-semibold"
            />
          </div>
        </div>

        {/* List Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[24px] p-6 xl:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-50 dark:border-zinc-800/50 pb-4">
            <h2 className="text-lg font-black text-slate-800 dark:text-zinc-100 tracking-tight">
              Site Visits Today
            </h2>
          </div>

          <div className="bg-slate-50/50 dark:bg-zinc-950/20 rounded-[20px] p-4 xl:p-6 space-y-3">
            {/* Header row */}
            <div className="grid grid-cols-3 text-[10px] font-extrabold text-slate-400 dark:text-zinc-500 tracking-wider uppercase px-6">
              <div>Customer Name</div>
              <div className="text-center">Scheduled Time</div>
              <div className="text-center">Details</div>
            </div>

            {/* Row cards */}
            {filteredVisits.length === 0 ? (
              <div className="py-12 text-center text-xs font-semibold text-slate-400 dark:text-zinc-500">
                No site visits found
              </div>
            ) : (
              filteredVisits.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-3 items-center bg-white dark:bg-zinc-900 rounded-[18px] py-4.5 px-6 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <span className="font-bold text-sm text-slate-800 dark:text-zinc-100">{item.customerName}</span>
                  <div className="text-center text-sm font-bold text-slate-850 dark:text-zinc-200">{item.time}</div>
                  <div className="text-center text-sm font-semibold text-slate-600 dark:text-zinc-400">{item.details}</div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-zinc-100 dark:border-zinc-800 pt-6 gap-4">
            <span className="text-[11px] font-extrabold text-slate-400 dark:text-zinc-500">
              Showing 1 - {filteredVisits.length} of {filteredVisits.length} Site Visits
            </span>
          </div>
        </div>

      </div>
    );
  }

  // ----------------------------------------------------
  // RECENT OBJECTIONS DETAILED LIST VIEW
  // ----------------------------------------------------
  if (view === "objections") {
    return (
      <div className="w-full max-w-[1440px] xl:max-w-[1920px] 2xl:max-w-[2560px] mx-auto space-y-6 px-4 sm:px-6 md:px-8 py-6 animate-in fade-in duration-300">

        {/* Header Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            onClick={() => setView("dashboard")}
            className="flex items-center gap-2 text-sm font-extrabold text-[#002d62] dark:text-blue-400 hover:underline transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            Back to Sales Executive Dashboard
          </button>

          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search objections..."
              value={objectionsSearchTerm}
              onChange={(e) => setObjectionsSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-semibold"
            />
          </div>
        </div>

        {/* List Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[24px] p-6 xl:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-50 dark:border-zinc-800/50 pb-4">
            <h2 className="text-lg font-black text-slate-800 dark:text-zinc-100 tracking-tight">
              Recent Objections
            </h2>
          </div>

          <div className="bg-slate-50/50 dark:bg-zinc-950/20 rounded-[20px] p-4 xl:p-6 space-y-3">
            {/* Header row */}
            <div className="grid grid-cols-3 text-[10px] font-extrabold text-slate-400 dark:text-zinc-500 tracking-wider uppercase px-6">
              <div>Customer Name</div>
              <div className="text-center">Last Contacted</div>
              <div className="text-center">Objections Count</div>
            </div>

            {/* Row cards */}
            {filteredObjections.length === 0 ? (
              <div className="py-12 text-center text-xs font-semibold text-slate-400 dark:text-zinc-500">
                No recent objections found
              </div>
            ) : (
              filteredObjections.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-3 items-center bg-white dark:bg-zinc-900 rounded-[18px] py-4.5 px-6 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <span className="font-bold text-sm text-slate-800 dark:text-zinc-100">{item.customerName}</span>
                  <div className="text-center text-sm font-semibold text-slate-500 dark:text-zinc-400">{item.lastContacted}</div>
                  <div className="text-center">
                    <span className="inline-block bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-black px-3.5 py-1.5 rounded-full border border-red-100 dark:border-red-900/40">
                      {item.objectionsCount} Objections
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-zinc-100 dark:border-zinc-800 pt-6 gap-4">
            <span className="text-[11px] font-extrabold text-slate-400 dark:text-zinc-500">
              Showing 1 - {filteredObjections.length} of {filteredObjections.length} Recent Objections
            </span>
          </div>
        </div>

      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] w-full space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002d62] dark:border-blue-400" />
        <span className="text-sm font-semibold text-slate-550 dark:text-zinc-400 animate-pulse">
          Loading Sales Executive dashboard...
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] w-full space-y-4 text-center">
        <div className="text-red-500 dark:text-red-400 text-lg font-bold">
          Failed to load Sales Executive dashboard data.
        </div>
        <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-md">
          Please check your connection or try selecting a different project/date filter.
        </p>
      </div>
    );
  }

  // ----------------------------------------------------
  // MAIN DASHBOARD VIEW
  // ----------------------------------------------------
  return (
    <div className="w-full max-w-[1440px] xl:max-w-[1920px] 2xl:max-w-[2560px] mx-auto space-y-6 xl:space-y-8 2xl:space-y-10 px-4 sm:px-6 md:px-8 py-6 animate-in fade-in duration-300">

      {/* Top Header Row (Outside the white card) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-black text-slate-850 dark:text-zinc-150 tracking-tight flex items-center gap-3">
          Sales Executive Dashboard
          {isFetching && (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#002d62] dark:border-blue-400 border-t-transparent" />
          )}
        </h1>

        {/* View EM's Button / Date Filter */}
        {["SADMIN", "ADMIN"].includes(roleCode) ? (
          <button
            onClick={() => setView("table")}
            className="bg-[#002d62] hover:bg-[#0c3669] text-white px-6 py-2.5 rounded-full text-xs font-extrabold transition-colors shadow-md cursor-pointer h-10 flex items-center justify-center"
          >
            View Sales Executives
          </button>
        ) : (
          <button
            onClick={() => {
              setDialogTabs(["date"]);
              setIsFilterDialogOpen(true);
            }}
            className="flex items-center gap-1.5 bg-slate-50 dark:bg-zinc-800/60 hover:bg-slate-100 dark:hover:bg-zinc-750/60 border border-slate-200/50 dark:border-zinc-700/50 px-3.5 py-2 rounded-xl text-xs font-extrabold text-slate-700 dark:text-zinc-300 transition-colors shadow-sm cursor-pointer h-10"
          >
            <CalendarIcon className="w-3.5 h-3.5 text-slate-450" />
            {formatSelectedSpan(startDate, endDate)}
          </button>
        )}
      </div>

      {/* Filter Panel (Inside white card wrapper) */}
      {["SADMIN", "ADMIN"].includes(roleCode) && (
        <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-3xl p-4 xl:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left Side: Managers Dropdown Filter — hidden for locked roles */}
          <div className="flex items-center">
            {!lockedEmId && !lockedRmId && (
              <span className="text-[10px] xl:text-xs tracking-wider font-extrabold text-slate-400 dark:text-zinc-555 uppercase mr-3">
                MANAGERS
              </span>
            )}
            {!lockedEmId && !lockedRmId && <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-2 bg-[#f0f4f8] dark:bg-zinc-850 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200/20 dark:border-zinc-800 px-4 py-2 rounded-xl text-xs font-extrabold text-[#002d62] dark:text-blue-400 transition-colors shadow-sm cursor-pointer"
                >
                  {selectedEmLabel === "All" ? "All Sales Executives" : selectedEmLabel}
                  <ChevronDown className="w-3.5 h-3.5 text-[#002d62] dark:text-blue-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[240px] bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-[16px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-2 space-y-1">
                <div
                  className="p-1 mb-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      placeholder="Search Sales Executive..."
                      value={emSearchQuery}
                      onChange={(e) => setEmSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === " ") {
                          e.stopPropagation();
                        }
                      }}
                      className="pl-9 pr-3 py-2 w-full bg-[#fcfcfc] dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800/80 rounded-[8px] text-xs font-semibold text-slate-700 dark:text-zinc-300 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-[#002d62] dark:focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <DropdownMenuItem
                  onClick={() => handleEmSelect({ id: null, name: "All" })}
                  className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer py-2.5 px-3 rounded-lg"
                >
                  <span>All Sales Executives</span>
                  <div className={cn(
                    "h-4.5 w-4.5 rounded-[4px] border flex items-center justify-center transition-all shrink-0",
                    selectedEmId === null
                      ? "bg-[#002d62] dark:bg-blue-600 border-[#002d62] dark:border-blue-600 text-white"
                      : "border-slate-350 dark:border-zinc-700 bg-transparent"
                  )}>
                    {selectedEmId === null && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                </DropdownMenuItem>

                <div className="border-b border-slate-100 dark:border-zinc-800 my-1"></div>

                <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                  SELECT SALES EXECUTIVE
                </div>

                <div className="max-h-56 overflow-y-auto space-y-0.5 scrollbar-thin">
                  {filteredEmUsers.length === 0 ? (
                    <div className="py-4 text-center text-xs font-semibold text-slate-400 dark:text-zinc-500">
                      No Sales Executives found
                    </div>
                  ) : filteredEmUsers.map((user: any) => {
                    const uName = user.name || `${user.first_name || ""} ${user.last_name || ""}`.trim();
                    const initials = `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase() || uName.slice(0, 2).toUpperCase();

                    const avatarColors = [
                      "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
                      "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400",
                      "bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400",
                      "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400",
                    ];
                    const avatarBg = avatarColors[user.id % avatarColors.length];

                    const isSelected = selectedEmId === user.id;

                    return (
                      <DropdownMenuItem
                        key={user.id}
                        onClick={() => handleEmSelect({ id: user.id, name: uName })}
                        className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer py-2 px-3 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn("w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px] shrink-0", avatarBg)}>
                            {initials}
                          </div>
                          <span className="truncate max-w-[120px]">{uName}</span>
                        </div>
                        <div className={cn(
                          "h-4.5 w-4.5 rounded-[4px] border flex items-center justify-center transition-all shrink-0",
                          isSelected
                            ? "bg-[#002d62] dark:bg-blue-600 border-[#002d62] dark:border-blue-600 text-white"
                            : "border-slate-350 dark:border-zinc-700 bg-transparent"
                        )}>
                          {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                        </div>
                      </DropdownMenuItem>
                    );
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>}
          </div>

          {/* Right Side: Project & Date Range Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Date Range Button */}
            <button
              onClick={() => {
                setDialogTabs(["date"]);
                setIsFilterDialogOpen(true);
              }}
              className="flex items-center gap-1.5 bg-slate-50 dark:bg-zinc-800/60 hover:bg-slate-100 dark:hover:bg-zinc-750/60 border border-slate-200/50 dark:border-zinc-700/50 px-3.5 py-2 rounded-xl text-xs font-extrabold text-slate-700 dark:text-zinc-300 transition-colors shadow-sm cursor-pointer"
            >
              <CalendarIcon className="w-3.5 h-3.5 text-slate-450" />
              {formatSelectedSpan(startDate, endDate)}
            </button>
          </div>
        </div>
      )}

      {/* Row 1: Missed Follow-ups, Today's Follow-ups Due, Lead Quality Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Missed Follow-ups Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[32px] p-6 shadow-sm flex flex-col justify-between min-h-[360px]">
          <div>
            <h2 className="text-[17px] font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
              Missed Follow-ups
            </h2>
          </div>

          <div className="my-auto py-2">
            <EMRadialRing value={emData.missedFollowUps.overdueCount} />
            <div className="text-center mt-2">
              <span className="inline-flex items-center gap-1.5 bg-[#fff1f2] dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 text-[#002d62] dark:text-blue-300 text-[10px] font-bold px-3.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#002d62] dark:bg-blue-400"></span>
                Avg. Delay: {emData.missedFollowUps.avgDelay}
              </span>
            </div>
          </div>

          <Button
            onClick={() => navigate("/follow-ups", { state: { tab: "Missed" } })}
            className="w-full bg-[#002d62] hover:bg-[#002d62]/90 text-white rounded-[16px] text-xs font-extrabold py-2.5 h-11 transition-all shadow-[0_4px_12px_rgba(0,45,98,0.15)]"
          >
            Resolve Now
          </Button>
        </div>

        {/* Today's Follow-ups Due Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[24px] p-6 shadow-sm flex flex-col min-h-[340px]">
          <div className="flex items-center justify-between border-b border-slate-50 dark:border-zinc-850 pb-3.5">
            <h2 className="text-sm xl:text-base font-extrabold uppercase tracking-wider text-slate-800 dark:text-zinc-100">
              Today's Follow-ups Due
            </h2>
            <button
              onClick={() => setView("followups")}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-4 mt-4">
            {emData.todayFollowUps.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[200px] text-slate-400 dark:text-zinc-500 font-semibold text-xs">
                No follow-ups data is available
              </div>
            ) : (
              emData.todayFollowUps.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-50/50 dark:bg-zinc-950/20 rounded-2xl p-3 border border-zinc-100/40 dark:border-zinc-800/40">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full ${item.avatarBg} flex items-center justify-center font-extrabold text-xs shrink-0`}>
                      {item.initials}
                    </div>
                    <div>
                      <span className="block text-xs font-extrabold text-slate-800 dark:text-zinc-150">{item.customerName}</span>
                      <span className="block text-[9px] font-bold text-slate-400 dark:text-zinc-500 mt-0.5">{item.details}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-black text-slate-800 dark:text-zinc-200">{item.time}</span>
                    <span className="block text-[9px] font-black text-[#002d62] dark:text-blue-400 uppercase mt-0.5">{item.action}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Lead Quality Distribution Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[32px] p-6 shadow-sm flex flex-col justify-between min-h-[360px]">
          <div>
            <h2 className="text-[17px] font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
              Lead Quality Distribution
            </h2>
          </div>

          <div className="my-auto">
            <EMQualityDistributionBarChart data={emData.leadQualityDistribution} />
          </div>
        </div>

      </div>

      {/* Row 2: Leads by Status & Site Visit Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Leads by Status Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[32px] p-6 lg:col-span-2 shadow-sm flex flex-col justify-between">
          <h2 className="text-[17px] font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
            Leads by Status
          </h2>

          <div className="my-auto py-2">
            <EMLeadsByStatusSegmentedBar statusData={emData.leadsByStatus} />
          </div>
        </div>

        {/* Site Visit Overview Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[32px] p-6 shadow-sm flex flex-col justify-between min-h-[160px]">
          <h2 className="text-[17px] font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
            Site Visit Overview
          </h2>

          <div className="grid grid-cols-2 gap-4 mt-4 my-auto">
            <div className="bg-slate-50/50 dark:bg-zinc-950/20 rounded-[20px] p-4 border border-zinc-200/60 dark:border-zinc-800/60 text-center">
              <span className="block text-[9px] font-extrabold text-slate-400 dark:text-zinc-500 tracking-wider uppercase">Scheduled</span>
              <span className="text-3xl font-black text-[#002d62] dark:text-blue-400 block mt-1">
                {emData.siteVisitOverview.scheduled}
              </span>
            </div>
            <div className="bg-slate-50/50 dark:bg-zinc-950/20 rounded-[20px] p-4 border border-zinc-200/60 dark:border-zinc-800/60 text-center">
              <span className="block text-[9px] font-extrabold text-slate-400 dark:text-zinc-500 tracking-wider uppercase">Completed</span>
              <span className="text-3xl font-black text-[#002d62] dark:text-blue-400 block mt-1">
                {emData.siteVisitOverview.completed}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Row 3: Site Visits Today, Recent Objections, Total Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Site Visits Today Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[32px] p-6 shadow-sm flex flex-col min-h-[340px]">
          <div className="flex items-center justify-between border-b border-slate-50 dark:border-zinc-850 pb-3.5">
            <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-[16px] leading-[24px] text-[#191C1E] dark:text-zinc-100 tracking-tight">
              Site Visits Today
            </h2>
            <button
              onClick={() => {
                if (selectedEmId) {
                  navigate(`/scheduled-visits/${selectedEmId}`);
                } else {
                  navigate("/scheduled-visits");
                }
              }}
              className="font-['Plus_Jakarta_Sans'] font-bold text-[12px] leading-[18px] text-[#001549] hover:text-[#001549]/80 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer hover:underline"
            >
              View All
            </button>
          </div>

          <div className="mt-4 space-y-0 pl-1">
            {emData.siteVisitsToday.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[200px] text-slate-400 dark:text-zinc-500 font-semibold text-xs">
                No site visits today
              </div>
            ) : (
              emData.siteVisitsToday.slice(0, 3).map((visit, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === emData.siteVisitsToday.slice(0, 3).length - 1;
                return (
                  <div key={idx} className="flex gap-4 min-h-[72px] last:min-h-0 relative">
                    {/* Left: Timeline indicator */}
                    <div className="relative flex flex-col items-center w-2 shrink-0">
                      {/* The Dot */}
                      <div className="w-[6px] h-[6px] rounded-full bg-[#001549] dark:bg-blue-500 shrink-0 z-10 mt-[4px]" />

                      {/* The connecting line (skip for last item) */}
                      {!isLast && <div className="absolute top-[8px] bottom-[-24px] w-[1px] bg-[#E1E5ED] dark:bg-zinc-800" />}
                    </div>

                    {/* Right: Visit info */}
                    <div className="pb-6 last:pb-0 flex flex-col justify-start">
                      <span className="block font-['Plus_Jakarta_Sans'] font-bold text-[10px] leading-[14px] text-[#001549] dark:text-blue-400 uppercase">{visit.time}</span>
                      <span className="block font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] text-[#191C1E] dark:text-zinc-100 mt-1">{visit.customerName}</span>
                      <span className="block font-['Inter'] font-normal text-[12px] leading-[18px] text-[#575E70] dark:text-zinc-400 mt-0.5">{visit.details}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Recent Objections Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[32px] p-6 shadow-sm flex flex-col min-h-[340px]">
          <div className="flex items-center justify-between border-b border-slate-50 dark:border-zinc-850 pb-3.5">
            <h2 className="text-[17px] font-bold text-slate-900 dark:text-zinc-100 tracking-tight">
              Recent Objections
            </h2>
            <button
              onClick={() => setIsObjectionsModalOpen(true)}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-4 mt-4">
            {emData.recentObjections.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[200px] text-slate-400 dark:text-zinc-500 font-semibold text-xs">
                No recent objections available
              </div>
            ) : emData.recentObjections.slice(0, 3).map((item, idx) => (
              <div key={idx} className="relative flex items-center justify-between bg-slate-50/50 dark:bg-zinc-950/20 rounded-2xl p-3 border border-zinc-100/40 dark:border-zinc-800/40">
                <div>
                  <span className="block text-xs font-extrabold text-slate-800 dark:text-zinc-150">{item.customerName}</span>
                  <span className="block text-[9px] font-bold text-slate-400 dark:text-zinc-500 mt-0.5">{item.lastContacted}</span>
                </div>

                {/* Pill trigger */}
                <div
                  onMouseEnter={() => setHoveredObjectionIdx(idx)}
                  onMouseLeave={() => setHoveredObjectionIdx(null)}
                  className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#002d62] dark:border-blue-800 shadow-sm text-xs font-black transition-all duration-150 cursor-pointer ${hoveredObjectionIdx === idx
                    ? "bg-[#002d62] text-white"
                    : "bg-white dark:bg-zinc-900 text-[#002d62] dark:text-blue-400"
                    }`}
                >
                  <span>{item.objectionsCount}</span>
                  <img
                    src="/icons/objection-sparkle.png"
                    alt="sparkle"
                    className={`w-3.5 h-3.5 object-contain transition-all duration-150 ${hoveredObjectionIdx === idx
                      ? "brightness-0 invert"
                      : ""
                      }`}
                  />
                </div>

                {/* Popover Tooltip */}
                {hoveredObjectionIdx === idx && (
                  <div className="absolute bottom-full right-3 mb-2 w-52 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 p-4 shadow-xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
                    <h3 className="text-[10px] font-black text-[#002d62] dark:text-blue-400 tracking-wider uppercase mb-3">
                      RECENT OBJECTIONS
                    </h3>
                    <ul className="space-y-2">
                      {(item.objectionTypes && item.objectionTypes.length > 0
                        ? item.objectionTypes
                        : ["Has Budget Limitation", ...Array(Math.max(0, item.objectionsCount - 1)).fill("Objection Name")]
                      ).map((objection, oIdx) => (
                        <li key={oIdx} className="flex items-start gap-2 text-[11px] font-bold text-slate-655 dark:text-zinc-350">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#002d62] dark:bg-blue-500 mt-1 shrink-0" />
                          <span>{objection}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Total Bookings Card */}
        <div className="bg-[#002d62] dark:bg-zinc-950 border border-[#002d62] dark:border-zinc-900 rounded-[32px] p-6 shadow-md text-white flex flex-col justify-between min-h-[340px]">
          <div>
            <h2 className="text-[17px] font-bold text-white tracking-tight text-center">
              Total Bookings
            </h2>
          </div>

          <div className="my-auto">
            <EMTotalBookingsRing units={emData.totalBookings.units} />
            <div className="text-center mt-2.5">
              <span className="block text-xs font-black uppercase tracking-widest text-white">
                UNITS
              </span>
              <span className="block text-xs font-medium italic text-blue-200 dark:text-zinc-400 mt-1">
                Achieved
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Filter dialog component */}
      <ReportFilterDialog
        open={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
        tabs={dialogTabs}
        onApply={(filters) => {
          if (filters.projectIds) {
            setAppliedProjectIds(filters.projectIds);
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
          setAppliedProjectIds([]);
          setStartDate(null);
          setEndDate(null);
          setIsFilterDialogOpen(false);
        }}
        projectOptions={projectOptionsForDialog}
        appliedProjectIds={appliedProjectIds.length > 0 ? appliedProjectIds : [resolvedProjectId]}
        appliedStartDate={startDate}
        appliedEndDate={endDate}
      />
      {/* Centered Recent Objections Modal */}
      {isObjectionsModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => {
              setIsObjectionsModalOpen(false);
              setHoveredModalObjectionIdx(null);
            }}
          />

          {/* Modal Container */}
          <div className="bg-white dark:bg-zinc-900 rounded-[28px] w-full max-w-[380px] overflow-visible border border-slate-100 dark:border-zinc-800 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200 mx-4">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 dark:border-zinc-800/80">
              <h3 className="text-base font-extrabold text-slate-800 dark:text-zinc-100 tracking-tight">Recent Objections</h3>
              <button
                onClick={() => {
                  setIsObjectionsModalOpen(false);
                  setHoveredModalObjectionIdx(null);
                }}
                className="text-slate-400 hover:text-slate-600 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* List Body */}
            <div className="p-5 max-h-[380px] overflow-y-auto space-y-4">
              {emData.recentObjections.length === 0 ? (
                <div className="text-center py-8 text-xs font-semibold text-slate-400">
                  No objections found
                </div>
              ) : (
                emData.recentObjections.map((item: any, idx: number) => {
                  // Fallbacks for RM name and project name matching the mockups
                  const projectName = item.projectName || (idx % 3 === 0 ? "Planet Green" : idx % 3 === 1 ? "Farm Natura" : "Eco World");
                  const rmName = item.rmName || (idx % 3 === 0 ? "Ramesh Kumar" : idx % 3 === 1 ? "Swathi V" : "Amit Saxena");

                  return (
                    <div
                      key={idx}
                      className="relative flex items-center justify-between bg-slate-50/50 dark:bg-zinc-950/20 rounded-2xl p-3 border border-zinc-100/40 dark:border-zinc-800/40"
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="text-[11px] font-black text-slate-800 dark:text-zinc-100 truncate">
                          {item.customerName}
                        </span>
                        <div className="flex flex-col mt-0.5">
                          <span className="text-[9px] font-extrabold text-slate-700 dark:text-zinc-300">
                            {projectName}
                          </span>
                          <span className="text-[8px] font-bold text-slate-400 dark:text-zinc-500">
                            RM: {rmName}
                          </span>
                        </div>
                      </div>

                      {/* Pill trigger */}
                      <div
                        onMouseEnter={() => setHoveredModalObjectionIdx(idx)}
                        onMouseLeave={() => setHoveredModalObjectionIdx(null)}
                        className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#002d62] dark:border-blue-800 shadow-sm text-[10px] font-black transition-all duration-150 cursor-pointer ${hoveredModalObjectionIdx === idx
                          ? "bg-[#002d62] text-white"
                          : "bg-white dark:bg-zinc-900 text-[#002d62] dark:text-blue-400"
                          }`}
                      >
                        <span>{item.objectionsCount}</span>
                        <img
                          src="/icons/objection-sparkle.png"
                          alt="sparkle"
                          className={`w-3.5 h-3.5 object-contain transition-all duration-150 ${hoveredModalObjectionIdx === idx
                            ? "brightness-0 invert"
                            : ""
                            }`}
                        />
                      </div>

                      {/* Popover Tooltip */}
                      {hoveredModalObjectionIdx === idx && (
                        <div className="absolute bottom-full right-3 mb-2 w-52 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 p-4 shadow-xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
                          <h3 className="text-[9px] font-black text-[#002d62] dark:text-blue-400 tracking-wider uppercase mb-3">
                            RECENT OBJECTIONS
                          </h3>
                          <ul className="space-y-2">
                            {(item.objectionTypes && item.objectionTypes.length > 0
                              ? item.objectionTypes
                              : ["Has Budget Limitation", ...Array(Math.max(0, item.objectionsCount - 1)).fill("Objection Name")]
                            ).map((objection: string, oIdx: number) => (
                              <li key={oIdx} className="flex items-start gap-2 text-[10px] font-bold text-slate-650 dark:text-zinc-350">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#002d62] dark:bg-blue-500 mt-1 shrink-0" />
                                <span>{objection}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
