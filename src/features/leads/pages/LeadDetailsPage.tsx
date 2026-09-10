import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Info,
  Pencil,
  Plus,
  Clock,
  Trash2,
  MessageSquare,
  FileText,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip";
import { useGetLeadByIdQuery, useUpdateLeadMutation } from "../api/leadsApi";
import { useInitiateClickToCallMutation, useGetCallRecordsMutation, useCreateCallMutation } from "../api/callsApi";
import { useUploadFileMutation } from "../../../shared/api/s3ApiSlice";
import { useAnalyzeCallMutation } from "../../call-analyzer/api/callAnalyzerApiSlice";
import { AppDrawer } from "../../../shared/components/AppDrawer/AppDrawer";
import { LeadForm } from "../components/LeadForm";
import { toast } from "sonner";
import { formatDate, getProjectStatusOptions } from "../../../utils";

const formatDateTimeForTataTele = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
import { useMasterDataLookup } from "../../../shared/hooks/useMasterDataLookup";
import { useGetAllUsersQuery } from "../../users/api/usersApi";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { LeadRemarksTab } from "../components/tabs/LeadRemarksTab";
import { LeadCallsTab } from "../components/tabs/LeadCallsTab";
import LeadCalls from "../components/tabs/LeadCalls";
import { LeadVisitsTab } from "../components/tabs/LeadVisitsTab";
import { LeadSurgeriesTab } from "../components/tabs/LeadSurgeriesTab";
import { LeadChatsTab } from "../components/tabs/LeadChatsTab";
import { LeadEnquiriesTab } from "../components/tabs/LeadEnquiriesTab";
import { LeadFollowUpsTab } from "../components/tabs/LeadFollowUpsTab";
import { PointsToTalkDialog } from "../components/PointsToTalkDialog";
import { usePermissions } from "../../../hooks/usePermissions";

/* ── Reusable label style (Figma: Inter 600 11px uppercase #64748B) ── */
const labelStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 600,
  fontSize: "11px",
  lineHeight: "16.5px",
  letterSpacing: "0.55px",
  textTransform: "uppercase" as const,
  color: "#64748B",
};

/* ── Reusable value style (Figma: Inter 600 14px #191C1E) ── */
const valueStyle: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "20px",
  letterSpacing: "0px",
  color: "#191C1E",
};

/* ── Field component ── */
const DetailField = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <div className="space-y-2">
    <dt style={labelStyle} className="flex items-center gap-1.5">
      {label}
    </dt>
    <dd style={valueStyle} className="flex items-center gap-2">
      {icon}
      {value || <span style={{ color: "#94A3B8" }}>--</span>}
    </dd>
  </div>
);

interface ParsedNote {
  id: string;
  text: string;
  date?: string;
}

const formatNoteDate = (d = new Date()) => {
  return (
    d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }) +
    ", " +
    d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );
};

const parseNotes = (rawNotes: string): ParsedNote[] => {
  if (!rawNotes || !rawNotes.trim()) return [];
  const trimmed = rawNotes.trim();

  // 1. Check if stored as JSON
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed) && parsed.every((p) => typeof p === "object" && p !== null && "text" in p)) {
        return parsed.map((item, idx) => ({
          id: item.id || String(idx + 1),
          text: String(item.text).trim(),
          date: item.date || item.createdAt || undefined,
        }));
      }
    } catch {
      // Fall through to other formats
    }
  }

  // 2. Check for delimiter `---`
  const delimiterRegex = /[\r\n]+---[\r\n]+/;
  if (delimiterRegex.test(trimmed)) {
    const chunks = trimmed.split(delimiterRegex);
    return chunks
      .map((chunk, idx) => {
        const cTrim = chunk.trim();
        const dateMatch = cTrim.match(/^\[(.*?)\]\s*[\r\n]+([\s\S]*)$/);
        if (dateMatch) {
          return {
            id: String(idx + 1),
            date: dateMatch[1],
            text: dateMatch[2].trim(),
          };
        }
        return {
          id: String(idx + 1),
          text: cTrim,
        };
      })
      .filter((n) => n.text.length > 0);
  }

  // 3. Single note starting with [Date]
  const singleDateMatch = trimmed.match(/^\[(.*?)\]\s*[\r\n]+([\s\S]*)$/);
  if (singleDateMatch) {
    return [
      {
        id: "1",
        date: singleDateMatch[1],
        text: singleDateMatch[2].trim(),
      },
    ];
  }

  // 4. Default plain note
  return [
    {
      id: "1",
      text: trimmed,
    },
  ];
};

const serializeNotes = (notes: ParsedNote[]): string => {
  if (notes.length === 0) return "";
  return notes
    .map((n) => {
      const header = n.date ? `[${n.date}]\n` : "";
      return `${header}${n.text.trim()}`;
    })
    .join("\n\n---\n\n");
};

