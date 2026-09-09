import React, { useState, useMemo } from "react";
import type { DoctorRevenueItem } from "../types";
import { Search, ChevronLeft, ChevronRight, UserStar, ArrowUpDown } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { SearchInput } from "../../../shared/components/FilterBar/FilterBar";
import { cn } from "../../../utils";

interface DoctorRevenueTableProps {
  doctors: DoctorRevenueItem[];
}

const formatCurrency = (val: number) => {
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  }
  return `₹${val.toLocaleString()}`;
};

export const DoctorRevenueTable: React.FC<DoctorRevenueTableProps> = ({ doctors }) => {
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("All");
  const [sortField, setSortField] = useState<keyof DoctorRevenueItem>("total_revenue");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Pagination states
  const [page, setPage] = useState(1);
  const limit = 5;

  const filteredDoctors = useMemo(() => {
    return doctors
      .filter((doc) => {
        const matchSearch =
          search === "" ||
          doc.doctor_name.toLowerCase().includes(search.toLowerCase()) ||
          doc.specialization.toLowerCase().includes(search.toLowerCase());

        const matchDept =
          departmentFilter === "All" || doc.department === departmentFilter || doc.department === "Both";

        return matchSearch && matchDept;
      })
      .sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (typeof valA === "number" && typeof valB === "number") {
          return sortOrder === "asc" ? valA - valB : valB - valA;
        }
        return sortOrder === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
  }, [doctors, search, departmentFilter, sortField, sortOrder]);

  const totalDoctors = filteredDoctors.length;
  const totalPages = Math.ceil(totalDoctors / limit);

  const paginatedDoctors = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredDoctors.slice(start, start + limit);
  }, [filteredDoctors, page, limit]);

  const handleSort = (field: keyof DoctorRevenueItem) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm overflow-hidden space-y-4 p-5">
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <UserStar className="h-5 w-5 text-[#063669] dark:text-blue-400" />
            Doctor-wise Revenue Breakdown
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Revenue generated per medical practitioner across OPD and IPD
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-full sm:w-64">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search doctor or specialty..."
            />
          </div>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-700 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-[#063669]"
          >
            <option value="All">All Departments</option>
            <option value="OPD">OPD Only</option>
            <option value="IPD">IPD Only</option>
            <option value="Both">Both OPD & IPD</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-100 dark:border-zinc-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8F9FA] dark:bg-zinc-900 text-[11px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800">
              <th className="py-3.5 px-4">Doctor Name</th>
              <th className="py-3.5 px-4">Department</th>
              <th
                className="py-3.5 px-4 cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-200"
                onClick={() => handleSort("opd_visits")}
              >
                <div className="flex items-center gap-1">
                  OPD Visits <ArrowUpDown className="h-3 w-3 opacity-60" />
                </div>
              </th>
              <th
                className="py-3.5 px-4 cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-200"
                onClick={() => handleSort("ipd_admissions")}
              >
                <div className="flex items-center gap-1">
                  IPD Admissions <ArrowUpDown className="h-3 w-3 opacity-60" />
                </div>
              </th>
              <th
                className="py-3.5 px-4 cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-200"
                onClick={() => handleSort("opd_revenue")}
              >
                <div className="flex items-center gap-1">
                  OPD Revenue <ArrowUpDown className="h-3 w-3 opacity-60" />
                </div>
              </th>
              <th
                className="py-3.5 px-4 cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-200"
                onClick={() => handleSort("ipd_revenue")}
              >
                <div className="flex items-center gap-1">
                  IPD Revenue <ArrowUpDown className="h-3 w-3 opacity-60" />
                </div>
              </th>
              <th
                className="py-3.5 px-4 text-right cursor-pointer hover:text-zinc-700 dark:hover:text-zinc-200"
                onClick={() => handleSort("total_revenue")}
              >
                <div className="flex items-center justify-end gap-1">
                  Total Revenue <ArrowUpDown className="h-3 w-3 opacity-60" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
            {paginatedDoctors.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-zinc-400 italic">
                  No doctor revenue records found.
                </td>
              </tr>
            ) : (
              paginatedDoctors.map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-zinc-900/50 transition-colors"
                >
                  <td className="py-3.5 px-4 font-bold text-zinc-900 dark:text-zinc-100">
                    <div>{doc.doctor_name}</div>
                    <span className="text-[11px] font-medium text-zinc-400">
                      {doc.specialization}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={cn(
                        "px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase border",
                        doc.department === "OPD"
                          ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800"
                          : doc.department === "IPD"
                          ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800"
                          : "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800"
                      )}
                    >
                      {doc.department === "Both" ? "OPD & IPD" : doc.department}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-zinc-700 dark:text-zinc-300">
                    {doc.opd_visits} visits
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-zinc-700 dark:text-zinc-300">
                    {doc.ipd_admissions} admissions
                  </td>
                  <td className="py-3.5 px-4 font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(doc.opd_revenue)}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-purple-600 dark:text-purple-400">
                    {formatCurrency(doc.ipd_revenue)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-[#063669] dark:text-blue-400 text-sm">
                    {formatCurrency(doc.total_revenue)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalDoctors > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <div className="text-xs text-zinc-500 font-medium">
            Showing{" "}
            <span className="font-bold text-zinc-900 dark:text-zinc-100">
              {Math.min((page - 1) * limit + 1, totalDoctors)} - {Math.min(page * limit, totalDoctors)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-zinc-900 dark:text-zinc-100">
              {totalDoctors}
            </span>{" "}
            Doctors
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
