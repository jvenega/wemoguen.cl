import { useMutation, useQuery } from "@tanstack/react-query"
import { createOrder, getOrderById,uploadReceipt,getMyOrders } from "@/services/orders.api"
import type { CreateOrderPayload, Order  } from "@/types/order.types"

export function useCreateOrder() {
  return useMutation<Order, unknown, CreateOrderPayload>({
    mutationFn: (payload) => createOrder(payload),
  })
}

export function useOrder(id?: string) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id!),
    enabled: !!id,
  })
}

export function useUploadReceipt() {
  return useMutation<void, unknown, { id: string; file: File }>({
    mutationFn: ({ id, file }) => uploadReceipt(id, file),
  })
}

export function useMyOrders() {
  return useQuery<Order[]>({
    queryKey: ["my-orders"],
    queryFn: getMyOrders,
  })
}