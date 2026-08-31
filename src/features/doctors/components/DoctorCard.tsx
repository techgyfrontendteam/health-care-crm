import React from "react";
import { Doctor } from "../types";
import { Star, Phone, Mail, Clock, MapPin, Award, UserCheck, Calendar } from "lucide-react";
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
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      case "In Consultation":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "Emergency Only":
        return "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800";
      case "On Leave":
        return "bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-400 border-slate-200 dark:border-zinc-700";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  const getDeptBadge = (dept: Doctor["department"]) => {
    switch (dept) {
      case "OPD":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800";
      case "IPD":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800";
      case "Both":
        return "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-800";
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Top Header Row */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={doctor.image_url}
              alt={doctor.name}
              className="w-16 h-16 rounded-2xl object-cover border border-zinc-100 dark:border-zinc-800 shadow-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=300&auto=format&fit=crop";
              }}
            />
            <span
              className={cn(
                "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-zinc-900",
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

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-[11px] font-bold border",
                  getDeptBadge(doctor.department)
                )}
              >
                {doctor.department === "Both" ? "OPD & IPD" : `${doctor.department} Specialist`}
              </span>
              <span
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-[11px] font-semibold border",
                  getStatusBadge(doctor.availability_status)
                )}
              >
                {doctor.availability_status}
              </span>
            </div>

            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 truncate mt-1 group-hover:text-primary transition-colors">
              {doctor.name}
            </h3>
            <p className="text-xs font-semibold text-primary truncate">
              {doctor.specialization}
            </p>
          </div>
        </div>

        {/* Info Highlights */}
        <div className="mt-4 grid grid-cols-2 gap-2 bg-slate-50 dark:bg-zinc-800/50 p-2.5 rounded-xl text-xs">
          <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 truncate">
            <Award className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="truncate">{doctor.experience_years} Yrs Exp</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 truncate">
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 shrink-0" />
            <span className="font-bold text-zinc-800 dark:text-zinc-200">{doctor.rating}</span>
            <span className="text-[10px] text-zinc-400">({doctor.patients_count}+)</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 truncate">
            <Clock className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="truncate">{doctor.working_hours.split("-")[0]}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 truncate">
            <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
            <span className="truncate">{doctor.room_number}</span>
          </div>
        </div>

        {/* Qualification */}
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-3 truncate font-medium">
          {doctor.qualification}
        </p>

        {/* Contact Strip */}
        <div className="mt-3 flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
          <a
            href={`tel:${doctor.phone_number}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-primary" />
            <span className="truncate">{doctor.phone_number}</span>
          </a>
          <span>·</span>
          <span className="font-bold text-zinc-900 dark:text-zinc-100">
            ₹{doctor.consultation_fee}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
        <Button
          onClick={() => onViewDetails(doctor)}
          variant="outline"
          className="flex-1 h-9 rounded-xl text-xs font-bold border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300"
        >
          View Profile
        </Button>
        <Button
          onClick={() => onEdit(doctor)}
          className="h-9 px-4 rounded-xl text-xs font-bold bg-[#063669] hover:bg-[#063669]/90 text-white"
        >
          Edit
        </Button>
      </div>
    </div>
  );
};
