import { Container } from "@/components/ui/Container";
import type { Hero as HeroData } from "@/lib/api/audits";

const TONES = {
  success: "border-success/40 text-success",
  active: "border-brand-400/50 text-brand-700",
  neutral: "border-border text-muted",
} as const;

export function Hero({ hero }: { hero: HeroData }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-grid">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 50% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 70%)",
        }}
      />
      <Container className="relative py-20 text-center sm:py-28">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-600">
          {hero.eyebrow}
        </p>
        <h1 className="mx-auto mt-5 max-w-4xl text-balance text-[clamp(36px,7vw,72px)] font-extrabold leading-[1.04] tracking-tight text-foreground">
          {hero.client_name}
        </h1>
        <p className="mt-4 text-[14px] text-muted">{hero.audit_started_label}</p>
        <span
          className={`mt-6 inline-block rounded-lg border bg-surface px-5 py-2.5 text-[13px] font-medium ${
            TONES[hero.status_pill.tone]
          }`}
        >
          {hero.status_pill.label}
        </span>
      </Container>
    </section>
  );
}
