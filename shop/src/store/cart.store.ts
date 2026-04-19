import type { Delivery } from "@/types/delivery.types"
import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

/* =========================
   TYPES
========================= */

export type Product = {
  id: number
  name: string
  price: number
  image: string
  category?: string
  discountPercentage?: number
}

export type CartItem = {
  productId: number
  name: string
  image: string

  price: number
  basePrice: number

  discountPercentage?: number
  quantity: number
}

type Coupon = {
  code: string
  type: "percentage" | "fixed"
  value: number
}

type CartTotals = {
  subtotal: number
  discount: number
  shipping: number
  total: number
}

/* =========================
   CONFIG
========================= */

const FREE_SHIPPING_THRESHOLD = 50000
const SHIPPING_COST = 3500

const coupons: Record<string, Coupon> = {
  WE10: {
    code: "WE10",
    type: "percentage",
    value: 0.1
  }
}

/* =========================
   STATE
========================= */

type CartState = {
  items: CartItem[]
  coupon?: Coupon

  // ✅ CORRECTO: delivery global
  delivery: Delivery | null
  setDelivery: (delivery: Delivery) => void

  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  applyCoupon: (code: string) => void

  getTotals: () => CartTotals
  getPayload: () => {
    items: {
      productId: number
      quantity: number
      price: number
      basePrice: number
      discountPercentage?: number
    }[]
    coupon?: string
  }
}

/* =========================
   STORE
========================= */

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({

      items: [],
      coupon: undefined,

      // ✅ NUEVO
      delivery: null,

      setDelivery: (delivery) => set({ delivery }),

      addItem: (product) => {
        set((state) => {

          const existing = state.items.find(
            i => i.productId === product.id
          )

          const finalPrice = product.discountPercentage
            ? product.price - product.price * (product.discountPercentage / 100)
            : product.price

          if (existing) {
            return {
              items: state.items.map(i =>
                i.productId === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              )
            }
          }

          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                name: product.name,
                image: product.image,
                price: finalPrice,
                basePrice: product.price,
                discountPercentage: product.discountPercentage,
                quantity: 1
              }
            ]
          }
        })
      },

      updateQuantity: (productId, quantity) => {
        set((state) => {

          if (quantity <= 0) {
            return {
              items: state.items.filter(i => i.productId !== productId)
            }
          }

          return {
            items: state.items.map(i =>
              i.productId === productId ? { ...i, quantity } : i
            )
          }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(i => i.productId !== productId)
        }))
      },

      clearCart: () => {
        set({
          items: [],
          coupon: undefined,
          delivery: null // ✅ importante
        })
      },

      applyCoupon: (code) => {
        const normalized = code.trim().toUpperCase()
        if (!normalized) return

        const found = coupons[normalized]

        set({
          coupon: found ? found : undefined
        })
      },

      getTotals: () => {

        const { items, coupon } = get()

        const subtotal = items.reduce(
          (acc, i) => acc + i.price * i.quantity,
          0
        )

        let discount = 0

        if (coupon) {
          discount = coupon.type === "percentage"
            ? subtotal * coupon.value
            : coupon.value
        }

        const shipping =
          subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST

        const total = Math.max(subtotal - discount + shipping, 0)

        return {
          subtotal,
          discount,
          shipping,
          total
        }
      },

      getPayload: () => {
        const { items, coupon } = get()

        return {
          items: items.map(i => ({
            productId: i.productId,
            quantity: i.quantity,
            price: i.price,
            basePrice: i.basePrice,
            discountPercentage: i.discountPercentage
          })),
          coupon: coupon?.code
        }
      }

    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        items: state.items,
        coupon: state.coupon,
        delivery: state.delivery // ✅ persistimos delivery
      })
    }
  )
)