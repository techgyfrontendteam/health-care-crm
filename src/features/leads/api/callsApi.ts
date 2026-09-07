import { baseApi } from "../../../app/api/baseApi";

export const callsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initiateClickToCall: builder.mutation<any, { lead_number: string }>({
      query: (payload) => ({
        url: "/initiate-click-to-call",
        method: "POST",
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useInitiateClickToCallMutation } = callsApi;
