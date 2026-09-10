export interface LoginRequest {
  login_id: string;
  password?: string;
}

export interface LoginResponse {
  id: number;
  login_id: string;
  first_name: string;
  last_name: string;
  role_id: number;
  is_first_login: number; // 0 or 1
  token: string;
  refreshToken: string;
  project_ids?: number[];
}

export interface UpdatePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface UpdatePasswordResponse {
  success: boolean;
  message?: string;
}

export interface Role {
  id: number;
  code: string;
  description: string;
  role_level: number;
}

export type RoleCode = 'SADMIN' | 'ADMIN' | 'RELMNG' | 'EXPMNG';

export interface GetUserRolesRequest {
  offset: number;
}

export interface GetUserByIdRequest {
  id: number;
}

export interface GetUserByIdResponse {
  id: number;
  agent_id?: number;
  login_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  profile_pic_location: string | null;
  role_id: number;
  role_code: string;
  role_description: string;
  is_active: number;
  created_on: string;
  updated_on: string | null;
  unread_notification_count: number;
}
