import React, { useState } from 'react';
import { DataTable } from '../../../shared/components/DataTable/DataTable';
import type { ColumnDef } from '../../../shared/components/DataTable/DataTable';
import { Button } from '../../../components/ui/button';
import type { Lead } from '../types';
import { useMasterDataLookup } from '../../../shared/hooks/useMasterDataLookup';
import { Link } from 'react-router-dom';
import { useGetLeadsQuery } from '../api/leadsApi';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { FilterDialog } from '../../../shared/components/FilterDialog/FilterDialog';
import { Loader2, SlidersHorizontal } from 'lucide-react';

interface JunkLeadsPageProps {
  onVerify: (lead: Lead) => void;
  canVerify: boolean;
  search: string;
}

type DummyJunkLead = Lead & {
  source_name: string;
  project_name: string;
  status: string;
  rm_name: string;
  em_name: string;
};

const DUMMY_JUNK_LEADS: DummyJunkLead[] = [
  {
    uuid: 'dummy-junk-001', lead_id: 1001, customer_uuid: 'dummy-customer-001',
    project_id: 101, source_id: 1, source_employee_user_id: null, lead_priority_id: 2,
    assigned_to_rm: 201, assigned_to_em: 301, is_active: 1, created_by: 1,
    created_on: '2026-09-15T09:30:00.000Z', updated_by: null, updated_on: null,
    first_name: 'Ananya', last_name: 'Reddy', phone_number: '+91 98765 43210',
    email_address: 'ananya.reddy@example.com', junk_reason: 'Duplicate enquiry',
    source_name: 'Website', project_name: 'Nizampet', status: 'Junk Pending',
    rm_name: 'Rahul Mehta', em_name: 'Nisha Kapoor',
  },
  {
    uuid: 'dummy-junk-002', lead_id: 1002, customer_uuid: 'dummy-customer-002',
    project_id: 102, source_id: 2, source_employee_user_id: null, lead_priority_id: 1,
    assigned_to_rm: 202, assigned_to_em: 302, is_active: 1, created_by: 1,
    created_on: '2026-09-14T11:10:00.000Z', updated_by: null, updated_on: null,
    first_name: 'Vikram', last_name: 'Shah', phone_number: '+91 91234 56789',
    email_address: 'vikram.shah@example.com', junk_reason: 'Invalid phone number',
    source_name: 'Doctor Referral', project_name: 'Kondapur', status: 'Junk Pending',
    rm_name: 'Priya Sharma', em_name: 'Arjun Nair',
  },
  {
    uuid: 'dummy-junk-003', lead_id: 1003, customer_uuid: 'dummy-customer-003',
    project_id: 103, source_id: 3, source_employee_user_id: null, lead_priority_id: 1,
    assigned_to_rm: 203, assigned_to_em: 303, is_active: 1, created_by: 1,
    created_on: '2026-09-13T14:45:00.000Z', updated_by: null, updated_on: null,
    first_name: 'Meera', last_name: 'Iyer', phone_number: '+91 99887 76655',
    email_address: 'meera.iyer@example.com', junk_reason: 'Test enquiry',
    source_name: 'Walk-in', project_name: 'KPHB', status: 'Junk Confirmed',
    rm_name: 'Karan Verma', em_name: 'Sneha Rao',
  },
  {
    uuid: 'dummy-junk-004', lead_id: 1004, customer_uuid: 'dummy-customer-004',
    project_id: 104, source_id: 4, source_employee_user_id: null, lead_priority_id: 3,
    assigned_to_rm: 204, assigned_to_em: null, is_active: 1, created_by: 1,
    created_on: '2026-09-12T10:20:00.000Z', updated_by: null, updated_on: null,
    first_name: 'Aditya', last_name: 'Menon', phone_number: '+91 90000 11223',
    email_address: 'aditya.menon@example.com', junk_reason: 'Not interested',
    source_name: 'Google Ads', project_name: 'Nizampet', status: 'Junk Pending',
    rm_name: 'Neha Singh', em_name: 'Unassigned',
  },
  {
    uuid: 'dummy-junk-005', lead_id: 1005, customer_uuid: 'dummy-customer-005',
    project_id: 105, source_id: 5, source_employee_user_id: null, lead_priority_id: 2,
    assigned_to_rm: 205, assigned_to_em: 305, is_active: 1, created_by: 1,
    created_on: '2026-09-11T16:05:00.000Z', updated_by: null, updated_on: null,
    first_name: 'Kavya', last_name: 'Nair', phone_number: '+91 94444 55667',
    email_address: 'kavya.nair@example.com', junk_reason: 'Spam submission',
    source_name: 'Social Media', project_name: 'KPHB', status: 'Junk Confirmed',
    rm_name: 'Rohit Gupta', em_name: 'Asha Patel',
  },
];

