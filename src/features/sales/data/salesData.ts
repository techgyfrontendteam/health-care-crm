import type {
  SalesMetrics,
  LeadSourceItem,
  DepartmentLeadItem,
  BranchLeadItem,
  DailySalesTrend,
  SalesLeadRecord,
} from "../types";

export const salesMetricsData: SalesMetrics = {
  total_calls: 4820,
  calls_connected: 4240,
  calls_growth: 15.4,

  total_leads: 1450,
  new_leads_this_month: 385,
  leads_growth: 18.2,

  overdue_leads: 84,
  overdue_high_priority: 26,
  overdue_percentage: 5.8,

  total_opd_leads: 980,
  total_ipd_leads: 470,

  total_branches_count: 3,
  top_performing_branch: "Nizampet",
};

export const leadSourcesData: LeadSourceItem[] = [
  { source: "WhatsApp Channel", count: 480, percentage: 33.1, converted: 185, color: "#0022ff" },
  { source: "Website & Landing Pages", count: 320, percentage: 22.1, converted: 124, color: "#111625" },
  { source: "Doctor Referrals", count: 260, percentage: 17.9, converted: 142, color: "#0022ff" },
  { source: "Google Search Ads", count: 210, percentage: 14.5, converted: 68, color: "#111625" },
  { source: "Walk-in Desk", count: 110, percentage: 7.6, converted: 78, color: "#0022ff" },
  { source: "Social Media (FB/IG)", count: 70, percentage: 4.8, converted: 22, color: "#111625" },
];

export const departmentLeadsData: DepartmentLeadItem[] = [
  { department_name: "Cardiology", lead_count: 360, converted_count: 145, revenue: 18500000, color: "#0022ff" },
  { department_name: "Orthopedics & Joint Replacement", lead_count: 310, converted_count: 132, revenue: 21200000, color: "#111625" },
  { department_name: "Neurology & Neuro Surgery", lead_count: 240, converted_count: 94, revenue: 16800000, color: "#0022ff" },
  { department_name: "Obstetrics & Gynecology", lead_count: 210, converted_count: 98, revenue: 9800000, color: "#111625" },
  { department_name: "Oncology & Cancer Care", lead_count: 180, converted_count: 76, revenue: 19400000, color: "#0022ff" },
  { department_name: "Pediatrics & Child Care", lead_count: 150, converted_count: 72, revenue: 3800000, color: "#111625" },
];

export const branchLeadsData: BranchLeadItem[] = [
  {
    branch_id: "BR-01",
    branch_name: "Nizampet",
    location: "Nizampet, Hyderabad",
    total_leads: 520,
    active_leads: 380,
    overdue_leads: 24,
    converted_leads: 215,
    total_calls: 1840,
    revenue: 24800000,
  },
  {
    branch_id: "BR-02",
    branch_name: "Kondapur",
    location: "Kondapur, Hyderabad",
    total_leads: 380,
    active_leads: 290,
    overdue_leads: 18,
    converted_leads: 162,
    total_calls: 1320,
    revenue: 18400000,
  },
  {
    branch_id: "BR-03",
    branch_name: "KPHB",
    location: "KPHB, Hyderabad",
    total_leads: 260,
    active_leads: 195,
    overdue_leads: 15,
    converted_leads: 104,
    total_calls: 890,
    revenue: 11200000,
  },
];

export const dailySalesTrendsData: DailySalesTrend[] = [
  { date: "21 Aug", calls: 180, new_leads: 45, conversions: 18 },
  { date: "22 Aug", calls: 195, new_leads: 52, conversions: 22 },
  { date: "23 Aug", calls: 210, new_leads: 48, conversions: 19 },
  { date: "24 Aug", calls: 160, new_leads: 38, conversions: 15 },
  { date: "25 Aug", calls: 225, new_leads: 58, conversions: 24 },
  { date: "26 Aug", calls: 240, new_leads: 62, conversions: 27 },
  { date: "27 Aug", calls: 215, new_leads: 55, conversions: 21 },
  { date: "28 Aug", calls: 230, new_leads: 59, conversions: 26 },
  { date: "29 Aug", calls: 250, new_leads: 68, conversions: 31 },
  { date: "30 Aug", calls: 265, new_leads: 72, conversions: 34 },
  { date: "31 Aug", calls: 280, new_leads: 75, conversions: 36 },
];

export const salesLeadRecordsData: SalesLeadRecord[] = [
  {
    id: "LEAD-9012",
    lead_name: "Tharun Duggi",
    phone: "+91 63036 55909",
    source: "WhatsApp Channel",
    department: "Cardiology",
    branch: "Nizampet",
    assigned_rm: "Vikram Sharma",
    status: "Site Revisit",
    calls_count: 6,
    last_activity: "Today, 02:30 PM",
    is_overdue: false,
  },
  {
    id: "LEAD-9011",
    lead_name: "Pooja Reddy",
    phone: "+91 98490 12345",
    source: "Doctor Referral",
    department: "Orthopedics",
    branch: "Kondapur",
    assigned_rm: "Ananya Gupta",
    status: "Follow Up",
    calls_count: 4,
    last_activity: "2 Days Ago",
    is_overdue: true,
  },
  {
    id: "LEAD-9010",
    lead_name: "Suresh Kumar",
    phone: "+91 91234 56789",
    source: "Website Landing Page",
    department: "Neurology",
    branch: "KPHB",
    assigned_rm: "Arjun Singh",
    status: "Callback Required",
    calls_count: 2,
    last_activity: "3 Days Ago",
    is_overdue: true,
  },
  {
    id: "LEAD-9009",
    lead_name: "Meena Swamy",
    phone: "+91 98765 12345",
    source: "Walk-in Desk",
    department: "Obstetrics",
    branch: "Nizampet",
    assigned_rm: "Priya Sharma",
    status: "Site Visit Completed",
    calls_count: 5,
    last_activity: "Yesterday, 04:15 PM",
    is_overdue: false,
  },
  {
    id: "LEAD-9008",
    lead_name: "Kiran Rao",
    phone: "+91 94400 98765",
    source: "Google Search Ads",
    department: "Oncology",
    branch: "KPHB",
    assigned_rm: "Vikram Sharma",
    status: "New Lead",
    calls_count: 1,
    last_activity: "4 Days Ago",
    is_overdue: true,
  },
];
