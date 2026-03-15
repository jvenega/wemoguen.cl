import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"



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

type CartState = {
  items: CartItem[]
  coupon?: string

  addItem: (product: Product) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  applyCoupon: (code: string) => void
}

const coupons: Record<string, number> = {
  WE10: 0.1
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({

      items: [],
      coupon: undefined,

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

      applyCoupon: (code) => {

        const normalized = code.trim().toUpperCase()

        if (coupons[normalized]) {
          set({ coupon: normalized })
        }

      }

    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
)