const currency = new Intl.NumberFormat('es-EC', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

const shortDate = new Intl.DateTimeFormat('es-EC', {
  day: 'numeric',
  month: 'short',
})

export function formatMoney(amount: number): string {
  return currency.format(amount)
}

export function formatDate(iso: string): string {
  return shortDate.format(new Date(iso + 'T12:00:00'))
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`
}
