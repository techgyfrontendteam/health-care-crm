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
      query: (body = { offset: 0 }) => {
        const startDate = body?.start_date || body?.startDate;
        const endDate = body?.end_date || body?.endDate;
        return {
          url: "https://upload-uncouple-rephrase.ngrok-free.dev/salesDashBoard/getStats",
          method: "POST",
          body: {
            offset: body?.offset ?? 0,
            ...(startDate ? { start_date: startDate } : {}),
            ...(endDate ? { end_date: endDate } : {}),
            ...(body || {}),
          },
        };
      },
      providesTags: ["Leads"],
    }),
    getCallsLoggedAndNewLeads: builder.query<CallsLoggedAndNewLeadsResponse, CallsLoggedAndNewLeadsRequest | void>({
      query: (body) => {
        const startDate = body?.start_date || body?.startDate;
        const endDate = body?.end_date || body?.endDate;
        return {
          url: "https://upload-uncouple-rephrase.ngrok-free.dev/salesDashBoard/getCallsLoggedAndNewLeads",
          method: "POST",
          body: {
            ...(body?.present_date ? { present_date: body.present_date } : {}),
            ...(startDate ? { start_date: startDate } : {}),
            ...(endDate ? { end_date: endDate } : {}),
            ...(body || {}),
          },
        };
      },
      providesTags: ["Leads"],
    }),
    getLeadSourceBreakDown: builder.query<LeadSourceBreakDownResponse, LeadSourceBreakDownRequest | void>({
      query: (body = {}) => {
        const startDate = body?.start_date || body?.startDate;
        const endDate = body?.end_date || body?.endDate;
        return {
          url: "https://upload-uncouple-rephrase.ngrok-free.dev/salesDashBoard/getLeadsSourceBreakDown",
          method: "POST",
          body: {
            ...(startDate ? { start_date: startDate } : {}),
            ...(endDate ? { end_date: endDate } : {}),
            ...(body || {}),
          },
        };
      },
      providesTags: ["Leads"],
    }),
    getBranchLeadPerformance: builder.query<BranchLeadPerformanceResponse, BranchLeadPerformanceRequest | void>({
      query: (body = {}) => {
        const startDate = body?.start_date || body?.startDate;
        const endDate = body?.end_date || body?.endDate;
        return {
          url: "https://upload-uncouple-rephrase.ngrok-free.dev/salesDashBoard/getBranchLeadPerformance",
          method: "POST",
          body: {
            ...(startDate ? { start_date: startDate } : {}),
            ...(endDate ? { end_date: endDate } : {}),
            ...(body || {}),
          },
        };
      },
      providesTags: ["Leads"],
    }),
    getDepertmentLeadBreakDown: builder.query<DepartmentLeadBreakDownResponse, DepartmentLeadBreakDownRequest | void>({
      query: (body = { offset: 0 }) => {
        const startDate = body?.start_date || body?.startDate;
        const endDate = body?.end_date || body?.endDate;
        return {
          url: "https://upload-uncouple-rephrase.ngrok-free.dev/salesDashBoard/getDepertmentLeadBreakDown",
          method: "POST",
          body: {
            offset: body?.offset ?? 0,
            ...(startDate ? { start_date: startDate } : {}),
            ...(endDate ? { end_date: endDate } : {}),
            ...(body || {}),
          },
        };
      },
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
