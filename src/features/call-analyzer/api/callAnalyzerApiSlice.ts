import { baseApi } from "../../../app/api/baseApi";

export interface AnalyzeCallRequest {
  lead_uuid: string;
  lead_name: string;
  from_number: string;
  to_number: string;
  file: string;
}

export const callAnalyzerApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    analyzeCall: builder.mutation<any, AnalyzeCallRequest>({
      query: (data) => ({
        url: 'https://retaliatory-lazaro-uncaptiously.ngrok-free.dev/api/callanalyzer',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useAnalyzeCallMutation } = callAnalyzerApiSlice;
