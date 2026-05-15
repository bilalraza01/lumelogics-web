// Client for the lead-magnet endpoints on the Rails API.
// Mirrors the shape + preview-mode fallback in `src/lib/api/assessment.ts`.

const API_URL = process.env.NEXT_PUBLIC_ASSESSMENT_API_URL ?? "";
export const IS_PREVIEW_MODE = API_URL === "";

export type ResourceType = "pdf" | "google_doc" | "external_url" | "file";

export interface LeadMagnetAccess {
  slug: string;
  title: string;
  description: string | null;
  /** `download: true` → force a file download. Otherwise open in a new tab. */
  resource: { type: ResourceType; url: string; download: boolean };
  vsl: {
    video_url: string | null;
    headline: string | null;
    body: string | null;
  };
  calendly_url: string;
  verified_at: string | null;
}

export interface RequestMagnetPayload {
  email: string;
  referral_source?: string;
}

export async function requestMagnet(
  slug: string,
  payload: RequestMagnetPayload,
): Promise<{ status: "email_sent" }> {
  if (IS_PREVIEW_MODE) {
    // Preview mode: nothing persisted, no email actually sent. Returns
    // success so the UI's "check your inbox" view still appears for demos.
    return { status: "email_sent" };
  }

  const res = await fetch(
    `${API_URL}/api/v1/lead-magnets/${encodeURIComponent(slug)}/requests`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  if (res.status === 404) throw new Error("magnet_not_found");
  if (res.status === 422) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "invalid_request");
  }
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

export async function fetchMagnetAccess(
  slug: string,
  token: string,
): Promise<LeadMagnetAccess> {
  if (IS_PREVIEW_MODE) {
    // Hardcoded preview so the access page renders without a backend.
    // Real magnet content drops in once NEXT_PUBLIC_ASSESSMENT_API_URL is set.
    return {
      slug,
      title: "Preview Resource",
      description:
        "Preview mode. Backend not configured. Set NEXT_PUBLIC_ASSESSMENT_API_URL to hit the real API.",
      resource: { type: "pdf", url: "#", download: true },
      vsl: {
        video_url: null,
        headline: "How to use this resource",
        body: "This is preview copy. The real VSL body comes from the backend in production.",
      },
      calendly_url: "https://calendly.com/bilal-lumelogics/30min",
      verified_at: new Date().toISOString(),
    };
  }

  const res = await fetch(
    `${API_URL}/api/v1/lead-magnets/${encodeURIComponent(slug)}/access/${encodeURIComponent(token)}`,
  );
  if (res.status === 404) throw new Error("not_found");
  if (!res.ok) throw new Error(`Fetch failed (${res.status})`);
  return res.json();
}
