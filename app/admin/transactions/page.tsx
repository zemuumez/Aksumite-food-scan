import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { TransactionsReport } from "@/components/admin/transactions-report"

export default function TransactionsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>
        <TransactionsReport />
      </AdminLayout>
    </ProtectedRoute>
  )
}
