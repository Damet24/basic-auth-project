import type { UserInfoResponse } from "@packages/contracts/dtos/responses/UserInfoResponse";
import { UserRole } from "@packages/domain/index";
import { EllipsisVertical } from "lucide-react";
import { EditUserForm } from "../../components/forms/EditUserForm";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { DataTable, type Column } from "../../components/ui/DataTable";
import { Dialog } from "../../components/ui/Dialog";
import { Dropdown } from "../../components/ui/Dropdown";
import { useDeleteUser, useUsers } from "../../hooks/useUser";
import { useState } from "react";



export function UsersPage() {
  const { data = [], isLoading } = useUsers()
  const {mutate} = useDeleteUser()

  const [editingUser, setEditingUser] = useState<UserInfoResponse | null>(null)
  const [deletingUser, setDeletingUser] = useState<UserInfoResponse | null>(null)

  const columns: Column<UserInfoResponse>[] = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Email",
      accessor: "email",
    },
    {
      header: "Role",
      accessor: "role",
      render: (value) => (
        <Badge variant={value === "admin" ? "danger" : "default"}>
          {value.toUpperCase()}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessor: "id",
      render: (_, row) => {
        if (row.role === UserRole.ADMIN.value) return null

        return (
          <Dropdown
            trigger={
              <Button variant="ghost" size="sm">
                <EllipsisVertical size={18} />
              </Button>
            }
          >
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setEditingUser(row)}
            >
              Edit
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start text-red-500"
              onClick={() => setDeletingUser(row)}
            >
              Delete
            </Button>
          </Dropdown>
        )
      },
    },
  ];

   return (
    <>
      <DataTable
        data={data}
        columns={columns}
        loading={isLoading}
        emptyMessage="No users found"
      />

      <Dialog
        open={!!editingUser}
        onOpenChange={(open) => !open && setEditingUser(null)}
      >
        <Dialog.Content>
          <Dialog.Title>Edit user</Dialog.Title>

          {editingUser && <EditUserForm user={editingUser} />}

          <Dialog.Footer>
            <Button
              variant="secondary"
              onClick={() => setEditingUser(null)}
            >
              Cancel
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>

      <Dialog
        open={!!deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
      >
        <Dialog.Content>
          <Dialog.Title>Delete user</Dialog.Title>

          <Dialog.Description>
            Are you sure you want to delete{" "}
            <span className="font-medium">{deletingUser?.name}</span>?
          </Dialog.Description>

          <Dialog.Footer>
            <Button
              variant="secondary"
              onClick={() => setDeletingUser(null)}
            >
              Cancel
            </Button>

            <Button
              variant="danger"
              onClick={() => {
                if (deletingUser) {
                  setDeletingUser(null)
                  mutate(deletingUser)
                }
              }}
            >
              Confirm
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  )
}
