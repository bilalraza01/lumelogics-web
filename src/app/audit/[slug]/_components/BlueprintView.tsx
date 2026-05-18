import { Container } from "@/components/ui/Container";
import type { AuditDocument } from "@/lib/api/audits";
import { matrixBubbles, roadmapBuckets } from "@/lib/api/audit-derive";
import { OpportunityCard } from "./OpportunityCard";
import { PriorityMatrix, type MatrixPoint } from "./PriorityMatrix";

const TOKEN_BG: Record<string, string> = {
  brand: "bg-brand-500",
  success: "bg-success",
  info: "bg-info",
  muted: "bg-muted",
};

function clamp(n: number, lo = 0.14, hi = 0.86): number {
  return Math.min(hi, Math.max(lo, n));
}

function buildMatrixPoints(doc: AuditDocument): MatrixPoint[] {
  const bubbles = matrixBubbles(doc);
  const opp = doc.blueprint.opportunities;

  const stats = bubbles.map((b) => {
    const tws = doc.blueprint.domains
      .filter((d) => d.id === b.domainId)
      .flatMap(() =>
        opp.filter((o) => o.domains.includes(b.domainId)).map((o) => o.timeline_weeks),
      );
    const avgT = tws.length ? tws.reduce((s, t) => s + t, 0) / tws.length : 0;
    return { b, avgT, value: b.combinedValue };
  });

  const values = stats.map((s) => s.value);
  const times = stats.map((s) => s.avgT);
  const minV = Math.min(...values);
  const maxV = Math.max(...values);
  const minT = Math.min(...times);
  const maxT = Math.max(...times);
  const norm = (x: number, lo: number, hi: number) =>
    hi === lo ? 0.5 : (x - lo) / (hi - lo);

  return stats.map(({ b, avgT, value }) => ({
    domainId: b.domainId,
    label: b.label,
    combinedValue: b.combinedValue,
    initiatives: b.initiatives,
    // Higher value => higher impact. Lower avg timeline => easier => more right.
    y: clamp(norm(value, minV, maxV)),
    x: clamp(1 - norm(avgT, minT, maxT)),
    size: norm(value, minV, maxV),
  }));
}

