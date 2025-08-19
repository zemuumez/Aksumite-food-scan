import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { SettingsManagement } from "@/components/admin/settings-management"

export default function SettingsPage() {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout>
        <SettingsManagement />
      </AdminLayout>
    </ProtectedRoute>
  )
}
