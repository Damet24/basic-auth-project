import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DataTable } from '../../../src/components/ui/DataTable'

vi.mock('../../../src/components/ui/TableSkeleton', () => ({
  TableSkeleton: () => <div data-testid="table-skeleton">Loading...</div>,
}))

describe('DataTable', () => {
  const columns = [
    { header: 'Name', accessor: 'name' as const },
    { header: 'Email', accessor: 'email' as const },
  ]

  it('shows TableSkeleton when loading', () => {
    render(
      <DataTable data={[]} columns={columns} loading />,
    )
    expect(screen.getByTestId('table-skeleton')).toBeInTheDocument()
  })

  it('renders headers', () => {
    render(
      <DataTable data={[]} columns={columns} />,
    )
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('shows empty message when no data', () => {
    render(
      <DataTable data={[]} columns={columns} emptyMessage="No users" />,
    )
    expect(screen.getByText('No users')).toBeInTheDocument()
  })

  it('renders rows with data', () => {
    const data = [
      { name: 'Alice', email: 'alice@x.com' },
      { name: 'Bob', email: 'bob@x.com' },
    ]
    render(
      <DataTable data={data} columns={columns} />,
    )
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('alice@x.com')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('bob@x.com')).toBeInTheDocument()
  })

  it('uses custom render when provided', () => {
    const cols = [
      { header: 'Name', accessor: 'name' as const },
      {
        header: 'Role',
        accessor: 'role' as const,
        render: (value: string) => <span data-testid="role">{value.toUpperCase()}</span>,
      },
    ]
    render(
      <DataTable data={[{ name: 'U', role: 'admin' }]} columns={cols} />,
    )
    expect(screen.getByTestId('role')).toHaveTextContent('ADMIN')
  })
})
