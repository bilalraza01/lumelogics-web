"use client";

import { useState } from "react";
import type { Category, FindingItem } from "@/lib/api/audits";

function SeverityBadge({ value }: { value: "HIGH" | "MEDIUM" }) {
  const high = value === "HIGH";
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] ${
        high ? "bg-brand-500/10 text-brand-700" : "bg-black/[0.05] text-muted"
      }`}
    >
      {value}
    </span>
  );
}

function Row({
  item,
  sessionLabels,
}: {
  item: FindingItem;
  sessionLabels: Record<string, string>;
}) {
  return (
    <li className="flex items-start gap-3 border-b border-border py-3 last:border-0">
      <span className="mt-0.5 shrink-0 font-mono text-[11px] text-muted">
        {item.ref_id}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-medium text-foreground">{item.title}</p>
        <p className="mt-0.5 text-[12px] text-muted">{item.description}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <SeverityBadge value={item.severity} />
        <span className="text-[11px] text-muted">
          {sessionLabels[item.source_session] ?? item.source_session}
        </span>
      </div>
    </li>
  );
}

// Category filter bar with live counts (client island). All data is passed
// in from the server page; nothing is fetched here.
export function FindingsBoard({
  categories,
  painPoints,
  optimisations,
  sessionLabels,
}: {
  categories: Category[];
  painPoints: FindingItem[];
  optimisations: FindingItem[];
  sessionLabels: Record<string, string>;
}) {
  const [active, setActive] = useState<string>("ALL");

  const all = [...painPoints, ...optimisations];
  const countFor = (catId: string) =>
    all.filter((i) => i.category === catId).length;

  const pp =
    active === "ALL"
      ? painPoints
      : painPoints.filter((i) => i.category === active);
  const opt =
    active === "ALL"
      ? optimisations
      : optimisations.filter((i) => i.category === active);

  const tabs = [
    { id: "ALL", label: "All", count: all.length },
    ...categories.map((c) => ({
      id: c.id,
      label: c.label,
      count: countFor(c.id),
    })),
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => {
          const on = active === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
                on
                  ? "border-brand-500 bg-brand-500/10 text-brand-700"
                  : "border-border bg-surface text-muted hover:border-brand-300"
              }`}
            >
              {t.label}{" "}
              <span className={on ? "text-brand-600" : "text-muted/70"}>
                ({t.count})
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-[13px] font-bold uppercase tracking-[0.12em] text-foreground">
            Pain points{" "}
            <span className="text-muted">({pp.length})</span>
          </h2>
          <ul className="mt-3 rounded-xl border border-border bg-surface px-5">
            {pp.length === 0 && (
              <li className="py-6 text-center text-[13px] text-muted">
                Nothing in this category.
              </li>
            )}
            {pp.map((i) => (
              <Row key={i.ref_id} item={i} sessionLabels={sessionLabels} />
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-[13px] font-bold uppercase tracking-[0.12em] text-foreground">
            Optimisations{" "}
            <span className="text-muted">({opt.length})</span>
          </h2>
          <ul className="mt-3 rounded-xl border border-border bg-surface px-5">
            {opt.length === 0 && (
              <li className="py-6 text-center text-[13px] text-muted">
                Nothing in this category.
              </li>
            )}
            {opt.map((i) => (
              <Row key={i.ref_id} item={i} sessionLabels={sessionLabels} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
