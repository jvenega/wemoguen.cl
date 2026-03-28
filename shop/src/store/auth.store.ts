import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { User } from "@/types/auth.types"

// =========================
// TYPES
// =========================

type AuthState = {
  user: User | null
  accessToken: string | null

  // actions
  setAuth: (user: User, token: string) => void
  logout: () => void

  // helpers
  isAuthenticated: () => boolean
}

// =========================
// STORE
// =========================

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({

      user: null,
      accessToken: null,

      // =========================
      // SET AUTH
      // =========================
      setAuth: (user, token) => {
        set({
          user,
          accessToken: token,
        })
      },

      // =========================
      // LOGOUT (ROBUSTO)
      // =========================
      logout: () => {

        // limpiar estado en memoria
        set({
          user: null,
          accessToken: null,
        })

        // limpiar persistencia correctamente
        useAuthStore.persist.clearStorage()
      },

      // =========================
      // HELPERS
      // =========================
      isAuthenticated: () => {
        const { accessToken } = get()
        return !!accessToken
      },

    }),
    {
      name: "auth-storage",

      storage: createJSONStorage(() => localStorage),

      // solo persistimos lo necesario
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),

      // =========================
      // REHYDRATION CONTROL
      // =========================
      onRehydrateStorage: () => (state) => {

        if (!state) return

        // 🔐 validación básica
        if (!state.accessToken) {
          state.user = null
        }

        // 👉 aquí puedes validar expiración JWT en el futuro
      },
    }
  )
)