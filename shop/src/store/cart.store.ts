import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COST,
  getItemSubtotal,
  getItemSavings
} from "@/utils/pricing"

export type Product = {
  id: number
  name: string
  price: number
  image: string
  category?: string
  discountPercentage?: number
}

export type CartItem = Product & {
  quantity: number
}

type CartTotals = {
  subtotal: number
  originalSubtotal: number
  savings: number
  shipping: number
  total: number
  itemsCount: number
}

type CartState = {
  items: CartItem[]
  coupon?: string

  addItem: (product: Product) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  applyCoupon: (code: string) => void

  getCartTotals: () => CartTotals
}

const coupons: Record<string, number> = {
  WE10: 0.1
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({

      items: [],
      coupon: undefined,

      /* ---------------- CART ACTIONS ---------------- */

      addItem: (product) => {

        const items = get().items
        const existing = items.find(i => i.id === product.id)

        if (existing) {
          set({
            items: items.map(i =>
              i.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          })
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }]
          })
        }

      },

      updateQuantity: (id, quantity) => {

        const items = get().items

        if (quantity <= 0) {
          set({
            items: items.filter(i => i.id !== id)
          })
          return
        }

        set({
          items: items.map(i =>
            i.id === id ? { ...i, quantity } : i
          )
        })

      },

      removeItem: (id) => {
        set({
          items: get().items.filter(i => i.id !== id)
        })
      },

      clearCart: () => {
        set({
          items: [],
          coupon: undefined
        })
      },

      /* ---------------- COUPONS ---------------- */

      applyCoupon: (code) => {

        const normalized = code.trim().toUpperCase()

        if (coupons[normalized]) {
          set({ coupon: normalized })
        }

      },

      /* ---------------- TOTALS ---------------- */

      getCartTotals: () => {

        const { items, coupon } = get()

        let subtotal = 0
        let savings = 0
        let originalSubtotal = 0
        let itemsCount = 0

        for (const item of items) {

          const itemSubtotal = getItemSubtotal(
            item.price,
            item.quantity,
            item.discountPercentage
          )

          const itemSavings = getItemSavings(
            item.price,
            item.quantity,
            item.discountPercentage
          )

          subtotal += itemSubtotal
          savings += itemSavings
          originalSubtotal += item.price * item.quantity
          itemsCount += item.quantity

        }

        const shipping =
          subtotal >= FREE_SHIPPING_THRESHOLD
            ? 0
            : SHIPPING_COST

        let total = subtotal + shipping

        if (coupon && coupons[coupon]) {
          total = total * (1 - coupons[coupon])
        }

        return {
          subtotal: Math.round(subtotal),
          originalSubtotal: Math.round(originalSubtotal),
          savings: Math.round(savings),
          shipping,
          total: Math.round(total),
          itemsCount
        }

      }

    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
)