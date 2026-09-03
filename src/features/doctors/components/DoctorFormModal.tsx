import React, { useState, useEffect, useMemo } from "react";
import type { Doctor, DepartmentType, DoctorStatus, CreateDoctorRequest } from "../types";
import { X, User, Phone, Mail, Award, Clock, MapPin, Building2, Upload } from "lucide-react";
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

  const departmentOptions = useMemo(() => {
    const defaultDepts = [
      "Cardiology",
      "Neurology",
      "Pediatrics",
      "Orthopedics",
      "Oncology",
      "Dermatology",
      "Gastroenterology",
      "General Medicine",
      "Gynecology & Obstetrics",
      "Nephrology",
      "Urology",
      "Pulmonology",
      "ENT",
      "Ophthalmology",
      "Psychiatry",
      "General Surgery",
    ];
    if (doctor?.specialization && !defaultDepts.includes(doctor.specialization)) {
      return [doctor.specialization, ...defaultDepts];
    }
    return defaultDepts;
  }, [doctor]);

  const serviceTypeOptions = [
    "Both OPD & IPD",
    "OPD",
    "IPD",
    "Consultation",
    "Daycare",
    "Emergency",
  ];

  const [formData, setFormData] = useState<CreateDoctorRequest>({
    first_name: "",
    last_name: "",
    name: "",
    title: "Dr.",
    specialization: "Cardiology",
    department: "Both",
    service_type: "Both OPD & IPD",
    qualification: "",
    experience_years: 5,
    email: "",
    phone_number: "",
    image_url: "",
    availability_status: "Available",
    consultation_fee: 1000,
    working_hours: "",
    room_number: "",
    bio: "",
    hospital_branch: "Hyderabad",
  });

  useEffect(() => {
    if (doctor) {
      let fName = doctor.first_name || "";
      let lName = doctor.last_name || "";

      if (!fName && doctor.name) {
        const cleaned = doctor.name.replace(/^Dr\.?\s+/i, "").trim();
        const parts = cleaned.split(" ");
        fName = parts[0] || "";
        lName = parts.slice(1).join(" ") || "";
      }

      const initialServiceType =
        doctor.service_type ||
        (doctor.department === "Both"
          ? "Both OPD & IPD"
          : doctor.department === "OPD"
          ? "OPD"
          : doctor.department === "IPD"
          ? "IPD"
          : "Both OPD & IPD");

      setFormData({
        first_name: fName,
        last_name: lName,
        name: doctor.name || `${fName} ${lName}`.trim(),
        title: doctor.title || "Dr.",
        specialization: doctor.specialization || "Cardiology",
        department: doctor.department || "Both",
        service_type: initialServiceType,
        qualification: doctor.qualification || "",
        experience_years: doctor.experience_years || 5,
        email: doctor.email || "",
        phone_number: doctor.phone_number || "",
        image_url: doctor.image_url || "",
        availability_status: doctor.availability_status || "Available",
        consultation_fee: doctor.consultation_fee || 1000,
        working_hours: doctor.working_hours || "",
        room_number: doctor.room_number || "",
        bio: doctor.bio || "",
        hospital_branch: doctor.hospital_branch || "Hyderabad",
      });
    } else {
      setFormData({
        first_name: "",
        last_name: "",
        name: "",
        title: "Dr.",
        specialization: "Cardiology",
        department: "Both",
        service_type: "Both OPD & IPD",
        qualification: "MBBS, MD",
        experience_years: 5,
        email: "",
        phone_number: "",
        image_url: "",
        availability_status: "Available",
        consultation_fee: 1000,
        working_hours: "",
        room_number: "",
        bio: "",
        hospital_branch: "Hyderabad",
      });
    }
  }, [doctor, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = formData.name || `${formData.first_name || ""} ${formData.last_name || ""}`.trim();
    const serviceType = formData.service_type || "Both OPD & IPD";
    const mappedDept: DepartmentType =
      serviceType.toUpperCase().includes("IPD") && !serviceType.toUpperCase().includes("OPD")
        ? "IPD"
        : serviceType.toUpperCase().includes("OPD") && !serviceType.toUpperCase().includes("IPD")
        ? "OPD"
        : "Both";

    const payload = {
      ...formData,
      name: fullName,
      first_name: formData.first_name,
      last_name: formData.last_name,
      title: formData.title || "Dr.",
      department: mappedDept,
      service_type: serviceType,
    };

    if (isEdit && doctor) {
      onSubmit({ ...payload, id: doctor.id });
    } else {
      onSubmit(payload);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="p-0 max-w-xl overflow-hidden rounded-3xl border-border bg-white dark:bg-zinc-950 shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between pr-12">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {isEdit ? "Edit Doctor Profile" : "Register New Doctor"}
            </h2>
            <p className="text-xs text-zinc-500">
              {isEdit ? "Update doctor credentials and department details." : "Add a new healthcare practitioner to TechGy CRM."}
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-sm">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-bold">First Name *</Label>
              <Input
                required
                value={formData.first_name || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    first_name: val,
                    name: `${val} ${prev.last_name || ""}`.trim(),
                  }));
                }}
                placeholder="e.g. Ananya"
                className="mt-1 rounded-xl h-10 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs font-bold">Last Name *</Label>
              <Input
                required
                value={formData.last_name || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    last_name: val,
                    name: `${prev.first_name || ""} ${val}`.trim(),
                  }));
                }}
                placeholder="e.g. Rao"
                className="mt-1 rounded-xl h-10 text-xs"
              />
            </div>
          </div>

          {/* Department & Service Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-bold">Department *</Label>
              <select
                required
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-10 px-3 text-xs font-medium focus:ring-2 focus:ring-primary outline-none"
              >
                {departmentOptions.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-xs font-bold">Service Type *</Label>
              <select
                required
                value={formData.service_type || "Both OPD & IPD"}
                onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-10 px-3 text-xs font-medium focus:ring-2 focus:ring-primary outline-none"
              >
                {serviceTypeOptions.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
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

          {/* Fee & Hospital Branch */}
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
              <Label className="text-xs font-bold">Hospital Branch City</Label>
              <select
                value={formData.hospital_branch || "Hyderabad"}
                onChange={(e) => setFormData({ ...formData, hospital_branch: e.target.value })}
                className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-10 px-3 text-xs font-medium focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="Hyderabad">Hyderabad</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Chennai">Chennai</option>
                <option value="Pune">Pune</option>
              </select>
            </div>
          </div>

          {/* Profile Image Upload & URL */}
          <div className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
            <div className="relative group shrink-0">
              <img
                src={formData.image_url || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop"}
                alt="Doctor Avatar Preview"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white dark:border-zinc-800 shadow-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=300&auto=format&fit=crop";
                }}
              />
              <label
                htmlFor="doctor-avatar-upload"
                className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white"
                title="Upload Profile Picture"
              >
                <Upload className="h-5 w-5" />
              </label>
            </div>
            <div className="flex-1 min-w-0">
              <Label className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Profile Picture</Label>
              <p className="text-[11px] text-zinc-500 mb-2">Upload a photo from your computer or provide an image URL.</p>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  id="doctor-avatar-upload"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData((prev) => ({ ...prev, image_url: reader.result as string }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="doctor-avatar-upload"
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer inline-flex items-center gap-1.5 shadow-sm shrink-0"
                >
                  <Upload className="h-3.5 w-3.5 text-[#063669] dark:text-blue-400" />
                  Upload Photo
                </label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="Or paste Image URL..."
                  className="rounded-xl h-8 text-xs flex-1"
                />
              </div>
            </div>
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
