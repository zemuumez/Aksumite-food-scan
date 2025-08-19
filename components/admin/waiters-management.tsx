"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Filter, Download, Eye, Edit, Trash2 } from "lucide-react"

interface Waiter {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "inactive"
}

const mockWaiters: Waiter[] = [
  {
    id: "1",
    name: "Sakib Duronto",
    email: "waiter@example.com",
    phone: "+880127533452",
    status: "active",
  },
]

export function WaitersManagement() {
  const [waiters, setWaiters] = useState<Waiter[]>(mockWaiters)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newWaiter, setNewWaiter] = useState<Partial<Waiter>>({
    name: "",
    email: "",
    phone: "",
    status: "active",
  })

  const handleAddWaiter = () => {
    if (newWaiter.name && newWaiter.email) {
      const waiter: Waiter = {
        id: Date.now().toString(),
        name: newWaiter.name,
        email: newWaiter.email,
        phone: newWaiter.phone || "",
        status: (newWaiter.status as Waiter["status"]) || "active",
      }
      setWaiters([...waiters, waiter])
      resetForm()
    }
  }

  const resetForm = () => {
    setNewWaiter({
      name: "",
      email: "",
      phone: "",
      status: "active",
    })
    setIsAddDialogOpen(false)
  }

  const handleDeleteWaiter = (id: string) => {
    setWaiters(waiters.filter((waiter) => waiter.id !== id))
  }

  return (
    <div className="p-6 space-y-6 bg-white min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Waiters</h1>
        </div>
        <div className="flex items-center space-x-3">
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
                Add Waiter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Waiter</DialogTitle>
                <DialogDescription>Fill in the details for the new waiter.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={newWaiter.name || ""}
                    onChange={(e) => setNewWaiter({ ...newWaiter, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newWaiter.email || ""}
                    onChange={(e) => setNewWaiter({ ...newWaiter, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newWaiter.phone || ""}
                    onChange={(e) => setNewWaiter({ ...newWaiter, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newWaiter.status || "active"}
                    onValueChange={(value: Waiter["status"]) => setNewWaiter({ ...newWaiter, status: value })}
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
                <Button onClick={handleAddWaiter} className="bg-blue-600 hover:bg-blue-700">
                  Add Waiter
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
            <div>NAME</div>
            <div>EMAIL</div>
            <div>PHONE</div>
            <div>STATUS</div>
            <div>ACTION</div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {waiters.map((waiter) => (
            <div key={waiter.id} className="px-6 py-4">
              <div className="grid grid-cols-5 gap-4 items-center">
                <div className="text-sm font-medium text-gray-900">{waiter.name}</div>
                <div className="text-sm text-gray-600">{waiter.email}</div>
                <div className="text-sm text-gray-600">{waiter.phone}</div>
                <div>
                  <Badge
                    variant="outline"
                    className={
                      waiter.status === "active"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-gray-50 text-gray-700 border-gray-200"
                    }
                  >
                    {waiter.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
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
                    onClick={() => handleDeleteWaiter(waiter.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-700">Showing 1 to 1 of 1 entries</p>
        </div>
      </div>
    </div>
  )
}
