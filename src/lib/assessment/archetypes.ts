// Archetype metadata. Source of truth for the final flow is the API
// response (display name, verdict, CTA) — this file is the fallback used
// by the local-scoring preview when NEXT_PUBLIC_ASSESSMENT_API_URL is unset.
// See ai_readiness_assessment_spec.md §3.3.

import type { ArchetypeKey } from "./types";

export interface ArchetypeMeta {
  key: ArchetypeKey;
  display: string;
  /** Inclusive score range (0..100) */
  range: [number, number];
  verdict: string;
  /** Fallback CTA when the API doesn't provide one. */
  cta: { label: string; url: string };
  /** Set true for the archetype whose CTA should NOT trigger the Calendly
   *  booking modal (currently just Wishful Thinker — the playbook download). */
  isExternalCta?: boolean;
}

export const ARCHETYPES: ArchetypeMeta[] = [
  {
    key: "wishful_thinker",
    display: "The Wishful Thinker",
    range: [0, 35],
    verdict:
      "You like the idea of AI but the foundations aren't there yet. You're 6+ months from ready, and that's a fixable problem.",
    cta: {
      label: "Download the AI Readiness Playbook",
      url: "/free/ai-readiness-playbook",
    },
    isExternalCta: true,
  },
  {
    key: "aspirational_operator",
    display: "The Aspirational Operator",
    range: [36, 55],
    verdict:
      "You're building the right habits but key pieces are missing. You're 3 to 6 months from ready. The gaps below tell you where to focus.",
    cta: { label: "Book a free 20-minute readiness call", url: "#book" },
  },
  {
    key: "coordinated_operator",
    display: "The Coordinated Operator",
    range: [56, 75],
    verdict:
      "Strong foundations with one or two real gaps. You're closer to ready than you think.",
    cta: { label: "Book a free 30-minute consult", url: "#book" },
  },
  {
    key: "build_ready_operator",
    display: "The Build-Ready Operator",
    range: [76, 90],
    verdict:
      "You're ready. The only real question is which workflow to automate first.",
    cta: { label: "Book the audit", url: "#book" },
  },
  {
    key: "optimization_operator",
    display: "The Optimization Operator",
    range: [91, 100],
    verdict:
      "You're past 'ready.' At your level, AI is leveraging an already-tight operation. The conversation is which advanced workflow.",
    cta: { label: "Book an advanced workflow consult", url: "#book" },
  },
];

export function archetypeForScore(total: number): ArchetypeMeta {
  return (
    ARCHETYPES.find(({ range }) => total >= range[0] && total <= range[1]) ??
    ARCHETYPES[0]
  );
}

export function archetypeByKey(key: ArchetypeKey): ArchetypeMeta {
  return ARCHETYPES.find((a) => a.key === key) ?? ARCHETYPES[0];
}
