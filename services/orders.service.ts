import { apiClient } from "@/lib/api-client"
import type { Order, PaginatedResponse } from "@/types/api"

export interface OrdersQuery {
  page?: number
  pageSize?: number
  status?: number
  orderType?: number
  branchId?: number
  userId?: number
  dateFrom?: string
  dateTo?: string
}

export interface CreateOrderRequest {
  branchId: number
  orderType: number
  diningTableId?: number
  items: {
    itemId: number
    quantity: number
    variationId?: number
    extraId?: number
    instruction?: string
  }[]
  deliveryTime?: string
  address?: string
  paymentMethod: number
}

export interface UpdateOrderStatusRequest {
  status: number
  preparationTime?: number
}

export class OrdersService {
  async getOrders(query: OrdersQuery = {}): Promise<PaginatedResponse<Order>> {
    const params = new URLSearchParams()
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) params.append(key, value.toString())
    })

    const response = await apiClient.get<PaginatedResponse<Order>>(`/orders?${params}`)
    return response.data
  }

  async getOrder(id: number): Promise<Order> {
    const response = await apiClient.get<Order>(`/orders/${id}`)
    return response.data
  }

  async createOrder(data: CreateOrderRequest): Promise<Order> {
    const response = await apiClient.post<Order>("/orders", data)
    return response.data
  }

  async updateOrderStatus(id: number, data: UpdateOrderStatusRequest): Promise<Order> {
    const response = await apiClient.patch<Order>(`/orders/${id}/status`, data)
    return response.data
  }

  async cancelOrder(id: number, reason?: string): Promise<Order> {
    const response = await apiClient.patch<Order>(`/orders/${id}/cancel`, { reason })
    return response.data
  }

  async getOrdersByTable(tableId: number): Promise<Order[]> {
    const response = await apiClient.get<Order[]>(`/dining-tables/${tableId}/orders`)
    return response.data
  }

  async getKitchenOrders(branchId?: number): Promise<Order[]> {
    const params = branchId ? `?branchId=${branchId}` : ""
    const response = await apiClient.get<Order[]>(`/orders/kitchen${params}`)
    return response.data
  }

  async printOrder(id: number): Promise<void> {
    await apiClient.post(`/orders/${id}/print`)
  }
}

export const ordersService = new OrdersService()
