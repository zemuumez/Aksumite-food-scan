"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChefHat,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Flame,
  Timer,
  Users,
  Table,
  Utensils,
  Bell,
  Play,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface KitchenOrderItem {
  id: string
  name: string
  quantity: number
  preparationTime: number
  status: "pending" | "preparing" | "ready" | "served"
  notes?: string
  modifications?: string[]
  station: "grill" | "fryer" | "salad" | "dessert" | "beverage"
  startedAt?: string
  completedAt?: string
}

interface KitchenOrder {
  id: string
  orderNumber: string
  table?: string
  customer: string
  orderType: "dine-in" | "takeout" | "delivery"
  items: KitchenOrderItem[]
  status: "new" | "preparing" | "ready" | "completed"
  priority: "normal" | "high" | "urgent"
  receivedAt: string
  estimatedCompletionTime: string
  actualStartTime?: string
  notes?: string
  server: string
  totalItems: number
  completedItems: number
}

const mockKitchenOrders: KitchenOrder[] = [
  {
    id: "1",
    orderNumber: "KDS-001",
    table: "T05",
    customer: "Smith Family",
    orderType: "dine-in",
    items: [
      {
        id: "1",
        name: "Grilled Chicken Burger",
        quantity: 2,
        preparationTime: 15,
        status: "preparing",
        station: "grill",
        startedAt: "2024-01-17 14:30:00",
        notes: "No onions on one burger",
      },
      {
        id: "2",
        name: "Truffle Fries",
        quantity: 1,
        preparationTime: 10,
        status: "ready",
        station: "fryer",
        startedAt: "2024-01-17 14:32:00",
        completedAt: "2024-01-17 14:42:00",
      },
      {
        id: "3",
        name: "Caesar Salad",
        quantity: 1,
        preparationTime: 8,
        status: "ready",
        station: "salad",
        startedAt: "2024-01-17 14:33:00",
        completedAt: "2024-01-17 14:41:00",
      },
    ],
    status: "preparing",
    priority: "normal",
    receivedAt: "2024-01-17 14:28:00",
    estimatedCompletionTime: "2024-01-17 14:45:00",
    actualStartTime: "2024-01-17 14:30:00",
    server: "Sarah Johnson",
    totalItems: 4,
    completedItems: 2,
  },
  {
    id: "2",
    orderNumber: "KDS-002",
    table: "T12",
    customer: "Johnson Party",
    orderType: "dine-in",
    items: [
      {
        id: "4",
        name: "Ribeye Steak",
        quantity: 2,
        preparationTime: 25,
        status: "preparing",
        station: "grill",
        startedAt: "2024-01-17 14:35:00",
        modifications: ["Medium-rare", "Extra seasoning"],
      },
      {
        id: "5",
        name: "Fish & Chips",
        quantity: 1,
        preparationTime: 18,
        status: "pending",
        station: "fryer",
      },
      {
        id: "6",
        name: "Chocolate Cake",
        quantity: 1,
        preparationTime: 5,
        status: "pending",
        station: "dessert",
      },
    ],
    status: "preparing",
    priority: "high",
    receivedAt: "2024-01-17 14:32:00",
    estimatedCompletionTime: "2024-01-17 15:00:00",
    actualStartTime: "2024-01-17 14:35:00",
    server: "Mike Wilson",
    totalItems: 4,
    completedItems: 0,
  },
  {
    id: "3",
    orderNumber: "KDS-003",
    customer: "Williams Couple",
    orderType: "takeout",
    items: [
      {
        id: "7",
        name: "Margherita Pizza",
        quantity: 1,
        preparationTime: 20,
        status: "ready",
        station: "grill",
        startedAt: "2024-01-17 14:25:00",
        completedAt: "2024-01-17 14:45:00",
      },
      {
        id: "8",
        name: "Craft Beer",
        quantity: 2,
        preparationTime: 2,
        status: "ready",
        station: "beverage",
        startedAt: "2024-01-17 14:43:00",
        completedAt: "2024-01-17 14:45:00",
      },
    ],
    status: "ready",
    priority: "normal",
    receivedAt: "2024-01-17 14:20:00",
    estimatedCompletionTime: "2024-01-17 14:45:00",
    actualStartTime: "2024-01-17 14:25:00",
    server: "Emma Davis",
    totalItems: 3,
    completedItems: 3,
  },
  {
    id: "4",
    orderNumber: "KDS-004",
    customer: "Brown Family",
    orderType: "delivery",
    items: [
      {
        id: "9",
        name: "Fish & Chips",
        quantity: 3,
        preparationTime: 18,
        status: "pending",
        station: "fryer",
      },
      {
        id: "10",
        name: "Caesar Salad",
        quantity: 2,
        preparationTime: 8,
        status: "pending",
        station: "salad",
      },
    ],
    status: "new",
    priority: "urgent",
    receivedAt: "2024-01-17 14:45:00",
    estimatedCompletionTime: "2024-01-17 15:10:00",
    notes: "Customer called - needs ASAP for delivery",
    server: "David Brown",
    totalItems: 5,
    completedItems: 0,
  },
  {
    id: "5",
    orderNumber: "KDS-005",
    table: "T08",
    customer: "Martinez Party",
    orderType: "dine-in",
    items: [
      {
        id: "11",
        name: "Grilled Chicken Burger",
        quantity: 1,
        preparationTime: 15,
        status: "pending",
        station: "grill",
      },
      {
        id: "12",
        name: "Truffle Fries",
        quantity: 1,
        preparationTime: 10,
        status: "pending",
        station: "fryer",
      },
    ],
    status: "new",
    priority: "normal",
    receivedAt: "2024-01-17 14:48:00",
    estimatedCompletionTime: "2024-01-17 15:05:00",
    server: "Lisa Chen",
    totalItems: 2,
    completedItems: 0,
  },
]

