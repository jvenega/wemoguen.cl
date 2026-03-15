import { Link, useLocation } from "react-router-dom"
import {
  ShoppingCart,
  Menu,
  User,
  LogOut,
  Shield,
  Package,
  Home,
  UserCircle
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { useCartStore } from "@/store/cart.store"
import { useAuthStore } from "@/store/auth.store"

import { useEffect, useState, useMemo } from "react"

/* ================================
   ROUTE PROGRESS BAR
================================ */

function RouteProgressBar() {
  const location = useLocation()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(30)

    const t1 = setTimeout(() => setProgress(70), 120)
    const t2 = setTimeout(() => setProgress(100), 260)
    const t3 = setTimeout(() => setProgress(0), 420)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [location.pathname])

  return (
    <div
      className="fixed top-0 left-0 h-0.75 bg-purple-400 z-200 transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  )
}

/* ================================
   NAV CONFIG
================================ */

const navItems = [
  { label: "Productos", icon: Home, path: "/" },
  { label: "Mis pedidos", icon: Package, path: "/orders", auth: true },
  { label: "Mi perfil", icon: UserCircle, path: "/profile", auth: true },
  { label: "Administración", icon: Shield, path: "/admin", admin: true }
]

/* ================================
   NAVBAR
================================ */

export default function NavbarPremium() {
  const { items } = useCartStore()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  const location = useLocation()
  const [openUserMenu, setOpenUserMenu] = useState(false)

  useEffect(() => {
    setOpenUserMenu(false)
  }, [location.pathname])

  const totalItems = useMemo(
    () => items.reduce((acc, i) => acc + i.quantity, 0),
    [items]
  )

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-white font-semibold"
      : "text-white/70 hover:text-white transition"

  const visibleNav = navItems.filter((item) => {
    if (item.admin && user?.role !== "ADMIN") return false
    if (item.auth && !user) return false
    return true
  })

  return (
    <>
      <RouteProgressBar />

      <header className="sticky top-0 z-50 bg-[#4B2863] text-white shadow-xl backdrop-blur">

        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/"
            className="text-lg md:text-xl tracking-[0.25em] font-semibold"
          >
            WEMÖGUEN
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-12 text-sm uppercase tracking-wide">

            {visibleNav.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 ${isActive(item.path)}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}

          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-5">

            {/* CART */}
            <Link to="/cart" className="relative group flex items-center justify-center">

              <ShoppingCart className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />

              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 text-xs bg-white text-[#4B2863]">
                  {totalItems}
                </Badge>
              )}

            </Link>

            {/* USER DESKTOP */}
            {user ? (
              <div className="relative hidden md:block">

                <button
                  type="button"
                  title="Menú de usuario"
                  onClick={() => setOpenUserMenu((p) => !p)}
                  aria-haspopup="menu"
                  aria-expanded={openUserMenu}
                  className="flex items-center gap-2 hover:opacity-90 transition"
                >

                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-white text-[#4B2863] text-xs">
                      {user.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <span className="text-sm">{user.fullName}</span>

                </button>

                {openUserMenu && (
                  <div className="absolute right-0 mt-4 w-56 bg-white text-gray-800 rounded-xl shadow-xl border overflow-hidden">

                    <div className="px-4 py-4 border-b bg-gray-50">
                      <p className="text-sm font-medium">{user.fullName}</p>
                      <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                    </div>

                    {user.role === "ADMIN" && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-sm"
                      >
                        <Shield className="h-4 w-4" />
                        Panel Admin
                      </Link>
                    )}

                    <button
                      onClick={logout}
                      className="flex items-center gap-2 w-full px-4 py-3 hover:bg-gray-100 text-sm text-red-600"
                    >
                      <LogOut className="h-4 w-4" />
                      Cerrar sesión
                    </button>

                  </div>
                )}

              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block text-sm border border-white/40 px-4 py-1.5 rounded-full hover:bg-white hover:text-[#4B2863] transition"
              >
                Ingresar
              </Link>
            )}

            {/* MOBILE MENU */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden" title="mob1">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="bg-[#4B2863] text-white border-none w-72"
              >

                {user && (
                  <div className="flex items-center gap-3 pb-6 border-b border-white/20">

                    <Avatar>
                      <AvatarFallback className="bg-white text-[#4B2863]">
                        {user.fullName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="text-sm font-medium">{user.fullName}</p>
                      <p className="text-xs opacity-70">{user.email}</p>
                    </div>

                  </div>
                )}

                <div className="mt-8 flex flex-col gap-6 text-lg">

                  {visibleNav.map((item) => {
                    const Icon = item.icon

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center gap-3"
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    )
                  })}

                  <div className="border-t border-white/20 my-2" />

                  {!user && (
                    <Link to="/login" className="flex items-center gap-3">
                      <User className="h-5 w-5" />
                      Ingresar
                    </Link>
                  )}

                  {user && (
                    <button
                      onClick={logout}
                      className="flex items-center gap-3 text-red-300"
                    >
                      <LogOut className="h-5 w-5" />
                      Cerrar sesión
                    </button>
                  )}

                </div>

              </SheetContent>
            </Sheet>

          </div>
        </div>
      </header>
    </>
  )
}