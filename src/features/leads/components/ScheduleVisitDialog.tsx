import React, { useEffect, useState, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Loader2,
  CalendarIcon,
  Clock,
  Building,
  MapPin,
  Stethoscope,
  User,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Calendar } from "../../../components/ui/calendar";
import { useGetAllMasterDataQuery } from "../../master/api/masterApi";
import { useGetAllDoctorsQuery } from "../../doctors/api/doctorsApiSlice";
import type { ApiDoctor } from "../../doctors/types";
import { cn } from "../../../utils";

import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import type { Lead } from "../types";
import { useGetLeadsQuery } from "../api/leadsApi";

const scheduleVisitSchema = z.object({
  doctor_id: z.number({ error: "Please select a doctor" }).min(1, "Please select a doctor"),
  visit_date_time: z.string().min(1, "Visit date and time are required"),
  visit_status: z.number().optional(),
  visit_remarks: z
    .string()
    .max(500, "Remarks cannot exceed 500 characters")
    .optional()
    .or(z.literal("")),
});

type ScheduleVisitFormValues = z.infer<typeof scheduleVisitSchema>;

interface ScheduleVisitDialogProps {
  open: boolean;
  onClose: () => void;
  lead: Lead | null;
  siteVisitStatuses?: { id: number; description: string }[];
  rms?: { id: number; first_name: string; last_name: string }[];
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
  dialogType?: "Appointment" | "Surgery";
  appointment?: any;
}

const DEFAULT_APPOINTMENT_STATUSES = [
  { id: 1, code: "OPDBKD", description: "OPD Booked" },
  { id: 2, code: "OPDCMP", description: "OPD Completed" },
  { id: 3, code: "NOTVIS", description: "Not Visited" },
  { id: 4, code: "CANCEL", description: "Appointment Cancelled" },
  { id: 5, code: "RESCHD", description: "Appointment Rescheduled" },
];

