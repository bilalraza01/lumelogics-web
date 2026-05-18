// Small shared presentational pieces for the audit views. Server components.
import { Container } from "@/components/ui/Container";

export function SectionHead({
  label,
  heading,
  sub,
}: {
  label: string;
  heading: string;
  sub?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">
        {label}
      </p>
      <h2 className="mt-3 text-[clamp(24px,4vw,38px)] font-bold leading-[1.1] tracking-tight text-foreground">
        {heading}
      </h2>
      {sub && <p className="mt-3 text-[15px] leading-relaxed text-muted">{sub}</p>}
    </div>
  );
}

export function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`border-b border-border py-16 sm:py-20 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SeverityBadge({ value }: { value: "HIGH" | "MEDIUM" }) {
  const high = value === "HIGH";
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] ${
        high
          ? "bg-brand-500/10 text-brand-700"
          : "bg-black/[0.05] text-muted"
      }`}
    >
      {value}
    </span>
  );
}

export function PriorityBadge({ value }: { value: "high" | "medium" | "low" }) {
  const map = {
    high: "bg-brand-500/10 text-brand-700",
    medium: "bg-black/[0.05] text-muted",
    low: "bg-black/[0.04] text-muted",
  } as const;
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] ${map[value]}`}
    >
      {value} priority
    </span>
  );
}

export function RiskBadge({
  level,
}: {
  level: "low" | "medium" | "high";
}) {
  const map = {
    low: "bg-success-soft text-success",
    medium: "bg-amber-100 text-amber-800",
    high: "bg-red-100 text-red-700",
  } as const;
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] ${map[level]}`}
    >
      {level} risk
    </span>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded border border-border bg-black/[0.02] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-muted">
      {children}
    </span>
  );
}
