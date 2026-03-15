import { useCartStore } from "@/store/cart.store"

interface Props {
  onConfirm: () => void
  isPending: boolean
}

export default function OrderSummary({ onConfirm, isPending }: Props) {

  const items = useCartStore(s => s.items)
  const coupon = useCartStore(s => s.coupon)

  const FREE_SHIPPING_THRESHOLD = 50000
  const SHIPPING_COST = 3500

  let subtotal = 0
  let originalSubtotal = 0
  let savings = 0

  for (const item of items) {

    const price = item.discountPercentage
      ? item.price - item.price * (item.discountPercentage / 100)
      : item.price

    subtotal += price * item.quantity
    originalSubtotal += item.price * item.quantity
    savings += (item.price - price) * item.quantity
  }

  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_COST

  let total = subtotal + shipping

  if (coupon === "WE10") {
    total = total * 0.9
  }

  return (
    <div className="bg-white border rounded-2xl p-8 shadow-sm">

      <h3 className="text-lg font-medium mb-6 text-[#4B2863]">
        Resumen de la solicitud
      </h3>

      <div className="space-y-4 text-sm">

        <div className="flex justify-between">
          <span>Productos</span>
          <span>${originalSubtotal.toLocaleString()}</span>
        </div>

        {savings > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Descuentos</span>
            <span>- ${savings.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span>Envío</span>
          <span>
            {shipping === 0
              ? "Gratis"
              : `$${shipping.toLocaleString()}`}
          </span>
        </div>

      </div>

      <div className="border-t mt-6 pt-6 flex justify-between items-center">

        <span className="font-medium text-lg">
          Total
        </span>

        <span className="text-2xl font-semibold text-[#4B2863]">
          ${Math.round(total).toLocaleString()}
        </span>

      </div>

      <button
        onClick={onConfirm}
        disabled={isPending}
        className="w-full mt-8 rounded-xl bg-[#4B2863] py-3 text-white font-medium hover:bg-[#3c1f4f] transition disabled:opacity-60"
      >
        {isPending
          ? "Creando solicitud..."
          : "Confirmar solicitud"}
      </button>

      <p className="text-xs text-gray-400 text-center mt-3">
        🔒 Confirmarás antes de realizar el pago
      </p>

    </div>
  )
}