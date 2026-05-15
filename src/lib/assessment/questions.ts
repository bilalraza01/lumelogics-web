// The 18 questions. Source of truth is the spec at
// ai_readiness_assessment_spec.md §3.2. Don't paraphrase without confirming.
//
// The user does not see the dimension labels during the flow — they're here
// for scoring (and the subtle dimension-progress hint).

import type { Question } from "./types";

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    dimension: "process_clarity",
    type: "single_select",
    prompt:
      "Do you have written documentation (SOPs, playbooks, or runbooks) for your top 3 recurring workflows?",
    options: [
      { label: "Yes, all 3 are documented and current.", value: 5 },
      { label: "Yes, but they're outdated.", value: 3 },
      { label: "For 1 or 2 of them, not all.", value: 2 },
      { label: "No, none of them are documented.", value: 0 },
    ],
  },
  {
    id: "q2",
    dimension: "workflow_discipline",
    type: "single_select",
    prompt:
      "How often do different team members handle the same task differently?",
    options: [
      { label: "Rarely. We have consistent processes.", value: 5 },
      { label: "Sometimes, on edge cases.", value: 3 },
      { label: "Often. Everyone has their own way.", value: 1 },
      { label: "Almost always. There's no standard.", value: 0 },
    ],
  },
  {
    id: "q3",
    dimension: "operational_visibility",
    type: "yes_no",
    prompt:
      "Can you tell me, within 10% accuracy, how many hours per week your team spends on your single most repetitive task?",
    options: [
      { label: "Yes", value: 5 },
      { label: "No", value: 0 },
    ],
  },
  {
    id: "q4",
    dimension: "process_clarity",
    type: "yes_no",
    prompt:
      "If a new hire joined your team tomorrow, could they understand your processes without your direct involvement?",
    options: [
      { label: "Yes", value: 5 },
      { label: "No", value: 0 },
    ],
  },
  {
    id: "q5",
    dimension: "operational_visibility",
    type: "single_select",
    prompt:
      "How do you currently track the cost (in hours or dollars) of your operational work?",
    options: [
      { label: "We have dashboards or reports that show this.", value: 5 },
      { label: "We track it in spreadsheets manually.", value: 3 },
      { label: "We have a rough sense but don't measure it.", value: 1 },
      { label: "We don't track it.", value: 0 },
    ],
  },
  {
    id: "q6",
    dimension: "change_readiness",
    type: "slider_1_5",
    prompt:
      "Rate your team's appetite for trying new tools and processes (1 = very resistant, 5 = enthusiastic adopters).",
  },
  {
    id: "q7",
    dimension: "workflow_discipline",
    type: "single_select",
    prompt:
      "When something goes wrong in one of your core workflows, what typically happens?",
    options: [
      { label: "We have a documented fallback or escalation.", value: 5 },
      { label: "The senior person on shift handles it.", value: 3 },
      { label: "It depends on who's available.", value: 1 },
      { label: "We figure it out reactively each time.", value: 0 },
    ],
  },
  {
    id: "q8",
    dimension: "operational_visibility",
    type: "yes_no",
    prompt:
      "Do you know your fully-loaded hourly cost per role (salary + benefits + overhead) for the people doing your most automatable work?",
    options: [
      { label: "Yes", value: 5 },
      { label: "No", value: 0 },
    ],
  },
  {
    id: "q9",
    dimension: "process_clarity",
    type: "single_select",
    prompt:
      "How well-defined is the 'finished' state for your most common deliverable to clients?",
    options: [
      { label: "Crystal clear. Same definition every time.", value: 5 },
      { label: "Mostly clear, with some variation.", value: 3 },
      { label: "Varies by client or by team member.", value: 1 },
      { label: "It's whatever the client says is finished.", value: 0 },
    ],
  },
  {
    id: "q10",
    dimension: "change_readiness",
    type: "single_select",
    prompt:
      "Have you successfully rolled out a new software tool to your team in the past 12 months?",
    options: [
      { label: "Yes, and adoption is strong.", value: 5 },
      { label: "Yes, but adoption has been mixed.", value: 3 },
      { label: "We tried and it didn't stick.", value: 1 },
      { label: "No, we haven't tried.", value: 0 },
    ],
  },
  {
    id: "q11",
    dimension: "workflow_discipline",
    type: "yes_no",
    prompt:
      "Do your top 3 workflows currently produce consistent outputs regardless of who's executing them?",
    options: [
      { label: "Yes", value: 5 },
      { label: "No", value: 0 },
    ],
  },
  {
    id: "q12",
    dimension: "operational_visibility",
    type: "single_select",
    prompt:
      "How quickly can you tell me how many of your client engagements are profitable this month?",
    options: [
      { label: "Within the hour, from a real-time dashboard.", value: 5 },
      { label: "Within a day, after some manual analysis.", value: 3 },
      { label: "Within a week.", value: 1 },
      { label: "I'm not sure how I'd calculate that.", value: 0 },
    ],
  },
  {
    id: "q13",
    dimension: "change_readiness",
    type: "single_select",
    prompt: "What's your realistic budget for an initial AI workflow build?",
    options: [
      { label: "$50K+", value: 5 },
      { label: "$20K to $50K", value: 4 },
      { label: "$10K to $20K", value: 3 },
      { label: "$5K to $10K", value: 2 },
      { label: "Less than $5K", value: 1 },
      { label: "I'm not ready to invest yet.", value: 0 },
    ],
  },
  {
    id: "q14",
    dimension: "process_clarity",
    type: "single_select",
    prompt: "Who is responsible for keeping your process documentation current?",
    options: [
      { label: "A named person, with time allocated to it.", value: 5 },
      { label: "A named person, but it's not their priority.", value: 3 },
      { label: "Whoever has time.", value: 1 },
      { label: "Nobody. It's not documented or maintained.", value: 0 },
    ],
  },
  {
    id: "q15",
    dimension: "operational_visibility",
    type: "yes_no",
    prompt:
      "Have you measured the error rate (or rework rate) on your most-repeated workflow in the past 90 days?",
    options: [
      { label: "Yes", value: 5 },
      { label: "No", value: 0 },
    ],
  },
  {
    id: "q16",
    dimension: "change_readiness",
    type: "yes_no",
    prompt:
      "Do you have someone on your team, yourself or otherwise, who can dedicate at least 4 hours per week to an AI implementation project for 3 months?",
    options: [
      { label: "Yes", value: 5 },
      { label: "No", value: 0 },
    ],
  },
  {
    id: "q17",
    dimension: "process_clarity",
    type: "single_select",
    prompt: "How standardized is your client/customer onboarding process?",
    options: [
      { label: "Fully scripted, same every time.", value: 5 },
      { label: "Mostly standardized, with custom touches.", value: 3 },
      { label: "Varies significantly per client.", value: 1 },
      { label: "We don't have a defined onboarding.", value: 0 },
    ],
  },
  {
    id: "q18",
    dimension: "workflow_discipline",
    type: "single_select",
    prompt:
      "How is sensitive client data (PII, financial records, etc.) currently handled in your top workflows?",
    options: [
      { label: "Clear policies, restricted access, audited.", value: 5 },
      { label: "Clear policies but not strictly enforced.", value: 3 },
      { label: "Informal. People are careful.", value: 1 },
      { label: "Hasn't been thought about.", value: 0 },
    ],
  },
];

export const DIMENSION_LABELS: Record<Question["dimension"], string> = {
  process_clarity: "Process",
  workflow_discipline: "Workflow",
  operational_visibility: "Visibility",
  change_readiness: "Readiness",
};
