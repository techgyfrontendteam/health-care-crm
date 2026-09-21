import React, { useState, useEffect } from "react";
import {
  PhoneCall,
  PhoneOff,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  RotateCw,
  FileText,
  Mic,
  Brain,
  Search,
} from "lucide-react";
import { Button } from "../../../components/ui/button";

export type CallStage =
  | "calling"
  | "in_progress"
  | "missed"
  | "analyzing"
  | "completed"
  | "error";

interface CallEngagementModalProps {
  open: boolean;
  stage: CallStage;
  leadName: string;
  phoneNumber?: string;
  durationSeconds?: number;
  retryAttempt?: number;
  maxRetries?: number;
  errorMessage?: string;
  onClose: () => void;
  onRetry?: () => void;
  onViewDetails?: () => void;
}

const ENGAGEMENT_STEPS = [
  {
    icon: Mic,
    title: "Transcribing conversation audio",
    description: "Converting high-fidelity voice recording into dialogue...",
  },
  {
    icon: Search,
    title: "Extracting clinical & patient points",
    description: "Identifying symptoms, patient concerns, and inquiries...",
  },
  {
    icon: Brain,
    title: "Generating summary & sentiment analysis",
    description: "Analyzing tone, patient intent, and conversation highlights...",
  },
  {
    icon: FileText,
    title: "Finalizing documentation & insights",
    description: "Compiling structured notes for the patient timeline...",
  },
];

