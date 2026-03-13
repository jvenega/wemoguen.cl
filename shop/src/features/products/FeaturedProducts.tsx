import type { Product } from "@/types/product.types"
import ProductCard from "./ProductCard"
interface Props {
  products: Product[]
}

export default function FeaturedProducts({ products }: Props) {
  const featured = products.filter(p => p.discountPercentage)

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <h2 className="text-2xl font-semibold text-[#4B2863] mb-10">
        Ofertas destacadas
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </section>
  )
}