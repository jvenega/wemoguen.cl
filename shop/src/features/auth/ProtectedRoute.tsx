import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { getDefaultRouteByRole, type Role } from "@/types/auth.types";

type Props = {
  role?: Role;
  redirectTo?: string;
};

export default function ProtectedRoute({
  role,
  redirectTo = "/iniciar-sesion",
}: Props) {
  const location = useLocation();

  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const isLoading = useAuthStore((s) => s.isLoading);

  const isAuthenticated = !!user && !!accessToken;

  /* =========================
     1. ESPERAR REHIDRATACIÓN
  ========================= */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Verificando sesión...
      </div>
    );
  }

  /* =========================
     2. LOGIN COMO PRIMER FILTRO
  ========================= */
  if (!isAuthenticated) {
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{ from: location.pathname }} // ✅ limpio y seguro
      />
    );
  }

  /* =========================
     3. CONTROL DE ROLES
  ========================= */
  if (role && user.role !== role) {
    return <Navigate to={getDefaultRouteByRole(user.role)} replace />;
  }

  /* =========================
     4. ACCESO OK
  ========================= */
  return <Outlet />;
}
