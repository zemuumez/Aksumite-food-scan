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
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  UtensilsCrossed,
  Clock,
  Star,
  Download,
  Upload,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface FoodItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  available: boolean
  preparationTime: number
  ingredients: string[]
  allergens: string[]
  nutritionalInfo: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  popularity: number
  stock: number
  cost: number
}

interface ItemCategory {
  id: string
  name: string
  description: string
  color: string
  itemCount: number
}

const mockCategories: ItemCategory[] = [
  {
    id: "1",
    name: "Appetizers",
    description: "Starters & Small Plates",
    color: "bg-blue-100 text-blue-800",
    itemCount: 12,
  },
  {
    id: "2",
    name: "Main Courses",
    description: "Hearty Main Dishes",
    color: "bg-green-100 text-green-800",
    itemCount: 24,
  },
  { id: "3", name: "Desserts", description: "Sweet Treats", color: "bg-pink-100 text-pink-800", itemCount: 8 },
  {
    id: "4",
    name: "Beverages",
    description: "Drinks & Refreshments",
    color: "bg-purple-100 text-purple-800",
    itemCount: 16,
  },
  { id: "5", name: "Salads", description: "Fresh & Healthy", color: "bg-emerald-100 text-emerald-800", itemCount: 10 },
  { id: "6", name: "Sides", description: "Accompaniments", color: "bg-yellow-100 text-yellow-800", itemCount: 14 },
]

const mockFoodItems: FoodItem[] = [
  {
    id: "1",
    name: "Grilled Chicken Caesar Salad",
    description: "Fresh romaine lettuce with grilled chicken breast, parmesan cheese, croutons, and caesar dressing",
    price: 850.0,
    category: "Salads",
    image: "/grilled-chicken-caesar.png",
    available: true,
    preparationTime: 12,
    ingredients: ["Romaine lettuce", "Grilled chicken breast", "Parmesan cheese", "Croutons", "Caesar dressing"],
    allergens: ["Dairy", "Gluten"],
    nutritionalInfo: { calories: 420, protein: 35, carbs: 18, fat: 24 },
    popularity: 95,
    stock: 50,
    cost: 425.0,
  },
  {
    id: "2",
    name: "Truffle Mushroom Risotto",
    description: "Creamy arborio rice with wild mushrooms, truffle oil, and aged parmesan",
    price: 1249.5,
    category: "Main Courses",
    image: "/placeholder-zu2z0.png",
    available: true,
    preparationTime: 25,
    ingredients: ["Arborio rice", "Wild mushrooms", "Truffle oil", "Parmesan", "White wine", "Vegetable stock"],
    allergens: ["Dairy"],
    nutritionalInfo: { calories: 580, protein: 18, carbs: 65, fat: 28 },
    popularity: 88,
    stock: 30,
    cost: 637.5,
  },
  {
    id: "3",
    name: "Pan-Seared Salmon",
    description: "Atlantic salmon with lemon herb butter, served with roasted vegetables and quinoa",
    price: 1449.5,
    category: "Main Courses",
    image: "/pan-seared-salmon-vegetables.png",
    available: true,
    preparationTime: 18,
    ingredients: ["Atlantic salmon", "Lemon", "Herbs", "Butter", "Mixed vegetables", "Quinoa"],
    allergens: ["Fish", "Dairy"],
    nutritionalInfo: { calories: 520, protein: 42, carbs: 28, fat: 26 },
    popularity: 92,
    stock: 25,
    cost: 825.0,
  },
  {
    id: "4",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with molten center, served with vanilla ice cream",
    price: 499.5,
    category: "Desserts",
    image: "/chocolate-lava-cake.png",
    available: true,
    preparationTime: 8,
    ingredients: ["Dark chocolate", "Butter", "Eggs", "Sugar", "Flour", "Vanilla ice cream"],
    allergens: ["Dairy", "Eggs", "Gluten"],
    nutritionalInfo: { calories: 480, protein: 8, carbs: 52, fat: 28 },
    popularity: 96,
    stock: 40,
    cost: 212.5,
  },
  {
    id: "5",
    name: "Craft Beer Selection",
    description: "Rotating selection of local craft beers on tap",
    price: 399.5,
    category: "Beverages",
    image: "/craft-beer-selection.png",
    available: false,
    preparationTime: 2,
    ingredients: ["Craft beer"],
    allergens: ["Gluten"],
    nutritionalInfo: { calories: 180, protein: 2, carbs: 15, fat: 0 },
    popularity: 78,
    stock: 0,
    cost: 175.0,
  },
  {
    id: "6",
    name: "Truffle Fries",
    description: "Hand-cut fries with truffle oil, parmesan, and fresh herbs",
    price: 649.5,
    category: "Sides",
    image: "/truffle-parmesan-fries.png",
    available: true,
    preparationTime: 10,
    ingredients: ["Potatoes", "Truffle oil", "Parmesan", "Fresh herbs", "Sea salt"],
    allergens: ["Dairy"],
    nutritionalInfo: { calories: 380, protein: 8, carbs: 45, fat: 18 },
    popularity: 89,
    stock: 60,
    cost: 262.5,
  },
]

