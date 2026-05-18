import { ButtonLink } from "@/components/ui/Button";
import type { DeliverableCardData } from "@/lib/api/audits";
import { LockedCard } from "./LockedCard";

// One feature card per deliverable. Available => brand top border, pulsing
// "now available" dot, CTA to the deliverable route. Locked => LockedCard.
export function DeliverableCard({
  d,
  slug,
}: {
  d: DeliverableCardData;
  slug: string;
}) {
  if (d.state === "locked") return <LockedCard d={d} />;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border border-t-2 border-t-brand-500 bg-surface p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 80% at 85% 50%, rgba(124,58,237,0.07) 0%, transparent 70%)",
        }}
      />
      <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-success/30 bg-success-soft px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
            Now available
          </span>
          <h3 className="mt-4 text-[clamp(20px,3vw,28px)] font-extrabold leading-tight tracking-tight text-foreground">
            {d.heading}
          </h3>
          <p className="mt-2 max-w-md text-[14px] leading-relaxed text-muted">
            {d.sub}
          </p>
        </div>
        <div className="shrink-0">
          <ButtonLink
            href={`/audit/${slug}/${d.key}`}
            variant="primary"
            className="h-12 px-7 text-[15px] font-bold"
          >
            {d.cta_label}
            <span aria-hidden>&rarr;</span>
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
