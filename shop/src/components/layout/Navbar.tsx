import { Link, useLocation } from "react-router-dom"
import { ShoppingCart, Menu, User, LogOut, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useCartStore } from "@/store/cart.store"
import { useAuthStore } from "@/store/auth.store"
import { useState } from "react"

export default function NavbarPremium() {
  const { items } = useCartStore()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const location = useLocation()

  const [openUserMenu, setOpenUserMenu] = useState(false)

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0)

  const isActive = (path: string) =>
    location.pathname === path
      ? "text-white font-medium"
      : "text-white/70 hover:text-white transition"

  return (
    <header className="sticky top-0 z-50 bg-[#4B2863] text-white shadow-xl backdrop-blur">
      <div className="max-w-7xl mx-auto px-10 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-xl tracking-[0.25em] font-semibold hover:opacity-90 transition"
        >
          WEMÖGUEN
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-14 text-sm uppercase tracking-wide">
          <Link to="/" className={isActive("/")}>
            Productos
          </Link>
          <Link to="/orders" className={isActive("/orders")}>
            Mis pedidos
          </Link>
          {user?.role === "ADMIN" && (
            <Link to="/admin" className={isActive("/admin")}>
              Administración
            </Link>
          )}
        </nav>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-8">

          {/* CART */}
          <Link to="/cart" className="relative group">
            <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 text-xs bg-white text-[#4B2863]">
                {totalItems}
              </Badge>
            )}
          </Link>

          {/* USER SECTION */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setOpenUserMenu((prev) => !prev)}
                className="flex items-center gap-2 hover:opacity-90 transition"
              >
                <User className="h-5 w-5" />
                <span className="text-sm hidden md:block">
                  {user.fullName}
                </span>
              </button>

              {/* DROPDOWN */}
              {openUserMenu && (
                <div className="absolute right-0 mt-4 w-56 bg-white text-gray-800 rounded-xl shadow-xl border overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">

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
                      onClick={() => setOpenUserMenu(false)}
                    >
                      <Shield className="h-4 w-4" />
                      Panel Admin
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      logout()
                      setOpenUserMenu(false)
                    }}
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
              className="text-sm border border-white/40 px-4 py-1.5 rounded-full hover:bg-white hover:text-[#4B2863] transition"
            >
              Ingresar
            </Link>
          )}

          {/* MOBILE MENU */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-[#4B2863] text-white border-none"
            >
              <div className="mt-12 flex flex-col gap-8 text-lg uppercase tracking-wide">

                <Link to="/">Productos</Link>
                <Link to="/orders">Mis pedidos</Link>

                {user?.role === "ADMIN" && (
                  <Link to="/admin">Administración</Link>
                )}

                {user && (
                  <button
                    onClick={logout}
                    className="text-left text-red-300"
                  >
                    Cerrar sesión
                  </button>
                )}

              </div>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  )
}