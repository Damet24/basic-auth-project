import { useNavigate } from 'react-router'
import { Topbar } from '../components/layout/Topbar'
import { ProfileCard } from '../components/profile/ProfileCard'
import { ProfileSkeleton } from '../components/profile/ProfileSkeleton'
import { Button } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { PERMISSIONS } from '../constants'
import { usePermissions } from '../hooks/usePermissions'
import { useCurrentUser } from '../hooks/useUser'

export function HomePage() {
  const navigate = useNavigate()
  const { data: userInfo, isLoading } = useCurrentUser()
  const { can } = usePermissions()

  return (
    <main className="min-h-screen bg-gray-100 transition-colors dark:bg-gray-900">
      <Topbar />

      <Container>
        <div className="space-y-8 py-8">
          <h1 className="font-bold text-3xl text-gray-900 dark:text-white">Welcome 👋</h1>

          {isLoading && <ProfileSkeleton />}

          {userInfo && (
            <>
              <ProfileCard id={userInfo.id} name={userInfo.name} email={userInfo.email} role={userInfo.role} />

              {can(PERMISSIONS.ADMIN_DASHBOARD_ACCESS) && (
                <div className="pt-4">
                  <Button onClick={() => navigate('/dashboard')}>Go to Admin Dashboard</Button>
                </div>
              )}
            </>
          )}
        </div>
      </Container>
    </main>
  )
}
