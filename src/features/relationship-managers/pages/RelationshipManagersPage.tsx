import React, { useState, useMemo, useEffect } from "react";
import {
  ChevronRight,
  SlidersHorizontal,
  Calendar as CalendarIcon,
  ArrowLeft,
  ExternalLink,
  Search,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Users,
  ChevronDown,
  Check
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetAllMasterDataQuery } from "../../master/api/masterApi";
import { useGetAllUsersByRoleIdQuery, useGetRmDashboardDateWiseDataQuery, useGetStaleLeadsQuery, useGetEscalatedLeadsQuery } from "../../users/api/usersApi";
import { UsersFeaturePage } from "../../users/pages/UsersFeaturePage";
import { ReportFilterDialog } from "../../reports/components/ReportFilterDialog";
import type { FilterTab } from "../../reports/components/ReportFilterDialog";
import { LeadQualityDistribution } from "../../project-analytics/components/LeadQualityDistribution";
import { ReportProgressBar } from "../../reports/components/ReportProgressBar";
import { usePermissions } from "../../../hooks/usePermissions";
import { Dialog, DialogContent, DialogTitle } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
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

interface RelationshipManagersPageProps {
  /** When set, the page is locked to this RM ID and the RM selector dropdown is hidden */
  lockedRmId?: number;
}

