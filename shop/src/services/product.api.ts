import { api } from "@/lib/api"
import { env } from "@/config/env"
import type { Product } from "@/types/product.types"

const mockProducts: Product[] = [
  { id: 1, name: "Flor Medicinal Balanceada 10% THC / 10% CBD", price: 28000, image: "/products/flor-balanceada.jpg", category: "flores" },
  { id: 2, name: "Aceite CBD 30ml – Espectro Completo", price: 45000, image: "/products/aceite-cbd.jpg", category: "aceites" },
  { id: 3, name: "Extracto Terapéutico 1:1 THC/CBD", price: 52000, image: "/products/extracto.jpg", category: "extractos" },
  { id: 4, name: "Vaporizador Médico Portátil", price: 89000, image: "/products/vaporizador.jpg", category: "equipos" },
]

export async function listProducts(): Promise<Product[]> {
  if (env.MOCK_API) return mockProducts
  const { data } = await api.get("/products")
  return data
}