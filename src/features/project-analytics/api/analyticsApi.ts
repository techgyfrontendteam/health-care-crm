import { baseApi } from "../../../app/api/baseApi";
import type {
  GetProjectAnalysisDateWiseDataRequest,
  GetProjectAnalysisDateWiseDataResponse,
  GetProjectAnalysisDataRequest,
  GetProjectAnalysisDataResponse,
} from "../types";

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjectAnalysisDateWiseData: builder.query<
      GetProjectAnalysisDateWiseDataResponse,
      GetProjectAnalysisDateWiseDataRequest
    >({
      query: (body) => ({
        url: "/dashBoard/getProjectAnalysisDateWiseData",
        method: "POST",
        body,
      }),
    }),
    getProjectAnalysisData: builder.query<
      GetProjectAnalysisDataResponse,
      GetProjectAnalysisDataRequest
    >({
      query: (body) => ({
        url: "/dashBoard/getProjectAnalysisData",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetProjectAnalysisDateWiseDataQuery,
  useGetProjectAnalysisDataQuery,
} = analyticsApi;
