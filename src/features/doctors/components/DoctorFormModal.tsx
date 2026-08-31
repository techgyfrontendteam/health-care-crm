import React, { useState, useEffect } from "react";
import { Doctor, DepartmentType, DoctorStatus, CreateDoctorRequest } from "../types";
import { X, User, Phone, Mail, Award, Clock, MapPin, Building2 } from "lucide-react";
import { Dialog, DialogContent } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

interface DoctorFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  doctor?: Doctor | null;
  isLoading?: boolean;
}

export const DoctorFormModal: React.FC<DoctorFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  doctor,
  isLoading,
}) => {
  const isEdit = !!doctor;

  const [formData, setFormData] = useState<CreateDoctorRequest>({
    name: "",
    title: "Dr.",
    specialization: "Cardiology",
    department: "Both",
    qualification: "",
    experience_years: 5,
    email: "",
    phone_number: "",
    image_url: "",
    availability_status: "Available",
    consultation_fee: 1000,
    working_hours: "09:00 AM - 04:00 PM",
    room_number: "OPD-101",
    bio: "",
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name || "",
        title: doctor.title || "Dr.",
        specialization: doctor.specialization || "",
        department: doctor.department || "Both",
        qualification: doctor.qualification || "",
        experience_years: doctor.experience_years || 5,
        email: doctor.email || "",
        phone_number: doctor.phone_number || "",
        image_url: doctor.image_url || "",
        availability_status: doctor.availability_status || "Available",
        consultation_fee: doctor.consultation_fee || 1000,
        working_hours: doctor.working_hours || "09:00 AM - 04:00 PM",
        room_number: doctor.room_number || "OPD-101",
        bio: doctor.bio || "",
      });
    } else {
      setFormData({
        name: "",
        title: "Dr.",
        specialization: "Cardiology",
        department: "Both",
        qualification: "MBBS, MD",
        experience_years: 5,
        email: "",
        phone_number: "",
        image_url: "",
        availability_status: "Available",
        consultation_fee: 1000,
        working_hours: "09:00 AM - 04:00 PM",
        room_number: "OPD-101",
        bio: "",
      });
    }
  }, [doctor, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && doctor) {
      onSubmit({ ...formData, id: doctor.id });
    } else {
      onSubmit(formData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="p-0 max-w-xl overflow-hidden rounded-3xl border-border bg-white dark:bg-zinc-950 shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {isEdit ? "Edit Doctor Profile" : "Register New Doctor"}
            </h2>
            <p className="text-xs text-zinc-500">
              {isEdit ? "Update doctor credentials and schedule details." : "Add a new healthcare practitioner to TechGy CRM."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-sm">
          {/* Full Name & Title */}
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-1">
              <Label className="text-xs font-bold">Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Dr."
                className="mt-1 rounded-xl h-10 text-xs"
              />
            </div>
            <div className="col-span-3">
              <Label className="text-xs font-bold">Doctor Full Name *</Label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Dr. Ananya Rao"
                className="mt-1 rounded-xl h-10 text-xs"
              />
            </div>
          </div>

          {/* Specialization & Department */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-bold">Specialization *</Label>
              <Input
                required
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                placeholder="e.g. Cardiology, Neurology"
                className="mt-1 rounded-xl h-10 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs font-bold">Department *</Label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value as DepartmentType })}
                className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-10 px-3 text-xs font-medium focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="Both">Both OPD & IPD</option>
                <option value="OPD">OPD Outpatient Only</option>
                <option value="IPD">IPD In-Patient Only</option>
              </select>
            </div>
          </div>

          {/* Qualification & Experience */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <Label className="text-xs font-bold">Qualification *</Label>
              <Input
                required
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                placeholder="e.g. MBBS, MD, DM"
                className="mt-1 rounded-xl h-10 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs font-bold">Experience (Yrs)</Label>
              <Input
                type="number"
                value={formData.experience_years}
                onChange={(e) => setFormData({ ...formData, experience_years: Number(e.target.value) })}
                className="mt-1 rounded-xl h-10 text-xs"
              />
            </div>
          </div>

          {/* Phone & Email */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-bold">Phone Number *</Label>
              <Input
                required
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                placeholder="+91 98765 43210"
                className="mt-1 rounded-xl h-10 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs font-bold">Email Address *</Label>
              <Input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="doctor@techgyhealth.com"
                className="mt-1 rounded-xl h-10 text-xs"
              />
            </div>
          </div>

          {/* Fee & Availability */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-bold">Consultation Fee (₹)</Label>
              <Input
                type="number"
                value={formData.consultation_fee}
                onChange={(e) => setFormData({ ...formData, consultation_fee: Number(e.target.value) })}
                className="mt-1 rounded-xl h-10 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs font-bold">Status</Label>
              <select
                value={formData.availability_status}
                onChange={(e) => setFormData({ ...formData, availability_status: e.target.value as DoctorStatus })}
                className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-10 px-3 text-xs font-medium focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="Available">Available</option>
                <option value="In Consultation">In Consultation</option>
                <option value="Emergency Only">Emergency Only</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
          </div>

          {/* Hours & Room */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-bold">Working Hours</Label>
              <Input
                value={formData.working_hours}
                onChange={(e) => setFormData({ ...formData, working_hours: e.target.value })}
                placeholder="09:00 AM - 04:00 PM"
                className="mt-1 rounded-xl h-10 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs font-bold">Room / Chamber No.</Label>
              <Input
                value={formData.room_number}
                onChange={(e) => setFormData({ ...formData, room_number: e.target.value })}
                placeholder="OPD-204"
                className="mt-1 rounded-xl h-10 text-xs"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <Label className="text-xs font-bold">Profile Image URL</Label>
            <Input
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="mt-1 rounded-xl h-10 text-xs"
            />
          </div>

          {/* Bio */}
          <div>
            <Label className="text-xs font-bold">Bio & Clinical Summary</Label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Enter brief description of doctor's clinical achievements..."
              className="mt-1 w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl text-xs font-bold">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="rounded-xl text-xs font-bold bg-[#063669] hover:bg-[#063669]/90 text-white px-6 h-10"
            >
              {isLoading ? "Saving..." : isEdit ? "Update Doctor" : "Create Doctor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
