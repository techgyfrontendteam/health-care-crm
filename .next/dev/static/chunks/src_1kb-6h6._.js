(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "store",
    ()=>store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2f$dist$2f$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/redux/dist/redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/query/rtk-query.modern.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/baseApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$store$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/store/authSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/store/leadsSlice.ts [app-client] (ecmascript)");
;
;
;
;
;
const appReducer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2f$dist$2f$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["combineReducers"])({
    [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].reducerPath]: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].reducer,
    auth: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$store$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    leads: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
});
const rootReducer = (state, action)=>{
    if (action.type === 'auth/logoutUser') {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].middleware)
});
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupListeners"])(store.dispatch);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/index.ts [app-client] (ecmascript) <locals>");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
            outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "px-6 py-2.5",
            sm: "h-9 rounded-lg px-4 text-xs",
            lg: "h-12 rounded-lg px-10 text-base",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 47,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "S3_BASE_URL",
    ()=>S3_BASE_URL
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const S3_BASE_URL = ("TURBOPACK compile-time value", "https://ssh-crm-dev-data-bucket.s3.ap-south-1.amazonaws.com/") || "https://crm-demo-data-bucket.s3.ap-south-1.amazonaws.com";
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
"[project]/src/features/auth/store/authSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "logoutUser",
    ()=>logoutUser,
    "setCredentials",
    ()=>setCredentials,
    "setCurrentRole",
    ()=>setCurrentRole,
    "setPasswordSuccess",
    ()=>setPasswordSuccess,
    "setRoles",
    ()=>setRoles,
    "updateToken",
    ()=>updateToken,
    "updateUserProfile",
    ()=>updateUserProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/utils/localStorage.ts [app-client] (ecmascript)");
;
;
// Keys for localStorage
const STORAGE_KEYS = {
    USER: 'crm_user',
    TOKEN: 'crm_token',
    REFRESH_TOKEN: 'crm_refresh_token',
    ROLES: 'crm_roles',
    CURRENT_ROLE: 'crm_current_role',
    IS_FIRST_LOGIN: 'crm_is_first_login'
};
const initialState = {
    user: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get(STORAGE_KEYS.USER, null),
    token: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get(STORAGE_KEYS.TOKEN, null),
    refreshToken: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get(STORAGE_KEYS.REFRESH_TOKEN, null),
    roles: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get(STORAGE_KEYS.ROLES, []),
    currentRole: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get(STORAGE_KEYS.CURRENT_ROLE, null),
    isAuthenticated: !!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get(STORAGE_KEYS.TOKEN, null),
    isFirstLogin: Boolean(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get(STORAGE_KEYS.IS_FIRST_LOGIN, false))
};
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action)=>{
            const { user, token, refreshToken, isFirstLogin } = action.payload;
            state.user = user;
            state.token = token;
            state.refreshToken = refreshToken;
            state.isAuthenticated = true;
            state.isFirstLogin = !!isFirstLogin;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.USER, user);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.TOKEN, token);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.IS_FIRST_LOGIN, !!isFirstLogin);
        },
        updateUserProfile: (state, action)=>{
            if (state.user) {
                state.user = {
                    ...state.user,
                    ...action.payload
                };
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.USER, state.user);
            }
        },
        setRoles: (state, action)=>{
            state.roles = action.payload;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.ROLES, action.payload);
            if (action.payload.length > 0) {
                const matchingRole = action.payload.find((r)=>r.id === state.user?.role_id);
                const roleToSet = matchingRole || action.payload[0];
                state.currentRole = roleToSet;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.CURRENT_ROLE, roleToSet);
            }
        },
        setCurrentRole: (state, action)=>{
            state.currentRole = action.payload;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.CURRENT_ROLE, action.payload);
        },
        updateToken: (state, action)=>{
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.TOKEN, action.payload.token);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.REFRESH_TOKEN, action.payload.refreshToken);
        },
        setPasswordSuccess: (state)=>{
            state.isFirstLogin = false;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.IS_FIRST_LOGIN, false);
        },
        logoutUser: (state)=>{
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.roles = [];
            state.currentRole = null;
            state.isFirstLogin = false;
            // Clear ALL localStorage and sessionStorage
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].clear();
            try {
                sessionStorage.removeItem('agent_id');
            } catch (e) {
                console.error('Error clearing sessionStorage:', e);
            }
        }
    }
});
const { setCredentials, updateUserProfile, setRoles, setCurrentRole, updateToken, setPasswordSuccess, logoutUser } = authSlice.actions;
const __TURBOPACK__default__export__ = authSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/api/leadsApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "leadsApi",
    ()=>leadsApi,
    "useAddLeadActivityMutation",
    ()=>useAddLeadActivityMutation,
    "useBulkAssignLeadsToEmMutation",
    ()=>useBulkAssignLeadsToEmMutation,
    "useBulkAssignLeadsToRmMutation",
    ()=>useBulkAssignLeadsToRmMutation,
    "useBulkImportLeadsMutation",
    ()=>useBulkImportLeadsMutation,
    "useCreateLeadConsolidatedCallSummaryMutation",
    ()=>useCreateLeadConsolidatedCallSummaryMutation,
    "useCreateLeadMutation",
    ()=>useCreateLeadMutation,
    "useCreateLeadNextBestActionsMutation",
    ()=>useCreateLeadNextBestActionsMutation,
    "useCreateLeadProjectScoreMutation",
    ()=>useCreateLeadProjectScoreMutation,
    "useCreateSurgeryMutation",
    ()=>useCreateSurgeryMutation,
    "useDeleteLeadMutation",
    ()=>useDeleteLeadMutation,
    "useDeleteLeadProjectScoreByIdMutation",
    ()=>useDeleteLeadProjectScoreByIdMutation,
    "useDeleteLeadProjectScoresByLeadMutation",
    ()=>useDeleteLeadProjectScoresByLeadMutation,
    "useGetAllProjectEmAndRmDataQuery",
    ()=>useGetAllProjectEmAndRmDataQuery,
    "useGetEmLeadsByRmIdQuery",
    ()=>useGetEmLeadsByRmIdQuery,
    "useGetLeadByIdQuery",
    ()=>useGetLeadByIdQuery,
    "useGetLeadDetailsByLeadUuidQuery",
    ()=>useGetLeadDetailsByLeadUuidQuery,
    "useGetLeadDetailsByPhoneNumberQuery",
    ()=>useGetLeadDetailsByPhoneNumberQuery,
    "useGetLeadObjectionDetailsAndChecklistQuery",
    ()=>useGetLeadObjectionDetailsAndChecklistQuery,
    "useGetLeadStatsByUserIdQuery",
    ()=>useGetLeadStatsByUserIdQuery,
    "useGetLeadsAndObjectionsByCustomerIdQuery",
    ()=>useGetLeadsAndObjectionsByCustomerIdQuery,
    "useGetLeadsByCustomerUuidQuery",
    ()=>useGetLeadsByCustomerUuidQuery,
    "useGetLeadsByEmIdQuery",
    ()=>useGetLeadsByEmIdQuery,
    "useGetLeadsByRmIdQuery",
    ()=>useGetLeadsByRmIdQuery,
    "useGetLeadsQuery",
    ()=>useGetLeadsQuery,
    "useGetSurgeriesByLeadUuidQuery",
    ()=>useGetSurgeriesByLeadUuidQuery,
    "useGetVisitsByUserIdQuery",
    ()=>useGetVisitsByUserIdQuery,
    "useLazyGetLeadByIdQuery",
    ()=>useLazyGetLeadByIdQuery,
    "useLazyGetLeadsQuery",
    ()=>useLazyGetLeadsQuery,
    "useLazyGetSurgeriesByLeadUuidQuery",
    ()=>useLazyGetSurgeriesByLeadUuidQuery,
    "useScheduleVisitMutation",
    ()=>useScheduleVisitMutation,
    "useSendCallSummaryCompleteNotificationMutation",
    ()=>useSendCallSummaryCompleteNotificationMutation,
    "useSendWhatsappMessageNotificationMutation",
    ()=>useSendWhatsappMessageNotificationMutation,
    "useUpdateLeadMutation",
    ()=>useUpdateLeadMutation,
    "useUpdateLeadObjectionsMutation",
    ()=>useUpdateLeadObjectionsMutation,
    "useUpdateLeadProjectScoreMutation",
    ()=>useUpdateLeadProjectScoreMutation,
    "useUpdateSurgeryMutation",
    ()=>useUpdateSurgeryMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/baseApi.ts [app-client] (ecmascript)");
