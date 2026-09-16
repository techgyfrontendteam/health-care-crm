import { baseApi } from "@/shared/api/baseApi";
import type {
  CreateDoctorRequest,
  GetAllDoctorsRequest,
  GetDoctorStatsRequest,
  GetDoctorStatsResponse,
} from "../types";

export const doctorsApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDoctor: builder.mutation<{ message: string; data: any }, CreateDoctorRequest>({
      query: (body) => ({
        url: '/doctors/createDoctor',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Doctors'],
    }),
    getAllDoctors: builder.query<any, GetAllDoctorsRequest>({
      query: (body) => ({
        url: '/doctors/getAllDoctors',
        method: 'POST',
        body,
      }),
      providesTags: ['Doctors'],
    }),
    getDoctorById: builder.query<unknown, Record<string, unknown>>({
      query: (body) => ({ url: '/doctors/getDoctorById', method: 'POST', body }),
      providesTags: ['Doctors'],
    }),
    updateDoctor: builder.mutation<unknown, Record<string, unknown>>({
      query: (body) => ({ url: '/doctors/updateDoctor', method: 'POST', body }),
      invalidatesTags: ['Doctors'],
    }),
    getDoctorStats: builder.query<GetDoctorStatsResponse, GetDoctorStatsRequest>({
      query: (body) => ({
        url: '/doctors/getDoctorStats',
        method: 'POST',
        body,
      }),
      providesTags: ['Doctors'],
    }),
  }),
});

export const {
  useCreateDoctorMutation,
  useGetAllDoctorsQuery,
  useGetDoctorByIdQuery,
  useUpdateDoctorMutation,
  useGetDoctorStatsQuery,
} = doctorsApiSlice;
