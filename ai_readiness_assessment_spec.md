# AI Readiness Assessment — Implementation Spec

This document is for Claude Code (or any engineer) to build the AI Readiness Assessment feature for LumeLogics. It lives at `lumelogics.com/free-assessment` on the existing Next.js (or similar) frontend app. The backend is a separate Rails API + PostgreSQL service.

**Do not change anything else in the existing frontend app.** Only add the assessment route and its components.

---

## 1. Product Overview

A self-serve assessment that scores SMB business owners on their readiness for AI automation. The flow:

1. User lands on `/free-assessment`
2. Sees an intro screen explaining the assessment (1 minute, 18 questions, get personalized results)
3. Answers 18 questions across 4 dimensions, one question per screen, with a progress bar
4. Hits an email gate after the last question ("Enter your email to see your results")
5. On submit, receives an archetype + score breakdown on-screen immediately
6. Receives a follow-up email with a link to a permanent results page (`/free-assessment/results/:token`) and an embedded PDF report
7. Their email + answers + archetype are stored in the backend for later CRM nurture

The backend's job:
- Store assessment submissions (answers, scores, email, archetype, timestamp)
- Generate a unique result token per submission so results pages are revisitable
- Send the results email via Resend (or similar transactional email service)
- Expose API endpoints for the frontend to fetch results by token
- Provide an admin-only endpoint to list submissions (for CRM export)

---

## 2. Architecture

```
┌─────────────────────────────────────────────────┐
│ FRONTEND (existing app)                          │
│ lumelogics.com/free-assessment                   │
│                                                  │
│ - Intro screen                                   │
│ - 18-question flow (one per screen)              │
│ - Email gate                                     │
│ - On-screen results                              │
│ - Results page at /results/:token                │
└──────────────┬──────────────────────────────────┘
               │ HTTPS / JSON
               ▼
┌─────────────────────────────────────────────────┐
│ BACKEND (Rails API, separate deployment)         │
│ api.lumelogics.com (or wherever it's deployed)   │
│                                                  │
│ - POST /api/v1/assessments    (create)           │
│ - GET  /api/v1/assessments/:token (fetch result) │
│ - GET  /api/v1/admin/assessments (list, JWT)     │
│                                                  │
│ - Scoring engine (Ruby)                          │
│ - Resend email integration                       │
│ - PostgreSQL: assessments table                  │
└─────────────────────────────────────────────────┘
```

**Deployment:**
- Frontend: deploys with the existing Vercel app (no separate deployment, just a new route)
- Backend: deploy to Railway, Render, or Fly.io (any cheap Rails host)
- Database: PostgreSQL on the same host as the backend (Railway/Render both offer managed Postgres)

---

## 3. The Assessment Content

### 3.1 Four Dimensions

The assessment scores across 4 dimensions, each worth 25 points (100 total). Each dimension has 4 or 5 questions. **The user does not see the dimensions during the assessment** — the questions are shuffled in a fixed order so the dimensions feel naturally interleaved.

| # | Dimension | What it measures | Questions |
|---|-----------|------------------|-----------|
| 1 | **Process Clarity** | Can you describe what your team does, repeatably? | 5 |
| 2 | **Workflow Discipline** | Do tasks happen the same way each time? | 4 |
| 3 | **Operational Visibility** | Do you know what things cost in time and money? | 5 |
| 4 | **Change Readiness** | Will your team adopt new tools, and do you have resources? | 4 |

Total: 18 questions.

### 3.2 The 18 Questions

Each question is scored 0–5 points. Total possible: 18 × 5 = 90 points, then scaled to 100 for the display score. Or simply: each question worth ~5.5 points, scaled to a clean 100. Keep the implementation flexible — store raw scores per dimension and per question, and compute the display values at render time.

Each question is yes/no, single-select, or 1–5 slider. Type indicated below.

Use this exact list of questions. Don't paraphrase or reorder without good reason.

