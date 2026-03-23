import { LogOut } from "lucide-react"
import { useAuthStore } from "@/store/auth.store"

export default function AdminNavbar() {

  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">

      <h1 className="text-lg font-semibold">
        Panel de Administración
      </h1>

      <div className="flex items-center gap-4">

        <span className="text-sm text-gray-600">
          {user?.fullName}
        </span>

        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-600 text-sm"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>

      </div>

    </header>
  )
}