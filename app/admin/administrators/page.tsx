import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { AdministratorsManagement } from "@/components/admin/administrators-management"

export default function AdministratorsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>
        <AdministratorsManagement />
      </AdminLayout>
    </ProtectedRoute>
  )
}