export function BlueprintView({ doc }: { doc: AuditDocument }) {
  const bp = doc.blueprint;
  const points = buildMatrixPoints(doc);
  const buckets = roadmapBuckets(bp);

  const stLabel: Record<string, string> = {};
  for (const s of bp.solution_types) stLabel[s.id] = s.label;
  const ppTitle: Record<string, string> = {};
  for (const p of doc.findings.pain_points) ppTitle[p.ref_id] = p.title;
  const wInfo: Record<string, { title: string; annual: number }> = {};
  for (const w of doc.waste.opportunities)
    wInfo[w.ref_id] = { title: w.title, annual: w.annual_cost };

  const totalWeeks = bp.roadmap.total_months * 4.345;

  return (
    <Container className="py-14 sm:py-16">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">
        Your AI blueprint
      </p>
      <h1 className="mt-3 text-[clamp(26px,4vw,40px)] font-extrabold tracking-tight text-foreground">
        What to build, and in what order
      </h1>
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
        {bp.intro}
      </p>

      {/* Exec KPIs */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {bp.exec_kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-xl border border-border bg-surface p-5"
          >
            <p className="text-[clamp(22px,3vw,30px)] font-extrabold leading-none text-brand-700 tabular-nums">
              {k.value}
            </p>
            <p className="mt-2 text-[12px] font-semibold text-foreground">
              {k.label}
            </p>
            <p className="mt-0.5 text-[11px] text-muted">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Framework */}
      <div className="mt-12">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.12em] text-foreground">
          How your systems work
        </h2>
        <div className="mt-4 space-y-2">
          {bp.framework_layers.map((l, i) => (
            <div
              key={l.id}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <p className="text-[14px] font-bold text-foreground">
                Layer {bp.framework_layers.length - i}. {l.label}
              </p>
              <p className="mt-1 text-[13px] text-muted">{l.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Solution types */}
      <div className="mt-12">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.12em] text-foreground">
          Four types of solution
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {bp.solution_types.map((s) => (
            <div
              key={s.id}
              className="rounded-xl border border-border bg-surface p-5"
            >
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  TOKEN_BG[s.color_token] ?? "bg-muted"
                }`}
              />
              <p className="mt-2 text-[14px] font-bold text-foreground">
                {s.label}
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-muted">
                {s.description}
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-brand-600">
                {s.typical_timeline}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunities */}
      <div className="mt-12">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.12em] text-foreground">
          The opportunities
        </h2>
        <div className="mt-4 space-y-3">
          {bp.opportunities.map((o) => (
            <OpportunityCard
              key={o.ref_id}
              o={o}
              solutionTypeLabel={stLabel[o.solution_type] ?? o.solution_type}
              problems={o.problems_solved.map((r) => ppTitle[r] ?? r)}
              wasteItems={o.waste_eliminated.map(
                (r) => wInfo[r] ?? { title: r, annual: 0 },
              )}
            />
          ))}
        </div>
      </div>

      {/* Priority matrix */}
      <div className="mt-12">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.12em] text-foreground">
          Priority matrix
        </h2>
        <div className="mt-4">
          <PriorityMatrix
            points={points}
            xAxisLabel={bp.priority_matrix.x_axis_label}
            yAxisLabel={bp.priority_matrix.y_axis_label}
            quadrants={bp.priority_matrix.quadrants}
          />
        </div>
      </div>

      {/* Video gallery (hidden when empty) */}
      {bp.video_gallery.length > 0 && (
        <div className="mt-12">
          <h2 className="text-[13px] font-bold uppercase tracking-[0.12em] text-foreground">
            See it in practice
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {bp.video_gallery.map((v) => (
              <a
                key={v.url}
                href={v.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-border bg-surface p-5 hover:border-brand-300"
              >
                <p className="text-[14px] font-bold text-foreground">
                  {v.title}
                </p>
                <p className="mt-2 text-[12px] font-semibold text-brand-600">
                  Watch &rarr;
                </p>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Roadmap */}
      <div className="mt-12">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.12em] text-foreground">
          Roadmap
        </h2>
        <p className="mt-1 text-[13px] text-muted">{bp.roadmap.intro}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-[12px] text-muted">
          <span>Quick wins under 6 weeks: {buckets.quick}</span>
          <span>Medium 6 to 16 weeks: {buckets.medium}</span>
          <span>Long over 16 weeks: {buckets.long}</span>
        </div>
        <div className="mt-5 space-y-2">
          {bp.roadmap.initiatives.map((it) => {
            const left = ((it.start_month * 4.345) / totalWeeks) * 100;
            const width = (it.duration_weeks / totalWeeks) * 100;
            const st = bp.solution_types.find(
              (s) => s.id === it.solution_type,
            );
            return (
              <div key={it.ref_id} className="flex items-center gap-3">
                <span className="w-44 shrink-0 truncate text-[12px] text-foreground">
                  {it.label}
                </span>
                <div className="relative h-6 flex-1 rounded bg-black/[0.04]">
                  <div
                    title={it.tooltip}
                    className={`absolute top-0 flex h-6 items-center rounded px-2 text-[10px] font-bold text-white ${
                      TOKEN_BG[st?.color_token ?? "muted"] ?? "bg-muted"
                    }`}
                    style={{
                      left: `${left}%`,
                      width: `${Math.max(width, 6)}%`,
                    }}
                  >
                    {it.duration_weeks}w
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-muted">
          {Array.from({ length: bp.roadmap.total_months + 1 }).map((_, i) => (
            <span key={i}>{i}mo</span>
          ))}
        </div>
      </div>
    </Container>
  );
}
