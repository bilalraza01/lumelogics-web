import { Container } from "@/components/ui/Container";
import type { ProcessMap, ProcessStep, StepType } from "@/lib/api/audits";
import { indexBy } from "@/lib/api/audit-derive";
import { QuoteBlock } from "./QuoteBlock";

const TYPE_CHIP: Record<StepType, string> = {
  standard: "border-border bg-black/[0.03] text-muted",
  decision: "border-info/30 bg-info/10 text-info",
  automation: "border-brand-300 bg-brand-500/10 text-brand-700",
  pain_point: "border-red-200 bg-red-50 text-red-700",
};
const TYPE_LABEL: Record<StepType, string> = {
  standard: "Standard",
  decision: "Decision",
  automation: "Automation",
  pain_point: "Pain point",
};

function unitShort(u: string): string {
  return u === "hours" ? "hrs" : u === "minutes" ? "min" : u;
}

function Step({
  step,
  names,
  toolNames,
  sessionLabel,
}: {
  step: ProcessStep;
  names: Record<string, { name: string }>;
  toolNames: Record<string, { name: string }>;
  sessionLabel: (ref: string) => string;
}) {
  const lowConf = step.confidence === "low";
  return (
    <div
      className={`rounded-xl border bg-surface p-5 ${
        lowConf ? "border-dashed border-muted/50" : "border-border"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.07em] ${
            TYPE_CHIP[step.type]
          }`}
        >
          {step.type === "decision" ? "? " : ""}
          {TYPE_LABEL[step.type]}
        </span>
        {lowConf && (
          <span className="text-[10px] uppercase tracking-[0.07em] text-muted">
            Low confidence
          </span>
        )}
        <span className="ml-auto rounded bg-black/[0.04] px-2 py-0.5 text-[11px] font-medium text-muted">
          {step.time_estimate.qty} {unitShort(step.time_estimate.unit)},{" "}
          {step.time_estimate.frequency}
        </span>
      </div>
      <h4 className="mt-3 text-[15px] font-bold text-foreground">
        {step.title}
      </h4>
      <p className="mt-1 text-[13px] leading-relaxed text-muted">
        {step.description}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {step.owners.map((o) => (
          <span
            key={o}
            className="rounded-full border border-border bg-black/[0.02] px-2.5 py-0.5 text-[11px] text-foreground"
          >
            {names[o]?.name ?? o}
          </span>
        ))}
        {step.tools.map((t) => (
          <span
            key={t}
            className="rounded border border-border px-2 py-0.5 text-[11px] text-muted"
          >
            {toolNames[t]?.name ?? t}
          </span>
        ))}
      </div>
      {step.quote && (
        <QuoteBlock
          quote={step.quote}
          sessionLabel={sessionLabel(step.quote.session_ref)}
        />
      )}
    </div>
  );
}

export function ProcessMapView({
  pm,
  sessionLabel,
}: {
  pm: ProcessMap;
  sessionLabel: (ref: string) => string;
}) {
  const names = indexBy(pm.team, "id");
  const toolNames = indexBy(pm.tools, "id");

  return (
    <Container className="py-14 sm:py-16">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">
        Current state process map
      </p>
      <h1 className="mt-3 text-[clamp(26px,4vw,40px)] font-extrabold tracking-tight text-foreground">
        How you work today
      </h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
        {pm.intro}
      </p>

      <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {pm.legend.map((l) => (
          <div
            key={l.type}
            className="rounded-lg border border-border bg-surface p-3"
          >
            <span
              className={`rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.07em] ${
                TYPE_CHIP[l.type]
              }`}
            >
              {l.label}
            </span>
            <p className="mt-2 text-[12px] text-muted">{l.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
            Team
          </p>
          <ul className="mt-3 space-y-1.5">
            {pm.team.map((m) => (
              <li key={m.id} className="text-[13px] text-foreground">
                <span className="font-semibold">{m.name}</span>
                <span className="text-muted">, {m.role}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
            Tools
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {pm.tools.map((t) => (
              <span
                key={t.id}
                className="rounded border border-border px-2 py-0.5 text-[12px] text-muted"
              >
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-12">
        {pm.stages.map((stage, i) => (
          <section key={stage.id}>
            <div className="flex items-baseline gap-3">
              <span className="text-[13px] font-bold text-brand-600">
                Stage {i + 1}
              </span>
              <h2 className="text-[20px] font-extrabold tracking-tight text-foreground">
                {stage.title}
              </h2>
              <span className="ml-auto text-[12px] text-muted">
                {stage.steps.length} steps
              </span>
            </div>
            <p className="mt-1 text-[13px] text-muted">{stage.summary}</p>
            <div className="mt-4 space-y-3">
              {stage.steps.map((s) => (
                <Step
                  key={s.id}
                  step={s}
                  names={names}
                  toolNames={toolNames}
                  sessionLabel={sessionLabel}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
