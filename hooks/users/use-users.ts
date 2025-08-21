"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { usersService, type UsersQuery, type CreateUserRequest, type UpdateUserRequest } from "@/services/users.service"

export function useUsers(query: UsersQuery = {}) {
  return useQuery({
    queryKey: ["users", query],
    queryFn: () => usersService.getUsers(query),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useUser(id: number) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => usersService.getUser(id),
    enabled: !!id,
  })
}

export function useRoles() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: usersService.getRoles,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateUserRequest) => usersService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateUserRequest) => usersService.updateUser(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users", updatedUser.id], updatedUser)
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => usersService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}

export function useAssignRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, roleId }: { userId: number; roleId: number }) => usersService.assignRole(userId, roleId),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["users", userId] })
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: number }) => usersService.updateUserStatus(id, status),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users", updatedUser.id], updatedUser)
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}
