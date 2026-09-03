export type DepartmentType = "OPD" | "IPD" | "Both";
export type DoctorStatus = "Available" | "In Consultation" | "On Leave" | "Emergency Only";

export interface Doctor {
  id: number;
  uuid: string;
  name: string;
  first_name?: string;
  last_name?: string;
  title?: string; // e.g. "Dr."
  specialization: string;
  department: DepartmentType;
  service_type?: string;
  qualification: string;
  experience_years: number;
  email: string;
  phone_number: string;
  image_url: string;
  rating: number;
  patients_count: number;
  availability_status: DoctorStatus;
  consultation_fee: number;
  working_hours?: string;
  room_number?: string;
  bio?: string;
  hospital_branch?: string;
  is_active: number;
  created_at: string;
}

export interface DoctorFilterState {
  search: string;
  department: "All" | DepartmentType;
  status: "All" | DoctorStatus;
  specialization: string;
  branch: string;
  page: number;
  limit: number;
}

export interface CreateDoctorRequest {
  name: string;
  first_name?: string;
  last_name?: string;
  title?: string;
  specialization: string;
  department: DepartmentType;
  service_type?: string;
  qualification: string;
  experience_years: number;
  email: string;
  phone_number: string;
  image_url?: string;
  availability_status?: DoctorStatus;
  consultation_fee: number;
  working_hours?: string;
  room_number?: string;
  bio?: string;
  hospital_branch?: string;
}

export type UpdateDoctorRequest = Partial<CreateDoctorRequest> & { id: number };
