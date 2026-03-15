import { useState } from "react"
import { useParams, Navigate, useNavigate } from "react-router-dom"
import {
  useOrder,
  useUploadReceipt,
} from "@/hooks/orders.hook"
import { useQueryClient } from "@tanstack/react-query"
import ProcessHeader from "@/components/checkout/ProcessHeader"

export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  if (!id) return <Navigate to="/pedidos" replace />

  const { data: order, isLoading } = useOrder(id)
  const { mutateAsync, isPending } = useUploadReceipt()

  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (isLoading || !order) {
    return <div className="p-10">Cargando...</div>
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Seleccione un archivo.")
      return
    }

    await mutateAsync({ id, file })

    queryClient.invalidateQueries({
      queryKey: ["order", id],
    })

    setFile(null)
  }

  return (
    <div className="bg-[#f6f4f9] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <ProcessHeader currentStep={4} />

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-semibold text-[#4B2863]">
              Solicitud #{order.id}
            </h1>
            <p className="text-muted-foreground mt-2">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="text-sm border px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            ← Volver
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16">

          {/* PRODUCTOS */}
          <div className="space-y-6">
            {order.items.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-2xl border p-6 shadow-sm flex gap-6"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden border">
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <p className="font-medium text-[#4B2863]">
                    {item.name}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Cantidad: {item.quantity}
                  </p>
                </div>

                <div className="text-right font-semibold text-[#4B2863]">
                  $
                  {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* PANEL DERECHO */}
          <div className="space-y-8">

            {/* RESUMEN */}
            <div className="bg-white rounded-3xl border p-8 shadow-sm">
              <h3 className="text-lg font-medium mb-6 text-[#4B2863]">
                Resumen Financiero
              </h3>

              <div className="flex justify-between text-lg">
                <span>Total</span>
                <span className="font-semibold text-[#4B2863]">
                  ${order.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* SUBIR COMPROBANTE */}
            {order.status === "PENDING_PAYMENT" && (
              <div className="bg-white rounded-3xl border p-8 shadow-sm">
                <h3 className="text-lg font-medium mb-6 text-[#4B2863]">
                  Subir Comprobante
                </h3>

                <input
                  title="Subir Comprobante"
                  type="file"
                  onChange={(e) =>
                    setFile(e.target.files?.[0] || null)
                  }
                />

                {error && (
                  <p className="text-sm text-red-500 mt-3">
                    {error}
                  </p>
                )}

                <button
                  onClick={handleUpload}
                  disabled={isPending}
                  className="w-full mt-6 rounded-xl bg-[#4B2863] py-3 text-white font-medium hover:bg-[#3c1f4f] transition disabled:opacity-60"
                >
                  {isPending
                    ? "Enviando..."
                    : "Enviar Comprobante"}
                </button>
              </div>
            )}

            {/* 🔥 PREVIEW DEL COMPROBANTE */}
            {order.receiptUrl && (
              <div className="bg-white rounded-3xl border p-8 shadow-sm">
                <h3 className="text-lg font-medium mb-6 text-[#4B2863]">
                  Comprobante Enviado
                </h3>

                <div className="border rounded-xl overflow-hidden">
                  {order.receiptUrl.endsWith(".pdf") ? (
                    <iframe
                      title="Comprobante PDF"
                      src={order.receiptUrl}
                      className="w-full h-64"
                    />
                  ) : (
                    <img
                      src={order.receiptUrl}
                      alt="Comprobante"
                      className="w-full object-contain"
                    />
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}