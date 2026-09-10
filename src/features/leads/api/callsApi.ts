import { baseApi } from "../../../app/api/baseApi";

export const callsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initiateClickToCall: builder.mutation<any, { customer_uuid: string; lead_uuid?: string; agent_id: number }>({
      query: (payload) => ({
        url: "https://upload-uncouple-rephrase.ngrok-free.dev/tataTele/click-to-call",
        method: "POST",
        body: payload,
      }),
    }),
    getCallRecords: builder.mutation<any, { from_date: string; to_date: string; limit?: number; offset?: number }>({
      query: (payload) => ({
        url: "https://upload-uncouple-rephrase.ngrok-free.dev/tataTele/call-records",
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
        url: "https://upload-uncouple-rephrase.ngrok-free.dev/tataTele/getTelephonyProviders",
        method: "POST",
      }),
    }),
    getExtensionTypes: builder.mutation<any, void>({
      query: () => ({
        url: "https://upload-uncouple-rephrase.ngrok-free.dev/tataTele/getExtensionTypes",
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
        url: "https://upload-uncouple-rephrase.ngrok-free.dev/tataTele/upsertTelephonyAgent",
        method: "POST",
        body: {
          is_active: 1,
          smartflo_agent_id: "",
          ...payload,
        },
      }),
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
  }),
  overrideExisting: false,
});

export const { 
  useInitiateClickToCallMutation, 
  useGetCallRecordsMutation,
  useGetTelephonyProvidersMutation,
  useGetExtensionTypesMutation,
  useUpsertTelephonyAgentMutation,
  useCreateCallMutation,
} = callsApi;


