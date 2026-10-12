export function formatPrice(price: number | null, currency: string) {
  if (price === null) return 'Precio a consultar'
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price)
}

/** Compact form for tight spaces, e.g. 4500000000 → "$4.500 M" (millions of pesos). */
export function formatPriceShort(price: number | null) {
  if (price === null) return 'A consultar'
  return `$${new Intl.NumberFormat('es-CO').format(Math.round(price / 1_000_000))} M`
}

export const formatNumber = (value: number) => new Intl.NumberFormat('es-CO').format(value)
