import { api } from "@/lib/api"
import { env } from "@/config/env"
import type {
  CreateOrderPayload,
  Order,
  OrderDetail
} from "@/types/order.types"

const LS_KEY = "wemoguen_mock_orders"

/* =========================
   STORAGE
========================= */

function loadOrders(): Record<string, OrderDetail> {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveOrders(db: Record<string, OrderDetail>) {
  localStorage.setItem(LS_KEY, JSON.stringify(db))
}

function makeId() {
  return `ORD-${Math.floor(100000 + Math.random() * 900000)}`
}

/* =========================
   CREATE ORDER
========================= */

export async function createOrder(
  payload: CreateOrderPayload
): Promise<Order> {

  if (env.MOCK_API) {

    await new Promise((r) => setTimeout(r, 600))

    const id = makeId()

    const items = payload.items.map((it) => ({
      productId: it.productId,
      name: it.name ?? `Producto ${it.productId}`,
      image: it.image,
      quantity: it.quantity,

      price: it.price,
      basePrice: it.basePrice,

      discountPercentage: it.discountPercentage,

      priceAtPurchase: it.price
    }))

    const subtotal = items.reduce(
      (acc, it) => acc + it.price * it.quantity,
      0
    )

    let discount = 0

    if (payload.coupon === "WE10") {
      discount = subtotal * 0.1
    }

    const shipping = subtotal >= 50000 ? 0 : 3500
    const total = Math.max(subtotal - discount + shipping, 0)

    const orderDetail: OrderDetail = {
      id,
      status: "PENDING_PAYMENT",
      subtotal,
      shipping,
      discount,
      total,
      createdAt: new Date().toISOString(),
      patient: payload.patient,
      delivery: payload.delivery,
      items,
    }

    const db = loadOrders()
    db[id] = orderDetail
    saveOrders(db)

    return {
      ...orderDetail
    }
  }

  const { data } = await api.post("/pedidos", payload)
  return data
}

/* =========================
   GET ORDER BY ID
========================= */

export async function getOrderById(
  id: string
): Promise<OrderDetail> {

  if (env.MOCK_API) {

    await new Promise((r) => setTimeout(r, 300))

    const db = loadOrders()
    const order = db[id]

    if (!order) {
      throw {
        response: { data: { message: "Orden no encontrada." } },
      }
    }

    // ✔ devolver copia (evita mutaciones externas)
    return JSON.parse(JSON.stringify(order))
  }

  const { data } = await api.get(`/pedidos/${id}`)
  return data
}

/* =========================
   UPLOAD RECEIPT
========================= */

export async function uploadReceipt(
  id: string,
  file: File
): Promise<void> {

  if (env.MOCK_API) {

    await new Promise((r) => setTimeout(r, 800))

    const db = loadOrders()
    const order = db[id]

    if (!order) {
      throw {
        response: { data: { message: "Orden no encontrada." } },
      }
    }

    // ✔ CLONAR (no mutar directo)
    const updated: OrderDetail = {
      ...order,
      status: "WAITING_APPROVAL",
      receiptUrl: URL.createObjectURL(file)
    }

    db[id] = updated
    saveOrders(db)

    return
  }

  const formData = new FormData()
  formData.append("receipt", file)

  await api.post(`/pedidos/${id}/receipt`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
}

/* =========================
   GET MY ORDERS
========================= */

export async function getMyOrders(): Promise<Order[]> {

  if (env.MOCK_API) {

    await new Promise((r) => setTimeout(r, 300))

    const db = loadOrders()

    return Object.values(db)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .map((order) => ({
        id: order.id,
        status: order.status,
        subtotal: order.subtotal,
        shipping: order.shipping,
        discount: order.discount,
        total: order.total,
        createdAt: order.createdAt,
        items: order.items,
        receiptUrl: order.receiptUrl
      }))
  }

  const { data } = await api.get("/pedidos/me")
  return data
}