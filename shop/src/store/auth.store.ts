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
  hasHydrated: boolean

  // actions
  setAuth: (user: User, token: string) => void
  logout: () => void

  // helpers
  isAuthenticated: () => boolean
}

// =========================
// UTILS
// =========================

const setAuthHeader = (token: string | null) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common.Authorization
  }
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
      hasHydrated: false,

      /* =========================
         SET AUTH
      ========================= */
      setAuth: (user, token) => {
        set({
          user,
          accessToken: token,
          isLoading: false,
        })

        setAuthHeader(token)
      },

      /* =========================
         LOGOUT (MEJORADO)
      ========================= */
      logout: () => {
        const { user, accessToken } = get()

        if (!user && !accessToken) return

        // 1. resetear estado (primero)
        set({
          user: null,
          accessToken: null,
          isLoading: false,
        })

        // 2. limpiar persistencia
        useAuthStore.persist.clearStorage()

        // 3. limpiar headers
        setAuthHeader(null)
      },

      /* =========================
         HELPERS
      ========================= */
      isAuthenticated: () => {
        const { accessToken, user } = get()
        return Boolean(accessToken && user)
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
         REHYDRATION CONTROL (FIX)
      ========================= */
      onRehydrateStorage: () => (state) => {
        // fallback SI NO SE EJECUTA CORRECTO
        setTimeout(() => {
          const current = useAuthStore.getState()

          if (!current.hasHydrated) {
            useAuthStore.setState({
              isLoading: false,
              hasHydrated: true,
            })
          }
        }, 100)

        if (!state) {
          useAuthStore.setState({
            isLoading: false,
            hasHydrated: true,
          })
          return
        }

        const isValid =
          state.accessToken &&
          state.user &&
          state.user.role

        if (!isValid) {
          useAuthStore.setState({
            user: null,
            accessToken: null,
            isLoading: false,
            hasHydrated: true,
          })
          setAuthHeader(null)
          return
        }

        setAuthHeader(state.accessToken)

        useAuthStore.setState({
          isLoading: false,
          hasHydrated: true,
        })
      }
    }
  )
)