```
Q1  [Process Clarity]      Type: single_select
    "Do you have written documentation (SOPs, playbooks, or runbooks) for your top 3 recurring workflows?"
    - Yes, all 3 are documented and current. (5)
    - Yes, but they're outdated. (3)
    - For 1 or 2 of them, not all. (2)
    - No, none of them are documented. (0)

Q2  [Workflow Discipline]   Type: single_select
    "How often do different team members handle the same task differently?"
    - Rarely — we have consistent processes. (5)
    - Sometimes, on edge cases. (3)
    - Often — everyone has their own way. (1)
    - Almost always — there's no standard. (0)

Q3  [Operational Visibility] Type: yes_no
    "Can you tell me — within 10% accuracy — how many hours per week your team spends on your single most repetitive task?"
    - Yes (5)
    - No (0)

Q4  [Process Clarity]      Type: yes_no
    "If a new hire joined your team tomorrow, could they understand your processes without your direct involvement?"
    - Yes (5)
    - No (0)

Q5  [Operational Visibility] Type: single_select
    "How do you currently track the cost (in hours or dollars) of your operational work?"
    - We have dashboards or reports that show this. (5)
    - We track it in spreadsheets manually. (3)
    - We have a rough sense but don't measure it. (1)
    - We don't track it. (0)

Q6  [Change Readiness]     Type: slider_1_5
    "Rate your team's appetite for trying new tools and processes (1 = very resistant, 5 = enthusiastic adopters)"
    Slider value = score directly (1=1, 2=2, 3=3, 4=4, 5=5)

Q7  [Workflow Discipline]  Type: single_select
    "When something goes wrong in one of your core workflows, what typically happens?"
    - We have a documented fallback or escalation. (5)
    - The senior person on shift handles it. (3)
    - It depends on who's available. (1)
    - We figure it out reactively each time. (0)

Q8  [Operational Visibility] Type: yes_no
    "Do you know your fully-loaded hourly cost per role (salary + benefits + overhead) for the people doing your most automatable work?"
    - Yes (5)
    - No (0)

Q9  [Process Clarity]      Type: single_select
    "How well-defined is the 'finished' state for your most common deliverable to clients?"
    - Crystal clear — same definition every time. (5)
    - Mostly clear, with some variation. (3)
    - Varies by client or by team member. (1)
    - It's whatever the client says is finished. (0)

Q10 [Change Readiness]     Type: single_select
    "Have you successfully rolled out a new software tool to your team in the past 12 months?"
    - Yes, and adoption is strong. (5)
    - Yes, but adoption has been mixed. (3)
    - We tried and it didn't stick. (1)
    - No, we haven't tried. (0)

Q11 [Workflow Discipline]  Type: yes_no
    "Do your top 3 workflows currently produce consistent outputs regardless of who's executing them?"
    - Yes (5)
    - No (0)

Q12 [Operational Visibility] Type: single_select
    "How quickly can you tell me how many of your client engagements are profitable this month?"
    - Within the hour, from a real-time dashboard. (5)
    - Within a day, after some manual analysis. (3)
    - Within a week. (1)
    - I'm not sure how I'd calculate that. (0)

Q13 [Change Readiness]     Type: single_select
    "What's your realistic budget for an initial AI workflow build?"
    - $50K+ (5)
    - $20K to $50K (4)
    - $10K to $20K (3)
    - $5K to $10K (2)
    - Less than $5K (1)
    - I'm not ready to invest yet. (0)

Q14 [Process Clarity]      Type: single_select
    "Who is responsible for keeping your process documentation current?"
    - A named person, with time allocated to it. (5)
    - A named person, but it's not their priority. (3)
    - Whoever has time. (1)
    - Nobody — it's not documented or maintained. (0)

Q15 [Operational Visibility] Type: yes_no
    "Have you measured the error rate (or rework rate) on your most-repeated workflow in the past 90 days?"
    - Yes (5)
    - No (0)

Q16 [Change Readiness]     Type: yes_no
    "Do you have someone on your team — yourself or otherwise — who can dedicate at least 4 hours per week to an AI implementation project for 3 months?"
    - Yes (5)
    - No (0)

Q17 [Process Clarity]      Type: single_select
    "How standardized is your client/customer onboarding process?"
    - Fully scripted, same every time. (5)
    - Mostly standardized, with custom touches. (3)
    - Varies significantly per client. (1)
    - We don't have a defined onboarding. (0)

Q18 [Workflow Discipline]  Type: single_select
    "How is sensitive client data (PII, financial records, etc.) currently handled in your top workflows?"
    - Clear policies, restricted access, audited. (5)
    - Clear policies but not strictly enforced. (3)
    - Informal — people are careful. (1)
    - Hasn't been thought about. (0)
```

