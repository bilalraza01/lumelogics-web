import { Container } from "@/components/ui/Container";
import type { PrototypeCta } from "@/lib/api/audits";

// Dark prototype CTA. Rendered only when enabled and a url is present, since
// the interactive prototype is a separate per-client effort.
export function PrototypeBanner({ data }: { data: PrototypeCta }) {
  if (!data.enabled || !data.url) return null;
  return (
    <section className="border-b border-border py-16 sm:py-20">
      <Container>
        <div
          className="flex flex-col items-start gap-6 rounded-2xl border border-brand-500/20 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10"
          style={{
            background:
              "linear-gradient(135deg, #190736 0%, #2a0f5c 60%, #14131a 100%)",
          }}
        >
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
              Interactive prototype
            </span>
            <h3 className="mt-3 text-[22px] font-extrabold tracking-tight text-white">
              {data.heading}
            </h3>
            <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-white/60">
              {data.sub}
            </p>
          </div>
          <a
            href={data.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-xl bg-white px-7 text-[15px] font-bold text-brand-700 transition-transform hover:-translate-y-0.5"
          >
            {data.cta_label}
            <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
