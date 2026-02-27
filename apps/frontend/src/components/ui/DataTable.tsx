import { TableSkeleton } from './TableSkeleton'

export type Column<T> = {
  header: string
  accessor: keyof T
  render?: (value: any, row: T) => React.ReactNode
}

type DataTableProps<T> = {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  emptyMessage?: string
}

export function DataTable<T>({ data, columns, loading, emptyMessage = 'No data available' }: DataTableProps<T>) {
  if (loading) {
    return <TableSkeleton />
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition-colors dark:bg-gray-800">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {columns.map((col) => (
              <th key={col.header} className="px-6 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="py-10 text-center text-gray-500 dark:text-gray-400">
                {emptyMessage}
              </td>
            </tr>
          )}

          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-gray-200 border-t transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              {columns.map((col) => {
                const value = row[col.accessor]

                return (
                  <td key={col.header} className="px-6 py-4 text-gray-700 dark:text-gray-200">
                    {col.render ? col.render(value, row) : String(value)}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
