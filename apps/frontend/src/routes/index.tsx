import { createBrowserRouter, type RouteObject } from 'react-router'
import { ProtectedRoute } from '../components/auth/ProtectedRoute'
import type { AppRoute } from '../types'
import { APP_ROUTES } from './routes'

function mapRoutes(routes: AppRoute[]): RouteObject[] {
  return routes.map((route) => {
    const wrappedElement = route.permission ? (
      <ProtectedRoute key={route.path} requiredPermission={route.permission}>
        {route.element}
      </ProtectedRoute>
    ) : (
      route.element
    )

    return {
      path: route.path,
      element: wrappedElement,
      children: route.children ? mapRoutes(route.children) : undefined,
    } as RouteObject
  })
}

export const router = createBrowserRouter(mapRoutes(APP_ROUTES))
