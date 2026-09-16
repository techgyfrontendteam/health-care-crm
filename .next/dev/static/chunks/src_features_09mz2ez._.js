(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/features/appointments/api/appointmentsApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appointmentsApi",
    ()=>appointmentsApi,
    "useCreateAppointmentMutation",
    ()=>useCreateAppointmentMutation,
    "useGetAllAppointmentsQuery",
    ()=>useGetAllAppointmentsQuery,
    "useGetAppointmentsByLeadUuidQuery",
    ()=>useGetAppointmentsByLeadUuidQuery,
    "useLazyGetAppointmentsByLeadUuidQuery",
    ()=>useLazyGetAppointmentsByLeadUuidQuery,
    "useUpdateAppointmentMutation",
    ()=>useUpdateAppointmentMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/baseApi.ts [app-client] (ecmascript)");
;
const appointmentsApi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
    endpoints: (builder)=>({
            createAppointment: builder.mutation({
                query: (body)=>({
                        url: "/appointments/createAppointment",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Appointments",
                    "Leads"
                ]
            }),
            getAppointmentsByLeadUuid: builder.query({
                query: (body)=>({
                        url: "/appointments/getAppointmentsByLeadUuid",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Appointments"
                ]
            }),
            getAllAppointments: builder.query({
                query: (body = {})=>({
                        url: "/appointments/getAllAppointments",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Appointments"
                ]
            }),
            updateAppointment: builder.mutation({
                query: (body)=>({
                        url: "/appointments/updateAppointment",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Appointments",
                    "Leads"
                ]
            })
        })
});
const { useCreateAppointmentMutation, useGetAppointmentsByLeadUuidQuery, useGetAllAppointmentsQuery, useLazyGetAppointmentsByLeadUuidQuery, useUpdateAppointmentMutation } = appointmentsApi;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/auth/api/authApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authApi",
    ()=>authApi,
    "useForgotPasswordMutation",
    ()=>useForgotPasswordMutation,
    "useGetUserByIdMutation",
    ()=>useGetUserByIdMutation,
    "useGetUserRolesMutation",
    ()=>useGetUserRolesMutation,
    "useLoginMutation",
    ()=>useLoginMutation,
    "useLogoutMutation",
    ()=>useLogoutMutation,
    "useResetPasswordMutation",
    ()=>useResetPasswordMutation,
    "useSendVerificationEmailMutation",
    ()=>useSendVerificationEmailMutation,
    "useTestNotificationMutation",
    ()=>useTestNotificationMutation,
    "useTriggerPasswordUpdateMutation",
    ()=>useTriggerPasswordUpdateMutation,
    "useUpdatePasswordMutation",
    ()=>useUpdatePasswordMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/baseApi.ts [app-client] (ecmascript)");
;
const authApi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
    endpoints: (builder)=>({
            login: builder.mutation({
                query: (credentials)=>({
                        url: '/auth/login',
                        method: 'POST',
                        body: credentials
                    })
            }),
            forgotPassword: builder.mutation({
                query: (body)=>({
                        url: '/auth/forgotPassword',
                        method: 'POST',
                        body
                    })
            }),
            updatePassword: builder.mutation({
                query: (body)=>({
                        url: '/auth/updatePassword',
                        method: 'POST',
                        body
                    })
            }),
            logout: builder.mutation({
                query: (body = {})=>({
                        url: '/auth/logout',
                        method: 'POST',
                        body
                    })
            }),
            resetPassword: builder.mutation({
                query: (body)=>({
                        url: '/auth/resetPassword',
                        method: 'POST',
                        body
                    })
            }),
            sendVerificationEmail: builder.mutation({
                query: (body)=>({
                        url: '/auth/sendVerificationEmail',
                        method: 'POST',
                        body
                    })
            }),
            testNotification: builder.mutation({
                query: (body = {})=>({
                        url: '/auth/testNotification',
                        method: 'POST',
                        body
                    })
            }),
            triggerPasswordUpdate: builder.mutation({
                query: (body)=>({
                        url: '/auth/triggerPasswordUpdate',
                        method: 'POST',
                        body
                    })
            }),
            getUserRoles: builder.mutation({
                query: (body)=>({
                        url: '/users/getUserRoles',
                        method: 'POST',
                        body
                    })
            }),
            getUserById: builder.mutation({
                query: (body)=>({
                        url: '/users/getUserById',
                        method: 'POST',
                        body
                    })
            })
        })
});
const { useLoginMutation, useForgotPasswordMutation, useUpdatePasswordMutation, useLogoutMutation, useResetPasswordMutation, useSendVerificationEmailMutation, useTestNotificationMutation, useTriggerPasswordUpdateMutation, useGetUserRolesMutation, useGetUserByIdMutation } = authApi;
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
"[project]/src/features/call-analyzer/api/callAnalyzerApiSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "callAnalyzerApiSlice",
    ()=>callAnalyzerApiSlice,
    "useAnalyzeCallMutation",
    ()=>useAnalyzeCallMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/baseApi.ts [app-client] (ecmascript)");
;
const callAnalyzerApiSlice = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
    endpoints: (builder)=>({
            analyzeCall: builder.mutation({
                query: (data)=>({
                        url: 'https://retaliatory-lazaro-uncaptiously.ngrok-free.dev/api/callanalyzer',
                        method: 'POST',
                        body: data
                    })
            })
        })
});
const { useAnalyzeCallMutation } = callAnalyzerApiSlice;
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
"[project]/src/features/follow-ups/api/followUpsApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "followUpsApi",
    ()=>followUpsApi,
    "useCreateFollowUpMutation",
    ()=>useCreateFollowUpMutation,
    "useGetAllFollowupsByUserIdQuery",
    ()=>useGetAllFollowupsByUserIdQuery,
    "useLazyGetAllFollowupsByUserIdQuery",
    ()=>useLazyGetAllFollowupsByUserIdQuery,
    "useUpdateFollowUpMutation",
    ()=>useUpdateFollowUpMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/baseApi.ts [app-client] (ecmascript)");
