import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "cream" | "orange" | "ghost";
  className?: string;
  external?: boolean;
};

const variants = {
  cream: "bg-[#121212] text-[#e8e3d5] hover:bg-orange hover:text-[#121212] dark:bg-cream dark:text-[#121212] dark:hover:bg-orange",
  orange: "bg-orange text-[#121212] hover:brightness-110",
  ghost: "bg-transparent text-fg border border-line hover:bg-orange hover:text-[#121212] hover:border-orange",
};

export function NotchButton({ href, children, variant = "cream", className, external }: Props) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "notch-cta inline-flex items-center justify-center px-8 py-3.5 font-sans text-[11px] font-bold uppercase tracking-[0.18em] transition-colors",
        variants[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
