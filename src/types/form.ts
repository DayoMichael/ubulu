import { z } from "zod";

export type FieldType =
  | "text"
  | "email"
  | "select"
  | "textarea"
  | "number"
  | "checkbox"
  | "radio";

export interface FormField {
  type: FieldType;
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: string;
  };
  conditional?: {
    field: string;
    value: string | number | boolean;
    operator:
      | "equals"
      | "not_equals"
      | "contains"
      | "greater_than"
      | "less_than";
  };
  nested?: FormField[];
}

export interface FormConfig {
  title: string;
  description?: string;
  fields: FormField[];
  submitButtonText?: string;
}

// Dynamic schema generation based on form config
export function generateFormSchema(config: FormConfig) {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  config.fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;

    // Apply field type validation
    switch (field.type) {
      case "email":
        fieldSchema = z.string().email("Please enter a valid email address");
        break;
      case "number":
        fieldSchema = z.string().transform((val) => Number(val));
        break;
      case "select":
        if (field.options) {
          fieldSchema = z
            .string()
            .refine(
              (val) => field.options!.includes(val),
              "Please select a valid option"
            );
        } else {
          fieldSchema = z.string();
        }
        break;
      case "textarea":
        fieldSchema = z.string();
        break;
      case "checkbox":
        fieldSchema = z.boolean().default(false);
        break;
      default:
        fieldSchema = z.string();
    }

    // Apply required validation for non-checkbox fields
    if (field.required && field.type !== "checkbox") {
      if (fieldSchema instanceof z.ZodString) {
        fieldSchema = fieldSchema.min(1, `${field.label} is required`);
      }
    } else if (!field.required) {
      fieldSchema = fieldSchema.optional();
    }

    // Apply custom validation rules for string fields
    if (field.validation && field.type !== "checkbox") {
      if (fieldSchema instanceof z.ZodString) {
        const stringSchema = fieldSchema as z.ZodString;
        if (field.validation.min !== undefined) {
          fieldSchema = stringSchema.min(
            field.validation.min,
            `${field.label} must be at least ${field.validation.min} characters`
          );
        }
        if (field.validation.max !== undefined) {
          fieldSchema = stringSchema.max(
            field.validation.max,
            `${field.label} must be at most ${field.validation.max} characters`
          );
        }
        if (field.validation.pattern) {
          fieldSchema = stringSchema.regex(
            new RegExp(field.validation.pattern),
            `Invalid ${field.label} format`
          );
        }
      }
    }

    schemaFields[field.name] = fieldSchema;
  });

  return z.object(schemaFields);
}

export type FormData = z.infer<ReturnType<typeof generateFormSchema>>;