export function ItemsManagement() {
  const [foodItems, setFoodItems] = useState<FoodItem[]>(mockFoodItems)
  const [categories] = useState<ItemCategory[]>(mockCategories)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("name")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null)

  const [newItem, setNewItem] = useState<Partial<FoodItem>>({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
    available: true,
    preparationTime: 0,
    ingredients: [],
    allergens: [],
    stock: 0,
    cost: 0,
  })

  const filteredItems = foodItems
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ingredients.some((ing) => ing.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price
        case "popularity":
          return b.popularity - a.popularity
        case "stock":
          return b.stock - a.stock
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const handleAddItem = () => {
    if (newItem.name && newItem.price && newItem.category) {
      const item: FoodItem = {
        id: Date.now().toString(),
        name: newItem.name,
        description: newItem.description || "",
        price: newItem.price,
        category: newItem.category,
        image: newItem.image || "/generic-food-item.png",
        available: newItem.available ?? true,
        preparationTime: newItem.preparationTime || 0,
        ingredients: newItem.ingredients || [],
        allergens: newItem.allergens || [],
        nutritionalInfo: { calories: 0, protein: 0, carbs: 0, fat: 0 },
        popularity: 50,
        stock: newItem.stock || 0,
        cost: newItem.cost || 0,
      }
      setFoodItems([...foodItems, item])
      resetForm()
    }
  }

  const resetForm = () => {
    setNewItem({
      name: "",
      description: "",
      price: 0,
      category: "",
      image: "",
      available: true,
      preparationTime: 0,
      ingredients: [],
      allergens: [],
      stock: 0,
      cost: 0,
    })
    setIsAddDialogOpen(false)
    setEditingItem(null)
  }

  const handleEditItem = (item: FoodItem) => {
    setEditingItem(item)
    setNewItem(item)
    setIsAddDialogOpen(true)
  }

  const handleUpdateItem = () => {
    if (editingItem && newItem.name && newItem.price && newItem.category) {
      const updatedItems = foodItems.map((item) =>
        item.id === editingItem.id ? ({ ...item, ...newItem } as FoodItem) : item,
      )
      setFoodItems(updatedItems)
      resetForm()
    }
  }

  const handleDeleteItem = (id: string) => {
    setFoodItems(foodItems.filter((item) => item.id !== id))
  }

  const toggleAvailability = (id: string) => {
    setFoodItems(foodItems.map((item) => (item.id === id ? { ...item, available: !item.available } : item)))
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Items Management</h1>
          <p className="text-gray-600 mt-1">Manage your restaurant's food items, pricing, and inventory</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-gray-300 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" className="border-gray-300 bg-transparent">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingItem(null)} className="bg-orange-500 hover:bg-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingItem ? "Edit Food Item" : "Add New Food Item"}</DialogTitle>
                <DialogDescription>
                  {editingItem ? "Update the food item details below." : "Fill in the details for the new food item."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Item Name *</Label>
                    <Input
                      id="name"
                      value={newItem.name || ""}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      placeholder="Enter item name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
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

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (ETB) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newItem.price || ""}
                      onChange={(e) => setNewItem({ ...newItem, price: Number.parseFloat(e.target.value) })}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cost">Cost (ETB)</Label>
                    <Input
                      id="cost"
                      type="number"
                      step="0.01"
                      value={newItem.cost || ""}
                      onChange={(e) => setNewItem({ ...newItem, cost: Number.parseFloat(e.target.value) })}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newItem.stock || ""}
                      onChange={(e) => setNewItem({ ...newItem, stock: Number.parseInt(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={newItem.image || ""}
                      onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                      placeholder="Enter image URL"
                    />
                  </div>
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
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button
                  onClick={editingItem ? handleUpdateItem : handleAddItem}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  {editingItem ? "Update Item" : "Add Item"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search items, ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-gray-300"
          />
        </div>
        <div className="flex gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48 border-gray-300">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name} ({category.itemCount})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40 border-gray-300">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="stock">Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className="relative">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
              <div className="absolute top-3 left-3">
                <Badge
                  variant={item.available ? "default" : "secondary"}
                  className={cn(
                    "bg-white/90 text-gray-900 shadow-sm",
                    item.available ? "border-green-200" : "border-red-200",
                  )}
                >
                  {item.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <div className="flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium">{item.popularity}</span>
                </div>
              </div>
              {item.stock < 10 && (
                <div className="absolute bottom-3 left-3">
                  <Badge variant="destructive" className="text-xs">
                    Low Stock: {item.stock}
                  </Badge>
                </div>
              )}
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg leading-tight">{item.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditItem(item)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Item
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
                      Delete Item
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent className="pt-0 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-green-600">ETB {item.price.toFixed(2)}</span>
                  {item.cost > 0 && <span className="text-sm text-gray-500">(ETB {item.cost.toFixed(2)} cost)</span>}
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{item.preparationTime}m</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className={categories.find((c) => c.name === item.category)?.color || "bg-gray-100 text-gray-800"}
                >
                  {item.category}
                </Badge>
                <span className="text-sm text-gray-600">Stock: {item.stock}</span>
              </div>

              {item.allergens.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.allergens.slice(0, 3).map((allergen, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-red-50 text-red-700">
                      {allergen}
                    </Badge>
                  ))}
                  {item.allergens.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-red-50 text-red-700">
                      +{item.allergens.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <UtensilsCrossed className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria, or add a new item.</p>
        </div>
      )}
    </div>
  )
}
