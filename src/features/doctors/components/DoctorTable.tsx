import React from "react";
import type { Doctor } from "../types";
import { Star, Phone, Mail, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../utils";

interface DoctorTableProps {
  doctors: Doctor[];
  onViewDetails: (doctor: Doctor) => void;
  onEdit: (doctor: Doctor) => void;
  onDelete: (id: number) => void;
}

export const DoctorTable: React.FC<DoctorTableProps> = ({
  doctors,
  onViewDetails,
  onEdit,
  onDelete,
}) => {
  const getDeptBadge = (dept: Doctor["department"]) => {
    switch (dept) {
      case "OPD":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "IPD":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Both":
        return "bg-teal-50 text-teal-700 border-teal-200";
    }
  };

  if (doctors.length === 0) {
    return (
      <div className="py-16 text-center text-zinc-500 dark:text-zinc-400">
        No doctor records found matching your filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950 shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
          <tr>
            <th className="py-3.5 px-4">Doctor</th>
            <th className="py-3.5 px-4">Department</th>
            <th className="py-3.5 px-4">Service Type</th>

            <th className="py-3.5 px-4">Fee</th>
            <th className="py-3.5 px-4">Hours / Room</th>
            <th className="py-3.5 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {doctors.map((doc) => (
            <tr
              key={doc.id}
              className="hover:bg-slate-50/80 dark:hover:bg-zinc-900/50 transition-colors"
            >
              {/* Doctor Avatar & Name */}
              <td className="py-3.5 px-4">
                <div className="flex items-center gap-3">
                  <img
                    src={doc.image_url}
                    alt={doc.name}
                    className="w-10 h-10 rounded-xl object-cover border border-zinc-100 dark:border-zinc-800 shrink-0"
                  />
                  <div>
                    <p className="font-bold text-zinc-900 dark:text-zinc-100">
                      {doc.name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {doc.phone_number}
                    </p>
                  </div>
                </div>
              </td>

              {/* Specialization */}
              <td className="py-3.5 px-4">
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {doc.specialization}
                </p>
                <p className="text-[11px] text-zinc-400 truncate max-w-[180px]">
                  {doc.qualification}
                </p>
              </td>

              {/* Service Type */}
              <td className="py-3.5 px-4 whitespace-nowrap">
                <span
                  className={cn(
                    "px-2.5 py-0.5 rounded-full text-[11px] font-bold border",
                    getDeptBadge(doc.department)
                  )}
                >
                  {doc.service_type || (doc.department === "Both" ? "OPD & IPD" : doc.department)}
                </span>
              </td>



              {/* Fee */}
              <td className="py-3.5 px-4 font-bold text-zinc-900 dark:text-zinc-100">
                ₹{doc.consultation_fee}
              </td>

              {/* Hours / Room */}
              <td className="py-3.5 px-4 text-xs">
                {doc.working_hours && (
                  <p className="font-medium text-zinc-700 dark:text-zinc-300">
                    {doc.working_hours}
                  </p>
                )}
                <p className="text-[11px] text-zinc-400">{doc.room_number || "--"}</p>
              </td>

              {/* Actions */}
              <td className="py-3.5 px-4 text-right whitespace-nowrap">
                <div className="flex items-center justify-end gap-1.5">
                  <Button
                    onClick={() => onViewDetails(doc)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-600 hover:text-primary"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => onEdit(doc)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-600 hover:text-primary"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => onDelete(doc.id)}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
