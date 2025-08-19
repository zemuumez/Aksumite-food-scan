import { ProtectedRoute } from "@/components/auth/protected-route"
import { BranchManagerLayout } from "@/components/branch-manager/branch-manager-layout"
import { ReportsAnalytics } from "@/components/admin/reports-analytics"

export default function BranchManagerReportsPage() {
  return (
    <ProtectedRoute allowedRoles={["branch-manager"]}>
      <BranchManagerLayout>
        <ReportsAnalytics />
      </BranchManagerLayout>
    </ProtectedRoute>
  )
}