export const InitialsAvatar = ({ firstName, lastName }: { firstName?: string; lastName?: string }) => {
  const initials = `${(firstName || '')[0] || ''}${(lastName || '')[0] || ''}`.toUpperCase() || '?';
  return (
    <div className="h-6 w-6 rounded-4xl bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center font-bold shrink-0 text-[10px]">
      {initials}
    </div>
  );
};

export const JunkLeadsPage: React.FC<JunkLeadsPageProps> = ({
  onVerify,
  canVerify,
  search,
}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [statusIds, setStatusIds] = useState<string[]>([]);
  const debouncedSearch = useDebounce(search, 500);

  React.useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const {
    getStatusLabel,
    getProjectLabel,
    getRmLabel,
    getSourceLabel,
    getEmLabel,
    getProjectLeadStatusLabel,
    masterData,
    projectLeadStatuses
  } = useMasterDataLookup();

  const allJunkStatusIds = React.useMemo(() => {
    const globalJunkIds = (masterData?.lead_statuses || [])
      .filter((s: any) => s.code === "JUNKPE" || s.code === "JUNKCM")
      .map((s: any) => Number(s.id));

    const statusIdSet = new Set<number>(globalJunkIds);

    (projectLeadStatuses || []).forEach((proj: any) => {
      if (Array.isArray(proj.status)) {
        proj.status.forEach((st: any) => {
          if (globalJunkIds.includes(Number(st.lead_status_id))) {
            statusIdSet.add(Number(st.id));
          }
        });
      }
    });

    return Array.from(statusIdSet);
  }, [masterData, projectLeadStatuses]);

  const junkStatusOptions = React.useMemo(() => {
    const liveOptions = (masterData?.lead_statuses || [])
      .filter((status: any) => status.code === 'JUNKPE' || status.code === 'JUNKCM')
      .map((status: any) => ({
        value: String(status.id),
        label: status.description,
      }));
    return liveOptions.length > 0 ? liveOptions : [
      { value: 'demo-junk-pending', label: 'Junk Pending' },
      { value: 'demo-junk-confirmed', label: 'Junk Confirmed' },
    ];
  }, [masterData]);

  const selectedStatusLabels = React.useMemo(() => {
    const selected = new Set(statusIds);
    return junkStatusOptions
      .filter((option) => selected.has(option.value))
      .map((option) => option.label.toLowerCase());
  }, [junkStatusOptions, statusIds]);

  const {
    data: leadsData,
    isLoading,
    isFetching
  } = useGetLeadsQuery({
    offset: (page - 1) * limit,
    search_text: debouncedSearch || undefined,
    status: statusIds.length > 0
      ? statusIds.map(Number).filter((id) => Number.isFinite(id))
      : (allJunkStatusIds.length > 0 ? allJunkStatusIds : undefined),
  }, {
    skip: allJunkStatusIds.length === 0
  });

  const liveLeads = React.useMemo(() => {
    return Array.isArray(leadsData) ? leadsData : (leadsData?.data || []);
  }, [leadsData]);

  const dummyLeads = React.useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    return DUMMY_JUNK_LEADS.filter((lead) => {
      const matchesSearch = !query || [
        lead.lead_id,
        lead.first_name,
        lead.last_name,
        lead.phone_number,
        lead.email_address,
        lead.junk_reason,
        lead.project_name,
      ].some((value) => String(value || '').toLowerCase().includes(query));
      const matchesStatus = selectedStatusLabels.length === 0
        || selectedStatusLabels.some((label) => lead.status.toLowerCase().includes(label));
      return matchesSearch && matchesStatus;
    });
  }, [debouncedSearch, selectedStatusLabels]);

  const hasLiveDataset = React.useMemo(() => {
    if (liveLeads.length > 0) return true;
    if (!Array.isArray(leadsData) && leadsData && typeof leadsData === 'object') {
      return Number(leadsData.filtered_count || leadsData.total_count || 0) > 0;
    }
    return false;
  }, [leadsData, liveLeads.length]);

  const leads = React.useMemo(() => {
    if (hasLiveDataset) return liveLeads;
    const start = (page - 1) * limit;
    return dummyLeads.slice(start, start + limit);
  }, [dummyLeads, hasLiveDataset, limit, liveLeads, page]);

  const total = React.useMemo(() => {
    if (!hasLiveDataset) return dummyLeads.length;
    if (!Array.isArray(leadsData) && leadsData && typeof leadsData === 'object') {
      if (leadsData.filtered_count !== undefined && leadsData.filtered_count !== null) {
        return leadsData.filtered_count;
      }
      if (leadsData.total_count !== undefined && leadsData.total_count !== null) {
        return leadsData.total_count;
      }
    }
    return leads.length < limit ? (page - 1) * limit + leads.length : (page - 1) * limit + limit + 1;
  }, [dummyLeads.length, hasLiveDataset, leadsData, leads.length, page, limit]);

  const fallback = (value: React.ReactNode) => value ?? '--';

  const columns: ColumnDef<Lead>[] = React.useMemo(() => {
    const baseColumns: ColumnDef<Lead>[] = [
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
        width: '150px',
        render: (l: Lead) => (
          <span className="font-bold text-primary text-xs">
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
            <span className="text-zinc-800 dark:text-zinc-100 font-medium text-xs">{fallback(l.phone_number)}</span>
            <span className="text-zinc-400 text-[11px] truncate">{l.email_address || '--'}</span>
          </div>
        ),
      },
      {
        key: 'source_id',
        header: 'SOURCE',
        width: '140px',
        render: (l: Lead) => {
          const sourceText = (l as any).source_name || (l as any).source || getSourceLabel(l.source_id);
          return (
            <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              {sourceText && sourceText !== '--' ? sourceText.split(' ')[0] : '--'}
            </span>
          );
        },
      },
      {
        key: 'project_id',
        header: 'PROJECT',
        width: '150px',
        render: (l: Lead) => (
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            {(l as DummyJunkLead).project_name || getProjectLabel(l.project_id)}
          </span>
        ),
      },
      {
        key: 'lead_status_id',
        header: 'STATUS',
        width: '130px',
        render: (l: Lead) => {
          const projStatus = getProjectLeadStatusLabel(l.project_lead_status_id);
          const statusText = (l as any).status || (projStatus && projStatus !== '--' ? projStatus : getStatusLabel(l.lead_status_id));
          return (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200/50">
              {statusText}
            </span>
          );
        },
      },
      {
        key: 'assigned_to_rm',
        header: 'ASSIGNED RM',
        width: '180px',
        render: (l: Lead) => {
          const label = (l as DummyJunkLead).rm_name || getRmLabel(l.assigned_to_rm);
          if (label === '--') return <span className="text-zinc-400 text-xs italic">Unassigned</span>;
          return (
            <div className="flex items-center gap-2">
              <InitialsAvatar firstName={label.split(' ')[0]} lastName={label.split(' ')[1]} />
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
            </div>
          );
        },
      },

      {
        key: 'assigned_to_em',
        header: 'EM NAME',
        width: '180px',
        render: (l: Lead) => {
          let label = (l as DummyJunkLead).em_name || getEmLabel(l.assigned_to_em);
          if (label === '--' && (l as any).em_name) {
            label = (l as any).em_name;
          } else if (label === '--' && (l as any).em_first_name) {
            label = `${(l as any).em_first_name} ${(l as any).em_last_name || ''}`.trim();
          }
          if (label === '--') {
            return <span className="text-zinc-400 text-xs italic">Unassigned</span>;
          }
          return (
            <div className="flex items-center gap-2">
              <InitialsAvatar
                firstName={label.split(' ')[0]}
                lastName={label.split(' ')[1]}
              />
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                {label}
              </span>
            </div>
          );
        },
      },
      {
        key: 'junk_reason',
        header: 'JUNK REASON',
        width: '200px',
        render: (l: Lead) => {
          const text = l.junk_reason || '--';

          const shortText =
            text.length > 10 ? text.slice(0, 10) + '...' : text;

          return (
            <div className="max-w-[120px]">
              <span
                title={text}
                className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium cursor-pointer"
              >
                {shortText}
              </span>
            </div>
          );
        },
      },
    ];

    if (canVerify) {
      baseColumns.push({
        key: 'actions',
        header: 'ACTIONS',
        width: '120px',
        render: (l: Lead) => (
          <Button
            type="button"
            variant="default"
            size="sm"
            className="bg-[#0f3d6b] hover:bg-[#0c3156] text-white font-extrabold h-8 px-4 rounded-lg shadow-sm transition-all active:scale-95 text-[10px] uppercase tracking-wider"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onVerify(l);
            }}
          >
            Verify Lead
          </Button>
        ),
      });
    }

    return baseColumns;
  }, [canVerify, onVerify, getStatusLabel, getProjectLabel, getRmLabel, getSourceLabel, getEmLabel]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">


      <div className="overflow-hidden rounded-md border border-zinc-200/60 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:border-zinc-800/60 dark:bg-zinc-950 dark:shadow-none">
        <div className="px-8 py-5 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-50/30 dark:bg-zinc-900/10">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-100 tracking-tight">Active Junk Leads Queue</h2>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            {(isLoading || isFetching) && <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />}
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsFilterDialogOpen(true)}
            className="relative h-10 gap-2 rounded-md border-zinc-200 bg-white px-5 font-bold text-[#0f1a3a] shadow-sm transition-colors hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-[#0022ff]/30 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter
            {statusIds.length > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0022ff] px-1.5 text-[10px] font-bold text-white">
                {statusIds.length}
              </span>
            )}
          </Button>
        </div>
        <div className="p-4">
          <DataTable
            columns={columns}
            data={leads}
            isLoading={hasLiveDataset && (isLoading || isFetching)}
            page={page}
            limit={limit}
            total={total}
            onPageChange={setPage}
            onLimitChange={(v) => {
              setLimit(v);
              setPage(1);
            }}
            rowKey={(l) => l.uuid}
          />
        </div>
      </div>

      <FilterDialog
        open={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
        onApply={(filters) => {
          setStatusIds(filters.statusIds);
          setPage(1);
        }}
        onReset={() => {
          setStatusIds([]);
          setPage(1);
          setIsFilterDialogOpen(false);
        }}
        statusIds={statusIds}
        projectIds={[]}
        rmIds={[]}
        emIds={[]}
        statusOptions={junkStatusOptions}
        projectOptions={[]}
        rmOptions={[]}
        showRmFilter={false}
        showEmFilter={false}
        showProjectFilter={false}
      />
    </div>
  );
};