export const RelationshipManagersPage: React.FC<RelationshipManagersPageProps> = ({ lockedRmId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { roleCode } = usePermissions();
  const [view, setView] = useState<"dashboard" | "leaderboard" | "escalations" | "stale" | "table">("dashboard");

  useEffect(() => {
    if (location.pathname.endsWith("/stale")) {
      setView("stale");
    } else if (location.pathname.endsWith("/escalated") || location.pathname.endsWith("/escalations")) {
      setView("escalations");
    } else if (location.pathname.endsWith("/leaderboard")) {
      setView("leaderboard");
    } else if (location.pathname.endsWith("/table")) {
      setView("table");
    } else {
      setView("dashboard");
    }
  }, [location.pathname]);
  const { data: masterData } = useGetAllMasterDataQuery();

  // Dialog & Filter States
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [dialogTabs, setDialogTabs] = useState<FilterTab[]>(["date"]);
  const [appliedProjectIds, setAppliedProjectIds] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Search & Pagination States for Detailed Views
  const [searchTerm, setSearchTerm] = useState("");
  const [escalationsSearchTerm, setEscalationsSearchTerm] = useState("");
  const [staleSearchTerm, setStaleSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Status wise leads popup states & data
  const [isStatusPopupOpen, setIsStatusPopupOpen] = useState(false);
  const [popupSearch, setPopupSearch] = useState("");
  const [selectedRmLabel, setSelectedRmLabel] = useState("All");
  const [selectedRmId, setSelectedRmId] = useState<number | null>(lockedRmId ?? null);
  const [rmSearchQuery, setRmSearchQuery] = useState("");

  // Fetch Relationship Manager users
  const { data: rmUsers = [] } = useGetAllUsersByRoleIdQuery({
    role_id: 3,
    offset: 0,
  });


  const getProgressBarColor = (label: string) => {
    const cleanLabel = label.toUpperCase();
    if (cleanLabel.includes("NEW LEAD")) return "bg-[#093466]";
    if (cleanLabel.includes("SITE VISIT SCHEDULED")) return "bg-[#3f5a9e]";
    if (cleanLabel.includes("SITE VISIT DONE")) return "bg-[#5c677d]";
    if (cleanLabel.includes("CLOSED/WON")) return "bg-[#10b981]";
    return "bg-[#0f3d6b]"; // fallback
  };

  // Default Planet Green project ID resolution
  const resolvedProjectId = useMemo(() => {
    if (masterData?.projects && masterData.projects.length > 0) {
      const pgProject = masterData.projects.find((p: any) =>
        p.description.toLowerCase().includes("planet green")
      );
      return pgProject ? String(pgProject.id) : String(masterData.projects[0].id);
    }
    return "1"; // Fallback ID
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


  const rmIds = useMemo(() => {
    return rmUsers.map((u: any) => u.id);
  }, [rmUsers]);

  const filteredRmUsers = useMemo(() => {
    return rmUsers.filter((user: any) => {
      const uName = (user.name || `${user.first_name || ""} ${user.last_name || ""}`).trim().toLowerCase();
      return uName.includes(rmSearchQuery.toLowerCase());
    });
  }, [rmUsers, rmSearchQuery]);

  const formatDateForApi = (date: Date | null): string => {
    if (!date) return "";
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const formattedStartDate = useMemo(() => formatDateForApi(startDate), [startDate]);
  const formattedEndDate = useMemo(() => formatDateForApi(endDate), [endDate]);

  const {
    data: rmDashboardApiResponse,
    isLoading: isApiLoading,
    isFetching,
    error: apiError,
  } = useGetRmDashboardDateWiseDataQuery(
    {
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      rm_ids: selectedRmId ? [selectedRmId] : rmIds,
    },
    { skip: rmIds.length === 0 }
  );

  // Fetch Experience Manager users (role 4) to query stale and escalated leads
  const { data: emUsers = [] } = useGetAllUsersByRoleIdQuery({
    role_id: 4,
    offset: 0,
  });

  const emIds = useMemo(() => {
    return emUsers.map((u: any) => u.id);
  }, [emUsers]);

  const { data: staleResponse } = useGetStaleLeadsQuery(
    {
      em_ids: emIds,
      user_ids: selectedRmId ? [selectedRmId] : rmIds,
      limit: 200,
      offset: 0,
    },
    { skip: rmIds.length === 0 || emIds.length === 0 }
  );

  const { data: escalatedResponse } = useGetEscalatedLeadsQuery(
    {
      em_ids: emIds,
      user_ids: selectedRmId ? [selectedRmId] : rmIds,
    },
    { skip: rmIds.length === 0 || emIds.length === 0 }
  );

  // Merge/Map API Response
  const rmData = useMemo(() => {
    if (!rmDashboardApiResponse) {
      return {
        teamCallsSummary: { connectedCalls: 0, missedCalls: 0, avgDuration: "—" },
        teamWideLeadStatus: [],
        leadQuality: { hot: 0, warm: 0, cold: 0, junk: 0, activeRate: 0 },
        topPerformers: [],
        escalated: { count: 0 },
        stale: { count: 0 },
        topObjections: [],
        topBookings: [],
      };
    }

    // 1. Team Calls Summary
    const apiCalls = rmDashboardApiResponse.team_call_summary;
    const teamCallsSummary = {
      connectedCalls: apiCalls?.total_calls ?? apiCalls?.connected_calls ?? 0,
      missedCalls: apiCalls?.missed_calls ?? 0,
      avgDuration: apiCalls?.avg_duration ?? apiCalls?.avgDuration ?? "—",
    };

    // 2. Team Wide Lead Status (pipeline_funnel_information)
    let teamWideLeadStatus: Array<{ label: string; count: number; percentage: number }> = [];
    if (Array.isArray(rmDashboardApiResponse.pipeline_funnel_information)) {
      teamWideLeadStatus = (rmDashboardApiResponse.pipeline_funnel_information as any[]).map((item) => {
        const nameVal = item.name || item.status_name || (item.status_id ? `Status ${item.status_id}` : "Unknown");
        const countVal = typeof item.count === "string" ? parseInt(item.count, 10) : (item.count || 0);
        return {
          label: String(nameVal).toUpperCase(),
          count: isNaN(countVal) ? 0 : countVal,
          percentage: 0
        };
      });
      const totalCount = teamWideLeadStatus.reduce((acc, curr) => acc + curr.count, 0);
      teamWideLeadStatus = teamWideLeadStatus.map(status => ({
        ...status,
        percentage: totalCount > 0 ? Math.round((status.count / totalCount) * 100) : 0
      }));
    }

    // 3. Lead Quality (lead_quality_distribution)
    const apiQuality = rmDashboardApiResponse.lead_quality_distribution as any;
    let hot = 0;
    let warm = 0;
    let cold = 0;
    let junk = 0;
    let activeRate = 0;

    if (apiQuality) {
      if (Array.isArray(apiQuality)) {
        const hotObj = apiQuality.find((item: any) => item.name?.toLowerCase() === "hot" || item.label?.toLowerCase() === "hot");
        const warmObj = apiQuality.find((item: any) => item.name?.toLowerCase() === "warm" || item.label?.toLowerCase() === "warm");
        const coldObj = apiQuality.find((item: any) => item.name?.toLowerCase() === "cold" || item.label?.toLowerCase() === "cold");
        const junkObj = apiQuality.find((item: any) => item.name?.toLowerCase() === "junk" || item.label?.toLowerCase() === "junk" || item.name?.toLowerCase() === "nurture" || item.label?.toLowerCase() === "nurture");

        const hotCount = hotObj?.count ?? hotObj?.no_of_leads ?? hotObj?.value ?? 0;
        const warmCount = warmObj?.count ?? warmObj?.no_of_leads ?? warmObj?.value ?? 0;
        const coldCount = coldObj?.count ?? coldObj?.no_of_leads ?? coldObj?.value ?? 0;
        const junkCount = junkObj?.count ?? junkObj?.no_of_leads ?? junkObj?.value ?? 0;

        const total = hotCount + warmCount + coldCount + junkCount;
        if (total > 0) {
          hot = Math.round((hotCount / total) * 100);
          warm = Math.round((warmCount / total) * 100);
          cold = Math.round((coldCount / total) * 100);
          junk = Math.round((junkCount / total) * 100);
          activeRate = Math.round(((hotCount + warmCount + coldCount) / total) * 100);
        }
      } else {
        const hotCount = apiQuality.hot_leads ?? apiQuality.hot ?? apiQuality.hot_count ?? apiQuality.hotCount ?? 0;
        const warmCount = apiQuality.warm_leads ?? apiQuality.warm ?? apiQuality.warm_count ?? apiQuality.warmCount ?? 0;
        const coldCount = apiQuality.cold_leads ?? apiQuality.cold ?? apiQuality.cold_count ?? apiQuality.coldCount ?? 0;
        const junkCount = apiQuality.junk_leads ?? apiQuality.junk ?? apiQuality.junk_count ?? apiQuality.junkCount ?? 0;

        const total = apiQuality.total_leads ?? apiQuality.total ?? apiQuality.total_count ?? apiQuality.totalCount ?? (
          hotCount + warmCount + coldCount + junkCount
        );
        if (total > 0) {
          hot = Math.round((hotCount / total) * 100);
          warm = Math.round((warmCount / total) * 100);
          cold = Math.round((coldCount / total) * 100);
          junk = Math.round((junkCount / total) * 100);
          activeRate = Math.round(((hotCount + warmCount + coldCount) / total) * 100);
        }
      }
    }

    // 4. Top Performers (top_performer_leaderboard)
    const apiLeaderboard = rmDashboardApiResponse.top_performer_leaderboard ?? (rmDashboardApiResponse as any).top_performer_leader_board;
    let topPerformers: any[] = [];
    if (Array.isArray(apiLeaderboard)) {
      topPerformers = apiLeaderboard.map((item: any, idx: number) => ({
        rank: item.rank ?? (idx + 1),
        name: item.name || `${item.em_frist_name || item.first_name || ""} ${item.em_last_name || item.last_name || ""}`.trim() || `EM ${idx + 1}`,
        avatarUrl: item.profile_url ?? item.avatar_url ?? item.avatarUrl ?? "",
        leads: item.no_of_leads ?? item.leads ?? 0,
        followUp: parseFloat(item.followup_percentage ?? item.followup_perc ?? item.follow_up_percentage ?? item.follow_up_perc ?? item.follow_up ?? item.followup ?? item.followUp ?? "0") || 0,
        visits: item.site_visit_count ?? item.site_visits ?? item.visit_count ?? item.visits ?? 0,
        conversionRate: parseFloat(item.conversion_percentage ?? item.conversion_perc ?? item.conv_percentage ?? item.conv_rate ?? item.conversion_rate ?? item.conversionRate ?? "0") || 0,
      }));
    }

    // 5. Escalated & Stale counts
    const escalated = {
      count: escalatedResponse?.total_count ?? rmDashboardApiResponse?.escalated?.count ?? 0
    };
    const stale = {
      count: staleResponse?.total_count ?? rmDashboardApiResponse?.stale?.count ?? 0
    };

    // 6. Top Objections
    let topObjections: any[] = [];
    if (Array.isArray(rmDashboardApiResponse.top_objections)) {
      const totalCount = rmDashboardApiResponse.top_objections.reduce((acc: number, curr: any) => acc + (curr.count ?? curr.value ?? curr.percentage ?? 0), 0);
      topObjections = rmDashboardApiResponse.top_objections.map((item: any) => {
        const count = item.count ?? item.value ?? item.percentage ?? 0;
        const pct = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
        return {
          label: item.label || item.name || item.objection_name || item.objection || "Unknown",
          percentage: pct
        };
      });
      // Sort objections by percentage descending
      topObjections.sort((a, b) => b.percentage - a.percentage);
    }

    // 7. Top Bookings
    let topBookings: any[] = [];
    const apiTopBookings = rmDashboardApiResponse.top_bookings ?? (rmDashboardApiResponse as any).topBookings ?? (rmDashboardApiResponse as any).top_booking ?? (rmDashboardApiResponse as any).total_bookings ?? (rmDashboardApiResponse as any).bookings;
    if (Array.isArray(apiTopBookings)) {
      topBookings = apiTopBookings.map((item: any) => ({
        name: item.name || `${item.em_frist_name || item.first_name || ""} ${item.em_last_name || item.last_name || ""}`.trim() || "Unknown EM",
        role: item.role || "EXPERIENCE MANAGER",
        bookings: item.bookings ?? item.booking_count ?? item.count ?? item.total_bookings ?? 0
      }));
    }

    return {
      teamCallsSummary,
      teamWideLeadStatus,
      leadQuality: {
        hot,
        warm,
        cold,
        junk,
        activeRate,
      },
      topPerformers,
      escalated,
      stale,
      topObjections,
      topBookings,
    };
  }, [rmDashboardApiResponse, staleResponse, escalatedResponse, selectedRmId]);

  const filteredStatuses = useMemo(() => {
    return rmData?.teamWideLeadStatus.filter(s =>
      s.label.toLowerCase().includes(popupSearch.toLowerCase())
    ) || [];
  }, [rmData, popupSearch]);

  const handleRmSelect = (rm: { id: number | null; name: string }) => {
    setSelectedRmLabel(rm.name);
    setSelectedRmId(rm.id);
  };

  const handleRmRowClick = (name: string) => {
    const found = rmUsers.find((u: any) => {
      const uName = u.name || `${u.first_name || ""} ${u.last_name || ""}`.trim();
      return uName.toLowerCase() === name.toLowerCase();
    });
    if (found) {
      navigate("/leads", { state: { rmId: found.id, fromRMDashboard: true } });
    } else {
      navigate("/leads", { state: { fromRMDashboard: true } });
    }
  };

  // Detailed Leaderboard list data - derived from API data
  const avatarBgColors = [
    "bg-blue-100 text-blue-750",
    "bg-emerald-100 text-emerald-755",
    "bg-indigo-100 text-indigo-750",
    "bg-sky-100 text-sky-750",
    "bg-purple-100 text-purple-750",
    "bg-pink-100 text-pink-755",
    "bg-teal-100 text-teal-750",
  ];

  const fullLeaderboardList = useMemo(() => {
    return rmData.topPerformers.map((rm, idx) => ({
      name: rm.name || "Unknown",
      avatarBg: avatarBgColors[idx % avatarBgColors.length],
      leads: rm.leads,
      followUps: `${rm.followUp}%`,
      visits: rm.visits,
      convRate: `${rm.conversionRate}%`,
      bookings: 0,
    }));
  }, [rmData.topPerformers]);

  const filteredLeaderboardList = useMemo(() => {
    return fullLeaderboardList.filter(item =>
      (item.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, fullLeaderboardList]);

  const getEmName = (emId?: number) => {
    if (!emId) return "—";
    const found = emUsers.find((u) => u.id === emId);
    if (found) {
      return `${found.first_name || ""} ${found.last_name || ""}`.trim();
    }
    return `EM #${emId}`;
  };

  // Detailed Active Escalations list data
  const escalationsList = useMemo(() => {
    if (!escalatedResponse || !Array.isArray(escalatedResponse.data)) {
      return [];
    }

    return escalatedResponse.data.map((item) => {
      const emName = getEmName(item.em_id);
      return {
        id: item.lead_id ? (item.lead_id.startsWith("#") ? item.lead_id : `#${item.lead_id}`) : `#${item.lead_uuid?.slice(0, 8) || ""}`,
        uuid: item.lead_uuid || item.lead_id || "",
        customerName: `${item.first_name || ""} ${item.last_name || ""}`.trim() || "Customer",
        phone: item.phone_number || "—",
        email: item.email || "—",
        project: item.project_name || "—",
        status: (item.status || "NEW LEAD").toUpperCase(),
        reason: item.reason || "No response",
        em: emName,
      };
    });
  }, [escalatedResponse, emUsers]);

  const filteredEscalationsList = useMemo(() => {
    return escalationsList.filter(item =>
      (item.customerName || "").toLowerCase().includes(escalationsSearchTerm.toLowerCase()) ||
      (item.em || "").toLowerCase().includes(escalationsSearchTerm.toLowerCase()) ||
      (item.id || "").toLowerCase().includes(escalationsSearchTerm.toLowerCase())
    );
  }, [escalationsSearchTerm, escalationsList]);

  // Detailed Stale Queue list data
  const staleList = useMemo(() => {
    if (!staleResponse || !Array.isArray(staleResponse.data)) {
      return [];
    }

    return staleResponse.data.map((item) => {
      const emName = getEmName(item.em_id);
      return {
        id: item.lead_id ? (item.lead_id.startsWith("#") ? item.lead_id : `#${item.lead_id}`) : `#${item.lead_uuid?.slice(0, 8) || ""}`,
        uuid: item.lead_uuid || item.lead_id || "",
        customerName: `${item.frist_name || item.first_name || ""} ${item.last_name || ""}`.trim() || "Customer",
        phone: item.phone_number || "—",
        email: item.email1 || item.email || "—",
        project: item.project_name || "—",
        status: (item.status || "NEW LEAD").toUpperCase(),
        idle: item.duration ? (item.duration.toLowerCase().includes("idle") ? item.duration : `Idle for ${item.duration}`) : "Idle",
        em: emName,
      };
    });
  }, [staleResponse, emUsers]);

  const filteredStaleList = useMemo(() => {
    return staleList.filter(item =>
      (item.customerName || "").toLowerCase().includes(staleSearchTerm.toLowerCase()) ||
      (item.em || "").toLowerCase().includes(staleSearchTerm.toLowerCase()) ||
      (item.id || "").toLowerCase().includes(staleSearchTerm.toLowerCase())
    );
  }, [staleSearchTerm, staleList]);

  if (view === "leaderboard") {
    return (
      <div className="w-full max-w-[1440px] xl:max-w-[1920px] 2xl:max-w-[2560px] mx-auto space-y-6 px-4 sm:px-6 md:px-8 py-6 animate-in fade-in duration-300">

        {/* Leaderboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            onClick={() => navigate("/relationship-managers")}
            className="flex items-center gap-2 text-sm font-extrabold text-[#002d62] dark:text-blue-400 hover:underline transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            Back to Sales Head Dashboard
          </button>

          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search sales heads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-semibold"
            />
          </div>
        </div>        {/* Detailed Leaderboard Table */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[24px] p-6 xl:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-50 dark:border-zinc-800/50 pb-4">
            <h2 className="text-lg font-black text-slate-800 dark:text-zinc-100 tracking-tight">
              Top Performer Leaderboard
            </h2>
          </div>

          <div className="bg-slate-50/50 dark:bg-zinc-950/20 rounded-[20px] p-4 xl:p-6 space-y-3">
            {/* Header row */}
            <div className="grid grid-cols-6 text-[10px] font-extrabold text-slate-400 dark:text-zinc-500 tracking-wider uppercase px-6">
              <div>Sales Head Name</div>
              <div className="text-center">Leads</div>
              <div className="text-center">Follow Ups</div>
              <div className="text-center">Visits</div>
              <div className="text-center">Conv.Rate</div>
              <div className="text-center">Bookings</div>
            </div>

            {/* Row cards */}
            {filteredLeaderboardList.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleRmRowClick(item.name)}
                className="grid grid-cols-6 items-center bg-white dark:bg-zinc-900 rounded-[18px] py-4.5 px-6 shadow-sm hover:shadow-md hover:scale-[1.005] cursor-pointer transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${item.avatarBg} flex items-center justify-center font-extrabold text-xs shrink-0`}>
                    {item.name.split(" ").map((n: string) => n[0]).join("")}
                  </div>
                  <span className="font-bold text-sm text-slate-800 dark:text-zinc-100">{item.name}</span>
                </div>
                <div className="text-center text-sm font-bold text-slate-800 dark:text-zinc-200">{item.leads}</div>
                <div className="text-center text-sm font-semibold text-slate-600 dark:text-zinc-400">{item.followUps}</div>
                <div className="text-center text-sm font-semibold text-slate-600 dark:text-zinc-400">{item.visits}</div>
                <div className="text-center text-sm font-semibold text-slate-600 dark:text-zinc-400">{item.convRate}</div>
                <div className="text-center text-sm font-semibold text-slate-600 dark:text-zinc-400">{item.bookings}</div>
              </div>
            ))}
          </div>

          {/* Table Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-zinc-100 dark:border-zinc-800 pt-6 gap-4">
            <span className="text-[11px] font-extrabold text-slate-400 dark:text-zinc-500">
              Showing 1 - {filteredLeaderboardList.length} of {filteredLeaderboardList.length} Sales Heads
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-zinc-450">
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors text-slate-400">
                &lt; Previous
              </button>
              <button className="w-8 h-8 bg-[#002d62] text-white rounded-lg font-bold flex items-center justify-center shadow-sm">
                1
              </button>
              <button className="w-8 h-8 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-lg flex items-center justify-center transition-colors">
                2
              </button>
              <button className="w-8 h-8 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-lg flex items-center justify-center transition-colors">
                3
              </button>
              <span className="px-1 text-slate-350">...</span>
              <button className="w-8 h-8 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-lg flex items-center justify-center transition-colors">
                1284
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors text-slate-800 dark:text-zinc-200">
                Next &gt;
              </button>
            </div>
          </div>
        </div>

      </div>
    );
  }

  if (view === "table") {
    return (
      <div className="w-full max-w-[1440px] xl:max-w-[1920px] 2xl:max-w-[2560px] mx-auto space-y-6 px-4 sm:px-6 md:px-8 py-6 animate-in fade-in duration-300">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/relationship-managers")}
            className="flex items-center gap-2 text-sm font-extrabold text-[#002d62] dark:text-blue-400 hover:underline transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            Back to Sales Head Dashboard
          </button>
        </div>

        <UsersFeaturePage
          roleId={3}
          roleLabel="Sales Head"
          title="Sales Heads"
          description="Manage Sales Heads registry and view their assigned leads."
          permissionPrefix="manager"
        />
      </div>
    );
  }

  if (view === "escalations") {
    return (
      <div className="w-full max-w-[1440px] xl:max-w-[1920px] 2xl:max-w-[2560px] mx-auto space-y-6 px-4 sm:px-6 md:px-8 py-6 animate-in fade-in duration-300">

        {/* Escalations Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            onClick={() => navigate("/relationship-managers")}
            className="flex items-center gap-2 text-sm font-extrabold text-[#002d62] dark:text-blue-400 hover:underline transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            Back to Sales Head Dashboard
          </button>

          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search sales heads..."
              value={escalationsSearchTerm}
              onChange={(e) => setEscalationsSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-semibold"
            />
          </div>
        </div>

        {/* Detailed Table Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[24px] p-6 xl:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-50 dark:border-zinc-800/50 pb-4">
            <h2 className="text-lg font-black text-slate-800 dark:text-zinc-100 tracking-tight">
              Active Escalations
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800 text-[10px] font-extrabold text-slate-400 dark:text-zinc-500 tracking-wider uppercase">
                  <th className="py-4 px-4">Lead ID</th>
                  <th className="py-4 px-4">Customer Name</th>
                  <th className="py-4 px-4">Contact Details</th>
                  <th className="py-4 px-4">Project</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Escalation Reason</th>
                  <th className="py-4 px-4">Assigned EM</th>
                  <th className="py-4 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50 dark:divide-zinc-850 text-xs font-bold text-slate-700 dark:text-zinc-300">
                {filteredEscalationsList.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400 dark:text-zinc-500 font-semibold">
                      No active escalations found
                    </td>
                  </tr>
                ) : (
                  filteredEscalationsList.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/55 dark:hover:bg-zinc-800/40 transition-colors">
                      <td className="py-4 px-4 font-bold text-zinc-400 dark:text-zinc-655">{item.id}</td>
                      <td className="py-4 px-4 font-extrabold text-slate-800 dark:text-zinc-100">{item.customerName}</td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span>{item.phone}</span>
                          <span className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5">{item.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">{item.project}</td>
                      <td className="py-4 px-4">
                        <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[10px] font-black px-2.5 py-1 rounded-[6px]">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-500 dark:text-zinc-400 font-semibold">{item.reason}</td>
                      <td className="py-4 px-4">{item.em}</td>
                      <td className="py-4 px-4 text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/leads/${item.uuid || item.id}`)}
                          className="h-8 text-[11px] font-bold uppercase rounded-xl border-zinc-200 dark:border-zinc-800 text-primary hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all px-4 shadow-none"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-zinc-100 dark:border-zinc-800 pt-6 gap-4">
            <span className="text-[11px] font-extrabold text-slate-400 dark:text-zinc-500">
              Showing 1 - {filteredEscalationsList.length} of {filteredEscalationsList.length} Active Escalations
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg border-zinc-200 dark:border-zinc-800 shrink-0">
                <ChevronLeft className="w-3.5 h-3.5" />
              </Button>
              <button className="w-8 h-8 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm shadow-blue-500/20">
                1
              </button>
              <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg border-zinc-200 dark:border-zinc-800 shrink-0">
                <ChevronRightIcon className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>

      </div>
    );
  }

  if (view === "stale") {
    return (
      <div className="w-full max-w-[1440px] xl:max-w-[1920px] 2xl:max-w-[2560px] mx-auto space-y-6 px-4 sm:px-6 md:px-8 py-6 animate-in fade-in duration-300">

        {/* Stale Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            onClick={() => navigate("/relationship-managers")}
            className="flex items-center gap-2 text-sm font-extrabold text-[#002d62] dark:text-blue-400 hover:underline transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500" />
            Back to Sales Head Dashboard
          </button>

          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search sales heads..."
              value={staleSearchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-semibold"
            />
          </div>
        </div>

        {/* Detailed Table Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[24px] p-6 xl:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-50 dark:border-zinc-800/50 pb-4">
            <h2 className="text-lg font-black text-slate-800 dark:text-zinc-100 tracking-tight">
              Stale Queue
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-zinc-100 dark:border-zinc-800 text-[10px] font-extrabold text-slate-400 dark:text-zinc-500 tracking-wider uppercase">
                  <th className="py-4 px-4">Lead ID</th>
                  <th className="py-4 px-4">Customer Name</th>
                  <th className="py-4 px-4">Contact Details</th>
                  <th className="py-4 px-4">Project</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Idle Duration</th>
                  <th className="py-4 px-4">Assigned EM</th>
                  <th className="py-4 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50 dark:divide-zinc-850 text-xs font-bold text-slate-700 dark:text-zinc-300">
                {filteredStaleList.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400 dark:text-zinc-550 font-semibold">
                      No stale leads found
                    </td>
                  </tr>
                ) : (
                  filteredStaleList.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/55 dark:hover:bg-zinc-800/40 transition-colors">
                      <td className="py-4 px-4 font-bold text-zinc-400 dark:text-zinc-655">{item.id}</td>
                      <td className="py-4 px-4 font-extrabold text-slate-800 dark:text-zinc-100">{item.customerName}</td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span>{item.phone}</span>
                          <span className="text-[10px] text-slate-400 dark:text-zinc-500 mt-0.5">{item.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">{item.project}</td>
                      <td className="py-4 px-4">
                        <span className="bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 text-[10px] font-black px-2.5 py-1 rounded-[6px]">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-blue-600 dark:text-blue-400 font-extrabold">{item.idle}</td>
                      <td className="py-4 px-4">{item.em}</td>
                      <td className="py-4 px-4 text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/leads/${item.uuid || item.id}`)}
                          className="h-8 text-[11px] font-bold uppercase rounded-xl border-zinc-200 dark:border-zinc-800 text-primary hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all px-4 shadow-none"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-zinc-100 dark:border-zinc-800 pt-6 gap-4">
            <span className="text-[11px] font-extrabold text-slate-400 dark:text-zinc-500">
              Showing 1 - {filteredStaleList.length} of {filteredStaleList.length} Active Stales
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg border-zinc-200 dark:border-zinc-800 shrink-0">
                <ChevronLeft className="w-3.5 h-3.5" />
              </Button>
              <button className="w-8 h-8 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-sm shadow-blue-500/20">
                1
              </button>
              <Button variant="outline" size="icon" className="w-8 h-8 rounded-lg border-zinc-200 dark:border-zinc-800 shrink-0">
                <ChevronRightIcon className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>

      </div>
    );
  }

  // Render loader if the dashboard is loading
  if (view === "dashboard" && isApiLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] w-full space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002d62] dark:border-blue-400" />
        <span className="text-sm font-semibold text-slate-550 dark:text-zinc-400 animate-pulse">
          Loading Sales Head dashboard...
        </span>
      </div>
    );
  }

  if (view === "dashboard" && apiError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] w-full space-y-4 text-center">
        <div className="text-red-500 dark:text-red-400 text-lg font-bold">
          Failed to load Sales Head dashboard data.
        </div>
        <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-md">
          Please check your connection or try selecting a different project/date filter.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] xl:max-w-[1920px] 2xl:max-w-[2560px] mx-auto space-y-6 xl:space-y-8 2xl:space-y-10 px-4 sm:px-6 md:px-8 py-6 animate-in fade-in duration-300">

      {/* Page Title & Top Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-black text-[#002d62] dark:text-blue-400 tracking-tight flex items-center gap-3">
            Sales Head Dashboard
          </h1>
          {isFetching && (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#002d62] dark:border-blue-400 border-t-transparent" />
          )}
        </div>

        {/* View RM's Button / Date Filter */}
        {["SADMIN", "ADMIN"].includes(roleCode) ? (
          <button
            onClick={() => navigate("/relationship-managers/table")}
            className="bg-[#002d62] hover:bg-[#0c3669] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-colors shadow-sm cursor-pointer"
          >
            View Sales Heads
          </button>
        ) : (
          <button
            onClick={() => {
              setDialogTabs(["date"]);
              setIsFilterDialogOpen(true);
            }}
            className="flex items-center gap-2 bg-[#f8fafc] dark:bg-zinc-850 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200/50 dark:border-zinc-700/50 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-zinc-300 transition-colors shadow-sm cursor-pointer min-w-[130px] justify-between"
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{formatSelectedSpan(startDate, endDate)}</span>
            </div>
          </button>
        )}
      </div>

      {/* Filter Row */}
      {["SADMIN", "ADMIN"].includes(roleCode) && (
        <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-3xl p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* Left Side: Managers Dropdown Filter */}
          <div className="flex flex-wrap items-center gap-3">
            {!lockedRmId && roleCode !== "RELMNG" && (
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-extrabold text-slate-400 dark:text-zinc-500 tracking-wider uppercase">MANAGER</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="flex items-center justify-between w-40 bg-[#f8fafc] dark:bg-zinc-850 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200/50 dark:border-zinc-800 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-zinc-300 transition-colors shadow-sm cursor-pointer"
                    >
                      <span className="truncate">{selectedRmLabel === "All" ? "All Sales Heads" : selectedRmLabel}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-2" />
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
                          placeholder="Search Sales Head..."
                          value={rmSearchQuery}
                          onChange={(e) => setRmSearchQuery(e.target.value)}
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
                      onClick={() => handleRmSelect({ id: null, name: "All" })}
                      className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 cursor-pointer py-2.5 px-3 rounded-lg"
                    >
                      <span>All Sales Heads</span>
                      <div className={cn(
                        "h-4.5 w-4.5 rounded-[4px] border flex items-center justify-center transition-all shrink-0",
                        selectedRmId === null
                          ? "bg-[#002d62] dark:bg-blue-600 border-[#002d62] dark:border-blue-600 text-white"
                          : "border-slate-350 dark:border-zinc-700 bg-transparent"
                      )}>
                        {selectedRmId === null && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                    </DropdownMenuItem>

                    <div className="border-b border-slate-100 dark:border-zinc-800 my-1"></div>

                    <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                      SELECT SALES HEAD
                    </div>

                    <div className="max-h-56 overflow-y-auto space-y-0.5 scrollbar-thin">
                      {filteredRmUsers.map((user: any) => {
                        const uName = user.name || `${user.first_name || ""} ${user.last_name || ""}`.trim();
                        const initials = `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase() || uName.slice(0, 2).toUpperCase();

                        const avatarColors = [
                          "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
                          "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400",
                          "bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400",
                          "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400",
                        ];
                        const avatarBg = avatarColors[user.id % avatarColors.length];

                        const isSelected = selectedRmId === user.id;

                        return (
                          <DropdownMenuItem
                            key={user.id}
                            onClick={() => handleRmSelect({ id: user.id, name: uName })}
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
                </DropdownMenu>
              </div>
            )}
          </div>

          {/* Right Side: Project and Date Filters */}
          <div className="flex flex-wrap items-center gap-3">

            {/* Project Filter Button */}
            {roleCode !== "RELMNG" && (
              <button
                onClick={() => {
                  setDialogTabs(["projects"]);
                  setIsFilterDialogOpen(true);
                }}
                className="flex items-center gap-2 bg-[#f8fafc] dark:bg-zinc-850 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200/50 dark:border-zinc-700/50 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-zinc-300 transition-colors shadow-sm cursor-pointer min-w-[130px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{activeProjectLabel}</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>
            )}

            {/* Date Range Button */}
            <button
              onClick={() => {
                setDialogTabs(["date"]);
                setIsFilterDialogOpen(true);
              }}
              className="flex items-center gap-2 bg-[#f8fafc] dark:bg-zinc-850 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200/50 dark:border-zinc-700/50 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-zinc-300 transition-colors shadow-sm cursor-pointer min-w-[130px] justify-between"
            >
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{formatSelectedSpan(startDate, endDate)}</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Row 1: Leaderboard & Calls Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Top Performer Leaderboard */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[24px] p-6 xl:p-8 shadow-sm flex flex-col justify-between min-h-[280px]">
          <div className="flex items-center justify-between border-b border-slate-50 dark:border-zinc-800/50 pb-4">
            <div>
              <h2 className="text-base xl:text-lg font-black text-slate-800 dark:text-zinc-100 tracking-tight">
                Top Performer Leaderboard
              </h2>
              <p className="text-[10px] font-extrabold text-slate-400 dark:text-zinc-500 tracking-wider mt-0.5">
                SALES EXECUTIVES - PERFORMANCE RANK
              </p>
            </div>
            <button
              onClick={() => navigate("/relationship-managers/leaderboard")}
              className="text-xs font-bold text-blue-800 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer hover:underline"
            >
              View All
            </button>
          </div>

          <div className="flex-1 mt-6 space-y-5">
            {rmData.topPerformers.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[200px] text-slate-400 dark:text-zinc-500 font-semibold text-xs">
                No performer data is available
              </div>
            ) : (
              rmData.topPerformers.slice(0, 2).map((rm) => (
                <div
                  key={rm.rank}
                  className="flex items-center justify-between py-2 px-3 rounded-xl transition-all duration-200 gap-4"
                >
                  {/* Left side: Avatar & Name */}
                  <div className="flex items-center gap-3">
                    {/* Rank Badge to the left of avatar */}
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black text-white shadow-sm shrink-0",
                      rm.rank === 1 ? "bg-[#002d62]" : "bg-slate-300 dark:bg-zinc-600 text-slate-700 dark:text-zinc-200"
                    )}>
                      #{rm.rank}
                    </div>

                    {/* Avatar Image or Initials */}
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 flex items-center justify-center font-bold text-xs shrink-0 border border-slate-200/50 dark:border-zinc-750 shadow-sm overflow-hidden">
                      {rm.avatarUrl ? (
                        <img src={rm.avatarUrl} alt={rm.name} className="w-full h-full object-cover" />
                      ) : (
                        (rm.name || "").split(" ").map((n: string) => n[0]).join("")
                      )}
                    </div>

                    <div className="ml-1">
                      <h3 className="font-extrabold text-[13px] text-slate-800 dark:text-zinc-100 tracking-tight">{rm.name}</h3>
                    </div>
                  </div>

                  {/* Stats layout */}
                  <div className="flex items-center justify-end gap-5 sm:gap-7 md:gap-9 text-left flex-1 min-w-0 pr-1">
                    <div className="min-w-[40px]">
                      <span className="block text-[8px] font-bold text-slate-400 dark:text-zinc-500 tracking-widest uppercase mb-0.5">Leads</span>
                      <span className="text-[13px] font-black text-slate-800 dark:text-zinc-250 block">{rm.leads}</span>
                    </div>
                    <div className="min-w-[55px]">
                      <span className="block text-[8px] font-bold text-slate-400 dark:text-zinc-500 tracking-widest uppercase mb-0.5">Follow-up</span>
                      <span className="text-[13px] font-black text-slate-800 dark:text-zinc-250 block">{rm.followUp}%</span>
                    </div>
                    <div className="min-w-[40px]">
                      <span className="block text-[8px] font-bold text-slate-400 dark:text-zinc-500 tracking-widest uppercase mb-0.5">Visits</span>
                      <span className="text-[13px] font-black text-slate-800 dark:text-zinc-250 block">{rm.visits}</span>
                    </div>
                    <div className="min-w-[55px]">
                      <span className="block text-[8px] font-bold text-slate-400 dark:text-zinc-500 tracking-widest uppercase mb-0.5">Conv. Rate</span>
                      <span className="text-[13px] font-black text-slate-800 dark:text-zinc-250 block">{rm.conversionRate}%</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Team Calls Summary (Deep Blue Premium Card) */}
        <div className="bg-[#002d62] dark:bg-zinc-950 border border-[#002d62] dark:border-zinc-900 rounded-[24px] p-6 xl:p-8 shadow-md text-white flex flex-col justify-between min-h-[280px]">
          <div>
            <h2 className="text-sm xl:text-base font-extrabold uppercase tracking-wider text-blue-200 dark:text-zinc-400">
              Team Calls Summary
            </h2>
          </div>

          <div className="my-auto py-4 flex items-baseline gap-2">
            <span className="text-5xl font-black tracking-tight">
              {rmData.teamCallsSummary.connectedCalls}
            </span>
            <span className="text-[10px] font-bold text-blue-200 dark:text-zinc-400 uppercase tracking-widest">
              TOTAL CALLS
            </span>
          </div>

          {/* Sub-cards grid */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white/10 dark:bg-zinc-900/60 backdrop-blur-md rounded-2xl p-4 border border-white/5 dark:border-zinc-800 flex flex-col justify-between min-h-[88px] text-left">
              <span className="block text-[9px] text-blue-200 dark:text-zinc-450 uppercase font-bold tracking-wider">Connected Calls</span>
              <span className="text-2xl font-black mt-2">
                {rmData.teamCallsSummary.connectedCalls - rmData.teamCallsSummary.missedCalls}
              </span>
            </div>
            <div className="bg-white/10 dark:bg-zinc-900/60 backdrop-blur-md rounded-2xl p-4 border border-white/5 dark:border-zinc-800 flex flex-col justify-between min-h-[88px] text-left">
              <span className="block text-[9px] text-blue-200 dark:text-zinc-450 uppercase font-bold tracking-wider">Missed Calls</span>
              <span className="text-2xl font-black mt-2">{rmData.teamCallsSummary.missedCalls}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Row 2: Team-wide Lead Status & Lead Quality Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Team-wide Lead Status */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[24px] p-6 xl:p-10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base xl:text-lg font-extrabold text-slate-800 dark:text-zinc-100 tracking-tight">
              Status wise Leads count
            </h2>
            <button
              onClick={() => {
                setIsStatusPopupOpen(true);
                setPopupSearch("");
              }}
              className="text-sm font-extrabold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-5 xl:space-y-6 my-auto">
            {rmData.teamWideLeadStatus.slice(0, 4).map((status) => (
              <div key={status.label} className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-zinc-300">
                  <span className="tracking-wider text-[10px] xl:text-xs">
                    {status.label} <span className="text-slate-400 dark:text-zinc-500">({status.count})</span>
                  </span>
                  <span className="text-slate-900 dark:text-zinc-100 font-extrabold">{status.percentage}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full rounded-full transition-all duration-500", getProgressBarColor(status.label))}
                    style={{ width: `${Math.min(Math.max(status.percentage, 0), 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Quality Distribution (Recharts Donut) */}
        <LeadQualityDistribution data={rmData.leadQuality} />

      </div>

      {/* Row 3: Bottom grid with columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Column 1: Escalated & Stale stacked */}
        <div className="flex flex-col gap-6">
          {/* Escalated Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-[158px] hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-zinc-100 tracking-tight">Escalated</h3>
              <button
                onClick={() => navigate("/relationship-managers/escalated")}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer hover:underline"
              >
                View All
              </button>
            </div>
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-4xl font-black text-red-600 dark:text-red-500">
                {String(rmData.escalated.count).padStart(2, "0")}
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-zinc-400">
                Active Escalations
              </span>
            </div>
          </div>

          {/* Stale Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[24px] p-6 shadow-sm flex flex-col justify-between h-[158px] hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-zinc-100 tracking-tight">Stale</h3>
              <button
                onClick={() => navigate("/relationship-managers/stale")}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer hover:underline"
              >
                View All
              </button>
            </div>
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-4xl font-black text-blue-600 dark:text-blue-500">
                {rmData.stale.count}
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-zinc-400">
                &gt; 14 Days Idle
              </span>
            </div>
          </div>
        </div>

        {/* Column 2: Top Objections Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[24px] p-6 shadow-sm flex flex-col justify-between min-h-[340px]">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-zinc-100 uppercase tracking-tight border-b border-slate-50 dark:border-zinc-800/50 pb-3">
            Top Objections
          </h3>
          <div className="flex-1 mt-4 space-y-4">
            {rmData.topObjections.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[200px] text-slate-400 dark:text-zinc-500 font-semibold text-xs">
                No objections data is available
              </div>
            ) : (
              rmData.topObjections.slice(0, 5).map((objection, index) => (
                <div key={index} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-zinc-300">
                    <span className="truncate max-w-[85%]">{objection.label}</span>
                    <span className="text-slate-900 dark:text-zinc-100">{objection.percentage}%</span>
                  </div>
                  <ReportProgressBar value={objection.percentage} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Top Bookings - EM Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[24px] p-6 shadow-sm flex flex-col justify-between min-h-[340px]">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-zinc-100 uppercase tracking-tight border-b border-slate-50 dark:border-zinc-800/50 pb-3">
            Top Bookings – EM
          </h3>
          <div className="flex-1 mt-4 space-y-3">
            {rmData.topBookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[200px] text-slate-400 dark:text-zinc-500 font-semibold text-xs">
                No bookings data is available
              </div>
            ) : (
              rmData.topBookings.map((em, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/50 dark:bg-zinc-800/30 border border-slate-100/50 dark:border-zinc-850 hover:bg-slate-50 dark:hover:bg-zinc-800/60 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-zinc-300 shrink-0">
                      {em.name?.split(" ").map((n: string) => n?.[0] || "").join("") || ""}
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-800 dark:text-zinc-150">{em.name}</h4>
                      <p className="text-[9px] font-bold text-slate-400 dark:text-zinc-500">{em.role}</p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-blue-600 dark:text-blue-400 px-2.5">{em.bookings}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Reused Report Filter Dialog */}
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

      {/* Lead Status Popup Modal */}
      <Dialog open={isStatusPopupOpen} onOpenChange={setIsStatusPopupOpen}>
        <DialogContent className="max-w-[620px] overflow-hidden flex flex-col p-6 gap-5 border-none shadow-3xl bg-white dark:bg-zinc-950 rounded-[28px]">
          <div>
            <DialogTitle className="text-xl font-bold text-slate-800 dark:text-zinc-100 tracking-tight">
              All Lead Statuses
            </DialogTitle>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-zinc-500" />
            <input
              type="text"
              placeholder="Search status..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/80 rounded-2xl text-sm font-semibold text-slate-700 dark:text-zinc-355 placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#0f3d6b] dark:focus:ring-blue-500 transition-all shadow-xs"
              value={popupSearch}
              onChange={(e) => setPopupSearch(e.target.value)}
            />
          </div>

          {/* Leads List */}
          <div className="max-h-[400px] overflow-y-auto space-y-5 pr-2 mt-1 scrollbar-thin">
            {filteredStatuses.length > 0 ? (
              filteredStatuses.map((status) => (
                <div key={status.label} className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold text-slate-700 dark:text-zinc-300">
                    <span className="tracking-wider text-xs">
                      {status.label} <span className="text-slate-400 dark:text-zinc-500">({status.count})</span>
                    </span>
                    <span className="text-slate-900 dark:text-zinc-100 font-extrabold">{status.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-500", getProgressBarColor(status.label))}
                      style={{ width: `${Math.min(Math.max(status.percentage, 0), 100)}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400 dark:text-zinc-600">
                <p className="text-sm font-bold">No matching status found</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};