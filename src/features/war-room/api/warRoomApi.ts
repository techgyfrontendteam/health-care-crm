import { baseApi } from "../../../app/api/baseApi";
import type { GetWarRoomDataRequest, GetWarRoomDataResponse } from "../types";

export const warRoomApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWarRoomData: builder.query<GetWarRoomDataResponse, GetWarRoomDataRequest>({
      query: (body) => ({
        url: "/dashBoard/getWarRoomData",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetWarRoomDataQuery } = warRoomApi;
