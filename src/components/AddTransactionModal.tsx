import { useId, useState, type FormEvent } from 'react'
import type { Category, Transaction, TransactionType } from '../types/finance'

interface AddTransactionModalProps {
  open: boolean
  categories: Category[]
  accounts: string[]
  onClose: () => void
  onSave: (tx: Omit<Transaction, 'id'>) => void
}

export function AddTransactionModal({
  open,
  categories,
  accounts,
  onClose,
  onSave,
}: AddTransactionModalProps) {
  const titleId = useId()
  const [type, setType] = useState<TransactionType>('expense')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0]?.id ?? 'other')
  const [account, setAccount] = useState(accounts[0] ?? '')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))

  if (!open) return null

  const filtered = categories.filter((c) => c.type === type || c.type === 'both')
  const safeCategory = filtered.some((c) => c.id === category)
    ? category
    : (filtered[0]?.id ?? 'other')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const value = Number.parseFloat(amount)
    if (!description.trim() || !Number.isFinite(value) || value <= 0) return

    onSave({
      description: description.trim(),
      amount: value,
      type,
      category,
      date,
      account,
    })

    setDescription('')
    setAmount('')
    setType('expense')
    onClose()
  }

  return (
    <div className="modal-root" role="presentation">
      <button type="button" className="modal-backdrop" aria-label="Cerrar" onClick={onClose} />
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <header className="modal-header">
          <h2 id={titleId}>Nuevo movimiento</h2>
          <button type="button" className="btn-ghost" onClick={onClose}>
            Cerrar
          </button>
        </header>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="type-toggle" role="group" aria-label="Tipo">
            <button
              type="button"
              className={type === 'expense' ? 'is-active' : undefined}
              onClick={() => setType('expense')}
            >
              Gasto
            </button>
            <button
              type="button"
              className={type === 'income' ? 'is-active' : undefined}
              onClick={() => setType('income')}
            >
              Ingreso
            </button>
          </div>

          <label>
            Descripción
            <input
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej. Supermercado"
            />
          </label>

          <div className="form-row">
            <label>
              Monto
              <input
                required
                inputMode="decimal"
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </label>
            <label>
              Fecha
              <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
          </div>

          <div className="form-row">
            <label>
              Categoría
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Transaction['category'])}
              >
                {filtered.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Cuenta
              <select value={account} onChange={(e) => setAccount(e.target.value)}>
                {accounts.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-ghost" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
