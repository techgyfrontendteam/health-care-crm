import React, { useState, useEffect, useMemo, useRef } from "react";
import { X, Check, LayoutGrid, Calendar, ChevronLeft, ChevronRight, ChevronDown, Megaphone, Image as ImageIcon } from "lucide-react";
import { cn, getProjectStatusOptions } from "../../../utils";
import { useMasterDataLookup } from "../../../shared/hooks/useMasterDataLookup";

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
  if (!start) return "All Time";
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

const formatMonthYear = (date: Date) => {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

export type FilterTab = "projects" | "status" | "date" | "campaigns";

interface Option {
  value: string;
  label: string;
}

interface ReportFilterDialogProps {
  open: boolean;
  onClose: () => void;
  tabs: FilterTab[];
  onApply: (filters: {
    projectIds: string[];
    statusIds: string[];
    startDate: Date | null;
    endDate: Date | null;
    campaignIds: string[];
    adSetIds?: string[];
    creativeIds?: string[];
  }) => void;
  onReset: () => void;
  onProjectChange?: (projectIds: string[]) => void;

  // Options passed from page
  projectOptions: Option[];
  statusOptions?: Option[];
  campaignOptions?: Option[];
  hierarchicalCampaigns?: {
    active: any[];
    completed: any[];
  };

  // Currently applied states
  appliedProjectIds: string[];
  appliedStatusIds?: string[];
  appliedCampaignIds?: string[];
  appliedAdSetIds?: string[];
  appliedCreativeIds?: string[];
  appliedStartDate?: Date | null;
  appliedEndDate?: Date | null;
  initialTab?: FilterTab;
}

export const ReportFilterDialog: React.FC<ReportFilterDialogProps> = ({
  open,
  onClose,
  tabs,
  onApply,
  onReset,
  onProjectChange,
  projectOptions,
  statusOptions = [],
  campaignOptions = [],
  hierarchicalCampaigns,
  appliedProjectIds,
  appliedStatusIds = [],
  appliedCampaignIds = [],
  appliedAdSetIds = [],
  appliedCreativeIds = [],
  appliedStartDate = null,
  appliedEndDate = null,
  initialTab,
}) => {
  const [activeTab, setActiveTab] = useState<FilterTab>(initialTab || tabs[0]);
  const { projectLeadStatuses } = useMasterDataLookup();

  // Temp local states
  const [tempProjectIds, setTempProjectIds] = useState<string[]>([]);
  const [tempStatusIds, setTempStatusIds] = useState<string[]>([]);
  const [tempCampaignIds, setTempCampaignIds] = useState<string[]>([]);
  const [tempAdSetIds, setTempAdSetIds] = useState<string[]>([]);
  const [tempCreativeIds, setTempCreativeIds] = useState<string[]>([]);
  
  const filteredStatusOptions = useMemo(() => {
    if (tempProjectIds.length === 1 && projectLeadStatuses && projectLeadStatuses.length > 0) {
      const projId = Number(tempProjectIds[0]);
      const opts = getProjectStatusOptions(projId, projectLeadStatuses);
      if (opts && opts.length > 0) {
        return opts.map((opt: any) => ({
          value: String(opt.value),
          label: opt.label,
        }));
      }
    }
    return statusOptions;
  }, [tempProjectIds, projectLeadStatuses, statusOptions]);

  // Date states
  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(null);
  const [activeMonth, setActiveMonth] = useState<Date>(() => new Date()); // Default current month
  const [quickSelect, setQuickSelect] = useState<string>("All Time");

  const wasOpenRef = useRef(false);

  // Sync state when open changes
  useEffect(() => {
    if (open && !wasOpenRef.current) {
      setTempProjectIds(appliedProjectIds);
      setTempStatusIds(appliedStatusIds);
      setTempCampaignIds(appliedCampaignIds);
      setTempAdSetIds(appliedAdSetIds);
      setTempCreativeIds(appliedCreativeIds);
      setTempStartDate(appliedStartDate);
      setTempEndDate(appliedEndDate);
      setActiveTab(initialTab || tabs[0]);
      if (!appliedStartDate && !appliedEndDate) {
        setQuickSelect("All Time");
      } else {
        setQuickSelect("");
      }
      if (appliedStartDate) {
        setActiveMonth(new Date(appliedStartDate.getFullYear(), appliedStartDate.getMonth(), 1));
      } else {
        setActiveMonth(new Date());
      }
      onProjectChange?.(appliedProjectIds);
    }
    wasOpenRef.current = open;
  }, [
    open,
    appliedProjectIds,
    appliedStatusIds,
    appliedCampaignIds,
    appliedAdSetIds,
    appliedCreativeIds,
    appliedStartDate,
    appliedEndDate,
    tabs,
    initialTab,
    onProjectChange,
  ]);

  const [campaignTab, setCampaignTab] = useState<"active" | "completed">("active");
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    "camp-1": true,
  });

  const activeCampaigns = useMemo(() => [
    {
      id: "camp-1",
      name: "Meta Lead Gen Q2",
      adSets: [
        {
          id: "adset-1-1",
          name: "HNI_Mumbai_Luxury",
          creatives: [
            { id: "creative-1-1-1", name: "3BHK_Lifestyle_Static_V1" },
            { id: "creative-1-1-2", name: "Luxury_Penthouse_Video_V2" },
          ]
        },
        {
          id: "adset-1-2",
          name: "IT_Corridor_Professionals",
          creatives: [
            { id: "creative-1-2-1", name: "Tech_Park_Carousel_V1" },
          ]
        }
      ]
    },
    {
      id: "camp-2",
      name: "Google Search: Residential",
      adSets: [
        {
          id: "adset-2-1",
          name: "Luxury_Villas_Keywords",
          creatives: [
            { id: "creative-2-1-1", name: "Villa_Search_Ad_V1" },
          ]
        },
        {
          id: "adset-2-2",
          name: "Affordable_Premium_Apartments",
          creatives: [
            { id: "creative-2-2-1", name: "Apartment_Search_Ad_V1" },
          ]
        }
      ]
    }
  ], []);

  const completedCampaigns = useMemo(() => [
    {
      id: "camp-3",
      name: "Retargeting: Site Visitors",
      adSets: [
        {
          id: "adset-3-1",
          name: "Abandoned_Cart_leads",
          creatives: [
            { id: "creative-3-1-1", name: "Offer_Discount_V1" },
          ]
        },
        {
          id: "adset-3-2",
          name: "Video_Viewer_Retargeting",
          creatives: [
            { id: "creative-3-2-1", name: "Skyline_Walkthrough_Video" },
          ]
        }
      ]
    }
  ], []);

  const resolvedActiveCampaigns = useMemo(() => {
    return hierarchicalCampaigns?.active || activeCampaigns;
  }, [hierarchicalCampaigns, activeCampaigns]);

  const resolvedCompletedCampaigns = useMemo(() => {
    return hierarchicalCampaigns?.completed || completedCampaigns;
  }, [hierarchicalCampaigns, completedCampaigns]);

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleCampaignSelection = (campId: string, adSets: any[]) => {
    const isCampChecked = tempCampaignIds.includes(campId);
    const adSetIds = adSets.map(a => a.id);
    const creativeIds = adSets.flatMap(a => a.creatives.map((c: any) => c.id));

    if (isCampChecked) {
      setTempCampaignIds(prev => prev.filter(id => id !== campId));
      setTempAdSetIds(prev => prev.filter(id => !adSetIds.includes(id)));
      setTempCreativeIds(prev => prev.filter(id => !creativeIds.includes(id)));
    } else {
      setTempCampaignIds(prev => [...prev, campId]);
      setTempAdSetIds(prev => Array.from(new Set([...prev, ...adSetIds])));
      setTempCreativeIds(prev => Array.from(new Set([...prev, ...creativeIds])));
    }
  };

  const toggleAdSetSelection = (campId: string, adSetId: string, creatives: any[], allAdSets: any[]) => {
    const isAdSetChecked = tempAdSetIds.includes(adSetId);
    const creativeIds = creatives.map(c => c.id);

    let nextAdSets: string[];
    let nextCreatives: string[];

    if (isAdSetChecked) {
      nextAdSets = tempAdSetIds.filter(id => id !== adSetId);
      nextCreatives = tempCreativeIds.filter(id => !creativeIds.includes(id));
      setTempCampaignIds(prev => prev.filter(id => id !== campId));
    } else {
      nextAdSets = [...tempAdSetIds, adSetId];
      nextCreatives = Array.from(new Set([...tempCreativeIds, ...creativeIds]));
      const allChecked = allAdSets.every(a => a.id === adSetId || tempAdSetIds.includes(a.id));
      if (allChecked) {
        setTempCampaignIds(prev => Array.from(new Set([...prev, campId])));
      }
    }

    setTempAdSetIds(nextAdSets);
    setTempCreativeIds(nextCreatives);
  };

  const toggleCreativeSelection = (campId: string, adSetId: string, creativeId: string, adSetCreatives: any[], campaignAdSets: any[]) => {
    const isCreativeChecked = tempCreativeIds.includes(creativeId);
    
    let nextCreatives: string[];
    if (isCreativeChecked) {
      nextCreatives = tempCreativeIds.filter(id => id !== creativeId);
      setTempAdSetIds(prev => prev.filter(id => id !== adSetId));
      setTempCampaignIds(prev => prev.filter(id => id !== campId));
    } else {
      nextCreatives = [...tempCreativeIds, creativeId];
      const allCrChecked = adSetCreatives.every(c => c.id === creativeId || tempCreativeIds.includes(c.id));
      if (allCrChecked) {
        setTempAdSetIds(prev => {
          const updated = Array.from(new Set([...prev, adSetId]));
          const allAdChecked = campaignAdSets.every(a => a.id === adSetId || updated.includes(a.id));
          if (allAdChecked) {
            setTempCampaignIds(p => Array.from(new Set([...p, campId])));
          }
          return updated;
        });
      }
    }
    setTempCreativeIds(nextCreatives);
  };

  const handleCampaignSelectAll = () => {
    const list = campaignTab === "active" ? resolvedActiveCampaigns : resolvedCompletedCampaigns;
    const allCampaignIds = list.map((c: any) => c.id);
    const allAdSetIds = list.flatMap((c: any) => c.adSets.map((a: any) => a.id));
    const allCreativeIds = list.flatMap((c: any) => c.adSets.flatMap((a: any) => a.creatives.map((cr: any) => cr.id)));

    const allChecked = allCampaignIds.every(id => tempCampaignIds.includes(id)) &&
                       allAdSetIds.every(id => tempAdSetIds.includes(id)) &&
                       allCreativeIds.every(id => tempCreativeIds.includes(id));

    if (allChecked) {
      setTempCampaignIds(prev => prev.filter(id => !allCampaignIds.includes(id)));
      setTempAdSetIds(prev => prev.filter(id => !allAdSetIds.includes(id)));
      setTempCreativeIds(prev => prev.filter(id => !allCreativeIds.includes(id)));
    } else {
      setTempCampaignIds(prev => Array.from(new Set([...prev, ...allCampaignIds])));
      setTempAdSetIds(prev => Array.from(new Set([...prev, ...allAdSetIds])));
      setTempCreativeIds(prev => Array.from(new Set([...prev, ...allCreativeIds])));
    }
  };

  const calendarDays = useMemo(() => {
    return getDaysInMonth(activeMonth.getFullYear(), activeMonth.getMonth());
  }, [activeMonth]);

  const handleQuickSelect = (option: string) => {
    setQuickSelect(option);
    const today = new Date(); 
    if (option === "Today") {
      setTempStartDate(today);
      setTempEndDate(today);
    } else if (option === "Last 7 Days") {
      const start = new Date();
      start.setDate(today.getDate() - 7);
      setTempStartDate(start);
      setTempEndDate(today);
    } else if (option === "This Month") {
      setTempStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
      setTempEndDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
    } else if (option === "All Time") {
      setTempStartDate(null);
      setTempEndDate(null);
    }
  };

  const handleDayClick = (date: Date) => {
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

  const handleClear = () => {
    setTempProjectIds([]);
    setTempStatusIds([]);
    setTempCampaignIds([]);
    setTempAdSetIds([]);
    setTempCreativeIds([]);
    setTempStartDate(null);
    setTempEndDate(null);
    setQuickSelect("All Time");
  };

  const handleApply = () => {
    onApply({
      projectIds: tempProjectIds,
      statusIds: tempStatusIds,
      startDate: tempStartDate,
      endDate: tempEndDate,
      campaignIds: tempCampaignIds,
      adSetIds: tempAdSetIds,
      creativeIds: tempCreativeIds,
    });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/45 backdrop-blur-[2px] animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-[760px] rounded-[24px] shadow-2xl overflow-hidden flex flex-col border border-zinc-150 dark:border-zinc-800/80 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-100 dark:border-zinc-850">
          <h3 className="text-2xl font-bold text-[#002d62] dark:text-blue-450 tracking-tight">
            {activeTab === "projects" && "Select Your Project"}
            {activeTab === "status" && "Select Lead Status"}
            {activeTab === "date" && "Select Date Range"}
            {activeTab === "campaigns" && "Select Campaign"}
          </h3>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-850 text-slate-400 dark:text-zinc-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 min-h-[380px] max-h-[450px]">
          
          {/* Left Navigation Sidebar */}
          <div className="w-[180px] border-r border-zinc-100 dark:border-zinc-850 p-4 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold shadow-sm transition-all duration-200 text-left select-none",
                    isActive
                      ? "bg-[#0f3d6b] text-white"
                      : "text-slate-600 hover:text-slate-850 hover:bg-zinc-100/60 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-850/40"
                  )}
                >
                  {tab === "projects" && <LayoutGrid className="w-4 h-4" />}
                  {tab === "status" && <Check className="w-4 h-4" />}
                  {tab === "date" && <Calendar className="w-4 h-4" />}
                  {tab === "campaigns" && <Megaphone className="w-4 h-4" />}
                  <span className="capitalize">
                    {tab === "status" ? "Lead Status" : tab}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Pane Content */}
          <div className="flex-1 overflow-y-auto p-6">
            
            {/* Projects Tab */}
            {activeTab === "projects" && (
              <div className="space-y-3">
                {projectOptions.map((proj) => {
                  const isChecked = tempProjectIds.includes(proj.value);
                  return (
                    <div 
                      key={proj.value}
                      onClick={() => {
                        let nextProjectIds: string[];
                        if (isChecked) {
                          nextProjectIds = [];
                        } else {
                          nextProjectIds = [proj.value];
                        }
                        setTempProjectIds(nextProjectIds);
                        setTempStatusIds([]);
                        setTempCampaignIds([]);
                        setTempAdSetIds([]);
                        setTempCreativeIds([]);
                        onProjectChange?.(nextProjectIds);
                      }}
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
                        "w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-250",
                        isChecked 
                          ? "bg-[#0f3d6b] border-[#0f3d6b] text-white" 
                          : "border-zinc-300 dark:border-zinc-650 bg-white dark:bg-zinc-900"
                      )}>
                        {isChecked && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Lead Status Tab */}
            {activeTab === "status" && (
              <div className="space-y-3">
                {filteredStatusOptions.map((stat: any) => {
                  const isChecked = tempStatusIds.includes(stat.value);
                  return (
                    <div 
                      key={stat.value}
                      onClick={() => {
                        if (isChecked) {
                          setTempStatusIds(tempStatusIds.filter(id => id !== stat.value));
                        } else {
                          setTempStatusIds([...tempStatusIds, stat.value]);
                        }
                      }}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-250 select-none",
                        isChecked 
                          ? "border-[#0f3d6b] bg-slate-50/30 dark:border-blue-500/50 dark:bg-blue-950/10" 
                          : "border-zinc-150 hover:border-zinc-250 dark:border-zinc-800/60 dark:hover:border-zinc-700/60"
                      )}
                    >
                      <span className="text-sm font-bold text-slate-700 dark:text-zinc-200">
                        {stat.label}
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
            )}            {/* Campaigns Tab */}
            {activeTab === "campaigns" && (
              <div className="space-y-4 flex-1 flex flex-col min-w-[320px]">
                {/* Campaigns Top Bar */}
                <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-800 pb-2 mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                    SELECT CAMPAIGNS
                  </span>
                  <button
                    type="button"
                    onClick={handleCampaignSelectAll}
                    className="text-xs font-bold text-[#0f3d6b] dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    Select All
                  </button>
                </div>

                {/* Active / Completed Toggle */}
                <div className="flex bg-zinc-100 dark:bg-zinc-800/60 p-1 rounded-2xl w-full">
                  <button
                    type="button"
                    onClick={() => setCampaignTab("active")}
                    className={cn(
                      "flex-1 text-center py-2.5 rounded-xl text-xs font-bold transition-all duration-200",
                      campaignTab === "active"
                        ? "bg-white dark:bg-zinc-900 text-[#0f3d6b] dark:text-blue-400 shadow-sm"
                        : "text-slate-500 dark:text-zinc-400 hover:text-slate-850 dark:hover:text-zinc-200"
                    )}
                  >
                    Active
                  </button>
                  <button
                    type="button"
                    onClick={() => setCampaignTab("completed")}
                    className={cn(
                      "flex-1 text-center py-2.5 rounded-xl text-xs font-bold transition-all duration-200",
                      campaignTab === "completed"
                        ? "bg-white dark:bg-zinc-900 text-[#0f3d6b] dark:text-blue-400 shadow-sm"
                        : "text-slate-500 dark:text-zinc-400 hover:text-slate-850 dark:hover:text-zinc-200"
                    )}
                  >
                    Completed
                  </button>
                </div>

                {/* Tree Checklist */}
                <div className="space-y-4 overflow-y-auto max-h-[260px] pr-2 mt-2 scrollbar-thin">
                  {(campaignTab === "active" ? resolvedActiveCampaigns : resolvedCompletedCampaigns).map((camp: any) => {
                    const isCampExpanded = !!expandedNodes[camp.id];
                    const isCampChecked = tempCampaignIds.includes(camp.id);
                    
                    return (
                      <div key={camp.id} className="space-y-3">
                        {/* Campaign Row */}
                        <div className="flex items-center gap-3 py-1 select-none">
                          <button
                            type="button"
                            onClick={() => toggleNode(camp.id)}
                            className="p-1 rounded hover:bg-zinc-150 dark:hover:bg-zinc-800 text-slate-500 transition-colors"
                          >
                            {isCampExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                          <div 
                            onClick={() => toggleCampaignSelection(camp.id, camp.adSets)}
                            className={cn(
                              "w-5 h-5 rounded-lg flex items-center justify-center border transition-all duration-200 cursor-pointer",
                              isCampChecked 
                                ? "bg-[#0f3d6b] border-[#0f3d6b] text-white" 
                                : "border-zinc-300 dark:border-zinc-650 bg-white dark:bg-zinc-900"
                            )}
                          >
                            {isCampChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span 
                            onClick={() => toggleCampaignSelection(camp.id, camp.adSets)}
                            className="text-sm font-bold text-slate-800 dark:text-zinc-150 cursor-pointer"
                          >
                            Campaign: {camp.name}
                          </span>
                        </div>

                        {/* Ad Sets */}
                        {isCampExpanded && (
                          <div className="pl-6 space-y-3 border-l border-dashed border-zinc-200 dark:border-zinc-800/80 ml-3.5">
                            {camp.adSets.map((adSet: any) => {
                              const isAdSetExpanded = !!expandedNodes[adSet.id];
                              const isAdSetChecked = tempAdSetIds.includes(adSet.id);

                              return (
                                <div key={adSet.id} className="space-y-3">
                                  {/* Ad Set Row */}
                                  <div className="flex items-center gap-3 py-1 select-none">
                                    <button
                                      type="button"
                                      onClick={() => toggleNode(adSet.id)}
                                      className="p-1 rounded hover:bg-zinc-150 dark:hover:bg-zinc-800 text-slate-500 transition-colors"
                                    >
                                      {isAdSetExpanded ? (
                                        <ChevronDown className="w-3.5 h-3.5" />
                                      ) : (
                                        <ChevronRight className="w-3.5 h-3.5" />
                                      )}
                                    </button>
                                    <div 
                                      onClick={() => toggleAdSetSelection(camp.id, adSet.id, adSet.creatives, camp.adSets)}
                                      className={cn(
                                        "w-4.5 h-4.5 rounded flex items-center justify-center border transition-all duration-200 cursor-pointer",
                                        isAdSetChecked 
                                          ? "bg-[#0f3d6b] border-[#0f3d6b] text-white" 
                                          : "border-zinc-300 dark:border-zinc-650 bg-white dark:bg-zinc-900"
                                      )}
                                    >
                                      {isAdSetChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                    </div>
                                    <span 
                                      onClick={() => toggleAdSetSelection(camp.id, adSet.id, adSet.creatives, camp.adSets)}
                                      className="text-xs font-bold text-slate-700 dark:text-zinc-200 cursor-pointer"
                                    >
                                      Add Set: {adSet.name}
                                    </span>
                                  </div>

                                  {/* Creatives */}
                                  {isAdSetExpanded && (
                                    <div className="pl-6 space-y-2.5 border-l border-dashed border-zinc-200 dark:border-zinc-800/80 ml-3">
                                      {adSet.creatives.map((creative: any) => {
                                        const isCreativeChecked = tempCreativeIds.includes(creative.id);

                                        return (
                                          <div key={creative.id} className="flex items-center gap-3 py-1 select-none">
                                            <div 
                                              onClick={() => toggleCreativeSelection(camp.id, adSet.id, creative.id, adSet.creatives, camp.adSets)}
                                              className={cn(
                                                "w-4 h-4 rounded flex items-center justify-center border transition-all duration-200 cursor-pointer",
                                                isCreativeChecked 
                                                  ? "bg-[#0f3d6b] border-[#0f3d6b] text-white" 
                                                  : "border-zinc-300 dark:border-zinc-650 bg-white dark:bg-zinc-900"
                                              )}
                                            >
                                              {isCreativeChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                                            </div>
                                            <div 
                                              onClick={() => toggleCreativeSelection(camp.id, adSet.id, creative.id, adSet.creatives, camp.adSets)}
                                              className="inline-flex items-center gap-2 cursor-pointer"
                                            >
                                              <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                                              <span className="text-xs font-medium text-slate-650 dark:text-zinc-400">
                                                Creative: {creative.name}
                                              </span>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Date Range Tab */}
            {activeTab === "date" && (
              <div className="flex flex-col sm:flex-row gap-6 min-h-[300px]">
                
                {/* Date Left Side Section */}
                <div className="w-full sm:w-[180px] flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-zinc-100 dark:border-zinc-850 pb-4 sm:pb-0 sm:pr-4">
                  <div className="space-y-4">
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 px-1">
                      QUICK SELECTS
                    </span>
                    <div className="space-y-1">
                      {["Today", "Last 7 Days", "This Month", "All Time"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
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

                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-850 mt-4 sm:mt-0">
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 px-1 mb-1">
                      SELECTED SPAN
                    </span>
                    <span className="block text-xs font-extrabold text-[#0f3d6b] dark:text-blue-400 px-1">
                      {formatSelectedSpan(tempStartDate, tempEndDate)}
                    </span>
                  </div>
                </div>

                {/* Date Calendar Grid Section */}
                <div className="flex-1 flex flex-col">
                  {/* Month controls */}
                  <div className="flex items-center justify-between mb-4 px-1">
                    <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">
                      {formatMonthYear(activeMonth)}
                    </span>
                    <div className="flex items-center gap-1">
                      <button 
                        type="button"
                        onClick={prevMonth}
                        className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        type="button"
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
                          onClick={() => handleDayClick(date)}
                          className={cn(
                            "relative py-1.5 text-xs font-bold cursor-pointer select-none flex items-center justify-center transition-all duration-150",
                            isCurrentMonth ? "text-slate-800 dark:text-zinc-200" : "text-slate-300 dark:text-zinc-650",
                            bgClass
                          )}
                        >
                          {(isSelectedStart || isSelectedEnd) && (
                            <div className="absolute inset-0 m-auto w-7 h-7 rounded-full bg-[#0f3d6b] dark:bg-[#1a5b9b] z-0 shadow-sm animate-in zoom-in-75 duration-150" />
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
            )}

          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 py-5 bg-zinc-50/50 dark:bg-zinc-900/40 border-t border-zinc-100 dark:border-zinc-850">
          <button 
            onClick={handleClear}
            className="text-sm font-extrabold text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
          >
            Clear Filters
          </button>
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-750 text-sm font-bold text-slate-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-855 transition-colors"
            >
              Dismiss
            </button>
            <button 
              onClick={handleApply}
              className="px-6 py-2.5 bg-[#0f3d6b] hover:bg-[#0c3156] text-white rounded-full text-sm font-bold shadow-md transition-colors animate-in fade-in duration-200"
            >
              Apply Selection
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
