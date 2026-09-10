import React, { useState, useEffect } from "react";
import { X, Search, Check, Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { cn } from "../../../utils";
import { useGetReporteesQuery } from "../../../features/users/api/usersApi";

type FilterSection = "projects" | "status" | "opdLeads" | "ipdLeads" | "rms" | "ems";

interface Option {
  value: string;
  label: string;
}

/*
const OPD_OPTIONS: Option[] = [
  { value: "opd_consultation", label: "OPD Consultation" },
  { value: "opd_followup", label: "OPD Follow-up" },
  { value: "opd_new", label: "OPD New Patient" },
  { value: "opd_active", label: "OPD Active" },
];

const IPD_OPTIONS: Option[] = [
  { value: "ipd_admission", label: "IPD Admission" },
  { value: "ipd_surgery", label: "IPD Surgery" },
  { value: "ipd_inpatient", label: "IPD In-Patient" },
  { value: "ipd_discharge", label: "IPD Discharge" },
  { value: "ipd_active", label: "IPD Active" },
];
*/

interface UserOption {
  id: number;
  first_name: string;
  last_name: string;
}

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: {
    statusIds: string[];
    projectIds: string[];
    rmIds: string[];
    emIds: string[];
    opdLeads?: string[];
    ipdLeads?: string[];
  }) => void;
  onReset: () => void;
  // Current applied values
  statusIds: string[];
  projectIds: string[];
  rmIds: string[];
  emIds: string[];
  opdLeads?: string[];
  ipdLeads?: string[];
  // Options
  statusOptions: Option[];
  projectOptions: Option[];
  rmOptions: UserOption[];
  // Visibility
  showRmFilter?: boolean;
  showEmFilter?: boolean;
  showProjectFilter?: boolean;
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-orange-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-teal-500",
  "bg-indigo-500",
];

function getAvatarColor(id: number) {
  return AVATAR_COLORS[id % AVATAR_COLORS.length];
}

