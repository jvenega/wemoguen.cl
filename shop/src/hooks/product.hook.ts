import { useQuery } from "@tanstack/react-query"
import { listProducts } from "@/services/product.api"

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: listProducts,
  })
}