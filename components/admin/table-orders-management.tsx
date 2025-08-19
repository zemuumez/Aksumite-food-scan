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
  Table,
  DollarSign,
  Users,
  ChefHat,
  UserCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TableOrder {
  id: string
  orderNumber: string
  table: string
  customer: string
  partySize: number
  items: Array<{
    name: string
    quantity: number
    price: number
    status: "pending" | "preparing" | "ready" | "served"
  }>
  subtotal: number
  tax: number
  total: number
  status: "pending" | "confirmed" | "preparing" | "ready" | "served" | "completed" | "cancelled"
  server: string
  timestamp: string
  estimatedTime?: string
  notes?: string
  seatedAt: string
  orderTakenAt: string
}

const mockTableOrders: TableOrder[] = [
  {
    id: "1",
    orderNumber: "TBL-001",
    table: "T05",
    customer: "Smith Family",
    partySize: 4,
    items: [
      { name: "Grilled Chicken Burger", quantity: 2, price: 15.99, status: "served" },
      { name: "Margherita Pizza", quantity: 1, price: 18.5, status: "served" },
      { name: "Caesar Salad", quantity: 1, price: 12.0, status: "served" },
      { name: "Craft Beer", quantity: 3, price: 7.99, status: "served" },
    ],
    subtotal: 86.45,
    tax: 7.67,
    total: 94.12,
    status: "completed",
    server: "Sarah Johnson",
    timestamp: "2024-01-17 13:30:00",
    seatedAt: "2024-01-17 13:15:00",
    orderTakenAt: "2024-01-17 13:30:00",
  },
  {
    id: "2",
    orderNumber: "TBL-002",
    table: "T12",
    customer: "Johnson Party",
    partySize: 6,
    items: [
      { name: "Ribeye Steak", quantity: 2, price: 32.99, status: "preparing" },
      { name: "Fish & Chips", quantity: 2, price: 16.75, status: "preparing" },
      { name: "Truffle Fries", quantity: 2, price: 12.99, status: "ready" },
      { name: "Chocolate Cake", quantity: 1, price: 8.5, status: "pending" },
    ],
    subtotal: 133.96,
    tax: 11.89,
    total: 145.85,
    status: "preparing",
    server: "Mike Wilson",
    timestamp: "2024-01-17 14:00:00",
    estimatedTime: "20 min",
    seatedAt: "2024-01-17 13:45:00",
    orderTakenAt: "2024-01-17 14:00:00",
    notes: "Customer requested medium-rare steak",
  },
  {
    id: "3",
    orderNumber: "TBL-003",
    table: "T08",
    customer: "Williams Couple",
    partySize: 2,
    items: [
      { name: "Caesar Salad", quantity: 2, price: 12.0, status: "ready" },
      { name: "Craft Beer", quantity: 2, price: 7.99, status: "served" },
    ],
    subtotal: 39.98,
    tax: 3.55,
    total: 43.53,
    status: "ready",
    server: "Emma Davis",
    timestamp: "2024-01-17 14:15:00",
    estimatedTime: "Ready for service",
    seatedAt: "2024-01-17 14:00:00",
    orderTakenAt: "2024-01-17 14:15:00",
  },
  {
    id: "4",
    orderNumber: "TBL-004",
    table: "T03",
    customer: "Brown Family",
    partySize: 5,
    items: [
      { name: "Margherita Pizza", quantity: 2, price: 18.5, status: "confirmed" },
      { name: "Grilled Chicken Burger", quantity: 1, price: 15.99, status: "confirmed" },
    ],
    subtotal: 52.99,
    tax: 4.7,
    total: 57.69,
    status: "confirmed",
    server: "David Brown",
    timestamp: "2024-01-17 14:30:00",
    estimatedTime: "25 min",
    seatedAt: "2024-01-17 14:15:00",
    orderTakenAt: "2024-01-17 14:30:00",
  },
  {
    id: "5",
    orderNumber: "TBL-005",
    table: "T15",
    customer: "Martinez Party",
    partySize: 3,
    items: [{ name: "Fish & Chips", quantity: 3, price: 16.75, status: "pending" }],
    subtotal: 50.25,
    tax: 4.46,
    total: 54.71,
    status: "pending",
    server: "Lisa Chen",
    timestamp: "2024-01-17 14:45:00",
    seatedAt: "2024-01-17 14:30:00",
    orderTakenAt: "2024-01-17 14:45:00",
  },
]

