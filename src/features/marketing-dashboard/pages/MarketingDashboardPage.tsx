import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Calendar,
  AlertCircle,
  SlidersHorizontal,
  Search,
  Users,
  Layers,
  ArrowRight,
  TrendingUp,
  Check,
  Image,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useMasterDataLookup } from "../../../shared/hooks/useMasterDataLookup";
import { useGetMarketingDataQuery } from "../api/marketingApi";
import { usePermissions } from "../../../hooks/usePermissions";
import { ReportFilterDialog } from "../../reports/components/ReportFilterDialog";
import type { FilterTab } from "../../reports/components/ReportFilterDialog";
import { 
  useGetAllCampaignsDataQuery,
  useGetAdsPerformanceToBookingDataQuery 
} from "../../reports/api/reportsApi";

const MARKETING_MANAGERS = [
  { id: "1", name: "Priya Sharma", initial: "PS", color: "bg-[#d1fae5] text-[#065f46]" },
  { id: "2", name: "Arjun Singh", initial: "AS", color: "bg-[#e0e7ff] text-[#3730a3]" },
  { id: "3", name: "Ananya Gupta", initial: "AG", color: "bg-[#f3e8ff] text-[#6b21a8]" },
];

const formatDateForApi = (date: Date | null): string => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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
  
  if (startYear !== endYear) {
    return `${startMonth} ${startDay}, ${startYear} – ${endMonth} ${endDay}, ${endYear}`;
  }
  if (startMonth === endMonth) {
    if (startDay === endDay) {
      return `${startMonth} ${startDay}`;
    }
    return `${startMonth} ${startDay} – ${endDay}`;
  }
  return `${startMonth} ${startDay} – ${endMonth} ${endDay}`;
};

