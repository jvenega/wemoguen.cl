import { useState, useMemo } from "react"
import {
  Eye,
  Search,
  Download,
  X,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent
} from "@/components/ui/card"

// =========================
// TYPES
// =========================
import { type OrderStatus, type Order,  mockOrders } from "@/mock/admin/orders"


// =========================
// CONFIG
// =========================

const ORDER_STEPS = [
  { key: "created", label: "Creado" },
  { key: "paid", label: "Pagado" },
  { key: "shipped", label: "Enviado" },
  { key: "delivered", label: "Entregado" },
] as const

const STATUS_META = {
  created: { label: "Creado", color: "bg-gray-100 text-gray-700" },
  paid: { label: "Pagado", color: "bg-green-100 text-green-700" },
  shipped: { label: "Enviado", color: "bg-blue-100 text-blue-700" },
  delivered: { label: "Entregado", color: "bg-purple-100 text-purple-700" },
}

// =========================
// MOCK
// =========================



// =========================
// HELPERS
// =========================

const formatCLP = (value: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(value)

// =========================
// COMPONENTS
// =========================

function StatusBadge({ status }: { status: OrderStatus }) {
  const meta = STATUS_META[status]

  return (
    <span className={`px-2 py-1 rounded-md text-xs font-medium ${meta.color}`}>
      {meta.label}
    </span>
  )
}

function OrderProgress({ status }: { status: OrderStatus }) {
  const currentIndex = ORDER_STEPS.findIndex(s => s.key === status)

  return (
    <div className="space-y-3">

      <div className="flex items-center gap-2">
        {ORDER_STEPS.map((step, i) => {
          const active = i <= currentIndex

          return (
            <div key={step.key} className="flex items-center flex-1">
              <div
                className={`h-2 flex-1 rounded-full ${
                  active ? "bg-primary" : "bg-muted"
                }`}
              />
              {i !== ORDER_STEPS.length - 1 && <div className="w-2" />}
            </div>
          )
        })}
      </div>

      <div className="flex justify-between text-xs text-muted-foreground">
        {ORDER_STEPS.map((step, i) => {
          const active = i <= currentIndex

          return (
            <span
              key={step.key}
              className={active ? "text-foreground font-medium" : ""}
            >
              {step.label}
            </span>
          )
        })}
      </div>

    </div>
  )
}

function OrdersSummary({ orders }: { orders: Order[] }) {
  const counts = {
    created: orders.filter(o => o.status === "created").length,
    paid: orders.filter(o => o.status === "paid").length,
    shipped: orders.filter(o => o.status === "shipped").length,
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-3">

        <p className="text-sm font-medium">Estado pedidos</p>

        <div className="space-y-2 text-sm">

          <div className="flex justify-between">
            <span>Por procesar</span>
            <span className="font-medium">{counts.created}</span>
          </div>

          <div className="flex justify-between">
            <span>Pagados</span>
            <span className="font-medium">{counts.paid}</span>
          </div>

          <div className="flex justify-between">
            <span>Enviados</span>
            <span className="font-medium">{counts.shipped}</span>
          </div>

        </div>

      </CardContent>
    </Card>
  )
}

// =========================
// DRAWER
// =========================

function OrderDrawer({
  order,
  onClose
}: {
  order: Order | null
  onClose: () => void
}) {
  if (!order) return null

  return (
    <div className="fixed inset-0 z-50 flex">

      <div className="flex-1 bg-black/40" onClick={onClose} />

      <div className="w-full md:w-105 bg-white h-full shadow-xl flex flex-col">

        <div className="p-5 border-b flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Pedido</p>
            <h2 className="font-semibold">{order.id}</h2>
          </div>

          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">

          <div className="space-y-4">
            <StatusBadge status={order.status} />
            <OrderProgress status={order.status} />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Cliente</p>
            <p className="font-medium">{order.customerName}</p>
          </div>

          <div className="space-y-3">
            {order.items.map(item => (
              <div key={item.id} className="flex gap-3 items-center border rounded-lg p-3">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                <div className="flex-1 text-sm">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-muted-foreground">
                    {item.quantity} × {formatCLP(item.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatCLP(order.total)}</span>
          </div>

        </div>

      </div>
    </div>
  )
}

// =========================
// MAIN
// =========================

export default function Orders() {
  const [search, setSearch] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filtered = useMemo(() => {
    return mockOrders.filter(o =>
      o.customerName.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  return (
    <div className="grid lg:grid-cols-[1fr_260px] gap-6">

      {/* MAIN */}
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex justify-between gap-4">

          <div>
            <h1 className="text-2xl font-semibold">Pedidos</h1>
            <p className="text-sm text-muted-foreground">
              Seguimiento de órdenes
            </p>
          </div>

          <div className="flex gap-2">

            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9 w-60"
                placeholder="Buscar cliente"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </Button>

          </div>
        </div>

        {/* TABLE */}
        <Card>
          <CardContent className="p-0">

            <table className="w-full text-sm">

              <thead className="bg-muted/50">
                <tr>
                  <th className="p-4 text-left">Pedido</th>
                  <th className="p-4 text-left">Cliente</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Estado</th>
                  <th className="p-4 text-right"></th>
                </tr>
              </thead>

              <tbody>
                {filtered.map(order => (
                  <tr key={order.id} className="border-t hover:bg-muted/40">

                    <td className="p-4">{order.id}</td>

                    <td className="p-4 font-medium">
                      {order.customerName}
                    </td>

                    <td className="p-4 font-semibold">
                      {formatCLP(order.total)}
                    </td>

                    <td className="p-4">
                      <div className="space-y-2">
                        <OrderProgress status={order.status} />
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </CardContent>
        </Card>

      </div>

      {/* SIDEBAR */}
      <div className="space-y-4">
        <OrdersSummary orders={mockOrders} />
      </div>

      {/* DRAWER */}
      <OrderDrawer
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

    </div>
  )
}