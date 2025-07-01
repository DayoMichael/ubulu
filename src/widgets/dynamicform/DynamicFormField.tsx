import { motion } from "framer-motion";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { FormField, FormControl, FormMessage } from "../../components/ui/form";
import { cn } from "../../lib/utils";
import type { FormField as FormFieldType } from "../../types/form";
import type { Control } from "react-hook-form";

interface DynamicFormFieldProps {
  field: FormFieldType;
  control: Control<Record<string, unknown>>;
  className?: string;
}

export function DynamicFormField({
  field,
  control,
  className,
}: DynamicFormFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("space-y-2", className)}
    >
      {field.type !== "checkbox" && (
        <Label htmlFor={field.name} className="text-sm font-medium">
          {field.label}
          {field.required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <FormField
        control={control}
        name={field.name}
        render={({ field: formFieldProps }) => (
          <div className="space-y-1">
            <FormControl>
              {field.type === "text" ||
              field.type === "email" ||
              field.type === "number" ? (
                //@ts-expect-error its a known issue
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="transition-all duration-200 focus:scale-[1.02]"
                  {...formFieldProps}
                />
              ) : field.type === "textarea" ? (
                //@ts-expect-error its a known issue
                <Textarea
                  placeholder={field.placeholder}
                  className="min-h-[100px] transition-all duration-200 focus:scale-[1.02]"
                  {...formFieldProps}
                />
              ) : field.type === "select" ? (
                <Select
                  onValueChange={formFieldProps.onChange}
                  value={formFieldProps.value as string}
                >
                  <SelectTrigger className="transition-all duration-200 focus:scale-[1.02]">
                    <SelectValue
                      placeholder={field.placeholder || `Select ${field.label}`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === "checkbox" ? (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    className="transition-all duration-200 hover:scale-110"
                    checked={
                      formFieldProps.value === "true" ||
                      formFieldProps.value === true
                    }
                    onCheckedChange={(checked) =>
                      formFieldProps.onChange(checked ? "true" : "false")
                    }
                  />
                  <Label htmlFor={field.name} className="text-sm font-normal">
                    {field.label}
                  </Label>
                </div>
              ) : (
                //@ts-expect-error its a known issue
                <Input
                  type="text"
                  placeholder={field.placeholder}
                  className="transition-all duration-200 focus:scale-[1.02]"
                  {...formFieldProps}
                />
              )}
            </FormControl>
            <FormMessage />
          </div>
        )}
      />
    </motion.div>
  );
}
