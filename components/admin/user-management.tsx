"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
  UserCheck,
  UserX,
  Key,
  Mail,
  Phone,
  Calendar,
} from "lucide-react"

type UserRole = "admin" | "branch-manager" | "pos-operator" | "chef-kitchen"

interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  status: "active" | "inactive"
  createdAt: Date
  lastLogin?: Date
  avatar?: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Admin",
    email: "john@foodscan.com",
    phone: "+1234567890",
    role: "admin",
    status: "active",
    createdAt: new Date("2024-01-15"),
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    name: "Sarah Manager",
    email: "sarah@foodscan.com",
    phone: "+1234567891",
    role: "branch-manager",
    status: "active",
    createdAt: new Date("2024-02-01"),
    lastLogin: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    id: "3",
    name: "Mike Operator",
    email: "mike@foodscan.com",
    phone: "+1234567892",
    role: "pos-operator",
    status: "active",
    createdAt: new Date("2024-02-15"),
    lastLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    name: "Lisa Chef",
    email: "lisa@foodscan.com",
    phone: "+1234567893",
    role: "chef-kitchen",
    status: "active",
    createdAt: new Date("2024-03-01"),
    lastLogin: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "5",
    name: "Tom Wilson",
    email: "tom@foodscan.com",
    phone: "+1234567894",
    role: "pos-operator",
    status: "inactive",
    createdAt: new Date("2024-01-20"),
    lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
]

const roleConfig = {
  admin: { color: "bg-red-100 text-red-800", label: "Administrator" },
  "branch-manager": { color: "bg-blue-100 text-blue-800", label: "Branch Manager" },
  "pos-operator": { color: "bg-green-100 text-green-800", label: "POS Operator" },
  "chef-kitchen": { color: "bg-purple-100 text-purple-800", label: "Chef/Kitchen" },
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const [newUser, setNewUser] = useState<Partial<User>>({
    name: "",
    email: "",
    phone: "",
    role: "pos-operator",
    status: "active",
  })

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)

    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      const user: User = {
        id: Date.now().toString(),
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone || "",
        role: newUser.role as UserRole,
        status: newUser.status as "active" | "inactive",
        createdAt: new Date(),
      }
      setUsers([...users, user])
      setNewUser({
        name: "",
        email: "",
        phone: "",
        role: "pos-operator",
        status: "active",
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setNewUser(user)
    setIsAddDialogOpen(true)
  }

  const handleUpdateUser = () => {
    if (editingUser && newUser.name && newUser.email && newUser.role) {
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id
          ? {
              ...user,
              name: newUser.name!,
              email: newUser.email!,
              phone: newUser.phone || "",
              role: newUser.role as UserRole,
              status: newUser.status as "active" | "inactive",
            }
          : user,
      )
      setUsers(updatedUsers)
      setEditingUser(null)
      setNewUser({
        name: "",
        email: "",
        phone: "",
        role: "pos-operator",
        status: "active",
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const toggleUserStatus = (id: string) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60))
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  const getRoleStats = () => {
    return users.reduce(
      (acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1
        return acc
      },
      {} as Record<UserRole, number>,
    )
  }

  const roleStats = getRoleStats()

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage staff members, roles, and permissions.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingUser(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
              <DialogDescription>
                {editingUser ? "Update the user details below." : "Fill in the details for the new user."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newUser.name || ""}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email || ""}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newUser.phone || ""}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newUser.role || ""}
                  onValueChange={(value) => setNewUser({ ...newUser, role: value as UserRole })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="branch-manager">Branch Manager</SelectItem>
                    <SelectItem value="pos-operator">POS Operator</SelectItem>
                    <SelectItem value="chef-kitchen">Chef/Kitchen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={newUser.status === "active"}
                  onCheckedChange={(checked) => setNewUser({ ...newUser, status: checked ? "active" : "inactive" })}
                />
                <Label htmlFor="status">Active user</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={editingUser ? handleUpdateUser : handleAddUser}>
                {editingUser ? "Update User" : "Add User"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(roleConfig).map(([role, config]) => (
          <Card key={role}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{config.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{roleStats[role as UserRole] || 0}</div>
              <div className="flex items-center text-xs text-gray-600">
                <Badge className={config.color} variant="secondary">
                  {role}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Administrator</SelectItem>
            <SelectItem value="branch-manager">Branch Manager</SelectItem>
            <SelectItem value="pos-operator">POS Operator</SelectItem>
            <SelectItem value="chef-kitchen">Chef/Kitchen</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users List */}
      <div className="grid gap-4">
        {filteredUsers.map((user) => {
          const roleInfo = roleConfig[user.role]
          return (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-blue-600 text-white text-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                        <Badge className={roleInfo.color}>{roleInfo.label}</Badge>
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            {user.phone}
                          </div>
                        )}
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Joined {user.createdAt.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right text-sm text-gray-600">
                      {user.lastLogin ? <p>Last login: {getTimeAgo(user.lastLogin)}</p> : <p>Never logged in</p>}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant={user.status === "active" ? "destructive" : "default"}
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        {user.status === "active" ? (
                          <>
                            <UserX className="h-4 w-4 mr-1" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <UserCheck className="h-4 w-4 mr-1" />
                            Activate
                          </>
                        )}
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditUser(user)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Key className="h-4 w-4 mr-2" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  )
}
