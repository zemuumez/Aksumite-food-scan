"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Trash2, Filter, Download, Plus, ChevronLeft, ChevronRight } from "lucide-react"

interface Offer {
  id: string
  name: string
  amount: number
  startDate: string
  endDate: string
  status: "active" | "inactive" | "expired"
}

const mockOffers: Offer[] = [
  {
    id: "1",
    name: "Uplifting Anytime",
    amount: 7.0,
    startDate: "10:20 AM, 21-04-2025",
    endDate: "10:20 AM, 21-04-2026",
    status: "active",
  },
  {
    id: "2",
    name: "Savory and Satisfying",
    amount: 5.0,
    startDate: "10:20 AM, 21-04-2025",
    endDate: "10:20 AM, 21-04-2026",
    status: "active",
  },
]

export function OffersManagement() {
  const [offers, setOffers] = useState<Offer[]>(mockOffers)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newOffer, setNewOffer] = useState({
    name: "",
    amount: "",
    startDate: "",
    endDate: "",
  })

  const handleAddOffer = () => {
    if (newOffer.name && newOffer.amount && newOffer.startDate && newOffer.endDate) {
      const offer: Offer = {
        id: Date.now().toString(),
        name: newOffer.name,
        amount: Number.parseFloat(newOffer.amount),
        startDate: newOffer.startDate,
        endDate: newOffer.endDate,
        status: "active",
      }
      setOffers([...offers, offer])
      setNewOffer({ name: "", amount: "", startDate: "", endDate: "" })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteOffer = (id: string) => {
    setOffers(offers.filter((offer) => offer.id !== id))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
      case "expired":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Expired</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Unknown</Badge>
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span>Dashboard</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Offers</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Offers</h1>
          <div className="flex items-center space-x-3">
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
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Offer
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Offer</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Offer Name</Label>
                    <Input
                      id="name"
                      value={newOffer.name}
                      onChange={(e) => setNewOffer({ ...newOffer, name: e.target.value })}
                      placeholder="Enter offer name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (ETB)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={newOffer.amount}
                      onChange={(e) => setNewOffer({ ...newOffer, amount: e.target.value })}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="datetime-local"
                      value={newOffer.startDate}
                      onChange={(e) => setNewOffer({ ...newOffer, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="datetime-local"
                      value={newOffer.endDate}
                      onChange={(e) => setNewOffer({ ...newOffer, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddOffer} className="bg-blue-600 hover:bg-blue-700">
                    Add Offer
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Offers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="font-medium text-gray-900">NAME</TableHead>
              <TableHead className="font-medium text-gray-900">AMOUNT</TableHead>
              <TableHead className="font-medium text-gray-900">START DATE</TableHead>
              <TableHead className="font-medium text-gray-900">END DATE</TableHead>
              <TableHead className="font-medium text-gray-900">STATUS</TableHead>
              <TableHead className="font-medium text-gray-900">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id} className="border-b border-gray-100 hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">{offer.name}</TableCell>
                <TableCell className="text-gray-600">{offer.amount.toFixed(2)}</TableCell>
                <TableCell className="text-gray-600">{offer.startDate}</TableCell>
                <TableCell className="text-gray-600">{offer.endDate}</TableCell>
                <TableCell>{getStatusBadge(offer.status)}</TableCell>
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
                      onClick={() => handleDeleteOffer(offer.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Showing 1 to {offers.length} of {offers.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled className="border-gray-300 bg-transparent">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="border-gray-300 bg-blue-50 text-blue-600">
              1
            </Button>
            <Button variant="outline" size="sm" disabled className="border-gray-300 bg-transparent">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
