import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { TableOrdersManagement } from "@/components/admin/table-orders-management"

export default function TableOrdersPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "pos-operator", "branch-manager"]}>
      <AdminLayout>
        <TableOrdersManagement />
      </AdminLayout>
    </ProtectedRoute>
  )
}
