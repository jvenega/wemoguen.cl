import { Link } from "react-router-dom"
import { ShoppingCart, Package, UserCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { useCartStore } from "@/store/cart.store"
import { useAuthStore } from "@/store/auth.store"

export default function ShopNavbar() {

  const { items } = useCartStore()
  const user = useAuthStore((s) => s.user)

  const totalItems = items.reduce((a, b) => a + b.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-[#4B2863] text-white shadow-xl">

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link to="/" className="tracking-[0.25em] font-semibold">
          WEMÖGUEN
        </Link>

        <nav className="flex items-center gap-10 text-sm uppercase">

          <Link to="/" className="flex items-center gap-2">
            Productos
          </Link>

          {user && (
            <>
              <Link to="/pedidos" className="flex items-center gap-2">
                <Package size={16} />
                Mis pedidos
              </Link>

              <Link to="/profile" className="flex items-center gap-2">
                <UserCircle size={16} />
                Mi perfil
              </Link>
            </>
          )}

        </nav>

        <div className="flex items-center gap-5">

          <Link to="/carrito" className="relative">

            <ShoppingCart size={20} />

            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-white text-[#4B2863]">
                {totalItems}
              </Badge>
            )}

          </Link>

          {user && (
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-white text-[#4B2863] text-xs">
                {user.fullName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          )}

        </div>

      </div>

    </header>
  )
}