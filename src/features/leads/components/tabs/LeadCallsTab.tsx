import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown,
  Download,
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
  Sparkles,
  CheckCircle2,
  XCircle,
  ListChecks,
  MessageSquare,
  Users,
  ArrowDownLeft,
  Search,
  AlertTriangle,
  X,
  FileText,
  File,
  Phone
} from 'lucide-react';
import { cn } from '../../../../utils';
import { useMasterDataLookup } from '../../../../shared/hooks/useMasterDataLookup';
import type { LeadCall } from '../../types';
import type { CallSummaryJSON } from '../../types';
import { S3_BASE_URL } from "@/config/constants";
 
interface LeadCallsTabProps {
  calls?: LeadCall[];
  leadPhoneNumber?: string;
  objections?: number[];
  masterObjections?: any[];
}

const formatDuration = (seconds: number | null) => {
  if (!seconds) return '00m 00s';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
};

const formatTimeDisplay = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }) + ' • ' + d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getLast10Digits = (phone?: string | null) => {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  return digits.slice(-10);
};




export const LeadCallsTab = ({ calls, leadPhoneNumber, objections, masterObjections }: LeadCallsTabProps) => {  
  const { masterData: lookupMasterData, getRmLabel } = useMasterDataLookup();
  const [expandedCallIds, setExpandedCallIds] = useState<number[]>([1]);
  const [playingCallId, setPlayingCallId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeDownloadId, setActiveDownloadId] = useState<number | null>(null);
  const [callSummaries, setCallSummaries] = useState<Record<number, CallSummaryJSON>>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fetchedCallIds = useRef<Set<number>>(new Set());

  const displayObjections = React.useMemo(() => {
    if (objections && objections.length > 0 && masterObjections && masterObjections.length > 0) {
      return objections
        .map(id => {
          const masterObj = masterObjections.find((m: any) => m.id === id);
          if (masterObj) {
            return {
              title: masterObj.description,
              quote: ""
            };
          }
          return null;
        })
        .filter((o): o is { title: string; quote: string } => o !== null);
    }
    return null;
  }, [objections, masterObjections]);



  useEffect(() => {
    if (!calls) return;
    
    expandedCallIds.forEach(id => {
      if (!fetchedCallIds.current.has(id)) {
        fetchedCallIds.current.add(id);
        const call = calls.find(c => c.id === id);
        if (call) {
          fetch(getSummaryJsonUrl(call))
            .then(res => res.json())
            .then((data: CallSummaryJSON) => {
              setCallSummaries(prev => ({ ...prev, [call.id]: data }));
            })
            .catch(err => console.error(`Failed to fetch Summary JSON for Call ID ${call.id}:`, err));
        }
      }
    });
  }, [expandedCallIds, calls]);

  const getFullS3Path = (call: LeadCall) => {
    const path = call.call_s3_data || "";
    if (path.includes("recording.mp3") || path.includes("recording.m4a") || path.includes("/")) {
      return path;
    }
    if (path) {
      return `lead/${call.lead_uuid}/call/${path}/recording.mp3`;
    }
    return `lead/${call.lead_uuid}/call/1779973914078/recording.mp3`;
  };

  const getRecordingUrl = (call: LeadCall) => {
    return `${S3_BASE_URL}/${getFullS3Path(call)}`;
  };

  const replaceAudioWithFile = (s3Path: string, filename: string) => {
    if (s3Path.includes("recording.mp3")) {
      return s3Path.replace("recording.mp3", filename);
    }
    if (s3Path.includes("recording.m4a")) {
      return s3Path.replace("recording.m4a", filename);
    }
    const lastSlashIndex = s3Path.lastIndexOf("/");
    if (lastSlashIndex !== -1) {
      return s3Path.substring(0, lastSlashIndex + 1) + filename;
    }
    return s3Path;
  };

  const getSummaryPdfUrl = (call: LeadCall) => {
    return `${S3_BASE_URL}/${replaceAudioWithFile(getFullS3Path(call), "summary.pdf")}`;
  };

  const getSummaryDocUrl = (call: LeadCall) => {
    return `${S3_BASE_URL}/${replaceAudioWithFile(getFullS3Path(call), "summary.docx")}`;
  };

  const getSummaryJsonUrl = (call: LeadCall) => {
    return `${S3_BASE_URL}/${replaceAudioWithFile(getFullS3Path(call), "summary.json")}`;
  };

  const togglePlay = (e: React.MouseEvent, call: LeadCall) => {
    e.stopPropagation();
    
    if (playingCallId === call.id && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.ontimeupdate = null;
      }
      
      const newAudio = new Audio(getRecordingUrl(call));
      audioRef.current = newAudio;
      setCurrentTime(0);
      
      newAudio.onended = () => {
        setIsPlaying(false);
        setPlayingCallId(null);
        setCurrentTime(0);
      };
      
      newAudio.ontimeupdate = () => {
        setCurrentTime(newAudio.currentTime);
      };
      
      newAudio.play().then(() => {
        setPlayingCallId(call.id);
        setIsPlaying(true);
      }).catch(err => {
        console.error("Error playing audio:", err);
      });
    }
  };


  const handleDownload = (call: LeadCall) => {
    window.open(getSummaryDocUrl(call), "_blank");
  };

  return (
    <div className="-mx-6 -my-6 bg-[#F7F9FB] relative overflow-hidden font-['Inter']">
      
      {/* Scrollable Container */}
      <div className="h-[900px] overflow-y-auto overflow-x-hidden relative scrollbar-hide pb-24 bg-[rgba(249,250,251,0.3)]">
        
        {/* Main Content Area */}
        <div className="w-full px-6 md:px-10 pt-10 pb-24 relative space-y-8">
          
          {/* Breadcrumbs & Actions */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[20px] leading-[28px] text-[#063669]">
                Call History
              </h4>
            </div>
          </div>
          {(!calls || calls.length === 0) ? (
            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-12 text-center shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
              <p className="text-gray-500 font-medium">No calls available for this lead.</p>
            </div>
          ) : (
            calls.map(call => {
            const isExpanded = expandedCallIds.includes(call.id);
            const callType = getLast10Digits(call.from_number) === getLast10Digits(leadPhoneNumber) ? 'Incoming' : 'Outgoing';
            const callStatus = call.lead_call_status_id === 1 ? 'Connected' : 'Missed';
            const dateStr = formatDate(call.created_on);
            const durationStr = formatDuration(call.call_duration_in_seconds);
            
            const isThisCallPlaying = playingCallId === call.id;
            const progressPercent = isThisCallPlaying && call.call_duration_in_seconds 
              ? (currentTime / call.call_duration_in_seconds) * 100 
              : 0;
            const currentTimeDisplay = isThisCallPlaying ? formatTimeDisplay(currentTime) : "00:00";
            
            const summaryData = callSummaries[call.id];
            const objectionsToRender = displayObjections && displayObjections.length > 0
              ? displayObjections
              : [];
            
            const finalChecklist = summaryData?.checklist || [];
            const checklistCovered = finalChecklist.filter(i => i.covered).length;
            const checklistTotal = finalChecklist.length;
            const checklistPct = checklistTotal > 0 ? Math.round((checklistCovered / checklistTotal) * 100) : 0;
            
            const finalKeyPoints = summaryData?.keyPoints || [];
            
            const questions: any[] = (summaryData as any)?.allQuestions || [];
            const finalQuestions = questions.length > 0 
              ? questions.slice(0, 3).map((q: any) => typeof q === 'string' ? q.replace(/\[(AGENT|CUSTOMER)\]\s*/g, '') : q.question || q.text || '')
              : [];
            
            return (
              <div key={call.id} className="flex flex-col">
                {/* Accordion Header */}
                <div className="bg-white border border-[#E5E7EB] rounded-[12px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
                  <div 
                    className={cn(
                      "p-5 flex justify-between items-center cursor-pointer transition-colors",
                      isExpanded ? "rounded-t-[12px]" : "rounded-[12px] opacity-80 hover:opacity-100 hover:bg-gray-50"
                    )}
                    onClick={() => {
                      setExpandedCallIds(prev => 
                        prev.includes(call.id) 
                          ? prev.filter(id => id !== call.id)
                          : [...prev, call.id]
                      )
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        callType === 'Outgoing' ? "bg-[#DCFCE7]" : "bg-[#FFF7ED]"
                      )}>
                        {callType === 'Outgoing' ? (
                          <ArrowUpRight className="w-[18px] h-[18px] text-[#16A34A]" strokeWidth={3} />
                        ) : (
                          <ArrowDownLeft className="w-[18px] h-[18px] text-[#F97316]" strokeWidth={3} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-[16px] leading-[24px] text-[#063669]">
                          {callType} Call - {callStatus}
                        </h4>
                        <p className="font-normal text-[12px] leading-[16px] text-[#6B7280] flex items-center gap-2 mt-0.5">
                          <span>{dateStr}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-semibold text-[14px] leading-[20px] text-[#063669]">
                        {durationStr}
                      </span>

                      {isExpanded && (
                        <div className="flex items-center gap-3">
                          {/* Call ID Chip */}
                          <div className="bg-[#ECEEF0] rounded-[12px] px-3 py-1.5 flex items-center h-[28px]">
                            <span className="font-medium text-[12px] leading-[16px] text-[#64748B]">
                              Call ID: #{call.id}
                            </span>
                          </div>
                          
                          {/* Download Button & Popover */}
                          <div className="relative">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setActiveDownloadId(activeDownloadId === call.id ? null : call.id); }}
                              className="border border-[#063669] hover:bg-[#063669]/5 transition-colors rounded-lg px-4 py-1.5 h-[32px] flex items-center gap-2 text-[#063669]"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span className="font-semibold text-[13px] leading-[20px]">
                                Download
                              </span>
                            </button>

                            {/* Dropdown Menu */}
                            {activeDownloadId === call.id && (
                              <div 
                                className="absolute top-full right-0 mt-2 w-64 bg-white shadow-[0px_10px_30px_rgba(0,0,0,0.1)] border border-[#E5E7EB] rounded-[16px] p-5 z-50 flex flex-col"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {/* Header */}
                                <div className="flex justify-between items-center mb-4">
                                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] text-[#063669]">
                                    Download Options
                                  </span>
                                  <button 
                                    onClick={() => setActiveDownloadId(null)}
                                    className="text-[#64748B] hover:text-[#063669] transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>

                                {/* Options list */}
                                <div className="flex flex-col divide-y divide-[#F1F5F9]">
                                  {/* PDF */}
                                  <button
                                    className="flex items-center justify-between py-3 hover:bg-[#F8FAFC] px-2 -mx-2 rounded-lg transition-colors group text-left"
                                    onClick={() => { window.open(getSummaryPdfUrl(call), "_blank"); setActiveDownloadId(null); }}
                                  >
                                    <div className="flex items-center gap-3">
                                      <FileText className="w-5 h-5 text-[#64748B] group-hover:text-[#063669] transition-colors" />
                                      <span className="font-semibold text-[14px] text-[#063669]">
                                        PDF
                                      </span>
                                    </div>
                                    <Download className="w-[18px] h-[18px] text-[#64748B] group-hover:text-[#063669] transition-colors" />
                                  </button>

                                  {/* Call Recording */}
                                  <button
                                    className="flex items-center justify-between py-3 hover:bg-[#F8FAFC] px-2 -mx-2 rounded-lg transition-colors group text-left"
                                    onClick={() => { window.open(getRecordingUrl(call), "_blank"); setActiveDownloadId(null); }}
                                  >
                                    <div className="flex items-center gap-3">
                                      <Phone className="w-5 h-5 text-[#64748B] group-hover:text-[#063669] transition-colors" />
                                      <span className="font-semibold text-[14px] text-[#063669]">
                                        Call Recording
                                      </span>
                                    </div>
                                    <Download className="w-[18px] h-[18px] text-[#64748B] group-hover:text-[#063669] transition-colors" />
                                  </button>

                                  {/* Doc.file */}
                                  <button
                                    className="flex items-center justify-between py-3 hover:bg-[#F8FAFC] px-2 -mx-2 rounded-lg transition-colors group text-left"
                                    onClick={() => { window.open(getSummaryDocUrl(call), "_blank"); setActiveDownloadId(null); }}
                                  >
                                    <div className="flex items-center gap-3">
                                      <File className="w-5 h-5 text-[#64748B] group-hover:text-[#063669] transition-colors" />
                                      <span className="font-semibold text-[14px] text-[#063669]">
                                        Doc.file
                                      </span>
                                    </div>
                                    <Download className="w-[18px] h-[18px] text-[#64748B] group-hover:text-[#063669] transition-colors" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <ChevronDown className={cn("w-5 h-5 text-[#6B7280] transition-transform", isExpanded && "rotate-180")} />
                    </div>
                  </div>

                  {/* Audio Player Controls */}
                  <div 
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden rounded-b-[12px]">
                      <div className="bg-[#F9FAFB] border-t border-[#E5E7EB] p-5 flex items-center gap-6">
                        <button 
                          onClick={(e) => togglePlay(e, call)}
                          className="w-10 h-10 rounded-full bg-[#063669] hover:bg-[#052b54] flex items-center justify-center text-white shadow-sm hover:scale-105 active:scale-95 transition-all shrink-0"
                        >
                          {playingCallId === call.id && isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                        </button>

                        <div className="flex-1 flex items-center gap-3">
                          <span className="font-semibold text-[13px] text-[#063669] shrink-0">
                            {currentTimeDisplay}
                          </span>
                          <div className="flex-1 h-1.5 bg-[#E5E7EB] rounded-full relative overflow-hidden">
                            <div 
                              className="absolute left-0 top-0 bottom-0 bg-[#063669] rounded-full transition-all duration-100 ease-linear"
                              style={{ width: `${Math.min(progressPercent, 100)}%` }}
                            ></div>
                          </div>
                          <span className="font-medium text-[13px] text-[#6B7280] shrink-0">
                            {formatTimeDisplay(call.call_duration_in_seconds || 0)}
                          </span>
                        </div>

                        <button className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#063669] shrink-0">
                          <Volume2 className="w-[18px] h-[18px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details Content */}
                <div 
                  className={cn(
                    "grid transition-all duration-500 ease-in-out",
                    isExpanded ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-6 pb-2">
                      {/* ROW 1: MOOD & SENTIMENT ANALYSIS */}
                      <div className="bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* MOOD ANALYSIS */}
                        <div className="space-y-4">
                          <span className="font-['Inter'] font-bold text-[10px] leading-[15px] tracking-[1.5px] uppercase text-[#94A3B8] block">
                            MOOD ANALYSIS
                          </span>
                          <div>
                            <div className="flex items-baseline">
                              <span className="text-4xl font-extrabold text-[#1E293B]">
                                {summaryData?.tone_based_mood_analaysis?.moodScore || "7.8"}
                              </span>
                              <span className="text-sm font-medium text-[#94A3B8] ml-1">
                                / 10
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                              <span className="font-bold text-sm text-[#1E3A8A]">
                                {summaryData?.tone_based_mood_analaysis?.moodAnalysis || "Curious"}
                              </span>
                            </div>
                            {summaryData?.tone_based_mood_analaysis?.moodAnalysis && (
                              <p className="text-xs text-[#64748B] leading-relaxed mt-3">
                                Context: 'Customer demonstrated {summaryData.tone_based_mood_analaysis.moodAnalysis.toLowerCase()} tone during the call'
                              </p>
                            )}
                          </div>
                        </div>

                        {/* SENTIMENT ANALYSIS */}
                        <div className="space-y-4 md:border-l md:border-zinc-100 md:pl-8">
                          <span className="font-['Inter'] font-bold text-[10px] leading-[15px] tracking-[1.5px] uppercase text-[#94A3B8] block">
                            SENTIMENT ANALYSIS
                          </span>
                          <div>
                            <div className="flex items-center gap-3">
                              <span className={cn(
                                "font-bold text-[11px] uppercase px-2.5 py-1 rounded-[6px] tracking-wider",
                                (summaryData?.sentiment?.overall || "N/A").toLowerCase() === 'positive' 
                                  ? "bg-[#EFF6FF] text-[#1E40AF]" 
                                  : "bg-[#FEF2F2] text-[#991B1B]"
                              )}>
                                {(summaryData?.sentiment?.overall || "N/A").toUpperCase()}
                              </span>
                              <span className="font-bold text-sm text-[#1E293B]">
                                Score: {summaryData?.sentiment?.score 
                                  ? (summaryData.sentiment.score.includes('/') ? summaryData.sentiment.score : `${summaryData.sentiment.score} / 10`) 
                                  : "N/A"}
                              </span>
                            </div>
                            {summaryData?.sentiment?.reason && (
                              <p className="text-xs text-[#475569] leading-relaxed mt-4">
                                <span className="font-bold text-[#1E293B]">Reason:</span> {summaryData.sentiment.reason}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* ROW 2: DETECTED OBJECTIONS */}
                      <div className="bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] p-6 md:p-8 space-y-4">
                        <span className="font-['Inter'] font-bold text-[10px] leading-[15px] tracking-[1.5px] uppercase text-[#94A3B8] block">
                          DETECTED OBJECTIONS ({objectionsToRender.length})
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {objectionsToRender.length === 0 ? (
                            <p className="text-xs text-slate-400 font-medium italic col-span-full">No objections detected on this call.</p>
                          ) : (
                            objectionsToRender.map((objection, index) => (
                              <div key={index} className="bg-[#F8FAFC] border border-zinc-100 rounded-xl p-4 flex flex-col justify-between">
                                <div>
                                  <div className="flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                                    <span className="font-bold text-xs text-[#1E293B]">
                                      {objection.title}
                                    </span>
                                  </div>
                                  {objection.quote && (
                                    <p className="text-[11px] text-[#64748B] italic mt-2 leading-relaxed">
                                      "{objection.quote}"
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* ROW 3: CHECKLIST & KEY DETAILS */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* AGENT CHECKLIST */}
                        <div className="lg:col-span-2 bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] p-6 md:p-8 space-y-6">
                          <div className="flex justify-between items-center">
                            <h2 className="font-bold text-[18px] md:text-[20px] leading-[28px] text-[#1E293B]">
                              Agent Checklist
                            </h2>
                            <div className={cn(
                              "border rounded-[16px] px-3.5 py-1.5 flex items-center gap-2", 
                              checklistPct >= 50 
                                ? "bg-[#DCFCE7] border-[#BBF7D0] text-[#16A34A]" 
                                : "bg-[#FEF2F2] border-[#FEE2E2] text-[#EF4444]"
                            )}>
                              <span className="font-bold text-[10px] md:text-xs uppercase tracking-wider">
                                {checklistPct}% • {checklistCovered}/{checklistTotal} Checklist Met
                              </span>
                            </div>
                          </div>

                          <div className="space-y-4">
                            {finalChecklist.length === 0 ? (
                              <p className="text-xs text-slate-400 font-medium italic">No checklist items generated.</p>
                            ) : (
                              finalChecklist.map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                  <div className="mt-1 shrink-0">
                                    {item.covered ? (
                                      <div className="w-5 h-5 rounded-full bg-[#DCFCE7] flex items-center justify-center">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                                      </div>
                                    ) : (
                                      <div className="w-5 h-5 rounded-full bg-[#FEE2E2] flex items-center justify-center">
                                        <XCircle className="w-3.5 h-3.5 text-[#DC2626]" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 space-y-2">
                                    <h4 className="font-bold text-sm text-[#1F2937]">
                                      {item.point}
                                    </h4>
                                    <div className={cn(
                                      "bg-[#F9FAFB] border-l-[3px] rounded-r-lg rounded-l p-3", 
                                      item.covered ? "border-[#22C55E]" : "border-[#EF4444]"
                                    )}>
                                      <p className="font-['Inter'] italic font-normal text-xs text-[#4B5563] leading-relaxed">
                                        "{item.evidence}"
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* KEY DETAILS PANEL */}
                        <div className="bg-white border border-[#E5E7EB] rounded-[16px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] p-6 md:p-8 flex flex-col justify-between gap-6">
                          {/* KEY POINTS MENTIONED */}
                          <div className="space-y-3">
                            <span className="font-['Inter'] font-bold text-[10px] leading-[15px] tracking-[1.5px] uppercase text-[#94A3B8] block">
                              KEY POINTS MENTIONED
                            </span>
                            {finalKeyPoints.length === 0 ? (
                              <p className="text-xs text-slate-400 font-medium italic">No key points captured.</p>
                            ) : (
                              <ul className="space-y-2.5">
                                {finalKeyPoints.map((kp, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                                    <p className="font-medium text-xs text-[#475569] leading-normal">
                                      {kp}
                                    </p>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>

                          {/* QUESTIONS DISCUSSED */}
                          <div className="space-y-3">
                            <span className="font-['Inter'] font-bold text-[10px] leading-[15px] tracking-[1.5px] uppercase text-[#94A3B8] block">
                              QUESTIONS DISCUSSED
                            </span>
                            {finalQuestions.length === 0 ? (
                              <p className="text-xs text-slate-400 font-medium italic">No questions captured.</p>
                            ) : (
                              <div className="flex flex-wrap gap-2">
                                {finalQuestions.map((q: any, idx: number) => (
                                  <div key={idx} className="bg-[#F1F5F9] text-[#475569] text-xs font-semibold px-3 py-1.5 rounded-full">
                                    {q}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* SPEAKER ENGAGEMENT */}
                          <div className="space-y-2 pt-2 border-t border-zinc-100">
                            <span className="font-['Inter'] font-bold text-[10px] leading-[15px] tracking-[1.5px] uppercase text-[#94A3B8] block">
                              SPEAKER ENGAGEMENT
                            </span>
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-xs text-[#475569]">Agent Engagement</span>
                              <span className="font-bold text-xs text-[#1E3A8A]">92% High</span>
                            </div>
                            <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                              <div className="bg-[#1E3A8A] h-full rounded-full" style={{ width: "92%" }} />
                            </div>
                            <span className="text-[11px] text-[#64748B] mt-1.5 block leading-normal italic">
                              Customer spoke for 92% of the duration.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }))}

        </div>
      </div>
    </div>
  );
};
