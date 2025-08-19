import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { DiningTablesManagement } from "@/components/admin/dining-tables-management"

export default function DiningTablesPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>
        <DiningTablesManagement />
      </AdminLayout>
    </ProtectedRoute>
  )
}
