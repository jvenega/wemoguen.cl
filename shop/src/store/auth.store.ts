import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { User } from "@/types/auth.types"

type AuthState = {
  user: User | null
  accessToken: string | null
  setAuth: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

      setAuth: (user, token) =>
        set({
          user,
          accessToken: token,
        }),

      logout: () => {
        set({
          user: null,
          accessToken: null,
        })

        // 🔥 Limpieza explícita del storage
        localStorage.removeItem("auth-storage")
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)