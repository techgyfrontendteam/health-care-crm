import { baseApi } from "../../../app/api/baseApi";
import type {
  DailySalesReportCardDataRequest,
  DailySalesReportCardDataResponse,
  DailySalesReportDataRequest,
  DailySalesReportDataResponse,
  DownloadDailySalesReportDataRequest,
  DownloadDailySalesReportDataResponse,
  DownloadSourceQualityBreakdownDataRequest,
  DownloadSourceQualityBreakdownDataResponse,
  LeadSourceReportsCardDataRequest,
  LeadSourceReportsCardDataResponse,
  SourceQualityBreakdownDataRequest,
  SourceQualityBreakdownDataResponse,
  ProjectWiseObjectionReportCardDataRequest,
  ProjectWiseObjectionReportCardDataResponse,
  ProjectWiseObjectionDataRequest,
  ProjectWiseObjectionDataResponse,
  DownloadProjectWiseObjectionDataRequest,
  DownloadProjectWiseObjectionDataResponse,
  PersonaSegmentReportCardDataRequest,
  PersonaSegmentReportCardDataResponse,
  PersonaSegmentAnalysisRequest,
  PersonaSegmentAnalysisResponse,
  DownloadPersonaSegmentAnalysisRequest,
  DownloadPersonaSegmentAnalysisResponse,
  GetAllCampaignsDataRequest,
  GetAllCampaignsDataResponse,
  GetAdsPerformanceToBookingDataRequest,
  GetAdsPerformanceToBookingDataResponse,
  GetCampaignsFunnelDataRequest,
  GetCampaignsFunnelDataResponse,
  DownloadCampaignPerformanceDataRequest,
  DownloadCampaignPerformanceDataResponse,
} from "../types";

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDailySalesReportCardData: builder.query<DailySalesReportCardDataResponse, DailySalesReportCardDataRequest | void>({
      query: (body = {}) => ({
        url: "/reports/getDailySalesReportCardData",
        method: "POST",
        body,
      }),
    }),
    getDailySalesReportData: builder.query<DailySalesReportDataResponse, DailySalesReportDataRequest | void>({
      query: (body = {}) => ({
        url: "/reports/getDailySalesReportData",
        method: "POST",
        body,
      }),
    }),
    downloadDailySalesReportData: builder.mutation<DownloadDailySalesReportDataResponse, DownloadDailySalesReportDataRequest | void>({
      query: (body = {}) => ({
        url: "/reports/downloadDailySalesReportData",
        method: "POST",
        body,
      }),
    }),
    getProjectWiseObjectionReportByCardsData: builder.query<ProjectWiseObjectionReportCardDataResponse, ProjectWiseObjectionReportCardDataRequest | void>({
      query: (body = {}) => ({
        url: "/reports/getProjectWiseObjectionReportByCardsData",
        method: "POST",
        body,
      }),
    }),
    getProjectWiseObjectionData: builder.query<ProjectWiseObjectionDataResponse, ProjectWiseObjectionDataRequest | void>({
      query: (body = {}) => ({
        url: "/reports/getProjectWiseObjectionData",
        method: "POST",
        body,
      }),
    }),
    downloadProjectWiseObjectionData: builder.mutation<DownloadProjectWiseObjectionDataResponse, DownloadProjectWiseObjectionDataRequest | void>({
      query: (body = {}) => ({
        url: "/reports/downloadProjectWiseObjectionData",
        method: "POST",
        body,
      }),
    }),
    getPersonaSegmentCardsData: builder.query<PersonaSegmentReportCardDataResponse, PersonaSegmentReportCardDataRequest | void>({
      query: (body = {}) => ({
        url: "/reports/getPersonaSegmentCardsData",
        method: "POST",
        body,
      }),
    }),
    getPersonaSegmentAnalysis: builder.query<PersonaSegmentAnalysisResponse, PersonaSegmentAnalysisRequest | void>({
      query: (body = {}) => ({
        url: "/reports/getPersonaSegmentAnalysis",
        method: "POST",
        body,
      }),
    }),
    downloadPersonaSegmentAnalysis: builder.mutation<DownloadPersonaSegmentAnalysisResponse, DownloadPersonaSegmentAnalysisRequest | void>({
      query: (body = {}) => ({
        url: "/reports/downloadPersonaSegmentAnalysis",
        method: "POST",
        body,
      }),
    }),
    getLeadSourceReportsCardData: builder.query<LeadSourceReportsCardDataResponse, LeadSourceReportsCardDataRequest>({
      query: (body) => ({
        url: "/reports/getLeadSourceReportsCardData",
        method: "POST",
        body,
      }),
    }),
    getSourceQualityBreakdownData: builder.query<SourceQualityBreakdownDataResponse, SourceQualityBreakdownDataRequest>({
      query: (body) => ({
        url: "/reports/getSourceQualityBreakdownData",
        method: "POST",
        body,
      }),
    }),
    downloadSourceQualityBreakdownData: builder.mutation<DownloadSourceQualityBreakdownDataResponse, DownloadSourceQualityBreakdownDataRequest>({
      query: (body) => ({
        url: "/reports/downloadSourceQualityBreakdownData",
        method: "POST",
        body,
      }),
    }),
    getAllCampaignsData: builder.query<GetAllCampaignsDataResponse, GetAllCampaignsDataRequest | void>({
      query: (body = {}) => {
        const cleanedBody: any = {};
        cleanedBody.project_id = (body && body.project_id && body.project_id.length > 0) ? body.project_id : [1];
        return {
          url: "/marketing/getAllcampaignsData",
          method: "POST",
          body: cleanedBody,
        };
      },
    }),
    getAdsPerformanceToBookingData: builder.query<GetAdsPerformanceToBookingDataResponse, GetAdsPerformanceToBookingDataRequest | void>({
      query: (body = {}) => {
        const cleanedBody: any = {};
        cleanedBody.project_id = (body && body.project_id) ? body.project_id : 1;
        if (body && body.campaign_id) {
          cleanedBody.campaign_id = body.campaign_id;
        }
        return {
          url: "/marketing/getAdsPerformanceToBookingData",
          method: "POST",
          body: cleanedBody,
        };
      },
    }),
    getCampaignsFunnelData: builder.query<GetCampaignsFunnelDataResponse, GetCampaignsFunnelDataRequest | void>({
      query: (body = {}) => {
        const cleanedBody: any = {};
        cleanedBody.project_id = (body && body.project_id) ? body.project_id : 1;
        if (body && body.campaign_id) {
          cleanedBody.campaign_id = body.campaign_id;
        }
        return {
          url: "/marketing/getcampaignsFunnelData",
          method: "POST",
          body: cleanedBody,
        };
      },
    }),
    downloadCampaignPerformanceData: builder.mutation<DownloadCampaignPerformanceDataResponse, DownloadCampaignPerformanceDataRequest | void>({
      query: (body = {}) => {
        const cleanedBody: any = {};
        cleanedBody.project_id = (body && body.project_id) ? body.project_id : 1;
        if (body && body.campaign_id) {
          cleanedBody.campaign_id = body.campaign_id;
        }
        return {
          url: "/reports/downloadCampaignPerformanceData",
          method: "POST",
          body: cleanedBody,
        };
      },
    }),
  }),
});

export const {
  useGetDailySalesReportCardDataQuery,
  useGetDailySalesReportDataQuery,
  useDownloadDailySalesReportDataMutation,
  useGetLeadSourceReportsCardDataQuery,
  useGetSourceQualityBreakdownDataQuery,
  useDownloadSourceQualityBreakdownDataMutation,
  useGetProjectWiseObjectionReportByCardsDataQuery,
  useGetProjectWiseObjectionDataQuery,
  useDownloadProjectWiseObjectionDataMutation,
  useGetPersonaSegmentCardsDataQuery,
  useGetPersonaSegmentAnalysisQuery,
  useDownloadPersonaSegmentAnalysisMutation,
  useGetAllCampaignsDataQuery,
  useGetAdsPerformanceToBookingDataQuery,
  useGetCampaignsFunnelDataQuery,
  useDownloadCampaignPerformanceDataMutation,
} = reportsApi;

