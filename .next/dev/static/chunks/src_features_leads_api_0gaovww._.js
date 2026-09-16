(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/features/leads/api/callsApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "callsApi",
    ()=>callsApi,
    "useCreateCallMutation",
    ()=>useCreateCallMutation,
    "useCreateInboundQueueMutation",
    ()=>useCreateInboundQueueMutation,
    "useGetAllTelephonyAgentsQuery",
    ()=>useGetAllTelephonyAgentsQuery,
    "useGetCallDetailsByCallIdQuery",
    ()=>useGetCallDetailsByCallIdQuery,
    "useGetCallHistoryByPhoneNumberQuery",
    ()=>useGetCallHistoryByPhoneNumberQuery,
    "useGetCallHistoryByUserIdQuery",
    ()=>useGetCallHistoryByUserIdQuery,
    "useGetCallRecordsMutation",
    ()=>useGetCallRecordsMutation,
    "useGetCallsByLeadUuidQuery",
    ()=>useGetCallsByLeadUuidQuery,
    "useGetExtensionTypesMutation",
    ()=>useGetExtensionTypesMutation,
    "useGetInboundQueuesQuery",
    ()=>useGetInboundQueuesQuery,
    "useGetMyTelephonyProfileQuery",
    ()=>useGetMyTelephonyProfileQuery,
    "useGetTelephonyProvidersMutation",
    ()=>useGetTelephonyProvidersMutation,
    "useInitiateClickToCallMutation",
    ()=>useInitiateClickToCallMutation,
    "useUpdateCallMutation",
    ()=>useUpdateCallMutation,
    "useUpsertTelephonyAgentMutation",
    ()=>useUpsertTelephonyAgentMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/baseApi.ts [app-client] (ecmascript)");
;
const callsApi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
    endpoints: (builder)=>({
            getMyTelephonyProfile: builder.query({
                query: ()=>({
                        url: "/tataTele/getMyTelephonyProfile",
                        method: "POST",
                        body: {}
                    }),
                providesTags: [
                    "Telephony"
                ]
            }),
            getAllTelephonyAgents: builder.query({
                query: (body = {})=>({
                        url: "/tataTele/getAllAgents",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Telephony"
                ]
            }),
            initiateClickToCall: builder.mutation({
                query: (payload)=>({
                        url: "/tataTele/click-to-call",
                        method: "POST",
                        body: payload
                    })
            }),
            getCallRecords: builder.mutation({
                query: (payload)=>({
                        url: "/tataTele/call-records",
                        method: "POST",
                        body: {
                            limit: 20,
                            offset: 0,
                            ...payload
                        }
                    })
            }),
            getTelephonyProviders: builder.mutation({
                query: ()=>({
                        url: "/tataTele/getTelephonyProviders",
                        method: "POST"
                    })
            }),
            getExtensionTypes: builder.mutation({
                query: ()=>({
                        url: "/tataTele/getExtensionTypes",
                        method: "POST"
                    })
            }),
            upsertTelephonyAgent: builder.mutation({
                query: (payload)=>({
                        url: "/tataTele/upsertTelephonyAgent",
                        method: "POST",
                        body: {
                            is_active: 1,
                            smartflo_agent_id: "",
                            ...payload
                        }
                    }),
                invalidatesTags: [
                    "Telephony"
                ]
            }),
            createInboundQueue: builder.mutation({
                query: (body)=>({
                        url: "/tataTele/inbound-queue",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Telephony"
                ]
            }),
            getInboundQueues: builder.query({
                query: (body = {})=>({
                        url: "/tataTele/getInboundQueues",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Telephony"
                ]
            }),
            createCall: builder.mutation({
                query: (payload)=>({
                        url: "/leadCalls/createCall",
                        method: "POST",
                        body: payload
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            getCallDetailsByCallId: builder.query({
                query: (body)=>({
                        url: "/leadCalls/getCallDetailsByCallId",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            getCallHistoryByPhoneNumber: builder.query({
                query: (body)=>({
                        url: "/leadCalls/getCallHistoryByPhoneNumber",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            getCallHistoryByUserId: builder.query({
                query: (body)=>({
                        url: "/leadCalls/getCallHistoryByUserId",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            getCallsByLeadUuid: builder.query({
                query: (body)=>({
                        url: "/leadCalls/getCallsByLeadUuid",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            updateCall: builder.mutation({
                query: (body)=>({
                        url: "/leadCalls/updateCall",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            })
        }),
    overrideExisting: false
});
const { useGetMyTelephonyProfileQuery, useGetAllTelephonyAgentsQuery, useInitiateClickToCallMutation, useGetCallRecordsMutation, useGetTelephonyProvidersMutation, useGetExtensionTypesMutation, useUpsertTelephonyAgentMutation, useCreateInboundQueueMutation, useGetInboundQueuesQuery, useCreateCallMutation, useGetCallDetailsByCallIdQuery, useGetCallHistoryByPhoneNumberQuery, useGetCallHistoryByUserIdQuery, useGetCallsByLeadUuidQuery, useUpdateCallMutation } = callsApi;
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
]);

//# sourceMappingURL=src_features_leads_api_0gaovww._.js.map