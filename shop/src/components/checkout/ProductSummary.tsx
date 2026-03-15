import type { CartItem } from "@/store/cart.store"

interface Props {
  items: CartItem[]
}

export default function ProductSummary({ items }: Props) {

  return (
    <div className="bg-white border rounded-2xl p-8 shadow-sm">

      <h3 className="text-lg font-medium mb-6 text-[#4B2863]">
        Productos seleccionados
      </h3>

      <div className="space-y-4 text-sm">

        {items.map((item) => {

          const price = item.discountPercentage
            ? item.price - item.price * (item.discountPercentage / 100)
            : item.price

          return (
            <div
              key={item.id}
              className="flex justify-between"
            >

              <span>
                {item.name} x{item.quantity}
              </span>

              <span>
                ${(price * item.quantity).toLocaleString()}
              </span>

            </div>
          )
        })}

      </div>

    </div>
  )
}