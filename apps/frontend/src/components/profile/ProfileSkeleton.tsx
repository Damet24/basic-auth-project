export function ProfileSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 
    rounded-2xl shadow-md p-8 animate-pulse">

      <div className="flex items-center gap-6">
        <div className="w-20 h-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
        <div className="space-y-3">
          <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-4 w-60 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
        </div>
      </div>

      <div className="border-t border-gray-200 
      dark:border-gray-700 my-6" />

      <div className="grid grid-cols-2 gap-4">
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}