import { useMemo, useState, startTransition } from 'react'
import { Plus } from 'lucide-react'
import { Sidebar, type NavId } from './components/Sidebar'
import { StatStrip } from './components/StatStrip'
import { CashflowChart } from './components/CashflowChart'
import { CategoryBreakdown } from './components/CategoryBreakdown'
import { BudgetProgress } from './components/BudgetProgress'
import { RecentTransactions } from './components/RecentTransactions'
import { AccountsPanel } from './components/AccountsPanel'
import { AddTransactionModal } from './components/AddTransactionModal'
import {
  accounts as seedAccounts,
  budgets,
  categories,
  monthlyCashflow,
  transactions as seedTransactions,
} from './data/sample'
import type { Transaction } from './types/finance'
import './App.css'

function App() {
  const [nav, setNav] = useState<NavId>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>(seedTransactions)

  const monthPrefix = '2026-10'

  const monthTx = useMemo(
    () => transactions.filter((t) => t.date.startsWith(monthPrefix)),
    [transactions],
  )

  const income = useMemo(
    () => monthTx.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0),
    [monthTx],
  )

  const expense = useMemo(
    () => monthTx.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
    [monthTx],
  )

  const balance = seedAccounts.reduce((s, a) => s + a.balance, 0)
  const savingsRate = income > 0 ? ((income - expense) / income) * 100 : 0

  const categorySlices = useMemo(() => {
    const map = new Map<string, number>()
    for (const tx of monthTx) {
      if (tx.type !== 'expense') continue
      map.set(tx.category, (map.get(tx.category) ?? 0) + tx.amount)
    }
    return [...map.entries()]
      .map(([id, value]) => {
        const cat = categories.find((c) => c.id === id)
        return {
          id,
          label: cat?.label ?? id,
          value,
          color: cat?.color ?? '#6B726E',
        }
      })
      .sort((a, b) => b.value - a.value)
  }, [monthTx])

  const budgetRows = useMemo(() => {
    return budgets.map((b) => {
      const cat = categories.find((c) => c.id === b.category)
      const spent = monthTx
        .filter((t) => t.type === 'expense' && t.category === b.category)
        .reduce((s, t) => s + t.amount, 0)
      return {
        id: b.category,
        label: cat?.label ?? b.category,
        spent,
        limit: b.limit,
        color: cat?.color ?? '#6B726E',
      }
    })
  }, [monthTx])

  const recent = useMemo(
    () => [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10),
    [transactions],
  )

  function handleNavigate(id: NavId) {
    startTransition(() => setNav(id))
  }

  function handleSave(tx: Omit<Transaction, 'id'>) {
    setTransactions((prev) => [
      { ...tx, id: `tx-${crypto.randomUUID().slice(0, 8)}` },
      ...prev,
    ])
  }

  return (
    <div className="app-shell">
      <Sidebar
        active={nav}
        onNavigate={handleNavigate}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
      />

      <div className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Octubre 2026</p>
            <h1>
              {nav === 'dashboard' && 'Resumen financiero'}
              {nav === 'transactions' && 'Movimientos'}
              {nav === 'accounts' && 'Cuentas'}
              {nav === 'budgets' && 'Presupuestos'}
              {nav === 'savings' && 'Ahorros'}
              {nav === 'settings' && 'Ajustes'}
            </h1>
          </div>
          <button type="button" className="btn-primary" onClick={() => setModalOpen(true)}>
            <Plus size={16} strokeWidth={2} />
            Añadir
          </button>
        </header>

        {nav === 'dashboard' && (
          <div className="dashboard">
            <StatStrip
              balance={balance}
              income={income}
              expense={expense}
              savingsRate={savingsRate}
            />

            <div className="grid-2">
              <CashflowChart data={monthlyCashflow} />
              <CategoryBreakdown data={categorySlices} total={expense || 1} />
            </div>

            <div className="grid-2">
              <BudgetProgress items={budgetRows} />
              <AccountsPanel accounts={seedAccounts} />
            </div>

            <RecentTransactions
              items={recent}
              categories={categories}
              onAdd={() => setModalOpen(true)}
            />
          </div>
        )}

        {nav === 'transactions' && (
          <div className="dashboard">
            <RecentTransactions
              items={[...transactions].sort((a, b) => b.date.localeCompare(a.date))}
              categories={categories}
              onAdd={() => setModalOpen(true)}
            />
          </div>
        )}

        {nav === 'accounts' && (
          <div className="dashboard">
            <AccountsPanel accounts={seedAccounts} />
          </div>
        )}

        {nav === 'budgets' && (
          <div className="dashboard">
            <BudgetProgress items={budgetRows} />
          </div>
        )}

        {nav === 'savings' && (
          <section className="panel placeholder">
            <h2>Metas de ahorro</h2>
            <p>
              Espacio listo para conectar objetivos (fondo de emergencia, vacaciones, etc.). Usa
              <code>src/data/sample.ts</code> como punto de partida.
            </p>
          </section>
        )}

        {nav === 'settings' && (
          <section className="panel placeholder">
            <h2>Ajustes</h2>
            <p>
              Personaliza moneda, categorías y cuentas en{' '}
              <code>src/types/finance.ts</code> y <code>src/data/sample.ts</code>.
            </p>
          </section>
        )}
      </div>

      <AddTransactionModal
        open={modalOpen}
        categories={categories}
        accounts={seedAccounts.map((a) => a.name)}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  )
}

export default App
