import type { CampaignRow } from "../types";

export const getInitialCampaignData = (
  resolvedProjectId: number,
  resolvedRms: number[]
): CampaignRow[] => {
  const rmCount = resolvedRms.length || 1;

  return [
    {
      id: "camp-1",
      name: "Meta Lead Gen Q2",
      projectId: resolvedProjectId,
      rmId: resolvedRms[0] || 1,
      leads: 4520,
      cpl: 3200,
      siteVisitRate: 9.1,
      conversionRate: 7.4,
      junkRate: 12.4,
      adSets: [
        {
          id: "adset-1-1",
          name: "Ad Set: HNI_Mumbai_Luxury",
          leads: 1240,
          cpl: 1600,
          siteVisitRate: 5.1,
          conversionRate: 3.2,
          junkRate: 6.2,
          creatives: [
            {
              id: "creative-1-1-1",
              name: "Creative: 3BHK_Lifestyle_Static_V1",
              leads: 1240,
              cpl: 1600,
              siteVisitRate: 5.1,
              conversionRate: 3.2,
              junkRate: 6.2,
            },
            {
              id: "creative-1-1-2",
              name: "Creative: Luxury_Penthouse_Video_V2",
              leads: 810,
              cpl: 1200,
              siteVisitRate: 4.5,
              conversionRate: 2.8,
              junkRate: 4.5,
            }
          ],
        },
        {
          id: "adset-1-2",
          name: "Ad Set: IT_Corridor_Professionals",
          leads: 2050,
          cpl: 2200,
          siteVisitRate: 8.4,
          conversionRate: 6.5,
          junkRate: 9.2,
          creatives: [
            {
              id: "creative-1-2-1",
              name: "Creative: Tech_Park_Carousel_V1",
              leads: 2050,
              cpl: 2200,
              siteVisitRate: 8.4,
              conversionRate: 6.5,
              junkRate: 9.2,
            }
          ],
        }
      ],
    },
    {
      id: "camp-2",
      name: "Google Search: Residential",
      projectId: resolvedProjectId === 1 ? 2 : resolvedProjectId,
      rmId: resolvedRms[1 % rmCount] || 1,
      leads: 2810,
      cpl: 4350,
      siteVisitRate: 9.1,
      conversionRate: 6.4,
      junkRate: 12.4,
      adSets: [
        {
          id: "adset-2-1",
          name: "Ad Set: Luxury_Villas_Keywords",
          leads: 1500,
          cpl: 4100,
          siteVisitRate: 8.8,
          conversionRate: 5.8,
          junkRate: 10.2,
          creatives: [
            {
              id: "creative-2-1-1",
              name: "Creative: Villa_Search_Ad_V1",
              leads: 1500,
              cpl: 4100,
              siteVisitRate: 8.8,
              conversionRate: 5.8,
              junkRate: 10.2,
            }
          ],
        },
        {
          id: "adset-2-2",
          name: "Ad Set: Affordable_Premium_Apartments",
          leads: 1310,
          cpl: 4600,
          siteVisitRate: 9.4,
          conversionRate: 7.1,
          junkRate: 14.8,
          creatives: [
            {
              id: "creative-2-2-1",
              name: "Creative: Apartment_Search_Ad_V1",
              leads: 1310,
              cpl: 4600,
              siteVisitRate: 9.4,
              conversionRate: 7.1,
              junkRate: 14.8,
            }
          ],
        }
      ],
    },
    {
      id: "camp-3",
      name: "Retargeting: Site Visitors",
      projectId: resolvedProjectId,
      rmId: resolvedRms[2 % rmCount] || 1,
      leads: 1124,
      cpl: 4350,
      siteVisitRate: 9.1,
      conversionRate: 6.4,
      junkRate: 12.4,
      adSets: [
        {
          id: "adset-3-1",
          name: "Ad Set: Abandoned_Cart_leads",
          leads: 724,
          cpl: 3850,
          siteVisitRate: 8.5,
          conversionRate: 5.9,
          junkRate: 11.1,
          creatives: [
            {
              id: "creative-3-1-1",
              name: "Creative: Offer_Discount_V1",
              leads: 724,
              cpl: 3850,
              siteVisitRate: 8.5,
              conversionRate: 5.9,
              junkRate: 11.1,
            }
          ],
        },
        {
          id: "adset-3-2",
          name: "Ad Set: Video_Viewer_Retargeting",
          leads: 400,
          cpl: 5150,
          siteVisitRate: 10.2,
          conversionRate: 7.2,
          junkRate: 14.5,
          creatives: [
            {
              id: "creative-3-2-1",
              name: "Creative: Skyline_Walkthrough_Video",
              leads: 400,
              cpl: 5150,
              siteVisitRate: 10.2,
              conversionRate: 7.2,
              junkRate: 14.5,
            }
          ],
        }
      ],
    },
  ];
};
