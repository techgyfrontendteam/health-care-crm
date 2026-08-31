
import React, { useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { PageHeader } from "../../../shared/components/PageHeader/PageHeader";
import { SearchInput } from "../../../shared/components/FilterBar/FilterBar";
import { AppDrawer } from "../../../shared/components/AppDrawer/AppDrawer";
import { ConfirmDialog } from "../../../shared/components/ConfirmDialog/ConfirmDialog";
import { LeadForm } from "../components/LeadForm";
import { LeadTable } from "../components/LeadTable";
import { BulkActionsBar } from "../components/BulkActionsBar";
import { ScheduleVisitDialog } from "../components/ScheduleVisitDialog";
import { LeadActivityDialog } from "../components/LeadActivityDialog";
import { FilterDialog } from "../../../shared/components/FilterDialog/FilterDialog";
import { JunkReasonDialog } from "../components/JunkReasonDialog";
import { BulkImportDialog } from "../components/BulkImportDialog";
import { Loader2, UserPlus, SlidersHorizontal, ArrowLeft } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";
import {
  useGetLeadsQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useBulkAssignLeadsToRmMutation,
  useBulkAssignLeadsToEmMutation,
  useDeleteLeadMutation,
  useScheduleVisitMutation,
  useGetLeadsByRmIdQuery,
  useGetLeadsByEmIdQuery,
  useAddLeadActivityMutation,
} from "../api/leadsApi";
import { useGetAllMasterDataQuery } from "../../master/api/masterApi";
import { useMasterDataLookup } from "../../../shared/hooks/useMasterDataLookup";
import {
  useGetAllUsersByRoleIdQuery,
  useGetReporteesQuery,
} from "../../users/api/usersApi";
import { usePermissions } from "../../../hooks/usePermissions";
import { PERMISSIONS } from "../../../config/permissions";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import { MultiSelect } from "../../../components/ui/multi-select";
import { cn, getProjectStatusOptions } from "../../../utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  setActiveTab as setActiveTabAction,
  updateTabFilters,
  resetTabFilters,
  setSelectedUuids,
} from "../store/leadsSlice";
import type { Lead, CreateLeadRequest, UpdateLeadRequest } from "../types";
import { JunkLeadsPage } from './JunkLeadsPage';
import { LeadJunkReviewPage } from './LeadJunkReviewPage';
import { ReassignRMModal } from '../components/ReassignRMModal';
import type { JunkLead } from '../data/junkLeadsData';

