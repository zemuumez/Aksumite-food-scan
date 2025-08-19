import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { CustomersManagement } from "@/components/admin/customers-management"

export default function CustomersPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "branch-manager"]}>
      <AdminLayout>
        <CustomersManagement />
      </AdminLayout>
    </ProtectedRoute>
  )
}
