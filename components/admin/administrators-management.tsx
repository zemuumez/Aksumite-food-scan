"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Filter, Download, Eye, Edit, Trash2 } from "lucide-react"

interface Administrator {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "inactive"
}

const mockAdministrators: Administrator[] = [
  {
    id: "1",
    name: "John Doe",
    email: "admin@example.com",
    phone: "+880125487585",
    status: "active",
  },
]

export function AdministratorsManagement() {
  const [administrators, setAdministrators] = useState<Administrator[]>(mockAdministrators)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newAdmin, setNewAdmin] = useState<Partial<Administrator>>({
    name: "",
    email: "",
    phone: "",
    status: "active",
  })

  const handleAddAdmin = () => {
    if (newAdmin.name && newAdmin.email) {
      const admin: Administrator = {
        id: Date.now().toString(),
        name: newAdmin.name,
        email: newAdmin.email,
        phone: newAdmin.phone || "",
        status: (newAdmin.status as Administrator["status"]) || "active",
      }
      setAdministrators([...administrators, admin])
      resetForm()
    }
  }

  const resetForm = () => {
    setNewAdmin({
      name: "",
      email: "",
      phone: "",
      status: "active",
    })
    setIsAddDialogOpen(false)
  }

  const handleDeleteAdmin = (id: string) => {
    setAdministrators(administrators.filter((admin) => admin.id !== id))
  }

  return (
    <div className="p-6 space-y-6 bg-white min-h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Administrators</h1>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-gray-300 bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="border-gray-300 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Administrator
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Administrator</DialogTitle>
                <DialogDescription>Fill in the details for the new administrator.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={newAdmin.name || ""}
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAdmin.email || ""}
                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newAdmin.phone || ""}
                    onChange={(e) => setNewAdmin({ ...newAdmin, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newAdmin.status || "active"}
                    onValueChange={(value: Administrator["status"]) => setNewAdmin({ ...newAdmin, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button onClick={handleAddAdmin} className="bg-blue-600 hover:bg-blue-700">
                  Add Administrator
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-gray-600 font-medium">NAME</TableHead>
              <TableHead className="text-gray-600 font-medium">EMAIL</TableHead>
              <TableHead className="text-gray-600 font-medium">PHONE</TableHead>
              <TableHead className="text-gray-600 font-medium">STATUS</TableHead>
              <TableHead className="text-gray-600 font-medium">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {administrators.map((admin) => (
              <TableRow key={admin.id} className="border-b border-gray-100">
                <TableCell className="font-medium text-gray-900">{admin.name}</TableCell>
                <TableCell className="text-gray-600">{admin.email}</TableCell>
                <TableCell className="text-gray-600">{admin.phone}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={
                      admin.status === "active"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }
                  >
                    {admin.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteAdmin(admin.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="px-6 py-4 text-sm text-gray-600 border-t border-gray-200">
          Showing 1 to {administrators.length} of {administrators.length} entries
        </div>
      </div>
    </div>
  )
}
