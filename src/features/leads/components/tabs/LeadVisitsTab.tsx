import React, { useState } from 'react';
import { Clock, Pencil, Building, User, FileText, Loader2, Stethoscope, Sparkles } from 'lucide-react';
import type { LeadVisit } from '../../types';
import { ScheduleVisitDialog } from '../ScheduleVisitDialog';
import { ScheduleSurgeryDialog } from '../ScheduleSurgeryDialog';
import { useGetAllUsersByRoleIdQuery } from '@/features/users/api/usersApi';
import { useMasterDataLookup } from '../../../../shared/hooks/useMasterDataLookup';
import { usePermissions } from '../../../../hooks/usePermissions';
import { useGetAllMasterDataQuery } from '@/features/master/api/masterApi';
import { useGetAllDoctorsQuery } from '@/features/doctors/api/doctorsApiSlice';
import {
  useGetAppointmentsByLeadUuidQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
} from '@/features/appointments/api/appointmentsApi';
import type { AppointmentDetail } from '@/features/appointments/types';
import { toast } from 'sonner';

interface LeadVisitsTabProps {
  visits?: LeadVisit[];
  lead: any;
  siteVisitStatuses: any[];
  getSiteVisitStatusLabel: (id: number) => string;
}

const formatVisitTime = (dateStr: string | null | undefined) => {
  if (!dateStr) return "--:-- --";
  try {
    const validStr = dateStr.replace(/Z/g, '').split('+')[0].replace(' ', 'T');
    const d = new Date(validStr);
    if (isNaN(d.getTime())) return "--:-- --";

    return d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "--:-- --";
  }
};

