import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CalendarIcon, Check, X, Clock } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Calendar } from "../../../components/ui/calendar";
import { useGetReporteesQuery } from "../../users/api/usersApi";
import { usePermissions } from "../../../hooks/usePermissions";
import { cn } from "../../../utils";
import { useMasterDataLookup } from "../../../shared/hooks/useMasterDataLookup";

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

import type { Lead, ScheduleVisitRequest } from "../types";
import { useGetLeadsQuery } from "../api/leadsApi";

const scheduleVisitSchema = z.object({
  visit_date_time: z.string().min(1, "Date and time are required"),
  visit_location_url: z.string().url("Must be a valid URL"),
  visit_status: z.number({ error: "Status is required" }).min(1, "Status is required"),
  visit_assigned_to_rm: z.number({ error: "RM assignment is required" }).min(1, "RM assignment is required"),
  visit_assigned_to_em: z.number({ error: "Invalid EM selection" }).optional().nullable(),
  visit_remarks: z.string().optional(),
});

type ScheduleVisitFormValues = z.infer<typeof scheduleVisitSchema>;

interface ScheduleVisitDialogProps {
  open: boolean;
  onClose: () => void;
  lead: Lead | null;
  siteVisitStatuses: { id: number; description: string }[];
  rms: { id: number; first_name: string; last_name: string }[];
  // ems is unused now as we fetch reportees directly
  onSubmit: (data: ScheduleVisitRequest) => Promise<void>;
  isLoading: boolean;
}

