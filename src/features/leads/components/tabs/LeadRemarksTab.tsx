import React, { useRef, useState, useEffect } from "react";
import { cn } from "../../../../utils";
import webhookIconPng from '../../../../assets/icons/webhook-custom-icon.png';
import { 
  Phone, 
  TrendingUp, 
  UserPlus, 
  MessageSquare, 
  FileText, 
  Clock, 
  Edit, 
  UserCheck, 
  CheckCircle,
  MessageCircle,
  PhoneCall
} from "lucide-react";

interface Remark {
  id: number;
  remark: string;
  activity_type: string;
  created_on: string;
  lead_uuid?: string;
}

interface LeadRemarksTabProps {
  remarks?: Remark[];
}

const getActivityMeta = (activityType: string) => {
  switch (activityType) {
    case "CREATED":
    case "LEAD_CREATED":
    case "WEBHOOK":
      return {
        icon: <img src={webhookIconPng} alt="Webhook" className="h-5 w-5 object-contain" />,
      };
    case "FIELD_CHANGED":
      return {
        icon: <Edit className="h-4 w-4 text-[#063669]" />,
      };
    case "STATUS_CHANGED":
    case "STAGE_CHANGED":
      return {
        icon: <TrendingUp className="h-4 w-4 text-[#235CB1]" />,
      };
    case "ASSIGNED":
    case "RM_ASSIGNED":
      return {
        icon: <UserCheck className="h-4 w-4 text-[#005752]" />,
      };
    case "REMARK_ADDED":
    case "NOTE":
      return {
        icon: <MessageSquare className="h-4 w-4 text-[#1F477B]" />,
      };
    case "CALL_SUMMARY":
    case "CALL":
    case "CALL_ATTEMPTED":
      return {
        icon: <Phone className="h-4 w-4 text-[#063669]" />,
      };
    case "CHAT_SUMMARY":
      return {
        icon: <MessageCircle className="h-4 w-4 text-[#235CB1]" />,
      };
    default:
      return {
        icon: <FileText className="h-4 w-4 text-[#737784]" />,
      };
  }
};

const formatActivityDate = (dateStr: string) => {
  try {
    let cleanStr = dateStr.trim();
    if (cleanStr.includes(" ") && !cleanStr.includes("T")) {
      cleanStr = cleanStr.replace(" ", "T");
    }
    cleanStr = cleanStr.replace(/Z$/i, "");
    cleanStr = cleanStr.replace(/\+00\:?00$/, "");

    const date = new Date(cleanStr);
    if (isNaN(date.getTime())) {
      return dateStr;
    }

    return (
      date.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase() +
      ", " +
      date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
    );
  } catch {
    return dateStr;
  }
};

const dummyRemarks: Remark[] = [
  {
    id: 1,
    remark: "System recorded an outbound call attempt. No answer. Voicemail dropped automatically.",
    activity_type: "CALL_ATTEMPTED",
    created_on: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    remark: "Lead status updated following initial review of lead quality score (8.2/10).",
    activity_type: "STAGE_CHANGED",
    created_on: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    remark: "Auto-assignment engine matched lead with Vikram Singh based on high-value segment expertise.",
    activity_type: "RM_ASSIGNED",
    created_on: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    remark: "Inbound lead captured from 'Q4 Luxury Living' campaign. Meta ID: fb_9921_x32.",
    activity_type: "CREATED",
    created_on: new Date(Date.now() - 15.5 * 60 * 60 * 1000).toISOString(),
  },
];

const activityLabelMap: Record<string, string> = {
  CREATED: "Lead created via Facebook webhook",
  LEAD_CREATED: "Lead Created",
  WEBHOOK: "Lead created via Webhook",
  FIELD_CHANGED: "Information Updated",
  STATUS_CHANGED: "Lead Status Changed",
  STAGE_CHANGED: "Stage moved to In Progress",
  ASSIGNED: "Assignee Updated",
  RM_ASSIGNED: "Assigned to RM Vikram Singh",
  REMARK_ADDED: "New Remark Added",
  NOTE: "Note Added",
  CALL_SUMMARY: "Call Recording Summary",
  CALL: "Call Recorded",
  CALL_ATTEMPTED: "Call Attempted",
  CHAT_SUMMARY: "Chat Transcript Summary",
};

export const LeadRemarksTab = ({ remarks }: LeadRemarksTabProps) => {
  // Use dummyRemarks if no data is provided to showcase the UI match
  const data = remarks && remarks.length > 0 ? remarks : dummyRemarks;

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-center space-y-2">
          <Clock className="h-8 w-8 text-zinc-300 mx-auto" />
          <p className="text-sm text-zinc-400">No activity remarks found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-b from-[#FFFFFF] to-[#F7F9FB] rounded-[24px] p-6 md:p-12 relative overflow-hidden">
      <div className="relative pl-12 md:pl-16">
        {/* Absolute vertical line */}
        <div 
          className="absolute left-[24px] md:left-[32px] top-6 bottom-6 w-[2px] z-0" 
          style={{ background: 'linear-gradient(180deg, rgba(6, 54, 105, 0.2) 0%, rgba(195, 198, 213, 0.3) 50%, rgba(195, 198, 213, 0) 100%)' }}
        />

        <div className="space-y-8 relative z-10">
          {data.map((item: Remark, index: number) => {
            const meta = getActivityMeta(item.activity_type);
            const label = activityLabelMap[item.activity_type] || "Activity";

            return (
              <div
                key={item.id ?? index}
                className="flex items-start gap-6 md:gap-8 relative"
              >
                {/* Numbered Container positioned precisely over the line */}
                <div 
                  className="absolute -left-[48px] md:-left-[56px] top-3 z-10 flex items-center justify-center w-[48px] h-[48px] bg-[#FFFFFF] border-[4px] border-[#E6EAF0] dark:border-zinc-800 rounded-full shadow-[0px_2px_6px_rgba(0,0,0,0.04)] font-['Plus_Jakarta_Sans'] font-extrabold text-[16px] text-[#063669] dark:text-zinc-200"
                >
                  {data.length - index}
                </div>

                {/* Glassmorphic Card */}
                <div className="flex-1 bg-[rgba(255,255,255,0.7)] border border-[rgba(255,255,255,0.4)] shadow-[0px_10px_30px_rgba(0,0,0,0.02)] backdrop-blur-[10px] rounded-[16px] px-6 py-6 transition-all hover:bg-[rgba(255,255,255,0.8)]">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-2 md:gap-6">
                    <div className="space-y-1.5 flex-1">
                      <p className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] leading-[24px] text-[#191C1E]">
                        {label}
                      </p>
                      <p className="font-['Inter'] font-normal text-[14px] leading-[23px] text-[#434653]">
                        {item.remark}
                      </p>
                    </div>
                    <span className="font-['Inter'] font-bold text-[12px] leading-[16px] tracking-[-0.3px] uppercase text-[#737784] whitespace-nowrap mt-1 md:mt-1.5">
                      {formatActivityDate(item.created_on)}
                    </span>
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