export const FilterDialog = ({
  open,
  onClose,
  onApply,
  onReset,
  statusIds,
  projectIds,
  rmIds,
  emIds,
  opdLeads = [],
  ipdLeads = [],
  statusOptions,
  projectOptions,
  rmOptions,
  showRmFilter = true,
  showEmFilter = false,
  showProjectFilter = false,
}: FilterDialogProps) => {
  const [activeSection, setActiveSection] = useState<FilterSection>("status");
  const [localStatus, setLocalStatus] = useState<string[]>(statusIds);
  const [localProjects, setLocalProjects] = useState<string[]>(projectIds);
  const [localRmId, setLocalRmId] = useState<string>(rmIds[0] || "");
  const [localEmIds, setLocalEmIds] = useState<string[]>(emIds);
  const [localOpdLeads, setLocalOpdLeads] = useState<string[]>(opdLeads);
  const [localIpdLeads, setLocalIpdLeads] = useState<string[]>(ipdLeads);
  const [userSearch, setUserSearch] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  const { data: liveEms = [], isFetching: isFetchingEms } = useGetReporteesQuery(
    { reporting_manager_id: Number(localRmId), offset: 0 },
    { skip: !localRmId },
  );

  // Sync local state when dialog opens
  useEffect(() => {
    if (!open) {
      setIsInitialized(false);
      return;
    }
    
    if (open && !isInitialized) {
      setLocalStatus(statusIds || []);
      setLocalProjects(projectIds || []);
      setLocalRmId(rmIds[0] || "");
      setLocalEmIds(emIds || []);
      setLocalOpdLeads(opdLeads || []);
      setLocalIpdLeads(ipdLeads || []);
      setUserSearch("");
      setActiveSection("status");
      setIsInitialized(true);
    }
  }, [open, isInitialized, projectIds, rmIds, emIds, statusIds, opdLeads, ipdLeads]);

  const sections: { key: FilterSection; label: string; show: boolean }[] = [
    // { key: "projects" as FilterSection, label: "Projects", show: showProjectFilter },
    { key: "status" as FilterSection, label: "Status", show: true },
    // { key: "opdLeads" as FilterSection, label: "OPD Leads", show: true },
    // { key: "ipdLeads" as FilterSection, label: "IPD Leads", show: true },
    { key: "rms" as FilterSection, label: "Sales Heads", show: showRmFilter },
    // { key: "ems" as FilterSection, label: "Sales Executives", show: showEmFilter },
  ].filter((s) => s.show);

  const toggleMulti = (
    value: string,
    current: string[],
    setter: (v: string[]) => void,
  ) => {
    setter(
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    );
  };

  const handleSelectRm = (id: string) => {
    if (localRmId === id) {
      setLocalRmId("");
      setLocalEmIds([]);
    } else {
      setLocalRmId(id);
      setLocalEmIds([]);
    }
  };

  const handleApply = () => {
    onApply({
      statusIds: localStatus,
      projectIds: localProjects,
      rmIds: localRmId ? [localRmId] : [],
      emIds: localEmIds,
      opdLeads: localOpdLeads,
      ipdLeads: localIpdLeads,
    });
    onClose();
  };

  const handleReset = () => {
    setLocalStatus([]);
    setLocalProjects([]);
    setLocalRmId("");
    setLocalEmIds([]);
    setLocalOpdLeads([]);
    setLocalIpdLeads([]);
    onReset();
    onClose();
  };

  const filteredRms = rmOptions.filter((u) =>
    `${u.first_name} ${u.last_name}`
      .toLowerCase()
      .includes(userSearch.toLowerCase()),
  );

  const filteredEms = liveEms.filter((u) =>
    `${u.first_name} ${u.last_name}`
      .toLowerCase()
      .includes(userSearch.toLowerCase()),
  );

  const renderChips = (
    selected: string[],
    options: Option[],
    onRemove: (v: string) => void,
  ) => {
    if (selected.length === 0)
      return (
        <p className="text-sm text-muted-foreground italic">None selected</p>
      );
    return (
      <div className="flex flex-wrap gap-2">
        {selected.map((v) => {
          const label = options.find((o) => o.value === v)?.label ?? v;
          return (
            <span
              key={v}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-primary-foreground"
            >
              {label}
              <button onClick={() => onRemove(v)} className="hover:opacity-70 cursor-pointer">
                <X className="h-3 w-3" />
              </button>
            </span>
          );
        })}
      </div>
    );
  };

  const renderUserRow = (
    u: UserOption,
    isSelected: boolean,
    onClick: () => void,
    role: string,
  ) => (
    <button
      key={u.id}
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer",
        isSelected
          ? "bg-primary/8 dark:bg-primary/10"
          : "hover:bg-muted/40",
      )}
    >
      <div
        className={cn(
          "w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold",
          getAvatarColor(u.id),
        )}
      >
        {getInitials(u.first_name, u.last_name)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">
          {u.first_name} {u.last_name}
        </p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>
      {/* Jira-style check indicator */}
      <div
        className={cn(
          "shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
          isSelected
            ? "border-primary bg-primary"
            : "border-border/60",
        )}
      >
        {isSelected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </div>
    </button>
  );

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="p-0 w-[95vw] max-w-5xl gap-0 overflow-hidden rounded-2xl border-border-2 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-border-2">
          <h2 className="text-lg font-bold text-foreground">Filter leads</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Filter by the following options
          </p>
        </div>

        {/* Body */}
        <div className="flex flex-col md:flex-row h-[70vh] min-h-0 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-full md:w-40 border-r border-border-2 shrink-0 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.key}
                onClick={() => {
                  setActiveSection(section.key);
                  setUserSearch("");
                }}
                className={cn(
                  "w-full text-left px-4 py-4 text-sm font-medium border-b border-border-2 transition-colors cursor-pointer",
                  activeSection === section.key
                    ? "bg-blue-50 dark:bg-blue-950/20 text-primary font-bold border-l-2 border-l-primary"
                    : "text-muted-foreground hover:bg-muted/50",
                )}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Right Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-5 py-4 space-y-5 min-w-0">
            {/* ── Status ── */}
            {activeSection === "status" && (
              <>
                <div>
                  <p className="text-sm font-bold text-foreground mb-3">
                    Selected
                  </p>
                  {renderChips(localStatus, statusOptions, (v) =>
                    setLocalStatus(localStatus.filter((s) => s !== v)),
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground mb-3">
                    Select from
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions
                      .filter((o) => !localStatus.includes(o.value))
                      .map((o) => (
                        <button
                          key={o.value}
                          onClick={() =>
                            toggleMulti(o.value, localStatus, setLocalStatus)
                          }
                          className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border-2 text-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
                        >
                          {o.label}
                        </button>
                      ))}
                  </div>
                </div>
              </>
            )}

            {/* ── Projects (Commented out) ── */}
            {/*
            {activeSection === "projects" && (
              <>
                <div>
                  <p className="text-sm font-bold text-foreground mb-3">
                    Selected
                  </p>
                  {renderChips(localProjects, projectOptions, (v) =>
                    setLocalProjects(localProjects.filter((p) => p !== v)),
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground mb-3">
                    Select from
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {projectOptions
                      .filter((o) => !localProjects.includes(o.value))
                      .map((o) => (
                        <button
                          key={o.value}
                          onClick={() =>
                            toggleMulti(o.value, localProjects, setLocalProjects)
                          }
                          className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border-2 text-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
                        >
                          {o.label}
                        </button>
                      ))}
                  </div>
                </div>
              </>
            )}
            */}

            {/* ── OPD Leads (Commented out) ── */}
            {/*
            {activeSection === "opdLeads" && (
              <>
                <div>
                  <p className="text-sm font-bold text-foreground mb-3">
                    Selected
                  </p>
                  {renderChips(localOpdLeads, OPD_OPTIONS, (v) =>
                    setLocalOpdLeads(localOpdLeads.filter((t) => t !== v)),
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground mb-3">
                    Select from
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {OPD_OPTIONS.filter((o) => !localOpdLeads.includes(o.value)).map((o) => (
                      <button
                        key={o.value}
                        onClick={() =>
                          toggleMulti(o.value, localOpdLeads, setLocalOpdLeads)
                        }
                        className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border-2 text-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            */}

            {/* ── IPD Leads (Commented out) ── */}
            {/*
            {activeSection === "ipdLeads" && (
              <>
                <div>
                  <p className="text-sm font-bold text-foreground mb-3">
                    Selected
                  </p>
                  {renderChips(localIpdLeads, IPD_OPTIONS, (v) =>
                    setLocalIpdLeads(localIpdLeads.filter((t) => t !== v)),
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground mb-3">
                    Select from
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {IPD_OPTIONS.filter((o) => !localIpdLeads.includes(o.value)).map((o) => (
                      <button
                        key={o.value}
                        onClick={() =>
                          toggleMulti(o.value, localIpdLeads, setLocalIpdLeads)
                        }
                        className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border-2 text-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            */}

            {/* ── RM's (Sales Heads, single-select, Jira-style) ── */}
            {activeSection === "rms" && (
              <>
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search Sales Heads..."
                    className="pl-9 rounded-lg h-10 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  {filteredRms.map((u) =>
                    renderUserRow(
                      u,
                      localRmId === String(u.id),
                      () => handleSelectRm(String(u.id)),
                      "Sales Head",
                    ),
                  )}
                </div>
              </>
            )}

            {/* ── EM's (Sales Executives, commented out) ── */}
            {/*
            {activeSection === "ems" && (
              <>
                {!localRmId ? (
                  <div className="flex flex-col items-center justify-center h-40 gap-2 text-muted-foreground">
                    <p className="text-sm font-medium">Select a Sales Head first</p>
                    <p className="text-xs">Go to the Sales Heads tab to pick a Sales Head.</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="text-sm font-bold text-foreground mb-3">Selected</p>
                      {localEmIds.length === 0 ? (
                        <p className="text-sm text-muted-foreground italic">None selected</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {localEmIds.map((v) => {
                            const user = filteredEms.find((u) => String(u.id) === v) ||
                              liveEms.find((u) => String(u.id) === v);
                            const label = user ? `${user.first_name} ${user.last_name}` : v;
                            return (
                              <span
                                key={v}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-primary-foreground"
                              >
                                {label}
                                <button
                                  onClick={() => setLocalEmIds(localEmIds.filter((e) => e !== v))}
                                  className="hover:opacity-70"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-foreground mb-3">Select from</p>
                      <div className="relative mb-3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          value={userSearch}
                          onChange={(e) => setUserSearch(e.target.value)}
                          placeholder="Search Sales Executives..."
                          className="pl-9 rounded-lg h-10 text-sm"
                        />
                      </div>

                      {isFetchingEms ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        </div>
                      ) : filteredEms.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-6">
                          No sales executives found.
                        </p>
                      ) : (
                        <div className="space-y-1 overflow-y-auto">
                          {filteredEms
                            .filter((u) => !localEmIds.includes(String(u.id)))
                            .map((u) =>
                              renderUserRow(
                                u,
                                false,
                                () => toggleMulti(String(u.id), localEmIds, setLocalEmIds),
                                "Sales Executive",
                              ),
                            )}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
            */}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 md:px-6 py-4 border-t border-border-2 bg-background">
          <Button
            variant="ghost"
            onClick={handleReset}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
          >
            Clear filters
          </Button>
          <div className="flex w-full sm:w-auto gap-3 justify-end">
            <Button variant="ghost" onClick={onClose} className="text-muted-foreground cursor-pointer">
              Cancel
            </Button>
            <Button onClick={handleApply} className="cursor-pointer">Apply filter</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
