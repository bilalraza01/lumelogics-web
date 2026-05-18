// Public read of a client audit deliverable by slug. Hits the Rails API at
// /api/v1/audits/by-slug/:slug. Server-side fetched so we can build metadata
// and 404 cleanly before any HTML is sent. Mirrors lib/api/videos.ts.

import { SCALEFORTE_PREVIEW } from "./_fixtures/scaleforte";

const API_URL = process.env.NEXT_PUBLIC_ASSESSMENT_API_URL ?? "";
export const IS_PREVIEW_MODE = API_URL === "";

/* ----------------------------- shared bits ----------------------------- */

export interface Quote {
  text: string;
  speaker: string;
  session_ref: string;
  recording_timestamp: string | null;
  recording_url: string | null;
}

export interface TimeEstimate {
  qty: number;
  unit: "minutes" | "hours" | "days";
  frequency: string;
}

/* --------------------------------- hero --------------------------------- */

export interface Hero {
  eyebrow: string;
  client_name: string;
  audit_started_label: string;
  status_pill: { label: string; tone: "success" | "active" | "neutral" };
}

export interface AiMoment {
  label: string;
  heading: string;
  sub: string;
  analogy_callout: { title: string; body: string };
  explainer: { icon: string; title: string; body: string }[];
  diagram: {
    silos: { label: string }[];
    connected: { label: string }[];
    caption: string;
  };
}

export interface JourneyStage {
  id: string;
  label: string;
  state: "done" | "active" | "upcoming";
  sub: string;
}

export interface Session {
  id: string;
  badge: string;
  complete: boolean;
  date: string;
  title: string;
  summary: string;
  stage_tags: string[];
}

export type DeliverableKey =
  | "process-map"
  | "findings"
  | "waste"
  | "blueprint"
  | "comprehensive-report";

export interface DeliverableCardData {
  key: DeliverableKey;
  heading: string;
  sub: string;
  state: "available" | "locked";
  cta_label: string;
  locked_tooltip: string | null;
}

export interface DownloadItem {
  title: string;
  description: string;
  deliverable_key: DeliverableKey;
  format_label: string;
}

export interface PrototypeCta {
  heading: string;
  sub: string;
  cta_label: string;
  url: string | null;
  enabled: boolean;
}

/* ------------------------------ process map ----------------------------- */

export type StepType = "standard" | "decision" | "automation" | "pain_point";

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  type: StepType;
  confidence: "high" | "medium" | "low";
  owners: string[];
  tools: string[];
  time_estimate: TimeEstimate;
  pain_point_ref?: string | null;
  quote?: Quote | null;
}

export interface ProcessMap {
  intro: string;
  legend: { type: StepType; label: string; description: string }[];
  team: { id: string; name: string; role: string }[];
  tools: { id: string; name: string; category: string }[];
  stages: {
    id: string;
    title: string;
    summary: string;
    steps: ProcessStep[];
  }[];
}

/* -------------------------------- findings ------------------------------ */

export interface Category {
  id: string;
  label: string;
  description: string;
}

export interface FindingItem {
  ref_id: string;
  title: string;
  severity: "HIGH" | "MEDIUM";
  category: string;
  source_session: string;
  description: string;
}

export interface Findings {
  intro: string;
  pain_points: FindingItem[];
  optimisations: FindingItem[];
}

/* --------------------------------- waste -------------------------------- */

export interface WasteOpportunity {
  ref_id: string;
  title: string;
  category: string;
  description: string;
  annual_cost: number;
  weekly_hours: number;
  hourly_rate: number;
  people_affected: number;
  priority: "high" | "medium" | "low";
  pain_point_ref?: string | null;
  quote?: Quote | null;
}

export interface Waste {
  intro: string;
  kpi_summary: {
    total_opportunities: number;
    recoverable_hours_per_week: number;
    default_rate_label: string;
  };
  cost_formula: string;
  opportunities: WasteOpportunity[];
}

/* ------------------------------- blueprint ------------------------------ */

export interface BlueprintOpportunity {
  ref_id: string;
  title: string;
  summary: string;
  annual_value: number;
  build_cost_min: number;
  build_cost_max: number;
  payback_months: number;
  timeline_weeks: number;
  solution_type: string;
  risk_level: "low" | "medium" | "high";
  risk_description: string;
  problems_solved: string[];
  waste_eliminated: string[];
  methodology: string;
  dev_hours: number;
  pm_hours: number;
  confidence: "HIGH" | "MEDIUM" | "LOW";
  domains: string[];
  layers: string[];
  quote?: Quote | null;
}

export interface Blueprint {
  intro: string;
  exec_kpis: { label: string; value: string; sub: string }[];
  framework_layers: { id: string; label: string; description: string }[];
  solution_types: {
    id: string;
    label: string;
    description: string;
    typical_timeline: string;
    color_token: string;
  }[];
  domains: { id: string; label: string }[];
  opportunities: BlueprintOpportunity[];
  priority_matrix: {
    x_axis_label: string;
    y_axis_label: string;
    quadrants: { id: string; label: string; position: "tl" | "tr" | "bl" | "br" }[];
  };
  video_gallery: { title: string; url: string; session_ref: string }[];
  roadmap: {
    intro: string;
    total_months: number;
    initiatives: {
      ref_id: string;
      label: string;
      start_month: number;
      duration_weeks: number;
      solution_type: string;
      tooltip: string;
    }[];
  };
}

export interface ReportDoc {
  title: string;
  subtitle: string;
  prepared_for: string;
  prepared_on: string;
  executive_summary: string;
  sections: { anchor: string; title: string; include: boolean }[];
  closing_note: string;
}

/* ----------------------------- the document ----------------------------- */

export interface AuditDocument {
  schema_version: number;
  hero: Hero;
  ai_moment: AiMoment;
  journey: { stages: JourneyStage[] };
  sessions: Session[];
  deliverables: DeliverableCardData[];
  downloads: DownloadItem[];
  prototype: PrototypeCta;
  footer: { note: string };
  process_map: ProcessMap;
  categories: Category[];
  findings: Findings;
  waste: Waste;
  blueprint: Blueprint;
  report: ReportDoc;
}

export interface PublicAudit {
  slug: string;
  client_name: string;
  industry: string | null;
  status: string;
  started_on: string | null;
  completed_on: string | null;
  content: AuditDocument;
}

export async function fetchAuditBySlug(
  slug: string,
): Promise<PublicAudit | null> {
  if (IS_PREVIEW_MODE) {
    // Render fully offline during local dev without the API. Any slug maps
    // to the bundled Scaleforte sample so every /audit route is visible.
    return { ...SCALEFORTE_PREVIEW, slug };
  }

  const res = await fetch(
    `${API_URL}/api/v1/audits/by-slug/${encodeURIComponent(slug)}`,
    // Audit content changes rarely and there is no per-view logging (unlike
    // videos), so revalidate periodically instead of no-store.
    { next: { revalidate: 300 } },
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`fetch_failed_${res.status}`);
  return res.json();
}
