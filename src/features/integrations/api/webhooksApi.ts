import { baseApi } from '@/shared/api/baseApi';

/**
 * Webhook endpoints are normally invoked by external providers. These
 * mutations expose them to the client for authorized testing and operational
 * tooling without mixing provider callbacks into regular feature APIs.
 */
export const webhooksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    handleTataTeleInboundCall: builder.mutation<unknown, Record<string, unknown>>({
      query: (body) => ({
        url: '/tataTele/handleInboundCall',
        method: 'POST',
        body,
      }),
    }),
    handleTataTeleWebhook: builder.mutation<unknown, Record<string, unknown>>({
      query: (body) => ({
        url: '/tataTele/webhook',
        method: 'POST',
        body,
      }),
    }),
    submitHealthcareCallOutcome: builder.mutation<unknown, Record<string, unknown>>({
      query: (body) => ({
        url: '/healthcare/call-outcome',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: process.env.NODE_ENV === 'development',
});

export const {
  useHandleTataTeleInboundCallMutation,
  useHandleTataTeleWebhookMutation,
  useSubmitHealthcareCallOutcomeMutation,
} = webhooksApi;
