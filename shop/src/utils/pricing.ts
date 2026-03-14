export const FREE_SHIPPING_THRESHOLD = 50000
export const SHIPPING_COST = 3990

export const getDiscountedPrice = (
  price: number,
  discount?: number
) => {
  if (!discount) return price
  return Math.round(price - price * (discount / 100))
}

export const getItemSubtotal = (
  price: number,
  quantity: number,
  discount?: number
) => {
  return getDiscountedPrice(price, discount) * quantity
}

export const getItemSavings = (
  price: number,
  quantity: number,
  discount?: number
) => {
  if (!discount) return 0

  const discountAmount = price - getDiscountedPrice(price, discount)

  return discountAmount * quantity
}