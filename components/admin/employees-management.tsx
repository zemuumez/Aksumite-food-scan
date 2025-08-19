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
  Clock,
  DollarSign,
  Calendar,
  Download,
  Phone,
  Mail,
} from "lucide-react"

interface Employee {
  id: string
  name: string
  email: string
  phone: string
  position: string
  department: string
  status: "active" | "inactive" | "on_leave"
  avatar?: string
  hireDate: string
  salary: number
  hoursWorked: number
  performance: number
  shift: "morning" | "afternoon" | "evening" | "night"
  address: string
  emergencyContact: string
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@foodscan.com",
    phone: "+1 (555) 123-4567",
    position: "Restaurant Manager",
    department: "Management",
    status: "active",
    hireDate: "2023-01-15",
    salary: 65000,
    hoursWorked: 160,
    performance: 95,
    shift: "morning",
    address: "123 Main St, New York, NY",
    emergencyContact: "John Johnson - (555) 987-6543",
  },
  {
    id: "2",
    name: "Mike Rodriguez",
    email: "mike.rodriguez@foodscan.com",
    phone: "+1 (555) 234-5678",
    position: "Server",
    department: "Front of House",
    status: "active",
    hireDate: "2023-03-22",
    salary: 35000,
    hoursWorked: 140,
    performance: 88,
    shift: "evening",
    address: "456 Oak Ave, Brooklyn, NY",
    emergencyContact: "Maria Rodriguez - (555) 876-5432",
  },
  {
    id: "3",
    name: "Lisa Chen",
    email: "lisa.chen@foodscan.com",
    phone: "+1 (555) 345-6789",
    position: "Cashier",
    department: "Front of House",
    status: "active",
    hireDate: "2023-05-10",
    salary: 32000,
    hoursWorked: 120,
    performance: 92,
    shift: "afternoon",
    address: "789 Pine St, Manhattan, NY",
    emergencyContact: "David Chen - (555) 765-4321",
  },
  {
    id: "4",
    name: "Tom Wilson",
    email: "tom.wilson@foodscan.com",
    phone: "+1 (555) 456-7890",
    position: "Maintenance",
    department: "Operations",
    status: "on_leave",
    hireDate: "2022-11-08",
    salary: 42000,
    hoursWorked: 80,
    performance: 85,
    shift: "morning",
    address: "321 Elm St, Queens, NY",
    emergencyContact: "Jane Wilson - (555) 654-3210",
  },
  {
    id: "5",
    name: "Emma Davis",
    email: "emma.davis@foodscan.com",
    phone: "+1 (555) 567-8901",
    position: "Host",
    department: "Front of House",
    status: "active",
    hireDate: "2023-07-18",
    salary: 30000,
    hoursWorked: 130,
    performance: 90,
    shift: "evening",
    address: "654 Maple Ave, Bronx, NY",
    emergencyContact: "Robert Davis - (555) 543-2109",
  },
]

const statusConfig = {
  active: { color: "bg-green-100 text-green-800", label: "Active" },
  inactive: { color: "bg-gray-100 text-gray-800", label: "Inactive" },
  on_leave: { color: "bg-yellow-100 text-yellow-800", label: "On Leave" },
}

const shiftConfig = {
  morning: { color: "bg-blue-100 text-blue-800", label: "Morning" },
  afternoon: { color: "bg-orange-100 text-orange-800", label: "Afternoon" },
  evening: { color: "bg-purple-100 text-purple-800", label: "Evening" },
  night: { color: "bg-gray-100 text-gray-800", label: "Night" },
}

