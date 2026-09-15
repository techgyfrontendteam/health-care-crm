import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../../../components/ui/dialog";
import {
  useGetLeadsByEmIdQuery,
  useGetLeadsByRmIdQuery,
} from "../../leads/api/leadsApi";
import { Link, useNavigate } from "react-router-dom";
import { useMasterDataLookup } from "../../../shared/hooks/useMasterDataLookup";
import { Loader2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../shared/components/DataTable/DataTable";
import { StatusBadge } from "../../../shared/components/StatusBadge/StatusBadge";
import type { User as UserType } from "../types";
import type { ColumnDef } from "../../../shared/components/DataTable/DataTable";
import type { Lead } from "../../leads/types";

interface UserLeadsDialogProps {
  open: boolean;
  onClose: () => void;
  user: UserType | null;
}

export const UserLeadsDialog = ({
  open,
  onClose,
  user,
}: UserLeadsDialogProps) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;
  const {
    getStatusLabel,
    getSourceLabel,
    getBranchLabel,
    getSpecialisationLabel,
    getRmLabel,
    isLoading: isLookupLoading,
  } = useMasterDataLookup();

  // Fetch leads for this RM or EM
  const isRM = user?.role_id === 3;

  // RM API
  const {
    data: rmLeadsData,
    isLoading: rmLoading,
    isFetching: rmFetching,
  } = useGetLeadsByRmIdQuery(
    {
      assigned_to_rm: user?.id || 0,
      offset: (page - 1) * limit,
    },
    { skip: !open || !user?.id || !isRM },
  );

  // EM API
  const {
    data: emLeadsData,
    isLoading: emLoading,
    isFetching: emFetching,
  } = useGetLeadsByEmIdQuery(
    {
      assigned_to_em: user?.id || 0,
      offset: (page - 1) * limit,
    },
    { skip: !open || !user?.id || isRM },
  );

  const activeData = isRM ? rmLeadsData : emLeadsData;
  const leads = Array.isArray(activeData) ? activeData : (activeData?.data || []);
  const total = (!Array.isArray(activeData) && activeData) ? (activeData.filtered_count ?? activeData.total_count ?? leads.length) : leads.length;
  const isLoading = isRM ? rmLoading : emLoading;
  const isFetching = isRM ? rmFetching : emFetching;

  const fallback = (value: React.ReactNode) => value ?? '--';

  const columns: ColumnDef<Lead>[] = [
    {
      key: "lead_id",
      header: "LEAD ID",
      width: "110px",
      render: (l: Lead) => (
        <Link
          to={`/leads/${l.uuid}`}
          onClick={onClose}
          className="text-secondary-foreground font-semibold hover:text-primary transition-colors text-xs"
        >
          #{fallback(l.lead_id)}
        </Link>
      ),
    },
    {
      key: "customer_name",
      header: "CUSTOMER NAME",
      width: "150px",
      render: (l: Lead) => (
        <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100">
          {fallback(l.first_name)} {l.last_name || ''}
        </span>
      ),
    },
    {
      key: "contact_details",
      header: "CONTACT DETAILS",
      width: "150px",
      render: (l: Lead) => (
        <div className="flex flex-col gap-0.5">
          <span className="font-medium text-xs text-zinc-700 dark:text-zinc-300">
            {fallback(l.phone_number)}
          </span>
          <span className="text-zinc-400 text-[11px] truncate">
            {l.email_address || '--'}
          </span>
        </div>
      ),
    },
    {
      key: "created_on",
      header: "CREATION DATE",
      width: "140px",
      render: (l: Lead) => {
        if (!l.created_on) return <span className="text-xs text-zinc-500">--</span>;

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
      key: "source_id",
      header: "SOURCE",
      width: "130px",
      render: (l: Lead) => {
        const sourceText = l.source || getSourceLabel(l.source_id);
        return (
          <span className="inline-block px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-source-bg text-primary">
            {sourceText && sourceText !== '--' ? sourceText.split(' ')[0] : '--'}
          </span>
        );
      },
    },
    {
      key: "branch_id",
      header: "BRANCH",
      width: "140px",
      render: (l: Lead) => (
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
          {l.branch_id ? getBranchLabel(l.branch_id) : (l.hospital_branch || l.branch || l.branch_name || '--')}
        </span>
      ),
    },
    {
      key: "specialisation_id",
      header: "DEPARTMENT",
      width: "150px",
      render: (l: Lead) => (
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
          {l.specialisation_id ? getSpecialisationLabel(l.specialisation_id) : (l.specialization || l.department || '--')}
        </span>
      ),
    },
    {
      key: "doctor_name",
      header: "DOCTOR NAME",
      width: "150px",
      render: (l: Lead) => (
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
          {l.doctor_name || (l as any).doctor || '--'}
        </span>
      ),
    },
    {
      key: "enquiries",
      header: <div className="text-center w-full">ENQUIRIES</div>,
      width: "110px",
      render: (l: Lead) => (
        <div className="text-center w-full">
          <Link
            to={`/leads/${l.uuid}?tab=enquiries`}
            onClick={onClose}
            className="font-bold text-xs text-[#0f3d6b] hover:text-[#0f3d6b]/80 underline decoration-[#0f3d6b] transition-colors"
          >
            {l.enquiries ?? l.enquires?.length ?? 0}
          </Link>
        </div>
      ),
    },
    {
      key: "project_lead_status_id",
      header: "STATUS",
      width: "140px",
      render: (l: Lead) => (
        <StatusBadge status={getStatusLabel(l.project_lead_status_id || l.lead_status_id)} />
      ),
    },
    {
      key: "assigned_to_rm",
      header: "SALES EXECUTIVE",
      width: "150px",
      render: (l: Lead) => {
        const rmLabel = getRmLabel(l.assigned_to_rm);
        return (
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            {rmLabel}
          </span>
        );
      },
    },
    {
      key: "actions",
      header: "ACTIONS",
      width: "130px",
      render: (lead: Lead) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            onClose();
            navigate(`/leads/${lead.uuid}`);
          }}
          className="h-8 text-[11px] font-bold uppercase rounded-xl border-zinc-200 dark:border-zinc-800 text-primary hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all px-3 shadow-none"
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[92vw] w-full xl:max-w-7xl overflow-hidden flex flex-col p-0 gap-0 border-none shadow-3xl bg-white dark:bg-zinc-950 rounded-[28px] max-h-[90vh]">
        {/* Header Section */}
        <div className="px-8 pt-8 pb-4 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <DialogTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-1">
              Lead Registry
            </DialogTitle>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">
              Listing leads for{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {user?.first_name} {user?.last_name}
              </span>
            </p>
          </div>
        </div>

        {/* List Section */}
        <div className="flex-1 overflow-x-auto overflow-y-auto bg-white dark:bg-zinc-950 px-6 py-4">
          {isLoading || isFetching || isLookupLoading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-zinc-300">
              <Loader2 className="h-10 w-10 animate-spin text-zinc-200" />
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400">
                Loading Registry...
              </p>
            </div>
          ) : (
            <DataTable
              columns={columns as any}
              data={leads}
              isLoading={isLoading}
              page={page}
              limit={limit}
              total={total}
              onPageChange={setPage}
              onLimitChange={() => { }}
              rowKey={(l) => l.uuid}
              variant="embed"
              emptyMessage="No leads found"
            />
          )}
        </div>

        {/* Spacing for aesthetic */}
        <div className="h-4" />
      </DialogContent>
    </Dialog>
  );
};