### 3.3 Scoring & Archetypes

Sum the per-question scores within each dimension. The raw maximums:

- Process Clarity: 5 questions × 5 = 25 pts
- Workflow Discipline: 4 questions × 5 = 20 pts → scale to /25
- Operational Visibility: 5 questions × 5 = 25 pts
- Change Readiness: 4 questions × 5 = 20 pts → scale to /25

Total score: sum of all four dimensions, scaled to /100.

**Five archetypes by total score:**

| Score Range | Archetype | One-Line Verdict |
|-------------|-----------|------------------|
| 0–35 | **The Wishful Thinker** | "You like the idea of AI but the foundations aren't there yet. You're 6+ months from ready, and that's a fixable problem." |
| 36–55 | **The Aspirational Operator** | "You're building the right habits but key pieces are missing. You're 3 to 6 months from ready. The gaps below tell you where to focus." |
| 56–75 | **The Coordinated Operator** | "Strong foundations with one or two real gaps. You're closer to ready than you think." |
| 76–90 | **The Build-Ready Operator** | "You're ready. The only real question is which workflow to automate first." |
| 91–100 | **The Optimization Operator** | "You're past 'ready.' At your level, AI is leveraging an already-tight operation. The conversation is which advanced workflow." |

**Per-archetype CTA on results page:**

- Wishful Thinker (0–35): No paid CTA. Instead, soft offer: "Download our 90-Day Playbook to start closing the gaps." Link to the relevant lead magnet.
- Aspirational Operator (36–55): "Book a free 20-minute readiness call. We'll talk through your specific gaps — no pitch."
- Coordinated Operator (56–75): "Book a free 30-minute consult. At your score, the right conversation is which workflow to tackle first."
- Build-Ready Operator (76–90): "Book the audit. At your readiness level, the right next step is a scoped first build."
- Optimization Operator (91–100): "Book an advanced workflow consult. You're past 'getting started' — let's talk about leveraging what you have."

---

## 4. Backend (Rails API)

### 4.1 Stack

- **Ruby:** 3.2+
- **Rails:** 7.2+ in API-only mode (`rails new lumelogics-api --api --database=postgresql`)
- **Database:** PostgreSQL 15+
- **Email:** Resend (use the `resend-ruby` gem)
- **Auth (admin only):** JWT via `jwt` gem. Frontend public endpoints are unauthenticated.
- **Testing:** RSpec + FactoryBot
- **Deploy:** Railway, Render, or Fly.io. Include a `Dockerfile` if needed for the chosen host.

### 4.2 Database Schema

One main table.

```ruby
# db/migrate/xxxxxxxx_create_assessments.rb
class CreateAssessments < ActiveRecord::Migration[7.2]
  def change
    create_table :assessments, id: :uuid do |t|
      t.string  :result_token,        null: false, index: { unique: true }
      t.string  :email,               null: false, index: true
      t.jsonb   :answers,             null: false, default: {}
      t.jsonb   :dimension_scores,    null: false, default: {}
      t.integer :total_score,         null: false
      t.string  :archetype,           null: false
      t.string  :referral_source           # optional: utm_source from query string
      t.string  :ip_address                # for basic abuse detection
      t.string  :user_agent
      t.boolean :email_sent,          null: false, default: false
      t.datetime :email_sent_at

      t.timestamps
    end

    add_index :assessments, :archetype
    add_index :assessments, :created_at
  end
end
```

