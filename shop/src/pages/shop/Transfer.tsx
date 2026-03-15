import ProcessHeader from "@/components/checkout/ProcessHeader"
import { useState } from "react"
import { useParams, Navigate, useNavigate } from "react-router-dom"
import { useOrder, useUploadReceipt } from "@/hooks/orders.hook"
import { Upload } from "lucide-react"

const ALLOWED_TYPES = ["image/png", "image/jpeg"]

export default function Transfer() {

  const { id } = useParams()
  const navigate = useNavigate()

  const { data: order, isLoading } = useOrder(id!)
  const { mutateAsync, isPending } = useUploadReceipt()

  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (!id) {
    return <Navigate to="/carrito" replace />
  }

  if (isLoading || !order) {
    return <div className="p-10">Cargando solicitud...</div>
  }

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
      setError("Debe adjuntar un comprobante en formato PNG o JPEG.")
      return
    }

    try {
      await mutateAsync({ id, file })
      navigate(`/confirmacion/${id}`)
    } catch {
      setError("Error al subir comprobante.")
    }
  }

  return (
    <div className="bg-[#f6f4f9] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">

        <ProcessHeader currentStep={3} />

        <h1 className="text-3xl font-semibold text-[#4B2863] mb-4">
          Transferencia Bancaria
        </h1>

        <p className="text-muted-foreground mb-12 max-w-2xl">
          Complete la transferencia utilizando los datos indicados.
          Una vez enviado el comprobante, su solicitud será validada
          por el equipo administrativo.
        </p>

        <div className="lg:grid-cols-[1fr_380px] gap-12">

          {/* BLOQUE PRINCIPAL */}

          <div className="bg-white rounded-3xl border border-gray-200 p-10 shadow-sm">

            {/* ID */}

            <div className="mb-12">
              <p className="text-sm text-muted-foreground">
                Identificador de Solicitud
              </p>

              <p className="text-xl font-semibold text-[#4B2863] mt-1">
                #{order.id}
              </p>
            </div>

            {/* DATOS BANCARIOS */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 mb-12">

              <div>
                <p className="text-sm text-muted-foreground">Banco</p>
                <p className="font-medium mt-1">Banco Estado</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Tipo de Cuenta</p>
                <p className="font-medium mt-1">Cuenta Corriente</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Número de Cuenta</p>
                <p className="font-medium tracking-wide mt-1">12345678</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">RUT</p>
                <p className="font-medium mt-1">12.345.678-9</p>
              </div>

              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground">
                  Correo de confirmación
                </p>
                <p className="font-medium mt-1">
                  pagos@wemoguen.cl
                </p>
              </div>

            </div>

            {/* MONTO */}

            <div className="bg-[#4B2863]/5 border border-[#4B2863]/20 rounded-2xl p-6 mb-12">

              <p className="text-sm text-muted-foreground mb-2">
                Monto a transferir
              </p>

              <p className="text-3xl font-semibold text-[#4B2863]">
                ${order.total.toLocaleString()}
              </p>

            </div>

            {/* UPLOAD */}

            <div className="space-y-4">

              <label
                htmlFor="receipt"
                className="block text-sm font-medium"
              >
                Adjuntar comprobante
              </label>

              <label
                htmlFor="receipt"
                className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-gray-50 transition"
              >

                <Upload className="h-6 w-6 mb-2 text-muted-foreground" />

                <span className="text-sm text-muted-foreground">
                  {file ? file.name : "Subir comprobante (PNG o JPEG)"}
                </span>

                <input
                  id="receipt"
                  type="file"
                  accept=".png,.jpg,.jpeg,image/png,image/jpeg"
                  className="hidden"
                  onChange={(e) =>
                    handleFileChange(e.target.files?.[0] || null)
                  }
                />

              </label>

              {error && (
                <p className="text-sm text-red-500">
                  {error}
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="w-full mt-6 rounded-xl bg-[#4B2863] py-3 text-white font-medium transition hover:bg-[#3c1f4f] disabled:opacity-60"
              >
                {isPending ? "Enviando..." : "Enviar comprobante"}
              </button>

            </div>

            <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
              La validación puede tardar hasta 24 horas hábiles.
              Recibirá una notificación una vez confirmada la recepción del pago.
            </p>

          </div>

        </div>

      </div>
    </div>
  )
}