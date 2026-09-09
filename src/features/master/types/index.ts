export interface MasterDataItem {
  id: number;
  code: string;
  description: string;
}

export interface UserRole extends MasterDataItem {
  role_level: number;
}

export interface Objection extends MasterDataItem {
  ai_suggest_responses: string[] | null;
}

export interface State extends MasterDataItem {
  country_id: number;
}

export interface Branch extends MasterDataItem {
  location_id: number;
}

export interface ProjectLeadStatus {
  project_id: number;
  status: (string | number)[][];
}

export interface MasterDataResponse {
  customer_statuses: MasterDataItem[];
  lead_priorities: MasterDataItem[];
  projects: MasterDataItem[];
  sources: MasterDataItem[];
  user_roles: UserRole[];
  site_visit_status: MasterDataItem[];
  lead_call_status: MasterDataItem[];
  lead_qualities: MasterDataItem[];
  lead_followup_statuses: MasterDataItem[];
  lead_followup_types: MasterDataItem[];
  objections: Objection[];
  content_types: MasterDataItem[];
  project_lead_statuses: ProjectLeadStatus[];
  lead_statuses: MasterDataItem[];
  project_lead_qualifications: any[];
  project_scoring_rules: any[];
  leadActivityEnum: string[];
  countries: MasterDataItem[];
  states: State[];
  locations: MasterDataItem[];
  branches: Branch[];
  specialisations: MasterDataItem[];
  services: MasterDataItem[];
  appointment_status?: MasterDataItem[];
  appointment_statuses?: MasterDataItem[];
  surgery_statuses?: MasterDataItem[];
  surgery_types?: MasterDataItem[];
}
