"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  ChefHat,
  Clock,
  CheckSquare,
  Settings,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface ChefKitchenLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Dashboard", href: "/chef-kitchen/dashboard", icon: LayoutDashboard },
  { name: "Active Orders", href: "/chef-kitchen/orders", icon: ChefHat },
  { name: "Queue", href: "/chef-kitchen/queue", icon: Clock },
  { name: "Completed", href: "/chef-kitchen/completed", icon: CheckSquare },
  { name: "Settings", href: "/chef-kitchen/settings", icon: Settings },
]

export function ChefKitchenLayout({ children }: ChefKitchenLayoutProps) {
  const { user, logout } = useAuth()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={cn(
          "bg-white shadow-sm border-r border-gray-200 flex flex-col transition-all duration-300",
          sidebarCollapsed ? "w-16" : "w-64",
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!sidebarCollapsed && (
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CK</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">Kitchen</span>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1.5">
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-green-50 text-green-700 border-r-2 border-green-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <item.icon
                  className={cn(
                    "flex-shrink-0 h-5 w-5",
                    isActive ? "text-green-500" : "text-gray-400 group-hover:text-gray-500",
                    sidebarCollapsed ? "mr-0" : "mr-3",
                  )}
                />
                {!sidebarCollapsed && item.name}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-green-600 text-white text-sm">
                {user?.name?.charAt(0) || "C"}
              </AvatarFallback>
            </Avatar>
            {!sidebarCollapsed && (
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                <p className="text-xs text-gray-500">Chef/Kitchen</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className="max-w-lg w-full lg:max-w-xs">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="Search orders..."
                      type="search"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    5
                  </span>
                </Button>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                    <p className="text-xs text-gray-500">Chef/Kitchen</p>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-green-600 text-white">{user?.name?.charAt(0) || "C"}</AvatarFallback>
                  </Avatar>
                  <Button onClick={logout} variant="outline" size="sm">
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
