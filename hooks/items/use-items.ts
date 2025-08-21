"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { itemsService, type ItemsQuery, type CreateItemRequest, type UpdateItemRequest } from "@/services/items.service"

export function useItems(query: ItemsQuery = {}) {
  return useQuery({
    queryKey: ["items", query],
    queryFn: () => itemsService.getItems(query),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useItem(id: number) {
  return useQuery({
    queryKey: ["items", id],
    queryFn: () => itemsService.getItem(id),
    enabled: !!id,
  })
}

export function useItemCategories() {
  return useQuery({
    queryKey: ["item-categories"],
    queryFn: itemsService.getCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useCreateItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateItemRequest) => itemsService.createItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] })
    },
  })
}

export function useUpdateItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateItemRequest) => itemsService.updateItem(data),
    onSuccess: (updatedItem) => {
      queryClient.setQueryData(["items", updatedItem.id], updatedItem)
      queryClient.invalidateQueries({ queryKey: ["items"] })
    },
  })
}

export function useDeleteItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => itemsService.deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] })
    },
  })
}

export function useUploadItemImage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ itemId, file }: { itemId: number; file: File }) => itemsService.uploadItemImage(itemId, file),
    onSuccess: (_, { itemId }) => {
      queryClient.invalidateQueries({ queryKey: ["items", itemId] })
    },
  })
}
