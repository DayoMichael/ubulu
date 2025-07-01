import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/usersApi";
import { useUsersTableStore } from "../../stores/users/usersTableStore";

export function useUsersQuery() {
  const { page, pageSize, search, sortBy, sortOrder, deletedIds } =
    useUsersTableStore();
  return useQuery({
    queryKey: ["users", { page, pageSize, search, sortBy, sortOrder }],
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    queryFn: async () => {
      const totalUsersResponse = await fetchUsers({
        limit: 1,
        skip: 0,
        search: "",
      });
      const data = await fetchUsers({
        limit: pageSize,
        skip: (page - 1) * pageSize,
        search,
      });

      const filteredUsers = data.users.filter(
        (user) => !deletedIds.includes(user.id)
      );
      if (sortBy) {
        filteredUsers.sort((a, b) => {
          const aValue = a[sortBy] ?? "";
          const bValue = b[sortBy] ?? "";
          if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
          if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
          return 0;
        });
      }

      return {
        ...data,
        users: filteredUsers,
        total: totalUsersResponse.total - deletedIds.length,
        searchResults: search ? data.total : null,
      };
    },
  });
}
