import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthStore } from "@/store/auth.store"

export default function PublicOnlyRoute() {
  const location = useLocation()

  const user = useAuthStore((s) => s.user)
  const accessToken = useAuthStore((s) => s.accessToken)
  const isLoading = useAuthStore((s) => s.isLoading)

  const isAuthenticated = !!user && !!accessToken

  /* =========================
     LOADING
  ========================= */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Verificando sesión...
      </div>
    )
  }

  /* =========================
     YA AUTENTICADO → REDIRECT
  ========================= */
  if (isAuthenticated) {
    const from = location.state?.from as string | undefined

    if (from && from !== "/iniciar-sesion") {
      return <Navigate to={from} replace />
    }

    if (user.role === "ADMIN") {
      return <Navigate to="/admin" replace />
    }

    return <Navigate to="/" replace />
  }

  /* =========================
     NO AUTENTICADO → OK
  ========================= */
  return <Outlet />
}