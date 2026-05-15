// Shared types for the AI Readiness Assessment.
// Mirrors the response shape from POST /api/v1/assessments and
// GET /api/v1/assessments/:token in the Rails backend (see
// ai_readiness_assessment_spec.md §4.4).

export type QuestionType = "single_select" | "yes_no" | "slider_1_5";

export type Dimension =
  | "process_clarity"
  | "workflow_discipline"
  | "operational_visibility"
  | "change_readiness";

export type ArchetypeKey =
  | "wishful_thinker"
  | "aspirational_operator"
  | "coordinated_operator"
  | "build_ready_operator"
  | "optimization_operator";

export interface Option {
  label: string;
  value: number;
}

export interface Question {
  id: string;          // "q1" … "q18"
  dimension: Dimension;
  type: QuestionType;
  prompt: string;
  options?: Option[];  // present for single_select and yes_no
}

export type Answers = Record<string, number>;

export interface DimensionScore {
  raw: number;
  scaled: number;
  max: number;
}

export interface AssessmentResult {
  result_token: string;
  total_score: number;
  archetype: ArchetypeKey;
  archetype_display: string;
  verdict: string;
  dimension_scores: Record<Dimension, DimensionScore>;
  cta: { label: string; url: string };
  results_url: string;
}
