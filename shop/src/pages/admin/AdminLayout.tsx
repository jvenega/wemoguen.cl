import { Outlet, NavLink, useLocation } from "react-router-dom"
import { useState, useMemo } from "react"
import { Notifications } from "./Notifications"
import {
  Menu,
  User,
  LayoutDashboard,
  ShoppingCart,
  Users,
  Package,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// =========================
// NAV CONFIG
// =========================

const navItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Pedidos", path: "/admin/orders", icon: ShoppingCart },
  { name: "Productos", path: "/admin/products", icon: Package },
  { name: "Usuarios", path: "/admin/users", icon: Users }
]

// =========================
// BREADCRUMB MAP
// =========================

const routeMap: Record<string, string> = {
  admin: "Dashboard",
  orders: "Pedidos",
  products: "Productos",
  users: "Usuarios",
}

// =========================
// BREADCRUMBS
// =========================

function Breadcrumbs() {
  const location = useLocation()

  const crumbs = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean)

    return segments.map((seg, i) => ({
      label: routeMap[seg] || seg,
      path: "/" + segments.slice(0, i + 1).join("/")
    }))
  }, [location.pathname])

  return (
    <div className="flex items-center gap-1 text-lg text-muted-foreground text">

      {crumbs.map((crumb, i) => (
        <div key={crumb.path} className="flex items-center gap-1">

          {i > 0 && <ChevronRight className="w-3 h-3" />}

          <span
            className={cn(
              i === crumbs.length - 1 && "text-foreground font-medium"
            )}
          >
            {crumb.label}
          </span>

        </div>
      ))}

    </div>
  )
}

// =========================
// SIDEBAR
// =========================

function Sidebar({
  collapsed,
  onClose
}: {
  collapsed: boolean
  onClose?: () => void
}) {
  return (
    <aside
      className={cn(
        "h-full bg-white border-r flex flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >

      {/* HEADER */}
      <div className="h-16 flex items-center justify-between px-4 border-b">

        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-purple-600 text-white flex items-center justify-center text-sm font-semibold">
            W
          </div>

          {!collapsed && (
            <span className="font-semibold text-sm">
              Wemoguen
            </span>
          )}
        </div>

        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}

      </div>

      {/* NAV */}
      <nav className="flex-1 p-2 space-y-1">

        {navItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition",
                  isActive
                    ? "bg-purple-600 text-white shadow-sm"
                    : "hover:bg-muted text-muted-foreground"
                )
              }
            >
              <Icon className="w-5 h-5" />

              {!collapsed && (
                <span className="truncate">{item.name}</span>
              )}
            </NavLink>
          )
        })}

      </nav>

      {/* FOOTER */}
      <div className="p-2 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-red-600 hover:bg-red-50"
        >
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
    <div className="h-screen flex bg-muted/40 overflow-hidden">

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:flex">
        <Sidebar collapsed={collapsed} />
      </div>

      {/* MOBILE SIDEBAR */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity",
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setSidebarOpen(false)}
        />

        <div
          className={cn(
            "absolute left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <Sidebar collapsed={false} onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* MAIN */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* HEADER */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-8">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={() => setCollapsed(!collapsed)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex flex-col">

              {/* 🔥 Breadcrumbs */}
              <Breadcrumbs />
            </div>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">

            <Notifications />

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