"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Download, Search, Filter, TrendingUp, TrendingDown, Package, Star, AlertTriangle } from "lucide-react"

const itemsPerformanceData = [
  {
    id: "1",
    name: "Grilled Chicken Burger",
    category: "Main Courses",
    orders: 234,
    revenue: 4567.89,
    cost: 1825.45,
    profit: 2742.44,
    margin: 60.1,
    rating: 4.8,
    stock: 45,
    status: "active",
    trend: "up",
  },
  {
    id: "2",
    name: "Margherita Pizza",
    category: "Main Courses",
    orders: 198,
    revenue: 3890.45,
    cost: 1556.18,
    profit: 2334.27,
    margin: 60.0,
    rating: 4.6,
    stock: 32,
    status: "active",
    trend: "up",
  },
  {
    id: "3",
    name: "Caesar Salad",
    category: "Appetizers",
    orders: 156,
    revenue: 2345.67,
    cost: 703.7,
    profit: 1641.97,
    margin: 70.0,
    rating: 4.4,
    stock: 78,
    status: "active",
    trend: "down",
  },
  {
    id: "4",
    name: "Fish & Chips",
    category: "Main Courses",
    orders: 167,
    revenue: 3456.78,
    cost: 1728.39,
    profit: 1728.39,
    margin: 50.0,
    rating: 4.2,
    stock: 23,
    status: "low_stock",
    trend: "up",
  },
  {
    id: "5",
    name: "Chocolate Lava Cake",
    category: "Desserts",
    orders: 89,
    revenue: 1234.56,
    cost: 370.37,
    profit: 864.19,
    margin: 70.0,
    rating: 4.9,
    stock: 56,
    status: "active",
    trend: "up",
  },
]

const categoryPerformance = [
  { category: "Main Courses", orders: 599, revenue: 11914.12, items: 12 },
  { category: "Appetizers", orders: 312, revenue: 4567.89, items: 8 },
  { category: "Desserts", orders: 234, revenue: 3456.78, items: 6 },
  { category: "Beverages", orders: 567, revenue: 2345.67, items: 15 },
  { category: "Sides", orders: 123, revenue: 1234.56, items: 5 },
]

export function ItemsReport() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("orders")

  const filteredItems = itemsPerformanceData.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "orders":
        return b.orders - a.orders
      case "revenue":
        return b.revenue - a.revenue
      case "profit":
        return b.profit - a.profit
      case "margin":
        return b.margin - a.margin
      default:
        return 0
    }
  })

  const totalStats = {
    totalItems: itemsPerformanceData.length,
    totalOrders: itemsPerformanceData.reduce((sum, item) => sum + item.orders, 0),
    totalRevenue: itemsPerformanceData.reduce((sum, item) => sum + item.revenue, 0),
    totalProfit: itemsPerformanceData.reduce((sum, item) => sum + item.profit, 0),
    avgMargin: itemsPerformanceData.reduce((sum, item) => sum + item.margin, 0) / itemsPerformanceData.length,
    lowStockItems: itemsPerformanceData.filter((item) => item.status === "low_stock").length,
  }

  const chartConfig = {
    orders: {
      label: "Orders",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Items Report</h1>
          <p className="text-gray-600 mt-1">Detailed menu item performance and inventory analysis</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-gray-300 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Items</CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalStats.totalItems}</div>
            <p className="text-xs text-gray-600 mt-1">Active menu items</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${totalStats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-gray-600 mt-1">From all items</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Profit Margin</CardTitle>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Star className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalStats.avgMargin.toFixed(1)}%</div>
            <p className="text-xs text-gray-600 mt-1">Average across items</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Low Stock Items</CardTitle>
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalStats.lowStockItems}</div>
            <p className="text-xs text-gray-600 mt-1">Need restocking</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Performance Chart */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Category Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="orders" fill="var(--color-orders)" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-300"
          />
        </div>
        <div className="flex gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40 border-gray-300">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Main Courses">Main Courses</SelectItem>
              <SelectItem value="Appetizers">Appetizers</SelectItem>
              <SelectItem value="Desserts">Desserts</SelectItem>
              <SelectItem value="Beverages">Beverages</SelectItem>
              <SelectItem value="Sides">Sides</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32 border-gray-300">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="orders">Orders</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="profit">Profit</SelectItem>
              <SelectItem value="margin">Margin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Items Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Item Performance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Package className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      {item.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {item.category}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{item.rating}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          item.status === "low_stock"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-green-50 text-green-700 border-green-200"
                        }
                      >
                        {item.status === "low_stock" ? `Low Stock (${item.stock})` : `In Stock (${item.stock})`}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-6 text-right">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{item.orders}</div>
                    <div className="text-xs text-gray-600">Orders</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">${item.revenue.toFixed(2)}</div>
                    <div className="text-xs text-gray-600">Revenue</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">${item.profit.toFixed(2)}</div>
                    <div className="text-xs text-gray-600">Profit</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{item.margin.toFixed(1)}%</div>
                    <div className="text-xs text-gray-600">Margin</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
