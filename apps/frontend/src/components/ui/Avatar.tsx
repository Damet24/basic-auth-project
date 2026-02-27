import { useCurrentUser } from '../../hooks/useUser'
import { nameInitials } from '../../lib/initials'

export function Avatar() {
  const { data } = useCurrentUser()

  const initials = nameInitials(data?.name ?? '')
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
      {initials}
    </div>
  )
}
