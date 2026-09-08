import React, { useState } from 'react';
import { DataTable } from '../../../shared/components/DataTable/DataTable';
import { JunkValidationDialog } from './JunkValidationDialog';
import { Pencil, Trash2, MoreVertical, Eye, CalendarClock, UserCircle2, User, ChevronDown } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from '../../../components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../../../components/ui/command';
import type { Lead, ProjectEmAndRmData, ProjectRmData } from '../types';
import { type ColumnDef } from '../../../shared/components/DataTable/DataTable';
import { useMasterDataLookup } from '../../../shared/hooks/useMasterDataLookup';
import { usePermissions } from '../../../hooks/usePermissions';
import { PERMISSIONS } from '../../../config/permissions';
import { useGetAllProjectEmAndRmDataQuery, useLazyGetLeadByIdQuery } from '../api/leadsApi';
import { cn, getProjectStatusOptions } from '../../../utils';
import { Checkbox } from '../../../components/ui/checkbox';
import { MessageSquare } from 'lucide-react';

// --- Initials Avatar ---
const InitialsAvatar = ({ firstName, lastName, size = 'sm' }: { firstName?: string; lastName?: string; size?: 'sm' | 'md' }) => {
  const initials = `${(firstName || '')[0] || ''}${(lastName || '')[0] || ''}`.toUpperCase() || '?';
  const sizeClasses = size === 'md' ? 'h-7 w-7 text-[10px]' : 'h-6 w-6 text-[9px]';
  return (
    <div className={cn(
      sizeClasses,
      "rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center font-bold shrink-0"
    )}>
      {initials}
    </div>
  );
};

const UnassignedAvatar = () => (
  <div className="h-6 w-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
    <User className="h-3.5 w-3.5 text-zinc-400" />
  </div>
);

