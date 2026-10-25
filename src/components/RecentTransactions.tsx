import type { Category, Transaction } from '../types/finance'
import { formatDate, formatMoney } from '../lib/format'

interface RecentTransactionsProps {
  items: Transaction[]
  categories: Category[]
  onAdd: () => void
}

export function RecentTransactions({ items, categories, onAdd }: RecentTransactionsProps) {
  const byId = Object.fromEntries(categories.map((c) => [c.id, c]))

  return (
    <section className="panel transactions-panel">
      <header className="panel-header">
        <div>
          <h2>Movimientos recientes</h2>
          <p>Últimas operaciones registradas</p>
        </div>
        <button type="button" className="btn-primary" onClick={onAdd}>
          Nuevo movimiento
        </button>
      </header>

      <div className="table-scroll">
        <table className="tx-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Cuenta</th>
              <th className="align-right">Monto</th>
            </tr>
          </thead>
          <tbody>
            {items.map((tx) => {
              const cat = byId[tx.category]
              return (
                <tr key={tx.id}>
                  <td className="muted">{formatDate(tx.date)}</td>
                  <td>
                    <span className="tx-desc">{tx.description}</span>
                  </td>
                  <td>
                    <span className="cat-chip">
                      <i style={{ background: cat?.color ?? '#6B726E' }} />
                      {cat?.label ?? tx.category}
                    </span>
                  </td>
                  <td className="muted">{tx.account}</td>
                  <td className={`align-right amount ${tx.type}`}>
                    {tx.type === 'income' ? '+' : '−'}
                    {formatMoney(tx.amount)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
