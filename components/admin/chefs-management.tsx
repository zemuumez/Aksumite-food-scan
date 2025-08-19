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
  Clock,
  Award,
  ChefHat,
  Download,
  Phone,
  Mail,
  Star,
} from "lucide-react"

interface Chef {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "inactive" | "on_break"
  avatar?: string
  hireDate: string
  specialty: string
  station: string
  ordersCompleted: number
  avgPrepTime: number
  rating: number
  shift: "morning" | "afternoon" | "evening" | "night"
  experienceYears: number
  certifications: string[]
  performance: number
}

const mockChefs: Chef[] = [
  {
    id: "1",
    name: "Marco Rossi",
    email: "marco.rossi@foodscan.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    hireDate: "2022-08-15",
    specialty: "Italian Cuisine",
    station: "Grill Station",
    ordersCompleted: 1250,
    avgPrepTime: 12.5,
    rating: 4.9,
    shift: "evening",
    experienceYears: 8,
    certifications: ["ServSafe", "Culinary Arts Degree"],
    performance: 96,
  },
  {
    id: "2",
    name: "Yuki Tanaka",
    email: "yuki.tanaka@foodscan.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    hireDate: "2023-01-20",
    specialty: "Japanese Cuisine",
    station: "Sushi Bar",
    ordersCompleted: 890,
    avgPrepTime: 8.2,
    rating: 4.8,
    shift: "afternoon",
    experienceYears: 6,
    certifications: ["ServSafe", "Sushi Certification"],
    performance: 94,
  },
  {
    id: "3",
    name: "Carlos Mendez",
    email: "carlos.mendez@foodscan.com",
    phone: "+1 (555) 345-6789",
    status: "on_break",
    hireDate: "2022-11-10",
    specialty: "Mexican Cuisine",
    station: "Prep Station",
    ordersCompleted: 1100,
    avgPrepTime: 10.8,
    rating: 4.7,
    shift: "morning",
    experienceYears: 5,
    certifications: ["ServSafe", "Food Handler"],
    performance: 91,
  },
  {
    id: "4",
    name: "Sophie Laurent",
    email: "sophie.laurent@foodscan.com",
    phone: "+1 (555) 456-7890",
    status: "active",
    hireDate: "2023-03-05",
    specialty: "French Pastry",
    station: "Pastry Station",
    ordersCompleted: 650,
    avgPrepTime: 15.3,
    rating: 4.6,
    shift: "morning",
    experienceYears: 4,
    certifications: ["Pastry Arts Diploma", "ServSafe"],
    performance: 88,
  },
  {
    id: "5",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@foodscan.com",
    phone: "+1 (555) 567-8901",
    status: "active",
    hireDate: "2022-06-18",
    specialty: "Mediterranean",
    station: "Saute Station",
    ordersCompleted: 1350,
    avgPrepTime: 11.2,
    rating: 4.8,
    shift: "evening",
    experienceYears: 7,
    certifications: ["ServSafe", "Culinary Management"],
    performance: 93,
  },
]

const statusConfig = {
  active: { color: "bg-green-100 text-green-800", label: "Active" },
  inactive: { color: "bg-gray-100 text-gray-800", label: "Inactive" },
  on_break: { color: "bg-yellow-100 text-yellow-800", label: "On Break" },
}

const shiftConfig = {
  morning: { color: "bg-blue-100 text-blue-800", label: "Morning" },
  afternoon: { color: "bg-orange-100 text-orange-800", label: "Afternoon" },
  evening: { color: "bg-purple-100 text-purple-800", label: "Evening" },
  night: { color: "bg-gray-100 text-gray-800", label: "Night" },
}

