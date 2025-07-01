import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Form } from "../../components/ui/form";
import { DynamicFormField } from "./DynamicFormField";
import {
  generateFormSchema,
  type FormConfig,
  type FormData,
} from "../../types/form";
import { useState } from "react";

interface DynamicFormProps {
  config: FormConfig;
  onSubmit?: (data: FormData) => void;
  className?: string;
}

export function DynamicForm({ config, onSubmit, className }: DynamicFormProps) {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = generateFormSchema(config);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: config.fields.reduce((acc, field) => {
      acc[field.name] = field.type === "checkbox" ? false : "";
      return acc;
    }, {} as Record<string, unknown>),
  });

  const handleSubmit = (data: FormData) => {
    setSubmittedData(data);
    setIsSubmitted(true);
    onSubmit?.(data);

    setTimeout(() => {
      setIsSubmitted(false);
      setSubmittedData(null);
      form.reset();
    }, 3000);
  };

  if (isSubmitted && submittedData) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={className}
      >
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                className="w-8 h-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <CardTitle className="text-2xl font-bold text-green-600 dark:text-green-400">
              Form Submitted Successfully!
            </CardTitle>
            <CardDescription>
              Thank you for your submission. Here's what you entered:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              {Object.entries(submittedData).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                >
                  <span className="font-medium capitalize">{key}:</span>
                  <span className="text-muted-foreground">
                    {typeof value === "boolean"
                      ? value
                        ? "Yes"
                        : "No"
                      : String(value)}
                  </span>
                </div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {config.title}
          </CardTitle>
          {config.description && (
            <CardDescription className="text-lg">
              {config.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                {config.fields.map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                  >
                    <DynamicFormField field={field} control={form.control} />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center pt-4"
              >
                <Button
                  type="submit"
                  size="lg"
                  className="px-8 py-3 text-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                    />
                  ) : (
                    config.submitButtonText || "Submit Form"
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
