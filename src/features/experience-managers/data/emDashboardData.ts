export interface EMDashboardData {
  missedFollowUps: {
    overdueCount: number;
    avgDelay: string;
  };
  todayFollowUps: Array<{
    initials: string;
    avatarBg: string;
    customerName: string;
    details: string;
    time: string;
    action: string;
  }>;
  leadQualityDistribution: {
    totalLeads: number;
    hotLeads: number;
    warmLeads: number;
    coldLeads: number;
  };
  leadsByStatus: Array<{
    label: string;
    count: number;
    colorClass: string;
  }>;
  siteVisitOverview: {
    scheduled: number;
    completed: number;
  };
  siteVisitsToday: Array<{
    customerName: string;
    time: string;
    details: string;
  }>;
  recentObjections: Array<{
    customerName: string;
    lastContacted: string;
    objectionsCount: number;
  }>;
  totalBookings: {
    units: number;
    target: number;
  };
}

const planetGreenData: EMDashboardData = {
  missedFollowUps: {
    overdueCount: 5,
    avgDelay: "4h"
  },
  todayFollowUps: [
    {
      initials: "PK",
      avatarBg: "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
      customerName: "Priya Kapoor",
      details: "2BHK • High Interest",
      time: "10:30 AM",
      action: "Call Needed"
    },
    {
      initials: "RS",
      avatarBg: "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400",
      customerName: "Rohan Sharma",
      details: "3BHK • Site Visit Pending",
      time: "12:15 PM",
      action: "Re-engagement"
    },
    {
      initials: "AV",
      avatarBg: "bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400",
      customerName: "Amit Verma",
      details: "Commercial • Negotiation",
      time: "2:00 PM",
      action: "Document Request"
    }
  ],
  leadQualityDistribution: {
    totalLeads: 48,
    hotLeads: 12,
    warmLeads: 18,
    coldLeads: 10
  },
  leadsByStatus: [
    { label: "NEW LEADS", count: 14, colorClass: "bg-blue-900 dark:bg-blue-900" },
    { label: "CALLS", count: 22, colorClass: "bg-blue-800 dark:bg-blue-850" },
    { label: "FOLLOW-UPS", count: 8, colorClass: "bg-blue-700 dark:bg-blue-800" },
    { label: "MISSED", count: 8, colorClass: "bg-blue-500 dark:bg-blue-700" },
    { label: "SITE VISITS", count: 8, colorClass: "bg-blue-400 dark:bg-blue-600" },
    { label: "PAYMENT", count: 8, colorClass: "bg-blue-300 dark:bg-blue-500" }
  ],
  siteVisitOverview: {
    scheduled: 2,
    completed: 24
  },
  siteVisitsToday: [
    {
      customerName: "Arjun Khanna",
      time: "11:00 AM",
      details: "3BHK • Planet Green"
    },
    {
      customerName: "Kunal Mehta",
      time: "2:30 PM",
      details: "2BHK • Planet Green"
    },
    {
      customerName: "Sunita Sharma",
      time: "4:45 PM",
      details: "Luxury Villa • Planet Green"
    }
  ],
  recentObjections: [
    {
      customerName: "Arnav Singh",
      lastContacted: "Last contacted: 4 hours ago",
      objectionsCount: 5
    },
    {
      customerName: "Vicky Rajpal",
      lastContacted: "Last contacted: Yesterday",
      objectionsCount: 5
    },
    {
      customerName: "Deepa Goel",
      lastContacted: "Last contacted: 2 days ago",
      objectionsCount: 5
    },
    {
      customerName: "Sandeep Varma",
      lastContacted: "Last contacted: 3 days ago",
      objectionsCount: 2
    },
    {
      customerName: "Meera Nair",
      lastContacted: "Last contacted: 5 days ago",
      objectionsCount: 5
    }
  ],
  totalBookings: {
    units: 4,
    target: 10
  }
};

