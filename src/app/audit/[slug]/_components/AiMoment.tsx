import type { AiMoment as AiMomentData } from "@/lib/api/audits";
import { Section, SectionHead } from "./ui";

export function AiMoment({ data }: { data: AiMomentData }) {
  return (
    <Section>
      <SectionHead label={data.label} heading={data.heading} sub={data.sub} />

      <div className="mt-10 rounded-xl border border-brand-200 bg-brand-50/60 p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-700">
          {data.analogy_callout.title}
        </p>
        <p className="mt-2 text-[14px] leading-relaxed text-foreground/80">
          {data.analogy_callout.body}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {data.explainer.map((e) => (
          <div
            key={e.title}
            className="rounded-xl border border-border bg-surface p-5"
          >
            <p className="text-[14px] font-bold text-foreground">{e.title}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              {e.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface p-6">
        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-1 flex-wrap gap-2">
            {data.diagram.silos.map((s) => (
              <span
                key={s.label}
                className="rounded-md border border-border bg-black/[0.02] px-3 py-1.5 text-[12px] text-muted"
              >
                {s.label}
              </span>
            ))}
          </div>
          <div className="shrink-0 text-center text-brand-500" aria-hidden>
            <span className="text-2xl">&rarr;</span>
          </div>
          <div className="flex flex-1 flex-wrap gap-2">
            {data.diagram.connected.map((c) => (
              <span
                key={c.label}
                className="rounded-md border border-success/30 bg-success-soft px-3 py-1.5 text-[12px] font-medium text-success"
              >
                {c.label}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-4 text-[13px] leading-relaxed text-muted">
          {data.diagram.caption}
        </p>
      </div>
    </Section>
  );
}
