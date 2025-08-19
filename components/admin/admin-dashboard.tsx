"use client"

import { cn } from "@/lib/utils"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  UtensilsCrossed,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Plus,
  FileText,
  ChefHat,
  Table,
} from "lucide-react"

export function AdminDashboard() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening at your restaurant today.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-gray-300 bg-transparent">
            <FileText className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today's Revenue</CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$2,847.50</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Orders Today</CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">127</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Tables</CardTitle>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Table className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">18/24</div>
            <div className="flex items-center text-xs text-orange-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              75% occupancy
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Menu Items</CardTitle>
            <div className="p-2 bg-orange-100 rounded-lg">
              <UtensilsCrossed className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">156</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3 new items
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
            <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "#ORD-1247",
                  table: "Table 5",
                  customer: "John Smith",
                  amount: "$45.50",
                  status: "completed",
                  time: "2 min ago",
                },
                {
                  id: "#ORD-1248",
                  table: "Table 3",
                  customer: "Sarah Johnson",
                  amount: "$32.25",
                  status: "preparing",
                  time: "5 min ago",
                },
                {
                  id: "#ORD-1249",
                  table: "Table 8",
                  customer: "Mike Wilson",
                  amount: "$67.75",
                  status: "pending",
                  time: "8 min ago",
                },
                {
                  id: "#ORD-1250",
                  table: "Table 2",
                  customer: "Emma Davis",
                  amount: "$28.90",
                  status: "completed",
                  time: "12 min ago",
                },
                {
                  id: "#ORD-1251",
                  table: "Table 7",
                  customer: "David Brown",
                  amount: "$54.30",
                  status: "preparing",
                  time: "15 min ago",
                },
              ].map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {order.status === "completed" && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {order.status === "preparing" && <Clock className="h-5 w-5 text-orange-500" />}
                      {order.status === "pending" && <AlertCircle className="h-5 w-5 text-red-500" />}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">
                        {order.table} • {order.customer}
                      </p>
                      <p className="text-xs text-gray-500">{order.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-gray-900">{order.amount}</span>
                    <Badge
                      variant={
                        order.status === "completed"
                          ? "default"
                          : order.status === "preparing"
                            ? "secondary"
                            : "destructive"
                      }
                      className={cn(
                        "capitalize",
                        order.status === "completed" && "bg-green-100 text-green-800 hover:bg-green-100",
                        order.status === "preparing" && "bg-orange-100 text-orange-800 hover:bg-orange-100",
                        order.status === "pending" && "bg-red-100 text-red-800 hover:bg-red-100",
                      )}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Menu Items */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Top Items Today</CardTitle>
            <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
              <UtensilsCrossed className="h-4 w-4 mr-2" />
              Manage
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Grilled Chicken Burger",
                  orders: 23,
                  revenue: "$345.00",
                  image: "/grilled-chicken-burger.png",
                },
                { name: "Margherita Pizza", orders: 19, revenue: "$285.00", image: "/margherita-pizza.png" },
                { name: "Caesar Salad", orders: 16, revenue: "$192.00", image: "/caesar-salad.png" },
                { name: "Fish & Chips", orders: 14, revenue: "$210.00", image: "/classic-fish-and-chips.png" },
                { name: "Chocolate Cake", orders: 12, revenue: "$96.00", image: "/decadent-chocolate-cake.png" },
              ].map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center space-x-3 p-3 bg-white border border-gray-100 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg?height=40&width=40&query=food"}
                      alt={item.name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate text-sm">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.orders} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 text-sm">{item.revenue}</p>
                    <p className="text-xs text-orange-500">#{index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Button
              className="h-20 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-gray-700 hover:text-orange-700"
              variant="outline"
            >
              <UtensilsCrossed className="h-5 w-5" />
              <span className="text-xs">Add Item</span>
            </Button>
            <Button
              className="h-20 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-700"
              variant="outline"
            >
              <Table className="h-5 w-5" />
              <span className="text-xs">Manage Tables</span>
            </Button>
            <Button
              className="h-20 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-700 hover:text-green-700"
              variant="outline"
            >
              <Users className="h-5 w-5" />
              <span className="text-xs">Add Staff</span>
            </Button>
            <Button
              className="h-20 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-700 hover:text-purple-700"
              variant="outline"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="text-xs">View Orders</span>
            </Button>
            <Button
              className="h-20 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 text-gray-700 hover:text-yellow-700"
              variant="outline"
            >
              <ChefHat className="h-5 w-5" />
              <span className="text-xs">Kitchen</span>
            </Button>
            <Button
              className="h-20 flex flex-col items-center justify-center space-y-2 bg-white border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700"
              variant="outline"
            >
              <FileText className="h-5 w-5" />
              <span className="text-xs">Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