Use UUID primary keys (enable `pgcrypto` extension first). `result_token` should be a separate URL-safe random string (e.g. `SecureRandom.urlsafe_base64(16)`).

**`answers` shape:**
```json
{
  "q1": 5,
  "q2": 3,
  "q3": 0,
  ...
  "q18": 5
}
```

**`dimension_scores` shape:**
```json
{
  "process_clarity":       { "raw": 18, "scaled": 18, "max": 25 },
  "workflow_discipline":   { "raw": 14, "scaled": 17, "max": 25 },
  "operational_visibility":{ "raw": 20, "scaled": 20, "max": 25 },
  "change_readiness":      { "raw": 12, "scaled": 15, "max": 25 }
}
```

### 4.3 Models & Services

```ruby
# app/models/assessment.rb
class Assessment < ApplicationRecord
  before_validation :generate_result_token, on: :create

  validates :email,          presence: true, format: URI::MailTo::EMAIL_REGEXP
  validates :answers,        presence: true
  validates :total_score,    presence: true,
                             numericality: { in: 0..100 }
  validates :archetype,      presence: true
  validates :result_token,   presence: true, uniqueness: true

  ARCHETYPES = %w[
    wishful_thinker
    aspirational_operator
    coordinated_operator
    build_ready_operator
    optimization_operator
  ].freeze

  validates :archetype, inclusion: { in: ARCHETYPES }

  private

  def generate_result_token
    self.result_token ||= SecureRandom.urlsafe_base64(16)
  end
end
```

```ruby
# app/services/assessment_scorer.rb
# Pure-Ruby service. Takes a hash of answers, returns dimension scores + total + archetype.
class AssessmentScorer
  DIMENSIONS = {
    process_clarity:        %w[q1 q4 q9 q14 q17],
    workflow_discipline:    %w[q2 q7 q11 q18],
    operational_visibility: %w[q3 q5 q8 q12 q15],
    change_readiness:       %w[q6 q10 q13 q16],
  }.freeze

  DIMENSION_MAX_PER_QUESTION = 5
  TARGET_DIMENSION_MAX = 25  # each dimension scales to /25
  TOTAL_MAX = 100

  def initialize(answers)
    @answers = answers.with_indifferent_access
  end

  def call
    dim_scores = DIMENSIONS.each_with_object({}) do |(dim, q_keys), h|
      raw = q_keys.sum { |q| @answers[q].to_i }
      raw_max = q_keys.size * DIMENSION_MAX_PER_QUESTION
      scaled = raw_max.zero? ? 0 : ((raw.to_f / raw_max) * TARGET_DIMENSION_MAX).round
      h[dim] = { raw: raw, scaled: scaled, max: TARGET_DIMENSION_MAX }
    end

    total = dim_scores.values.sum { |s| s[:scaled] }
    archetype = archetype_for(total)

    { dimension_scores: dim_scores, total_score: total, archetype: archetype }
  end

  private

  def archetype_for(total)
    case total
    when 0..35   then "wishful_thinker"
    when 36..55  then "aspirational_operator"
    when 56..75  then "coordinated_operator"
    when 76..90  then "build_ready_operator"
    else              "optimization_operator"
    end
  end
end
```

