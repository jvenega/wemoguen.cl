import { NavLink } from "react-router-dom"
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

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin"
  },
  {
    label: "Productos",
    icon: Package,
    path: "/admin/productos"
  },
  {
    label: "Pedidos",
    icon: ShoppingCart,
    path: "/admin/pedidos"
  },
  {
    label: "Usuarios",
    icon: Users,
    path: "/admin/usuarios"
  }
]

function SidebarContent() {

  const logout = useAuthStore((s) => s.logout)
  const user = useAuthStore((s) => s.user)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-purple-600 text-white shadow-sm"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`

  return (
    <div className="flex flex-col h-full">

      {/* LOGO */}
      <div className="h-16 flex items-center gap-3 px-6 border-b">

        <div className="h-8 w-8 rounded-md bg-purple-600 flex items-center justify-center text-white font-semibold">
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

            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-purple-600 text-white text-xs">
                {user.fullName.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="text-sm leading-tight">
              <p className="font-medium">{user.fullName}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>

          </div>
        )}

        <button
          onClick={logout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={16} />
          Cerrar sesión
        </button>

      </div>

    </div>
  )
}

export default function AdminSidebar() {

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-64 border-r bg-white h-screen sticky top-0">

        <SidebarContent />

      </aside>

      {/* MOBILE SIDEBAR */}
      <div className="lg:hidden p-4 border-b bg-white flex items-center">

        <Sheet>

          <SheetTrigger asChild>
            <button title="menur" className="p-2 rounded-md hover:bg-muted">
              <Menu size={20} />
            </button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-64 p-0"
          >
            <SidebarContent />
          </SheetContent>

        </Sheet>

        <span className="ml-4 font-semibold">
          Panel Admin
        </span>

      </div>
    </>
  )
}