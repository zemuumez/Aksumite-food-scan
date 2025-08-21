export interface User {
  id: number
  name: string
  email: string
  phone: string
  username?: string
  emailVerifiedAt?: string
  deviceToken?: string
  webToken?: string
  branchId?: number
  countryCode?: string
  isGuest: boolean
  status: number
  balanceNumeric: number
  createdAt: string
  updatedAt: string
  roles?: Role[]
  branch?: Branch
}

export interface Role {
  id: number
  name: string
  guardName: string
  createdAt: string
  updatedAt: string
  permissions?: Permission[]
}

export interface Permission {
  id: number
  title: string
  name: string
  guardName: string
  url?: string
  parent?: number
  createdAt: string
  updatedAt: string
}

export interface Branch {
  id: number
  name: string
  email: string
  phone: string
  latitude?: string
  longitude?: string
  city: string
  state: string
  zipCode: string
  address: string
  status: number
  createdAt: string
  updatedAt: string
}

export interface Item {
  id: number
  name: string
  categoryId: number
  slug: string
  taxId?: number
  itemType: number // 0: Veg, 1: Non-Veg
  price: number
  isFeatured: boolean
  description?: string
  caution?: string
  status: number
  order: number
  createdAt: string
  updatedAt: string
  category?: ItemCategory
  tax?: Tax
  variations?: ItemVariation[]
  extras?: ItemExtra[]
  media?: Media[]
}

export interface ItemCategory {
  id: number
  name: string
  slug: string
  description?: string
  status: number
  sort: number
  createdAt: string
  updatedAt: string
}

export interface ItemVariation {
  id: number
  itemId: number
  attributeId: number
  name: string
  price: number
  caution?: string
  status: number
  createdAt: string
  updatedAt: string
  attribute?: ItemAttribute
}

export interface ItemAttribute {
  id: number
  name: string
  status: number
  createdAt: string
  updatedAt: string
}

export interface ItemExtra {
  id: number
  itemId: number
  name: string
  status: number
  price: number
  createdAt: string
  updatedAt: string
}

export interface Tax {
  id: number
  name: string
  code: string
  taxRate: string
  type: number
  status: number
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: number
  orderSerialNo: string
  token: string
  userId?: number
  branchId: number
  subtotal: number
  discount: number
  deliveryCharge: number
  totalTax: number
  total: number
  orderType: number // 1: Dine-in, 2: Takeaway, 3: Delivery
  orderDateTime: string
  deliveryTime?: string
  preparationTime: number
  isAdvanceOrder: number
  address?: string
  paymentMethod: number
  paymentStatus: number
  status: number // 1: Pending, 2: Confirmed, 3: Preparing, 4: Ready, 5: Completed, 6: Cancelled
  diningTableId?: number
  source: number
  posPaymentMethod?: string
  posPaymentNote?: string
  posReceivedAmount?: number
  createdAt: string
  updatedAt: string
  user?: User
  branch?: Branch
  diningTable?: DiningTable
  orderItems?: OrderItem[]
}

export interface OrderItem {
  id: number
  orderId: number
  branchId: number
  itemId: number
  quantity: number
  discount: number
  taxName?: string
  taxRate?: string
  taxType?: number
  taxAmount: number
  price: number
  variationId?: number
  extraId?: number
  itemVariationTotal: number
  itemExtraTotal: number
  totalPrice: number
  instruction?: string
  createdAt: string
  updatedAt: string
  item?: Item
  variation?: ItemVariation
  extra?: ItemExtra
}

export interface DiningTable {
  id: number
  name: string
  slug: string
  qrCode: string
  size: number
  branchId: number
  waiterId?: number
  status: number
  createdAt: string
  updatedAt: string
  branch?: Branch
  waiter?: User
}

export interface Transaction {
  id: number
  orderId: number
  transactionNo: string
  amount: number
  paymentMethod: string
  type: string
  sign: string
  createdAt: string
  updatedAt: string
  order?: Order
}

export interface Offer {
  id: number
  name: string
  slug: string
  amount: number
  status: number
  startDate: string
  endDate: string
  createdAt: string
  updatedAt: string
  items?: Item[]
}

export interface Media {
  id: number
  modelType: string
  modelId: number
  uuidValue: string
  collectionName: string
  name: string
  fileName: string
  mimeType: string
  disk: string
  size: string
  createdAt: string
  updatedAt: string
}

export interface LoginRequest {
  email: string
  password: string
  remember?: boolean
}

export interface LoginResponse {
  user: User
  token: string
  expiresIn: number
}

export interface RegisterRequest {
  name: string
  email: string
  phone: string
  password: string
  passwordConfirmation: string
}
