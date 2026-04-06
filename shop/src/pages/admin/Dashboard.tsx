import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  Package,
  CreditCard
} from "lucide-react"

import { useNavigate } from "react-router-dom"

// =========================
// TYPES
// =========================

type OrderStatus = "Pagado" | "Pendiente" | "Enviado" | "Cancelado"

type Order = {
  id: string
  customer: string
  total: number
  status: OrderStatus
  date: string
}

// =========================
// MOCK DATA (REEMPLAZAR)
// =========================

const stats = {
  revenue: 124500,
  orders: 86,
  customers: 1320,
  conversion: 3.2,
  avgPurchase: 14500,
  abandonedCarts: 12
}

const orders: Order[] = [
  { id: "#001", customer: "Juan Pérez", total: 25000, status: "Pagado", date: "05-04-2026" },
  { id: "#002", customer: "María López", total: 18000, status: "Pendiente", date: "05-04-2026" },
  { id: "#003", customer: "Carlos Díaz", total: 32000, status: "Enviado", date: "05-04-2026" }
]

// =========================
// HELPERS
// =========================

function formatCurrency(value: number) {
  return `$${value.toLocaleString("es-CL")}`
}

function getStatusColor(status: OrderStatus) {
  switch (status) {
    case "Pagado":
      return "bg-green-100 text-green-700 border border-green-200"
    case "Pendiente":
      return "bg-yellow-100 text-yellow-700 border border-yellow-200"
    case "Enviado":
      return "bg-blue-100 text-blue-700 border border-blue-200"
    case "Cancelado":
      return "bg-red-100 text-red-700 border border-red-200"
  }
}

// =========================
// KPI COMPONENT
// =========================

function KPI({
  label,
  value,
  description,
  icon,
  highlight
}: {
  label: string
  value: string
  description?: string
  icon: React.ReactNode
  highlight?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-3 p-3 border rounded-lg transition ${
        highlight ? "bg-green-50 border-green-200" : "bg-white"
      }`}
    >
      <div className="p-2 rounded-lg bg-muted">
        {icon}
      </div>

      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">
          {label}
        </span>

        <span className="text-base font-semibold">
          {value}
        </span>

        {description && (
          <span className="text-[10px] text-muted-foreground">
            {description}
          </span>
        )}
      </div>
    </div>
  )
}

// =========================
// FILTER BAR
// =========================

function FilterBar() {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Button size="sm" variant="outline">Hoy</Button>
      <Button size="sm" variant="outline">Últimos 7 días</Button>
      <Button size="sm" variant="outline">Últimos 30 días</Button>

      <div className="ml-auto">
        <Button size="sm">Exportar datos</Button>
      </div>
    </div>
  )
}

// =========================
// ORDERS TABLE
// =========================

function OrdersTable() {
  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-sm">
          Pedidos recientes
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs">
              <tr>
                <th className="p-2 text-left">ID</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr
                  key={o.id}
                  className="border-t hover:bg-muted/40 transition cursor-pointer"
                >
                  <td className="p-2 font-medium">{o.id}</td>
                  <td>{o.customer}</td>
                  <td>{formatCurrency(o.total)}</td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs ${getStatusColor(
                        o.status
                      )}`}
                    >
                      {o.status}
                    </span>
                  </td>

                  <td>{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {orders.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No hay pedidos recientes
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// =========================
// SIDE PANEL
// =========================

function SidePanel() {
  return (
    <div className="space-y-4">

      

      {/* SALUD */}
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm">
            Salud de la tienda
          </CardTitle>
        </CardHeader>

        <CardContent className="text-xs space-y-2">
          <div className="flex justify-between">
            <span>Tasa de compra</span>
            <span>{stats.conversion}%</span>
          </div>

          <div className="flex justify-between">
            <span>Carritos abandonados</span>
            <span className="text-red-600">{stats.abandonedCarts}%</span>
          </div>

          <div className="flex justify-between">
            <span>Compra promedio</span>
            <span>{formatCurrency(stats.avgPurchase)}</span>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

// =========================
// MAIN DASHBOARD
// =========================

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="space-y-4">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold">
            Resumen de la tienda
          </h1>

          <p className="text-xs text-muted-foreground">
            Métricas clave y estado actual del negocio
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={() => navigate("/admin/products")}>
            Crear producto
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/admin/orders")}
          >
            Ir a pedidos
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">

        <KPI
          label="Ingresos"
          value={formatCurrency(stats.revenue)}
          description="Ventas totales"
          icon={<DollarSign className="w-4 h-4" />}
          highlight
        />

        <KPI
          label="Pedidos"
          value={String(stats.orders)}
          description="Órdenes realizadas"
          icon={<ShoppingCart className="w-4 h-4" />}
        />

        <KPI
          label="Clientes"
          value={String(stats.customers)}
          description="Usuarios compradores"
          icon={<Users className="w-4 h-4" />}
        />

        <KPI
          label="Tasa de compra"
          value={`${stats.conversion}%`}
          description="Conversión del sitio"
          icon={<TrendingUp className="w-4 h-4" />}
        />

        <KPI
          label="Compra promedio"
          value={formatCurrency(stats.avgPurchase)}
          description="Promedio por pedido"
          icon={<CreditCard className="w-4 h-4" />}
        />

        <KPI
          label="Carritos abandonados"
          value={`${stats.abandonedCarts}%`}
          description="Usuarios que no compraron"
          icon={<Package className="w-4 h-4" />}
        />

      </div>

      {/* FILTERS */}
      <FilterBar />

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-4 gap-4">

        <div className="lg:col-span-3">
          <OrdersTable />
        </div>

        <SidePanel />

      </div>

    </div>
  )
}