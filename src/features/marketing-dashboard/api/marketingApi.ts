import { baseApi } from "../../../app/api/baseApi";
import type { MarketingDashboardData, MarketingDataRequest } from "../types";

export const marketingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMarketingData: builder.query<MarketingDashboardData, MarketingDataRequest>({
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        try {
          const projectId = arg.project_id ? parseInt(arg.project_id, 10) : 1;
          
          let campaignId: number | null = null;
          if (arg.campaign_id) {
            if (arg.campaign_id.includes("1")) campaignId = 101;
            else if (arg.campaign_id.includes("2")) campaignId = 100;
            else {
              const parsed = parseInt(arg.campaign_id.replace(/\D/g, ""), 10);
              campaignId = isNaN(parsed) ? null : parsed;
            }
          } else {
            campaignId = 101;
          }

          // Call Cards Data API
          const cardsResult = await baseQuery({
            url: "/marketing/getMarketingManagerDashbaordCardsData",
            method: "POST",
            body: {
              project_id: projectId,
              campaign_id: campaignId,
            },
          });

          if (cardsResult.error) {
            return { error: cardsResult.error as any };
          }

          const cardsData = cardsResult.data as any;

          // Call Analytics Dashboard API
          const analyticsResult = await baseQuery({
            url: "/marketing/getMarketingManagerDashbaord",
            method: "POST",
            body: {
              project_id: projectId,
              campaign_id: campaignId,
              start_date: arg.start_date || undefined,
              end_date: arg.end_date || undefined,
            },
          });

          if (analyticsResult.error) {
            return { error: analyticsResult.error as any };
          }

          const analyticsData = analyticsResult.data as any;

          // Compute values for funnel dropoff
          const leadsVal = analyticsData?.campaign_funnel_drop_of_total?.leads || 0;
          const siteVisitsVal = analyticsData?.campaign_funnel_drop_of_total?.site_visits || 0;
          const bookingsVal = analyticsData?.campaign_funnel_drop_of_total?.bookings || 0;
          const siteVisitsRate = leadsVal > 0 ? parseFloat(((siteVisitsVal / leadsVal) * 100).toFixed(1)) : 0;
          const bookingsRate = siteVisitsVal > 0 ? parseFloat(((bookingsVal / siteVisitsVal) * 100).toFixed(1)) : 0;

          // Compute values for lead quality distribution
          const getPct = (name: string) => {
            const list = analyticsData?.lead_quality_distribution || [];
            const item = list.find((i: any) => i.name.toLowerCase() === name.toLowerCase());
            return item ? Math.round(parseFloat(item.percentage)) : 0;
          };

          const hot = getPct("hot");
          const warm = getPct("warm");
          const coldVal = getPct("nurture");
          const junkVal = getPct("cold");
          const activeRate = Math.min(100, hot + warm + coldVal);

          // Get best performing ad set
          const getBestAdSet = () => {
            const val = analyticsData?.best_performing_ad_sets;
            if (Array.isArray(val)) return val[0];
            return val;
          };
          const bestAdSetItem = getBestAdSet();

          // Get best performing creative
          const getBestCreative = () => {
            const val = analyticsData?.best_performing_creatives;
            if (Array.isArray(val)) return val[0];
            return val;
          };
          const bestCreativeItem = getBestCreative();

          const budgetData = cardsData?.actives_campaign_budget || cardsData?.active_campaign_budget;

          // Map to response structure
          const combinedData: MarketingDashboardData = {
            campaignsBudget: {
              activeCampaignsCount: budgetData?.active_campaigns || 0,
              budget: budgetData?.spent ? parseFloat(budgetData.spent) : 0,
            },
            trafficLeads: {
              leadsCount: cardsData?.traffic_leads?.total_leads || 0,
              impressions: cardsData?.traffic_leads?.impressions || "0",
              clicks: cardsData?.traffic_leads?.clicks || "0",
            },
            cplCostBooking: {
              avgCpl: cardsData?.average_cpl_cpb?.cost_per_lead || 0,
              costPerBooking: cardsData?.average_cpl_cpb?.cost_per_bookings || 0,
            },
            funnelDropoff: {
              leads: leadsVal,
              siteVisits: siteVisitsVal,
              bookings: bookingsVal,
              siteVisitsRate,
              bookingsRate,
            },
            leadQuality: {
              hot,
              warm,
              cold: coldVal,
              junk: junkVal,
              activeRate,
            },
            bestAdSet: {
              title: bestAdSetItem?.ad_set_name || "No data available",
              platform: bestAdSetItem?.ad_set_name ? "Facebook & Instagram Feed" : "-",
              leadsGenerated: bestAdSetItem?.leads_generated || 0,
              status: bestAdSetItem?.ad_set_name ? "HIGH IMPACT" : "NO DATA",
              ageRange: "28-45",
            },
            bestCreative: {
              title: bestCreativeItem?.creatives_name || "No data available",
              platform: bestCreativeItem?.creatives_name ? "Facebook & Instagram Feed" : "-",
              ctr: bestCreativeItem?.CTR || "0%",
              image: "/golden_hour_balcony.png",
              status: bestCreativeItem?.creatives_name ? "ACTIVE" : "NO DATA",
            },
          };

          return { data: combinedData };
        } catch (error: any) {
          return { error: { status: 500, data: error.message || "Failed to load marketing dashboard data" } };
        }
      },
    }),
  }),
});

export const { useGetMarketingDataQuery } = marketingApi;
