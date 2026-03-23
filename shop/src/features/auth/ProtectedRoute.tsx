import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthStore } from "@/store/auth.store"

export default function ProtectedRoute({ role }: { role?: string }) {

  const user = useAuthStore((s) => s.user)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/iniciar-sesion" replace />
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return <Outlet />
}