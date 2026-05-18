// Bundled Scaleforte audit used as the offline/preview fixture for
// /audit/* during local dev (NEXT_PUBLIC_ASSESSMENT_API_URL unset).
// Generated verbatim from the seeded Rails record so the preview is
// identical to production. Do not hand-edit; edit
// db/seeds/audits/scaleforte.rb in lumelogics-server and regenerate.
import type { PublicAudit } from "../audits";

export const SCALEFORTE_PREVIEW: PublicAudit = {
  "slug": "scaleforte",
  "client_name": "Scaleforte",
  "industry": "Amazon Agency (PPC & Catalogue Optimization)",
  "status": "delivered",
  "started_on": "2026-04-07",
  "completed_on": "2026-05-12",
  "content": {
    "hero": {
      "eyebrow": "Business Operations Audit",
      "client_name": "Scaleforte",
      "status_pill": {
        "tone": "success",
        "label": "Delivered"
      },
      "audit_started_label": "Audit started April 2026"
    },
    "waste": {
      "intro": "Each item below is time the team named in the sessions, valued at the relevant role rate. These are conservative and based on what staff told us, not estimates we invented.",
      "kpi_summary": {
        "default_rate_label": "$45/hr applied when a role rate is unavailable",
        "total_opportunities": 10,
        "recoverable_hours_per_week": 65.0
      },
      "cost_formula": "Annual Cost = Weekly Hours x People Affected x Hourly Rate x 52",
      "opportunities": [
        {
          "quote": {
            "text": "The better part of two days a week, every week.",
            "speaker": "Priya Nair",
            "session_ref": "SES-02",
            "recording_url": null,
            "recording_timestamp": "00:09:30"
          },
          "title": "Manual bid and budget adjustments",
          "ref_id": "W-001",
          "category": "CAT-3",
          "priority": "high",
          "annual_cost": 62400,
          "description": "Two analysts adjusting bids and budgets account by account every week.",
          "hourly_rate": 50,
          "weekly_hours": 12.0,
          "pain_point_ref": "PP-001",
          "people_affected": 2
        },
        {
          "quote": {
            "text": "Reporting day is gone by lunch, per person.",
            "speaker": "Priya Nair",
            "session_ref": "SES-02",
            "recording_url": null,
            "recording_timestamp": "00:34:40"
          },
          "title": "Building weekly client reports by hand",
          "ref_id": "W-002",
          "category": "CAT-5",
          "priority": "high",
          "annual_cost": 37440,
          "description": "Each analyst rebuilds a report per client into a slide template weekly.",
          "hourly_rate": 45,
          "weekly_hours": 8.0,
          "pain_point_ref": "PP-002",
          "people_affected": 2
        },
        {
          "quote": {
            "text": "Pure pattern work, still a full morning.",
            "speaker": "Sam Ortiz",
            "session_ref": "SES-02",
            "recording_url": null,
            "recording_timestamp": "00:23:05"
          },
          "title": "Search term harvesting and negatives",
          "ref_id": "W-003",
          "category": "CAT-3",
          "priority": "medium",
          "annual_cost": 14040,
          "description": "Manually mining keywords and negatives from search term reports.",
          "hourly_rate": 45,
          "weekly_hours": 6.0,
          "pain_point_ref": "PP-003",
          "people_affected": 1
        },
        {
          "quote": {
            "text": "The single biggest time sink on my side.",
            "speaker": "Marcus Webb",
            "session_ref": "SES-03",
            "recording_url": null,
            "recording_timestamp": "00:18:10"
          },
          "title": "Listing copy and A plus content from scratch",
          "ref_id": "W-004",
          "category": "CAT-4",
          "priority": "high",
          "annual_cost": 18720,
          "description": "Drafting titles, bullets and A plus content from a blank doc per product.",
          "hourly_rate": 40,
          "weekly_hours": 9.0,
          "pain_point_ref": "PP-004",
          "people_affected": 1
        },
        {
          "quote": {
            "text": "Same five steps every catalogue.",
            "speaker": "Marcus Webb",
            "session_ref": "SES-03",
            "recording_url": null,
            "recording_timestamp": "00:05:35"
          },
          "title": "Keyword and competitor research per catalogue",
          "ref_id": "W-005",
          "category": "CAT-4",
          "priority": "medium",
          "annual_cost": 10400,
          "description": "Repeating the same research routine for every catalogue by hand.",
          "hourly_rate": 40,
          "weekly_hours": 5.0,
          "pain_point_ref": "PP-005",
          "people_affected": 1
        },
        {
          "quote": {
            "text": "Always waiting on access, re asking for the same things.",
            "speaker": "Ava Thompson",
            "session_ref": "SES-01",
            "recording_url": null,
            "recording_timestamp": "00:42:00"
          },
          "title": "Onboarding data collection and access chase",
          "ref_id": "W-006",
          "category": "CAT-2",
          "priority": "medium",
          "annual_cost": 8736,
          "description": "Chasing advertising and Seller Central access and brand assets manually.",
          "hourly_rate": 42,
          "weekly_hours": 4.0,
          "pain_point_ref": "PP-006",
          "people_affected": 1
        },
        {
          "quote": {
            "text": "Fiddly and easy to get wrong.",
            "speaker": "Ava Thompson",
            "session_ref": "SES-03",
            "recording_url": null,
            "recording_timestamp": "00:48:30"
          },
          "title": "Reconciling ad spend for invoicing",
          "ref_id": "W-007",
          "category": "CAT-5",
          "priority": "medium",
          "annual_cost": 6916,
          "description": "Month end reconciliation of spend across accounts before invoicing.",
          "hourly_rate": 38,
          "weekly_hours": 3.5,
          "pain_point_ref": "PP-008",
          "people_affected": 1
        },
        {
          "quote": {
            "text": "It is constant and it is everywhere.",
            "speaker": "Ava Thompson",
            "session_ref": "SES-03",
            "recording_url": null,
            "recording_timestamp": "00:51:15"
          },
          "title": "Client status updates and inbox triage",
          "ref_id": "W-008",
          "category": "CAT-5",
          "priority": "medium",
          "annual_cost": 15288,
          "description": "Keeping clients updated across email and Slack and chasing answers.",
          "hourly_rate": 42,
          "weekly_hours": 7.0,
          "pain_point_ref": "PP-007",
          "people_affected": 1
        },
        {
          "quote": null,
          "title": "Catalogue health and suppression monitoring",
          "ref_id": "W-009",
          "category": "CAT-4",
          "priority": "medium",
          "annual_cost": 9360,
          "description": "Manually scanning for suppressed listings and buy box loss.",
          "hourly_rate": 40,
          "weekly_hours": 4.5,
          "pain_point_ref": "PP-009",
          "people_affected": 1
        },
        {
          "quote": {
            "text": "Hours before we even know if they are a fit.",
            "speaker": "Daniel Cho",
            "session_ref": "SES-01",
            "recording_url": null,
            "recording_timestamp": "00:13:05"
          },
          "title": "Manual prospect audits and proposal building",
          "ref_id": "W-010",
          "category": "CAT-1",
          "priority": "high",
          "annual_cost": 15600,
          "description": "Pulling prospect data and building an audit deck for every pitch.",
          "hourly_rate": 50,
          "weekly_hours": 6.0,
          "pain_point_ref": "PP-010",
          "people_affected": 1
        }
      ]
    },
    "footer": {
      "note": "Lumelogics. Scaleforte business operations audit. Delivered May 2026."
    },
    "report": {
      "title": "Business Operations Audit",
      "sections": [
        {
          "title": "Executive summary",
          "anchor": "executive-summary",
          "include": true
        },
        {
          "title": "Process map",
          "anchor": "process-map",
          "include": true
        },
        {
          "title": "Findings",
          "anchor": "findings",
          "include": true
        },
        {
          "title": "Opportunity analysis",
          "anchor": "waste",
          "include": true
        },
        {
          "title": "Solutions",
          "anchor": "solutions",
          "include": true
        }
      ],
      "subtitle": "Scaleforte",
      "prepared_on": "2026-05-12",
      "closing_note": "Next step is a working session to walk this through together and lock the first sprint.",
      "prepared_for": "Daniel Cho, Scaleforte",
      "executive_summary": "Across three sessions we mapped how Scaleforte delivers PPC and catalogue work today. The operation is strong but a large share of senior time goes to manual assembly: bid changes, reporting, research and listing drafting. We quantified ten sources of recoverable time worth $198,900 a year and roughly 65 hours a week. The blueprint recovers an estimated $184,000 a year, sequenced so the fastest payback ships first."
    },
    "journey": {
      "stages": [
        {
          "id": "STAGE-1",
          "sub": "Mapped your current delivery end to end",
          "label": "How you work",
          "state": "done"
        },
        {
          "id": "STAGE-2",
          "sub": "Pain points and optimisations from the sessions",
          "label": "What we found",
          "state": "done"
        },
        {
          "id": "STAGE-3",
          "sub": "The time and money quantified",
          "label": "Hidden costs",
          "state": "done"
        },
        {
          "id": "STAGE-4",
          "sub": "What to build, in what order",
          "label": "AI blueprint",
          "state": "done"
        }
      ]
    },
    "findings": {
      "intro": "These are the points raised across the three sessions, grouped by area. Pain points are what the team named as slow or costly. Optimisations are ideas we discussed together. This is not the proposed solution, that is the blueprint.",
      "pain_points": [
        {
          "title": "Bid and budget changes are fully manual across every account",
          "ref_id": "PP-001",
          "category": "CAT-3",
          "severity": "HIGH",
          "description": "Two analysts spend roughly two days a week adjusting bids and budgets account by account with no automation.",
          "source_session": "SES-02"
        },
        {
          "title": "Weekly client reports are rebuilt by hand per client",
          "ref_id": "PP-002",
          "category": "CAT-5",
          "severity": "HIGH",
          "description": "Reporting consumes a half day per analyst every week copying numbers into a template.",
          "source_session": "SES-02"
        },
        {
          "title": "Search term harvesting is manual pattern work",
          "ref_id": "PP-003",
          "category": "CAT-3",
          "severity": "MEDIUM",
          "description": "Mining keywords and negatives from search term reports is repetitive and rules based but still done by hand.",
          "source_session": "SES-02"
        },
        {
          "title": "Listing copy is written from scratch every time",
          "ref_id": "PP-004",
          "category": "CAT-4",
          "severity": "HIGH",
          "description": "Titles, bullets and A plus content start from a blank document for each product with no reusable scaffold.",
          "source_session": "SES-03"
        },
        {
          "title": "Catalogue research repeats the same steps per client",
          "ref_id": "PP-005",
          "category": "CAT-4",
          "severity": "MEDIUM",
          "description": "The keyword and competitor research routine is identical across catalogues but redone manually each time.",
          "source_session": "SES-03"
        },
        {
          "title": "Onboarding stalls waiting on access and assets",
          "ref_id": "PP-006",
          "category": "CAT-2",
          "severity": "MEDIUM",
          "description": "Access and brand assets are chased over email and Slack with no structured intake.",
          "source_session": "SES-01"
        },
        {
          "title": "Client status updates are ad hoc and time consuming",
          "ref_id": "PP-007",
          "category": "CAT-5",
          "severity": "MEDIUM",
          "description": "Keeping clients informed is spread across inboxes and threads with no single view.",
          "source_session": "SES-03"
        },
        {
          "title": "Spend reconciliation before invoicing is error prone",
          "ref_id": "PP-008",
          "category": "CAT-5",
          "severity": "MEDIUM",
          "description": "Month end ad spend is reconciled by hand across accounts before invoices can go out.",
          "source_session": "SES-03"
        },
        {
          "title": "Catalogue health is monitored manually",
          "ref_id": "PP-009",
          "category": "CAT-4",
          "severity": "MEDIUM",
          "description": "Suppressed listings and buy box loss are caught only when someone looks.",
          "source_session": "SES-03"
        },
        {
          "title": "Every proposal is a from scratch audit",
          "ref_id": "PP-010",
          "category": "CAT-1",
          "severity": "HIGH",
          "description": "Pitching a prospect means hours of manual data pulling and deck building before fit is even known.",
          "source_session": "SES-01"
        }
      ],
      "optimisations": [
        {
          "title": "Rules driven bid and budget assistant",
          "ref_id": "OPT-001",
          "category": "CAT-3",
          "severity": "HIGH",
          "description": "A copilot that proposes bid and budget moves from live data for the analyst to approve.",
          "source_session": "SES-02"
        },
        {
          "title": "One click client reporting",
          "ref_id": "OPT-002",
          "category": "CAT-5",
          "severity": "HIGH",
          "description": "Generate the weekly client report from the account data automatically.",
          "source_session": "SES-02"
        },
        {
          "title": "Automated search term harvesting",
          "ref_id": "OPT-003",
          "category": "CAT-3",
          "severity": "MEDIUM",
          "description": "Scheduled mining of keywords and negatives with a review queue.",
          "source_session": "SES-02"
        },
        {
          "title": "Listing content generation scaffold",
          "ref_id": "OPT-004",
          "category": "CAT-4",
          "severity": "HIGH",
          "description": "Draft titles, bullets and A plus content from the research brief.",
          "source_session": "SES-03"
        },
        {
          "title": "Reusable research workflow",
          "ref_id": "OPT-005",
          "category": "CAT-4",
          "severity": "MEDIUM",
          "description": "A repeatable research assistant that outputs a standard brief.",
          "source_session": "SES-03"
        },
        {
          "title": "Structured onboarding intake",
          "ref_id": "OPT-006",
          "category": "CAT-2",
          "severity": "MEDIUM",
          "description": "A guided intake that collects access and assets and tracks what is outstanding.",
          "source_session": "SES-01"
        },
        {
          "title": "Unified client workspace",
          "ref_id": "OPT-007",
          "category": "CAT-5",
          "severity": "MEDIUM",
          "description": "One place for status, deliverables and updates per client.",
          "source_session": "SES-03"
        },
        {
          "title": "Catalogue health monitor",
          "ref_id": "OPT-008",
          "category": "CAT-4",
          "severity": "MEDIUM",
          "description": "Automatic alerts on suppressions and buy box loss.",
          "source_session": "SES-03"
        }
      ]
    },
    "sessions": [
      {
        "id": "SES-01",
        "date": "2026-04-09",
        "badge": "Session 1",
        "title": "Acquisition and onboarding walkthrough",
        "summary": "Daniel and Ava walked through how leads come in, how proposals get built, and what it takes to stand up a new Amazon client.",
        "complete": true,
        "stage_tags": [
          "Acquisition",
          "Onboarding"
        ]
      },
      {
        "id": "SES-02",
        "date": "2026-04-16",
        "badge": "Session 2",
        "title": "PPC delivery deep dive",
        "summary": "Priya and Sam showed the weekly bid, budget and search-term routine across the client portfolio and where the hours go.",
        "complete": true,
        "stage_tags": [
          "PPC Management",
          "Reporting"
        ]
      },
      {
        "id": "SES-03",
        "date": "2026-04-23",
        "badge": "Session 3",
        "title": "Catalogue, reporting and billing",
        "summary": "Marcus and Ava covered listing optimisation, catalogue health, client reporting and the month end spend reconciliation.",
        "complete": true,
        "stage_tags": [
          "Catalogue Optimization",
          "Reporting & Billing"
        ]
      }
    ],
    "ai_moment": {
      "sub": "This audit is your blueprint for capturing that on your own delivery, not just selling it to clients.",
      "label": "The AI moment",
      "diagram": {
        "silos": [
          {
            "label": "Amazon Ads"
          },
          {
            "label": "Seller Central"
          },
          {
            "label": "Spreadsheets"
          },
          {
            "label": "Slack threads"
          },
          {
            "label": "Notion docs"
          }
        ],
        "caption": "Today the account picture is split across five places. Connected, it becomes one source the whole team and AI can act on.",
        "connected": [
          {
            "label": "One connected workspace"
          }
        ]
      },
      "heading": "Most agency work done on a screen will be 40 to 80 percent faster within two years.",
      "explainer": [
        {
          "body": "Your analysts keep judgement and client relationships. AI removes the manual assembly around them so each person covers more accounts well.",
          "icon": "amplify",
          "title": "Amplification, not replacement"
        },
        {
          "body": "A secure bridge from your tools (Amazon Ads, Seller Central, Sheets) to a model that reads the live data and drafts the work in your team's workflow.",
          "icon": "plug",
          "title": "What a connector actually is"
        },
        {
          "body": "Every recommendation in this report depends on your account data being reachable in one place. That is the foundation the rest sits on.",
          "icon": "data",
          "title": "Data is the unlock"
        }
      ],
      "analogy_callout": {
        "body": "AI is the spreadsheet skill of this decade. The agencies that fold it into delivery now will run leaner and outbid the ones that do not. The same shift is happening to PPC and catalogue work right now, and it is accelerating.",
        "title": "The Excel analogy"
      }
    },
    "blueprint": {
      "intro": "What we would build, in the order that returns value fastest. Every item ties back to a pain point and the waste it removes.",
      "domains": [
        {
          "id": "DOM-1",
          "label": "Acquisition"
        },
        {
          "id": "DOM-2",
          "label": "Onboarding"
        },
        {
          "id": "DOM-3",
          "label": "PPC Management"
        },
        {
          "id": "DOM-4",
          "label": "Catalogue Optimization"
        },
        {
          "id": "DOM-5",
          "label": "Reporting & Billing"
        }
      ],
      "roadmap": {
        "intro": "Sequenced so the fastest payback ships first. Quick wins fund the bigger builds.",
        "initiatives": [
          {
            "label": "Catalogue health monitor",
            "ref_id": "S-008",
            "tooltip": "Build $4k to $8k. Payback 5 mo. Value $8,000/yr.",
            "start_month": 0,
            "solution_type": "ST-2",
            "duration_weeks": 2
          },
          {
            "label": "Automated client reporting",
            "ref_id": "S-002",
            "tooltip": "Build $9k to $15k. Payback 3.5 mo. Value $34,000/yr.",
            "start_month": 0,
            "solution_type": "ST-2",
            "duration_weeks": 4
          },
          {
            "label": "Search term harvesting automation",
            "ref_id": "S-006",
            "tooltip": "Build $5k to $9k. Payback 4.5 mo. Value $12,000/yr.",
            "start_month": 1,
            "solution_type": "ST-2",
            "duration_weeks": 3
          },
          {
            "label": "Research assistant",
            "ref_id": "S-004",
            "tooltip": "Build $6k to $10k. Payback 4 mo. Value $14,000/yr.",
            "start_month": 2,
            "solution_type": "ST-1",
            "duration_weeks": 3
          },
          {
            "label": "Listing content plugin",
            "ref_id": "S-003",
            "tooltip": "Build $8k to $14k. Payback 4 mo. Value $22,000/yr.",
            "start_month": 3,
            "solution_type": "ST-1",
            "duration_weeks": 4
          },
          {
            "label": "Prospect audit builder",
            "ref_id": "S-009",
            "tooltip": "Build $7k to $12k. Payback 5 mo. Value $14,000/yr.",
            "start_month": 3,
            "solution_type": "ST-1",
            "duration_weeks": 4
          },
          {
            "label": "Onboarding intake automation",
            "ref_id": "S-005",
            "tooltip": "Build $5k to $9k. Payback 6 mo. Value $9,000/yr.",
            "start_month": 4,
            "solution_type": "ST-2",
            "duration_weeks": 3
          },
          {
            "label": "AI bid and budget copilot",
            "ref_id": "S-001",
            "tooltip": "Build $18k to $28k. Payback 5 mo. Value $55,000/yr.",
            "start_month": 5,
            "solution_type": "ST-3",
            "duration_weeks": 6
          },
          {
            "label": "Unified client workspace",
            "ref_id": "S-007",
            "tooltip": "Build $12k to $22k. Payback 9 mo. Value $16,000/yr.",
            "start_month": 7,
            "solution_type": "ST-3",
            "duration_weeks": 8
          }
        ],
        "total_months": 9
      },
      "exec_kpis": [
        {
          "sub": "Total quantified waste across the operation",
          "label": "Identified annual opportunity value",
          "value": "$198,900"
        },
        {
          "sub": "Distinct sources of recoverable time",
          "label": "Opportunities identified",
          "value": "10"
        },
        {
          "sub": "Across the team, at current volume",
          "label": "Recoverable time",
          "value": "65 hrs/wk"
        },
        {
          "sub": "Recovered once the blueprint is built",
          "label": "Annual value unlocked",
          "value": "$184,000"
        }
      ],
      "opportunities": [
        {
          "quote": {
            "text": "If the bids drafted themselves we would take on more accounts tomorrow.",
            "speaker": "Priya Nair",
            "session_ref": "SES-02",
            "recording_url": null,
            "recording_timestamp": "00:10:05"
          },
          "title": "AI bid and budget copilot",
          "layers": [
            "LAYER-2",
            "LAYER-3"
          ],
          "ref_id": "S-001",
          "domains": [
            "DOM-3"
          ],
          "summary": "A copilot that reads live campaign data and proposes bid and budget moves for an analyst to approve in seconds instead of hours.",
          "pm_hours": 24,
          "dev_hours": 90,
          "confidence": "MEDIUM",
          "risk_level": "medium",
          "methodology": "Derived from the bid and harvest waste recovered at 80 percent.",
          "annual_value": 55000,
          "solution_type": "ST-3",
          "build_cost_max": 28000,
          "build_cost_min": 18000,
          "payback_months": 5.0,
          "timeline_weeks": 6,
          "problems_solved": [
            "PP-001",
            "PP-003"
          ],
          "risk_description": "Needs careful guardrails on automated bid changes. We stage it as approve first, then auto.",
          "waste_eliminated": [
            "W-001",
            "W-003"
          ]
        },
        {
          "quote": {
            "text": "Give me Friday back.",
            "speaker": "Sam Ortiz",
            "session_ref": "SES-02",
            "recording_url": null,
            "recording_timestamp": "00:36:00"
          },
          "title": "Automated client reporting",
          "layers": [
            "LAYER-1",
            "LAYER-2"
          ],
          "ref_id": "S-002",
          "domains": [
            "DOM-5"
          ],
          "summary": "Generate the weekly client report straight from account data, branded and ready to send.",
          "pm_hours": 14,
          "dev_hours": 50,
          "confidence": "HIGH",
          "risk_level": "low",
          "methodology": "Reporting and reconciliation waste recovered near fully.",
          "annual_value": 34000,
          "solution_type": "ST-2",
          "build_cost_max": 15000,
          "build_cost_min": 9000,
          "payback_months": 3.5,
          "timeline_weeks": 4,
          "problems_solved": [
            "PP-002"
          ],
          "risk_description": "Low. Read only on the data, output reviewed before send.",
          "waste_eliminated": [
            "W-002",
            "W-007"
          ]
        },
        {
          "quote": {
            "text": "A scaffold instead of a blank page would change my week.",
            "speaker": "Marcus Webb",
            "session_ref": "SES-03",
            "recording_url": null,
            "recording_timestamp": "00:19:20"
          },
          "title": "Listing content generation plugin",
          "layers": [
            "LAYER-2",
            "LAYER-3"
          ],
          "ref_id": "S-003",
          "domains": [
            "DOM-4"
          ],
          "summary": "Draft titles, bullets and A plus content from the research brief in the team's flow, ready to refine.",
          "pm_hours": 12,
          "dev_hours": 46,
          "confidence": "MEDIUM",
          "risk_level": "low",
          "methodology": "Listing drafting waste recovered at around 85 percent.",
          "annual_value": 22000,
          "solution_type": "ST-1",
          "build_cost_max": 14000,
          "build_cost_min": 8000,
          "payback_months": 4.0,
          "timeline_weeks": 4,
          "problems_solved": [
            "PP-004"
          ],
          "risk_description": "Low. Drafts only, the catalogue lead edits and approves.",
          "waste_eliminated": [
            "W-004"
          ]
        },
        {
          "quote": null,
          "title": "Keyword and competitor research assistant",
          "layers": [
            "LAYER-2",
            "LAYER-3"
          ],
          "ref_id": "S-004",
          "domains": [
            "DOM-4"
          ],
          "summary": "A repeatable assistant that runs the research routine and outputs a standard brief per catalogue.",
          "pm_hours": 8,
          "dev_hours": 34,
          "confidence": "MEDIUM",
          "risk_level": "low",
          "methodology": "Research waste recovered at around 75 percent.",
          "annual_value": 14000,
          "solution_type": "ST-1",
          "build_cost_max": 10000,
          "build_cost_min": 6000,
          "payback_months": 4.0,
          "timeline_weeks": 3,
          "problems_solved": [
            "PP-005"
          ],
          "risk_description": "Low. Outputs a brief for review.",
          "waste_eliminated": [
            "W-005"
          ]
        },
        {
          "quote": null,
          "title": "Onboarding intake and access automation",
          "layers": [
            "LAYER-1",
            "LAYER-2"
          ],
          "ref_id": "S-005",
          "domains": [
            "DOM-2"
          ],
          "summary": "A guided intake that collects access and assets and tracks what is outstanding automatically.",
          "pm_hours": 8,
          "dev_hours": 30,
          "confidence": "HIGH",
          "risk_level": "low",
          "methodology": "Onboarding chase waste recovered at around 70 percent.",
          "annual_value": 9000,
          "solution_type": "ST-2",
          "build_cost_max": 9000,
          "build_cost_min": 5000,
          "payback_months": 6.0,
          "timeline_weeks": 3,
          "problems_solved": [
            "PP-006"
          ],
          "risk_description": "Low. Process automation, no account changes.",
          "waste_eliminated": [
            "W-006"
          ]
        },
        {
          "quote": null,
          "title": "Search term harvesting automation",
          "layers": [
            "LAYER-1",
            "LAYER-2"
          ],
          "ref_id": "S-006",
          "domains": [
            "DOM-3"
          ],
          "summary": "Scheduled mining of keywords and negatives with a short review queue.",
          "pm_hours": 7,
          "dev_hours": 28,
          "confidence": "MEDIUM",
          "risk_level": "low",
          "methodology": "Harvest waste recovered at around 85 percent.",
          "annual_value": 12000,
          "solution_type": "ST-2",
          "build_cost_max": 9000,
          "build_cost_min": 5000,
          "payback_months": 4.5,
          "timeline_weeks": 3,
          "problems_solved": [
            "PP-003"
          ],
          "risk_description": "Low. Suggestions reviewed before applied.",
          "waste_eliminated": [
            "W-003"
          ]
        },
        {
          "quote": null,
          "title": "Unified client workspace and status hub",
          "layers": [
            "LAYER-1",
            "LAYER-2",
            "LAYER-3"
          ],
          "ref_id": "S-007",
          "domains": [
            "DOM-5"
          ],
          "summary": "One place per client for status, deliverables and updates, replacing the scattered threads.",
          "pm_hours": 22,
          "dev_hours": 80,
          "confidence": "MEDIUM",
          "risk_level": "medium",
          "methodology": "Status and triage waste recovered at around 60 percent.",
          "annual_value": 16000,
          "solution_type": "ST-3",
          "build_cost_max": 22000,
          "build_cost_min": 12000,
          "payback_months": 9.0,
          "timeline_weeks": 8,
          "problems_solved": [
            "PP-007",
            "PP-008"
          ],
          "risk_description": "Medium. Adoption is the risk, we plan a phased rollout.",
          "waste_eliminated": [
            "W-008"
          ]
        },
        {
          "quote": null,
          "title": "Catalogue health monitor",
          "layers": [
            "LAYER-1",
            "LAYER-2"
          ],
          "ref_id": "S-008",
          "domains": [
            "DOM-4"
          ],
          "summary": "Automatic alerts on suppressed listings and buy box loss across clients.",
          "pm_hours": 6,
          "dev_hours": 24,
          "confidence": "HIGH",
          "risk_level": "low",
          "methodology": "Monitoring waste recovered at around 85 percent.",
          "annual_value": 8000,
          "solution_type": "ST-2",
          "build_cost_max": 8000,
          "build_cost_min": 4000,
          "payback_months": 5.0,
          "timeline_weeks": 2,
          "problems_solved": [
            "PP-009"
          ],
          "risk_description": "Low. Monitoring and alerting only.",
          "waste_eliminated": [
            "W-009"
          ]
        },
        {
          "quote": {
            "text": "A proposal in an afternoon instead of a week.",
            "speaker": "Daniel Cho",
            "session_ref": "SES-01",
            "recording_url": null,
            "recording_timestamp": "00:14:10"
          },
          "title": "Prospect audit and proposal builder",
          "layers": [
            "LAYER-2",
            "LAYER-3"
          ],
          "ref_id": "S-009",
          "domains": [
            "DOM-1"
          ],
          "summary": "Pull prospect data and assemble the audit and proposal draft in minutes instead of hours.",
          "pm_hours": 10,
          "dev_hours": 40,
          "confidence": "MEDIUM",
          "risk_level": "low",
          "methodology": "Proposal audit waste recovered at around 80 percent.",
          "annual_value": 14000,
          "solution_type": "ST-1",
          "build_cost_max": 12000,
          "build_cost_min": 7000,
          "payback_months": 5.0,
          "timeline_weeks": 4,
          "problems_solved": [
            "PP-010"
          ],
          "risk_description": "Low. Produces a draft the founder reviews.",
          "waste_eliminated": [
            "W-010"
          ]
        }
      ],
      "video_gallery": [],
      "solution_types": [
        {
          "id": "ST-1",
          "label": "Cowork plugin",
          "color_token": "brand",
          "description": "The team talks to AI in plain language. It reads the data and drafts the work in their flow.",
          "typical_timeline": "4 to 8 weeks"
        },
        {
          "id": "ST-2",
          "label": "Background automation",
          "color_token": "success",
          "description": "Runs with no staff interaction, triggered by events on a schedule.",
          "typical_timeline": "2 to 6 weeks"
        },
        {
          "id": "ST-3",
          "label": "Custom build",
          "color_token": "info",
          "description": "A purpose built application owned by you, designed around the exact workflow.",
          "typical_timeline": "6 to 16 weeks"
        },
        {
          "id": "ST-4",
          "label": "Data foundation",
          "color_token": "muted",
          "description": "Connect and clean the data so the rest can run on it.",
          "typical_timeline": "2 to 5 weeks"
        }
      ],
      "priority_matrix": {
        "quadrants": [
          {
            "id": "Q1",
            "label": "Big swings",
            "position": "tl"
          },
          {
            "id": "Q2",
            "label": "Future plans",
            "position": "tr"
          },
          {
            "id": "Q3",
            "label": "Nice to haves",
            "position": "bl"
          },
          {
            "id": "Q4",
            "label": "Quick wins",
            "position": "br"
          }
        ],
        "x_axis_label": "Ease of implementation",
        "y_axis_label": "Business impact"
      },
      "framework_layers": [
        {
          "id": "LAYER-1",
          "label": "Data",
          "description": "Account records, campaign data, search terms, catalogue and spend. If it is siloed nothing above works, including AI."
        },
        {
          "id": "LAYER-2",
          "label": "Systems",
          "description": "Amazon Ads, Seller Central, Sheets and the tools the team uses to see and act on the data."
        },
        {
          "id": "LAYER-3",
          "label": "AI",
          "description": "Reads the connected data, drafts the work and recommends moves, but only if it can reach the data."
        }
      ]
    },
    "downloads": [
      {
        "title": "How you work",
        "description": "Current state process map across five stages.",
        "format_label": "Web document",
        "deliverable_key": "process-map"
      },
      {
        "title": "What we found",
        "description": "Pain points and optimisation opportunities.",
        "format_label": "Web document",
        "deliverable_key": "findings"
      },
      {
        "title": "Hidden costs",
        "description": "Operational waste quantified by area.",
        "format_label": "Web document",
        "deliverable_key": "waste"
      },
      {
        "title": "AI blueprint",
        "description": "Roadmap, costs and priority matrix.",
        "format_label": "Web document",
        "deliverable_key": "blueprint"
      },
      {
        "title": "Full audit report",
        "description": "The complete report, print friendly.",
        "format_label": "Printable",
        "deliverable_key": "comprehensive-report"
      }
    ],
    "prototype": {
      "sub": "A clickable prototype of the connected Scaleforte delivery workspace, built from everything in this blueprint.",
      "url": null,
      "enabled": false,
      "heading": "See your future workspace in action",
      "cta_label": "Open prototype"
    },
    "categories": [
      {
        "id": "CAT-1",
        "label": "Acquisition",
        "description": "Winning new Amazon clients."
      },
      {
        "id": "CAT-2",
        "label": "Onboarding",
        "description": "Standing up a new client."
      },
      {
        "id": "CAT-3",
        "label": "PPC Management",
        "description": "Weekly advertising delivery."
      },
      {
        "id": "CAT-4",
        "label": "Catalogue Optimization",
        "description": "Listing and content work."
      },
      {
        "id": "CAT-5",
        "label": "Reporting & Billing",
        "description": "Reporting, retention, month end."
      }
    ],
    "process_map": {
      "team": [
        {
          "id": "PERSON-1",
          "name": "Daniel Cho",
          "role": "Founder and strategy"
        },
        {
          "id": "PERSON-2",
          "name": "Priya Nair",
          "role": "Head of PPC"
        },
        {
          "id": "PERSON-3",
          "name": "Sam Ortiz",
          "role": "PPC analyst"
        },
        {
          "id": "PERSON-4",
          "name": "Marcus Webb",
          "role": "Catalogue lead"
        },
        {
          "id": "PERSON-5",
          "name": "Ava Thompson",
          "role": "Account manager"
        }
      ],
      "intro": "This is how Scaleforte delivers today, captured across three working sessions. Steps marked as pain points are where the team told us the time goes.",
      "tools": [
        {
          "id": "TOOL-1",
          "name": "Amazon Ads console",
          "category": "Advertising"
        },
        {
          "id": "TOOL-2",
          "name": "Seller Central",
          "category": "Marketplace"
        },
        {
          "id": "TOOL-3",
          "name": "Helium 10",
          "category": "Research"
        },
        {
          "id": "TOOL-4",
          "name": "Google Sheets",
          "category": "Data"
        },
        {
          "id": "TOOL-5",
          "name": "Slack",
          "category": "Comms"
        },
        {
          "id": "TOOL-6",
          "name": "Notion",
          "category": "Docs"
        },
        {
          "id": "TOOL-7",
          "name": "Xero",
          "category": "Finance"
        },
        {
          "id": "TOOL-8",
          "name": "ClickUp",
          "category": "Project management"
        }
      ],
      "legend": [
        {
          "type": "standard",
          "label": "Standard step",
          "description": "Routine work, running as intended."
        },
        {
          "type": "decision",
          "label": "Decision",
          "description": "A judgement call or branch in the flow."
        },
        {
          "type": "automation",
          "label": "Automation candidate",
          "description": "Repetitive and rules based."
        },
        {
          "type": "pain_point",
          "label": "Pain point",
          "description": "Named by the team as slow or costly."
        }
      ],
      "stages": [
        {
          "id": "PSTAGE-1",
          "steps": [
            {
              "id": "STEP-1-1",
              "type": "standard",
              "title": "Lead intake",
              "tools": [
                "TOOL-5"
              ],
              "owners": [
                "PERSON-5"
              ],
              "confidence": "high",
              "description": "Inbound arrives by email, referral or the site form and lands in a shared inbox.",
              "time_estimate": {
                "qty": 2,
                "unit": "hours",
                "frequency": "weekly"
              }
            },
            {
              "id": "STEP-1-2",
              "type": "pain_point",
              "quote": {
                "text": "Every proposal is a from scratch audit. It is hours before we even know if they are a fit.",
                "speaker": "Daniel Cho",
                "session_ref": "SES-01",
                "recording_url": null,
                "recording_timestamp": "00:12:40"
              },
              "title": "Manual prospect audit",
              "tools": [
                "TOOL-3",
                "TOOL-4"
              ],
              "owners": [
                "PERSON-3"
              ],
              "confidence": "high",
              "description": "An analyst pulls the prospect's Amazon data by hand and builds an audit deck for the pitch.",
              "time_estimate": {
                "qty": 6,
                "unit": "hours",
                "frequency": "weekly"
              },
              "pain_point_ref": "PP-010"
            },
            {
              "id": "STEP-1-3",
              "type": "decision",
              "title": "Proposal and scope",
              "tools": [
                "TOOL-6"
              ],
              "owners": [
                "PERSON-1"
              ],
              "confidence": "high",
              "description": "Daniel reviews the audit, sets scope and pricing, and sends the proposal.",
              "time_estimate": {
                "qty": 2,
                "unit": "hours",
                "frequency": "weekly"
              }
            }
          ],
          "title": "Acquisition",
          "summary": "From inbound lead to signed client."
        },
        {
          "id": "PSTAGE-2",
          "steps": [
            {
              "id": "STEP-2-1",
              "type": "pain_point",
              "quote": {
                "text": "Onboarding drags because we are always waiting on access and re asking for the same things.",
                "speaker": "Ava Thompson",
                "session_ref": "SES-01",
                "recording_url": null,
                "recording_timestamp": "00:41:15"
              },
              "title": "Access and data collection",
              "tools": [
                "TOOL-5",
                "TOOL-2"
              ],
              "owners": [
                "PERSON-5"
              ],
              "confidence": "high",
              "description": "Ava chases advertising and Seller Central access and brand assets over email and Slack.",
              "time_estimate": {
                "qty": 4,
                "unit": "hours",
                "frequency": "weekly"
              },
              "pain_point_ref": "PP-006"
            },
            {
              "id": "STEP-2-2",
              "type": "standard",
              "title": "Baseline and account setup",
              "tools": [
                "TOOL-4"
              ],
              "owners": [
                "PERSON-3"
              ],
              "confidence": "medium",
              "description": "The team records a performance baseline and sets up tracking sheets per client.",
              "time_estimate": {
                "qty": 3,
                "unit": "hours",
                "frequency": "weekly"
              }
            },
            {
              "id": "STEP-2-3",
              "type": "standard",
              "title": "Kickoff",
              "tools": [
                "TOOL-5"
              ],
              "owners": [
                "PERSON-1",
                "PERSON-5"
              ],
              "confidence": "high",
              "description": "Daniel and Ava run the kickoff call and confirm goals.",
              "time_estimate": {
                "qty": 1,
                "unit": "hours",
                "frequency": "weekly"
              }
            }
          ],
          "title": "Onboarding",
          "summary": "Standing up a new Amazon client."
        },
        {
          "id": "PSTAGE-3",
          "steps": [
            {
              "id": "STEP-3-1",
              "type": "pain_point",
              "quote": {
                "text": "Two of us spend the better part of two days a week just nudging bids across the portfolio.",
                "speaker": "Priya Nair",
                "session_ref": "SES-02",
                "recording_url": null,
                "recording_timestamp": "00:08:55"
              },
              "title": "Bid and budget adjustments",
              "tools": [
                "TOOL-1",
                "TOOL-4"
              ],
              "owners": [
                "PERSON-2",
                "PERSON-3"
              ],
              "confidence": "high",
              "description": "Analysts review every campaign and adjust bids and budgets account by account in the Ads console.",
              "time_estimate": {
                "qty": 12,
                "unit": "hours",
                "frequency": "weekly"
              },
              "pain_point_ref": "PP-001"
            },
            {
              "id": "STEP-3-2",
              "type": "automation",
              "quote": {
                "text": "The search term mining is pure pattern work but it still eats a full morning.",
                "speaker": "Sam Ortiz",
                "session_ref": "SES-02",
                "recording_url": null,
                "recording_timestamp": "00:22:30"
              },
              "title": "Search term harvesting",
              "tools": [
                "TOOL-1",
                "TOOL-4"
              ],
              "owners": [
                "PERSON-3"
              ],
              "confidence": "high",
              "description": "Sam exports search term reports and mines new keywords and negatives by hand.",
              "time_estimate": {
                "qty": 6,
                "unit": "hours",
                "frequency": "weekly"
              },
              "pain_point_ref": "PP-003"
            },
            {
              "id": "STEP-3-3",
              "type": "decision",
              "title": "Performance check and flags",
              "tools": [
                "TOOL-1"
              ],
              "owners": [
                "PERSON-2"
              ],
              "confidence": "medium",
              "description": "Priya reviews ACOS and TACOS and decides which accounts need attention.",
              "time_estimate": {
                "qty": 3,
                "unit": "hours",
                "frequency": "weekly"
              }
            }
          ],
          "title": "PPC management",
          "summary": "The weekly advertising delivery loop."
        },
        {
          "id": "PSTAGE-4",
          "steps": [
            {
              "id": "STEP-4-1",
              "type": "pain_point",
              "quote": {
                "text": "Research is the same five steps every catalogue, just different products.",
                "speaker": "Marcus Webb",
                "session_ref": "SES-03",
                "recording_url": null,
                "recording_timestamp": "00:05:10"
              },
              "title": "Keyword and competitor research",
              "tools": [
                "TOOL-3",
                "TOOL-4"
              ],
              "owners": [
                "PERSON-4"
              ],
              "confidence": "high",
              "description": "Marcus runs research per catalogue in Helium 10 and assembles it into a brief.",
              "time_estimate": {
                "qty": 5,
                "unit": "hours",
                "frequency": "weekly"
              },
              "pain_point_ref": "PP-005"
            },
            {
              "id": "STEP-4-2",
              "type": "pain_point",
              "quote": {
                "text": "Writing listings from scratch is the single biggest time sink on my side.",
                "speaker": "Marcus Webb",
                "session_ref": "SES-03",
                "recording_url": null,
                "recording_timestamp": "00:17:45"
              },
              "title": "Listing copy and A plus content",
              "tools": [
                "TOOL-6",
                "TOOL-2"
              ],
              "owners": [
                "PERSON-4"
              ],
              "confidence": "high",
              "description": "Marcus drafts titles, bullets and A plus content from a blank doc each time.",
              "time_estimate": {
                "qty": 9,
                "unit": "hours",
                "frequency": "weekly"
              },
              "pain_point_ref": "PP-004"
            },
            {
              "id": "STEP-4-3",
              "type": "automation",
              "title": "Catalogue health checks",
              "tools": [
                "TOOL-2"
              ],
              "owners": [
                "PERSON-4"
              ],
              "confidence": "medium",
              "description": "Someone manually scans for suppressed listings and buy box loss across clients.",
              "time_estimate": {
                "qty": 4.5,
                "unit": "hours",
                "frequency": "weekly"
              },
              "pain_point_ref": "PP-009"
            }
          ],
          "title": "Catalogue optimization",
          "summary": "Listing and content delivery."
        },
        {
          "id": "PSTAGE-5",
          "steps": [
            {
              "id": "STEP-5-1",
              "type": "pain_point",
              "quote": {
                "text": "Friday is reporting day and it is gone by lunch, every week, per person.",
                "speaker": "Priya Nair",
                "session_ref": "SES-02",
                "recording_url": null,
                "recording_timestamp": "00:34:20"
              },
              "title": "Weekly client reports",
              "tools": [
                "TOOL-1",
                "TOOL-4"
              ],
              "owners": [
                "PERSON-2",
                "PERSON-3"
              ],
              "confidence": "high",
              "description": "Each analyst rebuilds a report per client by copying numbers into a slide template.",
              "time_estimate": {
                "qty": 8,
                "unit": "hours",
                "frequency": "weekly"
              },
              "pain_point_ref": "PP-002"
            },
            {
              "id": "STEP-5-2",
              "type": "pain_point",
              "title": "Status updates and inbox triage",
              "tools": [
                "TOOL-5"
              ],
              "owners": [
                "PERSON-5"
              ],
              "confidence": "medium",
              "description": "Ava keeps clients updated across email and Slack and chases internal answers.",
              "time_estimate": {
                "qty": 7,
                "unit": "hours",
                "frequency": "weekly"
              },
              "pain_point_ref": "PP-007"
            },
            {
              "id": "STEP-5-3",
              "type": "pain_point",
              "quote": {
                "text": "Reconciling spend before we can invoice is fiddly and easy to get wrong.",
                "speaker": "Ava Thompson",
                "session_ref": "SES-03",
                "recording_url": null,
                "recording_timestamp": "00:48:05"
              },
              "title": "Spend reconciliation for invoicing",
              "tools": [
                "TOOL-1",
                "TOOL-7"
              ],
              "owners": [
                "PERSON-5"
              ],
              "confidence": "high",
              "description": "At month end ad spend is reconciled across accounts and passed to Xero.",
              "time_estimate": {
                "qty": 3.5,
                "unit": "hours",
                "frequency": "weekly"
              },
              "pain_point_ref": "PP-008"
            }
          ],
          "title": "Reporting and billing",
          "summary": "Client reporting, retention and month end."
        }
      ]
    },
    "deliverables": [
      {
        "key": "process-map",
        "sub": "Every step of how Scaleforte delivers today, with the pain points marked.",
        "state": "available",
        "heading": "Your process map is ready",
        "cta_label": "Open process map",
        "locked_tooltip": null
      },
      {
        "key": "findings",
        "sub": "The pain points and optimisation ideas, grouped by area.",
        "state": "available",
        "heading": "What we discussed",
        "cta_label": "View findings",
        "locked_tooltip": null
      },
      {
        "key": "waste",
        "sub": "The operational waste quantified in hours and dollars.",
        "state": "available",
        "heading": "Hidden costs uncovered",
        "cta_label": "View hidden costs",
        "locked_tooltip": null
      },
      {
        "key": "blueprint",
        "sub": "What to build, the order, the cost and the payback.",
        "state": "available",
        "heading": "Your AI blueprint",
        "cta_label": "View the blueprint",
        "locked_tooltip": null
      },
      {
        "key": "comprehensive-report",
        "sub": "Everything in one long form document you can print or save.",
        "state": "available",
        "heading": "Full audit report",
        "cta_label": "Open full report",
        "locked_tooltip": null
      }
    ],
    "schema_version": 1
  }
};
