"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  branchesService,
  type BranchesQuery,
  type CreateBranchRequest,
  type UpdateBranchRequest,
} from "@/services/branches.service"

export function useBranches(query: BranchesQuery = {}) {
  return useQuery({
    queryKey: ["branches", query],
    queryFn: () => branchesService.getBranches(query),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useBranch(id: number) {
  return useQuery({
    queryKey: ["branches", id],
    queryFn: () => branchesService.getBranch(id),
    enabled: !!id,
  })
}

export function useBranchStats(id: number) {
  return useQuery({
    queryKey: ["branches", id, "stats"],
    queryFn: () => branchesService.getBranchStats(id),
    enabled: !!id,
    refetchInterval: 60000, // Refetch every minute
  })
}

export function useCreateBranch() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateBranchRequest) => branchesService.createBranch(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branches"] })
    },
  })
}

export function useUpdateBranch() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateBranchRequest) => branchesService.updateBranch(data),
    onSuccess: (updatedBranch) => {
      queryClient.setQueryData(["branches", updatedBranch.id], updatedBranch)
      queryClient.invalidateQueries({ queryKey: ["branches"] })
    },
  })
}

export function useDeleteBranch() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => branchesService.deleteBranch(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branches"] })
    },
  })
}
