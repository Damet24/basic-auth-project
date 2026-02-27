import { createBrowserRouter } from "react-router";

import { IndexPage } from "../pages/IndexPage";

import { DashboardLayout } from "../components/layout/DashboardLayout";


import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { ProfilePage } from "../pages/dashboard/ProfilePage";
import { UsersPage } from "../pages/dashboard/UsersPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
    ],
  },
]);