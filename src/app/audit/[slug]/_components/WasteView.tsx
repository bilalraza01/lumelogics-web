import { Container } from "@/components/ui/Container";
import type { AuditDocument } from "@/lib/api/audits";
import {
  costSubstitution,
  hours,
  money,
  moneyYr,
  wasteByCategory,
  wasteTotals,
} from "@/lib/api/audit-derive";
import { PriorityBadge } from "./ui";
import { QuoteBlock } from "./QuoteBlock";

export function WasteView({
  doc,
  sessionLabel,
}: {
  doc: AuditDocument;
  sessionLabel: (ref: string) => string;
}) {
  const w = doc.waste;
  const totals = wasteTotals(doc);
  const byCat = wasteByCategory(doc);
  const catLabel: Record<string, string> = {};
  for (const c of doc.categories) catLabel[c.id] = c.label;
  const maxCat = byCat[0]?.total ?? 1;

  return (
    <Container className="py-14 sm:py-16">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">
        Hidden costs
      </p>
      <h1 className="mt-3 text-[clamp(26px,4vw,40px)] font-extrabold tracking-tight text-foreground">
        What the manual work costs
      </h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
        {w.intro}
      </p>

      {/* KPI bar */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Kpi
          big={String(w.kpi_summary.total_opportunities)}
          label="Opportunities found"
        />
        <Kpi
          big={`${hours(w.kpi_summary.recoverable_hours_per_week)} hrs/wk`}
          label="Recoverable time"
        />
        <Kpi big="Role rate" label={w.kpi_summary.default_rate_label} small />
      </div>

      {/* Formula */}
      <div className="mt-6 rounded-lg border border-brand-200 bg-brand-50/60 px-4 py-3 font-mono text-[13px] font-semibold text-brand-700">
        {w.cost_formula}
      </div>

      {/* Opportunity cards */}
      <div className="mt-6 space-y-4">
        {w.opportunities.map((o) => (
          <article
            key={o.ref_id}
            className="rounded-xl border border-border border-l-[3px] border-l-brand-500 bg-surface p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-muted">
                    {o.ref_id}
                  </span>
                  <span className="rounded border border-border bg-black/[0.02] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-muted">
                    {catLabel[o.category] ?? o.category}
                  </span>
                  <PriorityBadge value={o.priority} />
                </div>
                <h3 className="mt-2 text-[16px] font-bold text-foreground">
                  {o.title}
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-muted">
                  {o.description}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[clamp(22px,3vw,30px)] font-extrabold leading-none text-foreground tabular-nums">
                  {moneyYr(o.annual_cost)}
                </p>
                <p className="mt-1 text-[12px] text-muted">
                  {hours(o.weekly_hours)} hrs/wk &middot; ${o.hourly_rate}/hr
                  {o.people_affected > 1
                    ? ` · ${o.people_affected} people`
                    : ""}
                </p>
              </div>
            </div>
            <p className="mt-3 rounded-md bg-black/[0.03] px-3 py-1.5 font-mono text-[12px] text-muted">
              {costSubstitution(o)}
            </p>
            {o.quote && (
              <QuoteBlock
                quote={o.quote}
                sessionLabel={sessionLabel(o.quote.session_ref)}
              />
            )}
          </article>
        ))}
      </div>

      {/* Totals */}
      <div className="mt-8 rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">
          Total opportunity value
        </p>
        <p className="mt-2 text-[clamp(44px,9vw,84px)] font-extrabold leading-none text-brand-700 tabular-nums">
          {money(totals.totalAnnual)}
        </p>
        <p className="mt-2 text-[15px] text-muted">
          {hours(totals.totalWeeklyHours)} hours a week across{" "}
          {totals.count} opportunities
        </p>
      </div>

      {/* Category breakdown */}
      <div className="mt-8">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.12em] text-foreground">
          By area
        </h2>
        <div className="mt-4 space-y-2.5">
          {byCat.map((c) => (
            <div key={c.id}>
              <div className="flex items-center justify-between text-[13px]">
                <span className="font-medium text-foreground">{c.label}</span>
                <span className="text-muted tabular-nums">
                  {money(c.total)} &middot; {c.pct}%
                </span>
              </div>
              <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-black/[0.05]">
                <div
                  className="h-full rounded-full bg-brand-500"
                  style={{ width: `${Math.max(4, (c.total / maxCat) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

function Kpi({
  big,
  label,
  small = false,
}: {
  big: string;
  label: string;
  small?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <p
        className={`font-extrabold leading-none text-foreground tabular-nums ${
          small ? "text-[18px]" : "text-[26px]"
        }`}
      >
        {big}
      </p>
      <p className="mt-2 text-[12px] text-muted">{label}</p>
    </div>
  );
}
