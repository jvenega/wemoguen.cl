import { api } from "@/lib/api"
import { env } from "@/config/env"
import type { LoginPayload, AuthResponse, User } from "@/types/auth.types"

const mockUser: User = {
  id: "1",
  fullName: "Paciente Demo",
  email: "demo@wemoguen.cl",
  role: "PATIENT",
  rut: 12345678-9,
}

export async function loginRequest(
  payload: LoginPayload
): Promise<AuthResponse> {

  // 🔥 MODO MOCK
  if (env.MOCK_AUTH) {
    await new Promise((res) => setTimeout(res, 800))

    if (
      payload.email === "demo@wemoguen.cl" &&
      payload.password === "123456"
    ) {
      return {
        accessToken: "mock-jwt-token",
        user: mockUser,
      }
    }

    throw {
      response: {
        data: {
          message: "Credenciales inválidas (mock).",
        },
      },
    }
  }

  // 🔐 MODO REAL
  const { data } = await api.post("/auth/login", payload)
  return data
}

export async function getMe() {
  const stored = localStorage.getItem("auth-storage")

  if (!stored) {
    throw new Error("No session")
  }

  const parsed = JSON.parse(stored)
  const user = parsed?.state?.user

  if (!user) {
    throw new Error("No user")
  }

  return user
}

export async function logoutRequest() {
  if (env.MOCK_AUTH) return
  await api.post("/auth/logout")
}