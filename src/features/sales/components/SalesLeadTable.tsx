import React, { useState, useMemo } from "react";
import type { SalesLeadRecord } from "../types";
import { Search, ChevronLeft, ChevronRight, PhoneCall, AlertTriangle, CheckCircle2, User, Clock } from "lucide-react";
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

  const paginatedLeads = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredLeads.slice(start, start + limit);
  }, [filteredLeads, page, limit]);

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm overflow-hidden space-y-4 p-5">
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <PhoneCall className="h-5 w-5 text-[#063669] dark:text-blue-400" />
            Active Sales Leads & Call Activity Log
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Audit log of active sales leads, call touchpoints, assigned Sales Executives, and SLA status
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
          <div className="w-full sm:w-56">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search lead, phone, assigned RM..."
            />
          </div>

          <button
            onClick={() => setOverdueOnly(!overdueOnly)}
            className={cn(
              "px-3 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5",
              overdueOnly
                ? "bg-rose-500 text-white border-rose-500 shadow-sm"
                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50"
            )}
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            Overdue Only
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-100 dark:border-zinc-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8F9FA] dark:bg-zinc-900 text-[11px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800">
              <th className="py-3.5 px-4">Lead ID & Name</th>
              <th className="py-3.5 px-4">Lead Source</th>
              <th className="py-3.5 px-4">Department & Branch</th>
              <th className="py-3.5 px-4">Assigned Executive</th>
              <th className="py-3.5 px-4">Calls Count</th>
              <th className="py-3.5 px-4">Status & SLA</th>
              <th className="py-3.5 px-4 text-right">Last Activity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
            {paginatedLeads.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-zinc-400 italic">
                  No sales lead records match filters.
                </td>
              </tr>
            ) : (
              paginatedLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className={cn(
                    "hover:bg-slate-50/70 dark:hover:bg-zinc-900/50 transition-colors",
                    lead.is_overdue && "bg-rose-50/30 dark:bg-rose-950/10"
                  )}
                >
                  <td className="py-3.5 px-4 font-bold text-zinc-900 dark:text-zinc-100">
                    <div>{lead.lead_name}</div>
                    <span className="text-[10px] font-normal text-zinc-400">
                      {lead.id} • {lead.phone}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/40 dark:text-purple-300">
                      {lead.source}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-zinc-800 dark:text-zinc-200">{lead.department}</div>
                    <span className="text-[10px] text-zinc-400 font-medium truncate max-w-[150px] block" title={lead.branch}>
                      {lead.branch}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-zinc-700 dark:text-zinc-300">
                    {lead.assigned_rm}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 inline-flex items-center gap-1">
                      <PhoneCall className="h-3 w-3" />
                      {lead.calls_count} Calls
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {lead.is_overdue ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 inline-flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        OVERDUE SLA
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 inline-flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        {lead.status}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-zinc-500 text-[11px]">
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <div className="text-xs text-zinc-500 font-medium">
            Showing{" "}
            <span className="font-bold text-zinc-900 dark:text-zinc-100">
              {Math.min((page - 1) * limit + 1, totalLeads)} - {Math.min(page * limit, totalLeads)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-zinc-900 dark:text-zinc-100">
              {totalLeads}
            </span>{" "}
            Sales Leads
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 rounded-lg border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-bold"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            <span className="text-xs font-bold px-2 text-zinc-600 dark:text-zinc-400">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 rounded-lg border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-bold"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