export const CallEngagementModal: React.FC<CallEngagementModalProps> = ({
  open,
  stage,
  leadName,
  phoneNumber,
  retryAttempt = 1,
  maxRetries = 3,
  errorMessage,
  onClose,
  onRetry,
  onViewDetails,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [elapsedTimer, setElapsedTimer] = useState(0);

  // Timer when call is in progress
  useEffect(() => {
    let timer: any;
    if (open && (stage === "calling" || stage === "in_progress")) {
      timer = setInterval(() => {
        setElapsedTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsedTimer(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [open, stage]);

  // Rotate AI analyzing steps every 3 seconds
  useEffect(() => {
    let stepInterval: any;
    if (open && stage === "analyzing") {
      stepInterval = setInterval(() => {
        setActiveStepIndex((prev) => (prev + 1) % ENGAGEMENT_STEPS.length);
      }, 3000);
    } else {
      setActiveStepIndex(0);
    }
    return () => {
      if (stepInterval) clearInterval(stepInterval);
    };
  }, [open, stage]);

  if (!open) return null;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const CurrentStepIcon = ENGAGEMENT_STEPS[activeStepIndex].icon;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-3xl shadow-2xl transition-all animate-in zoom-in-95 duration-200">
        
        {/* Subtle Top Accent Gradient */}
        <div
          className={`h-1.5 w-full ${
            stage === "completed"
              ? "bg-gradient-to-r from-emerald-400 to-teal-500"
              : stage === "missed"
              ? "bg-gradient-to-r from-amber-400 to-rose-400"
              : stage === "error"
              ? "bg-gradient-to-r from-rose-500 to-red-600"
              : "bg-gradient-to-r from-[#063669] via-blue-500 to-cyan-400"
          }`}
        />

        {/* Close button (always accessible for user safety) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-7 text-center flex flex-col items-center">
          
          {/* ═══════════════════════════════════════════ */}
          {/* 1. CALL IN PROGRESS STATE                   */}
          {/* ═══════════════════════════════════════════ */}
          {(stage === "calling" || stage === "in_progress") && (
            <div className="flex flex-col items-center space-y-5">
              {/* Radar Pulsing Icon */}
              <div className="relative flex items-center justify-center">
                <div className="absolute w-24 h-24 rounded-full bg-blue-500/15 animate-ping" />
                <div className="absolute w-20 h-20 rounded-full bg-blue-500/25 animate-pulse" />
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#063669] to-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-900/20">
                  <PhoneCall className="w-7 h-7 animate-bounce" />
                </div>
              </div>

              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/50 text-[#063669] dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                  Call in Progress
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
                  {leadName}
                </h3>
                {phoneNumber && (
                  <p className="text-xs font-semibold text-slate-400 tracking-wider">
                    {phoneNumber}
                  </p>
                )}
              </div>

              {/* Real-time Timer and Audio Indicator */}
              <div className="w-full bg-slate-50 dark:bg-zinc-800/60 border border-slate-100 dark:border-zinc-800 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5 items-end h-4">
                    <span className="w-1 bg-blue-600 rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2" />
                    <span className="w-1 bg-blue-600 rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-4" />
                    <span className="w-1 bg-blue-600 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
                    <span className="w-1 bg-blue-600 rounded-full animate-[pulse_1s_ease-in-out_infinite] h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-600 dark:text-zinc-300">
                    Duration
                  </span>
                </div>
                <span className="font-mono text-sm font-black text-[#063669] dark:text-blue-400 tracking-wider">
                  {formatTimer(elapsedTimer)}
                </span>
              </div>

              <p className="text-[11px] text-slate-400 dark:text-zinc-500 text-center font-medium max-w-xs">
                Awaiting call wrap-up. AI analysis will begin automatically once the call ends.
              </p>
            </div>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/* 2. MISSED / UNANSWERED STATE               */}
          {/* ═══════════════════════════════════════════ */}
          {stage === "missed" && (
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-sm">
                <PhoneOff className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50 uppercase tracking-wider">
                  Call Disconnected / Missed
                </span>
                <h3 className="text-base font-bold text-slate-800 dark:text-zinc-100">
                  {leadName}
                </h3>
              </div>

              <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-xs leading-relaxed">
                The call was not answered or was disconnected. A missed call entry has been logged to the timeline.
              </p>

              <div className="pt-2 w-full">
                <Button
                  onClick={onClose}
                  className="w-full bg-[#063669] hover:bg-[#052d58] text-white rounded-xl h-10 font-bold text-xs cursor-pointer shadow-sm"
                >
                  Close
                </Button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/* 3. AI ANALYZING STATE                      */}
          {/* ═══════════════════════════════════════════ */}
          {stage === "analyzing" && (
            <div className="flex flex-col items-center space-y-5 w-full">
              {/* Animated AI Glowing Orb */}
              <div className="relative flex items-center justify-center">
                <div className="absolute w-24 h-24 rounded-full bg-cyan-500/20 animate-spin" style={{ animationDuration: "8s" }} />
                <div className="absolute w-20 h-20 rounded-full bg-blue-500/25 animate-ping" style={{ animationDuration: "3s" }} />
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#063669] via-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-xl shadow-blue-500/25">
                  <Sparkles className="w-8 h-8 animate-spin" style={{ animationDuration: "6s" }} />
                </div>
              </div>

              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/50 text-[#063669] dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 uppercase tracking-wider">
                  <RotateCw className="w-3 h-3 animate-spin text-blue-600" />
                  AI Analyzing Recording
                  {retryAttempt > 1 && ` (Retry ${retryAttempt}/${maxRetries})`}
                </span>
                <h3 className="text-base font-bold text-slate-800 dark:text-zinc-100">
                  {leadName}
                </h3>
              </div>

              {/* Dynamic Rotating Milestone Card */}
              <div className="w-full bg-gradient-to-b from-blue-50/50 to-slate-50 dark:from-zinc-800/60 dark:to-zinc-900 border border-blue-100/80 dark:border-zinc-800 rounded-2xl p-4 flex items-center gap-3.5 transition-all duration-300 shadow-xs text-left">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/20">
                  <CurrentStepIcon className="w-5 h-5 animate-pulse" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-zinc-100 truncate">
                    {ENGAGEMENT_STEPS[activeStepIndex].title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                    {ENGAGEMENT_STEPS[activeStepIndex].description}
                  </p>
                </div>
              </div>

              {/* Step indicator dots */}
              <div className="flex items-center gap-1.5 pt-1">
                {ENGAGEMENT_STEPS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeStepIndex
                        ? "w-6 bg-[#063669] dark:bg-blue-500"
                        : "w-1.5 bg-slate-200 dark:bg-zinc-700"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/* 4. COMPLETED (SUCCESS) STATE                */}
          {/* ═══════════════════════════════════════════ */}
          {stage === "completed" && (
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8 animate-in zoom-in-50 duration-300" />
              </div>

              <div className="space-y-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 uppercase tracking-wider">
                  Call Analysis Complete
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-zinc-100">
                  {leadName}
                </h3>
              </div>

              <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-xs leading-relaxed">
                The conversation transcript, AI clinical summary, sentiments, and action points have been generated and saved.
              </p>

              <div className="flex items-center gap-2 pt-2 w-full">
                <Button
                  onClick={onViewDetails || onClose}
                  className="flex-1 bg-[#063669] hover:bg-[#052d58] text-white rounded-xl h-10 font-bold text-xs cursor-pointer shadow-sm"
                >
                  View Call Details
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="px-4 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-300 rounded-xl h-10 text-xs font-semibold cursor-pointer"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/* 5. ERROR / FAILED STATE                    */}
          {/* ═══════════════════════════════════════════ */}
          {stage === "error" && (
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-sm">
                <AlertCircle className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-900/50 uppercase tracking-wider">
                  Analysis Incomplete
                </span>
                <h3 className="text-base font-bold text-slate-800 dark:text-zinc-100">
                  {leadName}
                </h3>
              </div>

              <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-xs leading-relaxed">
                {errorMessage ||
                  "Unable to process the recording from telephony. You can retry the AI analysis or view raw call logs."}
              </p>

              <div className="flex items-center gap-2 pt-2 w-full">
                {onRetry && (
                  <Button
                    onClick={onRetry}
                    className="flex-1 bg-[#063669] hover:bg-[#052d58] text-white rounded-xl h-10 font-bold text-xs cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    Retry Analysis
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="px-4 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-300 rounded-xl h-10 text-xs font-semibold cursor-pointer"
                >
                  Close
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
