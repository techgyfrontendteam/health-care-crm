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
"[project]/src/features/reports/api/reportsApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reportsApi",
    ()=>reportsApi,
    "useDownloadCampaignPerformanceDataMutation",
    ()=>useDownloadCampaignPerformanceDataMutation,
    "useDownloadDailySalesReportDataMutation",
    ()=>useDownloadDailySalesReportDataMutation,
    "useDownloadPersonaSegmentAnalysisMutation",
    ()=>useDownloadPersonaSegmentAnalysisMutation,
    "useDownloadProjectWiseObjectionDataMutation",
    ()=>useDownloadProjectWiseObjectionDataMutation,
    "useDownloadSourceQualityBreakdownDataMutation",
    ()=>useDownloadSourceQualityBreakdownDataMutation,
    "useGetAdsPerformanceToBookingDataQuery",
    ()=>useGetAdsPerformanceToBookingDataQuery,
    "useGetAllCampaignsDataQuery",
    ()=>useGetAllCampaignsDataQuery,
    "useGetCampaignsFunnelDataQuery",
    ()=>useGetCampaignsFunnelDataQuery,
    "useGetDailySalesReportCardDataQuery",
    ()=>useGetDailySalesReportCardDataQuery,
    "useGetDailySalesReportDataQuery",
    ()=>useGetDailySalesReportDataQuery,
    "useGetLeadSourceReportsCardDataQuery",
    ()=>useGetLeadSourceReportsCardDataQuery,
    "useGetPersonaSegmentAnalysisQuery",
    ()=>useGetPersonaSegmentAnalysisQuery,
    "useGetPersonaSegmentCardsDataQuery",
    ()=>useGetPersonaSegmentCardsDataQuery,
    "useGetProjectWiseObjectionDataQuery",
    ()=>useGetProjectWiseObjectionDataQuery,
    "useGetProjectWiseObjectionReportByCardsDataQuery",
    ()=>useGetProjectWiseObjectionReportByCardsDataQuery,
    "useGetSourceQualityBreakdownDataQuery",
    ()=>useGetSourceQualityBreakdownDataQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/baseApi.ts [app-client] (ecmascript)");
