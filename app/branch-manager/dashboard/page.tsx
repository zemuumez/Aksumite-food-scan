import { ProtectedRoute } from "@/components/auth/protected-route"
import { BranchManagerLayout } from "@/components/branch-manager/branch-manager-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, ShoppingCart, Users } from "lucide-react"

export default function BranchManagerDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["branch-manager"]}>
      <BranchManagerLayout>
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Branch Manager Dashboard</h1>
            <p className="text-gray-600">Monitor branch performance and manage operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Today's Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">$2,847.50</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% from yesterday
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Orders Today</CardTitle>
                <ShoppingCart className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">127</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.2% from yesterday
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Staff</CardTitle>
                <Users className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">8</div>
                <div className="text-xs text-gray-600">2 on break</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Avg Order Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">18 min</div>
                <div className="text-xs text-gray-600">Target: 15 min</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: "ORD-045", table: "Table 3", status: "preparing", time: "5 min" },
                    { id: "ORD-046", table: "Table 7", status: "ready", time: "2 min" },
                    { id: "ORD-047", table: "Takeaway", status: "pending", time: "1 min" },
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.table}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            order.status === "ready"
                              ? "default"
                              : order.status === "preparing"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                        <span className="text-sm text-gray-500">{order.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Staff Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Mike (POS)", status: "active", shift: "Morning" },
                    { name: "Lisa (Kitchen)", status: "active", shift: "Morning" },
                    { name: "Tom (POS)", status: "break", shift: "Morning" },
                    { name: "Sarah (Kitchen)", status: "active", shift: "Evening" },
                  ].map((staff) => (
                    <div key={staff.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{staff.name}</p>
                        <p className="text-sm text-gray-600">{staff.shift} Shift</p>
                      </div>
                      <Badge variant={staff.status === "active" ? "default" : "secondary"}>{staff.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </BranchManagerLayout>
    </ProtectedRoute>
  )
}
