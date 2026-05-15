"use client";

import { useEffect, useRef } from "react";

interface Props {
  videoUrl: string | null;
  headline: string | null;
  body: string | null;
  calendlyUrl: string;
}

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

/**
 * Video sales letter section: optional video iframe, copy, then an inline
 * Calendly widget.
 *
 * The Calendly script (loaded globally in `src/app/layout.tsx`) only scans
 * for `.calendly-inline-widget` elements *once*, on its own load. This
 * component renders after a client-side data fetch, so the widget element
 * appears too late for that scan. We therefore initialise the widget
 * explicitly via `Calendly.initInlineWidget` once it's mounted (polling
 * briefly in case widget.js hasn't finished loading yet).
 */
export function Vsl({ videoUrl, headline, body, calendlyUrl }: Props) {
  const calendlyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!calendlyUrl) return;
    const el = calendlyRef.current;
    if (!el) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const init = () => {
      if (cancelled || !el) return;
      if (window.Calendly) {
        // Clear any prior iframe so a re-render doesn't stack widgets.
        el.innerHTML = "";
        window.Calendly.initInlineWidget({ url: calendlyUrl, parentElement: el });
      } else {
        // widget.js still loading — retry shortly.
        timer = setTimeout(init, 200);
      }
    };
    init();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [calendlyUrl]);

  // Nothing to render if all VSL slots are blank.
  if (!videoUrl && !headline && !body && !calendlyUrl) return null;

  const embedUrl = toEmbedUrl(videoUrl);

  return (
    <section className="mt-14">
      {embedUrl && (
        <div className="relative w-full overflow-hidden rounded-xl bg-black/5 shadow-lg" style={{ aspectRatio: "16/9" }}>
          <iframe
            src={embedUrl}
            title={headline ?? "Walk-through"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      )}

      {(headline || body) && (
        <div className="mt-8 text-center">
          {headline && (
            <h2 className="text-balance text-[26px] sm:text-[32px] font-semibold leading-[1.15] tracking-tight text-foreground">
              {headline}
            </h2>
          )}
          {body && (
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-muted whitespace-pre-line">
              {body}
            </p>
          )}
        </div>
      )}

      {calendlyUrl && (
        <div className="mt-10">
          <h3 className="text-center text-sm font-semibold uppercase tracking-[0.15em] text-muted">
            Book a free call
          </h3>
          {/* Populated imperatively by Calendly.initInlineWidget in the effect
              above. No `.calendly-inline-widget` class so the global script's
              one-time scan doesn't double-init it. */}
          <div
            ref={calendlyRef}
            className="mt-4"
            style={{ minWidth: 320, height: 700 }}
          />
        </div>
      )}
    </section>
  );
}

/**
 * Convert common video URL shapes to embeddable URLs.
 * - YouTube watch / share / shorts → /embed/<id>
 * - Vimeo direct → player.vimeo.com/video/<id>
 * - Loom share → loom.com/embed/<id>
 * - Anything that's already an embed URL → pass through
 */
function toEmbedUrl(url: string | null): string | null {
  if (!url) return null;
  if (url.includes("/embed/") || url.includes("player.vimeo.com")) return url;

  // YouTube
  const ytWatch = url.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`;
  const ytShort = url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`;
  const ytShortsPath = url.match(/youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/);
  if (ytShortsPath) return `https://www.youtube.com/embed/${ytShortsPath[1]}`;

  // Vimeo
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  // Loom — share links can't be framed; the /embed/ variant can.
  const loom = url.match(/loom\.com\/(?:share|embed)\/([A-Za-z0-9]+)/);
  if (loom) return `https://www.loom.com/embed/${loom[1]}`;

  return url; // fall back to raw — best effort
}
