"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Filter, Download, Eye, Edit, Trash2, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"

interface DiningTable {
  id: string
  name: string
  size: number
  status: "Active" | "Inactive" | "Maintenance"
}

const mockTables: DiningTable[] = [
  { id: "1", name: "Table 2", size: 8, status: "Active" },
  { id: "2", name: "Table 1", size: 6, status: "Active" },
  { id: "3", name: "Table 3", size: 4, status: "Active" },
  { id: "4", name: "Table 4", size: 2, status: "Inactive" },
  { id: "5", name: "Table 5", size: 6, status: "Active" },
  { id: "6", name: "Table 6", size: 8, status: "Maintenance" },
]

export function DiningTablesManagement() {
  const [tables, setTables] = useState<DiningTable[]>(mockTables)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingTable, setEditingTable] = useState<DiningTable | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const [newTable, setNewTable] = useState<Partial<DiningTable>>({
    name: "",
    size: 4,
    status: "Active",
  })

  const totalItems = tables.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
  const currentTables = tables.slice(startIndex, endIndex)

  const handleAddTable = () => {
    if (newTable.name && newTable.size) {
      const table: DiningTable = {
        id: Date.now().toString(),
        name: newTable.name,
        size: newTable.size,
        status: newTable.status || "Active",
      }
      setTables([...tables, table])
      resetForm()
    }
  }

  const resetForm = () => {
    setNewTable({
      name: "",
      size: 4,
      status: "Active",
    })
    setIsAddDialogOpen(false)
    setEditingTable(null)
  }

  const handleEditTable = (table: DiningTable) => {
    setEditingTable(table)
    setNewTable(table)
    setIsAddDialogOpen(true)
  }

  const handleUpdateTable = () => {
    if (editingTable && newTable.name && newTable.size) {
      const updatedTables = tables.map((table) =>
        table.id === editingTable.id ? ({ ...table, ...newTable } as DiningTable) : table,
      )
      setTables(updatedTables)
      resetForm()
    }
  }

  const handleDeleteTable = (id: string) => {
    setTables(tables.filter((table) => table.id !== id))
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200"
      case "Inactive":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="p-6 space-y-6 bg-white min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dining Tables</h1>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingTable(null)} className="bg-orange-500 hover:bg-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Tables
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingTable ? "Edit Table" : "Add New Table"}</DialogTitle>
                <DialogDescription>
                  {editingTable ? "Update the table details below." : "Fill in the details for the new table."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Table Name *</Label>
                  <Input
                    id="name"
                    value={newTable.name || ""}
                    onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
                    placeholder="e.g., Table 1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Size (Number of Seats) *</Label>
                  <Input
                    id="size"
                    type="number"
                    min="1"
                    max="20"
                    value={newTable.size || ""}
                    onChange={(e) => setNewTable({ ...newTable, size: Number.parseInt(e.target.value) })}
                    placeholder="4"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newTable.status || "Active"}
                    onValueChange={(value: DiningTable["status"]) => setNewTable({ ...newTable, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button
                  onClick={editingTable ? handleUpdateTable : handleAddTable}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {editingTable ? "Update Table" : "Add Table"}
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
              <TableHead className="text-gray-600 font-medium">SIZE</TableHead>
              <TableHead className="text-gray-600 font-medium">STATUS</TableHead>
              <TableHead className="text-gray-600 font-medium">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTables.map((table) => (
              <TableRow key={table.id} className="border-b border-gray-100 hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{table.name}</TableCell>
                <TableCell className="text-gray-700">{table.size}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusBadgeColor(table.status)}>
                    {table.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={() => handleEditTable(table)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditTable(table)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Table
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteTable(table.id)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Table
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {endIndex} of {totalItems} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="border-gray-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "bg-orange-500 hover:bg-orange-600" : "border-gray-300"}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="border-gray-300"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