export const LeadVisitsTab = ({
  visits = [],
  lead,
  siteVisitStatuses,
  getSiteVisitStatusLabel,
}: LeadVisitsTabProps) => {
  const { currentRole } = usePermissions();
  const isSADMIN = currentRole?.code === 'SADMIN';
  const { getRmLabel } = useMasterDataLookup();
  const { data: masterData } = useGetAllMasterDataQuery();

  const [openDialog, setOpenDialog] = useState(false);
  const [openSurgeryDialog, setOpenSurgeryDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"Appointment" | "Surgery">("Appointment");
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);

  const { data: rms = [] } = useGetAllUsersByRoleIdQuery({
    role_id: 3,
    offset: 0,
  });

  // Fetch doctors to resolve doctor names and details from doctor_id
  const { data: doctorsResp } = useGetAllDoctorsQuery({
    branch_id: 0,
    specialization_id: 0,
  });
  const allDoctors = doctorsResp?.data || [];

  const {
    data: apiAppointments,
    isLoading: isLoadingAppointments,
  } = useGetAppointmentsByLeadUuidQuery(
    { lead_uuid: lead?.uuid || '', offset: 0 },
    { skip: !lead?.uuid }
  );

  const [createAppointment, { isLoading: isCreating }] = useCreateAppointmentMutation();
  const [updateAppointment, { isLoading: isUpdating }] = useUpdateAppointmentMutation();

  const isSubmitting = isCreating || isUpdating;

  // Extract appointment list safely from new response structure or legacy array
  const displayList: AppointmentDetail[] = React.useMemo(() => {
    if (apiAppointments?.appointment_details && Array.isArray(apiAppointments.appointment_details)) {
      return apiAppointments.appointment_details;
    }
    if (Array.isArray(apiAppointments)) {
      return apiAppointments as any;
    }
    if (visits && visits.length > 0) {
      return visits.map((v: any) => ({
        appointment_id: v.id,
        id: v.id,
        lead_uuid: v.lead_uuid,
        doctor_id: v.doctor_id || 0,
        visit_date_time: v.visit_date_time || "",
        visit_remarks: v.visit_remarks || "",
        appointment_status_id: v.visit_status || 1,
        is_active: v.is_active ?? 1,
      }));
    }
    return [];
  }, [apiAppointments, visits]);

  const handleOpenCreate = (type: "Appointment" | "Surgery" = "Appointment") => {
    if (type === "Surgery") {
      setOpenSurgeryDialog(true);
      return;
    }
    setDialogType(type);
    setSelectedAppointment(null);
    setOpenDialog(true);
  };

  const handleOpenEdit = (item: any) => {
    setDialogType(item.visit_remarks?.includes("[Surgery]") ? "Surgery" : "Appointment");
    setSelectedAppointment(item);
    setOpenDialog(true);
  };

  const handleDialogSubmit = async (data: any) => {
    try {
      const appointmentId = selectedAppointment?.appointment_id || selectedAppointment?.id;
      if (appointmentId) {
        await updateAppointment({
          id: appointmentId,
          doctor_id: data.doctor_id,
          visit_date_time: data.visit_date_time,
          visit_remarks: data.visit_remarks || "",
          appointments_status_id: data.appointments_status_id || data.visit_status || 1,
          is_active: selectedAppointment.is_active ?? 1,
        }).unwrap();
        toast.success("Appointment updated successfully");
      } else {
        await createAppointment({
          lead_uuid: lead.uuid,
          doctor_id: data.doctor_id,
          visit_date_time: data.visit_date_time,
          visit_remarks: data.visit_remarks || "",
        }).unwrap();
        toast.success("Appointment scheduled successfully");
      }
      setOpenDialog(false);
      setSelectedAppointment(null);
    } catch (err: any) {
      const msg = err?.data?.message || err?.message || "Failed to save appointment";
      toast.error(msg);
    }
  };

  // Top level lead note and assignment info if provided
  const headerBranchId = apiAppointments?.branch_id || lead?.branch_id;
  const headerSpecId = apiAppointments?.specialisation_id || lead?.specialisation_id;
  const headerRmId = apiAppointments?.assign_to_rm || lead?.assigned_to_rm;

  const headerBranchName = masterData?.branches?.find((b: any) => b.id === headerBranchId)?.description;
  const headerSpecName = masterData?.specialisations?.find((s: any) => s.id === headerSpecId)?.description;

  return (
    <div className="mt-4 space-y-4">
      {/* Lead info summary if available from API */}
      {(headerBranchName || headerSpecName || headerRmId || apiAppointments?.lead_note) && (
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            {headerBranchName && (
              <span className="flex items-center gap-1.5 font-semibold text-zinc-800 dark:text-zinc-200">
                <Building className="h-3.5 w-3.5 text-[#063669] dark:text-blue-400" />
                {headerBranchName}
              </span>
            )}
            {headerSpecName && (
              <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-medium">
                <Sparkles className="h-3.5 w-3.5 text-[#063669] dark:text-blue-400" />
                {headerSpecName}
              </span>
            )}
            {headerRmId && (
              <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-medium">
                <User className="h-3.5 w-3.5 text-zinc-400" />
                RM: {getRmLabel(headerRmId)}
              </span>
            )}
          </div>
          {apiAppointments?.lead_note && (
            <p className="text-xs text-zinc-500 italic max-w-md truncate">
              &ldquo;{apiAppointments.lead_note}&rdquo;
            </p>
          )}
        </div>
      )}

      {isLoadingAppointments ? (
        <div className="flex flex-col items-center justify-center min-h-[220px] border border-zinc-100 dark:border-zinc-800 rounded-2xl bg-white/50 dark:bg-zinc-900/50 p-6">
          <Loader2 className="h-6 w-6 animate-spin text-[#063669] mb-2" />
          <p className="text-xs text-zinc-500 font-medium">Loading appointments...</p>
        </div>
      ) : displayList.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] border border-zinc-100 dark:border-zinc-800 rounded-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm mt-4 p-6">
          <p className="text-sm text-zinc-400 font-medium italic mb-4">
            No appointments scheduled for this lead.
          </p>
          {!isSADMIN && (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => handleOpenCreate("Appointment")}
                className="px-4 py-2 rounded-xl text-xs bg-[#063669] hover:bg-[#063669]/90 text-white font-bold shadow-sm transition-all flex items-center gap-1.5"
              >
                + Schedule Appointment
              </button>
              <button
                onClick={() => handleOpenCreate("Surgery")}
                className="px-4 py-2 rounded-xl text-xs bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-sm transition-all flex items-center gap-1.5"
              >
                + Schedule Surgery
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
              Appointments ({displayList.length})
            </h3>
            {!isSADMIN && (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => handleOpenCreate("Appointment")}
                  className="text-xs font-bold text-[#063669] hover:text-[#063669]/90 bg-[#063669]/10 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
                >
                  + Schedule Appointment
                </button>
                <button
                  onClick={() => handleOpenCreate("Surgery")}
                  className="text-xs font-bold text-rose-600 hover:text-rose-800 bg-rose-50 dark:bg-rose-950/50 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1"
                >
                  + Schedule Surgery
                </button>
              </div>
            )}
          </div>

          <div className="space-y-3.5">
            {displayList.map((v: AppointmentDetail) => {
              const appointmentKey = v.appointment_id || v.id || Math.random();
              let day = "01";
              let month = "JAN";

              if (v.visit_date_time) {
                const validStr = v.visit_date_time.replace(/Z/g, '').split('+')[0].replace(' ', 'T');
                const dateObj = new Date(validStr);
                if (!isNaN(dateObj.getTime())) {
                  day = String(dateObj.getDate()).padStart(2, "0");
                  month = dateObj.toLocaleString("default", { month: "short" }).toUpperCase();
                } else {
                  const datePart = v.visit_date_time.split(/[T ]/)[0];
                  const [y, m, d] = datePart.split("-");
                  day = (d || "01").padStart(2, "0");
                  month = new Date(Number(y), Number(m) - 1, Number(d || 1))
                    .toLocaleString("default", { month: "short" })
                    .toUpperCase();
                }
              } else if (v.created_on) {
                const createdDate = new Date(v.created_on);
                day = String(createdDate.getDate()).padStart(2, "0");
                month = createdDate.toLocaleString("default", { month: "short" }).toUpperCase();
              }

              // Resolve Doctor Name
              const matchedDoctor = allDoctors.find((d: any) => d.id === v.doctor_id);
              const doctorDisplayName = matchedDoctor
                ? `Dr. ${matchedDoctor.first_name || ''} ${matchedDoctor.last_name || ''}`.trim()
                : (v.doctor_name || (v.doctor_id ? `Doctor #${v.doctor_id}` : "Unassigned Doctor"));

              const docSpecName = matchedDoctor
                ? masterData?.specialisations?.find((s: any) => s.id === matchedDoctor.specialization_id)?.description
                : undefined;

              const statusId = Number(v.appointments_status_id ?? v.appointment_status_id);
              const statusItem = masterData?.appointment_statuses?.find((s: any) => s.id === statusId);
              console.log(statusItem, v.appointments_status_id ,v,'statusItem');
              const statusText = statusItem?.description || "";
              const statusCode = statusItem?.code?.toUpperCase() || "";

              let badgeStyle = "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700";
              if (statusCode === "OPDBKD") {
                badgeStyle = "bg-blue-50 text-[#063669] dark:bg-blue-950/50 dark:text-blue-400 border-blue-200 dark:border-blue-900";
              } else if (statusCode === "OPDCMP") {
                badgeStyle = "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900";
              } else if (statusCode === "NOTVIS") {
                badgeStyle = "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border-amber-200 dark:border-amber-900";
              } else if (statusCode === "CANCEL") {
                badgeStyle = "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border-rose-200 dark:border-rose-900";
              } else if (statusCode === "RESCHD") {
                badgeStyle = "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400 border-purple-200 dark:border-purple-900";
              }

              return (
                <div
                  key={appointmentKey}
                  className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 transition-all"
                >
                  <div className="flex gap-4 sm:gap-6 items-center flex-1 min-w-0">
                    {/* DATE BADGE */}
                    <div className="flex flex-col items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-blue-50/50 dark:bg-zinc-900 border border-blue-100 dark:border-zinc-800 shrink-0">
                      <span className="text-[10px] font-bold text-[#063669] dark:text-blue-400 tracking-tighter mb-0.5">
                        {month}
                      </span>
                      <span className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100 leading-none">
                        {day}
                      </span>
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {statusText && (
                          <span className={`text-[9px] px-2.5 py-0.5 rounded-md border font-bold uppercase tracking-wider ${badgeStyle}`}>
                            {statusText}
                          </span>
                        )}
                        {v.visit_remarks?.includes("[Surgery]") && (
                          <span className="text-[9px] px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 font-bold uppercase tracking-wider border border-rose-200 dark:border-rose-900">
                            Surgery
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-zinc-500 font-medium">
                        <span className="flex items-center gap-1.5 font-bold text-zinc-800 dark:text-zinc-200">
                          <Stethoscope className="h-3.5 w-3.5 text-[#063669] dark:text-blue-400" />
                          {doctorDisplayName}
                          {docSpecName && (
                            <span className="text-[11px] text-zinc-400 font-normal">
                              ({docSpecName})
                            </span>
                          )}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-zinc-400" />
                          {formatVisitTime(v.visit_date_time)}
                        </span>
                      </div>

                      {v.visit_remarks && (
                        <div className="flex items-start gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 pt-0.5">
                          <FileText className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
                          <p className="line-clamp-2 italic">
                            {v.visit_remarks.replace("[Surgery]", "").trim()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {!isSADMIN && (
                    <button
                      onClick={() => handleOpenEdit(v)}
                      className="p-2 rounded-xl text-zinc-400 hover:text-[#063669] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0 ml-3"
                      title="Edit Appointment"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      <ScheduleVisitDialog
        open={!isSADMIN && openDialog}
        dialogType={dialogType}
        appointment={selectedAppointment}
        onClose={() => {
          setOpenDialog(false);
          setSelectedAppointment(null);
        }}
        lead={lead}
        siteVisitStatuses={siteVisitStatuses}
        rms={rms}
        onSubmit={handleDialogSubmit}
        isLoading={isSubmitting}
      />

      <ScheduleSurgeryDialog
        open={openSurgeryDialog}
        onOpenChange={setOpenSurgeryDialog}
        lead={lead}
      />
    </div>
  );
};