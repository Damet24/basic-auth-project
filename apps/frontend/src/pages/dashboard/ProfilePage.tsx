import UserService from '../../services/UserService'
import { ProfileCard } from '../../components/profile/ProfileCard'
import { ProfileSkeleton } from '../../components/profile/ProfileSkeleton'
import { Container } from '../../components/ui/Container'

export function ProfilePage() {
  const { data, isLoading } = UserService.getUserInfo()

  return (
    <Container>
      <h1 className="mb-6 font-bold text-2xl text-gray-900 dark:text-white">Profile</h1>

      {isLoading && <ProfileSkeleton />}

      {data && <ProfileCard id={data.id} name={data.name} email={data.email} role={data.role} />}
    </Container>
  )
}
