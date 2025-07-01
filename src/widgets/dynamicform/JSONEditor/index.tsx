import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, RotateCcw, CheckCircle, AlertCircle, Info } from "lucide-react";
import type { FormConfig } from "@/types/form";
import { ConfigurationGuide } from "./ConfigurationGuide";
import { JsonEditorForm } from "./JsonEditorForm";

interface JsonEditorProps {
  config: FormConfig;
  onConfigChange: (config: FormConfig) => void;
  className?: string;
}

export function JsonEditor({
  config,
  onConfigChange,
  className,
}: JsonEditorProps) {
  const [jsonText, setJsonText] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize JSON text from config
  useEffect(() => {
    setJsonText(JSON.stringify(config, null, 2));
    setHasChanges(false);
  }, [config]);

  const validateJson = (
    text: string
  ): { isValid: boolean; parsed?: FormConfig; error?: string } => {
    try {
      const parsed = JSON.parse(text);

      // Basic structure validation
      if (!parsed.title || typeof parsed.title !== "string") {
        return { isValid: false, error: "Missing or invalid 'title' field" };
      }

      if (!parsed.fields || !Array.isArray(parsed.fields)) {
        return { isValid: false, error: "Missing or invalid 'fields' array" };
      }

      // Validate each field
      for (let i = 0; i < parsed.fields.length; i++) {
        const field = parsed.fields[i];

        if (!field.type || !field.label || !field.name) {
          return {
            isValid: false,
            error: `Field ${
              i + 1
            } is missing required properties (type, label, or name)`,
          };
        }

        // Validate field type
        const validTypes = [
          "text",
          "email",
          "select",
          "textarea",
          "number",
          "checkbox",
          "radio",
        ];
        if (!validTypes.includes(field.type)) {
          return {
            isValid: false,
            error: `Field '${field.name}' has invalid type '${
              field.type
            }'. Valid types: ${validTypes.join(", ")}`,
          };
        }

        // Validate select field has options
        if (
          field.type === "select" &&
          (!field.options || !Array.isArray(field.options))
        ) {
          return {
            isValid: false,
            error: `Select field '${field.name}' must have an 'options' array`,
          };
        }

        // Validate field names are unique
        const duplicateNames = parsed.fields.filter(
          (f: Record<string, unknown>) => f.name === field.name
        );
        if (duplicateNames.length > 1) {
          return {
            isValid: false,
            error: `Duplicate field name '${field.name}' found`,
          };
        }
      }

      return { isValid: true, parsed };
    } catch (error) {
      return {
        isValid: false,
        error: error instanceof Error ? error.message : "Invalid JSON format",
      };
    }
  };

  const handleJsonChange = (text: string) => {
    setJsonText(text);
    const validation = validateJson(text);
    setIsValid(validation.isValid);
    setHasChanges(true);
  };

  const handleSave = () => {
    const validation = validateJson(jsonText);

    if (!validation.isValid) {
      toast.error("Invalid Configuration", {
        description: validation.error,
        icon: <AlertCircle className="h-4 w-4" />,
      });
      return;
    }

    if (validation.parsed) {
      onConfigChange(validation.parsed);
      setHasChanges(false);
      toast.success("Configuration Updated", {
        description: "Form configuration has been successfully updated",
        icon: <CheckCircle className="h-4 w-4" />,
      });
    }
  };

  const handleReset = () => {
    setJsonText(JSON.stringify(config, null, 2));
    setIsValid(true);
    setHasChanges(false);
    toast.info("Configuration Reset", {
      description: "Configuration has been reset to original values",
      icon: <Info className="h-4 w-4" />,
    });
  };

  const validation = validateJson(jsonText);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="w-full p-2 md:p-4">
        <CardHeader className="flex flex-col gap-2 p-2 md:p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <CardTitle className="text-xl font-semibold">
              Form Configuration Editor
            </CardTitle>
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                disabled={!hasChanges}
                className="w-full md:w-auto"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!isValid || !hasChanges}
                className="bg-green-600 hover:bg-green-700 w-full md:w-auto"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-2 md:p-4">
          <JsonEditorForm
            jsonText={jsonText}
            isValid={isValid}
            validation={validation}
            onJsonChange={handleJsonChange}
          />
          <ConfigurationGuide />
        </CardContent>
      </Card>
    </motion.div>
  );
}
