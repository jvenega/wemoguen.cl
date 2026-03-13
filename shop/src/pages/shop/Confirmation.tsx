import { useParams, Navigate } from "react-router-dom"
import ProcessHeader from "@/components/ProcessHeader"
import { useOrder } from "@/hooks/orders.hook"

export default function Confirmation() {
  const { id } = useParams()
  if (!id) return <Navigate to="/" replace />

  const { data: order, isLoading } = useOrder(id)

  if (isLoading || !order) {
    return <div className="p-10">Cargando...</div>
  }

  return (
    <div className="bg-[#f6f4f9] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">

        <ProcessHeader currentStep={4} />

        <div className="bg-white rounded-3xl border p-12 shadow-sm text-center">

          <h1 className="text-3xl font-semibold text-[#4B2863] mb-6">
            Solicitud #{order.id}
          </h1>

          <div className="mb-6">
            <span className="px-4 py-2 rounded-full text-sm bg-yellow-100 text-yellow-700">
              {order.status}
            </span>
          </div>

          <p className="text-muted-foreground mb-6">
            Estado actual de su solicitud.
          </p>

          <p className="text-lg font-semibold text-[#4B2863]">
            Total: ${order.total.toLocaleString()}
          </p>

        </div>

      </div>
    </div>
  )
}