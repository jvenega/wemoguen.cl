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
  AlertTriangle
} from "lucide-react"

// =========================
// MOCK DATA
// =========================

const stats = {
  sales: 124500,
  orders: 86,
  users: 1320
}

const orders = [
  { id: "#001", customer: "Juan Pérez", total: 25000, status: "Pagado" },
  { id: "#002", customer: "María López", total: 18000, status: "Pendiente" },
  { id: "#003", customer: "Carlos Díaz", total: 32000, status: "Enviado" }
]

const products = [
  { name: "Producto A", sales: 120, revenue: 60000 },
  { name: "Producto B", sales: 80, revenue: 40000 }
]

// =========================
// COMPONENTS
// =========================

type StatCardProps = {
  title: string
  value: string | number
  change: string
  icon: React.ReactNode
}

function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm text-muted-foreground">
          {title}
        </CardTitle>
        <div className="p-2 rounded-xl bg-muted">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold">{value}</div>
        <div className="text-sm text-green-600 mt-1 flex items-center gap-1">
          <TrendingUp className="w-4 h-4" /> {change}
        </div>
      </CardContent>
    </Card>
  )
}

function OrdersTable() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Últimos pedidos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="py-2">{o.id}</td>
                  <td>{o.customer}</td>
                  <td>${o.total.toLocaleString("es-CL")}</td>
                  <td>
                    <span className="px-2 py-1 rounded-full text-xs bg-muted">
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

function TopProducts() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Top productos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.map((p) => (
          <div key={p.name} className="flex justify-between">
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-xs text-muted-foreground">
                {p.sales} ventas
              </div>
            </div>
            <div className="font-semibold">
              ${p.revenue.toLocaleString("es-CL")}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function Alerts() {
  return (
    <Card className="rounded-2xl border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="w-4 h-4" /> Alertas
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        3 productos con bajo stock
      </CardContent>
    </Card>
  )
}

// =========================
// MAIN DASHBOARD
// =========================

export default function Dashboard() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Resumen general
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => window.location.href = "/admin/products"}>Nuevo producto</Button>
          <Button variant="outline" onClick={() => window.location.href = "/admin/orders"}>
            Ver pedidos
          </Button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Ventas"
          value={`$${stats.sales.toLocaleString("es-CL")}`}
          change="+12%"
          icon={<DollarSign className="w-5 h-5" />}
        />

        <StatCard
          title="Pedidos"
          value={stats.orders}
          change="+8 hoy"
          icon={<ShoppingCart className="w-5 h-5" />}
        />

        <StatCard
          title="Usuarios"
          value={stats.users}
          change="+25 nuevos"
          icon={<Users className="w-5 h-5" />}
        />
      </div>

      {/* MAIN GRID */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <OrdersTable />
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <TopProducts />
          <Alerts />
        </div>

      </div>

    </div>
  )
}
