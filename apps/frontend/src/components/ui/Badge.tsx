type BadgeProps = {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'danger' | 'warning'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    default: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white',
    success: 'bg-green-100 text-green-700',
    danger: 'bg-red-100 text-red-700',
    warning: 'bg-yellow-100 text-yellow-800',
  }

  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>{children}</span>
}
