"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Share2 } from "lucide-react";
import type { SVGProps } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";

// Lucide doesn't ship brand icons; inline LinkedIn SVG matches the Footer.
const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z"/>
  </svg>
);
import { useBooking } from "@/components/ui/BookingModal";
import { DIMENSION_LABELS } from "@/lib/assessment/questions";
import { archetypeByKey } from "@/lib/assessment/archetypes";
import type { AssessmentResult, Dimension } from "@/lib/assessment/types";

interface Props {
  result: AssessmentResult;
  /** True when this came from local scoring (no backend wired). Shows a
   *  banner so users know their results weren't persisted/emailed. */
  isPreview?: boolean;
}

export function Results({ result, isPreview }: Props) {
  const booking = useBooking();
  const meta = archetypeByKey(result.archetype);

  // If the CTA URL starts with "#book" we treat it as "open the booking
  // modal" instead of a real link. Anything else (e.g. "#playbook" or a real
  // URL) renders as an anchor.
  const ctaOpensBooking = result.cta.url.startsWith("#book");

  return (
    <motion.div
      key="results"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      {isPreview && <PreviewBanner />}

      {/* Hero score + archetype */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-8 text-white sm:p-12">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),_transparent_55%)]"
          aria-hidden
        />
        <div className="relative">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
            Your archetype
          </p>
          <h1 className="mt-3 text-balance text-[32px] sm:text-[44px] font-semibold leading-[1.05] tracking-tight">
            {result.archetype_display}
          </h1>
          <div className="mt-6 flex items-end gap-2">
            <span className="text-[72px] sm:text-[96px] font-semibold leading-none tracking-tight">
              {result.total_score}
            </span>
            <span className="mb-3 text-2xl text-white/60">/ 100</span>
          </div>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/80">
            {result.verdict}
          </p>
        </div>
      </div>

      {/* Dimension breakdown */}
      <section className="mt-10">
        <h2 className="text-sm font-semibold text-foreground">
          How you scored across the four dimensions
        </h2>
        <ul className="mt-5 space-y-4">
          {(
            Object.entries(result.dimension_scores) as [
              Dimension,
              { scaled: number; max: number },
            ][]
          ).map(([dim, score]) => (
            <li key={dim}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-medium text-foreground">
                  {DIMENSION_LABELS[dim]}
                </span>
                <span className="text-muted">
                  {score.scaled} / {score.max}
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-border">
                <motion.div
                  className="h-full rounded-full bg-brand-500"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(score.scaled / score.max) * 100}%`,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="mt-10 rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <h3 className="text-[17px] font-semibold text-foreground">
          What to do next
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-muted">
          Based on your score, the right next step is below.
        </p>
        <div className="mt-5">
          {ctaOpensBooking ? (
            <Button onClick={booking.open}>
              {result.cta.label} <ArrowRight size={16} />
            </Button>
          ) : (
            <ButtonLink href={result.cta.url}>
              {result.cta.label} <ArrowRight size={16} />
            </ButtonLink>
          )}
          {meta.isExternalCta && (
            <p className="mt-3 text-xs text-muted">
              No booking required. This is a free download.
            </p>
          )}
        </div>
      </section>

      {/* Share */}
      <section className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">Share your score:</p>
        <div className="flex gap-2">
          <ShareLink
            href={twitterShareUrl(result)}
            label="Share on X"
          >
            <Share2 size={15} />
          </ShareLink>
          <ShareLink
            href={linkedInShareUrl(result)}
            label="Share on LinkedIn"
          >
            <LinkedinIcon width={15} height={15} />
          </ShareLink>
        </div>
      </section>

      {/* Footer link back */}
      <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted">
        <Link
          href="/"
          className="text-brand-600 underline-offset-4 hover:underline"
        >
          ← Back to lumelogics.com
        </Link>
      </div>
    </motion.div>
  );
}

function PreviewBanner() {
  return (
    <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-3 text-[13px] text-amber-900">
      <strong className="font-semibold">Preview mode:</strong> your results
      were scored locally and aren&apos;t saved. Configure the assessment API
      to enable result persistence and emails.
    </div>
  );
}

interface ShareProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

function ShareLink({ href, label, children }: ShareProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-brand-300 hover:text-brand-600"
    >
      {children}
    </a>
  );
}

function buildShareUrl(result: AssessmentResult): string {
  if (typeof window === "undefined") return "https://lumelogics.com";
  return (
    window.location.origin +
    (result.results_url.startsWith("/")
      ? result.results_url
      : `/free-assessment/results/${result.result_token}`)
  );
}

function twitterShareUrl(result: AssessmentResult): string {
  const text = `I scored ${result.total_score}/100 on the Lumelogics AI Readiness Assessment. How ready is your business?`;
  const url = buildShareUrl(result);
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text,
  )}&url=${encodeURIComponent(url)}`;
}

function linkedInShareUrl(result: AssessmentResult): string {
  const url = buildShareUrl(result);
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url,
  )}`;
}
