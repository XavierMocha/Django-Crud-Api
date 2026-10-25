import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { formatMoney, formatPercent } from '../lib/format'

export interface CategorySlice {
  id: string
  label: string
  value: number
  color: string
}

interface CategoryBreakdownProps {
  data: CategorySlice[]
  total: number
}

function SliceTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; payload: CategorySlice }>
}) {
  if (!active || !payload?.[0]) return null
  const item = payload[0]
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{item.name}</p>
      <p>{formatMoney(item.value)}</p>
    </div>
  )
}

export function CategoryBreakdown({ data, total }: CategoryBreakdownProps) {
  return (
    <section className="panel">
      <header className="panel-header">
        <div>
          <h2>Gastos por categoría</h2>
          <p>Distribución del mes en curso</p>
        </div>
      </header>

      <div className="donut-layout">
        <div className="donut-chart">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="label"
                innerRadius={54}
                outerRadius={78}
                paddingAngle={2}
                stroke="none"
              >
                {data.map((slice) => (
                  <Cell key={slice.id} fill={slice.color} />
                ))}
              </Pie>
              <Tooltip content={<SliceTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-center">
            <span>Total</span>
            <strong>{formatMoney(total)}</strong>
          </div>
        </div>

        <ul className="category-list">
          {data.map((slice) => (
            <li key={slice.id}>
              <span className="cat-dot" style={{ background: slice.color }} />
              <span className="cat-label">{slice.label}</span>
              <span className="cat-pct">{formatPercent((slice.value / total) * 100)}</span>
              <span className="cat-amt">{formatMoney(slice.value)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
