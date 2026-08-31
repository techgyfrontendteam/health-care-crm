import React, { useState, useMemo } from "react";
import type { RevenueTransaction } from "../types";
import { Search, ChevronLeft, ChevronRight, Receipt, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { SearchInput } from "../../../shared/components/FilterBar/FilterBar";
import { cn } from "../../../utils";

interface RevenueTransactionTableProps {
  transactions: RevenueTransaction[];
}

export const RevenueTransactionTable: React.FC<RevenueTransactionTableProps> = ({ transactions }) => {
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const [page, setPage] = useState(1);
  const limit = 5;

  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const matchSearch =
        search === "" ||
        txn.patient_name.toLowerCase().includes(search.toLowerCase()) ||
        txn.doctor_name.toLowerCase().includes(search.toLowerCase()) ||
        txn.procedure_service.toLowerCase().includes(search.toLowerCase()) ||
        txn.id.toLowerCase().includes(search.toLowerCase());

      const matchDept = departmentFilter === "All" || txn.department === departmentFilter;
      const matchStatus = statusFilter === "All" || txn.payment_status === statusFilter;

      return matchSearch && matchDept && matchStatus;
    });
  }, [transactions, search, departmentFilter, statusFilter]);

  const totalTxns = filteredTransactions.length;
  const totalPages = Math.ceil(totalTxns / limit);

  const paginatedTxns = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredTransactions.slice(start, start + limit);
  }, [filteredTransactions, page, limit]);

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm overflow-hidden space-y-4 p-5">
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Receipt className="h-5 w-5 text-[#063669] dark:text-blue-400" />
            Recent Revenue Transactions
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Audit log of OPD consultations and IPD procedure billings
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
          <div className="w-full sm:w-56">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search patient, doctor, TXN ID..."
            />
          </div>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-700 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-[#063669]"
          >
            <option value="All">All Departments</option>
            <option value="OPD">OPD</option>
            <option value="IPD">IPD</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-700 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-[#063669]"
          >
            <option value="All">All Payment Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Insurance Claim">Insurance Claim</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-100 dark:border-zinc-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8F9FA] dark:bg-zinc-900 text-[11px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800">
              <th className="py-3.5 px-4">TXN ID & Date</th>
              <th className="py-3.5 px-4">Patient Name</th>
              <th className="py-3.5 px-4">Consulting Doctor</th>
              <th className="py-3.5 px-4">Procedure / Service</th>
              <th className="py-3.5 px-4">Dept</th>
              <th className="py-3.5 px-4">Payment Method</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
            {paginatedTxns.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-zinc-400 italic">
                  No revenue transactions found.
                </td>
              </tr>
            ) : (
              paginatedTxns.map((txn) => (
                <tr
                  key={txn.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-zinc-900/50 transition-colors"
                >
                  <td className="py-3.5 px-4 font-bold text-[#063669] dark:text-blue-400">
                    <div>{txn.id}</div>
                    <span className="text-[10px] font-normal text-zinc-400">
                      {txn.date}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-zinc-900 dark:text-zinc-100">
                    {txn.patient_name}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-zinc-700 dark:text-zinc-300">
                    {txn.doctor_name}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-zinc-600 dark:text-zinc-400 max-w-[200px] truncate" title={txn.procedure_service}>
                    {txn.procedure_service}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase border",
                        txn.department === "OPD"
                          ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800"
                          : "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800"
                      )}
                    >
                      {txn.department}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-zinc-600 dark:text-zinc-400">
                    {txn.payment_method}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-[11px] font-bold border inline-flex items-center gap-1.5",
                        txn.payment_status === "Paid"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300"
                          : txn.payment_status === "Pending"
                          ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300"
                          : "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300"
                      )}
                    >
                      {txn.payment_status === "Paid" ? (
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      ) : txn.payment_status === "Pending" ? (
                        <Clock className="h-3 w-3 text-amber-500" />
                      ) : (
                        <ShieldCheck className="h-3 w-3 text-blue-500" />
                      )}
                      {txn.payment_status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-zinc-900 dark:text-zinc-100 text-sm">
                    ₹{txn.amount.toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalTxns > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <div className="text-xs text-zinc-500 font-medium">
            Showing{" "}
            <span className="font-bold text-zinc-900 dark:text-zinc-100">
              {Math.min((page - 1) * limit + 1, totalTxns)} - {Math.min(page * limit, totalTxns)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-zinc-900 dark:text-zinc-100">
              {totalTxns}
            </span>{" "}
            Transactions
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
