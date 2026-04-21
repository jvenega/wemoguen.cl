import { useMemo, useState } from "react"
import { SlidersHorizontal, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import products from "@/mock/products.json"

import ProductCard from "@/features/products/ProductCard"
import ProductFilters from "@/features/products/ProductFilters"

import { Button } from "@/components/ui/button"

interface Props {
  category: string
  setCategory: (v: string) => void
}

const PAGE_SIZE = 6

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 }
  }
}

export default function ShopSection({ category, setCategory }: Props) {

  const [sort, setSort] = useState("default")
  const [search, setSearch] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [visible, setVisible] = useState(PAGE_SIZE)

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

  const visibleProducts = filteredProducts.slice(0, visible)
  const hasMore = visible < filteredProducts.length

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    setVisible(PAGE_SIZE)
  }

  const handleSortChange = (value: string) => {
    setSort(value)
    setVisible(PAGE_SIZE)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setVisible(PAGE_SIZE)
  }

  return (
    <section id="shop" className="max-w-7xl mx-auto px-6 pt-12 pb-20">

      <div className="flex items-center justify-between flex-wrap gap-4 mb-10">

        <div className="flex flex-col sticky" >
          <h2 className="text-2xl font-semibold text-[#4B2863] mb-1 ">
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

        <div className="hidden md:block sticky top-24 self-start">
          <ProductFilters
            category={category}
            setCategory={handleCategoryChange}
            sort={sort}
            setSort={handleSortChange}
            search={search}
            setSearch={handleSearchChange}
          />
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mb-6"
            >
              <ProductFilters
                category={category}
                setCategory={handleCategoryChange}
                sort={sort}
                setSort={handleSortChange}
                search={search}
                setSearch={handleSearchChange}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          {filteredProducts.length === 0 && (
            <div className="rounded-[2rem] border border-dashed border-[#d9cade] bg-white/80 p-10 text-center shadow-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-[#8e7b99]">
                Sin Resultados
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-[#4B2863]">
                No encontramos productos para ese filtro.
              </h3>
              <p className="mt-2 text-sm text-[#75697d]">
                Prueba otra categoria o limpia la busqueda para volver a ver el catalogo completo.
              </p>
              <Button
                variant="outline"
                className="mt-5"
                onClick={() => {
                  handleCategoryChange("all")
                  handleSearchChange("")
                  handleSortChange("default")
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8"
          >

            {visibleProducts.map(product => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                layout
              >
                <ProductCard product={product} />
              </motion.div>
            ))}

          </motion.div>

          {hasMore && (
            <div className="flex justify-center mt-10">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setVisible(v => v + PAGE_SIZE)}
              >
                Cargar más productos
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          )}

        </div>

      </div>

    </section>
  )
}
