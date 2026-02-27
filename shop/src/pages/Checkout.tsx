import { useNavigate } from "react-router-dom"
import { useCartStore } from "@/store/cart.store"
import { useAuthStore } from "@/store/auth.store"
import ProcessHeader from "@/components/ProcessHeader"
import { useCreateOrder } from "@/hooks/orders.hook"

export default function Checkout() {
  const navigate = useNavigate()
  const { items, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const { mutateAsync, isPending } = useCreateOrder()

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )

  const handleConfirm = async () => {
    if (!user) return

    if (items.length === 0) {
      return
    }

    try {
      const order = await mutateAsync({
        patient: {
          fullName: user.fullName,
          rut: user.rut,
          email: user.email,
        },
        items: items.map((i) => ({
          productId: i.id,
          quantity: i.quantity,
        })),
      })

      clearCart()
      navigate(`/transfer/${order.id}`)
    } catch {
      console.error("Error al crear solicitud")
    }
  }

  return (
    <div className="bg-[#f6f4f9] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <ProcessHeader currentStep={2} />

        <h1 className="text-3xl font-semibold text-[#4B2863] mb-16">
          Confirmación de Solicitud
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16">

          {/* BLOQUE IZQUIERDO */}
          <div className="space-y-10">

            {/* DATOS PACIENTE */}
            <div className="bg-white rounded-3xl border border-gray-200 p-10 shadow-sm">
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-lg font-medium text-[#4B2863]">
                  Datos del Paciente
                </h2>

                <button
                  onClick={() => navigate("/profile")}
                  className="text-sm text-[#4B2863] hover:underline"
                >
                  Editar perfil
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-16 text-sm">

                <div>
                  <p className="text-muted-foreground">
                    Nombre completo
                  </p>
                  <p className="font-medium mt-1">
                    {user?.fullName}
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground">
                    RUT
                  </p>
                  <p className="font-medium mt-1">
                    {user?.rut}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-muted-foreground">
                    Correo electrónico
                  </p>
                  <p className="font-medium mt-1">
                    {user?.email}
                  </p>
                </div>

              </div>
            </div>

            {/* PRODUCTOS */}
            <div className="bg-white rounded-3xl border border-gray-200 p-10 shadow-sm">
              <h2 className="text-lg font-medium mb-8 text-[#4B2863]">
                Productos Seleccionados
              </h2>

              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-[#4B2863]">
                        {item.name}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Cantidad: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold text-[#4B2863]">
                      $
                      {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* PANEL DERECHO */}
          <div className="bg-white rounded-3xl border border-gray-200 p-10 shadow-sm h-fit sticky top-24">

            <h3 className="text-lg font-medium mb-8 text-[#4B2863]">
              Resumen Financiero
            </h3>

            <div className="flex justify-between items-center text-lg mb-8">
              <span>Total estimado</span>
              <span className="text-2xl font-semibold text-[#4B2863]">
                ${total.toLocaleString()}
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-10">
              La solicitud será revisada conforme a normativa vigente.
              Una vez confirmada, se habilitará la carga de comprobante
              de transferencia bancaria.
            </p>

            <button
              onClick={handleConfirm}
              disabled={isPending || items.length === 0}
              className="w-full rounded-xl bg-[#4B2863] py-3 text-white font-medium transition hover:bg-[#3c1f4f] disabled:opacity-60"
            >
              {isPending
                ? "Procesando..."
                : "Confirmar solicitud"}
            </button>

          </div>

        </div>
      </div>
    </div>
  )
}