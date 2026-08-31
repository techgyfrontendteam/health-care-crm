# Lead Statuses Management (`LeadStatusesPage.tsx`)

## Overview
The `LeadStatusesPage` component is responsible for managing both global lead statuses and project-specific lead status configurations. It allows administrators to create new statuses, edit existing ones, and assign available statuses to specific projects.

## Core Features
1. **Global Status Management**
   - **Add New Status**: Users can create a new global status with a unique Name and Code.
     - The `Code` field enforces a strict 6-character maximum length.
     - Client-side validation prevents creating statuses with duplicate codes.
     - Server-side `409 Conflict` errors are gracefully handled.
   - **Edit Status**: Users can modify the Name (description) of an existing status. The `Code` is locked and non-editable.

2. **Project-Wise Status Assignment (Funnel Management)**
   - By selecting a project from the dropdown, the page enters "Project Mode".
   - The UI splits into two sections:
     - **Selected Statuses**: Statuses currently enabled for the chosen project.
     - **Available Statuses**: Global statuses that are not yet assigned to the project.
   - Users can move statuses from "Available" to "Selected" (acting as drafts).
   - Changes are saved via the `Save Changes` button, which persists the selections to the backend.

3. **Search & Filtering**
   - A search bar filters both "Available" and "Selected" status lists simultaneously by matching the query against either the status `name` or `code`.

## State Management Details
- `globalStatuses`: An array of all system-wide statuses initialized from the `masterData.lead_statuses` API response.
- `tempSelectedIds`: A staging array storing the IDs of statuses that the user has "Added" to a project but hasn't yet saved to the backend.
- `selectedProjectId`: The currently active project ID. When changed, `tempSelectedIds` is cleared to prevent cross-project draft contamination.

## API Integrations (RTK Query)
The component relies on mutations exported from `manageMasterDataSlice.ts`:
- `useCreateLeadStatusMutation`: Hits `POST /master/createLeadStatus`.
- `useUpdateLeadStatusMutation`: Hits `POST /master/updateLeadStatus`. Sends the `id` and `description` (ignores `code`).
- `useCreateProjectWiseLeadStatusMutation`: Hits `POST /master/createProjectWiseLeadStatus`. Assigns a global lead status to a specific project.

## Error Handling & Notifications
- **Toast Library**: Utilizes `sonner` (`toast.success`, `toast.error`) for all transient feedback.
- **Conflict Handling**: Catch blocks inspect the error response for a `409` status code and surface an "Already code is existed" validation message without closing the modals.
- **Success Redirection**: After successfully saving project assignments, a custom success modal is shown before auto-redirecting back to the main Master Data view.
