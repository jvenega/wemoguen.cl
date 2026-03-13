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
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import { useCartStore } from "@/store/cart.store"
import { useAuthStore } from "@/store/auth.store"

import { useEffect, useState } from "react"

/* ================================
   PROGRESS BAR
================================ */

function RouteProgressBar() {
  const location = useLocation()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(25)

    const t1 = setTimeout(() => setProgress(60), 120)
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
      className="fixed top-0 left-0 h-0.75 bg-purple-400 z-200 transition-all duration-300 ease-out"
      style={{ width: `${progress}%` }}
    />
  )
}

/* ================================
   NAVBAR
================================ */

export default function NavbarPremium() {
  const { items } = useCartStore()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  const location = useLocation()

  const [openUserMenu, setOpenUserMenu] = useState(false)

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0)

  useEffect(() => {
    setOpenUserMenu(false)
  }, [location.pathname])

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-white font-semibold"
      : "text-white/70 hover:text-white transition"

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

            <Link to="/" className={`flex items-center gap-2 ${isActive("/")}`}>
              <Home className="h-4 w-4" />
              Productos
            </Link>

            {user && (
              <Link to="/orders" className={`flex items-center gap-2 ${isActive("/orders")}`}>
                <Package className="h-4 w-4" />
                Mis pedidos
              </Link>
            )}

            {user && (
              <Link to="/profile" className={`flex items-center gap-2 ${isActive("/profile")}`}>
                <UserCircle className="h-4 w-4" />
                Mi perfil
              </Link>
            )}

            {user?.role === "ADMIN" && (
              <Link to="/admin" className={`flex items-center gap-2 ${isActive("/admin")}`}>
                <Shield className="h-4 w-4" />
                Administración
              </Link>
            )}

          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-5">

            {/* CART */}
            <Link to="/cart" className="relative group flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />

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
                  onClick={() => setOpenUserMenu((prev) => !prev)}
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
                      <p className="text-sm font-medium">
                        {user.fullName}
                      </p>

                      <p className="text-xs text-muted-foreground mt-1">
                        {user.email}
                      </p>
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
                <button className="md:hidden" title="...">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="bg-[#4B2863] text-white border-none w-70"
              >

                {/* USER INFO */}
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

                {/* NAV */}
                <div className="mt-8 flex flex-col gap-6 text-lg">

                  <Link className="flex items-center gap-3" to="/">
                    <Home className="h-5 w-5" />
                    Productos
                  </Link>

                  {user && (
                    <>
                      <Link className="flex items-center gap-3" to="/orders">
                        <Package className="h-5 w-5" />
                        Mis pedidos
                      </Link>

                      <Link className="flex items-center gap-3" to="/profile">
                        <UserCircle className="h-5 w-5" />
                        Mi perfil
                      </Link>
                    </>
                  )}

                  {user?.role === "ADMIN" && (
                    <Link className="flex items-center gap-3" to="/admin">
                      <Shield className="h-5 w-5" />
                      Administración
                    </Link>
                  )}

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