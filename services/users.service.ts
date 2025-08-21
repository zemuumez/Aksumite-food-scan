import { apiClient } from "@/lib/api-client"
import type { User, Role, PaginatedResponse } from "@/types/api"

export interface UsersQuery {
  page?: number
  pageSize?: number
  search?: string
  role?: string
  branchId?: number
  status?: number
}

export interface CreateUserRequest {
  name: string
  email: string
  phone: string
  username?: string
  branchId?: number
  password: string
  roles: number[]
  status: number
}

export interface UpdateUserRequest extends Partial<Omit<CreateUserRequest, "password">> {
  id: number
  password?: string
}

export class UsersService {
  async getUsers(query: UsersQuery = {}): Promise<PaginatedResponse<User>> {
    const params = new URLSearchParams()
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) params.append(key, value.toString())
    })

    const response = await apiClient.get<PaginatedResponse<User>>(`/users?${params}`)
    return response.data
  }

  async getUser(id: number): Promise<User> {
    const response = await apiClient.get<User>(`/users/${id}`)
    return response.data
  }

  async createUser(data: CreateUserRequest): Promise<User> {
    const response = await apiClient.post<User>("/users", data)
    return response.data
  }

  async updateUser(data: UpdateUserRequest): Promise<User> {
    const { id, ...updateData } = data
    const response = await apiClient.put<User>(`/users/${id}`, updateData)
    return response.data
  }

  async deleteUser(id: number): Promise<void> {
    await apiClient.delete(`/users/${id}`)
  }

  async getRoles(): Promise<Role[]> {
    const response = await apiClient.get<Role[]>("/roles")
    return response.data
  }

  async assignRole(userId: number, roleId: number): Promise<void> {
    await apiClient.post(`/users/${userId}/roles`, { roleId })
  }

  async removeRole(userId: number, roleId: number): Promise<void> {
    await apiClient.delete(`/users/${userId}/roles/${roleId}`)
  }

  async updateUserStatus(id: number, status: number): Promise<User> {
    const response = await apiClient.patch<User>(`/users/${id}/status`, { status })
    return response.data
  }
}

export const usersService = new UsersService()
