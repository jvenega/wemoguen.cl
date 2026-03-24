import ProcessHeader from "@/components/checkout/ProcessHeader"
import { useState } from "react"
import { useParams, Navigate, useNavigate } from "react-router-dom"
import { useOrder, useUploadReceipt } from "@/hooks/orders.hook"
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  Copy
} from "lucide-react"

const ALLOWED_TYPES = ["image/png", "image/jpeg"]

export default function Transfer() {

  const { id } = useParams()
  const navigate = useNavigate()

  const { data: order, isLoading } = useOrder(id!)
  const { mutateAsync, isPending } = useUploadReceipt()

  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  if (!id) return <Navigate to="/carrito" replace />

  if (isLoading || !order) {
    return <div className="p-10">Cargando solicitud...</div>
  }

  // ================= HANDLERS =================

  const handleFileChange = (f: File | null) => {

    if (!f) return

    if (!ALLOWED_TYPES.includes(f.type)) {
      setError("Solo se permiten imágenes PNG o JPEG.")
      setFile(null)
      return
    }

    setError(null)
    setFile(f)
  }

  const handleSubmit = async () => {

    if (!file) {
      setError("Debe adjuntar un comprobante.")
      return
    }

    try {
      await mutateAsync({ id, file })
      navigate(`/confirmacion/${id}`)
    } catch {
      setError("Error al subir comprobante.")
    }
  }

  const copy = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(key)
    setTimeout(() => setCopied(null), 1500)
  }

  const canContinue = !!file

  // ================= UI =================

  return (
    <div className="bg-[#f6f4f9] min-h-screen pb-28">

      <div className="max-w-6xl mx-auto px-4 py-6">

        <ProcessHeader currentStep={3} />

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-xl md:text-3xl font-semibold text-[#4B2863]">
            Transferencia bancaria
          </h1>

          <p className="text-sm md:text-base text-muted-foreground mt-2">
            Realiza la transferencia y sube tu comprobante para validar tu pedido.
          </p>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">

          {/* ================= MAIN ================= */}
          <div className="space-y-4">

            {/* MONTO */}
            <div className="bg-white rounded-2xl border p-5 shadow-sm">

              <p className="text-xs text-muted-foreground mb-1">
                Total a transferir
              </p>

              <p className="text-2xl md:text-3xl font-semibold text-[#4B2863]">
                ${order.total.toLocaleString("es-CL")}
              </p>

              <p className="text-xs text-muted-foreground mt-1">
                ID #{order.id}
              </p>

            </div>

            {/* UPLOAD */}
            <div className="bg-white rounded-2xl border p-5 shadow-sm space-y-3">

              <p className="text-sm font-medium">
                Comprobante
              </p>

              <label
                htmlFor="receipt"
                className={`
                  flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer transition
                  ${file
                    ? "border-green-500 bg-green-50"
                    : "hover:bg-gray-50"}
                `}
              >

                {file ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-600 mb-1" />
                    <span className="text-sm font-medium truncate max-w-full">
                      {file.name}
                    </span>
                    <span className="text-xs text-green-600">
                      Archivo cargado
                    </span>
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5 mb-2 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground text-center">
                      Toca para subir comprobante
                    </span>
                  </>
                )}

                <input
                  id="receipt"
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  className="hidden"
                  onChange={(e) =>
                    handleFileChange(e.target.files?.[0] || null)
                  }
                />

              </label>

              {/* ERROR */}
              {error && (
                <div className="flex items-center gap-2 text-xs text-red-500">
                  <AlertCircle size={14} />
                  {error}
                </div>
              )}

              {/* BOTÓN PRINCIPAL */}
              <button
                onClick={handleSubmit}
                disabled={!canContinue || isPending}
                className={`
                  w-full mt-3 py-3 rounded-xl font-medium transition
                  ${!canContinue
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#4B2863] text-white hover:bg-[#3c1f4f]"}
                `}
              >
                {isPending
                  ? "Enviando..."
                  : canContinue
                    ? "Confirmar y continuar"
                    : "Sube tu comprobante"}
              </button>

              <p className="text-xs text-muted-foreground">
                Formatos permitidos: PNG, JPG
              </p>

            </div>

            {/* DATOS BANCARIOS */}
            <details className="bg-white rounded-2xl border p-5 shadow-sm">

              <summary className="cursor-pointer font-medium text-sm">
                Ver datos bancarios
              </summary>

              <div className="mt-4 space-y-4 text-sm">

                {[
                  ["Banco", "Banco Estado"],
                  ["Tipo", "Cuenta Corriente"],
                  ["Cuenta", "12345678"],
                  ["RUT", "12.345.678-9"],
                  ["Correo", "pagos@wemoguen.cl"]
                ].map(([label, value]) => (

                  <div key={label} className="flex items-center justify-between">

                    <div>
                      <p className="text-muted-foreground text-xs">{label}</p>
                      <p className="font-medium">{value}</p>
                    </div>

                    <button
                      onClick={() => copy(value, label)}
                      className="text-xs flex items-center gap-1 text-primary"
                    >
                      {copied === label
                        ? <CheckCircle2 size={14} />
                        : <Copy size={14} />}
                    </button>

                  </div>

                ))}

              </div>

            </details>

            {/* INFO */}
            <div className="bg-[#4B2863]/5 border border-[#4B2863]/20 rounded-2xl p-4 text-xs text-muted-foreground">

              Validación en hasta 24h hábiles.  
              Usa el ID #{order.id} como referencia.

            </div>

          </div>

          {/* SIDEBAR DESKTOP */}
          <div className="hidden lg:block space-y-6">

            <div className="bg-white rounded-2xl border p-6 shadow-sm">

              <p className="text-sm text-muted-foreground mb-2">
                Total a transferir
              </p>

              <p className="text-3xl font-semibold text-[#4B2863]">
                ${order.total.toLocaleString("es-CL")}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* CTA MOBILE */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">

        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">
            Total
          </span>
          <span className="font-semibold">
            ${order.total.toLocaleString("es-CL")}
          </span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!canContinue || isPending}
          className={`
            w-full py-3 rounded-xl font-medium transition
            ${!canContinue
              ? "bg-gray-300 text-gray-500"
              : "bg-[#4B2863] text-white"}
          `}
        >
          {isPending
            ? "Enviando..."
            : canContinue
              ? "Confirmar y continuar"
              : "Sube comprobante"}
        </button>

      </div>

    </div>
  )
}