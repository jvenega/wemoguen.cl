import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom"
import { useMemo, useState } from "react"
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  LayoutPanelTop,
  LogOut,
  Menu,
  ShieldCheck,
} from "lucide-react"

import { Notifications } from "./Notifications"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/store/auth.store"
import { adminNavItems, adminRouteLabels } from "@/components/admin/admin-nav"

function Breadcrumbs() {
  const location = useLocation()

  const crumbs = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean)

    return segments.map((segment, index) => ({
      label: adminRouteLabels[segment] || segment,
      path: `/${segments.slice(0, index + 1).join("/")}`,
    }))
  }, [location.pathname])

  return (
    <div className="flex flex-wrap items-center gap-1 text-sm text-[#7e6f88]">
      {crumbs.map((crumb, index) => (
        <div key={crumb.path} className="flex items-center gap-1">
          {index > 0 && <ChevronRight className="h-3.5 w-3.5" />}
          <span
            className={cn(
              index === crumbs.length - 1 && "font-medium text-[#2d1839]"
            )}
          >
            {crumb.label}
          </span>
        </div>
      ))}
    </div>
  )
}

function Sidebar({
  collapsed,
  onClose,
}: {
  collapsed: boolean
  onClose?: () => void
}) {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    navigate("/iniciar-sesion", { replace: true })
  }

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-[#eadff0] bg-white/92 backdrop-blur transition-all duration-300",
        collapsed ? "w-24" : "w-72"
      )}
    >
      <div className="border-b border-[#efe5f3] px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#4b2863_0%,#6b3b85_100%)] text-white shadow-[0_16px_28px_rgba(75,40,99,0.24)]">
            <ShieldCheck className="h-5 w-5" />
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#2d1839]">Wemoguen</p>
              <p className="text-xs uppercase tracking-[0.18em] text-[#8d789a]">
                Panel Admin
              </p>
            </div>
          )}

          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto lg:hidden"
              onClick={onClose}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="px-4 py-4">
        <div
          className={cn(
            "rounded-[1.5rem] border border-[#efe4f4] bg-[linear-gradient(135deg,#fbf7fd_0%,#fffaf7_100%)] p-4",
            collapsed && "px-3"
          )}
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 border border-white/70">
              <AvatarFallback className="bg-[#4b2863] text-sm text-white">
                {user?.fullName?.slice(0, 1) || "A"}
              </AvatarFallback>
            </Avatar>

            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#2d1839]">
                  {user?.fullName ?? "Administrador"}
                </p>
                <p className="truncate text-xs text-[#7e6f88]">
                  {user?.email ?? "admin@wemoguen.cl"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 pb-4">
        {adminNavItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition",
                  isActive
                    ? "bg-[#4b2863] text-white shadow-[0_12px_24px_rgba(75,40,99,0.22)]"
                    : "text-[#65586e] hover:bg-[#f7f1fa] hover:text-[#2d1839]",
                  collapsed && "justify-center px-0"
                )
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>

      <div className="border-t border-[#efe5f3] p-3">
        <Button
          variant="ghost"
          className={cn(
            "w-full rounded-2xl text-red-600 hover:bg-red-50 hover:text-red-700",
            collapsed ? "justify-center px-0" : "justify-start gap-2"
          )}
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && "Cerrar sesion"}
        </Button>
      </div>
    </aside>
  )
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  const currentSection =
    adminNavItems.find((item) =>
      item.path === "/admin"
        ? location.pathname === "/admin"
        : location.pathname.startsWith(item.path)
    )?.label ?? "Panel"

  return (
    <div className="flex h-screen overflow-hidden bg-[linear-gradient(180deg,#fbf8fc_0%,#f4edf7_100%)]">
      <div className="hidden lg:flex">
        <Sidebar collapsed={collapsed} />
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden transition-opacity",
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div
          className="absolute inset-0 bg-[#2d1839]/40"
          onClick={() => setSidebarOpen(false)}
        />

        <div
          className={cn(
            "absolute left-0 top-0 h-full w-72 max-w-[86vw] transform transition-transform",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <Sidebar collapsed={false} onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-[#eadff0] bg-white/80 px-4 py-4 backdrop-blur lg:px-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex items-center gap-2 pt-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden lg:flex"
                  onClick={() => setCollapsed((value) => !value)}
                >
                  <LayoutPanelTop className="h-5 w-5" />
                </Button>
              </div>

              <div className="min-w-0">
                <div className="inline-flex items-center rounded-full border border-[#e7dceb] bg-[#faf6fc] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[#8d789a]">
                  Administracion interna
                </div>
                <h1 className="mt-3 text-2xl font-semibold text-[#2d1839]">
                  {currentSection}
                </h1>
                <p className="mt-1 text-sm text-[#73667a]">
                  Gestiona catalogo, pedidos y usuarios desde un flujo mas claro.
                </p>
                <div className="mt-3">
                  <Breadcrumbs />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-[#ebdff0] bg-white px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-[#8d789a]">
                  Acceso
                </p>
                <p className="mt-1 text-sm font-semibold text-[#2d1839]">
                  Modo administrador activo
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Notifications />

                <Button variant="ghost" size="icon" className="rounded-2xl border border-[#eadff0] bg-white">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-[1600px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
