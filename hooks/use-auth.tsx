"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type UserRole = "admin" | "branch-manager" | "pos-operator" | "chef-kitchen"

interface User {
  id: string
  email: string
  role: UserRole
  name: string
}

interface AuthContextType {
  user: User | null
  login: (role: UserRole, credentials: { email: string; rememberMe: boolean }) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth on mount
    const storedAuth = localStorage.getItem("foodscan-auth")
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth)
        setUser(authData.user)
      } catch (error) {
        console.error("Failed to parse stored auth:", error)
        localStorage.removeItem("foodscan-auth")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (role: UserRole, credentials: { email: string; rememberMe: boolean }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const userData: User = {
      id: `${role}-${Date.now()}`,
      email: credentials.email,
      role,
      name: getRoleDisplayName(role),
    }

    setUser(userData)

    if (credentials.rememberMe) {
      localStorage.setItem("foodscan-auth", JSON.stringify({ user: userData }))
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("foodscan-auth")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case "admin":
      return "Administrator"
    case "branch-manager":
      return "Branch Manager"
    case "pos-operator":
      return "POS Operator"
    case "chef-kitchen":
      return "Chef/Kitchen Staff"
    default:
      return "User"
  }
}
