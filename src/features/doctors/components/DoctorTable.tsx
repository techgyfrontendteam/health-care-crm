import React, { useState } from "react";
import type { Doctor } from "../types";
import { Eye, Pencil, Trash2, Stethoscope, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { cn } from "../../../utils";

interface DoctorTableProps {
  doctors: Doctor[];
  isLoading?: boolean;
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onViewDetails: (doctor: Doctor) => void;
  onEdit: (doctor: Doctor) => void;
  onDelete: (id: number) => void;
}

const DoctorAvatar = ({ doc }: { doc: Doctor }) => {
  const [imgError, setImgError] = useState(false);
  const initials = `${(doc.first_name || doc.name || "")[0] || ""}${(doc.last_name || "")[0] || ""}`.toUpperCase() || "DR";

  if (doc.image_url && !imgError) {
    return (
      <img
        src={doc.image_url}
        alt={doc.name}
        onError={() => setImgError(true)}
        className="w-9 h-9 rounded-xl object-cover border border-zinc-200 dark:border-zinc-800 shrink-0 shadow-xs"
      />
    );
  }

  return (
    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#063669] dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-100 dark:border-blue-900 shadow-xs">
      {initials}
    </div>
  );
};

export const DoctorTable: React.FC<DoctorTableProps> = ({
  doctors,
  isLoading = false,
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  const totalPages = Math.ceil(total / limit);
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const getServiceBadge = (dept: Doctor["department"], serviceType?: string) => {
    const text = (serviceType || dept || "Both").toUpperCase();
    if (text.includes("OPD") && !text.includes("IPD")) {
      return "bg-blue-50 text-blue-700 border-blue-200/80 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900";
    }
    if (text.includes("IPD") && !text.includes("OPD")) {
      return "bg-purple-50 text-purple-700 border-purple-200/80 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900";
    }
    return "bg-teal-50 text-teal-700 border-teal-200/80 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-900";
  };

  return (
    <div
      className="flex flex-col bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-hidden"
      style={{ height: "80vh", maxHeight: "80vh" }}
    >
      {/* Table Scroll Area - Fixed Sticky Header with Internal Scrolling */}
      <div className="relative flex-1 overflow-x-auto overflow-y-auto custom-scrollbar min-h-0">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="sticky top-0 z-20 bg-[#F8F9FA] dark:bg-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <tr className="border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
              <th className="py-3 px-4 whitespace-nowrap bg-[#F8F9FA] dark:bg-zinc-900">Doctor</th>
              <th className="py-3 px-4 whitespace-nowrap bg-[#F8F9FA] dark:bg-zinc-900">Department / Specialty</th>
              <th className="py-3 px-4 whitespace-nowrap bg-[#F8F9FA] dark:bg-zinc-900">Service Type</th>
              <th className="py-3 px-4 whitespace-nowrap bg-[#F8F9FA] dark:bg-zinc-900">Branch</th>
              <th className="py-3 px-4 whitespace-nowrap bg-[#F8F9FA] dark:bg-zinc-900">Fee</th>
              <th className="py-3 px-4 whitespace-nowrap bg-[#F8F9FA] dark:bg-zinc-900">Schedule / Hours</th>
              <th className="py-3 px-4 whitespace-nowrap bg-[#F8F9FA] dark:bg-zinc-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                      <div className="space-y-1.5 flex-1">
                        <div className="h-3.5 bg-zinc-200 dark:bg-zinc-800 rounded w-28" />
                        <div className="h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded w-20" />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4"><div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-24" /></td>
                  <td className="py-3 px-4"><div className="h-5 bg-zinc-100 dark:bg-zinc-800 rounded-full w-16" /></td>
                  <td className="py-3 px-4"><div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded w-20" /></td>
                  <td className="py-3 px-4"><div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-12" /></td>
                  <td className="py-3 px-4"><div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded w-20" /></td>
                  <td className="py-3 px-4 text-right"><div className="h-6 bg-zinc-100 dark:bg-zinc-800 rounded w-16 ml-auto" /></td>
                </tr>
              ))
            ) : doctors.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-20 text-center text-zinc-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Stethoscope className="h-10 w-10 text-zinc-300 dark:text-zinc-700" />
                    <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">No doctors found</p>
                    <p className="text-xs text-zinc-400">Try adjusting your filters or search terms</p>
                  </div>
                </td>
              </tr>
            ) : (
              doctors.map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-blue-50/30 dark:hover:bg-zinc-900/60 transition-colors duration-150 group"
                >
                  {/* Doctor Info */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <DoctorAvatar doc={doc} />
                      <div className="min-w-0">
                        <p className="font-bold text-zinc-900 dark:text-zinc-100 text-xs truncate group-hover:text-primary transition-colors">
                          {doc.name}
                        </p>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                          {doc.phone_number || doc.email || "--"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Specialization & Qualification */}
                  <td className="py-3 px-4">
                    <p className="font-semibold text-zinc-800 dark:text-zinc-200 text-xs">
                      {doc.specialization}
                    </p>
                    <p className="text-[10px] text-zinc-400 truncate max-w-[180px]">
                      {doc.qualification || "Specialist"}
                    </p>
                  </td>

                  {/* Service Type */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border",
                        getServiceBadge(doc.department, doc.service_type)
                      )}
                    >
                      {doc.service_type || (doc.department === "Both" ? "OPD & IPD" : doc.department)}
                    </span>
                  </td>

                  {/* Branch */}
                  <td className="py-3 px-4 whitespace-nowrap text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                    {doc.hospital_branch || "--"}
                  </td>

                  {/* Fee */}
                  <td className="py-3 px-4 whitespace-nowrap font-bold text-xs text-zinc-900 dark:text-zinc-100">
                    ₹{doc.consultation_fee?.toLocaleString() || 0}
                  </td>

                  {/* Schedule / Hours */}
                  <td className="py-3 px-4 whitespace-nowrap text-xs">
                    <p className="font-medium text-zinc-700 dark:text-zinc-300 text-xs">
                      {doc.working_hours || "09:00 - 17:00"}
                    </p>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        onClick={() => onViewDetails(doc)}
                        variant="ghost"
                        size="icon"
                        title="View Details"
                        className="h-7 w-7 rounded-lg text-zinc-500 hover:text-primary hover:bg-blue-50 dark:hover:bg-zinc-800"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        onClick={() => onEdit(doc)}
                        variant="ghost"
                        size="icon"
                        title="Edit Doctor"
                        className="h-7 w-7 rounded-lg text-zinc-500 hover:text-primary hover:bg-blue-50 dark:hover:bg-zinc-800"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        onClick={() => onDelete(doc.id)}
                        variant="ghost"
                        size="icon"
                        title="Delete Doctor"
                        className="h-7 w-7 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pinned Pagination Controls at Bottom */}
      <div className="flex items-center justify-between px-5 py-2.5 border-t border-[#f0f4f8] dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-b-xl shrink-0 z-10">
        {/* Left text + Rows per page */}
        <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          <div>
            Showing <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{from} - {to}</span> of{" "}
            <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{total.toLocaleString()}</span> Doctors
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Rows:</span>
            <Select
              value={String(limit)}
              onValueChange={(val) => {
                onLimitChange(Number(val));
                onPageChange(1);
              }}
            >
              <SelectTrigger className="h-8 w-[68px] text-xs bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-lg">
                <SelectValue placeholder={String(limit)} />
              </SelectTrigger>
              <SelectContent className="bg-white text-black z-[99999] min-w-[68px] max-h-[300px] overflow-y-auto custom-scrollbar">
                {[10, 20, 25, 50, 100].map((size) => (
                  <SelectItem key={size} value={String(size)} className="text-xs cursor-pointer">
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Right pagination buttons */}
        <div className="flex items-center gap-2">
          {/* Previous */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 flex items-center gap-1.5 text-xs font-medium shadow-none"
            disabled={isLoading || page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Previous
          </Button>

          {/* Page numbers */}
          <div className="flex items-center gap-1 mx-1">
            {/* First page + Dots */}
            {page > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-lg text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => onPageChange(1)}
                >
                  1
                </Button>
                {page > 2 && <span className="px-1 text-xs text-zinc-400">...</span>}
              </>
            )}

            {/* Current page */}
            <Button
              variant="default"
              size="sm"
              className="h-8 w-8 p-0 rounded-lg text-xs bg-[#063669] hover:bg-[#052d58] text-white shadow-sm font-bold"
            >
              {page}
            </Button>

            {/* Dots + last page */}
            {totalPages > 1 && totalPages > page && (
              <>
                {totalPages > page + 1 && <span className="px-1 text-xs text-zinc-400">...</span>}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-lg text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => onPageChange(totalPages)}
                >
                  {totalPages}
                </Button>
              </>
            )}
          </div>

          {/* Next */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 rounded-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 flex items-center gap-1.5 text-xs font-medium shadow-none"
            disabled={isLoading || page >= totalPages || total === 0}
            onClick={() => onPageChange(page + 1)}
          >
            Next
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
