import React from "react";
import type { Doctor } from "../types";
import { Star, Phone, Mail, Clock, MapPin, Award, Eye, Pencil } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../utils";

interface DoctorCardProps {
  doctor: Doctor;
  onViewDetails: (doctor: Doctor) => void;
  onEdit: (doctor: Doctor) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onViewDetails,
  onEdit,
}) => {
  const getStatusBadge = (status: Doctor["availability_status"]) => {
    switch (status) {
      case "Available":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800";
      case "In Consultation":
        return "bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800";
      case "Emergency Only":
        return "bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800";
      case "On Leave":
        return "bg-slate-100 text-slate-600 border-slate-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  const getDeptBadge = (dept: Doctor["department"]) => {
    switch (dept) {
      case "OPD":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800";
      case "IPD":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800";
      case "Both":
        return "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800";
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative overflow-hidden">
      <div>
        {/* Top Header: Avatar & Main Info */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative shrink-0">
              <img
                src={doctor.image_url}
                alt={doctor.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 dark:border-zinc-800 shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=300&auto=format&fit=crop";
                }}
              />
              <span
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-zinc-950",
                  doctor.availability_status === "Available"
                    ? "bg-emerald-500"
                    : doctor.availability_status === "In Consultation"
                    ? "bg-amber-500"
                    : doctor.availability_status === "Emergency Only"
                    ? "bg-rose-500"
                    : "bg-slate-400"
                )}
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-base font-extrabold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-primary transition-colors leading-snug">
                {doctor.name}
              </h3>
              <p className="text-xs font-bold text-[#063669] dark:text-blue-400 truncate mt-0.5">
                {doctor.specialization}
              </p>
              <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                {doctor.qualification}
              </p>
            </div>
          </div>

          {/* Department Badge */}
          <span
            className={cn(
              "px-2.5 py-1 rounded-lg text-[10px] font-bold border shrink-0 uppercase tracking-wide",
              getDeptBadge(doctor.department)
            )}
          >
            {doctor.department === "Both" ? "OPD & IPD" : `${doctor.department} Specialist`}
          </span>
        </div>

        {/* Status Pill Strip */}
        <div className="mt-3.5 flex items-center justify-between gap-2">
          <span
            className={cn(
              "px-2.5 py-0.5 rounded-full text-[11px] font-bold border inline-flex items-center gap-1.5",
              getStatusBadge(doctor.availability_status)
            )}
          >
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full shrink-0",
                doctor.availability_status === "Available"
                  ? "bg-emerald-500"
                  : doctor.availability_status === "In Consultation"
                  ? "bg-amber-500 font-bold"
                  : doctor.availability_status === "Emergency Only"
                  ? "bg-rose-500"
                  : "bg-slate-400"
              )}
            />
            {doctor.availability_status}
          </span>

          <span className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100 bg-slate-100 dark:bg-zinc-900 px-2.5 py-0.5 rounded-lg border border-slate-200/60 dark:border-zinc-800">
            ₹{doctor.consultation_fee} <span className="text-[10px] font-normal text-zinc-400">/ visit</span>
          </span>
        </div>

        {/* 2x2 Info Grid */}
        <div className="mt-3.5 grid grid-cols-2 gap-2 bg-slate-50/90 dark:bg-zinc-900/60 p-3 rounded-xl text-xs border border-slate-100 dark:border-zinc-800/60">
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 truncate">
            <Award className="h-3.5 w-3.5 text-[#063669] dark:text-blue-400 shrink-0" />
            <span className="truncate text-[11px] font-semibold">{doctor.experience_years} Yrs Exp</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 truncate">
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 shrink-0" />
            <span className="font-extrabold text-zinc-900 dark:text-zinc-100 text-[11px]">{doctor.rating}</span>
            <span className="text-[10px] text-zinc-400">({doctor.patients_count}+)</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 truncate">
            <Clock className="h-3.5 w-3.5 text-[#063669] dark:text-blue-400 shrink-0" />
            <span className="truncate text-[11px] font-medium">{doctor.working_hours}</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 truncate">
            <MapPin className="h-3.5 w-3.5 text-[#063669] dark:text-blue-400 shrink-0" />
            <span className="truncate text-[11px] font-bold text-zinc-800 dark:text-zinc-200">{doctor.room_number}</span>
          </div>
        </div>

        {/* Contact Row */}
        <div className="mt-3 px-1 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <a
            href={`tel:${doctor.phone_number}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 hover:text-[#063669] transition-colors font-medium truncate"
          >
            <Phone className="h-3.5 w-3.5 text-[#063669] dark:text-blue-400 shrink-0" />
            <span className="truncate">{doctor.phone_number}</span>
          </a>
          <a
            href={`mailto:${doctor.email}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 hover:text-[#063669] transition-colors font-medium truncate"
          >
            <Mail className="h-3.5 w-3.5 text-[#063669] dark:text-blue-400 shrink-0" />
            <span className="truncate">{doctor.email.split("@")[0]}</span>
          </a>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2">
        <Button
          onClick={() => onViewDetails(doctor)}
          variant="outline"
          className="flex-1 h-9 rounded-xl text-xs font-bold border-zinc-200 text-zinc-700 hover:bg-slate-50 dark:border-zinc-800 dark:text-zinc-300 gap-1.5"
        >
          <Eye className="h-3.5 w-3.5" />
          View Profile
        </Button>
        <Button
          onClick={() => onEdit(doctor)}
          className="h-9 px-4 rounded-xl text-xs font-bold bg-[#063669] hover:bg-[#063669]/90 text-white gap-1.5"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </Button>
      </div>
    </div>
  );
};
