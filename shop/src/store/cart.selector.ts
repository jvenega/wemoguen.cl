import { useCartStore } from "./cart.store"
import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COST,
  getItemSubtotal,
  getItemSavings
} from "@/utils/pricing"

export function useCartTotals() {

  const items = useCartStore(s => s.items)
  const coupon = useCartStore(s => s.coupon)

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

  if (coupon === "WE10") {
    total = total * 0.9
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