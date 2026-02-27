import { useState } from "react"
import ProductCard from "@/features/products/ProductCard"
import ProductFilters from "@/features/products/ProductFilters"

export default function Home() {
  const [category, setCategory] = useState<string>("all")
  const [sort, setSort] = useState<string>("default")
  const [search, setSearch] = useState<string>("")

  const mockProducts = [
    {
      id: 1,
      name: "Flor Medicinal Balanceada 10% THC / 10% CBD",
      price: 28000,
      image: "/products/flor-balanceada.jpg",
      category: "flores",
    },
    {
      id: 2,
      name: "Aceite CBD 30ml – Espectro Completo",
      price: 45000,
      image: "/products/aceite-cbd.jpg",
      category: "aceites",
    },
    {
      id: 3,
      name: "Extracto Terapéutico 1:1 THC/CBD",
      price: 52000,
      image: "/products/extracto.jpg",
      category: "extractos",
    },
    {
      id: 4,
      name: "Vaporizador Médico Portátil",
      price: 89000,
      image: "/products/vaporizador.jpg",
      category: "equipos",
    },
  ]

  let filtered = mockProducts.filter((p) => {
    const matchesCategory = category === "all" || p.category === category
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  if (sort === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price)
  }

  if (sort === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price)
  }

  return (
    <div className="bg-[#faf9fb] min-h-screen">

      <section className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <h1 className="text-3xl font-semibold text-[#4B2863]">
          Tienda Oficial
        </h1>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-12">

        {/* Sidebar */}
        <div className="hidden md:block">
          <ProductFilters
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
            search={search}
            setSearch={setSearch}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </section>
    </div>
  )
}