import React, { useState, useMemo, useEffect } from "react";
import {
  Loader2,
  CalendarIcon,
  Clock,
  Building,
  MapPin,
  Stethoscope,
  Sparkles,
  Activity,
  UserCheck,
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
import { useCreateSurgeryMutation } from "../api/leadsApi";
import type { Lead } from "../types";
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
  onSuccess?: () => void;
}

export const ScheduleSurgeryDialog: React.FC<ScheduleSurgeryDialogProps> = ({
  open,
  onOpenChange,
  onClose,
  lead,
  onSuccess,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isTimePopoverOpen, setIsTimePopoverOpen] = useState(false);

  // Master Data
  const { data: masterData, isLoading: isLoadingMasterData } = useGetAllMasterDataQuery();

  // Doctors list (fetch all doctors without filter as required)
  const { data: doctorsResp, isLoading: isLoadingDoctors } = useGetAllDoctorsQuery({});
  const [createSurgery, { isLoading: isSubmitting }] = useCreateSurgeryMutation();

  const handleClose = () => {
    if (onOpenChange) onOpenChange(false);
    if (onClose) onClose();
  };

  // Doctors list normalization
  const doctorsList = useMemo(() => {
    if (!doctorsResp) return [];
    if (Array.isArray(doctorsResp)) return doctorsResp;
    if (Array.isArray(doctorsResp.data)) return doctorsResp.data;
    if (Array.isArray(doctorsResp.doctors)) return doctorsResp.doctors;
    return [];
  }, [doctorsResp]);

  // Surgery Types from Master Data
  const surgeryTypes = useMemo(() => {
    const list =
      masterData?.surgery_types ||
      (masterData as any)?.surgery_type ||
      [];
    return Array.isArray(list) ? list : [];
  }, [masterData]);

  // Surgery Statuses from Master Data
  const surgeryStatuses = useMemo(() => {
    const list =
      masterData?.surgery_statuses ||
      (masterData as any)?.surgery_status ||
      [];
    return Array.isArray(list) ? list : [];
  }, [masterData]);

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

  // Derived location / branch / specialization details for badge card
  const derivedBranchId = useMemo(() => {
    const bId = (lead as any)?.branch_id || (lead as any)?.location_id;
    if (bId && !isNaN(Number(bId)) && Number(bId) > 0) return Number(bId);

    const bName =
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
  }, [lead, masterData?.branches]);

  const derivedSpecId = useMemo(() => {
    const dept =
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
  }, [lead, masterData?.specialisations]);

  const branchObj = masterData?.branches?.find((b: any) => b.id === derivedBranchId);
  const locationObj = masterData?.locations?.find((l: any) => l.id === (branchObj?.location_id || lead?.location_id));
  const specObj = masterData?.specialisations?.find((s: any) => s.id === derivedSpecId);

  // Initialize values on dialog open
  useEffect(() => {
    if (open) {
      // Default to tomorrow 09:00 AM
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
    }
  }, [open, lead, doctorsList, surgeryTypes, surgeryStatuses]);

  // Form Submit Handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!lead?.uuid) {
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

    if (selectedDateTime < now) {
      toast.error("Cannot schedule surgery in the past");
      return;
    }

    const payload = {
      lead_uuid: lead.uuid,
      doctor_id: Number(selectedDoctorId),
      surgery_type_id: Number(selectedSurgeryTypeId),
      surgery_date_time: selectedDateTime.toISOString(),
      surgery_status_id: Number(selectedStatusId || 1),
      surgery_remarks: remarks.trim(),
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
              Schedule Surgery
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              {lead
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
                      {st.description || st.code || `Type ${st.id}`}
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
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start text-left font-medium h-11 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs shadow-none hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-60" />
                      {date ? format(date, "PPP") : "Select surgery date"}
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
                        setIsPopoverOpen(false);
                      }}
                      disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Picker */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Surgery Time <span className="text-red-500">*</span>
                </Label>
                <Popover open={isTimePopoverOpen} onOpenChange={setIsTimePopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start text-left font-medium h-11 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs shadow-none hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    >
                      <Clock className="mr-2 h-4 w-4 opacity-60" />
                      {hour && minute && period ? `${hour}:${minute} ${period}` : "Select surgery time"}
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
                              setTimeError("Please select a date first");
                              toast.error("Please select a date first");
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

                            if (selectedDateTime < new Date()) {
                              setTimeError("Cannot select a time in the past");
                              toast.error("Cannot select a time in the past");
                              return;
                            }

                            setTimeError("");
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
                      {st.description || st.code || `Status ${st.id}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            Schedule Surgery
          </Button>
        </div>
      </div>
    </div>
  );
};
