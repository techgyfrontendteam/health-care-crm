import { baseApi } from "../../../app/api/baseApi";
import type { CreateDoctorRequest } from "../types";

export const doctorsApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createDoctor: builder.mutation<{ message: string; data: any }, CreateDoctorRequest>({
      query: (body) => ({
        url: '/doctors/createDoctor',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateDoctorMutation } = doctorsApiSlice;
