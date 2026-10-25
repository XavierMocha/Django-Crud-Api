import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatMoney } from '../lib/format'

interface Point {
  month: string
  income: number
  expense: number
}

interface CashflowChartProps {
  data: Point[]
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name === 'income' ? 'Ingresos' : 'Gastos'}: {formatMoney(entry.value)}
        </p>
      ))}
    </div>
  )
}

export function CashflowChart({ data }: CashflowChartProps) {
  return (
    <section className="panel chart-panel">
      <header className="panel-header">
        <div>
          <h2>Flujo de caja</h2>
          <p>Ingresos frente a gastos en los últimos 6 meses</p>
        </div>
      </header>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2A7A5C" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#2A7A5C" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B54A3A" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#B54A3A" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(26, 36, 33, 0.08)" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#5A6B64', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#5A6B64', fontSize: 12 }}
              tickFormatter={(v) => `$${v / 1000}k`}
              width={40}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#2A7A5C"
              strokeWidth={2}
              fill="url(#incomeFill)"
              name="income"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#B54A3A"
              strokeWidth={2}
              fill="url(#expenseFill)"
              name="expense"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-legend">
        <span>
          <i className="swatch income" /> Ingresos
        </span>
        <span>
          <i className="swatch expense" /> Gastos
        </span>
      </div>
    </section>
  )
}
