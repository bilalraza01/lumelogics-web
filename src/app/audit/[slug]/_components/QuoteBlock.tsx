"use client";

import { useState } from "react";
import type { Quote } from "@/lib/api/audits";

// Attributed quote with an expandable row revealing the source session and a
// timestamped recording link. Client island (disclosure toggle only).
export function QuoteBlock({
  quote,
  sessionLabel,
}: {
  quote: Quote;
  sessionLabel: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <figure className="mt-4 border-l-2 border-brand-300 pl-4">
      <blockquote className="text-[13px] italic leading-relaxed text-muted">
        &ldquo;{quote.text}&rdquo;
      </blockquote>
      <figcaption className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-muted">
        <span className="font-semibold text-foreground">{quote.speaker}</span>
        <span aria-hidden>&middot;</span>
        <span>{sessionLabel}</span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="ml-1 text-[12px] font-medium text-brand-600 hover:underline"
          aria-expanded={open}
        >
          {open ? "Hide source" : "Source"}
        </button>
      </figcaption>
      {open && (
        <div className="mt-2 rounded-md border border-border bg-surface px-3 py-2 text-[12px] text-muted">
          <p>
            From {sessionLabel}
            {quote.recording_timestamp ? `, at ${quote.recording_timestamp}` : ""}.
          </p>
          {quote.recording_url ? (
            <a
              href={quote.recording_url}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block font-medium text-brand-600 hover:underline"
            >
              Open the recording
            </a>
          ) : (
            <p className="mt-1 text-muted/80">Recording link available on request.</p>
          )}
        </div>
      )}
    </figure>
  );
}
