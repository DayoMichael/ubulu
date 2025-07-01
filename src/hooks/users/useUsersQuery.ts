import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/usersApi";
import { useUsersTableStore } from "../../stores/users/usersTableStore";

export function useUsersQuery() {
  const { page, pageSize, search, sortBy, sortOrder, deletedIds } =
    useUsersTableStore();
  return useQuery({
    queryKey: ["users", { page, pageSize, search, sortBy, sortOrder }],
    staleTime: Infinity, // Never refetch automatically
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    queryFn: async () => {
      // Always get the total users count first (without search)
      const totalUsersResponse = await fetchUsers({
        limit: 1,
        skip: 0,
        search: "",
      });

      // Get the current page data (with or without search)
      const data = await fetchUsers({
        limit: pageSize,
        skip: (page - 1) * pageSize,
        search,
      });

      // Filter out permanently deleted users
      const filteredUsers = data.users.filter(
        (user) => !deletedIds.includes(user.id)
      );

      // Client-side sort if sortBy is set
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
        // Always use the total from the API (total users in the system)
        total: totalUsersResponse.total - deletedIds.length,
        // Add search results count separately
        searchResults: search ? data.total : null,
      };
    },
  });
}
