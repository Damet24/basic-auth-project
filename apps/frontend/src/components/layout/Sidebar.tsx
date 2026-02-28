import { NavLink } from 'react-router'
import { usePermissions } from '../../hooks/usePermissions'
import { APP_ROUTES } from '../../routes/routes'

export function Sidebar() {
  const { can } = usePermissions()

  const dashboard = APP_ROUTES.find((r) => r.path === '/dashboard')

  const items =
    dashboard?.children?.filter((route) => route.showInSidebar && (!route.permission || can(route.permission))) ?? []

  return (
    <aside className="w-64 flex-col bg-white shadow-md md:flex dark:bg-gray-800">
      <div className="p-6 font-bold text-gray-800 text-xl dark:text-white">MyApp</div>

      <nav className="flex-1 space-y-2 px-4">
        {items.map((route) => {
          const fullPath = route.path === '' ? '/dashboard' : `/dashboard/${route.path}`

          return (
            <NavLink
              key={route.path}
              to={fullPath}
              end={route.path === ''}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2 transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
                }`
              }
            >
              {route.path === '' ? 'Dashboard' : route.path}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
