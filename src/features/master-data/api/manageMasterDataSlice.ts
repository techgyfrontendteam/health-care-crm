import { baseApi } from '../../../app/api/baseApi';

import type {
  CreateLeadStatusRequest,
  CreateProjectWiseLeadStatusRequest,
  UpdateLeadStatusRequest,
  CreateContentTypeRequest,
  UpdateContentTypeRequest,
  CreateLeadFollowUpTypeRequest,
  UpdateLeadFollowUpTypeRequest,
  CreateObjectionRequest,
  UpdateObjectionRequest,
  CreateProjectScoringRuleRequest,
  UpdateProjectScoringRuleRequest,
  CreateProjectContentRequest,
  DeleteProjectContentRequest,
  GetProjectWiseContentsRequest,
  GetProjectWiseContentsResponse,
} from './manageMasterDataTypes';

export const manageMasterDataSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLeadStatus: builder.mutation<any, CreateLeadStatusRequest>({
      query: (body) => ({
        url: '/master/createLeadStatus',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Master'],
    }),
    createProjectWiseLeadStatus: builder.mutation<any, CreateProjectWiseLeadStatusRequest>({
      query: (body) => ({
        url: '/master/createProjectWiseLeadStatus',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Master'],
    }),
    updateLeadStatus: builder.mutation<any, UpdateLeadStatusRequest>({
      query: (body) => ({
        url: '/master/updateLeadStatus',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Master'],
    }),
    createContentType: builder.mutation<any, CreateContentTypeRequest>({
      query: (body) => ({
        url: '/master/createContentType',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Master'],
    }),
    updateContentType: builder.mutation<any, UpdateContentTypeRequest>({
      query: (body) => ({
        url: '/master/updateContentType',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Master'],
    }),
    createLeadFollowUpType: builder.mutation<any, CreateLeadFollowUpTypeRequest>({
      query: (body) => ({
        url: '/master/createLeadFollowUpType',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Master'],
    }),
    updateLeadFollowUpType: builder.mutation<any, UpdateLeadFollowUpTypeRequest>({
      query: (body) => ({
        url: '/master/updateLeadFollowUpType',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Master'],
    }),
    createObjections: builder.mutation<any, CreateObjectionRequest>({
      query: (body) => ({
        url: '/master/createObjections',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Master'],
    }),
    updateObjections: builder.mutation<any, UpdateObjectionRequest>({
      query: (body) => ({
        url: '/master/updateObjections',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Master'],
    }),
    getProjectBasedScoringRules: builder.query<any, void>({
      query: () => ({
        url: '/master/getProjectBasedscoringRules',
        method: 'POST',
        body: {},
      }),
      providesTags: ['Master'],
    }),
    createProjectScoringRules: builder.mutation<any, CreateProjectScoringRuleRequest>({
      query: (body) => ({
        url: '/master/createProjectScoringRules',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Master'],
    }),
    updateProjectScoringRules: builder.mutation<any, UpdateProjectScoringRuleRequest>({
      query: (body) => ({
        url: '/master/updateProjectScoringRules',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Master'],
    }),
    createProjectContents: builder.mutation<any, CreateProjectContentRequest>({
      query: (body) => ({
        url: '/master/createProjectContents',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Master'],
    }),
    deleteProjectContents: builder.mutation<any, DeleteProjectContentRequest>({
      query: (body) => ({
        url: '/master/deleteProjectContents',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Master'],
    }),
    getProjectWiseContents: builder.mutation<GetProjectWiseContentsResponse, GetProjectWiseContentsRequest>({
      query: (body) => ({
        url: '/master/getProjectWiseContents',
        method: 'POST',
        body,
      }),
    }),
    sendWhatsappMessage: builder.mutation<any, any>({
      query: (body) => ({
        url: '/master/send_whatsapp_message',
        method: 'POST',
        body,
      }),
    }),
    getProjectWiseTemplates: builder.mutation<any, { project_id: number }>({
      query: (body) => ({
        url: '/templates/getProjectWiseTemplates',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { 
  useCreateLeadStatusMutation,
  useCreateProjectWiseLeadStatusMutation,
  useUpdateLeadStatusMutation,
  useCreateContentTypeMutation,
  useUpdateContentTypeMutation,
  useCreateLeadFollowUpTypeMutation,
  useUpdateLeadFollowUpTypeMutation,
  useCreateObjectionsMutation,
  useUpdateObjectionsMutation,
  useGetProjectBasedScoringRulesQuery,
  useCreateProjectScoringRulesMutation,
  useUpdateProjectScoringRulesMutation,
  useCreateProjectContentsMutation,
  useDeleteProjectContentsMutation,
  useGetProjectWiseContentsMutation,
  useSendWhatsappMessageMutation,
  useGetProjectWiseTemplatesMutation,
} = manageMasterDataSlice;
