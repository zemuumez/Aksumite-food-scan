import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { KitchenDisplaySystem } from "@/components/admin/kitchen-display-system"

export default function KitchenDisplaySystemPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "chef-kitchen"]}>
      <AdminLayout>
        <KitchenDisplaySystem />
      </AdminLayout>
    </ProtectedRoute>
  )
}
