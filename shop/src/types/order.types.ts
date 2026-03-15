import type { Delivery } from "@/types/delivery.types"

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "WAITING_APPROVAL"
  | "PROCESSING"
  | "APPROVED"
  | "REJECTED"

export type Patient = {
  fullName: string
  rut: string
  email: string
}

export type OrderItem = {
  productId: number
  name: string
  image?: string
  priceAtPurchase: number
  quantity: number
}

export type Order = {
  id: string
  status: OrderStatus
  subtotal: number
  shipping: number
  discount: number
  total: number
  createdAt: string
}

export type OrderDetail = Order & {
  patient: Patient
  delivery: Delivery
  items: OrderItem[]
  receiptUrl?: string
}

export type CreateOrderPayload = {
  patient: Patient
  delivery: Delivery
  items: {
    productId: number
    quantity: number
  }[]
}