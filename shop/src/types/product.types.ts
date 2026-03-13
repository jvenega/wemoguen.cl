export type Product = {
  id: number
  name: string
  price: number
  image: string
  category: "flores" | "aceites" | "extractos" | "equipos"
  discountPercentage?: number
}