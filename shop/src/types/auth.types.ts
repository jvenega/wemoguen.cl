export type Role = "ADMIN" | "PATIENT";

export function getDefaultRouteByRole(role: Role) {
  return role === "ADMIN" ? "/admin" : "/"
}

export function isAdminRoute(path: string) {
  return path === "/admin" || path.startsWith("/admin/")
}

export function getPostLoginRoute(role: Role, from?: string) {
  const defaultRoute = getDefaultRouteByRole(role)

  if (!from || from === "/iniciar-sesion") {
    return defaultRoute
  }

  if (role === "ADMIN") {
    return isAdminRoute(from) ? from : defaultRoute
  }

  return isAdminRoute(from) ? defaultRoute : from
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
