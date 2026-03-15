import { useMyOrders } from "@/hooks/orders.hook"
import ProcessHeader from "@/components/checkout/ProcessHeader"
import { Link } from "react-router-dom"
import type { OrderStatus } from "@/types/order.types"
import {
  Package,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowRight
} from "lucide-react"

function StatusBadge({ status }: { status: OrderStatus }) {

  const base = "px-3 py-1 text-xs font-medium rounded-full border"

  switch (status) {

    case "PENDING_PAYMENT":
      return (
        <span className={`${base} bg-blue-50 text-blue-700 border-blue-200`}>
          Esperando Transferencia
        </span>
      )

    case "WAITING_APPROVAL":
      return (
        <span className={`${base} bg-yellow-50 text-yellow-700 border-yellow-200`}>
          En Revisión
        </span>
      )

    case "PROCESSING":
      return (
        <span className={`${base} bg-purple-50 text-purple-700 border-purple-200`}>
          Procesando
        </span>
      )

    case "APPROVED":
      return (
        <span className={`${base} bg-green-50 text-green-700 border-green-200`}>
          Aprobada
        </span>
      )

    case "REJECTED":
      return (
        <span className={`${base} bg-red-50 text-red-700 border-red-200`}>
          Rechazada
        </span>
      )

    default:
      return (
        <span className={`${base} bg-gray-50 text-gray-600 border-gray-200`}>
          {status}
        </span>
      )
  }
}

export default function Orders() {

  const { data, isLoading, isError } = useMyOrders()

  const totalOrders = data?.length || 0

  const approved =
    data?.filter((o) => o.status === "APPROVED").length || 0

  const pending =
    data?.filter((o) => o.status === "WAITING_APPROVAL").length || 0

  const awaitingTransfer =
    data?.filter((o) => o.status === "PENDING_PAYMENT").length || 0

  return (
    <div className="bg-[#f6f4f9] min-h-screen">

      <div className="max-w-6xl mx-auto px-6 py-16">

        <ProcessHeader currentStep={4} />

        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-[#4B2863]">
            Historial de solicitudes
          </h1>

          <p className="text-muted-foreground mt-2">
            Seguimiento y estado de tus solicitudes médicas.
          </p>
        </div>

        {/* MÉTRICAS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">

          <div className="bg-white rounded-2xl border p-6 shadow-sm flex items-center gap-4">
            <Package className="h-6 w-6 text-[#4B2863]" />
            <div>
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-xl font-semibold text-[#4B2863]">
                {totalOrders}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm flex items-center gap-4">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <div>
              <p className="text-xs text-muted-foreground">Aprobadas</p>
              <p className="text-xl font-semibold">{approved}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm flex items-center gap-4">
            <Clock className="h-6 w-6 text-yellow-600" />
            <div>
              <p className="text-xs text-muted-foreground">En revisión</p>
              <p className="text-xl font-semibold">{pending}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm flex items-center gap-4">
            <AlertCircle className="h-6 w-6 text-blue-600" />
            <div>
              <p className="text-xs text-muted-foreground">Esperando pago</p>
              <p className="text-xl font-semibold">{awaitingTransfer}</p>
            </div>
          </div>

        </div>

        {isLoading && (
          <p className="text-muted-foreground">
            Cargando solicitudes...
          </p>
        )}

        {isError && (
          <p className="text-red-500">
            Error al cargar solicitudes.
          </p>
        )}

        <div className="space-y-4">

          {data?.map((order) => (

            <div
              key={order.id}
              className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition"
            >

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div>
                  <p className="font-semibold text-[#4B2863]">
                    Solicitud #{order.id}
                  </p>

                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-6">

                  <div className="text-right">

                    <p className="text-lg font-semibold text-[#4B2863]">
                      ${order.total.toLocaleString()}
                    </p>

                    <StatusBadge status={order.status} />

                  </div>

                  <Link
                    to={`/pedidos/${order.id}`}
                    className="text-[#4B2863] hover:text-[#3c1f4f] flex items-center gap-1 text-sm font-medium"
                  >
                    Ver detalle
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}