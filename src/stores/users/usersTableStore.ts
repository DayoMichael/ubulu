import { create } from "zustand";
import type { User } from "../../types/user";

export interface UsersTableState {
  page: number;
  pageSize: number;
  search: string;
  sortBy: keyof User | null;
  sortOrder: "asc" | "desc";
  selectedIds: number[];
  deletedIds: number[];
  deletingIds: number[];
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSearch: (search: string) => void;
  setSort: (sortBy: keyof User) => void;
  toggleSelect: (id: number) => void;
  clearSelection: () => void;
  selectAll: (ids: number[]) => void;
  deleteUsers: (ids: number[]) => void;
  clearDeletedIds: () => void;
}

export const useUsersTableStore = create<UsersTableState>((set) => ({
  page: 1,
  pageSize: 10,
  search: "",
  sortBy: null,
  sortOrder: "asc",
  selectedIds: [],
  deletedIds: [],
  deletingIds: [],
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize }),
  setSearch: (search) => set({ search, page: 1 }),
  setSort: (sortBy) =>
    set((state) => {
      if (state.sortBy === sortBy) {
        return { sortOrder: state.sortOrder === "asc" ? "desc" : "asc" };
      } else {
        return { sortBy, sortOrder: "asc" };
      }
    }),
  toggleSelect: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((sid) => sid !== id)
        : [...state.selectedIds, id],
    })),
  clearSelection: () => set({ selectedIds: [] }),
  selectAll: (ids) => set({ selectedIds: ids }),
  deleteUsers: (ids) => {
    set((state) => ({
      deletingIds: [...state.deletingIds, ...ids],
      selectedIds: state.selectedIds.filter((id) => !ids.includes(id)),
    }));

    setTimeout(() => {
      set((state) => ({
        deletingIds: state.deletingIds.filter((id) => !ids.includes(id)),
        deletedIds: [...state.deletedIds, ...ids],
      }));
    }, 350);
  },
  clearDeletedIds: () => set({ deletedIds: [] }),
}));
