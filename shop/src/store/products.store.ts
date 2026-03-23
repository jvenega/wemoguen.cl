import { create } from "zustand"
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
   CARGA INICIAL
========================= */

const loadProducts = (): Product[] => {
  const saved = localStorage.getItem("products")

  if (saved) {
    return JSON.parse(saved)
  }

  localStorage.setItem("products", JSON.stringify(productsData))
  return productsData
}

export const useProductsStore = create<ProductStore>((set) => ({
  products: loadProducts(),

  addProduct: (product) =>
    set((state) => {
      const updated = [...state.products, product]
      localStorage.setItem("products", JSON.stringify(updated))
      return { products: updated }
    }),

  updateProduct: (product) =>
    set((state) => {
      const updated = state.products.map((p) =>
        p.id === product.id ? product : p
      )
      localStorage.setItem("products", JSON.stringify(updated))
      return { products: updated }
    }),

  deleteProduct: (id) =>
    set((state) => {
      const updated = state.products.filter((p) => p.id !== id)
      localStorage.setItem("products", JSON.stringify(updated))
      return { products: updated }
    }),
}))