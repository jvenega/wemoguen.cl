import { Card, CardContent } from "@/components/ui/card"
import { useCartStore } from "@/store/cart.store"

interface Product {
  id: number
  name: string
  price: number
  image: string
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <Card className="group rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">

        <div className="overflow-hidden rounded-xl mb-5">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <h2 className="text-sm font-medium tracking-wide mb-2 text-gray-800">
          {product.name}
        </h2>

        <p className="text-base font-semibold text-[#4B2863] mb-5">
          ${product.price.toLocaleString()}
        </p>

        <button
          onClick={() => addItem(product)}
          className="w-full rounded-lg bg-[#4B2863] py-2 text-sm text-white transition hover:bg-[#3c1f4f]"
        >
          Solicitar producto
        </button>

      </CardContent>
    </Card>
  )
}