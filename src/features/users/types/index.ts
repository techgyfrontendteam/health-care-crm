export interface User {
  id: number;
  login_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  role_id: number;
  role_code?: string;
  role_description?: string;
  is_active: number;
  created_on: string;
  updated_on: string | null;
  reporting_manager_id?: number | null;
  reportee_count?: number;
  visit_count?: number;
  assigned_visits_count?: number;
  site_visit_count?: number;
  visits?: number;
  projectName?: string;
  project_name?: string;
  project_id?: number | string;
  projectId?: number | string;
  project_ids?: (number | string)[];
}

export interface CreateUserRequest {
  login_id: string;
  password?: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  role_id: number;
  reporting_manager_id?: number | null;
  project_ids?: number[];
  profile_pic_location?: string | null;
}

export interface CreateUserResponse {
  success: boolean;
  message?: string;
  data?: User;
}

export interface GetUsersRequest {
  role_id?: number;
  offset?: number;
  limit?: number;
  search?: string;
}

export interface GetUsersResponse {
  users: User[];
  total: number;
}

export interface GetEmDashboardDateWiseDataRequest {
  start_date: string;
  end_date: string;
  em_ids: number[];
  project_ids?: number[];
}

export interface EmMissedFollowUps {
  overdue_count?: number;
  count?: number;
  avg_delay: string | number;
}

export interface EmLeadQualityDistribution {
  total_leads: number;
  hot_leads: number;
  warm_leads: number;
  cold_leads: number;
}

export interface EmStatusDistributionItem {
  status_id?: number;
  status_name?: string;
  name?: string;
  label?: string;
  count: number;
}

export interface EmSiteVisitOverview {
  scheduled: number;
  completed: number;
}

export interface EmRecentObjectionItem {
  customer_first_name?: string;
  customer_last_name?: string;
  customer_name?: string;
  last_contacted_on?: string;
  last_contacted?: string;
  objections_count: number;
  objection_types?: string[];
}

export interface EmBookingCount {
  units?: number;
  count?: number;
  target?: number;
}

export interface GetEmDashboardDateWiseDataResponse {
  missed_follow_up?: EmMissedFollowUps;
  missed_follow_ups?: EmMissedFollowUps;
  lead_quality_distribution?: EmLeadQualityDistribution;
  status_distribution?: EmStatusDistributionItem[];
  leads_by_status?: EmStatusDistributionItem[];
  site_visit_overview?: EmSiteVisitOverview;
  site_visit_statistics?: EmSiteVisitOverview;
  recent_objections?: EmRecentObjectionItem[];
  booking_count?: EmBookingCount;
  total_bookings?: EmBookingCount;
}

export interface GetEmDashboardTodaysDataRequest {
  em_ids: number[];
  date: string;
  project_ids?: number[];
}

export interface TodayFollowUpDueItem {
  first_name: string;
  last_name: string;
  follow_up_time: string;
  follow_up_type: string;
}

export interface TodaySiteVisitItem {
  first_name: string;
  last_name: string;
  em_name: string;
  site_visit_time_date: string;
}

export interface GetEmDashboardTodaysDataResponse {
  today_follow_up_due: TodayFollowUpDueItem[];
  today_site_visits: TodaySiteVisitItem[];
}

export interface GetRmDashboardDateWiseDataRequest {
  rm_ids: number[];
  start_date: string;
  end_date: string;
}

export interface RmTeamCallSummary {
  connected_calls?: number;
  connectedCalls?: number;
  missed_calls?: number;
  missedCalls?: number;
  total_calls?: number;
  avg_duration?: string;
  avgDuration?: string;
}

export interface RmPipelineFunnelInformation {
  status_id?: number;
  status_name?: string;
  count: number;
}

export interface RmLeadQualityDistribution {
  total_leads?: number;
  hot_leads?: number;
  warm_leads?: number;
  cold_leads?: number;
  junk_leads?: number;
  active_rate?: number;
  activeRate?: number;
}

export interface RmTopPerformerLeaderboardItem {
  rank?: number;
  name: string;
  leads?: number;
  follow_up?: number;
  followUp?: number;
  visits?: number;
  conversion_rate?: number;
  conversionRate?: number;
}

export interface RmEscalated {
  count: number;
}

export interface RmStale {
  count: number;
}

export interface RmTopObjectionItem {
  label: string;
  percentage: number;
}

export interface RmTopBookingItem {
  name: string;
  role: string;
  bookings: number;
}

export interface GetRmDashboardDateWiseDataResponse {
  team_call_summary?: RmTeamCallSummary;
  pipeline_funnel_information?: RmPipelineFunnelInformation[];
  lead_quality_distribution?: RmLeadQualityDistribution;
  top_performer_leaderboard?: RmTopPerformerLeaderboardItem[];
  escalated?: RmEscalated;
  stale?: RmStale;
  top_objections?: RmTopObjectionItem[];
  top_bookings?: RmTopBookingItem[];
}

export interface StaleLeadItem {
  lead_uuid?: string;
  lead_id?: string;
  frist_name?: string;
  first_name?: string;
  last_name?: string;
  email1?: string;
  email?: string;
  phone_number?: string;
  project_name?: string;
  status?: string;
  duration?: string;
  rm_id?: number;
  em_id?: number;
}

export interface GetStaleLeadsRequest {
  em_ids?: number[];
  user_ids?: number[];
  limit: number;
  offset: number;
}

export interface GetStaleLeadsResponse {
  total_count: number;
  data: StaleLeadItem[];
}

export interface EscalatedLeadItem {
  lead_id?: string;
  lead_uuid?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  email?: string;
  project_name?: string;
  status?: string;
  reason?: string;
  em_id?: number;
}

export interface GetEscalatedLeadsRequest {
  em_ids?: number[];
  user_ids?: number[];
}

export interface GetEscalatedLeadsResponse {
  total_count: number;
  data: EscalatedLeadItem[];
}



