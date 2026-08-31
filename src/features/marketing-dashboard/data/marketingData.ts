import type { MarketingDashboardData, MarketingDataRequest } from "../types";

export const MOCK_MARKETING_DATA: Record<string, MarketingDashboardData> = {
  // Default - All Managers, Planet Green
  default: {
    campaignsBudget: {
      activeCampaignsCount: 4,
      budget: 345000,
    },
    trafficLeads: {
      leadsCount: 842,
      impressions: "2.4M",
      clicks: "12.8K",
    },
    cplCostBooking: {
      avgCpl: 850,
      costPerBooking: 14000,
    },
    funnelDropoff: {
      leads: 842,
      siteVisits: 156,
      bookings: 24,
      siteVisitsRate: 18.5,
      bookingsRate: 15.3,
    },
    leadQuality: {
      hot: 40,
      warm: 20,
      cold: 25,
      junk: 15,
      activeRate: 94,
    },
    bestAdSet: {
      title: "HNI_Mumbai_Luxury",
      platform: "Facebook & Instagram Feed",
      leadsGenerated: 1556,
      status: "HIGH IMPACT",
      ageRange: "28-45",
    },
    bestCreative: {
      title: "Golden Hour Balcony View",
      platform: "Facebook & Instagram Feed",
      ctr: "3.4%",
      roas: "12.4x",
      image: "/golden_hour_balcony.png",
      status: "ACTIVE",
    },
  },
  // Variation 1
  variation1: {
    campaignsBudget: {
      activeCampaignsCount: 6,
      budget: 520000,
    },
    trafficLeads: {
      leadsCount: 1105,
      impressions: "3.8M",
      clicks: "24.5K",
    },
    cplCostBooking: {
      avgCpl: 920,
      costPerBooking: 16500,
    },
    funnelDropoff: {
      leads: 1105,
      siteVisits: 220,
      bookings: 35,
      siteVisitsRate: 19.9,
      bookingsRate: 15.9,
    },
    leadQuality: {
      hot: 45,
      warm: 25,
      cold: 20,
      junk: 10,
      activeRate: 95,
    },
    bestAdSet: {
      title: "HNI_Pune_SmartCity",
      platform: "Facebook & Instagram Feed",
      leadsGenerated: 2104,
      status: "HIGH IMPACT",
      ageRange: "30-50",
    },
    bestCreative: {
      title: "Smart Terrace View",
      platform: "Facebook & Instagram Feed",
      ctr: "4.1%",
      roas: "14.2x",
      image: "/golden_hour_balcony.png",
      status: "ACTIVE",
    },
  },
  // Variation 2
  variation2: {
    campaignsBudget: {
      activeCampaignsCount: 3,
      budget: 185000,
    },
    trafficLeads: {
      leadsCount: 450,
      impressions: "1.1M",
      clicks: "7.2K",
    },
    cplCostBooking: {
      avgCpl: 780,
      costPerBooking: 11500,
    },
    funnelDropoff: {
      leads: 450,
      siteVisits: 75,
      bookings: 12,
      siteVisitsRate: 16.7,
      bookingsRate: 16.0,
    },
    leadQuality: {
      hot: 35,
      warm: 15,
      cold: 30,
      junk: 20,
      activeRate: 90,
    },
    bestAdSet: {
      title: "MidRange_Thane_Comfort",
      platform: "Facebook & Instagram Feed",
      leadsGenerated: 890,
      status: "HIGH IMPACT",
      ageRange: "25-40",
    },
    bestCreative: {
      title: "Spacious Living Room",
      platform: "Facebook & Instagram Feed",
      ctr: "2.9%",
      roas: "9.8x",
      image: "/golden_hour_balcony.png",
      status: "ACTIVE",
    },
  },
};

export const getMockMarketingData = (req: MarketingDataRequest): MarketingDashboardData => {
  // Determine dataset variation based on requests inputs
  const managerHash = req.manager_id ? parseInt(req.manager_id, 10) : 0;
  const projectHash = req.project_id ? req.project_id.length : 0;
  const combined = managerHash + projectHash;

  if (combined % 3 === 1) {
    return MOCK_MARKETING_DATA.variation1;
  }
  if (combined % 3 === 2) {
    return MOCK_MARKETING_DATA.variation2;
  }
  return MOCK_MARKETING_DATA.default;
};
