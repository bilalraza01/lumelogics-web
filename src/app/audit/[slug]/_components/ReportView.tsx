import { Container } from "@/components/ui/Container";
import type { AuditDocument } from "@/lib/api/audits";
import {
  blueprintAnnualValue,
  hours,
  money,
  moneyYr,
  wasteByCategory,
  wasteTotals,
} from "@/lib/api/audit-derive";

// The comprehensive report is a pure projection of the same document the
// deliverable pages render. It introduces no new numbers: every metric is
// derived here through the shared helpers. `report.sections[].include`
// controls which sections render and the TOC order.
export function ReportView({ doc }: { doc: AuditDocument }) {
  const r = doc.report;
  const totals = wasteTotals(doc);
  const byCat = wasteByCategory(doc);
  const bpValue = blueprintAnnualValue(doc);
  const catLabel: Record<string, string> = {};
  for (const c of doc.categories) catLabel[c.id] = c.label;

  const painByCat = doc.categories
    .map((c) => ({
      label: c.label,
      n: doc.findings.pain_points.filter((p) => p.category === c.id).length,
    }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n);
  const maxPain = painByCat[0]?.n ?? 1;

  const sections = r.sections.filter((s) => s.include);
  const has = (a: string) => sections.some((s) => s.anchor === a);

  return (
    <Container className="py-12">
      <div className="lg:flex lg:gap-10">
        {/* TOC */}
        <aside
          data-print-hide
          className="mb-8 lg:sticky lg:top-20 lg:mb-0 lg:h-max lg:w-56 lg:shrink-0"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
            Contents
          </p>
          <ol className="mt-3 space-y-1.5">
            {sections.map((s, i) => (
              <li key={s.anchor}>
                <a
                  href={`#${s.anchor}`}
                  className="text-[13px] text-muted hover:text-brand-600"
                >
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="border-b border-border pb-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">
              {r.subtitle}
            </p>
            <h1 className="mt-2 text-[clamp(28px,5vw,44px)] font-extrabold tracking-tight text-foreground">
              {r.title}
            </h1>
            <p className="mt-2 text-[13px] text-muted">
              Prepared for {r.prepared_for}. {r.prepared_on}.
            </p>
          </header>

          {has("executive-summary") && (
            <Sec id="executive-summary" n={1} title="Executive summary">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <M v={String(doc.sessions.length)} l="Sessions" />
                <M v={String(doc.process_map.stages.length)} l="Stages mapped" />
                <M
                  v={String(doc.findings.pain_points.length)}
                  l="Pain points"
                />
                <M
                  v={String(doc.findings.optimisations.length)}
                  l="Optimisations"
                />
                <M v={money(totals.totalAnnual)} l="Opportunity value" />
                <M
                  v={`${hours(totals.totalWeeklyHours)} hrs/wk`}
                  l="Recoverable time"
                />
                <M
                  v={String(doc.blueprint.opportunities.length)}
                  l="Proposed changes"
                />
                <M v={money(bpValue)} l="Value unlocked" />
              </div>

              <p className="mt-6 text-[14px] leading-relaxed text-muted">
                {r.executive_summary}
              </p>

              <h3 className="mt-8 text-[12px] font-bold uppercase tracking-[0.1em] text-foreground">
                Opportunity by area
              </h3>
              <div className="mt-3 space-y-2">
                {byCat.map((c) => (
                  <div key={c.id} className="print-break-avoid">
                    <div className="flex justify-between text-[13px]">
                      <span className="text-foreground">{c.label}</span>
                      <span className="text-muted tabular-nums">
                        {c.pct}% ({money(c.total)})
                      </span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-black/[0.05]">
                      <div
                        className="h-full rounded-full bg-brand-500"
                        style={{ width: `${c.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="mt-8 text-[12px] font-bold uppercase tracking-[0.1em] text-foreground">
                Pain points by area
              </h3>
              <div className="mt-3 space-y-2">
                {painByCat.map((p) => (
                  <div
                    key={p.label}
                    className="flex items-center gap-3 text-[13px]"
                  >
                    <span className="w-40 shrink-0 text-muted">{p.label}</span>
                    <div className="h-3 flex-1 rounded bg-black/[0.05]">
                      <div
                        className="h-full rounded bg-brand-400"
                        style={{ width: `${(p.n / maxPain) * 100}%` }}
                      />
                    </div>
                    <span className="w-6 text-right tabular-nums text-foreground">
                      {p.n}
                    </span>
                  </div>
                ))}
              </div>
            </Sec>
          )}

          {has("process-map") && (
            <Sec id="process-map" n={2} title="Process map">
              {doc.process_map.stages.map((st, i) => (
                <div key={st.id} className="mt-5 print-break-avoid">
                  <h3 className="text-[15px] font-bold text-foreground">
                    Stage {i + 1}. {st.title}
                  </h3>
                  <p className="text-[13px] text-muted">{st.summary}</p>
                  <ul className="mt-2 space-y-1.5">
                    {st.steps.map((s) => (
                      <li key={s.id} className="text-[13px] text-muted">
                        <span className="font-semibold text-foreground">
                          {s.title}
                        </span>
                        {s.type === "pain_point" ? " (pain point)" : ""}.{" "}
                        {s.description}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Sec>
          )}

          {has("findings") && (
            <Sec id="findings" n={3} title="Findings">
              <FindingTable
                title="Pain points"
                rows={doc.findings.pain_points}
                catLabel={catLabel}
              />
              <FindingTable
                title="Optimisations"
                rows={doc.findings.optimisations}
                catLabel={catLabel}
              />
            </Sec>
          )}

          {has("waste") && (
            <Sec id="waste" n={4} title="Opportunity analysis">
              <p className="rounded-md border border-brand-200 bg-brand-50/60 px-3 py-2 font-mono text-[12px] text-brand-700">
                {doc.waste.cost_formula}
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-[12px]">
                  <thead className="border-b-2 border-border text-muted">
                    <tr>
                      <th className="py-2 pr-3">ID</th>
                      <th className="py-2 pr-3">Opportunity</th>
                      <th className="py-2 pr-3">Area</th>
                      <th className="py-2 pr-3 text-right">Hrs/wk</th>
                      <th className="py-2 pr-3 text-right">People</th>
                      <th className="py-2 pr-3 text-right">Rate</th>
                      <th className="py-2 text-right">Annual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doc.waste.opportunities.map((o) => (
                      <tr key={o.ref_id} className="border-b border-border">
                        <td className="py-2 pr-3 font-mono text-muted">
                          {o.ref_id}
                        </td>
                        <td className="py-2 pr-3 text-foreground">{o.title}</td>
                        <td className="py-2 pr-3 text-muted">
                          {catLabel[o.category] ?? o.category}
                        </td>
                        <td className="py-2 pr-3 text-right tabular-nums">
                          {hours(o.weekly_hours)}
                        </td>
                        <td className="py-2 pr-3 text-right tabular-nums">
                          {o.people_affected}
                        </td>
                        <td className="py-2 pr-3 text-right tabular-nums">
                          ${o.hourly_rate}
                        </td>
                        <td className="py-2 text-right font-semibold tabular-nums">
                          {money(o.annual_cost)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-bold text-foreground">
                      <td className="py-2" colSpan={3}>
                        Total
                      </td>
                      <td className="py-2 text-right tabular-nums">
                        {hours(totals.totalWeeklyHours)}
                      </td>
                      <td />
                      <td />
                      <td className="py-2 text-right tabular-nums">
                        {money(totals.totalAnnual)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </Sec>
          )}

          {has("solutions") && (
            <Sec id="solutions" n={5} title="Solutions">
              <div className="space-y-3">
                {doc.blueprint.opportunities.map((o) => (
                  <div
                    key={o.ref_id}
                    className="print-break-avoid border-b border-border pb-3"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-[14px] font-bold text-foreground">
                        <span className="font-mono text-[11px] text-muted">
                          {o.ref_id}
                        </span>{" "}
                        {o.title}
                      </p>
                      <p className="text-[13px] font-semibold text-brand-700 tabular-nums">
                        {moneyYr(o.annual_value)}, payback {o.payback_months} mo
                      </p>
                    </div>
                    <p className="mt-1 text-[13px] text-muted">{o.summary}</p>
                    <p className="mt-1 text-[12px] text-muted">
                      Solves {o.problems_solved.join(", ")}. Removes{" "}
                      {o.waste_eliminated.join(", ")}.
                    </p>
                  </div>
                ))}
              </div>
            </Sec>
          )}

          <p className="mt-10 border-t border-border pt-6 text-[14px] text-muted">
            {r.closing_note}
          </p>
        </div>
      </div>
    </Container>
  );
}

function Sec({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <h2 className="text-[20px] font-extrabold tracking-tight text-foreground">
        {n}. {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function M({ v, l }: { v: string; l: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <p className="text-[20px] font-extrabold leading-none text-foreground tabular-nums">
        {v}
      </p>
      <p className="mt-1.5 text-[11px] uppercase tracking-[0.06em] text-muted">
        {l}
      </p>
    </div>
  );
}

function FindingTable({
  title,
  rows,
  catLabel,
}: {
  title: string;
  rows: { ref_id: string; title: string; severity: string; category: string }[];
  catLabel: Record<string, string>;
}) {
  return (
    <div className="mt-4">
      <h3 className="text-[12px] font-bold uppercase tracking-[0.1em] text-foreground">
        {title}
      </h3>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full text-left text-[12px]">
          <thead className="border-b-2 border-border text-muted">
            <tr>
              <th className="py-2 pr-3">ID</th>
              <th className="py-2 pr-3">Title</th>
              <th className="py-2 pr-3">Area</th>
              <th className="py-2">Severity</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((x) => (
              <tr key={x.ref_id} className="border-b border-border">
                <td className="py-2 pr-3 font-mono text-muted">{x.ref_id}</td>
                <td className="py-2 pr-3 text-foreground">{x.title}</td>
                <td className="py-2 pr-3 text-muted">
                  {catLabel[x.category] ?? x.category}
                </td>
                <td className="py-2 text-muted">{x.severity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
