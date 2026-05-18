"use client";

import { useState } from "react";
import type { BlueprintOpportunity } from "@/lib/api/audits";
import { money, moneyYr } from "@/lib/api/audit-derive";

function Risk({ level }: { level: "low" | "medium" | "high" }) {
  const map = {
    low: "bg-success-soft text-success",
    medium: "bg-amber-100 text-amber-800",
    high: "bg-red-100 text-red-700",
  } as const;
  return (
    <span
      className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.07em] ${map[level]}`}
    >
      {level} risk
    </span>
  );
}

// One blueprint opportunity, collapsed by default. Client island (expand).
export function OpportunityCard({
  o,
  solutionTypeLabel,
  problems,
  wasteItems,
}: {
  o: BlueprintOpportunity;
  solutionTypeLabel: string;
  problems: string[];
  wasteItems: { title: string; annual: number }[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <article className="rounded-xl border border-border bg-surface">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full flex-col gap-3 p-6 text-left"
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] text-muted">{o.ref_id}</span>
          <span className="rounded border border-brand-300 bg-brand-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-brand-700">
            {solutionTypeLabel}
          </span>
          <Risk level={o.risk_level} />
          <span className="ml-auto text-[13px] font-semibold text-brand-600">
            {open ? "Hide details" : "View full details"}
          </span>
        </div>
        <h3 className="text-[17px] font-bold text-foreground">{o.title}</h3>
        {o.quote && (
          <p className="text-[13px] italic text-muted">
            &ldquo;{o.quote.text}&rdquo;
          </p>
        )}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat big={moneyYr(o.annual_value)} label="Annual value" />
          <Stat
            big={`${money(o.build_cost_min)} to ${money(o.build_cost_max)}`}
            label="Build cost"
            small
          />
          <Stat big={`${o.payback_months} mo`} label="Payback" />
          <Stat big={`${o.timeline_weeks} wks`} label="Timeline" />
        </div>
      </button>

      {open && (
        <div className="space-y-5 border-t border-border px-6 py-6 text-[13px] leading-relaxed">
          <Block title="What we would build">
            <p className="text-muted">{o.summary}</p>
          </Block>
          <Block title="Problems this solves">
            <ul className="list-disc space-y-1 pl-5 text-muted">
              {problems.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </Block>
          <Block title="Waste this eliminates">
            <ul className="space-y-1 text-muted">
              {wasteItems.map((w, i) => (
                <li key={i}>
                  {w.title} ({moneyYr(w.annual)})
                </li>
              ))}
            </ul>
          </Block>
          <Block title="Risk">
            <p className="text-muted">{o.risk_description}</p>
          </Block>
          <Block title="How we calculated this value">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-muted sm:grid-cols-3">
              <Field k="Method" v={o.methodology} />
              <Field
                k="Build cost"
                v={`${money(o.build_cost_min)} to ${money(o.build_cost_max)}`}
              />
              <Field k="Dev hours" v={`${o.dev_hours} hrs`} />
              <Field k="PM hours" v={`${o.pm_hours} hrs`} />
              <Field k="Payback" v={`${o.payback_months} months`} />
              <Field k="Confidence" v={o.confidence} />
            </dl>
          </Block>
        </div>
      )}
    </article>
  );
}

function Stat({
  big,
  label,
  small = false,
}: {
  big: string;
  label: string;
  small?: boolean;
}) {
  return (
    <div>
      <p
        className={`font-extrabold leading-none text-foreground tabular-nums ${
          small ? "text-[14px]" : "text-[18px]"
        }`}
      >
        {big}
      </p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.06em] text-muted">
        {label}
      </p>
    </div>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-foreground">
        {title}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.06em] text-muted/70">
        {k}
      </dt>
      <dd className="text-foreground">{v}</dd>
    </div>
  );
}
