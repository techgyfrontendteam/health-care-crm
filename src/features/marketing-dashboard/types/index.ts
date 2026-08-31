export interface MarketingDataRequest {
  manager_id?: string;
  project_id?: string;
  campaign_id?: string;
  start_date?: string;
  end_date?: string;
}

export interface CampaignBudget {
  activeCampaignsCount: number;
  budget: number;
}

export interface TrafficLeads {
  leadsCount: number;
  impressions: string;
  clicks: string;
}

export interface CplCostBooking {
  avgCpl: number;
  costPerBooking: number;
}

export interface FunnelDropoff {
  leads: number;
  siteVisits: number;
  bookings: number;
  siteVisitsRate: number; // e.g. 18.5
  bookingsRate: number; // e.g. 15.3
}

export interface LeadQualityDistribution {
  hot: number; // percentage, e.g. 40
  warm: number; // percentage, e.g. 20
  cold: number; // percentage, e.g. 25
  junk: number; // percentage, e.g. 15
  activeRate: number; // active percentage, e.g. 94
}

export interface BestAdSet {
  title: string;
  platform: string;
  leadsGenerated: number;
  status: string;
  ageRange: string;
}

export interface BestCreative {
  title: string;
  platform: string;
  ctr: string;
  roas?: string;
  image: string;
  status: string;
}

export interface MarketingDashboardData {
  campaignsBudget: CampaignBudget;
  trafficLeads: TrafficLeads;
  cplCostBooking: CplCostBooking;
  funnelDropoff: FunnelDropoff;
  leadQuality: LeadQualityDistribution;
  bestAdSet: BestAdSet;
  bestCreative: BestCreative;
}

export interface MarketingDashboardCardsRequest {
  project_id?: number | null;
  campaign_id?: number | null;
}

export interface MarketingDashboardCardsResponse {
  active_campaign_budget: {
    active_campaigns: number;
    spent: string;
  };
  traffic_leads: {
    total_leads: number;
    impressions: string;
    clicks: string;
  };
  average_cpl_cpb: {
    cost_per_lead: number;
    cost_per_bookings: number;
  };
}

export interface MarketingDashboardAnalyticsRequest {
  project_id?: number | null;
  campaign_id?: number | null;
  start_date?: string;
  end_date?: string;
}

export interface LeadQualityItem {
  name: string;
  percentage: string;
}

export interface BestAdSetItem {
  ad_set_name: string;
  leads_generated: number;
}

export interface MarketingDashboardAnalyticsResponse {
  campaign_funnel_drop_of_total: {
    leads: number;
    site_visits: number;
    bookings: number;
  };
  lead_quality_distribution: LeadQualityItem[];
  best_performing_ad_sets: BestAdSetItem[];
}
