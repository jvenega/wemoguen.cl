import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createOrder,
  getOrderById,
  uploadReceipt,
  getMyOrders
} from "@/services/orders.api"

import type {
  CreateOrderPayload,
  Order
} from "@/types/order.types"

/* ===============================
   QUERY KEYS
================================ */

export const orderKeys = {
  all: ["orders"] as const,
  myOrders: () => [...orderKeys.all, "my"] as const,
  detail: (id: string) => [...orderKeys.all, id] as const,
}

/* ===============================
   CREATE ORDER
================================ */

export function useCreateOrder() {

  const queryClient = useQueryClient()

  return useMutation<Order, Error, CreateOrderPayload>({
    mutationFn: createOrder,

    onSuccess: (order) => {

      // actualizar lista de órdenes
      queryClient.invalidateQueries({
        queryKey: orderKeys.myOrders(),
      })

      // guardar en cache la orden creada
      queryClient.setQueryData(
        orderKeys.detail(order.id),
        order
      )
    },
  })
}

/* ===============================
   GET ORDER BY ID
================================ */

export function useOrder(id?: string) {

  return useQuery<Order>({
    queryKey: id ? orderKeys.detail(id) : ["order", "empty"],

    queryFn: () => getOrderById(id!),

    enabled: !!id,

    staleTime: 1000 * 60 * 5, // 5 min cache
  })
}

/* ===============================
   UPLOAD RECEIPT
================================ */

export function useUploadReceipt() {

  const queryClient = useQueryClient()

  return useMutation<void, Error, { id: string; file: File }>({

    mutationFn: ({ id, file }) => uploadReceipt(id, file),

    onSuccess: (_, variables) => {

      // refrescar orden después de subir comprobante
      queryClient.invalidateQueries({
        queryKey: orderKeys.detail(variables.id),
      })

      // refrescar lista de órdenes
      queryClient.invalidateQueries({
        queryKey: orderKeys.myOrders(),
      })
    },
  })
}

/* ===============================
   GET MY ORDERS
================================ */

export function useMyOrders() {

  return useQuery<Order[]>({

    queryKey: orderKeys.myOrders(),

    queryFn: getMyOrders,

    staleTime: 1000 * 60 * 3, // 3 min

    refetchOnWindowFocus: false,
  })
}