"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Settings,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  UtensilsCrossed,
  ChefHat,
  UserCheck,
  Clock,
  Gift,
  CreditCard,
  FileText,
  Monitor,
  Table,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AdminLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Items", href: "/admin/items", icon: UtensilsCrossed },
  { name: "Dining Tables", href: "/admin/dining-tables", icon: Table },
  { name: "POS", href: "/admin/pos", icon: Monitor },
  { name: "POS Orders", href: "/admin/pos-orders", icon: ShoppingCart },
  { name: "Table Orders", href: "/admin/table-orders", icon: Table },
  { name: "K.D.S", href: "/admin/kitchen-display-system", icon: ChefHat },
  { name: "O.S.S", href: "/admin/order-status-screen", icon: Clock },
  { name: "Offers", href: "/admin/offers", icon: Gift },
  { name: "Administrators", href: "/admin/administrators", icon: UserCheck },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Employees", href: "/admin/employees", icon: Users },
  { name: "Waiters", href: "/admin/waiters", icon: Users },
  { name: "Chefs", href: "/admin/chefs", icon: ChefHat },
  { name: "Transactions", href: "/admin/transactions", icon: CreditCard },
  { name: "Sales Report", href: "/admin/sales-report", icon: FileText },
  { name: "Items Report", href: "/admin/items-report", icon: FileText },
  { name: "Credit Balance Report", href: "/admin/credit-balance-report", icon: CreditCard },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuth()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()

  const isFullScreenPage =
    pathname === "/admin/kitchen-display-system" ||
    pathname === "/admin/order-status-screen" ||
    pathname === "/admin/pos"
  const shouldHideSidebar = isFullScreenPage

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={cn(
          "bg-white shadow-sm border-r border-gray-200 flex flex-col transition-all duration-300",
          shouldHideSidebar ? "w-0 overflow-hidden" : sidebarCollapsed ? "w-16" : "w-64",
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!sidebarCollapsed && (
            <div className="flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-BYdpBgNYu6rgIiu3j7LSEzUOmtiVEW.png"
                alt="Kaleb Hotel"
                className="w-8 h-8 object-contain"
              />
              <span className="ml-2 text-xl font-semibold text-gray-900">Kaleb Hotel</span>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1.5">
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  isActive ? "bg-orange-50 text-orange-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <item.icon
                  className={cn(
                    "flex-shrink-0 h-5 w-5",
                    isActive ? "text-orange-500" : "text-gray-400 group-hover:text-gray-500",
                    sidebarCollapsed ? "mr-0" : "mr-3",
                  )}
                />
                {!sidebarCollapsed && item.name}
              </Link>
            )
          })}
        </nav>

        {/* User Profile */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-orange-500 text-white text-sm">
                {user?.name?.charAt(0) || "A"}
              </AvatarFallback>
            </Avatar>
            {!sidebarCollapsed && (
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role?.replace("-", " ")}</p>
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
                {isFullScreenPage && (
                  <Link href="/admin/dashboard">
                    <Button variant="ghost" size="sm" className="mr-4">
                      <Menu className="h-5 w-5 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                )}
                <div className="max-w-lg w-full lg:max-w-xs">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      placeholder="Search..."
                      type="search"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    3
                  </span>
                </Button>

                {/* User Menu */}
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role?.replace("-", " ")}</p>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-orange-500 text-white">{user?.name?.charAt(0) || "A"}</AvatarFallback>
                  </Avatar>
                  <Button
                    onClick={logout}
                    variant="outline"
                    size="sm"
                    className="border-gray-300 hover:bg-gray-50 bg-transparent"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
