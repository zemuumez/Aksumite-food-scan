import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { MenuManagement } from "@/components/admin/menu-management"

export default function MenuManagementPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>
        <MenuManagement />
      </AdminLayout>
    </ProtectedRoute>
  )
}
