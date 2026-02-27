import { NavLink } from "react-router";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Profile", path: "/dashboard/profile" },
  { name: "Users", path: "/dashboard/users" },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md hidden md:flex flex-col">
      <div className="p-6 font-bold text-xl text-gray-800 dark:text-white">
        MyApp
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition 
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}