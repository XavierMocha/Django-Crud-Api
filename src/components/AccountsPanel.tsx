import { Landmark, PiggyBank, Banknote } from 'lucide-react'
import type { Account } from '../types/finance'
import { formatMoney } from '../lib/format'

const icons = {
  checking: Landmark,
  savings: PiggyBank,
  cash: Banknote,
} as const

const typeLabel = {
  checking: 'Corriente',
  savings: 'Ahorro',
  cash: 'Efectivo',
} as const

interface AccountsPanelProps {
  accounts: Account[]
}

export function AccountsPanel({ accounts }: AccountsPanelProps) {
  const total = accounts.reduce((sum, a) => sum + a.balance, 0)

  return (
    <section className="panel">
      <header className="panel-header">
        <div>
          <h2>Cuentas</h2>
          <p>Saldo consolidado: {formatMoney(total)}</p>
        </div>
      </header>

      <ul className="account-list">
        {accounts.map((account) => {
          const Icon = icons[account.type]
          return (
            <li key={account.id}>
              <span className="account-icon">
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <div>
                <p className="account-name">{account.name}</p>
                <p className="account-type">{typeLabel[account.type]}</p>
              </div>
              <strong className="account-balance">{formatMoney(account.balance)}</strong>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
