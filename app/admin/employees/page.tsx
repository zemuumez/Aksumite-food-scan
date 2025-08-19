import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/admin/admin-layout"
import { EmployeesManagement } from "@/components/admin/employees-management"

export default function EmployeesPage() {
  return (
    <ProtectedRoute allowedRoles={["admin", "branch-manager"]}>
      <AdminLayout>
        <EmployeesManagement />
      </AdminLayout>
    </ProtectedRoute>
  )
}
