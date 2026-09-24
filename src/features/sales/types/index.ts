export interface SalesStatsRequest {
  offset?: number;
}

export interface SalesStatsResponse {
  no_of_calls?: number;
  no_of_leads?: number;
  no_of_branches?: number;
  no_of_depertments?: number;
  no_of_departments?: number;
  success?: boolean;
  message?: string;
  data?: any;
  results?: any;
  [key: string]: any;
}

export interface CallsLoggedAndNewLeadsRequest {
  present_date?: string;
}

export interface CallsLoggedAndNewLeadsResponse {
  success?: boolean;
  message?: string;
  data?: any;
  results?: any;
  [key: string]: any;
}

export interface LeadSourceBreakDownRequest {
  [key: string]: any;
}

export interface LeadSourceBreakDownResponse {
  success?: boolean;
  message?: string;
  data?: any;
  results?: any;
  [key: string]: any;
}

export interface BranchLeadPerformanceRequest {
  [key: string]: any;
}

export interface BranchLeadPerformanceResponse {
  success?: boolean;
  message?: string;
  data?: any;
  results?: any;
  [key: string]: any;
}

export interface DepartmentLeadBreakDownRequest {
  offset?: number;
  [key: string]: any;
}

export interface DepartmentLeadBreakDownResponse {
  success?: boolean;
  message?: string;
  data?: any;
  results?: any;
  [key: string]: any;
}

export interface SalesMetrics {
  no_of_calls: number;
  no_of_leads: number;
  no_of_branches: number;
  no_of_depertments: number;
  total_calls?: number;
  total_leads?: number;
  total_branches_count?: number;
  total_opd_leads?: number;
  total_ipd_leads?: number;
  [key: string]: any;
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
