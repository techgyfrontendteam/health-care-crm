import { baseApi } from '../../../app/api/baseApi';
import type { LoginRequest, LoginResponse, UpdatePasswordRequest, UpdatePasswordResponse, Role, GetUserRolesRequest, GetUserByIdRequest, GetUserByIdResponse } from '../types/index';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation<any, { login_id: string }>({
      query: (body) => ({
        url: '/auth/forgotPassword',
        method: 'POST',
        body,
      }),
    }),
    updatePassword: builder.mutation<UpdatePasswordResponse, UpdatePasswordRequest>({
      query: (body) => ({
        url: '/auth/updatePassword',
        method: 'POST',
        body,
      }),
    }),
    getUserRoles: builder.mutation<Role[], GetUserRolesRequest>({
      query: (body) => ({
        url: '/users/getUserRoles',
        method: 'POST',
        body,
      }),
    }),
    getUserById: builder.mutation<GetUserByIdResponse, GetUserByIdRequest>({
      query: (body) => ({
        url: '/users/getUserById',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useForgotPasswordMutation, useUpdatePasswordMutation, useGetUserRolesMutation, useGetUserByIdMutation } = authApi;