export const LeadsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fromRMDashboard = location.state?.fromRMDashboard;
  const fromEMDashboard = location.state?.fromEMDashboard;
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentRole, can, user: currentUser } = usePermissions();
  const isAdmin = currentRole?.code === "ADMIN" || currentRole?.code === "SADMIN";
  const isSADMIN = currentRole?.code === "SADMIN";
  const canVerifyJunk = isAdmin && !isSADMIN;
  const isRM = currentRole?.code === "RELMNG";
  const isEM = currentRole?.code === "EXPMNG";
  const showTabs = isAdmin || isRM;

  const { activeTab, tabFilters } = useAppSelector((state) => state.leads);
  const tabKey = showTabs ? String(activeTab) : "all";
  const currentFilters = tabFilters[tabKey];

  const {
    page,
    limit,
    search,
    statusIds,
    projectIds,
    rmIds,
    emIds,
    sortField,
    sortOrder,
    selectedUuids,
  } = currentFilters;


  // Calculate server-side offset based on 200-record chunks
  const serverOffset = Math.floor(((page - 1) * limit) / 200) * 200;

  // Debouncing for API efficiency
  const debouncedSearch = useDebounce(search, 500);
  const debouncedFilters = useDebounce(
    { statusIds, projectIds, rmIds, emIds },
    300,
  );

  // Handlers
  const handleSort = (field: string) => {
    const newSortOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    dispatch(
      updateTabFilters({
        tabKey,
        updates: { sortField: field, sortOrder: newSortOrder },
      }),
    );
  };

  const handleResetFilters = () => {
    dispatch(resetTabFilters(tabKey));
  };

  const handleApplyFilters = (filters: {
    statusIds: string[];
    projectIds: string[];
    rmIds: string[];
    emIds: string[];
  }) => {
    dispatch(updateTabFilters({ tabKey, updates: { ...filters, page: 1 } }));
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isBulkImportOpen, setIsBulkImportOpen] = useState(false);
  const [showRandomConfirm, setShowRandomConfirm] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [deleteUuid, setDeleteUuid] = useState<string | null>(null);
  const [schedulingLead, setSchedulingLead] = useState<Lead | null>(null);
  const [activityLead, setActivityLead] = useState<Lead | null>(null);
  const [isJunkDialogOpen, setIsJunkDialogOpen] = useState(false);
  const [pendingJunkUpdate, setPendingJunkUpdate] = useState<{ lead: Lead; statusId: number } | null>(null);

  // Junk Leads Flow State
  const [activeView, setActiveView] = useState<string>('leads');
  const [selectedJunkLead, setSelectedJunkLead] = useState<Lead | null>(null);
  const [showReassignModal, setShowReassignModal] = useState(false);

  const handleVerifyLead = React.useCallback((lead: Lead) => {
    setSelectedJunkLead(lead);
    setActiveView('junk-review');
  }, []);

  // Data Fetching
  const { data: masterData } = useGetAllMasterDataQuery();
  const { projectLeadStatuses } = useMasterDataLookup();
  const { data: rms = [] } = useGetAllUsersByRoleIdQuery({
    role_id: 3,
    offset: 0,
  });

  const statusOptions = React.useMemo(() => {
    const options = masterData?.lead_statuses?.map((s: any) => ({
      value: String(s.id),
      label: s.description,
    })) || [];

    if (activeView === 'leads') {
      return options.filter((o: any) => {
        const s = masterData?.lead_statuses?.find((st: any) => String(st.id) === o.value);
        return s?.code !== 'JUNKPE' && s?.code !== 'JUNKCM';
      });
    }
    return options;
  }, [masterData, activeView]);

  const projectOptions = React.useMemo(() => {
    if (!masterData?.projects) return [];

    const userProjectIds = currentUser?.project_ids || [];
    const availableProjects = (isSADMIN && userProjectIds.length === 0)
      ? masterData.projects
      : masterData.projects.filter((p: any) => userProjectIds.includes(p.id));

    return availableProjects.map((p: any) => ({
      value: String(p.id),
      label: p.description,
    }));
  }, [masterData, currentUser, isSADMIN]);

  const defaultProjectLeadStatusIds = React.useMemo(() => {
    if (!projectLeadStatuses || !masterData?.lead_statuses) return [];

    const projectIdsToConsider: number[] = debouncedFilters.projectIds.length > 0
      ? debouncedFilters.projectIds.map(Number)
      : (currentUser?.project_ids && currentUser.project_ids.length > 0 ? currentUser.project_ids.map(Number) : (masterData?.projects?.map((p: any) => Number(p.id)) || []));

    const junkStatusIds = new Set(
      masterData.lead_statuses
        .filter((s: any) => s.code === 'JUNKPE' || s.code === 'JUNKCM')
        .map((s: any) => s.id)
    );

    const validIds = new Set<number>();

    projectLeadStatuses.forEach((proj: any) => {
      if (projectIdsToConsider.includes(proj.project_id)) {
        if (Array.isArray(proj.status)) {
          proj.status.forEach((statusObj: any) => {
            if (!junkStatusIds.has(statusObj.lead_status_id)) {
              validIds.add(statusObj.id);
            }
          });
        }
      }
    });

    return Array.from(validIds);
  }, [projectLeadStatuses, masterData, debouncedFilters.projectIds, currentUser]);

  const queryStatusIds = React.useMemo(() =>
    debouncedFilters.statusIds.length > 0
      ? debouncedFilters.statusIds.map(Number)
      : (activeView === 'leads' ? defaultProjectLeadStatusIds : undefined)
    , [debouncedFilters.statusIds, activeView, defaultProjectLeadStatusIds]);

  const queryProjectIds = React.useMemo(() =>
    debouncedFilters.projectIds.length > 0
      ? debouncedFilters.projectIds.map(Number)
      : (isAdmin ? [] : undefined)
    , [debouncedFilters.projectIds, isAdmin]);

  const queryRmIds = React.useMemo(() =>
    debouncedFilters.rmIds.length > 0
      ? debouncedFilters.rmIds.map(Number)
      : undefined
    , [debouncedFilters.rmIds]);

  const queryEmIds = React.useMemo(() =>
    debouncedFilters.emIds.length > 0
      ? debouncedFilters.emIds.map(Number)
      : undefined
    , [debouncedFilters.emIds]);

  // Admin view uses getLeads
  const {
    data: rawAdminLeads,
    isLoading: isAdminLoading,
    isFetching: isAdminFetching,
    refetch: refetchAdmin,
  } = useGetLeadsQuery({
    offset: serverOffset,
    is_rm_assigned: isAdmin ? (activeTab === 1 ? 1 : 0) : undefined,
    search_text: debouncedSearch || undefined,
    status: queryStatusIds,
    project: queryProjectIds,
    rm: queryRmIds,
    em: queryEmIds,
  }, { skip: !isAdmin });

  // RM view uses getLeadsByRmId
  const {
    data: rawRmLeads,
    isLoading: isRMLoading,
    isFetching: isRMFetching,
    refetch: refetchRM,
  } = useGetLeadsByRmIdQuery({
    assigned_to_rm: Number(currentUser?.id || 0),
    offset: serverOffset,
    is_em_assigned: activeTab,
    status: queryStatusIds,
    project: queryProjectIds,
    em: queryEmIds,
    search_text: debouncedSearch || undefined,
  }, { skip: !isRM });

  // EM view uses getLeadsByEmId
  const {
    data: rawEmLeads,
    isLoading: isEMLoading,
    isFetching: isEMFetching,
    refetch: refetchEM,
  } = useGetLeadsByEmIdQuery({
    assigned_to_em: Number(currentUser?.id || 0),
    offset: serverOffset,
    status: queryStatusIds,
    project: queryProjectIds,
    rm: queryRmIds,
    search_text: debouncedSearch || undefined,
  }, { skip: !isEM });

  const adminLeads = React.useMemo(() => {
    return Array.isArray(rawAdminLeads) ? rawAdminLeads : (rawAdminLeads?.data || []);
  }, [rawAdminLeads]);

  const rmLeads = React.useMemo(() => {
    return Array.isArray(rawRmLeads) ? rawRmLeads : (rawRmLeads?.data || []);
  }, [rawRmLeads]);

  const emLeads = React.useMemo(() => {
    return Array.isArray(rawEmLeads) ? rawEmLeads : (rawEmLeads?.data || []);
  }, [rawEmLeads]);
  const [addLeadActivity, { isLoading: isAddingActivity }] =
    useAddLeadActivityMutation();

  const handleRefetch = React.useCallback(() => {
    if (isAdmin) refetchAdmin();
    if (isRM) refetchRM();
    if (isEM) refetchEM();
  }, [isAdmin, isRM, isEM, refetchAdmin, refetchRM, refetchEM]);

  // Load saved filters on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("leadsFilters");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // We restore filters for all saved tabs
        Object.entries(parsed).forEach(([key, filters]) => {
          const updates = { ...(filters as any) };
          if (isAdmin) {
            updates.projectIds = [];
          }
          dispatch(updateTabFilters({ tabKey: key, updates }));
        });
      } catch (e) {
        console.error("Failed to parse saved filters", e);
      }
    }
  }, [dispatch, isAdmin]);


  const hasInitializedProjectFilter = React.useRef(false);

  React.useEffect(() => {
    if (hasInitializedProjectFilter.current || isAdmin) return;
    if (currentUser?.project_ids && currentUser.project_ids.length > 0 && masterData?.projects) {
      const saved = localStorage.getItem("leadsFilters");
      let parsedSaved: Record<string, any> = {};
      if (saved) {
        try {
          parsedSaved = JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse saved filters", e);
        }
      }

      const validProjectIds = currentUser.project_ids
        .filter(id => masterData.projects.some((p: any) => p.id === id))
        .map(String);

      if (validProjectIds.length > 0) {
        const tabKeys = showTabs ? ["0", "1", "all"] : ["all"];

        tabKeys.forEach((key) => {
          if (!parsedSaved[key] || !parsedSaved[key].projectIds) {
            dispatch(
              updateTabFilters({
                tabKey: key,
                updates: { projectIds: validProjectIds, page: 1 },
              })
            );
          }
        });
        hasInitializedProjectFilter.current = true;
      }
    }
  }, [currentUser, masterData, dispatch, showTabs]);

  // Handle external project, RM, or EM filter pre-selection (e.g. from Dashboards)
  React.useEffect(() => {
    const routeProjectId = location.state?.projectId || searchParams.get("projectId");
    const routeRmId = location.state?.rmId || searchParams.get("rmId");
    const routeEmId = location.state?.emId || searchParams.get("emId");

    if (routeProjectId || routeRmId || routeEmId) {
      const tabKeys = showTabs ? ["0", "1", "all"] : ["all"];
      const updates: Record<string, any> = { page: 1 };

      if (routeProjectId) {
        updates.projectIds = [String(routeProjectId)];
      }
      if (routeRmId) {
        updates.rmIds = [String(routeRmId)];
      }
      if (routeEmId) {
        updates.emIds = [String(routeEmId)];
      }

      tabKeys.forEach((key) => {
        dispatch(
          updateTabFilters({
            tabKey: key,
            updates,
          })
        );
      });

      // Update localStorage filters too so it stays selected
      const saved = localStorage.getItem("leadsFilters");
      const parsed = saved ? JSON.parse(saved) : {};
      tabKeys.forEach((key) => {
        parsed[key] = {
          ...(parsed[key] || {}),
          ...updates,
        };
      });
      localStorage.setItem("leadsFilters", JSON.stringify(parsed));

      // Clear route state & query params to prevent resetting on subsequent actions
      const newParams = new URLSearchParams(searchParams);
      let changedParams = false;

      if (searchParams.get("projectId")) {
        newParams.delete("projectId");
        changedParams = true;
      }
      if (searchParams.get("rmId")) {
        newParams.delete("rmId");
        changedParams = true;
      }
      if (searchParams.get("emId")) {
        newParams.delete("emId");
        changedParams = true;
      }

      if (location.state?.projectId || location.state?.rmId || location.state?.emId) {
        const nextState = { ...location.state };
        delete nextState.projectId;
        delete nextState.rmId;
        delete nextState.emId;
        navigate(location.pathname, { replace: true, state: nextState });
      } else if (changedParams) {
        setSearchParams(newParams, { replace: true });
      }
    }
  }, [location, searchParams, setSearchParams, dispatch, showTabs, navigate]);

  const leads = React.useMemo(() => {
    let list = isAdmin ? adminLeads : (isRM ? rmLeads : emLeads);

    // Fallback frontend search filtering if backend misses it
    if (debouncedSearch) {
      const s = debouncedSearch.toLowerCase();
      list = list.filter(l =>
        (l.first_name || '').toLowerCase().includes(s) ||
        (l.last_name || '').toLowerCase().includes(s) ||
        (l.phone_number || '').includes(s) ||
        (l.lead_id || '').toString().toLowerCase().includes(s) ||
        ((l.first_name || '') + ' ' + (l.last_name || '')).toLowerCase().includes(s)
      );
    }

    // Exclude Junk and Junk Review statuses from the main Leads view
    if (activeView === 'leads') {
      return list.filter(l => {
        const projectOptions = getProjectStatusOptions(l.project_id, projectLeadStatuses || []);
        const matchedOption = projectOptions.find((o: any) => o.id === l.project_lead_status_id);
        const s = masterData?.lead_statuses?.find(st => st.id === matchedOption?.lead_status_id);
        return s?.code !== 'JUNKPE' && s?.code !== 'JUNKCM';
      });
    }
    return list;
  }, [isAdmin, adminLeads, isRM, rmLeads, isEM, emLeads, activeView, masterData, debouncedSearch]);

  const isLoading = isAdmin ? isAdminLoading : (isRM ? isRMLoading : isEMLoading);
  const isFetching = isAdmin ? isAdminFetching : (isRM ? isRMFetching : isEMFetching);

  // For EM assignment restricted to RM's reportees
  const { data: emsReportees = [] } = useGetReporteesQuery(
    { reporting_manager_id: Number(currentUser?.id || 0), offset: 0 },
    { skip: !isRM }
  );


  // Users listed in the bulk assignment dropdown: RMs for Admin, EMs for RM
  const assignmentUsers = isAdmin ? rms : emsReportees;

  const { data: ems = [] } = useGetReporteesQuery(
    { reporting_manager_id: Number(rmIds[0] || 0), offset: 0 },
    { skip: rmIds.length === 0 },
  );

  const [createLead, { isLoading: isCreating }] = useCreateLeadMutation();
  const [updateLead, { isLoading: isUpdating }] = useUpdateLeadMutation();
  const [bulkAssign, { isLoading: isBulkAssigning }] =
    useBulkAssignLeadsToRmMutation();
  const [bulkAssignToEm, { isLoading: isBulkAssignToEm }] =
    useBulkAssignLeadsToEmMutation();
  const { data: managers = [] } = useGetAllUsersByRoleIdQuery({ role_id: 3, offset: 0 });
  const [deleteLead, { isLoading: isDeleting }] = useDeleteLeadMutation();
  const [scheduleVisit, { isLoading: isScheduling }] =
    useScheduleVisitMutation();

  const isAnyBulkAssigning = isBulkAssigning || isBulkAssignToEm;

  const handleBulkAssign = async (targetId: number, type: 'rm' | 'em') => {
    if (selectedUuids.length === 0) return;
    try {
      if (type === 'rm') {
        await bulkAssign({
          lead_uuids: selectedUuids,
          assigned_to_rm: targetId,
        }).unwrap();
        toast.success("Leads successfully assigned to RM");
      } else {
        await bulkAssignToEm({
          lead_uuids: selectedUuids,
          assigned_to_em: targetId,
        }).unwrap();
        toast.success("Leads successfully assigned to EM");
      }
      dispatch(setSelectedUuids({ tabKey, uuids: [] }));
    } catch (err: any) {
      toast.error(err?.data?.message || "Bulk assignment failed");
    }
  };

  const handleBulkMarkAsJunk = async () => {
    if (selectedUuids.length === 0) return;
    try {
      const promises = selectedUuids.map(uuid => deleteLead({ uuid }).unwrap());
      await Promise.all(promises);
      toast.success(`${selectedUuids.length} leads marked as junk`);
      dispatch(setSelectedUuids({ tabKey, uuids: [] }));
    } catch (err: any) {
      toast.error(err?.data?.message || "Bulk action failed");
    }
  };

  const handleLeadActivity = (lead: Lead) => {
    setActivityLead(lead);
  };

  const handleLeadActivitySubmit = async (data: any) => {
    try {
      await addLeadActivity(data).unwrap();
      toast.success("Activity added successfully");
      setActivityLead(null);
    } catch (err: unknown) {
      toast.error((err as { data?: { message?: string } })?.data?.message || "Failed to add activity");
    }
  };

  const handleRandomAssign = async () => {
    if (leads.length === 0 || assignmentUsers.length === 0) {
      toast.error(`No leads or ${isAdmin ? "RMs" : "EMs"} available for assignment`);
      return;
    }

    try {
      const shuffledLeads = [...leads].sort(() => Math.random() - 0.5);
      const leadUuids = shuffledLeads.map((l) => l.uuid);
      const chunkSize = Math.ceil(leadUuids.length / assignmentUsers.length);
      const assignmentPromises = [];

      for (let i = 0; i < assignmentUsers.length; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, leadUuids.length);
        const chunk = leadUuids.slice(start, end);

        if (chunk.length > 0) {
          if (isAdmin) {
            assignmentPromises.push(
              bulkAssign({
                lead_uuids: chunk,
                assigned_to_rm: assignmentUsers[i].id,
              }).unwrap(),
            );
          } else if (isRM) {
            assignmentPromises.push(
              bulkAssignToEm({
                lead_uuids: chunk,
                assigned_to_em: assignmentUsers[i].id,
              }).unwrap(),
            );
          }
        }
      }

      await Promise.all(assignmentPromises);
      toast.success(
        `Successfully distributed ${leadUuids.length} leads across ${assignmentUsers.length} ${isAdmin ? "RMs" : "EMs"}`,
      );
    } catch (err: any) {
      toast.error(err?.data?.message || "Random assignment failed");
    }
  };

  const handleCreateNew = React.useCallback(() => {
    setEditingLead(null);
    setIsDrawerOpen(true);
  }, []);

  const handleEdit = React.useCallback((lead: Lead) => {
    setEditingLead(lead);
    setIsDrawerOpen(true);
  }, []);

  const handleScheduleVisit = React.useCallback((lead: Lead) => {
    if (isSADMIN) {
      toast.error("Super Admin cannot schedule site visits");
      return;
    }
    setSchedulingLead(lead);
  }, [isSADMIN]);

  const handleDelete = React.useCallback((uuid: string) => {
    setDeleteUuid(uuid);
  }, []);

  const handleFormSubmit = async (values: CreateLeadRequest) => {
    try {
      if (editingLead) {
        await updateLead({ ...values, uuid: editingLead.uuid }).unwrap();
        toast.success("Lead updated successfully");
        if (values.assigned_to_rm) {
          dispatch(setActiveTabAction(1));
        }
        handleRefetch();
      } else {
        await createLead(values).unwrap();
        toast.success("Lead created successfully");
      }
      setIsDrawerOpen(false);
    } catch (err: any) {
      const errorMsg = err?.data?.message || err?.data?.error || err?.data?.detail || err?.message || "Operation failed";
      toast.error(errorMsg);
    }
  };

  const handleScheduleVisitSubmit = async (data: any) => {
    try {
      // 1. Schedule visit
      await scheduleVisit(data).unwrap();

      // 2. Update Lead assignment to ensure RM and EM are in sync
      // if (schedulingLead) {
      //   await updateLead({
      //     uuid: schedulingLead.uuid,
      //     first_name: schedulingLead.first_name || '',
      //     last_name: schedulingLead.last_name || '',
      //     phone_number: schedulingLead.phone_number || '',
      //     email_address: schedulingLead.email_address || '',
      //     occupation: schedulingLead.occupation || '',
      //     address: schedulingLead.address || '',
      //     city: schedulingLead.city || '',
      //     state: schedulingLead.state || '',
      //     country: schedulingLead.country || '',
      //     zip: schedulingLead.zip || '',
      //     source_id: schedulingLead.source_id,
      //     source_employee_user_id: schedulingLead.source_employee_user_id || null,
      //     project_id: schedulingLead.project_id,
      //     assigned_to_rm: schedulingLead.assigned_to_rm || data.visit_assigned_to_rm || null,
      //     assigned_to_em: schedulingLead.assigned_to_em || data.visit_assigned_to_em || null,
      //     lead_priority_id: schedulingLead.lead_priority_id || 1,
      //     lead_status_id: schedulingLead.lead_status_id,
      //   }).unwrap();
      // }

      toast.success("Visit scheduled & assignment updated");
      setSchedulingLead(null);
      handleRefetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to schedule visit");
    }
  };

  const handleUpdateStatus = React.useCallback(async (lead: Lead, newStatusId: number) => {
    const junkStatus = masterData?.lead_statuses?.find(s => s.code === 'JUNKPE');
    const projectOptions = getProjectStatusOptions(
      lead.project_id,
      projectLeadStatuses || []
    );
    const selectedOption = projectOptions.find((o: any) => o.id === newStatusId);

    if (junkStatus && selectedOption && selectedOption.lead_status_id === junkStatus.id) {
      setPendingJunkUpdate({ lead, statusId: newStatusId });
      setIsJunkDialogOpen(true);
      return;
    }

    try {
      const payload: UpdateLeadRequest = {
        uuid: lead.uuid,
        first_name: lead.first_name || '',
        last_name: lead.last_name || '',
        phone_number: lead.phone_number || '',
        email_address: lead.email_address || '',
        occupation: lead.occupation || '',
        address: lead.address || '',
        city: lead.city || '',
        state: lead.state || '',
        country: lead.country || '',
        zip: lead.zip || '',
        source_id: lead.source_id,
        source_employee_user_id: lead.source_employee_user_id || null,
        project_id: lead.project_id,
        assigned_to_rm: lead.assigned_to_rm || null,
        assigned_to_em: lead.assigned_to_em || null,
        lead_priority_id: lead.lead_priority_id || 1,
        project_lead_status_id: newStatusId,
      };

      await updateLead(payload).unwrap();
      toast.success('Status updated successfully!');
      handleRefetch();
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update status');
    }
  }, [updateLead, masterData, handleRefetch]);

  const handleJunkReasonConfirm = async (reason: string) => {
    if (!pendingJunkUpdate) return;
    const { lead, statusId } = pendingJunkUpdate;
    try {
      const payload: UpdateLeadRequest = {
        uuid: lead.uuid,
        first_name: lead.first_name || '',
        last_name: lead.last_name || '',
        phone_number: lead.phone_number || '',
        email_address: lead.email_address || '',
        occupation: lead.occupation || '',
        address: lead.address || '',
        city: lead.city || '',
        state: lead.state || '',
        country: lead.country || '',
        zip: lead.zip || '',
        source_id: lead.source_id,
        source_employee_user_id: lead.source_employee_user_id || null,
        project_id: lead.project_id,
        assigned_to_rm: lead.assigned_to_rm || null,
        assigned_to_em: lead.assigned_to_em || null,
        lead_priority_id: lead.lead_priority_id || 1,
        project_lead_status_id: statusId,
        junk_reason: reason,
      };

      await updateLead(payload).unwrap();
      toast.success('Lead marked as junk for review!');
      setIsJunkDialogOpen(false);
      setPendingJunkUpdate(null);
      handleRefetch();
    }
    catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update status');
    }
  };

  const handleAssignRm = React.useCallback(async (lead: Lead, rmId: number | null) => {
    try {
      const payload: UpdateLeadRequest = {
        uuid: lead.uuid,
        first_name: lead.first_name || '',
        last_name: lead.last_name || '',
        phone_number: lead.phone_number || '',
        email_address: lead.email_address || '',
        occupation: lead.occupation || '',
        address: lead.address || '',
        city: lead.city || '',
        state: lead.state || '',
        country: lead.country || '',
        zip: lead.zip || '',
        source_id: lead.source_id,
        source_employee_user_id: lead.source_employee_user_id || null,
        project_id: lead.project_id,
        assigned_to_rm: rmId,
        assigned_to_em: rmId !== lead.assigned_to_rm ? null : (lead.assigned_to_em || null),
        lead_priority_id: lead.lead_priority_id || 1,
        project_lead_status_id: lead.project_lead_status_id,
      };
      await updateLead(payload).unwrap();
      toast.success(rmId ? 'RM assigned successfully!' : 'RM unassigned');
      handleRefetch();
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to assign RM');
    }
  }, [updateLead, handleRefetch]);

  const handleAssignEm = React.useCallback(async (lead: Lead, emId: number | null) => {
    try {
      const payload: UpdateLeadRequest = {
        uuid: lead.uuid,
        first_name: lead.first_name || '',
        last_name: lead.last_name || '',
        phone_number: lead.phone_number || '',
        email_address: lead.email_address || '',
        occupation: lead.occupation || '',
        address: lead.address || '',
        city: lead.city || '',
        state: lead.state || '',
        country: lead.country || '',
        zip: lead.zip || '',
        source_id: lead.source_id,
        source_employee_user_id: lead.source_employee_user_id || null,
        project_id: lead.project_id,
        assigned_to_rm: lead.assigned_to_rm || null,
        assigned_to_em: emId,
        lead_priority_id: lead.lead_priority_id || 1,
        project_lead_status_id: lead.project_lead_status_id,
      };
      await updateLead(payload).unwrap();
      toast.success(emId ? 'EM assigned successfully!' : 'EM unassigned');
      handleRefetch();
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to assign EM');
    }
  }, [updateLead, handleRefetch]);

  const handlePageChange = React.useCallback((v: number) => {
    dispatch(updateTabFilters({ tabKey, updates: { page: v } }));
  }, [dispatch, tabKey]);

  const handleLimitChange = React.useCallback((v: number) => {
    dispatch(updateTabFilters({ tabKey, updates: { limit: v, page: 1 } }));
  }, [dispatch, tabKey]);

  const handleSelectUuids = React.useCallback((uuids: string[]) => {
    dispatch(setSelectedUuids({ tabKey, uuids }));
  }, [dispatch, tabKey]);

  // Local Sort logic for the current buffer
  const sortedLeads = React.useMemo(() => {
    const result = [...leads];
    result.sort((a, b) => {
      let valA: any = (a as any)[sortField];
      let valB: any = (b as any)[sortField];

      if (sortField === "created_on") {
        valA = a.created_on ? new Date(a.created_on).getTime() : 0;
        valB = b.created_on ? new Date(b.created_on).getTime() : 0;
      } else if (sortField === "customer_name") {
        valA = `${a.first_name || ""} ${a.last_name || ""}`.toLowerCase().trim();
        valB = `${b.first_name || ""} ${b.last_name || ""}`.toLowerCase().trim();
      } else {
        valA = typeof valA === "string" ? valA.toLowerCase() : (valA ?? "");
        valB = typeof valB === "string" ? valB.toLowerCase() : (valB ?? "");
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return result;
  }, [leads, sortField, sortOrder]);

  const activeLeadsData = isAdmin ? rawAdminLeads : (isRM ? rawRmLeads : rawEmLeads);

  const totalLeads = React.useMemo(() => {
    const rawList = Array.isArray(activeLeadsData) ? activeLeadsData : (activeLeadsData?.data || []);

    // If we received fewer than 200 records from the server, we are definitely on the last chunk.
    // The exact total is serverOffset + the number of locally filtered leads in this chunk.
    if (rawList.length < 200) {
      return serverOffset + leads.length;
    }

    if (!Array.isArray(activeLeadsData) && activeLeadsData && typeof activeLeadsData === 'object') {
      if (activeLeadsData.filtered_count !== undefined && activeLeadsData.filtered_count !== null) {
        return activeLeadsData.filtered_count;
      }
      if (activeLeadsData.total_count !== undefined && activeLeadsData.total_count !== null) {
        return activeLeadsData.total_count;
      }
    }
    return serverOffset + 201;
  }, [activeLeadsData, leads.length, serverOffset]);

  return (
    <div className="space-y-4">
      {fromEMDashboard ? (
        <button
          onClick={() => navigate("/agents")}
          className="flex items-center gap-2 text-xs font-extrabold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer hover:underline mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Sales Executive Dashboard
        </button>
      ) : fromRMDashboard ? (
        <button
          onClick={() => navigate("/relationship-managers")}
          className="flex items-center gap-2 text-xs font-extrabold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer hover:underline mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Sales Head Dashboard
        </button>
      ) : null}
      {activeView === 'leads' || activeView === 'junk' ? (
        <PageHeader
          title={activeView === 'leads' ? "Lead Management Queue" : "Manage Junks"}
          description={activeView === 'leads' ? "Manage and track your sales pipeline efficiency" : "Streamline and audit the junk lead restoration process"}
          actions={
            activeView === 'leads' && can(PERMISSIONS.LEAD_CREATE) ? (
              <Button onClick={handleCreateNew} className="gap-2 bg-[#063669] hover:bg-[#063669]/90 text-white rounded-[16px] h-11 px-6 font-bold">
                <UserPlus size={18} />
                Create New Lead
              </Button>
            ) : undefined
          }
        />
      ) : null}

      {/* Search + Tabs Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="w-full sm:w-1/2">
          {activeView === 'leads' && (
            <SearchInput
              value={search}
              onChange={(v) =>
                dispatch(updateTabFilters({ tabKey, updates: { search: v, page: 1 } }))
              }
              placeholder="Search by Lead ID, Name, or Phone Number"
            />
          )}
        </div>

        {showTabs && activeView !== 'junk-review' && (
          <div className="flex items-center gap-2 p-2 bg-[#f0f2f5] dark:bg-zinc-900/50 rounded-xl w-fit border border-zinc-200/50 dark:border-zinc-800/50">
            <button
              onClick={() => {
                dispatch(setActiveTabAction(0));
                setActiveView('leads');
              }}
              style={{
                width: (activeTab === 0 && activeView === 'leads') ? '210.87px' : '155.8px',
                height: (activeTab === 0 && activeView === 'leads') ? '39px' : '36px'
              }}
              className={cn(
                "flex items-center justify-center gap-2 rounded-[8px] transition-all duration-200 text-sm font-bold",
                activeTab === 0 && activeView === 'leads'
                  ? "bg-white dark:bg-zinc-800 text-primary shadow-sm border border-zinc-200 pt-[7.5px] pb-[9.5px] px-6"
                  : "text-slate-500 hover:text-primary p-2 px-6",
              )}
            >
              Unassigned
            </button>
            <button
              onClick={() => {
                dispatch(setActiveTabAction(1));
                setActiveView('leads');
              }}
              style={{
                width: (activeTab === 1 && activeView === 'leads') ? '210.87px' : '155.8px',
                height: (activeTab === 1 && activeView === 'leads') ? '39px' : '36px'
              }}
              className={cn(
                "flex items-center justify-center gap-2 rounded-[8px] transition-all duration-200 text-sm font-bold",
                activeTab === 1 && activeView === 'leads'
                  ? "bg-white dark:bg-zinc-800 text-primary shadow-sm border border-zinc-200 pt-[7.5px] pb-[9.5px] px-6"
                  : "text-slate-500 hover:text-primary p-2 px-6",
              )}
            >
              Assigned
            </button>
            <button
              onClick={() => setActiveView('junk')}
              style={{
                width: (activeView === 'junk' || activeView === 'junk-review') ? '210.87px' : '155.8px',
                height: (activeView === 'junk' || activeView === 'junk-review') ? '39px' : '36px'
              }}
              className={cn(
                "flex items-center justify-center gap-2 rounded-[8px] transition-all duration-200 text-sm font-bold",
                activeView === 'junk' || activeView === 'junk-review'
                  ? "bg-white dark:bg-zinc-800 text-primary shadow-sm border border-zinc-200 pt-[7.5px] pb-[9.5px] px-6"
                  : "text-slate-500 hover:text-primary p-2 px-6",
              )}
            >
              Junk
            </button>
          </div>
        )}
      </div>

      {/* Main Table Card */}
      {activeView === 'leads' && (
        <div className="rounded-3xl border border-border/40 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/40">
            <div className="flex items-center gap-2">
              <h2
                className="font-bold text-[#191C1E] font-['Plus_Jakarta_Sans'] flex items-center gap-2"
                style={{ height: '28px', fontSize: '18px', lineHeight: '28px' }}
              >
                Active Leads Queue
                <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: '#D92D20' }} />
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setIsFilterDialogOpen(true)}
                className="gap-3 relative h-11 rounded-[16px] px-6 border-zinc-200 dark:border-zinc-800 text-base font-bold text-primary bg-white shadow-sm hover:bg-zinc-50 transition-all ring-0 focus-visible:ring-0"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filter
                {(statusIds.length + ((isSADMIN || isAdmin) ? projectIds.length : 0) + (isAdmin ? rmIds.length : 0) + emIds.length) > 0 && (
                  <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 py-0.5 text-[10px] font-bold bg-primary text-white rounded-full">
                    {statusIds.length + ((isSADMIN || isAdmin) ? projectIds.length : 0) + (isAdmin ? rmIds.length : 0) + emIds.length}
                  </span>
                )}
              </Button>

              <FilterDialog
                open={isFilterDialogOpen}
                onClose={() => setIsFilterDialogOpen(false)}
                onApply={(filters) => {
                  const updates = {
                    ...filters,
                    page: 1
                  };
                  dispatch(updateTabFilters({
                    tabKey,
                    updates
                  }));

                  // Save to localStorage
                  const saved = localStorage.getItem("leadsFilters");
                  const parsed = saved ? JSON.parse(saved) : {};
                  parsed[tabKey] = updates;
                  localStorage.setItem("leadsFilters", JSON.stringify(parsed));
                }}
                onReset={() => {
                  dispatch(resetTabFilters(tabKey));

                  // Update localStorage
                  const saved = localStorage.getItem("leadsFilters");
                  if (saved) {
                    const parsed = JSON.parse(saved);
                    delete parsed[tabKey];
                    localStorage.setItem("leadsFilters", JSON.stringify(parsed));
                  }

                  setIsFilterDialogOpen(false);
                }}
                statusIds={statusIds}
                statusOptions={statusOptions}
                projectIds={projectIds}
                projectOptions={projectOptions}
                rmIds={isAdmin ? rmIds : (currentUser?.id ? [String(currentUser.id)] : [])}
                emIds={emIds}
                rmOptions={rms}
                showRmFilter={activeTab !== 0 && isAdmin}
                showEmFilter={activeTab !== 0 && (isAdmin || isRM)}
                showProjectFilter={isSADMIN || isAdmin}
              />

              {isAdmin && (activeTab === 0 || activeTab === 1) && (
                <>
                  <Button
                    onClick={() => setIsBulkImportOpen(true)}
                    className="gap-2 h-11 rounded-[16px] px-6 text-base font-bold bg-[#063669] hover:bg-[#063669]/90 text-white shadow-sm transition-all focus-visible:ring-0"
                  >
                    <UserPlus className="h-4 w-4" />
                    Bulk Import
                  </Button>
                  {activeTab === 0 && (
                    <Button
                      onClick={() => setShowRandomConfirm(true)}
                      disabled={isAnyBulkAssigning}
                      className="gap-2 h-11 rounded-[16px] px-6 text-base font-bold bg-[#063669] hover:bg-[#063669]/90 text-white shadow-sm transition-all focus-visible:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAnyBulkAssigning ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                      Bulk Auto-Assign
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>

          <div>

            <LeadTable
              data={sortedLeads}
              isLoading={isLoading || isFetching}
              page={page}
              limit={limit}
              total={totalLeads}
              onPageChange={handlePageChange}
              onLimitChange={handleLimitChange}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onScheduleVisit={!isSADMIN ? handleScheduleVisit : undefined}
              onUpdateStatus={handleUpdateStatus}
              onAssignRm={handleAssignRm}
              onAssignEm={handleAssignEm}
              sortField={sortField}
              sortOrder={sortOrder}
              onSort={handleSort}
              offset={serverOffset}
              selectedUuids={selectedUuids}
              onSelectUuids={handleSelectUuids}
            />
          </div>
        </div>
      )}

      {activeView === 'junk' && (
        <JunkLeadsPage
          canVerify={canVerifyJunk}
          onVerify={handleVerifyLead}
        />
      )}

      {activeView === 'junk-review' && selectedJunkLead && (
        <>
          <LeadJunkReviewPage
            lead={selectedJunkLead as unknown as Lead}
            onBack={() => setActiveView('junk')}
            isUpdating={isUpdating}
            onReassign={(reason) => {
              setShowReassignModal(true);
            }}
            onApprove={async (reason) => {
              try {
                const junkStatusId = masterData?.lead_statuses?.find(
                  (s) => s.code === 'JUNKCM'
                )?.id;

                if (!junkStatusId || !selectedJunkLead) return;

                await updateLead({
                  uuid: selectedJunkLead.uuid,
                  first_name: (selectedJunkLead as any).first_name || '',
                  last_name: (selectedJunkLead as any).last_name || '',
                  phone_number: (selectedJunkLead as any).phone_number || '',
                  email_address: (selectedJunkLead as any).email_address || '',
                  occupation: (selectedJunkLead as any).occupation || '',
                  address: (selectedJunkLead as any).address || '',
                  city: (selectedJunkLead as any).city || '',
                  state: (selectedJunkLead as any).state || '',
                  country: (selectedJunkLead as any).country || '',
                  zip: (selectedJunkLead as any).zip || '',
                  source_id: (selectedJunkLead as any).source_id,
                  source_employee_user_id: (selectedJunkLead as any).source_employee_user_id || null,
                  project_id: (selectedJunkLead as any).project_id,
                  assigned_to_rm: (selectedJunkLead as any).assigned_to_rm || null,
                  assigned_to_em: (selectedJunkLead as any).assigned_to_em || null,
                  lead_priority_id: (selectedJunkLead as any).lead_priority_id || 1,
                  project_lead_status_id: (() => {
                    const projectOptions = getProjectStatusOptions(
                      selectedJunkLead.project_id,
                      projectLeadStatuses || []
                    );
                    return projectOptions.find((o: any) => o.lead_status_id === junkStatusId)?.id || selectedJunkLead.project_lead_status_id;
                  })(),
                  junk_reason: reason || (selectedJunkLead as any).junk_reason,
                }).unwrap();

                toast.success("Lead marked as Junk successfully");
                setActiveView('junk');
                handleRefetch();
              } catch (err: any) {
                toast.error(err?.data?.message || "Failed to approve junk");
              }
            }}
            onRemoveJunk={async () => {
              try {
                const newLeadStatusId = masterData?.lead_statuses?.find(
                  (s) => s.code === 'NEWLED'
                )?.id;

                if (!newLeadStatusId || !selectedJunkLead) return;

                const updatedLead = {
                  uuid: selectedJunkLead.uuid,
                  first_name: (selectedJunkLead as any).first_name || '',
                  last_name: (selectedJunkLead as any).last_name || '',
                  phone_number: (selectedJunkLead as any).phone_number || '',
                  email_address: (selectedJunkLead as any).email_address || '',
                  occupation: (selectedJunkLead as any).occupation || '',
                  address: (selectedJunkLead as any).address || '',
                  city: (selectedJunkLead as any).city || '',
                  state: (selectedJunkLead as any).state || '',
                  country: (selectedJunkLead as any).country || '',
                  zip: (selectedJunkLead as any).zip || '',
                  source_id: (selectedJunkLead as any).source_id,
                  source_employee_user_id: (selectedJunkLead as any).source_employee_user_id || null,
                  project_id: (selectedJunkLead as any).project_id,
                  assigned_to_rm: (selectedJunkLead as any).assigned_to_rm || null,
                  assigned_to_em: (selectedJunkLead as any).assigned_to_em || null,
                  lead_priority_id: (selectedJunkLead as any).lead_priority_id || 1,
                  project_lead_status_id: (() => {
                    const projectOptions = getProjectStatusOptions(
                      selectedJunkLead.project_id,
                      projectLeadStatuses || []
                    );
                    return projectOptions.find((o: any) => o.lead_status_id === newLeadStatusId)?.id || selectedJunkLead.project_lead_status_id;
                  })(),
                  junk_reason: '',
                };

                await updateLead(updatedLead).unwrap();

                toast.success("Lead restored successfully");
                await handleRefetch();
                setSelectedJunkLead(null);

                // redirect based on assignment
                if (selectedJunkLead.assigned_to_rm) {
                  dispatch(setActiveTabAction(1));
                } else {
                  dispatch(setActiveTabAction(0));
                }
                setActiveView('leads');
              } catch (err: any) {
                toast.error(err?.data?.message || "Failed to restore lead");
              }
            }}
          />
          <ReassignRMModal
            open={showReassignModal}
            rms={rms}
            onClose={() => setShowReassignModal(false)}
            lead={selectedJunkLead as unknown as Lead}
            onConfirm={(rmId) => {

              const _leadStatusId = masterData?.lead_statuses?.find(s => s.code === 'NEWLED')?.id;
              if (_leadStatusId && selectedJunkLead) {
                const projectOptions = getProjectStatusOptions(
                  selectedJunkLead.project_id,
                  projectLeadStatuses || []
                );
                const projectNewStatusId = projectOptions.find((o: any) => o.lead_status_id === _leadStatusId)?.id || selectedJunkLead.project_lead_status_id;
                const _lead = { ...selectedJunkLead, project_lead_status_id: projectNewStatusId } as unknown as Lead;
                handleAssignRm(_lead, rmId);
              }


              toast.success(`Lead successfully reassigned to RM ID: ${rmId}`);
              setActiveView('junk');
            }}
          />
        </>
      )}

      <AppDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingLead ? "Edit Lead" : "New Lead"}
        description={
          editingLead
            ? "Modify lead details below."
            : "Fill in the information to register a new property lead."
        }
      >
        {isDrawerOpen && (
          <LeadForm
            onSubmit={handleFormSubmit}
            isLoading={isCreating || isUpdating}
            initialValues={editingLead || (projectIds && projectIds.length === 1 ? { project_id: Number(projectIds[0]) } : undefined)}
            isEdit={!!editingLead}
          />
        )}
      </AppDrawer>

      <JunkReasonDialog
        open={isJunkDialogOpen}
        onClose={() => {
          setIsJunkDialogOpen(false);
          setPendingJunkUpdate(null);
        }}
        onConfirm={handleJunkReasonConfirm}
        isLoading={isUpdating}
      />

      <ConfirmDialog
        open={showRandomConfirm}
        onClose={() => setShowRandomConfirm(false)}
        onConfirm={() => {
          handleRandomAssign();
          setShowRandomConfirm(false);
        }}
        title="Confirm Random Assignment"
        description={`This will equally and randomly distribute the ${leads.length} currently visible ${activeTab === 0 ? "unassigned" : "assigned"} leads among the ${assignmentUsers.length} available ${isAdmin ? "Sales Heads" : "Sales Executives"}. Are you sure?`}
        confirmLabel="Assign Leads"
        variant="primary"
      />

      <ConfirmDialog
        open={!!deleteUuid}
        onClose={() => setDeleteUuid(null)}
        onConfirm={async () => {
          if (!deleteUuid) return;
          try {
            await deleteLead({ uuid: deleteUuid }).unwrap();
            toast.success("Lead deleted successfully");
            setDeleteUuid(null);
          } catch (err: any) {
            toast.error(err?.data?.message || "Failed to delete lead");
          }
        }}
        isLoading={isDeleting}
        title="Delete Lead"
        description="Are you sure you want to remove this lead? This action cannot be undone."
      />

      <ScheduleVisitDialog
        onClose={() => setSchedulingLead(null)}
        lead={schedulingLead}
        siteVisitStatuses={
          masterData?.site_visit_status ||
          (masterData as any)?.site_visit_statuses ||
          []
        }
        rms={rms}
        onSubmit={handleScheduleVisitSubmit}
        isLoading={isScheduling}
        open={!isSADMIN && !!schedulingLead}
      />

      {selectedUuids.length > 0 && can(PERMISSIONS.LEAD_BULK_ACTIONS) && (
        <BulkActionsBar
          selectedCount={selectedUuids.length}
          rms={rms}
          ems={isAdmin ? ems : emsReportees}
          onAssignRm={(id) => handleBulkAssign(id, 'rm')}
          onAssignEm={(id) => handleBulkAssign(id, 'em')}
          onMarkAsJunk={handleBulkMarkAsJunk}
          onCancel={() => dispatch(setSelectedUuids({ tabKey, uuids: [] }))}
          isLoading={isAnyBulkAssigning || isDeleting}
          showAssignRm={isAdmin}
          showAssignEm={isRM}
        />
      )}



      <LeadActivityDialog
        key={activityLead?.uuid || 'activity-dialog'}
        open={!!activityLead}
        onClose={() => setActivityLead(null)}
        lead={activityLead}
        onSubmit={handleLeadActivitySubmit}
        isLoading={isAddingActivity}
      />

      <BulkImportDialog
        open={isBulkImportOpen}
        onClose={() => setIsBulkImportOpen(false)}
        projectOptions={projectOptions}
        onImportComplete={handleRefetch}
      />
    </div>
  );
};