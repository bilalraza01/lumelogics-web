import { notFound } from "next/navigation";
import { fetchAuditBySlug, type PublicAudit } from "@/lib/api/audits";

export const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

// Shared page boilerplate: validate the company slug, fetch the audit, 404
// cleanly. Used by every deliverable sub-route.
export async function loadAudit(
  params: Promise<{ slug: string }>,
): Promise<{ slug: string; audit: PublicAudit }> {
  const { slug } = await params;
  if (!SLUG_RE.test(slug)) notFound();
  const audit = await fetchAuditBySlug(slug);
  if (!audit) notFound();
  return { slug, audit };
}

// Resolve a session ref ("SES-01") to its display badge ("Session 1"),
// falling back to the raw ref.
export function sessionLabeller(audit: PublicAudit): (ref: string) => string {
  const map: Record<string, string> = {};
  for (const s of audit.content.sessions) map[s.id] = s.badge;
  return (ref: string) => map[ref] ?? ref;
}
