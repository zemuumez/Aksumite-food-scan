import { ProtectedRoute } from "@/components/auth/protected-route"
import { PosOperatorLayout } from "@/components/pos-operator/pos-operator-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, CreditCard, Clock, CheckCircle } from "lucide-react"

export default function PosOperatorDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["pos-operator"]}>
      <PosOperatorLayout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">POS Dashboard</h1>
              <p className="text-gray-600">Process orders and manage payments efficiently.</p>
            </div>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              <ShoppingCart className="h-5 w-5 mr-2" />
              New Order
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Orders Today</CardTitle>
                <ShoppingCart className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">23</div>
                <div className="text-xs text-gray-600">Your shift</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Sales</CardTitle>
                <CreditCard className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">$567.80</div>
                <div className="text-xs text-gray-600">Your shift</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-xs text-gray-600">Orders waiting</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">20</div>
                <div className="text-xs text-gray-600">Orders done</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: "ORD-048", customer: "John Doe", total: "$24.50", status: "completed" },
                    { id: "ORD-049", customer: "Jane Smith", total: "$18.75", status: "preparing" },
                    { id: "ORD-050", customer: "Mike Johnson", total: "$32.00", status: "pending" },
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{order.total}</span>
                        <Badge
                          variant={
                            order.status === "completed"
                              ? "default"
                              : order.status === "preparing"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-20 flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-700">
                    <ShoppingCart className="h-6 w-6 mb-2" />
                    <span>New Order</span>
                  </Button>
                  <Button className="h-20 flex flex-col items-center justify-center bg-transparent" variant="outline">
                    <CreditCard className="h-6 w-6 mb-2" />
                    <span>Process Payment</span>
                  </Button>
                  <Button className="h-20 flex flex-col items-center justify-center bg-transparent" variant="outline">
                    <Clock className="h-6 w-6 mb-2" />
                    <span>View Queue</span>
                  </Button>
                  <Button className="h-20 flex flex-col items-center justify-center bg-transparent" variant="outline">
                    <CheckCircle className="h-6 w-6 mb-2" />
                    <span>Order History</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PosOperatorLayout>
    </ProtectedRoute>
  )
}
