import axios, {
  AxiosError,
  type InternalAxiosRequestConfig
} from "axios"
import { env } from "@/config/env"
import { useAuthStore } from "@/store/auth.store"

/* ===========================
   INSTANCE
=========================== */
export const api = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
})

/* ===========================
   REQUEST INTERCEPTOR
=========================== */
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken

  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

/* ===========================
   REFRESH CONTROL
=========================== */
let isRefreshing = false

let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) {
      p.reject(error)
    } else if (token) {
      p.resolve(token)
    }
  })
  failedQueue = []
}

/* ===========================
   RESPONSE INTERCEPTOR
=========================== */
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // 🔴 protección extra
    if (!originalRequest) {
      return Promise.reject(error)
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      /* ===========================
         YA REFRESCANDO → ENCOLAR
      =========================== */
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers = originalRequest.headers ?? {}
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      /* ===========================
         INICIAR REFRESH
      =========================== */
      originalRequest._retry = true
      isRefreshing = true

      try {
        const response = await api.post("/auth/refresh")

        const newToken = response.data?.accessToken
        const user = response.data?.user

        // 🔴 validación crítica
        if (!newToken || !user) {
          throw new Error("Invalid refresh response")
        }

        useAuthStore.getState().setAuth(user, newToken)

        processQueue(null, newToken)

        originalRequest.headers = originalRequest.headers ?? {}
        originalRequest.headers.Authorization = `Bearer ${newToken}`

        return api(originalRequest)

      } catch (refreshError) {
        processQueue(refreshError, null)

        // 🔴 evitar múltiples logout
        if (useAuthStore.getState().accessToken) {
          useAuthStore.getState().logout()
        }

        return Promise.reject(refreshError)

      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)