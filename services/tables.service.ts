import { apiClient } from "@/lib/api-client"
import type { DiningTable, Order, PaginatedResponse } from "@/types/api"

export interface TablesQuery {
  page?: number
  pageSize?: number
  branchId?: number
  waiterId?: number
  status?: number
}

export interface CreateTableRequest {
  name: string
  size: number
  branchId: number
  waiterId?: number
  status: number
}

export interface UpdateTableRequest extends Partial<CreateTableRequest> {
  id: number
}

export class TablesService {
  async getTables(query: TablesQuery = {}): Promise<PaginatedResponse<DiningTable>> {
    const params = new URLSearchParams()
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) params.append(key, value.toString())
    })

    const response = await apiClient.get<PaginatedResponse<DiningTable>>(`/dining-tables?${params}`)
    return response.data
  }

  async getTable(id: number): Promise<DiningTable> {
    const response = await apiClient.get<DiningTable>(`/dining-tables/${id}`)
    return response.data
  }

  async getTableBySlug(slug: string): Promise<DiningTable> {
    const response = await apiClient.get<DiningTable>(`/dining-tables/slug/${slug}`)
    return response.data
  }

  async createTable(data: CreateTableRequest): Promise<DiningTable> {
    const response = await apiClient.post<DiningTable>("/dining-tables", data)
    return response.data
  }

  async updateTable(data: UpdateTableRequest): Promise<DiningTable> {
    const { id, ...updateData } = data
    const response = await apiClient.put<DiningTable>(`/dining-tables/${id}`, updateData)
    return response.data
  }

  async deleteTable(id: number): Promise<void> {
    await apiClient.delete(`/dining-tables/${id}`)
  }

  async generateQRCode(id: number): Promise<{ qrCode: string; url: string }> {
    const response = await apiClient.post(`/dining-tables/${id}/qr-code`)
    return response.data
  }

  async getTableOrders(id: number): Promise<Order[]> {
    const response = await apiClient.get<Order[]>(`/dining-tables/${id}/orders`)
    return response.data
  }

  async assignWaiter(tableId: number, waiterId: number): Promise<DiningTable> {
    const response = await apiClient.patch<DiningTable>(`/dining-tables/${tableId}/waiter`, { waiterId })
    return response.data
  }
}

export const tablesService = new TablesService()
