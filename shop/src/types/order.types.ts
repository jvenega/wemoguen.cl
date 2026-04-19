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

  quantity: number

  price: number            // precio FINAL (pagado)
  basePrice: number        // precio original

  discountPercentage?: number

  priceAtPurchase: number  // redundante pero útil para backend real
}

export type Order = {
  id: string
  status: OrderStatus

  subtotal: number
  shipping: number
  discount: number
  total: number

  createdAt: string

  items: OrderItem[]

  receiptUrl?: string
}

export type OrderDetail = Order & {
  patient: Patient
  delivery: Delivery
}

export type CreateOrderPayload = {
  patient: Patient
  delivery: Delivery

  items: {
    productId: number

    name: string
    image?: string

    quantity: number

    price: number
    basePrice: number

    discountPercentage?: number
  }[]

  coupon?: string
}