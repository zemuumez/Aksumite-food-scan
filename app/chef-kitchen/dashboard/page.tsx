import { ProtectedRoute } from "@/components/auth/protected-route"
import { ChefKitchenLayout } from "@/components/chef-kitchen/chef-kitchen-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Clock, CheckCircle, AlertTriangle } from "lucide-react"

export default function ChefKitchenDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["chef-kitchen"]}>
      <ChefKitchenLayout>
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kitchen Dashboard</h1>
            <p className="text-gray-600">Manage orders and kitchen operations efficiently.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Orders</CardTitle>
                <ChefHat className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">7</div>
                <div className="text-xs text-gray-600">Currently cooking</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">In Queue</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">12</div>
                <div className="text-xs text-gray-600">Waiting to start</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">45</div>
                <div className="text-xs text-gray-600">Today</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Avg Prep Time</CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">16 min</div>
                <div className="text-xs text-gray-600">Target: 15 min</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Active Orders</CardTitle>
                <Button size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: "ORD-051", items: "2x Burger, 1x Fries", table: "Table 5", time: "8 min", priority: "high" },
                    {
                      id: "ORD-052",
                      items: "1x Pizza, 1x Salad",
                      table: "Table 2",
                      time: "12 min",
                      priority: "normal",
                    },
                    { id: "ORD-053", items: "3x Fish & Chips", table: "Takeaway", time: "5 min", priority: "urgent" },
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{order.id}</p>
                          <Badge
                            variant={
                              order.priority === "urgent"
                                ? "destructive"
                                : order.priority === "high"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {order.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{order.items}</p>
                        <p className="text-xs text-gray-500">{order.table}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{order.time}</p>
                        <Button size="sm" className="mt-1">
                          Ready
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Queue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: "ORD-054", items: "1x Pasta, 1x Soup", table: "Table 8", estimated: "15 min" },
                    { id: "ORD-055", items: "2x Steak, 1x Wine", table: "Table 1", estimated: "25 min" },
                    { id: "ORD-056", items: "1x Sandwich", table: "Takeaway", estimated: "10 min" },
                  ].map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.items}</p>
                        <p className="text-xs text-gray-500">{order.table}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Est. {order.estimated}</p>
                        <Button size="sm" variant="outline" className="mt-1 bg-transparent">
                          Start
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ChefKitchenLayout>
    </ProtectedRoute>
  )
}
