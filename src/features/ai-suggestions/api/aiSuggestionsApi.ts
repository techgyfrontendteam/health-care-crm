import { baseApi } from '@/shared/api/baseApi';

export const aiSuggestionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAiSuggestResponses: builder.query<unknown, Record<string, unknown>>({
      query: (body) => ({ url: '/aiSuggest/getAiSuggestResponses', method: 'POST', body }),
    }),
  }),
  overrideExisting: process.env.NODE_ENV === 'development',
});

export const { useGetAiSuggestResponsesQuery } = aiSuggestionsApi;
