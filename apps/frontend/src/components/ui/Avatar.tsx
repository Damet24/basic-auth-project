import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { useCurrentUser } from "../../hooks/useUser";
import { nameInitials } from "../../lib/initials";
import { Dropdown } from "../ui/Dropdown";

export function Avatar() {
  const { data } = useCurrentUser();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const initials = nameInitials(data?.name ?? "");

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <Dropdown
      trigger={
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-600 font-bold text-white transition hover:bg-blue-700">
          {initials}
        </div>
      }
    >
      <div className="py-2 text-sm">
        <button
          type="button"
          onClick={() => navigate("/home")}
          className="block w-full px-4 py-2 text-left text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          My Profile
        </button>

        <div className="my-1 border-gray-200 border-t dark:border-gray-700" />

        <button
          type="button"
          onClick={handleLogout}
          className="block w-full px-4 py-2 text-left text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/40"
        >
          Logout
        </button>
      </div>
    </Dropdown>
  );
}
