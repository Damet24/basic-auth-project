import { Badge } from '../../components/ui/Badge'
import { DataTable, type Column } from '../../components/ui/DataTable'
import { useUsers } from '../../hooks/useUser'

export function UsersPage() {
  const { data = [], isLoading } = useUsers()

  const columns: Column<any>[] = [
    {
      header: 'Name',
      accessor: 'name',
    },
    {
      header: 'Email',
      accessor: 'email',
    },
    {
      header: 'Role',
      accessor: 'role',
      render: (value) => <Badge variant={value === 'admin' ? 'danger' : 'default'}>{value.toUpperCase()}</Badge>,
    },
    {
      header: 'Accionts',
      accessor: '',
      render: () => <h1>uwu</h1>,
    },
  ]

  return (
    <div>
      <h1 className="mb-6 font-bold text-2xl text-gray-900 dark:text-white">Users</h1>

      <DataTable data={data} columns={columns} loading={isLoading} emptyMessage="No users found" />
    </div>
  )
}
