import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { WaitersManagement } from "@/components/admin/waiters-management"

export default function WaitersPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "branch-manager"]}>
      <AdminLayout>
        <WaitersManagement />
      </AdminLayout>
    </ProtectedRoute>
  )
}
