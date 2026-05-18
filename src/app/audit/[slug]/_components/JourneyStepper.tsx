import type { JourneyStage } from "@/lib/api/audits";
import { Section, SectionHead } from "./ui";

export function JourneyStepper({ stages }: { stages: JourneyStage[] }) {
  return (
    <Section>
      <SectionHead
        label="Audit progress"
        heading="Your audit journey"
        sub="Each stage of the audit, from mapping how you work to the build plan."
      />
      <div className="mt-10 overflow-x-auto pb-2">
        <ol className="flex min-w-[560px] items-start">
          {stages.map((s, i) => {
            const done = s.state === "done";
            const active = s.state === "active";
            const last = i === stages.length - 1;
            return (
              <li
                key={s.id}
                className="relative flex flex-1 flex-col items-center text-center"
              >
                {!last && (
                  <span
                    aria-hidden
                    className={`absolute left-1/2 top-[14px] h-0.5 w-full ${
                      done || active ? "bg-success" : "bg-border"
                    }`}
                  />
                )}
                <span
                  className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 text-[11px] font-bold ${
                    done
                      ? "border-success bg-success text-white"
                      : active
                        ? "border-brand-500 bg-surface text-brand-700 ring-4 ring-brand-500/15"
                        : "border-border bg-surface text-muted"
                  }`}
                >
                  {done ? "✓" : i + 1}
                </span>
                <span
                  className={`mt-2 px-2 text-[12px] font-semibold ${
                    done || active ? "text-foreground" : "text-muted"
                  }`}
                >
                  {s.label}
                </span>
                <span className="mt-1 px-2 text-[11px] leading-snug text-muted">
                  {s.sub}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
