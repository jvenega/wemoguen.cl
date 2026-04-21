const PENDING_CART_CLEAR_KEY = "wemoguen_pending_cart_clear_order"

export function markPendingCartClear(orderId: string) {
  sessionStorage.setItem(PENDING_CART_CLEAR_KEY, orderId)
}

export function consumePendingCartClear(orderId: string) {
  const pendingOrderId = sessionStorage.getItem(PENDING_CART_CLEAR_KEY)

  if (pendingOrderId !== orderId) {
    return false
  }

  sessionStorage.removeItem(PENDING_CART_CLEAR_KEY)
  return true
}
