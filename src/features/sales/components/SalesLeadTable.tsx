import React, { useState, useMemo } from "react";
import type { SalesLeadRecord } from "../types";
import { ChevronLeft, ChevronRight, ChevronDown, PhoneCall, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { SearchInput } from "../../../shared/components/FilterBar/FilterBar";
import { cn } from "../../../utils";

interface SalesLeadTableProps {
  leads: SalesLeadRecord[];
}

export const SalesLeadTable: React.FC<SalesLeadTableProps> = ({ leads }) => {
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState<string>("All");
  const [overdueOnly, setOverdueOnly] = useState<boolean>(false);

  const [page, setPage] = useState(1);
  const limit = 5;

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchSearch =
        search === "" ||
        lead.lead_name.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search) ||
        lead.assigned_rm.toLowerCase().includes(search.toLowerCase()) ||
        lead.id.toLowerCase().includes(search.toLowerCase());

      const matchBranch = branchFilter === "All" || lead.branch === branchFilter;
      const matchOverdue = !overdueOnly || lead.is_overdue;

      return matchSearch && matchBranch && matchOverdue;
    });
  }, [leads, search, branchFilter, overdueOnly]);

  const totalLeads = filteredLeads.length;
  const totalPages = Math.ceil(totalLeads / limit);
  const branchOptions = useMemo(
    () => Array.from(new Set(leads.map((lead) => lead.branch))),
    [leads],
  );

  const paginatedLeads = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredLeads.slice(start, start + limit);
  }, [filteredLeads, page, limit]);

  return (
    <section className="crm-soft-surface space-y-4 overflow-hidden rounded-md border border-[#e2e8f0] bg-white p-5 sm:p-6">
      {/* Table Header Controls */}
      <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div className="max-w-3xl">
          <h3 className="flex items-center gap-2 text-base font-extrabold text-[#111625]">
            <PhoneCall className="h-5 w-5 text-[#0022ff]" />
            Active Sales Leads & Call Activity Log
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Audit log of active sales leads, call touchpoints, assigned Sales Executives, and SLA status
          </p>
        </div>

        <div className="flex w-full flex-wrap items-center gap-2 xl:w-auto xl:justify-end">
          <div className="w-full sm:w-[280px]">
            <SearchInput
              value={search}
              onChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
              placeholder="Search lead, phone, or executive…"
            />
          </div>

          <select
            value={branchFilter}
            onChange={(event) => {
              setBranchFilter(event.target.value);
              setPage(1);
            }}
            aria-label="Filter sales leads by branch"
            className="h-[46px] min-w-[150px] rounded-md border border-[#e2e8f0] bg-white px-3.5 text-xs font-semibold text-[#111625] outline-none transition-colors hover:border-slate-300 focus:border-[#0022ff] focus:ring-2 focus:ring-[#0022ff]/10 cursor-pointer"
          >
            <option value="All">All Branches</option>
            {branchOptions.map((branch) => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
          <div className="relative">
            <select
              value={branchFilter}
              onChange={(event) => {
                setBranchFilter(event.target.value);
                setPage(1);
              }}
              aria-label="Filter sales leads by branch"
              className="h-[46px] min-w-[150px] rounded-md border border-[#e2e8f0] bg-white pl-3.5 pr-9 text-xs font-semibold text-[#111625] outline-none appearance-none transition-colors hover:border-slate-300 focus:border-[#0022ff] focus:ring-2 focus:ring-[#0022ff]/10 cursor-pointer"
            >
              <option value="All">All Branches</option>
              {branchOptions.map((branch) => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          </div>

          <button
            onClick={() => {
              setOverdueOnly(!overdueOnly);
              setPage(1);
            }}
            className={cn(
              "flex h-[46px] items-center gap-2 rounded-md border px-3.5 text-xs font-bold transition-colors cursor-pointer",
              overdueOnly
                ? "border-[#0022ff] bg-[#0022ff] text-white"
                : "border-[#e2e8f0] bg-white text-[#111625] hover:bg-[#f8f9fa]"
            )}
          >
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>Overdue Only</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-md border border-[#e2e8f0]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#e2e8f0] bg-[#f8f9fa] text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="py-3.5 px-4">Lead ID & Name</th>
              <th className="py-3.5 px-4">Lead Source</th>
              <th className="py-3.5 px-4">Department & Branch</th>
              <th className="py-3.5 px-4">Assigned Executive</th>
              <th className="py-3.5 px-4">Calls Count</th>
              <th className="py-3.5 px-4">Status & SLA</th>
              <th className="py-3.5 px-4 text-right">Last Activity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2e8f0] text-xs">
            {paginatedLeads.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center italic text-slate-500">
                  No sales lead records match filters.
                </td>
              </tr>
            ) : (
              paginatedLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className={cn(
                    "transition-colors hover:bg-[#f8f9fa]",
                    lead.is_overdue && "bg-[#f8f9fa]"
                  )}
                >
                  <td className="px-4 py-3.5 font-bold text-[#111625]">
                    <div>{lead.lead_name}</div>
                    <span className="text-[10px] font-normal text-slate-500">
                      {lead.id} • {lead.phone}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="rounded-md border border-[#e2e8f0] bg-[#f8f9fa] px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-[#0022ff]">
                      {lead.source}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#111625]">{lead.department}</div>
                    <span className="block max-w-[150px] truncate text-[10px] font-medium text-slate-500" title={lead.branch}>
                      {lead.branch}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-[#111625]">
                    {lead.assigned_rm}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 rounded-md border border-[#0022ff] bg-[#0022ff] px-2.5 py-0.5 text-[11px] font-black text-white">
                      <PhoneCall className="h-3 w-3" />
                      {lead.calls_count} Calls
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {lead.is_overdue ? (
                      <span className="inline-flex items-center gap-1 rounded-md border border-[#111625] bg-[#111625] px-2.5 py-0.5 text-[10px] font-bold text-white">
                        <AlertTriangle className="h-3 w-3" />
                        OVERDUE SLA
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-md border border-[#e2e8f0] bg-[#f8f9fa] px-2.5 py-0.5 text-[10px] font-bold text-[#0022ff]">
                        <CheckCircle2 className="h-3 w-3" />
                        {lead.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-right text-[11px] font-medium text-slate-500">
                    {lead.last_activity}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalLeads > 0 && (
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#e2e8f0] pt-3 sm:flex-row">
          <div className="text-xs font-medium text-slate-500">
            Showing{" "}
            <span className="font-bold text-[#111625]">
              {Math.min((page - 1) * limit + 1, totalLeads)} - {Math.min(page * limit, totalLeads)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-[#111625]">
              {totalLeads}
            </span>{" "}
            Sales Leads
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-md border-[#e2e8f0] px-3 text-xs font-bold text-[#111625]"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            <span className="px-2 text-xs font-bold text-[#111625]">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-md border-[#e2e8f0] px-3 text-xs font-bold text-[#111625]"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};
