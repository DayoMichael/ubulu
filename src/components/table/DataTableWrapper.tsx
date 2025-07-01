import { useRef, useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { useUsersTableStore } from "@/stores";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { User } from "../../types/user";
import { useUsersQuery } from "../../hooks/users/useUsersQuery";
import { useUserDeletion } from "../../hooks/users/useUserDeletion";
import { useColumns } from "./columns";
import { TableSkeleton } from "./TableSkeleton";
import { TableError } from "./TableError";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "./Pagination";

export function DataTableWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    page,
    pageSize,
    search,
    sortBy,
    sortOrder,
    selectedIds,
    setPage,
    setSearch,
    setSort,
    toggleSelect,
    clearSelection,
    selectAll,
  } = useUsersTableStore();

  const { data, isLoading, isError, refetch } = useUsersQuery();
  const headerCheckboxRef = useRef<HTMLInputElement>(null);
  const { deleteUsers, deletingIds } = useUserDeletion();
  const [searchInput, setSearchInput] = useState(search);

  // Show all users including those being deleted for animation
  const visibleUsers = data?.users || [];

  const handleBulkDelete = () => {
    deleteUsers(selectedIds);
  };

  const handleRowClick = (row: User) => {
    toggleSelect(row.id);
  };

  const columns = useColumns({
    selectedIds,
    sortBy,
    sortOrder,
    setSort,
    toggleSelect,
    deleteUsers,
    headerCheckboxRef,
    data,
    visibleUsers,
    clearSelection,
    selectAll,
  });

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = Boolean(
        selectedIds.length > 0 && data && selectedIds.length < data.users.length
      );
    }
  }, [selectedIds, data]);

  // Sync Zustand store with URL params on mount
  useEffect(() => {
    const urlPage = Number(searchParams.get("page")) || 1;
    const urlSearch = searchParams.get("search") || "";
    const urlSortBy = searchParams.get("sortBy") as keyof User | null;
    const urlSortOrder =
      (searchParams.get("sortOrder") as "asc" | "desc") || "asc";
    if (page !== urlPage) setPage(urlPage);
    if (search !== urlSearch) setSearch(urlSearch);
    if (urlSortBy && sortBy !== urlSortBy) setSort(urlSortBy);
    if (sortOrder !== urlSortOrder && urlSortBy) setSort(urlSortBy); // toggles order if needed
  }, []); // eslint-disable-line

  // Update URL params when state changes
  useEffect(() => {
    setSearchParams({
      page: String(page),
      search,
      sortBy: sortBy || "",
      sortOrder: sortOrder || "asc",
    });
  }, [page, search, sortBy, sortOrder, setSearchParams]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchInput !== search) setSearch(searchInput);
    }, 400);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  return (
    <Card className="max-w-full w-full mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Users Table</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 h-full flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <Input
            placeholder="Search users..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="max-w-xs"
          />
          {selectedIds.length > 0 && (
            <>
              <Button
                variant="destructive"
                onClick={handleBulkDelete}
                className="ml-auto cursor-pointer"
              >
                Delete Selected
              </Button>
              <Button variant="outline" onClick={clearSelection}>
                Clear Selection
              </Button>
            </>
          )}
        </div>
        <div className="overflow-x-auto flex-1">
          {isLoading ? (
            <TableSkeleton />
          ) : isError || !data ? (
            <TableError onRetry={() => refetch()} />
          ) : visibleUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="text-muted-foreground text-lg mb-2">
                No users available
              </div>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={visibleUsers}
              className="h-full min-h-[60vh]"
              deletingIds={deletingIds}
              onRowClick={handleRowClick}
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-2">
        {data ? (
          <>
            <div>
              Page {page} of {Math.max(1, Math.ceil(data.total / pageSize))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={Math.max(1, Math.ceil(data.total / pageSize))}
              onPageChange={setPage}
            />
          </>
        ) : null}
      </CardFooter>
    </Card>
  );
}