const statusConfig = {
  pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock, label: "Pending" },
  confirmed: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: CheckCircle, label: "Confirmed" },
  preparing: { color: "bg-orange-100 text-orange-800 border-orange-200", icon: ChefHat, label: "Preparing" },
  ready: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle, label: "Ready" },
  served: { color: "bg-purple-100 text-purple-800 border-purple-200", icon: UserCheck, label: "Served" },
  completed: { color: "bg-gray-100 text-gray-800 border-gray-200", icon: CheckCircle, label: "Completed" },
  cancelled: { color: "bg-red-100 text-red-800 border-red-200", icon: AlertCircle, label: "Cancelled" },
}

export function TableOrdersManagement() {
  const [orders, setOrders] = useState<TableOrder[]>(mockTableOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedTable, setSelectedTable] = useState<string>("all")
  const [selectedServer, setSelectedServer] = useState<string>("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.table.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.server.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    const matchesTable = selectedTable === "all" || order.table === selectedTable
    const matchesServer = selectedServer === "all" || order.server === selectedServer
    return matchesSearch && matchesStatus && matchesTable && matchesServer
  })

  const orderStats = {
    total: orders.length,
    active: orders.filter((o) => ["pending", "confirmed", "preparing", "ready", "served"].includes(o.status)).length,
    completed: orders.filter((o) => o.status === "completed").length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    averagePartySize: orders.length > 0 ? orders.reduce((sum, order) => sum + order.partySize, 0) / orders.length : 0,
  }

  const uniqueTables = Array.from(new Set(orders.map((order) => order.table))).sort()
  const uniqueServers = Array.from(new Set(orders.map((order) => order.server))).sort()

  const updateOrderStatus = (orderId: string, newStatus: TableOrder["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const calculateDiningTime = (seatedAt: string) => {
    const seated = new Date(seatedAt)
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - seated.getTime()) / (1000 * 60))
    return `${diffMinutes} min`
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Table Orders</h1>
          <p className="text-gray-600 mt-1">Manage dine-in orders and table service</p>
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
                <Table className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{orderStats.total}</div>
                <p className="text-xs text-gray-600">All table orders</p>
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
                <div className="text-xl font-bold text-gray-900">{orderStats.active}</div>
                <p className="text-xs text-gray-600">Currently being served</p>
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
                <p className="text-xs text-gray-600">From table orders</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">{orderStats.averagePartySize.toFixed(1)}</div>
                <p className="text-xs text-gray-600">People per table</p>
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
            placeholder="Search orders, tables, customers..."
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
          <Select value={selectedTable} onValueChange={setSelectedTable}>
            <SelectTrigger className="w-32 border-gray-300">
              <SelectValue placeholder="All Tables" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tables</SelectItem>
              {uniqueTables.map((table) => (
                <SelectItem key={table} value={table}>
                  {table}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedServer} onValueChange={setSelectedServer}>
            <SelectTrigger className="w-40 border-gray-300">
              <SelectValue placeholder="All Servers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Servers</SelectItem>
              {uniqueServers.map((server) => (
                <SelectItem key={server} value={server}>
                  {server}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredOrders.map((order) => {
          const statusConf = statusConfig[order.status]
          const StatusIcon = statusConf.icon

          return (
            <Card key={order.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Table className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold">{order.orderNumber}</CardTitle>
                      <p className="text-sm text-gray-600">
                        {order.table} • {order.customer} ({order.partySize} guests)
                      </p>
                      <p className="text-xs text-gray-500">
                        Seated: {formatTime(order.seatedAt)} • Dining: {calculateDiningTime(order.seatedAt)}
                      </p>
                    </div>
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
                        Print Order
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "confirmed")}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark Confirmed
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "served")}>
                        <UserCheck className="h-4 w-4 mr-2" />
                        Mark Served
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "completed")}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Complete Order
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
                    <Badge variant="outline">Server: {order.server}</Badge>
                    {order.estimatedTime && (
                      <Badge variant="outline" className="bg-orange-50 text-orange-700">
                        {order.estimatedTime}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Order Items:</div>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600">
                            {item.quantity}x {item.name}
                          </span>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs",
                              item.status === "served" && "bg-green-100 text-green-800",
                              item.status === "ready" && "bg-blue-100 text-blue-800",
                              item.status === "preparing" && "bg-orange-100 text-orange-800",
                              item.status === "pending" && "bg-yellow-100 text-yellow-800",
                            )}
                          >
                            {item.status}
                          </Badge>
                        </div>
                        <span className="font-medium">${(item.quantity * item.price).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {order.notes && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="text-sm font-medium text-yellow-800 mb-1">Special Notes:</div>
                    <div className="text-sm text-yellow-700">{order.notes}</div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="text-sm text-gray-600">Order taken: {formatTime(order.orderTakenAt)}</div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">
                      Subtotal: ${order.subtotal.toFixed(2)} + Tax: ${order.tax.toFixed(2)}
                    </div>
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
            <Table className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No table orders found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  )
}
