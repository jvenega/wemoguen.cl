export type Role = "ADMIN" | "PATIENT";

export function getDefaultRouteByRole(role: Role) {
  return role === "ADMIN" ? "/admin" : "/"
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  rut: number;
  address: string;
  commune: string;
  city: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
