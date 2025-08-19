export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    minimumFractionDigits: 2,
  }).format(amount)
}

export const formatPrice = (price: number): string => {
  return `ETB ${price.toFixed(2)}`
}

export const CURRENCY_SYMBOL = "ETB"
export const CURRENCY_CODE = "ETB"
