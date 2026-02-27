import { Avatar } from '../ui/Avatar'

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between bg-white px-6 shadow dark:bg-gray-800">
      <div className="font-semibold text-gray-700 dark:text-gray-200">Welcome back 👋</div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => document.documentElement.classList.toggle('dark')}
          className="text-gray-600 text-sm dark:text-gray-300"
        >
          Toggle Theme
        </button>

        <Avatar />
      </div>
    </header>
  )
}