export function EmployeesManagement() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)

  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    status: "active",
    salary: 0,
    shift: "morning",
    address: "",
    emergencyContact: "",
  })

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || employee.status === selectedStatus
    const matchesDepartment = selectedDepartment === "all" || employee.department === selectedDepartment
    return matchesSearch && matchesStatus && matchesDepartment
  })

  const employeeStats = {
    total: employees.length,
    active: employees.filter((e) => e.status === "active").length,
    onLeave: employees.filter((e) => e.status === "on_leave").length,
    inactive: employees.filter((e) => e.status === "inactive").length,
    avgPerformance: employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length,
    totalPayroll: employees.reduce((sum, emp) => sum + emp.salary, 0),
  }

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.email) {
      const employee: Employee = {
        id: Date.now().toString(),
        name: newEmployee.name,
        email: newEmployee.email,
        phone: newEmployee.phone || "",
        position: newEmployee.position || "",
        department: newEmployee.department || "",
        status: (newEmployee.status as Employee["status"]) || "active",
        hireDate: new Date().toISOString().split("T")[0],
        salary: newEmployee.salary || 0,
        hoursWorked: 0,
        performance: 0,
        shift: (newEmployee.shift as Employee["shift"]) || "morning",
        address: newEmployee.address || "",
        emergencyContact: newEmployee.emergencyContact || "",
      }
      setEmployees([...employees, employee])
      resetForm()
    }
  }

  const resetForm = () => {
    setNewEmployee({
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      status: "active",
      salary: 0,
      shift: "morning",
      address: "",
      emergencyContact: "",
    })
    setIsAddDialogOpen(false)
    setEditingEmployee(null)
  }

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee)
    setNewEmployee(employee)
    setIsAddDialogOpen(true)
  }

  const handleUpdateEmployee = () => {
    if (editingEmployee && newEmployee.name && newEmployee.email) {
      const updatedEmployees = employees.map((employee) =>
        employee.id === editingEmployee.id ? ({ ...employee, ...newEmployee } as Employee) : employee,
      )
      setEmployees(updatedEmployees)
      resetForm()
    }
  }

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter((employee) => employee.id !== id))
  }

  const formatDate = (dateString: string) => {
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
          <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
          <p className="text-gray-600 mt-1">Manage staff members and their information</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-gray-300 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingEmployee(null)} className="bg-orange-500 hover:bg-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingEmployee ? "Edit Employee" : "Add New Employee"}</DialogTitle>
                <DialogDescription>
                  {editingEmployee ? "Update the employee details below." : "Fill in the details for the new employee."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newEmployee.name || ""}
                      onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newEmployee.email || ""}
                      onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={newEmployee.phone || ""}
                      onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={newEmployee.position || ""}
                      onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                      placeholder="Enter position"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={newEmployee.department || ""}
                      onValueChange={(value) => setNewEmployee({ ...newEmployee, department: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Management">Management</SelectItem>
                        <SelectItem value="Front of House">Front of House</SelectItem>
                        <SelectItem value="Back of House">Back of House</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shift">Shift</Label>
                    <Select
                      value={newEmployee.shift || "morning"}
                      onValueChange={(value: Employee["shift"]) => setNewEmployee({ ...newEmployee, shift: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select shift" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning</SelectItem>
                        <SelectItem value="afternoon">Afternoon</SelectItem>
                        <SelectItem value="evening">Evening</SelectItem>
                        <SelectItem value="night">Night</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salary">Annual Salary</Label>
                    <Input
                      id="salary"
                      type="number"
                      value={newEmployee.salary || ""}
                      onChange={(e) => setNewEmployee({ ...newEmployee, salary: Number.parseInt(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newEmployee.status || "active"}
                      onValueChange={(value: Employee["status"]) => setNewEmployee({ ...newEmployee, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="on_leave">On Leave</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button
                  onClick={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {editingEmployee ? "Update Employee" : "Add Employee"}
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
            <CardTitle className="text-sm font-medium text-gray-600">Total Employees</CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{employeeStats.total}</div>
            <p className="text-xs text-gray-600 mt-1">All staff members</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Staff</CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{employeeStats.active}</div>
            <p className="text-xs text-gray-600 mt-1">Currently working</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Performance</CardTitle>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{employeeStats.avgPerformance.toFixed(1)}%</div>
            <p className="text-xs text-gray-600 mt-1">Team average</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Payroll</CardTitle>
            <div className="p-2 bg-orange-100 rounded-lg">
              <DollarSign className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${employeeStats.totalPayroll.toLocaleString()}</div>
            <p className="text-xs text-gray-600 mt-1">Annual total</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search employees..."
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
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-40 border-gray-300">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Management">Management</SelectItem>
              <SelectItem value="Front of House">Front of House</SelectItem>
              <SelectItem value="Back of House">Back of House</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Employees List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => {
          const statusConf = statusConfig[employee.status]
          const shiftConf = shiftConfig[employee.shift]

          return (
            <Card key={employee.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{employee.name}</CardTitle>
                      <p className="text-sm text-gray-600">{employee.position}</p>
                      <p className="text-xs text-gray-500">{employee.department}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditEmployee(employee)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Employee
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove Employee
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={statusConf.color}>
                    {statusConf.label}
                  </Badge>
                  <Badge variant="outline" className={shiftConf.color}>
                    {shiftConf.label}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{employee.performance}%</div>
                    <div className="text-xs text-gray-600">Performance</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{employee.hoursWorked}h</div>
                    <div className="text-xs text-gray-600">Hours Worked</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Phone
                    </span>
                    <span className="text-gray-900">{employee.phone || "Not provided"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Salary
                    </span>
                    <span className="text-gray-900">${employee.salary.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Hire Date</span>
                    <span className="text-gray-900">{formatDate(employee.hireDate)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  )
}
