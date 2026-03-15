import { api } from "@/lib/api"
import { env } from "@/config/env"
import type {
  CreateOrderPayload,
  Order,
  OrderDetail
} from "@/types/order.types"

const LS_KEY = "wemoguen_mock_orders"

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

export async function createOrder(
  payload: CreateOrderPayload
): Promise<Order> {

  if (env.MOCK_API) {

    await new Promise((r) => setTimeout(r, 600))

    const catalog: Record<
      number,
      { name: string; price: number; image?: string }
    > = {
      1: { name: "Flor Medicinal Balanceada", price: 28000 },
      2: { name: "Aceite CBD 30ml", price: 45000 },
      3: { name: "Extracto THC/CBD", price: 52000 },
      4: { name: "Vaporizador Médico", price: 89000 },
    }

    const id = makeId()

    const items = payload.items.map((it) => {

      const p = catalog[it.productId]

      return {
        productId: it.productId,
        name: p?.name ?? `Producto ${it.productId}`,
        image: p?.image,
        quantity: it.quantity,
        price: p?.price ?? 10000,
        priceAtPurchase: p?.price ?? 10000,
      }
    })

    const subtotal = items.reduce(
      (acc, it) => acc + it.price * it.quantity,
      0
    )

    const shipping = 0
    const discount = 0
    const total = subtotal + shipping - discount

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

    const order: Order = {
      id: orderDetail.id,
      status: orderDetail.status,
      subtotal,
      shipping,
      discount,
      total,
      createdAt: orderDetail.createdAt,
      items,
    }

    return order
  }

  const { data } = await api.post("/pedidos", payload)

  return data
}

export async function getOrderById(
  id: string
): Promise<OrderDetail> {

  if (env.MOCK_API) {

    await new Promise((r) => setTimeout(r, 400))

    const db = loadOrders()

    const found = db[id]

    if (!found) {
      throw {
        response: { data: { message: "Orden no encontrada." } },
      }
    }

    return found
  }

  const { data } = await api.get(`/pedidos/${id}`)

  return data
}

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

    order.status = "WAITING_APPROVAL"

    order.receiptUrl = URL.createObjectURL(file)

    db[id] = order

    saveOrders(db)

    return
  }

  const formData = new FormData()

  formData.append("receipt", file)

  await api.post(`/pedidos/${id}/receipt`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
}

export async function getMyOrders(): Promise<Order[]> {

  if (env.MOCK_API) {

    await new Promise((r) => setTimeout(r, 400))

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
      }))
  }

  const { data } = await api.get("/pedidos/me")

  return data
}