export const MarketingDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { masterData } = useMasterDataLookup();
  const { roleCode, user } = usePermissions();
  const isSalesAdmin = roleCode === 'SADMIN' || user?.role_id === 2 || (user?.email && user.email.toLowerCase().includes("mahidhar"));

  // Filters State
  const [selectedManagerName, setSelectedManagerName] = useState<string>("All Managers");
  const [selectedManagerId, setSelectedManagerId] = useState<string>("");
  const [isManagerDropdownOpen, setIsManagerDropdownOpen] = useState(false);
  const [managerSearchQuery, setManagerSearchQuery] = useState("");

  const [selectedProjectName, setSelectedProjectName] = useState<string>("Planet Green");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");

  // Report Filter Dialog States
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [dialogTabs] = useState<FilterTab[]>(["projects", "campaigns", "date"]);
  const [activeDialogTab, setActiveDialogTab] = useState<FilterTab>("projects");

  const [appliedProjectIds, setAppliedProjectIds] = useState<string[]>([]);
  const [appliedCampaignIds, setAppliedCampaignIds] = useState<string[]>([]);
  const [appliedAdSetIds, setAppliedAdSetIds] = useState<string[]>([]);
  const [appliedCreativeIds, setAppliedCreativeIds] = useState<string[]>([]);
  const [filterProjectId, setFilterProjectId] = useState<string | null>(null);
  const [dateRangeStart, setDateRangeStart] = useState<Date | null>(null);
  const [dateRangeEnd, setDateRangeEnd] = useState<Date | null>(null);

  // Get project list from Master Data Lookup
  const projectsList = useMemo(() => {
    return masterData?.projects || [];
  }, [masterData]);

  // Set default project ID once projects load
  useEffect(() => {
    if (projectsList.length > 0 && !selectedProjectId) {
      const defaultProj = projectsList.find((p) => p.description.toLowerCase().includes("green")) || projectsList[0];
      if (defaultProj) {
        setSelectedProjectName(defaultProj.description);
        setSelectedProjectId(defaultProj.id.toString());
        setAppliedProjectIds([defaultProj.id.toString()]);
      }
    }
  }, [projectsList, selectedProjectId]);

  // API Query Params for campaign filtering
  const campaignQueryParams = useMemo(() => {
    const activeProjectIdStr = filterProjectId || appliedProjectIds[0];
    if (activeProjectIdStr) {
      return {
        project_id: [parseInt(activeProjectIdStr, 10)].filter(id => !isNaN(id))
      };
    }
    // Default to passing all project IDs if none selected, to fetch all campaigns for options
    const allIds = projectsList?.map((p: any) => p.id) || [1];
    return { project_id: allIds };
  }, [filterProjectId, appliedProjectIds, projectsList]);

  const { data: allCampaignsResponse } = useGetAllCampaignsDataQuery(campaignQueryParams);

  const campaignOptions = useMemo(() => {
    if (!allCampaignsResponse?.data) return [];
    const activeList = allCampaignsResponse.data.active || [];
    const completedList = allCampaignsResponse.data.completed || [];
    const combined = [...activeList, ...completedList];
    
    const seen = new Set<number>();
    const list: Array<{ value: string; label: string }> = [];
    combined.forEach(c => {
      if (!seen.has(c.campaign_id)) {
        seen.add(c.campaign_id);
        list.push({
          value: String(c.campaign_id),
          label: c.campaign_name,
        });
      }
    });
    return list;
  }, [allCampaignsResponse]);

  const filterHierarchyParams = useMemo(() => {
    const activeProjectIdStr = filterProjectId || appliedProjectIds[0];
    const projectId = activeProjectIdStr 
      ? parseInt(activeProjectIdStr, 10) 
      : (projectsList?.[0]?.id ? parseInt(String(projectsList[0].id), 10) : 2);
    
    return {
      project_id: projectId,
      campaign_id: null
    };
  }, [filterProjectId, appliedProjectIds, projectsList]);

  const { data: filterHierarchyResponse } = useGetAdsPerformanceToBookingDataQuery(filterHierarchyParams);

  const activeCampaignIds = useMemo(() => {
    if (!allCampaignsResponse?.data?.active) return [];
    return allCampaignsResponse.data.active.map(c => c.campaign_id);
  }, [allCampaignsResponse]);

  const completedCampaignIds = useMemo(() => {
    if (!allCampaignsResponse?.data?.completed) return [];
    return allCampaignsResponse.data.completed.map(c => c.campaign_id);
  }, [allCampaignsResponse]);

  const filterHierarchicalCampaigns = useMemo(() => {
    const list = filterHierarchyResponse?.data || [];
    
    const active: any[] = [];
    const completed: any[] = [];
    
    list.forEach(camp => {
      const campIdStr = String(camp.campaign_id);
      const campObj = {
        id: campIdStr,
        name: camp.campaign_name,
        adSets: (camp.ad_set || []).map(adSet => ({
          id: String(adSet.ad_set_id),
          name: adSet.ad_set_name,
          creatives: (adSet.creatives || []).map(cr => ({
            id: String(cr.creative_id),
            name: cr.creative_name
          }))
        }))
      };
      
      if (completedCampaignIds.includes(camp.campaign_id)) {
        completed.push(campObj);
      } else {
        active.push(campObj);
      }
    });
    
    return { active, completed };
  }, [filterHierarchyResponse, activeCampaignIds, completedCampaignIds]);

  // Query Params for API
  const queryParams = useMemo(() => {
    return {
      manager_id: selectedManagerId || undefined,
      project_id: selectedProjectId || undefined,
      campaign_id: appliedCampaignIds[0] || undefined,
      start_date: formatDateForApi(dateRangeStart),
      end_date: formatDateForApi(dateRangeEnd),
    };
  }, [selectedManagerId, selectedProjectId, appliedCampaignIds, dateRangeStart, dateRangeEnd]);

  // Fetch Marketing Dashboard metrics
  const { data: dashboardData, isLoading, isError } = useGetMarketingDataQuery(queryParams);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClose = () => {
      setIsManagerDropdownOpen(false);
    };
    window.addEventListener("click", handleClose);
    return () => window.removeEventListener("click", handleClose);
  }, []);

  // Filtered managers for search box
  const filteredManagers = useMemo(() => {
    const query = managerSearchQuery.toLowerCase().trim();
    if (!query) return MARKETING_MANAGERS;
    return MARKETING_MANAGERS.filter((m) =>
      m.name.toLowerCase().includes(query)
    );
  }, [managerSearchQuery]);

  // Format currency in Lakhs/Thousands style (Indian numbering system)
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Pie chart rendering setup for Lead Quality
  const leadQuality = dashboardData?.leadQuality || { hot: 0, warm: 0, cold: 0, junk: 0, activeRate: 0 };
  const hasLeadQualityData = leadQuality.hot > 0 || leadQuality.warm > 0 || leadQuality.cold > 0 || leadQuality.junk > 0;
  const donutChartData = hasLeadQualityData
    ? [
        { name: "Hot", value: leadQuality.hot, color: "#ef4444" },
        { name: "Warm", value: leadQuality.warm, color: "#f97316" },
        { name: "Cold", value: leadQuality.cold, color: "#3b82f6" },
        { name: "Junk", value: leadQuality.junk, color: "#94a3b8" },
      ].filter((item) => item.value > 0)
    : [{ name: "Placeholder", value: 100, color: "#e2e8f0" }];

  const projectOptions = useMemo(() => {
    return projectsList.map((p) => ({
      value: p.id.toString(),
      label: p.description,
    }));
  }, [projectsList]);

  const handleApplyFilters = (filters: {
    projectIds: string[];
    startDate: Date | null;
    endDate: Date | null;
    campaignIds: string[];
    adSetIds?: string[];
    creativeIds?: string[];
  }) => {
    setAppliedProjectIds(filters.projectIds);
    setAppliedCampaignIds(filters.campaignIds);
    setAppliedAdSetIds(filters.adSetIds || []);
    setAppliedCreativeIds(filters.creativeIds || []);
    setDateRangeStart(filters.startDate);
    setDateRangeEnd(filters.endDate);

    if (filters.projectIds.length > 0) {
      const pId = filters.projectIds[0];
      setSelectedProjectId(pId);
      const proj = projectsList.find((p) => p.id.toString() === pId);
      if (proj) {
        setSelectedProjectName(proj.description);
      }
    } else {
      setSelectedProjectId("");
      setSelectedProjectName("All Projects");
    }

    setFilterProjectId(null);
    setIsFilterDialogOpen(false);
  };

  const handleResetFilters = () => {
    setAppliedProjectIds([]);
    setAppliedCampaignIds([]);
    setAppliedAdSetIds([]);
    setAppliedCreativeIds([]);
    setDateRangeStart(null);
    setDateRangeEnd(null);
    setSelectedProjectId("");
    setSelectedProjectName("All Projects");
    setFilterProjectId(null);
    setIsFilterDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-[600px] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#002d62] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !dashboardData) {
    return (
      <div className="w-full min-h-[600px] flex flex-col items-center justify-center gap-3">
        <AlertCircle className="w-10 h-10 text-red-500" />
        <p className="text-slate-500 font-bold text-sm">Failed to load marketing dashboard metrics.</p>
      </div>
    );
  }

  const { campaignsBudget, trafficLeads, cplCostBooking, funnelDropoff, bestAdSet, bestCreative } = dashboardData;

  return (
    <div className="w-full max-w-[1440px] xl:max-w-[1920px] mx-auto px-6 py-8 space-y-6 animate-in fade-in duration-300 relative text-slate-800">
      
      {/* Header Row */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#002d62] tracking-tight">
            Marketing Manager Dashboard
          </h1>
        </div>

        {/* Filters Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Manager Dropdown */}
          {!isSalesAdmin && (
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setIsManagerDropdownOpen(!isManagerDropdownOpen);
                }}
                className="flex items-center gap-2 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-slate-200/50 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-sm cursor-pointer min-w-[155px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <span>{selectedManagerName}</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {isManagerDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl py-3 z-40 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 pb-2.5 border-b border-slate-100 flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search Marketing Manager..."
                      value={managerSearchQuery}
                      onChange={(e) => setManagerSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-slate-700 outline-none placeholder:text-slate-455"
                    />
                  </div>
                  
                  <div className="px-2 pt-2">
                    <button
                      onClick={() => {
                        setSelectedManagerName("All Managers");
                        setSelectedManagerId("");
                        setIsManagerDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-bold hover:bg-slate-50 text-slate-700 transition-colors"
                    >
                      <span>All MM's</span>
                      {!selectedManagerId && (
                        <div className="w-4 h-4 rounded-md bg-[#002d62] text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  </div>

                  <div className="px-5 py-2">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">
                      SELECT MM
                    </span>
                  </div>

                  <div className="max-h-56 overflow-y-auto px-2 space-y-0.5">
                    {filteredManagers.length === 0 ? (
                      <div className="px-3 py-2.5 text-xs text-slate-400 font-medium">
                        No managers found
                      </div>
                    ) : (
                      filteredManagers.map((m) => {
                        const isSelected = selectedManagerId === m.id;
                        return (
                          <button
                            key={m.id}
                            onClick={() => {
                              setSelectedManagerName(m.name);
                              setSelectedManagerId(m.id);
                              setIsManagerDropdownOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shadow-xs ${m.color}`}>
                                {m.initial}
                              </div>
                              <span className="font-bold text-slate-700">{m.name}</span>
                            </div>
                            {isSelected && (
                              <div className="w-4 h-4 rounded-md bg-[#002d62] text-white flex items-center justify-center">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Project Button */}
          <button
            onClick={() => {
              setActiveDialogTab("projects");
              setFilterProjectId(appliedProjectIds[0] || null);
              setIsFilterDialogOpen(true);
            }}
            className="flex items-center gap-2 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-slate-200/50 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-sm cursor-pointer min-w-[130px] justify-between"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{selectedProjectName}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {/* Date Picker Button */}
          <button
            onClick={() => {
              setActiveDialogTab("date");
              setFilterProjectId(appliedProjectIds[0] || null);
              setIsFilterDialogOpen(true);
            }}
            className="flex items-center gap-2 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-slate-200/50 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-sm cursor-pointer min-w-[130px] justify-between"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                {formatSelectedSpan(dateRangeStart, dateRangeEnd)}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

        </div>
      </div>

      {/* Row 1: KPI Statistics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {/* KPI 1: Active Campaigns & Budget */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-36">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
            ACTIVE CAMPAIGNS & BUDGET
          </span>
          <div className="flex flex-col mt-auto space-y-1">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              {campaignsBudget.activeCampaignsCount} Campaigns Active
            </span>
            <h3 className="text-3xl font-black text-[#002d62] leading-none">
              {formatCurrency(campaignsBudget.budget)}
            </h3>
          </div>
        </div>

        {/* KPI 2: Traffic & Leads */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-36">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            TRAFFIC & LEADS
          </span>
          <div className="flex items-baseline gap-1.5 mt-auto">
            <h3 className="text-3xl font-black text-[#002d62] leading-none">
              {trafficLeads.leadsCount.toLocaleString("en-IN")}
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Leads</span>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 mt-2">
            <div>
              <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">IMPRESSIONS</span>
              <span className="text-sm font-black text-[#002d62]">{trafficLeads.impressions}</span>
            </div>
            <div>
              <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">CLICKS</span>
              <span className="text-sm font-black text-[#002d62]">{trafficLeads.clicks}</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Average CPL & Cost Per Booking */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-36">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
            AVERAGE CPL & COST PER BOOKING
          </span>
          <div className="flex items-baseline gap-1.5 mt-auto">
            <h3 className="text-3xl font-black text-[#002d62] leading-none">
              {formatCurrency(cplCostBooking.avgCpl)}
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg. CPL</span>
          </div>
          <div className="pt-2 border-t border-slate-100 mt-2 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cost per booking</span>
            <span className="text-sm font-black text-[#002d62]">{formatCurrency(cplCostBooking.costPerBooking)}</span>
          </div>
        </div>

      </div>

      {/* Row 2: Campaign Funnel & Lead Quality */}
      <div className="grid gap-6 lg:grid-cols-5">
        
        {/* Left Card: Funnel Drop-off */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col lg:col-span-3 min-h-[380px]">
          <div className="flex items-center justify-between pb-4">
            <h2 className="text-base font-bold text-slate-800 tracking-tight">
              Campaign Funnel Drop-off-Total
            </h2>
            <span className="bg-slate-50 text-slate-400 border border-slate-200/50 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              Last 30 Days
            </span>
          </div>

          {/* Funnel Layout */}
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 px-4 my-auto">
            
            {/* Stage 1: Leads */}
            <div className="flex flex-col items-center text-center space-y-3 w-32 shrink-0">
              <div className="w-16 h-16 rounded-full bg-[#f4f7fb] flex items-center justify-center shadow-sm">
                <img src="/icons/funnel-leads.png" alt="Leads Icon" className="w-7 h-7 object-contain" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-800 leading-none">
                  {funnelDropoff.leads.toLocaleString("en-IN")}
                </h4>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">
                  LEADS
                </span>
              </div>
            </div>

            {/* Connection Arrow 1 */}
            <div className="flex-1 flex flex-col items-center justify-center min-w-[50px] relative w-full md:w-auto">
              <div className="bg-[#eff6ff] text-[#002d62] text-xs font-extrabold px-3 py-1 rounded-full border border-blue-100/50 shadow-xs z-10">
                {funnelDropoff.siteVisitsRate}%
              </div>
              <div className="hidden md:block h-0.5 bg-slate-100 w-full absolute top-1/2 -translate-y-1/2 left-0" />
              <div className="block md:hidden w-0.5 bg-slate-100 h-10 my-1" />
            </div>

            {/* Stage 2: Site Visit */}
            <div className="flex flex-col items-center text-center space-y-3 w-32 shrink-0">
              <div className="w-16 h-16 rounded-full bg-[#f4f7fb] flex items-center justify-center shadow-sm">
                <img src="/icons/funnel-visits.png" alt="Site Visits Icon" className="w-7 h-7 object-contain" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-800 leading-none">
                  {funnelDropoff.siteVisits.toLocaleString("en-IN")}
                </h4>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">
                  SITE VISIT
                </span>
              </div>
            </div>

            {/* Connection Arrow 2 */}
            <div className="flex-1 flex flex-col items-center justify-center min-w-[50px] relative w-full md:w-auto">
              <div className="bg-[#eff6ff] text-[#002d62] text-xs font-extrabold px-3 py-1 rounded-full border border-blue-100/50 shadow-xs z-10">
                {funnelDropoff.bookingsRate}%
              </div>
              <div className="hidden md:block h-0.5 bg-slate-100 w-full absolute top-1/2 -translate-y-1/2 left-0" />
              <div className="block md:hidden w-0.5 bg-slate-100 h-10 my-1" />
            </div>

            {/* Stage 3: Bookings */}
            <div className="flex flex-col items-center text-center space-y-3 w-32 shrink-0">
              <img 
                src="/icons/funnel-bookings.png" 
                alt="Bookings Icon" 
                className="w-16 h-16 object-contain shadow-md rounded-full" 
              />
              <div>
                <h4 className="text-2xl font-black text-slate-800 leading-none">
                  {funnelDropoff.bookings.toLocaleString("en-IN")}
                </h4>
                <span className="text-[10px] font-bold text-[#002d62] uppercase tracking-widest mt-1 block">
                  BOOKINGS
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Card: Lead Quality Distribution */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between lg:col-span-2 min-h-[380px]">
          <h2 className="text-base font-bold text-slate-800 tracking-tight">
            Lead Quality Distribution
          </h2>

          <div className="flex flex-col items-center justify-center my-auto w-full">
            {/* Donut Chart */}
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius="72%"
                    outerRadius="90%"
                    paddingAngle={0}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {donutChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-3xl font-black text-slate-800">
                  {leadQuality.activeRate}%
                </span>
                <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase mt-0.5">
                  ACTIVE
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-x-12 xl:gap-x-16 gap-y-3 w-full max-w-[400px] mt-6">
              
              {/* Hot */}
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-[#ef4444]" />
                  <span className="text-slate-500 font-semibold">Hot</span>
                </div>
                <span className="text-slate-800 font-bold">{leadQuality.hot}%</span>
              </div>

              {/* Warm */}
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-[#f97316]" />
                  <span className="text-slate-500 font-semibold">Warm</span>
                </div>
                <span className="text-slate-800 font-bold">{leadQuality.warm}%</span>
              </div>

              {/* Cold */}
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-[#3b82f6]" />
                  <span className="text-slate-500 font-semibold">Cold</span>
                </div>
                <span className="text-slate-800 font-bold">{leadQuality.cold}%</span>
              </div>

              {/* Junk */}
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-[#94a3b8]" />
                  <span className="text-slate-500 font-semibold">Junk</span>
                </div>
                <span className="text-slate-800 font-bold">{leadQuality.junk}%</span>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Row 3: Best Performing Ad Set & Creative */}
      <div className="grid gap-6 md:grid-cols-2">
        
        {/* Left Column: Best Performing Ad Set */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[220px]">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800 tracking-tight">
              Best Performing Ad Set
            </h2>
            <span className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
              bestAdSet.status === "NO DATA"
                ? "bg-slate-100 text-slate-500 dark:bg-zinc-800 dark:text-zinc-400"
                : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-450"
            }`}>
              {bestAdSet.status}
            </span>
          </div>

          <div className="bg-[#f8fafc] border border-slate-200/40 rounded-2xl p-5 flex items-center justify-between gap-4 my-4 flex-1">
            <div>
              <h4 className={`text-base font-extrabold ${
                bestAdSet.title === "No data available" ? "text-slate-400 italic font-medium" : "text-slate-800"
              }`}>
                {bestAdSet.title}
              </h4>
              <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                {bestAdSet.platform}
              </span>
            </div>
            <div className="text-right shrink-0">
              <h4 className="text-3xl font-black text-[#002d62] leading-none">
                {bestAdSet.leadsGenerated}
              </h4>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">
                Leads Generated
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Best Performing Creative */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[220px]">
          <div className="flex items-center justify-between pb-3">
            <h2 className="text-base font-bold text-slate-800 tracking-tight">
              Best Performing Creative
            </h2>
            <span className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
              bestCreative.status === "NO DATA"
                ? "bg-slate-100 text-slate-500 dark:bg-zinc-800 dark:text-zinc-400"
                : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-450"
            }`}>
              {bestCreative.status}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5 my-auto">
            {/* Image Container */}
            <div className="w-full sm:w-44 h-28 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 shadow-xs">
              <img
                src={bestCreative.image || "/golden_hour_balcony.png"}
                alt={bestCreative.title}
                className="w-full h-full object-cover block"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/icons/building.png";
                }}
              />
            </div>

            {/* Creative Details */}
            <div className="flex-1 w-full space-y-3">
              <div>
                <h4 className={`text-sm font-extrabold leading-snug ${
                  bestCreative.title === "No data available" ? "text-slate-400 italic font-medium" : "text-slate-800"
                }`}>
                  {bestCreative.title}
                </h4>
                <span className="text-[9px] text-slate-455 font-bold block">
                  {bestCreative.platform}
                </span>
              </div>

              {/* CTR list */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-455 font-semibold">CTR</span>
                  <span className="text-slate-800 font-extrabold">{bestCreative.ctr}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Reused Report Filter Dialog */}
      <ReportFilterDialog
        open={isFilterDialogOpen}
        onClose={() => {
          setFilterProjectId(null);
          setIsFilterDialogOpen(false);
        }}
        tabs={dialogTabs}
        initialTab={activeDialogTab}
        projectOptions={projectOptions}
        campaignOptions={campaignOptions}
        hierarchicalCampaigns={filterHierarchicalCampaigns}
        appliedProjectIds={appliedProjectIds}
        appliedCampaignIds={appliedCampaignIds}
        appliedAdSetIds={appliedAdSetIds}
        appliedCreativeIds={appliedCreativeIds}
        appliedStartDate={dateRangeStart}
        appliedEndDate={dateRangeEnd}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
        onProjectChange={(projectIds) => {
          setFilterProjectId(projectIds[0] || null);
        }}
      />

    </div>
  );
};
