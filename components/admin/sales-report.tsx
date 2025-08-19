"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Download, TrendingUp, DollarSign, ShoppingCart, Calendar, Filter } from "lucide-react"

const dailySalesData = [
  { date: "Jan 1", revenue: 2400, orders: 45, avgOrder: 53.33 },
  { date: "Jan 2", revenue: 1398, orders: 32, avgOrder: 43.69 },
  { date: "Jan 3", revenue: 9800, orders: 78, avgOrder: 125.64 },
  { date: "Jan 4", revenue: 3908, orders: 56, avgOrder: 69.79 },
  { date: "Jan 5", revenue: 4800, orders: 89, avgOrder: 53.93 },
  { date: "Jan 6", revenue: 3800, orders: 67, avgOrder: 56.72 },
  { date: "Jan 7", revenue: 4300, orders: 72, avgOrder: 59.72 },
]

const monthlySalesData = [
  { month: "Jan", revenue: 45231, orders: 892, growth: 12.5 },
  { month: "Feb", revenue: 52341, orders: 1024, growth: 15.7 },
  { month: "Mar", revenue: 48923, orders: 967, growth: -6.5 },
  { month: "Apr", revenue: 61234, orders: 1156, growth: 25.2 },
  { month: "May", revenue: 58912, orders: 1089, growth: -3.8 },
  { month: "Jun", revenue: 67845, orders: 1234, growth: 15.2 },
]

const salesByCategory = [
  { category: "Main Courses", revenue: 28450, percentage: 42.1, orders: 456 },
  { category: "Appetizers", revenue: 15230, percentage: 22.5, orders: 312 },
  { category: "Beverages", revenue: 12890, percentage: 19.1, orders: 567 },
  { category: "Desserts", revenue: 8920, percentage: 13.2, orders: 234 },
  { category: "Sides", revenue: 2110, percentage: 3.1, orders: 123 },
]

const topSalesItems = [
  { name: "Grilled Chicken Burger", revenue: 4567.89, orders: 234, avgPrice: 19.52 },
  { name: "Margherita Pizza", revenue: 3890.45, orders: 198, avgPrice: 19.65 },
  { category: "Caesar Salad", revenue: 2345.67, orders: 156, avgPrice: 15.04 },
  { name: "Fish & Chips", revenue: 3456.78, orders: 167, avgPrice: 20.7 },
  { name: "Chocolate Lava Cake", revenue: 1234.56, orders: 89, avgPrice: 13.87 },
]

export function SalesReport() {
  const [dateRange, setDateRange] = useState("30days")
  const [viewType, setViewType] = useState("daily")

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-1))",
    },
    orders: {
      label: "Orders",
      color: "hsl(var(--chart-2))",
    },
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Report</h1>
          <p className="text-gray-600 mt-1">Detailed sales performance and revenue analysis</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40 border-gray-300">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={viewType} onValueChange={setViewType}>
            <SelectTrigger className="w-32 border-gray-300">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$67,845.23</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +15.2% from last period
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingCart className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1,234</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.7% from last period
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Average Order Value</CardTitle>
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$54.98</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +6.1% from last period
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Growth Rate</CardTitle>
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">+15.2%</div>
            <div className="flex items-center text-xs text-gray-600 mt-1">Month over month</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Trend */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Daily Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                    name="Revenue ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Comparison */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Monthly Revenue Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" name="Revenue ($)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Category */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesByCategory.map((category) => (
                <div key={category.category} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{category.category}</p>
                      <p className="text-sm text-gray-600">{category.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${category.revenue.toLocaleString()}</p>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                      {category.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Selling Items */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Top Selling Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSalesItems.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Badge variant="outline">#{index + 1}</Badge>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.orders} orders • ${item.avgPrice} avg
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${item.revenue.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
