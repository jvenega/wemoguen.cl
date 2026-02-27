export type OrderStatus =
  | "PENDING_VALIDATION"
  | "AWAITING_TRANSFER"
  | "UNDER_REVIEW"
  | "APPROVED"
  | "REJECTED"

export type OrderItem = {
  productId: number
  name: string
  image?: string
  price: number
  quantity: number
}

export type Order = {
  id: string
  status: OrderStatus
  total: number
  createdAt: string
}

export type OrderDetail = Order & {
  items: OrderItem[]
  receiptUrl?: string
}

export type CreateOrderPayload = {
  patient: {
    fullName: string
    rut: number
    email: string
  }
  items: Array<{
    productId: number
    quantity: number
  }>
}