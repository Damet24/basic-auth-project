import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
    >
      {children}
    </button>
  )
}
