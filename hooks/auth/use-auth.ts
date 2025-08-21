"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { authService } from "@/services/auth.service"
import type { LoginRequest, RegisterRequest } from "@/types/api"

export function useAuth() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: authService.getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "user"], data.user)
      router.push("/admin/dashboard")
    },
    onError: (error) => {
      console.error("Login failed:", error)
    },
  })

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (user) => {
      queryClient.setQueryData(["auth", "user"], user)
      router.push("/admin/dashboard")
    },
  })

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.clear()
      router.push("/login")
    },
  })

  const login = (credentials: LoginRequest) => {
    return loginMutation.mutateAsync(credentials)
  }

  const register = (userData: RegisterRequest) => {
    return registerMutation.mutateAsync(userData)
  }

  const logout = () => {
    return logoutMutation.mutateAsync()
  }

  const hasRole = (roleName: string): boolean => {
    return user ? authService.hasRole(user, roleName) : false
  }

  const hasPermission = (permissionName: string): boolean => {
    return user ? authService.hasPermission(user, permissionName) : false
  }

  const canAccess = (resource: string, action: string): boolean => {
    return user ? authService.canAccess(user, resource, action) : false
  }

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    hasRole,
    hasPermission,
    canAccess,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  }
}
