export interface CreateLeadStatusRequest {
  code: string;
  description: string;
  user_id: number | null;
}

export interface CreateProjectWiseLeadStatusRequest {
  project_id: number;
  lead_status_id: number[];
  user_id: number | null;
}

export interface UpdateLeadStatusRequest {
  id: number;
  code?: string;
  description: string;
  user_id: number | null;
}

export interface CreateContentTypeRequest {
  code: string;
  description: string;
  user_id: number | null;
}

export interface UpdateContentTypeRequest {
  id: number;
  code?: string;
  description: string;
  user_id: number | null;
}

export interface CreateLeadFollowUpTypeRequest {
  code: string;
  description: string;
  user_id: number | null;
}

export interface UpdateLeadFollowUpTypeRequest {
  id: number;
  code?: string;
  description: string;
  user_id: number | null;
}

export interface CreateObjectionRequest {
  code: string;
  description: string;
  user_id: number | null;
}

export interface UpdateObjectionRequest {
  id: number;
  code?: string;
  description: string;
  user_id: number | null;
}

export interface CreateProjectScoringRuleRequest {
  project_id: number;
  desc: string;
  score: number;
  user_id: number | null;
}

export interface UpdateProjectScoringRuleRequest {
  id: number;
  project_id: number;
  desc: string;
  score: number;
  user_id: number | null;
}

export interface CreateProjectContentRequest {
  project_id: number;
  content_type_id: number;
  s3_key: string;
}

export interface DeleteProjectContentRequest {
  ids: number[];
}

export interface GetProjectWiseContentsRequest {
  project_ids: number[];
}

export interface ProjectContentItem {
  id: number;
  content_type_id: number;
  content_type_description: string;
  s3_key: string;
  is_active: number;
  created_on: string;
}

export interface ProjectWiseContentData {
  project_id: number;
  contents: ProjectContentItem[];
}

export interface GetProjectWiseContentsResponse {
  success: boolean;
  data: ProjectWiseContentData[];
}
