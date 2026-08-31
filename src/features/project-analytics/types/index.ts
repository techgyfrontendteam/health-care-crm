export interface LeadQualityDistributionItem {
  name: string;
  percentage: string;
}

export interface PipelineFunnelInformationItem {
  name: string;
  count: number;
}

export interface TopSourceItem {
  name: string;
  percentage: string;
}

export interface GetProjectAnalysisDateWiseDataRequest {
  project_id: number;
  start_date: string;
  end_date: string;
}

export interface GetProjectAnalysisDateWiseDataResponse {
  junk_rate: string;
  lead_conv_rate: string;
  total_bookings: number;
  lead_quality_distribution: LeadQualityDistributionItem[];
  pipeline_funnel_information: PipelineFunnelInformationItem[];
  total_leads: number;
  top_source: TopSourceItem;
}

export interface GetProjectAnalysisDataRequest {
  project_id: number;
}

export interface IdealCustomerProfileData {
  occupation: string;
  age: number | string;
  avg_income: number | string;
  state_name: string;
  avg_leads_score: number;
}

export interface TopLeadItem {
  customer_first_name?: string;
  customer_last_name?: string;
  lead_id?: string | number;
  project_name?: string;
  score?: number;
}

export interface GetProjectAnalysisDataResponse {
  new_leads_today: number;
  top_10_highest_score_leads: TopLeadItem[];
  ideal_customer_profile: IdealCustomerProfileData;
}
