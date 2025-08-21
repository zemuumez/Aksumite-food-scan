import { apiClient } from "@/lib/api-client"
import type { User, LoginRequest, LoginResponse, RegisterRequest } from "@/types/api"

export class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>("/auth/login", credentials)
    return response.data
  }

  async register(userData: RegisterRequest): Promise<User> {
    const response = await apiClient.post<User>("/auth/register", userData)
    return response.data
  }

  async logout(): Promise<void> {
    await apiClient.post("/auth/logout")
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>("/auth/me")
    return response.data
  }

  async refreshToken(): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>("/auth/refresh")
    return response.data
  }

  async forgotPassword(email: string): Promise<void> {
    await apiClient.post("/auth/forgot-password", { email })
  }

  async resetPassword(token: string, password: string, passwordConfirmation: string): Promise<void> {
    await apiClient.post("/auth/reset-password", {
      token,
      password,
      password_confirmation: passwordConfirmation,
    })
  }

  // Role-based access control helpers
  hasRole(user: User, roleName: string): boolean {
    return user.roles?.some((role) => role.name === roleName) || false
  }

  hasPermission(user: User, permissionName: string): boolean {
    if (!user.roles) return false

    return (
      user.roles.some((role) => role.permissions?.some((permission) => permission.name === permissionName)) || false
    )
  }

  canAccess(user: User, resource: string, action: string): boolean {
    const permissionName = `${resource}.${action}`
    return this.hasPermission(user, permissionName)
  }
}

export const authService = new AuthService()
