import { baseApi } from "../../../app/api/baseApi";

export interface GetProjectStatusChecklistRequest {
  project_lead_status_id: number;
}

export interface CreateProjectStatusChecklistRequest {
  project_lead_status_id: number;
  description: string;
}

export interface UpdateProjectStatusChecklistRequest {
  checklist_id: number;
  description: string;
}

export interface DeleteProjectStatusChecklistRequest {
  checklist_id: number;
}

export interface CreateMultipleProjectStatusChecklistRequest {
  project_lead_status_id: number;
  descriptions: string[];
}

export interface DeleteMultipleProjectStatusChecklistRequest {
  checklist_ids: number[];
}

export interface ReplaceProjectStatusChecklistRequest {
  project_lead_status_id: number;
  points: string[];
}

export interface GenerateQuestionsRequest {
  text: string;
  lead_status: string;
  project_id: string;
}

export const promptApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjectStatusChecklist: builder.query<any, GetProjectStatusChecklistRequest>({
      query: (body) => ({
        url: "/master/get_project_status_checklist",
        method: "POST",
        body,
      }),
    }),
    createProjectStatusChecklist: builder.mutation<any, CreateProjectStatusChecklistRequest>({
      query: (body) => ({
        url: "/master/create_project_status_checklist",
        method: "POST",
        body,
      }),
    }),
    updateProjectStatusChecklist: builder.mutation<any, UpdateProjectStatusChecklistRequest>({
      query: (body) => ({
        url: "/master/update_project_status_checklist",
        method: "POST",
        body,
      }),
    }),
    deleteProjectStatusChecklist: builder.mutation<any, DeleteProjectStatusChecklistRequest>({
      query: (body) => ({
        url: "/master/delete_project_status_checklist",
        method: "POST",
        body,
      }),
    }),
    createMultipleProjectStatusChecklist: builder.mutation<any, CreateMultipleProjectStatusChecklistRequest>({
      query: (body) => ({
        url: "/master/create_multiple_project_status_checklist",
        method: "POST",
        body,
      }),
    }),
    deleteMultipleProjectStatusChecklist: builder.mutation<any, DeleteMultipleProjectStatusChecklistRequest>({
      query: (body) => ({
        url: "/master/delete_multiple_project_status_checklist",
        method: "POST",
        body,
      }),
    }),
    replaceProjectStatusChecklist: builder.mutation<any, ReplaceProjectStatusChecklistRequest>({
      query: (body) => ({
        url: "/master/replace_project_status_checklist",
        method: "POST",
        body,
      }),
    }),
    generateQuestions: builder.mutation<any, GenerateQuestionsRequest>({
      query: (body) => ({
        url: "/master/generate_questions",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetProjectStatusChecklistQuery,
  useLazyGetProjectStatusChecklistQuery,
  useCreateProjectStatusChecklistMutation,
  useUpdateProjectStatusChecklistMutation,
  useDeleteProjectStatusChecklistMutation,
  useCreateMultipleProjectStatusChecklistMutation,
  useDeleteMultipleProjectStatusChecklistMutation,
  useReplaceProjectStatusChecklistMutation,
  useGenerateQuestionsMutation,
} = promptApi;