export const convertProjectLeadStatusToObject = (
  projectLeadStatuses: any[],
  leadStatuses: any[]
) => {
  return (projectLeadStatuses || []).map((project) => ({
    project_id: project.project_id,
    status: Array.isArray(project.status)
      ? project.status
        .slice(1) // remove header row ["id", "lead_status_id"]
        .map(([id, lead_status_id]: any) => {
          const parsedId = Number(id);
          const parsedLeadStatusId = Number(lead_status_id);
          const leadStatus = (leadStatuses || []).find(
            (item) => Number(item.id) === parsedLeadStatusId
          );

          return {
            id: parsedId,
            lead_status_id: parsedLeadStatusId,
            description: leadStatus?.description || "",
          };
        })
      : [],
  }));
};
