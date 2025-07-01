import { Skeleton } from "../ui/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";

export function TableSkeleton() {
  return (
    <Card className="max-w-full w-full mx-auto h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Users Table</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 h-full flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="overflow-x-auto flex-1">
          <div className="bg-card text-card-foreground border border-border rounded-lg overflow-hidden h-full min-h-[60vh] w-full">
            <table className="w-full caption-bottom text-sm">
              <thead className="bg-muted/50 dark:bg-muted/80">
                <tr>
                  <th className="pr-2 py-2 border-b border-border bg-card text-card-foreground text-center w-12">
                    <Skeleton className="h-4 w-4 mx-auto" />
                  </th>
                  <th className="pr-2 py-2 border-b border-border bg-card text-card-foreground text-left">
                    <Skeleton className="h-4 w-24" />
                  </th>
                  <th className="pr-2 py-2 border-b border-border bg-card text-card-foreground text-left">
                    <Skeleton className="h-4 w-24" />
                  </th>
                  <th className="pr-2 py-2 border-b border-border bg-card text-card-foreground text-left">
                    <Skeleton className="h-4 w-32" />
                  </th>
                  <th className="pr-2 py-2 border-b border-border bg-card text-card-foreground text-center">
                    <Skeleton className="h-4 w-12 mx-auto" />
                  </th>
                  <th className="pr-2 py-2 border-b border-border bg-card text-card-foreground text-center">
                    <Skeleton className="h-4 w-16 mx-auto" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(10)].map((_, i) => (
                  <tr
                    key={i}
                    className="border-b border-border hover:bg-muted/50 dark:hover:bg-muted/70"
                  >
                    <td className="pr-2 py-2 text-center">
                      <Skeleton className="h-4 w-4 mx-auto rounded" />
                    </td>
                    <td className="pr-2 py-2 text-left">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="pr-2 py-2 text-left">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="pr-2 py-2 text-left">
                      <Skeleton className="h-4 w-32" />
                    </td>
                    <td className="pr-2 py-2 text-center">
                      <Skeleton className="h-4 w-8 mx-auto" />
                    </td>
                    <td className="pr-2 py-2 text-center">
                      <Skeleton className="h-8 w-16 mx-auto rounded" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-48" />
      </CardFooter>
    </Card>
  );
}
