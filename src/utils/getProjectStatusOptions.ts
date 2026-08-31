export const getProjectStatusOptions = (
  projectId: number,
  projectLeadStatuses: any[]
) => {
  const project = (projectLeadStatuses || []).find(
    (item) => Number(item.project_id) === Number(projectId)
  );

  if (!project || !Array.isArray(project.status)) return [];

  return project.status.map((projectStatus: any) => ({
    id: projectStatus.id, // project_lead_status_id
    value: projectStatus.lead_status_id,
    label: projectStatus.description || "",
    lead_status_id: projectStatus.lead_status_id,
  }));
};
