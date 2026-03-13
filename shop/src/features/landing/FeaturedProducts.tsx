import products from "@/mock/products.json"
import ProductCard from "@/features/products/ProductCard"

export default function FeaturedProducts() {

  const featured = products.filter(p => p.discountPercentage)

  if (featured.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-6 pb-20 py-16">

      <h2 className="text-4xl font-semibold text-[#4B2863] mb-10">
        Ofertas destacadas
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {featured.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>

    </section>
  )
}