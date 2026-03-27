import { Outlet, NavLink } from "react-router-dom"
import { useState } from "react"

import {
  Menu,
  Bell,
  User,
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  LogOut
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// =========================
// SIDEBAR
// =========================

const navItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Pedidos", path: "/admin/orders", icon: ShoppingCart },
  { name: "Productos", path: "/admin/products", icon: Package },
  { name: "Usuarios", path: "/admin/users", icon: Users }
]

function Sidebar({ collapsed }: { collapsed: boolean }) {
  return (
    <aside
      className={cn(
        "h-full border-r bg-white flex flex-col transition-all",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* LOGO */}
      <div className="h-16 flex items-center justify-center border-b font-semibold">
        {collapsed ? "WM" : "Wemoguen"}
      </div>

      {/* NAV */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition",
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-muted"
                )
              }
            >
              <Icon className="w-5 h-5" />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          )
        })}
      </nav>

      {/* FOOTER */}
      <div className="p-2 border-t">
        <Button variant="ghost" className="w-full justify-start gap-2">
          <LogOut className="w-4 h-4" />
          {!collapsed && "Cerrar sesión"}
        </Button>
      </div>
    </aside>
  )
}

// =========================
// MAIN LAYOUT
// =========================

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-muted/40 overflow-hidden">

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:flex">
        <Sidebar collapsed={collapsed} />
      </div>

      {/* MOBILE SIDEBAR */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />

          <div className="w-64 bg-white">
            <Sidebar collapsed={false} />
          </div>
        </div>
      )}

      {/* MAIN */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* HEADER */}
        <header className="h-16 border-b bg-white flex items-center justify-between px-4 lg:px-8">

          <div className="flex items-center gap-3">

            {/* MOBILE MENU */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* COLLAPSE BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={() => setCollapsed(!collapsed)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div>
              <h1 className="text-lg font-semibold">Administración</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Panel de gestión
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>

            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>

          </div>

        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>

      </div>

    </div>
  )
}
