import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useGetVisitsByUserIdQuery } from "../../leads/api/leadsApi";
import { useGetAllMasterDataQuery } from "../../master/api/masterApi";
import { format } from "date-fns";
import {
  CalendarIcon,
  ListFilter,
  Plus,
  Search,
  MapPin,
  Clock,
  ChevronsUpDown,
} from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Calendar } from "../../../components/ui/calendar";
import { ScheduleVisitDialog } from "../../leads/components/ScheduleVisitDialog";
import {
  useGetAllUsersByRoleIdQuery,
  useGetReporteesQuery,
} from "../../users/api/usersApi";
import { usePermissions } from "../../../hooks/usePermissions";
import { Checkbox } from "../../../components/ui/checkbox";
import { cn } from "../../../utils";

const formatWithoutTimezone = (dateTime: string) => {
  if (!dateTime) return "TBD";
  try {
    // Strip 'Z' or timezone offsets to force parsing as local time
    const validStr = dateTime.replace(/Z/g, '').split('+')[0].replace(' ', 'T');
    const d = new Date(validStr);
    if (isNaN(d.getTime())) return "TBD";
    
    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "TBD";
  }
};

export const ScheduledVisitsPage = () => {
  const { emId: paramEmId } = useParams();

  const navigate = useNavigate();
  const { user } = useAuth();

  const { roleCode } = usePermissions();
  const isAdmin = roleCode === "SADMIN" || roleCode === "ADMIN";
  const isRM = roleCode === "RELMNG";
  const isEM = roleCode === "EXPMNG";

  const [date, setDate] = useState<Date>(new Date());
  const [filterStartDate, setFilterStartDate] = useState<Date | undefined>(
    new Date(),
  );
  const [filterEndDate, setFilterEndDate] = useState<Date | undefined>(
    new Date(),
  );
  const [draftStartDate, setDraftStartDate] = useState<Date | undefined>(
    new Date(),
  );
  const [draftEndDate, setDraftEndDate] = useState<Date | undefined>(
    new Date(),
  );

  // Fetch Master Data and Users first
  const { data: masterData } = useGetAllMasterDataQuery();
  const { data: rms = [], isLoading: isLoadingRms } = useGetAllUsersByRoleIdQuery({
    role_id: 3,
    offset: 0,
  });
  const { data: allEms = [], isLoading: isLoadingAllEms } = useGetAllUsersByRoleIdQuery(
    { role_id: 4, offset: 0 },
    { skip: !isAdmin },
  );
  const { data: reportees = [], isLoading: isLoadingReportees } = useGetReporteesQuery(
    { reporting_manager_id: Number(user?.id) || 0, offset: 0 },
    { skip: !isRM || !user?.id },
  );

  const isLoadingEms = isAdmin
    ? (isLoadingAllEms || isLoadingRms)
    : isRM
      ? isLoadingReportees
      : false;

  const emOptions = useMemo(() => {
    if (isAdmin) {
      // For Admin, show both RMs and EMs
      const combined = [...allEms, ...rms];
      // De-duplicate by ID just in case
      return Array.from(new Map(combined.map((u) => [u.id, u])).values());
    }
    if (isRM) {
      const nameParts = (user?.name || "").split(" ");
      const rmUser = user ? {
        ...user,
        id: Number(user.id),
        first_name: nameParts[0] || "",
        last_name: nameParts.slice(1).join(" "),
      } as any : null;
      return rmUser ? [rmUser, ...reportees] : reportees;
    }
    if (isEM && user) {
      const nameParts = (user.name || "").split(" ");
      return [
        {
          ...user,
          id: Number(user.id),
          first_name: nameParts[0] || "",
          last_name: nameParts.slice(1).join(" "),
        } as any,
      ];
    }
    return [];
  }, [isAdmin, isRM, isEM, allEms, reportees, user]);

  const siteVisitStatuses = masterData?.site_visit_status || [];
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"SCHD" | "COMPLETED">("SCHD");

  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const [selectedEmIds, setSelectedEmIds] = useState<string[]>([]);
  const [isEmDropdownOpen, setIsEmDropdownOpen] = useState(false);

  const isInitializedRef = React.useRef(false);
  const lastParamEmIdRef = React.useRef(paramEmId);

  // Sync to localStorage
  React.useEffect(() => {
    if (user && isInitializedRef.current) {
      const storageKey = `visits_selected_em_ids_${user.id}`;
      localStorage.setItem(storageKey, JSON.stringify(selectedEmIds));
    }
  }, [selectedEmIds, user]);

  React.useEffect(() => {
    if (lastParamEmIdRef.current !== paramEmId) {
      lastParamEmIdRef.current = paramEmId;
      isInitializedRef.current = false;
    }

    if (emOptions.length > 0 && !isInitializedRef.current && user && !isLoadingEms) {
      const storageKey = `visits_selected_em_ids_${user.id}`;
      const stored = localStorage.getItem(storageKey);
      let initialIds: string[] | null = null;
      
      if (stored && !paramEmId) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            // Filter to only include active options
            initialIds = parsed.filter((id) =>
              emOptions.some((e) => e.id.toString() === id)
            );
          }
        } catch (e) {
          console.error("Error parsing stored EM IDs:", e);
        }
      }

      if (initialIds === null) {
        // Fallback to defaults
        initialIds = paramEmId
          ? [paramEmId]
          : emOptions.map((e) => e.id.toString());
      }

      setSelectedEmIds(initialIds);
      isInitializedRef.current = true;
    }
  }, [emOptions, paramEmId, user, isLoadingEms]);

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const scheduledStatus = masterData?.site_visit_status?.find(
    (s: any) =>
      s.code === "SCHD" || s.description?.toUpperCase() === "SCHEDULED",
  );
  const scheduledStatusId = scheduledStatus?.id;

  const completedStatus = masterData?.site_visit_status?.find(
    (s: any) =>
      s.code === "CMPLTD" || s.description?.toUpperCase() === "COMPLETED",
  );
  const completedStatusId = completedStatus?.id;

  const activeStatusId =
    activeTab === "SCHD" ? scheduledStatusId : completedStatusId;

  // Fetch Visits
  const isTodayFilter =
    filterStartDate &&
    filterEndDate &&
    filterStartDate.toDateString() === new Date().toDateString() &&
    filterEndDate.toDateString() === new Date().toDateString();



  const { data: visitsData, isLoading } = useGetVisitsByUserIdQuery(
    {
      user_ids: selectedEmIds.length > 0 ? selectedEmIds.map(Number) : [-1],
      offset: 0,
      date:
        activeTab === "SCHD"
          ? format(date, "yyyy-MM-dd")
          : isTodayFilter
            ? format(new Date(), "yyyy-MM-dd")
            : undefined,
      start_date:
        activeTab === "COMPLETED" && !isTodayFilter && filterStartDate
          ? format(filterStartDate, "yyyy-MM-dd")
          : undefined,
      end_date:
        activeTab === "COMPLETED" && !isTodayFilter && filterEndDate
          ? format(filterEndDate, "yyyy-MM-dd")
          : undefined,
      visit_status: activeStatusId,
    },
    { skip: !activeStatusId },
  );

  const visits = visitsData || [];

  // Local Search Filter
  const filteredVisits = useMemo(() => {
    let filtered = visits;

    // Search filter
    if (searchTerm) {
      filtered = visits.filter((v: any) => {
        const name =
          `${v.c_first_name || ""} ${v.c_last_name || ""}`.toLowerCase();

        const location = (v.visit_location_url || "").toLowerCase();

        return (
          name.includes(searchTerm.toLowerCase()) ||
          location.includes(searchTerm.toLowerCase())
        );
      });
    }

    // Sort by TIME ascending (AM to PM)
    return [...filtered].sort((a: any, b: any) => {
      const getMinutes = (dateTime: string) => {
        if (!dateTime) return 0;

        const timePart = dateTime.includes("T")
          ? dateTime.split("T")[1]
          : dateTime.split(" ")[1];

        if (!timePart) return 0;

        const [hours, minutes] = timePart
          .slice(0, 5)
          .split(":")
          .map(Number);

        return hours * 60 + minutes;
      };

      return getMinutes(a.visit_date_time) - getMinutes(b.visit_date_time);
    });
  }, [visits, searchTerm]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab, date]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredVisits.length / ITEMS_PER_PAGE),
  );
  const paginatedVisits = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredVisits.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredVisits, currentPage]);

  return (
    <div className="flex flex-col h-full bg-transparent pt-8 pb-20 px-4 space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-primary tracking-tight">
          Appointments
        </h1>
        <div className="flex items-center gap-4">
          {/* EM Selection Dropdown */}
          {(isAdmin || isRM) && emOptions.length > 0 && (
            <div className="flex items-center gap-2 min-w-[320px] max-w-[420px]">
              <Popover
                open={isEmDropdownOpen}
                onOpenChange={setIsEmDropdownOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full h-11 rounded-[16px] px-4 border-search-border bg-white shadow-sm font-bold text-primary justify-between"
                    title={
                      selectedEmIds.length === emOptions.length
                        ? "All Sales Executives selected"
                        : emOptions
                          .filter((e) =>
                            selectedEmIds.includes(e.id.toString()),
                          )
                          .map(
                            (e) =>
                              `${e.first_name || ""} ${e.last_name || ""}`,
                          )
                          .join(", ")
                    }
                  >
                    <div className="flex flex-wrap gap-1 max-w-[320px] overflow-hidden">
                      {selectedEmIds.length === 0 ? (
                        <span className="text-zinc-400">
                          Select Sales Executive
                        </span>
                      ) : selectedEmIds.length === emOptions.length ? (
                        <span className="font-semibold">All Sales Executives</span>
                      ) : (
                        emOptions
                          .filter((e) =>
                            selectedEmIds.includes(e.id.toString()),
                          )
                          .slice(0, 2)
                          .map((e) => (
                            <span
                              key={e.id}
                              className="px-2 py-0.5 rounded-full bg-[#0f3d6b]/10 text-[#0f3d6b] text-xs font-semibold"
                            >
                              {e.first_name}
                            </span>
                          ))
                      )}

                      {selectedEmIds.length > 2 &&
                        selectedEmIds.length !== emOptions.length && (
                          <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-xs font-semibold">
                            +{selectedEmIds.length - 2}
                          </span>
                        )}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[380px] p-3 rounded-2xl border border-zinc-200 bg-white shadow-2xl z-50">
                  <div className="flex flex-col space-y-1 max-h-[300px] overflow-y-auto">
                    {/* All option */}
                    <div
                      className={cn(
                        "flex items-center justify-between px-3 py-3 rounded-xl cursor-pointer transition-all border",
                        selectedEmIds.length === emOptions.length
                          ? "bg-[#0f3d6b]/5 border-[#0f3d6b]/20"
                          : "bg-white border-transparent hover:bg-zinc-50"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        if (selectedEmIds.length === emOptions.length) {
                          setSelectedEmIds([]); // unselect all
                        } else {
                          setSelectedEmIds(
                            emOptions.map((em) => em.id.toString()),
                          ); // select all
                        }
                      }}
                    >
                      <div className="flex items-center space-x-3 pointer-events-none">
                        <Checkbox
                           id="em-all"
                           checked={
                             selectedEmIds.length === emOptions.length &&
                             emOptions.length > 0
                           }
                        />
                        <div className="flex flex-col flex-1">
                          <span
                            className="font-semibold text-sm text-zinc-900"
                          >
                            Select All
                          </span>
                          <span className="text-xs text-zinc-500">
                            {emOptions.length} Sales Executives
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-zinc-100 my-1" />

                    {/* Individual EM options */}
                    {emOptions.map((em) => {
                      const emIdStr = em.id.toString();
                      return (
                        <div
                          key={em.id}
                          className={cn(
                            "flex items-center space-x-3 px-3 py-3 rounded-xl cursor-pointer transition-all border",
                            selectedEmIds.includes(emIdStr)
                              ? "bg-[#0f3d6b]/5 border-[#0f3d6b]/20"
                              : "bg-white border-transparent hover:bg-zinc-50"
                          )}
                          onClick={(e) => {
                            e.preventDefault();
                            if (selectedEmIds.includes(emIdStr)) {
                              setSelectedEmIds((prev) =>
                                prev.filter((id) => id !== emIdStr),
                              );
                            } else {
                              setSelectedEmIds((prev) => [...prev, emIdStr]);
                            }
                          }}
                        >
                          <div className="flex items-center space-x-3 pointer-events-none flex-1 min-w-0">
                            <Checkbox
                              id={`em-${em.id}`}
                              checked={selectedEmIds.includes(emIdStr)}
                            />
                            <span
                              className="flex-1 font-medium text-sm text-zinc-800 truncate"
                              title={`${em.first_name} ${em.last_name}`}
                            >
                              {em.first_name} {em.last_name}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>

      {/* 60/40 Search and Tabs Section */}
      <div className="flex items-center gap-4">
        {/* Search Input (60%) */}
        <div className="w-[60%] relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
          <Input
            placeholder="Search leads....."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 h-12 rounded-full bg-white dark:bg-zinc-900 border-search-border shadow-sm focus-visible:ring-primary/10 text-base placeholder:text-zinc-400"
          />
        </div>

        {/* Tabs (40%) */}
        <div className="w-[40%] bg-tab-rail dark:bg-zinc-900 rounded-xl h-[52px] p-1 flex shadow-inner">
          <button
            onClick={() => setActiveTab("SCHD")}
            className={cn(
              "flex-1 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2",
              activeTab === "SCHD"
                ? "bg-white dark:bg-zinc-800 text-[#0f3d6b] dark:text-white shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                : "text-zinc-500 hover:text-zinc-700",
            )}
          >
            Appointments
            {activeTab === "SCHD" && (
              <span className="bg-[#0f3d6b]/10 text-[#0f3d6b] px-2 py-0.5 rounded-full text-xs">
                {filteredVisits.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("COMPLETED")}
            className={cn(
              "flex-1 rounded-xl text-sm font-bold transition-all",
              activeTab === "COMPLETED"
                ? "bg-white dark:bg-zinc-800 text-[#0f3d6b] dark:text-white shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                : "text-zinc-500 hover:text-zinc-700",
            )}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Date Filter & Results */}
      <div className="pt-2">
        <div className="flex items-center w-full pb-2 mb-4">
          {activeTab === "SCHD" ? (
            <div className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-zinc-100">
              <CalendarIcon className="h-4 w-4 text-[#0f3d6b]" />
              <span>{format(new Date(), "'Today,' do MMMM yyyy")}</span>
            </div>
          ) : (
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="bg-white dark:bg-zinc-900 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 px-4 py-2.5 h-auto font-bold text-lg text-zinc-900 dark:text-zinc-100 justify-start rounded-xl group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-[#0f3d6b]/5 dark:bg-zinc-900 rounded-lg">
                      <CalendarIcon className="h-4 w-4 text-[#0f3d6b]" />
                    </div>
                    <span>
                      {filterStartDate && filterEndDate
                        ? `${format(filterStartDate, "do MMM, yyyy")} - ${format(filterEndDate, "do MMM, yyyy")}`
                        : "All Completed Visits"}
                    </span>
                  </div>
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-4 rounded-2xl" align="start">
                <Calendar
                  mode="range"
                  selected={{
                    from: filterStartDate,
                    to: filterEndDate,
                  }}
                  onSelect={(range) => {
                    if (range) {
                      setFilterStartDate(range.from);
                      setFilterEndDate(range.to);
                    } else {
                      setFilterStartDate(undefined);
                      setFilterEndDate(undefined);
                    }
                  }}
                  initialFocus
                  numberOfMonths={1}
                />
              </PopoverContent>
            </Popover>
          )}

          <div className="ml-6 flex-1 h-px bg-zinc-100 dark:bg-zinc-800"></div>
        </div>

        {/* Visits List */}
        <div className="mt-8 space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center p-12 text-zinc-500">
              Loading scheduled visits...
            </div>
          ) : filteredVisits.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm mb-4">
              <CalendarIcon className="h-12 w-12 text-zinc-300 mb-4" />
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                No visits found
              </h3>
              <p className="text-zinc-500 text-sm mt-1">
                There are no visits scheduled for this date.
              </p>
            </div>
          ) : (
            paginatedVisits.map((visit: any, index: number) => {
              const bgColors = [
                "bg-blue-400",
                "bg-indigo-300",
                "bg-emerald-300",
                "bg-amber-300",
                "bg-purple-400",
              ];
              const bgColor = bgColors[index % bgColors.length];
              const firstName = visit.c_first_name || "";
              const lastName = visit.c_last_name || "";
              const initials =
                `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() ||
                "NA";

              return (
                <div
                  key={visit.id || index}
                  className="flex items-center gap-6 p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm hover:shadow-md transition-all"
                >
                  <div
                    className={cn(
                      "h-16 w-16 rounded-2xl flex items-center justify-center font-black text-xl text-[#0f3d6b] shrink-0 shadow-sm",
                      bgColor,
                    )}
                  >
                    {initials}
                  </div>
                  <div className="flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-[#0f3d6b] dark:text-zinc-100 leading-tight">
                      {firstName} {lastName}
                    </h3>
                    <div className="flex items-center gap-4 mt-1.5 text-sm text-zinc-500 font-medium">
                      <span>{visit.lead_id || `LEAD-${visit.id}`}</span>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-zinc-400" />
                        <span>
                          {visit.visit_date_time
                            ? formatWithoutTimezone(visit.visit_date_time)
                            : "TBD"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 line-clamp-1 max-w-sm">
                        <MapPin className="h-4 w-4 text-zinc-400 shrink-0" />
                        {visit.visit_location_url ? (
                          <a
                            href={
                              visit.visit_location_url.startsWith("http")
                                ? visit.visit_location_url
                                : `https://${visit.visit_location_url}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline hover:text-blue-600 transition-colors"
                          >
                            {visit.visit_location_url}
                          </a>
                        ) : (
                          <span>No location provided</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {activeTab === "COMPLETED" && (
                    <Button
                      className="ml-auto bg-[#0f3d6b] hover:bg-[#0c3156] text-white rounded-full px-6 font-bold"
                      onClick={() =>
                        navigate(
                          `/visit-feedback/completed/${visit.id || visit.uuid}`,
                          { state: { visit } },
                        )
                      }
                    >
                      View Details
                    </Button>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Pagination Footer */}
        {filteredVisits.length > 0 && (
          <div className="mt-8 bg-white dark:bg-zinc-900 rounded-xl px-6 py-4 flex items-center justify-between shadow-sm">
            <div className="text-sm text-zinc-500 font-medium">
              Showing{" "}
              <span className="font-bold text-zinc-800 dark:text-zinc-200">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredVisits.length)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-zinc-800 dark:text-zinc-200">
                {filteredVisits.length}
              </span>{" "}
              Site Visits
            </div>
            <div className="flex items-center gap-1.5 text-sm font-bold">
              <Button
                variant="ghost"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="text-zinc-500 flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-800 px-3 h-9 disabled:opacity-50"
              >
                <span className="mr-1">&lt;</span> Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "ghost"}
                    onClick={() => setCurrentPage(pageNum)}
                    className={cn(
                      "h-9 w-9 p-0 rounded-xl transition-all",
                      currentPage === pageNum
                        ? "bg-[#0f3d6b] text-white hover:bg-[#0c3156]"
                        : "text-zinc-500 hover:bg-zinc-100",
                    )}
                  >
                    {pageNum}
                  </Button>
                ),
              )}

              <Button
                variant="ghost"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="text-zinc-900 border border-zinc-200 shadow-sm flex items-center hover:bg-zinc-50 dark:hover:bg-zinc-800 px-3 h-9 ml-2 disabled:opacity-50"
              >
                Next <span className="ml-1">&gt;</span>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Needs refactor of ScheduleVisitDialog to support no-lead context */}
      {isScheduleOpen && (
        <ScheduleVisitDialog
          open={isScheduleOpen}
          onClose={() => setIsScheduleOpen(false)}
          lead={null as any}
          siteVisitStatuses={siteVisitStatuses}
          rms={rms}
          onSubmit={async () => { }}
          isLoading={false}
        />
      )}
    </div>
  );
};
