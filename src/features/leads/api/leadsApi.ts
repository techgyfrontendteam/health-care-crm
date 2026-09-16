import { baseApi } from "@/shared/api/baseApi";
import type {
  Lead,
  CreateLeadRequest,
  UpdateLeadRequest,
  GetLeadsRequest,
  GetLeadsResponse,
  GetLeadByIdRequest,
  ScheduleVisitRequest,
  GetCustomerLeadsRequest,
  GetLeadsByRmIdRequest,
  GetLeadsByEmIdRequest,
  AddLeadActivityRequest,
  BulkImportLeadsRequest,
  BulkImportLeadsResponse,
  ProjectEmAndRmData,
  CreateSurgeryRequest,
  CreateSurgeryResponse,
  UpdateSurgeryRequest,
  UpdateSurgeryResponse,
  GetSurgeriesByLeadUuidResponse,
} from "../types";

export const leadsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeads: builder.query<GetLeadsResponse, GetLeadsRequest>({
      query: (body) => ({
        url: "/leads/getLeads",
        method: "POST",
        body,
      }),
      providesTags: ["Leads"],
    }),
    getLeadById: builder.query<Lead, GetLeadByIdRequest>({
      query: (body) => ({
        url: "/leads/getLeadById",
        method: "POST",
        body,
      }),
      providesTags: (result, error, arg) => [{ type: "Leads", id: arg.uuid }],
    }),
    getLeadObjectionDetailsAndChecklist: builder.query<any, Record<string, unknown>>({
      query: (body) => ({ url: "/leads/getLeadObjectionDetailsAndChecklist", method: "POST", body }),
      providesTags: ["Leads"],
    }),
    getLeadDetailsByLeadUuid: builder.query<any, Record<string, unknown>>({
      query: (body) => ({ url: "/leads/getLeadDetailsByLeadUuid", method: "POST", body }),
      providesTags: ["Leads"],
    }),
    updateLeadObjections: builder.mutation<any, Record<string, unknown>>({
      query: (body) => ({ url: "/leads/updatedLeadObjections", method: "POST", body }),
      invalidatesTags: ["Leads"],
    }),
    getLeadDetailsByPhoneNumber: builder.query<any, Record<string, unknown>>({
      query: (body) => ({ url: "/leads/getLeadDetailsByPhoneNumber", method: "POST", body }),
      providesTags: ["Leads"],
    }),
    getEmLeadsByRmId: builder.query<any, Record<string, unknown>>({
      query: (body) => ({ url: "/leads/getEmLeadsByRmId", method: "POST", body }),
      providesTags: ["Leads"],
    }),
    getLeadStatsByUserId: builder.query<any, Record<string, unknown>>({
      query: (body) => ({ url: "/leads/getLeadStatsByUserId", method: "POST", body }),
      providesTags: ["Leads"],
    }),
    getLeadsAndObjectionsByCustomerId: builder.query<any, Record<string, unknown>>({
      query: (body) => ({ url: "/leads/getLeadDetailsbycustomer_id", method: "POST", body }),
      providesTags: ["Leads"],
    }),
    getLeadsByCustomerUuid: builder.query<
      GetLeadsResponse,
      GetCustomerLeadsRequest
    >({
      query: (body) => ({
        url: "/leads/getLeadsByCustomerUuid",
        method: "POST",
        body,
      }),
      providesTags: ["Leads"],
    }),
    getLeadsByRmId: builder.query<GetLeadsResponse, GetLeadsByRmIdRequest>({
      query: (body) => ({
        url: "/leads/getLeadsByRmId",
        method: "POST",
        body,
      }),
      providesTags: ["Leads"],
    }),
    getLeadsByEmId: builder.query<GetLeadsResponse, GetLeadsByEmIdRequest>({
      query: (body) => ({
        url: "/leads/getLeadsByEmId",
        method: "POST",
        body,
      }),
      providesTags: ["Leads"],
    }),
    createLead: builder.mutation<{ message: string }, CreateLeadRequest>({
      query: (body) => ({
        url: "/leads/createLead",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Leads"],
    }),
    updateLead: builder.mutation<{ message: string }, UpdateLeadRequest>({
      query: (body) => ({
        url: "/leads/updateLead",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        "Leads",
        { type: "Leads", id: arg.uuid },
      ],
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        try {
          await queryFulfilled;
          const state = getState() as {
            baseApi?: { queries?: Record<string, any> };
          };
          const queries = state.baseApi?.queries || {};

          for (const key of Object.keys(queries)) {
            if (key.startsWith("getLeads(")) {
              dispatch(
                leadsApi.util.updateQueryData(
                  "getLeads",
                  queries[key].originalArgs,
                  (draft: any) => {
                    const list = Array.isArray(draft) ? draft : (Array.isArray(draft?.data) ? draft.data : []);
                    const index = list.findIndex((l: any) => l.uuid === arg.uuid);
                    if (index !== -1) Object.assign(list[index], arg);
                  },
                ),
              );
            }
            if (key.startsWith("getLeadsByCustomerUuid(")) {
              dispatch(
                leadsApi.util.updateQueryData(
                  "getLeadsByCustomerUuid",
                  queries[key].originalArgs,
                  (draft: any) => {
                    const list = Array.isArray(draft) ? draft : (Array.isArray(draft?.data) ? draft.data : []);
                    const index = list.findIndex((l: any) => l.uuid === arg.uuid);
                    if (index !== -1) Object.assign(list[index], arg);
                  },
                ),
              );
            }
            if (key.startsWith("getLeadById(")) {
              dispatch(
                leadsApi.util.updateQueryData(
                  "getLeadById",
                  queries[key].originalArgs,
                  (draft: any) => {
                    if (draft?.uuid === arg.uuid) {
                      Object.assign(draft, arg);
                    } else if (draft?.data?.uuid === arg.uuid) {
                      Object.assign(draft.data, arg);
                    }
                  },
                ),
              );
            }
          }
        } catch {
          // If the mutation fails, we don't apply the optimistic update anyway
        }
      },
    }),
    bulkAssignLeadsToRm: builder.mutation<
      { message: string; affectedRows: number },
      { lead_uuids: string[]; assigned_to_rm: number }
    >({
      query: (body) => ({
        url: "/leads/bulkAssignLeadsToRm",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Leads"],
    }),
    bulkAssignLeadsToEm: builder.mutation<
      { message: string; affectedRows: number },
      { lead_uuids: string[]; assigned_to_em: number }
    >({
      query: (body) => ({
        url: "/leads/bulkAssignLeadsToEm",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Leads"],
    }),
    deleteLead: builder.mutation<{ message: string }, { uuid: string }>({
      query: (body) => ({
        url: "/leads/deleteLead",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Leads"],
    }),
    scheduleVisit: builder.mutation<{ message: string }, ScheduleVisitRequest>({
      query: (body) => ({
        url: "/leadSiteVisits/createSiteVisit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Leads"],
    }),
    addLeadActivity: builder.mutation<
      { message: string },
      AddLeadActivityRequest
    >({
      query: (body) => ({
        url: "/leads/addLeadActivity",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Leads"],
    }),
    sendWhatsappMessageNotification: builder.mutation<any, Record<string, unknown>>({
      query: (body) => ({ url: "/leads/sendWhatsappMessageNotification", method: "POST", body }),
    }),
    sendCallSummaryCompleteNotification: builder.mutation<any, Record<string, unknown>>({
      query: (body) => ({ url: "/leads/sendCallSummeryCompleteNotification", method: "POST", body }),
    }),
    createLeadNextBestActions: builder.mutation<any, Record<string, unknown>>({
      query: (body) => ({ url: "/leads/createLeadNextBestActions", method: "POST", body }),
      invalidatesTags: ["Leads"],
    }),
    createLeadConsolidatedCallSummary: builder.mutation<any, Record<string, unknown>>({
      query: (body) => ({ url: "/leads/createLeadConsolidatedCallSummary", method: "POST", body }),
      invalidatesTags: ["Leads"],
    }),
    createLeadProjectScore: builder.mutation<any, Record<string, unknown>>({
      query: (body) => ({ url: "/leads/project-scores/create", method: "POST", body }),
      invalidatesTags: ["Leads"],
    }),
    updateLeadProjectScore: builder.mutation<any, Record<string, unknown>>({
      query: (body) => ({ url: "/leads/project-scores/update", method: "POST", body }),
      invalidatesTags: ["Leads"],
    }),
    deleteLeadProjectScoreById: builder.mutation<any, Record<string, unknown>>({
      query: (body) => ({ url: "/leads/project-scores/delete-by-id", method: "POST", body }),
      invalidatesTags: ["Leads"],
    }),
    deleteLeadProjectScoresByLead: builder.mutation<any, Record<string, unknown>>({
      query: (body) => ({ url: "/leads/project-scores/delete-by-lead", method: "POST", body }),
      invalidatesTags: ["Leads"],
    }),
    getLeadProjectScoresByLead: builder.query<unknown, Record<string, unknown>>({
      query: (body) => ({ url: "/leads/project-scores/get-by-lead", method: "POST", body }),
      providesTags: ["Leads"],
    }),
    getVisitsByUserId: builder.query<
      any[],
      {
        user_ids: number[];
        offset: number;
        start_date: string;
        end_date: string;
        appointments_status_id: number;
      }
    >({
      query: (params) => ({
        url: "/appointments/getVisitsByUserId",
        method: "POST",
        body: params,
      }),
      providesTags: ["Leads"],
    }),
    bulkImportLeads: builder.mutation<
      BulkImportLeadsResponse,
      BulkImportLeadsRequest
    >({
      query: (body) => ({
        url: "/leads/bulkImport",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Leads"],
    }),
    getAllProjectEmAndRmData: builder.query<ProjectEmAndRmData[], void>({
      query: () => ({
        url: "/leads/getAllProjectEmAndRmData",
        method: "POST",
        body: {},
      }),
      providesTags: ["Leads"],
    }),
    createSurgery: builder.mutation<CreateSurgeryResponse, CreateSurgeryRequest>({
      query: (body) => ({
        url: "/leadSurgeries/createSurgery",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        "Leads",
        { type: "Leads", id: arg.lead_uuid },
        { type: "Leads", id: `surgeries-${arg.lead_uuid}` },
      ],
    }),
    updateSurgery: builder.mutation<UpdateSurgeryResponse, UpdateSurgeryRequest>({
      query: (body) => ({
        url: "/leadSurgeries/updateSurgery",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Leads"],
    }),
    getSurgeriesByLeadUuid: builder.query<
      GetSurgeriesByLeadUuidResponse,
      { lead_uuid: string; offset?: number }
    >({
      query: (body) => ({
        url: "/leadSurgeries/getSurgeriesByLeadUuid",
        method: "POST",
        body: {
          offset: 0,
          ...body,
        },
      }),
      providesTags: (result, error, arg) => [
        { type: "Leads", id: `surgeries-${arg.lead_uuid}` },
        "Leads",
      ],
    }),
  }),
  // Turbopack can re-evaluate this module during Fast Refresh. Replacing the
  // identical definitions prevents duplicate endpoint warnings in dev.
  overrideExisting: process.env.NODE_ENV === "development",
});

export const {
  useGetLeadsQuery,
  useGetLeadByIdQuery,
  useGetLeadObjectionDetailsAndChecklistQuery,
  useGetLeadDetailsByLeadUuidQuery,
  useUpdateLeadObjectionsMutation,
  useGetLeadDetailsByPhoneNumberQuery,
  useGetEmLeadsByRmIdQuery,
  useGetLeadStatsByUserIdQuery,
  useGetLeadsAndObjectionsByCustomerIdQuery,
  useCreateLeadMutation,
  useUpdateLeadMutation,
  useBulkAssignLeadsToRmMutation,
  useBulkAssignLeadsToEmMutation,
  useDeleteLeadMutation,
  useScheduleVisitMutation,
  useGetLeadsByCustomerUuidQuery,
  useGetLeadsByRmIdQuery,
  useGetLeadsByEmIdQuery,
  useAddLeadActivityMutation,
  useSendWhatsappMessageNotificationMutation,
  useSendCallSummaryCompleteNotificationMutation,
  useCreateLeadNextBestActionsMutation,
  useCreateLeadConsolidatedCallSummaryMutation,
  useCreateLeadProjectScoreMutation,
  useUpdateLeadProjectScoreMutation,
  useDeleteLeadProjectScoreByIdMutation,
  useDeleteLeadProjectScoresByLeadMutation,
  useGetLeadProjectScoresByLeadQuery,
  useGetVisitsByUserIdQuery,
  useBulkImportLeadsMutation,
  useLazyGetLeadByIdQuery,
  useLazyGetLeadsQuery,
  useGetAllProjectEmAndRmDataQuery,
  useCreateSurgeryMutation,
  useUpdateSurgeryMutation,
  useGetSurgeriesByLeadUuidQuery,
  useLazyGetSurgeriesByLeadUuidQuery,
} = leadsApi;
