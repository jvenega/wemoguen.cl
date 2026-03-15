import products from "@/mock/products.json"
import ProductCard from "@/features/products/ProductCard"
import { Link } from "react-router-dom"

export default function FeaturedProducts() {

  const featured = products
    .filter(p => (p.discountPercentage ?? 0) > 0)
    .slice(0, 8)

  if (featured.length === 0) return null

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10">
          <h2 className="text-3xl font-semibold text-primary">
            Ofertas destacadas
          </h2>

          <p className="mt-2 text-muted-foreground">
            Productos con descuentos exclusivos.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/productos"
            className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-white"
          >
            Ver todos los productos
          </Link>
        </div>

      </div>
    </section>
  )
}