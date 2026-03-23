import { api } from "@/lib/api";
import { env } from "@/config/env";
import type { LoginPayload, AuthResponse, User } from "@/types/auth.types";

/* -------------------------------------------------------------------------- */
/* MOCK USERS                                                                 */
/* -------------------------------------------------------------------------- */

type MockUser = User & { password: string };

const mockUsers: MockUser[] = [
  {
    id: "1",
    fullName: "Paciente Demo",
    email: "demo@wemoguen.cl",
    password: "123456",
    role: "PATIENT",
    rut: 12345678,
    address: "Calle Falsa 123",
    commune: "Providencia",
    city: "Santiago",
  },
  {
    id: "2",
    fullName: "Administrador Demo",
    email: "admin@wemoguen.cl",
    password: "123456",
    role: "ADMIN",
    rut: 98765432,
    address: "Av. Siempre Viva 742",
    commune: "Las Condes",
    city: "Santiago",
  },
];

/* -------------------------------------------------------------------------- */
/* UTILIDADES                                                                 */
/* -------------------------------------------------------------------------- */

function simulateDelay(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateMockToken(userId: string) {
  return `mock-jwt-${userId}-${Date.now()}`;
}

function sanitizeUser(user: MockUser): User {
  const userData: User = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    rut: user.rut,
    address: user.address,
    commune: user.commune,
    city: user.city,
  };

  return userData;
}

/* -------------------------------------------------------------------------- */
/* LOGIN                                                                      */
/* -------------------------------------------------------------------------- */

export async function loginRequest(
  payload: LoginPayload
): Promise<AuthResponse> {

  if (env.MOCK_AUTH) {

    await simulateDelay();

    const user = mockUsers.find(
      (u) => u.email === payload.email
    );

    if (!user || user.password !== payload.password) {
      throw {
        response: {
          data: {
            message: "Credenciales inválidas.",
          },
        },
      };
    }

    const token = generateMockToken(user.id);

    return {
      accessToken: token,
      user: sanitizeUser(user),
      role: user.role,
    };
  }

  const { data } = await api.post("/auth/login", payload);
  return data;
}

/* -------------------------------------------------------------------------- */
/* GET USER                                                                   */
/* -------------------------------------------------------------------------- */

export async function getMe(): Promise<User> {

  if (env.MOCK_AUTH) {

    const stored = localStorage.getItem("auth-storage");

    if (!stored) {
      throw new Error("No session");
    }

    const parsed = JSON.parse(stored);
    const user = parsed?.state?.user;

    if (!user) {
      throw new Error("No user");
    }

    return user;
  }

  const { data } = await api.get("/auth/me");
  return data;
}

/* -------------------------------------------------------------------------- */
/* LOGOUT                                                                     */
/* -------------------------------------------------------------------------- */

export async function logoutRequest() {

  if (env.MOCK_AUTH) {
    localStorage.removeItem("auth-storage");
    return;
  }

  await api.post("/auth/logout");
}