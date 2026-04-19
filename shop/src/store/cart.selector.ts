import { useMemo } from "react"
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

  return useMemo(() => {

    const totals = items.reduce(
      (acc, item) => {

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

        acc.subtotal += itemSubtotal
        acc.savings += itemSavings
        acc.originalSubtotal += item.price * item.quantity
        acc.itemsCount += item.quantity

        return acc

      },
      {
        subtotal: 0,
        savings: 0,
        originalSubtotal: 0,
        itemsCount: 0
      }
    )

    const shipping =
      totals.subtotal >= FREE_SHIPPING_THRESHOLD
        ? 0
        : SHIPPING_COST

    let total = totals.subtotal + shipping

    // aplicar cupón (escalable)
    if (coupon?.code === "WE10") {
      total *= 0.9
    }

    return {
      subtotal: Math.round(totals.subtotal),
      originalSubtotal: Math.round(totals.originalSubtotal),
      savings: Math.round(totals.savings),
      shipping,
      total: Math.round(total),
      itemsCount: totals.itemsCount
    }

  }, [items, coupon])
}