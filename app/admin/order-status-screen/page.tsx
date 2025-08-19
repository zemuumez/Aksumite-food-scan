import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { OrderStatusScreen } from "@/components/admin/order-status-screen"

export default function OrderStatusScreenPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>
        <OrderStatusScreen />
      </AdminLayout>
    </ProtectedRoute>
  )
}
