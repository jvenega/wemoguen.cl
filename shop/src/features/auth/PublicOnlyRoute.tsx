import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthStore } from "@/store/auth.store"
import { getPostLoginRoute } from "@/types/auth.types"

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

    return <Navigate to={getPostLoginRoute(user.role, from)} replace />
  }

  /* =========================
     NO AUTENTICADO → OK
  ========================= */
  return <Outlet />
}