```ruby
# app/services/assessment_email_sender.rb
require "resend"

class AssessmentEmailSender
  def initialize(assessment)
    @assessment = assessment
  end

  def call
    Resend::Emails.send(
      from: "Bilal at LumeLogics <bilal@lumelogics.com>",
      to: [@assessment.email],
      subject: "Your AI Readiness Score: #{archetype_display_name}",
      html: html_body,
    )
    @assessment.update!(email_sent: true, email_sent_at: Time.current)
  end

  private

  def archetype_display_name
    @assessment.archetype.titleize
  end

  def results_url
    "https://lumelogics.com/free-assessment/results/#{@assessment.result_token}"
  end

  def html_body
    AssessmentMailerView.new(@assessment, results_url).render
  end
end
```

```ruby
# app/views/assessment_mailer_view.rb
# Simple class that returns HTML string. No ActionMailer.
# Keep the email layout clean: header, score, archetype, dimension breakdown, CTA, footer.
class AssessmentMailerView
  def initialize(assessment, results_url)
    @assessment = assessment
    @results_url = results_url
  end

  def render
    <<~HTML
      <!DOCTYPE html>
      <html>
      <body style="font-family: Inter, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1F2937; background: #FAF7F2;">
        <div style="padding: 32px 24px;">
          <div style="font-weight: 700; color: #5B21B6; margin-bottom: 24px;">LUMELOGICS</div>
          <h1 style="font-size: 24px; margin-bottom: 8px;">Your AI Readiness Score</h1>
          <p style="font-size: 14px; color: #6B7280; margin-bottom: 32px;">Here's how your business scored across the four dimensions of AI readiness.</p>

          <div style="background: #6B46C1; color: white; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <div style="font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; opacity: 0.8; margin-bottom: 8px;">Your archetype</div>
            <div style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">#{archetype_title}</div>
            <div style="font-size: 32px; font-weight: 800;">#{@assessment.total_score} / 100</div>
          </div>

          <a href="#{@results_url}" style="display: inline-block; background: #5B21B6; color: white; padding: 14px 24px; border-radius: 6px; text-decoration: none; font-weight: 600;">View your full results</a>

          <p style="font-size: 12px; color: #9CA3AF; margin-top: 32px;">
            LumeLogics &middot; AI workflow automation for SMBs<br>
            bilal@lumelogics.com &middot; lumelogics.com
          </p>
        </div>
      </body>
      </html>
    HTML
  end

  private

  def archetype_title
    @assessment.archetype.titleize
  end
end
```

### 4.4 API Endpoints

All endpoints under `/api/v1/`. JSON in/out. CORS configured to allow `https://lumelogics.com` (and `http://localhost:3000` for dev).

#### POST `/api/v1/assessments`

Creates a new assessment, scores it, fires the email, returns the result.

**Request body:**
```json
{
  "email": "owner@example.com",
  "answers": {
    "q1": 5, "q2": 3, "q3": 0, ..., "q18": 5
  },
  "referral_source": "linkedin"  // optional
}
```

**Validation:**
- `email` must be a valid email format
- `answers` must contain exactly 18 keys (q1–q18), each with an integer 0–5
- Reject duplicate submissions from the same email within 1 hour (return existing record)

**Response (201):**
```json
{
  "result_token": "abc123xyz",
  "total_score": 67,
  "archetype": "coordinated_operator",
  "archetype_display": "Coordinated Operator",
  "verdict": "Strong foundations with one or two real gaps. You're closer to ready than you think.",
  "dimension_scores": {
    "process_clarity":        { "raw": 18, "scaled": 18, "max": 25 },
    "workflow_discipline":    { "raw": 14, "scaled": 17, "max": 25 },
    "operational_visibility": { "raw": 20, "scaled": 20, "max": 25 },
    "change_readiness":       { "raw": 12, "scaled": 15, "max": 25 }
  },
  "cta": {
    "label": "Book a free 30-minute consult",
    "url": "https://lumelogics.com/audit"
  },
  "results_url": "https://lumelogics.com/free-assessment/results/abc123xyz"
}
```

