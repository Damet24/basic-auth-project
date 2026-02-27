export function TableSkeleton() {
  return (
    <div>
      <div>
        {[...Array(5)].map((_, i) => (
            <div
             key={Math.random()}
             className="h-10 rounded bg-gray-200 dark:bg-gray-700"
           />
        ))}
      </div>
    </div>
  );
}
