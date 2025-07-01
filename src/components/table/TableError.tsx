import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface TableErrorProps {
  onRetry?: () => void;
  message?: string;
}

export function TableError({
  onRetry,
  message = "Failed to load users",
}: TableErrorProps) {
  return (
    <Card className="max-w-full w-full mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Users Table</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-64 text-center space-y-4">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">{message}</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              We encountered an issue while loading the users. Please check your
              connection and try again.
            </p>
          </div>
        </div>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