export const ScheduleVisitDialog = ({
  open,
  onClose,
  lead,
  siteVisitStatuses = [],
  onSubmit,
  isLoading,
  dialogType = "Appointment",
  appointment = null,
}: ScheduleVisitDialogProps) => {
  const isEdit = !!appointment;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isTimePopoverOpen, setIsTimePopoverOpen] = useState(false);
  const { data: masterData } = useGetAllMasterDataQuery();

  const [selectedLeadUuid, setSelectedLeadUuid] = useState<string>("");
  const { data: leadsData, isLoading: isLoadingLeads } = useGetLeadsQuery(
    { offset: 0 },
    { skip: !!lead }
  );
  const allLeads = Array.isArray(leadsData) ? leadsData : leadsData?.data || [];

  const effectiveLead = useMemo(() => {
    if (lead) return lead;
    if (selectedLeadUuid) {
      return allLeads.find((l: Lead) => l.uuid === selectedLeadUuid) || null;
    }
    return null;
  }, [lead, selectedLeadUuid, allLeads]);

  // Derive Location & Branch IDs from Lead
  const derivedBranchId = useMemo(() => {
    if (appointment?.location_id || appointment?.branch_id) {
      return Number(appointment.location_id || appointment.branch_id);
    }
    const bId = (effectiveLead as any)?.branch_id || (effectiveLead as any)?.location_id;
    if (bId && !isNaN(Number(bId)) && Number(bId) > 0) return Number(bId);

    const bName =
      (effectiveLead as any)?.hospital_branch ||
      (effectiveLead as any)?.branch ||
      (effectiveLead as any)?.branch_name;
    if (bName && masterData?.branches) {
      const found = masterData.branches.find(
        (b: any) =>
          b.description?.toLowerCase() === String(bName).toLowerCase() ||
          b.code?.toLowerCase() === String(bName).toLowerCase()
      );
      if (found) return found.id;
    }
    return null;
  }, [effectiveLead, masterData?.branches, appointment]);

  // Derive Specialisation ID from Lead
  const derivedSpecId = useMemo(() => {
    if (appointment?.specialisation_id || appointment?.specialization_id) {
      return Number(appointment.specialisation_id || appointment.specialization_id);
    }
    const dept =
      (effectiveLead as any)?.specialisation_id ||
      (effectiveLead as any)?.specialization_id ||
      (effectiveLead as any)?.department ||
      (effectiveLead as any)?.specialization ||
      "";
    if (!dept) return 0;
    if (!isNaN(Number(dept)) && Number(dept) > 0) return Number(dept);

    const found = masterData?.specialisations?.find(
      (s: any) =>
        s.description?.toLowerCase() === String(dept).toLowerCase() ||
        s.code?.toLowerCase() === String(dept).toLowerCase()
    );
    return found ? found.id : 0;
  }, [effectiveLead, masterData?.specialisations, appointment]);

  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);

  // Synchronize branch and location
  useEffect(() => {
    if (derivedBranchId) {
      setSelectedBranchId(derivedBranchId);
      const foundBranch = masterData?.branches?.find((b: any) => b.id === derivedBranchId);
      if (foundBranch) {
        setSelectedLocationId(foundBranch.location_id);
      }
    } else if (effectiveLead?.location_id) {
      setSelectedLocationId(effectiveLead.location_id);
    }
  }, [derivedBranchId, effectiveLead, masterData?.branches]);

  // Fetch doctors dynamically based on branch_id and specialization_id
  const { data: doctorsResp, isLoading: isLoadingDoctors } = useGetAllDoctorsQuery({
    branch_id: selectedBranchId ? Number(selectedBranchId) : 0,
    specialization_id: derivedSpecId ? Number(derivedSpecId) : 0,
  });

  const doctorsList: ApiDoctor[] = useMemo(() => {
    return doctorsResp?.data || [];
  }, [doctorsResp]);

  const statuses =
    masterData?.appointment_status && masterData.appointment_status.length > 0
      ? masterData.appointment_status
      : (masterData as any)?.appointment_statuses &&
        (masterData as any).appointment_statuses.length > 0
      ? (masterData as any).appointment_statuses
      : siteVisitStatuses.length > 0
      ? siteVisitStatuses
      : DEFAULT_APPOINTMENT_STATUSES;

  const defaultStatus = statuses.find(
    (s: any) =>
      s.code === "OPDBKD" ||
      s.description?.toUpperCase()?.includes("BOOKED") ||
      s.description?.toUpperCase()?.includes("SCHEDULED") ||
      s.code === "SCHD"
  );
  const defaultStatusId = defaultStatus?.id || 1;

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ScheduleVisitFormValues>({
    resolver: zodResolver(scheduleVisitSchema),
    defaultValues: {
      doctor_id: appointment?.doctor_id || undefined,
      visit_date_time: appointment?.visit_date_time || "",
      visit_status: appointment?.appointment_status_id || appointment?.visit_status || defaultStatusId,
      visit_remarks: appointment?.visit_remarks || "",
    },
  });

  const watchDoctorId = useWatch({ control, name: "doctor_id" });
  const watchRemarks = useWatch({ control, name: "visit_remarks" });
  const watchStatus = useWatch({ control, name: "visit_status" });

  const [date, setDate] = useState<Date | undefined>();
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [period, setPeriod] = useState<"AM" | "PM" | "">("");
  const [timeError, setTimeError] = useState("");

  useEffect(() => {
    if (open) {
      if (appointment) {
        if (appointment.visit_date_time) {
          try {
            const validStr = appointment.visit_date_time
              .replace(/Z/g, "")
              .split("+")[0]
              .replace(" ", "T");
            const d = new Date(validStr);
            if (!isNaN(d.getTime())) {
              setDate(d);
              let h = d.getHours();
              const m = String(d.getMinutes()).padStart(2, "0");
              const p = h >= 12 ? "PM" : "AM";
              h = h % 12 || 12;
              setHour(String(h).padStart(2, "0"));
              setMinute(m);
              setPeriod(p);
            }
          } catch {
            // fallback
          }
        }

        reset({
          doctor_id: appointment.doctor_id || undefined,
          visit_date_time: appointment.visit_date_time || "",
          visit_status:
            appointment.appointment_status_id ||
            appointment.visit_status ||
            defaultStatusId,
          visit_remarks: appointment.visit_remarks || "",
        });
      } else {
        setDate(undefined);
        setHour("");
        setMinute("");
        setPeriod("");
        setTimeError("");

        reset({
          doctor_id: undefined,
          visit_date_time: "",
          visit_status: defaultStatusId,
          visit_remarks: "",
        });
      }
    }
  }, [open, appointment, reset, defaultStatusId]);

  const handleFormSubmit = async (data: ScheduleVisitFormValues) => {
    if (!data.doctor_id) {
      toast.error("Please select a doctor");
      return;
    }

    if (!date || !hour || !minute || !period || (!effectiveLead && !selectedLeadUuid)) {
      toast.error("Please select both visit date and time");
      return;
    }

    let hrs = parseInt(hour);
    if (period === "PM" && hrs !== 12) hrs += 12;
    if (period === "AM" && hrs === 12) hrs = 0;

    const now = new Date();
    const selectedDateTime = new Date(date!);
    selectedDateTime.setHours(hrs);
    selectedDateTime.setMinutes(parseInt(minute));
    selectedDateTime.setSeconds(0);

    if (!isEdit && selectedDateTime < now) {
      toast.error("Cannot schedule visit in the past");
      return;
    }

    const finalRemarks =
      dialogType === "Surgery"
        ? data.visit_remarks
          ? data.visit_remarks.includes("[Surgery]")
            ? data.visit_remarks
            : `[Surgery] ${data.visit_remarks}`
          : "[Surgery]"
        : data.visit_remarks || "";

    const payload: any = {
      lead_uuid: effectiveLead ? effectiveLead.uuid : selectedLeadUuid,
      doctor_id: Number(data.doctor_id),
      visit_date_time: selectedDateTime.toISOString(),
      visit_remarks: finalRemarks,
      location_id: selectedBranchId ? Number(selectedBranchId) : undefined,
      visit_status: Number(data.visit_status || defaultStatusId),
      appointments_status_id: Number(data.visit_status || defaultStatusId),
    };

    if (appointment?.appointment_id || appointment?.id) {
      payload.id = appointment.appointment_id || appointment.id;
      payload.is_active = appointment.is_active ?? 1;
    }

    await onSubmit(payload);
  };

  const branchObj = masterData?.branches?.find((b: any) => b.id === selectedBranchId);
  const locationObj = masterData?.locations?.find((l: any) => l.id === (branchObj?.location_id || selectedLocationId));
  const specObj = masterData?.specialisations?.find((s: any) => s.id === derivedSpecId);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-lg rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col max-h-[90vh] relative overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-[#063669] dark:text-blue-400" />
              {isEdit
                ? "Edit Appointment"
                : dialogType === "Surgery"
                ? "Schedule Surgery"
                : "Schedule Appointment"}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              {effectiveLead
                ? `${isEdit ? "Update appointment details" : "Schedule an appointment"} for ${
                    effectiveLead.first_name || ""
                  } ${effectiveLead.last_name || ""}`.trim()
                : `${isEdit ? "Update appointment details" : "Schedule an appointment"} for a lead`}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-4">
          <form
            id="schedule-visit-form"
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-4 text-sm"
          >
            {/* Select Lead if not pre-provided */}
            {!lead && (
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Select Lead <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={selectedLeadUuid}
                  onValueChange={setSelectedLeadUuid}
                  disabled={isLoadingLeads}
                >
                  <SelectTrigger className="rounded-xl h-11 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium">
                    <SelectValue placeholder="Search / Select a lead" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-900 text-black dark:text-white z-[99999]">
                    {allLeads.map((l: Lead) => (
                      <SelectItem
                        key={l.uuid}
                        value={l.uuid}
                        className="text-black dark:text-white cursor-pointer"
                      >
                        {l.first_name} {l.last_name} ({l.lead_id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Read-only / Derived Lead Details Badge Card */}
            {effectiveLead && (
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

            {/* Doctor Selection (Filtered by branch & specialization) */}
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
                value={watchDoctorId ? String(watchDoctorId) : ""}
                onValueChange={(val) => setValue("doctor_id", Number(val), { shouldValidate: true })}
                disabled={isLoading || isLoadingDoctors}
              >
                <SelectTrigger className="rounded-xl h-11 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium">
                  <SelectValue
                    placeholder={
                      isLoadingDoctors
                        ? "Loading available doctors..."
                        : doctorsList.length === 0
                        ? "No doctors found for this branch & department"
                        : "-- Select Doctor * --"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-900 text-black dark:text-white z-[99999] max-h-60">
                  {doctorsList.map((doc) => {
                    const specTitle =
                      masterData?.specialisations?.find((s: any) => s.id === doc.specialization_id)
                        ?.description || "";
                    return (
                      <SelectItem
                        key={doc.id}
                        value={String(doc.id)}
                        className="text-black dark:text-white cursor-pointer py-2"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold text-xs">
                            Dr. {doc.first_name} {doc.last_name}
                          </span>
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
              {errors.doctor_id && (
                <p className="text-xs text-red-500">{errors.doctor_id.message}</p>
              )}
            </div>

            {/* Date & Time Picker */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Date Picker */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Visit Date <span className="text-red-500">*</span>
                </Label>
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start text-left font-medium h-11 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs shadow-none hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-60" />
                      {date ? format(date, "PPP") : "Select visit date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-2 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-zinc-50 z-[99999]"
                    collisionPadding={12}
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        setTimeError("");
                        if (selectedDate && hour && minute && period) {
                          let hrs = parseInt(hour);
                          if (period === "PM" && hrs !== 12) hrs += 12;
                          if (period === "AM" && hrs === 12) hrs = 0;

                          const selectedDateTime = new Date(selectedDate);
                          selectedDateTime.setHours(hrs);
                          selectedDateTime.setMinutes(parseInt(minute));
                          selectedDateTime.setSeconds(0);

                          if (!isEdit && selectedDateTime < new Date()) {
                            setTimeError("Cannot select a time in the past");
                            toast.error("Cannot select a time in the past");
                            setHour("");
                            setMinute("");
                            setPeriod("");
                            setValue("visit_date_time", "");
                          } else {
                            setValue("visit_date_time", selectedDateTime.toISOString(), { shouldValidate: true });
                          }
                        } else {
                          setValue("visit_date_time", "");
                        }
                        setIsPopoverOpen(false);
                      }}
                      disabled={(d) =>
                        !isEdit && d < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                    />
                  </PopoverContent>
                </Popover>
                {errors.visit_date_time && (
                  <p className="text-xs text-red-500">{errors.visit_date_time.message}</p>
                )}
              </div>

              {/* Time Picker */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Visit Time <span className="text-red-500">*</span>
                </Label>
                <Popover open={isTimePopoverOpen} onOpenChange={setIsTimePopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start text-left font-medium h-11 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs shadow-none hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    >
                      <Clock className="mr-2 h-4 w-4 opacity-60" />
                      {hour && minute && period ? `${hour}:${minute} ${period}` : "Select visit time"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    side="bottom"
                    align="start"
                    sideOffset={8}
                    collisionPadding={12}
                    className="w-[320px] p-4 bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 z-[99999] rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-2xl"
                  >
                    <div className="space-y-3">
                      <h3 className="font-bold text-xs text-zinc-700 dark:text-zinc-300">Select Time</h3>
                      <div className="grid grid-cols-3 gap-2">
                        {/* Hour */}
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Hour</p>
                          <div className="h-36 overflow-y-auto border border-zinc-100 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50 p-1 space-y-0.5 custom-scrollbar">
                            {Array.from({ length: 12 }, (_, i) => {
                              const val = String(i + 1).padStart(2, "0");
                              return (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => {
                                    setHour(val);
                                    setTimeError("");
                                  }}
                                  className={`w-full rounded-lg py-1.5 font-bold text-xs transition-all ${
                                    hour === val
                                      ? "bg-[#063669] text-white shadow-sm"
                                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                                  }`}
                                >
                                  {val}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Minute */}
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Minute</p>
                          <div className="h-36 overflow-y-auto border border-zinc-100 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50 p-1 space-y-0.5 custom-scrollbar">
                            {Array.from({ length: 60 }, (_, i) => {
                              const val = String(i).padStart(2, "0");
                              return (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => {
                                    setMinute(val);
                                    setTimeError("");
                                  }}
                                  className={`w-full rounded-lg py-1.5 font-bold text-xs transition-all ${
                                    minute === val
                                      ? "bg-[#063669] text-white shadow-sm"
                                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                                  }`}
                                >
                                  {val}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* AM PM */}
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Period</p>
                          <div className="space-y-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setPeriod("AM");
                                setTimeError("");
                              }}
                              className={`w-full rounded-xl py-2 font-bold text-xs transition-all ${
                                period === "AM"
                                  ? "bg-[#063669] text-white shadow-sm"
                                  : "border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                              }`}
                            >
                              AM
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setPeriod("PM");
                                setTimeError("");
                              }}
                              className={`w-full rounded-xl py-2 font-bold text-xs transition-all ${
                                period === "PM"
                                  ? "bg-[#063669] text-white shadow-sm"
                                  : "border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                              }`}
                            >
                              PM
                            </button>
                          </div>
                        </div>
                      </div>

                      {timeError && (
                        <p className="text-xs text-red-500 font-medium px-1">{timeError}</p>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                        <div>
                          <p className="text-[10px] uppercase font-bold text-zinc-400">Selected Time</p>
                          <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                            {hour && minute && period ? `${hour}:${minute} ${period}` : "--:-- --"}
                          </p>
                        </div>
                        <Button
                          type="button"
                          className="px-4 rounded-xl h-8 text-xs font-bold bg-[#063669] text-white"
                          onClick={() => {
                            if (!date) {
                              setTimeError("Please select a visit date first");
                              toast.error("Please select a visit date first");
                              return;
                            }
                            if (!hour || !minute || !period) {
                              setTimeError("Please select a complete time");
                              toast.error("Please select a complete time");
                              return;
                            }

                            let hrs = parseInt(hour);
                            if (period === "PM" && hrs !== 12) hrs += 12;
                            if (period === "AM" && hrs === 12) hrs = 0;

                            const selectedDateTime = new Date(date);
                            selectedDateTime.setHours(hrs);
                            selectedDateTime.setMinutes(parseInt(minute));
                            selectedDateTime.setSeconds(0);

                            if (!isEdit && selectedDateTime < new Date()) {
                              setTimeError("Cannot select a time in the past");
                              toast.error("Cannot select a time in the past");
                              return;
                            }

                            setTimeError("");
                            setValue("visit_date_time", selectedDateTime.toISOString(), { shouldValidate: true });
                            setIsTimePopoverOpen(false);
                          }}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Appointment Status (In edit mode or customizable) */}
            {isEdit && (
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Appointment Status
                </Label>
                <Select
                  value={watchStatus ? String(watchStatus) : String(defaultStatusId)}
                  onValueChange={(val) => setValue("visit_status", Number(val))}
                  disabled={isLoading}
                >
                  <SelectTrigger className="rounded-xl h-11 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-900 text-black dark:text-white z-[99999]">
                    {statuses.map((st: any) => (
                      <SelectItem key={st.id} value={String(st.id)} className="cursor-pointer">
                        {st.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Remarks with 500 characters limit */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="visit_remarks" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Visit Remarks
                </Label>
                <span className="text-[10px] text-zinc-400 font-bold">
                  {(watchRemarks || "").length}/500
                </span>
              </div>
              <textarea
                id="visit_remarks"
                maxLength={500}
                placeholder="Enter appointment remarks (up to 500 characters)..."
                disabled={isLoading}
                {...register("visit_remarks")}
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
            onClick={onClose}
            disabled={isLoading}
            className="rounded-xl text-xs font-bold h-10 px-5"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="schedule-visit-form"
            disabled={isLoading}
            className="rounded-xl text-xs font-bold bg-[#063669] hover:bg-[#063669]/90 text-white h-10 px-6 gap-2"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isEdit
              ? "Update Appointment"
              : dialogType === "Surgery"
              ? "Schedule Surgery"
              : "Schedule Appointment"}
          </Button>
        </div>
      </div>
    </div>
  );
};
