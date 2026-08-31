import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../../../utils";
import type { Enquiry } from "../../types";
import { useMasterDataLookup } from "../../../../shared/hooks/useMasterDataLookup";
import { getProjectStatusOptions } from "../../../../utils";

interface LeadEnquiriesTabProps {
  leadId?: string;
  enquiries?: Enquiry[];
  onView?: (uuid: string) => void;
}

const getStatusBadgeClass = (status: string) => {
  const s = status.toUpperCase();
  if (s.includes("ACTIVE") || s.includes("NEW")) {
    return "bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE] dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800";
  } else if (s.includes("DROP") || s.includes("JUNK") || s.includes("REJECT")) {
    return "bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0] dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700";
  } else {
    return "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800";
  }
};

const formatEnquiryDate = (dateString?: string) => {
  if (!dateString) return "---";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "---";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).toUpperCase(); // E.g., "MAY 12, 2026"
};

export const LeadEnquiriesTab = ({ leadId, enquiries = [], onView }: LeadEnquiriesTabProps) => {
  const navigate = useNavigate();
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineStyle, setLineStyle] = useState<{ top: number; height: number } | null>(null);

  const {
    getStatusLabel,
    getProjectLabel,
    getSourceLabel,
    getRmLabel,
    getEmLabel,
    projectLeadStatuses,
  } = useMasterDataLookup();

  const getEnquiryStatusLabel = (projectId: number, projectLeadStatusId: number) => {
    const options = getProjectStatusOptions(projectId, projectLeadStatuses);
    const matched = options.find((o: any) => o.id === projectLeadStatusId);
    return matched ? matched.label : getStatusLabel(projectLeadStatusId);
  };

  useEffect(() => {
    if (!containerRef.current || enquiries.length < 2) {
      setLineStyle(null);
      return;
    }

    const firstRow = rowRefs.current[0];
    const lastRow = rowRefs.current[enquiries.length - 1];
    if (!firstRow || !lastRow) return;

    const containerTop = containerRef.current.getBoundingClientRect().top;

    // Find the center of the first circle and last circle
    const firstCircle = firstRow.querySelector(".timeline-circle");
    const lastCircle = lastRow.querySelector(".timeline-circle");

    if (firstCircle && lastCircle) {
      const firstCenter = firstCircle.getBoundingClientRect().top - containerTop + firstCircle.getBoundingClientRect().height / 2;
      const lastCenter = lastCircle.getBoundingClientRect().top - containerTop + lastCircle.getBoundingClientRect().height / 2;

      setLineStyle({
        top: firstCenter,
        height: lastCenter - firstCenter,
      });
    }
  }, [enquiries]);

  if (!enquiries || enquiries.length === 0) {
    return (
      <div className="space-y-6">
        <div className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <h3
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              lineHeight: "24px",
              color: "#191C1E",
            }}
            className="dark:text-zinc-100"
          >
            Enquiry History
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/20">
          <div className="w-12 h-12 rounded-2xl bg-[#0f3d6b]/10 dark:bg-blue-950/40 flex items-center justify-center mb-4">
            <span className="text-[#0f3d6b] dark:text-blue-400 font-semibold text-lg">📋</span>
          </div>
          <h4 className="text-sm font-bold text-[#191C1E] dark:text-zinc-200 mb-1">
            No Enquiries Found
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-[280px]">
            There is no enquiry history recorded for this lead.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <h3
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: "24px",
            color: "#191C1E",
          }}
          className="dark:text-zinc-100"
        >
          Enquiry History
        </h3>
      </div>

      {/* Timeline Section */}
      <div ref={containerRef} className="relative pl-2 mt-6">
        {/* Vertical line behind the circles */}
        {lineStyle && (
          <div
            className="absolute left-[38px] w-px bg-zinc-200 dark:bg-zinc-800 z-0"
            style={{ top: lineStyle.top, height: lineStyle.height }}
          />
        )}

        <div className="space-y-8 relative z-10">
          {enquiries.map((item, index) => {
            const statusLabel = getEnquiryStatusLabel(item.project_id, item.project_lead_status_id);
            const sourceLabel = item.source_id ? getSourceLabel(item.source_id) : '--';
            const projectLabel = getProjectLabel(item.project_id);
            const rmLabel = getRmLabel(item.assigned_to_rm);
            const emLabel = getEmLabel(item.assigned_to_em);
            const dateStr = formatEnquiryDate(item.created_on);

            return (
              <div
                key={item.uuid || index}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                className="flex items-start gap-6"
              >
                {/* Timeline Indicator Column */}
                <div className="shrink-0 flex flex-col items-center w-[76px] mt-2">
                  {/* Circle Container */}
                  <div className="timeline-circle w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-center shadow-sm relative z-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0f3d6b] dark:bg-blue-400" />
                  </div>
                  {/* Date under the circle */}
                  <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-center mt-2.5 whitespace-nowrap">
                    {dateStr}
                  </span>
                </div>

                {/* Enquiry Card */}
                <div className="flex-1 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800/80 rounded-2xl px-6 py-5 shadow-sm">
                  <div className="grid grid-cols-[1fr_1fr_1fr_0.8fr_1.2fr_1.2fr_0.8fr] gap-4 items-center">
                    {/* Lead ID */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
                        Lead ID
                      </span>
                      <span className="text-xs font-bold text-[#0f3d6b] dark:text-blue-400 block truncate">
                        #{item.lead_id}
                      </span>
                    </div>

                    {/* Project */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
                        Project
                      </span>
                      <span className="text-xs font-bold text-[#191C1E] dark:text-zinc-200 block truncate">
                        {projectLabel}
                      </span>
                    </div>

                    {/* Source */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
                        Source
                      </span>
                      <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block truncate">
                        {sourceLabel}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
                        Status
                      </span>
                      <span
                        className={cn(
                          "inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider",
                          getStatusBadgeClass(statusLabel)
                        )}
                      >
                        {statusLabel}
                      </span>
                    </div>

                    {/* Assigned RM */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
                        Assigned RM
                      </span>
                      <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block truncate">
                        {rmLabel}
                      </span>
                    </div>

                    {/* Assigned EM */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
                        Assigned EM
                      </span>
                      <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 block truncate">
                        {emLabel}
                      </span>
                    </div>

                    {/* View Button */}
                    <div className="text-right">
                      <button
                        onClick={() => {
                          if (onView) {
                            onView(item.uuid);
                          } else {
                            navigate(`/leads/${item.uuid}`);
                          }
                        }}
                        className="bg-[#0f3d6b] hover:bg-[#0f3d6b]/90 text-white font-extrabold text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
