export interface CreateFollowUpRequest {
  lead_uuid: string;
  user_id: number;
  followup_type_id: number;
  followup_date_time: string;
  followup_status_id: number;
  remarks: string;
}

export interface CreateFollowUpResponse {
  message: string;
  followup_id: number;
}

export interface UpdateFollowupRequest {
  lead_uuid: string;
  followup_id: number;
  remarks: string;
  user_id: number;
}

export interface UpdateFollowupResponse {
  message: string;
  followup_id?: number;
}

export interface GetAllFollowupsByUserIdRequest {
  user_id: number[];
  followup_status_id?: number;
  start_date: string;
  end_date: string;
  offset: number | string;
}

export interface FollowUpItem {
  lead_uuid: string;
  lead_id: string;
  first_name: string;
  last_name: string;
  followup_date_time: string;
  followup_status_id: number;
  follow_type_id: number;
  remarks: string;
}

export interface GetAllFollowupsByUserIdResponse {
  followups: FollowUpItem[];
}
