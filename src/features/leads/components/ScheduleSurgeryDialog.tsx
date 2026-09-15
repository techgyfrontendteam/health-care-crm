import React, { useState, useMemo, useEffect } from "react";
import {
  Loader2,
  Building,
  MapPin,
  Stethoscope,
  Sparkles,
  Activity,
  UserCheck,
  IndianRupee,
} from "lucide-react";
import { toast } from "sonner";
import { DatePicker, TimePicker } from "../../../shared/components/DateTimePicker";
import { useGetAllMasterDataQuery } from "../../master/api/masterApi";
import { useGetAllDoctorsQuery } from "../../doctors/api/doctorsApiSlice";
import { useCreateSurgeryMutation, useUpdateSurgeryMutation } from "../api/leadsApi";
import type { Lead, SurgeryDetail } from "../types";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

export interface ScheduleSurgeryDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  lead: Lead | null;
  surgery?: SurgeryDetail | null;
  onSuccess?: () => void;
}

export const ScheduleSurgeryDialog: React.FC<ScheduleSurgeryDialogProps> = ({
  open,
  onOpenChange,
  onClose,
  lead,
  surgery,
  onSuccess,
}) => {
  // Master Data
  const { data: masterData, isLoading: isLoadingMasterData } = useGetAllMasterDataQuery();

  // Doctors list (fetch all doctors without filter as required)
  const { data: doctorsResp, isLoading: isLoadingDoctors } = useGetAllDoctorsQuery({
    branch_id: 0,
    specialization_id: 0,
  });
  const [createSurgery, { isLoading: isCreating }] = useCreateSurgeryMutation();
  const [updateSurgery, { isLoading: isUpdating }] = useUpdateSurgeryMutation();
  const isSubmitting = isCreating || isUpdating;

  const handleClose = () => {
    if (onOpenChange) onOpenChange(false);
    if (onClose) onClose();
  };

  // Derived location / branch / specialization details for badge card
  const derivedBranchId = useMemo(() => {
    const bId =
      (surgery as any)?.branch_id ||
      (surgery as any)?.location_id ||
      (lead as any)?.branch_id ||
      (lead as any)?.location_id;
    if (bId && !isNaN(Number(bId)) && Number(bId) > 0) return Number(bId);

    const bName =
      (surgery as any)?.hospital_branch ||
      (surgery as any)?.branch ||
      (lead as any)?.hospital_branch ||
      (lead as any)?.branch ||
      (lead as any)?.branch_name;
    if (bName && masterData?.branches) {
      const found = masterData.branches.find(
        (b: any) =>
          b.description?.toLowerCase() === String(bName).toLowerCase() ||
          b.code?.toLowerCase() === String(bName).toLowerCase()
      );
      if (found) return found.id;
    }
    return null;
  }, [surgery, lead, masterData?.branches]);

  const derivedSpecId = useMemo(() => {
    const dept =
      (surgery as any)?.specialisation_id ||
      (surgery as any)?.specialization_id ||
      (lead as any)?.specialisation_id ||
      (lead as any)?.specialization_id ||
      (lead as any)?.department ||
      (lead as any)?.specialization ||
      "";
    if (!dept) return 0;
    if (!isNaN(Number(dept)) && Number(dept) > 0) return Number(dept);

    const found = masterData?.specialisations?.find(
      (s: any) =>
        s.description?.toLowerCase() === String(dept).toLowerCase() ||
        s.code?.toLowerCase() === String(dept).toLowerCase()
    );
    return found ? found.id : 0;
  }, [surgery, lead, masterData?.specialisations]);

  const branchObj = masterData?.branches?.find((b: any) => b.id === derivedBranchId);
  const locationObj = masterData?.locations?.find((l: any) => l.id === (branchObj?.location_id || (lead as any)?.location_id));
  const specObj = masterData?.specialisations?.find((s: any) => s.id === derivedSpecId);

  // Doctors list normalization with fallback for selected doctor
  const doctorsList = useMemo(() => {
    let list: any[] = [];
    if (doctorsResp) {
      if (Array.isArray(doctorsResp)) list = doctorsResp;
      else if (Array.isArray(doctorsResp.data)) list = doctorsResp.data;
      else if (Array.isArray(doctorsResp.doctors)) list = doctorsResp.doctors;
    }
    if (surgery?.doctor_id && !list.some((d: any) => Number(d.id) === Number(surgery.doctor_id))) {
      list = [
        {
          id: surgery.doctor_id,
          first_name: surgery.doctor_name || `Doctor #${surgery.doctor_id}`,
          last_name: "",
          specialization_id: derivedSpecId,
        },
        ...list,
      ];
    }
    return list;
  }, [doctorsResp, surgery, derivedSpecId]);

  // Surgery Types from Master Data with fallback for selected surgery type
  const surgeryTypes = useMemo(() => {
    let list =
      masterData?.surgery_types ||
      (masterData as any)?.surgery_type ||
      (masterData as any)?.lead_surgery_types ||
      [];
    list = Array.isArray(list) ? [...list] : [];
    if (surgery?.surgery_type_id && !list.some((st: any) => Number(st.id) === Number(surgery.surgery_type_id))) {
      list = [
        {
          id: surgery.surgery_type_id,
          description: surgery.surgery_type_name || `Surgery Type #${surgery.surgery_type_id}`,
        },
        ...list,
      ];
    }
    return list;
  }, [masterData, surgery]);

  const DEFAULT_SURGERY_STATUSES = [
    { id: 1, code: "SCHDL", description: "Surgery Scheduled" },
    { id: 2, code: "CMP", description: "Surgery Completed" },
    { id: 3, code: "CANCEL", description: "Surgery Cancelled" },
    { id: 4, code: "RESCHD", description: "Surgery Rescheduled" },
  ];

  // Surgery Statuses from Master Data with fallback for selected status
  const surgeryStatuses = useMemo(() => {
    let list =
      masterData?.surgery_statuses ||
      (masterData as any)?.surgery_status ||
      (masterData as any)?.lead_surgery_statuses ||
      [];
    if (!Array.isArray(list) || list.length === 0) {
      list = DEFAULT_SURGERY_STATUSES;
    } else {
      list = [...list];
    }
    if (surgery?.surgery_status_id && !list.some((st: any) => Number(st.id) === Number(surgery.surgery_status_id))) {
      list = [
        {
          id: surgery.surgery_status_id,
          code: surgery.surgery_status_code || "",
          description: surgery.surgery_status_name || surgery.surgery_status_code || `Status #${surgery.surgery_status_id}`,
        },
        ...list,
      ];
    }
    return list;
  }, [masterData, surgery]);

  // Form State
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("");
  const [selectedSurgeryTypeId, setSelectedSurgeryTypeId] = useState<string>("");
  const [selectedStatusId, setSelectedStatusId] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>();
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [period, setPeriod] = useState<"AM" | "PM" | "">("");
  const [timeError, setTimeError] = useState("");
  const [remarks, setRemarks] = useState<string>("");
  const [surgeryCost, setSurgeryCost] = useState<string>("");

  // Initialize values on dialog open
  useEffect(() => {
    if (open) {
      if (surgery) {
        // Edit Mode: Prepopulate from surgery
        if (surgery.doctor_id !== undefined && surgery.doctor_id !== null) {
          setSelectedDoctorId(String(surgery.doctor_id));
        } else if (surgery.doctor_name && doctorsList.length > 0) {
          const docMatch = doctorsList.find((d: any) => {
            const docFullName = `${d.first_name || ""} ${d.last_name || ""}`.trim().toLowerCase();
            return (
              docFullName.includes(surgery.doctor_name!.toLowerCase()) ||
              surgery.doctor_name!.toLowerCase().includes(docFullName)
            );
          });
          setSelectedDoctorId(docMatch ? String(docMatch.id) : String(doctorsList[0]?.id || ""));
        } else {
          setSelectedDoctorId("");
        }

        if (surgery.surgery_type_id !== undefined && surgery.surgery_type_id !== null) {
          setSelectedSurgeryTypeId(String(surgery.surgery_type_id));
        } else if (surgeryTypes.length > 0) {
          setSelectedSurgeryTypeId(String(surgeryTypes[0].id));
        } else {
          setSelectedSurgeryTypeId("");
        }

        if (surgery.surgery_status_id !== undefined && surgery.surgery_status_id !== null) {
          setSelectedStatusId(String(surgery.surgery_status_id));
        } else if (surgeryStatuses.length > 0) {
          setSelectedStatusId(String(surgeryStatuses[0].id));
        } else {
          setSelectedStatusId("");
        }

        setRemarks(surgery.surgery_remarks || "");
        setSurgeryCost(
          surgery.surgery_cost !== undefined && surgery.surgery_cost !== null
            ? String(surgery.surgery_cost)
            : ""
        );
        setTimeError("");

        if (surgery.surgery_date_time) {
          try {
            const validStr = surgery.surgery_date_time.replace(/Z/g, "").split("+")[0].replace(" ", "T");
            const d = new Date(validStr);
            if (!isNaN(d.getTime())) {
              setDate(d);
              let h = d.getHours();
              const p = h >= 12 ? "PM" : "AM";
              h = h % 12;
              h = h ? h : 12;
              setHour(String(h).padStart(2, "0"));
              setMinute(String(d.getMinutes()).padStart(2, "0"));
              setPeriod(p);
            }
          } catch (e) {
            console.error("Error parsing surgery date:", e);
          }
        }
      } else {
        // Create Mode: Default to tomorrow 09:00 AM
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setDate(tomorrow);
        setHour("09");
        setMinute("00");
        setPeriod("AM");
        setTimeError("");

        // Default Doctor
        if (lead?.doctor_name && doctorsList.length > 0) {
          const docMatch = doctorsList.find((d: any) => {
            const docFullName = `${d.first_name || ""} ${d.last_name || ""}`.trim().toLowerCase();
            return (
              docFullName.includes(lead.doctor_name!.toLowerCase()) ||
              lead.doctor_name!.toLowerCase().includes(docFullName)
            );
          });
          if (docMatch) {
            setSelectedDoctorId(String(docMatch.id));
          } else {
            setSelectedDoctorId(String(doctorsList[0]?.id || ""));
          }
        } else if (doctorsList.length > 0) {
          setSelectedDoctorId(String(doctorsList[0]?.id || ""));
        } else {
          setSelectedDoctorId("");
        }

        // Default Surgery Type
        if (surgeryTypes.length > 0) {
          setSelectedSurgeryTypeId(String(surgeryTypes[0].id));
        } else {
          setSelectedSurgeryTypeId("");
        }

        // Default Surgery Status
        if (surgeryStatuses.length > 0) {
          const defaultStatus =
            surgeryStatuses.find((s: any) =>
              (s.code || s.description || "").toUpperCase().includes("SCHD") ||
              (s.description || "").toUpperCase().includes("SCHEDULE")
            ) || surgeryStatuses[0];
          setSelectedStatusId(String(defaultStatus.id));
        } else {
          setSelectedStatusId("");
        }

        setRemarks("");
        setSurgeryCost("");
      }
    }
  }, [open, surgery, lead, doctorsList, surgeryTypes, surgeryStatuses]);

  // Form Submit Handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!surgery && !lead?.uuid) {
      toast.error("Invalid lead record. Please try again.");
      return;
    }

    if (!selectedDoctorId) {
      toast.error("Please select a doctor");
      return;
    }

    if (!selectedSurgeryTypeId) {
      toast.error("Please select a surgery type");
      return;
    }

    if (!date || !hour || !minute || !period) {
      toast.error("Please select both surgery date and time");
      return;
    }

    let hrs = parseInt(hour);
    if (period === "PM" && hrs !== 12) hrs += 12;
    if (period === "AM" && hrs === 12) hrs = 0;

    const now = new Date();
    const selectedDateTime = new Date(date);
    selectedDateTime.setHours(hrs);
    selectedDateTime.setMinutes(parseInt(minute));
    selectedDateTime.setSeconds(0);

    if (!surgery && selectedDateTime < now) {
      toast.error("Cannot schedule surgery in the past");
      return;
    }

    if (!surgeryCost || isNaN(Number(surgeryCost)) || Number(surgeryCost) < 0) {
      toast.error("Please enter a valid surgery cost");
      return;
    }

    const pad = (n: number) => String(n).padStart(2, "0");
    const formattedDateTime = `${selectedDateTime.getFullYear()}-${pad(
      selectedDateTime.getMonth() + 1
    )}-${pad(selectedDateTime.getDate())} ${pad(selectedDateTime.getHours())}:${pad(
      selectedDateTime.getMinutes()
    )}:${pad(selectedDateTime.getSeconds())}`;

    if (surgery) {
      const payload = {
        surgery_id: Number(surgery.surgery_id || surgery.id),
        doctor_id: Number(selectedDoctorId),
        surgery_type_id: Number(selectedSurgeryTypeId),
        surgery_date_time: formattedDateTime,
        surgery_status_id: Number(selectedStatusId || 1),
        surgery_remarks: remarks.trim(),
        surgery_cost: Number(surgeryCost),
        is_active: surgery.is_active ?? 1,
      };

      console.log("=== [API] updateSurgery Payload ===", payload);

      try {
        const res = await updateSurgery(payload).unwrap();
        toast.success(res?.message || "Surgery updated successfully!");
        handleClose();
        if (onSuccess) onSuccess();
      } catch (err: any) {
        console.error("Failed to update surgery:", err);
        toast.error(err?.data?.message || err?.message || "Failed to update surgery");
      }
    } else {
      const payload = {
        lead_uuid: lead!.uuid,
        doctor_id: Number(selectedDoctorId),
        surgery_type_id: Number(selectedSurgeryTypeId),
        surgery_date_time: selectedDateTime.toISOString(),
        surgery_status_id: Number(selectedStatusId || 1),
        surgery_remarks: remarks.trim(),
        surgery_cost: Number(surgeryCost),
      };

      console.log("=== [API] createSurgery Payload ===", payload);

      try {
        const res = await createSurgery(payload).unwrap();
        toast.success(res?.message || "Surgery scheduled successfully!");
        handleClose();
        if (onSuccess) onSuccess();
      } catch (err: any) {
        console.error("Failed to schedule surgery:", err);
        toast.error(err?.data?.message || err?.message || "Failed to schedule surgery");
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-lg rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col max-h-[90vh] relative overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Activity className="h-5 w-5 text-[#063669] dark:text-blue-400" />
              {surgery ? "Edit Surgery" : "Schedule Surgery"}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              {surgery
                ? `Update surgery details for ${lead?.first_name || ""} ${lead?.last_name || ""}`.trim()
                : lead
                ? `Schedule a surgery for ${lead.first_name || ""} ${lead.last_name || ""}`.trim()
                : "Schedule a surgery for a lead"}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-4">
          <form
            id="schedule-surgery-form"
            onSubmit={handleFormSubmit}
            className="space-y-4 text-sm"
          >
            {/* Read-only / Derived Lead Details Badge Card */}
            {lead && (
              <div className="p-3 rounded-2xl bg-blue-50/40 dark:bg-zinc-900/50 border border-blue-100 dark:border-zinc-800 flex flex-wrap items-center gap-3 text-xs">
                {locationObj && (
                  <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-300 font-medium">
                    <MapPin className="h-3.5 w-3.5 text-[#063669] dark:text-blue-400" />
                    <span>Location: <strong>{locationObj.description}</strong></span>
                  </span>
                )}
                {branchObj && (
                  <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-300 font-medium">
                    <Building className="h-3.5 w-3.5 text-[#063669] dark:text-blue-400" />
                    <span>Branch: <strong>{branchObj.description}</strong></span>
                  </span>
                )}
                {specObj && (
                  <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-300 font-medium">
                    <Sparkles className="h-3.5 w-3.5 text-[#063669] dark:text-blue-400" />
                    <span>Dept: <strong>{specObj.description}</strong></span>
                  </span>
                )}
              </div>
            )}

            {/* Doctor Selection */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Stethoscope className="h-3.5 w-3.5 text-[#063669] dark:text-blue-400" />
                  Select Doctor <span className="text-red-500">*</span>
                </span>
                {isLoadingDoctors && (
                  <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" /> Loading doctors...
                  </span>
                )}
              </Label>
              <Select
                key={`doctor-${selectedDoctorId}-${doctorsList.length}`}
                value={selectedDoctorId}
                onValueChange={setSelectedDoctorId}
                disabled={isSubmitting || isLoadingDoctors}
              >
                <SelectTrigger className="rounded-xl h-11 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium">
                  <SelectValue
                    placeholder={
                      isLoadingDoctors
                        ? "Loading available doctors..."
                        : doctorsList.length === 0
                        ? "No doctors found"
                        : "-- Select Doctor * --"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-900 text-black dark:text-white z-[99999] max-h-60">
                  {doctorsList.map((doc: any) => {
                    const specTitle =
                      masterData?.specialisations?.find((s: any) => s.id === doc.specialization_id)
                        ?.description || "";
                    const nameStr = doc.first_name?.startsWith("Dr.")
                      ? `${doc.first_name} ${doc.last_name || ""}`.trim()
                      : `Dr. ${doc.first_name || ""} ${doc.last_name || ""}`.trim();
                    return (
                      <SelectItem
                        key={doc.id}
                        value={String(doc.id)}
                        className="text-black dark:text-white cursor-pointer py-2"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold text-xs">{nameStr}</span>
                          {(doc.education || specTitle) && (
                            <span className="text-[10px] text-zinc-400">
                              {[doc.education, specTitle].filter(Boolean).join(" • ")}
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Surgery Type Selection */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5 text-[#063669] dark:text-blue-400" />
                  Surgery Type <span className="text-red-500">*</span>
                </span>
                {isLoadingMasterData && (
                  <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" /> Loading types...
                  </span>
                )}
              </Label>
              <Select
                key={`type-${selectedSurgeryTypeId}-${surgeryTypes.length}`}
                value={selectedSurgeryTypeId}
                onValueChange={setSelectedSurgeryTypeId}
                disabled={isSubmitting || isLoadingMasterData}
              >
                <SelectTrigger className="rounded-xl h-11 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium">
                  <SelectValue
                    placeholder={
                      isLoadingMasterData
                        ? "Loading surgery types..."
                        : surgeryTypes.length === 0
                        ? "No surgery types found"
                        : "-- Select Surgery Type * --"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-900 text-black dark:text-white z-[99999] max-h-60">
                  {surgeryTypes.map((st: any) => (
                    <SelectItem
                      key={st.id}
                      value={String(st.id)}
                      className="text-black dark:text-white cursor-pointer text-xs py-2"
                    >
                      {st.description || st.name || st.code || `Type ${st.id}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date & Time Picker */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Date Picker */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Surgery Date <span className="text-red-500">*</span>
                </Label>
                <DatePicker
                  value={date}
                  onChange={(val, d) => {
                    setDate(d);
                    setTimeError("");
                  }}
                  disablePastDates={!surgery}
                  placeholder="Select surgery date"
                />
              </div>

              {/* Time Picker */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Surgery Time <span className="text-red-500">*</span>
                </Label>
                <TimePicker
                  value={hour && minute && period ? `${hour}:${minute} ${period}` : ""}
                  outputFormat="12h"
                  placeholder="Select surgery time"
                  onChange={(val) => {
                    if (!val) {
                      setHour("");
                      setMinute("");
                      setPeriod("");
                      return;
                    }
                    const parts = val.split(" ");
                    const timeParts = parts[0]?.split(":") || [];
                    const h = timeParts[0] || "";
                    const m = timeParts[1] || "";
                    const p = (parts[1]?.toUpperCase() as "AM" | "PM") || "AM";
                    setHour(h);
                    setMinute(m);
                    setPeriod(p);
                    setTimeError("");
                  }}
                />
              </div>
            </div>

            {/* Surgery Status */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <UserCheck className="h-3.5 w-3.5 text-[#063669] dark:text-blue-400" />
                  Surgery Status <span className="text-red-500">*</span>
                </span>
                {isLoadingMasterData && (
                  <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" /> Loading statuses...
                  </span>
                )}
              </Label>
              <Select
                key={`status-${selectedStatusId}-${surgeryStatuses.length}`}
                value={selectedStatusId}
                onValueChange={setSelectedStatusId}
                disabled={isSubmitting || isLoadingMasterData}
              >
                <SelectTrigger className="rounded-xl h-11 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium">
                  <SelectValue
                    placeholder={
                      isLoadingMasterData
                        ? "Loading statuses..."
                        : surgeryStatuses.length === 0
                        ? "No surgery statuses found"
                        : "Select Status"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-900 text-black dark:text-white z-[99999] max-h-60">
                  {surgeryStatuses.map((st: any) => (
                    <SelectItem
                      key={st.id}
                      value={String(st.id)}
                      className="text-black dark:text-white cursor-pointer text-xs py-2"
                    >
                      {st.description || st.name || st.code || `Status ${st.id}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Surgery Cost */}
            <div className="space-y-1.5">
              <Label htmlFor="surgery_cost" className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <IndianRupee className="h-3.5 w-3.5 text-[#063669] dark:text-blue-400" />
                  Surgery Cost <span className="text-red-500">*</span>
                </span>
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <span className="text-xs font-bold">₹</span>
                </div>
                <input
                  id="surgery_cost"
                  type="number"
                  min="0"
                  step="any"
                  placeholder="Enter surgery cost (e.g. 50000)"
                  disabled={isSubmitting}
                  value={surgeryCost}
                  onChange={(e) => setSurgeryCost(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-8 pr-3 h-11 text-xs font-medium focus:ring-1 focus:ring-[#063669] outline-none transition-all placeholder:text-zinc-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  required
                />
              </div>
            </div>

            {/* Surgery Remarks */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="surgery_remarks" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Surgery Remarks
                </Label>
                <span className="text-[10px] text-zinc-400 font-bold">
                  {remarks.length}/500
                </span>
              </div>
              <textarea
                id="surgery_remarks"
                maxLength={500}
                placeholder="Enter surgery remarks (up to 500 characters)..."
                disabled={isSubmitting}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs font-medium focus:ring-1 focus:ring-[#063669] outline-none transition-all resize-none placeholder:text-zinc-400"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-end gap-2.5">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-xl text-xs font-bold h-10 px-5"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="schedule-surgery-form"
            disabled={isSubmitting}
            className="rounded-xl text-xs font-bold bg-[#063669] hover:bg-[#063669]/90 text-white h-10 px-6 gap-2"
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {surgery ? "Update Surgery" : "Schedule Surgery"}
          </Button>
        </div>
      </div>
    </div>
  );
};
