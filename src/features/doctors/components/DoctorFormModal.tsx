import React, { useState, useEffect } from "react";
import type { Doctor, CreateDoctorRequest } from "../types";
import { User, Upload } from "lucide-react";
import { Dialog, DialogContent } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { useUploadFileMutation } from "../../../shared/api/s3ApiSlice";
import { useGetAllMasterDataQuery } from "../../master/api/masterApi";
import { useCreateDoctorMutation } from "../api/doctorsApiSlice";
import { toast } from "sonner";
import { TimePicker } from "../../../shared/components/DateTimePicker";

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFile] = useUploadFileMutation();
  const [createDoctor, { isLoading: isCreating }] = useCreateDoctorMutation();
  const { data: masterData } = useGetAllMasterDataQuery();

  const [formData, setFormData] = useState<any>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    education: "",
    experience: "",
    consultation_fee: "",
    branch_id: 0,
    specialization_id: 0,
    service_id: 0,
    available_start_time: "",
    available_end_time: "",
    profile_img: "",
    country_code: "+91",
    image_url: "", // local preview
  });

  useEffect(() => {
    if (doctor) {
      const matchedSpecId =
        doctor.specialization_id ||
        masterData?.specialisations?.find(
          (s) =>
            s.id === doctor.specialization_id ||
            s.description?.toLowerCase() === doctor.specialization?.toLowerCase()
        )?.id ||
        0;

      const matchedBranchId =
        doctor.branch_id ||
        masterData?.branches?.find(
          (b) =>
            b.id === doctor.branch_id ||
            b.description?.toLowerCase() === doctor.hospital_branch?.toLowerCase()
        )?.id ||
        0;

      const matchedServiceId =
        doctor.service_id ||
        masterData?.services?.find(
          (s) =>
            s.id === doctor.service_id ||
            s.description?.toLowerCase() === doctor.service_type?.toLowerCase() ||
            (doctor.department === "OPD" && s.description?.toLowerCase().includes("op") && !s.description?.toLowerCase().includes("ip")) ||
            (doctor.department === "IPD" && s.description?.toLowerCase().includes("ip") && !s.description?.toLowerCase().includes("op")) ||
            (doctor.department === "Both" && s.description?.toLowerCase().includes("both"))
        )?.id ||
        0;

      const startT = doctor.available_start_time
        ? doctor.available_start_time.slice(0, 5)
        : doctor.working_hours
        ? doctor.working_hours.split(" - ")[0]
        : "";
      const endT = doctor.available_end_time
        ? doctor.available_end_time.slice(0, 5)
        : doctor.working_hours
        ? doctor.working_hours.split(" - ")[1]
        : "";

      setFormData({
        first_name: doctor.first_name || (doctor.name ? doctor.name.split(" ")[0] : ""),
        last_name: doctor.last_name || (doctor.name ? doctor.name.split(" ").slice(1).join(" ") : ""),
        email: doctor.email || "",
        phone_number: doctor.phone_number || "",
        education: doctor.qualification || "",
        experience: doctor.experience_years !== undefined && doctor.experience_years !== null ? doctor.experience_years : "",
        consultation_fee: doctor.consultation_fee !== undefined && doctor.consultation_fee !== null ? doctor.consultation_fee : "",
        branch_id: matchedBranchId,
        specialization_id: matchedSpecId,
        service_id: matchedServiceId,
        available_start_time: startT || "",
        available_end_time: endT || "",
        profile_img: doctor.image_url || "",
        country_code: "+91",
        image_url: doctor.image_url || "",
      });
      setSelectedFile(null);
    } else {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        education: "",
        experience: "",
        consultation_fee: "",
        branch_id: 0,
        specialization_id: 0,
        service_id: 0,
        available_start_time: "",
        available_end_time: "",
        profile_img: "",
        country_code: "+91",
        image_url: "",
      });
      setSelectedFile(null);
    }
  }, [doctor, open, masterData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let finalProfileImg = formData.profile_img;

    if (!formData.specialization_id || Number(formData.specialization_id) === 0) {
      toast.error("Please select a department (specialisation)");
      return;
    }
    if (!formData.service_id || Number(formData.service_id) === 0) {
      toast.error("Please select a service type");
      return;
    }
    if (!formData.branch_id || Number(formData.branch_id) === 0) {
      toast.error("Please select a hospital branch");
      return;
    }
    if (!formData.available_start_time) {
      toast.error("Please select available start time");
      return;
    }
    if (!formData.available_end_time) {
      toast.error("Please select available end time");
      return;
    }

    if (selectedFile) {
      setIsUploading(true);
      try {
        const fileFormData = new FormData();
        const dateStamp = new Date().getTime();
        const finalKey = `users/doctors/${dateStamp}/${selectedFile.name}`;
        fileFormData.append("file", selectedFile);
        fileFormData.append("key", finalKey);
        
        const res = await uploadFile(fileFormData).unwrap();
        finalProfileImg = res.url || res.key;
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to upload profile picture");
        setIsUploading(false);
        return; // Stop submission on upload failure
      }
      setIsUploading(false);
    }

    const startTFormatted = formData.available_start_time.length === 5 ? `${formData.available_start_time}:00` : formData.available_start_time;
    const endTFormatted = formData.available_end_time.length === 5 ? `${formData.available_end_time}:00` : formData.available_end_time;

    const payload: CreateDoctorRequest = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: formData.phone_number,
      education: formData.education,
      experience: formData.experience === "" || formData.experience === undefined || formData.experience === null ? 0 : Number(formData.experience),
      consultation_fee: formData.consultation_fee === "" || formData.consultation_fee === undefined || formData.consultation_fee === null ? 0 : Number(formData.consultation_fee),
      branch_id: Number(formData.branch_id),
      specialization_id: Number(formData.specialization_id),
      service_id: Number(formData.service_id),
      available_start_time: startTFormatted,
      available_end_time: endTFormatted,
      profile_img: finalProfileImg,
      country_code: formData.country_code,
    };

    const mockDoctorForUI = {
      ...payload,
      name: `${payload.first_name} ${payload.last_name}`,
      department: "Both",
      specialization: masterData?.specialisations?.find(s => s.id === payload.specialization_id)?.description || "N/A",
      hospital_branch: masterData?.branches?.find(b => b.id === payload.branch_id)?.description || "N/A",
      image_url: finalProfileImg,
      experience_years: payload.experience,
      qualification: payload.education,
      service_type: masterData?.services?.find(s => s.id === payload.service_id)?.description || "N/A",
    };

    if (isEdit && doctor) {
      onSubmit({ ...mockDoctorForUI, id: doctor.id });
    } else {
      try {
        await createDoctor(payload).unwrap();
        toast.success("Doctor created successfully");
        onSubmit(mockDoctorForUI);
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to create doctor");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="p-0 max-w-xl overflow-hidden rounded-3xl border-border bg-white dark:bg-zinc-950 shadow-2xl">
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between pr-12">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {isEdit ? "Edit Doctor Profile" : "Add Doctor"}
            </h2>
            <p className="text-xs text-zinc-500">
              {isEdit ? "Update doctor credentials and department details." : "Add a new healthcare practitioner to TechGy CRM."}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-bold">First Name *</Label>
              <Input
                required
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                placeholder="e.g. Ananya"
                className="mt-1 rounded-xl h-10 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs font-bold">Last Name *</Label>
              <Input
                required
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                placeholder="e.g. Rao"
                className="mt-1 rounded-xl h-10 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-bold">Department (Specialisation) *</Label>
              <Select
                value={formData.specialization_id ? String(formData.specialization_id) : ""}
                onValueChange={(val) => setFormData((prev: any) => ({ ...prev, specialization_id: Number(val) }))}
              >
                <SelectTrigger className="mt-1 rounded-xl h-10 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-900 text-black dark:text-white z-[99999] max-h-56 overflow-y-auto">
                  {masterData?.specialisations?.map((spec) => (
                    <SelectItem key={spec.id} value={String(spec.id)} className="text-xs cursor-pointer py-2">
                      {spec.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-bold">Service Type *</Label>
              <Select
                value={formData.service_id ? String(formData.service_id) : ""}
                onValueChange={(val) => setFormData((prev: any) => ({ ...prev, service_id: Number(val) }))}
              >
                <SelectTrigger className="mt-1 rounded-xl h-10 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium">
                  <SelectValue placeholder="Select Service Type" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-900 text-black dark:text-white z-[99999] max-h-56 overflow-y-auto">
                  {masterData?.services?.map((st) => (
                    <SelectItem key={st.id} value={String(st.id)} className="text-xs cursor-pointer py-2">
                      {st.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <Label className="text-xs font-bold">Qualification (Education) *</Label>
              <Input
                required
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                placeholder="e.g. MBBS, MD, DM"
                className="mt-1 rounded-xl h-10 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs font-bold">Experience (Yrs)</Label>
              <Input
                type="number"
                value={formData.experience !== undefined && formData.experience !== null ? formData.experience : ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData((prev: any) => ({
                    ...prev,
                    experience: val === "" ? "" : Number(val),
                  }));
                }}
                placeholder="e.g. 5"
                min={0}
                className="mt-1 rounded-xl h-10 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-bold">Phone Number *</Label>
              <Input
                required
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                placeholder="e.g. 9876543210"
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
                placeholder="e.g. doctor@techgyhealth.com"
                className="mt-1 rounded-xl h-10 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-bold">Consultation Fee (₹)</Label>
              <Input
                type="number"
                value={formData.consultation_fee !== undefined && formData.consultation_fee !== null ? formData.consultation_fee : ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData((prev: any) => ({
                    ...prev,
                    consultation_fee: val === "" ? "" : Number(val),
                  }));
                }}
                placeholder="e.g. 1000"
                min={0}
                className="mt-1 rounded-xl h-10 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs font-bold">Hospital Branch</Label>
              <Select
                value={formData.branch_id ? String(formData.branch_id) : ""}
                onValueChange={(val) => setFormData((prev: any) => ({ ...prev, branch_id: Number(val) }))}
              >
                <SelectTrigger className="mt-1 rounded-xl h-10 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium">
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-900 text-black dark:text-white z-[99999] max-h-56 overflow-y-auto">
                  {masterData?.branches?.map((branch) => (
                    <SelectItem key={branch.id} value={String(branch.id)} className="text-xs cursor-pointer py-2">
                      {branch.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-bold mb-1.5 block">Available Start Time *</Label>
              <TimePicker
                value={formData.available_start_time}
                onChange={(val) => setFormData({ ...formData, available_start_time: val })}
                placeholder="Select start time"
              />
            </div>
            <div>
              <Label className="text-xs font-bold mb-1.5 block">Available End Time *</Label>
              <TimePicker
                value={formData.available_end_time}
                onChange={(val) => setFormData({ ...formData, available_end_time: val })}
                placeholder="Select end time"
              />
            </div>
          </div>

          <div className="col-span-2 mt-2">
            <Label className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-2 block">Profile Picture</Label>
            <label
              htmlFor="doctor-avatar-upload"
              className="flex items-center gap-4 p-4 w-full bg-white dark:bg-zinc-900/50 rounded-2xl border-2 border-dashed border-zinc-200 hover:border-[#063669]/50 dark:border-zinc-800 dark:hover:border-blue-500/50 transition-all cursor-pointer group"
            >
              <div className="relative shrink-0">
                {formData.image_url ? (
                  <img
                    src={formData.image_url}
                    alt="Doctor Avatar Preview"
                    className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-zinc-900 shadow-md group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-zinc-800 border-4 border-white dark:border-zinc-900 shadow-md flex items-center justify-center text-zinc-400 group-hover:scale-105 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-[#063669] dark:group-hover:text-blue-400 transition-all duration-300">
                    <User className="h-7 w-7" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 bg-[#063669] text-white p-1.5 rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform duration-300">
                  <Upload className="h-3 w-3" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {selectedFile ? "Change Photo" : "Upload Photo"}
                </p>
                <p className="text-xs text-zinc-500 truncate mt-0.5">
                  {selectedFile ? selectedFile.name : "Click to browse files"}
                </p>
                <p className="text-[10px] text-zinc-400 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
              </div>

              <div className="shrink-0 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 group-hover:bg-[#063669] group-hover:text-white dark:group-hover:bg-blue-600 transition-colors">
                Browse
              </div>
              
              <input
                type="file"
                id="doctor-avatar-upload"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setSelectedFile(file);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData((prev: any) => ({ ...prev, image_url: reader.result as string }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
              />
            </label>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl text-xs font-bold">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || isUploading || isCreating}
              className="rounded-xl text-xs font-bold bg-[#063669] hover:bg-[#063669]/90 text-white px-6 h-10"
            >
              {isUploading ? "Uploading..." : isCreating ? "Saving..." : isEdit ? "Update Doctor" : "Create Doctor"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
