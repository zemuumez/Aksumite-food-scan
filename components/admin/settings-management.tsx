"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Building2,
  Globe,
  Building,
  Mail,
  Lock,
  Bell,
  BellRing,
  BarChart3,
  Palette,
  Coins,
  Package,
  Shield,
  FileText,
  Languages,
  MessageSquare,
  CreditCard,
  Settings,
  Edit,
  Trash2,
  Plus,
  MoreHorizontal,
} from "lucide-react"
import { cn } from "@/lib/utils"

const settingsNavigation = [
  { id: "company", name: "Company", icon: Building2 },
  { id: "site", name: "Site", icon: Globe },
  { id: "branches", name: "Branches", icon: Building },
  { id: "mail", name: "Mail", icon: Mail },
  { id: "otp", name: "OTP", icon: Lock },
  { id: "notification", name: "Notification", icon: Bell },
  { id: "notification-alert", name: "Notification Alert", icon: BellRing },
  { id: "analytics", name: "Analytics", icon: BarChart3 },
  { id: "theme", name: "Theme", icon: Palette },
  { id: "currencies", name: "Currencies", icon: Coins },
  { id: "item-categories", name: "Item Categories", icon: Package },
  { id: "item-attributes", name: "Item Attributes", icon: Settings },
  { id: "taxes", name: "Taxes", icon: FileText },
  { id: "pages", name: "Pages", icon: FileText },
  { id: "role-permissions", name: "Role & Permissions", icon: Shield },
  { id: "languages", name: "Languages", icon: Languages },
  { id: "sms-gateway", name: "Sms Gateway", icon: MessageSquare },
  { id: "payment-gateway", name: "Payment Gateway", icon: CreditCard },
  { id: "license", name: "License", icon: Shield },
]

