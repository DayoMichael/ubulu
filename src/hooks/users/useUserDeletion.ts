import { useQueryClient } from "@tanstack/react-query";
import { useUsersTableStore } from "@/stores";
import { useCallback } from "react";

export function useUserDeletion() {
  const queryClient = useQueryClient();
  const { deletingIds, deletedIds, selectedIds, toggleSelect, clearSelection } =
    useUsersTableStore();

  const deleteUsers = useCallback(
    (userIds: number[]) => {
      useUsersTableStore.setState((state) => ({
        deletingIds: [...state.deletingIds, ...userIds],
        selectedIds: state.selectedIds.filter((id) => !userIds.includes(id)),
      }));
      setTimeout(() => {
        queryClient.setQueryData(
          [
            "users",
            {
              page: 1,
              pageSize: 10,
              search: "",
              sortBy: null,
              sortOrder: "asc",
            },
          ],
          (old: { users: { id: number }[]; total: number } | undefined) => {
            if (!old) return old;
            return {
              ...old,
              users: old.users.filter((user) => !userIds.includes(user.id)),
              total: Math.max(0, old.total - userIds.length),
            };
          }
        );
        useUsersTableStore.setState((state) => ({
          deletingIds: state.deletingIds.filter((id) => !userIds.includes(id)),
          deletedIds: [...state.deletedIds, ...userIds],
        }));
      }, 350);
    },
    [queryClient]
  );

  return {
    deleteUsers,
    deletingIds,
    deletedIds,
    selectedIds,
    toggleSelect,
    clearSelection,
  };
}
