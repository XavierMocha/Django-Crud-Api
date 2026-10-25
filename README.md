# CajaClara — Dashboard de finanzas personales

Plantilla en React + TypeScript + Vite para controlar ingresos, gastos, presupuestos y cuentas.

## Incluye

- Resumen con balance, ingresos, gastos y tasa de ahorro
- Gráfico de flujo de caja (6 meses)
- Distribución de gastos por categoría
- Presupuestos con avance mensual
- Listado de movimientos y altas desde modal
- Navegación: resumen, movimientos, cuentas, presupuestos, ahorros, ajustes

## Arranque

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
npm run preview
```

## Personalización

| Qué | Dónde |
| --- | --- |
| Datos de ejemplo | `src/data/sample.ts` |
| Tipos (categorías, transacciones) | `src/types/finance.ts` |
| Colores y tipografía | `src/index.css` (`:root`) |
| Layout y componentes | `src/components/` |

Los movimientos nuevos se guardan en estado local del navegador (sin backend). Sustituye el estado por tu API cuando quieras persistencia real.

## Stack

- React 19 + TypeScript
- Vite 8
- Recharts
- Lucide React