const stationConfig = {
  grill: { color: "bg-red-100 text-red-800", icon: Flame, label: "Grill" },
  fryer: { color: "bg-orange-100 text-orange-800", icon: Utensils, label: "Fryer" },
  salad: { color: "bg-green-100 text-green-800", icon: Users, label: "Salad" },
  dessert: { color: "bg-pink-100 text-pink-800", icon: ChefHat, label: "Dessert" },
  beverage: { color: "bg-blue-100 text-blue-800", icon: Users, label: "Beverage" },
}

const priorityConfig = {
  normal: { color: "bg-gray-100 text-gray-800", label: "Normal" },
  high: { color: "bg-yellow-100 text-yellow-800", label: "High" },
  urgent: { color: "bg-red-100 text-red-800", label: "Urgent" },
}

const statusConfig = {
  new: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Bell, label: "New" },
  preparing: { color: "bg-orange-100 text-orange-800 border-orange-200", icon: ChefHat, label: "Preparing" },
  ready: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle, label: "Ready" },
  completed: { color: "bg-gray-100 text-gray-800 border-gray-200", icon: CheckCircle, label: "Completed" },
}

export function KitchenDisplaySystem() {
  const [orders, setOrders] = useState<KitchenOrder[]>(mockKitchenOrders)
  const [selectedStation, setSelectedStation] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("active")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const filteredOrders = orders.filter((order) => {
    const matchesStation = selectedStation === "all" || order.items.some((item) => item.station === selectedStation)
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "active" && ["new", "preparing"].includes(order.status)) ||
      order.status === selectedStatus
    return matchesStation && matchesStatus
  })

  const updateItemStatus = (orderId: string, itemId: string, newStatus: KitchenOrderItem["status"]) => {
    setOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          const updatedItems = order.items.map((item) => {
            if (item.id === itemId) {
              const updatedItem = { ...item, status: newStatus }
              if (newStatus === "preparing" && !item.startedAt) {
                updatedItem.startedAt = new Date().toISOString()
              }
              if (newStatus === "ready" && !item.completedAt) {
                updatedItem.completedAt = new Date().toISOString()
              }
              return updatedItem
            }
            return item
          })

          const completedItems = updatedItems.filter((item) => item.status === "ready").length
          const totalItems = updatedItems.length
          let orderStatus = order.status

          if (completedItems === totalItems) {
            orderStatus = "ready"
          } else if (completedItems > 0 || updatedItems.some((item) => item.status === "preparing")) {
            orderStatus = "preparing"
          }

          return {
            ...order,
            items: updatedItems,
            completedItems,
            status: orderStatus,
          }
        }
        return order
      }),
    )
  }

  const startOrder = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: "preparing",
              actualStartTime: new Date().toISOString(),
            }
          : order,
      ),
    )
  }

  const completeOrder = (orderId: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: "completed" } : order)))
  }

  const calculateElapsedTime = (startTime: string) => {
    const start = new Date(startTime)
    const now = currentTime
    const diffMinutes = Math.floor((now.getTime() - start.getTime()) / (1000 * 60))
    return diffMinutes
  }

  const calculateRemainingTime = (estimatedTime: string) => {
    const estimated = new Date(estimatedTime)
    const now = currentTime
    const diffMinutes = Math.floor((estimated.getTime() - now.getTime()) / (1000 * 60))
    return diffMinutes
  }

  const getOrderUrgency = (order: KitchenOrder) => {
    const remainingTime = calculateRemainingTime(order.estimatedCompletionTime)
    if (remainingTime < 0) return "overdue"
    if (remainingTime < 5) return "critical"
    if (remainingTime < 10) return "warning"
    return "normal"
  }

  const orderStats = {
    total: orders.length,
    new: orders.filter((o) => o.status === "new").length,
    preparing: orders.filter((o) => o.status === "preparing").length,
    ready: orders.filter((o) => o.status === "ready").length,
    overdue: orders.filter((o) => calculateRemainingTime(o.estimatedCompletionTime) < 0).length,
  }

  return (
    <div className="p-6 space-y-4 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kitchen Display System</h1>
          <p className="text-gray-600 text-sm">Real-time order management for kitchen operations</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-lg font-mono bg-white px-3 py-2 rounded-lg border border-gray-300">
            {currentTime.toLocaleTimeString()}
          </div>
          <Button
            variant={soundEnabled ? "default" : "outline"}
            size="sm"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={soundEnabled ? "bg-orange-500 hover:bg-orange-600" : "border-gray-300 bg-transparent"}
          >
            <Bell className="h-4 w-4 mr-2" />
            Sound {soundEnabled ? "On" : "Off"}
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-5 gap-3">
        <div className="bg-white rounded-lg p-3 flex items-center space-x-3 shadow-sm">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Bell className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900">{orderStats.new}</div>
            <div className="text-xs text-gray-600">New</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 flex items-center space-x-3 shadow-sm">
          <div className="p-2 bg-orange-100 rounded-lg">
            <ChefHat className="h-4 w-4 text-orange-600" />
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900">{orderStats.preparing}</div>
            <div className="text-xs text-gray-600">Preparing</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 flex items-center space-x-3 shadow-sm">
          <div className="p-2 bg-green-100 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900">{orderStats.ready}</div>
            <div className="text-xs text-gray-600">Ready</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 flex items-center space-x-3 shadow-sm">
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900">{orderStats.overdue}</div>
            <div className="text-xs text-gray-600">Overdue</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 flex items-center space-x-3 shadow-sm">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Timer className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900">{orderStats.new + orderStats.preparing}</div>
            <div className="text-xs text-gray-600">Active</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 mt-4">
        <Select value={selectedStation} onValueChange={setSelectedStation}>
          <SelectTrigger className="w-48 border-gray-300">
            <SelectValue placeholder="All Stations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stations</SelectItem>
            {Object.entries(stationConfig).map(([station, config]) => (
              <SelectItem key={station} value={station}>
                {config.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-40 border-gray-300">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active Orders</SelectItem>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="preparing">Preparing</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        {filteredOrders.map((order) => {
          const urgency = getOrderUrgency(order)
          const remainingTime = calculateRemainingTime(order.estimatedCompletionTime)
          const elapsedTime = order.actualStartTime ? calculateElapsedTime(order.actualStartTime) : 0
          const statusConf = statusConfig[order.status]
          const StatusIcon = statusConf.icon

          return (
            <Card
              key={order.id}
              className={cn(
                "border-0 shadow-sm hover:shadow-md transition-shadow",
                urgency === "overdue" && "ring-2 ring-red-500 bg-red-50",
                urgency === "critical" && "ring-2 ring-orange-500 bg-orange-50",
                urgency === "warning" && "ring-2 ring-yellow-500 bg-yellow-50",
                order.status === "new" && "ring-2 ring-blue-500 bg-blue-50",
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={cn(
                        "p-2 rounded-lg",
                        order.priority === "urgent" && "bg-red-100",
                        order.priority === "high" && "bg-yellow-100",
                        order.priority === "normal" && "bg-gray-100",
                      )}
                    >
                      {order.table ? <Table className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold">{order.orderNumber}</CardTitle>
                      <p className="text-sm text-gray-600">
                        {order.table ? `${order.table} • ` : ""}
                        {order.customer}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.orderType.replace("-", " ")} • {order.server}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className={priorityConfig[order.priority].color}>
                      {priorityConfig[order.priority].label}
                    </Badge>
                    <div className="mt-1">
                      <Badge variant="outline" className={statusConf.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConf.label}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Timing Information */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Elapsed</div>
                      <div className="font-bold text-sm">{elapsedTime}m</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Remaining</div>
                      <div
                        className={cn(
                          "font-bold text-sm",
                          remainingTime < 0 && "text-red-600",
                          remainingTime < 5 && remainingTime >= 0 && "text-orange-600",
                          remainingTime >= 5 && "text-green-600",
                        )}
                      >
                        {remainingTime < 0 ? `+${Math.abs(remainingTime)}m` : `${remainingTime}m`}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Progress</div>
                    <div className="font-bold text-sm">
                      {order.completedItems}/{order.totalItems}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-2">
                  {order.items.map((item) => {
                    const stationConf = stationConfig[item.station]
                    const StationIcon = stationConf.icon
                    const itemElapsed = item.startedAt ? calculateElapsedTime(item.startedAt) : 0

                    return (
                      <div
                        key={item.id}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg border-2 transition-colors",
                          item.status === "pending" && "bg-gray-50 border-gray-200",
                          item.status === "preparing" && "bg-orange-50 border-orange-200",
                          item.status === "ready" && "bg-green-50 border-green-200",
                          item.status === "served" && "bg-gray-100 border-gray-300",
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className={stationConf.color}>
                            <StationIcon className="h-3 w-3 mr-1" />
                            {stationConf.label}
                          </Badge>
                          <div>
                            <div className="font-medium text-sm">
                              {item.quantity}x {item.name}
                            </div>
                            {item.modifications && item.modifications.length > 0 && (
                              <div className="text-xs text-blue-600">Mods: {item.modifications.join(", ")}</div>
                            )}
                            {item.notes && <div className="text-xs text-orange-600">Note: {item.notes}</div>}
                            {item.status === "preparing" && (
                              <div className="text-xs text-gray-500">Cooking for {itemElapsed}m</div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {item.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => updateItemStatus(order.id, item.id, "preparing")}
                              className="bg-orange-500 hover:bg-orange-600"
                            >
                              <Play className="h-3 w-3 mr-1" />
                              Start
                            </Button>
                          )}
                          {item.status === "preparing" && (
                            <Button
                              size="sm"
                              onClick={() => updateItemStatus(order.id, item.id, "ready")}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Ready
                            </Button>
                          )}
                          {item.status === "ready" && (
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Ready
                            </Badge>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Special Notes */}
                {order.notes && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="text-sm font-medium text-yellow-800 mb-1">Special Instructions:</div>
                    <div className="text-sm text-yellow-700">{order.notes}</div>
                  </div>
                )}

                {/* Order Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    Received: {new Date(order.receivedAt).toLocaleTimeString()}
                  </div>
                  <div className="flex space-x-2">
                    {order.status === "new" && (
                      <Button size="sm" onClick={() => startOrder(order.id)} className="bg-blue-500 hover:bg-blue-600">
                        <Play className="h-3 w-3 mr-1" />
                        Start Order
                      </Button>
                    )}
                    {order.status === "ready" && (
                      <Button
                        size="sm"
                        onClick={() => completeOrder(order.id)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Complete
                      </Button>
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
            <ChefHat className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders to display</h3>
          <p className="text-gray-600">All orders are completed or try adjusting your filters.</p>
        </div>
      )}
    </div>
  )
}
