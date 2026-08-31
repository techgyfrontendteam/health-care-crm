import { baseApi } from '../../../app/api/baseApi';
import type {
  CreateFollowUpRequest,
  CreateFollowUpResponse,
  GetAllFollowupsByUserIdRequest,
  GetAllFollowupsByUserIdResponse,
} from '../types';

export const followUpsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFollowupsByUserId: builder.query<GetAllFollowupsByUserIdResponse, GetAllFollowupsByUserIdRequest>({
      query: (body) => ({
        url: '/leadFollowups/getAllFollowupsByUserId',
        method: 'POST',
        body,
      }),
      providesTags: ['FollowUps'],
    }),
    createFollowUp: builder.mutation<CreateFollowUpResponse, CreateFollowUpRequest>({
      query: (body) => ({
        url: '/leadFollowups/createFollowUp',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FollowUps', 'Leads'],
    }),
  }),
});

export const {
  useGetAllFollowupsByUserIdQuery,
  useLazyGetAllFollowupsByUserIdQuery,
  useCreateFollowUpMutation,
} = followUpsApi;
