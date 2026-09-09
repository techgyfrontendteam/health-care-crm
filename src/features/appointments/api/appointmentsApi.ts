import { baseApi } from "../../../app/api/baseApi";
import type {
  CreateAppointmentRequest,
  GetAppointmentsByLeadUuidRequest,
  GetAppointmentsByLeadUuidResponse,
  UpdateAppointmentRequest,
} from "../types";

export const appointmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAppointment: builder.mutation<{ message: string; data?: any }, CreateAppointmentRequest>({
      query: (body) => ({
        url: "/appointments/createAppointment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Appointments", "Leads"],
    }),
    getAppointmentsByLeadUuid: builder.query<GetAppointmentsByLeadUuidResponse, GetAppointmentsByLeadUuidRequest>({
      query: (body) => ({
        url: "/appointments/getAppointmentsByLeadUuid",
        method: "POST",
        body,
      }),
      providesTags: ["Appointments"],
    }),
    updateAppointment: builder.mutation<{ message: string; data?: any }, UpdateAppointmentRequest>({
      query: (body) => ({
        url: "/appointments/updateAppointment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Appointments", "Leads"],
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useGetAppointmentsByLeadUuidQuery,
  useLazyGetAppointmentsByLeadUuidQuery,
  useUpdateAppointmentMutation,
} = appointmentsApi;
