export interface RevenueMetrics {
  opd_booked_count: number;
  opd_booked_revenue: number;
  opd_booked_growth: number; // percentage
  
  opd_completed_count: number;
  opd_completed_revenue: number;
  opd_completed_rate: number; // percentage of booked
  
  ipd_prescribed_count: number;
  ipd_prescribed_estimated_value: number;
  ipd_prescribed_rate: number; // percentage from OPD
  
  ipd_completed_count: number;
  ipd_completed_revenue: number;
  ipd_completed_rate: number; // percentage of prescribed
  
  monthly_revenue: number;
  monthly_revenue_target: number;
  monthly_revenue_growth: number; // percentage
  
  yearly_revenue: number;
  yearly_revenue_target: number;
  yearly_revenue_growth: number; // percentage
}

export interface MonthlyRevenueTrend {
  month: string;
  opd_revenue: number;
  ipd_revenue: number;
  total_revenue: number;
  opd_count: number;
  ipd_count: number;
}

export interface DoctorRevenueItem {
  id: number;
  doctor_name: string;
  specialization: string;
  department: 'OPD' | 'IPD' | 'Both';
  opd_visits: number;
  ipd_admissions: number;
  opd_revenue: number;
  ipd_revenue: number;
  total_revenue: number;
}

export interface RevenueTransaction {
  id: string;
  patient_name: string;
  doctor_name: string;
  department: 'OPD' | 'IPD';
  procedure_service: string;
  amount: number;
  payment_status: 'Paid' | 'Pending' | 'Insurance Claim';
  payment_method: 'UPI / Card' | 'Cash' | 'Insurance' | 'Net Banking';
  date: string;
}
