"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Users,
  Star,
  DollarSign,
  ShoppingCart,
  Mail,
  Phone,
  Download,
} from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "inactive" | "vip"
  avatar?: string
  totalOrders: number
  totalSpent: number
  lastOrder: string
  joinedDate: string
  address: string
  city: string
  loyaltyPoints: number
  preferredTable?: string
  dietaryRestrictions: string[]
  notes?: string
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "+1 (555) 123-4567",
    status: "vip",
    totalOrders: 47,
    totalSpent: 1247.85,
    lastOrder: "2024-01-17 13:30:00",
    joinedDate: "2023-03-15 10:00:00",
    address: "123 Main St",
    city: "New York, NY",
    loyaltyPoints: 2495,
    preferredTable: "T05",
    dietaryRestrictions: ["Vegetarian"],
    notes: "Prefers window seating, regular customer",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@email.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    totalOrders: 23,
    totalSpent: 567.4,
    lastOrder: "2024-01-16 19:45:00",
    joinedDate: "2023-07-22 14:30:00",
    address: "456 Oak Ave",
    city: "Brooklyn, NY",
    loyaltyPoints: 1135,
    dietaryRestrictions: [],
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol.williams@email.com",
    phone: "+1 (555) 345-6789",
    status: "active",
    totalOrders: 15,
    totalSpent: 389.25,
    lastOrder: "2024-01-15 18:20:00",
    joinedDate: "2023-09-10 16:45:00",
    address: "789 Pine St",
    city: "Manhattan, NY",
    loyaltyPoints: 778,
    dietaryRestrictions: ["Gluten-Free"],
    notes: "Allergic to nuts",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david.brown@email.com",
    phone: "+1 (555) 456-7890",
    status: "inactive",
    totalOrders: 8,
    totalSpent: 156.8,
    lastOrder: "2023-12-20 12:15:00",
    joinedDate: "2023-11-05 11:20:00",
    address: "321 Elm St",
    city: "Queens, NY",
    loyaltyPoints: 314,
    dietaryRestrictions: [],
  },
  {
    id: "5",
    name: "Emma Davis",
    email: "emma.davis@email.com",
    phone: "+1 (555) 567-8901",
    status: "vip",
    totalOrders: 62,
    totalSpent: 1856.9,
    lastOrder: "2024-01-17 14:10:00",
    joinedDate: "2023-01-18 09:30:00",
    address: "654 Maple Ave",
    city: "Bronx, NY",
    loyaltyPoints: 3714,
    preferredTable: "T12",
    dietaryRestrictions: ["Vegan"],
    notes: "Birthday is March 15th, loves desserts",
  },
]

const statusConfig = {
  active: { color: "bg-green-100 text-green-800", label: "Active" },
  inactive: { color: "bg-gray-100 text-gray-800", label: "Inactive" },
  vip: { color: "bg-purple-100 text-purple-800", label: "VIP" },
}

