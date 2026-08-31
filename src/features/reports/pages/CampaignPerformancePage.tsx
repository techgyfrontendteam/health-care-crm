import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  SlidersHorizontal, 
  Download, 
  Eye,
  MousePointerClick,
  BadgeCheck,
  Calendar,
  ChevronDown,
  ChevronRight,
  Image as ImageIcon,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import { useGetAllMasterDataQuery } from "../../master/api/masterApi";
import { useGetAllUsersByRoleIdQuery } from "../../users/api/usersApi";
import { ReportFilterDialog } from "../components/ReportFilterDialog";
import { cn } from "../../../utils";
import type { CampaignRow } from "../types";
import {
  useGetAllCampaignsDataQuery,
  useGetAdsPerformanceToBookingDataQuery,
  useGetCampaignsFunnelDataQuery,
  useDownloadCampaignPerformanceDataMutation
} from "../api/reportsApi";

export const CampaignPerformancePage = () => {
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
    projectIds: string[];
    campaignIds: string[];
    adSetIds: string[];
    creativeIds: string[];
  }>({
    projectIds: [],
    campaignIds: [],
    adSetIds: [],
    creativeIds: [],
  });

  const [filterProjectId, setFilterProjectId] = useState<string | null>(null);

  // Hierarchy expand/collapse states
  const [expandedCampaigns, setExpandedCampaigns] = useState<Record<string, boolean>>({
    "camp-1": true, // Default expand the first one to showcase the nested rows
  });
  const [expandedAdSets, setExpandedAdSets] = useState<Record<string, boolean>>({
    "adset-1-1": true, // Default expand the first child
  });

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

  // API Query Params
  const campaignQueryParams = useMemo(() => {
    const activeProjectIdStr = filterProjectId || appliedFilters.projectIds[0];
    if (activeProjectIdStr) {
      return {
        project_id: [parseInt(activeProjectIdStr, 10)].filter(id => !isNaN(id))
      };
    }
    // Default to passing all project IDs if none selected, to fetch all campaigns for options
    const allIds = masterData?.projects?.map((p: any) => p.id) || [1];
    return { project_id: allIds };
  }, [filterProjectId, appliedFilters.projectIds, masterData?.projects]);

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

  const queryParams = useMemo(() => {
    return {
      project_id: appliedFilters.projectIds.length > 0 ? parseInt(appliedFilters.projectIds[0], 10) : null,
      campaign_id: appliedFilters.campaignIds.length > 0 ? parseInt(appliedFilters.campaignIds[0], 10) : null,
    };
  }, [appliedFilters.projectIds, appliedFilters.campaignIds]);

  const filterHierarchyParams = useMemo(() => {
    const activeProjectIdStr = filterProjectId || appliedFilters.projectIds[0];
    const projectId = activeProjectIdStr 
      ? parseInt(activeProjectIdStr, 10) 
      : (masterData?.projects?.[0]?.id ? parseInt(String(masterData.projects[0].id), 10) : 2);
    
    return {
      project_id: projectId,
      campaign_id: null
    };
  }, [filterProjectId, appliedFilters.projectIds, masterData?.projects]);

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

  const { data: funnelResponse } = useGetCampaignsFunnelDataQuery(queryParams);
  const { data: tableResponse } = useGetAdsPerformanceToBookingDataQuery(queryParams);
  const [downloadReport] = useDownloadCampaignPerformanceDataMutation();

  const formatMetric = (val: string | number | undefined | null, defaultValue: string): string => {
    if (val === undefined || val === null || val === '') return defaultValue;
    return String(val);
  };

  const parsePct = (val: string | number | undefined | null): number => {
    if (val === undefined || val === null) return 0;
    if (typeof val === 'number') return val;
    return parseFloat(String(val).replace('%', '')) || 0;
  };

  const parseNum = (val: string | number | undefined | null): number => {
    if (val === undefined || val === null) return 0;
    if (typeof val === 'number') return val;
    return parseInt(String(val).replace(/\D/g, ''), 10) || 0;
  };

  const mappedCampaigns = useMemo(() => {
    if (!tableResponse?.data) return [];
    return tableResponse.data.map((camp): CampaignRow => {
      const adSets = (camp.ad_set || []).map((adSet) => {
        const creatives = (adSet.creatives || []).map((cr) => ({
          id: String(cr.creative_id),
          name: cr.creative_name,
          leads: parseNum(cr.leads),
          cpl: parseNum(cr.cpl),
          siteVisitRate: parsePct(cr.site_visit),
          conversionRate: parsePct(cr.conversion_rate),
          junkRate: parsePct(cr.junk_rate),
        }));

        return {
          id: String(adSet.ad_set_id),
          name: adSet.ad_set_name,
          leads: parseNum(adSet.leads),
          cpl: parseNum(adSet.cpl),
          siteVisitRate: parsePct(adSet.site_visit),
          conversionRate: parsePct(adSet.conversion_rate),
          junkRate: parsePct(adSet.junk_rate),
          creatives,
        };
      });

      return {
        id: String(camp.campaign_id),
        name: camp.campaign_name,
        projectId: queryParams.project_id || 1,
        rmId: 1,
        leads: parseNum(camp.leads),
        cpl: parseNum(camp.cpl),
        siteVisitRate: parsePct(camp.site_visit),
        conversionRate: parsePct(camp.conversion_rate),
        junkRate: parsePct(camp.junk_rate),
        adSets,
      };
    });
  }, [tableResponse, queryParams.project_id]);

  // Dynamically expand the first campaign and ad set when data arrives
  React.useEffect(() => {
    if (mappedCampaigns.length > 0) {
      const firstCampId = mappedCampaigns[0].id;
      const firstAdSetId = mappedCampaigns[0].adSets?.[0]?.id;
      setExpandedCampaigns(prev => {
        const keys = Object.keys(prev);
        if (keys.length === 0 || keys.includes("camp-1")) {
          return { [firstCampId]: true };
        }
        return prev;
      });
      if (firstAdSetId) {
        setExpandedAdSets(prev => {
          const keys = Object.keys(prev);
          if (keys.length === 0 || keys.includes("adset-1-1")) {
            return { [firstAdSetId]: true };
          }
          return prev;
        });
      }
    }
  }, [mappedCampaigns]);

  // Filter campaigns client-side to allow sub-filtering of ad sets / creatives
  const filteredCampaigns = useMemo(() => {
    return mappedCampaigns
      .map((camp) => {
        const filteredAdSets = camp.adSets
          .map((adSet) => {
            const filteredCreatives = adSet.creatives.filter((creative) => {
              if (appliedFilters.creativeIds.length > 0) {
                return appliedFilters.creativeIds.includes(creative.id);
              }
              return true;
            });
            return {
              ...adSet,
              creatives: filteredCreatives,
            };
          })
          .filter((adSet) => {
            if (appliedFilters.creativeIds.length > 0) {
              return adSet.creatives.length > 0;
            }
            if (appliedFilters.adSetIds.length > 0) {
              return appliedFilters.adSetIds.includes(adSet.id);
            }
            return true;
          });

        return {
          ...camp,
          adSets: filteredAdSets,
        };
      })
      .filter((camp) => {
        if (appliedFilters.projectIds.length > 0) {
          if (!appliedFilters.projectIds.includes(String(camp.projectId))) {
            return false;
          }
        }
        if (appliedFilters.campaignIds.length > 0) {
          if (!appliedFilters.campaignIds.includes(camp.id)) {
            return false;
          }
        }
        if (appliedFilters.adSetIds.length > 0 || appliedFilters.creativeIds.length > 0) {
          return camp.adSets.length > 0;
        }
        return true;
      });
  }, [mappedCampaigns, appliedFilters]);

  // Actions
  const handleApplyFilters = (filters: {
    projectIds: string[];
    campaignIds: string[];
    adSetIds?: string[];
    creativeIds?: string[];
  }) => {
    setAppliedFilters({
      projectIds: filters.projectIds || [],
      campaignIds: filters.campaignIds || [],
      adSetIds: filters.adSetIds || [],
      creativeIds: filters.creativeIds || [],
    });
    setFilterProjectId(null);
    setIsFilterDialogOpen(false);
  };

  const handleResetFilters = () => {
    setAppliedFilters({
      projectIds: [],
      campaignIds: [],
      adSetIds: [],
      creativeIds: [],
    });
    setFilterProjectId(null);
    setIsFilterDialogOpen(false);
  };

  const handleDownload = async () => {
    try {
      toast.loading("Compiling campaign performance report...", { id: "download-report" });
      const res = await downloadReport(queryParams).unwrap();
      
      if (res.file_url) {
        const link = document.createElement("a");
        link.href = res.file_url;
        link.setAttribute("download", `campaign_performance_report_${queryParams.project_id || 1}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Download completed", {
          id: "download-report",
          description: "The Campaign Performance Report CSV was downloaded successfully.",
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

  const toggleCampaign = (id: string) => {
    setExpandedCampaigns(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleAdSet = (id: string) => {
    setExpandedAdSets(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="w-full mx-auto space-y-6 xl:space-y-8 2xl:space-y-10 px-4 sm:px-6 md:px-8 lg:px-10 py-6 animate-in fade-in duration-300">
      
      {/* Title Header Block */}
      <div className="flex items-center gap-4 xl:gap-6">
        <button
          onClick={() => navigate("/reports")}
          className="p-2 -ml-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors duration-200"
          title="Back to Reports"
        >
          <ArrowLeft className="w-7 h-7 xl:w-8 xl:h-8 text-[#0f3d6b] dark:text-blue-400" />
        </button>
        <h1 className="text-[24px] font-bold text-[#00236F] dark:text-blue-400 tracking-tight">
          Campaign Performance Report
        </h1>
      </div>

      {/* Funnel Visualizer + Side Panel Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8 2xl:gap-10 items-stretch w-full">
        
        {/* Conversion Funnel Card */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-100/80 dark:border-zinc-800/50 rounded-[24px] p-6 xl:p-8 2xl:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          <h2 className="text-sm xl:text-lg 2xl:text-xl font-extrabold tracking-tight text-slate-700 dark:text-zinc-400">
            Conversion Funnel Visualizer
          </h2>

          {/* Funnel Flow */}
          <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-4 py-4 xl:py-6 mt-4">
            
            {/* Stage 1: REACH */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-14 h-14 xl:w-[85px] xl:h-[85px] 2xl:w-[100px] 2xl:h-[100px] rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center border border-slate-100 dark:border-zinc-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <Eye className="w-6 h-6 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10 text-[#0f3d6b] dark:text-blue-400" strokeWidth={2} />
              </div>
              <div>
                <span className="block text-xl xl:text-3xl 2xl:text-4xl font-black text-slate-800 dark:text-zinc-100 tracking-tight">
                  {formatMetric(funnelResponse?.conversion_funnel_data?.reach, "2.4M")}
                </span>
                <span className="block text-[10px] xl:text-xs 2xl:text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mt-1">
                  REACH
                </span>
              </div>
            </div>

            {/* Arrow connector */}
            <ArrowRight className="w-5 h-5 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-slate-300 dark:text-zinc-650 hidden md:block" />

            {/* Stage 2: LEADS */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-14 h-14 xl:w-[85px] xl:h-[85px] 2xl:w-[100px] 2xl:h-[100px] rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center border border-slate-100 dark:border-zinc-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <MousePointerClick className="w-6 h-6 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10 text-[#0f3d6b] dark:text-blue-400" strokeWidth={2} />
              </div>
              <div>
                <span className="block text-xl xl:text-3xl 2xl:text-4xl font-black text-slate-800 dark:text-zinc-100 tracking-tight">
                  {formatMetric(funnelResponse?.conversion_funnel_data?.leads, "12.8K")}
                </span>
                <span className="block text-[10px] xl:text-xs 2xl:text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mt-1">
                  LEADS
                </span>
              </div>
            </div>

            {/* Arrow connector */}
            <ArrowRight className="w-5 h-5 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-slate-300 dark:text-zinc-650 hidden md:block" />

            {/* Stage 3: SITE VISITS */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-14 h-14 xl:w-[85px] xl:h-[85px] 2xl:w-[100px] 2xl:h-[100px] rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center border border-slate-100 dark:border-zinc-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <BadgeCheck className="w-6 h-6 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10 text-[#0f3d6b] dark:text-blue-400" strokeWidth={2} />
              </div>
              <div>
                <span className="block text-xl xl:text-3xl 2xl:text-4xl font-black text-slate-800 dark:text-zinc-100 tracking-tight">
                  {formatMetric(funnelResponse?.conversion_funnel_data?.sitevisit, "3.2K")}
                </span>
                <span className="block text-[10px] xl:text-xs 2xl:text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mt-1">
                  SITE VISITS
                </span>
              </div>
            </div>

            {/* Arrow connector */}
            <ArrowRight className="w-5 h-5 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-slate-300 dark:text-zinc-650 hidden md:block" />

            {/* Stage 4: CONVERSATIONS */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-14 h-14 xl:w-[85px] xl:h-[85px] 2xl:w-[100px] 2xl:h-[100px] rounded-full bg-[#0f3d6b] flex items-center justify-center shadow-md">
                <Calendar className="w-6 h-6 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10 text-white" strokeWidth={2} />
              </div>
              <div>
                <span className="block text-xl xl:text-3xl 2xl:text-4xl font-black text-slate-850 dark:text-zinc-100 tracking-tight">
                  {formatMetric(funnelResponse?.conversion_funnel_data?.conversions, "412")}
                </span>
                <span className="block text-[10px] xl:text-xs 2xl:text-sm font-extrabold uppercase tracking-wider text-[#0f3d6b] dark:text-blue-400 mt-1">
                  CONVERSATIONS
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Stacked Side Cards */}
        <div className="lg:col-span-1 flex flex-col justify-between gap-4 xl:gap-6 2xl:gap-8 h-full">
          
          {/* Card 1: BEST PERFORMING CAMPAIGN */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-100/80 dark:border-zinc-800/50 rounded-[24px] p-5 xl:p-6 2xl:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-center flex-1">
            <span className="text-[10px] xl:text-xs 2xl:text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              BEST PERFORMING CAMPAIGN
            </span>
            <h4 className="text-base xl:text-xl 2xl:text-2xl font-black text-slate-800 dark:text-zinc-100 mt-1 tracking-tight truncate">
              {funnelResponse?.best_performing_campaign || "Meta Lead Gen Q2"}
            </h4>
          </div>

          {/* Card 2: BEST PERFORMING AD SET */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-100/80 dark:border-zinc-800/50 rounded-[24px] p-5 xl:p-6 2xl:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-center flex-1">
            <span className="text-[10px] xl:text-xs 2xl:text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              BEST PERFORMING AD SET
            </span>
            <h4 className="text-base xl:text-xl 2xl:text-2xl font-black text-slate-800 dark:text-zinc-100 mt-1 tracking-tight truncate">
              {funnelResponse?.best_performing_ad_set || "High-Rise Skyline Video"}
            </h4>
          </div>

          {/* Card 3: BEST PERFORMING CREATIVE */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-100/80 dark:border-zinc-800/50 rounded-[24px] p-5 xl:p-6 2xl:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-center flex-1">
            <span className="text-[10px] xl:text-xs 2xl:text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              BEST PERFORMING CREATIVE
            </span>
            <h4 className="text-base xl:text-xl 2xl:text-2xl font-black text-slate-800 dark:text-zinc-100 mt-1 tracking-tight truncate">
              {funnelResponse?.best_performing_creatives || "High-Rise Skyline Video"}
            </h4>
          </div>

        </div>

      </div>

      {/* Ads Performance to Booking Tree-Table Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-3xl shadow-sm overflow-hidden flex flex-col">
        
        {/* Table Header block */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-100 dark:border-zinc-800/50 p-6 xl:p-8 2xl:p-10 gap-4">
          <div>
            <h2 className="text-lg xl:text-xl 2xl:text-2xl font-bold text-slate-800 dark:text-zinc-100 tracking-tight">
              Ads Performance to Booking
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs font-semibold text-slate-400 dark:text-zinc-500">
              {appliedFilters.projectIds.length > 0 ? (
                <span>
                  Projects: {
                    appliedFilters.projectIds
                      .map(id => projectOptions.find(opt => opt.value === id)?.label)
                      .filter(Boolean)
                      .join(", ")
                  }
                </span>
              ) : (
                <span>All Projects</span>
              )}
              {appliedFilters.campaignIds.length > 0 && (
                <>
                  <span className="text-zinc-300 dark:text-zinc-700">|</span>
                  <span>
                    Campaigns: {
                      appliedFilters.campaignIds
                        .map(id => campaignOptions.find(opt => opt.value === id)?.label)
                        .filter(Boolean)
                        .join(", ")
                    }
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setFilterProjectId(appliedFilters.projectIds[0] || null);
                setIsFilterDialogOpen(true);
              }}
              className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 px-4.5 py-2.5 rounded-full text-sm font-semibold text-slate-700 dark:text-zinc-300 transition-colors duration-200 shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-[#0f3d6b] hover:bg-[#0c3156] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download Report
            </button>
          </div>
        </div>

        {/* Tree-Table wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left min-w-[950px]">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                <th className="py-4 xl:py-5 pl-6 xl:pl-8 2xl:pl-10 pr-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                  Campaign / Ad Set / Creative
                </th>
                <th className="py-4 xl:py-5 px-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider text-center">
                  Leads
                </th>
                <th className="py-4 xl:py-5 px-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider text-center">
                  CPL
                </th>
                <th className="py-4 xl:py-5 px-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider text-center">
                  Site Visit %
                </th>
                <th className="py-4 xl:py-5 px-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider text-center">
                  Conversion %
                </th>
                <th className="py-4 xl:py-5 pl-3 pr-6 xl:pr-8 2xl:pr-10 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider text-center">
                  Junk Rate
                </th>
              </tr>
            </thead>

            <tbody className="divide-none">
              {filteredCampaigns.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-sm text-slate-450 dark:text-zinc-500 italic">
                    No campaigns match current selection
                  </td>
                </tr>
              ) : (
                filteredCampaigns.map((camp) => {
                  const isCampExpanded = !!expandedCampaigns[camp.id];

                  return (
                    <React.Fragment key={camp.id}>
                      {/* Campaign Level Row */}
                      <tr className="hover:bg-zinc-55/40 dark:hover:bg-zinc-850/10 transition-colors duration-150">
                        {/* Toggle + Name */}
                        <td className="py-5 xl:py-6 pl-6 xl:pl-8 2xl:pl-10 pr-3 text-sm xl:text-base font-bold text-slate-800 dark:text-zinc-150">
                          <button
                            onClick={() => toggleCampaign(camp.id)}
                            className="inline-flex items-center gap-2 text-left"
                          >
                            {isCampExpanded ? (
                              <ChevronDown className="w-4 h-4 text-slate-450" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-450" />
                            )}
                            {camp.name}
                          </button>
                        </td>
                        {/* Leads */}
                        <td className="py-5 xl:py-6 px-3 text-sm xl:text-base font-bold text-slate-800 dark:text-zinc-150 text-center">
                          {camp.leads.toLocaleString()}
                        </td>
                        {/* CPL */}
                        <td className="py-5 xl:py-6 px-3 text-sm xl:text-base font-semibold text-slate-600 dark:text-zinc-400 text-center">
                          {camp.cpl}
                        </td>
                        {/* Site Visit % */}
                        <td className="py-5 xl:py-6 px-3 text-sm xl:text-base font-semibold text-slate-600 dark:text-zinc-400 text-center">
                          {camp.siteVisitRate}%
                        </td>
                        {/* Conversion % (coral red bold) */}
                        <td className="py-5 xl:py-6 px-3 text-sm xl:text-base font-bold text-red-500 dark:text-red-400 text-center">
                          {camp.conversionRate}%
                        </td>
                        {/* Junk Rate (coral red bold) */}
                        <td className="py-5 xl:py-6 pl-3 pr-6 xl:pr-8 2xl:pr-10 text-sm xl:text-base font-bold text-red-500 dark:text-red-400 text-center">
                          {camp.junkRate}%
                        </td>
                      </tr>

                      {/* Render Ad Sets if Campaign is expanded */}
                      {isCampExpanded && camp.adSets.map((adSet) => {
                        const isAdSetExpanded = !!expandedAdSets[adSet.id];

                        return (
                          <React.Fragment key={adSet.id}>
                            {/* Ad Set Level Row */}
                            <tr className="hover:bg-zinc-55/30 dark:hover:bg-zinc-850/5 transition-colors duration-150 bg-slate-50/30 dark:bg-zinc-900/10">
                              {/* Toggle + Name (indented pl-12) */}
                              <td className="py-4 xl:py-5 pl-12 xl:pl-16 pr-3 text-sm font-semibold text-slate-650 dark:text-zinc-250">
                                <button
                                  onClick={() => toggleAdSet(adSet.id)}
                                  className="inline-flex items-center gap-2 text-left"
                                >
                                  {isAdSetExpanded ? (
                                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                                  ) : (
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                                  )}
                                  <span className="font-normal text-slate-400">Ad Set: </span>{adSet.name}
                                </button>
                              </td>
                              {/* Leads */}
                              <td className="py-4 xl:py-5 px-3 text-sm text-slate-700 dark:text-zinc-350 text-center">
                                {adSet.leads.toLocaleString()}
                              </td>
                              {/* CPL */}
                              <td className="py-4 xl:py-5 px-3 text-sm text-slate-600 dark:text-zinc-400 text-center">
                                {adSet.cpl}
                              </td>
                              {/* Site Visit % */}
                              <td className="py-4 xl:py-5 px-3 text-sm text-slate-600 dark:text-zinc-400 text-center">
                                {adSet.siteVisitRate}%
                              </td>
                              {/* Conversion % (coral red normal) */}
                              <td className="py-4 xl:py-5 px-3 text-sm font-bold text-red-500 dark:text-red-450 text-center">
                                {adSet.conversionRate}%
                              </td>
                              {/* Junk Rate (grey normal) */}
                              <td className="py-4 xl:py-5 pl-3 pr-6 xl:pr-8 2xl:pr-10 text-sm text-slate-500 dark:text-zinc-450 text-center">
                                {adSet.junkRate}%
                              </td>
                            </tr>

                            {/* Render Creatives if Ad Set is expanded */}
                            {isAdSetExpanded && adSet.creatives.map((creative) => (
                              <tr 
                                key={creative.id}
                                className="hover:bg-zinc-55/20 dark:hover:bg-zinc-850/5 bg-slate-50/60 dark:bg-zinc-900/20"
                              >
                                {/* Creative Name (indented pl-20 with ImageIcon) */}
                                <td className="py-3.5 pl-20 xl:pl-24 pr-3 text-xs xl:text-sm font-medium text-slate-550 dark:text-zinc-400">
                                  <div className="inline-flex items-center gap-2">
                                    <ImageIcon className="w-3.5 h-3.5 text-slate-450 dark:text-zinc-500" />
                                    <span className="font-normal text-slate-400">Creative: </span>{creative.name}
                                  </div>
                                </td>
                                {/* Leads */}
                                <td className="py-3.5 px-3 text-xs xl:text-sm text-slate-600 dark:text-zinc-400 text-center">
                                  {creative.leads.toLocaleString()}
                                </td>
                                {/* CPL */}
                                <td className="py-3.5 px-3 text-xs xl:text-sm text-slate-500 dark:text-zinc-500 text-center">
                                  {creative.cpl}
                                </td>
                                {/* Site Visit % */}
                                <td className="py-3.5 px-3 text-xs xl:text-sm text-slate-500 dark:text-zinc-500 text-center">
                                  {creative.siteVisitRate}%
                                </td>
                                {/* Conversion % */}
                                <td className="py-3.5 px-3 text-xs xl:text-sm font-bold text-red-500 dark:text-red-450 text-center">
                                  {creative.conversionRate}%
                                </td>
                                {/* Junk Rate */}
                                <td className="py-3.5 pl-3 pr-6 xl:pr-8 2xl:pr-10 text-xs xl:text-sm text-slate-450 dark:text-zinc-500 text-center">
                                  {creative.junkRate}%
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
                        );
                      })}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Custom Report Filter Dialog */}
      <ReportFilterDialog
        open={isFilterDialogOpen}
        onClose={() => {
          setFilterProjectId(null);
          setIsFilterDialogOpen(false);
        }}
        tabs={["projects", "campaigns"]}
        onApply={(filters) => {
          handleApplyFilters({
            projectIds: filters.projectIds || [],
            campaignIds: filters.campaignIds || [],
            adSetIds: filters.adSetIds || [],
            creativeIds: filters.creativeIds || [],
          });
        }}
        onReset={handleResetFilters}
        onProjectChange={(projectIds) => {
          setFilterProjectId(projectIds[0] || null);
        }}
        projectOptions={projectOptions}
        campaignOptions={campaignOptions}
        hierarchicalCampaigns={filterHierarchicalCampaigns}
        appliedProjectIds={appliedFilters.projectIds}
        appliedCampaignIds={appliedFilters.campaignIds}
        appliedAdSetIds={appliedFilters.adSetIds}
        appliedCreativeIds={appliedFilters.creativeIds}
      />
    </div>
  );
};
