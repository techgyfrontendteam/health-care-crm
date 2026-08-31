export interface RMDashboardData {
  teamCallsSummary: {
    connectedCalls: number;
    avgDuration: string;
    missedCalls: number;
  };
  teamWideLeadStatus: Array<{
    label: string;
    count: number;
    percentage: number;
  }>;
  leadQuality: {
    hot: number;
    cold: number;
    warm: number;
    junk: number;
    activeRate: number;
  };
  topPerformers: Array<{
    rank: number;
    name: string;
    avatarUrl?: string;
    leads: number;
    followUp: number;
    visits: number;
    conversionRate: number;
  }>;
  escalated: {
    count: number;
  };
  stale: {
    count: number;
  };
  topObjections: Array<{
    label: string;
    percentage: number;
  }>;
  topBookings: Array<{
    name: string;
    role: string;
    bookings: number;
  }>;
}

const planetGreenData: RMDashboardData = {
  teamCallsSummary: {
    connectedCalls: 342,
    avgDuration: "4m 12s",
    missedCalls: 14
  },
  teamWideLeadStatus: [
    { label: "NEW LEAD", count: 78, percentage: 45 },
    { label: "SITE VISIT SCHEDULED", count: 56, percentage: 32 },
    { label: "SITE VISIT DONE", count: 34, percentage: 15 },
    { label: "CLOSED/WON", count: 12, percentage: 8 }
  ],
  leadQuality: {
    hot: 40,
    cold: 25,
    warm: 20,
    junk: 15,
    activeRate: 94
  },
  topPerformers: [
    {
      rank: 1,
      name: "Aarav Singh",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      leads: 142,
      followUp: 98,
      visits: 24,
      conversionRate: 46
    },
    {
      rank: 2,
      name: "Neha Sharma",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      leads: 142,
      followUp: 98,
      visits: 24,
      conversionRate: 84
    }
  ],
  escalated: {
    count: 8
  },
  stale: {
    count: 42
  },
  topObjections: [
    { label: "Price too high", percentage: 42 },
    { label: "Location concern", percentage: 28 },
    { label: "Unit layout", percentage: 15 },
    { label: "Road Issues", percentage: 15 },
    { label: "Legal clearances", percentage: 15 }
  ],
  topBookings: [
    { name: "Ramesh Kumar", role: "EXPERIENCE MANAGER", bookings: 4 },
    { name: "Rajesh Yadav", role: "EXPERIENCE MANAGER", bookings: 3 },
    { name: "Priya Sharma", role: "EXPERIENCE MANAGER", bookings: 2 }
  ]
};

const farmNaturaData: RMDashboardData = {
  teamCallsSummary: {
    connectedCalls: 180,
    avgDuration: "3m 45s",
    missedCalls: 8
  },
  teamWideLeadStatus: [
    { label: "NEW LEAD", count: 40, percentage: 35 },
    { label: "SITE VISIT SCHEDULED", count: 30, percentage: 26 },
    { label: "SITE VISIT DONE", count: 25, percentage: 22 },
    { label: "CLOSED/WON", count: 19, percentage: 17 }
  ],
  leadQuality: {
    hot: 30,
    cold: 35,
    warm: 25,
    junk: 10,
    activeRate: 90
  },
  topPerformers: [
    {
      rank: 1,
      name: "Neha Sharma",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      leads: 95,
      followUp: 92,
      visits: 18,
      conversionRate: 74
    },
    {
      rank: 2,
      name: "Aarav Singh",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      leads: 85,
      followUp: 94,
      visits: 15,
      conversionRate: 50
    }
  ],
  escalated: {
    count: 3
  },
  stale: {
    count: 18
  },
  topObjections: [
    { label: "Location concern", percentage: 40 },
    { label: "Price too high", percentage: 30 },
    { label: "Unit layout", percentage: 20 },
    { label: "Infrastructure", percentage: 10 }
  ],
  topBookings: [
    { name: "Rajesh Yadav", role: "EXPERIENCE MANAGER", bookings: 5 },
    { name: "Ramesh Kumar", role: "EXPERIENCE MANAGER", bookings: 2 }
  ]
};

