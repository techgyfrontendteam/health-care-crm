(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/src/context/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$store$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/store/authSlice.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AuthProvider = ({ children })=>{
    _s();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const { isAuthenticated, isFirstLogin, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "AuthProvider.useSelector": (state)=>state.auth
    }["AuthProvider.useSelector"]);
    const login = (token, refreshToken, isFirstLevel, userData)=>{
        if (userData.agent_id !== undefined && userData.agent_id !== null) {
            try {
                sessionStorage.setItem('agent_id', String(userData.agent_id));
            } catch (e) {
                console.error('Error saving agent_id to sessionStorage:', e);
            }
        }
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$store$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setCredentials"])({
            user: userData,
            token,
            refreshToken,
            isFirstLogin: isFirstLevel
        }));
    };
    const logout = ()=>{
        try {
            sessionStorage.removeItem('agent_id');
        } catch (e) {
            console.error('Error removing agent_id from sessionStorage:', e);
        }
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$store$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutUser"])());
    };
    const completePasswordSetup = ()=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$store$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setPasswordSuccess"])());
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            isAuthenticated,
            isFirstLogin,
            user,
            login,
            logout,
            completePasswordSetup
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/AuthContext.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthProvider, "0wGNpgwF10Fi+0dxZ7cg0K6Eo/w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
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
"[project]/src/features/master/api/masterApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "masterApi",
    ()=>masterApi,
    "useGetAllMasterDataQuery",
    ()=>useGetAllMasterDataQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/baseApi.ts [app-client] (ecmascript)");
;
const masterApi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
    endpoints: (builder)=>({
            getAllMasterData: builder.query({
                query: ()=>({
                        url: '/master/getAllMasterData',
                        method: 'POST'
                    }),
                transformResponse: (response)=>({
                        ...response,
                        projects: response?.projects?.filter((project)=>project.code !== 'PLTGRN') ?? []
                    }),
                providesTags: [
                    'Master'
                ]
            })
        })
});
const { useGetAllMasterDataQuery } = masterApi;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/war-room/api/warRoomApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useGetWarRoomDataQuery",
    ()=>useGetWarRoomDataQuery,
    "warRoomApi",
    ()=>warRoomApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/baseApi.ts [app-client] (ecmascript)");
