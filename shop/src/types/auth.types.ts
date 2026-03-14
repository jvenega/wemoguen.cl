export type User = {
  id: string
  fullName: string
  email: string
  rut: number
  role: "PATIENT" | "ADMIN"
  address: string
  commune: string
  city: string
  
}

export type LoginPayload = {
  email: string
  password: string
}

export type AuthResponse = {
  accessToken: string
  user: User
}