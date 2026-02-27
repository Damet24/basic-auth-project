type CardProps = {
  children: React.ReactNode
}

export function Card({ children }: CardProps) {
  return (
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg transition-colors dark:bg-gray-800">
      {children}
    </div>
  )
}