const ecoWorldData: RMDashboardData = {
  teamCallsSummary: {
    connectedCalls: 250,
    avgDuration: "5m 10s",
    missedCalls: 11
  },
  teamWideLeadStatus: [
    { label: "NEW LEAD", count: 60, percentage: 40 },
    { label: "SITE VISIT SCHEDULED", count: 45, percentage: 30 },
    { label: "SITE VISIT DONE", count: 30, percentage: 20 },
    { label: "CLOSED/WON", count: 15, percentage: 10 }
  ],
  leadQuality: {
    hot: 50,
    cold: 20,
    warm: 20,
    junk: 10,
    activeRate: 96
  },
  topPerformers: [
    {
      rank: 1,
      name: "Aarav Singh",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      leads: 110,
      followUp: 96,
      visits: 20,
      conversionRate: 55
    },
    {
      rank: 2,
      name: "Neha Sharma",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      leads: 105,
      followUp: 95,
      visits: 22,
      conversionRate: 80
    }
  ],
  escalated: {
    count: 5
  },
  stale: {
    count: 27
  },
  topObjections: [
    { label: "Price too high", percentage: 50 },
    { label: "Location concern", percentage: 20 },
    { label: "Unit layout", percentage: 15 },
    { label: "Road Issues", percentage: 15 }
  ],
  topBookings: [
    { name: "Priya Sharma", role: "EXPERIENCE MANAGER", bookings: 6 },
    { name: "Ramesh Kumar", role: "EXPERIENCE MANAGER", bookings: 3 }
  ]
};

const allProjectsData: RMDashboardData = {
  teamCallsSummary: {
    connectedCalls: 772,
    avgDuration: "4m 20s",
    missedCalls: 33
  },
  teamWideLeadStatus: [
    { label: "NEW LEAD", count: 178, percentage: 41 },
    { label: "SITE VISIT SCHEDULED", count: 131, percentage: 30 },
    { label: "SITE VISIT DONE", count: 89, percentage: 21 },
    { label: "CLOSED/WON", count: 46, percentage: 8 }
  ],
  leadQuality: {
    hot: 40,
    cold: 26,
    warm: 21,
    junk: 13,
    activeRate: 93
  },
  topPerformers: [
    {
      rank: 1,
      name: "Aarav Singh",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      leads: 337,
      followUp: 96,
      visits: 59,
      conversionRate: 52
    },
    {
      rank: 2,
      name: "Neha Sharma",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      leads: 342,
      followUp: 95,
      visits: 64,
      conversionRate: 81
    }
  ],
  escalated: {
    count: 16
  },
  stale: {
    count: 87
  },
  topObjections: [
    { label: "Price too high", percentage: 44 },
    { label: "Location concern", percentage: 29 },
    { label: "Unit layout", percentage: 17 },
    { label: "Road Issues", percentage: 10 }
  ],
  topBookings: [
    { name: "Ramesh Kumar", role: "EXPERIENCE MANAGER", bookings: 9 },
    { name: "Rajesh Yadav", role: "EXPERIENCE MANAGER", bookings: 8 },
    { name: "Priya Sharma", role: "EXPERIENCE MANAGER", bookings: 8 }
  ]
};

export const getRMDashboardData = (projectName: string): RMDashboardData => {
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
  
  // Default to aggregated "All" data
  return allProjectsData;
};

export interface DirectoryLead {
  id: string;
  name: string;
  project: string;
  rm: string;
  status: string;
  initials: string;
  initialsBg: string;
  badgeClass: string;
}

