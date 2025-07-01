import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import type { Column } from "./DataTable";
import type { User } from "../../types/user";

interface UseColumnsProps {
  selectedIds: number[];
  sortBy: keyof User | null;
  sortOrder: "asc" | "desc";
  setSort: (sortBy: keyof User) => void;
  toggleSelect: (id: number) => void;
  deleteUsers: (ids: number[]) => void;
  headerCheckboxRef: React.RefObject<HTMLInputElement | null>;
  data: { users: User[] } | undefined;
  visibleUsers: User[];
  clearSelection: () => void;
  selectAll: (ids: number[]) => void;
}

export function useColumns({
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
}: UseColumnsProps): Column<User>[] {
  const getSortIndicator = (col: keyof User) => {
    if (sortBy !== col)
      return (
        <ArrowUpDown className="w-4 h-4 inline ml-1 text-muted-foreground" />
      );
    return sortOrder === "asc" ? (
      <ArrowUp className="w-4 h-4 inline ml-1" />
    ) : (
      <ArrowDown className="w-4 h-4 inline ml-1" />
    );
  };

  return [
    {
      key: "select",
      header: (
        <input
          type="checkbox"
          ref={headerCheckboxRef}
          checked={
            !!(
              data &&
              data.users.length > 0 &&
              selectedIds.length === visibleUsers.length &&
              visibleUsers.length > 0
            )
          }
          onChange={() => {
            if (data && selectedIds.length === visibleUsers.length) {
              clearSelection();
            } else if (data) {
              selectAll(visibleUsers.map((u: User) => u.id));
            }
          }}
          className="size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        />
      ),
      render: (row) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={selectedIds.includes(row.id)}
            onCheckedChange={() => toggleSelect(row.id)}
          />
        </div>
      ),
      width: 48,
      align: "center",
    },
    {
      key: "firstName",
      header: (
        <button
          type="button"
          className="font-semibold flex items-center gap-1"
          onClick={() => setSort("firstName")}
        >
          First Name {getSortIndicator("firstName")}
        </button>
      ),
      sortable: true,
    },
    {
      key: "lastName",
      header: (
        <button
          type="button"
          className="font-semibold flex items-center gap-1"
          onClick={() => setSort("lastName")}
        >
          Last Name {getSortIndicator("lastName")}
        </button>
      ),
      sortable: true,
    },
    {
      key: "email",
      header: (
        <button
          type="button"
          className="font-semibold flex items-center gap-1"
          onClick={() => setSort("email")}
        >
          Email {getSortIndicator("email")}
        </button>
      ),
      sortable: true,
    },
    {
      key: "age",
      header: "Age",
      align: "center",
    },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      width: 100,
      render: (row) => (
        <Button
          variant="destructive"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            deleteUsers([row.id]);
          }}
          className="h-8 px-2 cursor-pointer"
        >
          Delete
        </Button>
      ),
    },
  ];
}
