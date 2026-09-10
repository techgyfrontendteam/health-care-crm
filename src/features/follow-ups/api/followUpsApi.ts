import { baseApi } from '../../../app/api/baseApi';
import type {
  CreateFollowUpRequest,
  CreateFollowUpResponse,
  UpdateFollowupRequest,
  UpdateFollowupResponse,
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
    updateFollowUp: builder.mutation<UpdateFollowupResponse, UpdateFollowupRequest>({
      query: (body) => ({
        url: '/leadFollowups/updateFollowup',
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
  useUpdateFollowUpMutation,
} = followUpsApi;
