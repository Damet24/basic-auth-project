type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  selectId: string
  error?: string | undefined
  children: React.ReactNode
}

export function Select({
  label,
  error,
  selectId,
  children,
  ...props
}: SelectProps) {
  return (
    <div>
      <label
        htmlFor={selectId}
        className="mb-1 block font-medium text-gray-700 text-sm dark:text-gray-300"
      >
        {label}
      </label>

      <select
        id={selectId}
        {...props}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 dark:border-gray-600"
        }`}
      >
        {children}
      </select>

      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>
  );
}