;
const reportsApi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
    endpoints: (builder)=>({
            getDailySalesReportCardData: builder.query({
                query: (body = {})=>({
                        url: "/reports/getDailySalesReportCardData",
                        method: "POST",
                        body
                    })
            }),
            getDailySalesReportData: builder.query({
                query: (body = {})=>({
                        url: "/reports/getDailySalesReportData",
                        method: "POST",
                        body
                    })
            }),
            downloadDailySalesReportData: builder.mutation({
                query: (body = {})=>({
                        url: "/reports/downloadDailySalesReportData",
                        method: "POST",
                        body
                    })
            }),
            getProjectWiseObjectionReportByCardsData: builder.query({
                query: (body = {})=>({
                        url: "/reports/getProjectWiseObjectionReportByCardsData",
                        method: "POST",
                        body
                    })
            }),
            getProjectWiseObjectionData: builder.query({
                query: (body = {})=>({
                        url: "/reports/getProjectWiseObjectionData",
                        method: "POST",
                        body
                    })
            }),
            downloadProjectWiseObjectionData: builder.mutation({
                query: (body = {})=>({
                        url: "/reports/downloadProjectWiseObjectionData",
                        method: "POST",
                        body
                    })
            }),
            getPersonaSegmentCardsData: builder.query({
                query: (body = {})=>({
                        url: "/reports/getPersonaSegmentCardsData",
                        method: "POST",
                        body
                    })
            }),
            getPersonaSegmentAnalysis: builder.query({
                query: (body = {})=>({
                        url: "/reports/getPersonaSegmentAnalysis",
                        method: "POST",
                        body
                    })
            }),
            downloadPersonaSegmentAnalysis: builder.mutation({
                query: (body = {})=>({
                        url: "/reports/downloadPersonaSegmentAnalysis",
                        method: "POST",
                        body
                    })
            }),
            getLeadSourceReportsCardData: builder.query({
                query: (body)=>({
                        url: "/reports/getLeadSourceReportsCardData",
                        method: "POST",
                        body
                    })
            }),
            getSourceQualityBreakdownData: builder.query({
                query: (body)=>({
                        url: "/reports/getSourceQualityBreakdownData",
                        method: "POST",
                        body
                    })
            }),
            downloadSourceQualityBreakdownData: builder.mutation({
                query: (body)=>({
                        url: "/reports/downloadSourceQualityBreakdownData",
                        method: "POST",
                        body
                    })
            }),
            getAllCampaignsData: builder.query({
                query: (body = {})=>{
                    const cleanedBody = {};
                    cleanedBody.project_id = body && body.project_id && body.project_id.length > 0 ? body.project_id : [
                        1
                    ];
                    return {
                        url: "/marketing/getAllcampaignsData",
                        method: "POST",
                        body: cleanedBody
                    };
                }
            }),
            getAdsPerformanceToBookingData: builder.query({
                query: (body = {})=>{
                    const cleanedBody = {};
                    cleanedBody.project_id = body && body.project_id ? body.project_id : 1;
                    if (body && body.campaign_id) {
                        cleanedBody.campaign_id = body.campaign_id;
                    }
                    return {
                        url: "/marketing/getAdsPerformanceToBookingData",
                        method: "POST",
                        body: cleanedBody
                    };
                }
            }),
            getCampaignsFunnelData: builder.query({
                query: (body = {})=>{
                    const cleanedBody = {};
                    cleanedBody.project_id = body && body.project_id ? body.project_id : 1;
                    if (body && body.campaign_id) {
                        cleanedBody.campaign_id = body.campaign_id;
                    }
                    return {
                        url: "/marketing/getCampaignsFunnelData",
                        method: "POST",
                        body: cleanedBody
                    };
                }
            }),
            downloadCampaignPerformanceData: builder.mutation({
                query: (body = {})=>{
                    const cleanedBody = {};
                    cleanedBody.project_id = body && body.project_id ? body.project_id : 1;
                    if (body && body.campaign_id) {
                        cleanedBody.campaign_id = body.campaign_id;
                    }
                    return {
                        url: "/marketing/downloadProjectWiseCampaignReportData",
                        method: "POST",
                        body: cleanedBody
                    };
                }
            })
        })
});
const { useGetDailySalesReportCardDataQuery, useGetDailySalesReportDataQuery, useDownloadDailySalesReportDataMutation, useGetLeadSourceReportsCardDataQuery, useGetSourceQualityBreakdownDataQuery, useDownloadSourceQualityBreakdownDataMutation, useGetProjectWiseObjectionReportByCardsDataQuery, useGetProjectWiseObjectionDataQuery, useDownloadProjectWiseObjectionDataMutation, useGetPersonaSegmentCardsDataQuery, useGetPersonaSegmentAnalysisQuery, useDownloadPersonaSegmentAnalysisMutation, useGetAllCampaignsDataQuery, useGetAdsPerformanceToBookingDataQuery, useGetCampaignsFunnelDataQuery, useDownloadCampaignPerformanceDataMutation } = reportsApi;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/reports/components/ReportFilterDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReportFilterDialog",
    ()=>ReportFilterDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-client] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/megaphone.js [app-client] (ecmascript) <export default as Megaphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$getProjectStatusOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/getProjectStatusOptions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/hooks/useMasterDataLookup.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
    if (!start) return "All Time";
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
const formatMonthYear = (date)=>{
    return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });
};
const ReportFilterDialog = ({ open, onClose, tabs, onApply, onReset, onProjectChange, projectOptions, statusOptions = [], campaignOptions = [], hierarchicalCampaigns, appliedProjectIds, appliedStatusIds = [], appliedCampaignIds = [], appliedAdSetIds = [], appliedCreativeIds = [], appliedStartDate = null, appliedEndDate = null, initialTab })=>{
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialTab || tabs[0]);
    const { projectLeadStatuses } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"])();
    // Temp local states
    const [tempProjectIds, setTempProjectIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tempStatusIds, setTempStatusIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tempCampaignIds, setTempCampaignIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tempAdSetIds, setTempAdSetIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [tempCreativeIds, setTempCreativeIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const filteredStatusOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ReportFilterDialog.useMemo[filteredStatusOptions]": ()=>{
            if (tempProjectIds.length === 1 && projectLeadStatuses && projectLeadStatuses.length > 0) {
                const projId = Number(tempProjectIds[0]);
                const opts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$getProjectStatusOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectStatusOptions"])(projId, projectLeadStatuses);
                if (opts && opts.length > 0) {
                    return opts.map({
                        "ReportFilterDialog.useMemo[filteredStatusOptions]": (opt)=>({
                                value: String(opt.value),
                                label: opt.label
                            })
                    }["ReportFilterDialog.useMemo[filteredStatusOptions]"]);
                }
            }
            return statusOptions;
        }
    }["ReportFilterDialog.useMemo[filteredStatusOptions]"], [
        tempProjectIds,
        projectLeadStatuses,
        statusOptions
    ]);
    // Date states
    const [tempStartDate, setTempStartDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [tempEndDate, setTempEndDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeMonth, setActiveMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ReportFilterDialog.useState": ()=>new Date()
    }["ReportFilterDialog.useState"]); // Default current month
    const [quickSelect, setQuickSelect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All Time");
    const wasOpenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Sync state when open changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReportFilterDialog.useEffect": ()=>{
            if (open && !wasOpenRef.current) {
                setTempProjectIds(appliedProjectIds);
                setTempStatusIds(appliedStatusIds);
                setTempCampaignIds(appliedCampaignIds);
                setTempAdSetIds(appliedAdSetIds);
                setTempCreativeIds(appliedCreativeIds);
                setTempStartDate(appliedStartDate);
                setTempEndDate(appliedEndDate);
                setActiveTab(initialTab || tabs[0]);
                if (!appliedStartDate && !appliedEndDate) {
                    setQuickSelect("All Time");
                } else {
                    setQuickSelect("");
                }
                if (appliedStartDate) {
                    setActiveMonth(new Date(appliedStartDate.getFullYear(), appliedStartDate.getMonth(), 1));
                } else {
                    setActiveMonth(new Date());
                }
                onProjectChange?.(appliedProjectIds);
            }
            wasOpenRef.current = open;
        }
    }["ReportFilterDialog.useEffect"], [
        open,
        appliedProjectIds,
        appliedStatusIds,
        appliedCampaignIds,
        appliedAdSetIds,
        appliedCreativeIds,
        appliedStartDate,
        appliedEndDate,
        tabs,
        initialTab,
        onProjectChange
    ]);
    const [campaignTab, setCampaignTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("active");
    const [expandedNodes, setExpandedNodes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "camp-1": true
    });
    const activeCampaigns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ReportFilterDialog.useMemo[activeCampaigns]": ()=>[
                {
                    id: "camp-1",
                    name: "Meta Lead Gen Q2",
                    adSets: [
                        {
                            id: "adset-1-1",
                            name: "HNI_Mumbai_Luxury",
                            creatives: [
                                {
                                    id: "creative-1-1-1",
                                    name: "3BHK_Lifestyle_Static_V1"
                                },
                                {
                                    id: "creative-1-1-2",
                                    name: "Luxury_Penthouse_Video_V2"
                                }
                            ]
                        },
                        {
                            id: "adset-1-2",
                            name: "IT_Corridor_Professionals",
                            creatives: [
                                {
                                    id: "creative-1-2-1",
                                    name: "Tech_Park_Carousel_V1"
                                }
                            ]
                        }
                    ]
                },
                {
                    id: "camp-2",
                    name: "Google Search: Residential",
                    adSets: [
                        {
                            id: "adset-2-1",
                            name: "Luxury_Villas_Keywords",
                            creatives: [
                                {
                                    id: "creative-2-1-1",
                                    name: "Villa_Search_Ad_V1"
                                }
                            ]
                        },
                        {
                            id: "adset-2-2",
                            name: "Affordable_Premium_Apartments",
                            creatives: [
                                {
                                    id: "creative-2-2-1",
                                    name: "Apartment_Search_Ad_V1"
                                }
                            ]
                        }
                    ]
                }
            ]
    }["ReportFilterDialog.useMemo[activeCampaigns]"], []);
    const completedCampaigns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ReportFilterDialog.useMemo[completedCampaigns]": ()=>[
                {
                    id: "camp-3",
                    name: "Retargeting: Site Visitors",
                    adSets: [
                        {
                            id: "adset-3-1",
                            name: "Abandoned_Cart_leads",
                            creatives: [
                                {
                                    id: "creative-3-1-1",
                                    name: "Offer_Discount_V1"
                                }
                            ]
                        },
                        {
                            id: "adset-3-2",
                            name: "Video_Viewer_Retargeting",
                            creatives: [
                                {
                                    id: "creative-3-2-1",
                                    name: "Skyline_Walkthrough_Video"
                                }
                            ]
                        }
                    ]
                }
            ]
    }["ReportFilterDialog.useMemo[completedCampaigns]"], []);
    const resolvedActiveCampaigns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ReportFilterDialog.useMemo[resolvedActiveCampaigns]": ()=>{
            return hierarchicalCampaigns?.active || activeCampaigns;
        }
    }["ReportFilterDialog.useMemo[resolvedActiveCampaigns]"], [
        hierarchicalCampaigns,
        activeCampaigns
    ]);
    const resolvedCompletedCampaigns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ReportFilterDialog.useMemo[resolvedCompletedCampaigns]": ()=>{
            return hierarchicalCampaigns?.completed || completedCampaigns;
        }
    }["ReportFilterDialog.useMemo[resolvedCompletedCampaigns]"], [
        hierarchicalCampaigns,
        completedCampaigns
    ]);
    const toggleNode = (id)=>{
        setExpandedNodes((prev)=>({
                ...prev,
                [id]: !prev[id]
            }));
    };
    const toggleCampaignSelection = (campId, adSets)=>{
        const isCampChecked = tempCampaignIds.includes(campId);
        const adSetIds = adSets.map((a)=>a.id);
        const creativeIds = adSets.flatMap((a)=>a.creatives.map((c)=>c.id));
        if (isCampChecked) {
            setTempCampaignIds((prev)=>prev.filter((id)=>id !== campId));
            setTempAdSetIds((prev)=>prev.filter((id)=>!adSetIds.includes(id)));
            setTempCreativeIds((prev)=>prev.filter((id)=>!creativeIds.includes(id)));
        } else {
            setTempCampaignIds((prev)=>[
                    ...prev,
                    campId
                ]);
            setTempAdSetIds((prev)=>Array.from(new Set([
                    ...prev,
                    ...adSetIds
                ])));
            setTempCreativeIds((prev)=>Array.from(new Set([
                    ...prev,
                    ...creativeIds
                ])));
        }
    };
    const toggleAdSetSelection = (campId, adSetId, creatives, allAdSets)=>{
        const isAdSetChecked = tempAdSetIds.includes(adSetId);
        const creativeIds = creatives.map((c)=>c.id);
        let nextAdSets;
        let nextCreatives;
        if (isAdSetChecked) {
            nextAdSets = tempAdSetIds.filter((id)=>id !== adSetId);
            nextCreatives = tempCreativeIds.filter((id)=>!creativeIds.includes(id));
            setTempCampaignIds((prev)=>prev.filter((id)=>id !== campId));
        } else {
            nextAdSets = [
                ...tempAdSetIds,
                adSetId
            ];
            nextCreatives = Array.from(new Set([
                ...tempCreativeIds,
                ...creativeIds
            ]));
            const allChecked = allAdSets.every((a)=>a.id === adSetId || tempAdSetIds.includes(a.id));
            if (allChecked) {
                setTempCampaignIds((prev)=>Array.from(new Set([
                        ...prev,
                        campId
                    ])));
            }
        }
        setTempAdSetIds(nextAdSets);
        setTempCreativeIds(nextCreatives);
    };
    const toggleCreativeSelection = (campId, adSetId, creativeId, adSetCreatives, campaignAdSets)=>{
        const isCreativeChecked = tempCreativeIds.includes(creativeId);
        let nextCreatives;
        if (isCreativeChecked) {
            nextCreatives = tempCreativeIds.filter((id)=>id !== creativeId);
            setTempAdSetIds((prev)=>prev.filter((id)=>id !== adSetId));
            setTempCampaignIds((prev)=>prev.filter((id)=>id !== campId));
        } else {
            nextCreatives = [
                ...tempCreativeIds,
                creativeId
            ];
            const allCrChecked = adSetCreatives.every((c)=>c.id === creativeId || tempCreativeIds.includes(c.id));
            if (allCrChecked) {
                setTempAdSetIds((prev)=>{
                    const updated = Array.from(new Set([
                        ...prev,
                        adSetId
                    ]));
                    const allAdChecked = campaignAdSets.every((a)=>a.id === adSetId || updated.includes(a.id));
                    if (allAdChecked) {
                        setTempCampaignIds((p)=>Array.from(new Set([
                                ...p,
                                campId
                            ])));
                    }
                    return updated;
                });
            }
        }
        setTempCreativeIds(nextCreatives);
    };
    const handleCampaignSelectAll = ()=>{
        const list = campaignTab === "active" ? resolvedActiveCampaigns : resolvedCompletedCampaigns;
        const allCampaignIds = list.map((c)=>c.id);
        const allAdSetIds = list.flatMap((c)=>c.adSets.map((a)=>a.id));
        const allCreativeIds = list.flatMap((c)=>c.adSets.flatMap((a)=>a.creatives.map((cr)=>cr.id)));
        const allChecked = allCampaignIds.every((id)=>tempCampaignIds.includes(id)) && allAdSetIds.every((id)=>tempAdSetIds.includes(id)) && allCreativeIds.every((id)=>tempCreativeIds.includes(id));
        if (allChecked) {
            setTempCampaignIds((prev)=>prev.filter((id)=>!allCampaignIds.includes(id)));
            setTempAdSetIds((prev)=>prev.filter((id)=>!allAdSetIds.includes(id)));
            setTempCreativeIds((prev)=>prev.filter((id)=>!allCreativeIds.includes(id)));
        } else {
            setTempCampaignIds((prev)=>Array.from(new Set([
                    ...prev,
                    ...allCampaignIds
                ])));
            setTempAdSetIds((prev)=>Array.from(new Set([
                    ...prev,
                    ...allAdSetIds
                ])));
            setTempCreativeIds((prev)=>Array.from(new Set([
                    ...prev,
                    ...allCreativeIds
                ])));
        }
    };
    const calendarDays = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ReportFilterDialog.useMemo[calendarDays]": ()=>{
            return getDaysInMonth(activeMonth.getFullYear(), activeMonth.getMonth());
        }
    }["ReportFilterDialog.useMemo[calendarDays]"], [
        activeMonth
    ]);
    const handleQuickSelect = (option)=>{
        setQuickSelect(option);
        const today = new Date();
        if (option === "Today") {
            setTempStartDate(today);
            setTempEndDate(today);
        } else if (option === "Last 7 Days") {
            const start = new Date();
            start.setDate(today.getDate() - 7);
            setTempStartDate(start);
            setTempEndDate(today);
        } else if (option === "This Month") {
            setTempStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
            setTempEndDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
        } else if (option === "All Time") {
            setTempStartDate(null);
            setTempEndDate(null);
        }
    };
    const handleDayClick = (date)=>{
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
    const handleClear = ()=>{
        setTempProjectIds([]);
        setTempStatusIds([]);
        setTempCampaignIds([]);
        setTempAdSetIds([]);
        setTempCreativeIds([]);
        setTempStartDate(null);
        setTempEndDate(null);
        setQuickSelect("All Time");
    };
    const handleApply = ()=>{
        onApply({
            projectIds: tempProjectIds,
            statusIds: tempStatusIds,
            startDate: tempStartDate,
            endDate: tempEndDate,
            campaignIds: tempCampaignIds,
            adSetIds: tempAdSetIds,
            creativeIds: tempCreativeIds
        });
        onClose();
    };
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-55 flex items-center justify-center bg-black/45 backdrop-blur-[2px] animate-in fade-in duration-200",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white dark:bg-zinc-950 w-full max-w-[760px] rounded-[24px] shadow-2xl overflow-hidden flex flex-col border border-zinc-150 dark:border-zinc-800/80 animate-in zoom-in-95 duration-200",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between px-8 py-6 border-b border-zinc-100 dark:border-zinc-850",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-2xl font-bold text-[#002d62] dark:text-blue-450 tracking-tight",
                            children: [
                                activeTab === "projects" && "Select Your Project",
                                activeTab === "status" && "Select Lead Status",
                                activeTab === "date" && "Select Date Range",
                                activeTab === "campaigns" && "Select Campaign"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                            lineNumber: 460,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-850 text-slate-400 dark:text-zinc-500 transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                lineNumber: 470,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                            lineNumber: 466,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                    lineNumber: 459,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-1 min-h-[380px] max-h-[450px]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-[180px] border-r border-zinc-100 dark:border-zinc-850 p-4 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col gap-2",
                            children: tabs.map((tab)=>{
                                const isActive = activeTab === tab;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab(tab),
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold shadow-sm transition-all duration-200 text-left select-none", isActive ? "bg-[#0f3d6b] text-white" : "text-slate-600 hover:text-slate-850 hover:bg-zinc-100/60 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-850/40"),
                                    children: [
                                        tab === "projects" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                            lineNumber: 492,
                                            columnNumber: 42
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        tab === "status" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                            lineNumber: 493,
                                            columnNumber: 40
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        tab === "date" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                            lineNumber: 494,
                                            columnNumber: 38
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        tab === "campaigns" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$megaphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Megaphone$3e$__["Megaphone"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                            lineNumber: 495,
                                            columnNumber: 43
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "capitalize",
                                            children: tab === "status" ? "Lead Status" : tab
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                            lineNumber: 496,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, tab, true, {
                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                    lineNumber: 482,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0));
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                            lineNumber: 478,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto p-6",
                            children: [
                                activeTab === "projects" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: projectOptions.map((proj)=>{
                                        const isChecked = tempProjectIds.includes(proj.value);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>{
                                                let nextProjectIds;
                                                if (isChecked) {
                                                    nextProjectIds = [];
                                                } else {
                                                    nextProjectIds = [
                                                        proj.value
                                                    ];
                                                }
                                                setTempProjectIds(nextProjectIds);
                                                setTempStatusIds([]);
                                                setTempCampaignIds([]);
                                                setTempAdSetIds([]);
                                                setTempCreativeIds([]);
                                                onProjectChange?.(nextProjectIds);
                                            },
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-250 select-none", isChecked ? "border-[#0f3d6b] bg-slate-50/30 dark:border-blue-500/50 dark:bg-blue-950/10" : "border-zinc-150 hover:border-zinc-250 dark:border-zinc-800/60 dark:hover:border-zinc-700/60"),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-bold text-slate-700 dark:text-zinc-200",
                                                    children: proj.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                    lineNumber: 536,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("w-5 h-5 rounded-full flex items-center justify-center border transition-all duration-250", isChecked ? "bg-[#0f3d6b] border-[#0f3d6b] text-white" : "border-zinc-300 dark:border-zinc-650 bg-white dark:bg-zinc-900"),
                                                    children: isChecked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-2 h-2 rounded-full bg-white"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                        lineNumber: 545,
                                                        columnNumber: 39
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                    lineNumber: 539,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, proj.value, true, {
                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                            lineNumber: 513,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0));
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                    lineNumber: 509,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                activeTab === "status" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3",
                                    children: filteredStatusOptions.map((stat)=>{
                                        const isChecked = tempStatusIds.includes(stat.value);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>{
                                                if (isChecked) {
                                                    setTempStatusIds(tempStatusIds.filter((id)=>id !== stat.value));
                                                } else {
                                                    setTempStatusIds([
                                                        ...tempStatusIds,
                                                        stat.value
                                                    ]);
                                                }
                                            },
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-250 select-none", isChecked ? "border-[#0f3d6b] bg-slate-50/30 dark:border-blue-500/50 dark:bg-blue-950/10" : "border-zinc-150 hover:border-zinc-250 dark:border-zinc-800/60 dark:hover:border-zinc-700/60"),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-bold text-slate-700 dark:text-zinc-200",
                                                    children: stat.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                    lineNumber: 575,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("w-5 h-5 rounded-lg flex items-center justify-center border transition-all duration-250", isChecked ? "bg-[#0f3d6b] border-[#0f3d6b] text-white" : "border-zinc-300 dark:border-zinc-650 bg-white dark:bg-zinc-900"),
                                                    children: isChecked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                        className: "w-3.5 h-3.5 stroke-[3]"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                        lineNumber: 584,
                                                        columnNumber: 39
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                    lineNumber: 578,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, stat.value, true, {
                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                            lineNumber: 559,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0));
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                    lineNumber: 555,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                "            ",
                                activeTab === "campaigns" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4 flex-1 flex flex-col min-w-[320px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between border-b border-zinc-150 dark:border-zinc-800 pb-2 mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500",
                                                    children: "SELECT CAMPAIGNS"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                    lineNumber: 595,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: handleCampaignSelectAll,
                                                    className: "text-xs font-bold text-[#0f3d6b] dark:text-blue-400 hover:underline cursor-pointer",
                                                    children: "Select All"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                    lineNumber: 598,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                            lineNumber: 594,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex bg-zinc-100 dark:bg-zinc-800/60 p-1 rounded-2xl w-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setCampaignTab("active"),
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("flex-1 text-center py-2.5 rounded-xl text-xs font-bold transition-all duration-200", campaignTab === "active" ? "bg-white dark:bg-zinc-900 text-[#0f3d6b] dark:text-blue-400 shadow-sm" : "text-slate-500 dark:text-zinc-400 hover:text-slate-850 dark:hover:text-zinc-200"),
                                                    children: "Active"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                    lineNumber: 609,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setCampaignTab("completed"),
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("flex-1 text-center py-2.5 rounded-xl text-xs font-bold transition-all duration-200", campaignTab === "completed" ? "bg-white dark:bg-zinc-900 text-[#0f3d6b] dark:text-blue-400 shadow-sm" : "text-slate-500 dark:text-zinc-400 hover:text-slate-850 dark:hover:text-zinc-200"),
                                                    children: "Completed"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                    lineNumber: 621,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                            lineNumber: 608,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4 overflow-y-auto max-h-[260px] pr-2 mt-2 scrollbar-thin",
                                            children: (campaignTab === "active" ? resolvedActiveCampaigns : resolvedCompletedCampaigns).map((camp)=>{
                                                const isCampExpanded = !!expandedNodes[camp.id];
                                                const isCampChecked = tempCampaignIds.includes(camp.id);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3 py-1 select-none",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>toggleNode(camp.id),
                                                                    className: "p-1 rounded hover:bg-zinc-150 dark:hover:bg-zinc-800 text-slate-500 transition-colors",
                                                                    children: isCampExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                        className: "w-4 h-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                        lineNumber: 651,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                        className: "w-4 h-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                        lineNumber: 653,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                    lineNumber: 645,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    onClick: ()=>toggleCampaignSelection(camp.id, camp.adSets),
                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("w-5 h-5 rounded-lg flex items-center justify-center border transition-all duration-200 cursor-pointer", isCampChecked ? "bg-[#0f3d6b] border-[#0f3d6b] text-white" : "border-zinc-300 dark:border-zinc-650 bg-white dark:bg-zinc-900"),
                                                                    children: isCampChecked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                        className: "w-3.5 h-3.5 stroke-[3]"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                        lineNumber: 665,
                                                                        columnNumber: 47
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                    lineNumber: 656,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    onClick: ()=>toggleCampaignSelection(camp.id, camp.adSets),
                                                                    className: "text-sm font-bold text-slate-800 dark:text-zinc-150 cursor-pointer",
                                                                    children: [
                                                                        "Campaign: ",
                                                                        camp.name
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                    lineNumber: 667,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                            lineNumber: 644,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        isCampExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "pl-6 space-y-3 border-l border-dashed border-zinc-200 dark:border-zinc-800/80 ml-3.5",
                                                            children: camp.adSets.map((adSet)=>{
                                                                const isAdSetExpanded = !!expandedNodes[adSet.id];
                                                                const isAdSetChecked = tempAdSetIds.includes(adSet.id);
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "space-y-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-3 py-1 select-none",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    type: "button",
                                                                                    onClick: ()=>toggleNode(adSet.id),
                                                                                    className: "p-1 rounded hover:bg-zinc-150 dark:hover:bg-zinc-800 text-slate-500 transition-colors",
                                                                                    children: isAdSetExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                                        className: "w-3.5 h-3.5"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                                        lineNumber: 692,
                                                                                        columnNumber: 41
                                                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                                        className: "w-3.5 h-3.5"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                                        lineNumber: 694,
                                                                                        columnNumber: 41
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                                    lineNumber: 686,
                                                                                    columnNumber: 37
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    onClick: ()=>toggleAdSetSelection(camp.id, adSet.id, adSet.creatives, camp.adSets),
                                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("w-4.5 h-4.5 rounded flex items-center justify-center border transition-all duration-200 cursor-pointer", isAdSetChecked ? "bg-[#0f3d6b] border-[#0f3d6b] text-white" : "border-zinc-300 dark:border-zinc-650 bg-white dark:bg-zinc-900"),
                                                                                    children: isAdSetChecked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                                        className: "w-3 h-3 stroke-[3]"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                                        lineNumber: 706,
                                                                                        columnNumber: 58
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                                    lineNumber: 697,
                                                                                    columnNumber: 37
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    onClick: ()=>toggleAdSetSelection(camp.id, adSet.id, adSet.creatives, camp.adSets),
                                                                                    className: "text-xs font-bold text-slate-700 dark:text-zinc-200 cursor-pointer",
                                                                                    children: [
                                                                                        "Add Set: ",
                                                                                        adSet.name
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                                    lineNumber: 708,
                                                                                    columnNumber: 37
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                            lineNumber: 685,
                                                                            columnNumber: 35
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        isAdSetExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "pl-6 space-y-2.5 border-l border-dashed border-zinc-200 dark:border-zinc-800/80 ml-3",
                                                                            children: adSet.creatives.map((creative)=>{
                                                                                const isCreativeChecked = tempCreativeIds.includes(creative.id);
                                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center gap-3 py-1 select-none",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            onClick: ()=>toggleCreativeSelection(camp.id, adSet.id, creative.id, adSet.creatives, camp.adSets),
                                                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("w-4 h-4 rounded flex items-center justify-center border transition-all duration-200 cursor-pointer", isCreativeChecked ? "bg-[#0f3d6b] border-[#0f3d6b] text-white" : "border-zinc-300 dark:border-zinc-650 bg-white dark:bg-zinc-900"),
                                                                                            children: isCreativeChecked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                                                className: "w-2.5 h-2.5 stroke-[3]"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                                                lineNumber: 733,
                                                                                                columnNumber: 69
                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                                            lineNumber: 724,
                                                                                            columnNumber: 45
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            onClick: ()=>toggleCreativeSelection(camp.id, adSet.id, creative.id, adSet.creatives, camp.adSets),
                                                                                            className: "inline-flex items-center gap-2 cursor-pointer",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                                                                    className: "w-3.5 h-3.5 text-slate-400"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                                                    lineNumber: 739,
                                                                                                    columnNumber: 47
                                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "text-xs font-medium text-slate-650 dark:text-zinc-400",
                                                                                                    children: [
                                                                                                        "Creative: ",
                                                                                                        creative.name
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                                                    lineNumber: 740,
                                                                                                    columnNumber: 47
                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                                            lineNumber: 735,
                                                                                            columnNumber: 45
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, creative.id, true, {
                                                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                                    lineNumber: 723,
                                                                                    columnNumber: 43
                                                                                }, ("TURBOPACK compile-time value", void 0));
                                                                            })
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                            lineNumber: 718,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, adSet.id, true, {
                                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                    lineNumber: 683,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0));
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                            lineNumber: 677,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, camp.id, true, {
                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                    lineNumber: 642,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0));
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                            lineNumber: 636,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                    lineNumber: 592,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                activeTab === "date" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col sm:flex-row gap-6 min-h-[300px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full sm:w-[180px] flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-zinc-100 dark:border-zinc-850 pb-4 sm:pb-0 sm:pr-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 px-1",
                                                            children: "QUICK SELECTS"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                            lineNumber: 768,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-1",
                                                            children: [
                                                                "Today",
                                                                "Last 7 Days",
                                                                "This Month",
                                                                "All Time"
                                                            ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>handleQuickSelect(opt),
                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all duration-150", quickSelect === opt ? "bg-slate-50 text-slate-850 border border-zinc-150 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700" : "text-slate-500 hover:text-slate-800 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/40"),
                                                                    children: opt
                                                                }, opt, false, {
                                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                    lineNumber: 773,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                            lineNumber: 771,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                    lineNumber: 767,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pt-4 border-t border-zinc-100 dark:border-zinc-850 mt-4 sm:mt-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 px-1 mb-1",
                                                            children: "SELECTED SPAN"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                            lineNumber: 791,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "block text-xs font-extrabold text-[#0f3d6b] dark:text-blue-400 px-1",
                                                            children: formatSelectedSpan(tempStartDate, tempEndDate)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                            lineNumber: 794,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                    lineNumber: 790,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                            lineNumber: 766,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 flex flex-col",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between mb-4 px-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-bold text-slate-800 dark:text-zinc-200",
                                                            children: formatMonthYear(activeMonth)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                            lineNumber: 804,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: prevMonth,
                                                                    className: "p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                                        className: "w-3.5 h-3.5"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                        lineNumber: 813,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                    lineNumber: 808,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: nextMonth,
                                                                    className: "p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                        className: "w-3.5 h-3.5"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                        lineNumber: 820,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                    lineNumber: 815,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                            lineNumber: 807,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                    lineNumber: 803,
                                                    columnNumber: 19
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
                                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                            lineNumber: 828,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                    lineNumber: 826,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-7 gap-y-1 text-center",
                                                    children: calendarDays.map(({ date, isCurrentMonth }, idx)=>{
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
                                                            onClick: ()=>handleDayClick(date),
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("relative py-1.5 text-xs font-bold cursor-pointer select-none flex items-center justify-center transition-all duration-150", isCurrentMonth ? "text-slate-800 dark:text-zinc-200" : "text-slate-300 dark:text-zinc-650", bgClass),
                                                            children: [
                                                                (isSelectedStart || isSelectedEnd) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute inset-0 m-auto w-7 h-7 rounded-full bg-[#0f3d6b] dark:bg-[#1a5b9b] z-0 shadow-sm animate-in zoom-in-75 duration-150"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                    lineNumber: 861,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("relative z-10", (isSelectedStart || isSelectedEnd) && "text-white font-bold"),
                                                                    children: date.getDate()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                                    lineNumber: 863,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, idx, true, {
                                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                            lineNumber: 851,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                                    lineNumber: 835,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                            lineNumber: 801,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                    lineNumber: 763,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                            lineNumber: 505,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                    lineNumber: 475,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between px-8 py-5 bg-zinc-50/50 dark:bg-zinc-900/40 border-t border-zinc-100 dark:border-zinc-850",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleClear,
                            className: "text-sm font-extrabold text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors",
                            children: "Clear Filters"
                        }, void 0, false, {
                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                            lineNumber: 884,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "px-6 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-750 text-sm font-bold text-slate-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-855 transition-colors",
                                    children: "Dismiss"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                    lineNumber: 891,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleApply,
                                    className: "px-6 py-2.5 bg-[#0f3d6b] hover:bg-[#0c3156] text-white rounded-full text-sm font-bold shadow-md transition-colors animate-in fade-in duration-200",
                                    children: "Apply Selection"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                                    lineNumber: 897,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                            lineNumber: 890,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
                    lineNumber: 883,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
            lineNumber: 456,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/reports/components/ReportFilterDialog.tsx",
        lineNumber: 455,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ReportFilterDialog, "4c308qfsydxL4d0BLvSTzagycew=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"]
    ];
});
_c = ReportFilterDialog;
var _c;
__turbopack_context__.k.register(_c, "ReportFilterDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/reports/components/ReportKpiCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReportKpiCard",
    ()=>ReportKpiCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/index.ts [app-client] (ecmascript) <locals>");
;
;
const ReportKpiCard = ({ title, value, valueClassName })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-[24px] 2xl:rounded-[32px] min-[2560px]:rounded-[42px] p-6 xl:p-8 2xl:p-10 min-[2560px]:p-14 shadow-sm hover:shadow-md transition-shadow duration-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-[12px] font-bold tracking-[1.2px] text-[#191C1E] dark:text-zinc-300 uppercase",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/features/reports/components/ReportKpiCard.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("text-[36px] font-bold text-[#00236F] dark:text-blue-400 mt-1 tracking-tight", valueClassName),
                children: value
            }, void 0, false, {
                fileName: "[project]/src/features/reports/components/ReportKpiCard.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/reports/components/ReportKpiCard.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ReportKpiCard;
var _c;
__turbopack_context__.k.register(_c, "ReportKpiCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/reports/constants/dailySalesData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getInitialDailySalesData",
    ()=>getInitialDailySalesData
]);
const getInitialDailySalesData = (resolvedProjectId, resolvedRms)=>{
    const firstRmId = resolvedRms[0] || 1;
    const secondRmId = resolvedRms[1] || 2;
    return [
        {
            id: 1,
            name: "Rajesh Sharma",
            projectId: resolvedProjectId,
            projectName: "Planet Green",
            rmId: firstRmId,
            emId: 10,
            newLeads: 14,
            calls: 45,
            followups: 38,
            missed: 2,
            siteVisits: 5,
            advance: 1,
            booking: null,
            payment: null,
            reg: null,
            junk: 4
        },
        {
            id: 2,
            name: "Anjali Gupta",
            projectId: resolvedProjectId,
            projectName: "Planet Green",
            rmId: firstRmId,
            emId: 11,
            newLeads: 9,
            calls: 32,
            followups: 30,
            missed: 0,
            siteVisits: 3,
            advance: null,
            booking: null,
            payment: null,
            reg: null,
            junk: 1
        },
        {
            id: 3,
            name: "Vikram Malhotra",
            projectId: resolvedProjectId,
            projectName: "Planet Green",
            rmId: secondRmId,
            emId: 12,
            newLeads: 6,
            calls: 24,
            followups: 18,
            missed: 6,
            siteVisits: 2,
            advance: null,
            booking: 1,
            payment: 1,
            reg: null,
            junk: 2
        },
        {
            id: 4,
            name: "Sanya Verma",
            projectId: resolvedProjectId,
            projectName: "Planet Green",
            rmId: secondRmId,
            emId: 13,
            newLeads: 11,
            calls: 52,
            followups: 44,
            missed: 0,
            siteVisits: 8,
            advance: null,
            booking: null,
            payment: null,
            reg: 1,
            junk: 7
        }
    ];
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/reports/pages/DailySalesReportPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DailySalesReportPage",
    ()=>DailySalesReportPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master/api/masterApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/users/api/usersApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$components$2f$ReportFilterDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/reports/components/ReportFilterDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$getProjectStatusOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/getProjectStatusOptions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/hooks/useMasterDataLookup.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$components$2f$ReportKpiCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/reports/components/ReportKpiCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$constants$2f$dailySalesData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/reports/constants/dailySalesData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$api$2f$reportsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/reports/api/reportsApi.ts [app-client] (ecmascript)");
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
const formatDateForApi = (date)=>{
    if (!date) return "";
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
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
const DailySalesReportPage = ()=>{
    _s();
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"])();
    const { projectLeadStatuses } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"])();
    // Master Data & Users
    const { data: masterData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllMasterDataQuery"])();
    const { data: rms = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersByRoleIdQuery"])({
        role_id: 3,
        offset: 0
    });
    // Date states
    const [startDate, setStartDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "DailySalesReportPage.useState": ()=>{
            const saved = localStorage.getItem("dailySalesReportFilters");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (parsed.startDate) return new Date(parsed.startDate);
                } catch (e) {}
            }
            const d = new Date();
            d.setDate(d.getDate() - 7);
            return d;
        }
    }["DailySalesReportPage.useState"]);
    const [endDate, setEndDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "DailySalesReportPage.useState": ()=>{
            const saved = localStorage.getItem("dailySalesReportFilters");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (parsed.endDate) return new Date(parsed.endDate);
                } catch (e) {}
            }
            return new Date();
        }
    }["DailySalesReportPage.useState"]);
    // Filter States
    const [isFilterDialogOpen, setIsFilterDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [appliedFilters, setAppliedFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "DailySalesReportPage.useState": ()=>{
            const saved = localStorage.getItem("dailySalesReportFilters");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    return {
                        statusIds: parsed.statusIds || [],
                        projectIds: parsed.projectIds || [],
                        rmIds: parsed.rmIds || [],
                        emIds: parsed.emIds || []
                    };
                } catch (e) {}
            }
            return {
                statusIds: [],
                projectIds: [],
                rmIds: [],
                emIds: []
            };
        }
    }["DailySalesReportPage.useState"]);
    // Resolve dynamic IDs from master data or use fallbacks
    const resolvedProjectId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DailySalesReportPage.useMemo[resolvedProjectId]": ()=>{
            if (masterData?.projects && masterData.projects.length > 0) {
                return masterData.projects[0].id;
            }
            return 1;
        }
    }["DailySalesReportPage.useMemo[resolvedProjectId]"], [
        masterData
    ]);
    const selectedProjectId = appliedFilters.projectIds.length > 0 ? Number(appliedFilters.projectIds[0]) : resolvedProjectId;
    // Map master data for options, filtered by selected project
    const statusOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DailySalesReportPage.useMemo[statusOptions]": ()=>{
            if (projectLeadStatuses && projectLeadStatuses.length > 0) {
                const opts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$getProjectStatusOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectStatusOptions"])(selectedProjectId, projectLeadStatuses);
                if (opts && opts.length > 0) {
                    return opts.map({
                        "DailySalesReportPage.useMemo[statusOptions]": (opt)=>({
                                value: String(opt.value),
                                label: opt.label
                            })
                    }["DailySalesReportPage.useMemo[statusOptions]"]);
                }
            }
            return masterData?.lead_statuses?.map({
                "DailySalesReportPage.useMemo[statusOptions]": (s)=>({
                        value: String(s.id),
                        label: s.description
                    })
            }["DailySalesReportPage.useMemo[statusOptions]"]) || [];
        }
    }["DailySalesReportPage.useMemo[statusOptions]"], [
        masterData,
        selectedProjectId,
        projectLeadStatuses
    ]);
    const projectOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DailySalesReportPage.useMemo[projectOptions]": ()=>{
            return masterData?.projects?.map({
                "DailySalesReportPage.useMemo[projectOptions]": (p)=>({
                        value: String(p.id),
                        label: p.description
                    })
            }["DailySalesReportPage.useMemo[projectOptions]"]) || [];
        }
    }["DailySalesReportPage.useMemo[projectOptions]"], [
        masterData
    ]);
    const resolvedRms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DailySalesReportPage.useMemo[resolvedRms]": ()=>{
            return rms.map({
                "DailySalesReportPage.useMemo[resolvedRms]": (r)=>r.id
            }["DailySalesReportPage.useMemo[resolvedRms]"]);
        }
    }["DailySalesReportPage.useMemo[resolvedRms]"], [
        rms
    ]);
    // Mock data of sales executives mapped to projects, RMs, and EMs
    const initialData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DailySalesReportPage.useMemo[initialData]": ()=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$constants$2f$dailySalesData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitialDailySalesData"])(resolvedProjectId, resolvedRms);
        }
    }["DailySalesReportPage.useMemo[initialData]"], [
        resolvedProjectId,
        resolvedRms
    ]);
    const formattedStartDate = startDate ? formatDateForApi(startDate) : undefined;
    const formattedEndDate = endDate ? formatDateForApi(endDate) : undefined;
    // 1. Fetch card data
    const { data: cardResponse, refetch: refetchCard } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$api$2f$reportsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetDailySalesReportCardDataQuery"])({
        project_id: selectedProjectId,
        start_date: formattedStartDate,
        end_date: formattedEndDate
    }, {
        refetchOnMountOrArgChange: true
    });
    // 2. Fetch table data
    const { data: tableResponse, isFetching: isTableFetching, refetch: refetchTable } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$api$2f$reportsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetDailySalesReportDataQuery"])({
        project_id: selectedProjectId,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        offset: 0
    }, {
        refetchOnMountOrArgChange: true
    });
    // 3. Download mutation
    const [downloadReport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$api$2f$reportsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDownloadDailySalesReportDataMutation"])();
    // console.log("DEBUG - cardResponse:", cardResponse);
    // console.log("DEBUG - tableResponse:", tableResponse);
    const resolvedCardData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DailySalesReportPage.useMemo[resolvedCardData]": ()=>{
            if (!cardResponse) return null;
            const raw = cardResponse;
            if (raw.data && typeof raw.data === "object" && !Array.isArray(raw.data)) {
                return raw.data;
            }
            return raw;
        }
    }["DailySalesReportPage.useMemo[resolvedCardData]"], [
        cardResponse
    ]);
    const rawList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DailySalesReportPage.useMemo[rawList]": ()=>{
            if (!tableResponse) return null;
            const raw = tableResponse;
            if (Array.isArray(raw)) {
                return raw;
            }
            if (raw && Array.isArray(raw.data)) {
                return raw.data;
            }
            if (raw && raw.data && Array.isArray(raw.data.data)) {
                return raw.data.data;
            }
            return null;
        }
    }["DailySalesReportPage.useMemo[rawList]"], [
        tableResponse
    ]);
    const currentProjectStatuses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DailySalesReportPage.useMemo[currentProjectStatuses]": ()=>{
            if (!projectLeadStatuses || projectLeadStatuses.length === 0) return [];
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$getProjectStatusOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectStatusOptions"])(selectedProjectId, projectLeadStatuses);
        }
    }["DailySalesReportPage.useMemo[currentProjectStatuses]"], [
        selectedProjectId,
        projectLeadStatuses
    ]);
    const tableColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DailySalesReportPage.useMemo[tableColumns]": ()=>{
            if (rawList !== null && currentProjectStatuses.length > 0) {
                return currentProjectStatuses.map({
                    "DailySalesReportPage.useMemo[tableColumns]": (status)=>({
                            id: status.lead_status_id,
                            label: status.label,
                            key: `status_${status.lead_status_id}`
                        })
                }["DailySalesReportPage.useMemo[tableColumns]"]);
            }
            return [
                {
                    id: "newLeads",
                    label: "New Leads",
                    key: "newLeads"
                },
                {
                    id: "calls",
                    label: "Calls",
                    key: "calls"
                },
                {
                    id: "followups",
                    label: "Follow-ups",
                    key: "followups"
                },
                {
                    id: "missed",
                    label: "Missed",
                    key: "missed"
                },
                {
                    id: "siteVisits",
                    label: "Site Visits",
                    key: "siteVisits"
                },
                {
                    id: "advance",
                    label: "Advance",
                    key: "advance"
                },
                {
                    id: "booking",
                    label: "Booking",
                    key: "booking"
                },
                {
                    id: "payment",
                    label: "Payment",
                    key: "payment"
                },
                {
                    id: "reg",
                    label: "Reg.",
                    key: "reg"
                },
                {
                    id: "junk",
                    label: "Junk",
                    key: "junk"
                }
            ];
        }
    }["DailySalesReportPage.useMemo[tableColumns]"], [
        rawList,
        currentProjectStatuses
    ]);
    const visibleColumns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DailySalesReportPage.useMemo[visibleColumns]": ()=>{
            if (!appliedFilters.statusIds || appliedFilters.statusIds.length === 0) {
                return tableColumns;
            }
            return tableColumns.filter({
                "DailySalesReportPage.useMemo[visibleColumns]": (col)=>{
                    if (typeof col.id === "number") {
                        return appliedFilters.statusIds.includes(String(col.id));
                    }
                    return appliedFilters.statusIds.some({
                        "DailySalesReportPage.useMemo[visibleColumns]": (statusId)=>{
                            const option = statusOptions.find({
                                "DailySalesReportPage.useMemo[visibleColumns].option": (opt)=>opt.value === statusId
                            }["DailySalesReportPage.useMemo[visibleColumns].option"]);
                            if (!option) return false;
                            const colKeyLower = col.key.toLowerCase();
                            const optLabelLower = option.label.toLowerCase();
                            return colKeyLower.includes(optLabelLower) || optLabelLower.includes(colKeyLower) || colKeyLower === "newleads" && optLabelLower.includes("new") || colKeyLower === "followups" && optLabelLower.includes("follow") || colKeyLower === "sitevisits" && optLabelLower.includes("visit") || colKeyLower === "missed" && optLabelLower.includes("no resp") || colKeyLower === "missed" && optLabelLower.includes("missed");
                        }
                    }["DailySalesReportPage.useMemo[visibleColumns]"]);
                }
            }["DailySalesReportPage.useMemo[visibleColumns]"]);
        }
    }["DailySalesReportPage.useMemo[visibleColumns]"], [
        tableColumns,
        appliedFilters.statusIds,
        statusOptions
    ]);
    const apiExecutiveRows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DailySalesReportPage.useMemo[apiExecutiveRows]": ()=>{
            if (!rawList) return [];
            return rawList.map({
                "DailySalesReportPage.useMemo[apiExecutiveRows]": (item, index)=>{
                    const row = {
                        id: index + 1,
                        name: item.ex_name || "Unknown",
                        projectId: ({
                            "DailySalesReportPage.useMemo[apiExecutiveRows]": ()=>{
                                const proj = masterData?.projects?.find({
                                    "DailySalesReportPage.useMemo[apiExecutiveRows]": (p)=>p.description.trim().toLowerCase() === item.project_name?.trim().toLowerCase()
                                }["DailySalesReportPage.useMemo[apiExecutiveRows]"]);
                                return proj ? proj.id : selectedProjectId;
                            }
                        })["DailySalesReportPage.useMemo[apiExecutiveRows]"](),
                        projectName: item.project_name || "",
                        rmId: 1,
                        emId: 1,
                        newLeads: 0,
                        calls: 0,
                        followups: 0,
                        missed: 0,
                        siteVisits: 0,
                        advance: null,
                        booking: null,
                        payment: null,
                        reg: null,
                        junk: 0
                    };
                    // Populate dynamic status counts
                    currentProjectStatuses.forEach({
                        "DailySalesReportPage.useMemo[apiExecutiveRows]": (statusOption)=>{
                            const key = `status_${statusOption.lead_status_id}`;
                            let count = 0;
                            if (item.status_data) {
                                const match = item.status_data.find({
                                    "DailySalesReportPage.useMemo[apiExecutiveRows].match": (statusObj)=>{
                                        const matchId = Number(statusObj.id) === Number(statusOption.lead_status_id);
                                        const matchName = (statusObj.name || "").trim().toLowerCase() === (statusOption.label || "").trim().toLowerCase();
                                        return matchId || matchName;
                                    }
                                }["DailySalesReportPage.useMemo[apiExecutiveRows].match"]);
                                count = match ? Number(match.count || 0) : 0;
                            }
                            row[key] = count;
                        }
                    }["DailySalesReportPage.useMemo[apiExecutiveRows]"]);
                    if (item.status_data) {
                        item.status_data.forEach({
                            "DailySalesReportPage.useMemo[apiExecutiveRows]": (statusObj)=>{
                                const name = (statusObj.name || "").toLowerCase();
                                const count = Number(statusObj.count || 0);
                                if (name.includes("new")) {
                                    row.newLeads += count;
                                } else if (name.includes("call") || name.includes("contact")) {
                                    row.calls += count;
                                } else if (name.includes("follow")) {
                                    row.followups += count;
                                } else if (name.includes("missed") || name.includes("no response")) {
                                    row.missed += count;
                                } else if (name.includes("visit")) {
                                    row.siteVisits += count;
                                } else if (name.includes("advance") || name.includes("negotiat")) {
                                    row.advance = (row.advance || 0) + count;
                                } else if (name.includes("book")) {
                                    row.booking = (row.booking || 0) + count;
                                } else if (name.includes("payment") || name.includes("won")) {
                                    row.payment = (row.payment || 0) + count;
                                } else if (name.includes("reg") || name.includes("win")) {
                                    row.reg = (row.reg || 0) + count;
                                } else if (name.includes("junk") || name.includes("lost") || name.includes("spam")) {
                                    row.junk += count;
                                }
                            }
                        }["DailySalesReportPage.useMemo[apiExecutiveRows]"]);
                    }
                    return row;
                }
            }["DailySalesReportPage.useMemo[apiExecutiveRows]"]);
        }
    }["DailySalesReportPage.useMemo[apiExecutiveRows]"], [
        rawList,
        selectedProjectId,
        masterData,
        currentProjectStatuses
    ]);
    // Use API data if available, otherwise fallback to initialData (scaled by dates)
    const baseData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DailySalesReportPage.useMemo[baseData]": ()=>{
            if (rawList !== null) {
                return apiExecutiveRows;
            }
            return initialData;
        }
    }["DailySalesReportPage.useMemo[baseData]"], [
        rawList,
        apiExecutiveRows,
        initialData
    ]);
    // Filtered rows based on selected filter dialog filters
    const filteredData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DailySalesReportPage.useMemo[filteredData]": ()=>{
            const isMock = rawList === null;
            let processed = baseData;
            if (isMock) {
                const daysCount = startDate && endDate ? Math.max(1, Math.ceil(Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1) : 7;
                const scale = daysCount / 7;
                processed = processed.map({
                    "DailySalesReportPage.useMemo[filteredData]": (row)=>{
                        const scaleVal = {
                            "DailySalesReportPage.useMemo[filteredData].scaleVal": (val)=>{
                                if (val === null) return null;
                                const scaled = Math.round(val * scale);
                                return scaled === 0 && val > 0 ? 1 : scaled;
                            }
                        }["DailySalesReportPage.useMemo[filteredData].scaleVal"];
                        return {
                            ...row,
                            newLeads: scaleVal(row.newLeads) ?? 0,
                            calls: scaleVal(row.calls) ?? 0,
                            followups: scaleVal(row.followups) ?? 0,
                            missed: scaleVal(row.missed) ?? 0,
                            siteVisits: scaleVal(row.siteVisits) ?? 0,
                            advance: scaleVal(row.advance),
                            booking: scaleVal(row.booking),
                            payment: scaleVal(row.payment),
                            reg: scaleVal(row.reg),
                            junk: scaleVal(row.junk) ?? 0
                        };
                    }
                }["DailySalesReportPage.useMemo[filteredData]"]);
            }
            return processed.filter({
                "DailySalesReportPage.useMemo[filteredData]": (row)=>{
                    // Filter by Project
                    if (appliedFilters.projectIds.length > 0 && !appliedFilters.projectIds.includes(String(row.projectId))) {
                        return false;
                    }
                    // Filter by RM
                    if (appliedFilters.rmIds.length > 0 && !appliedFilters.rmIds.includes(String(row.rmId))) {
                        return false;
                    }
                    // Filter by EM
                    if (appliedFilters.emIds.length > 0 && !appliedFilters.emIds.includes(String(row.emId))) {
                        return false;
                    }
                    // Filter by Lead Status
                    if (appliedFilters.statusIds.length > 0) {
                        if (!isMock && currentProjectStatuses.length > 0) {
                            const matchesStatus = appliedFilters.statusIds.some({
                                "DailySalesReportPage.useMemo[filteredData].matchesStatus": (statusId)=>{
                                    const key = `status_${statusId}`;
                                    return Number(row[key] || 0) > 0;
                                }
                            }["DailySalesReportPage.useMemo[filteredData].matchesStatus"]);
                            if (!matchesStatus) return false;
                        } else {
                            const matchesStatus = appliedFilters.statusIds.some({
                                "DailySalesReportPage.useMemo[filteredData].matchesStatus": (statusId)=>{
                                    const status = statusOptions.find({
                                        "DailySalesReportPage.useMemo[filteredData].matchesStatus.status": (opt)=>opt.value === statusId
                                    }["DailySalesReportPage.useMemo[filteredData].matchesStatus.status"]);
                                    if (!status) return false;
                                    const label = status.label.toLowerCase();
                                    if (label.includes("new") && row.newLeads > 0) return true;
                                    if ((label.includes("call") || label.includes("contact")) && row.calls > 0) return true;
                                    if (label.includes("follow") && row.followups > 0) return true;
                                    if ((label.includes("missed") || label.includes("no response")) && row.missed > 0) return true;
                                    if (label.includes("visit") && row.siteVisits > 0) return true;
                                    if ((label.includes("advance") || label.includes("negotiat")) && row.advance && row.advance > 0) return true;
                                    if (label.includes("book") && row.booking && row.booking > 0) return true;
                                    if ((label.includes("payment") || label.includes("won")) && row.payment && row.payment > 0) return true;
                                    if ((label.includes("reg") || label.includes("win")) && row.reg && row.reg > 0) return true;
                                    if ((label.includes("junk") || label.includes("lost") || label.includes("spam")) && row.junk > 0) return true;
                                    return false;
                                }
                            }["DailySalesReportPage.useMemo[filteredData].matchesStatus"]);
                            if (!matchesStatus) {
                                return false;
                            }
                        }
                    }
                    return true;
                }
            }["DailySalesReportPage.useMemo[filteredData]"]);
        }
    }["DailySalesReportPage.useMemo[filteredData]"], [
        baseData,
        appliedFilters,
        startDate,
        endDate,
        statusOptions,
        tableResponse,
        currentProjectStatuses
    ]);
    // Table Totals calculation
    const totals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DailySalesReportPage.useMemo[totals]": ()=>{
            const initialTotals = {};
            tableColumns.forEach({
                "DailySalesReportPage.useMemo[totals]": (col)=>{
                    initialTotals[col.key] = 0;
                }
            }["DailySalesReportPage.useMemo[totals]"]);
            return filteredData.reduce({
                "DailySalesReportPage.useMemo[totals]": (acc, curr)=>{
                    tableColumns.forEach({
                        "DailySalesReportPage.useMemo[totals]": (col)=>{
                            acc[col.key] += curr[col.key] || 0;
                        }
                    }["DailySalesReportPage.useMemo[totals]"]);
                    return acc;
                }
            }["DailySalesReportPage.useMemo[totals]"], initialTotals);
        }
    }["DailySalesReportPage.useMemo[totals]"], [
        filteredData,
        tableColumns
    ]);
    const handleApplyFilters = (filters)=>{
        setAppliedFilters(filters);
    };
    const handleResetFilters = ()=>{
        setAppliedFilters({
            statusIds: [],
            projectIds: [],
            rmIds: [],
            emIds: []
        });
    };
    const handleDownload = async ()=>{
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].loading("Compiling daily sales report...", {
                id: "download-report"
            });
            const res = await downloadReport({
                project_id: selectedProjectId,
                start_date: formattedStartDate,
                end_date: formattedEndDate
            }).unwrap();
            if (res.file_url) {
                const link = document.createElement("a");
                link.href = res.file_url;
                link.setAttribute("download", `daily_sales_report_${formattedStartDate}_to_${formattedEndDate}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Download completed", {
                    id: "download-report",
                    description: "The Daily Sales Report CSV was downloaded successfully."
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Download failed", {
                    id: "download-report",
                    description: res.message || "Failed to retrieve the download link."
                });
            }
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Download failed", {
                id: "download-report",
                description: err?.data?.message || err?.message || "An unexpected error occurred."
            });
        }
    };
    const formatNumber = (val, isMissed = false)=>{
        if (val === null) return "—";
        if (val === 0) {
            return isMissed ? "00" : "—";
        }
        return val < 10 ? `0${val}` : String(val);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full mx-auto space-y-6 xl:space-y-8 2xl:space-y-10 px-4 sm:px-6 md:px-8 lg:px-10 py-6 animate-in fade-in duration-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 xl:gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>navigate("/reports"),
                        className: "p-2 -ml-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors duration-200",
                        title: "Back to Reports",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            className: "w-7 h-7 xl:w-8 xl:h-8 text-[#0f3d6b] dark:text-blue-400"
                        }, void 0, false, {
                            fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                            lineNumber: 524,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                        lineNumber: 519,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-[24px] font-bold text-[#00236F] dark:text-blue-400 tracking-tight",
                        children: "Daily Sales Report"
                    }, void 0, false, {
                        fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                        lineNumber: 526,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                lineNumber: 518,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 md:grid-cols-3 xl:gap-8 2xl:gap-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$components$2f$ReportKpiCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportKpiCard"], {
                        title: "Avg. User Engagement Time",
                        value: (()=>{
                            if (!resolvedCardData) return "1.2 Days";
                            const val = resolvedCardData.avg_user_engagement_time_in_mins !== undefined ? resolvedCardData.avg_user_engagement_time_in_mins : resolvedCardData.avg_user_engagement_time || resolvedCardData.avgUserEngagementTime;
                            if (val === null || val === undefined || String(val).trim() === "" || String(val) === "null") {
                                return "0";
                            }
                            return `${val}`;
                        })()
                    }, void 0, false, {
                        fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                        lineNumber: 533,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$components$2f$ReportKpiCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportKpiCard"], {
                        title: "Avg. Days to Site Visit Completion",
                        value: (()=>{
                            if (!resolvedCardData) return "6 Days";
                            const val = resolvedCardData.avg_days_to_site_visit_completion_in_days !== undefined ? resolvedCardData.avg_days_to_site_visit_completion_in_days : resolvedCardData.avg_site_visit_completion_days || resolvedCardData.avgDaysToSiteVisitCompletion;
                            if (val === null || val === undefined || String(val).trim() === "" || String(val) === "null") {
                                return "0";
                            }
                            return `${val}`;
                        })()
                    }, void 0, false, {
                        fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                        lineNumber: 548,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$components$2f$ReportKpiCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportKpiCard"], {
                        title: "Follow-up Efficiency",
                        value: (()=>{
                            if (!resolvedCardData) return "94.2%";
                            const val = resolvedCardData.follow_efficiency !== undefined ? resolvedCardData.follow_efficiency : resolvedCardData.followup_efficiency || resolvedCardData.followupEfficiency;
                            if (val === null || val === undefined || String(val).trim() === "" || String(val) === "null") {
                                return "0";
                            }
                            return `${val}`;
                        })()
                    }, void 0, false, {
                        fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                        lineNumber: 563,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                lineNumber: 532,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-3xl 2xl:rounded-[36px] shadow-sm overflow-hidden flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800/50 p-6 xl:p-8 2xl:p-10 pb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-['Plus_Jakarta_Sans'] font-semibold text-[18px] leading-[24px] text-[#191C1E] dark:text-zinc-150 flex items-center h-[24px] tracking-tight",
                                        children: "Booking Pipeline Progress"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                        lineNumber: 585,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs font-semibold text-slate-400 dark:text-zinc-500",
                                        children: [
                                            startDate && endDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Showing data for ",
                                                    formatSelectedSpan(startDate, endDate)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                lineNumber: 590,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            appliedFilters.statusIds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-zinc-300 dark:text-zinc-700",
                                                        children: "|"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                        lineNumber: 596,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Status: ",
                                                            appliedFilters.statusIds.map((id)=>statusOptions.find((opt)=>opt.value === id)?.label).filter(Boolean).join(", ")
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                        lineNumber: 597,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                lineNumber: 595,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            appliedFilters.projectIds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-zinc-300 dark:text-zinc-700",
                                                        children: "|"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                        lineNumber: 609,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Projects: ",
                                                            appliedFilters.projectIds.map((id)=>projectOptions.find((opt)=>opt.value === id)?.label).filter(Boolean).join(", ")
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                        lineNumber: 610,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                lineNumber: 608,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                        lineNumber: 588,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                lineNumber: 584,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsFilterDialogOpen(true),
                                        className: "flex items-center justify-center gap-2 border border-[rgba(0,51,102,0.24)] bg-white dark:bg-zinc-900 px-[24px] py-[10px] h-[36px] rounded-[24px] font-['Inter'] font-semibold text-[14px] leading-[20px] text-[#003366] dark:text-blue-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-200 shadow-sm cursor-pointer relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                lineNumber: 629,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Filter",
                                            appliedFilters.projectIds.length + appliedFilters.statusIds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center justify-center min-w-[18px] h-4.5 px-1 text-[9px] font-bold bg-[#003366] dark:bg-blue-500 text-white rounded-full",
                                                children: appliedFilters.projectIds.length + appliedFilters.statusIds.length
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                lineNumber: 632,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                        lineNumber: 625,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleDownload,
                                        className: "flex items-center justify-center gap-2 bg-[#0f3d6b] hover:bg-[#0c3156] text-white w-[185px] h-[36px] rounded-full text-sm font-semibold transition-colors duration-200 shadow-sm cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                className: "w-[14px] h-[14px]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                lineNumber: 643,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Download Report"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                        lineNumber: 639,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                lineNumber: 623,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                        lineNumber: 583,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto max-h-[550px] overflow-y-auto relative",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full border-collapse text-left min-w-[1100px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "sticky top-0 bg-[#f8fafc] dark:bg-[#18181b] z-20 shadow-[0_2px_5px_rgba(0,0,0,0.02)]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-4 xl:py-5 pl-6 xl:pl-8 2xl:pl-10 pr-3 text-[13px] leading-[18px] font-bold tracking-[0.13px] text-[#444651] dark:text-zinc-300 bg-[#f8fafc] dark:bg-[#18181b] whitespace-nowrap",
                                                children: "Executive"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                lineNumber: 654,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-4 xl:py-5 px-3 text-[13px] leading-[18px] font-bold tracking-[0.13px] text-[#444651] dark:text-zinc-300 bg-[#f8fafc] dark:bg-[#18181b] whitespace-nowrap",
                                                children: "Project"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                lineNumber: 657,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            visibleColumns.map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "py-4 xl:py-5 px-3 text-[13px] leading-[18px] font-bold tracking-[0.13px] text-[#444651] dark:text-zinc-300 text-center bg-[#f8fafc] dark:bg-[#18181b] whitespace-nowrap",
                                                    children: col.label
                                                }, col.key, false, {
                                                    fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                    lineNumber: 661,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                        lineNumber: 653,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                    lineNumber: 652,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: [
                                        isTableFetching ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                colSpan: 2 + visibleColumns.length,
                                                className: "py-8 text-center text-sm text-slate-450 dark:text-zinc-500 italic",
                                                children: "Loading daily sales report data..."
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                lineNumber: 674,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                            lineNumber: 673,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)) : filteredData.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                colSpan: 2 + visibleColumns.length,
                                                className: "py-8 text-center text-sm text-slate-400 dark:text-zinc-500 italic",
                                                children: "No records matches applied filters"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                lineNumber: 680,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                            lineNumber: 679,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)) : filteredData.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors duration-150",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "py-5 xl:py-6 pl-6 xl:pl-8 2xl:pl-10 pr-3 font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] text-[#191C1E] dark:text-zinc-150 whitespace-nowrap",
                                                        children: row.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                        lineNumber: 690,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "py-5 xl:py-6 px-3 font-['Inter'] font-semibold text-[14px] leading-[20px] text-[#444651] dark:text-zinc-300",
                                                        children: row.projectName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                        lineNumber: 693,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    visibleColumns.map((col)=>{
                                                        const val = row[col.key];
                                                        const colLabel = (col.label || "").toLowerCase();
                                                        const isNewLeads = col.key === "newLeads" || col.key.includes("new") || colLabel.includes("new");
                                                        const isMissed = col.key === "missed" || col.key.toLowerCase().includes("missed") || colLabel.includes("missed") || colLabel.includes("no response");
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("py-5 xl:py-6 px-3 text-center font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px]", isNewLeads && !isMissed ? "text-[#00236F] dark:text-blue-400" : "text-[#191C1E] dark:text-zinc-150", isMissed && val > 0 ? "text-red-500 font-bold" : ""),
                                                            children: formatNumber(val, isMissed)
                                                        }, col.key, false, {
                                                            fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                            lineNumber: 702,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0));
                                                    })
                                                ]
                                            }, row.id, true, {
                                                fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                lineNumber: 686,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))),
                                        filteredData.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "sticky bottom-0 bg-[#f8fafc] dark:bg-[#18181b] font-bold shadow-[0_-4px_10px_rgba(0,0,0,0.08)] border-t border-zinc-200 dark:border-zinc-800 z-10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-5 xl:py-6 pl-6 xl:pl-8 2xl:pl-10 pr-3 font-['Plus_Jakarta_Sans'] font-extrabold text-[14px] leading-[20px] text-[#191C1E] dark:text-zinc-150 bg-[#f8fafc] dark:bg-[#18181b]",
                                                    children: "TOTAL SUMMARY"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                    lineNumber: 723,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "py-5 xl:py-6 px-3 font-['Inter'] font-semibold text-[14px] leading-[20px] text-slate-400 dark:text-zinc-500 bg-[#f8fafc] dark:bg-[#18181b]",
                                                    children: "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                    lineNumber: 726,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                visibleColumns.map((col)=>{
                                                    const totalVal = totals[col.key];
                                                    const colLabel = (col.label || "").toLowerCase();
                                                    const isNewLeads = col.key === "newLeads" || col.key.includes("new") || colLabel.includes("new");
                                                    const isMissed = col.key === "missed" || col.key.toLowerCase().includes("missed") || colLabel.includes("missed") || colLabel.includes("no response");
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("py-5 xl:py-6 px-3 text-center font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[20px] bg-[#f8fafc] dark:bg-[#18181b]", isNewLeads && !isMissed ? "text-[#00236F] dark:text-blue-400" : "text-[#191C1E] dark:text-zinc-150", isMissed && totalVal > 0 ? "text-red-500" : ""),
                                                        children: formatNumber(totalVal, isMissed)
                                                    }, col.key, false, {
                                                        fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                                        lineNumber: 735,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0));
                                                })
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                            lineNumber: 722,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                                    lineNumber: 671,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                            lineNumber: 651,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                        lineNumber: 650,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                lineNumber: 581,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$components$2f$ReportFilterDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportFilterDialog"], {
                open: isFilterDialogOpen,
                onClose: ()=>setIsFilterDialogOpen(false),
                tabs: [
                    "projects",
                    "status",
                    "date"
                ],
                onApply: (filters)=>{
                    const newFilters = {
                        projectIds: filters.projectIds || [],
                        statusIds: filters.statusIds || [],
                        rmIds: [],
                        emIds: [],
                        startDate: filters.startDate ? filters.startDate.toISOString() : null,
                        endDate: filters.endDate ? filters.endDate.toISOString() : null
                    };
                    localStorage.setItem("dailySalesReportFilters", JSON.stringify(newFilters));
                    setAppliedFilters((prev)=>({
                            ...prev,
                            projectIds: filters.projectIds || [],
                            statusIds: filters.statusIds || []
                        }));
                    setStartDate(filters.startDate);
                    setEndDate(filters.endDate);
                    // Force refetch to ensure API calls are made and display in network tab
                    setTimeout(()=>{
                        refetchCard();
                        refetchTable();
                    }, 0);
                },
                onReset: ()=>{
                    localStorage.removeItem("dailySalesReportFilters");
                    setAppliedFilters({
                        statusIds: [],
                        projectIds: [],
                        rmIds: [],
                        emIds: []
                    });
                    const today = new Date();
                    const start = new Date();
                    start.setDate(today.getDate() - 7);
                    setStartDate(start);
                    setEndDate(today);
                },
                projectOptions: projectOptions,
                statusOptions: statusOptions,
                appliedProjectIds: appliedFilters.projectIds,
                appliedStatusIds: appliedFilters.statusIds,
                appliedStartDate: startDate,
                appliedEndDate: endDate
            }, void 0, false, {
                fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
                lineNumber: 757,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/reports/pages/DailySalesReportPage.tsx",
        lineNumber: 516,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(DailySalesReportPage, "HpsQ0UunlzMk2fSoKxxouw8Xaio=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllMasterDataQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersByRoleIdQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$api$2f$reportsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetDailySalesReportCardDataQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$api$2f$reportsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetDailySalesReportDataQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$api$2f$reportsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDownloadDailySalesReportDataMutation"]
    ];
});
_c = DailySalesReportPage;
var _c;
__turbopack_context__.k.register(_c, "DailySalesReportPage");
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
var _s = __turbopack_context__.k.signature();
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
    const rms = liveRms;
    const ems = liveEms;
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
            }["useMasterDataLookup.useCallback[getStatusLabel]"])?.description || `ID: ${id}`;
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
            }["useMasterDataLookup.useCallback[getProjectLabel]"])?.description || `ID: ${id}`;
        }
    }["useMasterDataLookup.useCallback[getProjectLabel]"], [
        masterData
    ]);
    const getSourceLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useMasterDataLookup.useCallback[getSourceLabel]": (id)=>{
            if (!id) return '--';
            return masterData?.sources.find({
                "useMasterDataLookup.useCallback[getSourceLabel]": (s)=>s.id === id
            }["useMasterDataLookup.useCallback[getSourceLabel]"])?.description || `ID: ${id}`;
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
            }["useMasterDataLookup.useCallback[getBranchLabel]"])?.description || `ID: ${id}`;
        }
    }["useMasterDataLookup.useCallback[getBranchLabel]"], [
        masterData
    ]);
    const getSpecialisationLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useMasterDataLookup.useCallback[getSpecialisationLabel]": (id)=>{
            if (!id) return '--';
            return masterData?.specialisations?.find({
                "useMasterDataLookup.useCallback[getSpecialisationLabel]": (s)=>s.id === id
            }["useMasterDataLookup.useCallback[getSpecialisationLabel]"])?.description || `ID: ${id}`;
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

//# sourceMappingURL=src_1mro9f7._.js.map