import { cn } from "@/lib/utils";
import { DiamondMark } from "./DiamondMark";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted", className)}>
      <span className="flex shrink-0 items-center gap-2">
        <DiamondMark size={8} />
        <span>{children}</span>
      </span>
      <div className="divider-dots min-w-0 flex-1" aria-hidden />
    </div>
  );
}