export const ScheduleVisitDialog = ({
  open,
  onClose,
  lead,
  siteVisitStatuses,
  rms,
  onSubmit,
  isLoading,
}: ScheduleVisitDialogProps) => {
  const { user: currentUser, roleCode } = usePermissions();
  const isRM = roleCode === "RELMNG";
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isTimePopoverOpen, setIsTimePopoverOpen] = useState(false);
  const { getRmLabel, getEmLabel } = useMasterDataLookup();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ScheduleVisitFormValues>({
    resolver: zodResolver(scheduleVisitSchema),
    defaultValues: {
      visit_date_time: "",
      visit_location_url: "",
      visit_status: undefined,
      visit_assigned_to_rm: undefined,
      visit_assigned_to_em: undefined,
      visit_remarks: "",
    },
  });

  const watchStatus = useWatch({ control, name: "visit_status" });
  const watchRm = useWatch({ control, name: "visit_assigned_to_rm" });
  const watchEm = useWatch({ control, name: "visit_assigned_to_em" });

  const [date, setDate] = useState<Date | undefined>();
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [period, setPeriod] = useState<"AM" | "PM" | "">("");
  const [timeError, setTimeError] = useState("");

  const convertTo12Hour = (dateTime: string) => {
    if (!dateTime) return "";

    const date = new Date(dateTime);
    let hours = date.getHours();
    const minutes = date.getMinutes();

    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours}:${String(minutes).padStart(2, "0")} ${period}`;
  };

  const { data: reportees = [], isLoading: isLoadingReportees } =
    useGetReporteesQuery(
      { reporting_manager_id: watchRm as number, offset: 0 },
      { skip: !watchRm },
    );

  const assignees = React.useMemo(() => {
    const list: any[] = [...reportees];
    if (watchRm) {
      let rmToUse: any = null;
      const rmFromList = rms.find((r) => r.id === watchRm);
      if (rmFromList) {
        rmToUse = { ...rmFromList };
      } else if (isRM && Number(currentUser?.id) === watchRm && currentUser) {
        const parts = (currentUser.name || "").split(" ");
        rmToUse = {
          id: Number(currentUser.id),
          first_name: parts[0] || "",
          last_name: parts.slice(1).join(" ")
        };
      }

      if (rmToUse && !list.some((r) => r.id === rmToUse.id)) {
        list.unshift({
          ...rmToUse,
          last_name: `${rmToUse.last_name} (Self/RM)`.trim(),
        });
      }
    }
    if (watchEm && !list.some((r) => r.id === watchEm)) {
      const emLabel = getEmLabel(watchEm);
      if (emLabel && emLabel !== "Unknown EM") {
        const parts = emLabel.split(" ");
        list.push({
          id: watchEm,
          first_name: parts[0] || "",
          last_name: parts.slice(1).join(" "),
        });
      }
    }
    return list;
  }, [reportees, watchRm, watchEm, rms, isRM, currentUser, getEmLabel]);

  // EM selection cleanup is no longer needed as RM is read-only

  const scheduledStatus = siteVisitStatuses.find(
    (s) =>
      s.description.toUpperCase() === "SCHEDULED" ||
      (s as any).code === "SCHD",
  );
  const scheduledStatusId = scheduledStatus?.id || 1;

  useEffect(() => {
    if (open) {
      setDate(undefined);
      setHour("");
      setMinute("");
      setPeriod("");
      setTimeError("");
    }
    if (open && lead) {
      reset({
        visit_date_time: "",
        visit_location_url: "",
        visit_status: scheduledStatusId,
        visit_assigned_to_rm: isRM
          ? Number(currentUser?.id)
          : lead.assigned_to_rm || undefined,
        visit_assigned_to_em: lead.assigned_to_em || undefined,
        visit_remarks: "",
      });
    } else if (open && !lead) {
      reset({
        visit_date_time: "",
        visit_location_url: "",
        visit_status: scheduledStatusId,
        visit_assigned_to_rm: isRM ? Number(currentUser?.id) : undefined,
        visit_assigned_to_em: undefined,
        visit_remarks: "",
      });
    }
  }, [open, lead, reset, isRM, currentUser, scheduledStatusId]);

  const [selectedLeadUuid, setSelectedLeadUuid] = useState<string>("");
  const { data: leadsData, isLoading: isLoadingLeads } = useGetLeadsQuery(
    { offset: 0 },
    { skip: !!lead },
  );
  const allLeads = Array.isArray(leadsData) ? leadsData : (leadsData?.data || []);

  const handleFormSubmit = async (data: ScheduleVisitFormValues) => {
    if (!date || !hour || !minute || !period || (!lead && !selectedLeadUuid)) {
      toast.error("Please select both date and time");
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

    if (selectedDateTime < now) {
      toast.error("Cannot schedule visit in the past");
      return;
    }

    const year = selectedDateTime.getFullYear();
    const month = String(selectedDateTime.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDateTime.getDate()).padStart(2, '0');
    const h = String(selectedDateTime.getHours()).padStart(2, '0');
    const m = String(selectedDateTime.getMinutes()).padStart(2, '0');
    const s = String(selectedDateTime.getSeconds()).padStart(2, '0');
    const localFormatted = `${year}-${month}-${day} ${h}:${m}:${s}`;

    await onSubmit({
      ...data,
      visit_status: scheduledStatusId,
      visit_date_time: localFormatted,
      lead_uuid: lead ? (lead as Lead).uuid : selectedLeadUuid,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-lg rounded-3xl shadow-2xl border border-zinc-100 flex flex-col max-h-[85vh] relative overflow-hidden">
        <div className="px-6 py-4 border-b bg-zinc-50/50">
          <h2 className="text-lg font-bold">Schedule Visit</h2>
          <p className="text-sm text-zinc-500">
            {lead
              ? `Schedule a site visit for ${lead.first_name} ${lead.last_name}`
              : "Schedule a site visit for a lead"}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <form
            id="schedule-visit-form"
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-4"
          >
            <div className="space-y-2">
              {!lead && (
                <div className="space-y-2 mb-4">
                  <Label>Select Lead *</Label>
                  <Select
                    value={selectedLeadUuid}
                    onValueChange={setSelectedLeadUuid}
                    disabled={isLoadingLeads}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Search / Select a lead" />
                    </SelectTrigger>
                    <SelectContent className="bg-white text-black">
                      {allLeads.map((l: Lead) => (
                        <SelectItem
                          key={l.uuid}
                          value={l.uuid}
                          className="text-black"
                        >
                          {l.first_name} {l.last_name} ({l.lead_id})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date Picker */}
                <div className="space-y-2">
                  <Label>Visit Date *</Label>

                  <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-medium h-12 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md hover:border-zinc-300 transition-all focus-visible:ring-0 focus-visible:ring-offset-0"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />

                        {date ? format(date, "PPP") : "Select visit date"}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent
                      className="w-auto p-2 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-zinc-50 z-[9999]"
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

                            if (selectedDateTime < new Date()) {
                              setTimeError("Cannot select a time in the past");
                              toast.error("Cannot select a time in the past");
                              setHour("");
                              setMinute("");
                              setPeriod("");
                              setValue("visit_date_time", "");
                            } else {
                              setValue("visit_date_time", selectedDateTime.toISOString());
                            }
                          } else {
                            setValue("visit_date_time", "");
                          }
                          setIsPopoverOpen(false);
                        }}
                        disabled={(d) =>
                          d < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.visit_date_time && (
                    <p className="text-xs text-red-500">
                      {errors.visit_date_time.message}
                    </p>
                  )}
                </div>

                {/* Time Picker */}
                <div className="space-y-2">
                  <Label>Visit Time *</Label>
                  <Popover open={isTimePopoverOpen} onOpenChange={setIsTimePopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-medium h-12 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md hover:border-zinc-300 transition-all focus-visible:ring-0 focus-visible:ring-offset-0"
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {hour && minute && period ? `${hour}:${minute} ${period}` : "Select visit time"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      side="bottom"
                      align="start"
                      sideOffset={8}
                      collisionPadding={12}
                      className="w-[320px] p-4 bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 z-[9999] rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-xl animate-in fade-in-0 zoom-in-95 duration-100 max-h-[calc(var(--radix-popover-content-available-height)-24px)] overflow-y-auto custom-scrollbar"
                    >
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-sm">Select Time</h3>
                        </div>
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
                                    className={`w-full rounded-lg py-1.5 font-semibold text-xs transition-all focus:outline-none focus:ring-0 ${hour === val
                                        ? "bg-primary text-white shadow-sm"
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
                                    className={`w-full rounded-lg py-1.5 font-semibold text-xs transition-all focus:outline-none focus:ring-0 ${minute === val
                                        ? "bg-primary text-white shadow-sm"
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
                              {!(
                                date?.toDateString() === new Date().toDateString() &&
                                new Date().getHours() >= 12
                              ) && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setPeriod("AM");
                                      setTimeError("");
                                    }}
                                    className={`w-full rounded-xl py-2 font-semibold text-xs transition-all focus:outline-none focus:ring-0 ${period === "AM"
                                        ? "bg-primary text-white shadow-sm"
                                        : "border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                                      }`}
                                  >
                                    AM
                                  </button>
                                )}
                              <button
                                type="button"
                                onClick={() => {
                                  setPeriod("PM");
                                  setTimeError("");
                                }}
                                className={`w-full rounded-xl py-2 font-semibold text-xs transition-all focus:outline-none focus:ring-0 ${period === "PM"
                                    ? "bg-primary text-white shadow-sm"
                                    : "border border-zinc-100 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                                  }`}
                              >
                                PM
                              </button>
                            </div>
                          </div>
                        </div>

                        {timeError && (
                          <p className="text-xs text-red-500 font-medium px-1">
                            {timeError}
                          </p>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                          <div>
                            <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Selected Time</p>
                            <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                              {hour && minute && period ? `${hour}:${minute} ${period}` : "--:-- --"}
                            </p>
                          </div>
                          <Button
                            type="button"
                            className="px-5 rounded-xl h-9 text-xs font-bold shadow-md"
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

                              if (selectedDateTime < new Date()) {
                                setTimeError("Cannot select a time in the past");
                                toast.error("Cannot select a time in the past");
                                return;
                              }

                              setTimeError("");
                              setValue("visit_date_time", selectedDateTime.toISOString());
                              setIsTimePopoverOpen(false);
                            }}
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <p className="text-xs text-zinc-500">
                    Past time slots are automatically restricted
                  </p>
                  {timeError && (
                    <p className="text-xs text-red-500 font-medium">
                      {timeError}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visit_location_url">Location URL *</Label>
              <Input
                id="visit_location_url"
                type="url"
                placeholder="https://maps.google.com/..."
                disabled={isLoading}
                {...register("visit_location_url")}
                className={cn(
                  "rounded-2xl h-12",
                  errors.visit_location_url ? "border-red-500" : ""
                )}
              />
              {errors.visit_location_url && (
                <p className="text-xs text-red-500">
                  {errors.visit_location_url.message}
                </p>
              )}
            </div>

            {/* Hidden Status - forced to 'SCHD' */}
            <input type="hidden" {...register("visit_status")} />

            <div
              className={cn("grid gap-4", isRM ? "grid-cols-1" : "grid-cols-2")}
            >
              {!isRM && (
                <div className="space-y-2">
                  <Label>Assigned RM *</Label>
                  {lead?.assigned_to_rm ? (
                    <Input
                      value={getRmLabel(watchRm)}
                      readOnly
                      disabled={isLoading}
                      className="bg-zinc-50 dark:bg-zinc-900 cursor-not-allowed font-medium rounded-2xl h-12"
                    />
                  ) : (
                    <Select
                      value={watchRm?.toString()}
                      onValueChange={(val) =>
                        setValue("visit_assigned_to_rm", Number(val))
                      }
                      disabled={isLoading}
                    >
                      <SelectTrigger className="rounded-2xl h-12 border-zinc-200 bg-white shadow-sm hover:shadow-md transition-all">
                        <SelectValue placeholder="Select RM" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-black">
                        {rms.map((rm) => (
                          <SelectItem
                            key={rm.id}
                            value={rm.id.toString()}
                            className="text-black"
                          >
                            {rm.first_name} {rm.last_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {errors.visit_assigned_to_rm && (
                    <p className="text-xs text-red-500">
                      {errors.visit_assigned_to_rm.message}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label>Assigned EM</Label>
                <Select
                  value={watchEm ? watchEm.toString() : ""}
                  onValueChange={(val) =>
                    setValue("visit_assigned_to_em", val ? Number(val) : undefined)
                  }
                  disabled={isLoading || !watchRm || isLoadingReportees}
                >
                  <SelectTrigger className="rounded-2xl h-12 border-zinc-200 bg-white shadow-sm hover:shadow-md transition-all">
                    <SelectValue placeholder={!watchRm ? "Select RM first" : "Select EM or Self"} />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-black">
                    {assignees.map((em: any) => (
                      <SelectItem
                        key={em.id}
                        value={em.id.toString()}
                        className="text-black"
                      >
                        {em.first_name} {em.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.visit_assigned_to_em && (
                  <p className="text-xs text-red-500">
                    {errors.visit_assigned_to_em.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="visit_remarks">Remarks</Label>
              <textarea
                id="visit_remarks"
                placeholder="Any additional notes..."
                disabled={isLoading}
                {...register("visit_remarks")}
                className="flex w-full rounded-2xl border border-zinc-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 min-h-[100px] resize-none"
              />
            </div>
          </form>
        </div>

        <div className="px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex flex-col gap-3 rounded-b-3xl shrink-0">
          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="schedule-visit-form"
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              Schedule Visit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
