import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";

interface JsonEditorFormProps {
  jsonText: string;
  isValid: boolean;
  validation: { isValid: boolean; error?: string };
  onJsonChange: (text: string) => void;
}

export function JsonEditorForm({
  jsonText,
  isValid,
  validation,
  onJsonChange,
}: JsonEditorFormProps) {
  return (
    <div className="relative">
      <textarea
        value={jsonText}
        onChange={(e) => onJsonChange(e.target.value)}
        className={`w-full h-96 p-4 font-mono text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 transition-all ${
          isValid
            ? "border-green-200 focus:border-green-500 focus:ring-green-200 bg-green-50/50"
            : "border-red-200 focus:border-red-500 focus:ring-red-200 bg-red-50/50"
        }`}
        placeholder="Enter your form configuration JSON here..."
      />
      {/* Validation Status */}
      <div className="absolute top-2 right-2">
        {isValid ? (
          <div className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded text-xs">
            <CheckCircle className="h-3 w-3" />
            Valid
          </div>
        ) : (
          <div className="flex items-center gap-1 text-red-600 bg-red-100 px-2 py-1 rounded text-xs">
            <AlertCircle className="h-3 w-3" />
            Invalid
          </div>
        )}
      </div>
      {/* Error Display */}
      {!isValid && validation.error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="p-3 bg-red-50 border border-red-200 rounded-lg mt-4"
        >
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-red-800">
                Configuration Error
              </p>
              <p className="text-sm text-red-700 mt-1">{validation.error}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
