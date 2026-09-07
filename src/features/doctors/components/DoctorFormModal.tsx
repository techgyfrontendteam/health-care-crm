import React, { useState, useEffect } from "react";
import type { Doctor, CreateDoctorRequest } from "../types";
import { User, Upload } from "lucide-react";
import { Dialog, DialogContent } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useUploadFileMutation } from "../../../shared/api/s3ApiSlice";
import { useGetAllMasterDataQuery } from "../../master/api/masterApi";
import { useCreateDoctorMutation } from "../api/doctorsApiSlice";
import { toast } from "sonner";

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
    experience: 5,
    consultation_fee: 1000,
    branch_id: 0,
    specialization_id: 0,
    service_id: 0,
    available_start_time: "09:00",
    available_end_time: "17:00",
    profile_img: "",
    country_code: "+91",
    image_url: "", // local preview
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        first_name: doctor.first_name || "",
        last_name: doctor.last_name || "",
        email: doctor.email || "",
        phone_number: doctor.phone_number || "",
        education: doctor.qualification || "",
        experience: doctor.experience_years || 5,
        consultation_fee: doctor.consultation_fee || 1000,
        branch_id: 0, 
        specialization_id: 0,
        service_id: 0,
        available_start_time: "09:00",
        available_end_time: "17:00",
        profile_img: doctor.image_url || "",
        country_code: "+91",
        image_url: doctor.image_url || "",
      });
    } else {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        education: "",
        experience: 5,
        consultation_fee: 1000,
        branch_id: masterData?.branches?.[0]?.id || 0,
        specialization_id: masterData?.specialisations?.[0]?.id || 0,
        service_id: masterData?.services?.[0]?.id || 0,
        available_start_time: "09:00",
        available_end_time: "17:00",
        profile_img: "",
        country_code: "+91",
        image_url: "",
      });
    }
  }, [doctor, open, masterData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let finalProfileImg = formData.profile_img;

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

    const payload: CreateDoctorRequest = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: formData.phone_number,
      education: formData.education,
      experience: Number(formData.experience),
      consultation_fee: Number(formData.consultation_fee),
      branch_id: Number(formData.branch_id),
      specialization_id: Number(formData.specialization_id),
      service_id: Number(formData.service_id),
      available_start_time: `${formData.available_start_time}:00`,
      available_end_time: `${formData.available_end_time}:00`,
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
      availability_status: "Available",
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
              {isEdit ? "Edit Doctor Profile" : "Register New Doctor"}
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
              <select
                required
                value={formData.specialization_id}
                onChange={(e) => setFormData({ ...formData, specialization_id: Number(e.target.value) })}
                className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-10 px-3 text-xs font-medium focus:ring-2 focus:ring-primary outline-none"
              >
                <option value={0} disabled>Select Department</option>
                {masterData?.specialisations?.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.description}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="text-xs font-bold">Service Type *</Label>
              <select
                required
                value={formData.service_id}
                onChange={(e) => setFormData({ ...formData, service_id: Number(e.target.value) })}
                className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-10 px-3 text-xs font-medium focus:ring-2 focus:ring-primary outline-none"
              >
                <option value={0} disabled>Select Service Type</option>
                {masterData?.services?.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.description}
                  </option>
                ))}
              </select>
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
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
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
                placeholder="9876543210"
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
              <Label className="text-xs font-bold">Hospital Branch</Label>
              <select
                required
                value={formData.branch_id}
                onChange={(e) => setFormData({ ...formData, branch_id: Number(e.target.value) })}
                className="mt-1 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-10 px-3 text-xs font-medium focus:ring-2 focus:ring-primary outline-none"
              >
                <option value={0} disabled>Select Branch</option>
                {masterData?.branches?.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-bold">Available Start Time *</Label>
              <Input
                type="time"
                required
                value={formData.available_start_time}
                onChange={(e) => setFormData({ ...formData, available_start_time: e.target.value })}
                className="mt-1 rounded-xl h-10 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs font-bold">Available End Time *</Label>
              <Input
                type="time"
                required
                value={formData.available_end_time}
                onChange={(e) => setFormData({ ...formData, available_end_time: e.target.value })}
                className="mt-1 rounded-xl h-10 text-xs"
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