export const directoryLeads: DirectoryLead[] = [
  {
    id: "LD-8821",
    name: "Varun Tej",
    project: "Planet Green",
    rm: "Ravi Kumar",
    status: "NEW LEAD",
    initials: "VT",
    initialsBg: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/45",
    badgeClass: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-450 border border-blue-100/50 dark:border-blue-900/45",
  },
  {
    id: "LD-8845",
    name: "Nithya Menen",
    project: "Planet Green",
    rm: "Priya Sharma",
    status: "SITE VISIT SCHEDULED",
    initials: "NM",
    initialsBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-455 border border-amber-100/50 dark:border-amber-900/45",
    badgeClass: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-455 border border-amber-100/50 dark:border-amber-900/45",
  },
  {
    id: "LD-8902",
    name: "Ram Charan",
    project: "Planet Green",
    rm: "Amit Patel",
    status: "SITE VISIT DONE",
    initials: "RC",
    initialsBg: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-100/50 dark:border-purple-900/45",
    badgeClass: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-450 border border-purple-100/50 dark:border-purple-900/45",
  },
  {
    id: "LD-9011",
    name: "Samantha Ruth",
    project: "Planet Green",
    rm: "Sneha Mehta",
    status: "CLOSED / WON",
    initials: "SR",
    initialsBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-455 border border-emerald-100/50 dark:border-emerald-900/45",
    badgeClass: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-455 border border-emerald-100/50 dark:border-emerald-900/45",
  },
  {
    id: "LD-9122",
    name: "Allu Arjun",
    project: "Planet Green",
    rm: "Vikram Singh",
    status: "NEGOTIATION",
    initials: "AA",
    initialsBg: "bg-slate-50 dark:bg-zinc-800/60 text-slate-600 dark:text-zinc-400 border border-slate-100/60 dark:border-zinc-700/45",
    badgeClass: "bg-slate-50 dark:bg-zinc-800/60 text-slate-600 dark:text-zinc-400 border border-slate-100/60 dark:border-zinc-700/45",
  },
  {
    id: "LD-9150",
    name: "Rashmika Mandanna",
    project: "Planet Green",
    rm: "Ravi Kumar",
    status: "NEW LEAD",
    initials: "RM",
    initialsBg: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/45",
    badgeClass: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-450 border border-blue-100/50 dark:border-blue-900/45",
  },
  {
    id: "LD-9201",
    name: "Jr NTR",
    project: "Planet Green",
    rm: "Priya Sharma",
    status: "SITE VISIT SCHEDULED",
    initials: "JN",
    initialsBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-455 border border-amber-100/50 dark:border-amber-900/45",
    badgeClass: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-455 border border-amber-100/50 dark:border-amber-900/45",
  },
  {
    id: "LD-9250",
    name: "Mahesh Babu",
    project: "Planet Green",
    rm: "Amit Patel",
    status: "SITE VISIT DONE",
    initials: "MB",
    initialsBg: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-100/50 dark:border-purple-900/45",
    badgeClass: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-405 border border-purple-100/50 dark:border-purple-900/45",
  },
  {
    id: "LD-9300",
    name: "Nayanthara",
    project: "Planet Green",
    rm: "Sneha Mehta",
    status: "CLOSED / WON",
    initials: "NY",
    initialsBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-450 border border-emerald-100/50 dark:border-emerald-900/45",
    badgeClass: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-450 border border-emerald-100/50 dark:border-emerald-900/45",
  },
  {
    id: "LD-9350",
    name: "Prabhas",
    project: "Planet Green",
    rm: "Vikram Singh",
    status: "NEW LEAD",
    initials: "PB",
    initialsBg: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/45",
    badgeClass: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-455 border border-blue-100/50 dark:border-blue-900/45",
  },
  {
    id: "LD-9400",
    name: "Keerthy Suresh",
    project: "Planet Green",
    rm: "Ravi Kumar",
    status: "SITE VISIT SCHEDULED",
    initials: "KS",
    initialsBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-455 border border-amber-100/50 dark:border-amber-900/45",
    badgeClass: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-455 border border-amber-100/50 dark:border-amber-900/45",
  },
  {
    id: "LD-9450",
    name: "Vijay Deverakonda",
    project: "Planet Green",
    rm: "Priya Sharma",
    status: "SITE VISIT DONE",
    initials: "VD",
    initialsBg: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-100/50 dark:border-purple-900/45",
    badgeClass: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-100/50 dark:border-purple-900/45",
  },
  {
    id: "LD-9500",
    name: "Dulquer Salmaan",
    project: "Planet Green",
    rm: "Amit Patel",
    status: "NEGOTIATION",
    initials: "DS",
    initialsBg: "bg-slate-50 dark:bg-zinc-800/60 text-slate-600 dark:text-zinc-400 border border-slate-100/60 dark:border-zinc-700/45",
    badgeClass: "bg-slate-50 dark:bg-zinc-800/60 text-slate-600 dark:text-zinc-400 border border-slate-100/60 dark:border-zinc-700/45",
  },
  {
    id: "LD-9550",
    name: "Kajal Aggarwal",
    project: "Planet Green",
    rm: "Sneha Mehta",
    status: "NEW LEAD",
    initials: "KA",
    initialsBg: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/45",
    badgeClass: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-455 border border-blue-100/50 dark:border-blue-900/45",
  }
];

export const popupTabs = [
  { id: "all", label: "All Leads", count: 180 },
  { id: "NEW LEAD", label: "New Lead", count: 78 },
  { id: "SITE VISIT SCHEDULED", label: "Site Visit Scheduled", count: 56 },
  { id: "SITE VISIT DONE", label: "Site Visit Done", count: 34 },
];
