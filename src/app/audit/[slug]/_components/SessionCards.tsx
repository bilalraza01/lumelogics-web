import type { Session } from "@/lib/api/audits";
import { Section, SectionHead, Tag } from "./ui";

function fmtDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function SessionCards({ sessions }: { sessions: Session[] }) {
  return (
    <Section>
      <SectionHead
        label="What we discussed"
        heading="The working sessions"
        sub="Every finding in this audit traces back to one of these conversations."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {sessions.map((s) => (
          <article
            key={s.id}
            className="rounded-xl border border-border bg-surface p-6 transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="rounded-md bg-brand-500 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-white">
                {s.badge}
              </span>
              {s.complete && (
                <span className="rounded-md border border-success/30 bg-success-soft px-2.5 py-1 text-[10px] font-bold text-success">
                  Complete
                </span>
              )}
            </div>
            <p className="mt-4 text-[11px] text-muted">{fmtDate(s.date)}</p>
            <h3 className="mt-1 text-[15px] font-bold leading-snug text-foreground">
              {s.title}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              {s.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {s.stage_tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
