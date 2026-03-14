import { useCartStore } from "@/store/cart.store"
import { Link } from "react-router-dom"
import ProcessHeader from "@/components/ProcessHeader"
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import { useState } from "react"

const FREE_SHIPPING_THRESHOLD = 50000

export default function Cart() {

  const {
    items,
    removeItem,
    updateQuantity,
    applyCoupon,
    getCartTotals
  } = useCartStore()

  const {
    subtotal,
    savings,
    shipping,
    total,
    originalSubtotal
  } = getCartTotals()

  const [coupon, setCoupon] = useState("")

  const remainingForFreeShipping =
    FREE_SHIPPING_THRESHOLD - subtotal

  const progress =
    Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)

  return (
    <div className="bg-[#f6f4f9] min-h-screen">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">

        <ProcessHeader currentStep={1} />

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-10">

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

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14">

          {/* PRODUCTOS */}
          <div className="space-y-6">

            {items.length === 0 && (
              <div className="bg-white rounded-xl p-12 text-center border shadow-sm">

                <ShoppingCart
                  size={48}
                  className="mx-auto text-gray-300 mb-4"
                />

                <h2 className="text-lg font-medium mb-2">
                  No hay productos en tu carro
                </h2>

                <p className="text-sm text-gray-500 mb-6">
                  Explora el catálogo para agregar productos.
                </p>

                <Link
                  to="/"
                  className="inline-block rounded-lg bg-[#4B2863] px-6 py-3 text-white font-medium hover:bg-[#3c1f4f]"
                >
                  Ver catálogo
                </Link>

              </div>
            )}

            {items.map((item) => {

              const price = item.discountPercentage
                ? item.price - item.price * (item.discountPercentage / 100)
                : item.price

              return (
                <div
                  key={item.id}
                  className="bg-white border rounded-xl p-4 md:p-6 flex flex-col sm:flex-row gap-5 sm:items-center shadow-sm hover:shadow-md transition"
                >

                  {/* Imagen */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0">

                    {item.discountPercentage && (
                      <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        -{item.discountPercentage}%
                      </div>
                    )}

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg border"
                    />

                  </div>

                  {/* Info */}
                  <div className="flex-1">

                    <p className="font-medium text-gray-800">
                      {item.name}
                    </p>

                    <div className="text-sm mt-1">

                      {item.discountPercentage && (
                        <span className="line-through text-gray-400 mr-2">
                          ${item.price.toLocaleString()}
                        </span>
                      )}

                      <span className="text-[#4B2863] font-semibold">
                        ${price.toLocaleString()}
                      </span>

                    </div>

                    {/* Cantidad */}
                    <div className="flex items-center gap-3 mt-4">

                      <button
                      title="q1"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-9 h-9 border rounded-lg flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>

                      <button
                      title="q2"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-9 h-9 border rounded-lg flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus size={14} />
                      </button>

                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-red-500 mt-3 flex items-center gap-1"
                    >
                      <Trash2 size={14} />
                      Eliminar
                    </button>

                  </div>

                  {/* Total */}
                  <div className="text-right sm:w-28">

                    <p className="text-xs text-gray-400">
                      Total
                    </p>

                    <p className="font-semibold text-lg text-[#4B2863]">
                      ${(price * item.quantity).toLocaleString()}
                    </p>

                  </div>

                </div>
              )
            })}

          </div>

          {/* RESUMEN */}
          {items.length > 0 && (
            <div className="sticky top-24 h-fit">

              <div className="bg-white border rounded-xl p-6 shadow-sm">

                <h2 className="font-semibold mb-4">
                  Resumen de la compra
                </h2>

                {/* ENVÍO GRATIS */}
                {remainingForFreeShipping > 0 && (

                  <div className="mb-5">

                    <p className="text-xs text-gray-500 mb-2">
                      Agrega ${remainingForFreeShipping.toLocaleString()} para envío gratis 🚚
                    </p>

                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#4B2863]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                  </div>

                )}

                <div className="space-y-3 text-sm">

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

                {/* Cupón */}
                <div className="flex gap-2 mt-6">

                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Código de descuento"
                    className="flex-1 border rounded-lg px-3 py-2 text-sm"
                  />

                  <button
                    onClick={() => applyCoupon(coupon)}
                    className="px-4 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200"
                  >
                    Aplicar
                  </button>

                </div>

                <div className="border-t mt-6 pt-6 flex justify-between items-center">

                  <span className="font-medium text-lg">
                    Total
                  </span>

                  <span className="text-2xl font-semibold text-[#4B2863]">
                    ${total.toLocaleString()}
                  </span>

                </div>

                <Link
                  to="/checkout"
                  className="block mt-6 w-full text-center rounded-lg bg-[#4B2863] py-3 text-white font-medium hover:bg-[#3c1f4f]"
                >
                  Continuar compra
                </Link>

                <p className="text-xs text-gray-400 text-center mt-3">
                  🔒 Confirmarás tu solicitud antes de pagar
                </p>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  )
}