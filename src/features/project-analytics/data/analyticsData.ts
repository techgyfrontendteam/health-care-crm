export interface ProjectAnalyticsData {
  kpis: {
    newLeadsToday: number;
    junkRate: number;
    leadToBookingConv: number;
    totalBookings: number;
  };
  leadQuality: {
    hot: number;
    cold: number;
    warm: number;
    junk: number;
    activeRate: number;
  };
  topPersona: {
    conversionRate: number;
    occupation: string;
    ageBracket: string;
    avgIncome: string;
    state: string;
  };
  totalLeads: number;
  topSource: {
    name: string;
    percentage: number;
  };
  avgScore: number;
  topLeads: Array<{
    id: string;
    name: string;
    leadId: string;
    score: number;
    project: string;
    avatarColor: string;
  }>;
  funnel: {
    newLeads: number;
    contacted: number;
    siteVisit: number;
    negotiation: number;
    booked: number;
  };
}

const planetGreenData: ProjectAnalyticsData = {
  kpis: {
    newLeadsToday: 2840,
    junkRate: 12.4,
    leadToBookingConv: 5.8,
    totalBookings: 142
  },
  leadQuality: {
    hot: 40,
    cold: 25,
    warm: 20,
    junk: 15,
    activeRate: 94
  },
  topPersona: {
    conversionRate: 18.2,
    occupation: "IT Professional",
    ageBracket: "30-45 yrs",
    avgIncome: "₹40L+",
    state: "Telangana"
  },
  totalLeads: 12842,
  topSource: {
    name: "Instagram Ads",
    percentage: 72
  },
  avgScore: 8,
  topLeads: [
    { id: "1", name: "Kunal Mehta", leadId: "#98431", score: 9, project: "PLANET GREEN", avatarColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300" },
    { id: "2", name: "Priya Agarwal", leadId: "#98428", score: 9, project: "FARM NATURA", avatarColor: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300" },
    { id: "3", name: "Rohan Trivedi", leadId: "#98425", score: 8, project: "PLANET GREEN", avatarColor: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300" },
    { id: "4", name: "Sanya Malhotra", leadId: "#98422", score: 7, project: "ECO WORLD", avatarColor: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300" },
    { id: "5", name: "Rajesh Yadav", leadId: "#98420", score: 7, project: "ECO WORLD", avatarColor: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" },
    { id: "6", name: "Ananya Sen", leadId: "#98418", score: 7, project: "PLANET GREEN", avatarColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300" },
    { id: "7", name: "Vikram Malhotra", leadId: "#98415", score: 6, project: "FARM NATURA", avatarColor: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300" },
    { id: "8", name: "Kirti Sharma", leadId: "#98410", score: 6, project: "PLANET GREEN", avatarColor: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300" },
    { id: "9", name: "Manish Goel", leadId: "#98405", score: 6, project: "ECO WORLD", avatarColor: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300" },
    { id: "10", name: "Simran Kaur", leadId: "#98400", score: 5, project: "FARM NATURA", avatarColor: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300" }
  ],
  funnel: {
    newLeads: 12842,
    contacted: 8120,
    siteVisit: 2450,
    negotiation: 942,
    booked: 412
  }
};

const farmNaturaData: ProjectAnalyticsData = {
  kpis: {
    newLeadsToday: 1520,
    junkRate: 14.8,
    leadToBookingConv: 4.2,
    totalBookings: 64
  },
  leadQuality: {
    hot: 30,
    cold: 35,
    warm: 20,
    junk: 15,
    activeRate: 88
  },
  topPersona: {
    conversionRate: 14.5,
    occupation: "Business Owner",
    ageBracket: "40-55 yrs",
    avgIncome: "₹65L+",
    state: "Andhra Pradesh"
  },
  totalLeads: 6540,
  topSource: {
    name: "Google Search",
    percentage: 58
  },
  avgScore: 7,
  topLeads: [
    { id: "1", name: "Priya Agarwal", leadId: "#98428", score: 9, project: "FARM NATURA", avatarColor: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300" },
    { id: "2", name: "Vikram Malhotra", leadId: "#98415", score: 8, project: "FARM NATURA", avatarColor: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300" },
    { id: "3", name: "Simran Kaur", leadId: "#98400", score: 7, project: "FARM NATURA", avatarColor: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300" },
    { id: "4", name: "Amit Shah", leadId: "#98395", score: 7, project: "FARM NATURA", avatarColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300" },
    { id: "5", name: "Sneha Reddy", leadId: "#98390", score: 6, project: "FARM NATURA", avatarColor: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" }
  ],
  funnel: {
    newLeads: 6540,
    contacted: 4200,
    siteVisit: 1120,
    negotiation: 380,
    booked: 162
  }
};

const ecoWorldData: ProjectAnalyticsData = {
  kpis: {
    newLeadsToday: 980,
    junkRate: 9.6,
    leadToBookingConv: 6.5,
    totalBookings: 84
  },
  leadQuality: {
    hot: 45,
    cold: 20,
    warm: 25,
    junk: 10,
    activeRate: 96
  },
  topPersona: {
    conversionRate: 21.4,
    occupation: "Medical Specialist",
    ageBracket: "35-50 yrs",
    avgIncome: "₹80L+",
    state: "Karnataka"
  },
  totalLeads: 4120,
  topSource: {
    name: "Referrals",
    percentage: 82
  },
  avgScore: 9,
  topLeads: [
    { id: "1", name: "Sanya Malhotra", leadId: "#98422", score: 9, project: "ECO WORLD", avatarColor: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300" },
    { id: "2", name: "Rajesh Yadav", leadId: "#98420", score: 9, project: "ECO WORLD", avatarColor: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" },
    { id: "3", name: "Manish Goel", leadId: "#98405", score: 8, project: "ECO WORLD", avatarColor: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300" },
    { id: "4", name: "Pooja Rao", leadId: "#98380", score: 8, project: "ECO WORLD", avatarColor: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300" },
    { id: "5", name: "Ramesh Kumar", leadId: "#98375", score: 7, project: "ECO WORLD", avatarColor: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300" }
  ],
  funnel: {
    newLeads: 4120,
    contacted: 3100,
    siteVisit: 850,
    negotiation: 240,
    booked: 156
  }
};

export const getProjectAnalytics = (projectName: string): ProjectAnalyticsData => {
  const name = projectName.toLowerCase();
  
  if (name.includes("natura")) {
    return farmNaturaData;
  }
  if (name.includes("eco")) {
    return ecoWorldData;
  }
  
  // Default to Planet Green data
  return planetGreenData;
};