Trigger the email send AFTER the response is returned (use a background job, or for v1, a `Thread.new { ... }` wrapped in error handling — but a real background job via Sidekiq / GoodJob is preferred).

#### GET `/api/v1/assessments/:token`

Fetches an existing assessment by token. Used by the `/results/:token` permanent page.

**Response (200):** same shape as the POST response.
**Response (404):** if token not found.

Rate limit: 10 requests / minute / IP.

#### GET `/api/v1/admin/assessments`

JWT-protected. Returns paginated list of assessments for CRM export.

**Headers:** `Authorization: Bearer <jwt>`

**Query params:**
- `page` (default 1)
- `per_page` (default 50, max 200)
- `archetype` (optional filter)
- `from` / `to` (ISO date strings)

**Response (200):**
```json
{
  "data": [
    { "id": "...", "email": "...", "total_score": 67, "archetype": "coordinated_operator", "created_at": "...", "referral_source": "linkedin" },
    ...
  ],
  "pagination": { "page": 1, "per_page": 50, "total": 412 }
}
```

JWT secret in `ENV["ADMIN_JWT_SECRET"]`. Tokens issued manually (no admin login flow for v1; you generate one and store it in 1Password).

### 4.5 Background Job

Use [GoodJob](https://github.com/bensheldon/good_job) — it uses PostgreSQL for the queue, so no Redis dependency.

```ruby
# app/jobs/assessment_email_job.rb
class AssessmentEmailJob < ApplicationJob
  queue_as :default
  retry_on Resend::Error, wait: :polynomially_longer, attempts: 5

  def perform(assessment_id)
    assessment = Assessment.find(assessment_id)
    AssessmentEmailSender.new(assessment).call
  end
end
```

In the controller, after creating the assessment, enqueue the job:
```ruby
AssessmentEmailJob.perform_later(assessment.id)
```

### 4.6 Environment Variables

```bash
DATABASE_URL=postgres://...
RESEND_API_KEY=re_...
ADMIN_JWT_SECRET=<random 64-char string>
RAILS_MASTER_KEY=<from credentials>
ALLOWED_ORIGINS=https://lumelogics.com,http://localhost:3000
RAILS_ENV=production
```

### 4.7 Tests

At minimum:

- `AssessmentScorer` — unit tests for each archetype boundary (test the exact edge: a 35 is wishful, a 36 is aspirational, etc.)
- `Assessments::CreateController` — request specs covering:
  - happy path returns 201 with correct response shape
  - invalid email returns 422
  - missing answers returns 422
  - duplicate within 1 hour returns existing record
- `Assessments::ShowController` — happy path + 404
- `AssessmentEmailJob` — calls the sender with the right assessment (stub Resend)

Aim for ~85% line coverage on services and controllers. Skip integration tests for v1.

### 4.8 Deployment Notes

- Choose Railway or Render. Both have one-click Rails + PostgreSQL.
- Set up health check at `GET /up` (Rails 7.2+ has this built in).
- Run migrations on deploy: `bundle exec rails db:migrate`
- Use Rails credentials for secrets except those that change per environment (DATABASE_URL, RESEND_API_KEY) which go in env vars.

---

## 5. Frontend (Existing Next.js / Vercel app)

**Important: do not change the existing app's structure, theme provider, layout, or any existing components. Add new routes and components only.**

### 5.1 New Routes to Add

```
/free-assessment              → intro screen + assessment flow + email gate + results
/free-assessment/results/:token → permanent results page (fetches from API)
```

If the existing app is Next.js App Router, add:
- `app/free-assessment/page.tsx`
- `app/free-assessment/results/[token]/page.tsx`
- `app/free-assessment/_components/...` for the assessment-specific components

If Pages Router:
- `pages/free-assessment/index.tsx`
- `pages/free-assessment/results/[token].tsx`

### 5.2 API Client

Add a thin API client for the assessment endpoints. Read the API base URL from `NEXT_PUBLIC_ASSESSMENT_API_URL`.

```typescript
// lib/api/assessment.ts
const API_URL = process.env.NEXT_PUBLIC_ASSESSMENT_API_URL!;

export type Answers = Record<string, number>;

export interface AssessmentResult {
  result_token: string;
  total_score: number;
  archetype: string;
  archetype_display: string;
  verdict: string;
  dimension_scores: Record<string, { raw: number; scaled: number; max: number }>;
  cta: { label: string; url: string };
  results_url: string;
}

export async function submitAssessment(payload: {
  email: string;
  answers: Answers;
  referral_source?: string;
}): Promise<AssessmentResult> {
  const res = await fetch(`${API_URL}/api/v1/assessments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Submission failed: ${res.status}`);
  return res.json();
}

export async function fetchResult(token: string): Promise<AssessmentResult> {
  const res = await fetch(`${API_URL}/api/v1/assessments/${token}`);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.json();
}
```

### 5.3 Questions Constant (Frontend)

Mirror the 18 questions in a typed constant. Source of truth is still the backend, but the frontend needs the question text and options for rendering.

```typescript
// lib/assessment/questions.ts
export type QuestionType = "single_select" | "yes_no" | "slider_1_5";

export interface Option {
  label: string;
  value: number;
}

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: Option[];
}

export const QUESTIONS: Question[] = [
  // q1 through q18 — copy the content verbatim from section 3.2 above
];
```

### 5.4 UX Spec

#### Intro screen

- Headline: "How ready is your business for AI? Find out in 4 minutes."
- Sub: "18 questions across 4 dimensions. Honest answers get honest results — no spam, no upsell on bad-fit scores."
- 3 trust badges or value props (e.g. "Personal score", "Specific recommendations", "Built by an operator, not a marketer")
- Single primary button: "Start the assessment"

#### Question screens

- One question per screen on all viewports.
- Top: progress bar ("Question 3 of 18" + visual bar).
- Middle: question text (large, readable).
- Options: large tap targets, full-width on mobile.
- Bottom: NO "back" button. NO "skip" button. Forward only.
- Auto-advance on click for `yes_no` and `single_select`. Slider needs an explicit "Next" button.
- Subtle dimension hint somewhere unobtrusive ("Process · Workflow · Visibility · Readiness" with the current one highlighted) so they sense it's structured, but don't see scores.

#### Email gate

- After Q18, show a single screen: "You're done. Where should we send your results?"
- Email input + button "See my score"
- Small disclaimer: "We'll email you a permanent link to your results. No spam. You can unsubscribe anytime."

#### Results screen (on submission AND on `/results/:token`)

- Hero: total score (big number, e.g. "67 / 100") and archetype name.
- One-line verdict from the API.
- Four horizontal bars showing each dimension's score (with the dimension name and X/25 label).
- The "what this means" copy keyed off the archetype.
- The CTA from the API (label + URL).
- Below the fold: a "share your score" social share button (Twitter, LinkedIn) — pre-filled text "I scored 67/100 on the LumeLogics AI Readiness Assessment. How ready is your business? [URL]"
- Footer: link back to lumelogics.com and the other lead magnets.

### 5.5 Styling

Match the existing app's design system. Cream background (`#FAF7F2`), purple primary (`#6B46C1`), deep purple accent (`#5B21B6`).

If the existing app uses Tailwind, extend the theme with these. If it uses CSS modules or styled-components, follow the existing patterns. **Do not add a new styling library.**

For typography:
- Body: whatever the existing app uses.
- Display/headings: try to match the existing app's display font. If the app already loads "Qurova" (it likely does, since the logo uses it), use it for the score number on the results screen.

### 5.6 Environment Variables

Add to `.env.local` and the Vercel production env:
```
NEXT_PUBLIC_ASSESSMENT_API_URL=https://api.lumelogics.com
```

(Use `http://localhost:3001` or wherever the Rails API runs locally for development.)

### 5.7 SEO

Add meta tags for the `/free-assessment` page:

```
<title>AI Readiness Assessment for SMBs | LumeLogics</title>
<meta name="description" content="A free 18-question assessment that tells you whether your business is ready for AI automation — or how far away you are.">
<meta property="og:title" content="How ready is your business for AI?">
<meta property="og:description" content="A free 4-minute assessment built for SMB owners. Get a personalized readiness score and a clear path forward.">
<meta property="og:image" content="<URL to a branded OG image, 1200x630>">
```

`/results/:token` pages should be `noindex` (these are personal).

---

## 6. Build Sequence

Build in this order:

1. **Backend foundations.** New Rails API app, PostgreSQL, migrations, basic models. Get `Assessment.create!` working in the Rails console.
2. **Scoring engine.** `AssessmentScorer` service + unit tests. Verify against the score boundaries.
3. **POST `/api/v1/assessments`.** Controller + request specs. No email yet — just persist and return.
4. **GET `/api/v1/assessments/:token`.** Read endpoint. Confirm frontend can hit both endpoints with curl.
5. **Email sender + GoodJob.** Wire up Resend, queue the email job after creation, send a real email to yourself to verify the layout.
6. **Admin endpoint.** JWT auth + paginated list.
7. **Deploy backend to Railway or Render.** Use the staging environment first. Test end-to-end with a curl POST → check inbox.
8. **Frontend intro page + questions constant.** Static rendering of all 18 questions on a debug page, just to verify the data.
9. **Frontend flow.** Question-by-question UI with progress, transitions, no API calls yet.
10. **Email gate + API submission.** Wire to the backend, see the score on-screen.
11. **Results page at `/results/:token`.** Fetch by token, render the same components.
12. **Polish.** Animations on transitions, accessibility (keyboard navigation, ARIA labels), mobile layout pass.
13. **Production deploy.** Frontend ships with the existing app's next Vercel deploy. Backend has its own deploy pipeline.

---

## 7. What's Explicitly Out of Scope for v1

- A/B testing different archetypes or copy
- Behavior analytics (heatmaps, drop-off per question)
- Branded PDF report generation (results live on-screen and at the permanent URL; no PDF attachment for v1)
- Multi-language support
- Authenticated user accounts (results are token-protected, that's enough)
- Social proof on the intro screen (testimonials, "X people have taken this")
- Re-take prevention (let users re-take)

These can ship in v2 once we know the magnet converts.

---

## 8. Definition of Done

- [ ] Rails API deployed and accessible from a public URL
- [ ] PostgreSQL provisioned with the `assessments` table
- [ ] `POST /api/v1/assessments` returns 201 with a valid `result_token` for a real payload
- [ ] Submitting an assessment triggers a real email to the entered address within 60 seconds
- [ ] `/free-assessment` route on lumelogics.com renders the intro screen with no styling regression on other routes
- [ ] A user can take the assessment end-to-end on desktop and mobile
- [ ] `/free-assessment/results/:token` loads a real submission's results
- [ ] Admin endpoint returns a list of submissions with a valid JWT
- [ ] All scorer unit tests pass
- [ ] Controller request specs pass
- [ ] No breaking changes to any existing frontend route

---

## 9. Open Questions to Confirm Before Starting

- **Backend host:** Railway or Render? (Railway is simpler, Render has a more generous free tier.)
- **Frontend framework:** confirm the existing app's framework (Next.js App Router vs Pages, or something else entirely)
- **Resend domain verification:** is `lumelogics.com` already verified in Resend? If not, that's a 15-minute DNS step before any emails will actually deliver.
- **CTA URLs:** the per-archetype CTAs reference `lumelogics.com/audit` and similar. Confirm these routes exist or stub them.
- **Admin JWT:** how should the JWT be issued for v1? (Suggested: write a one-off rake task that prints a token to stdout, store it in 1Password.)
