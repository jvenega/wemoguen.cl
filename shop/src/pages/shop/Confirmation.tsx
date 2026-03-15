import { useParams, Navigate, Link } from "react-router-dom"
import ProcessHeader from "@/components/checkout/ProcessHeader"
import { useOrder } from "@/hooks/orders.hook"

import { CheckCircle2, Package, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Confirmation() {

  const { id } = useParams()

  const { data: order, isLoading } = useOrder(id!)

  if (!id) {
    return <Navigate to="/" replace />
  }

  if (isLoading || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando solicitud...
      </div>
    )
  }

  return (
    <div className="bg-[#f6f4f9] min-h-screen">

      <div className="max-w-3xl mx-auto px-6 py-16">

        <ProcessHeader currentStep={4} />

        <div className="bg-white rounded-3xl border p-10 md:p-12 shadow-sm text-center">

          <div className="flex justify-center mb-6">

            <div className="bg-green-100 text-green-600 rounded-full p-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>

          </div>

          <h1 className="text-3xl font-semibold text-[#4B2863] mb-2">
            Solicitud enviada
          </h1>

          <p className="text-muted-foreground mb-8">
            Su solicitud ha sido registrada correctamente.
          </p>

          <div className="bg-[#4B2863]/5 border border-[#4B2863]/20 rounded-2xl p-6 mb-8">

            <div className="flex flex-col gap-3 text-sm">

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Identificador
                </span>
                <span className="font-semibold text-[#4B2863]">
                  #{order.id}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Estado
                </span>

                <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">
                  {order.status}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Total
                </span>

                <span className="font-semibold text-[#4B2863]">
                  ${order.total.toLocaleString()}
                </span>
              </div>

            </div>

          </div>

          <div className="text-sm text-muted-foreground mb-10 leading-relaxed">

            Su comprobante será revisado por el equipo administrativo.
            La validación puede tardar hasta <strong>24 horas hábiles</strong>.
            Recibirá una notificación cuando su solicitud sea aprobada.

          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <Button asChild variant="outline">
              <Link to="/pedidos" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Ver mis pedidos
              </Link>
            </Button>

            <Button asChild className="bg-[#4B2863] hover:bg-[#3c1f4f] text-amber-50">
              <Link to="/" className="flex items-center gap-2">
                Volver a la tienda
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

          </div>

        </div>

      </div>

    </div>
  )
}