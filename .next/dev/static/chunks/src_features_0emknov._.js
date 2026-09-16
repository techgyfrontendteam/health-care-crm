(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
"[project]/src/features/doctors/api/doctorsApiSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "doctorsApiSlice",
    ()=>doctorsApiSlice,
    "useCreateDoctorMutation",
    ()=>useCreateDoctorMutation,
    "useGetAllDoctorsQuery",
    ()=>useGetAllDoctorsQuery,
    "useGetDoctorByIdQuery",
    ()=>useGetDoctorByIdQuery,
    "useGetDoctorStatsQuery",
    ()=>useGetDoctorStatsQuery,
    "useUpdateDoctorMutation",
    ()=>useUpdateDoctorMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/baseApi.ts [app-client] (ecmascript)");
;
const doctorsApiSlice = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
    endpoints: (builder)=>({
            createDoctor: builder.mutation({
                query: (body)=>({
                        url: '/doctors/createDoctor',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Doctors'
                ]
            }),
            getAllDoctors: builder.query({
                query: (body)=>({
                        url: '/doctors/getAllDoctors',
                        method: 'POST',
                        body
                    }),
                providesTags: [
                    'Doctors'
                ]
            }),
            getDoctorById: builder.query({
                query: (body)=>({
                        url: '/doctors/getDoctorById',
                        method: 'POST',
                        body
                    }),
                providesTags: [
                    'Doctors'
                ]
            }),
            updateDoctor: builder.mutation({
                query: (body)=>({
                        url: '/doctors/updateDoctor',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Doctors'
                ]
            }),
            getDoctorStats: builder.query({
                query: (body)=>({
                        url: '/doctors/getDoctorStats',
                        method: 'POST',
                        body
                    }),
                providesTags: [
                    'Doctors'
                ]
            })
        })
});
const { useCreateDoctorMutation, useGetAllDoctorsQuery, useGetDoctorByIdQuery, useUpdateDoctorMutation, useGetDoctorStatsQuery } = doctorsApiSlice;
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
    "useGetLeadProjectScoresByLeadQuery",
    ()=>useGetLeadProjectScoresByLeadQuery,
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
            getLeadProjectScoresByLead: builder.query({
                query: (body)=>({
                        url: "/leads/project-scores/get-by-lead",
                        method: "POST",
                        body
                    }),
                providesTags: [
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
const { useGetLeadsQuery, useGetLeadByIdQuery, useGetLeadObjectionDetailsAndChecklistQuery, useGetLeadDetailsByLeadUuidQuery, useUpdateLeadObjectionsMutation, useGetLeadDetailsByPhoneNumberQuery, useGetEmLeadsByRmIdQuery, useGetLeadStatsByUserIdQuery, useGetLeadsAndObjectionsByCustomerIdQuery, useCreateLeadMutation, useUpdateLeadMutation, useBulkAssignLeadsToRmMutation, useBulkAssignLeadsToEmMutation, useDeleteLeadMutation, useScheduleVisitMutation, useGetLeadsByCustomerUuidQuery, useGetLeadsByRmIdQuery, useGetLeadsByEmIdQuery, useAddLeadActivityMutation, useSendWhatsappMessageNotificationMutation, useSendCallSummaryCompleteNotificationMutation, useCreateLeadNextBestActionsMutation, useCreateLeadConsolidatedCallSummaryMutation, useCreateLeadProjectScoreMutation, useUpdateLeadProjectScoreMutation, useDeleteLeadProjectScoreByIdMutation, useDeleteLeadProjectScoresByLeadMutation, useGetLeadProjectScoresByLeadQuery, useGetVisitsByUserIdQuery, useBulkImportLeadsMutation, useLazyGetLeadByIdQuery, useLazyGetLeadsQuery, useGetAllProjectEmAndRmDataQuery, useCreateSurgeryMutation, useUpdateSurgeryMutation, useGetSurgeriesByLeadUuidQuery, useLazyGetSurgeriesByLeadUuidQuery } = leadsApi;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/components/BulkActionsBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BulkActionsBar",
    ()=>BulkActionsBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-user-round.js [app-client] (ecmascript) <export default as UserCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/command.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/hooks/usePermissions.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
const InitialsAvatar = ({ name })=>{
    const parts = name.split(' ');
    const initials = `${parts[0]?.[0] || ''}${parts[1]?.[0] || ''}`.toUpperCase();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-6 w-6 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-600 shrink-0 uppercase",
        children: initials
    }, void 0, false, {
        fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = InitialsAvatar;
const BulkActionsBar = ({ selectedCount, rms, ems, onAssignRm, onAssignEm, onMarkAsJunk: _onMarkAsJunk, onCancel, isLoading: _isLoading, showAssignRm = true, showAssignEm = false })=>{
    _s();
    const [rmOpen, setRmOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [emOpen, setEmOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const { currentRole } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"])();
    const roleCode = currentRole?.code || '';
    const assignLabel = roleCode === 'SADMIN' || roleCode === 'ADMIN' ? 'Assign Sales Executive' : 'Assign RM';
    if (selectedCount === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white dark:bg-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-full border border-zinc-200 dark:border-zinc-800 px-6 py-3 flex items-center gap-6 min-w-max",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 pr-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-8 w-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-white shadow-sm shadow-primary/20",
                            children: selectedCount
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-bold text-primary whitespace-nowrap",
                            children: "Leads Selected"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-4 w-px bg-zinc-200 dark:bg-zinc-800"
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        showAssignRm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                            open: rmOpen,
                            onOpenChange: setRmOpen,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                                    asChild: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "sm",
                                        className: "h-10 rounded-xl px-4 text-xs font-bold border-primary/20 text-primary hover:bg-primary/5 transition-all gap-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCircle2$3e$__["UserCircle2"], {
                                                className: "h-4 w-4 shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                                lineNumber: 87,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: assignLabel
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                                lineNumber: 88,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                        lineNumber: 82,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                                    className: "w-56 p-0",
                                    align: "center",
                                    side: "top",
                                    sideOffset: 16,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandInput"], {
                                                placeholder: "Search RM...",
                                                className: "h-9 text-xs"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                                lineNumber: 93,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandEmpty"], {
                                                className: "py-3 text-xs text-center text-zinc-400",
                                                children: "No RM found"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                                lineNumber: 94,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandGroup"], {
                                                className: "max-h-48 overflow-y-auto p-1.5",
                                                children: rms.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandItem"], {
                                                        onSelect: ()=>{
                                                            onAssignRm(m.id);
                                                            setRmOpen(false);
                                                        },
                                                        className: "flex items-center gap-2.5 py-2.5 px-3 cursor-pointer rounded-md",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InitialsAvatar, {
                                                                name: `${m.first_name} ${m.last_name}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                                                lineNumber: 105,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-medium",
                                                                children: [
                                                                    m.first_name,
                                                                    " ",
                                                                    m.last_name
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                                                lineNumber: 106,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, m.id, true, {
                                                        fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                                        lineNumber: 97,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                                lineNumber: 95,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                        lineNumber: 92,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                    lineNumber: 91,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        showAssignEm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                            open: emOpen,
                            onOpenChange: setEmOpen,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                                    asChild: true,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "sm",
                                        className: "h-10 rounded-xl px-4 text-xs font-bold border-primary/20 text-primary hover:bg-primary/5 transition-all gap-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                className: "h-4 w-4 shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                                lineNumber: 124,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Assign EM"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                                lineNumber: 125,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                        lineNumber: 119,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                    lineNumber: 118,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                                    className: "w-56 p-0",
                                    align: "center",
                                    side: "top",
                                    sideOffset: 16,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandInput"], {
                                                placeholder: "Search EM...",
                                                className: "h-9 text-xs"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                                lineNumber: 130,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandEmpty"], {
                                                className: "py-3 text-xs text-center text-zinc-400",
                                                children: "No EM found"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                                lineNumber: 131,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandGroup"], {
                                                className: "max-h-48 overflow-y-auto p-1.5",
                                                children: ems.map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandItem"], {
                                                        onSelect: ()=>{
                                                            onAssignEm(e.id);
                                                            setEmOpen(false);
                                                        },
                                                        className: "flex items-center gap-2.5 py-2.5 px-3 cursor-pointer rounded-md",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InitialsAvatar, {
                                                                name: `${e.first_name} ${e.last_name}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                                                lineNumber: 142,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-medium",
                                                                children: [
                                                                    e.first_name,
                                                                    " ",
                                                                    e.last_name
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                                                lineNumber: 143,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, e.id, true, {
                                                        fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                                        lineNumber: 134,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                                lineNumber: 132,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                        lineNumber: 129,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                            lineNumber: 117,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-4 w-px bg-zinc-200 dark:bg-zinc-800"
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                    lineNumber: 154,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "icon",
                        onClick: onCancel,
                        className: "h-8 w-8 rounded-full text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-all",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "h-5 w-5"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                            lineNumber: 164,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                        lineNumber: 158,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
            lineNumber: 63,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/leads/components/BulkActionsBar.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(BulkActionsBar, "aVg0OJ+Ox9bsMYVb6FWxJJKZN0Q=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"]
    ];
});
_c1 = BulkActionsBar;
var _c, _c1;
__turbopack_context__.k.register(_c, "InitialsAvatar");
__turbopack_context__.k.register(_c1, "BulkActionsBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/components/BulkImportDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BulkImportDialog",
    ()=>BulkImportDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadCloud$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cloud-upload.js [app-client] (ecmascript) <export default as UploadCloud>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-spreadsheet.js [app-client] (ecmascript) <export default as FileSpreadsheet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$s3ApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/s3ApiSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/api/leadsApi.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
const BulkImportDialog = ({ open, onClose, projectOptions, onImportComplete })=>{
    _s();
    const [uploadFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$s3ApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUploadFileMutation"])();
    const [bulkImportLeads] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBulkImportLeadsMutation"])();
    const [selectedProjectId, setSelectedProjectId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [dragActive, setDragActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [importSummary, setImportSummary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    if (!open) return null;
    // Handle Drag Events
    const handleDrag = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };
    // Handle Drop Event
    const handleDrop = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            validateAndSetFile(droppedFile);
        }
    };
    // Handle File Input Selection
    const handleFileChange = (e)=>{
        if (e.target.files && e.target.files[0]) {
            validateAndSetFile(e.target.files[0]);
        }
    };
    // Validate File Format
    const validateAndSetFile = (selectedFile)=>{
        setErrorMessage(null);
        const extension = selectedFile.name.split(".").pop()?.toLowerCase();
        if (extension !== "csv") {
            const msg = "Invalid file type. Only CSV (.csv) files are supported.";
            setErrorMessage(msg);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(msg);
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            return;
        }
        if (selectedFile.size === 0) {
            const msg = "The selected CSV file is empty.";
            setErrorMessage(msg);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(msg);
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            return;
        }
        if (selectedFile.size > 10 * 1024 * 1024) {
            const msg = "File size exceeds 10MB limit. Please upload a smaller CSV file.";
            setErrorMessage(msg);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(msg);
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            return;
        }
        setFile(selectedFile);
        setErrorMessage(null);
        setImportSummary(null);
    };
    // Remove Selected File
    const handleRemoveFile = ()=>{
        setFile(null);
        setErrorMessage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setImportSummary(null);
    };
    // Trigger File Input Click
    const onButtonClick = ()=>{
        fileInputRef.current?.click();
    };
    // Generate and Download CSV Template
    const downloadTemplate = ()=>{
        const headers = [
            "first_name",
            "last_name",
            "phone_number",
            "email_address",
            "occupation",
            "address",
            "city",
            "state",
            "country",
            "zip"
        ];
        const sampleRows = [
            [
                "Aarav",
                "Sharma",
                "9876543210",
                "aarav.sharma@example.com",
                "Software Engineer",
                "123 Green Valley Road",
                "Bengaluru",
                "Karnataka",
                "India",
                "560001"
            ],
            [
                "Dia",
                "Patel",
                "9123456789",
                "dia.patel@example.com",
                "Business Analyst",
                "456 Sunrise Apartments",
                "Mumbai",
                "Maharashtra",
                "India",
                "400001"
            ]
        ];
        const csvContent = [
            headers.join(","),
            ...sampleRows.map((row)=>row.map((val)=>`"${val}"`).join(","))
        ].join("\n");
        const blob = new Blob([
            csvContent
        ], {
            type: "text/csv;charset=utf-8;"
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "lead_bulk_import_template.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("CSV template downloaded!");
    };
    // Handle Import Submit
    const handleImport = async (e)=>{
        e.preventDefault();
        // if (!selectedProjectId) {
        //   toast.error("Please select a target Project.");
        //   return;
        // }
        if (!file) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please upload a file.");
            return;
        }
        setUploading(true);
        setProgress(10);
        // Simulate progress bar increase during upload
        const interval = setInterval(()=>{
            setProgress((prev)=>{
                if (prev >= 90) {
                    return 90;
                }
                return prev + Math.floor(Math.random() * 10) + 5;
            });
        }, 200);
        try {
            // 1. Send file to S3 bucket
            const cleanFilename = file.name.trim().replace(/\s+/g, '_');
            const key = `leads-bulk-import/${selectedProjectId}/${Date.now()}_${cleanFilename}`;
            const formData = new FormData();
            formData.append('file', file);
            formData.append('key', key);
            const uploadResult = await uploadFile(formData).unwrap();
            const finalS3Key = uploadResult.key || key;
            // 2. Send s3_key to backend bulk import API
            const importResult = await bulkImportLeads({
                s3_key: finalS3Key
            }).unwrap();
            clearInterval(interval);
            setProgress(100);
            setTimeout(()=>{
                setUploading(false);
                const totalRows = importResult.total_records ?? importResult.total ?? importResult.affectedRows ?? importResult.count ?? "0";
                const importedRows = importResult.success_count ?? importResult.imported ?? importResult.affectedRows ?? "0";
                const failedRows = importResult.skipped_count ?? importResult.failed ?? importResult.error_count ?? 0;
                setImportSummary({
                    success: true,
                    total: totalRows,
                    imported: importedRows,
                    failed: failedRows,
                    message: importResult.message
                });
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(importResult.message || "Successfully imported leads!");
                // 3. Reload leads
                onImportComplete();
            }, 300);
        } catch (err) {
            clearInterval(interval);
            setUploading(false);
            setProgress(0);
            const errorMsg = err?.data?.message || err?.data?.error || err?.message || "Failed to import leads. Please try again.";
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorMsg);
        }
    };
    // Reset and Close
    const handleDone = ()=>{
        setSelectedProjectId("");
        setFile(null);
        setImportSummary(null);
        setProgress(0);
        onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white dark:bg-zinc-950 w-full max-w-xl rounded-3xl shadow-2xl border border-zinc-150/80 dark:border-zinc-800 flex flex-col max-h-[85vh] relative overflow-hidden animate-in fade-in zoom-in-95 duration-200",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-5 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-900/30",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-black text-[#002d62] dark:text-zinc-100 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__["FileSpreadsheet"], {
                                            className: "w-5.5 h-5.5 text-blue-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                            lineNumber: 266,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        "Bulk Import Leads"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                    lineNumber: 265,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold text-slate-500 mt-0.5",
                                    children: "Upload CSV file to create multiple leads simultaneously."
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                    lineNumber: 269,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                            lineNumber: 264,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-650 transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                lineNumber: 277,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                            lineNumber: 273,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                    lineNumber: 263,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar",
                    children: !importSummary ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        id: "bulk-import-form",
                        onSubmit: handleImport,
                        className: "space-y-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/30 rounded-2xl flex items-center justify-between gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-0.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-xs font-extrabold text-blue-900 dark:text-blue-350",
                                                children: "Need a CSV Template?"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                lineNumber: 316,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] font-semibold text-blue-700/80 dark:text-blue-400/80",
                                                children: "Use our pre-formatted template to ensure matching headers."
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                lineNumber: 319,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                        lineNumber: 315,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: "outline",
                                        size: "sm",
                                        onClick: downloadTemplate,
                                        disabled: uploading,
                                        className: "gap-1.5 h-9 rounded-xl border-blue-200 dark:border-blue-900 text-xs font-bold text-blue-750 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-950/50 cursor-pointer shadow-xs shrink-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                lineNumber: 331,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Template"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                        lineNumber: 323,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                lineNumber: 314,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "text-xs font-bold text-slate-600 dark:text-zinc-350",
                                        children: [
                                            "Upload CSV File ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-500",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                lineNumber: 339,
                                                columnNumber: 35
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                        lineNumber: 338,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        ref: fileInputRef,
                                        type: "file",
                                        id: "csv-file-upload",
                                        className: "hidden",
                                        accept: ".csv",
                                        onChange: handleFileChange,
                                        disabled: uploading
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                        lineNumber: 342,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    !file ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onDragEnter: handleDrag,
                                        onDragOver: handleDrag,
                                        onDragLeave: handleDrag,
                                        onDrop: handleDrop,
                                        onClick: onButtonClick,
                                        className: `border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ${dragActive ? "border-blue-500 bg-blue-50/30 dark:bg-blue-950/10" : "border-slate-200 dark:border-zinc-800 hover:border-slate-350 hover:bg-slate-50/40 dark:hover:bg-zinc-900/40"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-12 h-12 rounded-full bg-slate-50 dark:bg-zinc-900 flex items-center justify-center shadow-inner mb-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadCloud$3e$__["UploadCloud"], {
                                                    className: "w-6 h-6 text-slate-450 dark:text-zinc-550"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                    lineNumber: 365,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                lineNumber: 364,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs font-bold text-slate-700 dark:text-zinc-300",
                                                children: [
                                                    "Drag & drop your file here, or ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-blue-600 hover:underline",
                                                        children: "browse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                        lineNumber: 368,
                                                        columnNumber: 54
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                lineNumber: 367,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] font-semibold text-slate-400 mt-1",
                                                children: "Supports CSV up to 10MB"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                lineNumber: 370,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                        lineNumber: 353,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border border-slate-200 dark:border-zinc-800 rounded-3xl p-4 bg-slate-50/40 dark:bg-zinc-900/30 flex items-center justify-between gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 truncate",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center shrink-0",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__["FileSpreadsheet"], {
                                                            className: "w-5 h-5 text-blue-600 dark:text-blue-450"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                            lineNumber: 378,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                        lineNumber: 377,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "truncate",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs font-extrabold text-slate-700 dark:text-zinc-200 truncate",
                                                                children: file.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                                lineNumber: 381,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[10px] font-semibold text-slate-400 mt-0.5",
                                                                children: [
                                                                    (file.size / 1024).toFixed(1),
                                                                    " KB"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                                lineNumber: 384,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                        lineNumber: 380,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                lineNumber: 376,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            !uploading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: handleRemoveFile,
                                                className: "p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors shrink-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                    lineNumber: 395,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                lineNumber: 390,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                        lineNumber: 375,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                lineNumber: 337,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl flex items-center gap-2.5 text-xs font-bold text-red-600 dark:text-red-400 animate-in fade-in duration-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                        className: "w-4 h-4 shrink-0 text-red-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                        lineNumber: 405,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: errorMessage
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                        lineNumber: 406,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                lineNumber: 404,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            uploading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 p-4 border border-zinc-100 dark:border-zinc-850 bg-slate-50/30 dark:bg-zinc-900/20 rounded-2xl animate-in fade-in duration-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between text-xs font-bold text-slate-600 dark:text-zinc-350",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        className: "w-3.5 h-3.5 animate-spin text-blue-650"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                        lineNumber: 415,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Uploading and parsing leads..."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                lineNumber: 414,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    progress,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                lineNumber: 418,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                        lineNumber: 413,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full bg-slate-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-blue-650 h-full rounded-full transition-all duration-150",
                                            style: {
                                                width: `${progress}%`
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                            lineNumber: 421,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                        lineNumber: 420,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                lineNumber: 412,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                        lineNumber: 284,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /* Summary View */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-6 flex flex-col items-center text-center space-y-5 animate-in fade-in zoom-in-98 duration-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shadow-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                    className: "w-10 h-10 text-emerald-600"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                    lineNumber: 433,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                lineNumber: 432,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-black text-slate-800 dark:text-zinc-100",
                                        children: "Import Process Completed!"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                        lineNumber: 436,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-semibold text-slate-550 max-w-sm",
                                        children: importSummary.message || "Leads have been successfully parsed and appended to your active leads queue."
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                        lineNumber: 439,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                lineNumber: 435,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-3 gap-4 w-full max-w-md pt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-slate-50/50 dark:bg-zinc-900/30 border border-slate-100 dark:border-zinc-850 rounded-2xl p-4 flex flex-col items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-bold text-slate-450 dark:text-zinc-500 uppercase tracking-wider",
                                                children: "Total Rows"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                lineNumber: 447,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl font-black text-slate-800 dark:text-zinc-150 mt-1",
                                                children: importSummary.total
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                lineNumber: 450,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                        lineNumber: 446,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-emerald-50/20 dark:bg-emerald-950/10 border border-emerald-100/30 dark:border-emerald-900/20 rounded-2xl p-4 flex flex-col items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-bold text-emerald-650/80 dark:text-emerald-500 uppercase tracking-wider",
                                                children: "Imported"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                lineNumber: 455,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl font-black text-emerald-700 dark:text-emerald-450 mt-1",
                                                children: importSummary.imported
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                lineNumber: 458,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                        lineNumber: 454,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-slate-50/50 dark:bg-zinc-900/30 border border-slate-100 dark:border-zinc-850 rounded-2xl p-4 flex flex-col items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-bold text-slate-450 dark:text-zinc-500 uppercase tracking-wider",
                                                children: "Skipped / Failed"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                lineNumber: 463,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl font-black text-slate-800 dark:text-zinc-150 mt-1",
                                                children: importSummary.failed
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                                lineNumber: 466,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                        lineNumber: 462,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                lineNumber: 445,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                        lineNumber: 431,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                    lineNumber: 282,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/20 flex items-center justify-end gap-3 rounded-b-3xl shrink-0",
                    children: !importSummary ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: onClose,
                                disabled: uploading,
                                className: "rounded-xl border-zinc-200 dark:border-zinc-800 font-bold hover:bg-slate-50 cursor-pointer shadow-xs text-xs",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                lineNumber: 479,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "submit",
                                form: "bulk-import-form",
                                disabled: uploading || !file,
                                className: "gap-2 bg-[#063669] hover:bg-[#063669]/90 text-white rounded-xl h-10 px-5 font-bold shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs",
                                children: [
                                    uploading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "w-3.5 h-3.5 animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                        lineNumber: 493,
                                        columnNumber: 31
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Import Leads"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                                lineNumber: 487,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                        lineNumber: 478,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: handleDone,
                        className: "bg-[#063669] hover:bg-[#063669]/90 text-white rounded-xl h-10 px-6 font-bold shadow-sm cursor-pointer text-xs",
                        children: "Done"
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                        lineNumber: 498,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
                    lineNumber: 476,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
            lineNumber: 260,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/leads/components/BulkImportDialog.tsx",
        lineNumber: 259,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(BulkImportDialog, "dsuTyS2bnC5B+gEA4uSfUwt0YMY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$s3ApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUploadFileMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBulkImportLeadsMutation"]
    ];
});
_c = BulkImportDialog;
var _c;
__turbopack_context__.k.register(_c, "BulkImportDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/components/JunkReasonDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JunkReasonDialog",
    ()=>JunkReasonDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const JunkReasonDialog = ({ open, onClose, onConfirm, isLoading, title = "Reason for Marking as Junk", description = "Please provide a valid reason for marking this lead as junk." })=>{
    _s();
    const [reason, setReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const handleConfirm = ()=>{
        if (reason.trim()) {
            onConfirm(reason.trim());
            setReason("");
        }
    };
    const handleClose = ()=>{
        setReason("");
        onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: handleClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "sm:max-w-[420px] max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-950 p-0 border-none rounded-3xl shadow-2xl scrollbar-hide",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-8 space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                        size: 20,
                                        className: "text-[#0f3d6b]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/JunkReasonDialog.tsx",
                                        lineNumber: 49,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                        className: "text-xl font-black text-[#0f3d6b] tracking-tight",
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/JunkReasonDialog.tsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/JunkReasonDialog.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                className: "text-zinc-500 font-medium text-sm",
                                children: description
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/JunkReasonDialog.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/JunkReasonDialog.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                className: "w-full h-24 bg-zinc-50/50 dark:bg-zinc-900 px-4 py-3 rounded-xl border border-zinc-100 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#0f3d6b]/10 focus:border-[#0f3d6b] transition-all resize-none text-zinc-600 dark:text-zinc-300 font-medium text-sm shadow-inner",
                                placeholder: "e.g., Wrong number, Not interested...",
                                value: reason,
                                maxLength: 1000,
                                onChange: (e)=>setReason(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/JunkReasonDialog.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-right text-xs text-zinc-400",
                                children: [
                                    reason.length,
                                    "/1000"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/JunkReasonDialog.tsx",
                                lineNumber: 65,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/JunkReasonDialog.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end gap-3 pt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                variant: "outline",
                                onClick: handleClose,
                                className: "px-6 h-[52px] text-sm font-bold text-zinc-500 border border-zinc-300 dark:border-zinc-700 rounded-xl hover:bg-zinc-50 transition-all",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/JunkReasonDialog.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                onClick: handleConfirm,
                                disabled: !reason.trim() || isLoading,
                                className: "px-8 h-[52px] text-sm bg-[#0f3d6b] hover:bg-[#0c3156] text-white rounded-xl font-bold shadow-md transition-all active:scale-95 disabled:opacity-50",
                                children: isLoading ? "Updating..." : "Confirm Action"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/JunkReasonDialog.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/JunkReasonDialog.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/leads/components/JunkReasonDialog.tsx",
                lineNumber: 46,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/features/leads/components/JunkReasonDialog.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/leads/components/JunkReasonDialog.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(JunkReasonDialog, "7UEWAMQYLbSJ5KyX+CjY/+uzrYI=");
_c = JunkReasonDialog;
var _c;
__turbopack_context__.k.register(_c, "JunkReasonDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/components/JunkValidationDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JunkValidationDialog",
    ()=>JunkValidationDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/index.ts [app-client] (ecmascript) <locals>");
;
;
;
;
;
const JunkValidationDialog = ({ open, onClose, onConfirm, lead, attemptsCount = 0, minAttemptsRequired = 5, projectLabel = 'PLANET GREEN', isLoading = false, error = null })=>{
    if (!lead) return null;
    const isBlocked = attemptsCount < minAttemptsRequired || !!error;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "w-full max-w-[480px] p-8 rounded-[24px] border-none shadow-2xl flex flex-col items-center text-center gap-6",
            children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "py-8 flex flex-col items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "h-8 w-8 animate-spin text-[#00236F]"
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                        lineNumber: 40,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[14px] font-medium text-[#575E70]",
                        children: "Verifying call attempts..."
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                        lineNumber: 41,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                lineNumber: 39,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    isBlocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-[64px] h-[64px] bg-[#FFF8ED] rounded-full flex items-center justify-center mb-[-8px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                            className: "h-[28px] w-[28px] text-[#F59E0B]",
                            strokeWidth: 2
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                            lineNumber: 48,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                        lineNumber: 47,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-[64px] h-[64px] bg-[#FEF2F2] rounded-full flex items-center justify-center mb-[-8px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                            className: "h-[28px] w-[28px] text-[#D92D20]",
                            strokeWidth: 2
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                            lineNumber: 52,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                        lineNumber: 51,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-[20px] font-bold text-[#191C1E]",
                                children: isBlocked ? 'Action Blocked' : 'Mark Lead as Junk?'
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                                lineNumber: 58,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[14px] leading-[22px] text-[#575E70] font-normal max-w-[280px] mx-auto",
                                children: isBlocked ? `This action requires a minimum of ${minAttemptsRequired} contact attempts before a lead can be marked as junk.` : "Are you sure you want to move this lead to the junk?"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                                lineNumber: 61,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                        lineNumber: 57,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full bg-[#F8FAFC] rounded-[16px] p-5 text-left border border-slate-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-bold text-[#191C1E] text-[16px] leading-none",
                                                children: [
                                                    lead.first_name,
                                                    " ",
                                                    lead.last_name
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                                                lineNumber: 72,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[12px] text-[#575E70] font-normal",
                                                children: [
                                                    "#",
                                                    lead.lead_id || 'LD-9915'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                                                lineNumber: 75,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                                        lineNumber: 71,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-3 py-1.5 bg-[#F0F4F8] text-[#00236F] font-semibold text-[10px] uppercase tracking-wider rounded-full",
                                        children: projectLabel
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                                        lineNumber: 77,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                                lineNumber: 70,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-[1px] w-full bg-slate-200 my-4"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                                lineNumber: 82,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-[24px] h-[24px] rounded-full bg-[#FEF2F2] flex items-center justify-center shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "h-3.5 w-3.5 text-[#D92D20]",
                                            strokeWidth: 3
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                                            lineNumber: 87,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                                        lineNumber: 86,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)) : isBlocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-[24px] h-[24px] rounded-full bg-[#191C1E] flex items-center justify-center shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "h-3.5 w-3.5 text-white",
                                            strokeWidth: 3
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                                            lineNumber: 91,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                                        lineNumber: 90,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-[24px] h-[24px] rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "h-3.5 w-3.5 text-[#16A34A]",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            strokeWidth: 3,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                d: "M5 13l4 4L19 7"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                                                lineNumber: 96,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                                            lineNumber: 95,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                                        lineNumber: 94,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("font-semibold text-[14px]", error ? "text-[#D92D20]" : "text-[#191C1E]"),
                                        children: error ? error : `${attemptsCount} / ${minAttemptsRequired} Attempts Completed`
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                                        lineNumber: 100,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                                lineNumber: 84,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                        lineNumber: 69,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full flex items-center gap-3 mt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                className: "flex-1 rounded-[12px] h-[48px] font-bold text-slate-800 hover:bg-slate-100 hover:text-slate-900 transition-colors",
                                onClick: onClose,
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                                lineNumber: 108,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("flex-1 rounded-full h-[48px] font-bold transition-all shadow-none", isBlocked ? "bg-slate-200 text-white hover:bg-slate-200 cursor-not-allowed opacity-100" : "bg-[#D92D20] hover:bg-[#B42318] text-white"),
                                disabled: isBlocked,
                                onClick: onConfirm,
                                children: "Mark as Junk"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                                lineNumber: 115,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                        lineNumber: 107,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
                lineNumber: 44,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/leads/components/JunkValidationDialog.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = JunkValidationDialog;
var _c;
__turbopack_context__.k.register(_c, "JunkValidationDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/components/LeadActivityDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LeadActivityDialog",
    ()=>LeadActivityDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const LeadActivityDialog = ({ open, onClose, lead, onSubmit, isLoading })=>{
    _s();
    const [remark, setRemark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    if (!open || !lead) return null;
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!remark.trim()) return;
        await onSubmit({
            lead_uuid: lead.uuid,
            remark: remark,
            activity_type: "REMARK_ADDED"
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white dark:bg-zinc-950 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-zinc-200 dark:border-zinc-800",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold text-zinc-900 dark:text-zinc-100",
                                    children: "Add Lead Activity"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/LeadActivityDialog.tsx",
                                    lineNumber: 42,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-zinc-500 mt-1",
                                    children: [
                                        "Record a new activity for ",
                                        lead.first_name,
                                        " ",
                                        lead.last_name
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/components/LeadActivityDialog.tsx",
                                    lineNumber: 45,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/LeadActivityDialog.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-5 w-5 text-zinc-500"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/LeadActivityDialog.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/LeadActivityDialog.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/LeadActivityDialog.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "p-6 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "activity_remark",
                                    className: "text-sm font-semibold",
                                    children: "Activity Remark"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/LeadActivityDialog.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    id: "activity_remark",
                                    placeholder: "Type lead activity here...",
                                    value: remark,
                                    onChange: (e)=>setRemark(e.target.value),
                                    disabled: isLoading,
                                    required: true,
                                    className: "flex w-full rounded-xl border border-zinc-200 bg-zinc-50/50 dark:bg-zinc-900/50 px-4 py-3 text-sm shadow-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 h-40 resize-none transition-all"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/LeadActivityDialog.tsx",
                                    lineNumber: 62,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/LeadActivityDialog.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-end gap-3 pt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "button",
                                    variant: "ghost",
                                    onClick: onClose,
                                    disabled: isLoading,
                                    className: "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/LeadActivityDialog.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "submit",
                                    disabled: isLoading || !remark.trim(),
                                    className: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 px-8 py-2 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-70",
                                    children: [
                                        isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "mr-2 h-4 w-4 animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/LeadActivityDialog.tsx",
                                            lineNumber: 88,
                                            columnNumber: 29
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        "Submit"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/components/LeadActivityDialog.tsx",
                                    lineNumber: 83,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/LeadActivityDialog.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/LeadActivityDialog.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/leads/components/LeadActivityDialog.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/leads/components/LeadActivityDialog.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LeadActivityDialog, "8rwYE8TiB/ntvlNUDla6J8kAG60=");
_c = LeadActivityDialog;
var _c;
__turbopack_context__.k.register(_c, "LeadActivityDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/components/LeadForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LeadForm",
    ()=>LeadForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hookform/resolvers/zod/dist/zod.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/schemas.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/command.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-list.js [app-client] (ecmascript) <export default as ClipboardList>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsUpDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevrons-up-down.js [app-client] (ecmascript) <export default as ChevronsUpDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/stethoscope.js [app-client] (ecmascript) <export default as Stethoscope>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/shared/components/DateTimePicker/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$DatePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/DateTimePicker/DatePicker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$TimePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/DateTimePicker/TimePicker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/users/api/usersApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/hooks/usePermissions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master/api/masterApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$doctors$2f$api$2f$doctorsApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/doctors/api/doctorsApiSlice.ts [app-client] (ecmascript)");
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
;
;
;
const formSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["object"]({
    first_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().min(1, 'First name is required').max(30, 'First name must be less than 30 characters'),
    last_name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().max(30, 'Last name must be less than 30 characters').optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["literal"]('')),
    phone_number: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().min(1, 'Mobile number is required').regex(/^[0-9]\d{9}$/, 'Phone Number Should be 10 digits'),
    email_address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().min(1, 'Email is required').email('Please enter a valid email address'),
    source_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"]({
        error: 'Source is required'
    }).optional(),
    source_employee_user_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"]({
        error: 'Invalid employee selection'
    }).nullable().optional(),
    project_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"]({
        error: 'Project is required'
    }).nullable().optional(),
    location_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"]({
        error: 'Location is required'
    }).min(1, 'Location is required'),
    branch_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"]({
        error: 'Branch is required'
    }).nullable().optional(),
    department: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["literal"]('')),
    doctor_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"]().nullable().optional(),
    appointment_date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["literal"]('')),
    appointment_time: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["literal"]('')),
    appointment_note: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["literal"]('')),
    assigned_to_rm: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"]({
        error: 'Invalid RM selection'
    }).nullable().optional(),
    assigned_to_em: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"]({
        error: 'Invalid EM selection'
    }).nullable().optional(),
    occupation: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().max(50, 'Occupation cannot exceed 50 characters').optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["literal"]('')),
    address: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().max(100, 'Address cannot exceed 100 characters').optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["literal"]('')),
    city: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().max(50, 'City cannot exceed 50 characters').optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["literal"]('')),
    state: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().max(50, 'State cannot exceed 50 characters').optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["literal"]('')),
    state_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"]({
        error: 'Invalid state selection'
    }).optional(),
    country: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().max(50, 'Country cannot exceed 50 characters').optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["literal"]('')),
    zip: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().max(50, 'Zip cannot exceed 50 characters').optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["literal"]('')),
    dob: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["literal"]('')),
    income: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"]({
        error: 'Income must be a number'
    }).optional()
});
const LeadForm = ({ onSubmit, isLoading, initialValues, isEdit = false })=>{
    _s();
    const { user: currentUser, roleCode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"])();
    const isEM = roleCode === 'EXPMNG';
    const { data: masterData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllMasterDataQuery"])();
    const availableProjects = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadForm.useMemo[availableProjects]": ()=>{
            if (!masterData?.projects) return [];
            const userProjectIds = currentUser?.project_ids || [];
            const isSADMIN = roleCode === 'SADMIN';
            return isSADMIN && userProjectIds.length === 0 ? masterData.projects : masterData.projects.filter({
                "LeadForm.useMemo[availableProjects]": (p)=>userProjectIds.includes(p.id)
            }["LeadForm.useMemo[availableProjects]"]);
        }
    }["LeadForm.useMemo[availableProjects]"], [
        masterData?.projects,
        currentUser?.project_ids,
        roleCode
    ]);
    const { data: allUsers = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersQuery"])({
        offset: 0
    });
    const { data: managers = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersByRoleIdQuery"])({
        role_id: 3,
        offset: 0
    });
    const [isSourceEmployeeOpen, setIsSourceEmployeeOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [isRmOpen, setIsRmOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    const [isEmOpen, setIsEmOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(false);
    // Helper to extract clean initial form values
    const getMappedInitialValues = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "LeadForm.useCallback[getMappedInitialValues]": (init)=>{
            if (!init) {
                return {
                    first_name: '',
                    last_name: '',
                    phone_number: '',
                    email_address: '',
                    source_id: undefined,
                    source_employee_user_id: isEdit ? null : currentUser?.id ? Number(currentUser.id) : null,
                    project_id: availableProjects.length === 1 ? availableProjects[0].id : undefined,
                    location_id: 0,
                    branch_id: null,
                    department: '',
                    doctor_id: null,
                    appointment_date: '',
                    appointment_time: '',
                    appointment_note: '',
                    assigned_to_rm: null,
                    assigned_to_em: null,
                    occupation: '',
                    address: '',
                    city: '',
                    state: '',
                    state_id: undefined,
                    country: '',
                    zip: '',
                    dob: '',
                    income: undefined
                };
            }
            // 1. Resolve Location & Branch
            let resolvedBranchId = init.branch_id || null;
            if (!resolvedBranchId && (init.hospital_branch || init.branch || init.branch_name) && masterData?.branches) {
                const bName = init.hospital_branch || init.branch || init.branch_name;
                const foundBranch = masterData.branches.find({
                    "LeadForm.useCallback[getMappedInitialValues].foundBranch": (b)=>b.description?.toLowerCase() === String(bName).toLowerCase() || b.code?.toLowerCase() === String(bName).toLowerCase()
                }["LeadForm.useCallback[getMappedInitialValues].foundBranch"]);
                if (foundBranch) resolvedBranchId = foundBranch.id;
            }
            let resolvedLocationId = init.location_id || null;
            if (!resolvedLocationId && resolvedBranchId && masterData?.branches) {
                const bObj = masterData.branches.find({
                    "LeadForm.useCallback[getMappedInitialValues].bObj": (b)=>b.id === resolvedBranchId
                }["LeadForm.useCallback[getMappedInitialValues].bObj"]);
                if (bObj) resolvedLocationId = bObj.location_id;
            }
            // 2. Resolve Department / Specialisation
            let resolvedDept = "";
            if (init.specialisation_id) {
                resolvedDept = String(init.specialisation_id);
            } else if (init.specialization_id) {
                resolvedDept = String(init.specialization_id);
            } else if (init.department || init.specialization) {
                const dName = init.department || init.specialization;
                const foundSpec = masterData?.specialisations?.find({
                    "LeadForm.useCallback[getMappedInitialValues]": (s)=>s.description?.toLowerCase() === String(dName).toLowerCase() || s.code?.toLowerCase() === String(dName).toLowerCase()
                }["LeadForm.useCallback[getMappedInitialValues]"]);
                resolvedDept = foundSpec ? String(foundSpec.id) : String(dName);
            }
            // 3. Resolve Doctor
            let resolvedDoctorId = init.doctor_id || null;
            if (!resolvedDoctorId && init.visits && Array.isArray(init.visits) && init.visits.length > 0 && init.visits[0].doctor_id) {
                resolvedDoctorId = init.visits[0].doctor_id;
            }
            // 4. Resolve Date & Time
            let resolvedDate = init.appointment_date || "";
            let resolvedTime = init.appointment_time || "";
            if (!resolvedDate || !resolvedTime) {
                const candidateDateTime = init.appointment_date_time || init.visit_date_time || init.visits && Array.isArray(init.visits) && init.visits[0]?.visit_date_time || init.appointment_date;
                if (candidateDateTime) {
                    try {
                        const cleanStr = String(candidateDateTime).replace(/Z/g, "").split("+")[0].replace(" ", "T");
                        const d = new Date(cleanStr);
                        if (!isNaN(d.getTime())) {
                            if (!resolvedDate) {
                                const yyyy = d.getFullYear();
                                const mm = String(d.getMonth() + 1).padStart(2, "0");
                                const dd = String(d.getDate()).padStart(2, "0");
                                resolvedDate = `${yyyy}-${mm}-${dd}`;
                            }
                            if (!resolvedTime) {
                                let h = d.getHours();
                                const m = String(d.getMinutes()).padStart(2, "0");
                                const p = h >= 12 ? "PM" : "AM";
                                h = h % 12 || 12;
                                resolvedTime = `${String(h).padStart(2, "0")}:${m} ${p}`;
                            }
                        }
                    } catch  {
                    // ignore
                    }
                }
            }
            // 5. Clean Note
            let resolvedNote = init.appointment_note || init.lead_note || init.notes || init.note || "";
            if (resolvedNote && resolvedNote.toLowerCase() === "kukatpally") {
                resolvedNote = "";
            }
            if (resolvedNote && init.address && resolvedNote.trim().toLowerCase() === init.address.trim().toLowerCase()) {
                resolvedNote = "";
            }
            return {
                first_name: init.first_name || "",
                last_name: init.last_name || "",
                phone_number: init.phone_number || "",
                email_address: init.email_address || init.email || "",
                source_id: init.source_id || undefined,
                source_employee_user_id: init.source_employee_user_id || (isEdit ? null : currentUser?.id ? Number(currentUser.id) : null),
                project_id: init.project_id || (availableProjects.length === 1 ? availableProjects[0].id : undefined),
                location_id: resolvedLocationId,
                branch_id: resolvedBranchId,
                department: resolvedDept,
                doctor_id: resolvedDoctorId,
                appointment_date: resolvedDate,
                appointment_time: resolvedTime,
                appointment_note: resolvedNote,
                assigned_to_rm: init.assigned_to_rm || null,
                assigned_to_em: init.assigned_to_em || null,
                occupation: init.occupation || "",
                address: init.address || "",
                city: init.city || "",
                state: init.state || "",
                state_id: init.state_id || undefined,
                country: init.country || "",
                zip: init.zip || "",
                dob: init.dob ? init.dob.includes("T") ? init.dob.split("T")[0] : init.dob : "",
                income: init.income || undefined
            };
        }
    }["LeadForm.useCallback[getMappedInitialValues]"], [
        masterData?.branches,
        masterData?.specialisations,
        isEdit,
        currentUser?.id,
        availableProjects
    ]);
    const form = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zodResolver"])(formSchema),
        defaultValues: getMappedInitialValues(initialValues)
    });
    // Re-sync form whenever initialValues or masterData changes
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "LeadForm.useEffect": ()=>{
            if (initialValues) {
                const mapped = getMappedInitialValues(initialValues);
                form.reset(mapped);
            }
        }
    }["LeadForm.useEffect"], [
        initialValues,
        getMappedInitialValues,
        form
    ]);
    const selectedProjectId = form.watch('project_id');
    const selectedLocationId = form.watch('location_id');
    const selectedBranchId = form.watch('branch_id');
    const selectedRmId = form.watch('assigned_to_rm');
    const selectedDepartment = form.watch('department');
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "LeadForm.useEffect": ()=>{
            const currentBranchId = form.getValues('branch_id');
            if (selectedLocationId && currentBranchId) {
                const branchExists = masterData?.branches?.some({
                    "LeadForm.useEffect": (b)=>b.id === currentBranchId && b.location_id === selectedLocationId
                }["LeadForm.useEffect"]);
                if (!branchExists) {
                    form.setValue('branch_id', null);
                }
            }
        }
    }["LeadForm.useEffect"], [
        selectedLocationId,
        masterData?.branches,
        form
    ]);
    const filteredBranches = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadForm.useMemo[filteredBranches]": ()=>{
            if (!masterData?.branches || !selectedLocationId) return [];
            return masterData.branches.filter({
                "LeadForm.useMemo[filteredBranches]": (b)=>b.location_id === selectedLocationId
            }["LeadForm.useMemo[filteredBranches]"]);
        }
    }["LeadForm.useMemo[filteredBranches]"], [
        masterData?.branches,
        selectedLocationId
    ]);
    const selectedSpecId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadForm.useMemo[selectedSpecId]": ()=>{
            if (!selectedDepartment) return 0;
            if (!isNaN(Number(selectedDepartment)) && Number(selectedDepartment) > 0) {
                return Number(selectedDepartment);
            }
            const found = masterData?.specialisations?.find({
                "LeadForm.useMemo[selectedSpecId]": (s)=>s.description.toLowerCase() === selectedDepartment.toLowerCase() || s.code.toLowerCase() === selectedDepartment.toLowerCase()
            }["LeadForm.useMemo[selectedSpecId]"]);
            return found ? found.id : 0;
        }
    }["LeadForm.useMemo[selectedSpecId]"], [
        selectedDepartment,
        masterData?.specialisations
    ]);
    const { data: doctorsResp, isLoading: isLoadingDoctors } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$doctors$2f$api$2f$doctorsApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllDoctorsQuery"])({
        branch_id: selectedBranchId ? Number(selectedBranchId) : 0,
        specialization_id: selectedSpecId ? Number(selectedSpecId) : 0
    });
    const doctorsList = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadForm.useMemo[doctorsList]": ()=>{
            return doctorsResp?.data || [];
        }
    }["LeadForm.useMemo[doctorsList]"], [
        doctorsResp
    ]);
    const departmentOptions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadForm.useMemo[departmentOptions]": ()=>{
            if (masterData?.specialisations && masterData.specialisations.length > 0) {
                return masterData.specialisations.map({
                    "LeadForm.useMemo[departmentOptions]": (spec)=>({
                            id: spec.id,
                            value: String(spec.id),
                            label: spec.description
                        })
                }["LeadForm.useMemo[departmentOptions]"]);
            }
            return [
                "OPD",
                "IPD",
                "Cardiology",
                "Neurology",
                "Orthopedics & Joint Replacement",
                "Pediatrics",
                "Oncology",
                "Dermatology & Cosmetology",
                "Gastroenterology",
                "Obstetrics & Gynaecology"
            ].map({
                "LeadForm.useMemo[departmentOptions]": (dept, index)=>({
                        id: index + 1,
                        value: dept,
                        label: dept
                    })
            }["LeadForm.useMemo[departmentOptions]"]);
        }
    }["LeadForm.useMemo[departmentOptions]"], [
        masterData?.specialisations
    ]);
    const filteredManagers = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadForm.useMemo[filteredManagers]": ()=>{
            if (!selectedProjectId) return managers;
            return managers.filter({
                "LeadForm.useMemo[filteredManagers]": (m)=>{
                    if (m.project_id && Number(m.project_id) === Number(selectedProjectId)) return true;
                    if (m.projectId && Number(m.projectId) === Number(selectedProjectId)) return true;
                    if (m.project_ids && m.project_ids.some({
                        "LeadForm.useMemo[filteredManagers]": (id)=>Number(id) === Number(selectedProjectId)
                    }["LeadForm.useMemo[filteredManagers]"])) return true;
                    if (m.projects && Array.isArray(m.projects) && m.projects.some({
                        "LeadForm.useMemo[filteredManagers]": (p)=>Number(p.id) === Number(selectedProjectId)
                    }["LeadForm.useMemo[filteredManagers]"])) return true;
                    if (m.project_users && Array.isArray(m.project_users) && m.project_users.some({
                        "LeadForm.useMemo[filteredManagers]": (p)=>Number(p.project_id) === Number(selectedProjectId)
                    }["LeadForm.useMemo[filteredManagers]"])) return true;
                    return false;
                }
            }["LeadForm.useMemo[filteredManagers]"]);
        }
    }["LeadForm.useMemo[filteredManagers]"], [
        managers,
        selectedProjectId
    ]);
    const { data: reportees = [], isLoading: isLoadingReportees } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetReporteesQuery"])({
        reporting_manager_id: selectedRmId,
        offset: 0
    }, {
        skip: !selectedRmId
    });
    const isFirstRender = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(true);
    const initialRmId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(initialValues?.assigned_to_rm || null);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "LeadForm.useEffect": ()=>{
            if (isFirstRender.current) {
                isFirstRender.current = false;
                return;
            }
            if (selectedRmId !== initialRmId.current) {
                form.setValue('assigned_to_em', null);
                initialRmId.current = -1;
            }
        }
    }["LeadForm.useEffect"], [
        selectedRmId,
        form
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "LeadForm.useEffect": ()=>{
            if (selectedProjectId && selectedRmId) {
                const isStillValid = filteredManagers.some({
                    "LeadForm.useEffect.isStillValid": (m)=>m.id === selectedRmId
                }["LeadForm.useEffect.isStillValid"]);
                if (!isStillValid) {
                    form.setValue('assigned_to_rm', null);
                    form.setValue('assigned_to_em', null);
                }
            }
        }
    }["LeadForm.useEffect"], [
        selectedProjectId,
        filteredManagers,
        selectedRmId,
        form
    ]);
    const handleInternalSubmit = async (values)=>{
        if (!isEdit && !values.source_id) {
            form.setError('source_id', {
                message: 'Source is required'
            });
            return;
        }
        const internalSource = masterData?.sources.find((s)=>s.code === 'INTERNAL' || s.description.toLowerCase().includes('internal'));
        const isInternal = values.source_id === internalSource?.id;
        const matchedSpec = masterData?.specialisations?.find((s)=>String(s.id) === String(values.department) || s.description.toLowerCase() === (values.department || '').toLowerCase());
        const specialisationId = matchedSpec ? matchedSpec.id : selectedSpecId || 1;
        const departmentName = matchedSpec ? matchedSpec.description : values.department || '';
        const payload = {
            ...values,
            project_id: Number(values.project_id || (masterData?.projects?.[0]?.id ?? 1)),
            specialisation_id: specialisationId,
            department: departmentName,
            source_id: Number(values.source_id || initialValues?.source_id || 1),
            first_name: values.first_name || '',
            last_name: values.last_name || '',
            email_address: values.email_address || '',
            source_employee_user_id: isInternal ? values.source_employee_user_id ?? null : null,
            assigned_to_rm: values.assigned_to_rm ?? null,
            assigned_to_em: values.assigned_to_em ?? null,
            lead_status_id: initialValues?.lead_status_id || 1,
            lead_priority_id: initialValues?.lead_priority_id || 1,
            occupation: values.occupation || '',
            address: values.address || '',
            city: values.city || '',
            state: values.state || '',
            country: values.country || '',
            zip: values.zip || '',
            dob: values.dob || '',
            income: values.income || undefined,
            doctor_id: values.doctor_id || null,
            appointment_date: values.appointment_date || '',
            appointment_time: values.appointment_time || '',
            appointment_note: values.appointment_note || ''
        };
        onSubmit(payload);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Form"], {
        ...form,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: form.handleSubmit(handleInternalSubmit),
            className: "flex flex-col h-full overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-6 py-6 space-y-8 bg-zinc-50/30 dark:bg-zinc-950/30",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"], {
                                            className: "h-4 w-4 text-[#063669]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                            lineNumber: 421,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-extrabold text-[#063669] text-base",
                                            children: "Lead Source"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                            lineNumber: 422,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                    lineNumber: 420,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                !isEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                            control: form.control,
                                            name: "source_id",
                                            render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                    className: "space-y-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                            style: {
                                                                fontFamily: 'Inter, sans-serif',
                                                                fontWeight: 600,
                                                                fontSize: '11px',
                                                                lineHeight: '16.5px',
                                                                letterSpacing: '0.55px',
                                                                textTransform: 'uppercase',
                                                                color: '#64748B'
                                                            },
                                                            children: [
                                                                "Source ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-red-500",
                                                                    children: "*"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 433,
                                                                    columnNumber: 32
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 432,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                            onValueChange: (v)=>field.onChange(Number(v)),
                                                            value: field.value ? String(field.value) : "",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                        className: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl h-11 px-4 focus:ring-primary/20 transition-all font-medium",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                            placeholder: "-- Select Source * --"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                            lineNumber: 441,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                        lineNumber: 440,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 439,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                    className: "bg-white text-black z-[99999] max-h-[300px] overflow-y-auto custom-scrollbar",
                                                                    children: masterData?.sources.map((source)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                            value: String(source.id),
                                                                            className: "text-black cursor-pointer font-medium",
                                                                            children: source.description
                                                                        }, source.id, false, {
                                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                            lineNumber: 446,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 444,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 435,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 452,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                    lineNumber: 431,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                            lineNumber: 427,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        (()=>{
                                            const selectedSourceId = form.watch('source_id');
                                            const internalSource = masterData?.sources.find((s)=>s.code === 'INTERNAL' || s.description.toLowerCase().includes('internal'));
                                            return selectedSourceId === internalSource?.id;
                                        })() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                            control: form.control,
                                            name: "source_employee_user_id",
                                            render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                    className: "space-y-1.5 flex flex-col",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                            style: {
                                                                fontFamily: 'Inter, sans-serif',
                                                                fontWeight: 600,
                                                                fontSize: '11px',
                                                                lineHeight: '16.5px',
                                                                letterSpacing: '0.55px',
                                                                textTransform: 'uppercase',
                                                                color: '#64748B'
                                                            },
                                                            children: "Source Employee"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 467,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                                                            open: isSourceEmployeeOpen,
                                                            onOpenChange: setIsSourceEmployeeOpen,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                                                                    asChild: true,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                            type: "button",
                                                                            variant: "outline",
                                                                            role: "combobox",
                                                                            "aria-expanded": isSourceEmployeeOpen,
                                                                            className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl h-11 px-4 focus:ring-primary/20 transition-all font-medium text-sm flex items-center justify-between shadow-none hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 gap-2.5",
                                                                            disabled: isLoading,
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "truncate",
                                                                                    children: field.value ? (()=>{
                                                                                        const u = allUsers.find((user)=>user.id === field.value);
                                                                                        return u ? `${u.first_name || ''} ${u.last_name || ''}` : "Select Employee";
                                                                                    })() : "Select Employee"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                                    lineNumber: 479,
                                                                                    columnNumber: 33
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsUpDown$3e$__["ChevronsUpDown"], {
                                                                                    className: "h-4 w-4 shrink-0 opacity-50 text-zinc-500 ml-1"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                                    lineNumber: 487,
                                                                                    columnNumber: 33
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                            lineNumber: 471,
                                                                            columnNumber: 31
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                        lineNumber: 470,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 469,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                                                                    align: "start",
                                                                    side: "bottom",
                                                                    sideOffset: 6,
                                                                    className: "w-[var(--radix-popover-trigger-width)] p-0 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-2xl z-[99999] bg-white dark:bg-zinc-950 flex flex-col overflow-hidden",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"], {
                                                                        className: "flex-1 flex flex-col overflow-hidden bg-transparent",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandInput"], {
                                                                                placeholder: "Search employees...",
                                                                                className: "h-10 border-none focus:ring-0 text-sm shrink-0"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                                lineNumber: 498,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandList"], {
                                                                                className: "max-h-[300px] overflow-y-auto custom-scrollbar pointer-events-auto",
                                                                                onWheel: (e)=>e.stopPropagation(),
                                                                                onTouchMove: (e)=>e.stopPropagation(),
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandEmpty"], {
                                                                                        className: "py-4 text-xs text-zinc-400 text-center",
                                                                                        children: "No employees found."
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                                        lineNumber: 503,
                                                                                        columnNumber: 33
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandGroup"], {
                                                                                        className: "p-1.5",
                                                                                        children: allUsers.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandItem"], {
                                                                                                value: `${user.first_name || ''} ${user.last_name || ''}`,
                                                                                                onSelect: ()=>{
                                                                                                    field.onChange(user.id);
                                                                                                    setIsSourceEmployeeOpen(false);
                                                                                                },
                                                                                                className: "py-2.5 px-3 cursor-pointer rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors select-none flex items-center gap-2.5 text-sm text-zinc-800 dark:text-zinc-200 data-[selected=true]:bg-zinc-100 dark:data-[selected=true]:bg-zinc-800 data-[selected=true]:text-zinc-950 dark:data-[selected=true]:text-zinc-50",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("h-4 w-4 text-primary shrink-0", user.id === field.value ? "opacity-100" : "opacity-0")
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                                                        lineNumber: 517,
                                                                                                        columnNumber: 39
                                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                        className: "truncate font-semibold",
                                                                                                        children: [
                                                                                                            user.first_name || '',
                                                                                                            " ",
                                                                                                            user.last_name || ''
                                                                                                        ]
                                                                                                    }, void 0, true, {
                                                                                                        fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                                                        lineNumber: 523,
                                                                                                        columnNumber: 39
                                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                                ]
                                                                                            }, user.id, true, {
                                                                                                fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                                                lineNumber: 508,
                                                                                                columnNumber: 37
                                                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                                        lineNumber: 506,
                                                                                        columnNumber: 33
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                                lineNumber: 502,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                        lineNumber: 497,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 491,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 468,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 533,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                    lineNumber: 466,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                            lineNumber: 462,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                    lineNumber: 426,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                            lineNumber: 419,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-5 pt-3 border-t border-zinc-200/60 dark:border-zinc-800",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                            className: "h-4 w-4 text-[#063669]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                            lineNumber: 544,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-extrabold text-[#063669] text-base",
                                            children: "Patient Details"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                            lineNumber: 545,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                    lineNumber: 543,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                            control: form.control,
                                            name: "first_name",
                                            render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                    className: "space-y-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                            style: {
                                                                fontFamily: 'Inter, sans-serif',
                                                                fontWeight: 600,
                                                                fontSize: '11px',
                                                                lineHeight: '16.5px',
                                                                letterSpacing: '0.55px',
                                                                textTransform: 'uppercase',
                                                                color: '#64748B'
                                                            },
                                                            children: [
                                                                "Patient First Name ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-red-500",
                                                                    children: "*"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 555,
                                                                    columnNumber: 42
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 554,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                placeholder: "Patient First Name *",
                                                                ...field,
                                                                disabled: isLoading || isEM,
                                                                maxLength: 30,
                                                                className: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 focus:ring-primary/20 transition-all font-medium placeholder:text-[#94A3B8] placeholder:font-normal placeholder:text-[14px]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                lineNumber: 558,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 557,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 566,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                    lineNumber: 553,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                            lineNumber: 549,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                            control: form.control,
                                            name: "last_name",
                                            render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                    className: "space-y-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                            style: {
                                                                fontFamily: 'Inter, sans-serif',
                                                                fontWeight: 600,
                                                                fontSize: '11px',
                                                                lineHeight: '16.5px',
                                                                letterSpacing: '0.55px',
                                                                textTransform: 'uppercase',
                                                                color: '#64748B'
                                                            },
                                                            children: "Patient Last Name"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 575,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                placeholder: "Patient Last Name",
                                                                ...field,
                                                                disabled: isLoading || isEM,
                                                                maxLength: 30,
                                                                className: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 focus:ring-primary/20 transition-all font-medium placeholder:text-[#94A3B8] placeholder:font-normal placeholder:text-[14px]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                lineNumber: 577,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 576,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 585,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                    lineNumber: 574,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                            lineNumber: 570,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                    lineNumber: 548,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                            control: form.control,
                                            name: "phone_number",
                                            render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                    className: "space-y-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                            style: {
                                                                fontFamily: 'Inter, sans-serif',
                                                                fontWeight: 600,
                                                                fontSize: '11px',
                                                                lineHeight: '16.5px',
                                                                letterSpacing: '0.55px',
                                                                textTransform: 'uppercase',
                                                                color: '#64748B'
                                                            },
                                                            children: [
                                                                "Phone ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-red-500",
                                                                    children: "*"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 597,
                                                                    columnNumber: 210
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 597,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                placeholder: "Phone *",
                                                                ...field,
                                                                disabled: isLoading || isEdit || isEM,
                                                                type: "tel",
                                                                maxLength: 10,
                                                                onChange: (e)=>{
                                                                    const val = e.target.value.replace(/\D/g, '');
                                                                    field.onChange(val);
                                                                },
                                                                className: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 focus:ring-primary/20 transition-all font-medium tracking-wider placeholder:text-[#94A3B8] placeholder:font-normal placeholder:text-[14px]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                lineNumber: 599,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 598,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 612,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                    lineNumber: 596,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                            lineNumber: 592,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                            control: form.control,
                                            name: "email_address",
                                            render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                    className: "space-y-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                            style: {
                                                                fontFamily: 'Inter, sans-serif',
                                                                fontWeight: 600,
                                                                fontSize: '11px',
                                                                lineHeight: '16.5px',
                                                                letterSpacing: '0.55px',
                                                                textTransform: 'uppercase',
                                                                color: '#64748B'
                                                            },
                                                            children: [
                                                                "E-mail ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-red-500",
                                                                    children: "*"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 622,
                                                                    columnNumber: 211
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 622,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                placeholder: "E-mail *",
                                                                ...field,
                                                                disabled: isLoading || isEdit || isEM,
                                                                type: "email",
                                                                className: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 focus:ring-primary/20 transition-all placeholder:text-[#94A3B8] placeholder:font-normal placeholder:text-[14px]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                lineNumber: 624,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 623,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 632,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                    lineNumber: 621,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                            lineNumber: 617,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                    lineNumber: 591,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                            lineNumber: 542,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-5 pt-3 border-t border-zinc-200/60 dark:border-zinc-800",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__["Stethoscope"], {
                                            className: "h-4 w-4 text-[#063669]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                            lineNumber: 641,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-extrabold text-[#063669] text-base",
                                            children: "Make an Appointment Details"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                            lineNumber: 642,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                    lineNumber: 640,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                    control: form.control,
                                    name: "location_id",
                                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                            className: "space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                    style: {
                                                        fontFamily: 'Inter, sans-serif',
                                                        fontWeight: 600,
                                                        fontSize: '11px',
                                                        lineHeight: '16.5px',
                                                        letterSpacing: '0.55px',
                                                        textTransform: 'uppercase',
                                                        color: '#64748B'
                                                    },
                                                    children: [
                                                        "Select Location ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-red-500",
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 650,
                                                            columnNumber: 218
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                    lineNumber: 650,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    onValueChange: (v)=>field.onChange(Number(v)),
                                                    value: field.value ? String(field.value) : "",
                                                    disabled: isLoading || isEdit || isEM,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                className: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl h-11 px-4 focus:ring-primary/20 transition-all font-medium",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                    placeholder: "-- Select Location * --"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 658,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                lineNumber: 657,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 656,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                            className: "bg-white text-black z-[99999] max-h-[300px] overflow-y-auto custom-scrollbar",
                                                            children: masterData?.locations?.map((loc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: String(loc.id),
                                                                    className: "text-black cursor-pointer font-medium",
                                                                    children: loc.description
                                                                }, loc.id, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 663,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 661,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                    lineNumber: 651,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                    lineNumber: 669,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                            lineNumber: 649,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                    lineNumber: 645,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                selectedLocationId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                    control: form.control,
                                    name: "branch_id",
                                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                            className: "space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                    style: {
                                                        fontFamily: 'Inter, sans-serif',
                                                        fontWeight: 600,
                                                        fontSize: '11px',
                                                        lineHeight: '16.5px',
                                                        letterSpacing: '0.55px',
                                                        textTransform: 'uppercase',
                                                        color: '#64748B'
                                                    },
                                                    children: "Branch"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                    lineNumber: 680,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    onValueChange: (v)=>field.onChange(Number(v)),
                                                    value: field.value ? String(field.value) : "",
                                                    disabled: isLoading || isEdit || isEM,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                className: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl h-11 px-4 focus:ring-primary/20 transition-all font-medium",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                    placeholder: "-- Select Branch --"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 688,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                lineNumber: 687,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 686,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                            className: "bg-white text-black z-[99999] max-h-[300px] overflow-y-auto custom-scrollbar",
                                                            children: filteredBranches.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: String(b.id),
                                                                    className: "text-black cursor-pointer font-medium",
                                                                    children: b.description
                                                                }, b.id, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 693,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 691,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                    lineNumber: 681,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                    lineNumber: 699,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                            lineNumber: 679,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                    lineNumber: 675,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                    control: form.control,
                                    name: "department",
                                    render: ({ field })=>{
                                        const currentDeptValue = (()=>{
                                            if (!field.value) return "";
                                            const found = departmentOptions.find((o)=>String(o.id) === String(field.value) || o.value === String(field.value) || o.label.toLowerCase() === String(field.value).toLowerCase());
                                            return found ? found.value : String(field.value);
                                        })();
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                            className: "space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                    style: {
                                                        fontFamily: 'Inter, sans-serif',
                                                        fontWeight: 600,
                                                        fontSize: '11px',
                                                        lineHeight: '16.5px',
                                                        letterSpacing: '0.55px',
                                                        textTransform: 'uppercase',
                                                        color: '#64748B'
                                                    },
                                                    children: [
                                                        "Select Department ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-red-500",
                                                            children: "*"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 720,
                                                            columnNumber: 41
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                    lineNumber: 719,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    onValueChange: (v)=>field.onChange(v),
                                                    value: currentDeptValue,
                                                    disabled: isLoading || isEdit || isEM,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                className: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl h-11 px-4 focus:ring-primary/20 transition-all font-medium",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                    placeholder: "-- Select Department * --"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 729,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                lineNumber: 728,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 727,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                            className: "bg-white text-black z-[99999] max-h-[300px] overflow-y-auto custom-scrollbar",
                                                            children: departmentOptions.map((dept)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    value: dept.value,
                                                                    className: "text-black cursor-pointer font-medium",
                                                                    children: dept.label
                                                                }, dept.id, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 734,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 732,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                    lineNumber: 722,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                    lineNumber: 740,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                            lineNumber: 718,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0));
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                    lineNumber: 705,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                !isEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                            control: form.control,
                                            name: "doctor_id",
                                            render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                    className: "space-y-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                            style: {
                                                                fontFamily: 'Inter, sans-serif',
                                                                fontWeight: 600,
                                                                fontSize: '11px',
                                                                lineHeight: '16.5px',
                                                                letterSpacing: '0.55px',
                                                                textTransform: 'uppercase',
                                                                color: '#64748B'
                                                            },
                                                            children: "Select Doctor"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 753,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                            onValueChange: (v)=>field.onChange(v ? Number(v) : null),
                                                            value: field.value ? String(field.value) : "",
                                                            disabled: isLoading || isEM || isLoadingDoctors,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                        className: "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl h-11 px-4 focus:ring-primary/20 transition-all font-medium",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                            placeholder: isLoadingDoctors ? "Loading doctors..." : "-- Select Doctor --"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                            lineNumber: 763,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                        lineNumber: 762,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 761,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                    className: "bg-white text-black z-[99999] max-h-[300px] overflow-y-auto custom-scrollbar",
                                                                    children: isLoadingDoctors ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "p-3 text-xs text-zinc-500 text-center flex items-center justify-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                                className: "h-3.5 w-3.5 animate-spin"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                                lineNumber: 769,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: "Loading doctors..."
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                                lineNumber: 770,
                                                                                columnNumber: 31
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                        lineNumber: 768,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)) : doctorsList.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "p-3 text-xs text-zinc-500 text-center",
                                                                        children: "No doctors available for selected department / branch"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                        lineNumber: 773,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)) : doctorsList.map((doc)=>{
                                                                        const specName = masterData?.specialisations?.find((s)=>s.id === doc.specialization_id)?.description;
                                                                        const docName = `Dr. ${doc.first_name || ''} ${doc.last_name || ''}`.trim();
                                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                            value: String(doc.id),
                                                                            className: "text-black cursor-pointer font-medium",
                                                                            children: [
                                                                                docName,
                                                                                " ",
                                                                                specName ? `(${specName})` : ''
                                                                            ]
                                                                        }, doc.id, true, {
                                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                            lineNumber: 781,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0));
                                                                    })
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 766,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 756,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 789,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                    lineNumber: 752,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                            lineNumber: 748,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                                    control: form.control,
                                                    name: "appointment_date",
                                                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                            className: "space-y-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                    style: {
                                                                        fontFamily: 'Inter, sans-serif',
                                                                        fontWeight: 600,
                                                                        fontSize: '11px',
                                                                        lineHeight: '16.5px',
                                                                        letterSpacing: '0.55px',
                                                                        textTransform: 'uppercase',
                                                                        color: '#64748B'
                                                                    },
                                                                    children: "Appointment Date"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 800,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$DatePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DatePicker"], {
                                                                        value: field.value,
                                                                        onChange: (val)=>field.onChange(val),
                                                                        disabled: isLoading || isEM,
                                                                        disablePastDates: true,
                                                                        placeholder: "Select appointment date"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                        lineNumber: 802,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 801,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 810,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 799,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                    lineNumber: 795,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                                    control: form.control,
                                                    name: "appointment_time",
                                                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                            className: "space-y-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                    style: {
                                                                        fontFamily: 'Inter, sans-serif',
                                                                        fontWeight: 600,
                                                                        fontSize: '11px',
                                                                        lineHeight: '16.5px',
                                                                        letterSpacing: '0.55px',
                                                                        textTransform: 'uppercase',
                                                                        color: '#64748B'
                                                                    },
                                                                    children: "Time *"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 819,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$TimePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TimePicker"], {
                                                                        value: field.value,
                                                                        onChange: (val)=>field.onChange(val),
                                                                        disabled: isLoading || isEM,
                                                                        placeholder: "Select appointment time"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                        lineNumber: 821,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 820,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                    lineNumber: 828,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 818,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                    lineNumber: 814,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                            lineNumber: 794,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                            control: form.control,
                                            name: "appointment_note",
                                            render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                    className: "space-y-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                            style: {
                                                                fontFamily: 'Inter, sans-serif',
                                                                fontWeight: 600,
                                                                fontSize: '11px',
                                                                lineHeight: '16.5px',
                                                                letterSpacing: '0.55px',
                                                                textTransform: 'uppercase',
                                                                color: '#64748B'
                                                            },
                                                            children: "Lead Note"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 839,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                placeholder: "Type Lead Note",
                                                                ...field,
                                                                disabled: isLoading || isEM,
                                                                rows: 3,
                                                                className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm font-medium focus:ring-[#063669]/20 outline-none transition-all placeholder:text-[#94A3B8]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                                lineNumber: 841,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 840,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                            lineNumber: 849,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                                    lineNumber: 838,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                            lineNumber: 834,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                    lineNumber: 747,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                            lineNumber: 639,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                    lineNumber: 417,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-3 pb-5 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800 shrink-0 sticky bottom-0 rounded-t-xl shadow-[0_-4px_20px_rgb(0,0,0,0.03)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "submit",
                        disabled: isLoading || isEM,
                        className: "w-full h-[50px] rounded-xl bg-[#063669] hover:bg-[#052d58] text-white text-[16px] shadow-lg active:scale-[0.98] transition-all",
                        style: {
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 700
                        },
                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "h-5 w-5 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                    lineNumber: 1118,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: isEdit ? 'Updating...' : 'Creating...'
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                                    lineNumber: 1119,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                            lineNumber: 1117,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : isEdit ? 'Update Lead' : 'Make an Appointment / Create Lead'
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                        lineNumber: 1110,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/LeadForm.tsx",
                    lineNumber: 1109,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/leads/components/LeadForm.tsx",
            lineNumber: 416,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/leads/components/LeadForm.tsx",
        lineNumber: 415,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LeadForm, "ZWojA0Dyeua+qg+TGoOpdfAFmgM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllMasterDataQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersByRoleIdQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$doctors$2f$api$2f$doctorsApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllDoctorsQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetReporteesQuery"]
    ];
});
_c = LeadForm;
var _c;
__turbopack_context__.k.register(_c, "LeadForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/components/LeadTable.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LeadTable",
    ()=>LeadTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DataTable$2f$DataTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/DataTable/DataTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$JunkValidationDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/JunkValidationDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-client] (ecmascript) <export default as MoreVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarClock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-clock.js [app-client] (ecmascript) <export default as CalendarClock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/command.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/hooks/useMasterDataLookup.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/hooks/usePermissions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$permissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/permissions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/api/leadsApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$getProjectStatusOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/getProjectStatusOptions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/checkbox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
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
;
;
// --- Initials Avatar ---
const InitialsAvatar = ({ firstName, lastName, size = 'sm' })=>{
    const initials = `${(firstName || '')[0] || ''}${(lastName || '')[0] || ''}`.toUpperCase() || '?';
    const sizeClasses = size === 'md' ? 'h-7 w-7 text-[10px]' : 'h-6 w-6 text-[9px]';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])(sizeClasses, "rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center font-bold shrink-0"),
        children: initials
    }, void 0, false, {
        fileName: "[project]/src/features/leads/components/LeadTable.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = InitialsAvatar;
const UnassignedAvatar = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-6 w-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
            className: "h-3.5 w-3.5 text-zinc-400"
        }, void 0, false, {
            fileName: "[project]/src/features/leads/components/LeadTable.tsx",
            lineNumber: 63,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/leads/components/LeadTable.tsx",
        lineNumber: 62,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = UnassignedAvatar;
// --- Jira-style Assignee Popover for RM ---
const RmAssigneeCell = ({ lead, onAssign, projectRmEm, disabled })=>{
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Get RMs for this lead's project
    const projectEntry = projectRmEm.find((p)=>p.project_id === lead.project_id);
    const managers = projectEntry?.rm_data || [];
    const normalize = (s)=>s.toLowerCase().replace(/\s+/g, ' ').trim();
    const filtered = managers.filter((m)=>{
        const name = normalize(`${m.rm_first_name} ${m.rm_last_name}`);
        return !search || normalize(search).split(' ').every((w)=>name.includes(w));
    });
    const assigned = managers.find((m)=>m.id === lead.assigned_to_rm);
    const assignedName = lead.rm_name;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: (e)=>e.stopPropagation(),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
            open: open,
            onOpenChange: setOpen,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                    asChild: true,
                    disabled: disabled,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        style: {
                            minWidth: '100px',
                            height: '32px',
                            borderRadius: '12px'
                        },
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("flex items-center transition-all px-2 gap-2 w-full max-w-[140px]", "flex items-center transition-all px-3 py-1 gap-2.5 w-full max-w-[140px]", "bg-primary text-white font-bold text-[10px] shadow-sm hover:bg-primary/90 justify-center", disabled && "opacity-50 cursor-not-allowed"),
                        children: assigned ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InitialsAvatar, {
                                    firstName: assigned.rm_first_name,
                                    lastName: assigned.rm_last_name
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                    lineNumber: 105,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold text-white truncate text-xs",
                                    title: `${assigned.rm_first_name} ${assigned.rm_last_name}`,
                                    children: [
                                        assigned.rm_first_name,
                                        " ",
                                        assigned.rm_last_name
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                    lineNumber: 106,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                            lineNumber: 104,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : assignedName && assignedName !== 'Unassigned' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InitialsAvatar, {
                                    firstName: assignedName.split(' ')[0],
                                    lastName: assignedName.split(' ')[1]
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                    lineNumber: 115,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "truncate text-xs font-bold text-white",
                                    title: assignedName,
                                    children: assignedName
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                    lineNumber: 116,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                            lineNumber: 114,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Assign Sales Executive"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                            lineNumber: 119,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                    className: "w-56 p-0",
                    align: "start",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"], {
                        shouldFilter: false,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandInput"], {
                                placeholder: "Search Sales Executive...",
                                className: "h-9 text-xs",
                                value: search,
                                onValueChange: setSearch
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandEmpty"], {
                                className: "py-3 text-xs text-center text-zinc-400",
                                children: managers.length === 0 ? 'No Sales Executives for this project' : 'No Sales Executive found'
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandGroup"], {
                                className: "max-h-48 overflow-y-auto p-1.5",
                                children: filtered.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandItem"], {
                                        value: `${m.rm_first_name} ${m.rm_last_name}`,
                                        onSelect: ()=>{
                                            onAssign(lead, m.id);
                                            setOpen(false);
                                            setSearch('');
                                        },
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("flex items-center gap-2.5 px-3 py-2.5 cursor-pointer rounded-md", lead.assigned_to_rm === m.id && "bg-primary/5"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InitialsAvatar, {
                                                firstName: m.rm_first_name,
                                                lastName: m.rm_last_name
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                lineNumber: 149,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-medium",
                                                children: [
                                                    m.rm_first_name,
                                                    " ",
                                                    m.rm_last_name
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                lineNumber: 150,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            lead.assigned_to_rm === m.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-auto text-[9px] text-primary font-bold",
                                                children: "CURRENT"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                lineNumber: 152,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, m.id, true, {
                                        fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                        lineNumber: 136,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 134,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                        lineNumber: 124,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/leads/components/LeadTable.tsx",
            lineNumber: 92,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/leads/components/LeadTable.tsx",
        lineNumber: 91,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(RmAssigneeCell, "IJNxVcP4lwAmjLpkwW51NS/hNyk=");
_c2 = RmAssigneeCell;
// --- EM Popover Content (uses project RM/EM hierarchy) ---
const EmAssigneePopoverContent = ({ lead, onAssign, setOpen, projectRmEm })=>{
    _s1();
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Get EMs for the assigned RM within this lead's project
    const projectEntry = projectRmEm.find((p)=>p.project_id === lead.project_id);
    const rmEntry = projectEntry?.rm_data.find((r)=>r.id === lead.assigned_to_rm);
    const ems = rmEntry?.em_data || [];
    const normalize = (s)=>s.toLowerCase().replace(/\s+/g, ' ').trim();
    const filteredEms = ems.filter((em)=>{
        const name = normalize(`${em.em_first_name} ${em.em_last_name}`);
        return !search || normalize(search).split(' ').every((w)=>name.includes(w));
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"], {
        shouldFilter: false,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandInput"], {
                placeholder: "Search Sales Executive...",
                className: "h-9 text-xs",
                value: search,
                onValueChange: setSearch
            }, void 0, false, {
                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandEmpty"], {
                className: "py-3 text-xs text-center text-zinc-400",
                children: !lead.assigned_to_rm ? 'Select a Sales Head first' : ems.length === 0 ? 'No Sales Executives for this Sales Head' : 'No Sales Executive found'
            }, void 0, false, {
                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandGroup"], {
                className: "max-h-48 overflow-y-auto p-1.5",
                children: filteredEms.map((em)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandItem"], {
                        value: `${em.em_first_name}${em.em_last_name}`,
                        onSelect: ()=>{
                            onAssign(lead, em.id);
                            setOpen(false);
                        },
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("flex items-center gap-2.5 px-3 py-2.5 cursor-pointer rounded-md", lead.assigned_to_em === em.id && "bg-primary/5"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InitialsAvatar, {
                                firstName: em.em_first_name,
                                lastName: em.em_last_name
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 218,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-medium",
                                children: [
                                    em.em_first_name,
                                    " ",
                                    em.em_last_name
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 219,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            lead.assigned_to_em === em.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-auto text-[9px] text-primary font-bold",
                                children: "CURRENT"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 221,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, em.id, true, {
                        fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                        lineNumber: 206,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                lineNumber: 204,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/leads/components/LeadTable.tsx",
        lineNumber: 190,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(EmAssigneePopoverContent, "xMSft3/sbCidYXUzqinUsZIh+qY=");
_c3 = EmAssigneePopoverContent;
// --- Jira-style Assignee Cell for EM ---
const EmAssigneeCell = ({ lead, onAssign, disabled, emLabel, projectRmEm })=>{
    _s2();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isDisabled = disabled || !lead.assigned_to_rm;
    const initials = emLabel !== '--' ? emLabel.split(' ').map((n)=>n[0]).join('') : '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: (e)=>e.stopPropagation(),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
            open: open,
            onOpenChange: (v)=>{
                if (!isDisabled) setOpen(v);
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                    asChild: true,
                    disabled: isDisabled,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        style: {
                            minWidth: '100px',
                            height: '32px',
                            borderRadius: '12px'
                        },
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("flex items-center transition-all px-2 gap-2 w-full max-w-[140px]", "flex items-center transition-all px-3 py-1 gap-2.5 w-full max-w-[140px]", "bg-primary text-white font-bold text-[10px] shadow-sm hover:bg-primary/90 justify-center", isDisabled && "opacity-50 cursor-not-allowed"),
                        children: lead.assigned_to_em ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-6 w-6 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center font-bold shrink-0 text-[9px]",
                                    children: initials
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                    lineNumber: 258,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold text-white truncate text-xs",
                                    title: emLabel,
                                    children: emLabel
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                    lineNumber: 261,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                            lineNumber: 257,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: !lead.assigned_to_rm ? 'Select Sales Head first' : 'Assign Sales Executive'
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                            lineNumber: 269,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                        lineNumber: 247,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                    lineNumber: 246,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                    className: "w-56 p-0",
                    align: "start",
                    children: open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmAssigneePopoverContent, {
                        lead: lead,
                        onAssign: onAssign,
                        setOpen: setOpen,
                        projectRmEm: projectRmEm
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                        lineNumber: 275,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                    lineNumber: 273,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/leads/components/LeadTable.tsx",
            lineNumber: 245,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/leads/components/LeadTable.tsx",
        lineNumber: 244,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s2(EmAssigneeCell, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");
_c4 = EmAssigneeCell;
// --- Jira-style Status Cell with Search ---
const StatusCell = ({ lead, options, onUpdateStatus, disabled })=>{
    _s3();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Find current status matching lead_status_id or project_lead_status_id
    const currentStatus = options.find((o)=>lead.lead_status_id && (o.lead_status_id === lead.lead_status_id || o.id === lead.lead_status_id) || lead.project_lead_status_id && (o.id === lead.project_lead_status_id || o.lead_status_id === lead.project_lead_status_id));
    const filteredOptions = options.filter((o)=>o.label?.toLowerCase().includes(search.toLowerCase()));
    const isCurrent = (o)=>{
        if (lead.lead_status_id) {
            return o.lead_status_id === lead.lead_status_id || o.id === lead.lead_status_id;
        }
        if (lead.project_lead_status_id) {
            return o.id === lead.project_lead_status_id || o.lead_status_id === lead.project_lead_status_id;
        }
        return false;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: (e)=>e.stopPropagation(),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
            open: open,
            onOpenChange: (v)=>{
                if (!disabled) setOpen(v);
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                    asChild: true,
                    disabled: disabled,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("h-8 text-[11px] font-bold uppercase w-36 bg-source-bg text-primary border-2 border-primary/40 rounded-full focus:ring-0 px-4 hover:border-primary transition-colors flex items-center justify-between cursor-pointer", "h-8 text-[11px] font-bold uppercase w-36 bg-source-bg text-primary border-2 border-primary/40 rounded-full focus:ring-0 px-3.5 hover:border-primary transition-colors flex items-center justify-between cursor-pointer gap-2", disabled && "opacity-50 cursor-not-allowed"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate mr-1",
                                children: currentStatus?.label || lead.status || "Select Status"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 335,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                className: "h-3.5 w-3.5 shrink-0 opacity-50 ml-1"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 338,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                        lineNumber: 328,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                    lineNumber: 327,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                    className: "w-56 p-0",
                    align: "start",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"], {
                        shouldFilter: false,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandInput"], {
                                placeholder: "Search status...",
                                className: "h-9 text-xs",
                                value: search,
                                onValueChange: setSearch
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 343,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandEmpty"], {
                                className: "py-3 text-xs text-center text-zinc-400",
                                children: "No status found"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 349,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandGroup"], {
                                className: "max-h-60 overflow-y-auto p-1.5",
                                children: filteredOptions.map((o)=>{
                                    const isSelected = isCurrent(o);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandItem"], {
                                        value: o.label,
                                        onSelect: ()=>{
                                            onUpdateStatus(lead, o.lead_status_id || o.id);
                                            setOpen(false);
                                        },
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("flex items-center gap-2.5 py-2.5 px-3 cursor-pointer text-[10px] uppercase font-bold rounded-md", isSelected && "bg-primary/5 text-primary"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: o.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                lineNumber: 368,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-auto text-[9px] text-primary font-bold",
                                                children: "CURRENT"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                lineNumber: 370,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, o.id, true, {
                                        fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                        lineNumber: 356,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0));
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 352,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                        lineNumber: 342,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                    lineNumber: 341,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/leads/components/LeadTable.tsx",
            lineNumber: 326,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/leads/components/LeadTable.tsx",
        lineNumber: 325,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s3(StatusCell, "OZaGxERzP9ofb5uNopqkD73Mc9A=");
_c5 = StatusCell;
const LeadTable = ({ data, isLoading, page, limit, total, onPageChange, onLimitChange, onEdit, onDelete, onScheduleVisit, onUpdateStatus, onAssignRm, onAssignEm, sortField, sortOrder, onSort, selectedUuids = [], onSelectUuids, offset = 0, maxHeight, containerHeight = '85vh' })=>{
    _s4();
    const dataArray = data || [];
    const [junkConfirm, setJunkConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [getLeadById] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLazyGetLeadByIdQuery"])();
    const { currentRole, can } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"])();
    const roleCode = currentRole?.code || '';
    const { getStatusLabel, getProjectLabel, getEmLabel, getSourceLabel, getBranchLabel, getSpecialisationLabel, masterData, projectLeadStatuses, isLoading: isLookupLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"])();
    const { data: projectRmEm = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllProjectEmAndRmDataQuery"])();
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"])();
    const fallback = (value)=>value ?? '--';
    const isAllSelected = dataArray.length > 0 && selectedUuids.length === dataArray.length;
    const columns = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadTable.useMemo[columns]": ()=>[
                ...can(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$permissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PERMISSIONS"].LEAD_BULK_ACTIONS) && (roleCode === 'SADMIN' || roleCode === 'ADMIN') ? [
                    {
                        key: 'selection',
                        header: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center h-full",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                checked: isAllSelected,
                                onCheckedChange: {
                                    "LeadTable.useMemo[columns]": (checked)=>{
                                        if (checked) {
                                            onSelectUuids?.(dataArray.map({
                                                "LeadTable.useMemo[columns]": (l)=>l.uuid
                                            }["LeadTable.useMemo[columns]"]));
                                        } else {
                                            onSelectUuids?.([]);
                                        }
                                    }
                                }["LeadTable.useMemo[columns]"],
                                "aria-label": "Select all"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 465,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                            lineNumber: 464,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        width: '40px',
                        render: {
                            "LeadTable.useMemo[columns]": (l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                        checked: selectedUuids.includes(l.uuid),
                                        onCheckedChange: {
                                            "LeadTable.useMemo[columns]": (checked)=>{
                                                const newSelection = checked ? [
                                                    ...selectedUuids,
                                                    l.uuid
                                                ] : selectedUuids.filter({
                                                    "LeadTable.useMemo[columns]": (id)=>id !== l.uuid
                                                }["LeadTable.useMemo[columns]"]);
                                                onSelectUuids?.(newSelection);
                                            }
                                        }["LeadTable.useMemo[columns]"],
                                        "aria-label": `Select lead ${l.lead_id}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                        lineNumber: 482,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                    lineNumber: 481,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                        }["LeadTable.useMemo[columns]"]
                    }
                ] : [],
                {
                    key: 'lead_id',
                    header: 'LEAD ID',
                    width: '110px',
                    render: {
                        "LeadTable.useMemo[columns]": (l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                                to: `/leads/${l.uuid}`,
                                state: {
                                    lead: l,
                                    branch_id: l.branch_id,
                                    branch: l.branch,
                                    branch_name: l.branch_name,
                                    hospital_branch: l.hospital_branch,
                                    specialisation_id: l.specialisation_id,
                                    department: l.department,
                                    doctor_name: l.doctor_name
                                },
                                className: "text-secondary-foreground font-semibold hover:text-primary transition-colors text-xs",
                                children: [
                                    "#",
                                    fallback(l.lead_id)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 501,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                    }["LeadTable.useMemo[columns]"]
                },
                {
                    key: 'customer_name',
                    header: 'CUSTOMER NAME',
                    sortable: true,
                    width: '150px',
                    render: {
                        "LeadTable.useMemo[columns]": (l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-xs",
                                style: {
                                    color: '#191C1E'
                                },
                                children: [
                                    fallback(l.first_name),
                                    " ",
                                    l.last_name || ''
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 516,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                    }["LeadTable.useMemo[columns]"]
                },
                {
                    key: 'contact_details',
                    header: 'CONTACT DETAILS',
                    width: '150px',
                    render: {
                        "LeadTable.useMemo[columns]": (l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium text-xs",
                                        style: {
                                            color: '#334155'
                                        },
                                        children: fallback(l.phone_number)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                        lineNumber: 527,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-zinc-400 text-[11px] truncate",
                                        children: l.email_address || '--'
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                        lineNumber: 528,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 526,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                    }["LeadTable.useMemo[columns]"]
                },
                /* Income column commented out as requested
      {
        key: 'income',
        header: 'INCOME',
        width: '120px',
        render: (l: Lead) => (
          <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
            {l.income ? `₹${l.income.toLocaleString('en-IN')}` : '--'}
          </span>
        ),
      },
      */ {
                    key: 'created_on',
                    header: 'CREATION DATE',
                    sortable: true,
                    width: '160px',
                    render: {
                        "LeadTable.useMemo[columns]": (l)=>{
                            if (!l.created_on) return '--';
                            const formatted = new Date(l.created_on).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                            });
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-medium text-zinc-700 dark:text-zinc-300",
                                children: formatted
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 560,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0));
                        }
                    }["LeadTable.useMemo[columns]"]
                },
                {
                    key: 'source_id',
                    header: 'SOURCE',
                    width: '140px',
                    render: {
                        "LeadTable.useMemo[columns]": (l)=>{
                            const sourceText = l.source || getSourceLabel(l.source_id);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-source-bg text-primary",
                                children: sourceText && sourceText !== '--' ? sourceText.split(' ')[0] : '--'
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 573,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0));
                        }
                    }["LeadTable.useMemo[columns]"]
                },
                {
                    key: 'branch_id',
                    header: 'BRANCH',
                    width: '150px',
                    render: {
                        "LeadTable.useMemo[columns]": (l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-medium text-zinc-700 dark:text-zinc-300",
                                children: l.hospital_branch || l.branch || l.branch_name || (l.branch_id ? getBranchLabel(l.branch_id) : getProjectLabel(l.project_id)) || '--'
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 584,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                    }["LeadTable.useMemo[columns]"]
                },
                {
                    key: 'specialisation_id',
                    header: 'DEPARTMENT',
                    width: '160px',
                    render: {
                        "LeadTable.useMemo[columns]": (l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-medium text-zinc-700 dark:text-zinc-300",
                                children: l.specialisation_id ? getSpecialisationLabel(l.specialisation_id) : l.specialization || l.department || '--'
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 594,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                    }["LeadTable.useMemo[columns]"]
                },
                {
                    key: 'doctor_name',
                    header: 'DOCTOR NAME',
                    width: '160px',
                    render: {
                        "LeadTable.useMemo[columns]": (l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-medium text-zinc-700 dark:text-zinc-300",
                                children: l.doctor_name || l.doctor || '--'
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 604,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                    }["LeadTable.useMemo[columns]"]
                },
                {
                    key: 'enquiries',
                    header: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center w-full",
                        children: "ENQUIRIES"
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                        lineNumber: 611,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    width: '120px',
                    render: {
                        "LeadTable.useMemo[columns]": (l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                                    to: `/leads/${l.uuid}?tab=enquiries`,
                                    state: {
                                        lead: l,
                                        branch_id: l.branch_id,
                                        branch: l.branch,
                                        branch_name: l.branch_name,
                                        hospital_branch: l.hospital_branch,
                                        specialisation_id: l.specialisation_id,
                                        department: l.department,
                                        doctor_name: l.doctor_name
                                    },
                                    className: "font-bold text-xs text-[#0f3d6b] hover:text-[#0f3d6b]/80 underline decoration-[#0f3d6b] transition-colors",
                                    children: l.enquiries ?? l.enquires?.length ?? 0
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                    lineNumber: 615,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 614,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                    }["LeadTable.useMemo[columns]"]
                },
                {
                    key: 'project_lead_status_id',
                    header: 'STATUS',
                    sortable: true,
                    width: '150px',
                    render: {
                        "LeadTable.useMemo[columns]": (l)=>{
                            const rawLeadStatuses = masterData?.lead_statuses;
                            const options = rawLeadStatuses && rawLeadStatuses.length > 0 ? rawLeadStatuses.filter({
                                "LeadTable.useMemo[columns]": (s)=>s.code !== 'JUNK' && s.description !== 'Junk Lead'
                            }["LeadTable.useMemo[columns]"]).map({
                                "LeadTable.useMemo[columns]": (s)=>({
                                        id: s.id,
                                        label: s.description || s.code || `Status ${s.id}`,
                                        lead_status_id: s.id,
                                        code: s.code
                                    })
                            }["LeadTable.useMemo[columns]"]) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$getProjectStatusOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectStatusOptions"])(l.project_id, projectLeadStatuses).filter({
                                "LeadTable.useMemo[columns]": (o)=>o.label !== 'Junk Lead'
                            }["LeadTable.useMemo[columns]"]);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusCell, {
                                lead: l,
                                options: options,
                                onUpdateStatus: {
                                    "LeadTable.useMemo[columns]": (lead, newStatusId)=>{
                                        const option = options.find({
                                            "LeadTable.useMemo[columns].option": (o)=>o.id === newStatusId || o.lead_status_id === newStatusId
                                        }["LeadTable.useMemo[columns].option"]);
                                        const statusMaster = masterData?.lead_statuses?.find({
                                            "LeadTable.useMemo[columns]": (s)=>s.id === (option?.lead_status_id || newStatusId)
                                        }["LeadTable.useMemo[columns]"]);
                                        if (statusMaster?.code === 'JUNKPE') {
                                            setJunkConfirm({
                                                lead,
                                                newStatusId,
                                                isLoading: true
                                            });
                                            getLeadById({
                                                uuid: lead.uuid
                                            }).unwrap().then({
                                                "LeadTable.useMemo[columns]": (fetchedLead)=>{
                                                    setJunkConfirm({
                                                        "LeadTable.useMemo[columns]": (prev)=>prev ? {
                                                                ...prev,
                                                                lead: fetchedLead,
                                                                isLoading: false
                                                            } : null
                                                    }["LeadTable.useMemo[columns]"]);
                                                }
                                            }["LeadTable.useMemo[columns]"]).catch({
                                                "LeadTable.useMemo[columns]": (err)=>{
                                                    console.error("Failed to fetch lead details:", err);
                                                    setJunkConfirm({
                                                        "LeadTable.useMemo[columns]": (prev)=>prev ? {
                                                                ...prev,
                                                                isLoading: false,
                                                                error: "Failed to load attempts. Please try again."
                                                            } : null
                                                    }["LeadTable.useMemo[columns]"]);
                                                }
                                            }["LeadTable.useMemo[columns]"]);
                                        } else {
                                            if (onUpdateStatus) onUpdateStatus(lead, newStatusId);
                                        }
                                    }
                                }["LeadTable.useMemo[columns]"],
                                disabled: !can(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$permissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PERMISSIONS"].LEAD_STATUS_UPDATE)
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 647,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0));
                        }
                    }["LeadTable.useMemo[columns]"]
                },
                {
                    key: 'assigned_to_rm',
                    header: 'SALES EXECUTIVE',
                    width: '200px',
                    render: {
                        "LeadTable.useMemo[columns]": (l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RmAssigneeCell, {
                                lead: l,
                                onAssign: onAssignRm || ({
                                    "LeadTable.useMemo[columns]": ()=>{}
                                })["LeadTable.useMemo[columns]"],
                                projectRmEm: projectRmEm,
                                disabled: !can(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$permissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PERMISSIONS"].LEAD_EDIT)
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 680,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                    }["LeadTable.useMemo[columns]"]
                },
                {
                    key: 'actions',
                    header: 'ACTIONS',
                    width: '120px',
                    render: {
                        "LeadTable.useMemo[columns]": (lead)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                            asChild: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                size: "icon",
                                                className: "h-8 w-8 rounded-full",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__["MoreVertical"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                    lineNumber: 697,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                lineNumber: 696,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                            lineNumber: 695,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                            align: "end",
                                            className: "w-52 text-xs p-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuLabel"], {
                                                    className: "font-normal text-zinc-500 uppercase px-3 py-2 text-[10px] tracking-wider",
                                                    children: "Lead Actions"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                    lineNumber: 701,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                                                    to: `/leads/${lead.uuid}`,
                                                    state: {
                                                        lead,
                                                        branch_id: lead.branch_id,
                                                        branch: lead.branch,
                                                        branch_name: lead.branch_name,
                                                        hospital_branch: lead.hospital_branch,
                                                        specialisation_id: lead.specialisation_id,
                                                        department: lead.department
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                        className: "cursor-pointer gap-2.5 py-2.5 px-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                className: "h-4 w-4 shrink-0 text-zinc-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                                lineNumber: 709,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "View Details"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                                lineNumber: 710,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                        lineNumber: 708,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                    lineNumber: 704,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                can(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$permissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PERMISSIONS"].LEAD_EDIT) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                    className: "cursor-pointer gap-2.5 py-2.5 px-3",
                                                    onClick: {
                                                        "LeadTable.useMemo[columns]": ()=>onEdit(lead)
                                                    }["LeadTable.useMemo[columns]"],
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                            className: "h-4 w-4 shrink-0 text-zinc-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                            lineNumber: 719,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Edit Lead"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                            lineNumber: 720,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                    lineNumber: 715,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                    lineNumber: 724,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                    className: "cursor-pointer gap-2.5 py-2.5 px-3",
                                                    onClick: {
                                                        "LeadTable.useMemo[columns]": ()=>navigate(`/leads/${lead.uuid}?tab=chats&type=CM`, {
                                                                state: {
                                                                    lead,
                                                                    branch_id: lead.branch_id,
                                                                    branch: lead.branch,
                                                                    branch_name: lead.branch_name,
                                                                    hospital_branch: lead.hospital_branch,
                                                                    specialisation_id: lead.specialisation_id,
                                                                    department: lead.department
                                                                }
                                                            })
                                                    }["LeadTable.useMemo[columns]"],
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                            className: "h-4 w-4 shrink-0 text-indigo-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                            lineNumber: 731,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Initialize Chat"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                            lineNumber: 732,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                    lineNumber: 725,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                can(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$permissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PERMISSIONS"].LEAD_SCHEDULE_VISIT) && onScheduleVisit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                            lineNumber: 737,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                            onClick: {
                                                                "LeadTable.useMemo[columns]": ()=>onScheduleVisit(lead)
                                                            }["LeadTable.useMemo[columns]"],
                                                            className: "cursor-pointer gap-2.5 py-2.5 px-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarClock$3e$__["CalendarClock"], {
                                                                    className: "h-4 w-4 shrink-0 text-emerald-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                                    lineNumber: 739,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Schedule Visit"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                                    lineNumber: 740,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                            lineNumber: 738,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                    lineNumber: 736,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                can(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$permissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PERMISSIONS"].LEAD_DELETE) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                            fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                            lineNumber: 747,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                            onClick: {
                                                                "LeadTable.useMemo[columns]": ()=>onDelete(lead.uuid)
                                                            }["LeadTable.useMemo[columns]"],
                                                            className: "cursor-pointer gap-2.5 py-2.5 px-3 text-red-600 focus:text-red-600",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                    className: "h-4 w-4 shrink-0"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                                    lineNumber: 752,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Delete Lead"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                                    lineNumber: 753,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                            lineNumber: 748,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                                    lineNumber: 746,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                            lineNumber: 700,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                    lineNumber: 694,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                                lineNumber: 693,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                    }["LeadTable.useMemo[columns]"]
                }
            ]
    }["LeadTable.useMemo[columns]"], [
        isAllSelected,
        selectedUuids,
        can,
        roleCode,
        masterData,
        projectLeadStatuses,
        projectRmEm,
        onAssignRm,
        onAssignEm,
        onUpdateStatus,
        onEdit,
        onScheduleVisit,
        onDelete,
        getSourceLabel,
        getProjectLabel,
        getEmLabel
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DataTable$2f$DataTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataTable"], {
                columns: columns,
                data: dataArray,
                isLoading: isLoading || isLookupLoading,
                page: page,
                limit: limit,
                total: total,
                onPageChange: onPageChange,
                onLimitChange: onLimitChange,
                rowKey: (l)=>l.uuid,
                sortField: sortField,
                sortOrder: sortOrder,
                onSort: onSort,
                offset: offset,
                maxHeight: maxHeight,
                containerHeight: containerHeight
            }, void 0, false, {
                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                lineNumber: 767,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$JunkValidationDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JunkValidationDialog"], {
                open: !!junkConfirm,
                onClose: ()=>setJunkConfirm(null),
                onConfirm: ()=>{
                    if (junkConfirm && onUpdateStatus && !junkConfirm.error) {
                        onUpdateStatus(junkConfirm.lead, junkConfirm.newStatusId);
                    }
                    setJunkConfirm(null);
                },
                lead: junkConfirm?.lead || null,
                projectLabel: junkConfirm?.lead?.project_id ? getProjectLabel(junkConfirm.lead.project_id) : 'PLANET GREEN',
                attemptsCount: junkConfirm?.lead?.calls?.length || 0,
                // attemptsCount={5}
                isLoading: junkConfirm?.isLoading,
                error: junkConfirm?.error
            }, void 0, false, {
                fileName: "[project]/src/features/leads/components/LeadTable.tsx",
                lineNumber: 784,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/leads/components/LeadTable.tsx",
        lineNumber: 766,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s4(LeadTable, "qjot/MS3hH3VtXV9eujPSQI2YS8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLazyGetLeadByIdQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllProjectEmAndRmDataQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"]
    ];
});
_c6 = LeadTable;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "InitialsAvatar");
__turbopack_context__.k.register(_c1, "UnassignedAvatar");
__turbopack_context__.k.register(_c2, "RmAssigneeCell");
__turbopack_context__.k.register(_c3, "EmAssigneePopoverContent");
__turbopack_context__.k.register(_c4, "EmAssigneeCell");
__turbopack_context__.k.register(_c5, "StatusCell");
__turbopack_context__.k.register(_c6, "LeadTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/components/ReassignRMModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReassignRMModal",
    ()=>ReassignRMModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/hooks/useMasterDataLookup.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const ReassignRMModal = ({ lead, open, onClose, rms, onConfirm, initialReason = "" })=>{
    _s();
    console.log(lead, "insideReassign");
    const [rmId, setRmId] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState("");
    const [reason, setReason] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useState(initialReason);
    const { getProjectLabel } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"])();
    const projectFilteredRms = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "ReassignRMModal.useMemo[projectFilteredRms]": ()=>{
            if (!lead?.project_id) return rms || [];
            return (rms || []).filter({
                "ReassignRMModal.useMemo[projectFilteredRms]": (rm)=>{
                    if (rm.project_id !== undefined && rm.project_id !== null && rm.project_id !== "") {
                        if (Number(rm.project_id) === Number(lead.project_id)) return true;
                    }
                    if (rm.projectId !== undefined && rm.projectId !== null && rm.projectId !== "") {
                        if (Number(rm.projectId) === Number(lead.project_id)) return true;
                    }
                    if (Array.isArray(rm.project_ids) && rm.project_ids.some({
                        "ReassignRMModal.useMemo[projectFilteredRms]": (id)=>Number(id) === Number(lead.project_id)
                    }["ReassignRMModal.useMemo[projectFilteredRms]"])) {
                        return true;
                    }
                    return false;
                }
            }["ReassignRMModal.useMemo[projectFilteredRms]"]);
        }
    }["ReassignRMModal.useMemo[projectFilteredRms]"], [
        rms,
        lead?.project_id
    ]);
    // Sync reason if initialReason changes when modal opens
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "ReassignRMModal.useEffect": ()=>{
            if (open) {
                setReason(initialReason);
            }
        }
    }["ReassignRMModal.useEffect"], [
        open,
        initialReason,
        lead,
        rms,
        projectFilteredRms
    ]);
    const handleConfirm = ()=>{
        if (rmId) {
            onConfirm(Number(rmId));
            onClose();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "sm:max-w-[480px] max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-950 p-0 border-none rounded-[2.5rem] shadow-2xl scrollbar-hide",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-8 space-y-6 relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                        className: "space-y-2 text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                className: "text-2xl font-black text-[#0f3d6b] tracking-tight pr-8",
                                children: "Reassign Sales Head"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                className: "text-zinc-500 font-medium text-sm flex flex-col gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Select a new Sales Head and provide a reason for reassignment."
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                                        lineNumber: 83,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    lead && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mt-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-[#0f3d6b] dark:text-zinc-300 rounded text-[10px] font-bold",
                                                children: [
                                                    "#",
                                                    lead.lead_id
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                                                lineNumber: 86,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-bold text-zinc-400 uppercase tracking-wider",
                                                children: getProjectLabel(lead.project_id)
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                                                lineNumber: 87,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                                        lineNumber: 85,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-[10px] font-black text-[#0f3d6b] uppercase tracking-widest pl-1",
                                    children: "Select New Sales Head"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                                    lineNumber: 95,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                    value: rmId,
                                    onValueChange: setRmId,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                            className: "w-full h-14 bg-zinc-50/50 dark:bg-zinc-900 border-none px-6 rounded-2xl text-zinc-700 font-bold focus:ring-0 shadow-inner",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                placeholder: "Choose a Sales Head..."
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                                                lineNumber: 100,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                                            lineNumber: 99,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                            className: "rounded-2xl border-zinc-100 dark:border-zinc-800 shadow-xl max-h-60 overflow-y-auto bg-white text-black",
                                            children: projectFilteredRms.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "py-4 text-center text-xs font-semibold text-zinc-400",
                                                children: "No Sales Heads assigned to this project"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                                                lineNumber: 104,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)) : projectFilteredRms.map((rm)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: String(rm.id),
                                                    className: "py-2.5 px-3 font-bold cursor-pointer text-black",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "h-6 w-6 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center font-bold shrink-0 text-[10px]",
                                                                children: [
                                                                    rm.first_name?.[0],
                                                                    rm.last_name?.[0]
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                                                                lineNumber: 111,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    rm.first_name,
                                                                    " ",
                                                                    rm.last_name
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                                                                lineNumber: 114,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                                                        lineNumber: 110,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, rm.id, false, {
                                                    fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                                                    lineNumber: 109,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                                            lineNumber: 102,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                                    lineNumber: 98,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                        lineNumber: 93,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-12 gap-3 pt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "outline",
                                    onClick: onClose,
                                    className: "w-full h-[52px] text-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl font-bold text-zinc-500 hover:bg-zinc-50 transition-all",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                                    lineNumber: 138,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    onClick: handleConfirm,
                                    disabled: !rmId,
                                    className: "w-full h-[52px] text-sm bg-[#0f3d6b] hover:bg-[#1e293b] text-white rounded-2xl font-black shadow-lg transition-all active:scale-[0.98] disabled:opacity-50",
                                    children: "Confirm Reassignment"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                                    lineNumber: 147,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                                lineNumber: 146,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
                lineNumber: 76,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
            lineNumber: 75,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/leads/components/ReassignRMModal.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ReassignRMModal, "gF33ZZRm1cUBWFxG/+ekiEaUWW8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"]
    ];
});
_c = ReassignRMModal;
var _c;
__turbopack_context__.k.register(_c, "ReassignRMModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/components/ScheduleVisitDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScheduleVisitDialog",
    ()=>ScheduleVisitDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hookform/resolvers/zod/dist/zod.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/schemas.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building.js [app-client] (ecmascript) <export default as Building>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/stethoscope.js [app-client] (ecmascript) <export default as Stethoscope>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master/api/masterApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$doctors$2f$api$2f$doctorsApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/doctors/api/doctorsApiSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/shared/components/DateTimePicker/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$DatePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/DateTimePicker/DatePicker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$TimePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/DateTimePicker/TimePicker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/api/leadsApi.ts [app-client] (ecmascript)");
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
const scheduleVisitSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["object"]({
    doctor_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"]({
        error: "Please select a doctor"
    }).min(1, "Please select a doctor"),
    visit_date_time: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().min(1, "Visit date and time are required"),
    visit_status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"]().optional(),
    visit_remarks: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().max(500, "Remarks cannot exceed 500 characters").optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["literal"](""))
});
const DEFAULT_APPOINTMENT_STATUSES = [
    {
        id: 1,
        code: "OPDBKD",
        description: "OPD Booked"
    },
    {
        id: 2,
        code: "OPDCMP",
        description: "OPD Completed"
    },
    {
        id: 3,
        code: "NOTVIS",
        description: "Not Visited"
    },
    {
        id: 4,
        code: "CANCEL",
        description: "Appointment Cancelled"
    },
    {
        id: 5,
        code: "RESCHD",
        description: "Appointment Rescheduled"
    }
];
const ScheduleVisitDialog = ({ open, onClose, lead, siteVisitStatuses = [], onSubmit, isLoading, dialogType = "Appointment", appointment = null })=>{
    _s();
    const isEdit = !!appointment;
    const [isPopoverOpen, setIsPopoverOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isTimePopoverOpen, setIsTimePopoverOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { data: masterData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllMasterDataQuery"])();
    const [selectedLeadUuid, setSelectedLeadUuid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const { data: leadsData, isLoading: isLoadingLeads } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetLeadsQuery"])({
        offset: 0
    }, {
        skip: !!lead
    });
    const allLeads = Array.isArray(leadsData) ? leadsData : leadsData?.data || [];
    const effectiveLead = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ScheduleVisitDialog.useMemo[effectiveLead]": ()=>{
            if (lead) return lead;
            if (selectedLeadUuid) {
                return allLeads.find({
                    "ScheduleVisitDialog.useMemo[effectiveLead]": (l)=>l.uuid === selectedLeadUuid
                }["ScheduleVisitDialog.useMemo[effectiveLead]"]) || null;
            }
            return null;
        }
    }["ScheduleVisitDialog.useMemo[effectiveLead]"], [
        lead,
        selectedLeadUuid,
        allLeads
    ]);
    // Derive Location & Branch IDs from Lead
    const derivedBranchId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ScheduleVisitDialog.useMemo[derivedBranchId]": ()=>{
            if (appointment?.location_id || appointment?.branch_id) {
                return Number(appointment.location_id || appointment.branch_id);
            }
            const bId = effectiveLead?.branch_id || effectiveLead?.location_id;
            if (bId && !isNaN(Number(bId)) && Number(bId) > 0) return Number(bId);
            const bName = effectiveLead?.hospital_branch || effectiveLead?.branch || effectiveLead?.branch_name;
            if (bName && masterData?.branches) {
                const found = masterData.branches.find({
                    "ScheduleVisitDialog.useMemo[derivedBranchId].found": (b)=>b.description?.toLowerCase() === String(bName).toLowerCase() || b.code?.toLowerCase() === String(bName).toLowerCase()
                }["ScheduleVisitDialog.useMemo[derivedBranchId].found"]);
                if (found) return found.id;
            }
            return null;
        }
    }["ScheduleVisitDialog.useMemo[derivedBranchId]"], [
        effectiveLead,
        masterData?.branches,
        appointment
    ]);
    // Derive Specialisation ID from Lead
    const derivedSpecId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ScheduleVisitDialog.useMemo[derivedSpecId]": ()=>{
            if (appointment?.specialisation_id || appointment?.specialization_id) {
                return Number(appointment.specialisation_id || appointment.specialization_id);
            }
            const dept = effectiveLead?.specialisation_id || effectiveLead?.specialization_id || effectiveLead?.department || effectiveLead?.specialization || "";
            if (!dept) return 0;
            if (!isNaN(Number(dept)) && Number(dept) > 0) return Number(dept);
            const found = masterData?.specialisations?.find({
                "ScheduleVisitDialog.useMemo[derivedSpecId]": (s)=>s.description?.toLowerCase() === String(dept).toLowerCase() || s.code?.toLowerCase() === String(dept).toLowerCase()
            }["ScheduleVisitDialog.useMemo[derivedSpecId]"]);
            return found ? found.id : 0;
        }
    }["ScheduleVisitDialog.useMemo[derivedSpecId]"], [
        effectiveLead,
        masterData?.specialisations,
        appointment
    ]);
    const [selectedLocationId, setSelectedLocationId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedBranchId, setSelectedBranchId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Synchronize branch and location
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScheduleVisitDialog.useEffect": ()=>{
            if (derivedBranchId) {
                setSelectedBranchId(derivedBranchId);
                const foundBranch = masterData?.branches?.find({
                    "ScheduleVisitDialog.useEffect": (b)=>b.id === derivedBranchId
                }["ScheduleVisitDialog.useEffect"]);
                if (foundBranch) {
                    setSelectedLocationId(foundBranch.location_id);
                }
            } else if (effectiveLead?.location_id) {
                setSelectedLocationId(effectiveLead.location_id);
            }
        }
    }["ScheduleVisitDialog.useEffect"], [
        derivedBranchId,
        effectiveLead,
        masterData?.branches
    ]);
    // Fetch all doctors across the hospital
    const { data: doctorsResp, isLoading: isLoadingDoctors } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$doctors$2f$api$2f$doctorsApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllDoctorsQuery"])({
        branch_id: 0,
        specialization_id: 0
    });
    const doctorsList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ScheduleVisitDialog.useMemo[doctorsList]": ()=>{
            let list = [];
            if (doctorsResp) {
                if (Array.isArray(doctorsResp)) list = doctorsResp;
                else if (Array.isArray(doctorsResp.data)) list = doctorsResp.data;
                else if (Array.isArray(doctorsResp.doctors)) list = doctorsResp.doctors;
            }
            const currentDocId = appointment?.doctor_id;
            if (currentDocId && !list.some({
                "ScheduleVisitDialog.useMemo[doctorsList]": (d)=>Number(d.id) === Number(currentDocId)
            }["ScheduleVisitDialog.useMemo[doctorsList]"])) {
                list = [
                    {
                        id: Number(currentDocId),
                        first_name: appointment.doctor_name || `Doctor #${currentDocId}`,
                        last_name: "",
                        specialization_id: derivedSpecId
                    },
                    ...list
                ];
            }
            return list;
        }
    }["ScheduleVisitDialog.useMemo[doctorsList]"], [
        doctorsResp,
        appointment,
        derivedSpecId
    ]);
    const statuses = masterData?.appointment_status && masterData.appointment_status.length > 0 ? masterData.appointment_status : masterData?.appointment_statuses && masterData.appointment_statuses.length > 0 ? masterData.appointment_statuses : siteVisitStatuses.length > 0 ? siteVisitStatuses : DEFAULT_APPOINTMENT_STATUSES;
    const defaultStatus = statuses.find((s)=>s.code === "OPDBKD" || s.description?.toUpperCase()?.includes("BOOKED") || s.description?.toUpperCase()?.includes("SCHEDULED") || s.code === "SCHD");
    const defaultStatusId = defaultStatus?.id || 1;
    const { control, register, handleSubmit, setValue, reset, formState: { errors } } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zodResolver"])(scheduleVisitSchema),
        defaultValues: {
            doctor_id: appointment?.doctor_id || undefined,
            visit_date_time: appointment?.visit_date_time || "",
            visit_status: appointment?.appointments_status_id || appointment?.appointment_status_id || appointment?.visit_status || defaultStatusId,
            visit_remarks: appointment?.visit_remarks || ""
        }
    });
    const watchDoctorId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control,
        name: "doctor_id"
    });
    const watchRemarks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control,
        name: "visit_remarks"
    });
    const watchStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control,
        name: "visit_status"
    });
    const [date, setDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [hour, setHour] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [minute, setMinute] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [period, setPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [timeError, setTimeError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScheduleVisitDialog.useEffect": ()=>{
            if (open) {
                if (appointment) {
                    if (appointment.visit_date_time) {
                        try {
                            const validStr = appointment.visit_date_time.replace(/Z/g, "").split("+")[0].replace(" ", "T");
                            const d = new Date(validStr);
                            if (!isNaN(d.getTime())) {
                                setDate(d);
                                let h = d.getHours();
                                const m = String(d.getMinutes()).padStart(2, "0");
                                const p = h >= 12 ? "PM" : "AM";
                                h = h % 12 || 12;
                                setHour(String(h).padStart(2, "0"));
                                setMinute(m);
                                setPeriod(p);
                            }
                        } catch  {
                        // fallback
                        }
                    }
                    reset({
                        doctor_id: appointment.doctor_id ? Number(appointment.doctor_id) : undefined,
                        visit_date_time: appointment.visit_date_time || "",
                        visit_status: appointment.appointments_status_id || appointment.appointment_status_id || appointment.visit_status || defaultStatusId,
                        visit_remarks: appointment.visit_remarks || ""
                    });
                } else {
                    setDate(undefined);
                    setHour("");
                    setMinute("");
                    setPeriod("");
                    setTimeError("");
                    reset({
                        doctor_id: undefined,
                        visit_date_time: "",
                        visit_status: defaultStatusId,
                        visit_remarks: ""
                    });
                }
            }
        }
    }["ScheduleVisitDialog.useEffect"], [
        open,
        appointment,
        reset,
        defaultStatusId
    ]);
    const handleFormSubmit = async (data)=>{
        if (!data.doctor_id) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please select a doctor");
            return;
        }
        if (!date || !hour || !minute || !period || !effectiveLead && !selectedLeadUuid) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please select both visit date and time");
            return;
        }
        let hrs = parseInt(hour);
        if (period === "PM" && hrs !== 12) hrs += 12;
        if (period === "AM" && hrs === 12) hrs = 0;
        const now = new Date();
        const selectedDateTime = new Date(date);
        selectedDateTime.setHours(hrs);
        selectedDateTime.setMinutes(parseInt(minute));
        selectedDateTime.setSeconds(0);
        if (!isEdit && selectedDateTime < now) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Cannot schedule visit in the past");
            return;
        }
        const finalRemarks = dialogType === "Surgery" ? data.visit_remarks ? data.visit_remarks.includes("[Surgery]") ? data.visit_remarks : `[Surgery] ${data.visit_remarks}` : "[Surgery]" : data.visit_remarks || "";
        const payload = {
            lead_uuid: effectiveLead ? effectiveLead.uuid : selectedLeadUuid,
            doctor_id: Number(data.doctor_id),
            visit_date_time: selectedDateTime.toISOString(),
            visit_remarks: finalRemarks,
            location_id: selectedBranchId ? Number(selectedBranchId) : undefined,
            visit_status: Number(data.visit_status || defaultStatusId),
            appointments_status_id: Number(data.visit_status || defaultStatusId)
        };
        if (appointment?.appointment_id || appointment?.id) {
            payload.id = appointment.appointment_id || appointment.id;
            payload.is_active = appointment.is_active ?? 1;
        }
        await onSubmit(payload);
    };
    const branchObj = masterData?.branches?.find((b)=>b.id === selectedBranchId);
    const locationObj = masterData?.locations?.find((l)=>l.id === (branchObj?.location_id || selectedLocationId));
    const specObj = masterData?.specialisations?.find((s)=>s.id === derivedSpecId);
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white dark:bg-zinc-950 w-full max-w-lg rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col max-h-[90vh] relative overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 flex items-center justify-between",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__["Stethoscope"], {
                                        className: "h-5 w-5 text-[#063669] dark:text-blue-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 358,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    isEdit ? "Edit Appointment" : dialogType === "Surgery" ? "Schedule Surgery" : "Schedule Appointment"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                lineNumber: 357,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-zinc-500 mt-0.5",
                                children: effectiveLead ? `${isEdit ? "Update appointment details" : "Schedule an appointment"} for ${effectiveLead.first_name || ""} ${effectiveLead.last_name || ""}`.trim() : `${isEdit ? "Update appointment details" : "Schedule an appointment"} for a lead`
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                lineNumber: 365,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                        lineNumber: 356,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                    lineNumber: 355,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-6 custom-scrollbar space-y-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        id: "schedule-visit-form",
                        onSubmit: handleSubmit(handleFormSubmit),
                        className: "space-y-4 text-sm",
                        children: [
                            !lead && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "text-xs font-bold text-zinc-700 dark:text-zinc-300",
                                        children: [
                                            "Select Lead ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-500",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 386,
                                                columnNumber: 31
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 385,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        value: selectedLeadUuid,
                                        onValueChange: setSelectedLeadUuid,
                                        disabled: isLoadingLeads,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                className: "rounded-xl h-11 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: "Search / Select a lead"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                    lineNumber: 394,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 393,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                className: "bg-white dark:bg-zinc-900 text-black dark:text-white z-[99999]",
                                                children: allLeads.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: l.uuid,
                                                        className: "text-black dark:text-white cursor-pointer",
                                                        children: [
                                                            l.first_name,
                                                            " ",
                                                            l.last_name,
                                                            " (",
                                                            l.lead_id,
                                                            ")"
                                                        ]
                                                    }, l.uuid, true, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 398,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 396,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 388,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                lineNumber: 384,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            effectiveLead && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 rounded-2xl bg-blue-50/40 dark:bg-zinc-900/50 border border-blue-100 dark:border-zinc-800 flex flex-wrap items-center gap-3 text-xs",
                                children: [
                                    locationObj && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1 text-zinc-600 dark:text-zinc-300 font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                className: "h-3.5 w-3.5 text-[#063669] dark:text-blue-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 416,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Location: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: locationObj.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 417,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 417,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 415,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    branchObj && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1 text-zinc-600 dark:text-zinc-300 font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"], {
                                                className: "h-3.5 w-3.5 text-[#063669] dark:text-blue-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 422,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Branch: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: branchObj.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 423,
                                                        columnNumber: 35
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 423,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 421,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    specObj && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1 text-zinc-600 dark:text-zinc-300 font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                className: "h-3.5 w-3.5 text-[#063669] dark:text-blue-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 428,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Dept: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: specObj.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 429,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 429,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 427,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                lineNumber: 413,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__["Stethoscope"], {
                                                        className: "h-3.5 w-3.5 text-[#063669] dark:text-blue-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 439,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Select Doctor ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-500",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 440,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 438,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            isLoadingDoctors && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-zinc-400 flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        className: "h-3 w-3 animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 444,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    " Loading doctors..."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 443,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 437,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        value: watchDoctorId ? String(watchDoctorId) : "",
                                        onValueChange: (val)=>setValue("doctor_id", Number(val), {
                                                shouldValidate: true
                                            }),
                                        disabled: isLoading || isLoadingDoctors,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                className: "rounded-xl h-11 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: isLoadingDoctors ? "Loading available doctors..." : doctorsList.length === 0 ? "No doctors found" : "-- Select Doctor * --"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                    lineNumber: 455,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 454,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                className: "bg-white dark:bg-zinc-900 text-black dark:text-white z-[99999] max-h-60",
                                                children: doctorsList.map((doc)=>{
                                                    const specTitle = masterData?.specialisations?.find((s)=>s.id === doc.specialization_id)?.description || "";
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: String(doc.id),
                                                        className: "text-black dark:text-white cursor-pointer py-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-xs",
                                                                    children: [
                                                                        "Dr. ",
                                                                        doc.first_name,
                                                                        " ",
                                                                        doc.last_name
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                                    lineNumber: 477,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                (doc.education || specTitle) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] text-zinc-400",
                                                                    children: [
                                                                        doc.education,
                                                                        specTitle
                                                                    ].filter(Boolean).join(" • ")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                                    lineNumber: 481,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                            lineNumber: 476,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, doc.id, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0));
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 465,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, `doctor-select-${watchDoctorId || "none"}-${doctorsList.length}`, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 448,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    errors.doctor_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-500",
                                        children: errors.doctor_id.message
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 492,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                lineNumber: 436,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-3.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                className: "text-xs font-bold text-zinc-700 dark:text-zinc-300",
                                                children: [
                                                    "Visit Date ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-500",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 501,
                                                        columnNumber: 30
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 500,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$DatePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DatePicker"], {
                                                value: date,
                                                onChange: (val, d)=>{
                                                    setDate(d);
                                                    setTimeError("");
                                                    if (d && hour && minute && period) {
                                                        let hrs = parseInt(hour);
                                                        if (period === "PM" && hrs !== 12) hrs += 12;
                                                        if (period === "AM" && hrs === 12) hrs = 0;
                                                        const selectedDateTime = new Date(d);
                                                        selectedDateTime.setHours(hrs);
                                                        selectedDateTime.setMinutes(parseInt(minute));
                                                        selectedDateTime.setSeconds(0);
                                                        if (!isEdit && selectedDateTime < new Date()) {
                                                            setTimeError("Cannot select a time in the past");
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Cannot select a time in the past");
                                                            setHour("");
                                                            setMinute("");
                                                            setPeriod("");
                                                            setValue("visit_date_time", "");
                                                        } else {
                                                            setValue("visit_date_time", selectedDateTime.toISOString(), {
                                                                shouldValidate: true
                                                            });
                                                        }
                                                    } else {
                                                        setValue("visit_date_time", "");
                                                    }
                                                },
                                                disablePastDates: !isEdit,
                                                placeholder: "Select visit date",
                                                error: errors.visit_date_time?.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 503,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            errors.visit_date_time && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-red-500",
                                                children: errors.visit_date_time.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 537,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 499,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                className: "text-xs font-bold text-zinc-700 dark:text-zinc-300",
                                                children: [
                                                    "Visit Time ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-500",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 544,
                                                        columnNumber: 30
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 543,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$TimePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TimePicker"], {
                                                value: hour && minute && period ? `${hour}:${minute} ${period}` : "",
                                                outputFormat: "12h",
                                                placeholder: "Select visit time",
                                                onChange: (val)=>{
                                                    if (!val) {
                                                        setHour("");
                                                        setMinute("");
                                                        setPeriod("");
                                                        setValue("visit_date_time", "");
                                                        return;
                                                    }
                                                    const parts = val.split(" ");
                                                    const timeParts = parts[0]?.split(":") || [];
                                                    const h = timeParts[0] || "";
                                                    const m = timeParts[1] || "";
                                                    const p = parts[1]?.toUpperCase() || "AM";
                                                    setHour(h);
                                                    setMinute(m);
                                                    setPeriod(p);
                                                    setTimeError("");
                                                    if (date && h && m && p) {
                                                        let hrs = parseInt(h);
                                                        if (p === "PM" && hrs !== 12) hrs += 12;
                                                        if (p === "AM" && hrs === 12) hrs = 0;
                                                        const selectedDateTime = new Date(date);
                                                        selectedDateTime.setHours(hrs);
                                                        selectedDateTime.setMinutes(parseInt(m));
                                                        selectedDateTime.setSeconds(0);
                                                        if (!isEdit && selectedDateTime < new Date()) {
                                                            setTimeError("Cannot select a time in the past");
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Cannot select a time in the past");
                                                            setValue("visit_date_time", "");
                                                        } else {
                                                            setValue("visit_date_time", selectedDateTime.toISOString(), {
                                                                shouldValidate: true
                                                            });
                                                        }
                                                    } else {
                                                        setValue("visit_date_time", "");
                                                    }
                                                },
                                                error: timeError
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 546,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            timeError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-red-500",
                                                children: timeError
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 591,
                                                columnNumber: 31
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 542,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                lineNumber: 497,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            isEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "text-xs font-bold text-zinc-700 dark:text-zinc-300",
                                        children: "Appointment Status"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 598,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        value: watchStatus ? String(watchStatus) : String(defaultStatusId),
                                        onValueChange: (val)=>setValue("visit_status", Number(val)),
                                        disabled: isLoading,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                className: "rounded-xl h-11 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: "Select Status"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                    lineNumber: 607,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 606,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                className: "bg-white dark:bg-zinc-900 text-black dark:text-white z-[99999]",
                                                children: statuses.map((st)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: String(st.id),
                                                        className: "cursor-pointer",
                                                        children: st.description
                                                    }, st.id, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 611,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 609,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 601,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                lineNumber: 597,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "visit_remarks",
                                                className: "text-xs font-bold text-zinc-700 dark:text-zinc-300",
                                                children: "Visit Remarks"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 623,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-zinc-400 font-bold",
                                                children: [
                                                    (watchRemarks || "").length,
                                                    "/500"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 626,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 622,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "visit_remarks",
                                        maxLength: 500,
                                        placeholder: "Enter appointment remarks (up to 500 characters)...",
                                        disabled: isLoading,
                                        ...register("visit_remarks"),
                                        rows: 3,
                                        className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs font-medium focus:ring-1 focus:ring-[#063669] outline-none transition-all resize-none placeholder:text-zinc-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 630,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                lineNumber: 621,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                        lineNumber: 377,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                    lineNumber: 376,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-end gap-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "button",
                            variant: "outline",
                            onClick: onClose,
                            disabled: isLoading,
                            className: "rounded-xl text-xs font-bold h-10 px-5",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                            lineNumber: 645,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "submit",
                            form: "schedule-visit-form",
                            disabled: isLoading,
                            className: "rounded-xl text-xs font-bold bg-[#063669] hover:bg-[#063669]/90 text-white h-10 px-6 gap-2",
                            children: [
                                isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "h-4 w-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                    lineNumber: 660,
                                    columnNumber: 27
                                }, ("TURBOPACK compile-time value", void 0)),
                                isEdit ? "Update Appointment" : dialogType === "Surgery" ? "Schedule Surgery" : "Schedule Appointment"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                            lineNumber: 654,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                    lineNumber: 644,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
            lineNumber: 353,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
        lineNumber: 352,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ScheduleVisitDialog, "/byeaR4fAKPatiN1SAxT6hP8YWk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllMasterDataQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetLeadsQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$doctors$2f$api$2f$doctorsApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllDoctorsQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"]
    ];
});
_c = ScheduleVisitDialog;
var _c;
__turbopack_context__.k.register(_c, "ScheduleVisitDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/pages/JunkLeadsPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InitialsAvatar",
    ()=>InitialsAvatar,
    "JunkLeadsPage",
    ()=>JunkLeadsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DataTable$2f$DataTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/DataTable/DataTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/hooks/useMasterDataLookup.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/api/leadsApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useDebounce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/hooks/useDebounce.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$FilterDialog$2f$FilterDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/FilterDialog/FilterDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>");
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
const DUMMY_JUNK_LEADS = [
    {
        uuid: 'dummy-junk-001',
        lead_id: 1001,
        customer_uuid: 'dummy-customer-001',
        project_id: 101,
        source_id: 1,
        source_employee_user_id: null,
        lead_priority_id: 2,
        assigned_to_rm: 201,
        assigned_to_em: 301,
        is_active: 1,
        created_by: 1,
        created_on: '2026-09-15T09:30:00.000Z',
        updated_by: null,
        updated_on: null,
        first_name: 'Ananya',
        last_name: 'Reddy',
        phone_number: '+91 98765 43210',
        email_address: 'ananya.reddy@example.com',
        junk_reason: 'Duplicate enquiry',
        source_name: 'Website',
        project_name: 'Nizampet',
        status: 'Junk Pending',
        rm_name: 'Rahul Mehta',
        em_name: 'Nisha Kapoor'
    },
    {
        uuid: 'dummy-junk-002',
        lead_id: 1002,
        customer_uuid: 'dummy-customer-002',
        project_id: 102,
        source_id: 2,
        source_employee_user_id: null,
        lead_priority_id: 1,
        assigned_to_rm: 202,
        assigned_to_em: 302,
        is_active: 1,
        created_by: 1,
        created_on: '2026-09-14T11:10:00.000Z',
        updated_by: null,
        updated_on: null,
        first_name: 'Vikram',
        last_name: 'Shah',
        phone_number: '+91 91234 56789',
        email_address: 'vikram.shah@example.com',
        junk_reason: 'Invalid phone number',
        source_name: 'Doctor Referral',
        project_name: 'Kondapur',
        status: 'Junk Pending',
        rm_name: 'Priya Sharma',
        em_name: 'Arjun Nair'
    },
    {
        uuid: 'dummy-junk-003',
        lead_id: 1003,
        customer_uuid: 'dummy-customer-003',
        project_id: 103,
        source_id: 3,
        source_employee_user_id: null,
        lead_priority_id: 1,
        assigned_to_rm: 203,
        assigned_to_em: 303,
        is_active: 1,
        created_by: 1,
        created_on: '2026-09-13T14:45:00.000Z',
        updated_by: null,
        updated_on: null,
        first_name: 'Meera',
        last_name: 'Iyer',
        phone_number: '+91 99887 76655',
        email_address: 'meera.iyer@example.com',
        junk_reason: 'Test enquiry',
        source_name: 'Walk-in',
        project_name: 'KPHB',
        status: 'Junk Confirmed',
        rm_name: 'Karan Verma',
        em_name: 'Sneha Rao'
    },
    {
        uuid: 'dummy-junk-004',
        lead_id: 1004,
        customer_uuid: 'dummy-customer-004',
        project_id: 104,
        source_id: 4,
        source_employee_user_id: null,
        lead_priority_id: 3,
        assigned_to_rm: 204,
        assigned_to_em: null,
        is_active: 1,
        created_by: 1,
        created_on: '2026-09-12T10:20:00.000Z',
        updated_by: null,
        updated_on: null,
        first_name: 'Aditya',
        last_name: 'Menon',
        phone_number: '+91 90000 11223',
        email_address: 'aditya.menon@example.com',
        junk_reason: 'Not interested',
        source_name: 'Google Ads',
        project_name: 'Nizampet',
        status: 'Junk Pending',
        rm_name: 'Neha Singh',
        em_name: 'Unassigned'
    },
    {
        uuid: 'dummy-junk-005',
        lead_id: 1005,
        customer_uuid: 'dummy-customer-005',
        project_id: 105,
        source_id: 5,
        source_employee_user_id: null,
        lead_priority_id: 2,
        assigned_to_rm: 205,
        assigned_to_em: 305,
        is_active: 1,
        created_by: 1,
        created_on: '2026-09-11T16:05:00.000Z',
        updated_by: null,
        updated_on: null,
        first_name: 'Kavya',
        last_name: 'Nair',
        phone_number: '+91 94444 55667',
        email_address: 'kavya.nair@example.com',
        junk_reason: 'Spam submission',
        source_name: 'Social Media',
        project_name: 'KPHB',
        status: 'Junk Confirmed',
        rm_name: 'Rohit Gupta',
        em_name: 'Asha Patel'
    }
];
const InitialsAvatar = ({ firstName, lastName })=>{
    const initials = `${(firstName || '')[0] || ''}${(lastName || '')[0] || ''}`.toUpperCase() || '?';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-6 w-6 rounded-4xl bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 flex items-center justify-center font-bold shrink-0 text-[10px]",
        children: initials
    }, void 0, false, {
        fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = InitialsAvatar;
const JunkLeadsPage = ({ onVerify, canVerify, search })=>{
    _s();
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [limit, setLimit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    const [isFilterDialogOpen, setIsFilterDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [statusIds, setStatusIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const debouncedSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useDebounce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDebounce"])(search, 500);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "JunkLeadsPage.useEffect": ()=>{
            setPage(1);
        }
    }["JunkLeadsPage.useEffect"], [
        debouncedSearch
    ]);
    const { getStatusLabel, getProjectLabel, getRmLabel, getSourceLabel, getEmLabel, getProjectLeadStatusLabel, masterData, projectLeadStatuses } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"])();
    const allJunkStatusIds = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "JunkLeadsPage.useMemo[allJunkStatusIds]": ()=>{
            const globalJunkIds = (masterData?.lead_statuses || []).filter({
                "JunkLeadsPage.useMemo[allJunkStatusIds].globalJunkIds": (s)=>s.code === "JUNKPE" || s.code === "JUNKCM"
            }["JunkLeadsPage.useMemo[allJunkStatusIds].globalJunkIds"]).map({
                "JunkLeadsPage.useMemo[allJunkStatusIds].globalJunkIds": (s)=>Number(s.id)
            }["JunkLeadsPage.useMemo[allJunkStatusIds].globalJunkIds"]);
            const statusIdSet = new Set(globalJunkIds);
            (projectLeadStatuses || []).forEach({
                "JunkLeadsPage.useMemo[allJunkStatusIds]": (proj)=>{
                    if (Array.isArray(proj.status)) {
                        proj.status.forEach({
                            "JunkLeadsPage.useMemo[allJunkStatusIds]": (st)=>{
                                if (globalJunkIds.includes(Number(st.lead_status_id))) {
                                    statusIdSet.add(Number(st.id));
                                }
                            }
                        }["JunkLeadsPage.useMemo[allJunkStatusIds]"]);
                    }
                }
            }["JunkLeadsPage.useMemo[allJunkStatusIds]"]);
            return Array.from(statusIdSet);
        }
    }["JunkLeadsPage.useMemo[allJunkStatusIds]"], [
        masterData,
        projectLeadStatuses
    ]);
    const junkStatusOptions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "JunkLeadsPage.useMemo[junkStatusOptions]": ()=>{
            const liveOptions = (masterData?.lead_statuses || []).filter({
                "JunkLeadsPage.useMemo[junkStatusOptions].liveOptions": (status)=>status.code === 'JUNKPE' || status.code === 'JUNKCM'
            }["JunkLeadsPage.useMemo[junkStatusOptions].liveOptions"]).map({
                "JunkLeadsPage.useMemo[junkStatusOptions].liveOptions": (status)=>({
                        value: String(status.id),
                        label: status.description
                    })
            }["JunkLeadsPage.useMemo[junkStatusOptions].liveOptions"]);
            return liveOptions.length > 0 ? liveOptions : [
                {
                    value: 'demo-junk-pending',
                    label: 'Junk Pending'
                },
                {
                    value: 'demo-junk-confirmed',
                    label: 'Junk Confirmed'
                }
            ];
        }
    }["JunkLeadsPage.useMemo[junkStatusOptions]"], [
        masterData
    ]);
    const selectedStatusLabels = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "JunkLeadsPage.useMemo[selectedStatusLabels]": ()=>{
            const selected = new Set(statusIds);
            return junkStatusOptions.filter({
                "JunkLeadsPage.useMemo[selectedStatusLabels]": (option)=>selected.has(option.value)
            }["JunkLeadsPage.useMemo[selectedStatusLabels]"]).map({
                "JunkLeadsPage.useMemo[selectedStatusLabels]": (option)=>option.label.toLowerCase()
            }["JunkLeadsPage.useMemo[selectedStatusLabels]"]);
        }
    }["JunkLeadsPage.useMemo[selectedStatusLabels]"], [
        junkStatusOptions,
        statusIds
    ]);
    const { data: leadsData, isLoading, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetLeadsQuery"])({
        offset: (page - 1) * limit,
        search_text: debouncedSearch || undefined,
        status: statusIds.length > 0 ? statusIds.map(Number).filter({
            "JunkLeadsPage.useGetLeadsQuery": (id)=>Number.isFinite(id)
        }["JunkLeadsPage.useGetLeadsQuery"]) : allJunkStatusIds.length > 0 ? allJunkStatusIds : undefined
    }, {
        skip: allJunkStatusIds.length === 0
    });
    const liveLeads = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "JunkLeadsPage.useMemo[liveLeads]": ()=>{
            return Array.isArray(leadsData) ? leadsData : leadsData?.data || [];
        }
    }["JunkLeadsPage.useMemo[liveLeads]"], [
        leadsData
    ]);
    const dummyLeads = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "JunkLeadsPage.useMemo[dummyLeads]": ()=>{
            const query = debouncedSearch.trim().toLowerCase();
            return DUMMY_JUNK_LEADS.filter({
                "JunkLeadsPage.useMemo[dummyLeads]": (lead)=>{
                    const matchesSearch = !query || [
                        lead.lead_id,
                        lead.first_name,
                        lead.last_name,
                        lead.phone_number,
                        lead.email_address,
                        lead.junk_reason,
                        lead.project_name
                    ].some({
                        "JunkLeadsPage.useMemo[dummyLeads]": (value)=>String(value || '').toLowerCase().includes(query)
                    }["JunkLeadsPage.useMemo[dummyLeads]"]);
                    const matchesStatus = selectedStatusLabels.length === 0 || selectedStatusLabels.some({
                        "JunkLeadsPage.useMemo[dummyLeads]": (label)=>lead.status.toLowerCase().includes(label)
                    }["JunkLeadsPage.useMemo[dummyLeads]"]);
                    return matchesSearch && matchesStatus;
                }
            }["JunkLeadsPage.useMemo[dummyLeads]"]);
        }
    }["JunkLeadsPage.useMemo[dummyLeads]"], [
        debouncedSearch,
        selectedStatusLabels
    ]);
    const hasLiveDataset = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "JunkLeadsPage.useMemo[hasLiveDataset]": ()=>{
            if (liveLeads.length > 0) return true;
            if (!Array.isArray(leadsData) && leadsData && typeof leadsData === 'object') {
                return Number(leadsData.filtered_count || leadsData.total_count || 0) > 0;
            }
            return false;
        }
    }["JunkLeadsPage.useMemo[hasLiveDataset]"], [
        leadsData,
        liveLeads.length
    ]);
    const leads = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "JunkLeadsPage.useMemo[leads]": ()=>{
            if (hasLiveDataset) return liveLeads;
            const start = (page - 1) * limit;
            return dummyLeads.slice(start, start + limit);
        }
    }["JunkLeadsPage.useMemo[leads]"], [
        dummyLeads,
        hasLiveDataset,
        limit,
        liveLeads,
        page
    ]);
    const total = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "JunkLeadsPage.useMemo[total]": ()=>{
            if (!hasLiveDataset) return dummyLeads.length;
            if (!Array.isArray(leadsData) && leadsData && typeof leadsData === 'object') {
                if (leadsData.filtered_count !== undefined && leadsData.filtered_count !== null) {
                    return leadsData.filtered_count;
                }
                if (leadsData.total_count !== undefined && leadsData.total_count !== null) {
                    return leadsData.total_count;
                }
            }
            return leads.length < limit ? (page - 1) * limit + leads.length : (page - 1) * limit + limit + 1;
        }
    }["JunkLeadsPage.useMemo[total]"], [
        dummyLeads.length,
        hasLiveDataset,
        leadsData,
        leads.length,
        page,
        limit
    ]);
    const fallback = (value)=>value ?? '--';
    const columns = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "JunkLeadsPage.useMemo[columns]": ()=>{
            const baseColumns = [
                {
                    key: 'lead_id',
                    header: 'LEAD ID',
                    width: '110px',
                    render: {
                        "JunkLeadsPage.useMemo[columns]": (l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                                to: `/leads/${l.uuid}`,
                                state: {
                                    lead: l,
                                    branch_id: l.branch_id,
                                    branch: l.branch,
                                    branch_name: l.branch_name,
                                    hospital_branch: l.hospital_branch,
                                    specialisation_id: l.specialisation_id,
                                    department: l.department
                                },
                                className: "text-secondary-foreground font-semibold hover:text-primary transition-colors text-xs",
                                children: [
                                    "#",
                                    fallback(l.lead_id)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                lineNumber: 227,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                    }["JunkLeadsPage.useMemo[columns]"]
                },
                {
                    key: 'customer_name',
                    header: 'CUSTOMER NAME',
                    width: '150px',
                    render: {
                        "JunkLeadsPage.useMemo[columns]": (l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-primary text-xs",
                                children: [
                                    fallback(l.first_name),
                                    " ",
                                    l.last_name || ''
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                    }["JunkLeadsPage.useMemo[columns]"]
                },
                {
                    key: 'contact_details',
                    header: 'CONTACT DETAILS',
                    width: '150px',
                    render: {
                        "JunkLeadsPage.useMemo[columns]": (l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-zinc-800 dark:text-zinc-100 font-medium text-xs",
                                        children: fallback(l.phone_number)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                        lineNumber: 252,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-zinc-400 text-[11px] truncate",
                                        children: l.email_address || '--'
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                        lineNumber: 253,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                    }["JunkLeadsPage.useMemo[columns]"]
                },
                {
                    key: 'source_id',
                    header: 'SOURCE',
                    width: '140px',
                    render: {
                        "JunkLeadsPage.useMemo[columns]": (l)=>{
                            const sourceText = l.source_name || l.source || getSourceLabel(l.source_id);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400",
                                children: sourceText && sourceText !== '--' ? sourceText.split(' ')[0] : '--'
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                lineNumber: 264,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0));
                        }
                    }["JunkLeadsPage.useMemo[columns]"]
                },
                {
                    key: 'project_id',
                    header: 'PROJECT',
                    width: '150px',
                    render: {
                        "JunkLeadsPage.useMemo[columns]": (l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-medium text-zinc-700 dark:text-zinc-300",
                                children: l.project_name || getProjectLabel(l.project_id)
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                lineNumber: 275,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                    }["JunkLeadsPage.useMemo[columns]"]
                },
                {
                    key: 'lead_status_id',
                    header: 'STATUS',
                    width: '130px',
                    render: {
                        "JunkLeadsPage.useMemo[columns]": (l)=>{
                            const projStatus = getProjectLeadStatusLabel(l.project_lead_status_id);
                            const statusText = l.status || (projStatus && projStatus !== '--' ? projStatus : getStatusLabel(l.lead_status_id));
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200/50",
                                children: statusText
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                lineNumber: 288,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0));
                        }
                    }["JunkLeadsPage.useMemo[columns]"]
                },
                {
                    key: 'assigned_to_rm',
                    header: 'ASSIGNED RM',
                    width: '180px',
                    render: {
                        "JunkLeadsPage.useMemo[columns]": (l)=>{
                            const label = l.rm_name || getRmLabel(l.assigned_to_rm);
                            if (label === '--') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-zinc-400 text-xs italic",
                                children: "Unassigned"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                lineNumber: 300,
                                columnNumber: 38
                            }, ("TURBOPACK compile-time value", void 0));
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InitialsAvatar, {
                                        firstName: label.split(' ')[0],
                                        lastName: label.split(' ')[1]
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                        lineNumber: 303,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-medium text-zinc-700 dark:text-zinc-300",
                                        children: label
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                        lineNumber: 304,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                lineNumber: 302,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0));
                        }
                    }["JunkLeadsPage.useMemo[columns]"]
                },
                {
                    key: 'assigned_to_em',
                    header: 'EM NAME',
                    width: '180px',
                    render: {
                        "JunkLeadsPage.useMemo[columns]": (l)=>{
                            let label = l.em_name || getEmLabel(l.assigned_to_em);
                            if (label === '--' && l.em_name) {
                                label = l.em_name;
                            } else if (label === '--' && l.em_first_name) {
                                label = `${l.em_first_name} ${l.em_last_name || ''}`.trim();
                            }
                            if (label === '--') {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-zinc-400 text-xs italic",
                                    children: "Unassigned"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                    lineNumber: 322,
                                    columnNumber: 20
                                }, ("TURBOPACK compile-time value", void 0));
                            }
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InitialsAvatar, {
                                        firstName: label.split(' ')[0],
                                        lastName: label.split(' ')[1]
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                        lineNumber: 326,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-medium text-zinc-700 dark:text-zinc-300",
                                        children: label
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                        lineNumber: 330,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                lineNumber: 325,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0));
                        }
                    }["JunkLeadsPage.useMemo[columns]"]
                },
                {
                    key: 'junk_reason',
                    header: 'JUNK REASON',
                    width: '200px',
                    render: {
                        "JunkLeadsPage.useMemo[columns]": (l)=>{
                            const text = l.junk_reason || '--';
                            const shortText = text.length > 10 ? text.slice(0, 10) + '...' : text;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-[120px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    title: text,
                                    className: "text-[11px] text-zinc-600 dark:text-zinc-400 font-medium cursor-pointer",
                                    children: shortText
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                    lineNumber: 349,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                lineNumber: 348,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0));
                        }
                    }["JunkLeadsPage.useMemo[columns]"]
                }
            ];
            if (canVerify) {
                baseColumns.push({
                    key: 'actions',
                    header: 'ACTIONS',
                    width: '120px',
                    render: {
                        "JunkLeadsPage.useMemo[columns]": (l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                variant: "default",
                                size: "sm",
                                className: "bg-[#0f3d6b] hover:bg-[#0c3156] text-white font-extrabold h-8 px-4 rounded-lg shadow-sm transition-all active:scale-95 text-[10px] uppercase tracking-wider",
                                onClick: {
                                    "JunkLeadsPage.useMemo[columns]": (e)=>{
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onVerify(l);
                                    }
                                }["JunkLeadsPage.useMemo[columns]"],
                                children: "Verify Lead"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                lineNumber: 367,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                    }["JunkLeadsPage.useMemo[columns]"]
                });
            }
            return baseColumns;
        }
    }["JunkLeadsPage.useMemo[columns]"], [
        canVerify,
        onVerify,
        getStatusLabel,
        getProjectLabel,
        getRmLabel,
        getSourceLabel,
        getEmLabel
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-hidden rounded-md border border-zinc-200/60 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:border-zinc-800/60 dark:bg-zinc-950 dark:shadow-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-8 py-5 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-50/30 dark:bg-zinc-900/10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-black text-zinc-900 dark:text-zinc-100 tracking-tight",
                                        children: "Active Junk Leads Queue"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                        lineNumber: 394,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-2 h-2 rounded-full bg-rose-500 animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                        lineNumber: 395,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    (isLoading || isFetching) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "h-4 w-4 animate-spin text-zinc-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                        lineNumber: 396,
                                        columnNumber: 43
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                lineNumber: 393,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                variant: "outline",
                                onClick: ()=>setIsFilterDialogOpen(true),
                                className: "relative h-10 gap-2 rounded-md border-zinc-200 bg-white px-5 font-bold text-[#0f1a3a] shadow-sm transition-colors hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-[#0022ff]/30 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                        lineNumber: 404,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Filter",
                                    statusIds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0022ff] px-1.5 text-[10px] font-bold text-white",
                                        children: statusIds.length
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                        lineNumber: 407,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                                lineNumber: 398,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                        lineNumber: 392,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DataTable$2f$DataTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DataTable"], {
                            columns: columns,
                            data: leads,
                            isLoading: hasLiveDataset && (isLoading || isFetching),
                            page: page,
                            limit: limit,
                            total: total,
                            onPageChange: setPage,
                            onLimitChange: (v)=>{
                                setLimit(v);
                                setPage(1);
                            },
                            rowKey: (l)=>l.uuid
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                            lineNumber: 414,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                        lineNumber: 413,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                lineNumber: 391,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$FilterDialog$2f$FilterDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FilterDialog"], {
                open: isFilterDialogOpen,
                onClose: ()=>setIsFilterDialogOpen(false),
                onApply: (filters)=>{
                    setStatusIds(filters.statusIds);
                    setPage(1);
                },
                onReset: ()=>{
                    setStatusIds([]);
                    setPage(1);
                    setIsFilterDialogOpen(false);
                },
                statusIds: statusIds,
                projectIds: [],
                rmIds: [],
                emIds: [],
                statusOptions: junkStatusOptions,
                projectOptions: [],
                rmOptions: [],
                showRmFilter: false,
                showEmFilter: false,
                showProjectFilter: false
            }, void 0, false, {
                fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
                lineNumber: 431,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/leads/pages/JunkLeadsPage.tsx",
        lineNumber: 388,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(JunkLeadsPage, "6ox352hl2fsTgXk+6BVDHvoDOng=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useDebounce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDebounce"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetLeadsQuery"]
    ];
});
_c1 = JunkLeadsPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "InitialsAvatar");
__turbopack_context__.k.register(_c1, "JunkLeadsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/pages/LeadJunkReviewPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LeadJunkReviewPage",
    ()=>LeadJunkReviewPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-client] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/hooks/useMasterDataLookup.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/hooks/usePermissions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$JunkReasonDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/JunkReasonDialog.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
