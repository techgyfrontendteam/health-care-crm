import React from 'react';
import { useGetAllMasterDataQuery } from '../../features/master/api/masterApi';
import { useGetAllUsersByRoleIdQuery } from '../../features/users/api/usersApi';
import { convertProjectLeadStatusToObject } from '../../utils/projectLeadStatus';

export const useMasterDataLookup = () => {
  const { data: masterData } = useGetAllMasterDataQuery();
  const { data: rms = [] } = useGetAllUsersByRoleIdQuery({ role_id: 3, offset: 0 });
  const { data: ems = [] } = useGetAllUsersByRoleIdQuery({ role_id: 4, offset: 0 });

  const projectLeadStatuses = React.useMemo(() => {
    const rawData =
      (masterData as any)?.project_lead_status ||
      (masterData as any)?.project_lead_statuses ||
      (masterData as any)?.project_lead_statusifications ||
      (masterData as any)?.project_statusifications ||
      [];
    const converted = convertProjectLeadStatusToObject(rawData, masterData?.lead_statuses || []);
    return converted;
  }, [masterData]);

  const getStatusLabel = React.useCallback((id: number | null | undefined) => {
    if (!id) return '--';
    return masterData?.lead_statuses.find(s => s.id === id)?.description || `ID: ${id}`;
  }, [masterData]);

  const getProjectLeadStatusLabel = React.useCallback((projectLeadStatusId: number | null | undefined) => {
    if (!projectLeadStatusId) return '--';
    for (const project of projectLeadStatuses) {
      if (Array.isArray(project.status)) {
        const match = project.status.find((s: any) => Number(s.id) === Number(projectLeadStatusId));
        if (match) return match.description;
      }
    }
    return '--';
  }, [projectLeadStatuses]);

  const getCustomerStatusLabel = React.useCallback((id: number | null | undefined) => {
    if (!id) return '--';
    return masterData?.customer_statuses.find(s => s.id === id)?.description || `ID: ${id}`;
  }, [masterData]);

  const getProjectLabel = React.useCallback((id: number | null | undefined) => {
    if (!id) return '--';
    return masterData?.projects.find(p => p.id === id)?.description || `N/A`;
  }, [masterData]);

  const getSourceLabel = React.useCallback((id: number | null | undefined) => {
    if (!id) return '--';
    return masterData?.sources.find(s => s.id === id)?.description || `ID: ${id}`;
  }, [masterData]);

  const getRmLabel = React.useCallback((id: number | null | undefined) => {
    if (!id) return '--';
    const rm = rms.find(r => r.id === id);
    return rm ? `${rm.first_name} ${rm.last_name}` : '--';
  }, [rms]);

  const getEmLabel = React.useCallback((id: number | null | undefined) => {
    if (!id) return '--';
    const em = ems.find(e => e.id === id);
    return em ? `${em.first_name} ${em.last_name}` : '--';
  }, [ems]);

  const getBranchLabel = React.useCallback((id: number | null | undefined) => {
    if (!id) return '--';
    return masterData?.branches?.find(b => b.id === id)?.description || `ID: ${id}`;
  }, [masterData]);

  const getSpecialisationLabel = React.useCallback((id: number | null | undefined) => {
    if (!id) return '--';
    return masterData?.specialisations?.find(s => s.id === id)?.description || `ID: ${id}`;
  }, [masterData]);

  return React.useMemo(() => ({
    getStatusLabel,
    getProjectLeadStatusLabel,
    getCustomerStatusLabel,
    getProjectLabel,
    getSourceLabel,
    getBranchLabel,
    getSpecialisationLabel,
    getRmLabel,
    getEmLabel,
    rms,
    ems,
    masterData,
    projectLeadStatuses,
    isLoading: !masterData && (rms.length === 0 || ems.length === 0)
  }), [
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
    rms.length,
    ems.length
  ]);
};
