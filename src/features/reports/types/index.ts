export interface Report {
  id: number;
  title: string;
  description: string;
}

export interface ExecutiveRow {
  id: number;
  name: string;
  projectId: number;
  projectName: string;
  rmId: number;
  emId: number;
  newLeads: number;
  calls: number;
  followups: number;
  missed: number;
  siteVisits: number;
  advance: number | null;
  booking: number | null;
  payment: number | null;
  reg: number | null;
  junk: number;
  [key: string]: any;
}

export interface ObjectionRow {
  id: number;
  name: string;
  projectId: number;
  projectName: string;
  rmId: number;
  emId: number;
  objectionsCount: number;
  uniqueTypesCount: number;
  primaryConcern: string;
  conversionRate: number;
  objectionTypes: string[];
}

export interface PersonaSegmentRow {
  id: number;
  name: string;
  projectId: number;
  projectName: string;
  rmId: number;
  emId: number;
  topObjections: string[];
  avgIncome: string;
  junkRate: number;
  conversionRate: number;
}

export interface VolumeMetric {
  label: string;
  value: number;
}

export interface LeadSourceQualityRow {
  id: number;
  source: string;
  projectId: number;
  projectName?: string;
  rmId: number;
  emId: number;
  count: number;
  quantityDistribution: number;
  conversionRate: number;
  junkRate: number;
}

export interface CampaignCreative {
  id: string;
  name: string;
  leads: number;
  cpl: number;
  siteVisitRate: number;
  conversionRate: number;
  junkRate: number;
}

export interface CampaignAdSet {
  id: string;
  name: string;
  leads: number;
  cpl: number;
  siteVisitRate: number;
  conversionRate: number;
  junkRate: number;
  creatives: CampaignCreative[];
}

export interface CampaignRow {
  id: string;
  name: string;
  projectId: number;
  rmId: number;
  leads: number;
  cpl: number;
  siteVisitRate: number;
  conversionRate: number;
  junkRate: number;
  adSets: CampaignAdSet[];
}

export interface DailySalesReportFilters {
  project_id?: number;
  start_date?: string;
  end_date?: string;
}

export interface DailySalesReportCardDataRequest extends DailySalesReportFilters {}

export interface DailySalesReportCardDataResponse {
  avg_user_engagement_time_in_mins?: string | number;
  avg_days_to_site_visit_completion_in_days?: string | number;
  follow_efficiency?: string | number;
  [key: string]: any;
}

export interface DailySalesReportDataRequest extends DailySalesReportFilters {
  offset?: number;
}

export interface DailySalesReportDataResponse {
  total_count: number;
  data: Array<{
    ex_name: string;
    project_name: string;
    status_data: Array<{
      id: number;
      name: string;
      count: number;
    }>;
  }>;
}

export interface DownloadDailySalesReportDataRequest extends DailySalesReportFilters {}

export interface DownloadDailySalesReportDataResponse {
  message: string;
  file_url: string;
}

export interface LeadSourceReportsCardDataRequest {
  project_id: number;
}

export interface LeadSourceReportsCardDataResponse {
  top_source: {
    name: string;
    percentage: string;
  };
  total_leads: number;
  junk_rate: string;
  conversion_rate: string;
}

export interface SourceQualityBreakdownDataRequest {
  project_id: number;
  offset: number;
  start_date: string;
  end_date: string;
}

export interface SourceQualityBreakdownDataResponse {
  total_count: number;
  data: Array<{
    lead_source: string;
    count: number;
    quantity_distribution: string;
    conversion_rate: string;
    junk_rate: string;
  }>;
}

export interface DownloadSourceQualityBreakdownDataRequest {
  project_id: number;
  start_date: string;
  end_date: string;
}

export interface DownloadSourceQualityBreakdownDataResponse {
  message: string;
  file_url: string;
}
export interface ProjectWiseObjectionReportFilters {
  project_id?: number;
}

