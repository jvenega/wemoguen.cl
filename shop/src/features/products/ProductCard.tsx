import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

import { useCartStore } from "@/store/cart.store"
import type { Product } from "@/store/cart.store"

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {

  const addItem = useCartStore(s => s.addItem)

  const discount = product.discountPercentage ?? 0
  const hasDiscount = discount > 0

  const finalPrice = hasDiscount
    ? Math.round(product.price * (1 - discount / 100))
    : product.price

  return (
    <Card className="group overflow-hidden rounded-xl border bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

      <CardContent className="p-3 md:p-4">

        {/* IMAGE */}

        <div className="relative overflow-hidden rounded-lg bg-gray-100">

          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />

          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-[11px] px-2 py-0.5 rounded-full shadow">
              -{discount}%
            </div>
          )}

        </div>

        {/* CONTENT */}

        <div className="mt-3">

          <h2 className="text-xs md:text-sm font-medium text-gray-800 line-clamp-2 min-h-8">
            {product.name}
          </h2>

          <div className="mt-1 flex items-end gap-2">

            {hasDiscount && (
              <span className="text-[11px] text-gray-400 line-through">
                ${product.price.toLocaleString()}
              </span>
            )}

            <span className="text-sm md:text-base font-semibold text-[#4B2863]">
              ${finalPrice.toLocaleString()}
            </span>

          </div>

          <Button
            onClick={() => addItem(product)}
            aria-label={`Agregar ${product.name} al carrito`}
            size="sm"
            className="cursor-pointer text-amber-50 w-full mt-3 text-xs md:text-sm flex items-center justify-center gap-2 bg-[#4B2863] hover:bg-[#3c1f4f] transition"
          >
            <ShoppingCart className="h-4 w-4" />
            Solicitar
          </Button>

        </div>

      </CardContent>

    </Card>
  )
}