import { useCartStore } from "@/store/cart.store"

type Props = {
  onConfirm: () => void
  isPending?: boolean
}

export default function OrderSummary({ onConfirm, isPending }: Props) {

  const { subtotal, savings, shipping, total, originalSubtotal } =
    useCartStore((s) => s.getCartTotals())

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm h-fit sticky top-24">

      {/* Header */}
      <h3 className="text-lg font-semibold mb-6 text-[#4B2863]">
        Resumen de compra
      </h3>

      {/* Detalle */}
      <div className="space-y-4 text-sm">

        {/* Precio original */}
        {originalSubtotal > subtotal && (
          <div className="flex justify-between">
            <span className="text-gray-600">Productos</span>
            <span>${originalSubtotal.toLocaleString()}</span>
          </div>
        )}

        {/* Descuentos */}
        {savings > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Descuentos</span>
            <span>- ${savings.toLocaleString()}</span>
          </div>
        )}

        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">
            ${subtotal.toLocaleString()}
          </span>
        </div>

        {/* Envío */}
        <div className="flex justify-between">
          <span className="text-gray-600">Envío</span>

          {shipping === 0 ? (
            <span className="text-green-600 font-medium">
              Gratis
            </span>
          ) : (
            <span className="font-medium">
              ${shipping.toLocaleString()}
            </span>
          )}
        </div>

      </div>

      {/* Total */}
      <div className="border-t border-gray-200 mt-6 pt-6 flex justify-between items-center">

        <span className="text-base font-medium text-gray-700">
          Total a pagar
        </span>

        <span className="text-2xl font-semibold text-[#4B2863]">
          ${total.toLocaleString()}
        </span>

      </div>

      {/* Botón */}
      <button
        onClick={onConfirm}
        disabled={isPending}
        className="
          mt-8 w-full rounded-xl
          bg-[#4B2863] py-3
          text-white font-medium
          transition
          hover:bg-[#3c1f4f]
          disabled:opacity-60
          disabled:cursor-not-allowed
        "
      >
        {isPending ? "Procesando..." : "Confirmar solicitud"}
      </button>

      {/* Nota confianza */}
      <p className="text-xs text-gray-500 text-center mt-4">
        No se realizará ningún cobro automático.  
        Confirmaremos tu pedido por correo electrónico.
      </p>

      {/* Seguridad */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M8 0c-.69 0-1.37.15-2 .43L2 2v4c0 5 3.5 9.74 6 10 2.5-.26 6-5 6-10V2L10 .43A4.978 4.978 0 0 0 8 0z"/>
        </svg>

        <span>Solicitud protegida y datos seguros</span>

      </div>

    </div>
  )
}