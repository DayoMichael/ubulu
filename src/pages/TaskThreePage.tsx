import { ThemeToggle } from "../components/ui/ThemeToggle";
import { ArrowLeft, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export const TaskThreePage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header with back navigation */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="text-center py-20">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-primary/10">
              <Settings className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Task Three</h1>
          <p className="text-xl text-muted-foreground mb-8">
            System configuration and settings management
          </p>
          <p className="text-muted-foreground">
            This page is under development. Coming soon with advanced
            customization options and system settings.
          </p>
        </div>
      </div>
    </div>
  );
};
