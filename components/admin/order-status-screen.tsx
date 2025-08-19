"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface MenuItem {
  id: string
  name: string
  price: number
  image: string
  category: string
}

interface OrderStatus {
  orderNumber: string
  status: "preparing" | "ready"
  items: string[]
  estimatedTime?: number
}

const popularMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Mojito",
    price: 45.0,
    image: "/refreshing-mojito.png",
    category: "Beverages",
  },
  {
    id: "2",
    name: "Homemade Mashed Potato",
    price: 35.0,
    image: "/creamy-mashed-potatoes.png",
    category: "Side Orders",
  },
  {
    id: "3",
    name: "French Fries",
    price: 25.0,
    image: "/crispy-french-fries.png",
    category: "Side Orders",
  },
  {
    id: "4",
    name: "Baked Potato",
    price: 35.0,
    image: "/baked-potato.png",
    category: "Side Orders",
  },
  {
    id: "5",
    name: "Vegan Hum-burger with Cheese",
    price: 55.0,
    image: "/vegan-burger.png",
    category: "Burgers",
  },
  {
    id: "6",
    name: "Cappuccino",
    price: 35.0,
    image: "/cappuccino-coffee.png",
    category: "Beverages",
  },
  {
    id: "7",
    name: "Szechuan Shrimp",
    price: 95.0,
    image: "/szechuan-shrimp.png",
    category: "Seafood",
  },
  {
    id: "8",
    name: "Chicken Mushroom",
    price: 75.0,
    image: "/chicken-mushroom-dish.png",
    category: "Main Course",
  },
  {
    id: "9",
    name: "American BBQ Double",
    price: 125.0,
    image: "/bbq-burger.png",
    category: "Burgers",
  },
]

const mockOrderStatuses: OrderStatus[] = [
  {
    orderNumber: "0103",
    status: "preparing",
    items: ["Grilled Chicken Burger", "Caesar Salad"],
    estimatedTime: 8,
  },
  {
    orderNumber: "0104",
    status: "ready",
    items: ["Margherita Pizza", "Craft Beer"],
  },
  {
    orderNumber: "0105",
    status: "ready",
    items: ["Fish & Chips", "Chocolate Cake"],
  },
]

export function OrderStatusScreen() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [orderStatuses, setOrderStatuses] = useState<OrderStatus[]>(mockOrderStatuses)

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const preparingOrders = orderStatuses.filter((order) => order.status === "preparing")
  const readyOrders = orderStatuses.filter((order) => order.status === "ready")

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-12 gap-8 h-full">
        {/* Left Side - Popular Menu Items */}
        <div className="col-span-7">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Popular Menu Items</h2>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {popularMenuItems.map((item) => (
              <Card key={item.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className="mb-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 text-sm mb-2 min-h-[2.5rem] flex items-center justify-center">
                    {item.name}
                  </h3>
                  <p className="text-blue-600 font-bold text-lg">ETB{item.price.toFixed(2)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Side - Order Status */}
        <div className="col-span-5">
          <div className="grid grid-cols-2 gap-4 h-full">
            {/* Preparing Column */}
            <div className="bg-blue-500 rounded-lg p-6 text-white">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold">Preparing</h3>
              </div>

              <div className="space-y-6">
                {preparingOrders.map((order) => (
                  <div key={order.orderNumber} className="text-center">
                    <div className="text-6xl font-bold mb-2">{order.orderNumber}</div>
                    {order.estimatedTime && <div className="text-sm opacity-90">Est. {order.estimatedTime} min</div>}
                  </div>
                ))}

                {preparingOrders.length === 0 && (
                  <div className="text-center text-blue-200 text-lg">No orders preparing</div>
                )}
              </div>
            </div>

            {/* Ready Column */}
            <div className="bg-green-500 rounded-lg p-6 text-white">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold">Ready</h3>
              </div>

              <div className="space-y-6">
                {readyOrders.map((order) => (
                  <div key={order.orderNumber} className="text-center">
                    <div className="text-6xl font-bold mb-2">{order.orderNumber}</div>
                    <div className="text-sm opacity-90">Ready for pickup</div>
                  </div>
                ))}

                {readyOrders.length === 0 && <div className="text-center text-green-200 text-lg">No orders ready</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
