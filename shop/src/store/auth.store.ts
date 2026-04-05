import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { User } from "@/types/auth.types"
import { api } from "@/lib/api"

// =========================
// TYPES
// =========================

type AuthState = {
  user: User | null
  accessToken: string | null
  isLoading: boolean

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
      isLoading: true,

      /* =========================
         SET AUTH
      ========================= */
      setAuth: (user, token) => {
        set({
          user,
          accessToken: token,
          isLoading: false,
        })

        // 🔐 set global header
        api.defaults.headers.common.Authorization = `Bearer ${token}`
      },

      /* =========================
         LOGOUT (ROBUSTO)
      ========================= */
      logout: () => {
        const state = get()

        // evitar ejecuciones innecesarias
        if (!state.user && !state.accessToken) return

        // 1. limpiar persistencia primero
        useAuthStore.persist.clearStorage()

        // 2. limpiar headers globales
        delete api.defaults.headers.common.Authorization

        // 3. resetear estado completo
        set({
          user: null,
          accessToken: null,
          isLoading: false,
        })
      },

      /* =========================
         HELPERS
      ========================= */
      isAuthenticated: () => {
        const { accessToken, user } = get()
        return !!accessToken && !!user
      },

    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),

      /* =========================
         REHYDRATION CONTROL
      ========================= */
      onRehydrateStorage: () => (state) => {
        if (!state) return

        // 🔴 consistencia fuerte
        if (!state.accessToken || !state.user) {
          state.user = null
          state.accessToken = null
        }

        // 🔐 restaurar header si existe token
        if (state.accessToken) {
          api.defaults.headers.common.Authorization = `Bearer ${state.accessToken}`
        }

        // ✅ fin de carga
        state.isLoading = false
      },
    }
  )
)