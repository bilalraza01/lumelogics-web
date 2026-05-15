// Thin API client for the assessment endpoints.
// See ai_readiness_assessment_spec.md §5.2.
//
// When NEXT_PUBLIC_ASSESSMENT_API_URL is unset (i.e. the Rails backend isn't
// deployed yet), we fall back to local scoring so the flow can be demoed
// end-to-end. Submissions in preview mode are NOT persisted and NO email is
// sent — the UI flags this clearly.

import { scoreLocally } from "@/lib/assessment/scoring";
import { archetypeByKey } from "@/lib/assessment/archetypes";
import type { Answers, AssessmentResult } from "@/lib/assessment/types";

const API_URL = process.env.NEXT_PUBLIC_ASSESSMENT_API_URL ?? "";
export const IS_PREVIEW_MODE = API_URL === "";

export interface SubmitPayload {
  email: string;
  answers: Answers;
  referral_source?: string;
}

export async function submitAssessment(
  payload: SubmitPayload,
): Promise<AssessmentResult> {
  if (IS_PREVIEW_MODE) return previewSubmit(payload);

  const res = await fetch(`${API_URL}/api/v1/assessments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Assessment submission failed (${res.status})`);
  }
  return res.json();
}

export async function fetchResult(token: string): Promise<AssessmentResult> {
  if (IS_PREVIEW_MODE) {
    throw new Error(
      "Preview mode: results are not persisted. Configure NEXT_PUBLIC_ASSESSMENT_API_URL to fetch real results.",
    );
  }
  const res = await fetch(`${API_URL}/api/v1/assessments/${token}`);
  if (res.status === 404) throw new Error("Result not found.");
  if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
  return res.json();
}

// ── Local preview mode ─────────────────────────────────────────────────────
// Mirrors the response shape from the real API exactly, using local scoring
// and archetype metadata. result_token is generated client-side and only
// lives for this session.
function previewSubmit({ email, answers }: SubmitPayload): AssessmentResult {
  const { dimension_scores, total_score, archetype } = scoreLocally(answers);
  const meta = archetypeByKey(archetype);

  // crypto.randomUUID is available in modern browsers + node 19+.
  const token =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().replace(/-/g, "").slice(0, 22)
      : Math.random().toString(36).slice(2);

  void email; // captured in the shape but unused in preview mode

  return {
    result_token: token,
    total_score,
    archetype,
    archetype_display: meta.display,
    verdict: meta.verdict,
    dimension_scores,
    cta: meta.cta,
    results_url: `/free-assessment/results/${token}`,
  };
}
