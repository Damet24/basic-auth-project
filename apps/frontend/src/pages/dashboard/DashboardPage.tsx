export function DashboardPage() {
  return (
    <>
      <h1 className="mb-6 font-bold text-2xl text-gray-900 dark:text-white">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="mb-2 font-semibold text-lg">Example</h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow dark:bg-gray-800">
          <h2 className="mb-2 font-semibold text-lg">Example</h2>
        </div>
      </div>
    </>
  )
}
