import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ReportsAnalytics } from "@/components/admin/reports-analytics"

export default function ReportsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>
        <ReportsAnalytics />
      </AdminLayout>
    </ProtectedRoute>
  )
}
