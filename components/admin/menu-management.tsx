"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
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
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, EyeOff } from "lucide-react"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  available: boolean
  preparationTime: number
  ingredients: string[]
}

interface MenuCategory {
  id: string
  name: string
  description: string
  sortOrder: number
}

const mockCategories: MenuCategory[] = [
  { id: "1", name: "Appetizers", description: "Start your meal right", sortOrder: 1 },
  { id: "2", name: "Main Courses", description: "Hearty and satisfying dishes", sortOrder: 2 },
  { id: "3", name: "Desserts", description: "Sweet endings", sortOrder: 3 },
  { id: "4", name: "Beverages", description: "Refreshing drinks", sortOrder: 4 },
]

const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Grilled Chicken Burger",
    description: "Juicy grilled chicken breast with fresh lettuce, tomato, and our special sauce",
    price: 15.99,
    category: "Main Courses",
    image: "/grilled-chicken-burger.png",
    available: true,
    preparationTime: 15,
    ingredients: ["Chicken breast", "Lettuce", "Tomato", "Burger bun", "Special sauce"],
  },
  {
    id: "2",
    name: "Margherita Pizza",
    description: "Classic pizza with fresh mozzarella, tomatoes, and basil",
    price: 18.5,
    category: "Main Courses",
    image: "/margherita-pizza.png",
    available: true,
    preparationTime: 20,
    ingredients: ["Pizza dough", "Mozzarella", "Tomatoes", "Basil", "Olive oil"],
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with parmesan cheese and croutons",
    price: 12.0,
    category: "Appetizers",
    image: "/caesar-salad.png",
    available: true,
    preparationTime: 10,
    ingredients: ["Romaine lettuce", "Parmesan cheese", "Croutons", "Caesar dressing"],
  },
  {
    id: "4",
    name: "Fish & Chips",
    description: "Beer-battered fish with crispy fries and tartar sauce",
    price: 16.75,
    category: "Main Courses",
    image: "/classic-fish-and-chips.png",
    available: false,
    preparationTime: 18,
    ingredients: ["Fresh fish", "Beer batter", "Potatoes", "Tartar sauce"],
  },
  {
    id: "5",
    name: "Chocolate Cake",
    description: "Rich and moist chocolate cake with chocolate ganache",
    price: 8.5,
    category: "Desserts",
    image: "/decadent-chocolate-cake.png",
    available: true,
    preparationTime: 5,
    ingredients: ["Chocolate", "Flour", "Eggs", "Butter", "Sugar"],
  },
]

export function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems)
  const [categories] = useState<MenuCategory[]>(mockCategories)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)

  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
    available: true,
    preparationTime: 0,
    ingredients: [],
  })

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddItem = () => {
    if (newItem.name && newItem.price && newItem.category) {
      const item: MenuItem = {
        id: Date.now().toString(),
        name: newItem.name,
        description: newItem.description || "",
        price: newItem.price,
        category: newItem.category,
        image: newItem.image || "/diverse-food-spread.png",
        available: newItem.available ?? true,
        preparationTime: newItem.preparationTime || 0,
        ingredients: newItem.ingredients || [],
      }
      setMenuItems([...menuItems, item])
      setNewItem({
        name: "",
        description: "",
        price: 0,
        category: "",
        image: "",
        available: true,
        preparationTime: 0,
        ingredients: [],
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item)
    setNewItem(item)
    setIsAddDialogOpen(true)
  }

  const handleUpdateItem = () => {
    if (editingItem && newItem.name && newItem.price && newItem.category) {
      const updatedItems = menuItems.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              name: newItem.name!,
              description: newItem.description || "",
              price: newItem.price!,
              category: newItem.category!,
              image: newItem.image || item.image,
              available: newItem.available ?? true,
              preparationTime: newItem.preparationTime || 0,
              ingredients: newItem.ingredients || [],
            }
          : item,
      )
      setMenuItems(updatedItems)
      setEditingItem(null)
      setNewItem({
        name: "",
        description: "",
        price: 0,
        category: "",
        image: "",
        available: true,
        preparationTime: 0,
        ingredients: [],
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleDeleteItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  const toggleAvailability = (id: string) => {
    setMenuItems(menuItems.map((item) => (item.id === id ? { ...item, available: !item.available } : item)))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-600">Manage your restaurant menu items, categories, and pricing.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
              <DialogDescription>
                {editingItem ? "Update the menu item details below." : "Fill in the details for the new menu item."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    value={newItem.name || ""}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="Enter item name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newItem.price || ""}
                    onChange={(e) => setNewItem({ ...newItem, price: Number.parseFloat(e.target.value) })}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newItem.description || ""}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Enter item description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newItem.category || ""}
                    onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prepTime">Preparation Time (minutes)</Label>
                  <Input
                    id="prepTime"
                    type="number"
                    value={newItem.preparationTime || ""}
                    onChange={(e) => setNewItem({ ...newItem, preparationTime: Number.parseInt(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={newItem.image || ""}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  placeholder="Enter image URL or leave blank for placeholder"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="available"
                  checked={newItem.available ?? true}
                  onCheckedChange={(checked) => setNewItem({ ...newItem, available: checked })}
                />
                <Label htmlFor="available">Available for ordering</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={editingItem ? handleUpdateItem : handleAddItem}>
                {editingItem ? "Update Item" : "Add Item"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
              <div className="absolute top-2 right-2 flex space-x-2">
                <Badge variant={item.available ? "default" : "secondary"} className="bg-white/90 text-gray-900">
                  {item.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditItem(item)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleAvailability(item.id)}>
                      {item.available ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-2" />
                          Mark Unavailable
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-2" />
                          Mark Available
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-green-600">${item.price.toFixed(2)}</span>
                  <Badge variant="outline">{item.category}</Badge>
                </div>
                <div className="text-sm text-gray-500">{item.preparationTime} min</div>
              </div>
              {item.ingredients.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500 mb-1">Ingredients:</p>
                  <div className="flex flex-wrap gap-1">
                    {item.ingredients.slice(0, 3).map((ingredient, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {ingredient}
                      </Badge>
                    ))}
                    {item.ingredients.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{item.ingredients.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No menu items found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  )
}
