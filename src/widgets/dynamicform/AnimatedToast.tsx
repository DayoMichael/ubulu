import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "../../lib/utils";

interface AnimatedToastProps {
  type: "success" | "error" | "info";
  title: string;
  description?: string;
}

export function AnimatedToast({
  type,
  title,
  description,
}: AnimatedToastProps) {
  const icon =
    type === "success" ? (
      <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
    ) : type === "error" ? (
      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
    ) : (
      <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
    );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 20 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg shadow-lg border",
        "border-white dark:border-white/60 border-[1.5px]",
        "bg-transparent",
        type === "success"
          ? "text-green-700 dark:text-green-300"
          : type === "error"
          ? "text-red-700 dark:text-red-300"
          : "text-blue-700 dark:text-blue-300"
      )}
      style={{ minWidth: 260 }}
    >
      <div className="pt-0.5">{icon}</div>
      <div>
        <div
          className={cn(
            "font-semibold text-base",
            type === "success"
              ? "text-green-700 dark:text-green-300"
              : type === "error"
              ? "text-red-700 dark:text-red-300"
              : "text-blue-700 dark:text-blue-300"
          )}
        >
          {title}
        </div>
        {description && (
          <div className="text-sm text-muted-foreground mt-1 dark:text-white/80">
            {description}
          </div>
        )}
      </div>
    </motion.div>
  );
}
