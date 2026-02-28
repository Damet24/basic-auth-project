import { useState } from "react";
import { useNavigate } from "react-router";
import { Topbar } from "../components/layout/Topbar";
import { ProfileCard } from "../components/profile/ProfileCard";
import { ProfileSkeleton } from "../components/profile/ProfileSkeleton";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { PERMISSIONS } from "../constants";
import { usePermissions } from "../hooks/usePermissions";
import { useCurrentUser } from "../hooks/useUser";
import { EditProfileForm } from "../components/forms/EditProfileForm";
import { ChangePasswordForm } from "../components/forms/ChangePasswordForm";

export function HomePage() {
  const navigate = useNavigate();
  const { data: userInfo, isLoading } = useCurrentUser();
  const { can } = usePermissions();

  const [mode, setMode] = useState<"view" | "edit" | "password">("view");

  return (
    <main className="min-h-screen bg-gray-100 transition-colors dark:bg-gray-900">
      <Topbar />
      <div className="p-5">
        <Container>
          <div className="flex flex-col items-center space-y-8 py-8">
            <h1 className="font-bold text-3xl text-gray-900 dark:text-white">
              Welcome 👋
            </h1>

            {isLoading && <ProfileSkeleton />}

            {userInfo && (
              <>
                {mode === "view" && (
                  <>
                    <ProfileCard
                      id={userInfo.id}
                      name={userInfo.name}
                      email={userInfo.email}
                      role={userInfo.role}
                    />

                    <div className="flex flex-wrap gap-4 pt-4">
                      <Button
                        variant="secondary"
                        onClick={() => setMode("edit")}
                      >
                        Edit Profile
                      </Button>

                      <Button
                        variant="secondary"
                        onClick={() => setMode("password")}
                      >
                        Change Password
                      </Button>

                      {can(PERMISSIONS.ADMIN_DASHBOARD_ACCESS) && (
                        <Button onClick={() => navigate("/dashboard")}>
                          Go to Admin Dashboard
                        </Button>
                      )}
                    </div>
                  </>
                )}

                {mode === "edit" && (
                  <div className="w-[70%] space-y-4">
                    <EditProfileForm
                      onCancel={() => setMode("view")}
                      onSuccess={() => setMode("view")}
                    />
                  </div>
                )}

                {mode === "password" && (
                  <div className="w-[70%] space-y-4">
                    <ChangePasswordForm
                      onCancel={() => setMode("view")}
                      onSuccess={() => setMode("view")}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </Container>
      </div>
    </main>
  );
}
