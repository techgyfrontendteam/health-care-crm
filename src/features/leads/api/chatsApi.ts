import { baseApi } from '@/shared/api/baseApi';

export const chatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation<unknown, Record<string, unknown>>({
      query: (body) => ({ url: '/leadChats/createChat', method: 'POST', body }),
      invalidatesTags: ['Leads'],
    }),
    getChatsByLeadUuid: builder.query<unknown, Record<string, unknown>>({
      query: (body) => ({ url: '/leadChats/getChatsByLeadUuid', method: 'POST', body }),
      providesTags: ['Leads'],
    }),
    updateChat: builder.mutation<unknown, Record<string, unknown>>({
      query: (body) => ({ url: '/leadChats/updateChat', method: 'POST', body }),
      invalidatesTags: ['Leads'],
    }),
  }),
  overrideExisting: process.env.NODE_ENV === 'development',
});

export const {
  useCreateChatMutation,
  useGetChatsByLeadUuidQuery,
  useUpdateChatMutation,
} = chatsApi;
