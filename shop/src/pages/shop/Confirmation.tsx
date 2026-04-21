import { useEffect } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Package,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import ProcessHeader from "@/components/checkout/ProcessHeader"
import { useOrder } from "@/hooks/orders.hook"
import { useCartStore } from "@/store/cart.store"

export default function Confirmation() {
  const { id } = useParams()
  const clearCart = useCartStore((state) => state.clearCart)
  const orderId = id ?? ""

  useEffect(() => {
    const isMobile = window.innerWidth < 1024
    if (isMobile) document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const { data: order, isLoading, isError } = useOrder(orderId)

  useEffect(() => {
    if (!order) return
    clearCart()
  }, [clearCart, order])

  if (!id) return <Navigate to="/" replace />

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm">
        Cargando solicitud...
      </div>
    )
  }

  if (isError || !order) {
    return <Navigate to="/" replace />
  }

  const formatCLP = (n: number) => n.toLocaleString("es-CL")

  const statusMap: Record<string, string> = {
    PENDING_PAYMENT: "Pendiente de pago",
    WAITING_APPROVAL: "En validacion",
    PROCESSING: "En proceso",
    APPROVED: "Aprobado",
    REJECTED: "Rechazado",
  }

  const statusLabel = statusMap[order.status] ?? order.status
  const isPendingPayment = order.status === "PENDING_PAYMENT"
  const isWaitingApproval = order.status === "WAITING_APPROVAL"

  const Icon = isPendingPayment ? Clock : CheckCircle2
  const iconStyle = isPendingPayment
    ? "bg-yellow-100 text-yellow-600"
    : "bg-green-100 text-green-600"

  return (
    <div className="bg-[#f6f4f9] h-screen lg:min-h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-4 md:py-16 pb-32 lg:pb-0">
        <div className="max-w-3xl mx-auto">
          <ProcessHeader currentStep={5} />

          <div className="bg-white rounded-2xl md:rounded-3xl border p-5 md:p-10 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-lg md:text-2xl font-semibold text-[#4B2863]">
                Pedido <span className="font-bold">#{order.id}</span>
              </h1>

              <div className={`${iconStyle} rounded-full p-2`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Estado</span>

                <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[11px] bg-yellow-100 text-yellow-700">
                  <Clock size={12} />
                  {statusLabel}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Monto</span>

                <span className="font-semibold text-[#4B2863]">
                  ${formatCLP(order.total)}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-muted-foreground mb-6">
              <AlertCircle size={14} className="mt-0.5" />

              <p className="leading-relaxed">
                {isPendingPayment
                  ? `Tienes 24h para transferir usando el ID #${order.id}. Luego sube tu comprobante.`
                  : "Estamos procesando tu pedido. Te notificaremos cuando avance."}
              </p>
            </div>

            <div className="hidden lg:flex gap-3 justify-center">
              {isWaitingApproval && (
                <Button asChild className="bg-[#4B2863] text-white">
                  <Link to={`/pedidos/${order.id}`} className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Ver estado del pedido
                  </Link>
                </Button>
              )}

              {isPendingPayment && (
                <Button asChild className="bg-[#4B2863] text-white">
                  <Link to={`/checkout/payment/${order.id}`} className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Subir comprobante
                  </Link>
                </Button>
              )}

              <Button asChild variant="outline">
                <Link to="/pedidos" className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Ver pedidos
                </Link>
              </Button>

              <Button asChild className="bg-[#4B2863] text-white">
                <Link to="/" className="flex items-center gap-2">
                  Seguir comprando
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden sticky bottom-0 bg-white border-t p-4 shadow-lg pb-[env(safe-area-inset-bottom)]">
        <div className="flex flex-col gap-3">
          {isPendingPayment && (
            <Button asChild className="w-full bg-[#4B2863] text-white py-3">
              <Link to={`/checkout/payment/${order.id}`} className="flex items-center justify-center gap-2">
                <Upload className="h-4 w-4" />
                Subir comprobante
              </Link>
            </Button>
          )}

          <Button asChild variant="outline" className="w-full py-3">
            <Link to="/pedidos" className="flex items-center justify-center gap-2">
              <Package className="h-4 w-4" />
              Ver estado del pedido
            </Link>
          </Button>

          <Button asChild variant="ghost" className="w-full text-muted-foreground">
            <Link to="/" className="flex items-center justify-center gap-2">
              <ArrowRight className="h-4 w-4" />
              Seguir comprando
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
