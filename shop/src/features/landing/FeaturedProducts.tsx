import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"

import products from "@/mock/products.json"
import ProductCard from "@/features/products/ProductCard"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const PAGE_SIZE = 4

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
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

export default function FeaturedProducts() {

  const [page, setPage] = useState(1)

  const featured = useMemo(
    () => products.filter(p => (p.discountPercentage ?? 0) > 0),
    []
  )

  const totalPages = Math.ceil(featured.length / PAGE_SIZE)

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return featured.slice(start, start + PAGE_SIZE)
  }, [page, featured])

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

        <AnimatePresence mode="wait">

          <motion.div
            key={page}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: 10 }}
            className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"
          >

            {paginatedProducts.map(product => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                layout
              >
                <ProductCard product={product} />
              </motion.div>
            ))}

          </motion.div>

        </AnimatePresence>

        <div className="mt-10 flex justify-center">

          <Pagination>
            <PaginationContent>

              <PaginationItem>
                <PaginationPrevious
                  onClick={() => page > 1 && setPage(page - 1)}
                  aria-disabled={page === 1}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNumber = i + 1

                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      isActive={page === pageNumber}
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => page < totalPages && setPage(page + 1)}
                  aria-disabled={page === totalPages}
                  className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

            </PaginationContent>
          </Pagination>

        </div>

      </div>
    </section>
  )
}