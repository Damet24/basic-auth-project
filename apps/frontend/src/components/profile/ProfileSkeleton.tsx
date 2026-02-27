export function ProfileSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-white p-8 shadow-md dark:bg-gray-800">

      <div className="flex items-center gap-6">
        <div className="h-20 w-20 rounded-full bg-gray-300 dark:bg-gray-700" />
        <div className="space-y-3">
          <div className="h-6 w-40 rounded bg-gray-300 dark:bg-gray-700" />
          <div className="h-4 w-60 rounded bg-gray-300 dark:bg-gray-700" />
          <div className="h-5 w-20 rounded-full bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>

      <div className="my-6 border-gray-200 border-t dark:border-gray-700" />

      <div className="grid grid-cols-2 gap-4">
        <div className="h-12 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="h-12 rounded bg-gray-300 dark:bg-gray-700" />
      </div>
    </div>
  );
}