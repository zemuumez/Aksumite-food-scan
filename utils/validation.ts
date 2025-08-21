import { z } from "zod"

// Auth validation schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
})

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  })

// Item validation schemas
export const itemSchema = z.object({
  name: z.string().min(2, "Item name must be at least 2 characters"),
  categoryId: z.number().min(1, "Please select a category"),
  price: z.number().min(0, "Price must be positive"),
  taxId: z.number().optional(),
  itemType: z.number().min(0).max(1),
  isFeatured: z.boolean(),
  description: z.string().optional(),
  caution: z.string().optional(),
  status: z.number().min(0).max(1),
})

// Order validation schemas
export const orderSchema = z.object({
  branchId: z.number().min(1, "Please select a branch"),
  orderType: z.number().min(1).max(3),
  diningTableId: z.number().optional(),
  items: z
    .array(
      z.object({
        itemId: z.number().min(1),
        quantity: z.number().min(1),
        variationId: z.number().optional(),
        extraId: z.number().optional(),
        instruction: z.string().optional(),
      }),
    )
    .min(1, "At least one item is required"),
  deliveryTime: z.string().optional(),
  address: z.string().optional(),
  paymentMethod: z.number().min(1),
})

// Branch validation schemas
export const branchSchema = z.object({
  name: z.string().min(2, "Branch name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  status: z.number().min(0).max(1),
})

// User validation schemas
export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  username: z.string().optional(),
  branchId: z.number().optional(),
  password: z.string().min(8, "Password must be at least 8 characters").optional(),
  roles: z.array(z.number()).min(1, "At least one role is required"),
  status: z.number().min(0).max(1),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ItemFormData = z.infer<typeof itemSchema>
export type OrderFormData = z.infer<typeof orderSchema>
export type BranchFormData = z.infer<typeof branchSchema>
export type UserFormData = z.infer<typeof userSchema>
