"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Download, Search, Filter, CreditCard, TrendingUp, AlertCircle, Users } from "lucide-react"

const creditBalanceData = [
  {
    id: "1",
    customerName: "Alice Johnson",
    email: "alice.johnson@email.com",
    creditBalance: 125.5,
    totalCredits: 450.75,
    totalDebits: 325.25,
    lastTransaction: "2024-01-17",
    status: "active",
    loyaltyTier: "vip",
  },
  {
    id: "2",
    customerName: "Bob Smith",
    email: "bob.smith@email.com",
    creditBalance: 75.25,
    totalCredits: 200.0,
    totalDebits: 124.75,
    lastTransaction: "2024-01-16",
    status: "active",
    loyaltyTier: "regular",
  },
  {
    id: "3",
    customerName: "Carol Williams",
    email: "carol.williams@email.com",
    creditBalance: 0.0,
    totalCredits: 150.0,
    totalDebits: 150.0,
    lastTransaction: "2024-01-15",
    status: "active",
    loyaltyTier: "regular",
  },
  {
    id: "4",
    customerName: "David Brown",
    email: "david.brown@email.com",
    creditBalance: -25.5,
    totalCredits: 50.0,
    totalDebits: 75.5,
    lastTransaction: "2024-01-14",
    status: "overdue",
    loyaltyTier: "regular",
  },
  {
    id: "5",
    customerName: "Emma Davis",
    email: "emma.davis@email.com",
    creditBalance: 250.75,
    totalCredits: 800.0,
    totalDebits: 549.25,
    lastTransaction: "2024-01-17",
    status: "active",
    loyaltyTier: "vip",
  },
]

const creditTransactions = [
  {
    id: "1",
    customerName: "Alice Johnson",
    type: "credit",
    amount: 50.0,
    description: "Refund for cancelled order #1234",
    date: "2024-01-17 14:30:00",
    status: "completed",
  },
  {
    id: "2",
    customerName: "Bob Smith",
    type: "debit",
    amount: 25.5,
    description: "Payment for order #1235",
    date: "2024-01-16 19:45:00",
    status: "completed",
  },
  {
    id: "3",
    customerName: "Emma Davis",
    type: "credit",
    amount: 100.0,
    description: "Loyalty bonus credit",
    date: "2024-01-15 10:15:00",
    status: "completed",
  },
]

export function CreditBalanceReport() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedTier, setSelectedTier] = useState("all")

  const filteredData = creditBalanceData.filter((customer) => {
    const matchesSearch =
      customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || customer.status === selectedStatus
    const matchesTier = selectedTier === "all" || customer.loyaltyTier === selectedTier
    return matchesSearch && matchesStatus && matchesTier
  })

  const totalStats = {
    totalCustomers: creditBalanceData.length,
    totalCredits: creditBalanceData.reduce((sum, customer) => sum + customer.totalCredits, 0),
    totalDebits: creditBalanceData.reduce((sum, customer) => sum + customer.totalDebits, 0),
    netBalance: creditBalanceData.reduce((sum, customer) => sum + customer.creditBalance, 0),
    overdueAccounts: creditBalanceData.filter((customer) => customer.status === "overdue").length,
    activeCredits: creditBalanceData.filter((customer) => customer.creditBalance > 0).length,
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "vip":
        return "bg-purple-100 text-purple-800"
      case "regular":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Credit Balance Report</h1>
          <p className="text-gray-600 mt-1">Monitor customer credit balances and payment history</p>
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
            <CardTitle className="text-sm font-medium text-gray-600">Total Customers</CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalStats.totalCustomers}</div>
            <p className="text-xs text-gray-600 mt-1">With credit accounts</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Net Balance</CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <CreditCard className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${totalStats.netBalance.toFixed(2)}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Total outstanding credits
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Credits</CardTitle>
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalStats.activeCredits}</div>
            <p className="text-xs text-gray-600 mt-1">Customers with positive balance</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Overdue Accounts</CardTitle>
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalStats.overdueAccounts}</div>
            <p className="text-xs text-gray-600 mt-1">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-300"
          />
        </div>
        <div className="flex gap-3">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-32 border-gray-300">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedTier} onValueChange={setSelectedTier}>
            <SelectTrigger className="w-32 border-gray-300">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Tiers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="vip">VIP</SelectItem>
              <SelectItem value="regular">Regular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Credit Balance Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Customer Credit Balances</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredData.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" alt={customer.customerName} />
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {customer.customerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{customer.customerName}</h3>
                      <Badge variant="outline" className={getTierColor(customer.loyaltyTier)}>
                        {customer.loyaltyTier.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{customer.email}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <Badge variant="outline" className={getStatusColor(customer.status)}>
                        {customer.status}
                      </Badge>
                      <span className="text-xs text-gray-500">Last: {formatDate(customer.lastTransaction)}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-6 text-right">
                  <div>
                    <div
                      className={`text-lg font-bold ${customer.creditBalance >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      ${Math.abs(customer.creditBalance).toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-600">{customer.creditBalance >= 0 ? "Credit" : "Overdue"}</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">${customer.totalCredits.toFixed(2)}</div>
                    <div className="text-xs text-gray-600">Total Credits</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">${customer.totalDebits.toFixed(2)}</div>
                    <div className="text-xs text-gray-600">Total Debits</div>
                  </div>
                  <div>
                    <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Recent Credit Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {creditTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <CreditCard
                      className={`h-5 w-5 ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{transaction.customerName}</h3>
                    <p className="text-sm text-gray-600">{transaction.description}</p>
                    <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-lg font-bold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
