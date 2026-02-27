import { DashboardLayout } from '../components/layout/DashboardLayout'
import { PERMISSIONS } from '../constants'
import { DashboardPage } from '../pages/dashboard/DashboardPage'
import { ProfilePage } from '../pages/dashboard/ProfilePage'
import { UsersPage } from '../pages/dashboard/UsersPage'
import { HomePage } from '../pages/HomePage'
import { IndexPage } from '../pages/IndexPage'
import type { AppRoute } from '../types'

export const APP_ROUTES: AppRoute[] = [
  {
    path: '/',
    element: <IndexPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    permission: PERMISSIONS.ADMIN_DASHBOARD_ACCESS,
    children: [
      {
        path: '',
        element: <DashboardPage />,
        permission: PERMISSIONS.STATS_DASHBOARD_ACCESS,
        showInSidebar: true,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
        permission: PERMISSIONS.PROFILE_EDIT,
        showInSidebar: true,
      },
      {
        path: 'users',
        element: <UsersPage />,
        permission: PERMISSIONS.USERS_READ,
        showInSidebar: true,
      },
    ],
  },
]
