import { baseApi } from "../../../app/api/baseApi";

export const callsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initiateClickToCall: builder.mutation<any, { customer_uuid: string; lead_uuid?: string }>({
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
  }),
  overrideExisting: false,
});

export const { 
  useInitiateClickToCallMutation, 
  useGetCallRecordsMutation,
  useGetTelephonyProvidersMutation,
  useGetExtensionTypesMutation,
  useUpsertTelephonyAgentMutation,
} = callsApi;


