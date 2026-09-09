export interface SalesMetrics {
  total_calls: number;
  calls_connected: number;
  calls_growth: number; // percentage

  total_leads: number;
  new_leads_this_month: number;
  leads_growth: number; // percentage

  overdue_leads: number;
  overdue_high_priority: number;
  overdue_percentage: number;

  total_opd_leads: number;
  total_ipd_leads: number;

  total_branches_count: number;
  top_performing_branch: string;
}

export interface LeadSourceItem {
  source: string;
  count: number;
  percentage: number;
  converted: number;
  color: string;
}

export interface DepartmentLeadItem {
  department_name: string;
  lead_count: number;
  converted_count: number;
  revenue: number;
  color: string;
}

export interface BranchLeadItem {
  branch_id: string;
  branch_name: string;
  location: string;
  total_leads: number;
  active_leads: number;
  overdue_leads: number;
  converted_leads: number;
  total_calls: number;
  revenue: number;
}

export interface DailySalesTrend {
  date: string;
  calls: number;
  new_leads: number;
  conversions: number;
}

export interface SalesLeadRecord {
  id: string;
  lead_name: string;
  phone: string;
  source: string;
  department: string;
  branch: string;
  assigned_rm: string;
  status: string;
  calls_count: number;
  last_activity: string;
  is_overdue: boolean;
}
