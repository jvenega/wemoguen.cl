import { useNavigate } from "react-router-dom"
import { useCartStore } from "@/store/cart.store"
import { useAuthStore } from "@/store/auth.store"
import { useCreateOrder } from "@/hooks/orders.hook"
import ProcessHeader from "@/components/ProcessHeader"

import DeliveryForm from "@/components/checkout/DeliveryForm"
import ProductSummary from "@/components/checkout/ProductSummary"
import OrderSummary from "@/components/checkout/OrderSummary"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function Checkout() {

  const navigate = useNavigate()

  const { items, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const { mutateAsync, isPending } = useCreateOrder()

  const [summaryOpen, setSummaryOpen] = useState(false)

  const [delivery, setDelivery] = useState({
    address: "",
    commune: "",
    city: "",
    preference: "AM" as "AM" | "PM",
    notes: ""
  })

  const isDeliveryValid = delivery.address && delivery.commune

  const handleConfirm = async () => {

    if (!user) return
    if (items.length === 0) return

    if (!isDeliveryValid) {
      alert("Completa los datos de entrega")
      return
    }

    try {

      const order = await mutateAsync({
        patient: {
          fullName: user.fullName,
          rut: user.rut,
          email: user.email,
        },

        delivery,

        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      })

      clearCart()

      navigate(`/transfer/${order.id}`)

    } catch (error) {
      console.error("Error al crear solicitud:", error)
      alert("Ocurrió un error al crear la solicitud")
    }
  }

  return (
    <div className="bg-[#f6f4f9] min-h-screen">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">

        <ProcessHeader currentStep={2} />

        <h1 className="text-2xl md:text-3xl font-semibold text-[#4B2863] mt-6 md:mt-10 mb-10 md:mb-16">
          Confirmación de solicitud
        </h1>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16">

          {/* LEFT */}
          <div className="space-y-8 md:space-y-10">

            {/* MOBILE SUMMARY TOGGLE */}
            <div className="lg:hidden">

              <button
                onClick={() => setSummaryOpen(!summaryOpen)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between text-sm font-medium shadow-sm"
              >
                Ver resumen de compra
                <ChevronDown
                  size={18}
                  className={`transition ${summaryOpen ? "rotate-180" : ""}`}
                />
              </button>

              {summaryOpen && (
                <div className="mt-4 space-y-6">

                  <ProductSummary items={items} />

                  <OrderSummary
                    onConfirm={handleConfirm}
                    isPending={isPending}
                  />

                </div>
              )}

            </div>

            {/* FORM */}
            <DeliveryForm
              delivery={delivery}
              setDelivery={setDelivery}
              user={user}
            />

          </div>

          {/* RIGHT (DESKTOP ONLY) */}
          <div className="hidden lg:block space-y-8 sticky top-24 h-fit">

            <ProductSummary items={items} />

            <OrderSummary
              onConfirm={handleConfirm}
              isPending={isPending}
            />

          </div>

        </div>

      </div>

    </div>
  )
}