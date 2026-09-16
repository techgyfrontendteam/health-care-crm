import { baseApi } from "@/shared/api/baseApi";

export const callsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyTelephonyProfile: builder.query<any, void>({
      query: () => ({ url: "/tataTele/getMyTelephonyProfile", method: "POST", body: {} }),
      providesTags: ["Telephony"],
    }),
    getAllTelephonyAgents: builder.query<any, Record<string, unknown> | void>({
      query: (body = {}) => ({ url: "/tataTele/getAllAgents", method: "POST", body }),
      providesTags: ["Telephony"],
    }),
    initiateClickToCall: builder.mutation<any, { customer_uuid: string; lead_uuid?: string; agent_id: number }>({
      query: (payload) => ({
        url: "/tataTele/click-to-call",
        method: "POST",
        body: payload,
      }),
    }),
    getCallRecords: builder.mutation<any, { from_date: string; to_date: string; limit?: number; offset?: number }>({
      query: (payload) => ({
        url: "/tataTele/call-records",
        method: "POST",
        body: {
          limit: 20,
          offset: 0,
          ...payload,
        },
      }),
    }),
    getTelephonyProviders: builder.mutation<any, void>({
      query: () => ({
        url: "/tataTele/getTelephonyProviders",
        method: "POST",
      }),
    }),
    getExtensionTypes: builder.mutation<any, void>({
      query: () => ({
        url: "/tataTele/getExtensionTypes",
        method: "POST",
      }),
    }),
    upsertTelephonyAgent: builder.mutation<any, {
      user_id: number;
      provider_id: number;
      agent_number: string;
      smartflo_agent_id?: string;
      caller_id: string;
      extension_type_id: number;
      is_active?: number;
    }>({
      query: (payload) => ({
        url: "/tataTele/upsertTelephonyAgent",
        method: "POST",
        body: {
          is_active: 1,
          smartflo_agent_id: "",
          ...payload,
        },
      }),
      invalidatesTags: ["Telephony"],
    }),
    createInboundQueue: builder.mutation<any, Record<string, unknown>>({
      query: (body) => ({ url: "/tataTele/inbound-queue", method: "POST", body }),
      invalidatesTags: ["Telephony"],
    }),
    getInboundQueues: builder.query<any, Record<string, unknown> | void>({
      query: (body = {}) => ({ url: "/tataTele/getInboundQueues", method: "POST", body }),
      providesTags: ["Telephony"],
    }),
    createCall: builder.mutation<any, {
      lead_uuid: string;
      call_id: string;
      from_number: string;
      to_number: string;
      call_duration_in_seconds: number;
      call_summary: string;
      call_remarks: string;
      manual_call_notes: string;
      caller_user_id: number;
      caller_role_id: number;
      call_s3_data: string;
      lead_call_status_id: number;
      created_on: string;
    }>({
      query: (payload) => ({
        url: "/leadCalls/createCall",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Leads"],
    }),
    getCallDetailsByCallId: builder.query<unknown, Record<string, unknown>>({
      query: (body) => ({ url: "/leadCalls/getCallDetailsByCallId", method: "POST", body }),
      providesTags: ["Leads"],
    }),
    getCallHistoryByPhoneNumber: builder.query<unknown, Record<string, unknown>>({
      query: (body) => ({ url: "/leadCalls/getCallHistoryByPhoneNumber", method: "POST", body }),
      providesTags: ["Leads"],
    }),
    getCallHistoryByUserId: builder.query<unknown, Record<string, unknown>>({
      query: (body) => ({ url: "/leadCalls/getCallHistoryByUserId", method: "POST", body }),
      providesTags: ["Leads"],
    }),
    getCallsByLeadUuid: builder.query<unknown, Record<string, unknown>>({
      query: (body) => ({ url: "/leadCalls/getCallsByLeadUuid", method: "POST", body }),
      providesTags: ["Leads"],
    }),
    updateCall: builder.mutation<unknown, Record<string, unknown>>({
      query: (body) => ({ url: "/leadCalls/updateCall", method: "POST", body }),
      invalidatesTags: ["Leads"],
    }),
  }),
  overrideExisting: false,
});

export const { 
  useGetMyTelephonyProfileQuery,
  useGetAllTelephonyAgentsQuery,
  useInitiateClickToCallMutation, 
  useGetCallRecordsMutation,
  useGetTelephonyProvidersMutation,
  useGetExtensionTypesMutation,
  useUpsertTelephonyAgentMutation,
  useCreateInboundQueueMutation,
  useGetInboundQueuesQuery,
  useCreateCallMutation,
  useGetCallDetailsByCallIdQuery,
  useGetCallHistoryByPhoneNumberQuery,
  useGetCallHistoryByUserIdQuery,
  useGetCallsByLeadUuidQuery,
  useUpdateCallMutation,
} = callsApi;
