import { Toaster as Sonner } from "sonner";

const Toaster = () => {
  return (
    <Sonner
      theme="system"
      className="toaster group [&_.toast-content]:flex [&_.toast-content]:flex-col [&_.toast-content]:items-start [&_.toast-content]:text-left"
      style={
        {
          "--normal-bg": "hsl(var(--popover))",
          "--normal-text": "hsl(var(--popover-foreground))",
          "--normal-border": "hsl(var(--border))",
        } as React.CSSProperties
      }
    />
  );
};

export { Toaster };
