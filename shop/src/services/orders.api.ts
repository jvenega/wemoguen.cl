import { api } from "@/lib/api"
import { env } from "@/config/env"
import type { CreateOrderPayload, Order, OrderDetail } from "@/types/order.types"

// --- simple storage (mock) ---
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

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  if (env.MOCK_API) {
    await new Promise((r) => setTimeout(r, 600))

    // Mock de catálogo mínimo para resolver items (simula JOIN/SP)
    const catalog: Record<number, { name: string; price: number; image?: string }> = {
      1: { name: "Flor Medicinal Balanceada 10% THC / 10% CBD", price: 28000, image: "/placeholder.png" },
      2: { name: "Aceite CBD 30ml – Espectro Completo", price: 45000, image: "/placeholder.png" },
      3: { name: "Extracto Terapéutico 1:1 THC/CBD", price: 52000, image: "/placeholder.png" },
      4: { name: "Vaporizador Médico Portátil", price: 89000, image: "/placeholder.png" },
    }

    const id = makeId()

    const items = payload.items.map((it) => {
      const p = catalog[it.productId]
      return {
        productId: it.productId,
        name: p?.name ?? `Producto ${it.productId}`,
        price: p?.price ?? 10000,
        image: p?.image,
        quantity: it.quantity,
      }
    })

    const total = items.reduce((acc, it) => acc + it.price * it.quantity, 0)

    const orderDetail: OrderDetail = {
      id,
      status: "AWAITING_TRANSFER",
      total,
      createdAt: new Date().toISOString(),
      items,
    }

    const db = loadOrders()
    db[id] = orderDetail
    saveOrders(db)

    // createOrder retorna Order (sin items), igual que en backend típico
    const order: Order = {
      id: orderDetail.id,
      status: orderDetail.status,
      total: orderDetail.total,
      createdAt: orderDetail.createdAt,
    }

    return order
  }

  const { data } = await api.post("/orders", payload)
  return data
}

export async function getOrderById(id: string): Promise<OrderDetail> {
  if (env.MOCK_API) {
    await new Promise((r) => setTimeout(r, 400))
    const db = loadOrders()
    const found = db[id]
    if (!found) {
      throw {
        response: { data: { message: "Orden no encontrada (mock)." } },
      }
    }
    return found
  }

  const { data } = await api.get(`/orders/${id}`)
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

    // Cambiar estado mock
    order.status = "UNDER_REVIEW"

    order.receiptUrl = URL.createObjectURL(file)

    db[id] = order
    saveOrders(db)

    return
  }

  const formData = new FormData()
  formData.append("receipt", file)

  await api.post(`/orders/${id}/receipt`, formData, {
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
        total: order.total,
        createdAt: order.createdAt,
      }))
  }

  const { data } = await api.get("/orders/me")
  return data
}