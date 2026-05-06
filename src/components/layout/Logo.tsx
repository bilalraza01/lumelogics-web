import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  className?: string;
  tone?: "dark" | "light";
};

export function Logo({ href = "/", className, tone = "dark" }: Props) {
  const text = tone === "light" ? "text-white" : "text-foreground";
  const content = (
    <span className={cn("flex items-center gap-2", className)}>
      <span
        className="relative inline-flex h-7 w-7 items-center justify-center"
        style={{
          // Punch a transparent hole in the centre so the page background
          // shows through the donut.
          WebkitMaskImage:
            "radial-gradient(circle, transparent 0, transparent 2px, black 3px)",
          maskImage:
            "radial-gradient(circle, transparent 0, transparent 2px, black 3px)",
        }}
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-300 via-brand-500 to-brand-800" />
        <span className="absolute inset-[3px] rounded-full bg-gradient-to-br from-brand-400 to-brand-700" />
        <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/30" />
      </span>
      <span
        className={cn(
          "text-[19px] font-semibold tracking-tight leading-none",
          text,
        )}
      >
        lumelogics
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex" aria-label="Lumelogics">
        {content}
      </Link>
    );
  }
  return content;
}
