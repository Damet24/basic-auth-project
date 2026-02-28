type Props = {
  children: React.ReactNode
}

export function Container({ children }: Props) {
  return <div className="mx-auto max-w-6xl">{children}</div>
}
