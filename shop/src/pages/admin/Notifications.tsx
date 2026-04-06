import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  Bell,
  CheckCheck,
  Package,
  CreditCard,
  Truck,
  CheckCircle2,
  XCircle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// =========================
// TYPES
// =========================

type NotificationType =
  | "stock"
  | "payment"
  | "shipping"
  | "success"
  | "error"

type Notification = {
  id: string
  title: string
  message: string
  type: NotificationType
  read: boolean
  time: string
  href?: string
}

// =========================
// MOCK DATA
// =========================

const initialData: Notification[] = [
  {
    id: "1",
    title: "Stock crítico",
    message: "3 productos sin stock",
    type: "stock",
    read: false,
    time: "Hace 2 min",
    href: "/admin/products"
  },
  {
    id: "2",
    title: "Pagos fallidos",
    message: "2 pedidos con error",
    type: "payment",
    read: false,
    time: "Hace 10 min",
    href: "/admin/orders"
  },
  {
    id: "3",
    title: "Envíos pendientes",
    message: "5 pedidos sin despachar",
    type: "shipping",
    read: false,
    time: "Hace 30 min",
    href: "/admin/orders"
  },
  {
    id: "4",
    title: "Pedido enviado",
    message: "Pedido #1042 completado",
    type: "success",
    read: true,
    time: "Hace 1 hora"
  },
  {
    id: "5",
    title: "Error de integración",
    message: "Fallo en pagos externos",
    type: "error",
    read: true,
    time: "Hace 5 horas"
  }
]

// =========================
// ICON
// =========================

function getIcon(type: NotificationType) {
  const base = "w-4 h-4"

  switch (type) {
    case "stock":
      return <Package className={`${base} text-orange-500`} />
    case "payment":
      return <CreditCard className={`${base} text-yellow-500`} />
    case "shipping":
      return <Truck className={`${base} text-blue-500`} />
    case "success":
      return <CheckCircle2 className={`${base} text-green-500`} />
    case "error":
      return <XCircle className={`${base} text-red-500`} />
  }
}

// =========================
// ITEM
// =========================

function NotificationItem({
  n,
  onOpen,
  onMarkRead
}: {
  n: Notification
  onOpen: (n: Notification) => void
  onMarkRead: (id: string) => void
}) {
  return (
    <div
      className={cn(
        "group relative flex gap-3 px-4 py-3 rounded-xl transition-all",
        n.read
          ? "opacity-60"
          : "bg-muted/30 hover:bg-muted/50 hover:shadow-sm"
      )}
    >
      {!n.read && (
        <span className="absolute left-0 top-2 bottom-2 w-0.75 bg-blue-500 rounded-r" />
      )}

      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          n.read ? "bg-muted/30" : "bg-muted/60"
        )}
      >
        {getIcon(n.type)}
      </div>

      <div className="flex flex-1 flex-col min-w-0">

        <div className="flex items-center justify-between gap-3">

          <div className="flex items-center gap-2 min-w-0">
            <span
              className={cn(
                "text-sm truncate",
                n.read
                  ? "font-normal text-muted-foreground"
                  : "font-semibold"
              )}
            >
              {n.title}
            </span>

            {!n.read && (
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            )}
          </div>

          <span className="text-[11px] text-muted-foreground whitespace-nowrap">
            {n.time}
          </span>

        </div>

        <span className="text-xs text-muted-foreground mt-1 leading-relaxed">
          {n.message}
        </span>

        {n.href && !n.read && (
          <button
            onClick={() => onOpen(n)}
            className="text-xs text-primary mt-2 w-fit opacity-80 hover:opacity-100"
          >
            Ver detalle →
          </button>
        )}

        {!n.read && (
          <button
            onClick={() => onMarkRead(n.id)}
            className="absolute right-2 top-2 text-[10px] opacity-0 group-hover:opacity-100"
          >
            Marcar
          </button>
        )}
      </div>
    </div>
  )
}

// =========================
// MAIN COMPONENT
// =========================

export function Notifications() {
  const navigate = useNavigate()

  const [data, setData] = useState(initialData)
  const [tab, setTab] = useState<"unread" | "read">("unread")

  const unread = useMemo(() => data.filter((n) => !n.read), [data])
  const read = useMemo(() => data.filter((n) => n.read), [data])

  const list = tab === "unread" ? unread : read

  function markRead(id: string) {
    setData((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    )
  }

  function markAll() {
    setData((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    )
  }

  function open(n: Notification) {
    if (!n.read) markRead(n.id)
    if (n.href) navigate(n.href)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />

          {unread.length > 0 && (
            <span className="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 bg-red-500 text-white rounded-full">
              {unread.length > 99 ? "99+" : unread.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[calc(100vw-1rem)] max-w-105 rounded-2xl p-0 overflow-hidden"
      >
        {/* HEADER */}
        <div className="px-4 py-3">
          <p className="text-sm font-semibold">Notificaciones</p>

          <p className="text-xs text-muted-foreground">
            {tab === "unread"
              ? unread.length > 0
                ? `${unread.length} pendientes`
                : "Todo al día"
              : `${read.length} revisadas`}
          </p>
        </div>

        {/* TABS */}
        <div className="grid grid-cols-2 border-b">
          <button
            onClick={() => setTab("unread")}
            className={cn(
              "py-2 text-xs font-medium",
              tab === "unread"
                ? "border-b-2 border-primary"
                : "text-muted-foreground"
            )}
          >
            No leídas ({unread.length})
          </button>

          <button
            onClick={() => setTab("read")}
            className={cn(
              "py-2 text-xs font-medium",
              tab === "read"
                ? "border-b-2 border-primary"
                : "text-muted-foreground"
            )}
          >
            Leídas ({read.length})
          </button>
        </div>

        {/* ACTION */}
        {tab === "unread" && unread.length > 0 && (
          <div className="px-3 py-2">
            <Button size="sm" variant="ghost" onClick={markAll}>
              <CheckCheck className="w-4 h-4 mr-1" />
              Marcar todas
            </Button>
          </div>
        )}

        <Separator />

        {/* BODY */}
        <ScrollArea className="max-h-105">
          <div className="p-2 space-y-2 pb-20">

            {list.length === 0 && (
              <div className="text-center text-xs text-muted-foreground py-6">
                {tab === "unread"
                  ? "No tienes notificaciones pendientes"
                  : "No hay historial"}
              </div>
            )}

            {list.map((n) => (
              <NotificationItem
                key={n.id}
                n={n}
                onOpen={open}
                onMarkRead={markRead}
              />
            ))}

          </div>
        </ScrollArea>

        {/* FOOTER FIXED */}
        <div className="sticky bottom-0 bg-background border-t p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/orders")}
          >
            Ir a pedidos
          </Button>

          <Button
            size="sm"
            onClick={() => navigate("/admin/products")}
          >
            Ir a productos
          </Button>
        </div>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}