export function ChefsManagement() {
  const [chefs, setChefs] = useState<Chef[]>(mockChefs)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedShift, setSelectedShift] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingChef, setEditingChef] = useState<Chef | null>(null)

  const [newChef, setNewChef] = useState<Partial<Chef>>({
    name: "",
    email: "",
    phone: "",
    status: "active",
    specialty: "",
    station: "",
    shift: "morning",
    experienceYears: 0,
    ordersCompleted: 0,
    avgPrepTime: 0,
    rating: 0,
    performance: 0,
    certifications: [],
  })

  const filteredChefs = chefs.filter((chef) => {
    const matchesSearch =
      chef.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chef.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chef.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chef.station.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || chef.status === selectedStatus
    const matchesShift = selectedShift === "all" || chef.shift === selectedShift
    return matchesSearch && matchesStatus && matchesShift
  })

  const chefStats = {
    total: chefs.length,
    active: chefs.filter((c) => c.status === "active").length,
    onBreak: chefs.filter((c) => c.status === "on_break").length,
    avgRating: chefs.reduce((sum, chef) => sum + chef.rating, 0) / chefs.length,
    avgPrepTime: chefs.reduce((sum, chef) => sum + chef.avgPrepTime, 0) / chefs.length,
    totalOrders: chefs.reduce((sum, chef) => sum + chef.ordersCompleted, 0),
  }

  const handleAddChef = () => {
    if (newChef.name && newChef.email) {
      const chef: Chef = {
        id: Date.now().toString(),
        name: newChef.name,
        email: newChef.email,
        phone: newChef.phone || "",
        status: (newChef.status as Chef["status"]) || "active",
        hireDate: new Date().toISOString().split("T")[0],
        specialty: newChef.specialty || "",
        station: newChef.station || "",
        ordersCompleted: newChef.ordersCompleted || 0,
        avgPrepTime: newChef.avgPrepTime || 0,
        rating: newChef.rating || 0,
        shift: (newChef.shift as Chef["shift"]) || "morning",
        experienceYears: newChef.experienceYears || 0,
        certifications: newChef.certifications || [],
        performance: newChef.performance || 0,
      }
      setChefs([...chefs, chef])
      resetForm()
    }
  }

  const resetForm = () => {
    setNewChef({
      name: "",
      email: "",
      phone: "",
      status: "active",
      specialty: "",
      station: "",
      shift: "morning",
      experienceYears: 0,
      ordersCompleted: 0,
      avgPrepTime: 0,
      rating: 0,
      performance: 0,
      certifications: [],
    })
    setIsAddDialogOpen(false)
    setEditingChef(null)
  }

  const handleEditChef = (chef: Chef) => {
    setEditingChef(chef)
    setNewChef(chef)
    setIsAddDialogOpen(true)
  }

  const handleUpdateChef = () => {
    if (editingChef && newChef.name && newChef.email) {
      const updatedChefs = chefs.map((chef) => (chef.id === editingChef.id ? ({ ...chef, ...newChef } as Chef) : chef))
      setChefs(updatedChefs)
      resetForm()
    }
  }

  const handleDeleteChef = (id: string) => {
    setChefs(chefs.filter((chef) => chef.id !== id))
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
          <h1 className="text-3xl font-bold text-gray-900">Chefs</h1>
          <p className="text-gray-600 mt-1">Manage kitchen staff and track their performance</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-gray-300 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingChef(null)} className="bg-orange-500 hover:bg-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Chef
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingChef ? "Edit Chef" : "Add New Chef"}</DialogTitle>
                <DialogDescription>
                  {editingChef ? "Update the chef details below." : "Fill in the details for the new chef."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newChef.name || ""}
                      onChange={(e) => setNewChef({ ...newChef, name: e.target.value })}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newChef.email || ""}
                      onChange={(e) => setNewChef({ ...newChef, email: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={newChef.phone || ""}
                      onChange={(e) => setNewChef({ ...newChef, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialty">Specialty</Label>
                    <Input
                      id="specialty"
                      value={newChef.specialty || ""}
                      onChange={(e) => setNewChef({ ...newChef, specialty: e.target.value })}
                      placeholder="Enter specialty (e.g., Italian Cuisine)"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="station">Station</Label>
                    <Select
                      value={newChef.station || ""}
                      onValueChange={(value) => setNewChef({ ...newChef, station: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select station" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Grill Station">Grill Station</SelectItem>
                        <SelectItem value="Saute Station">Saute Station</SelectItem>
                        <SelectItem value="Prep Station">Prep Station</SelectItem>
                        <SelectItem value="Pastry Station">Pastry Station</SelectItem>
                        <SelectItem value="Sushi Bar">Sushi Bar</SelectItem>
                        <SelectItem value="Cold Station">Cold Station</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shift">Shift</Label>
                    <Select
                      value={newChef.shift || "morning"}
                      onValueChange={(value: Chef["shift"]) => setNewChef({ ...newChef, shift: value })}
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
                    <Label htmlFor="experienceYears">Experience (Years)</Label>
                    <Input
                      id="experienceYears"
                      type="number"
                      value={newChef.experienceYears || ""}
                      onChange={(e) => setNewChef({ ...newChef, experienceYears: Number.parseInt(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newChef.status || "active"}
                      onValueChange={(value: Chef["status"]) => setNewChef({ ...newChef, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="on_break">On Break</SelectItem>
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
                  onClick={editingChef ? handleUpdateChef : handleAddChef}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {editingChef ? "Update Chef" : "Add Chef"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

    

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search chefs..."
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
          <Select value={selectedShift} onValueChange={setSelectedShift}>
            <SelectTrigger className="w-32 border-gray-300">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Shifts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Shifts</SelectItem>
              {Object.entries(shiftConfig).map(([shift, config]) => (
                <SelectItem key={shift} value={shift}>
                  {config.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chefs List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredChefs.map((chef) => {
          const statusConf = statusConfig[chef.status]
          const shiftConf = shiftConfig[chef.shift]

          return (
            <Card key={chef.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={chef.avatar || "/placeholder.svg"} alt={chef.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {chef.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{chef.name}</CardTitle>
                      <p className="text-sm text-gray-600">{chef.specialty}</p>
                      <p className="text-xs text-gray-500">{chef.station}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditChef(chef)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Chef
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteChef(chef.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove Chef
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
                    <div className="text-lg font-bold text-gray-900">{chef.ordersCompleted}</div>
                    <div className="text-xs text-gray-600">Orders Done</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{chef.avgPrepTime} min</div>
                    <div className="text-xs text-gray-600">Avg Prep Time</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Star className="h-4 w-4 mr-2" />
                      Rating
                    </span>
                    <span className="text-gray-900">{chef.rating}/5.0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Phone
                    </span>
                    <span className="text-gray-900">{chef.phone || "Not provided"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Experience</span>
                    <span className="text-gray-900">{chef.experienceYears} years</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Performance</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {chef.performance}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Hire Date</span>
                    <span className="text-gray-900">{formatDate(chef.hireDate)}</span>
                  </div>
                  {chef.certifications.length > 0 && (
                    <div className="pt-2">
                      <div className="text-xs text-gray-600 mb-1">Certifications</div>
                      <div className="flex flex-wrap gap-1">
                        {chef.certifications.map((cert, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredChefs.length === 0 && (
        <div className="text-center py-12">
          <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No chefs found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  )
}