export interface ProjectWiseObjectionReportCardDataRequest extends ProjectWiseObjectionReportFilters {}

export interface ProjectWiseObjectionReportCardDataResponse {
  total_objections: number;
  conversion_rate: string;
  primary_objection: string;
}

export interface ProjectWiseObjectionDataRequest extends ProjectWiseObjectionReportFilters {
  offset?: number;
}

export interface ProjectWiseObjectionDataResponse {
  total_count: number;
  data: Array<{
    ex_name: string;
    objections: number;
    unique_types_count: number;
    unique_types_details: string[];
    primary_concern: string;
    conv_rate: string;
  }>;
}

export interface DownloadProjectWiseObjectionDataRequest extends ProjectWiseObjectionReportFilters {}

export interface DownloadProjectWiseObjectionDataResponse {
  message: string;
  file_url: string;
}

// Persona Segment Report
export interface PersonaSegmentReportFilters {
  project_id?: number;
}

export interface PersonaSegmentReportCardDataRequest extends PersonaSegmentReportFilters {}

export interface PersonaSegmentReportCardDataResponse {
  occupation_data: Array<{
    occ_name: string;
    occ_percentage: string;
  }>;
  age_data: Array<{
    age_group: string;
    percentage: string;
  }>;
  region_data: Array<{
    state_id: number;
    count: number;
  }>;
}

export interface PersonaSegmentAnalysisRequest extends PersonaSegmentReportFilters {
  offset?: number;
}

export interface PersonaSegmentAnalysisResponse {
  total_count: number;
  data: Array<{
    segment_name: string;
    top_objections: string[];
    avg_income: number;
    junk_rate: string;
    conversion_rate: string;
  }>;
}

export interface DownloadPersonaSegmentAnalysisRequest extends PersonaSegmentReportFilters {}

export interface DownloadPersonaSegmentAnalysisResponse {
  message: string;
  file_url: string;
}

// Campaign Performance Reports Types
export interface GetAllCampaignsDataRequest {
  project_id?: number[];
}

export interface CampaignFilterItem {
  campaign_id: number;
  campaign_name: string;
  cpl: string | number;
  leads: string | number;
  site_visit: string;
  conversion_rate: string;
  junk_rate: string;
}

export interface GetAllCampaignsDataResponse {
  data: {
    active: CampaignFilterItem[];
    completed: CampaignFilterItem[];
  };
}

export interface GetAdsPerformanceToBookingDataRequest {
  project_id?: number | null;
  campaign_id?: number | null;
}

export interface CreativePerformanceItem {
  creative_id: number;
  creative_name: string;
  cpl: string | number;
  leads: string | number;
  site_visit: string;
  conversion_rate: string;
  junk_rate: string;
}

export interface AdSetPerformanceItem {
  ad_set_id: number;
  ad_set_name: string;
  cpl: string | number;
  leads: string | number;
  site_visit: string;
  conversion_rate: string;
  junk_rate: string;
  creatives: CreativePerformanceItem[];
}

export interface CampaignPerformanceItem {
  campaign_id: number;
  campaign_name: string;
  cpl: string | number;
  leads: string | number;
  site_visit: string;
  conversion_rate: string;
  junk_rate: string;
  ad_set: AdSetPerformanceItem[];
}

export interface GetAdsPerformanceToBookingDataResponse {
  data: CampaignPerformanceItem[];
}

export interface GetCampaignsFunnelDataRequest {
  project_id?: number | null;
  campaign_id?: number | null;
}

export interface GetCampaignsFunnelDataResponse {
  conversion_funnel_data: {
    reach: string | number;
    leads: string | number;
    sitevisit: string | number;
    conversions: string | number;
  };
  best_performing_campaign: string;
  best_performing_ad_set: string;
  best_performing_creatives: string;
}

export interface DownloadCampaignPerformanceDataRequest {
  project_id?: number | null;
  campaign_id?: number | null;
}

export interface DownloadCampaignPerformanceDataResponse {
  message: string;
  file_url: string;
}


