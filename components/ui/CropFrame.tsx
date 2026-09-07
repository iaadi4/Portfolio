import { cn } from "@/lib/utils";

export function CropFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <span className="pointer-events-none absolute -top-px -left-px h-4 w-4 border-t border-l border-current" />
      <span className="pointer-events-none absolute -top-px -right-px h-4 w-4 border-t border-r border-current" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-4 w-4 border-b border-l border-current" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-4 w-4 border-b border-r border-current" />
      {children}
    </div>
  );
}
