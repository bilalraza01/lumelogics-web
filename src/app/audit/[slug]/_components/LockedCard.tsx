"use client";

import { useState } from "react";
import type { DeliverableCardData } from "@/lib/api/audits";

// Locked deliverable: dashed border, blurred ghost preview, lock glyph, and
// a hover/focus tooltip explaining when it unlocks. Client island (tooltip).
export function LockedCard({ d }: { d: DeliverableCardData }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative rounded-2xl border-2 border-dashed border-border bg-surface/60 p-8"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none select-none blur-[3px] opacity-50"
      >
        <p className="text-[22px] font-extrabold tracking-tight text-foreground">
          {d.heading}
        </p>
        <p className="mt-2 max-w-md text-[14px] text-muted">{d.sub}</p>
        <span className="mt-5 inline-block rounded-lg bg-black/[0.06] px-7 py-3 text-[14px] font-bold text-muted">
          {d.cta_label}
        </span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
        <span className="text-2xl" aria-hidden>
          &#128274;
        </span>
        <button
          type="button"
          onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
          className="text-[13px] font-semibold text-muted underline-offset-4 hover:underline"
        >
          Locked
        </button>
        {show && d.locked_tooltip && (
          <span className="absolute -top-2 max-w-xs -translate-y-full rounded-md bg-foreground px-3 py-1.5 text-[12px] text-white shadow-lg">
            {d.locked_tooltip}
          </span>
        )}
      </div>
    </div>
  );
}
