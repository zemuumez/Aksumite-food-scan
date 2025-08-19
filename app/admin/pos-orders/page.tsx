import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { POSOrdersManagement } from "@/components/admin/pos-orders-management"

export default function POSOrdersPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "pos-operator"]}>
      <AdminLayout>
        <POSOrdersManagement />
      </AdminLayout>
    </ProtectedRoute>
  )
}
