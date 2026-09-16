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
"[project]/src/features/reports/pages/CampaignPerformancePage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CampaignPerformancePage",
    ()=>CampaignPerformancePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js [app-client] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$click$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointerClick$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mouse-pointer-click.js [app-client] (ecmascript) <export default as MousePointerClick>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/badge-check.js [app-client] (ecmascript) <export default as BadgeCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master/api/masterApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/users/api/usersApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$components$2f$ReportFilterDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/reports/components/ReportFilterDialog.tsx [app-client] (ecmascript)");
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
const CampaignPerformancePage = ()=>{
    _s();
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"])();
    // Master Data & Users
    const { data: masterData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllMasterDataQuery"])();
    const { data: rms = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersByRoleIdQuery"])({
        role_id: 3,
        offset: 0
    });
    // Filter States
    const [isFilterDialogOpen, setIsFilterDialogOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [appliedFilters, setAppliedFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        projectIds: [],
        campaignIds: [],
        adSetIds: [],
        creativeIds: []
    });
    const [filterProjectId, setFilterProjectId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Hierarchy expand/collapse states
    const [expandedCampaigns, setExpandedCampaigns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "camp-1": true
    });
    const [expandedAdSets, setExpandedAdSets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "adset-1-1": true
    });
    // Options mapping
    const statusOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CampaignPerformancePage.useMemo[statusOptions]": ()=>{
            return masterData?.lead_statuses?.map({
                "CampaignPerformancePage.useMemo[statusOptions]": (s)=>({
                        value: String(s.id),
                        label: s.description
                    })
            }["CampaignPerformancePage.useMemo[statusOptions]"]) || [];
        }
    }["CampaignPerformancePage.useMemo[statusOptions]"], [
        masterData
    ]);
    const projectOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CampaignPerformancePage.useMemo[projectOptions]": ()=>{
            return masterData?.projects?.map({
                "CampaignPerformancePage.useMemo[projectOptions]": (p)=>({
                        value: String(p.id),
                        label: p.description
                    })
            }["CampaignPerformancePage.useMemo[projectOptions]"]) || [];
        }
    }["CampaignPerformancePage.useMemo[projectOptions]"], [
        masterData
    ]);
    // API Query Params
    const campaignQueryParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CampaignPerformancePage.useMemo[campaignQueryParams]": ()=>{
            const activeProjectIdStr = filterProjectId || appliedFilters.projectIds[0];
            if (activeProjectIdStr) {
                return {
                    project_id: [
                        parseInt(activeProjectIdStr, 10)
                    ].filter({
                        "CampaignPerformancePage.useMemo[campaignQueryParams]": (id)=>!isNaN(id)
                    }["CampaignPerformancePage.useMemo[campaignQueryParams]"])
                };
            }
            // Default to passing all project IDs if none selected, to fetch all campaigns for options
            const allIds = masterData?.projects?.map({
                "CampaignPerformancePage.useMemo[campaignQueryParams]": (p)=>p.id
            }["CampaignPerformancePage.useMemo[campaignQueryParams]"]) || [
                1
            ];
            return {
                project_id: allIds
            };
        }
    }["CampaignPerformancePage.useMemo[campaignQueryParams]"], [
        filterProjectId,
        appliedFilters.projectIds,
        masterData?.projects
    ]);
    const { data: allCampaignsResponse } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$api$2f$reportsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllCampaignsDataQuery"])(campaignQueryParams);
    const campaignOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CampaignPerformancePage.useMemo[campaignOptions]": ()=>{
            if (!allCampaignsResponse?.data) return [];
            const activeList = allCampaignsResponse.data.active || [];
            const completedList = allCampaignsResponse.data.completed || [];
            const combined = [
                ...activeList,
                ...completedList
            ];
            const seen = new Set();
            const list = [];
            combined.forEach({
                "CampaignPerformancePage.useMemo[campaignOptions]": (c)=>{
                    if (!seen.has(c.campaign_id)) {
                        seen.add(c.campaign_id);
                        list.push({
                            value: String(c.campaign_id),
                            label: c.campaign_name
                        });
                    }
                }
            }["CampaignPerformancePage.useMemo[campaignOptions]"]);
            return list;
        }
    }["CampaignPerformancePage.useMemo[campaignOptions]"], [
        allCampaignsResponse
    ]);
    const queryParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CampaignPerformancePage.useMemo[queryParams]": ()=>{
            return {
                project_id: appliedFilters.projectIds.length > 0 ? parseInt(appliedFilters.projectIds[0], 10) : null,
                campaign_id: appliedFilters.campaignIds.length > 0 ? parseInt(appliedFilters.campaignIds[0], 10) : null
            };
        }
    }["CampaignPerformancePage.useMemo[queryParams]"], [
        appliedFilters.projectIds,
        appliedFilters.campaignIds
    ]);
    const filterHierarchyParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CampaignPerformancePage.useMemo[filterHierarchyParams]": ()=>{
            const activeProjectIdStr = filterProjectId || appliedFilters.projectIds[0];
            const projectId = activeProjectIdStr ? parseInt(activeProjectIdStr, 10) : masterData?.projects?.[0]?.id ? parseInt(String(masterData.projects[0].id), 10) : 2;
            return {
                project_id: projectId,
                campaign_id: null
            };
        }
    }["CampaignPerformancePage.useMemo[filterHierarchyParams]"], [
        filterProjectId,
        appliedFilters.projectIds,
        masterData?.projects
    ]);
    const { data: filterHierarchyResponse } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$api$2f$reportsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAdsPerformanceToBookingDataQuery"])(filterHierarchyParams);
    const activeCampaignIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CampaignPerformancePage.useMemo[activeCampaignIds]": ()=>{
            if (!allCampaignsResponse?.data?.active) return [];
            return allCampaignsResponse.data.active.map({
                "CampaignPerformancePage.useMemo[activeCampaignIds]": (c)=>c.campaign_id
            }["CampaignPerformancePage.useMemo[activeCampaignIds]"]);
        }
    }["CampaignPerformancePage.useMemo[activeCampaignIds]"], [
        allCampaignsResponse
    ]);
    const completedCampaignIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CampaignPerformancePage.useMemo[completedCampaignIds]": ()=>{
            if (!allCampaignsResponse?.data?.completed) return [];
            return allCampaignsResponse.data.completed.map({
                "CampaignPerformancePage.useMemo[completedCampaignIds]": (c)=>c.campaign_id
            }["CampaignPerformancePage.useMemo[completedCampaignIds]"]);
        }
    }["CampaignPerformancePage.useMemo[completedCampaignIds]"], [
        allCampaignsResponse
    ]);
    const filterHierarchicalCampaigns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CampaignPerformancePage.useMemo[filterHierarchicalCampaigns]": ()=>{
            const list = filterHierarchyResponse?.data || [];
            const active = [];
            const completed = [];
            list.forEach({
                "CampaignPerformancePage.useMemo[filterHierarchicalCampaigns]": (camp)=>{
                    const campIdStr = String(camp.campaign_id);
                    const campObj = {
                        id: campIdStr,
                        name: camp.campaign_name,
                        adSets: (camp.ad_set || []).map({
                            "CampaignPerformancePage.useMemo[filterHierarchicalCampaigns]": (adSet)=>({
                                    id: String(adSet.ad_set_id),
                                    name: adSet.ad_set_name,
                                    creatives: (adSet.creatives || []).map({
                                        "CampaignPerformancePage.useMemo[filterHierarchicalCampaigns]": (cr)=>({
                                                id: String(cr.creative_id),
                                                name: cr.creative_name
                                            })
                                    }["CampaignPerformancePage.useMemo[filterHierarchicalCampaigns]"])
                                })
                        }["CampaignPerformancePage.useMemo[filterHierarchicalCampaigns]"])
                    };
                    if (completedCampaignIds.includes(camp.campaign_id)) {
                        completed.push(campObj);
                    } else {
                        active.push(campObj);
                    }
                }
            }["CampaignPerformancePage.useMemo[filterHierarchicalCampaigns]"]);
            return {
                active,
                completed
            };
        }
    }["CampaignPerformancePage.useMemo[filterHierarchicalCampaigns]"], [
        filterHierarchyResponse,
        activeCampaignIds,
        completedCampaignIds
    ]);
    const { data: funnelResponse } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$api$2f$reportsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetCampaignsFunnelDataQuery"])(queryParams);
    const { data: tableResponse } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$api$2f$reportsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAdsPerformanceToBookingDataQuery"])(queryParams);
    const [downloadReport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$api$2f$reportsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDownloadCampaignPerformanceDataMutation"])();
    const formatMetric = (val, defaultValue)=>{
        if (val === undefined || val === null || val === '') return defaultValue;
        return String(val);
    };
    const parsePct = (val)=>{
        if (val === undefined || val === null) return 0;
        if (typeof val === 'number') return val;
        return parseFloat(String(val).replace('%', '')) || 0;
    };
    const parseNum = (val)=>{
        if (val === undefined || val === null) return 0;
        if (typeof val === 'number') return val;
        return parseInt(String(val).replace(/\D/g, ''), 10) || 0;
    };
    const mappedCampaigns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CampaignPerformancePage.useMemo[mappedCampaigns]": ()=>{
            if (!tableResponse?.data) return [];
            return tableResponse.data.map({
                "CampaignPerformancePage.useMemo[mappedCampaigns]": (camp)=>{
                    const adSets = (camp.ad_set || []).map({
                        "CampaignPerformancePage.useMemo[mappedCampaigns].adSets": (adSet)=>{
                            const creatives = (adSet.creatives || []).map({
                                "CampaignPerformancePage.useMemo[mappedCampaigns].adSets.creatives": (cr)=>({
                                        id: String(cr.creative_id),
                                        name: cr.creative_name,
                                        leads: parseNum(cr.leads),
                                        cpl: parseNum(cr.cpl),
                                        siteVisitRate: parsePct(cr.site_visit),
                                        conversionRate: parsePct(cr.conversion_rate),
                                        junkRate: parsePct(cr.junk_rate)
                                    })
                            }["CampaignPerformancePage.useMemo[mappedCampaigns].adSets.creatives"]);
                            return {
                                id: String(adSet.ad_set_id),
                                name: adSet.ad_set_name,
                                leads: parseNum(adSet.leads),
                                cpl: parseNum(adSet.cpl),
                                siteVisitRate: parsePct(adSet.site_visit),
                                conversionRate: parsePct(adSet.conversion_rate),
                                junkRate: parsePct(adSet.junk_rate),
                                creatives
                            };
                        }
                    }["CampaignPerformancePage.useMemo[mappedCampaigns].adSets"]);
                    return {
                        id: String(camp.campaign_id),
                        name: camp.campaign_name,
                        projectId: queryParams.project_id || 1,
                        rmId: 1,
                        leads: parseNum(camp.leads),
                        cpl: parseNum(camp.cpl),
                        siteVisitRate: parsePct(camp.site_visit),
                        conversionRate: parsePct(camp.conversion_rate),
                        junkRate: parsePct(camp.junk_rate),
                        adSets
                    };
                }
            }["CampaignPerformancePage.useMemo[mappedCampaigns]"]);
        }
    }["CampaignPerformancePage.useMemo[mappedCampaigns]"], [
        tableResponse,
        queryParams.project_id
    ]);
    // Dynamically expand the first campaign and ad set when data arrives
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useEffect({
        "CampaignPerformancePage.useEffect": ()=>{
            if (mappedCampaigns.length > 0) {
                const firstCampId = mappedCampaigns[0].id;
                const firstAdSetId = mappedCampaigns[0].adSets?.[0]?.id;
                setExpandedCampaigns({
                    "CampaignPerformancePage.useEffect": (prev)=>{
                        const keys = Object.keys(prev);
                        if (keys.length === 0 || keys.includes("camp-1")) {
                            return {
                                [firstCampId]: true
                            };
                        }
                        return prev;
                    }
                }["CampaignPerformancePage.useEffect"]);
                if (firstAdSetId) {
                    setExpandedAdSets({
                        "CampaignPerformancePage.useEffect": (prev)=>{
                            const keys = Object.keys(prev);
                            if (keys.length === 0 || keys.includes("adset-1-1")) {
                                return {
                                    [firstAdSetId]: true
                                };
                            }
                            return prev;
                        }
                    }["CampaignPerformancePage.useEffect"]);
                }
            }
        }
    }["CampaignPerformancePage.useEffect"], [
        mappedCampaigns
    ]);
    // Filter campaigns client-side to allow sub-filtering of ad sets / creatives
    const filteredCampaigns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CampaignPerformancePage.useMemo[filteredCampaigns]": ()=>{
            return mappedCampaigns.map({
                "CampaignPerformancePage.useMemo[filteredCampaigns]": (camp)=>{
                    const filteredAdSets = camp.adSets.map({
                        "CampaignPerformancePage.useMemo[filteredCampaigns].filteredAdSets": (adSet)=>{
                            const filteredCreatives = adSet.creatives.filter({
                                "CampaignPerformancePage.useMemo[filteredCampaigns].filteredAdSets.filteredCreatives": (creative)=>{
                                    if (appliedFilters.creativeIds.length > 0) {
                                        return appliedFilters.creativeIds.includes(creative.id);
                                    }
                                    return true;
                                }
                            }["CampaignPerformancePage.useMemo[filteredCampaigns].filteredAdSets.filteredCreatives"]);
                            return {
                                ...adSet,
                                creatives: filteredCreatives
                            };
                        }
                    }["CampaignPerformancePage.useMemo[filteredCampaigns].filteredAdSets"]).filter({
                        "CampaignPerformancePage.useMemo[filteredCampaigns].filteredAdSets": (adSet)=>{
                            if (appliedFilters.creativeIds.length > 0) {
                                return adSet.creatives.length > 0;
                            }
                            if (appliedFilters.adSetIds.length > 0) {
                                return appliedFilters.adSetIds.includes(adSet.id);
                            }
                            return true;
                        }
                    }["CampaignPerformancePage.useMemo[filteredCampaigns].filteredAdSets"]);
                    return {
                        ...camp,
                        adSets: filteredAdSets
                    };
                }
            }["CampaignPerformancePage.useMemo[filteredCampaigns]"]).filter({
                "CampaignPerformancePage.useMemo[filteredCampaigns]": (camp)=>{
                    if (appliedFilters.projectIds.length > 0) {
                        if (!appliedFilters.projectIds.includes(String(camp.projectId))) {
                            return false;
                        }
                    }
                    if (appliedFilters.campaignIds.length > 0) {
                        if (!appliedFilters.campaignIds.includes(camp.id)) {
                            return false;
                        }
                    }
                    if (appliedFilters.adSetIds.length > 0 || appliedFilters.creativeIds.length > 0) {
                        return camp.adSets.length > 0;
                    }
                    return true;
                }
            }["CampaignPerformancePage.useMemo[filteredCampaigns]"]);
        }
    }["CampaignPerformancePage.useMemo[filteredCampaigns]"], [
        mappedCampaigns,
        appliedFilters
    ]);
    // Actions
    const handleApplyFilters = (filters)=>{
        setAppliedFilters({
            projectIds: filters.projectIds || [],
            campaignIds: filters.campaignIds || [],
            adSetIds: filters.adSetIds || [],
            creativeIds: filters.creativeIds || []
        });
        setFilterProjectId(null);
        setIsFilterDialogOpen(false);
    };
    const handleResetFilters = ()=>{
        setAppliedFilters({
            projectIds: [],
            campaignIds: [],
            adSetIds: [],
            creativeIds: []
        });
        setFilterProjectId(null);
        setIsFilterDialogOpen(false);
    };
    const handleDownload = async ()=>{
        try {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].loading("Compiling campaign performance report...", {
                id: "download-report"
            });
            const res = await downloadReport(queryParams).unwrap();
            if (res.file_url) {
                const link = document.createElement("a");
                link.href = res.file_url;
                link.setAttribute("download", `campaign_performance_report_${queryParams.project_id || 1}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Download completed", {
                    id: "download-report",
                    description: "The Campaign Performance Report CSV was downloaded successfully."
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
    const toggleCampaign = (id)=>{
        setExpandedCampaigns((prev)=>({
                ...prev,
                [id]: !prev[id]
            }));
    };
    const toggleAdSet = (id)=>{
        setExpandedAdSets((prev)=>({
                ...prev,
                [id]: !prev[id]
            }));
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
                            fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                            lineNumber: 397,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                        lineNumber: 392,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-[24px] font-bold text-[#00236F] dark:text-blue-400 tracking-tight",
                        children: "Campaign Performance Report"
                    }, void 0, false, {
                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                        lineNumber: 399,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                lineNumber: 391,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8 2xl:gap-10 items-stretch w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-100/80 dark:border-zinc-800/50 rounded-[24px] p-6 xl:p-8 2xl:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-sm xl:text-lg 2xl:text-xl font-extrabold tracking-tight text-slate-700 dark:text-zinc-400",
                                children: "Conversion Funnel Visualizer"
                            }, void 0, false, {
                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                lineNumber: 409,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 flex flex-col md:flex-row items-center justify-between gap-4 py-4 xl:py-6 mt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center text-center space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-14 h-14 xl:w-[85px] xl:h-[85px] 2xl:w-[100px] 2xl:h-[100px] rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center border border-slate-100 dark:border-zinc-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                    className: "w-6 h-6 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10 text-[#0f3d6b] dark:text-blue-400",
                                                    strokeWidth: 2
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                    lineNumber: 419,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                lineNumber: 418,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-xl xl:text-3xl 2xl:text-4xl font-black text-slate-800 dark:text-zinc-100 tracking-tight",
                                                        children: formatMetric(funnelResponse?.conversion_funnel_data?.reach, "2.4M")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                        lineNumber: 422,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-[10px] xl:text-xs 2xl:text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mt-1",
                                                        children: "REACH"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                        lineNumber: 425,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                lineNumber: 421,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                        lineNumber: 417,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                        className: "w-5 h-5 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-slate-300 dark:text-zinc-650 hidden md:block"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                        lineNumber: 432,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center text-center space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-14 h-14 xl:w-[85px] xl:h-[85px] 2xl:w-[100px] 2xl:h-[100px] rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center border border-slate-100 dark:border-zinc-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$click$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointerClick$3e$__["MousePointerClick"], {
                                                    className: "w-6 h-6 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10 text-[#0f3d6b] dark:text-blue-400",
                                                    strokeWidth: 2
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                    lineNumber: 437,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                lineNumber: 436,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-xl xl:text-3xl 2xl:text-4xl font-black text-slate-800 dark:text-zinc-100 tracking-tight",
                                                        children: formatMetric(funnelResponse?.conversion_funnel_data?.leads, "12.8K")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                        lineNumber: 440,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-[10px] xl:text-xs 2xl:text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mt-1",
                                                        children: "LEADS"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                        lineNumber: 443,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                lineNumber: 439,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                        lineNumber: 435,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                        className: "w-5 h-5 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-slate-300 dark:text-zinc-650 hidden md:block"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                        lineNumber: 450,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center text-center space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-14 h-14 xl:w-[85px] xl:h-[85px] 2xl:w-[100px] 2xl:h-[100px] rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center border border-slate-100 dark:border-zinc-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeCheck$3e$__["BadgeCheck"], {
                                                    className: "w-6 h-6 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10 text-[#0f3d6b] dark:text-blue-400",
                                                    strokeWidth: 2
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                    lineNumber: 455,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                lineNumber: 454,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-xl xl:text-3xl 2xl:text-4xl font-black text-slate-800 dark:text-zinc-100 tracking-tight",
                                                        children: formatMetric(funnelResponse?.conversion_funnel_data?.sitevisit, "3.2K")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                        lineNumber: 458,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-[10px] xl:text-xs 2xl:text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mt-1",
                                                        children: "SITE VISITS"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                        lineNumber: 461,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                lineNumber: 457,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                        lineNumber: 453,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                        className: "w-5 h-5 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-slate-300 dark:text-zinc-650 hidden md:block"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                        lineNumber: 468,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center text-center space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-14 h-14 xl:w-[85px] xl:h-[85px] 2xl:w-[100px] 2xl:h-[100px] rounded-full bg-[#0f3d6b] flex items-center justify-center shadow-md",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                    className: "w-6 h-6 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10 text-white",
                                                    strokeWidth: 2
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                    lineNumber: 473,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                lineNumber: 472,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-xl xl:text-3xl 2xl:text-4xl font-black text-slate-850 dark:text-zinc-100 tracking-tight",
                                                        children: formatMetric(funnelResponse?.conversion_funnel_data?.conversions, "412")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                        lineNumber: 476,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-[10px] xl:text-xs 2xl:text-sm font-extrabold uppercase tracking-wider text-[#0f3d6b] dark:text-blue-400 mt-1",
                                                        children: "CONVERSATIONS"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                        lineNumber: 479,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                lineNumber: 475,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                        lineNumber: 471,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                lineNumber: 414,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                        lineNumber: 408,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-1 flex flex-col justify-between gap-4 xl:gap-6 2xl:gap-8 h-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white dark:bg-zinc-900 border border-zinc-100/80 dark:border-zinc-800/50 rounded-[24px] p-5 xl:p-6 2xl:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-center flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] xl:text-xs 2xl:text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500",
                                        children: "BEST PERFORMING CAMPAIGN"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                        lineNumber: 493,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-base xl:text-xl 2xl:text-2xl font-black text-slate-800 dark:text-zinc-100 mt-1 tracking-tight truncate",
                                        children: funnelResponse?.best_performing_campaign || "Meta Lead Gen Q2"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                        lineNumber: 496,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                lineNumber: 492,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white dark:bg-zinc-900 border border-zinc-100/80 dark:border-zinc-800/50 rounded-[24px] p-5 xl:p-6 2xl:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-center flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] xl:text-xs 2xl:text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500",
                                        children: "BEST PERFORMING AD SET"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                        lineNumber: 503,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-base xl:text-xl 2xl:text-2xl font-black text-slate-800 dark:text-zinc-100 mt-1 tracking-tight truncate",
                                        children: funnelResponse?.best_performing_ad_set || "High-Rise Skyline Video"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                        lineNumber: 506,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                lineNumber: 502,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white dark:bg-zinc-900 border border-zinc-100/80 dark:border-zinc-800/50 rounded-[24px] p-5 xl:p-6 2xl:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-center flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] xl:text-xs 2xl:text-sm font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500",
                                        children: "BEST PERFORMING CREATIVE"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                        lineNumber: 513,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "text-base xl:text-xl 2xl:text-2xl font-black text-slate-800 dark:text-zinc-100 mt-1 tracking-tight truncate",
                                        children: funnelResponse?.best_performing_creatives || "High-Rise Skyline Video"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                        lineNumber: 516,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                lineNumber: 512,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                        lineNumber: 489,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                lineNumber: 405,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 rounded-3xl shadow-sm overflow-hidden flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-100 dark:border-zinc-800/50 p-6 xl:p-8 2xl:p-10 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg xl:text-xl 2xl:text-2xl font-bold text-slate-800 dark:text-zinc-100 tracking-tight",
                                        children: "Ads Performance to Booking"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                        lineNumber: 531,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs font-semibold text-slate-400 dark:text-zinc-500",
                                        children: [
                                            appliedFilters.projectIds.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Projects: ",
                                                    appliedFilters.projectIds.map((id)=>projectOptions.find((opt)=>opt.value === id)?.label).filter(Boolean).join(", ")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                lineNumber: 536,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "All Projects"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                lineNumber: 545,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            appliedFilters.campaignIds.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-zinc-300 dark:text-zinc-700",
                                                        children: "|"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                        lineNumber: 549,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Campaigns: ",
                                                            appliedFilters.campaignIds.map((id)=>campaignOptions.find((opt)=>opt.value === id)?.label).filter(Boolean).join(", ")
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                        lineNumber: 550,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                lineNumber: 548,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                        lineNumber: 534,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                lineNumber: 530,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setFilterProjectId(appliedFilters.projectIds[0] || null);
                                            setIsFilterDialogOpen(true);
                                        },
                                        className: "flex items-center gap-2 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 px-4.5 py-2.5 rounded-full text-sm font-semibold text-slate-700 dark:text-zinc-300 transition-colors duration-200 shadow-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                lineNumber: 570,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Filter"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                        lineNumber: 563,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleDownload,
                                        className: "flex items-center gap-2 bg-[#0f3d6b] hover:bg-[#0c3156] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 shadow-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                lineNumber: 577,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Download Report"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                        lineNumber: 573,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                lineNumber: 562,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                        lineNumber: 529,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overflow-x-auto",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full border-collapse text-left min-w-[950px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-zinc-100 dark:border-zinc-800/50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-4 xl:py-5 pl-6 xl:pl-8 2xl:pl-10 pr-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider",
                                                children: "Campaign / Ad Set / Creative"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                lineNumber: 588,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-4 xl:py-5 px-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider text-center",
                                                children: "Leads"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                lineNumber: 591,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-4 xl:py-5 px-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider text-center",
                                                children: "CPL"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                lineNumber: 594,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-4 xl:py-5 px-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider text-center",
                                                children: "Site Visit %"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                lineNumber: 597,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-4 xl:py-5 px-3 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider text-center",
                                                children: "Conversion %"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                lineNumber: 600,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "py-4 xl:py-5 pl-3 pr-6 xl:pr-8 2xl:pr-10 text-xs xl:text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider text-center",
                                                children: "Junk Rate"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                lineNumber: 603,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                        lineNumber: 587,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                    lineNumber: 586,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    className: "divide-none",
                                    children: filteredCampaigns.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            colSpan: 6,
                                            className: "py-8 text-center text-sm text-slate-450 dark:text-zinc-500 italic",
                                            children: "No campaigns match current selection"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                            lineNumber: 612,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                        lineNumber: 611,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)) : filteredCampaigns.map((camp)=>{
                                        const isCampExpanded = !!expandedCampaigns[camp.id];
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "hover:bg-zinc-55/40 dark:hover:bg-zinc-850/10 transition-colors duration-150",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-5 xl:py-6 pl-6 xl:pl-8 2xl:pl-10 pr-3 text-sm xl:text-base font-bold text-slate-800 dark:text-zinc-150",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>toggleCampaign(camp.id),
                                                                className: "inline-flex items-center gap-2 text-left",
                                                                children: [
                                                                    isCampExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                        className: "w-4 h-4 text-slate-450"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                        lineNumber: 631,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                        className: "w-4 h-4 text-slate-450"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                        lineNumber: 633,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    camp.name
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                lineNumber: 626,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                            lineNumber: 625,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-5 xl:py-6 px-3 text-sm xl:text-base font-bold text-slate-800 dark:text-zinc-150 text-center",
                                                            children: camp.leads.toLocaleString()
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                            lineNumber: 639,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-5 xl:py-6 px-3 text-sm xl:text-base font-semibold text-slate-600 dark:text-zinc-400 text-center",
                                                            children: camp.cpl
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                            lineNumber: 643,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-5 xl:py-6 px-3 text-sm xl:text-base font-semibold text-slate-600 dark:text-zinc-400 text-center",
                                                            children: [
                                                                camp.siteVisitRate,
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                            lineNumber: 647,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-5 xl:py-6 px-3 text-sm xl:text-base font-bold text-red-500 dark:text-red-400 text-center",
                                                            children: [
                                                                camp.conversionRate,
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                            lineNumber: 651,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-5 xl:py-6 pl-3 pr-6 xl:pr-8 2xl:pr-10 text-sm xl:text-base font-bold text-red-500 dark:text-red-400 text-center",
                                                            children: [
                                                                camp.junkRate,
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                            lineNumber: 655,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                    lineNumber: 623,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                isCampExpanded && camp.adSets.map((adSet)=>{
                                                    const isAdSetExpanded = !!expandedAdSets[adSet.id];
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                className: "hover:bg-zinc-55/30 dark:hover:bg-zinc-850/5 transition-colors duration-150 bg-slate-50/30 dark:bg-zinc-900/10",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "py-4 xl:py-5 pl-12 xl:pl-16 pr-3 text-sm font-semibold text-slate-650 dark:text-zinc-250",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>toggleAdSet(adSet.id),
                                                                            className: "inline-flex items-center gap-2 text-left",
                                                                            children: [
                                                                                isAdSetExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                                    className: "w-3.5 h-3.5 text-slate-400"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                                    lineNumber: 675,
                                                                                    columnNumber: 37
                                                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                                    className: "w-3.5 h-3.5 text-slate-400"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                                    lineNumber: 677,
                                                                                    columnNumber: 37
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-normal text-slate-400",
                                                                                    children: "Ad Set: "
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                                    lineNumber: 679,
                                                                                    columnNumber: 35
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                adSet.name
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                            lineNumber: 670,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                        lineNumber: 669,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "py-4 xl:py-5 px-3 text-sm text-slate-700 dark:text-zinc-350 text-center",
                                                                        children: adSet.leads.toLocaleString()
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                        lineNumber: 683,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "py-4 xl:py-5 px-3 text-sm text-slate-600 dark:text-zinc-400 text-center",
                                                                        children: adSet.cpl
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                        lineNumber: 687,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "py-4 xl:py-5 px-3 text-sm text-slate-600 dark:text-zinc-400 text-center",
                                                                        children: [
                                                                            adSet.siteVisitRate,
                                                                            "%"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                        lineNumber: 691,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "py-4 xl:py-5 px-3 text-sm font-bold text-red-500 dark:text-red-450 text-center",
                                                                        children: [
                                                                            adSet.conversionRate,
                                                                            "%"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                        lineNumber: 695,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "py-4 xl:py-5 pl-3 pr-6 xl:pr-8 2xl:pr-10 text-sm text-slate-500 dark:text-zinc-450 text-center",
                                                                        children: [
                                                                            adSet.junkRate,
                                                                            "%"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                        lineNumber: 699,
                                                                        columnNumber: 31
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                lineNumber: 667,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            isAdSetExpanded && adSet.creatives.map((creative)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                    className: "hover:bg-zinc-55/20 dark:hover:bg-zinc-850/5 bg-slate-50/60 dark:bg-zinc-900/20",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "py-3.5 pl-20 xl:pl-24 pr-3 text-xs xl:text-sm font-medium text-slate-550 dark:text-zinc-400",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "inline-flex items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                                                                        className: "w-3.5 h-3.5 text-slate-450 dark:text-zinc-500"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                                        lineNumber: 713,
                                                                                        columnNumber: 37
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "font-normal text-slate-400",
                                                                                        children: "Creative: "
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                                        lineNumber: 714,
                                                                                        columnNumber: 37
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    creative.name
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                                lineNumber: 712,
                                                                                columnNumber: 35
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                            lineNumber: 711,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "py-3.5 px-3 text-xs xl:text-sm text-slate-600 dark:text-zinc-400 text-center",
                                                                            children: creative.leads.toLocaleString()
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                            lineNumber: 718,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "py-3.5 px-3 text-xs xl:text-sm text-slate-500 dark:text-zinc-500 text-center",
                                                                            children: creative.cpl
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                            lineNumber: 722,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "py-3.5 px-3 text-xs xl:text-sm text-slate-500 dark:text-zinc-500 text-center",
                                                                            children: [
                                                                                creative.siteVisitRate,
                                                                                "%"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                            lineNumber: 726,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "py-3.5 px-3 text-xs xl:text-sm font-bold text-red-500 dark:text-red-450 text-center",
                                                                            children: [
                                                                                creative.conversionRate,
                                                                                "%"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                            lineNumber: 730,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                            className: "py-3.5 pl-3 pr-6 xl:pr-8 2xl:pr-10 text-xs xl:text-sm text-slate-450 dark:text-zinc-500 text-center",
                                                                            children: [
                                                                                creative.junkRate,
                                                                                "%"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                            lineNumber: 734,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, creative.id, true, {
                                                                    fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                                    lineNumber: 706,
                                                                    columnNumber: 31
                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                        ]
                                                    }, adSet.id, true, {
                                                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                                        lineNumber: 665,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0));
                                                })
                                            ]
                                        }, camp.id, true, {
                                            fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                            lineNumber: 621,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0));
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                                    lineNumber: 609,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                            lineNumber: 585,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                        lineNumber: 584,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                lineNumber: 526,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$components$2f$ReportFilterDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReportFilterDialog"], {
                open: isFilterDialogOpen,
                onClose: ()=>{
                    setFilterProjectId(null);
                    setIsFilterDialogOpen(false);
                },
                tabs: [
                    "projects",
                    "campaigns"
                ],
                onApply: (filters)=>{
                    handleApplyFilters({
                        projectIds: filters.projectIds || [],
                        campaignIds: filters.campaignIds || [],
                        adSetIds: filters.adSetIds || [],
                        creativeIds: filters.creativeIds || []
                    });
                },
                onReset: handleResetFilters,
                onProjectChange: (projectIds)=>{
                    setFilterProjectId(projectIds[0] || null);
                },
                projectOptions: projectOptions,
                campaignOptions: campaignOptions,
                hierarchicalCampaigns: filterHierarchicalCampaigns,
                appliedProjectIds: appliedFilters.projectIds,
                appliedCampaignIds: appliedFilters.campaignIds,
                appliedAdSetIds: appliedFilters.adSetIds,
                appliedCreativeIds: appliedFilters.creativeIds
            }, void 0, false, {
                fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
                lineNumber: 753,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/reports/pages/CampaignPerformancePage.tsx",
        lineNumber: 388,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CampaignPerformancePage, "/5t07+i6gHLO4p6+nHgVGvmBSX8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllMasterDataQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersByRoleIdQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$api$2f$reportsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllCampaignsDataQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$api$2f$reportsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAdsPerformanceToBookingDataQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$api$2f$reportsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetCampaignsFunnelDataQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$api$2f$reportsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAdsPerformanceToBookingDataQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$reports$2f$api$2f$reportsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDownloadCampaignPerformanceDataMutation"]
    ];
});
_c = CampaignPerformancePage;
var _c;
__turbopack_context__.k.register(_c, "CampaignPerformancePage");
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

//# sourceMappingURL=src_1rkfl7d._.js.map