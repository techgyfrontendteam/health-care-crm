import { baseApi } from "../../../app/api/baseApi";
import { Doctor, CreateDoctorRequest, UpdateDoctorRequest } from "../types";
import { mockDoctors } from "../data/doctorsData";

export const doctorsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query<Doctor[], void>({
      queryFn: async () => {
        // Mock fallback for API fetching until backend endpoints go live
        return { data: mockDoctors };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Doctor" as const, id })),
              { type: "Doctor", id: "LIST" },
            ]
          : [{ type: "Doctor", id: "LIST" }],
    }),
    getDoctorById: builder.query<Doctor | undefined, number>({
      queryFn: async (id) => {
        const found = mockDoctors.find((d) => d.id === id);
        return { data: found };
      },
      providesTags: (result, error, id) => [{ type: "Doctor", id }],
    }),
    createDoctor: builder.mutation<Doctor, CreateDoctorRequest>({
      queryFn: async (newDoctor) => {
        const created: Doctor = {
          ...newDoctor,
          id: Date.now(),
          uuid: `doc-uuid-${Date.now()}`,
          rating: 5.0,
          patients_count: 0,
          is_active: 1,
          created_at: new Date().toISOString(),
          image_url:
            newDoctor.image_url ||
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop",
        };
        mockDoctors.unshift(created);
        return { data: created };
      },
      invalidatesTags: [{ type: "Doctor", id: "LIST" }],
    }),
    updateDoctor: builder.mutation<Doctor, UpdateDoctorRequest>({
      queryFn: async (updatedFields) => {
        const index = mockDoctors.findIndex((d) => d.id === updatedFields.id);
        if (index !== -1) {
          mockDoctors[index] = { ...mockDoctors[index], ...updatedFields };
          return { data: mockDoctors[index] };
        }
        return { error: { status: 404, data: "Doctor not found" } };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Doctor", id },
        { type: "Doctor", id: "LIST" },
      ],
    }),
    deleteDoctor: builder.mutation<{ success: boolean; id: number }, number>({
      queryFn: async (id) => {
        const index = mockDoctors.findIndex((d) => d.id === id);
        if (index !== -1) {
          mockDoctors.splice(index, 1);
        }
        return { data: { success: true, id } };
      },
      invalidatesTags: [{ type: "Doctor", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorsApi;
