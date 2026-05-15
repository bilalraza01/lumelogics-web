// Local fallback that mirrors the Rails AssessmentScorer (see
// ai_readiness_assessment_spec.md §4.3). Used by the API client's preview
// mode when NEXT_PUBLIC_ASSESSMENT_API_URL is unset, so the flow can be
// demoed end-to-end without the backend. The real scoring is authoritative.

import type {
  Answers,
  ArchetypeKey,
  Dimension,
  DimensionScore,
} from "./types";

const DIMENSIONS: Record<Dimension, string[]> = {
  process_clarity: ["q1", "q4", "q9", "q14", "q17"],
  workflow_discipline: ["q2", "q7", "q11", "q18"],
  operational_visibility: ["q3", "q5", "q8", "q12", "q15"],
  change_readiness: ["q6", "q10", "q13", "q16"],
};

const PER_QUESTION_MAX = 5;
const DIMENSION_TARGET_MAX = 25;

export function scoreLocally(answers: Answers): {
  dimension_scores: Record<Dimension, DimensionScore>;
  total_score: number;
  archetype: ArchetypeKey;
} {
  const dimension_scores = {} as Record<Dimension, DimensionScore>;
  let total = 0;

  for (const [dim, keys] of Object.entries(DIMENSIONS) as [
    Dimension,
    string[],
  ][]) {
    const raw = keys.reduce((sum, q) => sum + (Number(answers[q]) || 0), 0);
    const rawMax = keys.length * PER_QUESTION_MAX;
    const scaled = rawMax === 0 ? 0 : Math.round((raw / rawMax) * DIMENSION_TARGET_MAX);
    dimension_scores[dim] = { raw, scaled, max: DIMENSION_TARGET_MAX };
    total += scaled;
  }

  return { dimension_scores, total_score: total, archetype: archetypeFor(total) };
}

function archetypeFor(total: number): ArchetypeKey {
  if (total <= 35) return "wishful_thinker";
  if (total <= 55) return "aspirational_operator";
  if (total <= 75) return "coordinated_operator";
  if (total <= 90) return "build_ready_operator";
  return "optimization_operator";
}