export const LeadDetailsPage = () => {
  const { leadId } = useParams<{ leadId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const fromCustomer = location.state?.fromCustomer;
  const stateLead = location.state?.lead as Lead | undefined;
  const stateBranchId = location.state?.branch_id ?? stateLead?.branch_id;
  const stateBranchName = location.state?.branch ?? location.state?.branch_name ?? location.state?.hospital_branch ?? stateLead?.branch ?? stateLead?.branch_name ?? stateLead?.hospital_branch;
  const stateSpecialisationId = location.state?.specialisation_id ?? stateLead?.specialisation_id;
  const initialTab = searchParams.get('tab') || 'activity';
  const [activeTab, setActiveTab] = useState(initialTab);
  const chatRef = useRef<HTMLDivElement>(null);
  const enquiriesRef = useRef<HTMLDivElement>(null);
  const followupsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === 'chats') {
      setTimeout(() => {
        chatRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    } else if (activeTab === 'enquiries') {
      setTimeout(() => {
        enquiriesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    } else if (activeTab === 'followups') {
      setTimeout(() => {
        followupsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    }
  }, [activeTab]);

  useEffect(() => {
    const tab = searchParams.get('tab') || 'activity';
    setActiveTab(tab);
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  const {
    data: lead,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetLeadByIdQuery({ uuid: leadId || "" }, { skip: !leadId, refetchOnMountOrArgChange: true });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFollowupModalOpen, setIsFollowupModalOpen] = useState(false);
  const [updateLead, { isLoading: isUpdating }] = useUpdateLeadMutation();
  const [initiateClickToCall] = useInitiateClickToCallMutation();
  const [getCallRecords] = useGetCallRecordsMutation();
  const [createCall] = useCreateCallMutation();
  const [uploadFile] = useUploadFileMutation();
  const [analyzeCall] = useAnalyzeCallMutation();
  const callRecordsPollingRef = useRef<NodeJS.Timeout | null>(null);
  const [localNote, setLocalNote] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (callRecordsPollingRef.current) {
        clearInterval(callRecordsPollingRef.current);
        callRecordsPollingRef.current = null;
      }
    };
  }, []);

  const cleanLeadNote = React.useMemo(() => {
    if (localNote !== null) return localNote;
    if (!lead) return "";
    const note = (lead.appointment_note || lead.lead_note || lead.notes || (lead as any).note || "").trim();
    // Exclude address and accidental Kukatpally fallback
    if (note && lead.address && note.toLowerCase() === lead.address.trim().toLowerCase()) {
      return "";
    }
    if (note.toLowerCase() === "kukatpally") {
      return "";
    }
    return note;
  }, [lead, localNote]);

  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);

  const parsedNotes = React.useMemo<ParsedNote[]>(() => {
    if (!cleanLeadNote) return [];
    return parseNotes(cleanLeadNote);
  }, [cleanLeadNote]);

  const saveNotesPayload = async (updatedNotes: ParsedNote[]) => {
    if (!lead?.uuid) return false;
    setIsSavingNote(true);
    const serialized = serializeNotes(updatedNotes);
    try {
      const payload: any = {
        ...lead,
        uuid: lead.uuid,
        appointment_note: serialized,
        lead_note: serialized,
        notes: serialized,
        source_id: Number(lead.source_id || 1),
        project_id: lead.project_id,
        lead_priority_id: lead.lead_priority_id || 1,
        lead_status_id: lead.lead_status_id || 1,
        first_name: lead.first_name || "",
        last_name: lead.last_name || "",
        phone_number: lead.phone_number || "",
        email_address: lead.email_address || lead.email || "",
        source_employee_user_id: lead.source_employee_user_id ?? null,
        assigned_to_rm: lead.assigned_to_rm ?? null,
        assigned_to_em: lead.assigned_to_em ?? null,
        occupation: lead.occupation || "",
        address: lead.address || "",
        city: lead.city || "",
        state: lead.state || "",
        country: lead.country || "",
        zip: lead.zip || "",
      };

      await updateLead(payload).unwrap();
      setLocalNote(serialized);
      refetch();
      return true;
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save note");
      return false;
    } finally {
      setIsSavingNote(false);
    }
  };

  const handleAddNote = async () => {
    const trimmed = newNoteText.trim();
    if (!trimmed) return;
    const newNote: ParsedNote = {
      id: String(Date.now()),
      text: trimmed,
      date: formatNoteDate(new Date()),
    };
    const updated = [newNote, ...parsedNotes];
    const ok = await saveNotesPayload(updated);
    if (ok) {
      toast.success("Note added successfully");
      setIsAddingNote(false);
      setNewNoteText("");
    }
  };

  const handleUpdateNote = async (noteId: string) => {
    const trimmed = editingNoteText.trim();
    if (!trimmed) return;
    const updated = parsedNotes.map((n) =>
      n.id === noteId ? { ...n, text: trimmed } : n
    );
    const ok = await saveNotesPayload(updated);
    if (ok) {
      toast.success("Note updated successfully");
      setEditingNoteId(null);
      setEditingNoteText("");
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    const updated = parsedNotes.filter((n) => n.id !== noteId);
    const ok = await saveNotesPayload(updated);
    if (ok) {
      toast.success("Note deleted successfully");
    }
  };

  const handleEditSubmit = async (values: any) => {
    try {
      if (lead) {
        await updateLead({ ...values, uuid: lead.uuid }).unwrap();
        if (values.appointment_note !== undefined) {
          setLocalNote(values.appointment_note.trim());
        }
        toast.success("Lead updated successfully");
        refetch();
      }
      setIsDrawerOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update lead");
    }
  };

  const handleViewLead = (uuid: string) => {
    navigate(`/leads/${uuid}`);
    if (uuid === leadId) {
      refetch();
    }
  };

  const {
    getStatusLabel,
    getProjectLeadStatusLabel,
    getCustomerStatusLabel,
    getProjectLabel,
    getSourceLabel,
    getBranchLabel,
    getSpecialisationLabel,
    getRmLabel,
    getEmLabel,
    masterData,
    projectLeadStatuses,
  } = useMasterDataLookup();

  const { roleCode, user: currentUser, currentRole } = usePermissions();

  const projectLeadStatusId = React.useMemo(() => {
    if (lead?.project_lead_status_id) return lead.project_lead_status_id;
    if (!lead?.project_id || !lead?.lead_status_id || !projectLeadStatuses) return undefined;

    const proj = projectLeadStatuses.find(
      (item: any) => Number(item.project_id) === Number(lead.project_id)
    );
    if (!proj || !Array.isArray(proj.status)) return undefined;

    const match = proj.status.find(
      (s: any) => Number(s.lead_status_id) === Number(lead.lead_status_id)
    );
    return match ? match.id : undefined;
  }, [lead?.project_lead_status_id, lead?.project_id, lead?.lead_status_id, projectLeadStatuses]);

  const displayStatusLabel = lead?.project_lead_status_id
    ? getProjectLeadStatusLabel(lead.project_lead_status_id)
    : getStatusLabel(lead?.lead_status_id);

  const statusOptions = React.useMemo(() => {
    if (lead?.project_id && projectLeadStatuses) {
      const opts = getProjectStatusOptions(lead.project_id, projectLeadStatuses);
      if (opts && opts.length > 0) return opts;
    }
    return (masterData?.lead_statuses || []).map((s: any) => ({
      id: s.id,
      value: s.id,
      label: s.description || s.status_name || s.name || `Status ${s.id}`,
      lead_status_id: s.id,
    }));
  }, [lead?.project_id, projectLeadStatuses, masterData?.lead_statuses]);

  const currentStatusValue = React.useMemo(() => {
    if (projectLeadStatusId) {
      const match = statusOptions.find((opt: any) => Number(opt.id) === Number(projectLeadStatusId));
      if (match) return String(match.id);
    }
    if (lead?.lead_status_id) {
      const match = statusOptions.find((opt: any) => Number(opt.lead_status_id || opt.value) === Number(lead.lead_status_id));
      if (match) return String(match.id || match.value);
    }
    return statusOptions[0] ? String(statusOptions[0].id || statusOptions[0].value) : "";
  }, [projectLeadStatusId, lead?.lead_status_id, statusOptions]);

  const handleStatusChange = async (newVal: string) => {
    if (!lead) return;
    const selectedOpt = statusOptions.find((opt: any) => String(opt.id || opt.value) === newVal);

    const updatedPayload: any = {
      ...lead,
      uuid: lead.uuid,
      source_id: Number(lead.source_id || 1),
      project_id: lead.project_id,
      lead_priority_id: lead.lead_priority_id || 1,
      first_name: lead.first_name || '',
      last_name: lead.last_name || '',
      phone_number: lead.phone_number,
      email_address: lead.email_address || lead.email || '',
      source_employee_user_id: lead.source_employee_user_id ?? null,
      assigned_to_rm: lead.assigned_to_rm ?? null,
      assigned_to_em: lead.assigned_to_em ?? null,
      occupation: lead.occupation || '',
      address: lead.address || '',
      city: lead.city || '',
      state: lead.state || '',
      country: lead.country || '',
      zip: lead.zip || '',
    };

    if (selectedOpt) {
      if (selectedOpt.id) {
        updatedPayload.project_lead_status_id = Number(selectedOpt.id);
      }
      if (selectedOpt.lead_status_id || selectedOpt.value) {
        updatedPayload.lead_status_id = Number(selectedOpt.lead_status_id || selectedOpt.value);
      }
    } else {
      updatedPayload.lead_status_id = Number(newVal);
    }

    try {
      await updateLead(updatedPayload).unwrap();
      toast.success("Lead status updated successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update lead status");
    }
  };

  const upcomingVisitText = React.useMemo(() => {
    if (lead?.visits && Array.isArray(lead.visits) && lead.visits.length > 0) {
      const now = new Date();
      const upcoming = lead.visits.filter((v: any) => {
        if (!v.visit_date_time) return false;
        const vDate = new Date(v.visit_date_time.replace(/Z/g, '').split('+')[0].replace(' ', 'T'));
        return vDate >= now || v.visit_status === 1;
      });
      if (upcoming.length > 0 && upcoming[0].visit_date_time) {
        return `${upcoming.length} Scheduled (${formatDate(upcoming[0].visit_date_time)})`;
      }
    }
    const leadAny = lead as any;
    if (leadAny?.appointment_date) {
      return `${leadAny.appointment_date} ${leadAny.appointment_time || ''}`.trim();
    }
    return "No Upcoming Visits";
  }, [lead]);

  const sourceObj = masterData?.sources?.find((s) => s.id === lead?.source_id);
  const isInternalEmployeeSource =
    lead?.source_id === 4 || sourceObj?.code === "INTEMP";

  const { data: users = [] } = useGetAllUsersQuery({ offset: 0 });

  const getSourceEmployeeName = () => {
    if (!lead?.source_employee_user_id) return "--";
    const user = users.find((u) => u.id === lead.source_employee_user_id);
    return user
      ? `${user.first_name} ${user.last_name}`
      : `ID: ${lead.source_employee_user_id}`;
  };

  const dummyChats: any = [
    {
      id: 1,
      chat_summary:
        "Hi Vikram, I reviewed the brochure for the penthouse in SkyGardens. The floor plan looks interesting, but I have concerns about the parking space allocation. Does it come with 3 dedicated slots?",
      created_on: new Date().toISOString(),
      lead_uuid: "",
      chat_file_location: "",
    },
    {
      id: 2,
      chat_summary:
        "Hello Mr. Sharma! Yes, the SkyGardens penthouses are specifically allotted 3 covered car parking slots. I can also arrange a site visit for this Thursday at 4 PM if you're available?",
      created_on: new Date().toISOString(),
      lead_uuid: "",
      chat_file_location: "",
    },
    {
      id: 3,
      chat_summary:
        "Thursday 4 PM works for me. Can you also bring the documentation regarding the RERA approval and land titles during the visit?",
      created_on: new Date().toISOString(),
      lead_uuid: "",
      chat_file_location: "",
    },
    {
      id: 4,
      chat_summary:
        "Absolutely. I'll have the complete folder ready. I'll send you the location pin for the site office right away.",
      created_on: new Date().toISOString(),
      lead_uuid: "",
      chat_file_location: "",
    },
  ];

  /* ── Avatar initials ── */
  const initials =
    `${(lead?.first_name || "")[0] || ""}${(lead?.last_name || "")[0] || ""}`.toUpperCase() ||
    "?";

  return (
    <div className="space-y-6 pb-12">
      {/* Back Button */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(fromCustomer ? "/customers" : "/leads")}
          className="gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          {fromCustomer ? "Back to Customers" : "Back to Leads Dashboard"}
        </Button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <span className="text-zinc-500 animate-pulse">
            Fetching lead details...
          </span>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-red-500">
          <p>Failed to load lead details.</p>
          <p className="text-sm text-zinc-500 mt-2">
            {(error as any)?.data?.message ||
              "Check connection or lead existence."}
          </p>
        </div>
      )}

      {lead && (
        <>
          {/* ═══════════════════════════════════════════════ */}
          {/* CARD 1: Name, Lead ID, Added Date              */}
          {/* ═══════════════════════════════════════════════ */}
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              {/* Avatar */}
              <div
                className="shrink-0 flex items-center justify-center rounded-xl text-white font-bold text-base"
                style={{ width: 44, height: 44, backgroundColor: "#0f3d6b" }}
              >
                {initials}
              </div>

              {/* Name + meta */}
              <div>
                <h2 className="font-bold text-lg text-[#191C1E] dark:text-zinc-100 font-['Plus_Jakarta_Sans'] capitalize leading-tight">
                  {lead.first_name || ""} {lead.last_name || ""}
                </h2>
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mt-1 text-xs text-[#64748B] font-medium">
                  <span>
                    Lead ID:{" "}
                    <span className="font-bold text-[#0f3d6b] dark:text-blue-400">
                      #{lead.lead_id}
                    </span>
                  </span>
                  <span className="text-[#CBD5E1]">·</span>
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className="flex items-center gap-1.5 cursor-pointer hover:text-[#0f3d6b] transition-colors"
                          onClick={() => console.log("call is clicked")}
                        >
                          <Phone className="h-3 w-3 text-[#0f3d6b] dark:text-blue-400" />
                          {lead.phone_number || (lead as any).phone || "N/A"}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Call</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {(lead.email_address || lead.email) && (
                    <>
                      <span className="text-[#CBD5E1]">·</span>
                      <span className="flex items-center gap-1.5">
                        <Mail className="h-3 w-3 text-[#0f3d6b] dark:text-blue-400" />
                        {lead.email_address || lead.email}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={async () => {
                        console.log("call is clicked");
                        const customerUuid = lead.customer_uuid || (lead as any).customer_uuid;
                        const leadUuid = lead.uuid || leadId || (lead as any).lead_uuid;
                        if (!customerUuid) {
                          toast.error("Customer UUID not available for this lead");
                          return;
                        }

                        const sessionAgentId = typeof window !== 'undefined' ? sessionStorage.getItem('agent_id') : null;
                        const agentId = Number(currentUser?.id || currentUser?.agent_id || sessionAgentId || 0);

                        try {
                          await initiateClickToCall({ 
                            customer_uuid: customerUuid,
                            lead_uuid: leadUuid || "",
                            agent_id: agentId,
                          }).unwrap();
                          toast.success("Call initiated successfully");

                          // Clear previous polling interval if any
                          if (callRecordsPollingRef.current) {
                            clearInterval(callRecordsPollingRef.current);
                            callRecordsPollingRef.current = null;
                          }

                          const now = new Date();
                          const fromDate = new Date(now.getTime() - 1 * 60 * 1000); // current time - 1 min
                          const toDate = new Date(now.getTime() + 5 * 60 * 1000);   // current time + 5 mins
                          const from_date = formatDateTimeForTataTele(fromDate);
                          const to_date = formatDateTimeForTataTele(toDate);

                          const pollRecords = async () => {
                            try {
                              const res = await getCallRecords({
                                from_date,
                                to_date,
                                limit: 20,
                                offset: 0,
                              }).unwrap();

                              const recordsList: any[] = Array.isArray(res?.data?.results)
                                ? res.data.results
                                : Array.isArray(res?.results)
                                  ? res.results
                                  : Array.isArray(res?.data)
                                    ? res.data
                                    : Array.isArray(res)
                                      ? res
                                      : [];

                              const foundRecord = recordsList.find((r: any) => Boolean(r && (r.answered_seconds !== undefined || r.call_id || r.id || r.recording_url)));
                              if (foundRecord) {
                                console.log("Found call record:", foundRecord);

                                const callId = String(foundRecord.call_id || foundRecord.id || "1");
                                const cleanPhone = (num: string) => String(num || "").trim().replace(/^\+91/, "").replace(/^\+/, "").trim();
                                const fromNumber = cleanPhone(foundRecord.agent_number || foundRecord.from_number || lead.phone_number || (lead as any).phone || "");
                                const toNumber = cleanPhone(foundRecord.client_number || foundRecord.to_number || "1800-123-4567");
                                const leadName = `${lead.first_name || ""} ${lead.last_name || ""}`.trim() || "Lead";

                                const answeredSeconds = Number(foundRecord.answered_seconds ?? 0);

                                if (foundRecord.answered_seconds !== undefined && answeredSeconds <= 0) {
                                  // 1. MISSED / UNANSWERED / DISCONNECTED CALL (answered_seconds === 0)
                                  if (callRecordsPollingRef.current) {
                                    clearInterval(callRecordsPollingRef.current);
                                    callRecordsPollingRef.current = null;
                                  }

                                  try {
                                    const callerUserId = currentUser?.id ? Number(currentUser.id) : 0;
                                    const callerRoleId = currentUser?.role_id ? Number(currentUser.role_id) : (currentRole?.id ? Number(currentRole.id) : 0);
                                    const createdOnDate = foundRecord.created_on || foundRecord.start_time || foundRecord.call_start_time || new Date().toISOString();

                                    await createCall({
                                      lead_uuid: lead.uuid || leadUuid,
                                      call_id: callId,
                                      from_number: fromNumber,
                                      to_number: toNumber,
                                      call_duration_in_seconds: 0,
                                      call_summary: "",
                                      call_remarks: "",
                                      manual_call_notes: "",
                                      caller_user_id: callerUserId,
                                      caller_role_id: callerRoleId,
                                      call_s3_data: "",
                                      lead_call_status_id: 2,
                                      created_on: createdOnDate,
                                    }).unwrap();

                                    toast.info("Call was not answered / disconnected. Missed call record saved.");
                                    refetch();
                                  } catch (createCallErr: any) {
                                    console.error("Failed to create missed call record:", createCallErr);
                                    toast.error(createCallErr?.data?.message || "Failed to log missed call");
                                  }
                                } else {
                                  // 2. ANSWERED CALL (answered_seconds > 0) -> Wait for recording_url to be ready
                                  const cleanUrl = foundRecord.recording_url ? String(foundRecord.recording_url).replace(/["']+/g, "").trim() : "";
                                  if (!cleanUrl) {
                                    console.log("Call was answered, waiting for recording_url to become available...");
                                    return; // Continue polling next cycle
                                  }

                                  if (callRecordsPollingRef.current) {
                                    clearInterval(callRecordsPollingRef.current);
                                    callRecordsPollingRef.current = null;
                                  }

                                  const payload = {
                                    call_id: callId,
                                    lead_uuid: lead.uuid || leadUuid,
                                    lead_name: leadName,
                                    from_number: fromNumber,
                                    to_number: toNumber,
                                    file: cleanUrl,
                                  };

                                  const maxRetries = 3;
                                  const delayMs = 5000;

                                  // Wait initial 5 seconds before first call
                                  await new Promise((resolve) => setTimeout(resolve, delayMs));

                                  for (let attempt = 1; attempt <= maxRetries; attempt++) {
                                    try {
                                      toast.info(
                                        attempt === 1
                                          ? "Analyzing call recording with AI..."
                                          : `Retrying AI call analysis (${attempt}/${maxRetries})...`
                                      );

                                      await analyzeCall(payload).unwrap();
                                      toast.success("Call analysis completed successfully!");
                                      refetch();
                                      break;
                                    } catch (processErr: any) {
                                      console.error(`Error analyzing call recording (Attempt ${attempt}/${maxRetries}):`, processErr);
                                      if (attempt < maxRetries) {
                                        await new Promise((resolve) => setTimeout(resolve, delayMs));
                                      } else {
                                        toast.error(
                                          processErr?.data?.message ||
                                          processErr?.message ||
                                          "Failed to analyze call recording after 3 attempts"
                                        );
                                      }
                                    }
                                  }
                                }
                              }
                            } catch (pollErr) {
                              console.error("Error polling call records:", pollErr);
                            }
                          };

                          // Poll every 10 seconds
                          callRecordsPollingRef.current = setInterval(pollRecords, 10000);
                        } catch (err) {
                          console.error("Call failed", err);
                          toast.error("Failed to initiate call");
                        }
                      }}
                      className="h-9 w-9 rounded-full border-zinc-200 hover:bg-zinc-100 text-[#0f3d6b] dark:border-zinc-800 dark:hover:bg-zinc-900 transition-all cursor-pointer"
                    >
                      <Phone className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Call</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Points to Talk Dialog */}
              <PointsToTalkDialog
                project={getProjectLabel(lead.project_id)}
                status={displayStatusLabel}
                projectLeadStatusId={projectLeadStatusId}
              />
            </div>
          </div>

          {/* ═══════════════════════════════════════════════ */}
          {/* CARD 2: Patient Details                         */}
          {/* ═══════════════════════════════════════════════ */}
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            {/* Section heading */}
            <div className="flex items-center justify-between px-8 pt-7 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#EFF6FF] flex items-center justify-center">
                  <Info className="h-4 w-4 text-[#0f3d6b]" />
                </div>
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "18px",
                    lineHeight: "24px",
                    color: "#191C1E",
                  }}
                >
                  Patient Details
                </h3>
              </div>
              {roleCode !== 'EXPMNG' && (
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-50 transition-colors cursor-pointer"
                >
                  <Pencil className="h-4 w-4 text-zinc-500" />
                </button>
              )}
            </div>

            {/* Fields */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 xl:gap-x-12 gap-y-7 px-8 py-7">
              <DetailField
                label="Source"
                value={getSourceLabel(lead.source_id)}
              />
              {isInternalEmployeeSource && (
                <DetailField
                  label="Source Employee"
                  value={getSourceEmployeeName()}
                />
              )}
              <DetailField
                label="Creation Date"
                value={formatDate(lead.created_on)}
              />
              <div className="space-y-2">
                <Select
                  value={currentStatusValue}
                  onValueChange={handleStatusChange}
                  disabled={isUpdating}
                >
                  <SelectTrigger className="w-full text-left bg-transparent border-none p-0 shadow-none focus:ring-0 focus:outline-none group cursor-pointer h-auto [&>svg]:hidden">
                    <div className="space-y-2">
                      <dt style={labelStyle} className="flex items-center gap-1.5">
                        <span>LEAD STATUS</span>
                        <Pencil className="h-3.5 w-3.5 text-zinc-400 group-hover:text-[#0f3d6b] shrink-0 transition-colors" />
                      </dt>
                      <dd style={valueStyle} className="flex items-center gap-2">
                        <span style={valueStyle} className="truncate max-w-[200px] block" title={displayStatusLabel}>
                          {displayStatusLabel}
                        </span>
                      </dd>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="w-[260px] max-h-[240px] overflow-y-auto p-1 shadow-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-xl">
                    {statusOptions.map((opt: any) => (
                      <SelectItem
                        key={opt.id || opt.value}
                        value={String(opt.id || opt.value)}
                        className="py-1.5 px-2 text-xs font-medium cursor-pointer rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900"
                      >
                        <div className="w-full max-w-[200px] truncate" title={opt.label}>
                          <span className="truncate text-xs text-zinc-800 dark:text-zinc-200">
                            {opt.label}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Customer Status commented out as requested
              <DetailField
                label="Customer Status"
                value={getCustomerStatusLabel(lead.customer_status_id)}
              />
              */}
              <DetailField
                label="Upcoming Visits"
                value={upcomingVisitText}
                icon={<Calendar className="h-4 w-4 text-[#0f3d6b]" />}
              />
              {/* Project field commented out as requested
              <DetailField
                label="Project"
                value={getProjectLabel(lead.project_id)}
              />
              */}
              <DetailField
                label="Assigned RM"
                value={
                  lead.assigned_to_rm ? (
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#0f3d6b] text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                        {getRmLabel(lead.assigned_to_rm)
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                      {getRmLabel(lead.assigned_to_rm)}
                    </span>
                  ) : null
                }
              />
              {/* Assigned EM commented out as requested
              <DetailField
                label="Assigned EM"
                value={
                  lead.assigned_to_em ? (
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#0f3d6b] text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                        {getEmLabel(lead.assigned_to_em)
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                      {getEmLabel(lead.assigned_to_em)}
                    </span>
                  ) : (
                    "Not Assigned"
                  )
                }
              />
              */}
              {/* Occupation, Phone Number, Email Address commented out as requested */}
              {/*
              <DetailField label="Occupation" value={lead.occupation} />
              <DetailField
                label="Phone Number"
                value={lead.phone_number}
                icon={<Phone className="h-4 w-4 text-[#0f3d6b]" />}
              />
              <DetailField
                label="Email Address"
                value={lead.email_address || lead.email}
                icon={<Mail className="h-4 w-4 text-[#64748B]" />}
              />
              */}
              <DetailField
                label="Branch"
                value={
                  (lead?.branch_id ?? stateBranchId)
                    ? getBranchLabel(lead?.branch_id ?? stateBranchId)
                    : (lead?.hospital_branch || lead?.branch || lead?.branch_name || stateBranchName || getProjectLabel(lead?.project_id) || "--")
                }
              />
              <DetailField
                label="Follow Up Date"
                value={
                  lead?.followup_date || lead?.next_followup_date
                    ? formatDate(lead?.followup_date || lead?.next_followup_date)
                    : (lead?.follow_ups && lead?.follow_ups.length > 0
                      ? formatDate(lead?.follow_ups[0].date_time)
                      : (lead?.followups && lead?.followups.length > 0
                        ? formatDate(lead?.followups[0].date_time)
                        : "--"))
                }
                icon={<Calendar className="h-4 w-4 text-[#0f3d6b]" />}
              />
              <DetailField
                label="Appointment Date"
                value={
                  lead?.appointment_date
                    ? formatDate(lead?.appointment_date)
                    : (lead?.visits && lead?.visits.length > 0 && lead?.visits[0].visit_date_time
                      ? formatDate(lead?.visits[0].visit_date_time)
                      : "--")
                }
                icon={<Calendar className="h-4 w-4 text-[#0f3d6b]" />}
              />
              <DetailField
                label="Department"
                value={
                  (lead?.specialisation_id ?? stateSpecialisationId)
                    ? getSpecialisationLabel(lead?.specialisation_id ?? stateSpecialisationId)
                    : (lead?.department || lead?.specialization || "--")
                }
              />
            </dl>
          </div>

          {/* ═══════════════════════════════════════════════ */}
          {/* CARD 3: Address Details (Commented)             */}
          {/* ═══════════════════════════════════════════════ */}
          {/*
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            <div className="flex items-center gap-2.5 px-8 pt-7 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="w-7 h-7 rounded-full bg-[#EFF6FF] flex items-center justify-center">
                <MapPin className="h-4 w-4 text-[#0f3d6b]" />
              </div>
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "18px",
                  lineHeight: "24px",
                  color: "#191C1E",
                }}
          {/* CARD 3: Lead Followups & Notes                  */}
          {/* ═══════════════════════════════════════════════ */}
          <div ref={followupsRef} className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden max-h-[85vh] flex flex-col">
            {/* Section heading */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0">
                  <Calendar className="h-4 w-4 text-[#0f3d6b]" />
                </div>
                <div className="flex items-center gap-2">
                  <h3
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      fontSize: "17px",
                      lineHeight: "22px",
                      color: "#191C1E",
                    }}
                  >
                    Lead Followups &amp; Notes
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsFollowupModalOpen(true)}
                className="flex items-center justify-center gap-1.5 px-5 h-9 bg-[#063669] hover:bg-[#063669]/90 text-white rounded-full text-xs font-semibold transition-all cursor-pointer active:scale-95"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Create Follow-Up</span>
              </button>
            </div>

            {/* Followups & Notes Content */}
            <div className="overflow-y-auto flex-1 p-4 sm:p-5">
              <LeadFollowUpsTab
                lead={lead ? {
                  ...lead,
                  branch_id: lead.branch_id ?? stateBranchId,
                  specialisation_id: lead.specialisation_id ?? stateSpecialisationId,
                } : lead}
                masterData={masterData}
                hideHeader={true}
                createModalOpen={isFollowupModalOpen}
                setCreateModalOpen={setIsFollowupModalOpen}
              />
            </div>
          </div>

          {/* ═══════════════════════════════════════════════ */}
          {/* CARD 4: Activity / Calls / Chats / Visits       */}
          {/* ═══════════════════════════════════════════════ */}
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full flex flex-col">
              {/* Tab triggers */}
              <div className="border-b border-zinc-200 dark:border-zinc-800">
                <TabsList className="w-full bg-transparent p-0 h-auto rounded-none grid grid-cols-6">
                  {["activity", "calls", "chats", "visits", "surgeries", "enquiries"].map((tab) => {
                    const label =
                      tab === "visits"
                        ? "Appointments"
                        : tab === "surgeries"
                        ? "Surgeries"
                        : tab.charAt(0).toUpperCase() + tab.slice(1);

                    return (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className="
                          py-4 text-sm font-medium capitalize rounded-none border-b-2 border-transparent
                          text-zinc-400
                          data-[state=active]:text-[#0f3d6b]
                          data-[state=active]:border-b-[#0f3d6b]
                          data-[state=active]:font-semibold
                          data-[state=active]:shadow-none
                          transition-all
                          flex items-center justify-center gap-1
                          cursor-pointer
                        "
                      >
                        {label}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              {/* Tab content */}
              <div className="p-6">
                <TabsContent value="activity" className="mt-0">
                  <LeadRemarksTab remarks={lead?.remarks} />
                </TabsContent>

                <TabsContent value="calls" className="mt-0">
                  <LeadCallsTab
                    calls={lead?.calls}
                    leadPhoneNumber={lead?.phone_number}
                    objections={lead?.objections}
                    masterObjections={masterData?.objections}
                  />
                </TabsContent>

                <TabsContent value="chats" className="mt-0">
                  <div ref={chatRef}>
                    <LeadChatsTab
                      chats={lead?.chats?.length ? lead.chats : dummyChats}
                      leadUuid={lead?.uuid}
                      phoneNumber={lead?.phone_number}
                      selectedChatType="CM"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="visits" className="mt-0">
                  <LeadVisitsTab
                    visits={lead?.visits}
                    lead={lead ? {
                      ...lead,
                      branch_id: lead.branch_id ?? stateBranchId,
                      specialisation_id: lead.specialisation_id ?? stateSpecialisationId,
                    } : lead}
                    siteVisitStatuses={
                      masterData?.appointment_status ||
                      (masterData as any)?.appointment_statuses ||
                      masterData?.site_visit_status ||
                      []
                    }
                    getSiteVisitStatusLabel={(id) => {
                      const allStatuses =
                        masterData?.appointment_status ||
                        (masterData as any)?.appointment_statuses ||
                        masterData?.site_visit_status ||
                        [];
                      return (
                        allStatuses.find((s: any) => Number(s.id) === Number(id))?.description ||
                        String(id)
                      );
                    }}
                  />
                </TabsContent>

                <TabsContent value="surgeries" className="mt-0">
                  <LeadSurgeriesTab
                    lead={lead ? {
                      ...lead,
                      branch_id: lead.branch_id ?? stateBranchId,
                      specialisation_id: lead.specialisation_id ?? stateSpecialisationId,
                    } : lead}
                  />
                </TabsContent>

                <TabsContent value="enquiries" className="mt-0">
                  <div ref={enquiriesRef}>
                    <LeadEnquiriesTab leadId={leadId} enquiries={lead?.enquires} onView={handleViewLead} />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <AppDrawer
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            title="Edit Lead"
            description="Update the details for this lead"
          >
            <LeadForm
              initialValues={lead ? {
                ...lead,
                branch_id: lead.branch_id ?? stateBranchId,
                specialisation_id: lead.specialisation_id ?? stateSpecialisationId,
              } : undefined}
              onSubmit={handleEditSubmit}
              isLoading={isUpdating}
              isEdit={true}
            />
          </AppDrawer>
        </>
      )}
    </div>
  );
};
