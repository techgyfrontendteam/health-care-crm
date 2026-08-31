# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

---

# CRM Phase 2 Technical Documentation

This section documents the architectural shifts and implementations introduced during **Phase 2**, specifically focusing on the dynamic rendering and handling of Lead Statuses based on individual Projects.

## 1. Core Architectural Change
In Phase 1, the CRM utilized a single, globally defined `lead_status_id` to track a lead's current status across all projects. 
In **Phase 2**, the architecture shifted to support project-specific lead workflows. The backend now maps a generic `lead_status_id` to a `project_lead_status_id` (representing the unique workflow step for that specific project).

**Key shifts:**
- `lead_status_id` is now exclusively used as a global identifier for generic status definitions (e.g., "New Lead", "Site Visit Done").
- `project_lead_status_id` is the operational tracking ID used per lead to denote its status within its assigned project.
- Frontend payload interfaces (`CreateLeadRequest`, `UpdateLeadRequest`, and the `Lead` model) have been updated to replace `lead_status_id` with `project_lead_status_id`.

## 2. Master Data Handling (`useMasterDataLookup`)
The `masterData` API response now provides `project_lead_statuses`. 
- Previously, this arrived as a 2D matrix from the API, but it is now transformed via a lookup utility (`convertProjectLeadStatusToObject`) into a structured array of objects under `useMasterDataLookup`.
- The transformed structure looks like this:
```json
[
  {
    "project_id": 1,
    "status": [
      {
        "id": 1, // This is the project_lead_status_id
        "lead_status_id": 1,
        "description": "New Lead"
      }
    ]
  }
]
```

## 3. Utility Function: `getProjectStatusOptions`
To populate dropdowns dynamically, `src/utils/getProjectStatusOptions.ts` was refactored:
- It accepts the lead's `projectId` and the parsed `projectLeadStatuses` array from the master data.
- It finds the matching project and returns an array of options shaped for the UI components:
```typescript
{
  id: number;              // The project_lead_status_id (sent to API)
  value: number;           // The global lead_status_id
  label: string;           // The status description
  lead_status_id: number;  // The global lead_status_id (used for business logic lookups)
}
```

## 4. UI Components Integration

### `LeadTable.tsx`
- The column definition for Status was updated to render dynamically based on the lead's `project_id`.
- It calls `getProjectStatusOptions`, filters out hidden statuses (e.g., "Junk Lead"), and passes the resulting options array directly to `StatusCell`.
- `StatusCell` binds to `lead.project_lead_status_id` to determine the currently selected UI option.

### `LeadsPage.tsx`
- **Reverse Mapping for Business Logic**: When a user selects a new status, `handleUpdateStatus` receives the `project_lead_status_id`. Some business logic (like prompting the user for a reason when marking a lead as "Junk") requires knowing the global `lead_status_id`. The function looks up the selected option via `getProjectStatusOptions` and compares `option.lead_status_id` against the global "JUNKPE" status.
- **Payload Construction**: The payload construction removes the old `lead_status_id` field and actively binds `project_lead_status_id` to the newly selected ID before hitting the `updateLead` API.

## Future Development Notes (For AI Agents)
- When creating new forms or filters involving "Lead Statuses," you must account for `project_id`. Global dropdowns should either be avoided or clearly delineate that they are querying against global `lead_status_id` rather than operational `project_lead_status_id`.
- Ensure any `lead` creation flows inject `project_lead_status_id` during POST requests.