;
const followUpsApi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
    endpoints: (builder)=>({
            getAllFollowupsByUserId: builder.query({
                query: (body)=>({
                        url: '/leadFollowups/getAllFollowupsByUserId',
                        method: 'POST',
                        body
                    }),
                providesTags: [
                    'FollowUps'
                ]
            }),
            createFollowUp: builder.mutation({
                query: (body)=>({
                        url: '/leadFollowups/createFollowUp',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'FollowUps',
                    'Leads'
                ]
            }),
            updateFollowUp: builder.mutation({
                query: (body)=>({
                        url: '/leadFollowups/updateFollowup',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'FollowUps',
                    'Leads'
                ]
            })
        })
});
const { useGetAllFollowupsByUserIdQuery, useLazyGetAllFollowupsByUserIdQuery, useCreateFollowUpMutation, useUpdateFollowUpMutation } = followUpsApi;
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
"[project]/src/features/prompts/api/promptApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "promptApi",
    ()=>promptApi,
    "useCreateMultipleProjectStatusChecklistMutation",
    ()=>useCreateMultipleProjectStatusChecklistMutation,
    "useCreateProjectStatusChecklistMutation",
    ()=>useCreateProjectStatusChecklistMutation,
    "useDeleteMultipleProjectStatusChecklistMutation",
    ()=>useDeleteMultipleProjectStatusChecklistMutation,
    "useDeleteProjectStatusChecklistMutation",
    ()=>useDeleteProjectStatusChecklistMutation,
    "useGenerateQuestionsMutation",
    ()=>useGenerateQuestionsMutation,
    "useGetProjectStatusChecklistQuery",
    ()=>useGetProjectStatusChecklistQuery,
    "useLazyGetProjectStatusChecklistQuery",
    ()=>useLazyGetProjectStatusChecklistQuery,
    "useReplaceProjectStatusChecklistMutation",
    ()=>useReplaceProjectStatusChecklistMutation,
    "useUpdateProjectStatusChecklistMutation",
    ()=>useUpdateProjectStatusChecklistMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/baseApi.ts [app-client] (ecmascript)");
;
const promptApi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
    endpoints: (builder)=>({
            getProjectStatusChecklist: builder.query({
                query: (body)=>({
                        url: "/master/get_project_status_checklist",
                        method: "POST",
                        body
                    })
            }),
            createProjectStatusChecklist: builder.mutation({
                query: (body)=>({
                        url: "/master/create_project_status_checklist",
                        method: "POST",
                        body
                    })
            }),
            updateProjectStatusChecklist: builder.mutation({
                query: (body)=>({
                        url: "/master/update_project_status_checklist",
                        method: "POST",
                        body
                    })
            }),
            deleteProjectStatusChecklist: builder.mutation({
                query: (body)=>({
                        url: "/master/delete_project_status_checklist",
                        method: "POST",
                        body
                    })
            }),
            createMultipleProjectStatusChecklist: builder.mutation({
                query: (body)=>({
                        url: "/master/create_multiple_project_status_checklist",
                        method: "POST",
                        body
                    })
            }),
            deleteMultipleProjectStatusChecklist: builder.mutation({
                query: (body)=>({
                        url: "/master/delete_multiple_project_status_checklist",
                        method: "POST",
                        body
                    })
            }),
            replaceProjectStatusChecklist: builder.mutation({
                query: (body)=>({
                        url: "/master/replace_project_status_checklist",
                        method: "POST",
                        body
                    })
            }),
            generateQuestions: builder.mutation({
                query: (body)=>({
                        url: "/master/generate_questions",
                        method: "POST",
                        body
                    })
            })
        })
});
const { useGetProjectStatusChecklistQuery, useLazyGetProjectStatusChecklistQuery, useCreateProjectStatusChecklistMutation, useUpdateProjectStatusChecklistMutation, useDeleteProjectStatusChecklistMutation, useCreateMultipleProjectStatusChecklistMutation, useDeleteMultipleProjectStatusChecklistMutation, useReplaceProjectStatusChecklistMutation, useGenerateQuestionsMutation } = promptApi;
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

//# sourceMappingURL=src_features_09mz2ez._.js.map