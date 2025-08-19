import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { POSInterface } from "@/components/admin/pos-interface"

export default function POSPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "pos-operator"]}>
      <AdminLayout>
        <POSInterface />
      </AdminLayout>
    </ProtectedRoute>
  )
}
