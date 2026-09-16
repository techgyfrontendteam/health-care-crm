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
"[project]/src/features/master-data/data/contentData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "contentTypesList",
    ()=>contentTypesList,
    "initialGlobalContent",
    ()=>initialGlobalContent,
    "initialProjectContent",
    ()=>initialProjectContent
]);
const initialGlobalContent = [
    {
        id: "master-brochure",
        title: "Master Brochure",
        fileName: "Skyvillas_Brochure_V4.pdf",
        fileSize: "24.5 MB",
        uploadedDate: "12 Oct 2023",
        fileType: "pdf",
        contentType: "Brochures"
    },
    {
        id: "price-list-oct-23",
        title: "Price List - Oct 23",
        fileName: "Inventory_Matrix_Final.xlsx",
        fileSize: "1.2 MB",
        uploadedDate: "08 Oct 2023",
        fileType: "xlsx",
        contentType: "Brochures"
    },
    {
        id: "floor-plans-3bhk",
        title: "Floor Plans (3BHK)",
        fileName: "Plan_Type_A_3BHK.dwg",
        fileSize: "158 MB",
        uploadedDate: "15 Oct 2023",
        fileType: "dwg",
        contentType: "Brochures"
    },
    {
        id: "aerial-renderings",
        title: "Aerial Renderings",
        fileName: "Skyview_Night_01.png",
        fileSize: "8.4 MB",
        uploadedDate: "20 Oct 2023",
        fileType: "png",
        contentType: "Brochures"
    },
    {
        id: "legal-documents",
        title: "Legal Documents",
        fileName: "RERA_Approval_Cert.pdf",
        fileSize: "4.1 MB",
        uploadedDate: "02 Oct 2023",
        fileType: "pdf",
        contentType: "Legal document samples"
    },
    {
        id: "marketing-video",
        title: "Marketing Video",
        fileName: "Walkthrough_4K.mp4",
        fileSize: "412 MB",
        uploadedDate: "25 Oct 2023",
        fileType: "mp4",
        contentType: "Project videos"
    }
];
const initialProjectContent = {
    "planet-green": [
        "master-brochure",
        "price-list-oct-23",
        "floor-plans-3bhk"
    ],
    "farmnatura": [
        "price-list-oct-23",
        "aerial-renderings"
    ],
    "eco-world": [
        "legal-documents",
        "marketing-video"
    ]
};
const contentTypesList = [
    "Brochures",
    "Testimonials",
    "Location maps",
    "Project videos",
    "FAQs",
    "Legal document samples",
    "Founder message",
    "Customer stories"
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/master-data/data/contentTypesData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialGlobalContentTypes",
    ()=>initialGlobalContentTypes,
    "initialProjectContentTypes",
    ()=>initialProjectContentTypes
]);
const initialGlobalContentTypes = [
    {
        code: "BROCHE",
        name: "Brochures"
    },
    {
        code: "TESTMN",
        name: "Testimonials"
    },
    {
        code: "LMAP",
        name: "Location Maps"
    },
    {
        code: "PRIC",
        name: "Price Sheets"
    },
    {
        code: "PVID",
        name: "Project Videos"
    },
    {
        code: "FAQS",
        name: "FAQs"
    },
    {
        code: "LEGD",
        name: "Legal Document Samples"
    },
    {
        code: "FMSG",
        name: "Founder Message"
    },
    {
        code: "CSTR",
        name: "Customer Stories"
    }
];
const initialProjectContentTypes = {
    "planet-green": [
        "BROCHE",
        "TESTMN",
        "LMAP",
        "PRIC",
        "PVID",
        "FAQS"
    ],
    "farmnatura": [
        "BROCHE",
        "TESTMN",
        "PRIC",
        "FAQS",
        "CSTR"
    ],
    "eco-world": [
        "LMAP",
        "PVID",
        "LEGD",
        "FMSG"
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/master-data/data/followUpStatusesData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialGlobalFollowUpStatuses",
    ()=>initialGlobalFollowUpStatuses,
    "initialProjectFollowUpStatuses",
    ()=>initialProjectFollowUpStatuses
]);
const initialGlobalFollowUpStatuses = [
    {
        code: "NLEAD",
        name: "New lead"
    },
    {
        code: "CNTD",
        name: "Contacted"
    },
    {
        code: "STP",
        name: "Site Visit Planned"
    },
    {
        code: "NGTN",
        name: "Negotiation"
    },
    {
        code: "INRSD",
        name: "Interested"
    },
    {
        code: "DSRD",
        name: "Details Shared"
    },
    {
        code: "FWUP",
        name: "Follow Up"
    },
    {
        code: "BOKD",
        name: "Booking Done"
    },
    {
        code: "QUAL",
        name: "Qualified"
    },
    {
        code: "DEMO",
        name: "Demo Completed"
    },
    {
        code: "PROP",
        name: "Proposal Sent"
    }
];
const initialProjectFollowUpStatuses = {
    "planet-green": [
        "NLEAD",
        "CNTD",
        "STP",
        "NGTN"
    ],
    "farmnatura": [
        "INRSD",
        "DSRD",
        "FWUP"
    ],
    "eco-world": [
        "BOKD",
        "QUAL",
        "DEMO",
        "PROP"
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/master-data/data/leadStatusesData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialGlobalStatuses",
    ()=>initialGlobalStatuses,
    "initialProjectStatuses",
    ()=>initialProjectStatuses
]);
const initialGlobalStatuses = [
    {
        code: "INRSD",
        name: "Interested"
    },
    {
        code: "DSRD",
        name: "Details Shared"
    },
    {
        code: "FWUP",
        name: "Follow Up"
    },
    {
        code: "BOKD",
        name: "Booking Done"
    },
    {
        code: "NLEAD",
        name: "New lead"
    },
    {
        code: "CNTD",
        name: "Contacted"
    },
    {
        code: "STP",
        name: "Site Visit Planned"
    },
    {
        code: "NGTN",
        name: "Negotiation"
    },
    {
        code: "QUAL",
        name: "Qualified Lead"
    },
    {
        code: "APPT",
        name: "Appointment Scheduled"
    },
    {
        code: "DEMO",
        name: "Demo Completed"
    },
    {
        code: "PROP",
        name: "Proposal Sent"
    },
    {
        code: "UNDR",
        name: "Under Review"
    },
    {
        code: "HLD",
        name: "On Hold"
    },
    {
        code: "CLSD",
        name: "Closed Won"
    },
    {
        code: "LOST",
        name: "Closed Lost"
    },
    {
        code: "REJ",
        name: "Rejected"
    },
    {
        code: "JUNK",
        name: "Junk Lead"
    },
    {
        code: "SPAM",
        name: "Spam Report"
    },
    {
        code: "ARC",
        name: "Archived"
    },
    {
        code: "NP",
        name: "No Pick Up"
    },
    {
        code: "CB",
        name: "Call Back"
    },
    {
        code: "VM",
        name: "Voicemail Left"
    },
    {
        code: "WN",
        name: "Wrong Number"
    }
];
const initialProjectStatuses = {
    "planet-green": [
        "NLEAD",
        "CNTD",
        "STP",
        "NGTN",
        "QUAL",
        "APPT"
    ],
    "farmnatura": [
        "INRSD",
        "DSRD",
        "FWUP",
        "DEMO",
        "PROP"
    ],
    "eco-world": [
        "BOKD",
        "UNDR",
        "HLD",
        "CLSD"
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/master-data/data/masterData.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "masterDataCards",
    ()=>masterDataCards
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$projectsData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master-data/data/projectsData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$leadStatusesData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master-data/data/leadStatusesData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$contentData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master-data/data/contentData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$contentTypesData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master-data/data/contentTypesData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$followUpStatusesData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master-data/data/followUpStatusesData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$objectionsData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master-data/data/objectionsData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$projectScoresData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master-data/data/projectScoresData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$pointsData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master-data/data/pointsData.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
const masterDataCards = [
    {
        id: "lead-statuses",
        title: "Lead statuses",
        description: "Define and manage the distinct stages of your sales funnel, tracking progression from initial inquiry to final booking.",
        iconName: "radio",
        path: "/master-data/lead-statuses"
    },
    {
        id: "content",
        title: "Content",
        description: "Centralise project resources, marketing collateral, brochures, videos, and supporting documents for quick access and distribution.",
        iconName: "file-text",
        path: "/master-data/content"
    },
    {
        id: "content-types",
        title: "Content types",
        description: "Standardise content classifications to ensure consistent organisation and management of project assets across teams.",
        iconName: "layers",
        path: "/master-data/content-types"
    },
    {
        id: "lead-follow-up-statuses",
        title: "Lead follow up statuses",
        description: "Configure standard communication cadences, SLA breach parameters, and mandatory next action triggers for the team.",
        iconName: "clock",
        path: "/master-data/follow-up-statuses"
    },
    {
        id: "objections",
        title: "Objections",
        description: "Maintain a central directory of common buyer concerns and resistance points to accurately track sales blockers.",
        iconName: "alert-circle",
        path: "/master-data/objections"
    },
    {
        id: "project-score",
        title: "Project score",
        description: "Adjust the algorithmic weightings, demographic criteria, and intent signals the AI uses to prioritize inbound leads.",
        iconName: "hash-100",
        path: "/master-data/project-score"
    },
    {
        id: "points",
        title: "Points",
        description: "Manage and generate AI communication Points for your leads.",
        iconName: "sparkles",
        path: "/master-data/points"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/master-data/data/objectionsData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialGlobalObjections",
    ()=>initialGlobalObjections,
    "initialProjectObjections",
    ()=>initialProjectObjections
]);
const initialGlobalObjections = [
    {
        id: "road-issue",
        name: "Road Issue"
    },
    {
        id: "water-problem",
        name: "Water Problem"
    },
    {
        id: "nature-related",
        name: "Nature Related Issues"
    },
    {
        id: "expensive",
        name: "Expensive"
    },
    {
        id: "loan-issue",
        name: "Loan Issue"
    },
    {
        id: "facilities",
        name: "Facilities"
    }
];
const initialProjectObjections = {
    "planet-green": [
        "road-issue",
        "expensive",
        "loan-issue"
    ],
    "farmnatura": [
        "water-problem",
        "nature-related"
    ],
    "eco-world": [
        "facilities",
        "expensive"
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/master-data/data/pointsData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialProjectPoints",
    ()=>initialProjectPoints
]);
const initialProjectPoints = {
    "planet-green": {
        "NLEAD": [
            {
                id: "1",
                point: "Did the agent greet the customer professionally?"
            },
            {
                id: "2",
                point: "Did the agent ask for the customer's requirement/needs?"
            },
            {
                id: "3",
                point: "Did the agent explain the project or product details?"
            },
            {
                id: "4",
                point: "Did the agent mention the price or budget clearly?"
            },
            {
                id: "5",
                point: "Did the agent handle customer objections or questions effectively?"
            },
            {
                id: "6",
                point: "Did the agent verify the customer's contact information (Phone/Email)?"
            },
            {
                id: "7",
                point: "Did the agent introduce themselves and the company clearly?"
            }
        ],
        "CNTD": [
            {
                id: "8",
                point: "Did the agent follow up on the previous discussion points?"
            },
            {
                id: "9",
                point: "Did the agent schedule a site visit or next conversation?"
            }
        ]
    },
    "farmnatura": {
        "NLEAD": [
            {
                id: "10",
                point: "Did the agent explain the farmnatura organic farming concept?"
            },
            {
                id: "11",
                point: "Did the agent verify lead location and budget range?"
            }
        ]
    },
    "eco-world": {
        "NLEAD": [
            {
                id: "12",
                point: "Did the agent introduce the eco-friendly amenities of Eco World?"
            },
            {
                id: "13",
                point: "Did the agent ask if the customer is buying for self-use or investment?"
            }
        ]
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/master-data/data/projectScoresData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialProjectScores",
    ()=>initialProjectScores
]);
const initialProjectScores = {
    "planet-green": [
        {
            id: "1",
            category: "Telangana",
            description: "Weightage assigned based on geographical proximity to project locations and regional purchasing power.",
            marks: 25
        },
        {
            id: "2",
            category: "Software Engineer",
            description: "Scores based on employment sectors such as IT, Finance, and Public Service with high investment intent.",
            marks: 20
        },
        {
            id: "3",
            category: "40-50 Years",
            description: "Demographic segments targeting first-time buyers and experienced real estate investors.",
            marks: 10
        },
        {
            id: "4",
            category: "50L Avg Income",
            description: "Annual household income tiers derived from self-declared data and historical lead behavior.",
            marks: 10
        }
    ],
    "farmnatura": [
        {
            id: "5",
            category: "Karnataka",
            description: "Proximity to Bangalore tech hubs and surrounding districts.",
            marks: 30
        },
        {
            id: "6",
            category: "Doctor / Healthcare",
            description: "Professionals with high savings rate and interest in secondary farm homes.",
            marks: 25
        },
        {
            id: "7",
            category: "30-40 Years",
            description: "Younger professionals looking for investment opportunities.",
            marks: 15
        }
    ],
    "eco-world": [
        {
            id: "8",
            category: "Maharashtra",
            description: "Targeting premium buyers in Mumbai and Pune regions.",
            marks: 40
        },
        {
            id: "9",
            category: "Business Owner",
            description: "Self-employed individuals with high net worth.",
            marks: 35
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/master-data/data/projectsData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialProjects",
    ()=>initialProjects
]);
const initialProjects = [
    {
        id: "planet-green",
        name: "Planet Green"
    },
    {
        id: "farmnatura",
        name: "Farmnatura"
    },
    {
        id: "eco-world",
        name: "Eco World"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/master-data/pages/ContentTypesPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContentTypesPage",
    ()=>ContentTypesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$masterData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/master-data/data/masterData.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$projectsData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master-data/data/projectsData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$contentTypesData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master-data/data/contentTypesData.ts [app-client] (ecmascript)");
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
;
const ContentTypesPage = ()=>{
    _s();
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"])();
    const [createContentType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$api$2f$manageMasterDataSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateContentTypeMutation"])();
    const [updateContentType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$api$2f$manageMasterDataSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateContentTypeMutation"])();
    const { masterData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"])();
    // State initialized from the dynamic data file
    const [projects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$projectsData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialProjects"]);
    const [globalContentTypes, setGlobalContentTypes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [projectContentTypes, setProjectContentTypes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$contentTypesData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialProjectContentTypes"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContentTypesPage.useEffect": ()=>{
            if (masterData?.content_types) {
                const apiTypes = masterData.content_types.map({
                    "ContentTypesPage.useEffect.apiTypes": (t)=>({
                            code: t.code,
                            name: t.description || t.code,
                            id: t.id
                        })
                }["ContentTypesPage.useEffect.apiTypes"]);
                setGlobalContentTypes(apiTypes);
            }
        }
    }["ContentTypesPage.useEffect"], [
        masterData
    ]);
    // Filter & Selection States
    const [selectedProjectId, setSelectedProjectIdState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ContentTypesPage.useState": ()=>{
            return localStorage.getItem("crm_selected_project_id") || "";
        }
    }["ContentTypesPage.useState"]);
    const setSelectedProjectId = (id)=>{
        setSelectedProjectIdState(id);
        localStorage.setItem("crm_selected_project_id", id);
    };
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isProjectDropdownOpen, setIsProjectDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Temporary selected content types copy for active project editing
    const [tempSelectedCodes, setTempSelectedCodes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Modal States
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [modalMode, setModalMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("add");
    const [editingTypeCode, setEditingTypeCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editingTypeId, setEditingTypeId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [typeName, setTypeName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [typeCode, setTypeCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Success Modal State after Save Changes
    const [isSaveSuccessModalOpen, setIsSaveSuccessModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Sync tempSelectedCodes when selected project changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContentTypesPage.useEffect": ()=>{
            if (selectedProjectId) {
                setTempSelectedCodes(projectContentTypes[selectedProjectId] || []);
            } else {
                setTempSelectedCodes([]);
            }
        }
    }["ContentTypesPage.useEffect"], [
        selectedProjectId,
        projectContentTypes
    ]);
    // Timer for automatic redirect after 3 seconds when success modal is open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContentTypesPage.useEffect": ()=>{
            let timer;
            if (isSaveSuccessModalOpen) {
                timer = setTimeout({
                    "ContentTypesPage.useEffect": ()=>{
                        handleRedirectToContentHome();
                    }
                }["ContentTypesPage.useEffect"], 3000);
            }
            return ({
                "ContentTypesPage.useEffect": ()=>{
                    if (timer) clearTimeout(timer);
                }
            })["ContentTypesPage.useEffect"];
        }
    }["ContentTypesPage.useEffect"], [
        isSaveSuccessModalOpen
    ]);
    const handleRedirectToContentHome = ()=>{
        setIsSaveSuccessModalOpen(false);
        setSelectedProjectId(""); // Clears selected project so page returns to default state
        navigate("/master-data/content-types");
    };
    // Toast replaced with sonner
    // Find label of active project
    const selectedProjectLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ContentTypesPage.useMemo[selectedProjectLabel]": ()=>{
            const proj = projects.find({
                "ContentTypesPage.useMemo[selectedProjectLabel].proj": (p)=>p.id === selectedProjectId
            }["ContentTypesPage.useMemo[selectedProjectLabel].proj"]);
            return proj ? proj.name : "Select Project";
        }
    }["ContentTypesPage.useMemo[selectedProjectLabel]"], [
        selectedProjectId,
        projects
    ]);
    // Handle Name change
    const handleNameChange = (e)=>{
        setTypeName(e.target.value);
    };
    // Open Modal for adding
    const openAddModal = ()=>{
        setModalMode("add");
        setTypeName("");
        setTypeCode("");
        setEditingTypeId(null);
        setIsModalOpen(true);
    };
    // Open Modal for editing global content type
    const openEditModal = (contentType)=>{
        setModalMode("edit");
        setEditingTypeCode(contentType.code);
        setEditingTypeId(contentType.id);
        setTypeName(contentType.name);
        setTypeCode(contentType.code);
        setIsModalOpen(true);
    };
    // Handle Add/Edit Form Submit
    const handleModalSubmit = async (e)=>{
        e.preventDefault();
        if (!typeName.trim() || !typeCode.trim()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please fill in both fields");
            return;
        }
        const cleanCode = typeCode.trim().toUpperCase();
        try {
            if (modalMode === "add") {
                if (globalContentTypes.some((t)=>t.code === cleanCode)) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(`Content type code "${cleanCode}" already exists.`);
                    return;
                }
                await createContentType({
                    code: cleanCode,
                    description: typeName.trim(),
                    user_id: null
                }).unwrap();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`Content type "${typeName}" added successfully.`);
            } else {
                if (editingTypeId === null) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Invalid content type ID.");
                    return;
                }
                await updateContentType({
                    id: editingTypeId,
                    code: cleanCode,
                    description: typeName.trim(),
                    user_id: null
                }).unwrap();
                setGlobalContentTypes(globalContentTypes.map((t)=>t.code === editingTypeCode ? {
                        ...t,
                        name: typeName.trim(),
                        code: cleanCode
                    } : t));
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Content type updated successfully.");
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
    // Handle Project funnel changes (Add content type to selected project)
    const handleAddTypeToProject = (code)=>{
        if (!tempSelectedCodes.includes(code)) {
            setTempSelectedCodes([
                ...tempSelectedCodes,
                code
            ]);
        }
    };
    // Handle Project funnel changes (Remove content type from selected project)
    const handleRemoveTypeFromProject = (code)=>{
        setTempSelectedCodes(tempSelectedCodes.filter((c)=>c !== code));
    };
    // Save changes to project content types map
    const handleSaveChanges = ()=>{
        if (!selectedProjectId) return;
        setProjectContentTypes({
            ...projectContentTypes,
            [selectedProjectId]: tempSelectedCodes
        });
        setIsSaveSuccessModalOpen(true);
    };
    // Computed data lists
    const displayedContentTypes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ContentTypesPage.useMemo[displayedContentTypes]": ()=>{
            return globalContentTypes.filter({
                "ContentTypesPage.useMemo[displayedContentTypes]": (t)=>t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.code.toLowerCase().includes(searchQuery.toLowerCase())
            }["ContentTypesPage.useMemo[displayedContentTypes]"]);
        }
    }["ContentTypesPage.useMemo[displayedContentTypes]"], [
        globalContentTypes,
        searchQuery
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
                                fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                lineNumber: 213,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Content Types"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: openAddModal,
                        className: "bg-[#002d62] hover:bg-[#063669] text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-sm cursor-pointer flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                lineNumber: 221,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Add Content Type"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                lineNumber: 208,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-3xl p-6 xl:p-8 shadow-sm space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative w-full sm:w-[401px] ml-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    className: "absolute left-[16px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#434653]"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                    lineNumber: 284,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Search Content Types...",
                                    value: searchQuery,
                                    onChange: (e)=>setSearchQuery(e.target.value),
                                    className: "w-full h-[48px] pl-[40px] pr-4 rounded-full border-none bg-[#F2F4F6] dark:bg-zinc-800 text-[14px] font-normal text-[#434653] dark:text-zinc-200 placeholder-[#434653] focus:outline-none focus:ring-1 focus:ring-[#002d62]"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                    lineNumber: 285,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                            lineNumber: 283,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-b border-slate-100 dark:border-zinc-800/80"
                    }, void 0, false, {
                        fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                        lineNumber: 295,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-base font-extrabold text-slate-800 dark:text-zinc-200",
                                children: "Available Content Types"
                            }, void 0, false, {
                                fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                lineNumber: 299,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            displayedContentTypes.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-50/50 dark:bg-zinc-950/20 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-6 text-center text-xs font-bold text-slate-400",
                                children: 'No content types found. Click "Add Content Type" above to create one.'
                            }, void 0, false, {
                                fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                lineNumber: 304,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
                                children: displayedContentTypes.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between bg-[#f4f7f9] dark:bg-zinc-800/60 rounded-2xl p-2 pr-3 shadow-sm transition-colors gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 min-w-0 flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "bg-white dark:bg-zinc-900 text-[#002d62] dark:text-blue-450 text-[10px] font-black px-3 py-2 rounded-xl min-w-[64px] max-w-[100px] text-center uppercase shrink-0 border border-slate-100/50 dark:border-zinc-800 shadow-sm truncate",
                                                        title: type.code,
                                                        children: type.code
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                                        lineNumber: 315,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-xs text-slate-850 dark:text-zinc-150 truncate",
                                                        title: type.name,
                                                        children: type.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                                        lineNumber: 321,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                                lineNumber: 314,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>openEditModal(type),
                                                className: "bg-[#0c1a30] hover:bg-[#1e2f4a] text-white text-[11px] font-extrabold px-4 py-1.5 rounded-lg cursor-pointer transition-colors shrink-0",
                                                children: "Edit"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                                lineNumber: 328,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, type.code, true, {
                                        fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                        lineNumber: 310,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                lineNumber: 308,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                        lineNumber: 298,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                lineNumber: 227,
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
                                    className: "text-base font-extrabold text-[#002d62] dark:text-blue-450",
                                    children: modalMode === "add" ? "Add New Content Type" : "Edit Content Type"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                    lineNumber: 347,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsModalOpen(false),
                                    className: "text-slate-400 hover:text-slate-600 dark:hover:text-zinc-350 cursor-pointer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                        lineNumber: 354,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                    lineNumber: 350,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                            lineNumber: 346,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleModalSubmit,
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-bold text-slate-400 dark:text-zinc-550 tracking-wider uppercase",
                                            children: "ENTER DESCRIPTION"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                            lineNumber: 361,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "Brochures",
                                            value: typeName,
                                            onChange: handleNameChange,
                                            className: "w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 text-xs font-semibold text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#002d62]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                            lineNumber: 364,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                    lineNumber: 360,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-[10px] font-bold text-slate-400 dark:text-zinc-550 tracking-wider uppercase",
                                                    children: "CODE"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                                    lineNumber: 375,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-bold text-slate-400 dark:text-zinc-500",
                                                    children: [
                                                        typeCode.length,
                                                        "/6 characters"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                                    lineNumber: 378,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                            lineNumber: 374,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "BROCHE",
                                            value: typeCode,
                                            maxLength: 6,
                                            onChange: (e)=>setTypeCode(e.target.value),
                                            disabled: modalMode === "edit",
                                            className: "w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-slate-50/80 dark:bg-zinc-950/60 text-xs font-semibold text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#002d62] disabled:opacity-60 disabled:cursor-not-allowed uppercase"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                            lineNumber: 382,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                    lineNumber: 373,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-end gap-3 pt-4 border-t border-slate-50 dark:border-zinc-850",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setIsModalOpen(false),
                                            className: "px-5 py-2.5 text-xs font-extrabold text-slate-550 dark:text-zinc-450 hover:text-slate-750 cursor-pointer",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                            lineNumber: 395,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "bg-[#002d62] hover:bg-[#063669] text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer",
                                            children: modalMode === "add" ? "Add Content Type" : "Update Content Type"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                            lineNumber: 402,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                    lineNumber: 394,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                            lineNumber: 359,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                    lineNumber: 344,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                lineNumber: 343,
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
                                        fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                        lineNumber: 421,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-[#34d399] border-2 border-white dark:border-zinc-900 -translate-y-1/3 translate-x-1/3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                        lineNumber: 424,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute bottom-2 left-0 w-1.5 h-1.5 rounded-full bg-[#34d399] -translate-x-2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                        lineNumber: 425,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                lineNumber: 420,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                            lineNumber: 419,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-extrabold text-[#002d62] dark:text-zinc-150 tracking-tight px-4",
                            children: "Changes Saved Successfully"
                        }, void 0, false, {
                            fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                            lineNumber: 430,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11px] text-slate-450 dark:text-zinc-550 font-medium leading-relaxed max-w-[280px] mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-extrabold text-slate-700 dark:text-zinc-350",
                                    children: "Content Types"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                    lineNumber: 436,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "italic text-slate-450 dark:text-zinc-500",
                                    children: "Changes have been securely applied to"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                    lineNumber: 437,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-extrabold text-slate-700 dark:text-zinc-350",
                                    children: selectedProjectLabel
                                }, void 0, false, {
                                    fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                    lineNumber: 438,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                ".",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "italic text-slate-450 dark:text-zinc-500",
                                    children: "You'll be redirected to Home Page in just a moment."
                                }, void 0, false, {
                                    fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                    lineNumber: 439,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                            lineNumber: 435,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center w-full pt-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleRedirectToContentHome,
                                className: "bg-[#1a365d] hover:bg-[#2a4365] text-white text-xs font-black tracking-wider py-3.5 px-8 rounded-full transition-colors cursor-pointer w-full max-w-[240px] shadow-sm uppercase",
                                children: "Return to Home"
                            }, void 0, false, {
                                fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                                lineNumber: 444,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                            lineNumber: 443,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                    lineNumber: 417,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
                lineNumber: 416,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/master-data/pages/ContentTypesPage.tsx",
        lineNumber: 206,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ContentTypesPage, "i/7djvFD/wRbxMqPlJkXAAbV960=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$api$2f$manageMasterDataSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateContentTypeMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$api$2f$manageMasterDataSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateContentTypeMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"]
    ];
});
_c = ContentTypesPage;
var _c;
__turbopack_context__.k.register(_c, "ContentTypesPage");
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

//# sourceMappingURL=src_1669wx3._.js.map