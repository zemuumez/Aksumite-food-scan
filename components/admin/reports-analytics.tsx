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
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { Download, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Clock, Calendar, FileText } from "lucide-react"

const salesData = [
  { name: "Mon", revenue: 2400, orders: 45 },
  { name: "Tue", revenue: 1398, orders: 32 },
  { name: "Wed", revenue: 9800, orders: 78 },
  { name: "Thu", revenue: 3908, orders: 56 },
  { name: "Fri", revenue: 4800, orders: 89 },
  { name: "Sat", revenue: 3800, orders: 67 },
  { name: "Sun", revenue: 4300, orders: 72 },
]

const menuPerformanceData = [
  { name: "Grilled Chicken Burger", orders: 145, revenue: 2319.55 },
  { name: "Margherita Pizza", orders: 98, revenue: 1813.0 },
  { name: "Caesar Salad", orders: 87, revenue: 1044.0 },
  { name: "Fish & Chips", orders: 76, revenue: 1273.0 },
  { name: "Chocolate Cake", orders: 65, revenue: 552.5 },
]

const orderStatusData = [
  { name: "Completed", value: 342, color: "#10b981" },
  { name: "Cancelled", value: 23, color: "#ef4444" },
  { name: "Refunded", value: 8, color: "#f59e0b" },
]

const hourlyOrdersData = [
  { hour: "6AM", orders: 5 },
  { hour: "7AM", orders: 12 },
  { hour: "8AM", orders: 25 },
  { hour: "9AM", orders: 18 },
  { hour: "10AM", orders: 15 },
  { hour: "11AM", orders: 22 },
  { hour: "12PM", orders: 45 },
  { hour: "1PM", orders: 52 },
  { hour: "2PM", orders: 38 },
  { hour: "3PM", orders: 28 },
  { hour: "4PM", orders: 20 },
  { hour: "5PM", orders: 35 },
  { hour: "6PM", orders: 48 },
  { hour: "7PM", orders: 55 },
  { hour: "8PM", orders: 42 },
  { hour: "9PM", orders: 30 },
  { hour: "10PM", orders: 18 },
  { hour: "11PM", orders: 8 },
]

const staffPerformanceData = [
  { name: "Sarah Manager", orders: 156, revenue: 3245.67, efficiency: 95 },
  { name: "Mike Operator", orders: 134, revenue: 2876.43, efficiency: 92 },
  { name: "Lisa Chef", orders: 189, revenue: 4123.89, efficiency: 98 },
  { name: "Tom Wilson", orders: 98, revenue: 1987.23, efficiency: 87 },
]

export function ReportsAnalytics() {
  const [dateRange, setDateRange] = useState("7days")
  const [reportType, setReportType] = useState("overview")

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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your restaurant performance.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-40">
              <FileText className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="sales">Sales Report</SelectItem>
              <SelectItem value="menu">Menu Performance</SelectItem>
              <SelectItem value="staff">Staff Performance</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$45,231.89</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +20.1% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">2,350</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +180.1% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Order Value</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$19.25</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -4.3% from last period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Prep Time</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">16.2 min</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              -2.1 min improvement
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Orders Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Orders Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar yAxisId="left" dataKey="revenue" fill="var(--color-revenue)" name="Revenue ($)" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="orders"
                    stroke="var(--color-orders)"
                    strokeWidth={2}
                    name="Orders"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Order Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Orders Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Hourly Order Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyOrdersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="orders" fill="var(--color-orders)" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Data Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Menu Performance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Top Menu Items</CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {menuPerformanceData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Badge variant="outline">#{index + 1}</Badge>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.orders} orders</p>
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

        {/* Staff Performance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Staff Performance</CardTitle>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staffPerformanceData.map((staff) => (
                <div key={staff.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">{staff.name.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{staff.name}</p>
                      <p className="text-sm text-gray-600">{staff.orders} orders processed</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${staff.revenue.toFixed(2)}</p>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={staff.efficiency >= 95 ? "default" : staff.efficiency >= 90 ? "secondary" : "outline"}
                      >
                        {staff.efficiency}% efficiency
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Peak Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Lunch Rush</span>
                <span className="font-semibold">12:00 PM - 2:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Dinner Rush</span>
                <span className="font-semibold">6:00 PM - 8:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Busiest Day</span>
                <span className="font-semibold">Friday</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Repeat Customers</span>
                <span className="font-semibold">68%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg Visit Frequency</span>
                <span className="font-semibold">2.3x/week</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Customer Satisfaction</span>
                <span className="font-semibold">4.6/5.0</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Food Cost %</span>
                <span className="font-semibold">28.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Labor Cost %</span>
                <span className="font-semibold">32.1%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Profit Margin</span>
                <span className="font-semibold text-green-600">39.4%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
