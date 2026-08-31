import { baseApi } from '../../../app/api/baseApi';
import type {
  CreateUserRequest,
  CreateUserResponse,
  GetUsersRequest,
  GetUsersResponse,
  User,
  GetEmDashboardDateWiseDataRequest,
  GetEmDashboardDateWiseDataResponse,
  GetEmDashboardTodaysDataRequest,
  GetEmDashboardTodaysDataResponse,
  GetRmDashboardDateWiseDataRequest,
  GetRmDashboardDateWiseDataResponse,
  GetStaleLeadsRequest,
  GetStaleLeadsResponse,
  GetEscalatedLeadsRequest,
  GetEscalatedLeadsResponse,
} from '../types';

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsersByRoleId: builder.query<User[], { role_id: number; offset: number }>({
      query: (body) => ({
        url: '/users/getAllUsersByRoleId',
        method: 'POST',
        body,
      }),
      providesTags: ['Users'],
    }),
    getUsers: builder.query<GetUsersResponse, GetUsersRequest>({
      query: (params) => ({
        url: '/users/getUsers',
        method: 'GET',
        params,
      }),
      providesTags: ['Users'],
    }),
    createUser: builder.mutation<CreateUserResponse, CreateUserRequest>({
      query: (body) => ({
        url: '/users/createUser',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation<{ message: string }, Partial<CreateUserRequest> & { id: number }>({
      query: (body) => ({
        url: '/users/updateUser',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: '/users/deleteUser',
        method: 'POST',
        body: { id },
      }),
      invalidatesTags: ['Users'],
    }),
    getReportees: builder.query<User[], { reporting_manager_id: number; offset: number }>({
      query: (body) => ({
        url: '/users/getReportees',
        method: 'POST',
        body,
      }),
      providesTags: ['Users'],
    }),
    getAllUsers: builder.query<User[], { offset: number }>({
      query: (body) => ({
        url: '/users/getAllUsers',
        method: 'POST',
        body,
      }),
      providesTags: ['Users'],
    }),
    getEmDashboardDateWiseData: builder.query<GetEmDashboardDateWiseDataResponse, GetEmDashboardDateWiseDataRequest>({
      query: (body) => ({
        url: '/dashBoard/getEmDashboardDateWiseData',
        method: 'POST',
        body,
      }),
    }),
    getEmDashboardTodaysData: builder.query<GetEmDashboardTodaysDataResponse, GetEmDashboardTodaysDataRequest>({
      query: (body) => ({
        url: '/dashBoard/getEmDashboardtodaysData',
        method: 'POST',
        body,
      }),
    }),
    getRmDashboardDateWiseData: builder.query<GetRmDashboardDateWiseDataResponse, GetRmDashboardDateWiseDataRequest>({
      query: (body) => ({
        url: '/dashBoard/getRmDashboardDateWiseData',
        method: 'POST',
        body,
      }),
    }),
    getStaleLeads: builder.query<GetStaleLeadsResponse, GetStaleLeadsRequest>({
      query: (body) => ({
        url: '/leads/getStaleLeads',
        method: 'POST',
        body,
      }),
    }),
    getEscalatedLeads: builder.query<GetEscalatedLeadsResponse, GetEscalatedLeadsRequest>({
      query: (body) => ({
        url: '/leads/getEscallatedLeads',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetAllUsersByRoleIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetReporteesQuery,
  useGetAllUsersQuery,
  useGetEmDashboardDateWiseDataQuery,
  useGetEmDashboardTodaysDataQuery,
  useGetRmDashboardDateWiseDataQuery,
  useGetStaleLeadsQuery,
  useGetEscalatedLeadsQuery,
} = usersApi;
