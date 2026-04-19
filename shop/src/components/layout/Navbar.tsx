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

import { useCartStore } from "@/store/cart.store"
import { useAuthStore } from "@/store/auth.store"

import { useEffect, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

/* ================================
   ROUTE PROGRESS BAR
================================ */

function RouteProgressBar() {
  const location = useLocation()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const t0 = setTimeout(() => setProgress(30), 0)
    const t1 = setTimeout(() => setProgress(70), 120)
    const t2 = setTimeout(() => setProgress(100), 260)
    const t3 = setTimeout(() => setProgress(0), 420)

    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [location.pathname])

  return (
    <div
      className="fixed top-0 left-0 h-0.5 bg-purple-400 z-999 transition-all duration-300"
      style={{ width: `${progress}%` }}
    />
  )
}

/* ================================
   NAV CONFIG
================================ */

const navItems = [
  { label: "Productos", icon: Home, path: "/" },
  { label: "Mis pedidos", icon: Package, path: "/pedidos", auth: true },
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
  const [openMobile, setOpenMobile] = useState(false)

  useEffect(() => {
    setOpenUserMenu(false)
    setOpenMobile(false) // 🔥 cierra mobile al navegar
  }, [location.pathname])

  const totalItems = useMemo(
    () => items.reduce((acc, i) => acc + i.quantity, 0),
    [items]
  )

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-white font-semibold"
      : "text-white/60 hover:text-white"

  const visibleNav = navItems.filter((item) => {
    if (item.admin && user?.role !== "ADMIN") return false
    if (item.auth && !user) return false
    return true
  })

  return (
    <>
      <RouteProgressBar />

      <header className="sticky top-0 z-50 bg-[#4B2863] text-white shadow-xl">

        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="text-lg md:text-xl tracking-[0.25em] font-semibold">
            WEMÖGUEN
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-10 text-sm uppercase tracking-wide">
            {visibleNav.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 transition ${isActive(item.path)}`}
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
            <Link to="/carrito" className="relative group">
              <ShoppingCart className="h-5 w-5 transition group-hover:scale-110" />
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
                  onClick={() => setOpenUserMenu((p) => !p)}
                  className="flex items-center gap-2 hover:opacity-90 transition"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-white text-[#4B2863] font-semibold">
                      {user.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{user.fullName}</span>
                </button>

                {openUserMenu && (
                  <div className="absolute right-0 mt-4 w-60 bg-white text-gray-800 rounded-xl shadow-xl border overflow-hidden">
                    <div className="px-4 py-4 border-b bg-gray-50">
                      <p className="text-sm font-medium">{user.fullName}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>

                    {user.role === "ADMIN" && (
                      <Link to="/admin" className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-sm">
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
                to="/iniciar-sesion"
                className="hidden md:block text-sm border border-white/40 px-4 py-1.5 rounded-full hover:bg-white hover:text-[#4B2863] transition"
              >
                Ingresar
              </Link>
            )}

            {/* MOBILE BUTTON */}
            <button title="Menu" onClick={() => setOpenMobile(true)} className="md:hidden">
              <Menu className="h-6 w-6" />
            </button>

          </div>
        </div>
      </header>

      {/* ================================
         MOBILE IOS MENU
      ================================= */}

      <AnimatePresence>
        {openMobile && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setOpenMobile(false)}
            />

            {/* PANEL */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-[#4B2863]/95 backdrop-blur-xl z-50 text-white flex flex-col"
            >

              <div className="h-6" />

              {/* USER */}
              {user && (
                <div className="px-5 pb-6">
                  <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/10">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-white text-[#4B2863] font-semibold">
                        {user.fullName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <p className="text-base font-semibold truncate">{user.fullName}</p>
                      <p className="text-xs opacity-70 truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* NAV */}
              <div className="px-4 space-y-6">

                <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">

                  {visibleNav.map((item, index) => {
                    const Icon = item.icon

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setOpenMobile(false)}
                        className={`flex items-center gap-4 px-4 py-4 active:scale-[0.97]
                          ${index !== 0 ? "border-t border-white/10" : ""}
                          ${location.pathname === item.path ? "bg-white/10" : ""}
                        `}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    )
                  })}

                </div>

                {!user && (
                  <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                    <Link
                      to="/iniciar-sesion"
                      onClick={() => setOpenMobile(false)}
                      className="flex items-center gap-4 px-4 py-4 active:scale-[0.97]"
                    >
                      <User className="h-5 w-5" />
                      <span className="text-sm">Ingresar</span>
                    </Link>
                  </div>
                )}

                {user && (
                  <div className="bg-red-500/10 rounded-2xl border border-red-400/20 overflow-hidden">
                    <button
                      onClick={() => {
                        logout()
                        setOpenMobile(false)
                      }}
                      className="w-full flex items-center justify-center gap-3 py-4 text-red-300 active:scale-[0.97]"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="text-sm font-medium">Cerrar sesión</span>
                    </button>
                  </div>
                )}

              </div>

              <div className="flex-1" />
              <div className="h-6" />

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}