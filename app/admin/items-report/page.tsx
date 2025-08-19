import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ItemsReport } from "@/components/admin/items-report"

export default function ItemsReportPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>
        <ItemsReport />
      </AdminLayout>
    </ProtectedRoute>
  )
}
