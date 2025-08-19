"use client"

import type React from "react"

import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

type UserRole = "admin" | "branch-manager" | "pos-operator" | "chef-kitchen"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  redirectTo?: string
}

export function ProtectedRoute({ children, allowedRoles, redirectTo = "/" }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push(redirectTo)
        return
      }

      if (!allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on user role
        switch (user.role) {
          case "admin":
            router.push("/admin/dashboard")
            break
          case "branch-manager":
            router.push("/branch-manager/dashboard")
            break
          case "pos-operator":
            router.push("/pos-operator/dashboard")
            break
          case "chef-kitchen":
            router.push("/chef-kitchen/dashboard")
            break
          default:
            router.push(redirectTo)
        }
      }
    }
  }, [user, isLoading, allowedRoles, router, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}
