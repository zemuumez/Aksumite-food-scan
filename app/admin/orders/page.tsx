import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { OrderManagement } from "@/components/admin/order-management"

export default function OrdersPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>
        <OrderManagement />
      </AdminLayout>
    </ProtectedRoute>
  )
}
