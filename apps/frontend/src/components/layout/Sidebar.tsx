import { NavLink } from 'react-router'

const navItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Profile', path: '/dashboard/profile' },
  { name: 'Users', path: '/dashboard/users' },
]

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col bg-white shadow-md md:flex dark:bg-gray-800">
      <div className="p-6 font-bold text-gray-800 text-xl dark:text-white">MyApp</div>

      <nav className="flex-1 space-y-2 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-2 transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
