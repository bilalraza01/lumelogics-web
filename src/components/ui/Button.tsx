import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "onBrand";
type Size = "sm" | "md";
type Shape = "default" | "pill";

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60";

const shapes: Record<Shape, string> = {
  default: "rounded-md",
  pill: "rounded-full",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_8px_24px_-12px_rgba(124,58,237,0.6)]",
  ghost: "text-foreground hover:bg-black/5",
  outline:
    "border border-border bg-surface text-foreground hover:border-brand-300 hover:text-brand-600",
  onBrand:
    "bg-white text-brand-700 hover:bg-white/90 shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_8px_24px_-12px_rgba(0,0,0,0.4)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  shape?: Shape;
  className?: string;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  shape = "default",
  className,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], shapes[shape], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  shape = "default",
  className,
  href,
  ...props
}: CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], shapes[shape], className)}
      {...props}
    />
  );
}
