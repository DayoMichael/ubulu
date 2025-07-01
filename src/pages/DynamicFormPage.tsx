import { motion } from "framer-motion";
import { useState } from "react";
import { DynamicForm } from "../widgets/dynamicform/DynamicForm";
import { JsonEditor } from "../widgets/dynamicform/JSONEditor";
import { Toaster } from "sonner";
import { type FormConfig, type FormData } from "../types/form";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const defaultFormConfig: FormConfig = {
  title: "Dynamic Form Builder Demo",
  description:
    "This form is dynamically rendered based on the configuration below",
  submitButtonText: "Submit Form",
  fields: [
    {
      type: "text",
      label: "Name",
      name: "name",
      required: true,
    },
    {
      type: "email",
      label: "Email",
      name: "email",
      required: true,
    },
    {
      type: "select",
      label: "Gender",
      name: "gender",
      required: true,
      options: ["Male", "Female"],
    },
  ],
};

export function DynamicFormPage() {
  const [formConfig, setFormConfig] = useState<FormConfig>(defaultFormConfig);

  const handleFormSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // In a real app, you would send this data to your API
  };

  const handleConfigChange = (newConfig: FormConfig) => {
    setFormConfig(newConfig);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Top bar: Back to Home + Theme Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-2 pt-3 pb-2 md:px-4 md:pt-6 container mx-auto gap-2">
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 text-base font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-secondary/10 rounded-full blur-xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-40 h-40 bg-accent/10 rounded-full blur-xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent mb-6"
          >
            Task Two
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Custom Form Builder - Dynamically render and validate forms based on
            configuration
          </motion.p>
        </motion.div>

        {/* JSON Editor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-12"
        >
          <div className="max-w-4xl mx-auto">
            <JsonEditor
              config={formConfig}
              onConfigChange={handleConfigChange}
            />
          </div>
        </motion.div>

        {/* Dynamic Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex justify-center"
        >
          <DynamicForm
            config={formConfig}
            onSubmit={handleFormSubmit}
            className="w-full"
          />
        </motion.div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            Features Implemented
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Dynamic Rendering",
                description: "Forms are rendered based on JSON configuration",
                icon: "🎨",
              },
              {
                title: "Zod Validation",
                description: "Type-safe validation with custom error messages",
                icon: "✅",
              },
              {
                title: "Multiple Field Types",
                description:
                  "Support for text, email, select, textarea, number, and checkbox",
                icon: "📝",
              },
              {
                title: "Required Fields",
                description: "Automatic validation for required fields",
                icon: "🔒",
              },
              {
                title: "Custom Validation",
                description: "Min/max length, patterns, and custom rules",
                icon: "⚙️",
              },
              {
                title: "Beautiful UI",
                description:
                  "Animated form with modern design and smooth transitions",
                icon: "✨",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <Toaster />
    </div>
  );
}
