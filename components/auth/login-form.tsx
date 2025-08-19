"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/hooks/use-auth"

type UserRole = "admin" | "branch-manager" | "pos-operator" | "chef-kitchen"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate login - in real app, this would call your API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Default to admin role for regular login
      await login("admin", { email, rememberMe })
      router.push("/admin/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async (role: UserRole) => {
    setIsLoading(true)

    try {
      await login(role, { email: `demo@${role}.com`, rememberMe: false })

      // Route based on role
      switch (role) {
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
      }
    } catch (error) {
      console.error("Demo login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Welcome Back</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        <div>
          <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox
              id="remember-me"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
              Remember Me
            </Label>
          </div>
          <div>
            <button type="button" className="text-sm text-blue-500 hover:text-blue-600 font-medium">
              Forget Password
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full transition-colors duration-200 text-base"
        >
          {isLoading ? "Signing in..." : "Login"}
        </Button>
      </form>

      <div className="mt-12">
        <p className="text-center text-sm text-gray-600 mb-6">For quick demo login click below</p>

        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => handleDemoLogin("admin")}
            disabled={isLoading}
            className="h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors duration-200"
          >
            Admin
          </Button>
          <Button
            onClick={() => handleDemoLogin("branch-manager")}
            disabled={isLoading}
            className="h-12 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-xl transition-colors duration-200"
          >
            Branch Manager
          </Button>
          <Button
            onClick={() => handleDemoLogin("pos-operator")}
            disabled={isLoading}
            className="h-12 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-xl transition-colors duration-200"
          >
            Pos Operator
          </Button>
          <Button
            onClick={() => handleDemoLogin("chef-kitchen")}
            disabled={isLoading}
            className="h-12 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-colors duration-200"
          >
            Chef/Kitchen
          </Button>
        </div>
      </div>
    </div>
  )
}
