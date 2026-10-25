import {
  LayoutDashboard,
  ArrowLeftRight,
  PiggyBank,
  Wallet,
  Target,
  Settings,
  Menu,
  X,
} from 'lucide-react'

const nav = [
  { id: 'dashboard', label: 'Resumen', icon: LayoutDashboard },
  { id: 'transactions', label: 'Movimientos', icon: ArrowLeftRight },
  { id: 'accounts', label: 'Cuentas', icon: Wallet },
  { id: 'budgets', label: 'Presupuestos', icon: Target },
  { id: 'savings', label: 'Ahorros', icon: PiggyBank },
  { id: 'settings', label: 'Ajustes', icon: Settings },
] as const

export type NavId = (typeof nav)[number]['id']

interface SidebarProps {
  active: NavId
  onNavigate: (id: NavId) => void
  open: boolean
  onToggle: () => void
}

export function Sidebar({ active, onNavigate, open, onToggle }: SidebarProps) {
  return (
    <>
      <button
        type="button"
        className="sidebar-toggle"
        onClick={onToggle}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={`sidebar ${open ? 'is-open' : ''}`}>
        <div className="brand">
          <span className="brand-mark" aria-hidden />
          <div>
            <p className="brand-name">CajaClara</p>
            <p className="brand-tag">Finanzas personales</p>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Principal">
          {nav.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={`nav-item ${active === id ? 'is-active' : ''}`}
              onClick={() => {
                onNavigate(id)
                onToggle()
              }}
            >
              <Icon size={18} strokeWidth={1.75} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-foot">
          <p className="sidebar-hint">Plantilla lista para adaptar a tu API o base de datos.</p>
        </div>
      </aside>

      {open ? (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Cerrar menú"
          onClick={onToggle}
        />
      ) : null}
    </>
  )
}
