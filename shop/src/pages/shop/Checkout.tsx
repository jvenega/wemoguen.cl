import { useNavigate } from "react-router-dom"
import { useCartStore } from "@/store/cart.store"
import { useAuthStore } from "@/store/auth.store"

import ProcessHeader from "@/components/checkout/ProcessHeader"
import type { Delivery } from "@/types/delivery.types"

import DeliveryForm from "@/components/checkout/DeliveryForm"

import { useState } from "react"

export default function Checkout() {

  const navigate = useNavigate()

  const items = useCartStore(s => s.items)
  const setDeliveryStore = useCartStore(s => s.setDelivery)

  const user = useAuthStore(s => s.user)

  const [delivery, setDelivery] = useState<Delivery>({
    address: "",
    commune: "",
    city: "",
    preference: "AM",
    notes: ""
  })

  const isEmpty = items.length === 0

  const isDeliveryValid =
    delivery.address.trim() !== "" &&
    delivery.commune.trim() !== ""

  // ================= HANDLER =================

  const handleContinue = () => {

    if (!user || isEmpty) return

    if (!isDeliveryValid) return

    setDeliveryStore(delivery)
    navigate("/checkout/review")
  }

  // ================= UI =================

  return (
    <div className="bg-[#f6f4f9] min-h-screen pb-28">

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-16">

        <ProcessHeader currentStep={2} />

        <h1 className="text-2xl md:text-3xl font-semibold text-[#4B2863] mt-6 md:mt-10 mb-10 md:mb-16">
          Datos de entrega
        </h1>

        {/* FORM */}
        <DeliveryForm
          delivery={delivery}
          setDelivery={setDelivery}
          user={user ?? undefined}
        />

        {/* VALIDACIÓN VISUAL */}
        {!isDeliveryValid && (
          <p className="text-xs text-red-500 mt-4">
            Completa dirección y comuna para continuar
          </p>
        )}

      </div>

      {/* CTA GLOBAL */}
      {!isEmpty && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex items-center justify-between z-50 shadow-lg">

          <div>
            <p className="text-xs text-gray-500">Siguiente paso</p>
            <p className="font-semibold text-[#4B2863]">
              Revisar solicitud
            </p>
          </div>

          <button
            onClick={handleContinue}
            disabled={!isDeliveryValid}
            className={`
              px-5 py-2 rounded-lg font-medium
              ${!isDeliveryValid
                ? "bg-gray-300 text-gray-500"
                : "bg-[#4B2863] text-white"}
            `}
          >
            Continuar
          </button>

        </div>
      )}

    </div>
  )
}