export function SettingsManagement() {
  const [activeSection, setActiveSection] = useState("company")
  const [showLanguageDialog, setShowLanguageDialog] = useState(false)
  const [showRoleDialog, setShowRoleDialog] = useState(false)
  const [viewingPermissions, setViewingPermissions] = useState<string | null>(null)
  const [rolePermissions, setRolePermissions] = useState<{ [key: string]: { [key: string]: boolean } }>({
    Admin: {
      Dashboard: true,
      Items: true,
      "Dining Tables": true,
      POS: true,
      "POS Orders": true,
      "Table Orders": true,
      "K.D.S": true,
      "O.S.S": true,
      Offers: true,
      Administrators: true,
      "Delivery Boys": true,
      Customers: true,
      Employees: true,
      Waiters: true,
      Chefs: true,
      Transactions: true,
      "Sales Report": true,
      "Items Report": true,
      "Credit Balance Report": true,
      Settings: true,
    },
  })
  const [activeGateway, setActiveGateway] = useState("twilio")
  const [activePaymentGateway, setActivePaymentGateway] = useState("paypal")

  const handlePermissionChange = (page: string, permission: string, checked: boolean) => {
    if (!viewingPermissions) return

    setRolePermissions((prev) => ({
      ...prev,
      [viewingPermissions]: {
        ...prev[viewingPermissions],
        [`${page}_${permission}`]: checked,
      },
    }))
  }

  const renderSmsGatewaySettings = () => {
    const gateways = [
      { id: "twilio", name: "Twilio" },
      { id: "clickatell", name: "Clickatell" },
      { id: "nexmo", name: "Nexmo" },
    ]

    const moreGateways = ["Msg91", "2Factor", "Bulksms", "Bulksmsbd", "Telesign"]

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Sms Gateway</h2>
          <p className="text-gray-600">Configure SMS gateway settings for notifications.</p>
        </div>

        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {gateways.map((gateway) => (
            <button
              key={gateway.id}
              onClick={() => setActiveGateway(gateway.id)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                activeGateway === gateway.id ? "bg-blue-500 text-white" : "text-gray-600 hover:text-gray-900",
              )}
            >
              {gateway.name}
            </button>
          ))}
          <div className="flex items-center px-4 py-2 text-sm text-gray-600">
            <MoreHorizontal className="h-4 w-4 mr-1" />
            More Gateway
          </div>
        </div>

        <div className="flex">
          <div className="flex-1">
            <Card>
              <CardContent className="p-6">
                {activeGateway === "twilio" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Twilio</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="twilio-sid">TWILIO ACCOUNT SID</Label>
                        <Input id="twilio-sid" placeholder="Account SID" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twilio-token">TWILIO AUTH TOKEN</Label>
                        <Input id="twilio-token" placeholder="Auth Token" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twilio-from">TWILIO FROM</Label>
                        <Input id="twilio-from" placeholder="From Number" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="twilio-status">TWILIO STATUS</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Disable" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="enable">Enable</SelectItem>
                            <SelectItem value="disable">Disable</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save</Button>
                  </div>
                )}

                {activeGateway === "nexmo" && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Nexmo</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nexmo-key">NEXMO KEY</Label>
                        <Input id="nexmo-key" placeholder="API Key" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nexmo-secret">NEXMO SECRET</Label>
                        <Input id="nexmo-secret" placeholder="API Secret" />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label htmlFor="nexmo-status">NEXMO STATUS</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Disable" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="enable">Enable</SelectItem>
                            <SelectItem value="disable">Disable</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="w-48 ml-6">
            <div className="space-y-2">
              {moreGateways.map((gateway) => (
                <div key={gateway} className="text-sm text-gray-600 py-1">
                  {gateway}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderPaymentGatewaySettings = () => {
    const gateways = [
      { id: "paypal", name: "Paypal" },
      { id: "stripe", name: "Stripe" },
      { id: "flutterwave", name: "Flutterwave" },
    ]

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Payment Gateway</h2>
          <p className="text-gray-600">Configure payment gateway settings for transactions.</p>
        </div>

        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {gateways.map((gateway) => (
            <button
              key={gateway.id}
              onClick={() => setActivePaymentGateway(gateway.id)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                activePaymentGateway === gateway.id ? "bg-blue-500 text-white" : "text-gray-600 hover:text-gray-900",
              )}
            >
              {gateway.name}
            </button>
          ))}
          <div className="flex items-center px-4 py-2 text-sm text-gray-600">
            <MoreHorizontal className="h-4 w-4 mr-1" />
            More Gateway
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            {activePaymentGateway === "paypal" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Paypal</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="paypal-app-id">PAYPAL APP ID</Label>
                    <Input id="paypal-app-id" placeholder="sb-qzxs18789565@business.example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paypal-client-id">PAYPAL CLIENT ID</Label>
                    <Input id="paypal-client-id" placeholder="AbcV-BG5b30hjofcp2dj41GBT0YXE8-9-egRlVBz4R7vHi4-1i" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="paypal-client-secret">PAYPAL CLIENT SECRET</Label>
                    <Input
                      id="paypal-client-secret"
                      placeholder="EP6r5hEtBcGicJeEseZiJOJqSRnFvqNLT7yxjpIzTaObh-t-516g"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paypal-mode">PAYPAL MODE</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sandbox" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sandbox">Sandbox</SelectItem>
                        <SelectItem value="live">Live</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paypal-status">PAYPAL STATUS</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Enable" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enable">Enable</SelectItem>
                        <SelectItem value="disable">Disable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderLicenseSettings = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">License</h2>
          <p className="text-gray-600">Manage your software license configuration.</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="license-code">LICENSE CODE *</Label>
                <Input
                  id="license-code"
                  placeholder="b6d68vy2-m7g5-20r0-5275-h103w73453q120"
                  defaultValue="b6d68vy2-m7g5-20r0-5275-h103w73453q120"
                />
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderRolePermissionsSettings = () => {
    const roles = [
      { name: "Admin", members: 1, canDelete: false },
      { name: "Customer", members: 2, canDelete: true },
      { name: "Waiter", members: 1, canDelete: true },
      { name: "Chef", members: 1, canDelete: true },
      { name: "Branch Manager", members: 1, canDelete: true },
      { name: "POS Operator", members: 1, canDelete: true },
      { name: "Stuff", members: 1, canDelete: true },
    ]

    const permissions = [
      { page: "Dashboard", create: false, update: false, delete: false, view: true },
      { page: "Items", create: true, update: true, delete: true, view: true },
      { page: "Dining Tables", create: true, update: true, delete: true, view: true },
      { page: "POS", create: false, update: false, delete: false, view: true },
      { page: "POS Orders", create: false, update: false, delete: false, view: true },
      { page: "Table Orders", create: false, update: false, delete: false, view: true },
      { page: "K.D.S", create: false, update: false, delete: false, view: true },
      { page: "O.S.S", create: false, update: false, delete: false, view: true },
      { page: "Offers", create: true, update: true, delete: true, view: true },
      { page: "Administrators", create: true, update: true, delete: true, view: true },
      { page: "Delivery Boys", create: true, update: true, delete: true, view: true },
      { page: "Customers", create: true, update: true, delete: true, view: true },
      { page: "Employees", create: true, update: true, delete: true, view: true },
      { page: "Waiters", create: true, update: true, delete: true, view: true },
      { page: "Chefs", create: true, update: true, delete: true, view: true },
      { page: "Transactions", create: false, update: false, delete: false, view: true },
      { page: "Sales Report", create: false, update: false, delete: false, view: true },
      { page: "Items Report", create: false, update: false, delete: false, view: true },
      { page: "Credit Balance Report", create: false, update: false, delete: false, view: true },
      { page: "Settings", create: false, update: false, delete: false, view: true },
    ]

    if (viewingPermissions) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Role & Permissions ({viewingPermissions})</h2>
              <p className="text-gray-600">Configure permissions for the {viewingPermissions} role.</p>
            </div>
            <Button variant="outline" onClick={() => setViewingPermissions(null)}>
              Back to Roles
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Page
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Create
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Update
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Delete
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        View
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {permissions.map((permission, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Checkbox
                            checked={permission.view}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(permission.page, "view", checked as boolean)
                            }
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{permission.page}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {permission.create && (
                            <Checkbox
                              checked={permission.create}
                              onCheckedChange={(checked) =>
                                handlePermissionChange(permission.page, "create", checked as boolean)
                              }
                            />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {permission.update && (
                            <Checkbox
                              checked={permission.update}
                              onCheckedChange={(checked) =>
                                handlePermissionChange(permission.page, "update", checked as boolean)
                              }
                            />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {permission.delete && (
                            <Checkbox
                              checked={permission.delete}
                              onCheckedChange={(checked) =>
                                handlePermissionChange(permission.page, "delete", checked as boolean)
                              }
                            />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <Checkbox
                            checked={permission.view}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(permission.page, "view", checked as boolean)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save Permissions</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Role & Permissions</h2>
            <p className="text-gray-600">Manage user roles and their permissions.</p>
          </div>
          <Dialog open={showRoleDialog} onOpenChange={setShowRoleDialog}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Role
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Role</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role-name">Name *</Label>
                  <Input id="role-name" placeholder="Role name" />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setShowRoleDialog(false)}>
                    Close
                  </Button>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Members
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {roles.map((role, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{role.name}</div>
                          <div className="text-sm text-gray-500">({role.members}) Members</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{role.members} Members</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => setViewingPermissions(role.name)}
                          >
                            Permissions
                          </Button>
                          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {role.canDelete && (
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-700">Showing 1 to 7 of 7 entries</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeSection) {
      case "company":
        return <div>Company Settings</div>
      case "site":
        return <div>Site Settings</div>
      case "mail":
        return <div>Mail Settings</div>
      case "otp":
        return <div>OTP Settings</div>
      case "theme":
        return <div>Theme Settings</div>
      case "branches":
        return <div>Branches Settings</div>
      case "notification-alert":
        return <div>Notification Alert Settings</div>
      case "analytics":
        return <div>Analytics Settings</div>
      case "item-attributes":
        return <div>Item Attributes Settings</div>
      case "taxes":
        return <div>Taxes Settings</div>
      case "pages":
        return <div>Pages Settings</div>
      case "languages":
        return <div>Languages Settings</div>
      case "currencies":
        return <div>Currencies Settings</div>
      case "item-categories":
        return <div>Item Categories Settings</div>
      case "role-permissions":
        return renderRolePermissionsSettings()
      case "sms-gateway":
        return renderSmsGatewaySettings()
      case "payment-gateway":
        return renderPaymentGatewaySettings()
      case "license":
        return renderLicenseSettings()
      default:
        return <div>Default Settings</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Dashboard</span>
          <span>/</span>
          <span>Settings</span>
          {activeSection !== "company" && (
            <>
              <span>/</span>
              <span className="text-gray-400 capitalize">
                {settingsNavigation.find((item) => item.id === activeSection)?.name}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex">
        {/* Settings Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-1">
            {settingsNavigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors text-left",
                  activeSection === item.id
                    ? "bg-orange-50 text-orange-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <item.icon
                  className={cn(
                    "flex-shrink-0 h-5 w-5 mr-3",
                    activeSection === item.id ? "text-orange-500" : "text-gray-400",
                  )}
                />
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">{renderContent()}</div>
      </div>
    </div>
  )
}
