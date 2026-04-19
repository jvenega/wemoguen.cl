import { useNavigate } from "react-router-dom"
import { useCartStore } from "@/store/cart.store"
import { useAuthStore } from "@/store/auth.store"
import { useCreateOrder } from "@/hooks/orders.hook"

import ProcessHeader from "@/components/checkout/ProcessHeader"
import ProductSummary from "@/components/checkout/ProductSummary"
import OrderSummary from "@/components/checkout/OrderSummary"

import type { CreateOrderPayload } from "@/types/order.types"
import type { Delivery } from "@/types/delivery.types"

export default function CheckoutReview() {

  const navigate = useNavigate()

  const items = useCartStore(s => s.items)
  const clearCart = useCartStore(s => s.clearCart)
  const getPayload = useCartStore(s => s.getPayload)
  const delivery = useCartStore(s => s.delivery) as Delivery

  const user = useAuthStore(s => s.user)

  const { mutateAsync, isPending } = useCreateOrder()

  const isEmpty = items.length === 0

  // ================= REDIRECT =================

  if (!user || isEmpty || !delivery) {
    navigate("/checkout")
    return null
  }

  // ================= HANDLER =================

  const handleConfirm = async () => {
    try {

      const cartPayload = getPayload()

      const payload: CreateOrderPayload = {
        patient: {
          fullName: user.fullName,
          rut: String(user.rut),
          email: user.email
        },
        delivery,
        items: cartPayload.items.map(i => ({
          productId: i.productId,
          name: "",
          quantity: i.quantity,
          price: i.price,
          basePrice: i.basePrice,
          discountPercentage: i.discountPercentage
        })),
        coupon: cartPayload.coupon
      }

      const order = await mutateAsync(payload)

      clearCart()

      navigate(`/transferencia/${order.id}`)

    } catch (err) {
      console.error(err)
      alert("Error al crear la solicitud")
    }
  }

  // ================= UI =================

  return (
    <div className="bg-[#f6f4f9] min-h-screen pb-28">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">

        <ProcessHeader currentStep={3} />

        <h1 className="text-2xl md:text-3xl font-semibold text-[#4B2863] mt-6 md:mt-10 mb-10 md:mb-16">
          Revisión del pedido
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16">

          {/* LEFT */}
          <div className="space-y-8">

            {/* DATOS DE ENTREGA */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">

              <div className="flex items-center justify-between">
                <h3 className="font-medium text-[#4B2863]">
                  Datos de entrega
                </h3>

                <button
                  onClick={() => navigate("/checkout")}
                  className="text-xs text-primary underline"
                >
                  Editar
                </button>
              </div>

              <div className="text-sm space-y-2">

                <p><strong>Dirección:</strong> {delivery.address}</p>
                <p><strong>Comuna:</strong> {delivery.commune}</p>
                <p><strong>Ciudad:</strong> {delivery.city}</p>

                <p>
                  <strong>Horario:</strong>{" "}
                  {delivery.preference === "AM"
                    ? "Mañana (09:00 - 13:00)"
                    : "Tarde (14:00 - 19:00)"}
                </p>

                {delivery.notes && (
                  <p><strong>Notas:</strong> {delivery.notes}</p>
                )}

              </div>

            </div>

            {/* PRODUCTOS */}
            <ProductSummary items={items} />

          </div>

          {/* RIGHT (DESKTOP) */}
          <div className="hidden lg:block space-y-6 sticky top-24 h-fit">

            <OrderSummary />

          </div>

        </div>

      </div>

      {/* CTA GLOBAL */}
      {!isEmpty && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex items-center justify-between z-50 shadow-lg">

          <div>
            <p className="text-xs text-gray-500">Paso final</p>
            <p className="font-semibold text-[#4B2863]">
              Confirmar solicitud
            </p>
          </div>

          <button
            onClick={handleConfirm}
            disabled={isPending}
            className="px-5 py-2 rounded-lg font-medium bg-[#4B2863] text-white disabled:opacity-60"
          >
            {isPending ? "Creando..." : "Confirmar"}
          </button>

        </div>
      )}

    </div>
  )
}