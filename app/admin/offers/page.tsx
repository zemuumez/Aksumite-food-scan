import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { OffersManagement } from "@/components/admin/offers-management"

export default function OffersPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>
        <OffersManagement />
      </AdminLayout>
    </ProtectedRoute>
  )
}
