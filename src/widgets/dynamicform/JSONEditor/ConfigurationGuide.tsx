export function ConfigurationGuide() {
  return (
    <div className="w-full mx-auto">
      <div className="bg-muted/60 border border-border rounded-lg p-2 md:p-6 text-left space-y-3 md:space-y-4">
        <h3 className="text-lg font-semibold mb-1 md:mb-2 text-left">
          Configuration Guide
        </h3>
        <ul className="list-disc list-inside space-y-1 ml-4 text-left">
          <li>
            <span className="font-medium">title</span>:{" "}
            <span className="text-muted-foreground">Form title (required)</span>
          </li>
          <li>
            <span className="font-medium">description</span>:{" "}
            <span className="text-muted-foreground">
              Form description (optional)
            </span>
          </li>
          <li>
            <span className="font-medium">fields</span>:{" "}
            <span className="text-muted-foreground">
              Array of form fields (required)
            </span>
          </li>
          <li>
            <span className="font-medium">submitButtonText</span>:{" "}
            <span className="text-muted-foreground">
              Custom submit button text (optional)
            </span>
          </li>
        </ul>
        <h4 className="text-base font-semibold mt-2 md:mt-4 mb-1 text-left">
          Field Types
        </h4>
        <div className="flex flex-wrap gap-1 md:gap-2 mb-1 md:mb-2">
          <span className="px-2 py-1 rounded bg-background border text-xs font-mono">
            text
          </span>
          <span className="px-2 py-1 rounded bg-background border text-xs font-mono">
            email
          </span>
          <span className="px-2 py-1 rounded bg-background border text-xs font-mono">
            number
          </span>
          <span className="px-2 py-1 rounded bg-background border text-xs font-mono">
            select
          </span>
          <span className="px-2 py-1 rounded bg-background border text-xs font-mono">
            textarea
          </span>
          <span className="px-2 py-1 rounded bg-background border text-xs font-mono">
            checkbox
          </span>
          <span className="px-2 py-1 rounded bg-background border text-xs font-mono">
            radio
          </span>
        </div>
        <div className="text-sm text-muted-foreground mt-1 md:mt-2 text-left">
          <span className="font-medium">select</span> fields require an{" "}
          <span className="font-mono bg-background border px-1 rounded">
            options
          </span>{" "}
          array.
          <br />
          <span className="font-medium">required</span> is{" "}
          <span className="font-mono bg-background border px-1 rounded">
            true
          </span>{" "}
          or{" "}
          <span className="font-mono bg-background border px-1 rounded">
            false
          </span>
          .
        </div>
      </div>
    </div>
  );
}
