import { useCartStore } from "@/store/cart.store"
import { Link } from "react-router-dom"
import ProcessHeader from "@/components/checkout/ProcessHeader"
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import { useState, useMemo } from "react"

const FREE_SHIPPING_THRESHOLD = 50000
const SHIPPING_COST = 3500

export default function Cart() {

  const items = useCartStore(s => s.items)
  const removeItem = useCartStore(s => s.removeItem)
  const updateQuantity = useCartStore(s => s.updateQuantity)

  const [] = useState("")

  useMemo(() => {

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

    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_COST

    const total = subtotal + shipping

    return {
      subtotal,
      originalSubtotal,
      savings,
      shipping,
      total
    }

  }, [items])


  

  return (
    <div className="bg-[#f6f4f9] min-h-screen">

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">

        <ProcessHeader currentStep={1} />

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

                    <div className="flex items-center gap-3 mt-4">

                      <button
                        aria-label="Disminuir cantidad"
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
                        aria-label="Aumentar cantidad"
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

        </div>

      </div>

    </div>
  )
}