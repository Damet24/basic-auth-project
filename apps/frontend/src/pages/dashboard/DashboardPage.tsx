import { Badge } from '../../components/ui/Badge'

export function DashboardPage() {
  return (
    <>
      <h1 className="mb-6 font-bold text-2xl text-gray-900 dark:text-white">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="mb-2 font-semibold text-lg">Users</h2>
          <p className="font-bold text-3xl">120</p>
          <Badge variant="success">+5%</Badge>
        </div>

        <div className="rounded-xl bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="mb-2 font-semibold text-lg">Active</h2>
          <p className="font-bold text-3xl">87</p>
          <Badge variant="default">Stable</Badge>
        </div>
      </div>
    </>
  )
}
