(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/hooks.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAppDispatch",
    ()=>useAppDispatch,
    "useAppSelector",
    ()=>useAppSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const useAppDispatch = ()=>{
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
};
_s(useAppDispatch, "jI3HA1r1Cumjdbu14H7G+TUj798=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"]
    ];
});
const useAppSelector = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/permissions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// All permission keys used throughout the CRM
__turbopack_context__.s([
    "PERMISSIONS",
    ()=>PERMISSIONS,
    "ROLE_PERMISSIONS",
    ()=>ROLE_PERMISSIONS
]);
const PERMISSIONS = {
    // Leads
    LEAD_VIEW: 'lead.view',
    LEAD_CREATE: 'lead.create',
    LEAD_EDIT: 'lead.edit',
    LEAD_DELETE: 'lead.delete',
    LEAD_ASSIGN: 'lead.assign',
    LEAD_STATUS_UPDATE: 'lead.status.update',
    LEAD_SCHEDULE_VISIT: 'lead.schedule_visit',
    LEAD_BULK_ACTIONS: 'lead.bulk_actions',
    // Agents (EXPMNG)
    AGENT_VIEW: 'agent.view',
    AGENT_CREATE: 'agent.create',
    AGENT_EDIT: 'agent.edit',
    AGENT_DELETE: 'agent.delete',
    AGENT_ASSIGN: 'agent.assign',
    // Managers (RELMNG)
    MANAGER_VIEW: 'manager.view',
    MANAGER_CREATE: 'manager.create',
    MANAGER_EDIT: 'manager.edit',
    MANAGER_DELETE: 'manager.delete',
    MANAGER_ASSIGN: 'manager.assign',
    // Customers
    CUSTOMER_VIEW: 'customer.view',
    CUSTOMER_EDIT: 'customer.edit',
    // Followups
    FOLLOWUP_VIEW: 'followup.view',
    FOLLOWUP_CREATE: 'followup.create'
};
const ROLE_PERMISSIONS = {
    // SADMIN — Read-only overview
    SADMIN: [
        PERMISSIONS.LEAD_VIEW,
        PERMISSIONS.AGENT_VIEW,
        PERMISSIONS.MANAGER_VIEW,
        PERMISSIONS.CUSTOMER_VIEW,
        PERMISSIONS.FOLLOWUP_VIEW,
        PERMISSIONS.FOLLOWUP_CREATE
    ],
    // ADMIN — Full control
    ADMIN: [
        PERMISSIONS.LEAD_VIEW,
        PERMISSIONS.LEAD_CREATE,
        PERMISSIONS.LEAD_EDIT,
        PERMISSIONS.LEAD_DELETE,
        PERMISSIONS.LEAD_ASSIGN,
        PERMISSIONS.LEAD_STATUS_UPDATE,
        PERMISSIONS.LEAD_SCHEDULE_VISIT,
        PERMISSIONS.LEAD_BULK_ACTIONS,
        PERMISSIONS.AGENT_VIEW,
        PERMISSIONS.AGENT_CREATE,
        PERMISSIONS.AGENT_EDIT,
        PERMISSIONS.AGENT_DELETE,
        PERMISSIONS.AGENT_ASSIGN,
        PERMISSIONS.MANAGER_VIEW,
        PERMISSIONS.MANAGER_CREATE,
        PERMISSIONS.MANAGER_EDIT,
        PERMISSIONS.MANAGER_DELETE,
        PERMISSIONS.MANAGER_ASSIGN,
        PERMISSIONS.CUSTOMER_VIEW,
        PERMISSIONS.CUSTOMER_EDIT,
        PERMISSIONS.FOLLOWUP_VIEW,
        PERMISSIONS.FOLLOWUP_CREATE
    ],
    // RELMNG — Relationship Manager: controls agents, manages leads
    RELMNG: [
        PERMISSIONS.LEAD_VIEW,
        // PERMISSIONS.LEAD_CREATE,
        PERMISSIONS.LEAD_EDIT,
        PERMISSIONS.LEAD_ASSIGN,
        PERMISSIONS.LEAD_STATUS_UPDATE,
        PERMISSIONS.LEAD_BULK_ACTIONS,
        PERMISSIONS.LEAD_SCHEDULE_VISIT,
        PERMISSIONS.AGENT_VIEW,
        PERMISSIONS.AGENT_CREATE,
        PERMISSIONS.AGENT_EDIT,
        PERMISSIONS.AGENT_DELETE,
        PERMISSIONS.AGENT_ASSIGN,
        PERMISSIONS.FOLLOWUP_VIEW,
        PERMISSIONS.FOLLOWUP_CREATE
    ],
    // EXPMNG — Site Experience Manager (Agent): minimal access
    EXPMNG: [
        PERMISSIONS.LEAD_VIEW,
        PERMISSIONS.LEAD_EDIT,
        PERMISSIONS.LEAD_STATUS_UPDATE,
        PERMISSIONS.FOLLOWUP_VIEW,
        PERMISSIONS.FOLLOWUP_CREATE
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/getProjectStatusOptions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getProjectStatusOptions",
    ()=>getProjectStatusOptions
]);
const getProjectStatusOptions = (projectId, projectLeadStatuses)=>{
    const project = (projectLeadStatuses || []).find((item)=>Number(item.project_id) === Number(projectId));
    if (!project || !Array.isArray(project.status)) return [];
    return project.status.map((projectStatus)=>({
            id: projectStatus.id,
            value: projectStatus.lead_status_id,
            label: projectStatus.description || "",
            lead_status_id: projectStatus.lead_status_id
        }));
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatDate",
    ()=>formatDate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$projectLeadStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/projectLeadStatus.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$getProjectStatusOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/getProjectStatusOptions.ts [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
const formatDate = (dateString)=>{
    if (!dateString) return '---';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '---';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/projectLeadStatus.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "convertProjectLeadStatusToObject",
    ()=>convertProjectLeadStatusToObject
]);
const convertProjectLeadStatusToObject = (projectLeadStatuses, leadStatuses)=>{
    return (projectLeadStatuses || []).map((project)=>({
            project_id: project.project_id,
            status: Array.isArray(project.status) ? project.status.slice(1) // remove header row ["id", "lead_status_id"]
            .map(([id, lead_status_id])=>{
                const parsedId = Number(id);
                const parsedLeadStatusId = Number(lead_status_id);
                const leadStatus = (leadStatuses || []).find((item)=>Number(item.id) === parsedLeadStatusId);
                return {
                    id: parsedId,
                    lead_status_id: parsedLeadStatusId,
                    description: leadStatus?.description || ""
                };
            }) : []
        }));
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1e5lltn._.js.map