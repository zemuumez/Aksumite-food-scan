"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Minus, Search, ShoppingCart, CreditCard, Banknote, Trash2, User, Table, Receipt, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface MenuItem {
  id: string
  name: string
  price: number
  category: string
  image: string
  available: boolean
  preparationTime: number
}

interface OrderItem {
  id: string
  menuItem: MenuItem
  quantity: number
  notes?: string
  modifications?: string[]
}

interface Order {
  id: string
  items: OrderItem[]
  subtotal: number
  tax: number
  total: number
  customer?: string
  table?: string
  orderType: "dine-in" | "takeout" | "delivery"
  status: "pending" | "confirmed" | "preparing" | "ready" | "completed"
}

const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Grilled Chicken Burger",
    price: 15.99,
    category: "Burgers",
    image: "/grilled-chicken-burger.png",
    available: true,
    preparationTime: 15,
  },
  {
    id: "2",
    name: "Margherita Pizza",
    price: 18.5,
    category: "Pizza",
    image: "/margherita-pizza.png",
    available: true,
    preparationTime: 20,
  },
  {
    id: "3",
    name: "Caesar Salad",
    price: 12.0,
    category: "Salads",
    image: "/caesar-salad.png",
    available: true,
    preparationTime: 10,
  },
  {
    id: "4",
    name: "Fish & Chips",
    price: 16.75,
    category: "Mains",
    image: "/classic-fish-and-chips.png",
    available: true,
    preparationTime: 18,
  },
  {
    id: "5",
    name: "Chocolate Cake",
    price: 8.5,
    category: "Desserts",
    image: "/decadent-chocolate-cake.png",
    available: true,
    preparationTime: 5,
  },
  {
    id: "6",
    name: "Craft Beer",
    price: 7.99,
    category: "Beverages",
    image: "/craft-beer-selection.png",
    available: true,
    preparationTime: 2,
  },
  {
    id: "7",
    name: "Truffle Fries",
    price: 12.99,
    category: "Sides",
    image: "/truffle-parmesan-fries.png",
    available: true,
    preparationTime: 10,
  },
  {
    id: "8",
    name: "Ribeye Steak",
    price: 32.99,
    category: "Mains",
    image: "/grilled-ribeye.png",
    available: true,
    preparationTime: 25,
  },
]

const categories = ["All", "Burgers", "Pizza", "Salads", "Mains", "Desserts", "Beverages", "Sides"]

export function POSInterface() {
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [orderType, setOrderType] = useState<"dine-in" | "takeout" | "delivery">("dine-in")
  const [customerName, setCustomerName] = useState("")
  const [tableNumber, setTableNumber] = useState("")

  const filteredItems = mockMenuItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch && item.available
  })

  const addToOrder = (menuItem: MenuItem) => {
    const existingItem = currentOrder.find((item) => item.menuItem.id === menuItem.id)
    if (existingItem) {
      setCurrentOrder(
        currentOrder.map((item) =>
          item.menuItem.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      )
    } else {
      const newOrderItem: OrderItem = {
        id: Date.now().toString(),
        menuItem,
        quantity: 1,
      }
      setCurrentOrder([...currentOrder, newOrderItem])
    }
  }

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCurrentOrder(currentOrder.filter((item) => item.id !== itemId))
    } else {
      setCurrentOrder(currentOrder.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeFromOrder = (itemId: string) => {
    setCurrentOrder(currentOrder.filter((item) => item.id !== itemId))
  }

  const clearOrder = () => {
    setCurrentOrder([])
    setCustomerName("")
    setTableNumber("")
  }

  const subtotal = currentOrder.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0)
  const tax = subtotal * 0.08875 // 8.875% tax rate
  const total = subtotal + tax

  const processOrder = () => {
    // Process the order
    console.log("Processing order:", {
      items: currentOrder,
      subtotal,
      tax,
      total,
      customer: customerName,
      table: tableNumber,
      orderType,
    })
    clearOrder()
    alert("Order processed successfully!")
  }

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="flex gap-6 h-full">
        {/* Menu Items Section */}
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Point of Sale</h1>
              <p className="text-gray-600 mt-1">Select items to add to the current order</p>
            </div>
            <div className="flex items-center space-x-3">
              <Select
                value={orderType}
                onValueChange={(value: "dine-in" | "takeout" | "delivery") => setOrderType(value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dine-in">Dine In</SelectItem>
                  <SelectItem value="takeout">Takeout</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Search and Categories */}
          <div className="space-y-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    selectedCategory === category
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "border-gray-300 bg-transparent hover:bg-gray-50",
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => addToOrder(item)}
              >
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-white/90 text-gray-900">
                      {item.preparationTime}m
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">ETB {item.price.toFixed(2)}</span>
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="w-96">
          <Card className="border-0 shadow-sm h-full">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Current Order
                </CardTitle>
                {currentOrder.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearOrder} className="text-red-600 hover:text-red-700">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                {orderType === "dine-in" && (
                  <div className="flex items-center space-x-2">
                    <Table className="h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Table number"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="text-sm"
                    />
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Customer name (optional)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="text-sm"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              {/* Order Items */}
              <div className="flex-1 space-y-3 mb-4 max-h-96 overflow-y-auto">
                {currentOrder.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No items in order</p>
                    <p className="text-sm">Select items from the menu to add them</p>
                  </div>
                ) : (
                  currentOrder.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.menuItem.image || "/placeholder.svg"}
                        alt={item.menuItem.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.menuItem.name}</h4>
                        <p className="text-sm text-gray-600">ETB {item.menuItem.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromOrder(item.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Order Summary */}
              {currentOrder.length > 0 && (
                <div className="space-y-4">
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>ETB {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax (8.875%):</span>
                      <span>ETB {tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>ETB {total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Payment Buttons */}
                  <div className="space-y-2">
                    <Button
                      onClick={processOrder}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      size="lg"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Process Payment
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                        <Banknote className="h-4 w-4 mr-2" />
                        Cash
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                        <Receipt className="h-4 w-4 mr-2" />
                        Print
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
