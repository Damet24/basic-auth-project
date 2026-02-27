import { Badge } from "../ui/Badge";

type Props = {
  id: string;
  name?: string;
  email: string;
  role?: string;
};

export function ProfileCard({ id, name = "", email, role = "" }: Props) {
  const initials = (name || "")
    .split(" ")
    .map((n) => n[0] || "")
    .join("")
    .toUpperCase();

  const roleVariant =
    role === "admin" ? "danger" : "default";

  return (
    <div className="rounded-2xl bg-white p-8 shadow-md transition-colors dark:bg-gray-800">

      <div className="flex items-center gap-6">
        
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 font-bold text-2xl text-white">
          {initials}
        </div>

        <div>
          <h2 className="font-bold text-2xl text-gray-900 dark:text-white">
            {name}
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            {email}
          </p>

          <div className="mt-2">
            <Badge variant={roleVariant}>
              {role ? role.toUpperCase() : "UNKNOWN"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="my-6 border-gray-200 border-t dark:border-gray-700" />

      <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
        <div>
          <p className="text-gray-500 dark:text-gray-400">User ID</p>
          <p className="font-medium text-gray-800 dark:text-gray-200">
            {id}
          </p>
        </div>

        <div>
          <p className="text-gray-500 dark:text-gray-400">Role</p>
          <p className="font-medium text-gray-800 dark:text-gray-200">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
}