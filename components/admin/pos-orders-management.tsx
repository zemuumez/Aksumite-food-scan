"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Printer,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Receipt,
  CreditCard,
  Banknote,
} from "lucide-react"

interface POSOrder {
  id: string
  orderNumber: string
  customer: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  subtotal: number
  tax: number
  total: number
  paymentMethod: "cash" | "card" | "digital"
  status: "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled"
  orderType: "dine-in" | "takeout" | "delivery"
  table?: string
  timestamp: string
  estimatedTime?: string
  server: string
}

const mockPOSOrders: POSOrder[] = [
  {
    id: "1",
    orderNumber: "POS-001",
    customer: "John Smith",
    items: [
      { name: "Grilled Chicken Burger", quantity: 1, price: 15.99 },
      { name: "Truffle Fries", quantity: 1, price: 12.99 },
      { name: "Craft Beer", quantity: 2, price: 7.99 },
    ],
    subtotal: 44.96,
    tax: 3.99,
    total: 48.95,
    paymentMethod: "card",
    status: "completed",
    orderType: "dine-in",
    table: "T05",
    timestamp: "2024-01-17 14:30:00",
    server: "Sarah Johnson",
  },
  {
    id: "2",
    orderNumber: "POS-002",
    customer: "Emma Davis",
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 18.5 },
      { name: "Caesar Salad", quantity: 1, price: 12.0 },
    ],
    subtotal: 30.5,
    tax: 2.71,
    total: 33.21,
    paymentMethod: "cash",
    status: "preparing",
    orderType: "takeout",
    timestamp: "2024-01-17 14:45:00",
    estimatedTime: "15 min",
    server: "Mike Wilson",
  },
  {
    id: "3",
    orderNumber: "POS-003",
    customer: "David Brown",
    items: [
      { name: "Fish & Chips", quantity: 2, price: 16.75 },
      { name: "Chocolate Cake", quantity: 1, price: 8.5 },
    ],
    subtotal: 42.0,
    tax: 3.73,
    total: 45.73,
    paymentMethod: "digital",
    status: "ready",
    orderType: "delivery",
    timestamp: "2024-01-17 15:00:00",
    estimatedTime: "Ready",
    server: "Lisa Chen",
  },
  {
    id: "4",
    orderNumber: "POS-004",
    customer: "Anna Martinez",
    items: [{ name: "Ribeye Steak", quantity: 1, price: 32.99 }],
    subtotal: 32.99,
    tax: 2.93,
    total: 35.92,
    paymentMethod: "card",
    status: "confirmed",
    orderType: "dine-in",
    table: "T12",
    timestamp: "2024-01-17 15:15:00",
    estimatedTime: "25 min",
    server: "Tom Rodriguez",
  },
  {
    id: "5",
    orderNumber: "POS-005",
    customer: "Walk-in Customer",
    items: [
      { name: "Caesar Salad", quantity: 1, price: 12.0 },
      { name: "Craft Beer", quantity: 1, price: 7.99 },
    ],
    subtotal: 19.99,
    tax: 1.78,
    total: 21.77,
    paymentMethod: "cash",
    status: "pending",
    orderType: "takeout",
    timestamp: "2024-01-17 15:30:00",
    server: "Jake Thompson",
  },
]

const statusConfig = {
  pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock, label: "Pending" },
  confirmed: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: CheckCircle, label: "Confirmed" },
  preparing: { color: "bg-orange-100 text-orange-800 border-orange-200", icon: RefreshCw, label: "Preparing" },
  ready: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle, label: "Ready" },
  completed: { color: "bg-gray-100 text-gray-800 border-gray-200", icon: CheckCircle, label: "Completed" },
  cancelled: { color: "bg-red-100 text-red-800 border-red-200", icon: AlertCircle, label: "Cancelled" },
}

const paymentMethodConfig = {
  cash: { icon: Banknote, label: "Cash", color: "bg-green-100 text-green-800" },
  card: { icon: CreditCard, label: "Card", color: "bg-blue-100 text-blue-800" },
  digital: { icon: Receipt, label: "Digital", color: "bg-purple-100 text-purple-800" },
}

export function POSOrdersManagement() {
  const [orders, setOrders] = useState<POSOrder[]>(mockPOSOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedOrderType, setSelectedOrderType] = useState<string>("all")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.server.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.table?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    const matchesOrderType = selectedOrderType === "all" || order.orderType === selectedOrderType
    const matchesPaymentMethod = selectedPaymentMethod === "all" || order.paymentMethod === selectedPaymentMethod
    return matchesSearch && matchesStatus && matchesOrderType && matchesPaymentMethod
  })

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    preparing: orders.filter((o) => o.status === "preparing").length,
    ready: orders.filter((o) => o.status === "ready").length,
    completed: orders.filter((o) => o.status === "completed").length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    averageOrder: orders.length > 0 ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0,
  }

  const updateOrderStatus = (orderId: string, newStatus: POSOrder["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">POS Orders</h1>
          <p className="text-gray-600 mt-1">Manage and track all point-of-sale orders</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-gray-300 bg-transparent">
            <Printer className="h-4 w-4 mr-2" />
            Print Report
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Orders
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ShoppingCart className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{orderStats.total}</div>
                <p className="text-xs text-gray-600">All time orders</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">
                  {orderStats.pending + orderStats.preparing + orderStats.ready}
                </div>
                <p className="text-xs text-gray-600">Pending + Preparing + Ready</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">ETB {orderStats.totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-gray-600">From all orders</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">ETB {orderStats.averageOrder.toFixed(2)}</div>
                <p className="text-xs text-gray-600">Average order value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search orders, customers, servers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-300"
          />
        </div>
        <div className="flex gap-3">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-40 border-gray-300">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {Object.entries(statusConfig).map(([status, config]) => (
                <SelectItem key={status} value={status}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedOrderType} onValueChange={setSelectedOrderType}>
            <SelectTrigger className="w-32 border-gray-300">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="dine-in">Dine In</SelectItem>
              <SelectItem value="takeout">Takeout</SelectItem>
              <SelectItem value="delivery">Delivery</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
            <SelectTrigger className="w-32 border-gray-300">
              <SelectValue placeholder="All Payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payment</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="card">Card</SelectItem>
              <SelectItem value="digital">Digital</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrders.map((order) => {
          const statusConf = statusConfig[order.status]
          const paymentConf = paymentMethodConfig[order.paymentMethod]
          const StatusIcon = statusConf.icon
          const PaymentIcon = paymentConf.icon

          return (
            <Card key={order.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">{order.orderNumber}</CardTitle>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <p className="text-xs text-gray-500">{formatTime(order.timestamp)}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Printer className="h-4 w-4 mr-2" />
                        Print Receipt
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "confirmed")}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark Confirmed
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "completed")}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark Completed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={statusConf.color}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusConf.label}
                  </Badge>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="capitalize">
                      {order.orderType.replace("-", " ")}
                    </Badge>
                    {order.table && <Badge variant="outline">{order.table}</Badge>}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Order Items:</div>
                  <div className="space-y-1">
                    {order.items.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium">${(item.quantity * item.price).toFixed(2)}</span>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="text-sm text-gray-500">+{order.items.length - 3} more items</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={paymentConf.color}>
                      <PaymentIcon className="h-3 w-3 mr-1" />
                      {paymentConf.label}
                    </Badge>
                    <span className="text-sm text-gray-600">by {order.server}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</div>
                    {order.estimatedTime && (
                      <div className="text-xs text-orange-600 font-medium">{order.estimatedTime}</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <ShoppingCart className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  )
}