// --- Jira-style Assignee Popover for RM ---
const RmAssigneeCell = ({ lead, onAssign, projectRmEm, disabled }: {
  lead: Lead;
  onAssign: (lead: Lead, rmId: number | null) => void;
  projectRmEm: ProjectEmAndRmData[];
  disabled: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Get RMs for this lead's project
  const projectEntry = projectRmEm.find((p) => p.project_id === lead.project_id);
  const managers = projectEntry?.rm_data || [];

  const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();
  const filtered = managers.filter((m) => {
    const name = normalize(`${m.rm_first_name} ${m.rm_last_name}`);
    return !search || normalize(search).split(' ').every((w) => name.includes(w));
  });

  const assigned = managers.find((m) => m.id === lead.assigned_to_rm);

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <button
            style={{ minWidth: '100px', height: '32px', borderRadius: '12px' }}
            className={cn(
              "flex items-center transition-all px-2 gap-2 w-full max-w-[140px]",
              "bg-primary text-white font-bold text-[10px] shadow-sm hover:bg-primary/90 justify-center",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {assigned ? (
              <>
                <InitialsAvatar firstName={assigned.rm_first_name} lastName={assigned.rm_last_name} />
                <span
                  className="font-bold text-white truncate text-xs"
                  title={`${assigned.rm_first_name} ${assigned.rm_last_name}`}
                >
                  {assigned.rm_first_name} {assigned.rm_last_name}
                </span>
              </>
            ) : (
              <span>Assign Sales Head</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search Sales Head..."
              className="h-9 text-xs"
              value={search}
              onValueChange={setSearch}
            />
            <CommandEmpty className="py-3 text-xs text-center text-zinc-400">
              {managers.length === 0 ? 'No Sales Heads for this project' : 'No Sales Head found'}
            </CommandEmpty>
            <CommandGroup className="max-h-48 overflow-y-auto">
              {filtered.map((m) => (
                <CommandItem
                  key={m.id}
                  value={`${m.rm_first_name} ${m.rm_last_name}`}
                  onSelect={() => {
                    onAssign(lead, m.id);
                    setOpen(false);
                    setSearch('');
                  }}
                  className={cn(
                    "flex items-center gap-2 py-2 cursor-pointer",
                    lead.assigned_to_rm === m.id && "bg-primary/5"
                  )}
                >
                  <InitialsAvatar firstName={m.rm_first_name} lastName={m.rm_last_name} />
                  <span className="text-xs font-medium">{m.rm_first_name} {m.rm_last_name}</span>
                  {lead.assigned_to_rm === m.id && (
                    <span className="ml-auto text-[9px] text-primary font-bold">CURRENT</span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

// --- EM Popover Content (uses project RM/EM hierarchy) ---
const EmAssigneePopoverContent = ({
  lead,
  onAssign,
  setOpen,
  projectRmEm,
}: {
  lead: Lead;
  onAssign: (lead: Lead, emId: number | null) => void;
  setOpen: (open: boolean) => void;
  projectRmEm: ProjectEmAndRmData[];
}) => {
  const [search, setSearch] = useState('');

  // Get EMs for the assigned RM within this lead's project
  const projectEntry = projectRmEm.find((p) => p.project_id === lead.project_id);
  const rmEntry = projectEntry?.rm_data.find((r) => r.id === lead.assigned_to_rm);
  const ems = rmEntry?.em_data || [];

  const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim();
  const filteredEms = ems.filter((em) => {
    const name = normalize(`${em.em_first_name} ${em.em_last_name}`);
    return !search || normalize(search).split(' ').every((w) => name.includes(w));
  });

  return (
    <Command shouldFilter={false}>
      <CommandInput
        placeholder="Search Sales Executive..."
        className="h-9 text-xs"
        value={search}
        onValueChange={setSearch}
      />
      <CommandEmpty className="py-3 text-xs text-center text-zinc-400">
        {!lead.assigned_to_rm
          ? 'Select a Sales Head first'
          : ems.length === 0
            ? 'No Sales Executives for this Sales Head'
            : 'No Sales Executive found'}
      </CommandEmpty>
      <CommandGroup className="max-h-48 overflow-y-auto">
        {filteredEms.map((em) => (
          <CommandItem
            key={em.id}
            value={`${em.em_first_name}${em.em_last_name}`}
            onSelect={() => {
              onAssign(lead, em.id);
              setOpen(false);
            }}
            className={cn(
              "flex items-center gap-2 py-2 cursor-pointer",
              lead.assigned_to_em === em.id && "bg-primary/5"
            )}
          >
            <InitialsAvatar firstName={em.em_first_name} lastName={em.em_last_name} />
            <span className="text-xs font-medium">{em.em_first_name} {em.em_last_name}</span>
            {lead.assigned_to_em === em.id && (
              <span className="ml-auto text-[9px] text-primary font-bold">CURRENT</span>
            )}
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  );
};

// --- Jira-style Assignee Cell for EM ---
const EmAssigneeCell = ({ lead, onAssign, disabled, emLabel, projectRmEm }: {
  lead: Lead;
  onAssign: (lead: Lead, emId: number | null) => void;
  disabled: boolean;
  emLabel: string;
  projectRmEm: ProjectEmAndRmData[];
}) => {
  const [open, setOpen] = useState(false);
  const isDisabled = disabled || !lead.assigned_to_rm;

  const initials = emLabel !== '--' ? emLabel.split(' ').map(n => n[0]).join('') : '';

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Popover open={open} onOpenChange={(v) => { if (!isDisabled) setOpen(v); }}>
        <PopoverTrigger asChild disabled={isDisabled}>
          <button
            style={{ minWidth: '100px', height: '32px', borderRadius: '12px' }}
            className={cn(
              "flex items-center transition-all px-2 gap-2 w-full max-w-[140px]",
              "bg-primary text-white font-bold text-[10px] shadow-sm hover:bg-primary/90 justify-center",
              isDisabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {lead.assigned_to_em ? (
              <>
                <div className="h-6 w-6 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center font-bold shrink-0 text-[9px]">
                  {initials}
                </div>
                <span
                  className="font-bold text-white truncate text-xs"
                  title={emLabel}
                >
                  {emLabel}
                </span>
              </>
            ) : (
              <span>{!lead.assigned_to_rm ? 'Select Sales Head first' : 'Assign Sales Executive'}</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0" align="start">
          {open && (
            <EmAssigneePopoverContent
              lead={lead}
              onAssign={onAssign}
              setOpen={setOpen}
              projectRmEm={projectRmEm}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

// --- Jira-style Status Cell with Search ---
const StatusCell = ({
  lead,
  options,
  onUpdateStatus,
  disabled,
}: {
  lead: Lead;
  options: { id: number; label: string; lead_status_id: number }[];
  onUpdateStatus: (lead: Lead, projectLeadStatusId: number) => void;
  disabled: boolean;
}) => {
  const [open, setOpen] = useState(false);
  // Find current status using project_lead_status_id
  const currentStatus = options.find((o) => o.id === lead.project_lead_status_id);
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((o) =>
    o.label?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Popover open={open} onOpenChange={(v) => { if (!disabled) setOpen(v); }}>
        <PopoverTrigger asChild disabled={disabled}>
          <button
            className={cn(
              "h-8 text-[11px] font-bold uppercase w-36 bg-source-bg text-primary border-2 border-primary/40 rounded-full focus:ring-0 px-4 hover:border-primary transition-colors flex items-center justify-between",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <span className="truncate mr-1">
              {currentStatus?.label || "Select Status"}
            </span>
            <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search status..."
              className="h-9 text-xs"
              value={search}
              onValueChange={setSearch}
            />
            <CommandEmpty className="py-3 text-xs text-center text-zinc-400">
              No status found
            </CommandEmpty>
            <CommandGroup className="max-h-60 overflow-y-auto">
              {filteredOptions.map((o) => (
                <CommandItem
                  key={o.id}
                  value={o.label}
                  onSelect={() => {
                    onUpdateStatus(lead, o.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-2 py-2 cursor-pointer text-[10px] uppercase font-bold",
                    lead.project_lead_status_id === o.id && "bg-primary/5 text-primary"
                  )}
                >
                  <span>{o.label}</span>
                  {lead.project_lead_status_id === o.id && (
                    <span className="ml-auto text-[9px] text-primary font-bold">CURRENT</span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};


// --- Main LeadTable ---
interface LeadTableProps {
  data: Lead[];
  isLoading: boolean;
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (uuid: string) => void;
  onScheduleVisit?: (lead: Lead) => void;
  onUpdateStatus?: (lead: Lead, newStatusId: number) => void;
  onAssignRm?: (lead: Lead, rmId: number | null) => void;
  onAssignEm?: (lead: Lead, emId: number | null) => void;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  // Selection
  selectedUuids?: string[];
  onSelectUuids?: (uuids: string[]) => void;
  offset?: number;
  maxHeight?: string;
}

export const LeadTable = ({
  data,
  isLoading,
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
  onEdit,
  onDelete,
  onScheduleVisit,
  onUpdateStatus,
  onAssignRm,
  onAssignEm,
  sortField,
  sortOrder,
  onSort,
  selectedUuids = [],
  onSelectUuids,
  offset = 0,
  maxHeight,
}: LeadTableProps) => {
  const dataArray = data || [];
  const [junkConfirm, setJunkConfirm] = useState<{ lead: Lead, newStatusId: number, isLoading?: boolean, error?: string | null } | null>(null);
  const [getLeadById] = useLazyGetLeadByIdQuery();
  const { currentRole, can } = usePermissions();
  const roleCode = currentRole?.code || '';

  const {
    getStatusLabel,
    getProjectLabel,
    getEmLabel,
    getSourceLabel,
    getBranchLabel,
    getSpecialisationLabel,
    masterData,
    projectLeadStatuses,
    isLoading: isLookupLoading
  } = useMasterDataLookup();

  const { data: projectRmEm = [] } = useGetAllProjectEmAndRmDataQuery();
  const navigate = useNavigate();

  const fallback = (value: React.ReactNode) => value ?? '--';

  const isAllSelected = dataArray.length > 0 && selectedUuids.length === dataArray.length;

  const columns: ColumnDef<Lead>[] = React.useMemo(() =>
    [
      ...(can(PERMISSIONS.LEAD_BULK_ACTIONS) ? [
        {
          key: 'selection',
          header: (
            <div className="flex items-center justify-center h-full">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={(checked: boolean) => {
                  if (checked) {
                    onSelectUuids?.(dataArray.map(l => l.uuid));

                  } else {
                    onSelectUuids?.([]);
                  }
                }}
                aria-label="Select all"
              />
            </div>
          ),
          width: '40px',
          render: (l: Lead) => (
            <div className="flex items-center justify-center">
              <Checkbox
                checked={selectedUuids.includes(l.uuid)}
                onCheckedChange={(checked: boolean) => {
                  const newSelection = checked
                    ? [...selectedUuids, l.uuid]
                    : selectedUuids.filter(id => id !== l.uuid);
                  onSelectUuids?.(newSelection);
                }}
                aria-label={`Select lead ${l.lead_id}`}
              />
            </div>
          )
        }
      ] : []),
      {
        key: 'lead_id',
        header: 'LEAD ID',
        width: '110px',
        render: (l: Lead) => (
          <Link
            to={`/leads/${l.uuid}`}
            state={{ lead: l, branch_id: l.branch_id, branch: l.branch, branch_name: l.branch_name, hospital_branch: l.hospital_branch, specialisation_id: l.specialisation_id, department: l.department }}
            className="text-secondary-foreground font-semibold hover:text-primary transition-colors text-xs"
          >
            #{fallback(l.lead_id)}
          </Link>
        ),
      },
      {
        key: 'customer_name',
        header: 'CUSTOMER NAME',
        sortable: true,
        width: '150px',
        render: (l: Lead) => (
          <span className="font-bold text-xs" style={{ color: '#191C1E' }}>
            {fallback(l.first_name)} {l.last_name || ''}
          </span>
        ),
      },
      {
        key: 'contact_details',
        header: 'CONTACT DETAILS',
        width: '150px',
        render: (l: Lead) => (
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-xs" style={{ color: '#334155' }}>{fallback(l.phone_number)}</span>
            <span className="text-zinc-400 text-[11px] truncate">{l.email_address || '--'}</span>
          </div>
        ),
      },

      /* Income column commented out as requested
      {
        key: 'income',
        header: 'INCOME',
        width: '120px',
        render: (l: Lead) => (
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            {l.income ? `₹${l.income.toLocaleString('en-IN')}` : '--'}
          </span>
        ),
      },
      */
      {
        key: 'created_on',
        header: 'CREATION DATE',
        sortable: true,
        width: '160px',
        render: (l: Lead) => {
          if (!l.created_on) return '--';

          const formatted = new Date(l.created_on).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });

          return (
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              {formatted}
            </span>
          );
        },
      },
      {
        key: 'source_id',
        header: 'SOURCE',
        width: '140px',
        render: (l: Lead) => {
          const sourceText = l.source || getSourceLabel(l.source_id);
          return (
            <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-source-bg text-primary">
              {sourceText && sourceText !== '--' ? sourceText.split(' ')[0] : '--'}
            </span>
          );
        },
      },
      {
        key: 'branch_id',
        header: 'BRANCH',
        width: '150px',
        render: (l: Lead) => (
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            {l.branch_id ? getBranchLabel(l.branch_id) : (l.hospital_branch || l.branch || l.branch_name || getProjectLabel(l.project_id) || '--')}
          </span>
        ),
      },
      {
        key: 'specialisation_id',
        header: 'DEPARTMENT',
        width: '160px',
        render: (l: Lead) => (
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            {l.specialisation_id ? getSpecialisationLabel(l.specialisation_id) : (l.specialization || l.department || '--')}
          </span>
        ),
      },
      {
        key: 'enquiries',
        header: <div className="text-center w-full">ENQUIRIES</div>,
        width: '120px',
        render: (l: Lead) => (
          <div className="text-center w-full">
            <Link
              to={`/leads/${l.uuid}?tab=enquiries`}
              state={{ lead: l, branch_id: l.branch_id, branch: l.branch, branch_name: l.branch_name, hospital_branch: l.hospital_branch, specialisation_id: l.specialisation_id, department: l.department }}
              className="font-bold text-xs text-[#0f3d6b] hover:text-[#0f3d6b]/80 underline decoration-[#0f3d6b] transition-colors"
            >
              {l.enquiries ?? l.enquires?.length ?? 0}
            </Link>
          </div>
        ),
      },
      {
        key: 'project_lead_status_id',
        header: 'STATUS',
        sortable: true,
        width: '150px',
        render: (l: Lead) => {
          const options = getProjectStatusOptions(
            l.project_id,
            projectLeadStatuses
          );
          const filteredOptions = options.filter(
            (o: { id: number; label: string; lead_status_id: number }) => o.label !== 'Junk Lead'
          );

          return (
            <StatusCell
              lead={l}
              options={filteredOptions}
              onUpdateStatus={(lead, newStatusId) => {
                const option = filteredOptions.find((o: any) => o.id === newStatusId);
                const statusMaster = masterData?.lead_statuses?.find((s: any) => s.id === option?.lead_status_id);
                if (statusMaster?.code === 'JUNKPE') {
                  setJunkConfirm({ lead, newStatusId, isLoading: true });

                  getLeadById({ uuid: lead.uuid }).unwrap()
                    .then((fetchedLead) => {
                      setJunkConfirm((prev) => prev ? { ...prev, lead: fetchedLead, isLoading: false } : null);
                    })
                    .catch((err) => {
                      console.error("Failed to fetch lead details:", err);
                      setJunkConfirm((prev) => prev ? { ...prev, isLoading: false, error: "Failed to load attempts. Please try again." } : null);
                    });
                } else {
                  if (onUpdateStatus) onUpdateStatus(lead, newStatusId);
                }
              }}
              disabled={!can(PERMISSIONS.LEAD_STATUS_UPDATE)}
            />
          );
        },
      },
      // Conditional: RM for Admin/Super Admin (SADMIN, ADMIN)
      ...((roleCode === 'SADMIN' || roleCode === 'ADMIN') ? [
        {
          key: 'assigned_to_rm',
          header: 'ASSIGNED SALES HEAD',
          width: '220px',
          render: (l: Lead) => (
            <RmAssigneeCell
              lead={l}
              onAssign={onAssignRm || (() => { })}
              projectRmEm={projectRmEm}
              disabled={!can(PERMISSIONS.LEAD_EDIT)}
            />
          ),
        }
      ] : []),
      /* Assigned Sales Executive column commented out as requested
      ...((roleCode === 'SADMIN' || roleCode === 'ADMIN' || roleCode === 'RELMNG') ? [
        {
          key: 'assigned_to_em',
          header: 'ASSIGNED SALES EXECUTIVE',
          width: '220px',
          render: (l: Lead) => (
            <EmAssigneeCell
              lead={l}
              onAssign={onAssignEm || (() => { })}
              disabled={!can(PERMISSIONS.LEAD_EDIT)}
              emLabel={getEmLabel(l.assigned_to_em)}
              projectRmEm={projectRmEm}
            />
          ),
        }
      ] : []),
      */
      {
        key: 'actions',
        header: 'ACTIONS',
        width: '120px',
        render: (lead: Lead) => (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 text-xs">
                <DropdownMenuLabel className="font-normal text-zinc-500 uppercase px-3 py-2">
                  Lead Actions
                </DropdownMenuLabel>
                <Link
                  to={`/leads/${lead.uuid}`}
                  state={{ lead, branch_id: lead.branch_id, branch: lead.branch, branch_name: lead.branch_name, hospital_branch: lead.hospital_branch, specialisation_id: lead.specialisation_id, department: lead.department }}
                >
                  <DropdownMenuItem className="cursor-pointer gap-2 py-2">
                    <Eye className="h-4 w-4 text-zinc-500" />
                    <span>View Details</span>
                  </DropdownMenuItem>
                </Link>

                {can(PERMISSIONS.LEAD_EDIT) && (
                  <DropdownMenuItem
                    className="cursor-pointer gap-2 py-2"
                    onClick={() => onEdit(lead)}
                  >
                    <Pencil className="h-4 w-4 text-zinc-500" />
                    <span>Edit Lead</span>
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer gap-2 py-2"
                  onClick={() => navigate(`/leads/${lead.uuid}?tab=chats&type=CM`, {
                    state: { lead, branch_id: lead.branch_id, branch: lead.branch, branch_name: lead.branch_name, hospital_branch: lead.hospital_branch, specialisation_id: lead.specialisation_id, department: lead.department }
                  })}
                >
                  <MessageSquare className="h-4 w-4 text-indigo-500" />
                  <span>Initialize Chat</span>
                </DropdownMenuItem>

                {can(PERMISSIONS.LEAD_SCHEDULE_VISIT) && onScheduleVisit && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onScheduleVisit(lead)} className="cursor-pointer gap-2 py-2">
                      <CalendarClock className="h-4 w-4 text-emerald-500" />
                      <span>Schedule Visit</span>
                    </DropdownMenuItem>
                  </>
                )}

                {can(PERMISSIONS.LEAD_DELETE) && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(lead.uuid)}
                      className="cursor-pointer gap-2 py-2 text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete Lead</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ], [isAllSelected, selectedUuids, can, roleCode, masterData, projectLeadStatuses, projectRmEm, onAssignRm, onAssignEm, onUpdateStatus, onEdit, onScheduleVisit, onDelete, getSourceLabel, getProjectLabel, getEmLabel]);


  return (
    <>
      <DataTable
        columns={columns as ColumnDef<Lead>[]}
        data={dataArray}
        isLoading={isLoading || isLookupLoading}
        page={page}
        limit={limit}
        total={total}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        rowKey={(l) => l.uuid}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={onSort as (key: string) => void}
        offset={offset}
        maxHeight={maxHeight}
      />
      <JunkValidationDialog
        open={!!junkConfirm}
        onClose={() => setJunkConfirm(null)}
        onConfirm={() => {
          if (junkConfirm && onUpdateStatus && !junkConfirm.error) {
            onUpdateStatus(junkConfirm.lead, junkConfirm.newStatusId);
          }
          setJunkConfirm(null);
        }}
        lead={junkConfirm?.lead || null}
        projectLabel={junkConfirm?.lead?.project_id ? getProjectLabel(junkConfirm.lead.project_id) : 'PLANET GREEN'}
        attemptsCount={junkConfirm?.lead?.calls?.length || 0}
        // attemptsCount={5}
        isLoading={junkConfirm?.isLoading}
        error={junkConfirm?.error}
      />
    </>
  );
};
