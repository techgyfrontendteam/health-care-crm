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
  MessageSquare,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useGetLeadByIdQuery, useUpdateLeadMutation } from "../api/leadsApi";
import { AppDrawer } from "../../../shared/components/AppDrawer/AppDrawer";
import { LeadForm } from "../components/LeadForm";
import { toast } from "sonner";
import { formatDate, getProjectStatusOptions } from "../../../utils";
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

export const LeadDetailsPage = () => {
  const { leadId } = useParams<{ leadId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const fromCustomer = location.state?.fromCustomer;
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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [updateLead, { isLoading: isUpdating }] = useUpdateLeadMutation();

  const handleEditSubmit = async (values: any) => {
    try {
      if (lead) {
        await updateLead({ ...values, uuid: lead.uuid }).unwrap();
        toast.success("Lead updated successfully");
      }
      setIsDrawerOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update lead");
    }
  };

  const {
    data: lead,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetLeadByIdQuery({ uuid: leadId || "" }, { skip: !leadId, refetchOnMountOrArgChange: true });

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
    getRmLabel,
    getEmLabel,
    masterData,
    projectLeadStatuses,
  } = useMasterDataLookup();

  const { roleCode } = usePermissions();

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
          className="gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
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
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div
                className="shrink-0 flex items-center justify-center rounded-2xl text-white font-black text-3xl shadow-sm"
                style={{ width: 64, height: 64, backgroundColor: "#0f3d6b" }}
              >
                {initials}
              </div>

              {/* Name + meta */}
              <div>
                <h2
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 800,
                    fontSize: "28px",
                    lineHeight: "36px",
                    color: "#191C1E",
                  }}
                >
                  {lead.first_name || ""} {lead.last_name || ""}
                </h2>
                <div className="flex items-center gap-3 mt-1">
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: "13px",
                      color: "#64748B",
                    }}
                  >
                    Lead ID:{" "}
                    <span style={{ fontWeight: 700, color: "#0f3d6b" }}>
                      #{lead.lead_id}
                    </span>
                  </span>
                  <span style={{ color: "#CBD5E1" }}>·</span>
                  <span
                    className="flex items-center gap-1.5"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      fontSize: "13px",
                      color: "#64748B",
                    }}
                  >
                    <Phone className="h-3.5 w-3.5 text-[#0f3d6b]" />
                    {lead.phone_number || (lead as any).phone || "N/A"}
                  </span>
                  {(lead.email_address || lead.email) && (
                    <>
                      <span style={{ color: "#CBD5E1" }}>·</span>
                      <span
                        className="flex items-center gap-1.5"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 500,
                          fontSize: "13px",
                          color: "#64748B",
                        }}
                      >
                        <Mail className="h-3.5 w-3.5 text-[#0f3d6b]" />
                        {lead.email_address || lead.email}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Points to Talk Dialog */}
            <PointsToTalkDialog
              project={getProjectLabel(lead.project_id)}
              status={displayStatusLabel}
              projectLeadStatusId={projectLeadStatusId}
            />
          </div>

          {/* ═══════════════════════════════════════════════ */}
          {/* CARD 2: General Details                         */}
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
                  General Details
                </h3>
              </div>
              {roleCode !== 'EXPMNG' && (
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-50 transition-colors"
                >
                  <Pencil className="h-4 w-4 text-zinc-500" />
                </button>
              )}
            </div>

            {/* Fields */}
            <dl className="grid grid-cols-2 gap-x-16 gap-y-7 px-8 py-7">
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
                value={lead.hospital_branch || lead.branch || lead.branch_name || "Hyderabad"}
              />
              <DetailField
                label="Follow Up Date"
                value={
                  lead.followup_date || lead.next_followup_date
                    ? formatDate(lead.followup_date || lead.next_followup_date)
                    : (lead.follow_ups && lead.follow_ups.length > 0
                        ? formatDate(lead.follow_ups[0].date_time)
                        : (lead.followups && lead.followups.length > 0
                            ? formatDate(lead.followups[0].date_time)
                            : "--"))
                }
                icon={<Calendar className="h-4 w-4 text-[#0f3d6b]" />}
              />
              <DetailField
                label="Appointment Date"
                value={
                  lead.appointment_date
                    ? formatDate(lead.appointment_date)
                    : (lead.visits && lead.visits.length > 0 && lead.visits[0].visit_date_time
                        ? formatDate(lead.visits[0].visit_date_time)
                        : "--")
                }
                icon={<Calendar className="h-4 w-4 text-[#0f3d6b]" />}
              />
              <DetailField
                label="Specialization"
                value={lead.specialization || getProjectLabel(lead.project_id) || "--"}
              />
            </dl>
          </div>

          {/* ═══════════════════════════════════════════════ */}
          {/* CARD 3: Address Details                         */}
          {/* ═══════════════════════════════════════════════ */}
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
            {/* Section heading */}
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
              >
                Address Details
              </h3>
            </div>

            {/* Fields */}
            <dl className="grid grid-cols-2 gap-x-16 gap-y-7 px-8 py-7">
              <DetailField label="State" value={masterData?.states?.find((s: any) => s.id === lead.state_id)?.description || lead.state} />
              <DetailField label="Country" value={lead.country} />
              <DetailField label="City" value={lead.city} />
              <DetailField label="Zip Code" value={lead.zip} />
              <DetailField label="Street" value={lead.address} />
            </dl>
          </div>

          {/* ═══════════════════════════════════════════════ */}
          {/* CARD 4: Activity / Calls / Chats / Visits       */}
          {/* ═══════════════════════════════════════════════ */}
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full flex flex-col">
              {/* Tab triggers */}
              <div className="border-b border-zinc-200 dark:border-zinc-800">
                <TabsList className="w-full bg-transparent p-0 h-auto rounded-none grid grid-cols-6">
                  {["activity", "calls", "chats", "visits", "enquiries", "followups"].map((tab) => {
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
                        "
                      >
                        {tab === "followups" ? "Follow Ups" : tab === "visits" ? "Appointments" : (tab.charAt(0).toUpperCase() + tab.slice(1))}
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
                    lead={lead}
                    siteVisitStatuses={masterData?.site_visit_status || []}
                    getSiteVisitStatusLabel={(id) =>
                      masterData?.site_visit_status?.find(
                        (s: any) => s.id === id,
                      )?.description || String(id)
                    }
                  />
                </TabsContent>

                <TabsContent value="enquiries" className="mt-0">
                  <div ref={enquiriesRef}>
                    <LeadEnquiriesTab leadId={leadId} enquiries={lead?.enquires} onView={handleViewLead} />
                  </div>
                </TabsContent>

                <TabsContent value="followups" className="mt-0">
                  <div ref={followupsRef}>
                    <LeadFollowUpsTab lead={lead} masterData={masterData} />
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
              initialValues={lead}
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
