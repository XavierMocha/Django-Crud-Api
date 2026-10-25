# CajaClara — plantilla Excel de finanzas personales

Plantilla en un solo archivo Excel (`.xlsx`) para controlar ingresos, gastos, presupuestos y cuentas, con un **Dashboard** que se actualiza con fórmulas.

## Archivo

- [`CajaClara_Finanzas.xlsx`](./CajaClara_Finanzas.xlsx) — ábrelo en Excel, Google Sheets o LibreOffice Calc

## Hojas

| Hoja | Uso |
| --- | --- |
| **Instrucciones** | Cómo usar la plantilla |
| **Dashboard** | KPIs del mes, gráfico de gastos, presupuestos y flujo de caja |
| **Movimientos** | Registro de transacciones (fuente de verdad) |
| **Categorías** | Catálogo ingreso / gasto |
| **Cuentas** | Saldos por cuenta |
| **Presupuestos** | Límites mensuales y avance |
| **Histórico_mensual** | Datos del gráfico de barras |

## Uso rápido

1. En **Dashboard**, ajusta **Mes (B2)** y **Año (D2)**.
2. Registra operaciones en **Movimientos** (hay listas desplegables).
3. Personaliza **Categorías**, **Cuentas** y **Presupuestos**.
4. Completa **Histórico_mensual** si quieres otro periodo en el gráfico.

## Regenerar el archivo

Si modificas el generador:

```bash
python3 scripts/build_excel_template.py
```

Requiere `openpyxl` (`pip install openpyxl`).