;
const warRoomApi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
    endpoints: (builder)=>({
            getWarRoomData: builder.query({
                query: (body)=>({
                        url: "/dashBoard/getWarRoomData",
                        method: "POST",
                        body
                    })
            })
        })
});
const { useGetWarRoomDataQuery } = warRoomApi;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/war-room/pages/WarRoomPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WarRoomPage",
    ()=>WarRoomPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$filter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListFilter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list-filter.js [app-client] (ecmascript) <export default as ListFilter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building.js [app-client] (ecmascript) <export default as Building>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/PieChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Pie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$war$2d$room$2f$api$2f$warRoomApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/war-room/api/warRoomApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master/api/masterApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/api/leadsApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/hooks/usePermissions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
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
// Date utility functions
const getDaysInMonth = (year, month)=>{
    const date = new Date(year, month, 1);
    const days = [];
    let firstDayIndex = date.getDay();
    firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Map Sunday to 6, Mon to 0
    const prevMonth = new Date(year, month, 0);
    const prevMonthDaysCount = prevMonth.getDate();
    for(let i = firstDayIndex - 1; i >= 0; i--){
        days.push({
            date: new Date(year, month - 1, prevMonthDaysCount - i),
            isCurrentMonth: false
        });
    }
    const currentMonthDaysCount = new Date(year, month + 1, 0).getDate();
    for(let i = 1; i <= currentMonthDaysCount; i++){
        days.push({
            date: new Date(year, month, i),
            isCurrentMonth: true
        });
    }
    const totalCells = days.length > 35 ? 42 : 35;
    const nextDaysCount = totalCells - days.length;
    for(let i = 1; i <= nextDaysCount; i++){
        days.push({
            date: new Date(year, month + 1, i),
            isCurrentMonth: false
        });
    }
    return days;
};
const isSameDay = (d1, d2)=>{
    if (!d1 || !d2) return false;
    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
};
const isWithinRange = (d, start, end)=>{
    if (!start || !end) return false;
    const time = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const startTime = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
    const endTime = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
    return time >= startTime && time <= endTime;
};
const formatSelectedSpan = (start, end)=>{
    if (!start) return "Select Date";
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    const startMonth = months[start.getMonth()];
    const startDay = start.getDate();
    const startYear = start.getFullYear();
    if (!end) return `${startMonth} ${startDay}, ${startYear}`;
    const endMonth = months[end.getMonth()];
    const endDay = end.getDate();
    const endYear = end.getFullYear();
    return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${endYear}`;
};
const formatApiDate = (d)=>{
    if (!d) return "";
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};
const formatShortDateSpan = (start, end)=>{
    if (!start) return "Select Date";
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    const startMonth = months[start.getMonth()];
    const startDay = start.getDate();
    if (!end) return `${startMonth} ${startDay}`;
    const endMonth = months[end.getMonth()];
    const endDay = end.getDate();
    if (start.getMonth() !== end.getMonth() || start.getFullYear() !== end.getFullYear()) {
        return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
    }
    return `${startMonth} ${startDay} - ${endDay}`;
};
const formatMonthYear = (date)=>{
    return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });
};
const WarRoomPage = ()=>{
    _s();
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"])();
    const { roleCode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const isRmLocked = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WarRoomPage.useMemo[isRmLocked]": ()=>{
            return roleCode === "RELMNG";
        }
    }["WarRoomPage.useMemo[isRmLocked]"], [
        roleCode
    ]);
    const [selectedRmName, setSelectedRmName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All Sales Heads");
    const [isRmDropdownOpen, setIsRmDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [rmSearchQuery, setRmSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedProjectId, setSelectedProjectId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isProjectDropdownOpen, setIsProjectDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSiteVisitsModalOpen, setIsSiteVisitsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isBookingsModalOpen, setIsBookingsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMissedFollowUpsModalOpen, setIsMissedFollowUpsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isVisitLogModalOpen, setIsVisitLogModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Date Filters State
    const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WarRoomPage.useMemo[today]": ()=>new Date()
    }["WarRoomPage.useMemo[today]"], []);
    const last7Days = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WarRoomPage.useMemo[last7Days]": ()=>{
            const d = new Date(today);
            d.setDate(d.getDate() - 6);
            return d;
        }
    }["WarRoomPage.useMemo[last7Days]"], [
        today
    ]);
    const [startDate, setStartDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(today);
    const [endDate, setEndDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(today);
    const [tempStartDate, setTempStartDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(today);
    const [tempEndDate, setTempEndDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(today);
    const [activeMonth, setActiveMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date(today.getFullYear(), today.getMonth(), 1));
    const [quickSelect, setQuickSelect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Today");
    const [appliedQuickSelect, setAppliedQuickSelect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Today");
    const [isDateModalOpen, setIsDateModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const calendarDays = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WarRoomPage.useMemo[calendarDays]": ()=>{
            return getDaysInMonth(activeMonth.getFullYear(), activeMonth.getMonth());
        }
    }["WarRoomPage.useMemo[calendarDays]"], [
        activeMonth
    ]);
    // Fetch RMs mapped to projects
    const { data: projectRmEm = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllProjectEmAndRmDataQuery"])(undefined, {
        skip: isRmLocked
    });
    const rms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WarRoomPage.useMemo[rms]": ()=>{
            const projectEntry = projectRmEm.find({
                "WarRoomPage.useMemo[rms].projectEntry": (p)=>p.project_id === selectedProjectId
            }["WarRoomPage.useMemo[rms].projectEntry"]);
            const rmData = projectEntry?.rm_data || [];
            return rmData.map({
                "WarRoomPage.useMemo[rms]": (rm)=>({
                        ...rm,
                        first_name: rm.rm_first_name,
                        last_name: rm.rm_last_name
                    })
            }["WarRoomPage.useMemo[rms]"]);
        }
    }["WarRoomPage.useMemo[rms]"], [
        projectRmEm,
        selectedProjectId
    ]);
    const { data: masterData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllMasterDataQuery"])();
    const projectOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WarRoomPage.useMemo[projectOptions]": ()=>{
            if (!masterData?.projects) return [
                {
                    id: 1,
                    description: "Planet Green"
                }
            ];
            return masterData.projects;
        }
    }["WarRoomPage.useMemo[projectOptions]"], [
        masterData
    ]);
    const selectedProject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WarRoomPage.useMemo[selectedProject]": ()=>{
            return projectOptions.find({
                "WarRoomPage.useMemo[selectedProject]": (p)=>p.id === selectedProjectId
            }["WarRoomPage.useMemo[selectedProject]"]) || projectOptions[0] || {
                id: 1,
                description: "Planet Green"
            };
        }
    }["WarRoomPage.useMemo[selectedProject]"], [
        projectOptions,
        selectedProjectId
    ]);
    // Default RM selection is "All RM's"
    // (We intentionally do NOT auto-select the first RM based on user feedback)
    // Handle outside click to close dropdown
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WarRoomPage.useEffect": ()=>{
            const handleClose = {
                "WarRoomPage.useEffect.handleClose": ()=>{
                    setIsRmDropdownOpen(false);
                    setIsProjectDropdownOpen(false);
                }
            }["WarRoomPage.useEffect.handleClose"];
            if (isRmDropdownOpen || isProjectDropdownOpen) {
                window.addEventListener("click", handleClose);
            }
            return ({
                "WarRoomPage.useEffect": ()=>window.removeEventListener("click", handleClose)
            })["WarRoomPage.useEffect"];
        }
    }["WarRoomPage.useEffect"], [
        isRmDropdownOpen,
        isProjectDropdownOpen
    ]);
    // Filter RMs list in dropdown by search query
    const filteredRms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WarRoomPage.useMemo[filteredRms]": ()=>{
            const list = rms.map({
                "WarRoomPage.useMemo[filteredRms].list": (r)=>`${r.first_name} ${r.last_name}`.trim()
            }["WarRoomPage.useMemo[filteredRms].list"]);
            const uniqueList = Array.from(new Set(list));
            if (!rmSearchQuery.trim()) return uniqueList;
            return uniqueList.filter({
                "WarRoomPage.useMemo[filteredRms]": (name)=>name.toLowerCase().includes(rmSearchQuery.toLowerCase())
            }["WarRoomPage.useMemo[filteredRms]"]);
        }
    }["WarRoomPage.useMemo[filteredRms]"], [
        rms,
        rmSearchQuery
    ]);
    // Find selected RM object — for locked RM, use the logged-in user directly
    const selectedRm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WarRoomPage.useMemo[selectedRm]": ()=>{
            if (isRmLocked) return {
                id: Number(user?.id)
            };
            return rms.find({
                "WarRoomPage.useMemo[selectedRm]": (r)=>`${r.first_name} ${r.last_name}`.trim() === selectedRmName
            }["WarRoomPage.useMemo[selectedRm]"]);
        }
    }["WarRoomPage.useMemo[selectedRm]"], [
        rms,
        selectedRmName,
        isRmLocked,
        user
    ]);
    // Fetch War Room data dynamically
    const queryParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WarRoomPage.useMemo[queryParams]": ()=>{
            return {
                project_id: selectedProjectId,
                start_date: formatApiDate(startDate),
                end_date: formatApiDate(endDate),
                user_id: selectedRm?.id
            };
        }
    }["WarRoomPage.useMemo[queryParams]"], [
        startDate,
        endDate,
        selectedRm,
        selectedProjectId
    ]);
    const { data: apiResponse, isLoading, isError } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$war$2d$room$2f$api$2f$warRoomApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetWarRoomDataQuery"])(queryParams);
    const responseData = apiResponse ? "data" in apiResponse ? apiResponse.data : apiResponse : undefined;
    // Date Modal Handlers
    const handleQuickSelect = (option)=>{
        setQuickSelect(option);
        if (option === "Today") {
            setTempStartDate(today);
            setTempEndDate(today);
        } else if (option === "Last 7 Days") {
            setTempStartDate(last7Days);
            setTempEndDate(today);
        } else if (option === "This Month") {
            setTempStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
            setTempEndDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
        }
    };
    const handleDayClick = (date)=>{
        const isFuture = new Date(date.getFullYear(), date.getMonth(), date.getDate()) > new Date(today.getFullYear(), today.getMonth(), today.getDate());
        if (isFuture) return;
        setQuickSelect("");
        if (!tempStartDate || tempStartDate && tempEndDate) {
            setTempStartDate(date);
            setTempEndDate(null);
        } else {
            if (date < tempStartDate) {
                setTempStartDate(date);
            } else {
                setTempEndDate(date);
            }
        }
    };
    const prevMonth = ()=>{
        setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() - 1, 1));
    };
    const nextMonth = ()=>{
        setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() + 1, 1));
    };
    const handleApplyDateRange = ()=>{
        if (tempStartDate && tempEndDate) {
            setStartDate(tempStartDate);
            setEndDate(tempEndDate);
        } else if (tempStartDate) {
            setStartDate(tempStartDate);
            setEndDate(tempStartDate);
        }
        setAppliedQuickSelect(quickSelect);
        setIsDateModalOpen(false);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])("Date range filter applied successfully!");
    };
    const handleClearDates = ()=>{
        setTempStartDate(today);
        setTempEndDate(today);
        setQuickSelect("Today");
    };
    // 1. kpis mapping
    const kpis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WarRoomPage.useMemo[kpis]": ()=>{
            return {
                newLeadsToday: typeof responseData?.new_leads_today === 'object' ? responseData.new_leads_today?.count || 0 : responseData?.new_leads_today ?? 0,
                siteVisitsCompleted: typeof responseData?.site_visits_completed === 'object' ? responseData.site_visits_completed?.count || 0 : responseData?.site_visits_completed ?? 0,
                bookingsClosed: typeof responseData?.bookings_closed === 'object' ? responseData.bookings_closed?.count || 0 : responseData?.bookings_closed ?? 0,
                missedFollowUps: typeof responseData?.missed_follow_ups === 'object' ? responseData.missed_follow_ups?.missed_follow_ups_count || responseData.missed_follow_ups?.count || 0 : responseData?.missed_follow_ups ?? 0
            };
        }
    }["WarRoomPage.useMemo[kpis]"], [
        responseData
    ]);
    // 2. leadQuality mapping
    const leadQuality = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WarRoomPage.useMemo[leadQuality]": ()=>{
            const hotItem = responseData?.lead_quality_distribution?.find({
                "WarRoomPage.useMemo[leadQuality]": (item)=>item.name.toLowerCase() === "hot"
            }["WarRoomPage.useMemo[leadQuality]"]);
            const warmItem = responseData?.lead_quality_distribution?.find({
                "WarRoomPage.useMemo[leadQuality]": (item)=>item.name.toLowerCase() === "warm"
            }["WarRoomPage.useMemo[leadQuality]"]);
            const coldItem = responseData?.lead_quality_distribution?.find({
                "WarRoomPage.useMemo[leadQuality]": (item)=>item.name.toLowerCase() === "cold"
            }["WarRoomPage.useMemo[leadQuality]"]);
            const junkItem = responseData?.lead_quality_distribution?.find({
                "WarRoomPage.useMemo[leadQuality]": (item)=>item.name.toLowerCase() === "junk"
            }["WarRoomPage.useMemo[leadQuality]"]);
            const hot = hotItem?.count ?? 0;
            const warm = warmItem?.count ?? 0;
            const cold = coldItem?.count ?? 0;
            const junk = junkItem?.count ?? 0;
            const total = hot + warm + cold + junk;
            const activeRate = total > 0 ? Math.round((hot + warm + cold) / total * 100) : 0;
            return {
                hot,
                warm,
                cold,
                junk,
                activeRate,
                total
            };
        }
    }["WarRoomPage.useMemo[leadQuality]"], [
        responseData
    ]);
    // 3. activeObjections mapping
    const activeObjections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WarRoomPage.useMemo[activeObjections]": ()=>{
            if (!responseData?.active_objections_today) return [];
            const totalObjections = responseData.active_objections_today.reduce({
                "WarRoomPage.useMemo[activeObjections].totalObjections": (sum, item)=>sum + item.count
            }["WarRoomPage.useMemo[activeObjections].totalObjections"], 0);
            return responseData.active_objections_today.map({
                "WarRoomPage.useMemo[activeObjections]": (item)=>({
                        label: item.name,
                        percentage: totalObjections > 0 ? Math.round(item.count / totalObjections * 100) : 0
                    })
            }["WarRoomPage.useMemo[activeObjections]"]);
        }
    }["WarRoomPage.useMemo[activeObjections]"], [
        responseData
    ]);
    // 4. visitLog mapping
    const visitLog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WarRoomPage.useMemo[visitLog]": ()=>{
            if (!responseData?.today_visit_logs) return [];
            return responseData.today_visit_logs.map({
                "WarRoomPage.useMemo[visitLog]": (log)=>{
                    let formattedTime = "12:00 PM";
                    try {
                        if (log.datetime) {
                            const dateObj = new Date(log.datetime);
                            formattedTime = dateObj.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit"
                            });
                        }
                    } catch (e) {}
                    let status = "Follow Up";
                    const statusLower = log.lead_status?.toLowerCase() ?? "";
                    if (statusLower.includes("negotiation")) {
                        status = "Negotiation";
                    } else if (statusLower.includes("booking") || statusLower.includes("close") || statusLower.includes("done")) {
                        status = "Booking Done";
                    }
                    return {
                        time: formattedTime,
                        leadName: `${log.first_name ?? ""} ${log.last_name ?? ""}`.trim() || "Unknown Lead",
                        projectName: log.project_name || "Planet Green",
                        status
                    };
                }
            }["WarRoomPage.useMemo[visitLog]"]);
        }
    }["WarRoomPage.useMemo[visitLog]"], [
        responseData
    ]);
    // 5. siteVisitsCompletedList mapping
    const siteVisitsCompletedList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WarRoomPage.useMemo[siteVisitsCompletedList]": ()=>{
            if (!responseData?.today_visit_logs) return [];
            return responseData.today_visit_logs.filter({
                "WarRoomPage.useMemo[siteVisitsCompletedList]": (log)=>(log.lead_status?.toLowerCase() ?? "").includes("visit") || (log.lead_status?.toLowerCase() ?? "").includes("complete")
            }["WarRoomPage.useMemo[siteVisitsCompletedList]"]).map({
                "WarRoomPage.useMemo[siteVisitsCompletedList]": (log, idx)=>{
                    let formattedTime = "12:00 PM";
                    try {
                        if (log.datetime) {
                            const dateObj = new Date(log.datetime);
                            formattedTime = dateObj.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit"
                            });
                        }
                    } catch (e) {}
                    return {
                        leadName: `${log.first_name ?? ""} ${log.last_name ?? ""}`.trim() || "Unknown Lead",
                        time: formattedTime,
                        leadId: `#LD-984${idx}`,
                        projectName: log.project_name || "Planet Green",
                        emName: log.lead_status || "site Visit completed"
                    };
                }
            }["WarRoomPage.useMemo[siteVisitsCompletedList]"]);
        }
    }["WarRoomPage.useMemo[siteVisitsCompletedList]"], [
        responseData
    ]);
    // 6. bookingsClosedList mapping
    const bookingsClosedList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WarRoomPage.useMemo[bookingsClosedList]": ()=>{
            if (!responseData?.today_visit_logs) return [];
            return responseData.today_visit_logs.filter({
                "WarRoomPage.useMemo[bookingsClosedList]": (log)=>(log.lead_status?.toLowerCase() ?? "").includes("booking") || (log.lead_status?.toLowerCase() ?? "").includes("close") || (log.lead_status?.toLowerCase() ?? "").includes("done")
            }["WarRoomPage.useMemo[bookingsClosedList]"]).map({
                "WarRoomPage.useMemo[bookingsClosedList]": (log, idx)=>{
                    let formattedTime = "12:00 PM";
                    let formattedDate = "Today";
                    try {
                        if (log.datetime) {
                            const dateObj = new Date(log.datetime);
                            formattedTime = dateObj.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit"
                            });
                            formattedDate = dateObj.toLocaleDateString([], {
                                day: "numeric",
                                month: "short"
                            });
                        }
                    } catch (e) {}
                    return {
                        leadName: `${log.first_name ?? ""} ${log.last_name ?? ""}`.trim() || "Unknown Lead",
                        date: formattedDate,
                        time: formattedTime,
                        leadId: `#LD-90${idx}`,
                        rmName: `Sales Head: ${selectedRmName}`
                    };
                }
            }["WarRoomPage.useMemo[bookingsClosedList]"]);
        }
    }["WarRoomPage.useMemo[bookingsClosedList]"], [
        responseData,
        selectedRmName
    ]);
    // 7. missedFollowUpsList mapping
    const missedFollowUpsList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WarRoomPage.useMemo[missedFollowUpsList]": ()=>{
            const missedData = typeof responseData?.missed_follow_ups === 'object' ? responseData.missed_follow_ups?.data : null;
            if (Array.isArray(missedData) && missedData.length > 0) {
                return missedData.map({
                    "WarRoomPage.useMemo[missedFollowUpsList]": (log, idx)=>{
                        let formattedTime = "12:00 PM";
                        let formattedDate = "Today";
                        try {
                            if (log.followup_date_time) {
                                const dateObj = new Date(log.followup_date_time);
                                formattedTime = dateObj.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                });
                                formattedDate = dateObj.toLocaleDateString([], {
                                    day: "numeric",
                                    month: "short"
                                });
                            }
                        } catch (e) {}
                        const assignedName = `${log.assigned_first_name ?? ""} ${log.assigned_last_name ?? ""}`.trim() || selectedRmName;
                        return {
                            leadName: `${log.first_name ?? ""} ${log.last_name ?? ""}`.trim() || "Unknown Lead",
                            date: formattedDate,
                            time: formattedTime,
                            leadId: log.lead_id || `#LD-90${idx}`,
                            assignedTo: `Assigned: ${assignedName}`
                        };
                    }
                }["WarRoomPage.useMemo[missedFollowUpsList]"]);
            }
            if (!responseData?.today_visit_logs) return [];
            return responseData.today_visit_logs.filter({
                "WarRoomPage.useMemo[missedFollowUpsList]": (log)=>(log.lead_status?.toLowerCase() ?? "").includes("miss") || (log.lead_status?.toLowerCase() ?? "").includes("follow")
            }["WarRoomPage.useMemo[missedFollowUpsList]"]).map({
                "WarRoomPage.useMemo[missedFollowUpsList]": (log, idx)=>{
                    let formattedTime = "12:00 PM";
                    let formattedDate = "Today";
                    try {
                        if (log.datetime) {
                            const dateObj = new Date(log.datetime);
                            formattedTime = dateObj.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit"
                            });
                            formattedDate = dateObj.toLocaleDateString([], {
                                day: "numeric",
                                month: "short"
                            });
                        }
                    } catch (e) {}
                    return {
                        leadName: `${log.first_name ?? ""} ${log.last_name ?? ""}`.trim() || "Unknown Lead",
                        date: formattedDate,
                        time: formattedTime,
                        leadId: `#LD-90${idx}`,
                        assignedTo: `Assigned: ${selectedRmName}`
                    };
                }
            }["WarRoomPage.useMemo[missedFollowUpsList]"]);
        }
    }["WarRoomPage.useMemo[missedFollowUpsList]"], [
        responseData,
        selectedRmName
    ]);
    // 8. metrics mapping
    const metrics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WarRoomPage.useMemo[metrics]": ()=>{
            return {
                callsMade: responseData?.no_of_calls_made ?? 0,
                callsCompleted: responseData?.no_of_calls_completed ?? 0,
                followUps: responseData?.no_of_follow_ups ?? 0
            };
        }
    }["WarRoomPage.useMemo[metrics]"], [
        responseData
    ]);
    const hasLeadQualityData = leadQuality.hot > 0 || leadQuality.warm > 0 || leadQuality.cold > 0 || leadQuality.junk > 0;
    const donutChartData = hasLeadQualityData ? [
        {
            name: "Hot",
            value: leadQuality.hot,
            color: "#ef4444"
        },
        {
            name: "Warm",
            value: leadQuality.warm,
            color: "#f97316"
        },
        {
            name: "Cold",
            value: leadQuality.cold,
            color: "#3b82f6"
        },
        {
            name: "Junk",
            value: leadQuality.junk,
            color: "#94a3b8"
        }
    ].filter((item)=>item.value > 0) : [
        {
            name: "Placeholder",
            value: 100,
            color: "#e2e8f0"
        }
    ];
    const getInitials = (name)=>{
        if (!name) return "??";
        return name.split(" ").map((n)=>n[0]).join("").slice(0, 2).toUpperCase();
    };
    const getAvatarColorClass = (name)=>{
        const hash = name.split("").reduce((acc, char)=>acc + char.charCodeAt(0), 0);
        const colors = [
            "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
            "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300",
            "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
            "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
            "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
            "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300"
        ];
        return colors[hash % colors.length];
    };
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full min-h-[600px] flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-10 h-10 border-4 border-[#002d62] border-t-transparent rounded-full animate-spin"
            }, void 0, false, {
                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                lineNumber: 535,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
            lineNumber: 534,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (isError) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full min-h-[600px] flex flex-col items-center justify-center gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                    className: "w-10 h-10 text-red-500"
                }, void 0, false, {
                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                    lineNumber: 543,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-slate-500 font-bold text-sm",
                    children: "Failed to load war room metrics."
                }, void 0, false, {
                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                    lineNumber: 544,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
            lineNumber: 542,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-[1440px] xl:max-w-[1920px] mx-auto px-6 py-8 space-y-6 animate-in fade-in duration-300 relative text-slate-800",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border border-slate-100 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-0.5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "font-['Plus_Jakarta_Sans'] text-[24px] font-bold leading-[28px] tracking-[-0.5px] text-[#063669] flex items-center h-[28px]",
                            children: "Management War Room"
                        }, void 0, false, {
                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                            lineNumber: 555,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                        lineNumber: 554,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-3",
                        children: [
                            !isRmLocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                onClick: (e)=>e.stopPropagation(),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsRmDropdownOpen(!isRmDropdownOpen),
                                        className: "flex items-center gap-2.5 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-slate-200/50 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-sm cursor-pointer min-w-[155px] min-h-[42px] justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2.5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "truncate max-w-[120px]",
                                                    children: selectedRmName === "All Sales Heads" ? "Select Sales Head" : selectedRmName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 573,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 572,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "w-3.5 h-3.5 text-slate-500 ml-1.5 shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 577,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 568,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    isRmDropdownOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-0 mt-2 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl py-3 z-40 animate-in fade-in slide-in-from-top-2 duration-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-3 pb-2.5 border-b border-slate-100 flex items-center gap-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                        className: "w-3.5 h-3.5 text-slate-400 shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 583,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        placeholder: "Search Sales Head...",
                                                        value: rmSearchQuery,
                                                        onChange: (e)=>setRmSearchQuery(e.target.value),
                                                        className: "w-full bg-transparent text-xs font-semibold text-slate-700 outline-none placeholder:text-slate-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 584,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 582,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-2 pt-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setSelectedRmName("All Sales Heads");
                                                        setIsRmDropdownOpen(false);
                                                    },
                                                    className: "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs font-bold hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "All Sales Heads"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 601,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        selectedRmName === "All Sales Heads" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-4 h-4 rounded-md bg-[#002d62] text-white flex items-center justify-center shrink-0",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-3 h-3 stroke-[3]",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                viewBox: "0 0 24 24",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    d: "M5 13l4 4L19 7"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                    lineNumber: 604,
                                                                    columnNumber: 117
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                lineNumber: 604,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 603,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 594,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 593,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-5 py-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[9px] font-black text-slate-400 uppercase tracking-wider block",
                                                    children: "SELECT SALES HEAD"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 611,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 610,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "max-h-56 overflow-y-auto px-2 space-y-0.5 scrollbar-thin",
                                                children: filteredRms.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "px-3.5 py-2.5 text-xs text-slate-400 font-medium",
                                                    children: "No managers found"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 618,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)) : filteredRms.map((name)=>{
                                                    const isSelected = selectedRmName === name;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setSelectedRmName(name);
                                                            setIsRmDropdownOpen(false);
                                                            setRmSearchQuery("");
                                                        },
                                                        className: "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs hover:bg-slate-50 transition-colors cursor-pointer",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: `w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold uppercase shrink-0 shadow-xs ${getAvatarColorClass(name)}`,
                                                                        children: getInitials(name)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                        lineNumber: 635,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-bold text-slate-700 truncate max-w-[130px]",
                                                                        children: name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                        lineNumber: 642,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                lineNumber: 634,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-4 h-4 rounded-md bg-[#002d62] text-white flex items-center justify-center shrink-0",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "w-3 h-3 stroke-[3]",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    viewBox: "0 0 24 24",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        d: "M5 13l4 4L19 7"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                        lineNumber: 648,
                                                                        columnNumber: 123
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                    lineNumber: 648,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                lineNumber: 647,
                                                                columnNumber: 31
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, name, true, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 625,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0));
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 616,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 581,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 567,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                onClick: (e)=>e.stopPropagation(),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsProjectDropdownOpen(!isProjectDropdownOpen),
                                        className: "flex items-center gap-2.5 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-slate-200/50 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-sm cursor-pointer min-w-[155px] min-h-[42px] justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$filter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListFilter$3e$__["ListFilter"], {
                                                        className: "w-3.5 h-3.5 text-slate-400 shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 668,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "truncate max-w-[120px]",
                                                        children: selectedProject?.description || "Select Project"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 669,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 667,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                className: "w-3.5 h-3.5 text-slate-500 ml-1.5 shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 673,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 663,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    isProjectDropdownOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-40 animate-in fade-in slide-in-from-top-2 duration-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-5 py-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[9px] font-black text-slate-400 uppercase tracking-wider block",
                                                    children: "SELECT PROJECT"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 679,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 678,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "max-h-56 overflow-y-auto px-2 space-y-0.5 scrollbar-thin",
                                                children: projectOptions.map((proj)=>{
                                                    const isSelected = selectedProjectId === proj.id;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setSelectedProjectId(proj.id);
                                                            setSelectedRmName("All Sales Heads"); // Reset RM selection when project changes
                                                            setIsProjectDropdownOpen(false);
                                                        },
                                                        className: "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-700 truncate max-w-[140px]",
                                                                children: proj.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                lineNumber: 696,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-4 h-4 rounded-md bg-[#002d62] text-white flex items-center justify-center shrink-0",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "w-3 h-3 stroke-[3]",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    viewBox: "0 0 24 24",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        d: "M5 13l4 4L19 7"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                        lineNumber: 701,
                                                                        columnNumber: 119
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                    lineNumber: 701,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                lineNumber: 700,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, proj.id, true, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 687,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0));
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 683,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 677,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 662,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setTempStartDate(startDate);
                                    setTempEndDate(endDate);
                                    setQuickSelect(appliedQuickSelect);
                                    setIsDateModalOpen(true);
                                },
                                className: "flex items-center gap-2.5 bg-[#f8fafc] hover:bg-[#f1f5f9] border border-slate-200/50 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-sm cursor-pointer min-w-[140px] min-h-[42px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                        className: "w-3.5 h-3.5 text-slate-400 shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 722,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: appliedQuickSelect ? appliedQuickSelect : formatShortDateSpan(startDate, endDate)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 723,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 713,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                        lineNumber: 564,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                lineNumber: 553,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white dark:bg-zinc-900 rounded-[24px] pt-[24px] px-[24px] pb-[26px] gap-[4px] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between h-[164px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-[40px] h-[34px] rounded-[12px] bg-[rgba(0,35,111,0.05)] dark:bg-zinc-800 flex items-center justify-center shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/icons/profile.png",
                                        className: "w-[24px] h-[16px] object-contain",
                                        style: {
                                            filter: 'brightness(0) saturate(100%) invert(11%) sepia(87%) saturate(3015%) hue-rotate(216deg) brightness(97%) contrast(106%)'
                                        },
                                        alt: "Profile"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 734,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                    lineNumber: 733,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 732,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col mt-auto pt-[12px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-['Plus_Jakarta_Sans'] font-bold text-[12px] leading-[16px] tracking-[1.2px] uppercase text-[#191C1E] dark:text-zinc-300 block mb-1",
                                        children: "NEW LEADS TODAY"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 738,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-['Plus_Jakarta_Sans'] font-bold text-[36px] leading-[36px] tracking-[-0.72px] text-[#00236F] dark:text-blue-400",
                                        children: kpis.newLeadsToday
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 741,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 737,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                        lineNumber: 731,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsSiteVisitsModalOpen(true),
                        className: "bg-white dark:bg-zinc-900 hover:bg-slate-50/50 dark:hover:bg-zinc-800/50 rounded-[24px] pt-[24px] px-[24px] pb-[26px] gap-[4px] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between h-[164px] text-left w-full transition-all group cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-[40px] h-[34px] rounded-[12px] bg-[rgba(0,35,111,0.05)] dark:bg-zinc-800 flex items-center justify-center shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/icons/location.png",
                                            className: "w-[24px] h-[24px] object-contain",
                                            alt: "Location"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 754,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 753,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        className: "w-5 h-5 text-slate-400 group-hover:translate-x-0.5 transition-transform"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 756,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 752,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col mt-auto pt-[12px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-['Plus_Jakarta_Sans'] font-bold text-[12px] leading-[16px] tracking-[1.2px] uppercase text-[#191C1E] dark:text-zinc-300 block mb-1",
                                        children: "SITE VISITS COMPLETED"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 759,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-['Plus_Jakarta_Sans'] font-bold text-[36px] leading-[36px] tracking-[-0.72px] text-[#00236F] dark:text-blue-400",
                                        children: kpis.siteVisitsCompleted
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 762,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 758,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                        lineNumber: 748,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsBookingsModalOpen(true),
                        className: "bg-white dark:bg-zinc-900 hover:bg-slate-50/50 dark:hover:bg-zinc-800/50 rounded-[24px] pt-[24px] px-[24px] pb-[26px] gap-[4px] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between h-[164px] text-left w-full transition-all group cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-[40px] h-[34px] rounded-[12px] bg-[rgba(0,35,111,0.05)] dark:bg-zinc-800 flex items-center justify-center shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "/icons/bookings.png",
                                            className: "w-[24px] h-[24px] object-contain",
                                            alt: "Bookings"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 775,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 774,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        className: "w-5 h-5 text-slate-400 group-hover:translate-x-0.5 transition-transform"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 777,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 773,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col mt-auto pt-[12px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-['Plus_Jakarta_Sans'] font-bold text-[12px] leading-[16px] tracking-[1.2px] uppercase text-[#191C1E] dark:text-zinc-300 block mb-1",
                                        children: "BOOKINGS CLOSED"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 780,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-['Plus_Jakarta_Sans'] font-bold text-[36px] leading-[36px] tracking-[-0.72px] text-[#00236F] dark:text-blue-400",
                                        children: kpis.bookingsClosed
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 783,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 779,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                        lineNumber: 769,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsMissedFollowUpsModalOpen(true),
                        className: "bg-[#fef2f2] dark:bg-red-950/20 hover:bg-[#fee2e2]/60 dark:hover:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-[24px] pt-[24px] px-[24px] pb-[26px] gap-[4px] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between h-[164px] text-left w-full transition-all group cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-[40px] h-[34px] rounded-[12px] bg-[#fee2e2] dark:bg-red-950/50 flex items-center justify-center text-[#991b1b] dark:text-red-400 shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                            className: "w-[20px] h-[20px]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 796,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 795,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        className: "w-5 h-5 text-[#f87171] group-hover:translate-x-0.5 transition-transform"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 798,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 794,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col mt-auto pt-[12px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-['Plus_Jakarta_Sans'] font-bold text-[12px] leading-[16px] tracking-[1.2px] uppercase text-[#b91c1c] dark:text-red-400 block mb-1",
                                        children: "MISSED FOLLOW-UPS"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 801,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-['Plus_Jakarta_Sans'] font-bold text-[36px] leading-[36px] tracking-[-0.72px] text-[#991b1b] dark:text-red-300",
                                        children: kpis.missedFollowUps
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 804,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 800,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                        lineNumber: 790,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                lineNumber: 729,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 lg:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white dark:bg-zinc-900 border border-[#F3F4F6] dark:border-zinc-800 rounded-[24px] p-[25px] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between h-[345px] w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-['Plus_Jakarta_Sans'] font-bold text-[18px] leading-[28px] text-[#191C1E] dark:text-zinc-100 flex items-center h-[28px] pb-[16px]",
                                children: "Lead Quality Distribution"
                            }, void 0, false, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 815,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col items-center justify-center my-auto w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative w-[153.6px] h-[153.6px] flex items-center justify-center shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                                width: "100%",
                                                height: "100%",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pie"], {
                                                        data: donutChartData,
                                                        cx: "50%",
                                                        cy: "50%",
                                                        innerRadius: "72%",
                                                        outerRadius: "90%",
                                                        paddingAngle: 0,
                                                        dataKey: "value",
                                                        startAngle: 90,
                                                        endAngle: -270,
                                                        children: donutChartData.map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                                                fill: entry.color,
                                                                stroke: "none"
                                                            }, `cell-${index}`, false, {
                                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                lineNumber: 836,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 824,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 823,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 822,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-['Plus_Jakarta_Sans'] font-black text-[24px] leading-[29px] text-[#191C1E] dark:text-zinc-100",
                                                        children: leadQuality.total
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 843,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-['Inter'] font-bold text-[8px] leading-[12px] text-[#757682] dark:text-zinc-400 uppercase tracking-widest mt-0.5",
                                                        children: "ACTIVE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 846,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 842,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 821,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-x-[36px] gap-y-[8px] w-full mt-4 px-[16px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between text-xs font-bold",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-[8px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-[8px] h-[8px] rounded-full shrink-0 bg-[#EF4444]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                lineNumber: 857,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-['Inter'] font-medium text-[14px] leading-[20px] text-[#444651] dark:text-zinc-300",
                                                                children: "Hot"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                lineNumber: 858,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 856,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-['Inter'] font-bold text-[14px] leading-[20px] text-[#191C1E] dark:text-zinc-150",
                                                        children: leadQuality.hot
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 860,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 855,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between text-xs font-bold",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-[8px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-[8px] h-[8px] rounded-full shrink-0 bg-[#FB923C]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                lineNumber: 866,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-['Inter'] font-medium text-[14px] leading-[20px] text-[#444651] dark:text-zinc-300",
                                                                children: "Warm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                lineNumber: 867,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 865,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-['Inter'] font-bold text-[14px] leading-[20px] text-[#191C1E] dark:text-zinc-150",
                                                        children: leadQuality.warm
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 869,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 864,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between text-xs font-bold",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-[8px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-[8px] h-[8px] rounded-full shrink-0 bg-[#3B82F6]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                lineNumber: 875,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-['Inter'] font-medium text-[14px] leading-[20px] text-[#444651] dark:text-zinc-300",
                                                                children: "Cold"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                lineNumber: 876,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 874,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-['Inter'] font-bold text-[14px] leading-[20px] text-[#191C1E] dark:text-zinc-150",
                                                        children: leadQuality.cold
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 878,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 873,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between text-xs font-bold",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-[8px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-[8px] h-[8px] rounded-full shrink-0 bg-[#9CA3AF]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                lineNumber: 884,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-['Inter'] font-medium text-[14px] leading-[20px] text-[#444651] dark:text-zinc-300",
                                                                children: "Junk"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                lineNumber: 885,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 883,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-['Inter'] font-bold text-[14px] leading-[20px] text-[#191C1E] dark:text-zinc-150",
                                                        children: leadQuality.junk
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 887,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 882,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 853,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 819,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                        lineNumber: 814,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white dark:bg-zinc-900 border border-[#F3F4F6] dark:border-zinc-800 rounded-[24px] p-[25px] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between h-[345px] w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-['Plus_Jakarta_Sans'] font-bold text-[18px] leading-[28px] text-[#191C1E] dark:text-zinc-100 flex items-center h-[28px] pb-[16px]",
                                children: "Active Objections Today"
                            }, void 0, false, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 895,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "my-auto flex flex-col gap-[12px] justify-center",
                                children: activeObjections.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-12 text-xs font-semibold text-slate-400",
                                    children: "There is no data available"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                    lineNumber: 901,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)) : activeObjections.map((objection)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] text-[#001549] dark:text-blue-400",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "truncate pr-2",
                                                        children: objection.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 908,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "shrink-0",
                                                        children: [
                                                            objection.percentage,
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 909,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 907,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-[8px] w-full bg-[#E1E5ED] dark:bg-zinc-800 rounded-full overflow-hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-full bg-[#001549] dark:bg-blue-500 rounded-full transition-all duration-500",
                                                    style: {
                                                        width: `${Math.min(Math.max(objection.percentage, 0), 100)}%`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 912,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 911,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, objection.label, true, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 906,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 899,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                        lineNumber: 894,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                lineNumber: 812,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 lg:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white dark:bg-zinc-900 rounded-[24px] pt-[24px] px-[24px] pb-[97px] gap-[24px] shadow-[0px_4px_24px_rgba(0,0,0,0.04)] flex flex-col lg:col-span-2 h-[450px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-['Plus_Jakarta_Sans'] font-semibold text-[18px] leading-[24px] text-[#00236F] dark:text-blue-400 flex items-center h-[24px]",
                                        children: "Today's Visit Log"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 929,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    visitLog.length > 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsVisitLogModalOpen(true),
                                        className: "font-['Inter'] font-bold text-[14px] leading-[20px] text-[#00236F] dark:text-blue-400 hover:underline cursor-pointer flex items-center h-[20px]",
                                        children: [
                                            "View All (",
                                            visitLog.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 933,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 928,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-[16px] overflow-y-auto h-[350px]",
                                children: visitLog.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center py-12 text-xs font-semibold text-slate-400",
                                    children: "There is no data available"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                    lineNumber: 944,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)) : visitLog.slice(0, 4).map((visit, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-[#F8F9FB] dark:bg-zinc-950/40 rounded-[24px] p-[16px] gap-[16px] h-[75.5px] flex items-center justify-between shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-[16px] min-w-0 flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-[70px] min-w-[70px] flex justify-center items-center",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] text-[#00236F] dark:text-blue-400 text-center",
                                                            children: visit.time
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 955,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 954,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-[2px] h-[40px] bg-[#002d62]/10 dark:bg-zinc-800 shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 959,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "min-w-0 flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "font-['Plus_Jakarta_Sans'] font-bold text-[16px] leading-[24px] text-[#191C1E] dark:text-zinc-150 truncate",
                                                                children: visit.leadName
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                lineNumber: 961,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "flex items-center gap-[4px] mt-[2px] text-[14px] font-normal font-['Inter'] text-[#575E70] dark:text-zinc-400",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"], {
                                                                        className: "w-[12px] h-[12px] shrink-0 text-[#575E70] dark:text-zinc-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                        lineNumber: 965,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    visit.projectName
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                lineNumber: 964,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 960,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 953,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `flex items-center justify-center px-[12px] py-[4px] h-[26px] rounded-full text-[12px] font-bold font-['Inter'] shrink-0 ${visit.status === "Negotiation" ? "bg-[rgba(0,35,111,0.05)] text-[#00236F] dark:bg-blue-950/30 dark:text-blue-300" : visit.status === "Booking Done" ? "bg-[#00236F] text-white dark:bg-blue-600 dark:text-white" : "bg-[#E1E2E4] text-[#191C1E] dark:bg-zinc-800 dark:text-zinc-300"}`,
                                                    children: visit.status
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 972,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 971,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 949,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 942,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                        lineNumber: 927,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-4 lg:col-span-1 justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white border border-slate-100 rounded-[24px] pt-[38px] pb-[32px] px-[32px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col gap-2 justify-center h-[140px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block text-[10px] font-bold text-slate-500 tracking-widest uppercase",
                                        children: "NO. OF CALLS MADE"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 993,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[32px] leading-none font-black text-[#002d62]",
                                        children: metrics.callsMade
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 996,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 992,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white border border-slate-100 rounded-[24px] pt-[38px] pb-[32px] px-[32px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col gap-2 justify-center h-[140px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block text-[10px] font-bold text-slate-500 tracking-widest uppercase",
                                        children: "NO. OF CALLS COMPLETED"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 1003,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[32px] leading-none font-black text-[#002d62]",
                                        children: metrics.callsCompleted
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 1006,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 1002,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white border border-slate-100 rounded-[24px] pt-[38px] pb-[32px] px-[32px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col gap-2 justify-center h-[140px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block text-[10px] font-bold text-slate-500 tracking-widest uppercase",
                                        children: "NO. OF FOLLOWUPS"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 1013,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[32px] leading-none font-black text-[#002d62]",
                                        children: metrics.followUps
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 1016,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 1012,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                        lineNumber: 990,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                lineNumber: 925,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isSiteVisitsModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border border-slate-150 rounded-[32px] shadow-2xl w-full max-w-lg p-6 space-y-6 relative animate-in zoom-in-95 duration-200",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-bold text-slate-850",
                                                    children: "Site Visits Completed"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 1034,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "bg-blue-50 text-[#002d62] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-1.5 h-1.5 rounded-full bg-[#002d62]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 1038,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        siteVisitsCompletedList.length.toString().padStart(2, "0"),
                                                        " Completed"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 1037,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 1033,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-slate-400 font-semibold",
                                            children: [
                                                siteVisitsCompletedList.length,
                                                " completions tracked"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 1042,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                    lineNumber: 1032,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsSiteVisitsModalOpen(false),
                                    className: "w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center cursor-pointer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 1050,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                    lineNumber: 1046,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                            lineNumber: 1031,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-h-[350px] overflow-y-auto space-y-3 pr-1",
                            children: siteVisitsCompletedList.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-12 text-xs font-semibold text-slate-400",
                                children: "There is no data available"
                            }, void 0, false, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 1057,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)) : siteVisitsCompletedList.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#f8fafc] border border-slate-100 rounded-2xl p-4 flex items-center justify-between gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `w-9 h-9 rounded-full flex items-center justify-center text-xs font-black uppercase shrink-0 ${getAvatarColorClass(item.leadName)}`,
                                                    children: getInitials(item.leadName)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 1067,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-xs font-bold text-slate-800 truncate",
                                                            children: item.leadName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 1075,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[9px] text-slate-400 font-bold flex items-center gap-1.5 mt-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: item.leadId
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                    lineNumber: 1079,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "•"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                    lineNumber: 1080,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: item.projectName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                    lineNumber: 1081,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "•"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                    lineNumber: 1082,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[#002d62]",
                                                                    children: item.emName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                    lineNumber: 1083,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 1078,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 1074,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 1066,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-right shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] font-bold text-[#002d62]",
                                                children: item.time
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 1089,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 1088,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                    lineNumber: 1062,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                            lineNumber: 1055,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setIsSiteVisitsModalOpen(false),
                            className: "w-full bg-[#002d62] hover:bg-[#081a3e] text-white py-3 rounded-2xl text-xs font-bold shadow-md shadow-[#002d62]/20 transition-all cursor-pointer text-center",
                            children: "View All Activity"
                        }, void 0, false, {
                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                            lineNumber: 1099,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                    lineNumber: 1026,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                lineNumber: 1025,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            isBookingsModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border border-slate-150 rounded-[32px] shadow-2xl w-full max-w-lg p-6 space-y-6 relative animate-in zoom-in-95 duration-200",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-bold text-slate-850",
                                                children: "Bookings Completed"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 1120,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-rose-50 text-rose-500 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-1.5 h-1.5 rounded-full bg-rose-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 1124,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    bookingsClosedList.length.toString().padStart(2, "0"),
                                                    " Bookings"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 1123,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 1119,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                    lineNumber: 1118,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsBookingsModalOpen(false),
                                    className: "w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center cursor-pointer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 1133,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                    lineNumber: 1129,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                            lineNumber: 1117,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-h-[350px] overflow-y-auto space-y-3 pr-1",
                            children: bookingsClosedList.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-12 text-xs font-semibold text-slate-400",
                                children: "There is no data available"
                            }, void 0, false, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 1140,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)) : bookingsClosedList.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#f8fafc] border border-slate-100 rounded-2xl p-4 flex items-center justify-between gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `w-9 h-9 rounded-full flex items-center justify-center text-xs font-black uppercase shrink-0 ${getAvatarColorClass(item.leadName)}`,
                                                    children: getInitials(item.leadName)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 1150,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-xs font-bold text-slate-850 truncate",
                                                            children: item.leadName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 1158,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[10px] text-slate-400 font-bold flex items-center gap-2 mt-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: item.date
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                    lineNumber: 1162,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "•"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                    lineNumber: 1163,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: item.time
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                    lineNumber: 1164,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 1161,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[10px] text-[#002d62] font-semibold mt-0.5",
                                                            children: item.rmName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 1166,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 1157,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 1149,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-right shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-bold text-slate-400",
                                                children: item.leadId
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 1173,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 1172,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                    lineNumber: 1145,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                            lineNumber: 1138,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                    lineNumber: 1112,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                lineNumber: 1111,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            isMissedFollowUpsModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border border-slate-150 rounded-[32px] shadow-2xl w-full max-w-lg p-6 space-y-6 relative animate-in zoom-in-95 duration-200",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-bold text-slate-850",
                                                children: "Missed Follow-ups"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 1196,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "bg-rose-50 text-rose-500 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-1.5 h-1.5 rounded-full bg-rose-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                        lineNumber: 1200,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    missedFollowUpsList.length.toString().padStart(2, "0"),
                                                    " Overdue"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 1199,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 1195,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                    lineNumber: 1194,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsMissedFollowUpsModalOpen(false),
                                    className: "w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center cursor-pointer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 1209,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                    lineNumber: 1205,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                            lineNumber: 1193,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-h-[350px] overflow-y-auto space-y-3 pr-1",
                            children: missedFollowUpsList.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-12 text-xs font-semibold text-slate-400",
                                children: "There is no data available"
                            }, void 0, false, {
                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                lineNumber: 1216,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)) : missedFollowUpsList.slice(0, 10).map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#f8fafc] dark:bg-zinc-850/50 border border-slate-100 dark:border-zinc-800 rounded-2xl p-4 flex items-center justify-between gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-black uppercase shrink-0 ${getAvatarColorClass(item.leadName)}`,
                                                    children: getInitials(item.leadName)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 1226,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "min-w-0 space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-[13px] font-extrabold text-slate-800 dark:text-zinc-100 truncate tracking-tight",
                                                            children: item.leadName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 1234,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[10px] text-slate-500 dark:text-zinc-400 font-bold flex items-center gap-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                    className: "w-3 h-3 opacity-70"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                    lineNumber: 1238,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        item.date,
                                                                        " • ",
                                                                        item.time
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                    lineNumber: 1239,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 1237,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[10px] text-slate-600 dark:text-zinc-400 font-semibold flex items-center gap-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                    className: "w-3 h-3 opacity-70"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                    lineNumber: 1242,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: item.assignedTo
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                    lineNumber: 1243,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 1241,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 1233,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 1225,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-right shrink-0 self-start mt-1",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-bold text-slate-400 dark:text-zinc-500",
                                                children: item.leadId
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 1249,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 1248,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, idx, true, {
                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                    lineNumber: 1221,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                            lineNumber: 1214,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                    lineNumber: 1188,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                lineNumber: 1187,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            isVisitLogModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border border-slate-150 rounded-[32px] shadow-2xl w-full max-w-lg p-6 space-y-6 relative animate-in zoom-in-95 duration-200",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-bold text-slate-850",
                                                    children: "Today's Visit Log"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 1271,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "bg-blue-50 text-[#002d62] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-1.5 h-1.5 rounded-full bg-[#002d62]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 1275,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        visitLog.length.toString().padStart(2, "0"),
                                                        " Total"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 1274,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 1270,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-slate-400 font-semibold",
                                            children: "All scheduled visits for today"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 1279,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                    lineNumber: 1269,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsVisitLogModalOpen(false),
                                    className: "w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center cursor-pointer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 1287,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                    lineNumber: 1283,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                            lineNumber: 1268,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-h-[400px] overflow-y-auto space-y-3 pr-1",
                            children: visitLog.map((visit, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#eef2f6] rounded-2xl p-4 flex items-center justify-between gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-bold text-[#002d62] shrink-0 w-20 text-left",
                                                    children: visit.time
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 1299,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "text-xs font-bold text-slate-800 truncate",
                                                            children: visit.leadName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 1303,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] text-slate-500 font-semibold flex items-center gap-1.5 mt-0.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: "/icons/building.png",
                                                                    className: "w-3.5 h-3.5 object-contain shrink-0",
                                                                    alt: "Project"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                    lineNumber: 1307,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                visit.projectName
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 1306,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 1302,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 1298,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `text-[9px] font-black uppercase tracking-wider inline-flex items-center justify-center rounded-full ${visit.status === "Negotiation" ? "bg-blue-100 text-blue-800 px-3 h-[26px]" : visit.status === "Booking Done" ? "bg-[#002d62] text-white px-3 h-[26px]" : "bg-slate-200 text-slate-700 w-[81px] h-[26px]"}`,
                                                children: visit.status
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                lineNumber: 1314,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 1313,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, index, true, {
                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                    lineNumber: 1294,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                            lineNumber: 1292,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setIsVisitLogModalOpen(false);
                                navigate("/scheduled-visits");
                            },
                            className: "w-full bg-[#002d62] hover:bg-[#081a3e] text-white py-3 rounded-2xl text-xs font-bold shadow-md shadow-[#002d62]/20 transition-all cursor-pointer text-center",
                            children: "View All in Scheduled Visits →"
                        }, void 0, false, {
                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                            lineNumber: 1330,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                    lineNumber: 1263,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                lineNumber: 1262,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            isDateModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-[2px] animate-in fade-in duration-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white dark:bg-zinc-950 w-full max-w-[680px] rounded-[24px] shadow-2xl overflow-hidden flex flex-col border border-zinc-150 dark:border-zinc-800/80 animate-in zoom-in-95 duration-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between px-8 py-6 border-b border-zinc-100 dark:border-zinc-850",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-slate-800 dark:text-zinc-100",
                                    children: "Select Date Range"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                    lineNumber: 1348,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsDateModalOpen(false),
                                    className: "p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-850 text-slate-400 dark:text-zinc-500 transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                        lineNumber: 1353,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                    lineNumber: 1349,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                            lineNumber: 1347,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-1 min-h-[320px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-[220px] border-r border-zinc-100 dark:border-zinc-850 p-5 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "w-full flex items-center gap-2.5 px-4 py-3 bg-[#0f3d6b] text-white rounded-xl text-sm font-semibold shadow-sm transition-all duration-200",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 1363,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        "Date Range"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 1362,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 px-2 mb-2",
                                                            children: "QUICK SELECTS"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 1368,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-1",
                                                            children: [
                                                                "Today",
                                                                "Last 7 Days",
                                                                "This Month"
                                                            ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleQuickSelect(opt),
                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all duration-150", quickSelect === opt ? "bg-slate-50 text-slate-850 border border-zinc-150 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700" : "text-slate-500 hover:text-slate-800 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/40"),
                                                                    children: opt
                                                                }, opt, false, {
                                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                    lineNumber: 1373,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 1371,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 1367,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 1361,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-t border-zinc-150 dark:border-zinc-800 pt-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 px-2 mb-1",
                                                    children: "SELECTED SPAN"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 1391,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block text-xs font-extrabold text-[#0f3d6b] dark:text-blue-400 px-2",
                                                    children: formatSelectedSpan(tempStartDate, tempEndDate)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 1394,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 1390,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                    lineNumber: 1360,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 p-6 flex flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-4 px-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-bold text-slate-800 dark:text-zinc-200",
                                                    children: formatMonthYear(activeMonth)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 1404,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: prevMonth,
                                                            className: "p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                                className: "w-3.5 h-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                lineNumber: 1412,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 1408,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: nextMonth,
                                                            className: "p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                className: "w-3.5 h-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                                lineNumber: 1418,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 1414,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 1407,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 1403,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-7 gap-y-2 text-center mb-2",
                                            children: [
                                                "MO",
                                                "TU",
                                                "WE",
                                                "TH",
                                                "FR",
                                                "SA",
                                                "SU"
                                            ].map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-extrabold text-slate-400 dark:text-zinc-500 tracking-wider",
                                                    children: day
                                                }, day, false, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 1426,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 1424,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-7 gap-y-1 text-center",
                                            children: calendarDays.map(({ date, isCurrentMonth }, idx)=>{
                                                const isFuture = new Date(date.getFullYear(), date.getMonth(), date.getDate()) > new Date(today.getFullYear(), today.getMonth(), today.getDate());
                                                const isSelectedStart = isSameDay(date, tempStartDate);
                                                const isSelectedEnd = isSameDay(date, tempEndDate);
                                                const isInRange = isWithinRange(date, tempStartDate, tempEndDate);
                                                let bgClass = "";
                                                if (isSelectedStart && tempEndDate && !isSelectedEnd) {
                                                    bgClass = "bg-[#f4f7fb] dark:bg-blue-950/20 rounded-l-full";
                                                } else if (isSelectedEnd && tempStartDate && !isSelectedStart) {
                                                    bgClass = "bg-[#f4f7fb] dark:bg-blue-950/20 rounded-r-full";
                                                } else if (isInRange) {
                                                    bgClass = "bg-[#f4f7fb] dark:bg-blue-950/20";
                                                }
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    onClick: ()=>!isFuture && handleDayClick(date),
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("relative py-2 text-xs font-bold select-none flex items-center justify-center transition-all duration-150", isCurrentMonth && !isFuture ? "text-slate-800 dark:text-zinc-200" : "text-slate-300 dark:text-zinc-600/60", isFuture ? "opacity-40 cursor-not-allowed" : "cursor-pointer", bgClass),
                                                    children: [
                                                        (isSelectedStart || isSelectedEnd) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-0 m-auto w-8 h-8 rounded-full bg-[#0f3d6b] dark:bg-[#1a5b9b] z-0 shadow-sm animate-in zoom-in-75 duration-150"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 1462,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("relative z-10", (isSelectedStart || isSelectedEnd) && "text-white font-bold"),
                                                            children: date.getDate()
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                            lineNumber: 1464,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, idx, true, {
                                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                                    lineNumber: 1450,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0));
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 1433,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                    lineNumber: 1401,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                            lineNumber: 1358,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between px-8 py-5 bg-zinc-50/50 dark:bg-zinc-900/40 border-t border-zinc-100 dark:border-zinc-850",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleClearDates,
                                    className: "text-sm font-extrabold text-slate-500 hover:text-slate-850 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors",
                                    children: "Clear Filters"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                    lineNumber: 1479,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setIsDateModalOpen(false),
                                            className: "px-6 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-750 text-sm font-bold text-slate-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-850 transition-colors",
                                            children: "Dismiss"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 1486,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleApplyDateRange,
                                            className: "px-6 py-2.5 bg-[#0f3d6b] hover:bg-[#0c3156] text-white rounded-full text-sm font-bold shadow-md transition-colors animate-in fade-in duration-200",
                                            children: "Apply Selection"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                            lineNumber: 1492,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                                    lineNumber: 1485,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                            lineNumber: 1478,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                    lineNumber: 1345,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
                lineNumber: 1344,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/war-room/pages/WarRoomPage.tsx",
        lineNumber: 550,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(WarRoomPage, "XPAeh0SaCyh9Lw1ffV2WGw7rSq4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllProjectEmAndRmDataQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllMasterDataQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$war$2d$room$2f$api$2f$warRoomApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetWarRoomDataQuery"]
    ];
});
_c = WarRoomPage;
var _c;
__turbopack_context__.k.register(_c, "WarRoomPage");
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
"[project]/src/shared/hooks/usePermissions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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

//# sourceMappingURL=src_1yb61m0._.js.map