;
const leadsApi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
    endpoints: (builder)=>({
            getLeads: builder.query({
                query: (body)=>({
                        url: "/leads/getLeads",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            getLeadById: builder.query({
                query: (body)=>({
                        url: "/leads/getLeadById",
                        method: "POST",
                        body
                    }),
                providesTags: (result, error, arg)=>[
                        {
                            type: "Leads",
                            id: arg.uuid
                        }
                    ]
            }),
            getLeadObjectionDetailsAndChecklist: builder.query({
                query: (body)=>({
                        url: "/leads/getLeadObjectionDetailsAndChecklist",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            getLeadDetailsByLeadUuid: builder.query({
                query: (body)=>({
                        url: "/leads/getLeadDetailsByLeadUuid",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            updateLeadObjections: builder.mutation({
                query: (body)=>({
                        url: "/leads/updatedLeadObjections",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            getLeadDetailsByPhoneNumber: builder.query({
                query: (body)=>({
                        url: "/leads/getLeadDetailsByPhoneNumber",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            getEmLeadsByRmId: builder.query({
                query: (body)=>({
                        url: "/leads/getEmLeadsByRmId",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            getLeadStatsByUserId: builder.query({
                query: (body)=>({
                        url: "/leads/getLeadStatsByUserId",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            getLeadsAndObjectionsByCustomerId: builder.query({
                query: (body)=>({
                        url: "/leads/getLeadDetailsbycustomer_id",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            getLeadsByCustomerUuid: builder.query({
                query: (body)=>({
                        url: "/leads/getLeadsByCustomerUuid",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            getLeadsByRmId: builder.query({
                query: (body)=>({
                        url: "/leads/getLeadsByRmId",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            getLeadsByEmId: builder.query({
                query: (body)=>({
                        url: "/leads/getLeadsByEmId",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            createLead: builder.mutation({
                query: (body)=>({
                        url: "/leads/createLead",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            updateLead: builder.mutation({
                query: (body)=>({
                        url: "/leads/updateLead",
                        method: "POST",
                        body
                    }),
                invalidatesTags: (result, error, arg)=>[
                        "Leads",
                        {
                            type: "Leads",
                            id: arg.uuid
                        }
                    ],
                async onQueryStarted (arg, { dispatch, queryFulfilled, getState }) {
                    try {
                        await queryFulfilled;
                        const state = getState();
                        const queries = state.baseApi?.queries || {};
                        for (const key of Object.keys(queries)){
                            if (key.startsWith("getLeads(")) {
                                dispatch(leadsApi.util.updateQueryData("getLeads", queries[key].originalArgs, (draft)=>{
                                    const list = Array.isArray(draft) ? draft : Array.isArray(draft?.data) ? draft.data : [];
                                    const index = list.findIndex((l)=>l.uuid === arg.uuid);
                                    if (index !== -1) Object.assign(list[index], arg);
                                }));
                            }
                            if (key.startsWith("getLeadsByCustomerUuid(")) {
                                dispatch(leadsApi.util.updateQueryData("getLeadsByCustomerUuid", queries[key].originalArgs, (draft)=>{
                                    const list = Array.isArray(draft) ? draft : Array.isArray(draft?.data) ? draft.data : [];
                                    const index = list.findIndex((l)=>l.uuid === arg.uuid);
                                    if (index !== -1) Object.assign(list[index], arg);
                                }));
                            }
                            if (key.startsWith("getLeadById(")) {
                                dispatch(leadsApi.util.updateQueryData("getLeadById", queries[key].originalArgs, (draft)=>{
                                    if (draft?.uuid === arg.uuid) {
                                        Object.assign(draft, arg);
                                    } else if (draft?.data?.uuid === arg.uuid) {
                                        Object.assign(draft.data, arg);
                                    }
                                }));
                            }
                        }
                    } catch  {
                    // If the mutation fails, we don't apply the optimistic update anyway
                    }
                }
            }),
            bulkAssignLeadsToRm: builder.mutation({
                query: (body)=>({
                        url: "/leads/bulkAssignLeadsToRm",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            bulkAssignLeadsToEm: builder.mutation({
                query: (body)=>({
                        url: "/leads/bulkAssignLeadsToEm",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            deleteLead: builder.mutation({
                query: (body)=>({
                        url: "/leads/deleteLead",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            scheduleVisit: builder.mutation({
                query: (body)=>({
                        url: "/leadSiteVisits/createSiteVisit",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            addLeadActivity: builder.mutation({
                query: (body)=>({
                        url: "/leads/addLeadActivity",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            sendWhatsappMessageNotification: builder.mutation({
                query: (body)=>({
                        url: "/leads/sendWhatsappMessageNotification",
                        method: "POST",
                        body
                    })
            }),
            sendCallSummaryCompleteNotification: builder.mutation({
                query: (body)=>({
                        url: "/leads/sendCallSummeryCompleteNotification",
                        method: "POST",
                        body
                    })
            }),
            createLeadNextBestActions: builder.mutation({
                query: (body)=>({
                        url: "/leads/createLeadNextBestActions",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            createLeadConsolidatedCallSummary: builder.mutation({
                query: (body)=>({
                        url: "/leads/createLeadConsolidatedCallSummary",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            createLeadProjectScore: builder.mutation({
                query: (body)=>({
                        url: "/leads/project-scores/create",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            updateLeadProjectScore: builder.mutation({
                query: (body)=>({
                        url: "/leads/project-scores/update",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            deleteLeadProjectScoreById: builder.mutation({
                query: (body)=>({
                        url: "/leads/project-scores/delete-by-id",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            deleteLeadProjectScoresByLead: builder.mutation({
                query: (body)=>({
                        url: "/leads/project-scores/delete-by-lead",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            getVisitsByUserId: builder.query({
                query: (params)=>({
                        url: "/appointments/getVisitsByUserId",
                        method: "POST",
                        body: params
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            bulkImportLeads: builder.mutation({
                query: (body)=>({
                        url: "/leads/bulkImport",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            getAllProjectEmAndRmData: builder.query({
                query: ()=>({
                        url: "/leads/getAllProjectEmAndRmData",
                        method: "POST",
                        body: {}
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            createSurgery: builder.mutation({
                query: (body)=>({
                        url: "/leadSurgeries/createSurgery",
                        method: "POST",
                        body
                    }),
                invalidatesTags: (result, error, arg)=>[
                        "Leads",
                        {
                            type: "Leads",
                            id: arg.lead_uuid
                        },
                        {
                            type: "Leads",
                            id: `surgeries-${arg.lead_uuid}`
                        }
                    ]
            }),
            updateSurgery: builder.mutation({
                query: (body)=>({
                        url: "/leadSurgeries/updateSurgery",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            getSurgeriesByLeadUuid: builder.query({
                query: (body)=>({
                        url: "/leadSurgeries/getSurgeriesByLeadUuid",
                        method: "POST",
                        body: {
                            offset: 0,
                            ...body
                        }
                    }),
                providesTags: (result, error, arg)=>[
                        {
                            type: "Leads",
                            id: `surgeries-${arg.lead_uuid}`
                        },
                        "Leads"
                    ]
            })
        }),
    // Turbopack can re-evaluate this module during Fast Refresh. Replacing the
    // identical definitions prevents duplicate endpoint warnings in dev.
    overrideExisting: ("TURBOPACK compile-time value", "development") === "development"
});
const { useGetLeadsQuery, useGetLeadByIdQuery, useGetLeadObjectionDetailsAndChecklistQuery, useGetLeadDetailsByLeadUuidQuery, useUpdateLeadObjectionsMutation, useGetLeadDetailsByPhoneNumberQuery, useGetEmLeadsByRmIdQuery, useGetLeadStatsByUserIdQuery, useGetLeadsAndObjectionsByCustomerIdQuery, useCreateLeadMutation, useUpdateLeadMutation, useBulkAssignLeadsToRmMutation, useBulkAssignLeadsToEmMutation, useDeleteLeadMutation, useScheduleVisitMutation, useGetLeadsByCustomerUuidQuery, useGetLeadsByRmIdQuery, useGetLeadsByEmIdQuery, useAddLeadActivityMutation, useSendWhatsappMessageNotificationMutation, useSendCallSummaryCompleteNotificationMutation, useCreateLeadNextBestActionsMutation, useCreateLeadConsolidatedCallSummaryMutation, useCreateLeadProjectScoreMutation, useUpdateLeadProjectScoreMutation, useDeleteLeadProjectScoreByIdMutation, useDeleteLeadProjectScoresByLeadMutation, useGetVisitsByUserIdQuery, useBulkImportLeadsMutation, useLazyGetLeadByIdQuery, useLazyGetLeadsQuery, useGetAllProjectEmAndRmDataQuery, useCreateSurgeryMutation, useUpdateSurgeryMutation, useGetSurgeriesByLeadUuidQuery, useLazyGetSurgeriesByLeadUuidQuery } = leadsApi;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/components/ChatMessageContent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatMessageContent",
    ()=>ChatMessageContent,
    "parseLocationUrlOrData",
    ()=>parseLocationUrlOrData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/navigation.js [app-client] (ecmascript) <export default as Navigation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
;
;
const parseLocationUrlOrData = (input)=>{
    if (!input || typeof input !== 'string') return null;
    const str = input.trim();
    // 1. JSON location object check
    if (str.startsWith('{') || str.startsWith('[')) {
        try {
            const parsed = JSON.parse(str);
            const locObj = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed.location || parsed.geo || parsed : null;
            if (locObj && typeof locObj === 'object') {
                const lat = Number(locObj.latitude ?? locObj.lat);
                const lng = Number(locObj.longitude ?? locObj.lng ?? locObj.lon);
                if (!isNaN(lat) && !isNaN(lng) && (lat !== 0 || lng !== 0)) {
                    const mapUrl = locObj.url || `https://www.google.com/maps?q=${lat},${lng}`;
                    return {
                        latitude: lat,
                        longitude: lng,
                        name: locObj.name || locObj.title || 'Shared Location',
                        address: locObj.address || locObj.location_address,
                        url: mapUrl
                    };
                }
            }
        } catch  {
        // ignore JSON parse error
        }
    }
    // 2. Google Maps / Apple Maps / Map URLs check
    const isMapHost = /maps\.google\.|google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps|maps\.apple\.|openstreetmap\.org|waze\.com/i.test(str);
    const coordMatch = str.match(/(?:q=|ll=|loc:|center=|=|@)?\s*([-+]?\d{1,2}\.\d+)\s*,\s*([-+]?\d{1,3}\.\d+)/i) || str.match(/q=loc:([-+]?\d{1,2}\.\d+)\+([-+]?\d{1,3}\.\d+)/i);
    if (isMapHost || coordMatch) {
        let lat = null;
        let lng = null;
        if (coordMatch) {
            const parsedLat = parseFloat(coordMatch[1]);
            const parsedLng = parseFloat(coordMatch[2]);
            if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
                lat = parsedLat;
                lng = parsedLng;
            }
        }
        const mapUrl = str.startsWith('http://') || str.startsWith('https://') ? str : lat !== null && lng !== null ? `https://www.google.com/maps?q=${lat},${lng}` : `https://${str}`;
        return {
            latitude: lat,
            longitude: lng,
            name: 'Shared Location',
            address: isMapHost ? 'Google Maps Location' : undefined,
            url: mapUrl
        };
    }
    // 3. Plain coordinates string check e.g., "17.437462, 78.448288"
    const plainCoordMatch = str.match(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|(\d{1,2}))(\.\d+)?)$/);
    if (plainCoordMatch) {
        const parts = str.split(',').map((s)=>parseFloat(s.trim()));
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            return {
                latitude: parts[0],
                longitude: parts[1],
                name: 'Shared Location',
                url: `https://www.google.com/maps?q=${parts[0]},${parts[1]}`
            };
        }
    }
    return null;
};
const parseMessageContent = (content)=>{
    if (!content || typeof content !== 'string') {
        return {
            type: 'text',
            text: content || ''
        };
    }
    // 1. Check if it's a Location URL, JSON, or coordinates
    const locData = parseLocationUrlOrData(content);
    if (locData) {
        return {
            type: 'location',
            location: {
                latitude: locData.latitude ?? undefined,
                longitude: locData.longitude ?? undefined,
                name: locData.name,
                address: locData.address,
                url: locData.url
            }
        };
    }
    const trimmed = content.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        try {
            const parsed = JSON.parse(trimmed);
            // 2. Check if it's a Contact array or object
            const items = Array.isArray(parsed) ? parsed : [
                parsed
            ];
            if (items.length > 0 && items.every((item)=>item && typeof item === 'object' && (item.name || item.phones || item.vcard))) {
                const contacts = items.map((item)=>{
                    let displayName = 'Shared Contact';
                    if (typeof item.name === 'string') {
                        displayName = item.name;
                    } else if (item.name && typeof item.name === 'object') {
                        displayName = item.name.formatted_name || item.name.first_name || item.name.last_name || 'Shared Contact';
                    }
                    const phonesList = [];
                    if (Array.isArray(item.phones)) {
                        item.phones.forEach((p)=>{
                            if (typeof p === 'string') {
                                phonesList.push({
                                    phone: p
                                });
                            } else if (p && typeof p === 'object') {
                                phonesList.push({
                                    phone: p.phone || p.wa_id || '',
                                    type: p.type,
                                    wa_id: p.wa_id
                                });
                            }
                        });
                    }
                    return {
                        name: displayName,
                        phones: phonesList,
                        vcard: typeof item.vcard === 'string' ? item.vcard : undefined
                    };
                });
                return {
                    type: 'contact',
                    contacts
                };
            }
        } catch  {
        // Not valid JSON, fall back to plain text
        }
    }
    return {
        type: 'text',
        text: content
    };
};
const handleDownloadVCard = (vcardText, contactName)=>{
    try {
        let decodedVCard = vcardText;
        if (!vcardText.trim().startsWith('BEGIN:VCARD')) {
            try {
                decodedVCard = atob(vcardText);
            } catch  {
                decodedVCard = vcardText;
            }
        }
        const blob = new Blob([
            decodedVCard
        ], {
            type: 'text/vcard;charset=utf-8;'
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const cleanName = contactName.replace(/[^a-zA-Z0-9_-]/g, '_') || 'contact';
        link.setAttribute('download', `${cleanName}.vcf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (err) {
        console.error('Failed to download vCard:', err);
    }
};
const renderTextWithLinks = (text)=>{
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/gi;
    const parts = text.split(urlRegex);
    return parts.map((part, index)=>{
        if (urlRegex.test(part)) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: part,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-blue-600 dark:text-blue-400 hover:underline break-all inline-flex items-center gap-0.5 font-semibold",
                onClick: (e)=>e.stopPropagation(),
                children: [
                    part,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                        className: "h-3 w-3 inline shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                        lineNumber: 267,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, index, true, {
                fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                lineNumber: 258,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0));
        }
        return part;
    });
};
const ChatMessageContent = ({ content, isSent = false })=>{
    if (!content) return null;
    const parsed = parseMessageContent(content);
    if (parsed.type === 'contact') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2 my-1",
            children: parsed.contacts.map((contact, idx)=>{
                const waPhone = contact.phones.length > 0 ? (contact.phones[0].wa_id || contact.phones[0].phone).replace(/\D/g, '') : '';
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-xl border border-black/10 dark:border-white/10 overflow-hidden bg-black/[0.03] dark:bg-white/[0.05] min-w-[240px] max-w-[300px] shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-full bg-[#00a884]/15 dark:bg-[#00a884]/20 flex items-center justify-center shrink-0 mt-0.5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                        className: "h-5 w-5 text-[#075E54] dark:text-[#00a884]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                        lineNumber: 305,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                    lineNumber: 304,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate",
                                            children: contact.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                            lineNumber: 308,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        contact.phones.map((phoneItem, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-300 mt-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                        className: "h-3 w-3 text-[#00a884] shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                                        lineNumber: 316,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "truncate",
                                                        children: phoneItem.phone || phoneItem.wa_id
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                                        lineNumber: 317,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    phoneItem.type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] px-1.5 py-0.5 bg-black/5 dark:bg-white/10 rounded text-zinc-500 dark:text-zinc-400 uppercase",
                                                        children: phoneItem.type
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                                        lineNumber: 321,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                                lineNumber: 312,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                    lineNumber: 307,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                            lineNumber: 303,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-t border-black/10 dark:border-white/10 divide-x divide-black/10 dark:divide-white/10 flex bg-black/[0.02] dark:bg-white/[0.02]",
                            children: [
                                waPhone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: `https://wa.me/${waPhone}`,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "flex-1 py-2 px-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#075E54] dark:text-[#00a884] hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                            lineNumber: 339,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Message"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                            lineNumber: 340,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                    lineNumber: 333,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)),
                                contact.vcard && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        handleDownloadVCard(contact.vcard, contact.name);
                                    },
                                    className: "flex-1 py-2 px-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#075E54] dark:text-[#00a884] hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                            lineNumber: 351,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Save Contact"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                            lineNumber: 352,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                    lineNumber: 344,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                            lineNumber: 331,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, idx, true, {
                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                    lineNumber: 298,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0));
            })
        }, void 0, false, {
            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
            lineNumber: 290,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (parsed.type === 'location') {
        const { latitude, longitude, name, address, url } = parsed.location;
        const googleMapsUrl = url || (latitude != null && longitude != null ? `https://www.google.com/maps?q=${latitude},${longitude}` : '#');
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "my-1 rounded-xl border border-black/10 dark:border-white/10 overflow-hidden bg-black/[0.03] dark:bg-white/[0.05] min-w-[240px] max-w-[300px] shadow-sm",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-28 relative bg-[#e5e0d8] dark:bg-[#1a2328] flex items-center justify-center overflow-hidden",
                    style: {
                        backgroundImage: 'radial-gradient(#00a884 0.75px, transparent 0.75px), radial-gradient(#00a884 0.75px, #e5e0d8 0.75px)',
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 10px 10px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative flex flex-col items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-full bg-[#ea4335] text-white flex items-center justify-center shadow-md z-10 border-2 border-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                        className: "h-5 w-5 fill-current"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                        lineNumber: 383,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                    lineNumber: 382,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-3 h-1.5 bg-black/20 rounded-full mt-0.5 blur-[1px]"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                    lineNumber: 385,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                            lineNumber: 381,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium flex items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__["Navigation"], {
                                    className: "h-2.5 w-2.5 text-[#4285f4]"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                    lineNumber: 388,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Location"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                    lineNumber: 389,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                            lineNumber: 387,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                    lineNumber: 371,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate",
                            children: name || 'Shared Location'
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                            lineNumber: 395,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 mt-0.5",
                            children: address
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                            lineNumber: 399,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        latitude != null && longitude != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-1",
                            children: [
                                latitude.toFixed(6),
                                ", ",
                                longitude.toFixed(6)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                            lineNumber: 404,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                    lineNumber: 394,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: googleMapsUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    onClick: (e)=>e.stopPropagation(),
                    className: "border-t border-black/10 dark:border-white/10 py-2.5 px-3 text-center text-xs font-semibold text-[#075E54] dark:text-[#00a884] hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                            className: "h-3.5 w-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                            lineNumber: 418,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "View on Google Maps"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                            lineNumber: 419,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                    lineNumber: 411,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
            lineNumber: 369,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "whitespace-pre-wrap leading-relaxed",
        children: renderTextWithLinks(parsed.text)
    }, void 0, false, {
        fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
        lineNumber: 425,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ChatMessageContent;
var _c;
__turbopack_context__.k.register(_c, "ChatMessageContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/components/ChatMessageMedia.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatMessageMedia",
    ()=>ChatMessageMedia,
    "getMediaType",
    ()=>getMediaType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/navigation.js [app-client] (ecmascript) <export default as Navigation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$ChatMessageContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/ChatMessageContent.tsx [app-client] (ecmascript)");
;
;
;
const getMediaType = (url)=>{
    if (!url) return 'unknown';
    try {
        const cleanUrl = url.split('?')[0].toLowerCase();
        if (/\.(jpg|jpeg|png|gif|webp|bmp|svg|tiff)$/i.test(cleanUrl)) {
            return 'image';
        }
        if (/\.(mp4|3gp|mov|avi|webm|mkv|flv|wmv)$/i.test(cleanUrl)) {
            return 'video';
        }
        if (/\.(mp3|ogg|wav|m4a|aac|flac|wma|opus)$/i.test(cleanUrl)) {
            return 'audio';
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$ChatMessageContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseLocationUrlOrData"])(url)) {
            return 'location';
        }
        return 'document';
    } catch  {
        return 'document';
    }
};
const ChatMessageMedia = ({ mediaUrl, isSent = false })=>{
    if (!mediaUrl) return null;
    const mediaType = getMediaType(mediaUrl);
    const cleanPath = mediaUrl.split('?')[0];
    const rawFileName = cleanPath.split('/').pop() || 'Attachment';
    const fileName = decodeURIComponent(rawFileName);
    const fileExt = fileName.includes('.') ? fileName.split('.').pop()?.toUpperCase() : 'FILE';
    if (mediaType === 'image') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "my-1 rounded-lg overflow-hidden border border-black/10 dark:border-white/10 max-w-[260px] sm:max-w-[300px] bg-black/5 dark:bg-white/5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: mediaUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "block cursor-pointer",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: mediaUrl,
                        alt: "WhatsApp Image",
                        className: "w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-200 max-h-[300px]",
                        loading: "lazy",
                        onError: (e)=>{
                            // If image fails to load as an img tag, hide img and show fallback link
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.parentElement?.nextElementSibling;
                            if (fallback) fallback.style.display = 'flex';
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: mediaUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    style: {
                        display: 'none'
                    },
                    className: "p-3 items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                            className: "w-4 h-4 flex-shrink-0"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "truncate",
                            children: "Open Image Attachment"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
            lineNumber: 44,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (mediaType === 'video') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "my-1 rounded-lg overflow-hidden border border-black/10 dark:border-white/10 max-w-[280px] sm:max-w-[320px] bg-black",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                src: mediaUrl,
                controls: true,
                className: "w-full h-auto max-h-[300px]",
                preload: "metadata",
                children: "Your browser does not support video playback."
            }, void 0, false, {
                fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                lineNumber: 76,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
            lineNumber: 75,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (mediaType === 'audio') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "my-1 py-1 min-w-[220px] max-w-[280px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                src: mediaUrl,
                controls: true,
                className: "w-full h-9",
                preload: "metadata"
            }, void 0, false, {
                fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
            lineNumber: 90,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    const locationData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$ChatMessageContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseLocationUrlOrData"])(mediaUrl);
    if (mediaType === 'location' || locationData) {
        const { latitude, longitude, name, address, url } = locationData || {
            url: mediaUrl,
            name: 'Shared Location'
        };
        const googleMapsUrl = url || (latitude != null && longitude != null ? `https://www.google.com/maps?q=${latitude},${longitude}` : mediaUrl);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "my-1 rounded-xl border border-black/10 dark:border-white/10 overflow-hidden bg-black/[0.03] dark:bg-white/[0.05] min-w-[240px] max-w-[300px] shadow-sm",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-28 relative bg-[#e5e0d8] dark:bg-[#1a2328] flex items-center justify-center overflow-hidden",
                    style: {
                        backgroundImage: 'radial-gradient(#00a884 0.75px, transparent 0.75px), radial-gradient(#00a884 0.75px, #e5e0d8 0.75px)',
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 10px 10px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative flex flex-col items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-full bg-[#ea4335] text-white flex items-center justify-center shadow-md z-10 border-2 border-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                        className: "h-5 w-5 fill-current"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-3 h-1.5 bg-black/20 rounded-full mt-0.5 blur-[1px]"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium flex items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__["Navigation"], {
                                    className: "h-2.5 w-2.5 text-[#4285f4]"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Location"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                                    lineNumber: 126,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate",
                            children: name || 'Shared Location'
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 mt-0.5",
                            children: address
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                            lineNumber: 136,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        latitude != null && longitude != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-1",
                            children: [
                                latitude.toFixed(6),
                                ", ",
                                longitude.toFixed(6)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                            lineNumber: 141,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: googleMapsUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    onClick: (e)=>e.stopPropagation(),
                    className: "border-t border-black/10 dark:border-white/10 py-2.5 px-3 text-center text-xs font-semibold text-[#075E54] dark:text-[#00a884] hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                            className: "h-3.5 w-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                            lineNumber: 155,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "View on Google Maps"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                            lineNumber: 156,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                    lineNumber: 148,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
            lineNumber: 106,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    // Document or fallback
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: mediaUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: `my-1 flex items-center gap-3 p-2.5 rounded-lg border transition-colors ${isSent ? 'bg-emerald-800/10 border-emerald-700/20 hover:bg-emerald-800/20 text-zinc-900 dark:text-zinc-100' : 'bg-zinc-100 dark:bg-zinc-700/50 border-zinc-200 dark:border-zinc-600 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-2 rounded-md bg-white dark:bg-zinc-800 shadow-sm flex-shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                    className: "w-5 h-5 text-emerald-600 dark:text-emerald-400"
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                    lineNumber: 175,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold truncate",
                        title: fileName,
                        children: fileName
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] opacity-75 uppercase font-medium",
                        children: [
                            fileExt || 'DOCUMENT',
                            " • Click to view"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                className: "w-4 h-4 opacity-75 flex-shrink-0 ml-1"
            }, void 0, false, {
                fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
        lineNumber: 164,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ChatMessageMedia;
var _c;
__turbopack_context__.k.register(_c, "ChatMessageMedia");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/pages/LeadChatPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LeadChatPage",
    ()=>LeadChatPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check-check.js [app-client] (ecmascript) <export default as CheckCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/table.js [app-client] (ecmascript) <export default as Table>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/folder-open.js [app-client] (ecmascript) <export default as FolderOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$api$2f$manageMasterDataSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master-data/api/manageMasterDataSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$s3ApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/s3ApiSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$multipartUpload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/utils/multipartUpload.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/api/leadsApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/users/api/usersApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/usePermissions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$ChatMessageMedia$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/ChatMessageMedia.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$ChatMessageContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/ChatMessageContent.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const shouldHideTextMessage = (text, mediaUrl)=>{
    if (!text) return true;
    const trimmed = text.trim();
    if (!trimmed || trimmed.startsWith('[')) return true;
    if (/^(maps|location|file)$/i.test(trimmed)) return true;
    if (mediaUrl && trimmed === mediaUrl.trim()) return true;
    if (mediaUrl && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$ChatMessageContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseLocationUrlOrData"])(mediaUrl) && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$ChatMessageContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseLocationUrlOrData"])(trimmed)) return true;
    return false;
};
const parseTimestamp = (val)=>{
    if (!val) return 0;
    if (typeof val === 'number') {
        if (val < 9999999999) return val * 1000;
        return val;
    }
    const num = Number(val);
    if (!isNaN(num)) {
        if (num < 9999999999) return num * 1000;
        return num;
    }
    const parsed = Date.parse(val);
    return isNaN(parsed) ? 0 : parsed;
};
const formatName = (name)=>{
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};
const formatTemplateMessage = (template, values = [])=>{
    let formatted = template.replace(/{{(\d+)}}/g, (_, index)=>{
        let value = values[Number(index) - 1];
        value = value?.trim() ? formatName(value.trim()) : "______";
        return value;
    });
    const firstVal = values[0]?.trim();
    const displayName = firstVal ? formatName(firstVal) : "______";
    formatted = formatted.replace(/{{name}}/gi, displayName);
    if (firstVal) {
        formatted = formatted.replace(/_+/g, "");
    }
    return formatted.replace(" ,", ",");
};
const LeadChatPage = ()=>{
    _s();
    const { leadUuid } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const [searchParams] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"])();
    const location = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"])();
    const { user: currentUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"])();
    const { data: users = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersQuery"])({
        offset: 0
    });
    const { data: lead } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetLeadByIdQuery"])({
        uuid: leadUuid || ""
    }, {
        skip: !leadUuid || leadUuid === "direct"
    });
    const [sendWhatsappMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$api$2f$manageMasterDataSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSendWhatsappMessageMutation"])();
    const [getProjectWiseTemplates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$api$2f$manageMasterDataSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetProjectWiseTemplatesMutation"])();
    const [getProjectWiseContents, { data: projectContents, isLoading: isContentsLoading }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$api$2f$manageMasterDataSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetProjectWiseContentsMutation"])();
    const [uploadFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$s3ApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUploadFileMutation"])();
    const [downloadUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$s3ApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDownloadUrlMutation"])();
    // Identify current user's phone number for 'from_num'
    const currentUserPhone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LeadChatPage.useMemo[currentUserPhone]": ()=>{
            const loginUser = users.find({
                "LeadChatPage.useMemo[currentUserPhone].loginUser": (u)=>String(u.id) === String(currentUser?.id)
            }["LeadChatPage.useMemo[currentUserPhone].loginUser"]);
            return loginUser?.phone_number || "919100043542"; // Fallback to provided number
        }
    }["LeadChatPage.useMemo[currentUserPhone]"], [
        users,
        currentUser
    ]);
    // Read from navigation state (preferred) or search params (fallback)
    const state = location.state;
    const phone = state?.phone || searchParams.get("phone") || lead?.phone_number || "";
    const type = "CM";
    // Show phone number as name per user feedback
    const contactName = state?.name || phone || "Chat";
    // 🔹 Local Cache for Persistence before S3 sync
    const getLocalCache = ()=>{
        const key = `pending_msgs_${leadUuid}_${type}`;
        const cache = localStorage.getItem(key);
        if (!cache) return [];
        try {
            const parsed = JSON.parse(cache);
            // Filter out messages older than 10 minutes to avoid permanent stale data
            const tenMinAgo = Date.now() - 10 * 60 * 1000;
            return parsed.filter((m)=>parseTimestamp(m.createdAt) > tenMinAgo);
        } catch  {
            return [];
        }
    };
    const saveLocalCache = (msgs)=>{
        const key = `pending_msgs_${leadUuid}_${type}`;
        localStorage.setItem(key, JSON.stringify(msgs));
    };
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(getLocalCache);
    const [templates, setTemplates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loadingTemplates, setLoadingTemplates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isTyping, setIsTyping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isHistoryLoading, setIsHistoryLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isUploadingMedia, setIsUploadingMedia] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [uploadProgress, setUploadProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isContentModalOpen, setIsContentModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSendingContent, setIsSendingContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fetchMessagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [selectedTemplate, setSelectedTemplate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [templateState, setTemplateState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        count: 0,
        lastSentAt: 0,
        lastTemplateId: null
    });
    // 🔹 Template Throttling Logic Helpers (derived dynamically from messages history & local state)
    const getTemplateState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LeadChatPage.useCallback[getTemplateState]": ()=>{
            let count = 0;
            let lastSentAt = 0;
            let lastTemplateId = null;
            if (messages && messages.length > 0) {
                for (const m of messages){
                    if (m.from === "bot") {
                        // Customer replied -> reset count
                        count = 0;
                        lastSentAt = 0;
                        lastTemplateId = null;
                    } else if (m.from === "user" && (m.template_name || m.template || m.template_id)) {
                        // User sent a template message (from mobile app or web)
                        count++;
                        const ts = parseTimestamp(m.createdAt);
                        if (ts > lastSentAt) {
                            lastSentAt = ts;
                            lastTemplateId = m.template_name || m.template || null;
                        }
                    }
                }
            }
            // Check localStorage for any recent optimistic sends
            const key = `template_state_${phone}`;
            const data = localStorage.getItem(key);
            if (data) {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.lastSentAt > lastSentAt) {
                        count = Math.max(count, parsed.count);
                        lastSentAt = parsed.lastSentAt;
                        lastTemplateId = parsed.lastTemplateId || lastTemplateId;
                    }
                } catch (e) {
                // ignore
                }
            }
            return {
                count,
                lastSentAt,
                lastTemplateId
            };
        }
    }["LeadChatPage.useCallback[getTemplateState]"], [
        messages,
        phone
    ]);
    const saveTemplateState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LeadChatPage.useCallback[saveTemplateState]": (updates)=>{
            const key = `template_state_${phone}`;
            const current = getTemplateState();
            const newState = {
                ...current,
                ...updates
            };
            localStorage.setItem(key, JSON.stringify(newState));
            setTemplateState(newState);
        }
    }["LeadChatPage.useCallback[saveTemplateState]"], [
        phone,
        getTemplateState
    ]);
    // Load state when messages or phone changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeadChatPage.useEffect": ()=>{
            setTemplateState(getTemplateState());
        }
    }["LeadChatPage.useEffect"], [
        getTemplateState
    ]);
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // 🔹 Auto scroll
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeadChatPage.useEffect": ()=>{
            bottomRef.current?.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["LeadChatPage.useEffect"], [
        messages
    ]);
    // 🔹 Load templates
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeadChatPage.useEffect": ()=>{
            const loadTemplates = {
                "LeadChatPage.useEffect.loadTemplates": async ()=>{
                    try {
                        setLoadingTemplates(true);
                        const projectId = lead?.project_id || 0;
                        const data = await getProjectWiseTemplates({
                            project_id: projectId
                        }).unwrap();
                        console.log("Project Wise Templates Response:", data);
                        if (data && Array.isArray(data)) {
                            setTemplates(data);
                        } else if (data?.data && Array.isArray(data.data)) {
                            setTemplates(data.data);
                        } else if (data?.templates && Array.isArray(data.templates)) {
                            setTemplates(data.templates);
                        } else {
                            setTemplates(data || []);
                        }
                    } catch (err) {} finally{
                        setLoadingTemplates(false);
                    }
                }
            }["LeadChatPage.useEffect.loadTemplates"];
            loadTemplates();
        }
    }["LeadChatPage.useEffect"], [
        getProjectWiseTemplates,
        lead?.project_id
    ]);
    // 🔹 Normalize phone numbers for reliable comparison (handles India 91 code)
    const normalizePhone = (num)=>{
        if (!num) return "";
        const clean = num.replace(/\D/g, "");
        // Remove '91' prefix if it's a 12-digit number (India)
        return clean.length === 12 && clean.startsWith("91") ? clean.slice(2) : clean;
    };
    // 🔹 Load S3 chat history
    const processMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LeadChatPage.useCallback[processMessages]": (data)=>{
            const s3Msgs = (Array.isArray(data) ? data : []).map({
                "LeadChatPage.useCallback[processMessages].s3Msgs": (msg)=>{
                    const dir = String(msg.direction || "").toLowerCase();
                    const isSent = dir === "sent" || dir === "outbound" || dir === "user";
                    const messageText = msg.message || msg.template_name || msg.template || msg.text || msg.body || msg.content || "";
                    const mediaUrl = msg.message_media || msg.media || msg.media_url || msg.url || "";
                    const timestamp = msg.timestamp || msg.createdAt || msg.time || msg.created_at || new Date().toISOString();
                    return {
                        id: msg.uuid || msg.id || Date.now() + Math.random(),
                        text: messageText,
                        media: mediaUrl,
                        from: isSent ? "user" : "bot",
                        createdAt: timestamp,
                        // Store original numbers for filtering
                        from_number: msg.from_number,
                        to_number: msg.to_number,
                        template_name: msg.template_name || msg.template
                    };
                }
            }["LeadChatPage.useCallback[processMessages].s3Msgs"]);
            // ✅ If there's a bot message (customer reply) sent AFTER the last template sent time, reset template usage flag
            const state = getTemplateState();
            const hasNewBotReply = s3Msgs.some({
                "LeadChatPage.useCallback[processMessages].hasNewBotReply": (m)=>m.from === "bot" && parseTimestamp(m.createdAt) > state.lastSentAt - 5000
            }["LeadChatPage.useCallback[processMessages].hasNewBotReply"]);
            if (hasNewBotReply && state.count > 0) {
                localStorage.removeItem(`template_used_${phone}`);
                localStorage.removeItem(`template_state_${phone}`);
                setTemplateState({
                    count: 0,
                    lastSentAt: 0,
                    lastTemplateId: null
                });
            }
            setMessages({
                "LeadChatPage.useCallback[processMessages]": (prev)=>{
                    const newMessages = [];
                    const matchedPrevIndices = new Set();
                    // 1. Add all S3 messages as the source of truth
                    s3Msgs.forEach({
                        "LeadChatPage.useCallback[processMessages]": (s3Msg)=>{
                            newMessages.push(s3Msg);
                            // Find if this corresponds to a message in prev so we know it's matched
                            const s3Time = parseTimestamp(s3Msg.createdAt);
                            const existingIdx = prev.findIndex({
                                "LeadChatPage.useCallback[processMessages].existingIdx": (p, idx)=>!matchedPrevIndices.has(idx) && (p.text || "").trim() === (s3Msg.text || "").trim() && p.from === s3Msg.from && (p.media || "").trim() === (s3Msg.media || "").trim() && Math.abs(parseTimestamp(p.createdAt) - s3Time) < 5 * 60 * 1000 // 5 minutes fuzzy match
                            }["LeadChatPage.useCallback[processMessages].existingIdx"]);
                            if (existingIdx !== -1) {
                                matchedPrevIndices.add(existingIdx);
                            }
                        }
                    }["LeadChatPage.useCallback[processMessages]"]);
                    // 2. Add unmatched recent messages (optimistic UI messages not yet in S3)
                    prev.forEach({
                        "LeadChatPage.useCallback[processMessages]": (p, idx)=>{
                            if (!matchedPrevIndices.has(idx)) {
                                const age = Date.now() - parseTimestamp(p.createdAt);
                                if (age < 10 * 60 * 1000) {
                                    newMessages.push(p);
                                }
                            }
                        }
                    }["LeadChatPage.useCallback[processMessages]"]);
                    const sorted = newMessages.sort({
                        "LeadChatPage.useCallback[processMessages].sorted": (a, b)=>parseTimestamp(a.createdAt) - parseTimestamp(b.createdAt)
                    }["LeadChatPage.useCallback[processMessages].sorted"]);
                    // ✅ Cache check: If messages are identical, return prev state reference to prevent unnecessary state updates & auto-scroll jumps
                    if (prev.length === sorted.length) {
                        const isIdentical = prev.every({
                            "LeadChatPage.useCallback[processMessages].isIdentical": (msg, idx)=>{
                                const target = sorted[idx];
                                return msg.id === target.id && (msg.text || "").trim() === (target.text || "").trim() && (msg.media || "").trim() === (target.media || "").trim() && msg.from === target.from && msg.createdAt === target.createdAt;
                            }
                        }["LeadChatPage.useCallback[processMessages].isIdentical"]);
                        if (isIdentical) {
                            return prev;
                        }
                    }
                    return sorted;
                }
            }["LeadChatPage.useCallback[processMessages]"]);
        }
    }["LeadChatPage.useCallback[processMessages]"], [
        phone,
        getTemplateState
    ]);
    const fetchS3Messages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LeadChatPage.useCallback[fetchS3Messages]": async (showLoading = false)=>{
            if (!leadUuid || !phone) return;
            try {
                if (showLoading) setIsHistoryLoading(true);
                const candidates = [];
                const normalizeS3Url = {
                    "LeadChatPage.useCallback[fetchS3Messages].normalizeS3Url": (loc)=>{
                        if (!loc) return "";
                        const leadIndex = loc.indexOf("lead/");
                        if (leadIndex !== -1) {
                            return `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S3_BASE_URL"]}/${loc.substring(leadIndex)}`;
                        }
                        if (!loc.startsWith("http://") && !loc.startsWith("https://")) {
                            const cleanPath = loc.startsWith("/") ? loc : `/${loc}`;
                            return `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S3_BASE_URL"]}${cleanPath}`;
                        }
                        return loc;
                    }
                }["LeadChatPage.useCallback[fetchS3Messages].normalizeS3Url"];
                // 1. Prioritize chat_file_location from lead data
                if (lead?.chats && lead.chats.length > 0) {
                    const matchingChat = lead.chats.find({
                        "LeadChatPage.useCallback[fetchS3Messages].matchingChat": (c)=>c.chat_file_location?.toLowerCase().includes(`_${type.toLowerCase()}.json`) || c.chat_file_location?.toLowerCase().includes(`/${phone}_`)
                    }["LeadChatPage.useCallback[fetchS3Messages].matchingChat"]);
                    if (matchingChat?.chat_file_location) {
                        candidates.push(normalizeS3Url(matchingChat.chat_file_location));
                    }
                }
                // 2. Standard lead folder path
                const cleanPhone = phone.replace(/\D/g, "");
                const finalPhone = cleanPhone.length === 10 && !cleanPhone.startsWith("91") ? `91${cleanPhone}` : cleanPhone;
                if (leadUuid && leadUuid !== "direct") {
                    candidates.push(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S3_BASE_URL"]}/lead/${leadUuid}/chats/${finalPhone}_${type}.json`);
                }
                candidates.push(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S3_BASE_URL"]}/chats/${finalPhone}_${type}.json`);
                let fetchedData = null;
                for (const url of candidates){
                    if (!url) continue;
                    try {
                        const cacheBuster = `?t=${Date.now()}`;
                        const res = await fetch(url + cacheBuster, {
                            cache: 'no-store',
                            headers: {
                                'Cache-Control': 'no-cache',
                                'Pragma': 'no-cache'
                            }
                        });
                        if (res.ok) {
                            const data = await res.json();
                            if (Array.isArray(data) && data.length > 0) {
                                fetchedData = data;
                                break;
                            }
                        }
                    } catch  {
                    // try next candidate
                    }
                }
                if (fetchedData) {
                    processMessages(fetchedData);
                }
            } catch (err) {
                console.error("S3 fetch error:", err);
            } finally{
                if (showLoading) setIsHistoryLoading(false);
            }
        }
    }["LeadChatPage.useCallback[fetchS3Messages]"], [
        leadUuid,
        phone,
        type,
        lead,
        processMessages
    ]);
    // ✅ Keep fetchMessagesRef updated with latest logic
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeadChatPage.useEffect": ()=>{
            fetchMessagesRef.current = ({
                "LeadChatPage.useEffect": ()=>fetchS3Messages(false)
            })["LeadChatPage.useEffect"];
        }
    }["LeadChatPage.useEffect"], [
        fetchS3Messages
    ]);
    // ✅ Initial Load and Polling
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeadChatPage.useEffect": ()=>{
            // Initial fetch using the ref to ensure latest logic is used
            if (fetchMessagesRef.current) {
                fetchMessagesRef.current(true);
            }
            const pollInterval = setInterval({
                "LeadChatPage.useEffect.pollInterval": ()=>{
                    if (fetchMessagesRef.current) {
                        fetchMessagesRef.current(false);
                    }
                }
            }["LeadChatPage.useEffect.pollInterval"], 3000);
            return ({
                "LeadChatPage.useEffect": ()=>{
                    clearInterval(pollInterval);
                }
            })["LeadChatPage.useEffect"];
        }
    }["LeadChatPage.useEffect"], []);
    // ✅ Countdown timer for throttling
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeadChatPage.useEffect": ()=>{
            const updateCountdown = {
                "LeadChatPage.useEffect.updateCountdown": ()=>{
                    const state = getTemplateState();
                    if (state.count === 0) {
                        setTimeLeft(null);
                        return;
                    }
                    const now = Date.now();
                    const diff = now - state.lastSentAt;
                    const waitTime = 4 * 60 * 60 * 1000; // Always 4 hours per template
                    const remaining = waitTime - diff;
                    if (remaining > 0) {
                        const hours = Math.floor(remaining / (1000 * 60 * 60));
                        const minutes = Math.floor(remaining % (1000 * 60 * 60) / (1000 * 60));
                        const seconds = Math.floor(remaining % (1000 * 60) / 1000);
                        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
                    } else {
                        setTimeLeft(null);
                    }
                }
            }["LeadChatPage.useEffect.updateCountdown"];
            updateCountdown();
            const interval = setInterval(updateCountdown, 1000);
            return ({
                "LeadChatPage.useEffect": ()=>clearInterval(interval)
            })["LeadChatPage.useEffect"];
        }
    }["LeadChatPage.useEffect"], [
        getTemplateState
    ]);
    // ✅ Reset throttling state when customer replies (monitors messages state)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeadChatPage.useEffect": ()=>{
            const state = getTemplateState();
            if (state.count > 0) {
                let lastSentUserMsgIdx = -1;
                for(let i = messages.length - 1; i >= 0; i--){
                    if (messages[i].from === "user") {
                        lastSentUserMsgIdx = i;
                        break;
                    }
                }
                let hasReply = false;
                if (lastSentUserMsgIdx !== -1) {
                    for(let i = lastSentUserMsgIdx + 1; i < messages.length; i++){
                        if (messages[i].from === "bot") {
                            hasReply = true;
                            break;
                        }
                    }
                }
                if (!hasReply) {
                    hasReply = messages.some({
                        "LeadChatPage.useEffect": (m)=>m.from === "bot" && parseTimestamp(m.createdAt) > state.lastSentAt - 300000
                    }["LeadChatPage.useEffect"]);
                }
                if (hasReply) {
                    localStorage.removeItem(`template_used_${phone}`);
                    localStorage.removeItem(`template_state_${phone}`);
                    setTemplateState({
                        count: 0,
                        lastSentAt: 0,
                        lastTemplateId: null
                    });
                }
            }
        }
    }["LeadChatPage.useEffect"], [
        messages,
        phone,
        getTemplateState
    ]);
    const isThrottled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "LeadChatPage.useCallback[isThrottled]": ()=>{
            const state = getTemplateState();
            if (state.count > 0) {
                // ✅ If the customer has replied since the last template, they are NOT throttled!
                let lastSentUserMsgIdx = -1;
                for(let i = messages.length - 1; i >= 0; i--){
                    if (messages[i].from === "user") {
                        lastSentUserMsgIdx = i;
                        break;
                    }
                }
                let hasReply = false;
                if (lastSentUserMsgIdx !== -1) {
                    for(let i = lastSentUserMsgIdx + 1; i < messages.length; i++){
                        if (messages[i].from === "bot") {
                            hasReply = true;
                            break;
                        }
                    }
                }
                // Fallback to timestamp check
                if (!hasReply) {
                    hasReply = messages.some({
                        "LeadChatPage.useCallback[isThrottled]": (m)=>m.from === "bot" && parseTimestamp(m.createdAt) > state.lastSentAt - 300000
                    }["LeadChatPage.useCallback[isThrottled]"]);
                }
                if (hasReply) {
                    return false;
                }
                const now = Date.now();
                const diff = now - state.lastSentAt;
                const waitTime = 4 * 60 * 60 * 1000; // Always 4 hours per template
                if (diff < waitTime) return true;
            }
            return false;
        }
    }["LeadChatPage.useCallback[isThrottled]"], [
        getTemplateState,
        messages
    ]);
    const shouldShowTemplates = ()=>{
        // ✅ Throttling check (must always be verified first!)
        if (isThrottled()) return false;
        // ✅ If no messages yet, must use template to start
        if (!messages || messages.length === 0) return true;
        const currentCustomerPhone = normalizePhone(phone);
        // console.log(messages)
        // ✅ Filter messages to ensure we are only looking at this specific conversation
        const customerMessages = messages.filter((msg)=>{
            const from = normalizePhone(msg.from_number);
            const to = normalizePhone(msg.to_number);
            return from === currentCustomerPhone;
        });
        if (customerMessages.length === 0) {
            return true;
        }
        // ✅ Find the latest message timestamp from the filtered list
        const lastMsg = customerMessages.reduce((latest, msg)=>{
            const msgTime = parseTimestamp(msg.createdAt);
            const latestTime = parseTimestamp(latest.createdAt);
            return msgTime > latestTime ? msg : latest;
        }, customerMessages[0]);
        if (!lastMsg?.createdAt) return true;
        const lastTime = parseTimestamp(lastMsg.createdAt);
        const now = Date.now();
        const diffHours = (now - lastTime) / (1000 * 60 * 60);
        if (diffHours < 23.5) return false;
        return true;
    };
    // 🔹 Send message
    const sendMessage = async ()=>{
        if (selectedTemplate && !input.trim()) {
            alert("Please enter a name for the template");
            return;
        }
        if (!selectedTemplate && !input.trim()) return;
        const messageText = selectedTemplate ? formatTemplateMessage(selectedTemplate.message, [
            input
        ]) : input;
        const userMsg = {
            id: Date.now(),
            text: messageText,
            from: "user",
            createdAt: new Date().toISOString()
        };
        setMessages((prev)=>[
                ...prev,
                userMsg
            ]);
        saveLocalCache([
            ...getLocalCache(),
            userMsg
        ]);
        const currentInput = input;
        const templateToSend = selectedTemplate;
        setInput("");
        setSelectedTemplate(null);
        setIsTyping(true);
        try {
            const cleanTargetPhone = phone.replace(/\D/g, "");
            const targetNumber = cleanTargetPhone.length >= 10 ? cleanTargetPhone.slice(-10) : cleanTargetPhone;
            // Backend / Interakt Proxy Payload Requirements
            const isTemplate = Boolean(templateToSend);
            const payload = {
                countryCode: "+91",
                phoneNumber: targetNumber,
                type: isTemplate ? "Template" : "Text",
                ...isTemplate ? {
                    template: {
                        name: templateToSend.name || templateToSend.template_name || templateToSend?.id,
                        languageCode: templateToSend.languageCode || templateToSend.language || "en",
                        bodyValues: currentInput.trim() ? [
                            currentInput.trim()
                        ] : [],
                        headerValues: [],
                        buttonValues: {}
                    }
                } : {
                    data: {
                        message: messageText
                    }
                }
            };
            const res = await sendWhatsappMessage(payload).unwrap();
            if (res?.success || res) {
                if (templateToSend) {
                    localStorage.setItem(`template_used_${phone}`, "true");
                    // ✅ Update throttling state
                    const state = getTemplateState();
                    saveTemplateState({
                        count: state.count + 1,
                        lastSentAt: Date.now(),
                        lastTemplateId: templateToSend.id
                    });
                }
            }
        } catch (err) {} finally{
            setIsTyping(false);
        }
    };
    const handleFileSelect = async (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        // Reset input value so same file can be selected again if needed
        e.target.value = "";
        // 1. Validate file size <= 200MB
        if (file.size > 200 * 1024 * 1024) {
            alert("File size exceeds the 200MB limit. Please select a smaller file.");
            return;
        }
        try {
            setIsUploadingMedia(true);
            setUploadProgress(0);
            let s3Key = "";
            let s3Url = "";
            const folderPath = leadUuid && leadUuid !== "direct" ? `lead/${leadUuid}/media` : "whatsapp_attachments";
            // 2. Upload file (small vs large)
            if (file.size > 5 * 1024 * 1024) {
                // Multipart upload for > 5MB
                const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$multipartUpload$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadLargeFileToS3Only"])(file, folderPath, (prog)=>{
                    setUploadProgress(prog);
                });
                s3Key = res.key;
                s3Url = res.url || "";
            } else {
                // Standard upload for <= 5MB
                const cleanFilename = file.name.trim().replace(/\s+/g, '_');
                const key = `${folderPath}/${Date.now()}_${cleanFilename}`;
                const formData = new FormData();
                formData.append("file", file);
                formData.append("key", key);
                const uploadRes = await uploadFile(formData).unwrap();
                s3Key = uploadRes.key || key;
                s3Url = uploadRes.url || "";
            }
            // 3. Get accessible S3 URL if direct url is not available
            let mediaUrl = s3Url;
            if (!mediaUrl || !mediaUrl.startsWith("http")) {
                try {
                    const dlRes = await downloadUrl({
                        key: s3Key
                    }).unwrap();
                    mediaUrl = dlRes.downloadUrl || dlRes.presignedUrl || dlRes.url || "";
                } catch (dlErr) {
                    console.error("Failed to get download URL, falling back to S3_BASE_URL", dlErr);
                    mediaUrl = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["S3_BASE_URL"]}/${s3Key}`;
                }
            }
            if (!mediaUrl) {
                throw new Error("Could not generate accessible URL for uploaded media.");
            }
            // 4. Determine Interakt media type
            const ext = file.name.includes('.') ? file.name.split('.').pop()?.toLowerCase() || "" : "";
            let mediaType = "Document";
            if (/^(jpg|jpeg|png|gif|webp|bmp)$/.test(ext) || file.type.startsWith("image/")) {
                mediaType = "Image";
            } else if (/^(mp4|3gp|mov|avi|webm|mkv)$/.test(ext) || file.type.startsWith("video/")) {
                mediaType = "Video";
            } else if (/^(mp3|ogg|wav|m4a|aac|flac)$/.test(ext) || file.type.startsWith("audio/")) {
                mediaType = "Audio";
            }
            // 5. Send Free Form Media Message to API
            const cleanTargetPhone = phone.replace(/\D/g, "");
            const targetNumber = cleanTargetPhone.length >= 10 ? cleanTargetPhone.slice(-10) : cleanTargetPhone;
            const payload = {
                countryCode: "+91",
                phoneNumber: targetNumber,
                type: mediaType,
                data: {
                    mediaUrl: mediaUrl
                }
            };
            console.log("Sending Free Form Media Message:", payload);
            await sendWhatsappMessage(payload).unwrap();
            // 6. Update local chat UI
            const userMsg = {
                id: Date.now(),
                text: "",
                media: mediaUrl,
                from: "user",
                createdAt: new Date().toISOString()
            };
            setMessages((prev)=>[
                    ...prev,
                    userMsg
                ]);
            saveLocalCache([
                ...getLocalCache(),
                userMsg
            ]);
        } catch (error) {
            console.error("Failed to upload and send media:", error);
            alert("Failed to send attachment. Please check console or try again.");
        } finally{
            setIsUploadingMedia(false);
            setUploadProgress(0);
        }
    };
    // Computed project contents list
    const displayedContent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LeadChatPage.useMemo[displayedContent]": ()=>{
            if (!projectContents || !projectContents.data || projectContents.data.length === 0) return [];
            let allItems = [];
            if (lead?.project_id) {
                const projectData = projectContents.data.find({
                    "LeadChatPage.useMemo[displayedContent].projectData": (d)=>d.project_id === lead.project_id
                }["LeadChatPage.useMemo[displayedContent].projectData"]);
                if (projectData && projectData.contents) {
                    allItems = projectData.contents;
                } else {
                    projectContents.data.forEach({
                        "LeadChatPage.useMemo[displayedContent]": (pd)=>{
                            if (pd.contents) allItems.push(...pd.contents);
                        }
                    }["LeadChatPage.useMemo[displayedContent]"]);
                }
            } else {
                projectContents.data.forEach({
                    "LeadChatPage.useMemo[displayedContent]": (pd)=>{
                        if (pd.contents) allItems.push(...pd.contents);
                    }
                }["LeadChatPage.useMemo[displayedContent]"]);
            }
            return allItems.map({
                "LeadChatPage.useMemo[displayedContent]": (content)=>{
                    let fileName = content.s3_key ? content.s3_key.split('/').pop() : "Unknown File";
                    if (!fileName) fileName = "Unknown File";
                    const fileExt = fileName.split('.').pop()?.toLowerCase() || "pdf";
                    let type = "pdf";
                    if (fileExt === "xlsx" || fileExt === "xls") type = "xlsx";
                    else if (fileExt === "dwg") type = "dwg";
                    else if (fileExt === "png" || fileExt === "jpg" || fileExt === "jpeg") type = "png";
                    else if (fileExt === "mp4" || fileExt === "mov") type = "mp4";
                    return {
                        id: content.id,
                        fileName,
                        fileType: type,
                        title: content.content_type_description || fileName,
                        s3_key: content.s3_key
                    };
                }
            }["LeadChatPage.useMemo[displayedContent]"]);
        }
    }["LeadChatPage.useMemo[displayedContent]"], [
        projectContents,
        lead?.project_id
    ]);
    // Icon renderer helper matching ContentPage
    const renderFileIcon = (fileType)=>{
        switch(fileType){
            case "pdf":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/20 flex items-center justify-center border border-red-200 dark:border-red-950 shrink-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                        className: "w-4 h-4 text-red-500"
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                        lineNumber: 840,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                    lineNumber: 839,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            case "xlsx":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-9 h-9 rounded-xl bg-slate-50 dark:bg-zinc-800/30 flex items-center justify-center border border-slate-300 dark:border-zinc-800 shrink-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
                        className: "w-4 h-4 text-slate-500"
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                        lineNumber: 846,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                    lineNumber: 845,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            case "dwg":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/20 flex items-center justify-center border border-blue-200 dark:border-blue-900 shrink-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                        className: "w-4 h-4 text-blue-500"
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                        lineNumber: 852,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                    lineNumber: 851,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            case "png":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-9 h-9 rounded-xl bg-slate-50 dark:bg-zinc-800/30 flex items-center justify-center border border-slate-350 dark:border-zinc-800 shrink-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                        className: "w-4 h-4 text-slate-450"
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                        lineNumber: 858,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                    lineNumber: 857,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            case "mp4":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-9 h-9 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 flex items-center justify-center border border-[#002d62]/30 dark:border-blue-900/30 shrink-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                        className: "w-4 h-4 fill-current text-[#002d62]"
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                        lineNumber: 864,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                    lineNumber: 863,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-9 h-9 rounded-xl bg-slate-50 dark:bg-zinc-800 flex items-center justify-center border border-slate-200 dark:border-zinc-850 shrink-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                        className: "w-4 h-4 text-slate-400"
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                        lineNumber: 870,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                    lineNumber: 869,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
        }
    };
    const handleSendContentItem = async (content)=>{
        try {
            setIsSendingContent(true);
            setIsContentModalOpen(false);
            console.log(`[Send Content] Calling /s3/downloadUrl for key: "${content.s3_key}"`);
            const response = await downloadUrl({
                key: content.s3_key
            }).unwrap();
            const targetUrl = response.url || response.downloadUrl || response.presignedUrl;
            if (!targetUrl) {
                throw new Error("No valid URL returned from /s3/downloadUrl");
            }
            const ext = content.fileName.includes('.') ? content.fileName.split('.').pop()?.toLowerCase() || "" : "";
            let mediaType = "Document";
            if (/^(jpg|jpeg|png|gif|webp|bmp)$/.test(ext)) {
                mediaType = "Image";
            } else if (/^(mp4|3gp|mov|avi|webm|mkv)$/.test(ext)) {
                mediaType = "Video";
            } else if (/^(mp3|ogg|wav|m4a|aac|flac)$/.test(ext)) {
                mediaType = "Audio";
            }
            const cleanTargetPhone = phone.replace(/\D/g, "");
            const targetNumber = cleanTargetPhone.length >= 10 ? cleanTargetPhone.slice(-10) : cleanTargetPhone;
            const payload = {
                countryCode: "+91",
                phoneNumber: targetNumber,
                type: mediaType,
                data: {
                    mediaUrl: targetUrl
                }
            };
            console.log("Sending Content Message:", payload);
            await sendWhatsappMessage(payload).unwrap();
            const userMsg = {
                id: Date.now(),
                text: "",
                media: targetUrl,
                from: "user",
                createdAt: new Date().toISOString()
            };
            setMessages((prev)=>[
                    ...prev,
                    userMsg
                ]);
            saveLocalCache([
                ...getLocalCache(),
                userMsg
            ]);
        } catch (error) {
            console.error("Failed to send content:", error);
            alert("Failed to send content. Please try again.");
        } finally{
            setIsSendingContent(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-screen flex flex-col bg-[#efeae2] font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#075E54] px-4 py-2 flex items-center justify-between shrink-0 shadow-md z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "icon",
                                className: "rounded-full hover:bg-white/10 text-white",
                                onClick: ()=>navigate(-1),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                    lineNumber: 948,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                lineNumber: 942,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3 cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                            className: "h-6 w-6 text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                            lineNumber: 953,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                        lineNumber: 952,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-medium text-white leading-tight",
                                                children: contactName
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                                lineNumber: 956,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[12px] text-white/80",
                                                children: "online"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                                lineNumber: 959,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                        lineNumber: 955,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                lineNumber: 951,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                        lineNumber: 941,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2"
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                        lineNumber: 966,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                lineNumber: 940,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto p-4 md:p-6 space-y-2 relative",
                style: {
                    backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')",
                    backgroundBlendMode: "overlay",
                    backgroundColor: "#efeae2"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center my-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bg-[#ffffff] dark:bg-[#182229] text-[#54656f] dark:text-[#8696a0] text-[12.5px] px-3 py-1.5 rounded-lg shadow-sm uppercase font-medium",
                                children: "Yesterday"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                lineNumber: 982,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                            lineNumber: 981,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        messages.map((msg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("flex w-full mb-2", msg.from === "user" ? "justify-end" : "justify-start"),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("px-3 py-2 rounded-lg max-w-[85%] md:max-w-[70%] text-[14.2px] shadow-sm relative group", msg.from === "user" ? "bg-[#dcf8c6] dark:bg-[#005c4b] text-[#111b21] dark:text-[#e9edef] rounded-tr-none" : "bg-white dark:bg-[#202c33] text-[#111b21] dark:text-[#e9edef] rounded-tl-none"),
                                    children: [
                                        msg.media ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$ChatMessageMedia$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatMessageMedia"], {
                                                    mediaUrl: msg.media,
                                                    isSent: msg.from === "user"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                                    lineNumber: 1005,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                !shouldHideTextMessage(msg.text, msg.media) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-1",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$ChatMessageContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatMessageContent"], {
                                                        content: msg.text,
                                                        isSent: msg.from === "user"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                                        lineNumber: 1008,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                                    lineNumber: 1007,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                            lineNumber: 1004,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)) : msg.text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$ChatMessageContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ChatMessageContent"], {
                                            content: msg.text,
                                            isSent: msg.from === "user"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                            lineNumber: 1013,
                                            columnNumber: 31
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-end gap-1 mt-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[11px] text-[#667781] dark:text-[#8696a0] opacity-90",
                                                    children: new Date(parseTimestamp(msg.createdAt)).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                                    lineNumber: 1016,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                msg.from === "user" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCheck$3e$__["CheckCheck"], {
                                                    className: "h-3.5 w-3.5 text-[#53bdeb]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                                    lineNumber: 1024,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                            lineNumber: 1015,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                    lineNumber: 995,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, msg.id + "_" + msg.createdAt, false, {
                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                lineNumber: 988,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))),
                        templates.length > 0 && shouldShowTemplates() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-3 mt-8 pb-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full flex items-center gap-4 text-[#8696a0]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-[1px] flex-1 bg-black/10 dark:bg-white/10"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                            lineNumber: 1035,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-semibold uppercase tracking-wider",
                                            children: "Quick Templates"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                            lineNumber: 1036,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-[1px] flex-1 bg-black/10 dark:bg-white/10"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                            lineNumber: 1037,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                    lineNumber: 1034,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-3 w-full",
                                    children: loadingTemplates ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "col-span-full py-4 text-center text-zinc-400 text-sm",
                                        children: "Loading professional templates..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                        lineNumber: 1042,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)) : templates.filter((t, index)=>{
                                        if (templateState.lastTemplateId && t.id === templateState.lastTemplateId) {
                                            return false;
                                        }
                                        return index >= templateState.count;
                                    }).map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                setSelectedTemplate(t);
                                                setInput("");
                                                // Focus input so user can type
                                                setTimeout(()=>{
                                                    if (inputRef.current) {
                                                        inputRef.current.focus();
                                                    }
                                                }, 0);
                                            },
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("bg-white dark:bg-[#202c33] text-zinc-700 dark:text-[#d1d7db] px-4 py-3 rounded-xl shadow-sm text-left text-sm transition-all border hover:border-black/5", selectedTemplate?.id === t.id ? "border-[#00a884] ring-1 ring-[#00a884]" : "border-transparent hover:bg-[#f0f2f5] dark:hover:bg-[#182229]"),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-semibold text-[#075E54] dark:text-[#00a884] mb-0.5",
                                                    children: t.display_name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                                    lineNumber: 1074,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs opacity-70 truncate",
                                                    children: [
                                                        "Category: ",
                                                        t.category
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                                    lineNumber: 1075,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, t.id, true, {
                                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                            lineNumber: 1054,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                    lineNumber: 1040,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                timeLeft && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full bg-[#fff] dark:bg-[#202c33] border border-orange-200 dark:border-orange-900/30 p-3 rounded-xl flex items-center justify-between shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-2 h-2 bg-orange-500 rounded-full animate-pulse"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                                    lineNumber: 1085,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-bold text-orange-600 uppercase tracking-wider",
                                                    children: "Next Template Available In:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                                    lineNumber: 1086,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                            lineNumber: 1084,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-black text-[#075E54] dark:text-[#00a884] font-mono",
                                            children: timeLeft
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                            lineNumber: 1088,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                    lineNumber: 1083,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                            lineNumber: 1033,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: bottomRef,
                            className: "h-4"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                            lineNumber: 1096,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                    lineNumber: 980,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                lineNumber: 972,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            selectedTemplate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#f0f2f5] dark:bg-[#202c33] px-4 py-3 text-sm text-[#111b21] dark:text-[#e9edef] border-t border-b dark:border-white/5 border-black/5 shadow-sm z-10 flex flex-col gap-1 shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] font-bold text-[#00a884] uppercase tracking-wider",
                                children: "Template Preview"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                lineNumber: 1104,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedTemplate(null),
                                className: "text-xs text-zinc-400 hover:text-zinc-600",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                lineNumber: 1105,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                        lineNumber: 1103,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "whitespace-pre-wrap mt-1",
                        children: formatTemplateMessage(selectedTemplate.message, [
                            input
                        ])
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                        lineNumber: 1107,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                lineNumber: 1102,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            isUploadingMedia && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-[#202c33] px-4 py-2 border-t border-b dark:border-white/5 flex items-center gap-3 shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "h-4 w-4 animate-spin text-[#00a884] shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                        lineNumber: 1114,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-xs font-semibold text-[#111b21] dark:text-[#e9edef] mb-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Uploading Attachment..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                        lineNumber: 1117,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            uploadProgress,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                        lineNumber: 1118,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                lineNumber: 1116,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full bg-zinc-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#00a884] h-full transition-all duration-300 rounded-full",
                                    style: {
                                        width: `${uploadProgress}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                    lineNumber: 1121,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                lineNumber: 1120,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                        lineNumber: 1115,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                lineNumber: 1113,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#f0f2f5] dark:bg-[#202c33] p-3 flex items-center gap-2 shrink-0 border-t dark:border-white/5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                ref: fileInputRef,
                                onChange: handleFileSelect,
                                className: "hidden"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                lineNumber: 1133,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative group/tooltip flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "icon",
                                        onClick: ()=>fileInputRef.current?.click(),
                                        disabled: isUploadingMedia || isThrottled(),
                                        className: "rounded-full text-[#54656f] dark:text-[#aebac1]",
                                        children: isUploadingMedia ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "h-6 w-6 animate-spin text-[#00a884]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                            lineNumber: 1148,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            className: "h-6 w-6"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                            lineNumber: 1150,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                        lineNumber: 1140,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-full left-0 mb-2 px-3 py-1.5 bg-[#1f2c34] dark:bg-zinc-800 text-white text-xs font-semibold rounded-lg shadow-lg whitespace-nowrap pointer-events-none opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-150 z-[999]",
                                        children: [
                                            "Attach File (max 200MB)",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-full left-3 -mt-1 border-4 border-transparent border-t-[#1f2c34] dark:border-t-zinc-800"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                                lineNumber: 1155,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                        lineNumber: 1153,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                lineNumber: 1139,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative group/tooltip flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "icon",
                                        onClick: ()=>{
                                            setIsContentModalOpen(true);
                                            getProjectWiseContents({
                                                project_ids: lead?.project_id ? [
                                                    lead.project_id
                                                ] : [
                                                    1,
                                                    2,
                                                    3,
                                                    4,
                                                    5,
                                                    6,
                                                    7,
                                                    8,
                                                    9,
                                                    10
                                                ]
                                            });
                                        },
                                        disabled: isSendingContent || isThrottled(),
                                        className: "rounded-full text-[#54656f] dark:text-[#aebac1]",
                                        children: isSendingContent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "h-6 w-6 animate-spin text-[#00a884]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                            lineNumber: 1170,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderOpen$3e$__["FolderOpen"], {
                                            className: "h-6 w-6"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                            lineNumber: 1172,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                        lineNumber: 1159,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-[#1f2c34] dark:bg-zinc-800 text-white text-xs font-semibold rounded-lg shadow-lg whitespace-nowrap pointer-events-none opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-150 z-[999]",
                                        children: [
                                            "Send Content",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#1f2c34] dark:border-t-zinc-800"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                                lineNumber: 1177,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                        lineNumber: 1175,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                lineNumber: 1158,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                        lineNumber: 1132,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 bg-white dark:bg-[#2a3942] rounded-lg px-4 py-1.5 flex items-center shadow-sm",
                        children: isThrottled() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            disabled: true,
                            placeholder: `Messaging locked (Next template available in ${timeLeft || "4 hours"})`,
                            className: "flex-1 bg-transparent text-sm text-slate-400 dark:text-zinc-500 outline-none py-1 w-full cursor-not-allowed placeholder:text-orange-500/70 dark:placeholder:text-orange-500/50 font-semibold"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                            lineNumber: 1184,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : !shouldShowTemplates() || selectedTemplate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: inputRef,
                            value: input,
                            onChange: (e)=>setInput(e.target.value),
                            onKeyDown: (e)=>e.key === "Enter" && sendMessage(),
                            placeholder: selectedTemplate ? "Enter Name..." : "Type a message",
                            className: "flex-1 bg-transparent text-sm text-[#111b21] dark:text-[#e9edef] outline-none py-1 w-full"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                            lineNumber: 1190,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            disabled: true,
                            placeholder: "Select a template above to reply",
                            className: "flex-1 bg-transparent text-sm text-slate-400 dark:text-zinc-500 outline-none py-1 w-full cursor-not-allowed"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                            lineNumber: 1199,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                        lineNumber: 1182,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>sendMessage(),
                        disabled: isThrottled() || !((!shouldShowTemplates() || selectedTemplate) && input.trim()),
                        className: "bg-[#00a884] hover:bg-[#008f6f] disabled:opacity-40 disabled:hover:bg-[#00a884] text-white rounded-full h-11 w-11 flex items-center justify-center p-0 transition-transform active:scale-95 shrink-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                            className: "h-5 w-5 ml-0.5"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                            lineNumber: 1212,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                        lineNumber: 1207,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                lineNumber: 1131,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isContentModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white dark:bg-zinc-900 rounded-[32px] border border-slate-100 dark:border-zinc-800/80 w-full max-w-[700px] max-h-[80vh] flex flex-col p-6 shadow-2xl relative mx-4 animate-in zoom-in-95 duration-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800 shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-base font-extrabold text-[#002d62] dark:text-zinc-150",
                                            children: "Select Content to Send"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                            lineNumber: 1223,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-slate-450 dark:text-zinc-500 mt-0.5",
                                            children: [
                                                "Click on a file to immediately send it to ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-bold text-[#00a884]",
                                                    children: contactName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                                    lineNumber: 1227,
                                                    columnNumber: 61
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                            lineNumber: 1226,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                    lineNumber: 1222,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsContentModalOpen(false),
                                    disabled: isSendingContent,
                                    className: "p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                        lineNumber: 1235,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                    lineNumber: 1230,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                            lineNumber: 1221,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto py-4",
                            children: isContentsLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center items-center p-12",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "w-8 h-8 animate-spin text-[#00a884]"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                    lineNumber: 1243,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                lineNumber: 1242,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)) : displayedContent.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-50/50 dark:bg-zinc-950/20 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-8 text-center text-xs font-bold text-slate-400",
                                children: "No project content uploaded yet."
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                lineNumber: 1246,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                children: displayedContent.map((content)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>!isSendingContent && handleSendContentItem(content),
                                        className: `bg-white dark:bg-zinc-900/80 border border-slate-100 dark:border-zinc-800 rounded-2xl p-4 space-y-3 relative flex flex-col justify-between shadow-sm cursor-pointer hover:border-[#00a884] dark:hover:border-[#00a884] transition-all group ${isSendingContent ? "opacity-60 pointer-events-none" : ""}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-extrabold text-xs text-[#002d62] dark:text-zinc-150 truncate group-hover:text-[#00a884] transition-colors",
                                                title: content.title,
                                                children: content.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                                lineNumber: 1257,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 bg-slate-50/50 dark:bg-zinc-950/40 border border-slate-100/70 dark:border-zinc-900 rounded-xl p-2.5",
                                                children: [
                                                    renderFileIcon(content.fileType),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "overflow-hidden flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-bold text-[11px] text-slate-700 dark:text-zinc-300 truncate",
                                                                title: content.fileName,
                                                                children: content.fileName
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                                                lineNumber: 1264,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[9px] text-slate-400 uppercase font-bold tracking-wider mt-0.5",
                                                                children: "Click to send"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                                                lineNumber: 1267,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                                        lineNumber: 1263,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                                lineNumber: 1261,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, content.id, true, {
                                        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                        lineNumber: 1252,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                lineNumber: 1250,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                            lineNumber: 1240,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        isSendingContent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-center gap-2 text-xs font-bold text-[#00a884]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "w-4 h-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                    lineNumber: 1281,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Sending content to WhatsApp..."
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                                    lineNumber: 1282,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                            lineNumber: 1280,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                    lineNumber: 1219,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
                lineNumber: 1218,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/leads/pages/LeadChatPage.tsx",
        lineNumber: 937,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LeadChatPage, "2V+MH1++CDV/B3Ku3PhIOaTHXF8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetLeadByIdQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$api$2f$manageMasterDataSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSendWhatsappMessageMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$api$2f$manageMasterDataSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetProjectWiseTemplatesMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$api$2f$manageMasterDataSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetProjectWiseContentsMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$s3ApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUploadFileMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$s3ApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDownloadUrlMutation"]
    ];
});
_c = LeadChatPage;
var _c;
__turbopack_context__.k.register(_c, "LeadChatPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/store/leadsSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "resetTabFilters",
    ()=>resetTabFilters,
    "setActiveTab",
    ()=>setActiveTab,
    "setSelectedUuids",
    ()=>setSelectedUuids,
    "toggleLeadSelection",
    ()=>toggleLeadSelection,
    "updateTabFilters",
    ()=>updateTabFilters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/utils/localStorage.ts [app-client] (ecmascript)");
;
;
const getInitialProjectIds = ()=>{
    try {
        const currentRole = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('crm_current_role', null);
        if (currentRole?.code === 'ADMIN' || currentRole?.code === 'SADMIN') {
            return [];
        }
        const user = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('crm_user', null);
        if (user && user.project_ids && user.project_ids.length > 0) {
            return [
                String(user.project_ids[0])
            ];
        }
    } catch (e) {
        console.error('Failed to get initial project IDs from storage', e);
    }
    return [];
};
const initialTabState = {
    page: 1,
    limit: 20,
    search: '',
    statusIds: [],
    projectIds: getInitialProjectIds(),
    rmIds: [],
    emIds: [],
    sortField: 'created_on',
    sortOrder: 'desc',
    selectedUuids: []
};
const initialState = {
    activeTab: 0,
    tabFilters: {
        '0': {
            ...initialTabState
        },
        '1': {
            ...initialTabState
        },
        'all': {
            ...initialTabState
        }
    }
};
const leadsSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'leads',
    initialState,
    reducers: {
        setActiveTab: (state, action)=>{
            state.activeTab = action.payload;
        },
        updateTabFilters: (state, action)=>{
            const { tabKey, updates } = action.payload;
            if (state.tabFilters[tabKey]) {
                state.tabFilters[tabKey] = {
                    ...state.tabFilters[tabKey],
                    ...updates
                };
            }
        },
        resetTabFilters: (state, action)=>{
            const tabKey = action.payload;
            state.tabFilters[tabKey] = {
                ...initialTabState
            };
        },
        toggleLeadSelection: (state, action)=>{
            const { tabKey, uuid } = action.payload;
            const filters = state.tabFilters[tabKey];
            if (filters) {
                if (filters.selectedUuids.includes(uuid)) {
                    filters.selectedUuids = filters.selectedUuids.filter((id)=>id !== uuid);
                } else {
                    filters.selectedUuids.push(uuid);
                }
            }
        },
        setSelectedUuids: (state, action)=>{
            const { tabKey, uuids } = action.payload;
            if (state.tabFilters[tabKey]) {
                state.tabFilters[tabKey].selectedUuids = uuids;
            }
        }
    }
});
const { setActiveTab, updateTabFilters, resetTabFilters, toggleLeadSelection, setSelectedUuids } = leadsSlice.actions;
const __TURBOPACK__default__export__ = leadsSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/master-data/api/manageMasterDataSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "manageMasterDataSlice",
    ()=>manageMasterDataSlice,
    "useCreateContentTypeMutation",
    ()=>useCreateContentTypeMutation,
    "useCreateLeadFollowUpTypeMutation",
    ()=>useCreateLeadFollowUpTypeMutation,
    "useCreateLeadStatusMutation",
    ()=>useCreateLeadStatusMutation,
    "useCreateObjectionsMutation",
    ()=>useCreateObjectionsMutation,
    "useCreateProjectContentsMutation",
    ()=>useCreateProjectContentsMutation,
    "useCreateProjectScoringRulesMutation",
    ()=>useCreateProjectScoringRulesMutation,
    "useCreateProjectWiseLeadStatusMutation",
    ()=>useCreateProjectWiseLeadStatusMutation,
    "useCreateTemplateMutation",
    ()=>useCreateTemplateMutation,
    "useDeleteProjectContentsMutation",
    ()=>useDeleteProjectContentsMutation,
    "useDeleteTemplateMutation",
    ()=>useDeleteTemplateMutation,
    "useGetProjectBasedScoringRulesQuery",
    ()=>useGetProjectBasedScoringRulesQuery,
    "useGetProjectWiseContentsMutation",
    ()=>useGetProjectWiseContentsMutation,
    "useGetProjectWiseTemplatesMutation",
    ()=>useGetProjectWiseTemplatesMutation,
    "useSendWhatsappMessageMutation",
    ()=>useSendWhatsappMessageMutation,
    "useUpdateContentTypeMutation",
    ()=>useUpdateContentTypeMutation,
    "useUpdateLeadFollowUpTypeMutation",
    ()=>useUpdateLeadFollowUpTypeMutation,
    "useUpdateLeadStatusMutation",
    ()=>useUpdateLeadStatusMutation,
    "useUpdateObjectionsMutation",
    ()=>useUpdateObjectionsMutation,
    "useUpdateProjectScoringRulesMutation",
    ()=>useUpdateProjectScoringRulesMutation,
    "useUpdateTemplateMutation",
    ()=>useUpdateTemplateMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/baseApi.ts [app-client] (ecmascript)");
;
const manageMasterDataSlice = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
    endpoints: (builder)=>({
            createLeadStatus: builder.mutation({
                query: (body)=>({
                        url: '/master/createLeadStatus',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Master'
                ]
            }),
            createProjectWiseLeadStatus: builder.mutation({
                query: (body)=>({
                        url: '/master/createProjectWiseLeadStatus',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Master'
                ]
            }),
            updateLeadStatus: builder.mutation({
                query: (body)=>({
                        url: '/master/updateLeadStatus',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Master'
                ]
            }),
            createContentType: builder.mutation({
                query: (body)=>({
                        url: '/master/createContentType',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Master'
                ]
            }),
            updateContentType: builder.mutation({
                query: (body)=>({
                        url: '/master/updateContentType',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Master'
                ]
            }),
            createLeadFollowUpType: builder.mutation({
                query: (body)=>({
                        url: '/master/createLeadFollowUpType',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Master'
                ]
            }),
            updateLeadFollowUpType: builder.mutation({
                query: (body)=>({
                        url: '/master/updateLeadFollowUpType',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Master'
                ]
            }),
            createObjections: builder.mutation({
                query: (body)=>({
                        url: '/master/createObjections',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Master'
                ]
            }),
            updateObjections: builder.mutation({
                query: (body)=>({
                        url: '/master/updateObjections',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Master'
                ]
            }),
            getProjectBasedScoringRules: builder.query({
                query: ()=>({
                        url: '/master/getProjectBasedscoringRules',
                        method: 'POST',
                        body: {}
                    }),
                providesTags: [
                    'Master'
                ]
            }),
            createProjectScoringRules: builder.mutation({
                query: (body)=>({
                        url: '/master/createProjectScoringRules',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Master'
                ]
            }),
            updateProjectScoringRules: builder.mutation({
                query: (body)=>({
                        url: '/master/updateProjectScoringRules',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Master'
                ]
            }),
            createProjectContents: builder.mutation({
                query: (body)=>({
                        url: '/master/createProjectContents',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Master'
                ]
            }),
            deleteProjectContents: builder.mutation({
                query: (body)=>({
                        url: '/master/deleteProjectContents',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Master'
                ]
            }),
            getProjectWiseContents: builder.mutation({
                query: (body)=>({
                        url: '/master/getProjectWiseContents',
                        method: 'POST',
                        body
                    })
            }),
            sendWhatsappMessage: builder.mutation({
                query: (body)=>({
                        url: '/master/send_whatsapp_message',
                        method: 'POST',
                        body
                    })
            }),
            getProjectWiseTemplates: builder.mutation({
                query: (body)=>({
                        url: '/templates/getProjectWiseTemplates',
                        method: 'POST',
                        body
                    })
            }),
            createTemplate: builder.mutation({
                query: (body)=>({
                        url: '/templates/createTemplate',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Templates'
                ]
            }),
            updateTemplate: builder.mutation({
                query: (body)=>({
                        url: '/templates/updateTemplate',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Templates'
                ]
            }),
            deleteTemplate: builder.mutation({
                query: (body)=>({
                        url: '/templates/deleteTemplate',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Templates'
                ]
            })
        })
});
const { useCreateLeadStatusMutation, useCreateProjectWiseLeadStatusMutation, useUpdateLeadStatusMutation, useCreateContentTypeMutation, useUpdateContentTypeMutation, useCreateLeadFollowUpTypeMutation, useUpdateLeadFollowUpTypeMutation, useCreateObjectionsMutation, useUpdateObjectionsMutation, useGetProjectBasedScoringRulesQuery, useCreateProjectScoringRulesMutation, useUpdateProjectScoringRulesMutation, useCreateProjectContentsMutation, useDeleteProjectContentsMutation, useGetProjectWiseContentsMutation, useSendWhatsappMessageMutation, useGetProjectWiseTemplatesMutation, useCreateTemplateMutation, useUpdateTemplateMutation, useDeleteTemplateMutation } = manageMasterDataSlice;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/users/api/usersApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCreateUserMutation",
    ()=>useCreateUserMutation,
    "useDeleteUserMutation",
    ()=>useDeleteUserMutation,
    "useGetAllUsersByRoleIdQuery",
    ()=>useGetAllUsersByRoleIdQuery,
    "useGetAllUsersQuery",
    ()=>useGetAllUsersQuery,
    "useGetEmDashboardDateWiseDataQuery",
    ()=>useGetEmDashboardDateWiseDataQuery,
    "useGetEmDashboardTodaysDataQuery",
    ()=>useGetEmDashboardTodaysDataQuery,
    "useGetEscalatedLeadsQuery",
    ()=>useGetEscalatedLeadsQuery,
    "useGetReporteesQuery",
    ()=>useGetReporteesQuery,
    "useGetRmDashboardDateWiseDataQuery",
    ()=>useGetRmDashboardDateWiseDataQuery,
    "useGetStaleLeadsQuery",
    ()=>useGetStaleLeadsQuery,
    "useGetUsersQuery",
    ()=>useGetUsersQuery,
    "useUpdateUserMutation",
    ()=>useUpdateUserMutation,
    "usersApi",
    ()=>usersApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/baseApi.ts [app-client] (ecmascript)");
;
const usersApi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
    endpoints: (builder)=>({
            getAllUsersByRoleId: builder.query({
                query: (body)=>({
                        url: '/users/getAllUsersByRoleId',
                        method: 'POST',
                        body
                    }),
                transformResponse: normalizeUsersResponse,
                providesTags: [
                    'Users'
                ]
            }),
            getUsers: builder.query({
                query: (params)=>({
                        url: '/users/getUsers',
                        method: 'GET',
                        params
                    }),
                providesTags: [
                    'Users'
                ]
            }),
            createUser: builder.mutation({
                query: (body)=>({
                        url: '/users/createUser',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Users'
                ]
            }),
            updateUser: builder.mutation({
                query: (body)=>({
                        url: '/users/updateUser',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Users'
                ]
            }),
            deleteUser: builder.mutation({
                query: (id)=>({
                        url: '/users/deleteUser',
                        method: 'POST',
                        body: {
                            id
                        }
                    }),
                invalidatesTags: [
                    'Users'
                ]
            }),
            getReportees: builder.query({
                query: (body)=>({
                        url: '/users/getReportees',
                        method: 'POST',
                        body
                    }),
                transformResponse: normalizeUsersResponse,
                providesTags: [
                    'Users'
                ]
            }),
            getAllUsers: builder.query({
                query: (body)=>({
                        url: '/users/getAllUsers',
                        method: 'POST',
                        body
                    }),
                transformResponse: normalizeUsersResponse,
                providesTags: [
                    'Users'
                ]
            }),
            getEmDashboardDateWiseData: builder.query({
                query: (body)=>({
                        url: '/dashBoard/getEmDashboardDateWiseData',
                        method: 'POST',
                        body
                    })
            }),
            getEmDashboardTodaysData: builder.query({
                query: (body)=>({
                        url: '/dashBoard/getEmDashboardtodaysData',
                        method: 'POST',
                        body
                    })
            }),
            getRmDashboardDateWiseData: builder.query({
                query: (body)=>({
                        url: '/dashBoard/getRmDashboardDateWiseData',
                        method: 'POST',
                        body
                    })
            }),
            getStaleLeads: builder.query({
                query: (body)=>({
                        url: '/leads/getStaleLeads',
                        method: 'POST',
                        body
                    })
            }),
            getEscalatedLeads: builder.query({
                query: (body)=>({
                        url: '/leads/getEscallatedLeads',
                        method: 'POST',
                        body
                    })
            })
        })
});
function normalizeUsersResponse(response) {
    if (Array.isArray(response)) return response;
    if (!response || typeof response !== 'object') return [];
    const envelope = response;
    if (Array.isArray(envelope.users)) return envelope.users;
    if (Array.isArray(envelope.data)) return envelope.data;
    if (envelope.data && !Array.isArray(envelope.data) && Array.isArray(envelope.data.users)) {
        return envelope.data.users;
    }
    if (Array.isArray(envelope.result)) return envelope.result;
    return [];
}
const { useGetUsersQuery, useGetAllUsersByRoleIdQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation, useGetReporteesQuery, useGetAllUsersQuery, useGetEmDashboardDateWiseDataQuery, useGetEmDashboardTodaysDataQuery, useGetRmDashboardDateWiseDataQuery, useGetStaleLeadsQuery, useGetEscalatedLeadsQuery } = usersApi;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/usePermissions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePermissions",
    ()=>usePermissions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$permissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/permissions.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
const usePermissions = ()=>{
    _s();
    const { currentRole, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "usePermissions.useSelector": (state)=>state.auth
    }["usePermissions.useSelector"]);
    const roleCode = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "usePermissions.useMemo[roleCode]": ()=>currentRole?.code ?? ''
    }["usePermissions.useMemo[roleCode]"], [
        currentRole
    ]);
    const permissions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "usePermissions.useMemo[permissions]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$permissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROLE_PERMISSIONS"][roleCode] ?? []
    }["usePermissions.useMemo[permissions]"], [
        roleCode
    ]);
    const can = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "usePermissions.useCallback[can]": (permission)=>permissions.includes(permission)
    }["usePermissions.useCallback[can]"], [
        permissions
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "usePermissions.useMemo": ()=>({
                can,
                currentRole,
                roleCode,
                permissions,
                user
            })
    }["usePermissions.useMemo"], [
        can,
        currentRole,
        roleCode,
        permissions,
        user
    ]);
};
_s(usePermissions, "fcB8mzexKzouMrkpPTZGy+e0uZI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/api/baseApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "baseApi",
    ()=>baseApi,
    "baseQueryWithReauth",
    ()=>baseQueryWithReauth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/query/rtk-query.modern.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$store$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/store/authSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/utils/localStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$async$2d$mutex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/async-mutex/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.modern.mjs [app-client] (ecmascript) <locals>");
;
;
;
;
// Create a new mutex
const mutex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$async$2d$mutex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mutex"]();
const baseQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchBaseQuery"])({
    baseUrl: ("TURBOPACK compile-time value", "https://upload-uncouple-rephrase.ngrok-free.dev") || 'https://y7lidobvl7.execute-api.ap-south-1.amazonaws.com',
    prepareHeaders: (headers, { getState })=>{
        const stateToken = getState()?.auth?.token;
        const localToken = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('crm_token', null) || localStorage.getItem('token') || localStorage.getItem('crm_token');
        const token = stateToken || localToken;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});
const baseQueryWithReauth = async (args, api, extraOptions)=>{
    // Wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    const url = typeof args === 'string' ? args : args.url;
    const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/refreshToken') || url.includes('/auth/forgotPassword');
    if (result.error && result.error.status === 401 && !isAuthEndpoint) {
        // Checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshToken = api.getState().auth.refreshToken;
                if (refreshToken) {
                    const refreshResult = await baseQuery({
                        url: '/auth/refreshToken',
                        method: 'POST',
                        body: {
                            token: refreshToken
                        }
                    }, api, extraOptions);
                    if (refreshResult.data) {
                        const data = refreshResult.data;
                        // Store the new tokens
                        api.dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$store$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setCredentials"])({
                            user: api.getState().auth.user,
                            token: data.token,
                            refreshToken: data.refreshToken || refreshToken,
                            isFirstLogin: api.getState().auth.isFirstLogin
                        }));
                        // Retry the initial query
                        result = await baseQuery(args, api, extraOptions);
                    } else {
                        api.dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$store$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutUser"])());
                        if (window.location.pathname !== '/login') {
                            window.location.href = '/login';
                        }
                    }
                } else {
                    api.dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$store$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutUser"])());
                    if (window.location.pathname !== '/login') {
                        window.location.href = '/login';
                    }
                }
            } finally{
                release();
            }
        } else {
            // Wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};
;
const baseApi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createApi"])({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        'Users',
        'Leads',
        'Customers',
        'Master',
        'FollowUps',
        'Appointments',
        'Doctors',
        'Templates',
        'Telephony'
    ],
    endpoints: ()=>({})
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/api/s3ApiSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "s3ApiSlice",
    ()=>s3ApiSlice,
    "useCompleteMultipartUploadMutation",
    ()=>useCompleteMultipartUploadMutation,
    "useDownloadUrlMutation",
    ()=>useDownloadUrlMutation,
    "useGenerateUploadUrlMutation",
    ()=>useGenerateUploadUrlMutation,
    "useGetMultipartUrlsMutation",
    ()=>useGetMultipartUrlsMutation,
    "useStartMultipartUploadMutation",
    ()=>useStartMultipartUploadMutation,
    "useUploadFileMutation",
    ()=>useUploadFileMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/baseApi.ts [app-client] (ecmascript)");
;
const s3ApiSlice = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
    endpoints: (builder)=>({
            uploadFile: builder.mutation({
                query: (body)=>({
                        url: '/s3/uploadFile',
                        method: 'POST',
                        body
                    })
            }),
            generateUploadUrl: builder.mutation({
                query: (body)=>({
                        url: '/s3/generateUrl',
                        method: 'POST',
                        body
                    })
            }),
            downloadUrl: builder.mutation({
                query: (body)=>({
                        url: '/s3/downloadUrl',
                        method: 'POST',
                        body
                    })
            }),
            startMultipartUpload: builder.mutation({
                query: (body)=>({
                        url: '/s3/multipart/start',
                        method: 'POST',
                        body
                    })
            }),
            getMultipartUrls: builder.mutation({
                query: (body)=>({
                        url: '/s3/multipart/getUrls',
                        method: 'POST',
                        body
                    })
            }),
            completeMultipartUpload: builder.mutation({
                query: (body)=>({
                        url: '/s3/multipart/complete',
                        method: 'POST',
                        body
                    })
            })
        })
});
const { useUploadFileMutation, useGenerateUploadUrlMutation, useDownloadUrlMutation, useStartMultipartUploadMutation, useGetMultipartUrlsMutation, useCompleteMultipartUploadMutation } = s3ApiSlice;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/utils/localStorage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * A type-safe wrapper for localStorage with JSON parsing/stringifying
 */ __turbopack_context__.s([
    "storage",
    ()=>storage
]);
const storage = {
    /**
   * Get an item from localStorage
   */ get: (key, defaultValue)=>{
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return defaultValue;
        }
    },
    /**
   * Set an item in localStorage
   */ set: (key, value)=>{
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error writing localStorage key "${key}":`, error);
        }
    },
    /**
   * Remove an item from localStorage
   */ remove: (key)=>{
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    },
    /**
   * Clear all items from localStorage
   */ clear: ()=>{
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/utils/multipartUpload.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "uploadLargeFile",
    ()=>uploadLargeFile,
    "uploadLargeFileToS3Only",
    ()=>uploadLargeFileToS3Only
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$s3ApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/s3ApiSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$api$2f$manageMasterDataSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master-data/api/manageMasterDataSlice.ts [app-client] (ecmascript)");
;
;
;
const CHUNK_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_CONCURRENCY = 5;
const MAX_RETRIES = 3;
async function uploadChunkWithRetry(url, chunk, contentType, partNumber) {
    for(let attempt = 1; attempt <= MAX_RETRIES; attempt++){
        try {
            console.log(`[Multipart] Part ${partNumber} (Attempt ${attempt}): Sending PUT request to S3 Presigned URL...`, {
                url: url.split('?')[0] + '?...',
                chunkSize: chunk.size
            });
            // NOTE: We intentionally omit custom headers (like Content-Type) here because 
            // AWS S3 Presigned URLs for UploadPart are typically signed without them.
            // Adding unsigned headers will trigger 403 Forbidden (SignatureDoesNotMatch) / CORS errors.
            const response = await fetch(url, {
                method: 'PUT',
                body: chunk
            });
            console.log(`[Multipart] Part ${partNumber} S3 Response Status: ${response.status} ${response.statusText}`);
            // Log all accessible response headers for CORS debugging
            const headerObj = {};
            response.headers.forEach((val, key)=>{
                headerObj[key] = val;
            });
            console.log(`[Multipart] Part ${partNumber} S3 Response Headers accessible to JS:`, headerObj);
            if (!response.ok) {
                throw new Error(`S3 PUT upload failed with status ${response.status} (${response.statusText}). Check if URL is expired or signature mismatched.`);
            }
            const eTag = response.headers.get("ETag") || response.headers.get("etag");
            if (!eTag) {
                console.error(`[CORS ERROR] S3 returned 200 OK for Part ${partNumber}, but 'ETag' header is NULL in JavaScript!`);
                console.error(`[CORS ERROR] -> This confirms AWS S3 CORS configuration is missing "ExposeHeaders": ["ETag"]. Please add it to your S3 bucket CORS policy!`);
                throw new Error(`ETag header missing from S3 response for part ${partNumber} (CORS ExposeHeaders issue)`);
            }
            // Keep raw ETag as returned by S3 (most Node.js AWS SDKs require quotes intact)
            console.log(`[Multipart] Part ${partNumber} uploaded successfully! Saved raw ETag: ${eTag}`);
            return {
                PartNumber: partNumber,
                ETag: eTag
            };
        } catch (error) {
            console.error(`[Multipart] Attempt ${attempt} failed for part ${partNumber}:`, error);
            if (error?.name === 'TypeError' && error?.message?.includes('fetch')) {
                console.error(`[CORS / NETWORK ERROR] Browser blocked or failed to fetch S3 URL for Part ${partNumber}. Possible causes:`);
                console.error(`1. AWS S3 rejected CORS Preflight (OPTIONS request). Check AllowedMethods and AllowedOrigins in S3 CORS.`);
                console.error(`2. S3 Presigned URL signature is invalid or expired.`);
            }
            if (attempt === MAX_RETRIES) {
                throw error;
            }
            // Exponential backoff
            const delayMs = Math.pow(2, attempt - 1) * 1000;
            console.log(`[Multipart] Waiting ${delayMs}ms before retrying part ${partNumber}...`);
            await new Promise((resolve)=>setTimeout(resolve, delayMs));
        }
    }
    throw new Error(`Part ${partNumber} failed after ${MAX_RETRIES} attempts`);
}
async function uploadLargeFile(file, projectId, contentTypeId, onProgress) {
    console.log(`[Multipart] Starting large file upload for: ${file.name}`);
    // Step 1: Generate S3 key
    const cleanFilename = file.name.trim().replace(/\s+/g, '_');
    const key = `projectwisecontent/${projectId}/${contentTypeId}/${cleanFilename}`;
    const contentType = file.type || "application/octet-stream";
    // Step 2: Start Multipart Upload
    console.log("[Multipart] Calling /s3/multipart/start");
    const startRes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"].dispatch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$s3ApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["s3ApiSlice"].endpoints.startMultipartUpload.initiate({
        filename: key,
        contentType
    })).unwrap();
    const uploadId = startRes.uploadId;
    const finalKey = startRes.key || key;
    // Step 3: Calculate chunks
    const totalParts = Math.ceil(file.size / CHUNK_SIZE);
    console.log(`[Multipart] File size: ${file.size} bytes. Created chunks: ${totalParts}`);
    // Step 4: Get Presigned URLs
    console.log("[Multipart] Calling /s3/multipart/getUrls");
    const urlsRes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"].dispatch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$s3ApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["s3ApiSlice"].endpoints.getMultipartUrls.initiate({
        key: finalKey,
        uploadId,
        parts: totalParts
    })).unwrap();
    if (!urlsRes.presignedUrls || urlsRes.presignedUrls.length !== totalParts) {
        throw new Error("Returned presigned URLs count does not match total parts.");
    }
    // Step 5, 6, 7: Parallel uploads with concurrency limit
    const partsArray = [];
    let completedParts = 0;
    const processPart = async (partIndex)=>{
        const partNumber = partIndex + 1;
        const start = partIndex * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);
        const urlObj = urlsRes.presignedUrls.find((u)=>u.partNumber === partNumber);
        if (!urlObj) {
            throw new Error(`Presigned URL missing for part ${partNumber}`);
        }
        const partResult = await uploadChunkWithRetry(urlObj.url, chunk, contentType, partNumber);
        partsArray.push(partResult);
        completedParts++;
        if (onProgress) {
            const percentage = Math.round(completedParts / totalParts * 100);
            onProgress(percentage);
        }
    };
    const partIndices = Array.from({
        length: totalParts
    }, (_, i)=>i);
    const activeTasks = new Set();
    for (const idx of partIndices){
        const task = processPart(idx);
        activeTasks.add(task);
        task.finally(()=>activeTasks.delete(task));
        if (activeTasks.size >= MAX_CONCURRENCY) {
            await Promise.race(activeTasks);
        }
    }
    // Wait for all remaining active uploads
    await Promise.all(activeTasks);
    // Sort partsArray by PartNumber before calling complete
    partsArray.sort((a, b)=>a.PartNumber - b.PartNumber);
    // Step 8: Complete Multipart Upload
    console.log("[Multipart] Step 4 - Calling /s3/multipart/complete with payload:", {
        key: finalKey,
        uploadId,
        partsCount: partsArray.length,
        partsArray: JSON.parse(JSON.stringify(partsArray))
    });
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"].dispatch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$s3ApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["s3ApiSlice"].endpoints.completeMultipartUpload.initiate({
            key: finalKey,
            uploadId,
            partsArray
        })).unwrap();
        console.log("[Multipart] /s3/multipart/complete succeeded!");
    } catch (completeErr) {
        console.error("[Multipart ERROR] /s3/multipart/complete failed on backend! Error details:", completeErr);
        console.error("[Multipart ERROR] Common backend causes for failure during complete:");
        console.error("1. ETag format mismatch (e.g., backend SDK expected quotes around ETags or expected stripped quotes).");
        console.error("2. One of the uploaded chunk sizes was smaller than 5MB (S3 requires minimum 5MB per chunk except for the final chunk).");
        throw completeErr;
    }
    // Step 9: Create Project Contents
    console.log("[Multipart] Calling /master/createProjectContents");
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"].dispatch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$api$2f$manageMasterDataSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["manageMasterDataSlice"].endpoints.createProjectContents.initiate({
        project_id: projectId,
        content_type_id: contentTypeId,
        s3_key: finalKey
    })).unwrap();
    console.log("[Multipart] Upload and backend mapping completed successfully.");
}
async function uploadLargeFileToS3Only(file, keyPrefix = "whatsapp_attachments", onProgress) {
    console.log(`[Multipart S3 Only] Starting large file upload for: ${file.name}`);
    // Step 1: Generate S3 key
    const cleanFilename = file.name.trim().replace(/\s+/g, '_');
    const timestamp = Date.now();
    const key = `${keyPrefix}/${timestamp}_${cleanFilename}`;
    const contentType = file.type || "application/octet-stream";
    // Step 2: Start Multipart Upload
    console.log("[Multipart S3 Only] Calling /s3/multipart/start");
    const startRes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"].dispatch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$s3ApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["s3ApiSlice"].endpoints.startMultipartUpload.initiate({
        filename: key,
        contentType
    })).unwrap();
    const uploadId = startRes.uploadId;
    const finalKey = startRes.key || key;
    // Step 3: Calculate chunks
    const totalParts = Math.ceil(file.size / CHUNK_SIZE);
    console.log(`[Multipart S3 Only] File size: ${file.size} bytes. Created chunks: ${totalParts}`);
    // Step 4: Get Presigned URLs
    console.log("[Multipart S3 Only] Calling /s3/multipart/getUrls");
    const urlsRes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"].dispatch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$s3ApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["s3ApiSlice"].endpoints.getMultipartUrls.initiate({
        key: finalKey,
        uploadId,
        parts: totalParts
    })).unwrap();
    if (!urlsRes.presignedUrls || urlsRes.presignedUrls.length !== totalParts) {
        throw new Error("Returned presigned URLs count does not match total parts.");
    }
    // Step 5, 6, 7: Parallel uploads with concurrency limit
    const partsArray = [];
    let completedParts = 0;
    const processPart = async (partIndex)=>{
        const partNumber = partIndex + 1;
        const start = partIndex * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);
        const urlObj = urlsRes.presignedUrls.find((u)=>u.partNumber === partNumber);
        if (!urlObj) {
            throw new Error(`Presigned URL missing for part ${partNumber}`);
        }
        const partResult = await uploadChunkWithRetry(urlObj.url, chunk, contentType, partNumber);
        partsArray.push(partResult);
        completedParts++;
        if (onProgress) {
            const percentage = Math.round(completedParts / totalParts * 100);
            onProgress(percentage);
        }
    };
    const partIndices = Array.from({
        length: totalParts
    }, (_, i)=>i);
    const activeTasks = new Set();
    for (const idx of partIndices){
        const task = processPart(idx);
        activeTasks.add(task);
        task.finally(()=>activeTasks.delete(task));
        if (activeTasks.size >= MAX_CONCURRENCY) {
            await Promise.race(activeTasks);
        }
    }
    await Promise.all(activeTasks);
    partsArray.sort((a, b)=>a.PartNumber - b.PartNumber);
    // Step 8: Complete Multipart Upload
    try {
        const completeRes = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"].dispatch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$s3ApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["s3ApiSlice"].endpoints.completeMultipartUpload.initiate({
            key: finalKey,
            uploadId,
            partsArray
        })).unwrap();
        console.log("[Multipart S3 Only] /s3/multipart/complete succeeded!");
        return {
            key: finalKey,
            url: completeRes.url
        };
    } catch (completeErr) {
        console.error("[Multipart S3 Only ERROR] /s3/multipart/complete failed on backend!", completeErr);
        throw completeErr;
    }
}
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

//# sourceMappingURL=src_1kb-6h6._.js.map