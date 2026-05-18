"use client";

import { useState } from "react";
import { money, moneyYr } from "@/lib/api/audit-derive";

export interface MatrixPoint {
  domainId: string;
  label: string;
  combinedValue: number;
  x: number; // 0..1 ease of implementation
  y: number; // 0..1 business impact
  size: number; // 0..1 relative bubble size
  initiatives: { ref_id: string; title: string; annual_value: number }[];
}

export function PriorityMatrix({
  points,
  xAxisLabel,
  yAxisLabel,
  quadrants,
}: {
  points: MatrixPoint[];
  xAxisLabel: string;
  yAxisLabel: string;
  quadrants: { id: string; label: string; position: "tl" | "tr" | "bl" | "br" }[];
}) {
  const [active, setActive] = useState<MatrixPoint | null>(null);
  const qPos: Record<string, string> = {
    tl: "top-3 left-3",
    tr: "top-3 right-3",
    bl: "bottom-3 left-3",
    br: "bottom-3 right-3",
  };

  return (
    <div>
      <div className="relative aspect-[16/10] w-full rounded-xl border border-border bg-surface p-10">
        {/* axes */}
        <div className="absolute inset-x-10 bottom-10 h-px bg-foreground/30" />
        <div className="absolute inset-y-10 left-10 w-px bg-foreground/30" />
        <div className="absolute inset-x-10 top-1/2 h-px bg-foreground/10" />
        <div className="absolute inset-y-10 left-1/2 w-px bg-foreground/10" />

        {quadrants.map((q) => (
          <span
            key={q.id}
            className={`absolute text-[10px] font-bold uppercase tracking-[0.08em] text-muted/60 ${qPos[q.position]}`}
          >
            {q.label}
          </span>
        ))}

        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.08em] text-muted">
          {xAxisLabel} &rarr;
        </span>
        <span className="absolute left-1 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold uppercase tracking-[0.08em] text-muted">
          {yAxisLabel} &rarr;
        </span>

        {/* plot area (inset by the 40px padding) */}
        <div className="absolute inset-10">
          {points.map((p) => {
            const dim = 36 + p.size * 56;
            return (
              <button
                key={p.domainId}
                type="button"
                onClick={() => setActive(p)}
                title={`${p.label}: ${moneyYr(p.combinedValue)}`}
                className="group absolute -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-brand-500 bg-brand-500/20 transition-transform hover:scale-110"
                style={{
                  left: `${p.x * 100}%`,
                  bottom: `${p.y * 100}%`,
                  width: dim,
                  height: dim,
                }}
              >
                <span className="pointer-events-none absolute left-1/2 top-1/2 w-max -translate-x-1/2 -translate-y-1/2 text-center text-[10px] font-bold leading-tight text-brand-800">
                  {p.label}
                  <span className="block font-extrabold">
                    {money(p.combinedValue)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-3 text-center text-[12px] text-muted">
        Bubble size is annual value. Tap a domain to see its initiatives.
      </p>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-border bg-surface p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-[18px] font-extrabold tracking-tight text-foreground">
                {active.label}
              </h3>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="text-[20px] leading-none text-muted hover:text-foreground"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <ul className="mt-4 space-y-2">
              {active.initiatives.map((i) => (
                <li
                  key={i.ref_id}
                  className="flex items-center justify-between gap-3 border-b border-border pb-2 text-[13px] last:border-0"
                >
                  <span className="text-foreground">{i.title}</span>
                  <span className="shrink-0 font-semibold text-brand-700 tabular-nums">
                    {moneyYr(i.annual_value)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[13px]">
              <span className="text-muted">
                {active.initiatives.length} initiatives
              </span>
              <span className="font-extrabold text-foreground tabular-nums">
                {moneyYr(active.combinedValue)} combined
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
