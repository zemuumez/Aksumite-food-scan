import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { CreditBalanceReport } from "@/components/admin/credit-balance-report"

export default function CreditBalanceReportPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>
        <CreditBalanceReport />
      </AdminLayout>
    </ProtectedRoute>
  )
}
