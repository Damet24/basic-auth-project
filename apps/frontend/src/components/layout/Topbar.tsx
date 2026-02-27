import { Avatar } from '../ui/Avatar'

export function Topbar() {
  return (
    <header
      className="h-16 bg-white dark:bg-gray-800 
    shadow px-6 flex items-center justify-between"
    >
      <div className="font-semibold text-gray-700 dark:text-gray-200">Welcome back 👋</div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => document.documentElement.classList.toggle('dark')}
          className="text-sm text-gray-600 dark:text-gray-300"
        >
          Toggle Theme
        </button>

        <Avatar />
      </div>
    </header>
  )
}
