import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ChefsManagement } from "@/components/admin/chefs-management"

export default function ChefsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "branch-manager"]}>
      <AdminLayout>
        <ChefsManagement />
      </AdminLayout>
    </ProtectedRoute>
  )
}
