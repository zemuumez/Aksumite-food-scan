import { apiClient } from "@/lib/api-client"
import type { Branch, PaginatedResponse } from "@/types/api"

export interface BranchesQuery {
  page?: number
  pageSize?: number
  search?: string
  status?: number
}

export interface CreateBranchRequest {
  name: string
  email: string
  phone: string
  city: string
  state: string
  zipCode: string
  address: string
  latitude?: string
  longitude?: string
  status: number
}

export interface UpdateBranchRequest extends Partial<CreateBranchRequest> {
  id: number
}

export class BranchesService {
  async getBranches(query: BranchesQuery = {}): Promise<PaginatedResponse<Branch>> {
    const params = new URLSearchParams()
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) params.append(key, value.toString())
    })

    const response = await apiClient.get<PaginatedResponse<Branch>>(`/branches?${params}`)
    return response.data
  }

  async getBranch(id: number): Promise<Branch> {
    const response = await apiClient.get<Branch>(`/branches/${id}`)
    return response.data
  }

  async createBranch(data: CreateBranchRequest): Promise<Branch> {
    const response = await apiClient.post<Branch>("/branches", data)
    return response.data
  }

  async updateBranch(data: UpdateBranchRequest): Promise<Branch> {
    const { id, ...updateData } = data
    const response = await apiClient.put<Branch>(`/branches/${id}`, updateData)
    return response.data
  }

  async deleteBranch(id: number): Promise<void> {
    await apiClient.delete(`/branches/${id}`)
  }

  async getBranchStats(id: number): Promise<{
    totalOrders: number
    totalRevenue: number
    activeOrders: number
    completedOrders: number
  }> {
    const response = await apiClient.get(`/branches/${id}/stats`)
    return response.data
  }
}

export const branchesService = new BranchesService()
