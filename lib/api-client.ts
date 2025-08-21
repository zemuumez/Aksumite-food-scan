export interface ApiResponse<T = any> {
  data: T
  success: boolean
  message?: string
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

class ApiClient {
  private baseURL: string
  private defaultHeaders: HeadersInit

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || "https://api.foodscan.xyz") {
    this.baseURL = baseURL
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`

    // Get auth token from httpOnly cookie (handled by browser automatically)
    const headers = {
      ...this.defaultHeaders,
      ...options.headers,
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: "include", // Include httpOnly cookies
      })

      if (!response.ok) {
        if (response.status === 401) {
          // Redirect to login on unauthorized
          window.location.href = "/login"
          throw new Error("Unauthorized")
        }

        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("API Request failed:", error)
      throw error
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" })
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" })
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    })
  }
}

export const apiClient = new ApiClient()
