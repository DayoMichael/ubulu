import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUsersTableStore } from "../../stores/users/usersTableStore";
import { useMemo } from "react";
import type { User } from "../../types/user";

interface UsersData {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export function useUserMutations() {
  const queryClient = useQueryClient();
  const { page, pageSize, search, sortBy, sortOrder } = useUsersTableStore();

  // Memoize the query key to prevent unnecessary re-renders
  const queryKey = useMemo(
    () => ["users", { page, pageSize, search, sortBy, sortOrder }],
    [page, pageSize, search, sortBy, sortOrder]
  );

  const deleteUsersMutation = useMutation({
    mutationFn: async (userIds: number[]) => {
      // In a real app, this would be an API call
      // For now, we'll simulate the deletion
      return Promise.resolve({ deletedIds: userIds });
    },
    onMutate: async (userIds: number[]) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData(queryKey);

      // Optimistically update the cache to remove the users
      queryClient.setQueryData(queryKey, (old: UsersData | undefined) => {
        if (!old) return old;

        return {
          ...old,
          users: old.users.filter((user: User) => !userIds.includes(user.id)),
          total: Math.max(0, old.total - userIds.length),
        };
      });

      // Return a context object with the snapshotted value
      return { previousData };
    },
    onError: (err, userIds, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      // Don't invalidate since we're using optimistic updates
      // The optimistic update is our source of truth
    },
  });

  const deleteUser = (userId: number) => {
    return deleteUsersMutation.mutate([userId]);
  };

  const deleteMultipleUsers = (userIds: number[]) => {
    return deleteUsersMutation.mutate(userIds);
  };

  return {
    deleteUser,
    deleteMultipleUsers,
    isDeleting: deleteUsersMutation.isPending,
    error: deleteUsersMutation.error,
  };
}
