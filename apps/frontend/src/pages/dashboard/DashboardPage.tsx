import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { Badge } from '../../components/ui/Badge'

export function DashboardPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Users</h2>
          <p className="text-3xl font-bold">120</p>
          <Badge variant="success">+5%</Badge>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Active</h2>
          <p className="text-3xl font-bold">87</p>
          <Badge variant="default">Stable</Badge>
        </div>
      </div>
    </>
  )
}
