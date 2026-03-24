import { useCartStore } from "@/store/cart.store"
import { Link } from "react-router-dom"
import ProcessHeader from "@/components/checkout/ProcessHeader"
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import { useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

const FREE_SHIPPING_THRESHOLD = 50000
const SHIPPING_COST = 3500

export default function Cart() {

  const items = useCartStore(s => s.items)
  const removeItem = useCartStore(s => s.removeItem)
  const updateQuantity = useCartStore(s => s.updateQuantity)

  const {
    subtotal,
    savings,
    shipping,
    total
  } = useMemo(() => {

    let subtotal = 0
    let savings = 0

    for (const item of items) {
      const price = item.discountPercentage
        ? item.price - item.price * (item.discountPercentage / 100)
        : item.price

      subtotal += price * item.quantity
      savings += (item.price - price) * item.quantity
    }

    const shipping =
      subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST

    return {
      subtotal,
      savings,
      shipping,
      total: subtotal + shipping
    }

  }, [items])

  return (
    <div className="bg-[#f6f4f9] min-h-screen pb-24 lg:pb-0">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">

        <ProcessHeader currentStep={1} />

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#4B2863]">
            Carro ({items.length})
          </h1>

          <Link
            to="/"
            className="text-sm text-[#4B2863] hover:underline"
          >
            Seguir explorando
          </Link>
        </div>

        {/* ENVÍO GRATIS */}
        {subtotal < FREE_SHIPPING_THRESHOLD && items.length > 0 && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm p-3 rounded-lg">
            Te faltan{" "}
            <strong>
              ${(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()}
            </strong>{" "}
            para envío gratis
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14">

          {/* IZQUIERDA */}
          <div className="space-y-4">

            {/* EMPTY */}
            {items.length === 0 && (
              <div className="bg-white rounded-xl p-12 text-center border shadow-sm">
                <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />

                <h2 className="text-lg font-medium mb-2">
                  Tu carrito está vacío
                </h2>

                <p className="text-sm text-gray-500 mb-6">
                  Explora productos y comienza tu solicitud.
                </p>

                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#4B2863] px-6 py-3 text-white font-medium hover:bg-[#3c1f4f]"
                >
                  Ver catálogo
                </Link>
              </div>
            )}

            {/* ITEMS */}
            <AnimatePresence>
              {items.map((item) => {

                const price = item.discountPercentage
                  ? item.price - item.price * (item.discountPercentage / 100)
                  : item.price

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-white border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
                  >

                    <div className="flex gap-4">

                      {/* IMAGE */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden border shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* CONTENT */}
                      <div className="flex-1 flex flex-col justify-between">

                        {/* TOP */}
                        <div>
                          <p className="text-sm font-medium text-gray-800 leading-tight">
                            {item.name}
                          </p>

                          <div className="flex items-center gap-2 mt-1">
                            {item.discountPercentage && (
                              <span className="text-xs line-through text-gray-400">
                                ${item.price.toLocaleString()}
                              </span>
                            )}

                            <span className="text-base font-semibold text-[#4B2863]">
                              ${price.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* BOTTOM */}
                        <div className="flex items-center justify-between mt-3">

                          {/* QUANTITY */}
                          <div className="flex items-center bg-gray-50 rounded-lg border">

                            <button
                              title="quantity"
                              disabled={item.quantity <= 1}
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center disabled:opacity-40"
                            >
                              <Minus size={14} />
                            </button>

                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>

                            <button
                              title="update"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center"
                            >
                              <Plus size={14} />
                            </button>

                          </div>

                          {/* TOTAL */}
                          <div className="text-right">
                            <p className="text-xs text-gray-400">Total</p>
                            <p className="font-semibold text-[#4B2863]">
                              ${(price * item.quantity).toLocaleString()}
                            </p>
                          </div>

                        </div>

                      </div>

                    </div>

                    {/* FOOTER */}
                    <div className="flex justify-between items-center mt-3 pt-3 border-t">

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-red-500 flex items-center gap-1 hover:underline"
                      >
                        <Trash2 size={14} />
                        Eliminar
                      </button>

                      {item.discountPercentage && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                          -{item.discountPercentage}%
                        </span>
                      )}

                    </div>

                  </motion.div>
                )
              })}
            </AnimatePresence>

          </div>

          {/* DESKTOP SUMMARY */}
          <div className="hidden lg:block">
            <div className="bg-white border rounded-xl p-6 shadow-sm sticky top-24">

              <h3 className="text-lg font-semibold text-[#4B2863] mb-6">
                Resumen de solicitud
              </h3>

              <div className="space-y-3 text-sm">

                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Ahorro</span>
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

              <div className="border-t mt-6 pt-6 flex justify-between font-semibold text-[#4B2863] text-lg">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>

              <Link
                to="/checkout"
                className="block text-center w-full mt-6 bg-[#4B2863] text-white py-3 rounded-lg hover:bg-[#3c1f4f] transition"
              >
                Continuar solicitud
              </Link>

            </div>
          </div>

        </div>

      </div>

      {/* MOBILE STICKY */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex items-center justify-between lg:hidden z-50">

          <div>
            <p className="text-xs text-gray-500">Total</p>
            <p className="font-semibold text-[#4B2863]">
              ${total.toLocaleString()}
            </p>
          </div>

          <Link
            to="/checkout"
            className="bg-[#4B2863] text-white px-5 py-2 rounded-lg font-medium"
          >
            Continuar
          </Link>

        </div>
      )}

    </div>
  )
}