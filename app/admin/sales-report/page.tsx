import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { SalesReport } from "@/components/admin/sales-report"

export default function SalesReportPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>
        <SalesReport />
      </AdminLayout>
    </ProtectedRoute>
  )
}
