(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/api/baseApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
const DEMO_TOKEN = 'demo-session-token';
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
    const activeToken = api.getState()?.auth?.token;
    const isDemoSession = activeToken === DEMO_TOKEN;
    const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/refreshToken') || url.includes('/auth/forgotPassword');
    // Demo sessions intentionally have no backend-issued JWT. API failures may
    // render empty/error states, but must never destroy the local demo session.
    if (result.error && result.error.status === 401 && !isAuthEndpoint && !isDemoSession) {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/api/baseApi.ts [app-client] (ecmascript)");
;
const manageMasterDataSlice = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
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
"[project]/src/features/master-data/pages/LeadStatusesPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LeadStatusesPage",
    ()=>LeadStatusesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$api$2f$manageMasterDataSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master-data/api/manageMasterDataSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/hooks/useMasterDataLookup.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
const LeadStatusesPage = ()=>{
    _s();
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"])();
    const [createLeadStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$api$2f$manageMasterDataSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateLeadStatusMutation"])();
    const [updateLeadStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$api$2f$manageMasterDataSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateLeadStatusMutation"])();
    const [createProjectWiseLeadStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$api$2f$manageMasterDataSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateProjectWiseLeadStatusMutation"])();
    const { masterData, projectLeadStatuses } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"])();
    // State initialized from the dynamic data file
    const projects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LeadStatusesPage.useMemo[projects]": ()=>{
            if (!masterData?.projects) return [];
            return masterData.projects.map({
                "LeadStatusesPage.useMemo[projects]": (p)=>({
                        id: String(p.id),
                        name: p.description || p.code
                    })
            }["LeadStatusesPage.useMemo[projects]"]);
        }
    }["LeadStatusesPage.useMemo[projects]"], [
        masterData
    ]);
    const [globalStatuses, setGlobalStatuses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Sync global statuses from API
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeadStatusesPage.useEffect": ()=>{
            if (masterData?.lead_statuses) {
                const apiStatuses = masterData.lead_statuses.map({
                    "LeadStatusesPage.useEffect.apiStatuses": (s)=>({
                            code: s.code,
                            name: s.description || s.code,
                            id: s.id,
                            is_editable: s.is_editable
                        })
                }["LeadStatusesPage.useEffect.apiStatuses"]);
                setGlobalStatuses(apiStatuses);
            }
        }
    }["LeadStatusesPage.useEffect"], [
        masterData
    ]);
    // Filter & Selection States
    const [selectedProjectId, setSelectedProjectIdState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "LeadStatusesPage.useState": ()=>{
            return localStorage.getItem("crm_selected_project_id") || "";
        }
    }["LeadStatusesPage.useState"]);
    const setSelectedProjectId = (id)=>{
        setSelectedProjectIdState(id);
        localStorage.setItem("crm_selected_project_id", id);
    };
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isProjectDropdownOpen, setIsProjectDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Draft IDs (numeric, unique) for statuses added by user but not yet saved
    const [tempSelectedIds, setTempSelectedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Derive the backend-saved statuses for the selected project directly from API data
    const backendSelectedStatuses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LeadStatusesPage.useMemo[backendSelectedStatuses]": ()=>{
            if (!selectedProjectId || !projectLeadStatuses || !globalStatuses.length) return [];
            const projectEntry = projectLeadStatuses.find({
                "LeadStatusesPage.useMemo[backendSelectedStatuses].projectEntry": (p)=>String(p.project_id) === selectedProjectId
            }["LeadStatusesPage.useMemo[backendSelectedStatuses].projectEntry"]);
            if (!projectEntry || !Array.isArray(projectEntry.status)) return [];
            // projectEntry.status is already converted: [{ id, lead_status_id, description }]
            const backendIds = projectEntry.status.map({
                "LeadStatusesPage.useMemo[backendSelectedStatuses].backendIds": (s)=>s.lead_status_id
            }["LeadStatusesPage.useMemo[backendSelectedStatuses].backendIds"]);
            return globalStatuses.filter({
                "LeadStatusesPage.useMemo[backendSelectedStatuses]": (gs)=>backendIds.includes(gs.id)
            }["LeadStatusesPage.useMemo[backendSelectedStatuses]"]);
        }
    }["LeadStatusesPage.useMemo[backendSelectedStatuses]"], [
        selectedProjectId,
        projectLeadStatuses,
        globalStatuses
    ]);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [modalMode, setModalMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("add");
    const [editingStatusCode, setEditingStatusCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editingStatusId, setEditingStatusId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [statusName, setStatusName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [statusCode, setStatusCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // UI Notification State
    // (Replaced custom toast with sonner)
    // Success Modal State after Save Changes
    const [isSaveSuccessModalOpen, setIsSaveSuccessModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Clear drafts when selected project changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeadStatusesPage.useEffect": ()=>{
            setTempSelectedIds([]);
        }
    }["LeadStatusesPage.useEffect"], [
        selectedProjectId
    ]);
    // Timer for automatic redirect after 3 seconds when success modal is open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeadStatusesPage.useEffect": ()=>{
            let timer;
            if (isSaveSuccessModalOpen) {
                timer = setTimeout({
                    "LeadStatusesPage.useEffect": ()=>{
                        handleRedirectToLeadStatus();
                    }
                }["LeadStatusesPage.useEffect"], 3000);
            }
            return ({
                "LeadStatusesPage.useEffect": ()=>{
                    if (timer) clearTimeout(timer);
                }
            })["LeadStatusesPage.useEffect"];
        }
    }["LeadStatusesPage.useEffect"], [
        isSaveSuccessModalOpen
    ]);
    const handleRedirectToLeadStatus = ()=>{
        setIsSaveSuccessModalOpen(false);
        setSelectedProjectId(""); // Clears selected project so page returns to default state (first image)
        navigate("/master-data/lead-statuses");
    };
    // Removed custom showToast in favor of sonner
    // Find label of active project
    const selectedProjectLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LeadStatusesPage.useMemo[selectedProjectLabel]": ()=>{
            const proj = projects.find({
                "LeadStatusesPage.useMemo[selectedProjectLabel].proj": (p)=>p.id === selectedProjectId
            }["LeadStatusesPage.useMemo[selectedProjectLabel].proj"]);
            return proj ? proj.name : "Select Project";
        }
    }["LeadStatusesPage.useMemo[selectedProjectLabel]"], [
        selectedProjectId,
        projects
    ]);
    // Handle Name change
    const handleNameChange = (e)=>{
        setStatusName(e.target.value);
    };
    // Open Modal for adding
    const openAddModal = ()=>{
        setModalMode("add");
        setStatusName("");
        setStatusCode("");
        setEditingStatusId(null);
        setIsModalOpen(true);
    };
    // Open Modal for editing global status
    const openEditModal = (status)=>{
        setModalMode("edit");
        setEditingStatusCode(status.code);
        setEditingStatusId(status.id);
        setStatusName(status.name);
        setStatusCode(status.code);
        setIsModalOpen(true);
    };
    // Handle Add/Edit Form Submit
    const handleModalSubmit = async (e)=>{
        e.preventDefault();
        if (!statusName.trim() || !statusCode.trim()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please fill in both fields");
            return;
        }
        const cleanCode = statusCode.trim().toUpperCase();
        try {
            if (modalMode === "add") {
                // Check duplicate code
                if (globalStatuses.some((s)=>s.code === cleanCode)) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(`Status code "${cleanCode}" already exists.`);
                    return;
                }
                await createLeadStatus({
                    code: cleanCode,
                    description: statusName.trim(),
                    user_id: null
                }).unwrap();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`Status "${statusName}" added successfully.`);
            } else {
                // Edit mode
                if (editingStatusId === null) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Invalid status ID.");
                    return;
                }
                // Check if the user changed the code to something that already exists
                if (cleanCode !== editingStatusCode && globalStatuses.some((s)=>s.code === cleanCode)) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(`Status code "${cleanCode}" already exists.`);
                    return;
                }
                await updateLeadStatus({
                    id: editingStatusId,
                    code: cleanCode,
                    description: statusName.trim(),
                    user_id: null
                }).unwrap();
                setGlobalStatuses(globalStatuses.map((s)=>s.id === editingStatusId ? {
                        ...s,
                        name: statusName.trim(),
                        code: cleanCode
                    } : s));
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Status updated successfully.");
            }
            setIsModalOpen(false);
        } catch (err) {
            console.error("Modal Submit Error:", err);
            if (err?.status === 409) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Already code is existed");
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to save changes. Please try again.");
            }
        }
    };
    // Handle Project funnel changes (Add status to selected project)
    const handleAddStatusToProject = (id)=>{
        if (!tempSelectedIds.includes(id)) {
            setTempSelectedIds([
                ...tempSelectedIds,
                id
            ]);
        }
    };
    // Handle Project funnel changes (Remove status from selected project)
    const handleRemoveStatusFromProject = (id)=>{
        setTempSelectedIds(tempSelectedIds.filter((i)=>i !== id));
    };
    // Save changes to project statuses map via backend
    const handleSaveChanges = async ()=>{
        if (!selectedProjectId || tempSelectedIds.length === 0) return;
        try {
            await createProjectWiseLeadStatus({
                project_id: Number(selectedProjectId),
                lead_status_id: tempSelectedIds,
                user_id: null
            }).unwrap();
            setIsSaveSuccessModalOpen(true);
            setTempSelectedIds([]);
        } catch (err) {
            console.error(err);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to save some statuses");
        }
    };
    // Computed data lists
    // 1. Selected statuses: backend-saved + frontend drafts
    const displayedSelectedStatuses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LeadStatusesPage.useMemo[displayedSelectedStatuses]": ()=>{
            if (!selectedProjectId) return [];
            const draftStatuses = globalStatuses.filter({
                "LeadStatusesPage.useMemo[displayedSelectedStatuses].draftStatuses": (s)=>tempSelectedIds.includes(s.id)
            }["LeadStatusesPage.useMemo[displayedSelectedStatuses].draftStatuses"]);
            const combined = [
                ...backendSelectedStatuses,
                ...draftStatuses
            ];
            return combined.filter({
                "LeadStatusesPage.useMemo[displayedSelectedStatuses]": (s)=>s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.code.toLowerCase().includes(searchQuery.toLowerCase())
            }["LeadStatusesPage.useMemo[displayedSelectedStatuses]"]);
        }
    }["LeadStatusesPage.useMemo[displayedSelectedStatuses]"], [
        selectedProjectId,
        backendSelectedStatuses,
        tempSelectedIds,
        globalStatuses,
        searchQuery
    ]);
    // 2. Available statuses:
    // - If NO project selected: all global statuses.
    // - If project IS selected: global statuses NOT in backend-saved and NOT in draft ids.
    const displayedAvailableStatuses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LeadStatusesPage.useMemo[displayedAvailableStatuses]": ()=>{
            const backendIds = backendSelectedStatuses.map({
                "LeadStatusesPage.useMemo[displayedAvailableStatuses].backendIds": (s)=>s.id
            }["LeadStatusesPage.useMemo[displayedAvailableStatuses].backendIds"]);
            return globalStatuses.filter({
                "LeadStatusesPage.useMemo[displayedAvailableStatuses]": (s)=>{
                    if (!selectedProjectId) return true;
                    return !backendIds.includes(s.id) && !tempSelectedIds.includes(s.id);
                }
            }["LeadStatusesPage.useMemo[displayedAvailableStatuses]"]).filter({
                "LeadStatusesPage.useMemo[displayedAvailableStatuses]": (s)=>s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.code.toLowerCase().includes(searchQuery.toLowerCase())
            }["LeadStatusesPage.useMemo[displayedAvailableStatuses]"]);
        }
    }["LeadStatusesPage.useMemo[displayedAvailableStatuses]"], [
        selectedProjectId,
        backendSelectedStatuses,
        tempSelectedIds,
        globalStatuses,
        searchQuery
    ]);
    const hasChanges = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LeadStatusesPage.useMemo[hasChanges]": ()=>{
            return tempSelectedIds.length > 0;
        }
    }["LeadStatusesPage.useMemo[hasChanges]"], [
        tempSelectedIds
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-[1440px] xl:max-w-[1920px] 2xl:max-w-[2560px] mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-6 animate-in fade-in duration-300 relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>navigate("/master-data"),
                        className: "flex items-center gap-[8px] font-['Plus_Jakarta_Sans'] font-bold text-[24px] leading-[28px] tracking-[-0.5px] text-[#001549] dark:text-blue-400 hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-0 h-[44px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                className: "w-6 h-6 text-[#001549] dark:text-blue-400"
                            }, void 0, false, {
                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                lineNumber: 275,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Lead Statuses"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                        lineNumber: 271,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: openAddModal,
                        disabled: !!selectedProjectId,
                        className: "bg-[#001549] hover:bg-[#001549]/90 text-white px-[24px] py-[12px] gap-[8px] rounded-full w-[192.67px] h-[48px] font-['Inter'] font-semibold text-[16px] leading-[24px] transition-all shadow-sm cursor-pointer flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "w-[11.67px] h-[11.67px] text-white shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                lineNumber: 284,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-[125px] h-[24px] flex items-center justify-center text-center shrink-0",
                                children: "Add New Status"
                            }, void 0, false, {
                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                lineNumber: 285,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                        lineNumber: 279,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-3xl p-6 xl:p-8 shadow-sm space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-[16px] relative z-20",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-['Inter'] font-bold text-[14px] leading-[24px] tracking-[1.6px] uppercase text-[rgba(0,21,73,0.6)] flex items-center w-[76px] h-[24px]",
                                        children: "PROJECT"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                        lineNumber: 297,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setIsProjectDropdownOpen(!isProjectDropdownOpen),
                                                className: "flex items-center justify-between gap-2.5 bg-[#F2F4F6] dark:bg-zinc-850 hover:bg-slate-200/40 border border-slate-200/20 px-4 py-2.5 rounded-xl w-[287px] h-[48px] font-['Inter'] font-semibold text-[15px] leading-[24px] text-[#063669] dark:text-blue-400 transition-colors shadow-sm cursor-pointer",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: selectedProjectLabel
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                        lineNumber: 305,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                        className: "w-5 h-5 text-[#063669] dark:text-blue-400 shrink-0 ml-1.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                        lineNumber: 306,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                lineNumber: 301,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            isProjectDropdownOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute left-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl shadow-lg py-2 z-30",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setSelectedProjectId("");
                                                            setIsProjectDropdownOpen(false);
                                                        },
                                                        className: "w-full text-left px-3.5 py-2.5 text-xs font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2.5 cursor-pointer",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `w-1.5 h-1.5 rounded-full shrink-0 ${selectedProjectId === "" ? "bg-blue-600" : "bg-slate-300"}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                                lineNumber: 318,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            "Select Project (All Statuses)"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                        lineNumber: 311,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    projects.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>{
                                                                setSelectedProjectId(p.id);
                                                                setIsProjectDropdownOpen(false);
                                                            },
                                                            className: "w-full text-left px-3.5 py-2.5 text-xs font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2.5 cursor-pointer",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `w-1.5 h-1.5 rounded-full shrink-0 ${selectedProjectId === p.id ? "bg-blue-600" : "bg-slate-350"}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                                    lineNumber: 333,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                p.name
                                                            ]
                                                        }, p.id, true, {
                                                            fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                            lineNumber: 325,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                lineNumber: 310,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                        lineNumber: 300,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                lineNumber: 296,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-full sm:w-[401px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "absolute left-[16px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#434653]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                        lineNumber: 347,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Search Statuses...",
                                        value: searchQuery,
                                        onChange: (e)=>setSearchQuery(e.target.value),
                                        className: "w-full h-[48px] pl-[40px] pr-4 rounded-full border-none bg-[#F2F4F6] dark:bg-zinc-800 text-[14px] font-normal text-[#434653] dark:text-zinc-200 placeholder-[#434653] focus:outline-none focus:ring-1 focus:ring-[#002d62]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                        lineNumber: 348,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                lineNumber: 346,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                        lineNumber: 294,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-b border-slate-100 dark:border-zinc-800/80"
                    }, void 0, false, {
                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                        lineNumber: 358,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    selectedProjectId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4 animate-in fade-in duration-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-['Plus_Jakarta_Sans'] text-[18px] leading-[27px] font-semibold text-[#191C1E] dark:text-zinc-200",
                                                children: "Selected Statuses"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                lineNumber: 365,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-['Inter'] text-[14px] leading-[21px] font-normal text-[#575E70] dark:text-zinc-400 mt-1",
                                                children: [
                                                    "Statuses currently enabled for ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: selectedProjectLabel
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                        lineNumber: 369,
                                                        columnNumber: 50
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                lineNumber: 368,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                        lineNumber: 364,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        disabled: !hasChanges,
                                        onClick: handleSaveChanges,
                                        className: "bg-[#002d62] hover:bg-[#063669] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                                        children: "Save Changes"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                        lineNumber: 373,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                lineNumber: 363,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            displayedSelectedStatuses.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-50/50 dark:bg-zinc-950/20 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-6 text-center text-xs font-bold text-slate-400",
                                children: 'No statuses currently enabled. Click "Add" below to add a status to this project.'
                            }, void 0, false, {
                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                lineNumber: 383,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4",
                                children: displayedSelectedStatuses.map((status)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between bg-slate-50 dark:bg-zinc-900/50 border border-slate-100/50 dark:border-zinc-800/85 rounded-2xl px-4 min-h-[66px] py-3 w-full transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 w-[calc(100%-60px)]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "bg-white dark:bg-zinc-800 text-[#002d62] dark:text-blue-400 border border-slate-200 dark:border-zinc-700 text-[11px] font-bold px-3 py-1.5 rounded-lg min-w-[64px] text-center uppercase shrink-0 shadow-sm",
                                                        children: status.code
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-sm text-[#001549] dark:text-zinc-150 break-words line-clamp-2",
                                                        children: status.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                        lineNumber: 397,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                lineNumber: 393,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            tempSelectedIds.includes(status.id) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleRemoveStatusFromProject(status.id),
                                                className: "text-red-500 hover:text-red-700 text-xs font-extrabold cursor-pointer transition-colors",
                                                children: "Remove"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                lineNumber: 403,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, status.code, true, {
                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                        lineNumber: 389,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                lineNumber: 387,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-b border-slate-100 dark:border-zinc-800/80 pt-2"
                            }, void 0, false, {
                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                lineNumber: 415,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                        lineNumber: 362,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-['Plus_Jakarta_Sans'] text-[18px] leading-[27px] font-semibold text-[#191C1E] dark:text-zinc-200",
                                        children: selectedProjectId ? "Available Statuses" : "Available Statuses"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                        lineNumber: 422,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    selectedProjectId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-['Inter'] text-[14px] leading-[21px] font-normal text-[#575E70] dark:text-zinc-400 mt-1",
                                        children: "Global statuses not yet added to this project funnel."
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                        lineNumber: 426,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                lineNumber: 421,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            displayedAvailableStatuses.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-50/50 dark:bg-zinc-950/20 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-6 text-center text-xs font-bold text-slate-400",
                                children: 'No statuses found. Click "Add New Status" above to create one.'
                            }, void 0, false, {
                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                lineNumber: 433,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4",
                                children: displayedAvailableStatuses.map((status)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between bg-slate-50 dark:bg-zinc-900/50 hover:bg-slate-100/60 dark:hover:bg-zinc-800/40 border border-slate-100/50 dark:border-zinc-800/80 rounded-2xl px-4 min-h-[66px] py-3 w-full transition-colors",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 w-[calc(100%-60px)]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "bg-white dark:bg-zinc-800 text-[#002d62] dark:text-blue-400 border border-slate-200 dark:border-zinc-700 text-[11px] font-bold px-3 py-1.5 rounded-lg min-w-[64px] text-center uppercase shrink-0 shadow-sm",
                                                        children: status.code
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                        lineNumber: 444,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-sm text-slate-800 dark:text-zinc-150 break-words line-clamp-2",
                                                        children: status.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                        lineNumber: 447,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                lineNumber: 443,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            selectedProjectId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleAddStatusToProject(status.id),
                                                className: "bg-[#0c1a30] hover:bg-slate-800 text-white text-[11px] font-extrabold px-4 py-1.5 rounded-lg cursor-pointer transition-colors",
                                                children: "Add"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                lineNumber: 452,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>openEditModal(status),
                                                disabled: status.is_editable === 0,
                                                className: `bg-[#0c1a30] text-white text-[11px] font-extrabold px-4 py-1.5 rounded-lg transition-colors ${status.is_editable === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-800 cursor-pointer"}`,
                                                children: "Edit"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                lineNumber: 459,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, status.code, true, {
                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                        lineNumber: 439,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                lineNumber: 437,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                        lineNumber: 420,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                lineNumber: 292,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white dark:bg-zinc-900 rounded-[24px] border border-slate-100 dark:border-zinc-800/80 w-full max-w-md p-6 shadow-2xl relative space-y-6 mx-4 animate-in zoom-in-95 duration-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between border-b border-slate-50 dark:border-zinc-850 pb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-[18px] font-bold text-[#00236F] dark:text-blue-400",
                                    children: modalMode === "add" ? "Add New Status" : "Edit Status"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                    lineNumber: 484,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsModalOpen(false),
                                    className: "text-slate-400 hover:text-slate-600 dark:hover:text-zinc-350 cursor-pointer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                        lineNumber: 491,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                    lineNumber: 487,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                            lineNumber: 483,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleModalSubmit,
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[10px] font-bold text-slate-400 dark:text-zinc-500 tracking-wider uppercase",
                                                    children: modalMode === "edit" ? "EDIT STATUS" : "ENTER STATUS"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                    lineNumber: 499,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-bold text-slate-400 dark:text-zinc-500",
                                                    children: [
                                                        statusName.length,
                                                        "/15 characters"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                    lineNumber: 502,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                            lineNumber: 498,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "New Lead",
                                            value: statusName,
                                            maxLength: 15,
                                            onChange: handleNameChange,
                                            className: "w-full h-[48px] px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 text-[14px] font-semibold text-[#00236F] dark:text-blue-400 focus:outline-none focus:ring-1 focus:ring-[#002d62]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                            lineNumber: 506,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                    lineNumber: 497,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[10px] font-bold text-slate-400 dark:text-zinc-500 tracking-wider uppercase",
                                                    children: "CODE"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                    lineNumber: 518,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-bold text-slate-400 dark:text-zinc-500",
                                                    children: [
                                                        statusCode.length,
                                                        "/6 characters"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                                    lineNumber: 521,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                            lineNumber: 517,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "NLEAD",
                                            value: statusCode,
                                            maxLength: 6,
                                            onChange: (e)=>setStatusCode(e.target.value),
                                            disabled: modalMode === "edit",
                                            className: "w-full h-[48px] px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-[#F4F3FA] dark:bg-zinc-950/60 text-[14px] font-semibold text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#002d62] disabled:opacity-60 disabled:cursor-not-allowed uppercase"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                            lineNumber: 525,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                    lineNumber: 516,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-end gap-4 pt-4 border-t border-slate-50 dark:border-zinc-850",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setIsModalOpen(false),
                                            className: "px-2 py-1 text-base font-medium text-[#002d62] hover:text-[#063669] dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                            lineNumber: 538,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "w-[175px] h-[44px] bg-[#002d62] hover:bg-[#063669] text-white rounded-xl text-base font-semibold transition-all cursor-pointer shadow-sm flex items-center justify-center",
                                            children: modalMode === "add" ? "Add New Status" : "Update Status"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                            lineNumber: 545,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                    lineNumber: 537,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                            lineNumber: 496,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                    lineNumber: 481,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                lineNumber: 480,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            isSaveSuccessModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white dark:bg-zinc-900 rounded-[32px] border border-slate-100 dark:border-zinc-800/80 w-full max-w-[400px] p-8 shadow-2xl relative text-center space-y-6 mx-4 animate-in zoom-in-95 duration-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-16 h-16 rounded-full bg-[#002d62] flex items-center justify-center text-white shadow-lg shadow-blue-500/20",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                        className: "w-8 h-8 stroke-[3]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                        lineNumber: 564,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#34d399] border-2 border-white dark:border-zinc-900 -translate-y-1/3 translate-x-1/3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                        lineNumber: 567,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute bottom-2 left-0 w-1.5 h-1.5 rounded-full bg-[#34d399] -translate-x-2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                        lineNumber: 568,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                lineNumber: 563,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                            lineNumber: 562,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-extrabold text-[#002d62] dark:text-zinc-150 tracking-tight px-4",
                            children: "Changes Saved Successfully"
                        }, void 0, false, {
                            fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                            lineNumber: 573,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11px] text-slate-450 dark:text-zinc-550 font-medium leading-relaxed max-w-[280px] mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-extrabold text-slate-700 dark:text-zinc-350",
                                    children: "Lead Statuses"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                    lineNumber: 579,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "italic text-slate-400 dark:text-zinc-500",
                                    children: "Changes have been securely applied to"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                    lineNumber: 580,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-extrabold text-slate-700 dark:text-zinc-350",
                                    children: selectedProjectLabel
                                }, void 0, false, {
                                    fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                    lineNumber: 581,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                ".",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "italic text-slate-400 dark:text-zinc-500",
                                    children: "You'll be redirected to your Home Page in just a moment."
                                }, void 0, false, {
                                    fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                    lineNumber: 582,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                            lineNumber: 578,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center w-full pt-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleRedirectToLeadStatus,
                                className: "bg-[#1a365d] hover:bg-[#2a4365] text-white text-xs font-black tracking-wider py-3.5 px-8 rounded-full transition-colors cursor-pointer w-full max-w-[240px] shadow-sm uppercase",
                                children: "Return to Home"
                            }, void 0, false, {
                                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                                lineNumber: 587,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                            lineNumber: 586,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                    lineNumber: 560,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
                lineNumber: 559,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/master-data/pages/LeadStatusesPage.tsx",
        lineNumber: 268,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LeadStatusesPage, "1lLlI9uXQWsLBckpNwF73GSOdQ4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$api$2f$manageMasterDataSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateLeadStatusMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$api$2f$manageMasterDataSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateLeadStatusMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$api$2f$manageMasterDataSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateProjectWiseLeadStatusMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"]
    ];
});
_c = LeadStatusesPage;
var _c;
__turbopack_context__.k.register(_c, "LeadStatusesPage");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/api/baseApi.ts [app-client] (ecmascript)");
;
const masterApi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/api/baseApi.ts [app-client] (ecmascript)");
;
const usersApi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
    endpoints: (builder)=>({
            getAllUsersByRoleId: builder.query({
                query: (body)=>({
                        url: '/users/getAllUsersByRoleId',
                        method: 'POST',
                        body
                    }),
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
const { useGetUsersQuery, useGetAllUsersByRoleIdQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation, useGetReporteesQuery, useGetAllUsersQuery, useGetEmDashboardDateWiseDataQuery, useGetEmDashboardTodaysDataQuery, useGetRmDashboardDateWiseDataQuery, useGetStaleLeadsQuery, useGetEscalatedLeadsQuery } = usersApi;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/users/data/demoUsers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "demoSalesExecutives",
    ()=>demoSalesExecutives,
    "demoSalesHeads",
    ()=>demoSalesHeads
]);
const demoSalesHeads = [
    {
        id: 301,
        login_id: "rahul.mehta",
        first_name: "Rahul",
        last_name: "Mehta",
        phone_number: "+91 90001 10001",
        email: "rahul.mehta@techgylink.com",
        role_id: 3,
        role_code: "RELMNG",
        role_description: "Sales Head",
        is_active: 1,
        created_on: "2026-01-12T09:00:00.000Z",
        updated_on: null,
        reportee_count: 3,
        project_name: "Nizampet"
    },
    {
        id: 302,
        login_id: "priya.sharma",
        first_name: "Priya",
        last_name: "Sharma",
        phone_number: "+91 90001 10002",
        email: "priya.sharma@techgylink.com",
        role_id: 3,
        role_code: "RELMNG",
        role_description: "Sales Head",
        is_active: 1,
        created_on: "2026-02-08T09:00:00.000Z",
        updated_on: null,
        reportee_count: 3,
        project_name: "Kondapur"
    },
    {
        id: 303,
        login_id: "karan.verma",
        first_name: "Karan",
        last_name: "Verma",
        phone_number: "+91 90001 10003",
        email: "karan.verma@techgylink.com",
        role_id: 3,
        role_code: "RELMNG",
        role_description: "Sales Head",
        is_active: 1,
        created_on: "2026-03-18T09:00:00.000Z",
        updated_on: null,
        reportee_count: 2,
        project_name: "KPHB"
    }
];
const demoSalesExecutives = [
    {
        id: 401,
        login_id: "nisha.kapoor",
        first_name: "Nisha",
        last_name: "Kapoor",
        phone_number: "+91 90002 20001",
        email: "nisha.kapoor@techgylink.com",
        role_id: 4,
        role_code: "EXPMNG",
        role_description: "Sales Executive",
        is_active: 1,
        created_on: "2026-02-02T09:00:00.000Z",
        updated_on: null,
        reporting_manager_id: 301,
        assigned_visits_count: 18,
        project_name: "Nizampet"
    },
    {
        id: 402,
        login_id: "arjun.nair",
        first_name: "Arjun",
        last_name: "Nair",
        phone_number: "+91 90002 20002",
        email: "arjun.nair@techgylink.com",
        role_id: 4,
        role_code: "EXPMNG",
        role_description: "Sales Executive",
        is_active: 1,
        created_on: "2026-02-14T09:00:00.000Z",
        updated_on: null,
        reporting_manager_id: 302,
        assigned_visits_count: 14,
        project_name: "Kondapur"
    },
    {
        id: 403,
        login_id: "sneha.rao",
        first_name: "Sneha",
        last_name: "Rao",
        phone_number: "+91 90002 20003",
        email: "sneha.rao@techgylink.com",
        role_id: 4,
        role_code: "EXPMNG",
        role_description: "Sales Executive",
        is_active: 1,
        created_on: "2026-03-01T09:00:00.000Z",
        updated_on: null,
        reporting_manager_id: 303,
        assigned_visits_count: 12,
        project_name: "KPHB"
    },
    {
        id: 404,
        login_id: "asha.patel",
        first_name: "Asha",
        last_name: "Patel",
        phone_number: "+91 90002 20004",
        email: "asha.patel@techgylink.com",
        role_id: 4,
        role_code: "EXPMNG",
        role_description: "Sales Executive",
        is_active: 1,
        created_on: "2026-03-22T09:00:00.000Z",
        updated_on: null,
        reporting_manager_id: 301,
        assigned_visits_count: 10,
        project_name: "Nizampet"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/hooks/useMasterDataLookup.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMasterDataLookup",
    ()=>useMasterDataLookup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master/api/masterApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/users/api/usersApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$projectLeadStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/projectLeadStatus.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$data$2f$demoUsers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/users/data/demoUsers.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const useMasterDataLookup = ()=>{
    _s();
    const { data: masterData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllMasterDataQuery"])();
    const { data: liveRms = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersByRoleIdQuery"])({
        role_id: 3,
        offset: 0
    });
    const { data: liveEms = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersByRoleIdQuery"])({
        role_id: 4,
        offset: 0
    });
    const rms = liveRms.length > 0 ? liveRms : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$data$2f$demoUsers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoSalesHeads"];
    const ems = liveEms.length > 0 ? liveEms : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$data$2f$demoUsers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["demoSalesExecutives"];
    const demoProjects = {
        1: 'Nizampet',
        2: 'Kondapur',
        3: 'KPHB',
        4: 'Nizampet',
        5: 'KPHB'
    };
    const demoSources = {
        1: 'Website',
        2: 'Doctor Referral',
        3: 'Walk-in',
        4: 'Google Ads',
        5: 'WhatsApp',
        6: 'Social Media'
    };
    const demoStatuses = {
        1: 'New enquiry',
        2: 'Consultation requested',
        3: 'Callback required',
        4: 'Appointment scheduled',
        5: 'Follow-up due',
        6: 'OPD booked',
        7: 'Treatment discussed'
    };
    const demoSpecialisations = {
        1: 'Cardiology',
        2: 'Orthopedics',
        3: 'Neurology',
        4: 'Oncology',
        5: 'Pediatrics'
    };
    const projectLeadStatuses = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "useMasterDataLookup.useMemo[projectLeadStatuses]": ()=>{
            const rawData = masterData?.project_lead_status || masterData?.project_lead_statuses || masterData?.project_lead_statusifications || masterData?.project_statusifications || [];
            const converted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$projectLeadStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertProjectLeadStatusToObject"])(rawData, masterData?.lead_statuses || []);
            return converted;
        }
    }["useMasterDataLookup.useMemo[projectLeadStatuses]"], [
        masterData
    ]);
    const getStatusLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useMasterDataLookup.useCallback[getStatusLabel]": (id)=>{
            if (!id) return '--';
            return masterData?.lead_statuses.find({
                "useMasterDataLookup.useCallback[getStatusLabel]": (s)=>s.id === id
            }["useMasterDataLookup.useCallback[getStatusLabel]"])?.description || demoStatuses[id] || `ID: ${id}`;
        }
    }["useMasterDataLookup.useCallback[getStatusLabel]"], [
        masterData
    ]);
    const getProjectLeadStatusLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useMasterDataLookup.useCallback[getProjectLeadStatusLabel]": (projectLeadStatusId)=>{
            if (!projectLeadStatusId) return '--';
            for (const project of projectLeadStatuses){
                if (Array.isArray(project.status)) {
                    const match = project.status.find({
                        "useMasterDataLookup.useCallback[getProjectLeadStatusLabel].match": (s)=>Number(s.id) === Number(projectLeadStatusId)
                    }["useMasterDataLookup.useCallback[getProjectLeadStatusLabel].match"]);
                    if (match) return match.description;
                }
            }
            return '--';
        }
    }["useMasterDataLookup.useCallback[getProjectLeadStatusLabel]"], [
        projectLeadStatuses
    ]);
    const getCustomerStatusLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useMasterDataLookup.useCallback[getCustomerStatusLabel]": (id)=>{
            if (!id) return '--';
            return masterData?.customer_statuses.find({
                "useMasterDataLookup.useCallback[getCustomerStatusLabel]": (s)=>s.id === id
            }["useMasterDataLookup.useCallback[getCustomerStatusLabel]"])?.description || `ID: ${id}`;
        }
    }["useMasterDataLookup.useCallback[getCustomerStatusLabel]"], [
        masterData
    ]);
    const getProjectLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useMasterDataLookup.useCallback[getProjectLabel]": (id)=>{
            if (!id) return '--';
            return masterData?.projects.find({
                "useMasterDataLookup.useCallback[getProjectLabel]": (p)=>p.id === id
            }["useMasterDataLookup.useCallback[getProjectLabel]"])?.description || demoProjects[id] || `N/A`;
        }
    }["useMasterDataLookup.useCallback[getProjectLabel]"], [
        masterData
    ]);
    const getSourceLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useMasterDataLookup.useCallback[getSourceLabel]": (id)=>{
            if (!id) return '--';
            return masterData?.sources.find({
                "useMasterDataLookup.useCallback[getSourceLabel]": (s)=>s.id === id
            }["useMasterDataLookup.useCallback[getSourceLabel]"])?.description || demoSources[id] || `ID: ${id}`;
        }
    }["useMasterDataLookup.useCallback[getSourceLabel]"], [
        masterData
    ]);
    const getRmLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useMasterDataLookup.useCallback[getRmLabel]": (id)=>{
            if (!id) return '--';
            const rm = rms.find({
                "useMasterDataLookup.useCallback[getRmLabel].rm": (r)=>r.id === id
            }["useMasterDataLookup.useCallback[getRmLabel].rm"]);
            return rm ? `${rm.first_name} ${rm.last_name}` : '--';
        }
    }["useMasterDataLookup.useCallback[getRmLabel]"], [
        rms
    ]);
    const getEmLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useMasterDataLookup.useCallback[getEmLabel]": (id)=>{
            if (!id) return '--';
            const em = ems.find({
                "useMasterDataLookup.useCallback[getEmLabel].em": (e)=>e.id === id
            }["useMasterDataLookup.useCallback[getEmLabel].em"]);
            return em ? `${em.first_name} ${em.last_name}` : '--';
        }
    }["useMasterDataLookup.useCallback[getEmLabel]"], [
        ems
    ]);
    const getBranchLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useMasterDataLookup.useCallback[getBranchLabel]": (id)=>{
            if (!id) return '--';
            return masterData?.branches?.find({
                "useMasterDataLookup.useCallback[getBranchLabel]": (b)=>b.id === id
            }["useMasterDataLookup.useCallback[getBranchLabel]"])?.description || demoProjects[id] || `ID: ${id}`;
        }
    }["useMasterDataLookup.useCallback[getBranchLabel]"], [
        masterData
    ]);
    const getSpecialisationLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useMasterDataLookup.useCallback[getSpecialisationLabel]": (id)=>{
            if (!id) return '--';
            return masterData?.specialisations?.find({
                "useMasterDataLookup.useCallback[getSpecialisationLabel]": (s)=>s.id === id
            }["useMasterDataLookup.useCallback[getSpecialisationLabel]"])?.description || demoSpecialisations[id] || `ID: ${id}`;
        }
    }["useMasterDataLookup.useCallback[getSpecialisationLabel]"], [
        masterData
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "useMasterDataLookup.useMemo": ()=>({
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
            })
    }["useMasterDataLookup.useMemo"], [
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
_s(useMasterDataLookup, "q9QcMsfQBlXOKEipNMu91V5VZEM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllMasterDataQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersByRoleIdQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersByRoleIdQuery"]
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

//# sourceMappingURL=src_1w8q4us._.js.map