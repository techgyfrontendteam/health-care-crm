import React from "react";
import type { Doctor } from "../types";
import {
  X,
  Phone,
  Mail,
  Award,
  Clock,
  MapPin,
  Star,
  UserCheck,
  Building2,
  Calendar,
  IndianRupee,
} from "lucide-react";
import { Dialog, DialogContent } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../utils";

interface DoctorDetailsModalProps {
  doctor: Doctor | null;
  open: boolean;
  onClose: () => void;
  onEdit: (doctor: Doctor) => void;
}

export const DoctorDetailsModal: React.FC<DoctorDetailsModalProps> = ({
  doctor,
  open,
  onClose,
  onEdit,
}) => {
  if (!doctor) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="p-0 max-w-xl overflow-hidden rounded-3xl border-border bg-white dark:bg-zinc-950 shadow-2xl">
        {/* Banner / Header */}
        <div className="bg-gradient-to-r from-[#063669] to-[#0f3d6b] p-6 text-white relative">

          <div className="flex items-center gap-5">
            <img
              src={doctor.image_url}
              alt={doctor.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-white/30 shadow-md shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=300&auto=format&fit=crop";
              }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-white/20 text-white tracking-wider">
                  {doctor.service_type || (doctor.department === "Both" ? "OPD & IPD" : `${doctor.department} Specialist`)}
                </span>
              </div>
              <h2 className="text-xl font-black mt-1 leading-tight">{doctor.name}</h2>
              <p className="text-xs text-blue-200 font-semibold">{doctor.specialization}</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-center">
              <p className="text-[10px] font-bold text-zinc-400 uppercase">Experience</p>
              <p className="text-base font-extrabold text-primary mt-0.5">{doctor.experience_years} Years</p>
            </div>
            <div className="bg-slate-50 dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-center">
              <p className="text-[10px] font-bold text-zinc-400 uppercase">Fee</p>
              <p className="text-base font-extrabold text-emerald-600 mt-0.5">₹{doctor.consultation_fee}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <Award className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-zinc-400">Qualifications</p>
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">{doctor.qualification}</p>
              </div>
            </div>

            {(doctor.working_hours || doctor.room_number) && (
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-zinc-400">Working Hours & OPD/IPD Room</p>
                  <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                    {doctor.working_hours || "Regular Hours"} {doctor.room_number ? `· ${doctor.room_number}` : ""}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-zinc-400">Hospital Branch & Wing</p>
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {doctor.hospital_branch || "Main Healthcare Campus"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-zinc-400">Contact Number</p>
                <a href={`tel:${doctor.phone_number}`} className="font-semibold text-primary hover:underline">
                  {doctor.phone_number}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-zinc-400">Email Address</p>
                <a href={`mailto:${doctor.email}`} className="font-semibold text-primary hover:underline">
                  {doctor.email}
                </a>
              </div>
            </div>

            {doctor.bio && (
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                <p className="text-xs font-bold text-zinc-400 mb-1">Biography & Expertise</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">{doctor.bio}</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <Button variant="ghost" onClick={onClose} className="rounded-xl text-xs font-bold">
            Close
          </Button>
          <Button
            onClick={() => {
              onClose();
              onEdit(doctor);
            }}
            className="rounded-xl text-xs font-bold bg-[#063669] hover:bg-[#063669]/90 text-white"
          >
            Edit Doctor Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
