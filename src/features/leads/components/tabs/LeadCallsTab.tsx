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
  Phone,
  Building,
  Calendar,
  Clock,
  Stethoscope,
  Activity,
  HeartPulse,
  History,
  Check,
  User,
  MessageCircle,
  Loader2,
  RefreshCw,
  AlertCircle,
  ClipboardCheck
} from 'lucide-react';
import { cn } from '../../../../utils';
import { useMasterDataLookup } from '../../../../shared/hooks/useMasterDataLookup';
import { useGetCallRecordsMutation } from '../../api/callsApi';
import { useAnalyzeCallMutation } from '../../../call-analyzer/api/callAnalyzerApiSlice';
import type { LeadCall, Lead } from '../../types';
import type { CallSummaryJSON } from '../../types';
import { S3_BASE_URL } from "@/config/constants";

interface CallProcessingState {
  status: 'idle' | 'fetching_record' | 'analyzing' | 'not_found' | 'error';
  errorMessage?: string;
}

interface LeadCallsTabProps {
  calls?: LeadCall[];
  leadPhoneNumber?: string;
  objections?: number[];
  masterObjections?: any[];
  lead?: Lead;
  refetch?: () => void;
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

const parseTranscript = (rawTranscript?: string) => {
  if (!rawTranscript) return [];
  const lines = rawTranscript.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  return lines.map((line, idx) => {
    if (line.toLowerCase().startsWith('agent:')) {
      return {
        id: idx,
        speaker: 'Agent',
        text: line.replace(/^agent:\s*/i, '').trim(),
        isAgent: true,
      };
    } else if (line.toLowerCase().startsWith('patient:') || line.toLowerCase().startsWith('caller:')) {
      return {
        id: idx,
        speaker: 'Patient',
        text: line.replace(/^(patient|caller):\s*/i, '').trim(),
        isAgent: false,
      };
    }
    return {
      id: idx,
      speaker: 'Speaker',
      text: line,
      isAgent: false,
    };
  });
};

const getSeverityBadgeClass = (severity?: string) => {
  const sev = (severity || "").toLowerCase();
  if (sev.includes("severe") || sev.includes("high") || sev.includes("acute")) {
    return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-900";
  }
  if (sev.includes("moderate") || sev.includes("med")) {
    return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-900";
  }
  return "bg-blue-50 text-[#063669] border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-900";
};

export interface NormalizedChecklistItem {
  id?: number | string;
  point: string;
  covered: boolean;
  evidence?: string;
  reason?: string;
}

const isTruthyValue = (val: any): boolean => {
  if (typeof val === 'boolean') return val;
  if (typeof val === 'number') return val > 0;
  if (typeof val === 'string') {
    const s = val.trim().toLowerCase();
    return s === 'true' || s === 'yes' || s === 'covered' || s === 'pass' || s === 'passed' || s === '1' || s === 'y' || s === 'checked';
  }
  return Boolean(val);
};

const normalizeChecklist = (summaryData?: CallSummaryJSON | null): NormalizedChecklistItem[] => {
  if (!summaryData) return [];

  const rawList =
    summaryData.checklist ||
    (summaryData as any).agent_checklist ||
    (summaryData as any).check_list ||
    (summaryData as any).checklist_items ||
    (summaryData as any).checklistPoints ||
    (summaryData as any).evaluation_checklist;

  // Case 1: Array of items
  if (Array.isArray(rawList) && rawList.length > 0) {
    return rawList.map((item: any, idx: number) => {
      if (typeof item === 'string') {
        return {
          id: idx + 1,
          point: item,
          covered: true,
          evidence: undefined,
        };
      }
      if (typeof item === 'object' && item !== null) {
        const point = item.description || item.point || item.item || item.question || item.title || item.checklist_item || item.text || item.name || `Checklist Item ${idx + 1}`;
        const rawCovered = item.checked ?? item.covered ?? item.is_covered ?? item.status ?? item.pass ?? item.result;
        const covered = isTruthyValue(rawCovered);
        const evidence = item.details || item.evidence || item.quote || item.text_evidence || '';
        const reason = item.reason || item.notes || item.explanation || item.remark || '';
        return {
          id: item.id || idx + 1,
          point: String(point),
          covered,
          evidence: evidence ? String(evidence) : undefined,
          reason: reason ? String(reason) : undefined,
        };
      }
      return {
        id: idx + 1,
        point: String(item),
        covered: false,
      };
    });
  }

  // Case 2: Object dictionary format: { "Did agent greet?": true, ... }
  if (rawList && typeof rawList === 'object' && !Array.isArray(rawList)) {
    return Object.entries(rawList).map(([key, val]: [string, any], idx: number) => {
      if (typeof val === 'object' && val !== null) {
        const rawCovered = val.checked ?? val.covered ?? val.is_covered ?? val.status ?? val.pass;
        const evidence = val.details || val.evidence || val.quote;
        const reason = val.reason || val.notes || val.explanation;
        return {
          id: val.id || idx + 1,
          point: key,
          covered: isTruthyValue(rawCovered),
          evidence: evidence ? String(evidence) : undefined,
          reason: reason ? String(reason) : undefined,
        };
      }
      return {
        id: idx + 1,
        point: key,
        covered: isTruthyValue(val),
      };
    });
  }

  return [];
};

export const LeadCallsTab = ({ calls, leadPhoneNumber, objections, masterObjections, lead, refetch }: LeadCallsTabProps) => {
  const { masterData: lookupMasterData, getRmLabel } = useMasterDataLookup();
  const [getCallRecords] = useGetCallRecordsMutation();
  const [analyzeCall] = useAnalyzeCallMutation();
  const [expandedCallIds, setExpandedCallIds] = useState<number[]>(() => {
    if (calls && calls.length > 0) return [calls[0].id];
    return [];
  });
  const [playingCallId, setPlayingCallId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeDownloadId, setActiveDownloadId] = useState<number | null>(null);
  const [callSummaries, setCallSummaries] = useState<Record<number, CallSummaryJSON>>({});
  const [summaryLoading, setSummaryLoading] = useState<Record<number, boolean>>({});
  const [callProcessing, setCallProcessing] = useState<Record<number, CallProcessingState>>({});
  const inFlightCallIds = useRef<Set<number>>(new Set());
  const attemptedCallIds = useRef<Set<number>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fetchedCallIds = useRef<Set<number>>(new Set());
  const [checklistFilters, setChecklistFilters] = useState<Record<number, 'all' | 'covered' | 'missed'>>({});

  const processUnanalyzedCall = async (call: LeadCall, isManualRetry = false) => {
    const rawCallId = (call as any).call_id || call.id;
    if (!rawCallId) return;

    if (inFlightCallIds.current.has(call.id)) return;
    if (!isManualRetry && attemptedCallIds.current.has(call.id)) return;

    inFlightCallIds.current.add(call.id);
    attemptedCallIds.current.add(call.id);

    setCallProcessing(prev => ({
      ...prev,
      [call.id]: { status: 'fetching_record' },
    }));

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const maxRetries = 3;

    try {
      // Step 1: Query call-records by call_id with automatic retries
      let foundRecord: any = null;
      let cleanUrl = "";

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const res = await getCallRecords({ call_id: rawCallId }).unwrap();

          foundRecord = (() => {
            if (!res) return null;
            if (res.data && typeof res.data === "object" && !Array.isArray(res.data)) {
              if (Array.isArray(res.data.results)) {
                return res.data.results.find((r: any) => Boolean(r && (r.recording_url || r.call_id || r.id)));
              }
              if (res.data.recording_url || res.data.call_id || res.data.id || res.data.answered_seconds !== undefined) {
                return res.data;
              }
            }
            if (Array.isArray(res?.results)) {
              return res.results.find((r: any) => Boolean(r && (r.recording_url || r.call_id || r.id)));
            }
            if (Array.isArray(res?.data)) {
              return res.data.find((r: any) => Boolean(r && (r.recording_url || r.call_id || r.id)));
            }
            if (Array.isArray(res)) {
              return res.find((r: any) => Boolean(r && (r.recording_url || r.call_id || r.id)));
            }
            if (typeof res === "object" && !Array.isArray(res) && (res.recording_url || res.call_id || res.id)) {
              return res;
            }
            return null;
          })();

          const rawUrl = foundRecord?.recording_url || null;
          cleanUrl = rawUrl ? String(rawUrl).replace(/["']+/g, "").trim() : "";

          if (cleanUrl) {
            break;
          }
        } catch (e) {
          console.warn(`[LeadCallsTab] Attempt ${attempt} failed fetching call records:`, e);
        }

        if (attempt < maxRetries) {
          await delay(2500);
        }
      }

      if (!cleanUrl) {
        setCallProcessing(prev => ({
          ...prev,
          [call.id]: {
            status: 'not_found',
            errorMessage: 'Call record or recording is unavailable in telephony system.',
          },
        }));
        inFlightCallIds.current.delete(call.id);
        return;
      }

      // Step 2: Send recording URL to Call Analyzer API with automatic retries
      setCallProcessing(prev => ({
        ...prev,
        [call.id]: { status: 'analyzing' },
      }));

      const leadName = lead
        ? `${lead.first_name || ""} ${lead.last_name || ""}`.trim() || "Lead"
        : "Lead";
      const leadUuid = lead?.uuid || call.lead_uuid;
      const cleanPhone = (num?: string | null) =>
        String(num || "").trim().replace(/^\+91/, "").replace(/^\+/, "").trim();
      const fromNumber = cleanPhone(
        foundRecord?.agent_number || foundRecord?.from_number || call.from_number || lead?.phone_number || ""
      );
      const toNumber = cleanPhone(
        foundRecord?.client_number || foundRecord?.to_number || call.to_number || ""
      );

      let analyzeSuccess = false;
      let lastError: any = null;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          await analyzeCall({
            call_id: rawCallId,
            lead_uuid: leadUuid,
            lead_name: leadName,
            from_number: fromNumber,
            to_number: toNumber,
            file: cleanUrl,
          }).unwrap();
          analyzeSuccess = true;
          break;
        } catch (err: any) {
          lastError = err;
          console.warn(`[LeadCallsTab] Attempt ${attempt} failed analyzing call:`, err);
          if (attempt < maxRetries) {
            await delay(2500);
          }
        }
      }

      if (!analyzeSuccess) {
        throw lastError || new Error("Failed to analyze call recording after retries");
      }

      // Step 3: Success -> Clear in-flight and refresh lead details
      setCallProcessing(prev => ({
        ...prev,
        [call.id]: { status: 'idle' },
      }));
      inFlightCallIds.current.delete(call.id);
      if (refetch) {
        refetch();
      }
    } catch (err: any) {
      console.error(`Error analyzing call recording for call ${call.id}:`, err);
      setCallProcessing(prev => ({
        ...prev,
        [call.id]: {
          status: 'error',
          errorMessage: err?.data?.message || err?.message || 'Failed to analyze call recording',
        },
      }));
      inFlightCallIds.current.delete(call.id);
    }
  };

  // Automatically scan and trigger analysis for calls missing call_s3_data
  useEffect(() => {
    if (!calls || calls.length === 0) return;

    calls.forEach(call => {
      if (!call.call_s3_data) {
        const state = callProcessing[call.id];
        if (!state && !inFlightCallIds.current.has(call.id) && !attemptedCallIds.current.has(call.id)) {
          processUnanalyzedCall(call, false);
        }
      }
    });
  }, [calls]);

  // Auto-expand first call if none expanded
  useEffect(() => {
    if (calls && calls.length > 0) {
      setExpandedCallIds(prev => (prev.length === 0 ? [calls[0].id] : prev));
    }
  }, [calls]);

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

  const buildS3Url = (relativePath: string) => {
    if (!relativePath) return '';
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }
    const base = S3_BASE_URL.replace(/\/+$/, '');
    const cleanPath = relativePath.replace(/^\/+/, '');
    return `${base}/${cleanPath}`;
  };

  const getFullS3Path = (call: LeadCall) => {
    const path = call.call_s3_data || "";
    if (!path) return "";
    if (path.includes("/")) {
      return path;
    }
    if (call.lead_uuid) {
      return `lead/${call.lead_uuid}/call/${path}/recording.mpeg`;
    }
    return "";
  };

  const replaceAudioWithFile = (s3Path: string, filename: string) => {
    if (!s3Path) return "";
    const lastSlashIndex = s3Path.lastIndexOf("/");
    if (lastSlashIndex !== -1) {
      return s3Path.substring(0, lastSlashIndex + 1) + filename;
    }
    return "";
  };

  const getRecordingUrl = (call: LeadCall) => {
    const s3Path = getFullS3Path(call);
    return s3Path ? buildS3Url(s3Path) : "";
  };

  const getSummaryPdfUrl = (call: LeadCall) => {
    const s3Path = replaceAudioWithFile(getFullS3Path(call), "summary.pdf");
    return s3Path ? buildS3Url(s3Path) : "";
  };

  const getSummaryTxtUrl = (call: LeadCall) => {
    const s3Path = replaceAudioWithFile(getFullS3Path(call), "summary.txt");
    return s3Path ? buildS3Url(s3Path) : "";
  };

  const getSummaryJsonUrl = (call: LeadCall) => {
    const s3Path = replaceAudioWithFile(getFullS3Path(call), "summary.json");
    return s3Path ? buildS3Url(s3Path) : "";
  };

  useEffect(() => {
    if (!calls || calls.length === 0) return;

    // Parse call.call_summary if present in payload
    calls.forEach(call => {
      if (call.call_summary) {
        if (typeof call.call_summary === 'object') {
          setCallSummaries(prev => {
            if (prev[call.id]) return prev;
            return { ...prev, [call.id]: call.call_summary as any };
          });
        } else if (typeof call.call_summary === 'string' && call.call_summary.trim().startsWith('{')) {
          try {
            const parsed = JSON.parse(call.call_summary);
            if (parsed && typeof parsed === 'object') {
              setCallSummaries(prev => {
                if (prev[call.id]) return prev;
                return { ...prev, [call.id]: parsed };
              });
            }
          } catch {
            // not JSON, fallback to S3
          }
        }
      }
    });

    expandedCallIds.forEach(id => {
      if (!fetchedCallIds.current.has(id)) {
        const call = calls.find(c => c.id === id);
        if (call) {
          if (callSummaries[id]) {
            fetchedCallIds.current.add(id);
            return;
          }
          const summaryUrl = getSummaryJsonUrl(call);
          if (summaryUrl) {
            fetchedCallIds.current.add(id);
            setSummaryLoading(prev => ({ ...prev, [id]: true }));
            fetch(summaryUrl)
              .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
              })
              .then((data: CallSummaryJSON) => {
                if (data && typeof data === 'object') {
                  setCallSummaries(prev => ({ ...prev, [call.id]: data }));
                }
              })
              .catch(err => {
                console.warn(`Failed to fetch Summary JSON for Call ID ${call.id}:`, err);
              })
              .finally(() => {
                setSummaryLoading(prev => ({ ...prev, [id]: false }));
              });
          }
        }
      }
    });
  }, [expandedCallIds, calls, callSummaries]);

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
    window.open(getSummaryPdfUrl(call), "_blank");
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
            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-12 text-center">
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
              const isFetchingSummary = summaryLoading[call.id];

              const finalChecklist = normalizeChecklist(summaryData);
              const checklistCovered = finalChecklist.filter(i => i.covered).length;
              const checklistTotal = finalChecklist.length;
              const checklistPct = checklistTotal > 0 ? Math.round((checklistCovered / checklistTotal) * 100) : 0;

              const finalKeyPoints = summaryData?.keyPoints || [];

              const questions: any[] = (summaryData as any)?.allQuestions || [];
              const finalQuestions = questions.length > 0
                ? questions.slice(0, 3).map((q: any) => typeof q === 'string' ? q.replace(/\[(AGENT|CUSTOMER)\]\s*/g, '') : q.question || q.text || '')
                : [];

              const hasSummary = Boolean(
                summaryData && (
                  summaryData.overview ||
                  (summaryData.symptoms && summaryData.symptoms.length > 0) ||
                  summaryData.confirmed_details ||
                  (summaryData.follow_up_plan && summaryData.follow_up_plan.length > 0) ||
                  summaryData.complete_transcript ||
                  summaryData.sentiment ||
                  finalChecklist.length > 0 ||
                  finalKeyPoints.length > 0 ||
                  finalQuestions.length > 0
                )
              );

              const objectionsToRender = (hasSummary && displayObjections && displayObjections.length > 0)
                ? displayObjections
                : [];

              return (
                <div key={call.id} className="flex flex-col">
                  {/* Accordion Header */}
                  <div className="bg-white border border-[#E5E7EB] rounded-[12px]">
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
                                      className="flex items-center justify-between py-3 hover:bg-[#F8FAFC] px-2 -mx-2 rounded-lg transition-colors group text-left cursor-pointer"
                                      onClick={() => { window.open(getSummaryPdfUrl(call), "_blank"); setActiveDownloadId(null); }}
                                    >
                                      <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-[#64748B] group-hover:text-[#063669] transition-colors" />
                                        <span className="font-semibold text-[14px] text-[#063669]">
                                          PDF Summary
                                        </span>
                                      </div>
                                      <Download className="w-[18px] h-[18px] text-[#64748B] group-hover:text-[#063669] transition-colors" />
                                    </button>

                                    {/* Text Summary */}
                                    <button
                                      className="flex items-center justify-between py-3 hover:bg-[#F8FAFC] px-2 -mx-2 rounded-lg transition-colors group text-left cursor-pointer"
                                      onClick={() => { window.open(getSummaryTxtUrl(call), "_blank"); setActiveDownloadId(null); }}
                                    >
                                      <div className="flex items-center gap-3">
                                        <File className="w-5 h-5 text-[#64748B] group-hover:text-[#063669] transition-colors" />
                                        <span className="font-semibold text-[14px] text-[#063669]">
                                          Text Summary (.txt)
                                        </span>
                                      </div>
                                      <Download className="w-[18px] h-[18px] text-[#64748B] group-hover:text-[#063669] transition-colors" />
                                    </button>

                                    {/* Call Recording */}
                                    <button
                                      className="flex items-center justify-between py-3 hover:bg-[#F8FAFC] px-2 -mx-2 rounded-lg transition-colors group text-left cursor-pointer"
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
                        {(() => {
                          const procState = callProcessing[call.id];
                          const isProcessing = procState?.status === 'fetching_record' || procState?.status === 'analyzing';

                          if (isProcessing) {
                            return (
                              <div className="bg-[#F9FAFB] border-t border-[#E5E7EB] p-4 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-6 h-6 rounded-full bg-[#063669]/10 flex items-center justify-center">
                                    <Loader2 className="w-3.5 h-3.5 text-[#063669] animate-spin" />
                                  </div>
                                  <span className="font-semibold text-xs text-[#063669]">
                                    Processing call recording...
                                  </span>
                                </div>
                              </div>
                            );
                          }

                          if (!call.call_s3_data) {
                            return (
                              <div className="bg-[#F9FAFB] border-t border-[#E5E7EB] p-4 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                  <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
                                  <span className="text-xs text-slate-500 font-medium">
                                    {procState?.status === 'not_found'
                                      ? 'Call record not found'
                                      : procState?.status === 'error'
                                        ? 'Call analysis failed'
                                        : 'Call recording pending analysis'}
                                  </span>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    processUnanalyzedCall(call, true);
                                  }}
                                  className="text-xs text-[#063669] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                  <RefreshCw className="w-3 h-3" />
                                  <span>{procState?.status === 'error' ? 'Retry Analysis' : 'Check Recording'}</span>
                                </button>
                              </div>
                            );
                          }

                          return (
                            <div className="bg-[#F9FAFB] border-t border-[#E5E7EB] p-5 flex items-center gap-6">
                              <button
                                onClick={(e) => togglePlay(e, call)}
                                className="w-10 h-10 rounded-full bg-[#063669] hover:bg-[#052b54] flex items-center justify-center text-white shadow-sm hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
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
                          );
                        })()}
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
                      {(() => {
                        const procState = callProcessing[call.id];
                        const isProcessing = procState?.status === 'fetching_record' || procState?.status === 'analyzing';

                        if (isProcessing) {
                          return (
                            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-8 text-center flex flex-col items-center justify-center space-y-3">
                              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#063669] mb-1">
                                <Loader2 className="w-5 h-5 text-[#063669] animate-spin" />
                              </div>
                              <h4 className="font-bold text-sm text-[#063669]">Analyzing Call Recording</h4>
                              <p className="text-xs text-slate-500 max-w-sm">
                                Retrieving conversation audio and compiling AI summary & insights...
                              </p>
                            </div>
                          );
                        }

                        if (procState?.status === 'not_found') {
                          return (
                            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-8 text-center flex flex-col items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                                <AlertCircle className="w-6 h-6 text-slate-400" />
                              </div>
                              <h4 className="font-bold text-sm text-[#063669]">Call Record Not Found</h4>
                              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                                {procState.errorMessage || "No telephony recording was found for this call ID in Tata Telephony records."}
                              </p>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  processUnanalyzedCall(call, true);
                                }}
                                className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#063669] bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                              >
                                <RefreshCw className="w-3.5 h-3.5" />
                                <span>Check Again</span>
                              </button>
                            </div>
                          );
                        }

                        if (procState?.status === 'error') {
                          return (
                            <div className="bg-white border border-rose-100 rounded-[16px] p-8 text-center flex flex-col items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mb-3">
                                <AlertTriangle className="w-6 h-6 text-rose-500" />
                              </div>
                              <h4 className="font-bold text-sm text-rose-900">Call Analysis Failed</h4>
                              <p className="text-xs text-rose-600 mt-1 max-w-sm">
                                {procState.errorMessage || 'An error occurred while analyzing the call recording.'}
                              </p>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  processUnanalyzedCall(call, true);
                                }}
                                className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#063669] hover:bg-[#042548] transition-colors cursor-pointer"
                              >
                                <RefreshCw className="w-3.5 h-3.5" />
                                <span>Retry Analysis</span>
                              </button>
                            </div>
                          );
                        }

                        if (isFetchingSummary) {
                          return (
                            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-10 text-center flex flex-col items-center justify-center">
                              <div className="w-8 h-8 border-2 border-[#063669] border-t-transparent rounded-full animate-spin mb-3" />
                              <p className="text-xs font-bold text-[#063669]">Loading Call Analysis...</p>
                              <p className="text-[11px] text-slate-400 mt-1">Retrieving AI summary and insights from recording</p>
                            </div>
                          );
                        }

                        if (!hasSummary) {
                          return (
                            <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-8 text-center flex flex-col items-center justify-center">
                              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                                <Sparkles className="w-5 h-5 text-slate-400" />
                              </div>
                              <h4 className="font-bold text-sm text-[#063669]">AI Analysis Unavailable</h4>
                              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                                No AI summary or transcript has been generated for this call recording yet.
                              </p>
                              {!call.call_s3_data && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    processUnanalyzedCall(call, true);
                                  }}
                                  className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#063669] bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                                >
                                  <Sparkles className="w-3.5 h-3.5" />
                                  <span>Analyze Call Recording</span>
                                </button>
                              )}
                            </div>
                          );
                        }

                        return (
                          <div className="space-y-6 pb-2">
                            {/* SECTION 1: CLINICAL OVERVIEW & SENTIMENT */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                              {/* Clinical Overview */}
                              <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-[16px] p-6 flex flex-col justify-between">
                                <div>
                                  <div className="flex items-center justify-between gap-2 mb-3">
                                    <div className="flex items-center gap-2">
                                      <div className="w-7 h-7 rounded-lg bg-[#063669]/10 flex items-center justify-center text-[#063669]">
                                        <Sparkles className="w-4 h-4" />
                                      </div>
                                      <span className="font-['Inter'] font-bold text-[11px] leading-[15px] tracking-[1.5px] uppercase text-[#063669]">
                                        CLINICAL CALL OVERVIEW
                                      </span>
                                    </div>
                                    {summaryData?.total_call_time && (
                                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                                        Duration: {summaryData.total_call_time}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                    {summaryData?.overview || "No clinical overview provided for this call."}
                                  </p>
                                </div>
                              </div>

                              {/* Sentiment Analysis */}
                              <div className="lg:col-span-5 bg-white border border-[#E5E7EB] rounded-[16px] p-6 flex flex-col justify-between">
                                <div>
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                        <Activity className="w-4 h-4" />
                                      </div>
                                      <span className="font-['Inter'] font-bold text-[11px] leading-[15px] tracking-[1.5px] uppercase text-[#64748B]">
                                        SENTIMENT & QUALITY
                                      </span>
                                    </div>
                                    {summaryData?.sentiment?.score && (
                                      <span className="font-bold text-xs bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2.5 py-1 rounded-full">
                                        Score: {summaryData.sentiment.score.includes('/') ? summaryData.sentiment.score : `${summaryData.sentiment.score}/10`}
                                      </span>
                                    )}
                                  </div>
                                  {summaryData?.sentiment?.reason ? (
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                      {summaryData.sentiment.reason}
                                    </p>
                                  ) : (
                                    <p className="text-xs text-slate-400 italic">No sentiment analysis reason available.</p>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* SECTION 2: CONFIRMED BOOKING & FOLLOW-UP PLAN */}
                            {(summaryData?.confirmed_details || (summaryData?.follow_up_plan && summaryData.follow_up_plan.length > 0)) && (
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                {/* Confirmed Details */}
                                {summaryData?.confirmed_details && (
                                  <div className={cn(
                                    "bg-white border border-[#E5E7EB] rounded-[16px] p-6",
                                    summaryData?.follow_up_plan && summaryData.follow_up_plan.length > 0 ? "lg:col-span-7" : "lg:col-span-12"
                                  )}>
                                    <div className="flex items-center gap-2 mb-4">
                                      <div className="w-7 h-7 rounded-lg bg-[#063669]/10 text-[#063669] flex items-center justify-center">
                                        <Calendar className="w-4 h-4" />
                                      </div>
                                      <span className="font-['Inter'] font-bold text-[11px] leading-[15px] tracking-[1.5px] uppercase text-[#063669]">
                                        AI-SUGGESTED APPOINTMENT DETAILS
                                      </span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                      {summaryData.confirmed_details.branch && (
                                        <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5 flex items-start gap-3">
                                          <Building className="w-4 h-4 text-[#063669] mt-0.5 shrink-0" />
                                          <div>
                                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Hospital Branch</p>
                                            <p className="text-xs font-semibold text-slate-800 mt-0.5">{summaryData.confirmed_details.branch}</p>
                                          </div>
                                        </div>
                                      )}
                                      {summaryData.confirmed_details.department && (
                                        <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5 flex items-start gap-3">
                                          <Stethoscope className="w-4 h-4 text-[#063669] mt-0.5 shrink-0" />
                                          <div>
                                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Department</p>
                                            <p className="text-xs font-semibold text-slate-800 mt-0.5">{summaryData.confirmed_details.department}</p>
                                          </div>
                                        </div>
                                      )}
                                      {(summaryData.confirmed_details.date || summaryData.confirmed_details.time) && (
                                        <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5 flex items-start gap-3">
                                          <Clock className="w-4 h-4 text-[#063669] mt-0.5 shrink-0" />
                                          <div>
                                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Slot Time & Date</p>
                                            <p className="text-xs font-semibold text-slate-800 mt-0.5">
                                              {[summaryData.confirmed_details.date, summaryData.confirmed_details.time].filter(Boolean).join(' • ')}
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                      {/* Booking Status card - commented out
                                      {summaryData.confirmed_details.booking_status && (
                                        <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5 flex items-start gap-3">
                                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                                          <div>
                                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Booking Status</p>
                                            <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md mt-0.5">
                                              {summaryData.confirmed_details.booking_status}
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                      */}
                                    </div>
                                  </div>
                                )}

                                {/* Follow-up Plan */}
                                {summaryData?.follow_up_plan && summaryData.follow_up_plan.length > 0 && (
                                  <div className={cn(
                                    "bg-white border border-[#E5E7EB] rounded-[16px] p-6 flex flex-col justify-between",
                                    summaryData?.confirmed_details ? "lg:col-span-5" : "lg:col-span-12"
                                  )}>
                                    <div>
                                      <div className="flex items-center gap-2 mb-4">
                                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                          <ListChecks className="w-4 h-4" />
                                        </div>
                                        <span className="font-['Inter'] font-bold text-[11px] leading-[15px] tracking-[1.5px] uppercase text-[#64748B]">
                                          FOLLOW-UP PLAN ({summaryData.follow_up_plan.length})
                                        </span>
                                      </div>
                                      <ul className="space-y-2.5">
                                        {summaryData.follow_up_plan.map((planItem, idx) => (
                                          <li key={idx} className="flex items-start gap-2.5 bg-slate-50/70 border border-slate-100 rounded-xl p-3">
                                            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                                              <Check className="w-3 h-3 stroke-[3]" />
                                            </div>
                                            <span className="text-xs text-slate-700 font-medium leading-relaxed">
                                              {planItem}
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* SECTION 3: REPORTED SYMPTOMS & MEDICAL HISTORY */}
                            {((summaryData?.symptoms && summaryData.symptoms.length > 0) || (summaryData?.recent_medical_history && summaryData.recent_medical_history.length > 0)) && (
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                {/* Symptoms List */}
                                {summaryData?.symptoms && summaryData.symptoms.length > 0 && (
                                  <div className={cn(
                                    "bg-white border border-[#E5E7EB] rounded-[16px] p-6",
                                    summaryData?.recent_medical_history && summaryData.recent_medical_history.length > 0 ? "lg:col-span-7" : "lg:col-span-12"
                                  )}>
                                    <div className="flex items-center gap-2 mb-4">
                                      <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                                        <HeartPulse className="w-4 h-4" />
                                      </div>
                                      <span className="font-['Inter'] font-bold text-[11px] leading-[15px] tracking-[1.5px] uppercase text-[#64748B]">
                                        REPORTED SYMPTOMS ({summaryData.symptoms.length})
                                      </span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                      {summaryData.symptoms.map((s, idx) => (
                                        <div key={idx} className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-3.5 flex flex-col justify-between gap-2">
                                          <div className="flex items-start justify-between gap-2">
                                            <span className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                                              {s.symptom}
                                            </span>
                                            {s.severity && (
                                              <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", getSeverityBadgeClass(s.severity))}>
                                                {s.severity}
                                              </span>
                                            )}
                                          </div>
                                          <div className="space-y-0.5 text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                                            {s.onset && <p><span className="font-semibold text-slate-600">Onset:</span> {s.onset}</p>}
                                            {s.duration && <p><span className="font-semibold text-slate-600">Duration:</span> {s.duration}</p>}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Recent Medical History */}
                                {summaryData?.recent_medical_history && summaryData.recent_medical_history.length > 0 && (
                                  <div className={cn(
                                    "bg-white border border-[#E5E7EB] rounded-[16px] p-6",
                                    summaryData?.symptoms && summaryData.symptoms.length > 0 ? "lg:col-span-5" : "lg:col-span-12"
                                  )}>
                                    <div className="flex items-center gap-2 mb-4">
                                      <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                                        <History className="w-4 h-4" />
                                      </div>
                                      <span className="font-['Inter'] font-bold text-[11px] leading-[15px] tracking-[1.5px] uppercase text-[#64748B]">
                                        RECENT MEDICAL HISTORY
                                      </span>
                                    </div>
                                    <ul className="space-y-2.5">
                                      {summaryData.recent_medical_history.map((hist, idx) => (
                                        <li key={idx} className="flex items-start gap-2 bg-amber-50/40 border border-amber-200/50 rounded-xl p-3">
                                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                          <span className="text-xs text-slate-700 font-medium leading-relaxed">
                                            {hist}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* SECTION 4: CHECKLIST & KEY DETAILS */}
                            {(finalChecklist.length > 0 || finalKeyPoints.length > 0 || finalQuestions.length > 0) && (
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                {/* AGENT CHECKLIST */}
                                {finalChecklist.length > 0 && (() => {
                                  const activeFilter = checklistFilters[call.id] || 'all';
                                  const filteredChecklist = finalChecklist.filter(item => {
                                    if (activeFilter === 'covered') return item.covered;
                                    if (activeFilter === 'missed') return !item.covered;
                                    return true;
                                  });

                                  return (
                                    <div className={cn(
                                      "bg-white border border-[#E5E7EB] rounded-[16px] p-6 flex flex-col justify-between",
                                      (finalKeyPoints.length > 0 || finalQuestions.length > 0) ? "lg:col-span-8" : "lg:col-span-12"
                                    )}>
                                      <div>
                                        {/* Header with Title, KPI Pill & Filters */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                                          <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center shrink-0 shadow-xs">
                                              <ClipboardCheck className="w-4 h-4 text-emerald-600" />
                                            </div>
                                            <div>
                                              <div className="flex items-center gap-2 flex-wrap">
                                                <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-[15px] leading-tight text-[#063669]">
                                                  Agent Call Checklist
                                                </h4>
                                                <span className={cn(
                                                  "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border",
                                                  checklistPct >= 70
                                                    ? "bg-[#DCFCE7] text-[#16A34A] border-[#BBF7D0]"
                                                    : checklistPct >= 50
                                                    ? "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]"
                                                    : "bg-[#FEF2F2] text-[#EF4444] border-[#FEE2E2]"
                                                )}>
                                                  {checklistPct}% Met • {checklistCovered}/{checklistTotal} Points
                                                </span>
                                              </div>
                                              <p className="text-[11px] text-slate-400 mt-0.5">
                                                Clinical protocol compliance & conversation checkpoints
                                              </p>
                                            </div>
                                          </div>

                                          {/* Filter Tabs */}
                                          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl shrink-0 self-start sm:self-auto border border-slate-200/50">
                                            <button
                                              onClick={() => setChecklistFilters(prev => ({ ...prev, [call.id]: 'all' }))}
                                              className={cn(
                                                "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer",
                                                activeFilter === 'all'
                                                  ? "bg-white text-[#063669] shadow-sm"
                                                  : "text-slate-500 hover:text-[#063669]"
                                              )}
                                            >
                                              All ({finalChecklist.length})
                                            </button>
                                            <button
                                              onClick={() => setChecklistFilters(prev => ({ ...prev, [call.id]: 'covered' }))}
                                              className={cn(
                                                "px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer",
                                                activeFilter === 'covered'
                                                  ? "bg-[#16A34A] text-white shadow-sm"
                                                  : "text-slate-500 hover:text-[#16A34A]"
                                              )}
                                            >
                                              <Check className="w-3 h-3 stroke-[3]" />
                                              Met ({checklistCovered})
                                            </button>
                                            <button
                                              onClick={() => setChecklistFilters(prev => ({ ...prev, [call.id]: 'missed' }))}
                                              className={cn(
                                                "px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer",
                                                activeFilter === 'missed'
                                                  ? "bg-[#DC2626] text-white shadow-sm"
                                                  : "text-slate-500 hover:text-[#DC2626]"
                                              )}
                                            >
                                              <X className="w-3 h-3 stroke-[3]" />
                                              Missed ({checklistTotal - checklistCovered})
                                            </button>
                                          </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3">
                                          <div
                                            className={cn(
                                              "h-full rounded-full transition-all duration-300",
                                              checklistPct >= 70 ? "bg-[#16A34A]" : checklistPct >= 50 ? "bg-[#D97706]" : "bg-[#DC2626]"
                                            )}
                                            style={{ width: `${Math.min(checklistPct, 100)}%` }}
                                          />
                                        </div>

                                        {/* Compact 2-Column Grid with Scrollbar */}
                                        <div className="mt-4 max-h-[440px] overflow-y-auto pr-1 custom-scrollbar">
                                          {filteredChecklist.length === 0 ? (
                                            <div className="py-8 text-center text-xs text-slate-400">
                                              No checklist items in this view.
                                            </div>
                                          ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                              {filteredChecklist.map((item, idx) => (
                                                <div
                                                  key={item.id || idx}
                                                  className={cn(
                                                    "p-3 rounded-xl border transition-all flex flex-col justify-between gap-2",
                                                    item.covered
                                                      ? "bg-emerald-50/20 border-emerald-100/90 hover:border-emerald-200"
                                                      : "bg-rose-50/20 border-rose-100/90 hover:border-rose-200"
                                                  )}
                                                >
                                                  <div className="flex items-start justify-between gap-2">
                                                    <div className="flex items-start gap-2.5 min-w-0">
                                                      <div className="mt-0.5 shrink-0">
                                                        {item.covered ? (
                                                          <div className="w-5 h-5 rounded-full bg-[#DCFCE7] border border-[#BBF7D0] flex items-center justify-center">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                                                          </div>
                                                        ) : (
                                                          <div className="w-5 h-5 rounded-full bg-[#FEE2E2] border border-[#FECACA] flex items-center justify-center">
                                                            <XCircle className="w-3.5 h-3.5 text-[#DC2626]" />
                                                          </div>
                                                        )}
                                                      </div>
                                                      <h4 className="font-bold text-xs text-[#063669] leading-snug">
                                                        {item.point}
                                                      </h4>
                                                    </div>

                                                    <div className="shrink-0">
                                                      {item.covered ? (
                                                        <span className="inline-flex items-center gap-0.5 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A] border border-[#BBF7D0]">
                                                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                                                          Covered
                                                        </span>
                                                      ) : (
                                                        <span className="inline-flex items-center gap-0.5 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]">
                                                          <X className="w-2.5 h-2.5 stroke-[3]" />
                                                          Missed
                                                        </span>
                                                      )}
                                                    </div>
                                                  </div>

                                                  {item.evidence && (
                                                    <div className={cn(
                                                      "ml-7 rounded-lg px-2.5 py-1.5 text-[11px] leading-relaxed border-l-2",
                                                      item.covered
                                                        ? "bg-emerald-50/70 border-[#16A34A] text-emerald-950"
                                                        : "bg-rose-50/70 border-[#DC2626] text-rose-950"
                                                    )}>
                                                      <span className="font-semibold text-slate-500 mr-1">Detail:</span>
                                                      <span className="italic font-normal">"{item.evidence}"</span>
                                                    </div>
                                                  )}

                                                  {!item.evidence && item.reason && (
                                                    <div className={cn(
                                                      "ml-7 rounded-lg px-2.5 py-1.5 text-[11px] leading-relaxed border-l-2",
                                                      item.covered
                                                        ? "bg-emerald-50/70 border-[#16A34A] text-slate-700"
                                                        : "bg-rose-50/70 border-[#DC2626] text-slate-700"
                                                    )}>
                                                      <span className="font-normal text-slate-600">{item.reason}</span>
                                                    </div>
                                                  )}
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })()}

                                {/* KEY DETAILS PANEL */}
                                {(finalKeyPoints.length > 0 || finalQuestions.length > 0) && (
                                  <div className={cn(
                                    "bg-white border border-[#E5E7EB] rounded-[16px] p-6 flex flex-col justify-between gap-5",
                                    finalChecklist.length === 0 ? "lg:col-span-12" : "lg:col-span-4"
                                  )}>
                                    {/* KEY POINTS MENTIONED */}
                                    {finalKeyPoints.length > 0 && (
                                      <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                          <div className="w-6 h-6 rounded-md bg-blue-50 text-[#063669] flex items-center justify-center">
                                            <Sparkles className="w-3.5 h-3.5 text-[#063669]" />
                                          </div>
                                          <span className="font-['Inter'] font-bold text-[11px] leading-[15px] tracking-[1.5px] uppercase text-[#64748B]">
                                            KEY POINTS ({finalKeyPoints.length})
                                          </span>
                                        </div>
                                        <ul className="space-y-2 max-h-[190px] overflow-y-auto pr-1 custom-scrollbar">
                                          {finalKeyPoints.map((kp, idx) => (
                                            <li key={idx} className="flex items-start gap-2 bg-slate-50/70 border border-slate-100 rounded-lg p-2.5">
                                              <div className="w-1.5 h-1.5 rounded-full bg-[#063669] mt-1.5 shrink-0" />
                                              <p className="font-medium text-xs text-slate-700 leading-normal">
                                                {kp}
                                              </p>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}

                                    {/* QUESTIONS DISCUSSED */}
                                    {finalQuestions.length > 0 && (
                                      <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                          <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-700 flex items-center justify-center">
                                            <MessageCircle className="w-3.5 h-3.5 text-purple-700" />
                                          </div>
                                          <span className="font-['Inter'] font-bold text-[11px] leading-[15px] tracking-[1.5px] uppercase text-[#64748B]">
                                            QUESTIONS DISCUSSED
                                          </span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5 max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
                                          {finalQuestions.map((q: any, idx: number) => (
                                            <div key={idx} className="bg-slate-100/90 text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md border border-slate-200/60">
                                              {q}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* SECTION 5: CALL TRANSCRIPT DIALOGUE */}
                            {summaryData?.complete_transcript && (
                              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6">
                                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                                  <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-lg bg-[#063669]/10 text-[#063669] flex items-center justify-center">
                                      <MessageCircle className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <span className="font-['Inter'] font-bold text-[11px] leading-[15px] tracking-[1.5px] uppercase text-[#063669] block">
                                        CALL TRANSCRIPT DIALOGUE
                                      </span>
                                      <span className="text-[11px] text-slate-400">
                                        Full conversation between Care Coordinator & Patient
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                                  {parseTranscript(summaryData.complete_transcript).map((item) => (
                                    <div
                                      key={item.id}
                                      className={cn(
                                        "p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed",
                                        item.isAgent
                                          ? "bg-[#063669]/5 border border-[#063669]/15 mr-auto rounded-tl-sm text-slate-800"
                                          : "bg-slate-100/90 border border-slate-200 ml-auto rounded-tr-sm text-slate-800"
                                      )}
                                    >
                                      <div className="flex items-center gap-1.5 mb-1">
                                        {item.isAgent ? (
                                          <span className="inline-flex items-center gap-1 font-bold text-[11px] text-[#063669]">
                                            <Stethoscope className="w-3 h-3 text-[#063669]" />
                                            Care Coordinator (Agent)
                                          </span>
                                        ) : (
                                          <span className="inline-flex items-center gap-1 font-bold text-[11px] text-slate-700">
                                            <User className="w-3 h-3 text-slate-500" />
                                            Patient / Caller
                                          </span>
                                        )}
                                      </div>
                                      <p className="font-normal text-slate-700">
                                        {item.text}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* ROW: DETECTED OBJECTIONS (Fallback / Legacy) */}
                            {objectionsToRender.length > 0 && (
                              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 md:p-8 space-y-4">
                                <span className="font-['Inter'] font-bold text-[10px] leading-[15px] tracking-[1.5px] uppercase text-[#94A3B8] block">
                                  DETECTED OBJECTIONS ({objectionsToRender.length})
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                  {objectionsToRender.map((objection, index) => (
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
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })()}
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
