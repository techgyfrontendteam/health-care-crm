import React from 'react';
import { Clock, Pencil, MapPin, User, ArrowRight } from 'lucide-react';
import type { LeadVisit } from '../../types';
import { ScheduleVisitDialog } from '../ScheduleVisitDialog';
import { useGetAllUsersByRoleIdQuery } from '@/features/users/api/usersApi';
import { useScheduleVisitMutation } from '@/features/leads/api/leadsApi';
import { useMasterDataLookup } from '../../../../shared/hooks/useMasterDataLookup';
import { usePermissions } from '../../../../hooks/usePermissions';

interface LeadVisitsTabProps {
  visits?: LeadVisit[];
  lead: any;
  siteVisitStatuses: any[];
  getSiteVisitStatusLabel: (id: number) => string;
}

const formatVisitTime = (dateStr: string | null) => {
  if (!dateStr) return "--:-- --";
  try {
    // Strip 'Z' or timezone offsets to force parsing as local time
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
  visits,
  lead,
  siteVisitStatuses,
  getSiteVisitStatusLabel
}: LeadVisitsTabProps) => {
  const [scheduleVisit, { isLoading: isScheduling }] = useScheduleVisitMutation();
  const { currentRole } = usePermissions();
  const isSADMIN = currentRole?.code === 'SADMIN';
  const { getRmLabel, getEmLabel, getProjectLabel } = useMasterDataLookup();

  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogType, setDialogType] = React.useState<"Appointment" | "Surgery">("Appointment");
  const [selectedVisit, setSelectedVisit] = React.useState<LeadVisit | null>(null);
  const { data: rms = [] } = useGetAllUsersByRoleIdQuery({
    role_id: 3,
    offset: 0,
  });

  return (
    <div className="mt-4 space-y-4">
      {!visits || visits.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] border border-zinc-100 rounded-2xl bg-white/50 backdrop-blur-sm mt-4 p-6">
          <p className="text-sm text-zinc-400 font-medium italic mb-4">No appointments scheduled for this lead.</p>
          {!isSADMIN && (
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  setDialogType("Appointment");
                  setSelectedVisit(null);
                  setOpenDialog(true);
                }}
                className="px-4 py-2 rounded-xl text-sm bg-[#0f3d6b] hover:bg-[#0b2e52] text-white font-semibold shadow-sm transition-all flex items-center gap-1.5"
              >
                + Schedule Appointment
              </button>
              <button
                onClick={() => {
                  setDialogType("Surgery");
                  setSelectedVisit(null);
                  setOpenDialog(true);
                }}
                className="px-4 py-2 rounded-xl text-sm bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-sm transition-all flex items-center gap-1.5"
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
            <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              Appointments
            </h3>
            {!isSADMIN && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setDialogType("Appointment");
                    setSelectedVisit(null);
                    setOpenDialog(true);
                  }}
                  className="text-xs font-semibold text-[#0f3d6b] hover:text-[#0b2e52] bg-[#0f3d6b]/10 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                >
                  + Schedule Appointment
                </button>
                <button
                  onClick={() => {
                    setDialogType("Surgery");
                    setSelectedVisit(null);
                    setOpenDialog(true);
                  }}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-800 bg-rose-50 dark:bg-rose-950/50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                >
                  + Schedule Surgery
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {visits.map((v) => {
              // Extract date manually to avoid timezone shift
              let day = "01";
              let month = "JAN";

              if (v.visit_date_time) {
                // Strip 'Z' or timezone offsets to force parsing as local time
                const validStr = v.visit_date_time.replace(/Z/g, '').split('+')[0].replace(' ', 'T');
                const dateObj = new Date(validStr);
                if (!isNaN(dateObj.getTime())) {
                  day = String(dateObj.getDate()).padStart(2, "0");
                  month = dateObj.toLocaleString("default", { month: "short" }).toUpperCase();
                } else {
                  // Fallback
                  const datePart = v.visit_date_time.split(/[T ]/)[0];
                  const [y, m, d] = datePart.split("-");
                  day = d.padStart(2, "0");
                  month = new Date(Number(y), Number(m) - 1, Number(d))
                    .toLocaleString("default", { month: "short" })
                    .toUpperCase();
                }
              } else {
                const createdDate = new Date(v.created_on);
                day = String(createdDate.getDate()).padStart(2, "0");
                month = createdDate
                  .toLocaleString("default", { month: "short" })
                  .toUpperCase();
              }
              const projectName = getProjectLabel(lead.project_id);

              return (
                <div
                  key={v.id}
                  className="group flex items-center justify-between p-5 rounded-[24px] bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-all"
                >
                  <div className="flex gap-6 items-center">
                    {/* DATE BADGE */}
                    <div className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shrink-0">
                      <span className="text-[10px] font-bold text-red-500 tracking-tighter mb-0.5">{month}</span>
                      <span className="text-xl font-black text-zinc-900 dark:text-zinc-100 leading-none">{day}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold uppercase tracking-wider">
                          {getSiteVisitStatusLabel(v.visit_status)}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-zinc-500 font-medium">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-zinc-400" />
                          {formatVisitTime(v.visit_date_time)}
                        </span>
                        
                        {v.visit_assigned_to_em && (
                          <span className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-zinc-400" />
                            EM: {getEmLabel(v.visit_assigned_to_em)}
                          </span>
                        )}

                        {!v.visit_assigned_to_em && v.visit_assigned_to_rm && (
                          <span className="flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 text-zinc-400" />
                            RM: {getRmLabel(v.visit_assigned_to_rm)}
                          </span>
                        )}
                      </div>

                      {v.visit_location_url && (
                        <a
                          href={v.visit_location_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-blue-600 font-bold hover:underline group/link"
                        >
                          <MapPin className="h-3.5 w-3.5" />
                          View on Google Maps
                          <ArrowRight className="h-3 w-3 translate-x-0 group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <ScheduleVisitDialog
        open={!isSADMIN && openDialog}
        dialogType={dialogType}
        onClose={() => {
          setOpenDialog(false);
          setSelectedVisit(null);
        }}
        lead={lead}
        siteVisitStatuses={siteVisitStatuses}
        rms={rms}
        onSubmit={async (data) => {
          try {
            await scheduleVisit({
              lead_uuid: lead.uuid,
              visit_location_url: data.visit_location_url,
              visit_date_time: data.visit_date_time,
              visit_remarks: data.visit_remarks,
              visit_status: data.visit_status,
              visit_assigned_to_rm: data.visit_assigned_to_rm,
              visit_assigned_to_em: data.visit_assigned_to_em,
            }).unwrap();
            setOpenDialog(false);
            setSelectedVisit(null);
          } catch (err) {
            console.error("Schedule Visit Error:", err);
          }
        }}
        isLoading={isScheduling}
      />
    </div>
  );
};