import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import productsData from "../mock/products.json"

export type Product = {
  id: number
  name: string
  price: number
  image: string
  category: string
  discountPercentage?: number
}

type ProductStore = {
  products: Product[]
  addProduct: (p: Product) => void
  updateProduct: (p: Product) => void
  deleteProduct: (id: number) => void
}

/* =========================
   STORE
========================= */

export const useProductsStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: productsData,

      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),

      updateProduct: (product) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === product.id ? product : p
          ),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
    }),
    {
      name: "products-storage",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        products: state.products,
      }),

      /* =========================
         MIGRACIÓN INICIAL
      ========================= */
      onRehydrateStorage: () => (state) => {
        if (!state?.products?.length) {
          useProductsStore.setState({
            products: productsData,
          })
        }
      },
    }
  )
)