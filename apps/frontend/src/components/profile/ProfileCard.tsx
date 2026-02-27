import { Badge } from "../ui/Badge";

type Props = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export function ProfileCard({ id, name, email, role }: Props) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const roleVariant =
    role === "admin" ? "danger" : "default";

  return (
    <div className="bg-white dark:bg-gray-800 
    rounded-2xl shadow-md p-8 transition-colors">

      <div className="flex items-center gap-6">
        
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-blue-600 
        text-white flex items-center justify-center 
        text-2xl font-bold">
          {initials}
        </div>

        <div>
          <h2 className="text-2xl font-bold 
          text-gray-900 dark:text-white">
            {name}
          </h2>

          <p className="text-gray-500 dark:text-gray-400">
            {email}
          </p>

          <div className="mt-2">
            <Badge variant={roleVariant}>
              {role.toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 
      dark:border-gray-700 my-6" />

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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