import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react"

export type AdminNavItem = {
  label: string
  path: string
  icon: LucideIcon
}

export const adminNavItems: AdminNavItem[] = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Pedidos", path: "/admin/orders", icon: ShoppingCart },
  { label: "Productos", path: "/admin/products", icon: Package },
  { label: "Usuarios", path: "/admin/users", icon: Users },
]

export const adminRouteLabels: Record<string, string> = {
  admin: "Dashboard",
  orders: "Pedidos",
  products: "Productos",
  users: "Usuarios",
}

export function isAdminPath(path: string) {
  return path === "/admin" || path.startsWith("/admin/")
}
