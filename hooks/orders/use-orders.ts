"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  ordersService,
  type OrdersQuery,
  type CreateOrderRequest,
  type UpdateOrderStatusRequest,
} from "@/services/orders.service"

export function useOrders(query: OrdersQuery = {}) {
  return useQuery({
    queryKey: ["orders", query],
    queryFn: () => ordersService.getOrders(query),
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
  })
}

export function useOrder(id: number) {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => ordersService.getOrder(id),
    enabled: !!id,
    refetchInterval: 10000, // Refetch every 10 seconds for order details
  })
}

export function useKitchenOrders(branchId?: number) {
  return useQuery({
    queryKey: ["orders", "kitchen", branchId],
    queryFn: () => ordersService.getKitchenOrders(branchId),
    refetchInterval: 5000, // Refetch every 5 seconds for kitchen display
  })
}

export function useCreateOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateOrderRequest) => ordersService.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] })
    },
  })
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateOrderStatusRequest }) =>
      ordersService.updateOrderStatus(id, data),
    onSuccess: (updatedOrder) => {
      queryClient.setQueryData(["orders", updatedOrder.id], updatedOrder)
      queryClient.invalidateQueries({ queryKey: ["orders"] })
    },
  })
}

export function useCancelOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, reason }: { id: number; reason?: string }) => ordersService.cancelOrder(id, reason),
    onSuccess: (updatedOrder) => {
      queryClient.setQueryData(["orders", updatedOrder.id], updatedOrder)
      queryClient.invalidateQueries({ queryKey: ["orders"] })
    },
  })
}
