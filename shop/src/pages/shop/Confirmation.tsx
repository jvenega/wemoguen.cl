import { useParams, Navigate, Link } from "react-router-dom"
import ProcessHeader from "@/components/checkout/ProcessHeader"
import { useOrder } from "@/hooks/orders.hook"

import {
  CheckCircle2,
  Package,
  ArrowRight,
  Clock
} from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Confirmation() {

  const { id } = useParams()
  const { data: order, isLoading } = useOrder(id!)

  if (!id) return <Navigate to="/" replace />

  if (isLoading || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm">
        Cargando solicitud...
      </div>
    )
  }

  return (
    <div className="bg-[#f6f4f9] min-h-screen pb-24">

      <div className="max-w-3xl mx-auto px-4 py-6 md:py-16">

        <ProcessHeader currentStep={4} />

        {/* ================= MOBILE HERO ================= */}
        <div className="bg-white rounded-2xl md:rounded-3xl border p-5 md:p-12 shadow-sm text-center">

          {/* ICON + TITLE compacto */}
          <div className="flex flex-col items-center gap-3 mb-5">

            <div className="bg-green-100 text-green-600 rounded-full p-3">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <h1 className="text-lg md:text-3xl font-semibold text-[#4B2863]">
              Pago enviado
            </h1>

            <p className="text-xs md:text-base text-muted-foreground max-w-sm">
              Recibimos tu comprobante. Estamos validando tu pago.
            </p>

          </div>

          {/* ================= STATUS CARD ================= */}
          <div className="bg-[#4B2863]/5 border border-[#4B2863]/20 rounded-xl p-4 mb-5">

            <div className="flex flex-col gap-3 text-sm">

              <div className="flex justify-between">
                <span className="text-muted-foreground text-xs">
                  ID
                </span>
                <span className="font-semibold text-[#4B2863]">
                  #{order.id}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-xs">
                  Estado
                </span>

                <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[11px] bg-yellow-100 text-yellow-700">
                  <Clock size={12} />
                  {order.status}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground text-xs">
                  Total
                </span>

                <span className="font-semibold text-[#4B2863]">
                  ${order.total.toLocaleString("es-CL")}
                </span>
              </div>

            </div>

          </div>

          {/* ================= INFO COMPACTA ================= */}
          <div className="text-xs text-muted-foreground mb-6 leading-relaxed">

            Validación en hasta <strong>24h hábiles</strong>.  
            Te notificaremos cuando esté aprobado.

          </div>

          {/* ================= CTA INLINE (DESKTOP) ================= */}
          <div className="hidden sm:flex flex-row gap-3 justify-center">

            <Button asChild variant="outline">
              <Link to="/pedidos" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Ver pedidos
              </Link>
            </Button>

            <Button
              asChild
              className="bg-[#4B2863] hover:bg-[#3c1f4f] text-white"
            >
              <Link to="/" className="flex items-center gap-2">
                Seguir comprando
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

          </div>

        </div>

      </div>

      {/* ================= CTA MOBILE FIJO ================= */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">

        <div className="flex flex-col gap-2">

          <Button asChild className="w-full bg-[#4B2863] text-white">
            <Link to="/pedidos">
              Ver estado del pedido
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full">
            <Link to="/">
              Seguir comprando
            </Link>
          </Button>

        </div>

      </div>

    </div>
  )
}