import React, { useState } from 'react';
import {
  Clock,
  Building,
  User,
  FileText,
  Loader2,
  Stethoscope,
  Sparkles,
  Activity,
  Calendar as CalendarIcon,
  ShieldCheck,
} from 'lucide-react';
import { ScheduleSurgeryDialog } from '../ScheduleSurgeryDialog';
import { useGetSurgeriesByLeadUuidQuery } from '../../api/leadsApi';
import { useMasterDataLookup } from '../../../../shared/hooks/useMasterDataLookup';
import { usePermissions } from '../../../../hooks/usePermissions';
import { useGetAllMasterDataQuery } from '@/features/master/api/masterApi';
import { useGetAllDoctorsQuery } from '@/features/doctors/api/doctorsApiSlice';
import type { SurgeryDetail } from '../../types';

interface LeadSurgeriesTabProps {
  lead: any;
}

const formatSurgeryTime = (dateStr: string | null | undefined) => {
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

export const LeadSurgeriesTab: React.FC<LeadSurgeriesTabProps> = ({ lead }) => {
  const { currentRole } = usePermissions();
  const isSADMIN = currentRole?.code === 'SADMIN';
  const { getRmLabel } = useMasterDataLookup();
  const { data: masterData } = useGetAllMasterDataQuery();

  const [openSurgeryDialog, setOpenSurgeryDialog] = useState(false);

  // Fetch doctors to resolve doctor names and details if needed
  const { data: doctorsResp } = useGetAllDoctorsQuery({
    branch_id: 0,
    specialization_id: 0,
  });
  const allDoctors = doctorsResp?.data || [];

  const {
    data: apiSurgeries,
    isLoading: isLoadingSurgeries,
    refetch,
  } = useGetSurgeriesByLeadUuidQuery(
    { lead_uuid: lead?.uuid || '', offset: 0 },
    { skip: !lead?.uuid }
  );

  // Extract surgery list safely
  const surgeryList: SurgeryDetail[] = React.useMemo(() => {
    if (apiSurgeries?.surgery_details && Array.isArray(apiSurgeries.surgery_details)) {
      return apiSurgeries.surgery_details;
    }
    if (Array.isArray(apiSurgeries)) {
      return apiSurgeries as any;
    }
    return [];
  }, [apiSurgeries]);

  return (
    <div className="mt-4 space-y-4">

      {isLoadingSurgeries ? (
        <div className="flex flex-col items-center justify-center min-h-[220px] border border-zinc-100 dark:border-zinc-800 rounded-2xl bg-white/50 dark:bg-zinc-900/50 p-6">
          <Loader2 className="h-6 w-6 animate-spin text-[#063669] mb-2" />
          <p className="text-xs text-zinc-500 font-medium">Loading surgeries...</p>
        </div>
      ) : surgeryList.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] border border-zinc-100 dark:border-zinc-800 rounded-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm mt-4 p-6">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center mb-3 text-rose-600 dark:text-rose-400">
            <Activity className="h-6 w-6" />
          </div>
          <p className="text-sm text-zinc-400 font-medium italic mb-4">
            No surgeries scheduled for this lead.
          </p>
          {!isSADMIN && (
            <button
              onClick={() => setOpenSurgeryDialog(true)}
              className="px-4 py-2 rounded-xl text-xs bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              + Schedule Surgery
            </button>
          )}
        </div>
      ) : (
        <>
          {/* HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <Activity className="h-4 w-4 text-rose-600" />
              <span>Surgeries ({surgeryList.length})</span>
            </h3>
            {!isSADMIN && (
              <button
                onClick={() => setOpenSurgeryDialog(true)}
                className="text-xs font-bold text-rose-600 hover:text-rose-800 bg-rose-50 dark:bg-rose-950/50 px-3.5 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer border border-rose-200 dark:border-rose-900/50"
              >
                + Schedule Surgery
              </button>
            )}
          </div>

          <div className="space-y-3.5">
            {surgeryList.map((s: SurgeryDetail) => {
              const surgeryKey = s.surgery_id || s.id || Math.random();
              let day = "01";
              let month = "JAN";
              let year = "";

              if (s.surgery_date_time) {
                const validStr = s.surgery_date_time.replace(/Z/g, '').split('+')[0].replace(' ', 'T');
                const dateObj = new Date(validStr);
                if (!isNaN(dateObj.getTime())) {
                  day = String(dateObj.getDate()).padStart(2, "0");
                  month = dateObj.toLocaleString("default", { month: "short" }).toUpperCase();
                  year = String(dateObj.getFullYear());
                } else {
                  const datePart = s.surgery_date_time.split(/[T ]/)[0];
                  const [y, m, d] = datePart.split("-");
                  day = (d || "01").padStart(2, "0");
                  month = new Date(Number(y), Number(m) - 1, Number(d || 1))
                    .toLocaleString("default", { month: "short" })
                    .toUpperCase();
                  year = y;
                }
              } else if (s.created_on) {
                const createdDate = new Date(s.created_on);
                day = String(createdDate.getDate()).padStart(2, "0");
                month = createdDate.toLocaleString("default", { month: "short" }).toUpperCase();
                year = String(createdDate.getFullYear());
              }

              // Resolve Doctor Name
              const matchedDoctor = allDoctors.find((d: any) => d.id === s.doctor_id);
              const doctorDisplayName = matchedDoctor
                ? `Dr. ${matchedDoctor.first_name || ''} ${matchedDoctor.last_name || ''}`.trim()
                : (s.doctor_name || (s.doctor_id ? `Doctor #${s.doctor_id}` : "Assigned Doctor"));

              const docSpecName = matchedDoctor
                ? masterData?.specialisations?.find((spec: any) => spec.id === matchedDoctor.specialization_id)?.description
                : undefined;

              // Resolve Status
              const statusCode = (s.surgery_status_code || "").toUpperCase();
              const statusText = s.surgery_status_name || s.surgery_status_code || "Scheduled";

              let badgeStyle = "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border-rose-200 dark:border-rose-900";
              if (statusCode.includes("CMP") || statusCode.includes("DONE") || statusCode.includes("COMPLET")) {
                badgeStyle = "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900";
              } else if (statusCode.includes("IN_PROG") || statusCode.includes("PROG")) {
                badgeStyle = "bg-blue-50 text-[#063669] dark:bg-blue-950/50 dark:text-blue-400 border-blue-200 dark:border-blue-900";
              } else if (statusCode.includes("CANCEL")) {
                badgeStyle = "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700";
              } else if (statusCode.includes("RESCHD")) {
                badgeStyle = "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400 border-purple-200 dark:border-purple-900";
              }

              return (
                <div
                  key={surgeryKey}
                  className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 transition-all hover:border-rose-200/80 dark:hover:border-rose-900/50 shadow-sm"
                >
                  <div className="flex gap-4 sm:gap-6 items-center flex-1 min-w-0">
                    {/* DATE BADGE */}
                    <div className="flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-rose-50/60 dark:bg-zinc-900 border border-rose-100 dark:border-zinc-800 shrink-0">
                      <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 tracking-tighter mb-0.5">
                        {month} {year ? `'${year.slice(-2)}` : ''}
                      </span>
                      <span className="text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-100 leading-none">
                        {day}
                      </span>
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      {/* Top status & surgery type badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        {statusText && (
                          <span className={`text-[9px] px-2.5 py-0.5 rounded-md border font-bold uppercase tracking-wider ${badgeStyle}`}>
                            {statusText}
                          </span>
                        )}
                        {s.surgery_type_name && (
                          <span className="text-[9px] px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold uppercase tracking-wider border border-zinc-200 dark:border-zinc-700 flex items-center gap-1">
                            <Activity className="h-3 w-3 text-rose-500" />
                            {s.surgery_type_name}
                          </span>
                        )}
                      </div>

                      {/* Doctor & Time details */}
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-zinc-500 font-medium">
                        <span className="flex items-center gap-1.5 font-bold text-zinc-800 dark:text-zinc-200">
                          <Stethoscope className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" />
                          {doctorDisplayName}
                          {docSpecName && (
                            <span className="text-[11px] text-zinc-400 font-normal">
                              ({docSpecName})
                            </span>
                          )}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-zinc-400" />
                          {formatSurgeryTime(s.surgery_date_time)}
                        </span>
                      </div>

                      {/* Remarks */}
                      {s.surgery_remarks && (
                        <div className="flex items-start gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 pt-0.5">
                          <FileText className="h-3.5 w-3.5 text-zinc-400 shrink-0 mt-0.5" />
                          <p className="line-clamp-2 italic">
                            {s.surgery_remarks}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <ScheduleSurgeryDialog
        open={openSurgeryDialog}
        onOpenChange={setOpenSurgeryDialog}
        lead={lead}
        onSuccess={() => {
          refetch();
        }}
      />
    </div>
  );
};
