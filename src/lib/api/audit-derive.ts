// Every computed number in the audit (waste totals, category breakdown,
// blueprint value, matrix bubbles, roadmap buckets) is derived here so the
// deliverable pages and the comprehensive report can never disagree. The
// stored document holds only atomic facts, never sums or percentages.

import type {
  AuditDocument,
  Blueprint,
  WasteOpportunity,
} from "./audits";

/* ------------------------------ formatting ------------------------------ */

export function money(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

export function moneyYr(n: number): string {
  return `${money(n)}/year`;
}

export function hours(n: number): string {
  // Whole numbers stay whole, otherwise one decimal (e.g. 3.5).
  return Number.isInteger(n) ? `${n}` : n.toFixed(1);
}

/** "12 hrs/wk x 2 people x $50/hr x 52 = $62,400/year" (drops the people
 *  factor for single-person opportunities). No multiplication glyph so the
 *  no-em-dash / clean-copy rule holds; uses a plain "x". */
export function costSubstitution(o: WasteOpportunity): string {
  const head =
    o.people_affected > 1
      ? `${hours(o.weekly_hours)} hrs/wk x ${o.people_affected} people x $${o.hourly_rate}/hr x 52`
      : `${hours(o.weekly_hours)} hrs/wk x $${o.hourly_rate}/hr x 52`;
  return `${head} = ${moneyYr(o.annual_cost)}`;
}

/* ------------------------------- waste ---------------------------------- */

export function wasteTotals(doc: AuditDocument) {
  const opps = doc.waste.opportunities;
  return {
    totalAnnual: opps.reduce((s, o) => s + o.annual_cost, 0),
    totalWeeklyHours: opps.reduce((s, o) => s + o.weekly_hours, 0),
    count: opps.length,
  };
}

export interface CategorySlice {
  id: string;
  label: string;
  total: number;
  hoursTotal: number;
  pct: number;
}

export function wasteByCategory(doc: AuditDocument): CategorySlice[] {
  const total = wasteTotals(doc).totalAnnual || 1;
  return doc.categories
    .map((c) => {
      const items = doc.waste.opportunities.filter((o) => o.category === c.id);
      const sum = items.reduce((s, o) => s + o.annual_cost, 0);
      return {
        id: c.id,
        label: c.label,
        total: sum,
        hoursTotal: items.reduce((s, o) => s + o.weekly_hours, 0),
        pct: Math.round((sum / total) * 100),
      };
    })
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total);
}

/* ----------------------------- blueprint -------------------------------- */

export function blueprintAnnualValue(doc: AuditDocument): number {
  return doc.blueprint.opportunities.reduce((s, o) => s + o.annual_value, 0);
}

export interface MatrixBubble {
  domainId: string;
  label: string;
  combinedValue: number;
  initiatives: { ref_id: string; title: string; annual_value: number }[];
}

export function matrixBubbles(doc: AuditDocument): MatrixBubble[] {
  return doc.blueprint.domains
    .map((d) => {
      const initiatives = doc.blueprint.opportunities
        .filter((o) => o.domains.includes(d.id))
        .map((o) => ({
          ref_id: o.ref_id,
          title: o.title,
          annual_value: o.annual_value,
        }));
      return {
        domainId: d.id,
        label: d.label,
        combinedValue: initiatives.reduce((s, i) => s + i.annual_value, 0),
        initiatives,
      };
    })
    .filter((b) => b.initiatives.length > 0)
    .sort((a, b) => b.combinedValue - a.combinedValue);
}

/** Quick / medium / long buckets by timeline_weeks (matches the reference:
 *  quick < 6w, medium 6 to 16w, long > 16w). */
export function roadmapBuckets(bp: Blueprint) {
  let quick = 0;
  let medium = 0;
  let long = 0;
  for (const o of bp.opportunities) {
    if (o.timeline_weeks < 6) quick += 1;
    else if (o.timeline_weeks <= 16) medium += 1;
    else long += 1;
  }
  return { quick, medium, long };
}

/* --------------------------- ref resolvers ------------------------------ */

export function indexBy<T extends Record<string, unknown>>(
  arr: T[],
  key: keyof T,
): Record<string, T> {
  const out: Record<string, T> = {};
  for (const item of arr) out[String(item[key])] = item;
  return out;
}

/** Owner/tool ids on process steps may be ids ("PERSON-1") or already-display
 *  names. Resolve through the roster, falling back to the raw value. */
export function resolveName(
  raw: string,
  map: Record<string, { name: string }>,
): string {
  return map[raw]?.name ?? raw;
}
