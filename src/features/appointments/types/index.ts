export interface AppointmentDetail {
  appointment_id: number;
  id?: number; // fallback alias
  lead_uuid: string;
  doctor_id: number;
  visit_date_time: string;
  visit_remarks: string;
  appointment_status_id?: number;
  visit_status?: number; // fallback alias
  is_active?: number;
  created_by?: number;
  created_on?: string;
  updated_by?: number;
  updated_on?: string;
  doctor_name?: string;
  rm_first_name?: string;
  rm_last_name?: string;
  rm_phone_number?: string;
  rm_profile_pic_location?: string;
}

export type Appointment = AppointmentDetail;

export interface GetAppointmentsByLeadUuidResponse {
  branch_id?: number;
  specialisation_id?: number;
  lead_note?: string;
  assign_to_rm?: number;
  appointment_details?: AppointmentDetail[];
}

export interface CreateAppointmentRequest {
  lead_uuid: string;
  doctor_id: number;
  visit_date_time: string;
  visit_remarks?: string;
  location_id?: number; // optional backwards compatibility
  visit_status?: number; // optional backwards compatibility
}

export interface GetAppointmentsByLeadUuidRequest {
  lead_uuid: string;
  offset: number;
}

export interface UpdateAppointmentRequest {
  id: number;
  doctor_id: number;
  visit_date_time: string;
  visit_remarks?: string;
  appointments_status_id?: number;
  appointment_status_id?: number; // alias
  is_active?: number;
  location_id?: number; // optional backwards compatibility
  visit_status?: number; // optional backwards compatibility
}
