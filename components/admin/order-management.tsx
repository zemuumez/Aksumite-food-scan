"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Printer,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"

type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "completed" | "cancelled"

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  specialInstructions?: string
}

interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerPhone: string
  tableNumber?: string
  orderType: "dine-in" | "takeaway" | "delivery"
  status: OrderStatus
  items: OrderItem[]
  subtotal: number
  tax: number
  total: number
  createdAt: Date
  estimatedTime: number
  specialInstructions?: string
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-001",
    customerName: "John Doe",
    customerPhone: "+1234567890",
    tableNumber: "5",
    orderType: "dine-in",
    status: "preparing",
    items: [
      { id: "1", name: "Grilled Chicken Burger", quantity: 2, price: 15.99 },
      { id: "2", name: "Caesar Salad", quantity: 1, price: 12.0 },
    ],
    subtotal: 43.98,
    tax: 3.52,
    total: 47.5,
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    estimatedTime: 20,
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    customerName: "Jane Smith",
    customerPhone: "+1234567891",
    orderType: "takeaway",
    status: "ready",
    items: [
      { id: "3", name: "Margherita Pizza", quantity: 1, price: 18.5 },
      { id: "4", name: "Chocolate Cake", quantity: 2, price: 8.5 },
    ],
    subtotal: 35.5,
    tax: 2.84,
    total: 38.34,
    createdAt: new Date(Date.now() - 25 * 60 * 1000),
    estimatedTime: 15,
  },
  {
    id: "3",
    orderNumber: "ORD-003",
    customerName: "Mike Johnson",
    customerPhone: "+1234567892",
    tableNumber: "3",
    orderType: "dine-in",
    status: "pending",
    items: [{ id: "5", name: "Fish & Chips", quantity: 1, price: 16.75 }],
    subtotal: 16.75,
    tax: 1.34,
    total: 18.09,
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
    estimatedTime: 18,
    specialInstructions: "Extra tartar sauce please",
  },
  {
    id: "4",
    orderNumber: "ORD-004",
    customerName: "Sarah Wilson",
    customerPhone: "+1234567893",
    orderType: "delivery",
    status: "completed",
    items: [
      { id: "6", name: "Caesar Salad", quantity: 2, price: 12.0 },
      { id: "7", name: "Grilled Chicken Burger", quantity: 1, price: 15.99 },
    ],
    subtotal: 39.99,
    tax: 3.2,
    total: 43.19,
    createdAt: new Date(Date.now() - 45 * 60 * 1000),
    estimatedTime: 25,
  },
]

const statusConfig = {
  pending: { color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
  confirmed: { color: "bg-blue-100 text-blue-800", icon: CheckCircle },
  preparing: { color: "bg-orange-100 text-orange-800", icon: Clock },
  ready: { color: "bg-green-100 text-green-800", icon: CheckCircle },
  completed: { color: "bg-gray-100 text-gray-800", icon: CheckCircle },
  cancelled: { color: "bg-red-100 text-red-800", icon: XCircle },
}

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesType = typeFilter === "all" || order.orderType === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60))
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    return `${hours}h ${minutes % 60}m ago`
  }

  const getStatusActions = (order: Order) => {
    switch (order.status) {
      case "pending":
        return [
          { label: "Confirm Order", status: "confirmed" as OrderStatus },
          { label: "Cancel Order", status: "cancelled" as OrderStatus },
        ]
      case "confirmed":
        return [{ label: "Start Preparing", status: "preparing" as OrderStatus }]
      case "preparing":
        return [{ label: "Mark Ready", status: "ready" as OrderStatus }]
      case "ready":
        return [{ label: "Mark Completed", status: "completed" as OrderStatus }]
      default:
        return []
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600">View and manage all restaurant orders in real-time.</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Print Orders
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(
          orders.reduce(
            (acc, order) => {
              acc[order.status] = (acc[order.status] || 0) + 1
              return acc
            },
            {} as Record<string, number>,
          ),
        ).map(([status, count]) => {
          const config = statusConfig[status as OrderStatus]
          const Icon = config.icon
          return (
            <Card key={status}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 capitalize">{status} Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{count}</p>
                  </div>
                  <Icon className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="preparing">Preparing</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="dine-in">Dine In</SelectItem>
            <SelectItem value="takeaway">Takeaway</SelectItem>
            <SelectItem value="delivery">Delivery</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders List */}
      <div className="grid gap-4">
        {filteredOrders.map((order) => {
          const statusInfo = statusConfig[order.status]
          const StatusIcon = statusInfo.icon
          const actions = getStatusActions(order)

          return (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <StatusIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
                        <Badge className={cn("text-xs", statusInfo.color)}>{order.status}</Badge>
                        <Badge variant="outline" className="text-xs capitalize">
                          {order.orderType}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                        <span>{order.customerName}</span>
                        {order.tableNumber && <span>Table {order.tableNumber}</span>}
                        <span>{getTimeAgo(order.createdAt)}</span>
                        <span>{order.estimatedTime} min</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">{order.items.length} items</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      {actions.map((action) => (
                        <Button
                          key={action.label}
                          size="sm"
                          variant={action.status === "cancelled" ? "destructive" : "default"}
                          onClick={() => updateOrderStatus(order.id, action.status)}
                        >
                          {action.label}
                        </Button>
                      ))}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => viewOrderDetails(order)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Printer className="h-4 w-4 mr-2" />
                            Print Receipt
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {order.items.map((item) => (
                      <Badge key={item.id} variant="secondary" className="text-xs">
                        {item.quantity}x {item.name}
                      </Badge>
                    ))}
                  </div>
                  {order.specialInstructions && (
                    <p className="text-sm text-orange-600 mt-2 italic">Note: {order.specialInstructions}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.orderNumber}</DialogTitle>
            <DialogDescription>Complete order information and items</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Customer Information</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-gray-600">Name:</span> {selectedOrder.customerName}
                    </p>
                    <p>
                      <span className="text-gray-600">Phone:</span> {selectedOrder.customerPhone}
                    </p>
                    {selectedOrder.tableNumber && (
                      <p>
                        <span className="text-gray-600">Table:</span> {selectedOrder.tableNumber}
                      </p>
                    )}
                    <p>
                      <span className="text-gray-600">Type:</span>{" "}
                      <span className="capitalize">{selectedOrder.orderType}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Order Information</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-gray-600">Status:</span>{" "}
                      <Badge className={cn("text-xs ml-1", statusConfig[selectedOrder.status].color)}>
                        {selectedOrder.status}
                      </Badge>
                    </p>
                    <p>
                      <span className="text-gray-600">Placed:</span> {selectedOrder.createdAt.toLocaleString()}
                    </p>
                    <p>
                      <span className="text-gray-600">Est. Time:</span> {selectedOrder.estimatedTime} minutes
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.specialInstructions && (
                          <p className="text-sm text-gray-600 italic">{item.specialInstructions}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">${(item.quantity * item.price).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>${selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax:</span>
                    <span>${selectedOrder.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                    <span>Total:</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {selectedOrder.specialInstructions && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-2">Special Instructions</h4>
                  <p className="text-orange-800">{selectedOrder.specialInstructions}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
