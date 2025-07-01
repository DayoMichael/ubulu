import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Table as ShadTable, TableBody, TableHeader } from "../ui/table";

export interface Column<T> {
  key: keyof T | string;
  header: React.ReactNode;
  render?: (row: T) => React.ReactNode;
  width?: string | number;
  align?: "left" | "center" | "right";
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
  onRowClick?: (row: T, idx: number) => void;
  rowClassName?: (row: T, idx: number) => string;
  children?: React.ReactNode;
  deletingIds?: number[];
}

export function DataTable<T extends object>({
  columns,
  data,
  className = "",
  onRowClick,
  rowClassName,
  children,
  deletingIds = [],
}: DataTableProps<T>) {
  return (
    <div className={`w-full overflow-x-auto h-full ${className} h-[600px]`}>
      <ShadTable className="table-fixed bg-card text-card-foreground border border-border rounded-lg overflow-hidden h-full min-h-[60vh]">
        <TableHeader>
          <motion.tr
            className="bg-muted/50 dark:bg-muted/80"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {columns.map((col, index) => (
              <motion.th
                key={String(col.key)}
                style={{ width: col.width, textAlign: col.align || "left" }}
                className={`py-2 border-b border-border bg-card text-card-foreground ${
                  col.align ? "" : "text-left"
                } ${col.className || ""}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                {col.header}
              </motion.th>
            ))}
          </motion.tr>
        </TableHeader>
        <TableBody>
          <AnimatePresence mode="popLayout">
            {data.map((row, idx) => {
              const rowId = (row as Record<string, unknown>).id as number;
              const isDeleting = deletingIds.includes(rowId);

              return (
                <motion.tr
                  key={String(rowId) || idx}
                  onClick={onRowClick ? () => onRowClick(row, idx) : undefined}
                  className={`h-12 border-b border-border hover:bg-muted/50 dark:hover:bg-muted/70 cursor-pointer ${
                    rowClassName ? rowClassName(row, idx) : ""
                  } ${isDeleting ? "opacity-50" : ""}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={
                    isDeleting
                      ? {
                          opacity: 0,
                          x: -100,
                          scale: 0.8,
                          height: 0,
                          marginBottom: 0,
                        }
                      : { opacity: 1, y: 0, scale: 1 }
                  }
                  exit={{
                    opacity: 0,
                    x: -100,
                    scale: 0.8,
                    height: 0,
                    marginBottom: 0,
                    transition: { duration: 0.3, ease: "easeInOut" },
                  }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  whileHover={{
                    scale: 1.01,
                    backgroundColor: "hsl(var(--muted) / 0.3)",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  layout
                >
                  {columns.map((col, colIndex) => (
                    <motion.td
                      key={String(col.key)}
                      style={{ textAlign: col.align || "left" }}
                      className={`pr-2 py-2 ${col.align ? "" : "text-left"} ${
                        col.className || ""
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: idx * 0.05 + colIndex * 0.02,
                        ease: "easeOut",
                      }}
                    >
                      {col.render
                        ? col.render(row)
                        : String(
                            (row as Record<string, unknown>)[
                              col.key as string
                            ] ?? ""
                          )}
                    </motion.td>
                  ))}
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </TableBody>
      </ShadTable>
      {children}
    </div>
  );
}
