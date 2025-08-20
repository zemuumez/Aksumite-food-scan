"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Eye,
  Edit,
  Trash2,
  Plus,
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

  const renderCompanySettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Company</h2>
        <p className="text-gray-600">Configure your company information and details.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company-name">Name *</Label>
              <Input
                id="company-name"
                defaultValue="Kaleb Hotel - QrCode Restaurant Menu Maker and Contactless"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-email">Email *</Label>
              <Input id="company-email" defaultValue="info@kalebhotel.com" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-phone">Phone *</Label>
              <Input id="company-phone" defaultValue="+251911234567" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-website">Website</Label>
              <Input id="company-website" defaultValue="https://kalebhotel.com" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-city">City *</Label>
              <Input id="company-city" defaultValue="Addis Ababa" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-state">State *</Label>
              <Input id="company-state" defaultValue="Addis Ababa" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country-code">Country Code *</Label>
              <Select defaultValue="ethiopia">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ethiopia">Ethiopia (ETH)</SelectItem>
                  <SelectItem value="usa">United States (USA)</SelectItem>
                  <SelectItem value="uk">United Kingdom (UK)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip-code">Zip Code *</Label>
              <Input id="zip-code" defaultValue="1000" className="w-full" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="company-address">Address *</Label>
              <Textarea
                id="company-address"
                defaultValue="Bole Road, Near Edna Mall, Addis Ababa 1000"
                className="w-full"
                rows={3}
              />
            </div>
          </div>
          <div className="mt-6">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSiteSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Site</h2>
        <p className="text-gray-600">Configure site-wide settings and preferences.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date-format">Date Format *</Label>
              <Select defaultValue="d-m-Y">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="d-m-Y">d-m-Y (17-08-2025)</SelectItem>
                  <SelectItem value="m-d-Y">m-d-Y (08-17-2025)</SelectItem>
                  <SelectItem value="Y-m-d">Y-m-d (2025-08-17)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time-format">Time Format *</Label>
              <Select defaultValue="12">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12 Hour (8:02 PM)</SelectItem>
                  <SelectItem value="24">24 Hour (20:02)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Default Timezone *</Label>
              <Select defaultValue="africa-addis">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="africa-addis">Africa/Addis_Ababa</SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="america-new-york">America/New_York</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="default-branch">Default Branch *</Label>
              <Select defaultValue="main">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Branch</SelectItem>
                  <SelectItem value="bole">Bole Branch</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="default-language">Default Language *</Label>
              <Select defaultValue="english">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="amharic">Amharic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sms-gateway">Default SMS Gateway</Label>
              <Select defaultValue="">
                <SelectTrigger>
                  <SelectValue placeholder="--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="twilio">Twilio</SelectItem>
                  <SelectItem value="nexmo">Nexmo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="copyright">Copyright *</Label>
              <Input
                id="copyright"
                defaultValue="© Kaleb Hotel by KalebTech 2025, All Rights Reserved"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="google-map-key">Google Map Key *</Label>
              <Input id="google-map-key" defaultValue="fake-map-key" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="decimal-digits">Digit After Decimal Point (Ex: 0.00) *</Label>
              <Input id="decimal-digits" defaultValue="2" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="default-currency">Default Currency *</Label>
              <Select defaultValue="etb">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="etb">Ethiopian Birr (ETB)</SelectItem>
                  <SelectItem value="usd">US Dollar ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="prep-time">Food Preparation Time (In Minute) *</Label>
              <Input id="prep-time" defaultValue="30" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label>Currency Position *</Label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="currency-position"
                    value="left"
                    defaultChecked
                    className="text-orange-500"
                  />
                  <span>(ETB) Left</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="currency-position" value="right" className="text-orange-500" />
                  <span>Right (ETB)</span>
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Online Payment Gateway *</Label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="payment-gateway"
                    value="enable"
                    defaultChecked
                    className="text-orange-500"
                  />
                  <span>Enable</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="payment-gateway" value="disable" className="text-orange-500" />
                  <span>Disable</span>
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Language Switch *</Label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="language-switch"
                    value="enable"
                    defaultChecked
                    className="text-orange-500"
                  />
                  <span>Enable</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="language-switch" value="disable" className="text-orange-500" />
                  <span>Disable</span>
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email Verification *</Label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="email-verification"
                    value="enable"
                    defaultChecked
                    className="text-orange-500"
                  />
                  <span>Enable</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="email-verification" value="disable" className="text-orange-500" />
                  <span>Disable</span>
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Phone Verification *</Label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="phone-verification" value="enable" className="text-orange-500" />
                  <span>Enable</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="phone-verification"
                    value="disable"
                    defaultChecked
                    className="text-orange-500"
                  />
                  <span>Disable</span>
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <Label>App Debug *</Label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="app-debug" value="enable" className="text-orange-500" />
                  <span>Enable</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="app-debug" value="disable" defaultChecked className="text-orange-500" />
                  <span>Disable</span>
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderMailSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Mail</h2>
        <p className="text-gray-600">Configure email settings and SMTP configuration.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="mail-host">Mail Host *</Label>
              <Input id="mail-host" defaultValue="mail.kalebhotel.com" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mail-port">Mail Port *</Label>
              <Input id="mail-port" defaultValue="465" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mail-username">Mail Username *</Label>
              <Input id="mail-username" defaultValue="noreply@kalebhotel.com" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mail-password">Mail Password</Label>
              <Input id="mail-password" type="password" defaultValue="rb-XOS3-dc4q" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mail-from-name">Mail From Name *</Label>
              <Input id="mail-from-name" defaultValue="Kaleb Hotel - Food Manager" className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mail-from-email">Mail From Email *</Label>
              <Input id="mail-from-email" defaultValue="noreply@kalebhotel.com" className="w-full" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Mail Encryption *</Label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="mail-encryption" value="ssl" defaultChecked className="text-orange-500" />
                  <span>SSL</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="mail-encryption" value="tls" className="text-orange-500" />
                  <span>TLS</span>
                </label>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderOTPSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">OTP</h2>
        <p className="text-gray-600">Configure OTP settings for verification.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="otp-type">OTP Type *</Label>
              <Select defaultValue="both">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="both">BOTH</SelectItem>
                  <SelectItem value="email">Email Only</SelectItem>
                  <SelectItem value="sms">SMS Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="otp-digit-limit">OTP Digit Limit *</Label>
              <Select defaultValue="4">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="otp-expire-time">OTP Expire Time *</Label>
              <Select defaultValue="10">
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Minutes</SelectItem>
                  <SelectItem value="10">10 Minutes</SelectItem>
                  <SelectItem value="15">15 Minutes</SelectItem>
                  <SelectItem value="30">30 Minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-6">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderThemeSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Theme</h2>
        <p className="text-gray-600">Upload and manage your brand assets.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Logo (128px, 43px)</Label>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="w-32 h-12 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-BYdpBgNYu6rgIiu3j7LSEzUOmtiVEW.png"
                      alt="Current Logo"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Fav Icon (120px, 120px)</Label>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                    <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">K</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4 md:col-span-2">
              <div>
                <Label className="text-sm font-medium text-gray-700">Footer Logo (144px, 48px)</Label>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="w-36 h-12 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-BYdpBgNYu6rgIiu3j7LSEzUOmtiVEW.png"
                      alt="Footer Logo"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderBranchesSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Branches</h2>
          <p className="text-gray-600">Manage restaurant branches and locations.</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Branch
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Bole Branch</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Main Branch (Default)</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-700">Showing 1 to 2 of 2 entries</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificationAlertSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Notification Alert</h2>
        <p className="text-gray-600">Configure notification alerts and messages.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="mail" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mail">Mail</TabsTrigger>
              <TabsTrigger value="sms">Sms</TabsTrigger>
              <TabsTrigger value="push">Push Notification</TabsTrigger>
            </TabsList>
            <TabsContent value="mail" className="space-y-6 mt-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Mail Notification Messages</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Admin And Branch Manager New Order Message</h4>
                      <p className="text-sm text-gray-600 mt-1">You have a new order.</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Save</Button>
            </TabsContent>
            <TabsContent value="sms" className="space-y-6 mt-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">SMS Notification Messages</h3>
                <p className="text-gray-600">SMS notification settings will be configured here.</p>
              </div>
            </TabsContent>
            <TabsContent value="push" className="space-y-6 mt-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notification Messages</h3>
                <p className="text-gray-600">Push notification settings will be configured here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )

  const renderAnalyticsSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Analytics</h2>
          <p className="text-gray-600">Configure analytics and tracking settings.</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Analytics
        </Button>
      </div>

      <Card>
        <CardContent className="p-12">
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="h-12 w-12 text-blue-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No data available.</h3>
            <p className="text-gray-600">Analytics configurations will appear here once added.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderDefaultSettings = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Settings</h2>
        <p className="text-gray-600">Select a category from the sidebar to configure settings.</p>
      </div>

      <Card>
        <CardContent className="p-12">
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Settings className="h-12 w-12 text-orange-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Choose a Settings Category</h3>
            <p className="text-gray-600">Select from the sidebar to configure your restaurant settings.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderItemAttributesSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Item Attributes</h2>
          <p className="text-gray-600">Manage menu item attributes and variations.</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Item Attribute
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  "Egg Variation",
                  "Choose a filling",
                  "Steak Temperature",
                  "Steak Size",
                  "Quantity Choice",
                  "Size",
                ].map((attribute, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{attribute}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-700">Showing 1 to 6 of 6 entries</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTaxesSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Taxes</h2>
          <p className="text-gray-600">Manage tax rates and configurations.</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Tax
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tax Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { name: "GST", code: "GST-10%", rate: "10.00" },
                  { name: "GST", code: "GST-5%", rate: "5.00" },
                  { name: "VAT", code: "VAT-10%", rate: "10.00" },
                  { name: "VAT", code: "VAT-5%", rate: "5.00" },
                  { name: "No-VAT", code: "VAT-0", rate: "0.00" },
                ].map((tax, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tax.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tax.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tax.rate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-700">Showing 1 to 5 of 5 entries</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPagesSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Pages</h2>
          <p className="text-gray-600">Manage static pages and content.</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Page
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {["Contact Us", "About Us", "Cookies Policy"].map((page, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{page}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-700">Showing 1 to 3 of 3 entries</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderLanguagesSettings = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Languages</h2>
            <p className="text-gray-600">Manage system languages and localization.</p>
          </div>
          <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
            <DialogTrigger asChild>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Language
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Languages</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lang-name">Name *</Label>
                    <Input id="lang-name" placeholder="Language name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lang-code">Code *</Label>
                    <Input id="lang-code" placeholder="Language code" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Image</Label>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                    <span className="text-sm text-gray-500">No file chosen</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Display Mode *</Label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="display-mode" value="ltr" defaultChecked className="text-orange-500" />
                      <span>LTR</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="display-mode" value="rtl" className="text-orange-500" />
                      <span>RTL</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Status *</Label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="status" value="active" defaultChecked className="text-orange-500" />
                      <span>Active</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="status" value="inactive" className="text-orange-500" />
                      <span>Inactive</span>
                    </label>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setShowLanguageDialog(false)}>
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
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { name: "Arabic", code: "ar" },
                    { name: "German", code: "de" },
                    { name: "Bangla", code: "bn" },
                    { name: "English(Default)", code: "en", isDefault: true },
                  ].map((language, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{language.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{language.code}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {!language.isDefault && (
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
              <p className="text-sm text-gray-700">Showing 1 to 4 of 4 entries</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderCurrenciesSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Currencies</h2>
          <p className="text-gray-600">Manage supported currencies and exchange rates.</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Currency
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Is Cryptocurrency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exchange Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { name: "Peso", symbol: "₱", code: "ARS", crypto: false, rate: "1" },
                  { name: "Naira", symbol: "₦", code: "NGN", crypto: false, rate: "1" },
                  { name: "Taka", symbol: "৳", code: "BDT", crypto: false, rate: "1" },
                  { name: "Rupee", symbol: "₹", code: "INR", crypto: false, rate: "1" },
                  { name: "Dollars(Default)", symbol: "$", code: "USD", crypto: false, rate: "1", isDefault: true },
                ].map((currency, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{currency.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{currency.symbol}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{currency.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">No</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{currency.rate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {!currency.isDefault && (
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
            <p className="text-sm text-gray-700">Showing 1 to 5 of 5 entries</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderItemCategoriesSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Item Categories</h2>
          <p className="text-gray-600">Manage menu item categories and organization.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="10">
            <SelectTrigger className="w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export</Button>
          <Button variant="outline">Import</Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Item Category
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <Package className="h-4 w-4" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  "Appetizers",
                  "Flame Grill Burgers",
                  "Veggie & Plant Based Burgers",
                  "Sandwich from the Grill",
                  "Hot Chicken Entrees",
                  "Beef Entrees",
                  "Seafood Entrees",
                  "House Special Salads",
                  "Zoop Soups",
                  "Side Orders",
                ].map((category, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Package className="h-4 w-4 text-gray-400" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-800">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-700">Showing 1 to 10 of 11 entries</p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                &lt;
              </Button>
              <Button variant="outline" size="sm" className="bg-orange-500 text-white">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                &gt;
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

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
                          <Checkbox checked={permission.view} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{permission.page}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {permission.create && <Checkbox checked />}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {permission.update && <Checkbox checked />}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {permission.delete && <Checkbox checked />}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <Checkbox checked={permission.view} />
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
        return renderCompanySettings()
      case "site":
        return renderSiteSettings()
      case "mail":
        return renderMailSettings()
      case "otp":
        return renderOTPSettings()
      case "theme":
        return renderThemeSettings()
      case "branches":
        return renderBranchesSettings()
      case "notification-alert":
        return renderNotificationAlertSettings()
      case "analytics":
        return renderAnalyticsSettings()
      case "item-attributes":
        return renderItemAttributesSettings()
      case "taxes":
        return renderTaxesSettings()
      case "pages":
        return renderPagesSettings()
      case "languages":
        return renderLanguagesSettings()
      case "currencies":
        return renderCurrenciesSettings()
      case "item-categories":
        return renderItemCategoriesSettings()
      case "role-permissions":
        return renderRolePermissionsSettings()
      default:
        return renderDefaultSettings()
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
