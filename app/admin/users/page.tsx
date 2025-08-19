import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { UserManagement } from "@/components/admin/user-management"

export default function UsersPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>
        <UserManagement />
      </AdminLayout>
    </ProtectedRoute>
  )
}
