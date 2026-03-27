import { useState, useMemo } from "react"
import {
  Eye,
  Search,
  Download,
  X,
  PackageCheck,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

// =========================
// TYPES
// =========================

type OrderStatus = "paid" | "pending" | "shipped"

type OrderItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

type Order = {
  id: string
  customerName: string
  total: number
  status: OrderStatus
  createdAt: string
  items: OrderItem[]
}

// =========================
// MOCK
// =========================

const mockOrders: Order[] = [
  {
    id: "ord_001",
    customerName: "Juan Pérez",
    total: 25000,
    status: "paid",
    createdAt: "2026-03-20",
    items: [
      {
        id: "p1",
        name: "Aceite CBD 15ml",
        price: 15000,
        quantity: 1,
        image: "https://picsum.photos/seed/p1/100"
      },
      {
        id: "p2",
        name: "Crema CBD",
        price: 10000,
        quantity: 1,
        image: "https://picsum.photos/seed/p2/100"
      }
    ]
  }
]

// =========================
// HELPERS
// =========================

const formatCLP = (value: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  }).format(value)

function getStatusConfig(status: OrderStatus) {
  switch (status) {
    case "paid":
      return { label: "Pagado", color: "text-green-600" }
    case "pending":
      return { label: "Pendiente", color: "text-yellow-600" }
    case "shipped":
      return { label: "Enviado", color: "text-blue-600" }
  }
}

// =========================
// DRAWER RESPONSIVE
// =========================

function OrderDrawer({
  order,
  onClose
}: {
  order: Order | null
  onClose: () => void
}) {
  if (!order) return null

  const status = getStatusConfig(order.status)

  return (
    <div className="fixed inset-0 z-50 flex">

      {/* overlay */}
      <div className="flex-1 bg-black/40" onClick={onClose} />

      {/* drawer */}
      <div className="
        w-full md:w-105
        bg-white h-full shadow-xl
        flex flex-col
        fixed right-0 top-0
        md:relative
      ">

        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold">
            Pedido {order.id}
          </h2>

          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">

          {/* INFO */}
          <div className="space-y-2 text-sm">
            <div>
              <p className="text-muted-foreground">Cliente</p>
              <p className="font-medium">{order.customerName}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Estado</p>
              <p className={status.color}>{status.label}</p>
            </div>
          </div>

          {/* ITEMS */}
          <div className="space-y-3">
            <p className="font-medium text-sm">Productos</p>

            {order.items.map(item => (
              <div
                key={item.id}
                className="flex gap-3 items-center border rounded-lg p-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded object-cover"
                />

                <div className="flex-1 text-sm">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-muted-foreground">
                    {item.quantity} x {formatCLP(item.price)}
                  </p>
                </div>

                <div className="text-sm font-semibold">
                  {formatCLP(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="border-t pt-4 space-y-2 text-sm">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCLP(order.total)}</span>
            </div>

            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>{formatCLP(order.total)}</span>
            </div>

          </div>

          {/* TIMELINE */}
          <div className="border-t pt-4 space-y-2 text-sm">
            <p className="font-medium">Estado del pedido</p>

            <div className="flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-green-600" />
              Pedido creado
            </div>

            <div className="opacity-60">Pago confirmado</div>
            <div className="opacity-60">Enviado</div>
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
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4">

        <div>
          <h1 className="text-2xl font-semibold">Pedidos</h1>
          <p className="text-sm text-muted-foreground">
            Gestión de pedidos
          </p>
        </div>

        <div className="flex gap-2">

          <div className="relative">
            <Search className="absolute left-2 top-2.5 w-4 h-4" />
            <Input
              className="pl-8"
              placeholder="Buscar..."
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
        <CardHeader>
          <CardTitle>Pedidos</CardTitle>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-muted">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Cliente</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4 text-left">Estado</th>
                <th className="p-4 text-right"></th>
              </tr>
            </thead>

            <tbody>
              {filtered.map(order => {
                const status = getStatusConfig(order.status)

                return (
                  <tr key={order.id} className="border-t hover:bg-muted/40">

                    <td className="p-4">{order.id}</td>
                    <td className="p-4">{order.customerName}</td>
                    <td className="p-4 font-semibold">
                      {formatCLP(order.total)}
                    </td>
                    <td className={`p-4 ${status.color}`}>
                      {status.label}
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
                )
              })}
            </tbody>

          </table>

        </CardContent>
      </Card>

      {/* DRAWER */}
      <OrderDrawer
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

    </div>
  )
}