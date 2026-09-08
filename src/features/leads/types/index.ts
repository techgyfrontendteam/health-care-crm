export interface LeadRemark {
  id: number;
  activity_type: string;
  remark: string;
  created_on: string;
}

export interface LeadCall {
  id: number;
  lead_uuid: string;
  from_number: string | null;
  to_number: string | null;
  call_duration_in_seconds: number | null;
  call_summary: string | null;
  call_recording_location: string | null;
  call_remarks: string | null;
  manual_call_notes: string | null;
  caller_user_id: number | null;
  caller_role_id: number | null;
  call_s3_data: string | null;
  lead_call_status_id: number;
  is_active: number;
  created_by: number;
  created_on: string;
  updated_by: number | null;
  updated_on: string | null;
}

export interface LeadVisit {
  id: number;
  lead_uuid: string;
  visit_location_url: string | null;
  visit_date_time: string | null;
  visit_remarks: string | null;
  visit_status: number;
  visit_assigned_to_rm: number | null;
  visit_assigned_to_em: number | null;
  is_active: number;
  created_by: number;
  created_on: string;
  updated_by: number | null;
  updated_on: string | null;
}

export interface LeadChat {
  id: number;
  lead_uuid: string;
  chat_summary: string | null;
  chat_file_location: string | null;
  is_active: number;
  created_by: number;
  created_on: string;
  updated_by: number | null;
  updated_on: string | null;
}

export interface Lead {
  uuid: string;
  lead_id: number;
  customer_uuid: string;
  project_id: number;
  source_id: number;
  source?: string;
  source_employee_user_id: number | null;
  project_lead_status_id?: number;
  lead_status_id?: number;
  lead_priority_id: number;
  assigned_to_rm: number | null;
  assigned_to_em: number | null;
  is_active: number;
  created_by: number;
  created_on: string;
  updated_by: number | null;
  updated_on: string | null;
  phone_number: string;
  // Additional fields from registration/edit payload
  first_name?: string;
  last_name?: string;
  email_address?: string;
  email?: string;
  occupation?: string;
  address?: string;
  city?: string;
  state?: string;
  state_id?: number;
  country?: string;
  zip?: string;
  dob?: string;
  income?: number;
  junk_reason?: string;
  customer_status_id?: number;
  hospital_branch?: string;
  branch_id?: number;
  branch?: string;
  branch_name?: string;
  followup_date?: string;
  next_followup_date?: string;
  appointment_date?: string;
  specialisation_id?: number;
  specialization?: string;
  department?: string;
  appointment_note?: string;
  lead_note?: string;
  notes?: string;
  remarks?: LeadRemark[];
  calls?: LeadCall[];
  visits?: LeadVisit[];
  chats?: LeadChat[];
  objections?: number[];
  rm_phone_number?: string;
  enquiries?: number;
  enquires?: Enquiry[];
  follow_ups?: LeadFollowUp[];
  followups?: LeadFollowUp[];
}

export interface LeadFollowUp {
  followup_id: number;
  date_time: string;
  followup_status_id: number;
  followup_type_id: number;
  user_id: number;
  remarks: string;
}

export interface Enquiry {
  uuid: string;
  lead_id: number;
  customer_uuid: string;
  project_id: number;
  project_lead_status_id: number;
  lead_quality_id?: number;
  lead_priority_id?: number;
  assigned_to_rm?: number | null;
  assigned_to_em?: number | null;
  junk_reason?: string;
  is_active?: number;
  created_by?: number;
  created_on: string;
  source_id?: number;
}

export interface CreateLeadRequest {
  project_lead_status_id?: number;
  lead_status_id?: number;
  lead_priority_id: number;
  source_id: number;
  project_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email_address: string;
  source_employee_user_id: number | null;
  assigned_to_rm: number | null;
  assigned_to_em: number | null;
  occupation: string;
  address: string;
  city: string;
  state: string;
  state_id?: number;
  country: string;
  zip: string;
  junk_reason?: string;
  dob?: string;
  income?: number;
  department?: string;
  specialisation_id?: number;
  doctor_id?: number | null;
  appointment_date?: string;
  appointment_time?: string;
  appointment_note?: string;
}

export interface UpdateLeadRequest extends CreateLeadRequest {
  uuid: string;
}

export interface GetLeadsRequest {
  status?: number[];
  project?: number[];
  rm?: number[];
  em?: number[];
  search_text?: string;
  is_rm_assigned?: number;
  is_em_assigned?: number;
  offset: number;
}

export interface PaginatedLeadsResponse {
  total_count: number;
  filtered_count: number;
  data: Lead[];
}

export type GetLeadsResponse = PaginatedLeadsResponse | Lead[];

export interface GetCustomerLeadsRequest {
  customer_uuid: string;
  offset: number;
}

export interface GetLeadByIdRequest {
  uuid: string;
}

export interface ScheduleVisitRequest {
  lead_uuid: string;
  visit_location_url: string;
  visit_date_time: string;
  visit_remarks?: string;
  visit_status: number;
  visit_assigned_to_rm: number;
  visit_assigned_to_em?: number | null;
}

export interface GetLeadsByRmIdRequest {
  assigned_to_rm: number;
  offset: number;
  is_em_assigned?: number;
  status?: number[];
  project?: number[];
  em?: number[];
  search_text?: string;
}

export interface GetLeadsByEmIdRequest {
  assigned_to_em: number;
  offset: number;
  status?: number[];
  project?: number[];
  rm?: number[];
  search_text?: string;
}

export interface AddLeadActivityRequest {
  lead_uuid: string;
  remark: string;
  activity_type: string;
}

export interface AIQuestion {
  speaker?: string;
  question?: string;
  text?: string;
  [key: string]: any;
}

export interface AISpeaker {
  name: string;
  role: string;
  initials: string;
  highlight: string;
}

export interface AIActionItem {
  task: string;
  owner: string;
  priority: string;
}

export interface AIFollowUp {
  required: boolean;
  date: string | null;
  notes: string;
}

export interface AIChecklistItem {
  point: string;
  covered: boolean;
  evidence: string;
}

export interface AIToneMood {
  moodAnalysis: string;
  moodScore: string;
}

export interface AISentiment {
  overall: string;
  score: string;
  reason: string;
  sentimentExplanation: string[];
}

export interface CallSummaryJSON {
  has_real_conversation: boolean;
  overview: string;
  sentiment: AISentiment;
  checklist: AIChecklistItem[];
  keyPoints: string[];
  speakers: AISpeaker[];
  actionItems: AIActionItem[];
  followUp: AIFollowUp;
  callOutcome: string;
  tone_based_mood_analaysis: AIToneMood;
}

export interface BulkImportLeadsRequest {
  s3_key: string;
}

export interface BulkImportLeadsResponse {
  message?: string;
  total?: number | string;
  imported?: number | string;
  failed?: number | string;
  total_records?: number | string;
  success_count?: number | string;
  skipped_count?: number | string;
  [key: string]: any;
}

export interface ProjectEmData {
  id: number;
  em_first_name: string;
  em_last_name: string;
}

export interface ProjectRmData {
  id: number;
  rm_first_name: string;
  rm_last_name: string;
  em_data: ProjectEmData[];
}

export interface ProjectEmAndRmData {
  project_id: number;
  rm_data: ProjectRmData[];
}
