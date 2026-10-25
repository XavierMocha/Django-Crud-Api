import { formatMoney, formatPercent } from '../lib/format'

export interface BudgetRow {
  id: string
  label: string
  spent: number
  limit: number
  color: string
}

interface BudgetProgressProps {
  items: BudgetRow[]
}

export function BudgetProgress({ items }: BudgetProgressProps) {
  return (
    <section className="panel">
      <header className="panel-header">
        <div>
          <h2>Presupuestos</h2>
          <p>Avance respecto al límite mensual</p>
        </div>
      </header>

      <ul className="budget-list">
        {items.map((item) => {
          const ratio = item.limit > 0 ? item.spent / item.limit : 0
          const pct = Math.min(ratio * 100, 100)
          const over = ratio > 1
          return (
            <li key={item.id} className={over ? 'is-over' : undefined}>
              <div className="budget-row">
                <span className="budget-label">{item.label}</span>
                <span className="budget-meta">
                  {formatMoney(item.spent)} / {formatMoney(item.limit)}
                </span>
              </div>
              <div className="budget-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                <div
                  className="budget-fill"
                  style={{
                    width: `${pct}%`,
                    background: over ? 'var(--expense)' : item.color,
                  }}
                />
              </div>
              <p className="budget-pct">
                {over ? `Excedido ${formatPercent((ratio - 1) * 100)}` : `${formatPercent(pct)} usado`}
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
