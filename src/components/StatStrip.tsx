import { ArrowDownRight, ArrowUpRight, Scale, Wallet } from 'lucide-react'
import { formatMoney } from '../lib/format'

interface StatStripProps {
  balance: number
  income: number
  expense: number
  savingsRate: number
}

export function StatStrip({ balance, income, expense, savingsRate }: StatStripProps) {
  const items = [
    {
      label: 'Balance total',
      value: formatMoney(balance),
      hint: 'Todas las cuentas',
      icon: Wallet,
      tone: 'neutral' as const,
    },
    {
      label: 'Ingresos del mes',
      value: formatMoney(income),
      hint: 'Octubre 2026',
      icon: ArrowUpRight,
      tone: 'income' as const,
    },
    {
      label: 'Gastos del mes',
      value: formatMoney(expense),
      hint: 'Octubre 2026',
      icon: ArrowDownRight,
      tone: 'expense' as const,
    },
    {
      label: 'Tasa de ahorro',
      value: `${Math.round(savingsRate)}%`,
      hint: 'Ingresos − gastos',
      icon: Scale,
      tone: 'neutral' as const,
    },
  ]

  return (
    <section className="stat-strip" aria-label="Indicadores">
      {items.map(({ label, value, hint, icon: Icon, tone }) => (
        <article key={label} className={`stat-item tone-${tone}`}>
          <div className="stat-head">
            <span className="stat-label">{label}</span>
            <Icon size={16} strokeWidth={1.75} className="stat-icon" />
          </div>
          <p className="stat-value">{value}</p>
          <p className="stat-hint">{hint}</p>
        </article>
      ))}
    </section>
  )
}
