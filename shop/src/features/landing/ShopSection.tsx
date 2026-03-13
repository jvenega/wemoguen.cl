import { useMemo, useState } from "react"
import { SlidersHorizontal } from "lucide-react"

import products from "@/mock/products.json"

import ProductCard from "@/features/products/ProductCard"
import ProductFilters from "@/features/products/ProductFilters"

import { Button } from "@/components/ui/button"

interface Props {
  category: string
  setCategory: (v: string) => void
}

export default function ShopSection({ category, setCategory }: Props) {

  const [sort, setSort] = useState("default")
  const [search, setSearch] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {

    let filtered = products.filter((p) => {

      const matchesCategory =
        category === "all" || p.category === category

      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase())

      return matchesCategory && matchesSearch

    })

    if (sort === "price-asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    }

    if (sort === "price-desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price)
    }

    return filtered

  }, [category, search, sort])

  return (
    <section id="shop" className="max-w-7xl mx-auto px-6 pt-12 pb-20">

      <div className="flex items-center justify-between flex-wrap gap-4 mb-10">

        <div>
          <h2 className="text-2xl font-semibold text-[#4B2863]">
            Tienda
          </h2>

          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} productos disponibles
          </p>
        </div>

        <Button
          variant="outline"
          className="md:hidden flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </Button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 items-start">

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

        {showFilters && (
          <div className="md:hidden mb-6">
            <ProductFilters
              category={category}
              setCategory={setCategory}
              sort={sort}
              setSort={setSort}
              search={search}
              setSearch={setSearch}
            />
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">

          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}

        </div>

      </div>

    </section>
  )
}