import Link from "next/link";
import type { DownloadItem } from "@/lib/api/audits";
import { Section, SectionHead } from "./ui";

export function DownloadsGrid({
  downloads,
  slug,
}: {
  downloads: DownloadItem[];
  slug: string;
}) {
  return (
    <Section>
      <SectionHead
        label="Your deliverables"
        heading="Everything from the audit"
        sub="Open any deliverable below. Each is a live document, not a static file."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {downloads.map((d) => (
          <Link
            key={d.deliverable_key}
            href={`/audit/${slug}/${d.deliverable_key}`}
            className="group flex flex-col gap-3 rounded-xl border border-border bg-surface p-6 transition-colors hover:border-brand-300"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
              <span aria-hidden className="text-lg">
                &#9633;
              </span>
            </span>
            <div className="flex-1">
              <h3 className="text-[15px] font-bold text-foreground">
                {d.title}
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-muted">
                {d.description}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-brand-600">
              Open
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                &rarr;
              </span>
              <span className="ml-auto text-[11px] font-normal uppercase tracking-[0.08em] text-muted">
                {d.format_label}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
