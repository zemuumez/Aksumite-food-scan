import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    </ProtectedRoute>
  )
}
