import { apiClient } from "@/lib/api-client"
import type { Item, ItemCategory, ItemVariation, ItemExtra, PaginatedResponse } from "@/types/api"

export interface ItemsQuery {
  page?: number
  pageSize?: number
  search?: string
  categoryId?: number
  status?: number
  isFeatured?: boolean
}

export interface CreateItemRequest {
  name: string
  categoryId: number
  taxId?: number
  itemType: number
  price: number
  isFeatured: boolean
  description?: string
  caution?: string
  status: number
}

export interface UpdateItemRequest extends Partial<CreateItemRequest> {
  id: number
}

export class ItemsService {
  async getItems(query: ItemsQuery = {}): Promise<PaginatedResponse<Item>> {
    const params = new URLSearchParams()
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) params.append(key, value.toString())
    })

    const response = await apiClient.get<PaginatedResponse<Item>>(`/items?${params}`)
    return response.data
  }

  async getItem(id: number): Promise<Item> {
    const response = await apiClient.get<Item>(`/items/${id}`)
    return response.data
  }

  async createItem(data: CreateItemRequest): Promise<Item> {
    const response = await apiClient.post<Item>("/items", data)
    return response.data
  }

  async updateItem(data: UpdateItemRequest): Promise<Item> {
    const { id, ...updateData } = data
    const response = await apiClient.put<Item>(`/items/${id}`, updateData)
    return response.data
  }

  async deleteItem(id: number): Promise<void> {
    await apiClient.delete(`/items/${id}`)
  }

  async getCategories(): Promise<ItemCategory[]> {
    const response = await apiClient.get<ItemCategory[]>("/item-categories")
    return response.data
  }

  async getItemVariations(itemId: number): Promise<ItemVariation[]> {
    const response = await apiClient.get<ItemVariation[]>(`/items/${itemId}/variations`)
    return response.data
  }

  async getItemExtras(itemId: number): Promise<ItemExtra[]> {
    const response = await apiClient.get<ItemExtra[]>(`/items/${itemId}/extras`)
    return response.data
  }

  async uploadItemImage(itemId: number, file: File): Promise<void> {
    const formData = new FormData()
    formData.append("image", file)

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/${itemId}/image`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
  }
}

export const itemsService = new ItemsService()
