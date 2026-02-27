import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  inputId: string
  error: string | undefined
}

export function Input({ label, error, inputId, ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={inputId} className="mb-1 block font-medium text-gray-700 text-sm dark:text-gray-300">
        {label}
      </label>
      <input
        id={inputId}
        {...props}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>
  )
}