const farmNaturaData: EMDashboardData = {
  missedFollowUps: {
    overdueCount: 2,
    avgDelay: "2h"
  },
  todayFollowUps: [
    {
      initials: "AS",
      avatarBg: "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
      customerName: "Aman Sen",
      details: "1BHK • Low Interest",
      time: "09:30 AM",
      action: "Call Needed"
    },
    {
      initials: "JD",
      avatarBg: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
      customerName: "Jatin Dev",
      details: "Plot • Site Visit Pending",
      time: "11:00 AM",
      action: "Call Back"
    }
  ],
  leadQualityDistribution: {
    totalLeads: 25,
    hotLeads: 5,
    warmLeads: 10,
    coldLeads: 8
  },
  leadsByStatus: [
    { label: "NEW LEADS", count: 8, colorClass: "bg-blue-900" },
    { label: "CALLS", count: 12, colorClass: "bg-blue-800" },
    { label: "FOLLOW-UPS", count: 4, colorClass: "bg-blue-700" },
    { label: "MISSED", count: 3, colorClass: "bg-blue-500" },
    { label: "SITE VISITS", count: 5, colorClass: "bg-blue-400" },
    { label: "PAYMENT", count: 2, colorClass: "bg-blue-300" }
  ],
  siteVisitOverview: {
    scheduled: 1,
    completed: 12
  },
  siteVisitsToday: [
    {
      customerName: "Mohit Jain",
      time: "10:00 AM",
      details: "Plot • Farm Natura"
    }
  ],
  recentObjections: [
    {
      customerName: "Amit Shah",
      lastContacted: "Last contacted: 1 day ago",
      objectionsCount: 3
    }
  ],
  totalBookings: {
    units: 2,
    target: 8
  }
};

const ecoWorldData: EMDashboardData = {
  missedFollowUps: {
    overdueCount: 4,
    avgDelay: "3.5h"
  },
  todayFollowUps: [
    {
      initials: "RK",
      avatarBg: "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400",
      customerName: "Ritu Kapoor",
      details: "3BHK • High Interest",
      time: "11:30 AM",
      action: "Negotiation"
    },
    {
      initials: "VS",
      avatarBg: "bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400",
      customerName: "Vikram Seth",
      details: "2BHK • Booked",
      time: "03:15 PM",
      action: "Document Submission"
    }
  ],
  leadQualityDistribution: {
    totalLeads: 36,
    hotLeads: 10,
    warmLeads: 14,
    coldLeads: 8
  },
  leadsByStatus: [
    { label: "NEW LEADS", count: 10, colorClass: "bg-blue-900" },
    { label: "CALLS", count: 18, colorClass: "bg-blue-800" },
    { label: "FOLLOW-UPS", count: 6, colorClass: "bg-blue-700" },
    { label: "MISSED", count: 5, colorClass: "bg-blue-500" },
    { label: "SITE VISITS", count: 6, colorClass: "bg-blue-400" },
    { label: "PAYMENT", count: 4, colorClass: "bg-blue-300" }
  ],
  siteVisitOverview: {
    scheduled: 3,
    completed: 18
  },
  siteVisitsToday: [
    {
      customerName: "Karan Johar",
      time: "12:00 PM",
      details: "3BHK • Eco World"
    },
    {
      customerName: "Sara Ali",
      time: "02:30 PM",
      details: "2BHK • Eco World"
    }
  ],
  recentObjections: [
    {
      customerName: "Varun Dhawan",
      lastContacted: "Last contacted: 5 hours ago",
      objectionsCount: 4
    }
  ],
  totalBookings: {
    units: 3,
    target: 10
  }
};

const allProjectsData: EMDashboardData = {
  missedFollowUps: {
    overdueCount: 11,
    avgDelay: "3.2h"
  },
  todayFollowUps: [
    ...planetGreenData.todayFollowUps,
    ...farmNaturaData.todayFollowUps,
    ...ecoWorldData.todayFollowUps
  ],
  leadQualityDistribution: {
    totalLeads: 109,
    hotLeads: 27,
    warmLeads: 42,
    coldLeads: 26
  },
  leadsByStatus: [
    { label: "NEW LEADS", count: 32, colorClass: "bg-blue-900" },
    { label: "CALLS", count: 52, colorClass: "bg-blue-800" },
    { label: "FOLLOW-UPS", count: 18, colorClass: "bg-blue-700" },
    { label: "MISSED", count: 16, colorClass: "bg-blue-500" },
    { label: "SITE VISITS", count: 19, colorClass: "bg-blue-400" },
    { label: "PAYMENT", count: 12, colorClass: "bg-blue-300" }
  ],
  siteVisitOverview: {
    scheduled: 6,
    completed: 54
  },
  siteVisitsToday: [
    ...planetGreenData.siteVisitsToday,
    ...farmNaturaData.siteVisitsToday,
    ...ecoWorldData.siteVisitsToday
  ],
  recentObjections: [
    ...planetGreenData.recentObjections,
    ...farmNaturaData.recentObjections,
    ...ecoWorldData.recentObjections
  ],
  totalBookings: {
    units: 9,
    target: 28
  }
};

export const getEMDashboardData = (projectName: string): EMDashboardData => {
  const name = projectName.toLowerCase();
  if (name.includes("natura")) {
    return farmNaturaData;
  }
  if (name.includes("eco")) {
    return ecoWorldData;
  }
  if (name.includes("planet green")) {
    return planetGreenData;
  }
  return allProjectsData;
};
