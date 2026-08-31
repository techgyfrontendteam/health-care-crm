export interface SiteVisitCompletedItem {
  leadName: string;
  time: string;
  leadId: string;
  projectName: string;
  emName: string;
}

export interface TodayVisitLogItem {
  time: string;
  leadName: string;
  projectName: string;
  status: "Negotiation" | "Booking Done" | "Follow Up";
}

export interface BookingCompletedItem {
  leadName: string;
  date: string;
  time: string;
  leadId: string;
  rmName: string;
}

export interface MissedFollowUpItem {
  leadName: string;
  date: string;
  time: string;
  leadId: string;
  assignedTo: string;
}

export interface WarRoomData {
  kpis: {
    newLeadsToday: number;
    siteVisitsCompleted: number;
    bookingsClosed: number;
    missedFollowUps: number;
  };
  leadQuality: {
    hot: number;
    warm: number;
    cold: number;
    junk: number;
    activeRate: number;
  };
  activeObjections: Array<{
    label: string;
    percentage: number;
  }>;
  visitLog: TodayVisitLogItem[];
  siteVisitsCompletedList: SiteVisitCompletedItem[];
  bookingsClosedList: BookingCompletedItem[];
  missedFollowUpsList: MissedFollowUpItem[];
  metrics: {
    callsMade: number;
    callsCompleted: number;
    followUps: number;
  };
}

export interface LeadQualityDistributionItem {
  name: string;
  count: number;
}

export interface ActiveObjectionsTodayItem {
  name: string;
  count: number;
}

export interface TodayVisitLogsItem {
  datetime: string;
  first_name: string;
  last_name: string;
  project_name: string;
  lead_status: string;
}

export interface GetWarRoomDataRequest {
  project_id: number;
  start_date: string;
  end_date: string;
  user_id?: number | string;
}

export interface WarRoomApiResponseData {
  new_leads_today: number;
  site_visits_completed: number;
  bookings_closed: number;
  missed_follow_ups: number;
  lead_quality_distribution: LeadQualityDistributionItem[];
  active_objections_today: ActiveObjectionsTodayItem[];
  today_visit_logs: TodayVisitLogsItem[];
  no_of_calls_made: number;
  no_of_calls_completed: number;
  no_of_follow_ups: number;
}

export type GetWarRoomDataResponse = 
  | { success: boolean; data: WarRoomApiResponseData }
  | WarRoomApiResponseData;
