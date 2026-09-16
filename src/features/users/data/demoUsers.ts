import type { User } from "../types";

export const demoSalesHeads: User[] = [
  { id: 301, login_id: "rahul.mehta", first_name: "Rahul", last_name: "Mehta", phone_number: "+91 90001 10001", email: "rahul.mehta@techgylink.com", role_id: 3, role_code: "RELMNG", role_description: "Sales Head", is_active: 1, created_on: "2026-01-12T09:00:00.000Z", updated_on: null, reportee_count: 3, project_name: "Nizampet" },
  { id: 302, login_id: "priya.sharma", first_name: "Priya", last_name: "Sharma", phone_number: "+91 90001 10002", email: "priya.sharma@techgylink.com", role_id: 3, role_code: "RELMNG", role_description: "Sales Head", is_active: 1, created_on: "2026-02-08T09:00:00.000Z", updated_on: null, reportee_count: 3, project_name: "Kondapur" },
  { id: 303, login_id: "karan.verma", first_name: "Karan", last_name: "Verma", phone_number: "+91 90001 10003", email: "karan.verma@techgylink.com", role_id: 3, role_code: "RELMNG", role_description: "Sales Head", is_active: 1, created_on: "2026-03-18T09:00:00.000Z", updated_on: null, reportee_count: 2, project_name: "KPHB" },
];

export const demoSalesExecutives: User[] = [
  { id: 401, login_id: "nisha.kapoor", first_name: "Nisha", last_name: "Kapoor", phone_number: "+91 90002 20001", email: "nisha.kapoor@techgylink.com", role_id: 4, role_code: "EXPMNG", role_description: "Sales Executive", is_active: 1, created_on: "2026-02-02T09:00:00.000Z", updated_on: null, reporting_manager_id: 301, assigned_visits_count: 18, project_name: "Nizampet" },
  { id: 402, login_id: "arjun.nair", first_name: "Arjun", last_name: "Nair", phone_number: "+91 90002 20002", email: "arjun.nair@techgylink.com", role_id: 4, role_code: "EXPMNG", role_description: "Sales Executive", is_active: 1, created_on: "2026-02-14T09:00:00.000Z", updated_on: null, reporting_manager_id: 302, assigned_visits_count: 14, project_name: "Kondapur" },
  { id: 403, login_id: "sneha.rao", first_name: "Sneha", last_name: "Rao", phone_number: "+91 90002 20003", email: "sneha.rao@techgylink.com", role_id: 4, role_code: "EXPMNG", role_description: "Sales Executive", is_active: 1, created_on: "2026-03-01T09:00:00.000Z", updated_on: null, reporting_manager_id: 303, assigned_visits_count: 12, project_name: "KPHB" },
  { id: 404, login_id: "asha.patel", first_name: "Asha", last_name: "Patel", phone_number: "+91 90002 20004", email: "asha.patel@techgylink.com", role_id: 4, role_code: "EXPMNG", role_description: "Sales Executive", is_active: 1, created_on: "2026-03-22T09:00:00.000Z", updated_on: null, reporting_manager_id: 301, assigned_visits_count: 10, project_name: "Nizampet" },
];
