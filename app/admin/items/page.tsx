import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ItemsManagement } from "@/components/admin/items-management"

export default function ItemsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>
        <ItemsManagement />
      </AdminLayout>
    </ProtectedRoute>
  )
}
