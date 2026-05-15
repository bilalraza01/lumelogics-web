// Public read of an outreach video by slug. Hits the Rails API at
// /api/v1/videos/by-slug/:slug. Server-side fetched from the player page so we
// can build OG metadata and 404 cleanly before any HTML is sent.

const API_URL = process.env.NEXT_PUBLIC_ASSESSMENT_API_URL ?? "";
export const IS_PREVIEW_MODE = API_URL === "";

export interface PublicVideo {
  slug: string;
  mp4_url: string;
  gif_url: string;
  duration_seconds: number | null;
  prospect: { first_name: string | null };
}

export async function fetchVideoBySlug(slug: string): Promise<PublicVideo | null> {
  if (IS_PREVIEW_MODE) {
    // Preview fallback so the page renders during local dev without the API.
    return {
      slug,
      mp4_url: "",
      gif_url: "",
      duration_seconds: null,
      prospect: { first_name: null },
    };
  }

  const res = await fetch(
    `${API_URL}/api/v1/videos/by-slug/${encodeURIComponent(slug)}`,
    // Each visitor view should hit the server (which logs an Activity). Skip
    // Next's cache so refreshes count, and so a re-render after the video is
    // ready isn't blocked by a stale 404.
    { cache: "no-store" },
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`fetch_failed_${res.status}`);
  return res.json();
}
