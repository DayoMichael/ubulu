import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUsersTableStore } from "@/stores";
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
  const queryKey = useMemo(
    () => ["users", { page, pageSize, search, sortBy, sortOrder }],
    [page, pageSize, search, sortBy, sortOrder]
  );

  const deleteUsersMutation = useMutation({
    mutationFn: async (userIds: number[]) => {
      return Promise.resolve({ deletedIds: userIds });
    },
    onMutate: async (userIds: number[]) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old: UsersData | undefined) => {
        if (!old) return old;

        return {
          ...old,
          users: old.users.filter((user: User) => !userIds.includes(user.id)),
          total: Math.max(0, old.total - userIds.length),
        };
      });

      return { previousData };
    },
    onError: (_err, _userIds, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {},
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