export function CustomersManagement() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)

  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    name: "",
    email: "",
    phone: "",
    status: "active",
    address: "",
    city: "",
    loyaltyPoints: 0,
    totalOrders: 0,
    totalSpent: 0,
    dietaryRestrictions: [],
  })

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || customer.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const customerStats = {
    total: customers.length,
    active: customers.filter((c) => c.status === "active").length,
    vip: customers.filter((c) => c.status === "vip").length,
    inactive: customers.filter((c) => c.status === "inactive").length,
    totalRevenue: customers.reduce((sum, customer) => sum + customer.totalSpent, 0),
    averageSpent:
      customers.length > 0 ? customers.reduce((sum, customer) => sum + customer.totalSpent, 0) / customers.length : 0,
  }

  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.email) {
      const customer: Customer = {
        id: Date.now().toString(),
        name: newCustomer.name,
        email: newCustomer.email,
        phone: newCustomer.phone || "",
        status: (newCustomer.status as Customer["status"]) || "active",
        totalOrders: newCustomer.totalOrders || 0,
        totalSpent: newCustomer.totalSpent || 0,
        lastOrder: "Never",
        joinedDate: new Date().toISOString(),
        address: newCustomer.address || "",
        city: newCustomer.city || "",
        loyaltyPoints: newCustomer.loyaltyPoints || 0,
        dietaryRestrictions: newCustomer.dietaryRestrictions || [],
      }
      setCustomers([...customers, customer])
      resetForm()
    }
  }

  const resetForm = () => {
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      status: "active",
      address: "",
      city: "",
      loyaltyPoints: 0,
      totalOrders: 0,
      totalSpent: 0,
      dietaryRestrictions: [],
    })
    setIsAddDialogOpen(false)
    setEditingCustomer(null)
  }

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer)
    setNewCustomer(customer)
    setIsAddDialogOpen(true)
  }

  const handleUpdateCustomer = () => {
    if (editingCustomer && newCustomer.name && newCustomer.email) {
      const updatedCustomers = customers.map((customer) =>
        customer.id === editingCustomer.id ? ({ ...customer, ...newCustomer } as Customer) : customer,
      )
      setCustomers(updatedCustomers)
      resetForm()
    }
  }

  const handleDeleteCustomer = (id: string) => {
    setCustomers(customers.filter((customer) => customer.id !== id))
  }

  const formatDate = (dateString: string) => {
    if (dateString === "Never") return "Never"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">Manage customer information and loyalty programs</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-gray-300 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingCustomer(null)} className="bg-orange-500 hover:bg-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingCustomer ? "Edit Customer" : "Add New Customer"}</DialogTitle>
                <DialogDescription>
                  {editingCustomer ? "Update the customer details below." : "Fill in the details for the new customer."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newCustomer.name || ""}
                      onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newCustomer.email || ""}
                      onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={newCustomer.phone || ""}
                      onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newCustomer.status || "active"}
                      onValueChange={(value: Customer["status"]) => setNewCustomer({ ...newCustomer, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={newCustomer.address || ""}
                      onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                      placeholder="Enter address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={newCustomer.city || ""}
                      onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
                      placeholder="Enter city"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loyaltyPoints">Loyalty Points</Label>
                  <Input
                    id="loyaltyPoints"
                    type="number"
                    value={newCustomer.loyaltyPoints || ""}
                    onChange={(e) => setNewCustomer({ ...newCustomer, loyaltyPoints: Number.parseInt(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button
                  onClick={editingCustomer ? handleUpdateCustomer : handleAddCustomer}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {editingCustomer ? "Update Customer" : "Add Customer"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Customers</CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{customerStats.total}</div>
            <p className="text-xs text-gray-600 mt-1">All customers</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">VIP Customers</CardTitle>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Star className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{customerStats.vip}</div>
            <p className="text-xs text-gray-600 mt-1">Premium members</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${customerStats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-gray-600 mt-1">From all customers</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg. Spent</CardTitle>
            <div className="p-2 bg-orange-100 rounded-lg">
              <ShoppingCart className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${customerStats.averageSpent.toFixed(2)}</div>
            <p className="text-xs text-gray-600 mt-1">Per customer</p>
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
              {Object.entries(statusConfig).map(([status, config]) => (
                <SelectItem key={status} value={status}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Customers List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => {
          const statusConf = statusConfig[customer.status]

          return (
            <Card key={customer.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={customer.avatar || "/placeholder.svg"} alt={customer.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{customer.name}</CardTitle>
                      <p className="text-sm text-gray-600">{customer.email}</p>
                      <p className="text-xs text-gray-500">{customer.city}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditCustomer(customer)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Customer
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteCustomer(customer.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Customer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={statusConf.color}>
                    {customer.status === "vip" && <Star className="h-3 w-3 mr-1" />}
                    {statusConf.label}
                  </Badge>
                  <div className="text-right">
                    <div className="text-sm font-medium">{customer.loyaltyPoints} pts</div>
                    <div className="text-xs text-gray-500">Loyalty Points</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{customer.totalOrders}</div>
                    <div className="text-xs text-gray-600">Total Orders</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">${customer.totalSpent.toFixed(2)}</div>
                    <div className="text-xs text-gray-600">Total Spent</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Phone
                    </span>
                    <span className="text-gray-900">{customer.phone || "Not provided"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last Order</span>
                    <span className="text-gray-900">{formatDate(customer.lastOrder)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Joined</span>
                    <span className="text-gray-900">{formatDate(customer.joinedDate)}</span>
                  </div>
                  {customer.dietaryRestrictions.length > 0 && (
                    <div className="pt-2">
                      <div className="text-xs text-gray-600 mb-1">Dietary Restrictions</div>
                      <div className="flex flex-wrap gap-1">
                        {customer.dietaryRestrictions.map((restriction, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200"
                          >
                            {restriction}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {customer.notes && (
                    <div className="pt-2">
                      <div className="text-xs text-gray-600 mb-1">Notes</div>
                      <p className="text-xs text-gray-700 bg-gray-50 p-2 rounded">{customer.notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  )
}
