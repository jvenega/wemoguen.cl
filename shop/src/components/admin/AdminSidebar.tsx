import { NavLink, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Menu
} from "lucide-react"

import { useAuthStore } from "@/store/auth.store"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

// =========================
// NAV ITEMS
// =========================

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Productos", icon: Package, path: "/admin/productos" },
  { label: "Pedidos", icon: ShoppingCart, path: "/admin/pedidos" },
  { label: "Usuarios", icon: Users, path: "/admin/usuarios" }
]

// =========================
// SIDEBAR CONTENT
// =========================

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate()

  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  const handleLogout = () => {
    logout()
    
    navigate("/iniciar-sesion", { replace: true })
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition",
      isActive
        ? "bg-purple-600 text-white shadow-sm"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    )

  return (
    <div className="flex flex-col h-full">

      {/* LOGO */}
      <div className="h-16 flex items-center gap-3 px-6 border-b">
        <div className="h-9 w-9 rounded-lg bg-linear-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white font-semibold">
          W
        </div>

        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-sm">Wemoguen</span>
          <span className="text-xs text-muted-foreground">Admin</span>
        </div>
      </div>

      {/* NAV */}
      <nav className="flex flex-col gap-1 p-4 flex-1">

        {navItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              onClick={onNavigate}
              className={linkClass}
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          )
        })}

      </nav>

      {/* USER + LOGOUT */}
      <div className="border-t p-4">

        {user && (
          <div className="flex items-center gap-3 mb-4">

            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-purple-600 text-white text-xs">
                {user.fullName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="text-sm leading-tight overflow-hidden">
              <p className="font-medium truncate">
                {user.fullName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>

          </div>
        )}

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>

      </div>
    </div>
  )
}

// =========================
// MAIN SIDEBAR
// =========================

export default function AdminSidebar() {
  return (
    <>
      {/* DESKTOP */}
      <aside className="hidden lg:flex w-64 border-r bg-white h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* MOBILE HEADER */}
      <div className="lg:hidden flex items-center justify-between px-4 h-16 border-b bg-white">

        <Sheet>
          <SheetTrigger asChild>
            <button
              aria-label="Abrir menú"
              className="p-2 rounded-md hover:bg-muted transition"
            >
              <Menu size={20} />
            </button>
          </SheetTrigger>

          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent onNavigate={() => {}} />
          </SheetContent>
        </Sheet>

        <span className="font-semibold text-sm">
          Panel Admin
        </span>

      </div>
    </>
  )
}