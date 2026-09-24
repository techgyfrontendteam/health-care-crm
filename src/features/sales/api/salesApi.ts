import { baseApi } from "../../../app/api/baseApi";
import type {
  SalesStatsRequest,
  SalesStatsResponse,
  CallsLoggedAndNewLeadsRequest,
  CallsLoggedAndNewLeadsResponse,
  LeadSourceBreakDownRequest,
  LeadSourceBreakDownResponse,
  BranchLeadPerformanceRequest,
  BranchLeadPerformanceResponse,
  DepartmentLeadBreakDownRequest,
  DepartmentLeadBreakDownResponse,
} from "../types";

export const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSalesStats: builder.query<SalesStatsResponse, SalesStatsRequest | void>({
      query: (body = { offset: 0 }) => ({
        url: "https://upload-uncouple-rephrase.ngrok-free.dev/salesDashBoard/getStats",
        method: "POST",
        body: {
          offset: body?.offset ?? 0,
        },
      }),
      providesTags: ["Leads"],
    }),
    getCallsLoggedAndNewLeads: builder.query<CallsLoggedAndNewLeadsResponse, CallsLoggedAndNewLeadsRequest | void>({
      query: (body) => {
        const todayStr = new Date().toISOString().split("T")[0];
        return {
          url: "https://upload-uncouple-rephrase.ngrok-free.dev/salesDashBoard/getCallsLoggedAndNewLeads",
          method: "POST",
          body: {
            present_date: body?.present_date || todayStr,
          },
        };
      },
      providesTags: ["Leads"],
    }),
    getLeadSourceBreakDown: builder.query<LeadSourceBreakDownResponse, LeadSourceBreakDownRequest | void>({
      query: (body = {}) => ({
        url: "https://upload-uncouple-rephrase.ngrok-free.dev/salesDashBoard/getLeadsSourceBreakDown",
        method: "POST",
        body: body || {},
      }),
      providesTags: ["Leads"],
    }),
    getBranchLeadPerformance: builder.query<BranchLeadPerformanceResponse, BranchLeadPerformanceRequest | void>({
      query: (body = {}) => ({
        url: "https://upload-uncouple-rephrase.ngrok-free.dev/salesDashBoard/getBranchLeadPerformance",
        method: "POST",
        body: body || {},
      }),
      providesTags: ["Leads"],
    }),
    getDepertmentLeadBreakDown: builder.query<DepartmentLeadBreakDownResponse, DepartmentLeadBreakDownRequest | void>({
      query: (body = { offset: 0 }) => ({
        url: "https://upload-uncouple-rephrase.ngrok-free.dev/salesDashBoard/getDepertmentLeadBreakDown",
        method: "POST",
        body: {
          offset: body?.offset ?? 0,
        },
      }),
      providesTags: ["Leads"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSalesStatsQuery,
  useGetCallsLoggedAndNewLeadsQuery,
  useGetLeadSourceBreakDownQuery,
  useGetBranchLeadPerformanceQuery,
  useGetDepertmentLeadBreakDownQuery,
} = salesApi;