const LeadJunkReviewPage = ({ lead, onBack, onReassign, onApprove, onRemoveJunk, isUpdating = false })=>{
    _s();
    const { currentRole } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"])();
    const isSuperAdmin = currentRole?.code === 'SADMIN';
    const { getProjectLabel, getRmLabel, getStatusLabel, getProjectLeadStatusLabel, masterData, projectLeadStatuses } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"])();
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isApproveDialogOpen, setIsApproveDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isReassignDialogOpen, setIsReassignDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const junkCmStatusId = masterData?.lead_statuses?.find((s)=>s.code === 'JUNKCM')?.id;
    const junkPeStatusId = masterData?.lead_statuses?.find((s)=>s.code === 'JUNKPE')?.id;
    const resolvedGlobalStatusId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadJunkReviewPage.useMemo[resolvedGlobalStatusId]": ()=>{
            if (lead?.project_lead_status_id && projectLeadStatuses) {
                const projectEntry = projectLeadStatuses.find({
                    "LeadJunkReviewPage.useMemo[resolvedGlobalStatusId].projectEntry": (p)=>Number(p.project_id) === Number(lead.project_id)
                }["LeadJunkReviewPage.useMemo[resolvedGlobalStatusId].projectEntry"]);
                const statusEntry = projectEntry?.status?.find({
                    "LeadJunkReviewPage.useMemo[resolvedGlobalStatusId]": (s)=>Number(s.id) === Number(lead.project_lead_status_id)
                }["LeadJunkReviewPage.useMemo[resolvedGlobalStatusId]"]);
                if (statusEntry?.lead_status_id) {
                    return Number(statusEntry.lead_status_id);
                }
            }
            return lead?.lead_status_id;
        }
    }["LeadJunkReviewPage.useMemo[resolvedGlobalStatusId]"], [
        lead,
        projectLeadStatuses
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "LeadJunkReviewPage.useEffect": ()=>{
            console.log("=== DEBUG LeadJunkReviewPage ===", {
                leadId: lead?.lead_id,
                leadStatusId: lead?.lead_status_id,
                projectLeadStatusId: lead?.project_lead_status_id,
                projectId: lead?.project_id,
                currentRoleCode: currentRole?.code,
                isSuperAdmin,
                junkPeStatusId,
                junkCmStatusId,
                resolvedGlobalStatusId,
                conditionResult: {
                    isJunkPE: resolvedGlobalStatusId === junkPeStatusId,
                    isJunkCM: resolvedGlobalStatusId === junkCmStatusId,
                    shouldShowReassignAndApprove: resolvedGlobalStatusId === junkPeStatusId
                }
            });
        }
    }["LeadJunkReviewPage.useEffect"], [
        lead,
        currentRole,
        isSuperAdmin,
        junkPeStatusId,
        junkCmStatusId,
        resolvedGlobalStatusId
    ]);
    if (!lead) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-dashed border-zinc-200",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-zinc-500 font-medium",
                children: "Loading lead information..."
            }, void 0, false, {
                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                lineNumber: 76,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
            lineNumber: 75,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    const fallback = (val)=>val || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-zinc-400 italic",
            children: "Not provided"
        }, void 0, false, {
            fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
            lineNumber: 81,
            columnNumber: 41
        }, ("TURBOPACK compile-time value", void 0));
    // Map initials for Sales Head
    const rmLabel = getRmLabel(lead?.assigned_to_rm);
    const initials = rmLabel !== '--' ? rmLabel.split(' ').map((n)=>n[0]).join('') : 'UN';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-12 max-w-[1400px] mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    type: "button",
                    variant: "ghost",
                    onClick: onBack,
                    className: "gap-2 text-zinc-500 hover:text-[#0f3d6b] transition-colors p-0 hover:bg-transparent",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                            size: 20
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-bold text-sm",
                            children: "Back to Queue"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-10 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-6 space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-[0_2px_15px_rgba(0,0,0,0.03)]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-3 py-1 bg-rose-50 text-rose-600 text-[9px] font-black uppercase rounded-full tracking-widest border border-rose-100 dark:bg-rose-950 dark:border-rose-900",
                                                    children: getProjectLeadStatusLabel(lead.project_lead_status_id) !== '--' ? getProjectLeadStatusLabel(lead.project_lead_status_id) : getStatusLabel(lead.lead_status_id)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                    lineNumber: 107,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-zinc-400 font-bold text-xs tracking-tight",
                                                    children: [
                                                        "Lead ID: #",
                                                        lead.lead_id
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                    lineNumber: 112,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-3xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight",
                                                    children: [
                                                        lead.first_name,
                                                        " ",
                                                        lead.last_name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[#0f3d6b] font-bold text-base",
                                                    children: getProjectLabel(lead.project_id)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                            lineNumber: 115,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-10 pt-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-zinc-400 font-bold text-[9px] uppercase tracking-widest",
                                                            children: "Phone Number"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                            lineNumber: 124,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-zinc-900 dark:text-zinc-100 font-black text-sm",
                                                            children: fallback(lead.phone_number)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                            lineNumber: 125,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                    lineNumber: 123,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-zinc-400 font-bold text-[9px] uppercase tracking-widest",
                                                            children: "Email Address"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                            lineNumber: 128,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-zinc-900 dark:text-zinc-100 font-black text-sm lowercase",
                                                            children: fallback(lead.email_address)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                            lineNumber: 129,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                            lineNumber: 122,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-[0_2px_15px_rgba(0,0,0,0.03)] space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-2 bg-rose-50 text-rose-500 rounded-xl dark:bg-rose-950 dark:border-rose-900 border border-rose-100",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                    size: 20,
                                                    strokeWidth: 2.5
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                lineNumber: 138,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-black text-zinc-900 dark:text-zinc-100 tracking-tight",
                                                children: "Junk Reason Description"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                lineNumber: 141,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                        lineNumber: 137,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pl-1 space-y-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
                                                className: "text-zinc-600 dark:text-zinc-400 font-semibold text-base leading-relaxed break-words",
                                                children: [
                                                    '"',
                                                    expanded || (lead.junk_reason || '').length <= 100 ? lead.junk_reason || (lead.remarks && lead.remarks.length > 0 ? lead.remarks[0].remark : 'No specific reason recorded.') : `${(lead.junk_reason || '').substring(0, 100)}...`,
                                                    '"',
                                                    (lead.junk_reason || '').length > 100 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setExpanded(!expanded),
                                                        className: "ml-2 text-[#0f3d6b] hover:text-indigo-700 font-bold text-xs uppercase tracking-wider transition-colors",
                                                        children: expanded ? 'View Less' : 'View More'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                        lineNumber: 151,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                lineNumber: 145,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-8 h-8 rounded-full bg-[#0f3d6b] flex items-center justify-center text-[10px] font-black text-white uppercase shadow-md",
                                                        children: initials
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                        lineNumber: 162,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-zinc-900 dark:text-zinc-100 font-black text-xs",
                                                                children: rmLabel === '--' ? 'System' : rmLabel
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                                lineNumber: 166,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-zinc-300",
                                                                children: "•"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                                lineNumber: 167,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-zinc-400 font-bold text-xs tracking-tight",
                                                                children: "Lead Activity"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                                lineNumber: 168,
                                                                columnNumber: 19
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                lineNumber: 161,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-4 space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 text-center space-y-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative inline-block",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-20 h-20 rounded-full bg-[#dae5f1] dark:bg-zinc-800 flex items-center justify-center text-2xl font-black text-[#7c95b4] uppercase shadow-inner border-4 border-white dark:border-zinc-950",
                                                children: initials
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                lineNumber: 181,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-zinc-50 dark:border-zinc-900 rounded-full flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-1.5 h-1 border-b-2 border-r-2 border-white -rotate-45 mb-0.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                lineNumber: 184,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                        lineNumber: 180,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight",
                                                children: rmLabel === '--' ? 'Unassigned' : rmLabel
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                lineNumber: 190,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-zinc-400 font-bold text-[10px] uppercase tracking-widest",
                                                children: "Sales Head"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                lineNumber: 191,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                lineNumber: 179,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            resolvedGlobalStatusId === junkCmStatusId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                type: "button",
                                onClick: onRemoveJunk,
                                disabled: isUpdating,
                                className: "w-full mb-3 bg-[#0f3d6b] hover:bg-[#1e293b] text-white font-black py-5 rounded-xl gap-2 text-sm shadow transition-all active:scale-[0.98]",
                                children: "Remove as Junk"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                lineNumber: 197,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            resolvedGlobalStatusId === junkPeStatusId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        onClick: ()=>setIsReassignDialogOpen(true),
                                        className: "w-full bg-[#0f3d6b] hover:bg-[#1e293b] text-white font-black py-5 rounded-xl gap-2 text-sm shadow transition-all active:scale-[0.98]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                                                size: 18,
                                                strokeWidth: 2.5
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                lineNumber: 214,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Reassign to Sales Head"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                        lineNumber: 209,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: "outline",
                                        onClick: ()=>setIsApproveDialogOpen(true),
                                        className: "w-full bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-rose-500 font-black py-5 rounded-xl gap-2 text-sm hover:bg-rose-50 hover:border-rose-100 transition-all active:scale-[0.98]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                size: 18,
                                                strokeWidth: 2.5
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                                lineNumber: 223,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Approve Junk"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                        lineNumber: 217,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                                lineNumber: 208,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$JunkReasonDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JunkReasonDialog"], {
                open: isApproveDialogOpen,
                onClose: ()=>setIsApproveDialogOpen(false),
                onConfirm: (reason)=>{
                    onApprove(reason);
                    setIsApproveDialogOpen(false);
                },
                title: "Approve Junk Lead",
                description: "Please provide a final reason or notes for confirming this lead as junk.",
                isLoading: isUpdating
            }, void 0, false, {
                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$JunkReasonDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JunkReasonDialog"], {
                open: isReassignDialogOpen,
                onClose: ()=>setIsReassignDialogOpen(false),
                onConfirm: (reason)=>{
                    onReassign(reason);
                    setIsReassignDialogOpen(false);
                },
                title: "Reassignment Reason",
                description: "Why is this lead being reassigned back to a Sales Head?",
                isLoading: isUpdating
            }, void 0, false, {
                fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
                lineNumber: 243,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/leads/pages/LeadJunkReviewPage.tsx",
        lineNumber: 88,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LeadJunkReviewPage, "4GtW7v9mYIQSdyeAVycPnRy6c/8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"]
    ];
});
_c = LeadJunkReviewPage;
var _c;
__turbopack_context__.k.register(_c, "LeadJunkReviewPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/pages/LeadsPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LeadsPage",
    ()=>LeadsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$PageHeader$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/PageHeader/PageHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$FilterBar$2f$FilterBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/FilterBar/FilterBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$AppDrawer$2f$AppDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/AppDrawer/AppDrawer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ConfirmDialog$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/ConfirmDialog/ConfirmDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$LeadForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/LeadForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$LeadTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/LeadTable.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$BulkActionsBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/BulkActionsBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$ScheduleVisitDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/ScheduleVisitDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$LeadActivityDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/LeadActivityDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$FilterDialog$2f$FilterDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/FilterDialog/FilterDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$JunkReasonDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/JunkReasonDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$BulkImportDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/BulkImportDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-client] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/api/leadsApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master/api/masterApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/hooks/useMasterDataLookup.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/users/api/usersApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/hooks/usePermissions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$permissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/permissions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useDebounce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/hooks/useDebounce.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$getProjectStatusOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/getProjectStatusOptions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/store/leadsSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$pages$2f$JunkLeadsPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/pages/JunkLeadsPage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$pages$2f$LeadJunkReviewPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/pages/LeadJunkReviewPage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$ReassignRMModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/ReassignRMModal.tsx [app-client] (ecmascript)");
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
;
;
const LeadsPage = ()=>{
    _s();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"])();
    const location = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"])();
    const fromRMDashboard = location.state?.fromRMDashboard;
    const fromEMDashboard = location.state?.fromEMDashboard;
    const [searchParams, setSearchParams] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { currentRole, can, user: currentUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"])();
    const isAdmin = currentRole?.code === "ADMIN" || currentRole?.code === "SADMIN";
    const isSADMIN = currentRole?.code === "SADMIN";
    const canVerifyJunk = isAdmin && !isSADMIN;
    const isRM = currentRole?.code === "RELMNG";
    const isEM = currentRole?.code === "EXPMNG";
    const showTabs = isAdmin;
    const { activeTab, tabFilters } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "LeadsPage.useAppSelector": (state)=>state.leads
    }["LeadsPage.useAppSelector"]);
    const tabKey = isRM ? "0" : showTabs ? String(activeTab) : "all";
    const currentFilters = tabFilters[tabKey];
    const { page, limit, search, statusIds, projectIds, rmIds, emIds, sortField, sortOrder, selectedUuids } = currentFilters;
    // Calculate server-side offset based on 200-record chunks
    const serverOffset = Math.floor((page - 1) * limit / 200) * 200;
    // Debouncing for API efficiency
    const debouncedSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useDebounce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDebounce"])(search, 500);
    const debouncedFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useDebounce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDebounce"])({
        statusIds,
        projectIds,
        rmIds,
        emIds
    }, 300);
    // Handlers
    const handleSort = (field)=>{
        const newSortOrder = sortField === field && sortOrder === "asc" ? "desc" : "asc";
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateTabFilters"])({
            tabKey,
            updates: {
                sortField: field,
                sortOrder: newSortOrder
            }
        }));
    };
    const handleResetFilters = ()=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetTabFilters"])(tabKey));
    };
    const handleApplyFilters = (filters)=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateTabFilters"])({
            tabKey,
            updates: {
                ...filters,
                page: 1
            }
        }));
    };
    const [isDrawerOpen, setIsDrawerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isFilterDialogOpen, setIsFilterDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isBulkImportOpen, setIsBulkImportOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showRandomConfirm, setShowRandomConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingLead, setEditingLead] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { data: fullEditingLead, isLoading: isLoadingFullLead } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetLeadByIdQuery"])({
        uuid: editingLead?.uuid || ""
    }, {
        skip: !editingLead?.uuid,
        refetchOnMountOrArgChange: true
    });
    const [deleteUuid, setDeleteUuid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [schedulingLead, setSchedulingLead] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activityLead, setActivityLead] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isJunkDialogOpen, setIsJunkDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingJunkUpdate, setPendingJunkUpdate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Junk Leads Flow State
    const [activeView, setActiveView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('leads');
    const [junkSearch, setJunkSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedJunkLead, setSelectedJunkLead] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showReassignModal, setShowReassignModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleVerifyLead = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "LeadsPage.useCallback[handleVerifyLead]": (lead)=>{
            setSelectedJunkLead(lead);
            setActiveView('junk-review');
        }
    }["LeadsPage.useCallback[handleVerifyLead]"], []);
    // Data Fetching
    const { data: masterData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllMasterDataQuery"])();
    const { projectLeadStatuses } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"])();
    const { data: rms = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersByRoleIdQuery"])({
        role_id: 3,
        offset: 0
    });
    const statusOptions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadsPage.useMemo[statusOptions]": ()=>{
            const options = masterData?.lead_statuses?.map({
                "LeadsPage.useMemo[statusOptions]": (s)=>({
                        value: String(s.id),
                        label: s.description
                    })
            }["LeadsPage.useMemo[statusOptions]"]) || [];
            if (activeView === 'leads') {
                return options.filter({
                    "LeadsPage.useMemo[statusOptions]": (o)=>{
                        const s = masterData?.lead_statuses?.find({
                            "LeadsPage.useMemo[statusOptions]": (st)=>String(st.id) === o.value
                        }["LeadsPage.useMemo[statusOptions]"]);
                        return s?.code !== 'JUNKPE' && s?.code !== 'JUNKCM';
                    }
                }["LeadsPage.useMemo[statusOptions]"]);
            }
            return options;
        }
    }["LeadsPage.useMemo[statusOptions]"], [
        masterData,
        activeView
    ]);
    const projectOptions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadsPage.useMemo[projectOptions]": ()=>{
            if (!masterData?.projects) return [];
            const userProjectIds = currentUser?.project_ids || [];
            const availableProjects = isSADMIN && userProjectIds.length === 0 ? masterData.projects : masterData.projects.filter({
                "LeadsPage.useMemo[projectOptions]": (p)=>userProjectIds.includes(p.id)
            }["LeadsPage.useMemo[projectOptions]"]);
            return availableProjects.map({
                "LeadsPage.useMemo[projectOptions]": (p)=>({
                        value: String(p.id),
                        label: p.description
                    })
            }["LeadsPage.useMemo[projectOptions]"]);
        }
    }["LeadsPage.useMemo[projectOptions]"], [
        masterData,
        currentUser,
        isSADMIN
    ]);
    const defaultProjectLeadStatusIds = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadsPage.useMemo[defaultProjectLeadStatusIds]": ()=>{
            if (!projectLeadStatuses || !masterData?.lead_statuses) return [];
            const projectIdsToConsider = debouncedFilters.projectIds.length > 0 ? debouncedFilters.projectIds.map(Number) : currentUser?.project_ids && currentUser.project_ids.length > 0 ? currentUser.project_ids.map(Number) : masterData?.projects?.map({
                "LeadsPage.useMemo[defaultProjectLeadStatusIds]": (p)=>Number(p.id)
            }["LeadsPage.useMemo[defaultProjectLeadStatusIds]"]) || [];
            const junkStatusIds = new Set(masterData.lead_statuses.filter({
                "LeadsPage.useMemo[defaultProjectLeadStatusIds]": (s)=>s.code === 'JUNKPE' || s.code === 'JUNKCM'
            }["LeadsPage.useMemo[defaultProjectLeadStatusIds]"]).map({
                "LeadsPage.useMemo[defaultProjectLeadStatusIds]": (s)=>s.id
            }["LeadsPage.useMemo[defaultProjectLeadStatusIds]"]));
            const validIds = new Set();
            projectLeadStatuses.forEach({
                "LeadsPage.useMemo[defaultProjectLeadStatusIds]": (proj)=>{
                    if (projectIdsToConsider.includes(proj.project_id)) {
                        if (Array.isArray(proj.status)) {
                            proj.status.forEach({
                                "LeadsPage.useMemo[defaultProjectLeadStatusIds]": (statusObj)=>{
                                    if (!junkStatusIds.has(statusObj.lead_status_id)) {
                                        validIds.add(statusObj.id);
                                    }
                                }
                            }["LeadsPage.useMemo[defaultProjectLeadStatusIds]"]);
                        }
                    }
                }
            }["LeadsPage.useMemo[defaultProjectLeadStatusIds]"]);
            return Array.from(validIds);
        }
    }["LeadsPage.useMemo[defaultProjectLeadStatusIds]"], [
        projectLeadStatuses,
        masterData,
        debouncedFilters.projectIds,
        currentUser
    ]);
    const queryStatusIds = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadsPage.useMemo[queryStatusIds]": ()=>debouncedFilters.statusIds.length > 0 ? debouncedFilters.statusIds.map(Number) : activeView === 'leads' ? defaultProjectLeadStatusIds : undefined
    }["LeadsPage.useMemo[queryStatusIds]"], [
        debouncedFilters.statusIds,
        activeView,
        defaultProjectLeadStatusIds
    ]);
    const queryProjectIds = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadsPage.useMemo[queryProjectIds]": ()=>debouncedFilters.projectIds.length > 0 ? debouncedFilters.projectIds.map(Number) : isAdmin ? [] : undefined
    }["LeadsPage.useMemo[queryProjectIds]"], [
        debouncedFilters.projectIds,
        isAdmin
    ]);
    const queryRmIds = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadsPage.useMemo[queryRmIds]": ()=>debouncedFilters.rmIds.length > 0 ? debouncedFilters.rmIds.map(Number) : undefined
    }["LeadsPage.useMemo[queryRmIds]"], [
        debouncedFilters.rmIds
    ]);
    const queryEmIds = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadsPage.useMemo[queryEmIds]": ()=>debouncedFilters.emIds.length > 0 ? debouncedFilters.emIds.map(Number) : undefined
    }["LeadsPage.useMemo[queryEmIds]"], [
        debouncedFilters.emIds
    ]);
    // Admin view uses getLeads
    const { data: rawAdminLeads, isLoading: isAdminLoading, isFetching: isAdminFetching, refetch: refetchAdmin } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetLeadsQuery"])({
        offset: serverOffset,
        is_rm_assigned: isAdmin ? activeTab === 1 ? 1 : 0 : undefined,
        search_text: debouncedSearch || undefined,
        status: queryStatusIds,
        project: queryProjectIds,
        rm: queryRmIds,
        em: queryEmIds
    }, {
        skip: !isAdmin
    });
    // RM view uses getLeadsByRmId
    const { data: rawRmLeads, isLoading: isRMLoading, isFetching: isRMFetching, refetch: refetchRM } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetLeadsByRmIdQuery"])({
        assigned_to_rm: Number(currentUser?.id || 0),
        offset: serverOffset,
        is_em_assigned: 0,
        status: queryStatusIds,
        project: queryProjectIds,
        em: queryEmIds,
        search_text: debouncedSearch || undefined
    }, {
        skip: !isRM
    });
    // EM view uses getLeadsByEmId
    const { data: rawEmLeads, isLoading: isEMLoading, isFetching: isEMFetching, refetch: refetchEM } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetLeadsByEmIdQuery"])({
        assigned_to_em: Number(currentUser?.id || 0),
        offset: serverOffset,
        status: queryStatusIds,
        project: queryProjectIds,
        rm: queryRmIds,
        search_text: debouncedSearch || undefined
    }, {
        skip: !isEM
    });
    const adminLeads = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadsPage.useMemo[adminLeads]": ()=>{
            return Array.isArray(rawAdminLeads) ? rawAdminLeads : rawAdminLeads?.data || [];
        }
    }["LeadsPage.useMemo[adminLeads]"], [
        rawAdminLeads
    ]);
    const rmLeads = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadsPage.useMemo[rmLeads]": ()=>{
            return Array.isArray(rawRmLeads) ? rawRmLeads : rawRmLeads?.data || [];
        }
    }["LeadsPage.useMemo[rmLeads]"], [
        rawRmLeads
    ]);
    const emLeads = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadsPage.useMemo[emLeads]": ()=>{
            return Array.isArray(rawEmLeads) ? rawEmLeads : rawEmLeads?.data || [];
        }
    }["LeadsPage.useMemo[emLeads]"], [
        rawEmLeads
    ]);
    const [addLeadActivity, { isLoading: isAddingActivity }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAddLeadActivityMutation"])();
    const handleRefetch = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "LeadsPage.useCallback[handleRefetch]": ()=>{
            if (isAdmin) refetchAdmin();
            if (isRM) refetchRM();
            if (isEM) refetchEM();
        }
    }["LeadsPage.useCallback[handleRefetch]"], [
        isAdmin,
        isRM,
        isEM,
        refetchAdmin,
        refetchRM,
        refetchEM
    ]);
    // Load saved filters on mount
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "LeadsPage.useEffect": ()=>{
            const saved = localStorage.getItem("leadsFilters");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    // We restore filters for all saved tabs
                    Object.entries(parsed).forEach({
                        "LeadsPage.useEffect": ([key, filters])=>{
                            const updates = {
                                ...filters
                            };
                            if (isAdmin) {
                                updates.projectIds = [];
                            }
                            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateTabFilters"])({
                                tabKey: key,
                                updates
                            }));
                        }
                    }["LeadsPage.useEffect"]);
                } catch (e) {
                    console.error("Failed to parse saved filters", e);
                }
            }
        }
    }["LeadsPage.useEffect"], [
        dispatch,
        isAdmin
    ]);
    const hasInitializedProjectFilter = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useRef(false);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "LeadsPage.useEffect": ()=>{
            if (hasInitializedProjectFilter.current || isAdmin) return;
            if (currentUser?.project_ids && currentUser.project_ids.length > 0 && masterData?.projects) {
                const saved = localStorage.getItem("leadsFilters");
                let parsedSaved = {};
                if (saved) {
                    try {
                        parsedSaved = JSON.parse(saved);
                    } catch (e) {
                        console.error("Failed to parse saved filters", e);
                    }
                }
                const validProjectIds = currentUser.project_ids.filter({
                    "LeadsPage.useEffect.validProjectIds": (id)=>masterData.projects.some({
                            "LeadsPage.useEffect.validProjectIds": (p)=>p.id === id
                        }["LeadsPage.useEffect.validProjectIds"])
                }["LeadsPage.useEffect.validProjectIds"]).map(String);
                if (validProjectIds.length > 0) {
                    const tabKeys = showTabs ? [
                        "0",
                        "1",
                        "all"
                    ] : [
                        "all"
                    ];
                    tabKeys.forEach({
                        "LeadsPage.useEffect": (key)=>{
                            if (!parsedSaved[key] || !parsedSaved[key].projectIds) {
                                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateTabFilters"])({
                                    tabKey: key,
                                    updates: {
                                        projectIds: validProjectIds,
                                        page: 1
                                    }
                                }));
                            }
                        }
                    }["LeadsPage.useEffect"]);
                    hasInitializedProjectFilter.current = true;
                }
            }
        }
    }["LeadsPage.useEffect"], [
        currentUser,
        masterData,
        dispatch,
        showTabs
    ]);
    // Handle external project, RM, or EM filter pre-selection (e.g. from Dashboards)
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "LeadsPage.useEffect": ()=>{
            const routeProjectId = location.state?.projectId || searchParams.get("projectId");
            const routeRmId = location.state?.rmId || searchParams.get("rmId");
            const routeEmId = location.state?.emId || searchParams.get("emId");
            const routeGlobalSearch = location.state?.globalSearch;
            if (routeProjectId || routeRmId || routeEmId || routeGlobalSearch) {
                const tabKeys = showTabs ? [
                    "0",
                    "1",
                    "all"
                ] : [
                    "all"
                ];
                const updates = {
                    page: 1
                };
                if (routeProjectId) {
                    updates.projectIds = [
                        String(routeProjectId)
                    ];
                }
                if (routeRmId) {
                    updates.rmIds = [
                        String(routeRmId)
                    ];
                }
                if (routeEmId) {
                    updates.emIds = [
                        String(routeEmId)
                    ];
                }
                if (routeGlobalSearch) {
                    updates.search = String(routeGlobalSearch);
                }
                tabKeys.forEach({
                    "LeadsPage.useEffect": (key)=>{
                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateTabFilters"])({
                            tabKey: key,
                            updates
                        }));
                    }
                }["LeadsPage.useEffect"]);
                // Update localStorage filters too so it stays selected
                const saved = localStorage.getItem("leadsFilters");
                const parsed = saved ? JSON.parse(saved) : {};
                tabKeys.forEach({
                    "LeadsPage.useEffect": (key)=>{
                        parsed[key] = {
                            ...parsed[key] || {},
                            ...updates
                        };
                    }
                }["LeadsPage.useEffect"]);
                localStorage.setItem("leadsFilters", JSON.stringify(parsed));
                // Clear route state & query params to prevent resetting on subsequent actions
                const newParams = new URLSearchParams(searchParams);
                let changedParams = false;
                if (searchParams.get("projectId")) {
                    newParams.delete("projectId");
                    changedParams = true;
                }
                if (searchParams.get("rmId")) {
                    newParams.delete("rmId");
                    changedParams = true;
                }
                if (searchParams.get("emId")) {
                    newParams.delete("emId");
                    changedParams = true;
                }
                if (location.state?.projectId || location.state?.rmId || location.state?.emId || location.state?.globalSearch) {
                    const nextState = {
                        ...location.state
                    };
                    delete nextState.projectId;
                    delete nextState.rmId;
                    delete nextState.emId;
                    delete nextState.globalSearch;
                    navigate(location.pathname, {
                        replace: true,
                        state: nextState
                    });
                } else if (changedParams) {
                    setSearchParams(newParams, {
                        replace: true
                    });
                }
            }
        }
    }["LeadsPage.useEffect"], [
        location,
        searchParams,
        setSearchParams,
        dispatch,
        showTabs,
        navigate
    ]);
    const leads = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadsPage.useMemo[leads]": ()=>{
            let list = isAdmin ? adminLeads : isRM ? rmLeads : emLeads;
            // Fallback frontend search filtering if backend misses it
            if (debouncedSearch) {
                const s = debouncedSearch.toLowerCase();
                list = list.filter({
                    "LeadsPage.useMemo[leads]": (l)=>(l.first_name || '').toLowerCase().includes(s) || (l.last_name || '').toLowerCase().includes(s) || (l.phone_number || '').includes(s) || (l.lead_id || '').toString().toLowerCase().includes(s) || ((l.first_name || '') + ' ' + (l.last_name || '')).toLowerCase().includes(s)
                }["LeadsPage.useMemo[leads]"]);
            }
            // Exclude Junk and Junk Review statuses from the main Leads view
            if (activeView === 'leads') {
                return list.filter({
                    "LeadsPage.useMemo[leads]": (l)=>{
                        const projectOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$getProjectStatusOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectStatusOptions"])(l.project_id, projectLeadStatuses || []);
                        const matchedOption = projectOptions.find({
                            "LeadsPage.useMemo[leads].matchedOption": (o)=>o.id === l.project_lead_status_id
                        }["LeadsPage.useMemo[leads].matchedOption"]);
                        const s = masterData?.lead_statuses?.find({
                            "LeadsPage.useMemo[leads]": (st)=>st.id === matchedOption?.lead_status_id
                        }["LeadsPage.useMemo[leads]"]);
                        return s?.code !== 'JUNKPE' && s?.code !== 'JUNKCM';
                    }
                }["LeadsPage.useMemo[leads]"]);
            }
            return list;
        }
    }["LeadsPage.useMemo[leads]"], [
        isAdmin,
        adminLeads,
        isRM,
        rmLeads,
        isEM,
        emLeads,
        activeTab,
        activeView,
        masterData,
        debouncedSearch,
        projectLeadStatuses
    ]);
    const isLoading = isAdmin ? isAdminLoading : isRM ? isRMLoading : isEMLoading;
    const isFetching = isAdmin ? isAdminFetching : isRM ? isRMFetching : isEMFetching;
    // For EM assignment restricted to RM's reportees
    const { data: emsReportees = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetReporteesQuery"])({
        reporting_manager_id: Number(currentUser?.id || 0),
        offset: 0
    }, {
        skip: !isRM
    });
    // Users listed in the bulk assignment dropdown: RMs for Admin, EMs for RM
    const assignmentUsers = isAdmin ? rms : emsReportees;
    const { data: ems = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetReporteesQuery"])({
        reporting_manager_id: Number(rmIds[0] || 0),
        offset: 0
    }, {
        skip: rmIds.length === 0
    });
    const [createLead, { isLoading: isCreating }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateLeadMutation"])();
    const [updateLead, { isLoading: isUpdating }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateLeadMutation"])();
    const [bulkAssign, { isLoading: isBulkAssigning }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBulkAssignLeadsToRmMutation"])();
    const [bulkAssignToEm, { isLoading: isBulkAssignToEm }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBulkAssignLeadsToEmMutation"])();
    const { data: managers = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersByRoleIdQuery"])({
        role_id: 3,
        offset: 0
    });
    const [deleteLead, { isLoading: isDeleting }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeleteLeadMutation"])();
    const [scheduleVisit, { isLoading: isScheduling }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScheduleVisitMutation"])();
    const isAnyBulkAssigning = isBulkAssigning || isBulkAssignToEm;
    const handleBulkAssign = async (targetId, type)=>{
        if (selectedUuids.length === 0) return;
        try {
            if (type === 'rm') {
                await bulkAssign({
                    lead_uuids: selectedUuids,
                    assigned_to_rm: targetId
                }).unwrap();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Leads successfully assigned to RM");
            } else {
                await bulkAssignToEm({
                    lead_uuids: selectedUuids,
                    assigned_to_em: targetId
                }).unwrap();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Leads successfully assigned to EM");
            }
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSelectedUuids"])({
                tabKey,
                uuids: []
            }));
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err?.data?.message || "Bulk assignment failed");
        }
    };
    const handleBulkMarkAsJunk = async ()=>{
        if (selectedUuids.length === 0) return;
        try {
            const promises = selectedUuids.map((uuid)=>deleteLead({
                    uuid
                }).unwrap());
            await Promise.all(promises);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`${selectedUuids.length} leads marked as junk`);
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSelectedUuids"])({
                tabKey,
                uuids: []
            }));
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err?.data?.message || "Bulk action failed");
        }
    };
    const handleLeadActivity = (lead)=>{
        setActivityLead(lead);
    };
    const handleLeadActivitySubmit = async (data)=>{
        try {
            await addLeadActivity(data).unwrap();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Activity added successfully");
            setActivityLead(null);
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err?.data?.message || "Failed to add activity");
        }
    };
    const handleRandomAssign = async ()=>{
        if (leads.length === 0 || assignmentUsers.length === 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(`No leads or ${isAdmin ? "RMs" : "EMs"} available for assignment`);
            return;
        }
        try {
            const shuffledLeads = [
                ...leads
            ].sort(()=>Math.random() - 0.5);
            const leadUuids = shuffledLeads.map((l)=>l.uuid);
            const chunkSize = Math.ceil(leadUuids.length / assignmentUsers.length);
            const assignmentPromises = [];
            for(let i = 0; i < assignmentUsers.length; i++){
                const start = i * chunkSize;
                const end = Math.min(start + chunkSize, leadUuids.length);
                const chunk = leadUuids.slice(start, end);
                if (chunk.length > 0) {
                    if (isAdmin) {
                        assignmentPromises.push(bulkAssign({
                            lead_uuids: chunk,
                            assigned_to_rm: assignmentUsers[i].id
                        }).unwrap());
                    } else if (isRM) {
                        assignmentPromises.push(bulkAssignToEm({
                            lead_uuids: chunk,
                            assigned_to_em: assignmentUsers[i].id
                        }).unwrap());
                    }
                }
            }
            await Promise.all(assignmentPromises);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`Successfully distributed ${leadUuids.length} leads across ${assignmentUsers.length} ${isAdmin ? "RMs" : "EMs"}`);
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err?.data?.message || "Random assignment failed");
        }
    };
    const handleCreateNew = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "LeadsPage.useCallback[handleCreateNew]": ()=>{
            setEditingLead(null);
            setIsDrawerOpen(true);
        }
    }["LeadsPage.useCallback[handleCreateNew]"], []);
    const handleEdit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "LeadsPage.useCallback[handleEdit]": (lead)=>{
            setEditingLead(lead);
            setIsDrawerOpen(true);
        }
    }["LeadsPage.useCallback[handleEdit]"], []);
    const handleScheduleVisit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "LeadsPage.useCallback[handleScheduleVisit]": (lead)=>{
            if (isSADMIN) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Super Admin cannot schedule site visits");
                return;
            }
            setSchedulingLead(lead);
        }
    }["LeadsPage.useCallback[handleScheduleVisit]"], [
        isSADMIN
    ]);
    const handleDelete = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "LeadsPage.useCallback[handleDelete]": (uuid)=>{
            setDeleteUuid(uuid);
        }
    }["LeadsPage.useCallback[handleDelete]"], []);
    const handleFormSubmit = async (values)=>{
        try {
            if (editingLead) {
                await updateLead({
                    ...values,
                    uuid: editingLead.uuid
                }).unwrap();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Lead updated successfully");
                if (values.assigned_to_rm) {
                    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setActiveTab"])(1));
                }
                handleRefetch();
            } else {
                await createLead(values).unwrap();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Lead created successfully");
            }
            setIsDrawerOpen(false);
        } catch (err) {
            const errorMsg = err?.data?.message || err?.data?.error || err?.data?.detail || err?.message || "Operation failed";
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorMsg);
        }
    };
    const handleScheduleVisitSubmit = async (data)=>{
        try {
            // 1. Schedule visit
            await scheduleVisit(data).unwrap();
            // 2. Update Lead assignment to ensure RM and EM are in sync
            // if (schedulingLead) {
            //   await updateLead({
            //     uuid: schedulingLead.uuid,
            //     first_name: schedulingLead.first_name || '',
            //     last_name: schedulingLead.last_name || '',
            //     phone_number: schedulingLead.phone_number || '',
            //     email_address: schedulingLead.email_address || '',
            //     occupation: schedulingLead.occupation || '',
            //     address: schedulingLead.address || '',
            //     city: schedulingLead.city || '',
            //     state: schedulingLead.state || '',
            //     country: schedulingLead.country || '',
            //     zip: schedulingLead.zip || '',
            //     source_id: schedulingLead.source_id,
            //     source_employee_user_id: schedulingLead.source_employee_user_id || null,
            //     project_id: schedulingLead.project_id,
            //     assigned_to_rm: schedulingLead.assigned_to_rm || data.visit_assigned_to_rm || null,
            //     assigned_to_em: schedulingLead.assigned_to_em || data.visit_assigned_to_em || null,
            //     lead_priority_id: schedulingLead.lead_priority_id || 1,
            //     lead_status_id: schedulingLead.lead_status_id,
            //   }).unwrap();
            // }
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Visit scheduled & assignment updated");
            setSchedulingLead(null);
            handleRefetch();
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err?.data?.message || "Failed to schedule visit");
        }
    };
    const handleUpdateStatus = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "LeadsPage.useCallback[handleUpdateStatus]": async (lead, newStatusId)=>{
            const junkStatus = masterData?.lead_statuses?.find({
                "LeadsPage.useCallback[handleUpdateStatus]": (s)=>s.code === 'JUNKPE'
            }["LeadsPage.useCallback[handleUpdateStatus]"]);
            const projectOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$getProjectStatusOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectStatusOptions"])(lead.project_id, projectLeadStatuses || []);
            const selectedOption = projectOptions.find({
                "LeadsPage.useCallback[handleUpdateStatus].selectedOption": (o)=>o.id === newStatusId
            }["LeadsPage.useCallback[handleUpdateStatus].selectedOption"]);
            const isJunkSelected = junkStatus && newStatusId === junkStatus.id || junkStatus && selectedOption && selectedOption.lead_status_id === junkStatus.id;
            if (isJunkSelected) {
                setPendingJunkUpdate({
                    lead,
                    statusId: newStatusId
                });
                setIsJunkDialogOpen(true);
                return;
            }
            try {
                const payload = {
                    uuid: lead.uuid,
                    first_name: lead.first_name || '',
                    last_name: lead.last_name || '',
                    phone_number: lead.phone_number || '',
                    email_address: lead.email_address || '',
                    occupation: lead.occupation || '',
                    address: lead.address || '',
                    city: lead.city || '',
                    state: lead.state || '',
                    country: lead.country || '',
                    zip: lead.zip || '',
                    source_id: lead.source_id,
                    source_employee_user_id: lead.source_employee_user_id || null,
                    project_id: lead.project_id,
                    assigned_to_rm: lead.assigned_to_rm || null,
                    assigned_to_em: lead.assigned_to_em || null,
                    lead_priority_id: lead.lead_priority_id || 1,
                    lead_status_id: newStatusId,
                    project_lead_status_id: newStatusId
                };
                await updateLead(payload).unwrap();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Status updated successfully!');
                handleRefetch();
            } catch (err) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err?.data?.message || 'Failed to update status');
            }
        }
    }["LeadsPage.useCallback[handleUpdateStatus]"], [
        updateLead,
        masterData,
        projectLeadStatuses,
        handleRefetch
    ]);
    const handleJunkReasonConfirm = async (reason)=>{
        if (!pendingJunkUpdate) return;
        const { lead, statusId } = pendingJunkUpdate;
        try {
            const payload = {
                uuid: lead.uuid,
                first_name: lead.first_name || '',
                last_name: lead.last_name || '',
                phone_number: lead.phone_number || '',
                email_address: lead.email_address || '',
                occupation: lead.occupation || '',
                address: lead.address || '',
                city: lead.city || '',
                state: lead.state || '',
                country: lead.country || '',
                zip: lead.zip || '',
                source_id: lead.source_id,
                source_employee_user_id: lead.source_employee_user_id || null,
                project_id: lead.project_id,
                assigned_to_rm: lead.assigned_to_rm || null,
                assigned_to_em: lead.assigned_to_em || null,
                lead_priority_id: lead.lead_priority_id || 1,
                lead_status_id: statusId,
                project_lead_status_id: statusId,
                junk_reason: reason
            };
            await updateLead(payload).unwrap();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Lead marked as junk for review!');
            setIsJunkDialogOpen(false);
            setPendingJunkUpdate(null);
            handleRefetch();
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err?.data?.message || 'Failed to update status');
        }
    };
    const handleAssignRm = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "LeadsPage.useCallback[handleAssignRm]": async (lead, rmId)=>{
            try {
                const payload = {
                    uuid: lead.uuid,
                    first_name: lead.first_name || '',
                    last_name: lead.last_name || '',
                    phone_number: lead.phone_number || '',
                    email_address: lead.email_address || '',
                    occupation: lead.occupation || '',
                    address: lead.address || '',
                    city: lead.city || '',
                    state: lead.state || '',
                    country: lead.country || '',
                    zip: lead.zip || '',
                    source_id: lead.source_id,
                    source_employee_user_id: lead.source_employee_user_id || null,
                    project_id: lead.project_id,
                    assigned_to_rm: rmId,
                    assigned_to_em: rmId !== lead.assigned_to_rm ? null : lead.assigned_to_em || null,
                    lead_priority_id: lead.lead_priority_id || 1,
                    project_lead_status_id: lead.project_lead_status_id
                };
                await updateLead(payload).unwrap();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(rmId ? 'RM assigned successfully!' : 'RM unassigned');
                handleRefetch();
            } catch (err) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err?.data?.message || 'Failed to assign RM');
            }
        }
    }["LeadsPage.useCallback[handleAssignRm]"], [
        updateLead,
        handleRefetch
    ]);
    const handleAssignEm = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "LeadsPage.useCallback[handleAssignEm]": async (lead, emId)=>{
            try {
                const payload = {
                    uuid: lead.uuid,
                    first_name: lead.first_name || '',
                    last_name: lead.last_name || '',
                    phone_number: lead.phone_number || '',
                    email_address: lead.email_address || '',
                    occupation: lead.occupation || '',
                    address: lead.address || '',
                    city: lead.city || '',
                    state: lead.state || '',
                    country: lead.country || '',
                    zip: lead.zip || '',
                    source_id: lead.source_id,
                    source_employee_user_id: lead.source_employee_user_id || null,
                    project_id: lead.project_id,
                    assigned_to_rm: lead.assigned_to_rm || null,
                    assigned_to_em: emId,
                    lead_priority_id: lead.lead_priority_id || 1,
                    project_lead_status_id: lead.project_lead_status_id
                };
                await updateLead(payload).unwrap();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(emId ? 'EM assigned successfully!' : 'EM unassigned');
                handleRefetch();
            } catch (err) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err?.data?.message || 'Failed to assign EM');
            }
        }
    }["LeadsPage.useCallback[handleAssignEm]"], [
        updateLead,
        handleRefetch
    ]);
    const handlePageChange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "LeadsPage.useCallback[handlePageChange]": (v)=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateTabFilters"])({
                tabKey,
                updates: {
                    page: v
                }
            }));
        }
    }["LeadsPage.useCallback[handlePageChange]"], [
        dispatch,
        tabKey
    ]);
    const handleLimitChange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "LeadsPage.useCallback[handleLimitChange]": (v)=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateTabFilters"])({
                tabKey,
                updates: {
                    limit: v,
                    page: 1
                }
            }));
        }
    }["LeadsPage.useCallback[handleLimitChange]"], [
        dispatch,
        tabKey
    ]);
    const handleSelectUuids = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "LeadsPage.useCallback[handleSelectUuids]": (uuids)=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSelectedUuids"])({
                tabKey,
                uuids
            }));
        }
    }["LeadsPage.useCallback[handleSelectUuids]"], [
        dispatch,
        tabKey
    ]);
    // Local Sort logic for the current buffer
    const sortedLeads = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadsPage.useMemo[sortedLeads]": ()=>{
            const result = [
                ...leads
            ];
            result.sort({
                "LeadsPage.useMemo[sortedLeads]": (a, b)=>{
                    let valA = a[sortField];
                    let valB = b[sortField];
                    if (sortField === "created_on") {
                        valA = a.created_on ? new Date(a.created_on).getTime() : 0;
                        valB = b.created_on ? new Date(b.created_on).getTime() : 0;
                    } else if (sortField === "customer_name") {
                        valA = `${a.first_name || ""} ${a.last_name || ""}`.toLowerCase().trim();
                        valB = `${b.first_name || ""} ${b.last_name || ""}`.toLowerCase().trim();
                    } else {
                        valA = typeof valA === "string" ? valA.toLowerCase() : valA ?? "";
                        valB = typeof valB === "string" ? valB.toLowerCase() : valB ?? "";
                    }
                    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
                    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
                    return 0;
                }
            }["LeadsPage.useMemo[sortedLeads]"]);
            return result;
        }
    }["LeadsPage.useMemo[sortedLeads]"], [
        leads,
        sortField,
        sortOrder
    ]);
    const activeLeadsData = isAdmin ? rawAdminLeads : isRM ? rawRmLeads : rawEmLeads;
    const totalLeads = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadsPage.useMemo[totalLeads]": ()=>{
            const rawList = Array.isArray(activeLeadsData) ? activeLeadsData : activeLeadsData?.data || [];
            // If we received fewer than 200 records from the server, we are definitely on the last chunk.
            // The exact total is serverOffset + the number of locally filtered leads in this chunk.
            if (rawList.length < 200) {
                return serverOffset + leads.length;
            }
            if (!Array.isArray(activeLeadsData) && activeLeadsData && typeof activeLeadsData === 'object') {
                if (activeLeadsData.filtered_count !== undefined && activeLeadsData.filtered_count !== null) {
                    return activeLeadsData.filtered_count;
                }
                if (activeLeadsData.total_count !== undefined && activeLeadsData.total_count !== null) {
                    return activeLeadsData.total_count;
                }
            }
            return serverOffset + 201;
        }
    }["LeadsPage.useMemo[totalLeads]"], [
        activeLeadsData,
        leads.length,
        serverOffset
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            fromEMDashboard ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>navigate("/agents"),
                className: "flex items-center gap-2 text-xs font-extrabold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer hover:underline mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                        className: "w-3.5 h-3.5"
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                        lineNumber: 886,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    "Back to Sales Executive Dashboard"
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                lineNumber: 882,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : fromRMDashboard ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>navigate("/relationship-managers"),
                className: "flex items-center gap-2 text-xs font-extrabold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer hover:underline mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                        className: "w-3.5 h-3.5"
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                        lineNumber: 894,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    "Back to Sales Head Dashboard"
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                lineNumber: 890,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : null,
            activeView === 'leads' || activeView === 'junk' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$PageHeader$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHeader"], {
                title: activeView === 'leads' ? "Lead Management Queue" : "Manage Junks",
                description: activeView === 'leads' ? "Manage and track your sales pipeline efficiency" : "Streamline and audit the junk lead restoration process",
                actions: activeView === 'leads' && can(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$permissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PERMISSIONS"].LEAD_CREATE) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    onClick: handleCreateNew,
                    className: "gap-2 bg-[#063669] hover:bg-[#063669]/90 text-white rounded-[16px] h-11 px-6 font-bold",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                            lineNumber: 905,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        "Create New Lead"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                    lineNumber: 904,
                    columnNumber: 15
                }, ("TURBOPACK compile-time value", void 0)) : undefined
            }, void 0, false, {
                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                lineNumber: 899,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full sm:max-w-xl",
                        children: (activeView === 'leads' || activeView === 'junk') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$FilterBar$2f$FilterBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchInput"], {
                            value: activeView === 'junk' ? junkSearch : search,
                            onChange: (value)=>{
                                if (activeView === 'junk') {
                                    setJunkSearch(value);
                                    return;
                                }
                                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateTabFilters"])({
                                    tabKey,
                                    updates: {
                                        search: value,
                                        page: 1
                                    }
                                }));
                            },
                            placeholder: activeView === 'junk' ? 'Search junk leads by ID, name, phone, or reason' : 'Search by Lead ID, Name, or Phone Number'
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                            lineNumber: 917,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                        lineNumber: 915,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    showTabs && activeView !== 'junk-review' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 p-2 bg-[#f0f2f5] dark:bg-zinc-900/50 rounded-xl w-fit border border-zinc-200/50 dark:border-zinc-800/50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setActiveTab"])(0));
                                    setActiveView('leads');
                                },
                                style: {
                                    width: activeTab === 0 && activeView === 'leads' ? '210.87px' : '155.8px',
                                    height: activeTab === 0 && activeView === 'leads' ? '39px' : '36px'
                                },
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("flex items-center justify-center gap-2 rounded-[8px] transition-all duration-200 text-sm font-bold", activeTab === 0 && activeView === 'leads' ? "bg-white dark:bg-zinc-800 text-primary shadow-sm border border-zinc-200 pt-[7.5px] pb-[9.5px] px-6" : "text-slate-500 hover:text-primary p-2 px-6"),
                                children: "Unassigned"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                                lineNumber: 935,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setActiveTab"])(1));
                                    setActiveView('leads');
                                },
                                style: {
                                    width: activeTab === 1 && activeView === 'leads' ? '210.87px' : '155.8px',
                                    height: activeTab === 1 && activeView === 'leads' ? '39px' : '36px'
                                },
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("flex items-center justify-center gap-2 rounded-[8px] transition-all duration-200 text-sm font-bold", activeTab === 1 && activeView === 'leads' ? "bg-white dark:bg-zinc-800 text-primary shadow-sm border border-zinc-200 pt-[7.5px] pb-[9.5px] px-6" : "text-slate-500 hover:text-primary p-2 px-6"),
                                children: "Assigned"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                                lineNumber: 953,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveView('junk'),
                                style: {
                                    width: activeView === 'junk' || activeView === 'junk-review' ? '210.87px' : '155.8px',
                                    height: activeView === 'junk' || activeView === 'junk-review' ? '39px' : '36px'
                                },
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("flex items-center justify-center gap-2 rounded-[8px] transition-all duration-200 text-sm font-bold", activeView === 'junk' || activeView === 'junk-review' ? "bg-white dark:bg-zinc-800 text-primary shadow-sm border border-zinc-200 pt-[7.5px] pb-[9.5px] px-6" : "text-slate-500 hover:text-primary p-2 px-6"),
                                children: "Junk"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                                lineNumber: 971,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                        lineNumber: 934,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                lineNumber: 914,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            activeView === 'leads' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-3xl border border-border/40 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-6 py-4 border-b border-border/40",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-bold text-[#191C1E] font-['Plus_Jakarta_Sans'] flex items-center gap-2",
                                    style: {
                                        height: '28px',
                                        fontSize: '18px',
                                        lineHeight: '28px'
                                    },
                                    children: [
                                        "Active Leads Queue",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-2.5 h-2.5 rounded-full inline-block shrink-0",
                                            style: {
                                                backgroundColor: '#D92D20'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                                            lineNumber: 1001,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                                    lineNumber: 996,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                                lineNumber: 995,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        onClick: ()=>setIsFilterDialogOpen(true),
                                        className: "gap-3 relative h-11 rounded-[16px] px-6 border-zinc-200 dark:border-zinc-800 text-base font-bold text-primary bg-white shadow-sm hover:bg-zinc-50 transition-all ring-0 focus-visible:ring-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                                                lineNumber: 1010,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Filter",
                                            statusIds.length + (isAdmin ? rmIds.length : 0) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center justify-center min-w-[20px] h-5 px-1.5 py-0.5 text-[10px] font-bold bg-primary text-white rounded-full",
                                                children: statusIds.length + (isAdmin ? rmIds.length : 0)
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                                                lineNumber: 1013,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                                        lineNumber: 1005,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$FilterDialog$2f$FilterDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FilterDialog"], {
                                        open: isFilterDialogOpen,
                                        onClose: ()=>setIsFilterDialogOpen(false),
                                        onApply: (filters)=>{
                                            const updates = {
                                                ...filters,
                                                page: 1
                                            };
                                            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateTabFilters"])({
                                                tabKey,
                                                updates
                                            }));
                                            // Save to localStorage
                                            const saved = localStorage.getItem("leadsFilters");
                                            const parsed = saved ? JSON.parse(saved) : {};
                                            parsed[tabKey] = updates;
                                            localStorage.setItem("leadsFilters", JSON.stringify(parsed));
                                        },
                                        onReset: ()=>{
                                            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resetTabFilters"])(tabKey));
                                            // Update localStorage
                                            const saved = localStorage.getItem("leadsFilters");
                                            if (saved) {
                                                const parsed = JSON.parse(saved);
                                                delete parsed[tabKey];
                                                localStorage.setItem("leadsFilters", JSON.stringify(parsed));
                                            }
                                            setIsFilterDialogOpen(false);
                                        },
                                        statusIds: statusIds,
                                        statusOptions: statusOptions,
                                        projectIds: projectIds,
                                        projectOptions: projectOptions,
                                        rmIds: isAdmin ? rmIds : currentUser?.id ? [
                                            String(currentUser.id)
                                        ] : [],
                                        emIds: emIds,
                                        rmOptions: rms,
                                        showRmFilter: activeTab !== 0 && isAdmin,
                                        showEmFilter: false,
                                        showProjectFilter: false
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                                        lineNumber: 1019,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    isAdmin && (activeTab === 0 || activeTab === 1) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: activeTab === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            onClick: ()=>setShowRandomConfirm(true),
                                            disabled: isAnyBulkAssigning,
                                            className: "gap-2 h-11 rounded-[16px] px-6 text-base font-bold bg-[#063669] hover:bg-[#063669]/90 text-white shadow-sm transition-all focus-visible:ring-0 disabled:opacity-50 disabled:cursor-not-allowed",
                                            children: [
                                                isAnyBulkAssigning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                    className: "h-4 w-4 animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                                                    lineNumber: 1080,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0)) : null,
                                                "Bulk Auto-Assign"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                                            lineNumber: 1075,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                                        lineNumber: 1064,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                                lineNumber: 1004,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                        lineNumber: 994,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$LeadTable$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LeadTable"], {
                            data: sortedLeads,
                            isLoading: isLoading || isFetching,
                            page: page,
                            limit: limit,
                            total: totalLeads,
                            onPageChange: handlePageChange,
                            onLimitChange: handleLimitChange,
                            onEdit: handleEdit,
                            onDelete: handleDelete,
                            onScheduleVisit: !isSADMIN ? handleScheduleVisit : undefined,
                            onUpdateStatus: handleUpdateStatus,
                            onAssignRm: handleAssignRm,
                            onAssignEm: handleAssignEm,
                            sortField: sortField,
                            sortOrder: sortOrder,
                            onSort: handleSort,
                            offset: serverOffset,
                            selectedUuids: selectedUuids,
                            onSelectUuids: handleSelectUuids
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                            lineNumber: 1091,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                        lineNumber: 1089,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                lineNumber: 992,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            activeView === 'junk' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$pages$2f$JunkLeadsPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JunkLeadsPage"], {
                canVerify: canVerifyJunk,
                onVerify: handleVerifyLead,
                search: junkSearch
            }, void 0, false, {
                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                lineNumber: 1117,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            activeView === 'junk-review' && selectedJunkLead && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$pages$2f$LeadJunkReviewPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LeadJunkReviewPage"], {
                        lead: selectedJunkLead,
                        onBack: ()=>setActiveView('junk'),
                        isUpdating: isUpdating,
                        onReassign: (reason)=>{
                            setShowReassignModal(true);
                        },
                        onApprove: async (reason)=>{
                            try {
                                const junkStatusId = masterData?.lead_statuses?.find((s)=>s.code === 'JUNKCM')?.id;
                                if (!junkStatusId || !selectedJunkLead) return;
                                await updateLead({
                                    uuid: selectedJunkLead.uuid,
                                    first_name: selectedJunkLead.first_name || '',
                                    last_name: selectedJunkLead.last_name || '',
                                    phone_number: selectedJunkLead.phone_number || '',
                                    email_address: selectedJunkLead.email_address || '',
                                    occupation: selectedJunkLead.occupation || '',
                                    address: selectedJunkLead.address || '',
                                    city: selectedJunkLead.city || '',
                                    state: selectedJunkLead.state || '',
                                    country: selectedJunkLead.country || '',
                                    zip: selectedJunkLead.zip || '',
                                    source_id: selectedJunkLead.source_id,
                                    source_employee_user_id: selectedJunkLead.source_employee_user_id || null,
                                    project_id: selectedJunkLead.project_id,
                                    assigned_to_rm: selectedJunkLead.assigned_to_rm || null,
                                    assigned_to_em: selectedJunkLead.assigned_to_em || null,
                                    lead_priority_id: selectedJunkLead.lead_priority_id || 1,
                                    project_lead_status_id: (()=>{
                                        const projectOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$getProjectStatusOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectStatusOptions"])(selectedJunkLead.project_id, projectLeadStatuses || []);
                                        return projectOptions.find((o)=>o.lead_status_id === junkStatusId)?.id || selectedJunkLead.project_lead_status_id;
                                    })(),
                                    junk_reason: reason || selectedJunkLead.junk_reason
                                }).unwrap();
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Lead marked as Junk successfully");
                                setActiveView('junk');
                                handleRefetch();
                            } catch (err) {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err?.data?.message || "Failed to approve junk");
                            }
                        },
                        onRemoveJunk: async ()=>{
                            try {
                                const newLeadStatusId = masterData?.lead_statuses?.find((s)=>s.code === 'NEWLED')?.id;
                                if (!newLeadStatusId || !selectedJunkLead) return;
                                const updatedLead = {
                                    uuid: selectedJunkLead.uuid,
                                    first_name: selectedJunkLead.first_name || '',
                                    last_name: selectedJunkLead.last_name || '',
                                    phone_number: selectedJunkLead.phone_number || '',
                                    email_address: selectedJunkLead.email_address || '',
                                    occupation: selectedJunkLead.occupation || '',
                                    address: selectedJunkLead.address || '',
                                    city: selectedJunkLead.city || '',
                                    state: selectedJunkLead.state || '',
                                    country: selectedJunkLead.country || '',
                                    zip: selectedJunkLead.zip || '',
                                    source_id: selectedJunkLead.source_id,
                                    source_employee_user_id: selectedJunkLead.source_employee_user_id || null,
                                    project_id: selectedJunkLead.project_id,
                                    assigned_to_rm: selectedJunkLead.assigned_to_rm || null,
                                    assigned_to_em: selectedJunkLead.assigned_to_em || null,
                                    lead_priority_id: selectedJunkLead.lead_priority_id || 1,
                                    project_lead_status_id: (()=>{
                                        const projectOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$getProjectStatusOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectStatusOptions"])(selectedJunkLead.project_id, projectLeadStatuses || []);
                                        return projectOptions.find((o)=>o.lead_status_id === newLeadStatusId)?.id || selectedJunkLead.project_lead_status_id;
                                    })(),
                                    junk_reason: ''
                                };
                                await updateLead(updatedLead).unwrap();
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Lead restored successfully");
                                await handleRefetch();
                                setSelectedJunkLead(null);
                                // redirect based on assignment
                                if (selectedJunkLead.assigned_to_rm) {
                                    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setActiveTab"])(1));
                                } else {
                                    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setActiveTab"])(0));
                                }
                                setActiveView('leads');
                            } catch (err) {
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err?.data?.message || "Failed to restore lead");
                            }
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                        lineNumber: 1126,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$ReassignRMModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReassignRMModal"], {
                        open: showReassignModal,
                        rms: rms,
                        onClose: ()=>setShowReassignModal(false),
                        lead: selectedJunkLead,
                        onConfirm: (rmId)=>{
                            const _leadStatusId = masterData?.lead_statuses?.find((s)=>s.code === 'NEWLED')?.id;
                            if (_leadStatusId && selectedJunkLead) {
                                const projectOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$getProjectStatusOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectStatusOptions"])(selectedJunkLead.project_id, projectLeadStatuses || []);
                                const projectNewStatusId = projectOptions.find((o)=>o.lead_status_id === _leadStatusId)?.id || selectedJunkLead.project_lead_status_id;
                                const _lead = {
                                    ...selectedJunkLead,
                                    project_lead_status_id: projectNewStatusId
                                };
                                handleAssignRm(_lead, rmId);
                            }
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(`Lead successfully reassigned to RM ID: ${rmId}`);
                            setActiveView('junk');
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                        lineNumber: 1230,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                lineNumber: 1125,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$AppDrawer$2f$AppDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppDrawer"], {
                open: isDrawerOpen,
                onClose: ()=>{
                    setIsDrawerOpen(false);
                    setEditingLead(null);
                },
                title: editingLead ? "Edit Lead" : "New Lead",
                description: editingLead ? "Modify lead details below." : "Fill in the information to register a new property lead.",
                children: isDrawerOpen && (isLoadingFullLead && editingLead ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center justify-center p-12 space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "h-8 w-8 animate-spin text-[#063669]"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                            lineNumber: 1272,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-zinc-500 font-medium",
                            children: "Loading lead details..."
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                            lineNumber: 1273,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                    lineNumber: 1271,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$LeadForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LeadForm"], {
                    onSubmit: handleFormSubmit,
                    isLoading: isCreating || isUpdating,
                    initialValues: (editingLead ? fullEditingLead || editingLead : undefined) || (projectIds && projectIds.length === 1 ? {
                        project_id: Number(projectIds[0])
                    } : undefined),
                    isEdit: !!editingLead
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                    lineNumber: 1276,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                lineNumber: 1256,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$JunkReasonDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JunkReasonDialog"], {
                open: isJunkDialogOpen,
                onClose: ()=>{
                    setIsJunkDialogOpen(false);
                    setPendingJunkUpdate(null);
                },
                onConfirm: handleJunkReasonConfirm,
                isLoading: isUpdating
            }, void 0, false, {
                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                lineNumber: 1289,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ConfirmDialog$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfirmDialog"], {
                open: showRandomConfirm,
                onClose: ()=>setShowRandomConfirm(false),
                onConfirm: ()=>{
                    handleRandomAssign();
                    setShowRandomConfirm(false);
                },
                title: "Confirm Random Assignment",
                description: `This will equally and randomly distribute the ${leads.length} currently visible ${activeTab === 0 ? "unassigned" : "assigned"} leads among the ${assignmentUsers.length} available ${isAdmin ? "Sales Heads" : "Sales Executives"}. Are you sure?`,
                confirmLabel: "Assign Leads",
                variant: "primary"
            }, void 0, false, {
                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                lineNumber: 1299,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$ConfirmDialog$2f$ConfirmDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfirmDialog"], {
                open: !!deleteUuid,
                onClose: ()=>setDeleteUuid(null),
                onConfirm: async ()=>{
                    if (!deleteUuid) return;
                    try {
                        await deleteLead({
                            uuid: deleteUuid
                        }).unwrap();
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Lead deleted successfully");
                        setDeleteUuid(null);
                    } catch (err) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err?.data?.message || "Failed to delete lead");
                    }
                },
                isLoading: isDeleting,
                title: "Delete Lead",
                description: "Are you sure you want to remove this lead? This action cannot be undone."
            }, void 0, false, {
                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                lineNumber: 1312,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$ScheduleVisitDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScheduleVisitDialog"], {
                onClose: ()=>setSchedulingLead(null),
                lead: schedulingLead,
                siteVisitStatuses: masterData?.site_visit_status || masterData?.site_visit_statuses || [],
                rms: rms,
                onSubmit: handleScheduleVisitSubmit,
                isLoading: isScheduling,
                open: !isSADMIN && !!schedulingLead
            }, void 0, false, {
                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                lineNumber: 1330,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            selectedUuids.length > 0 && can(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$permissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PERMISSIONS"].LEAD_BULK_ACTIONS) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$BulkActionsBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BulkActionsBar"], {
                selectedCount: selectedUuids.length,
                rms: rms,
                ems: isAdmin ? ems : emsReportees,
                onAssignRm: (id)=>handleBulkAssign(id, 'rm'),
                onAssignEm: (id)=>handleBulkAssign(id, 'em'),
                onMarkAsJunk: handleBulkMarkAsJunk,
                onCancel: ()=>dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$store$2f$leadsSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setSelectedUuids"])({
                        tabKey,
                        uuids: []
                    })),
                isLoading: isAnyBulkAssigning || isDeleting,
                showAssignRm: isAdmin,
                showAssignEm: isRM
            }, void 0, false, {
                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                lineNumber: 1345,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$LeadActivityDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LeadActivityDialog"], {
                open: !!activityLead,
                onClose: ()=>setActivityLead(null),
                lead: activityLead,
                onSubmit: handleLeadActivitySubmit,
                isLoading: isAddingActivity
            }, activityLead?.uuid || 'activity-dialog', false, {
                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                lineNumber: 1361,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$BulkImportDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BulkImportDialog"], {
                open: isBulkImportOpen,
                onClose: ()=>setIsBulkImportOpen(false),
                projectOptions: projectOptions,
                onImportComplete: handleRefetch
            }, void 0, false, {
                fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
                lineNumber: 1370,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/leads/pages/LeadsPage.tsx",
        lineNumber: 880,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LeadsPage, "GMp5fpNsfJKSDY8U+3SqWCe9EeU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useDebounce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDebounce"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useDebounce$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDebounce"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetLeadByIdQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllMasterDataQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersByRoleIdQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetLeadsQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetLeadsByRmIdQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetLeadsByEmIdQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAddLeadActivityMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetReporteesQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetReporteesQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateLeadMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateLeadMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBulkAssignLeadsToRmMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBulkAssignLeadsToEmMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersByRoleIdQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeleteLeadMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScheduleVisitMutation"]
    ];
});
_c = LeadsPage;
var _c;
__turbopack_context__.k.register(_c, "LeadsPage");
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
]);

//# sourceMappingURL=src_features_0emknov._.js.map