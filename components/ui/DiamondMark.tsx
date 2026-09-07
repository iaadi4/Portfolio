import { cn } from "@/lib/utils";

export function DiamondMark({ className, size = 10 }: { className?: string; size?: number }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block rotate-45 border border-current", className)}
      style={{ width: size, height: size }}
    />
  );
}
