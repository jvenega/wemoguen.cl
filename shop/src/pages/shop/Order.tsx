import { useMyOrders } from "@/hooks/orders.hook"
import ProcessHeader from "@/components/checkout/ProcessHeader"
import { Link } from "react-router-dom"

function StatusBadge({ status }: { status: string }) {
  const base =
    "px-3 py-1 text-xs font-medium rounded-full"

  switch (status) {
    case "AWAITING_TRANSFER":
      return (
        <span className={`${base} bg-blue-50 text-blue-700 border border-blue-200`}>
          Esperando Transferencia
        </span>
      )
    case "UNDER_REVIEW":
      return (
        <span className={`${base} bg-yellow-50 text-yellow-700 border border-yellow-200`}>
          En Revisión
        </span>
      )
    case "APPROVED":
      return (
        <span className={`${base} bg-green-50 text-green-700 border border-green-200`}>
          Aprobada
        </span>
      )
    case "REJECTED":
      return (
        <span className={`${base} bg-red-50 text-red-700 border border-red-200`}>
          Rechazada
        </span>
      )
    default:
      return (
        <span className={`${base} bg-gray-50 text-gray-600 border border-gray-200`}>
          {status}
        </span>
      )
  }
}

export default function Orders() {
  const { data, isLoading, isError } = useMyOrders()

  const totalOrders = data?.length || 0
  const totalApproved =
    data?.filter((o) => o.status === "APPROVED").length || 0

  return (
    <div className="bg-[#f6f4f9] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">

        <ProcessHeader currentStep={4} />

        {/* Header refinado */}
        <div className="mb-12">
          <h1 className="text-3xl font-semibold text-[#4B2863]">
            Historial de Solicitudes
          </h1>
          <p className="text-muted-foreground mt-2">
            Seguimiento y estado de tus solicitudes médicas.
          </p>
        </div>

        {/* Métricas superiores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Total de solicitudes
            </p>
            <p className="text-2xl font-semibold text-[#4B2863] mt-2">
              {totalOrders}
            </p>
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Aprobadas
            </p>
            <p className="text-2xl font-semibold text-[#4B2863] mt-2">
              {totalApproved}
            </p>
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

        {data && data.length === 0 && (
          <div className="bg-white rounded-2xl border p-12 text-center">
            <p className="text-muted-foreground mb-6">
              Aún no tienes solicitudes registradas.
            </p>
            <Link
              to="/"
              className="inline-block bg-[#4B2863] text-white px-6 py-2 rounded-lg hover:bg-[#3c1f4f] transition"
            >
              Ver productos
            </Link>
          </div>
        )}

        {/* Lista */}
        <div className="space-y-6">
          {data?.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <div>
                  <p className="font-semibold text-[#4B2863]">
                    #{order.id}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right space-y-2">
                  <p className="text-lg font-semibold text-[#4B2863]">
                    ${order.total.toLocaleString()}
                  </p>
                  <StatusBadge status={order.status} />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Link
                  to={`/orders/${order.id}`}
                  className="text-sm font-medium text-[#4B2863] hover:underline"
                >
                  Ver detalle →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}