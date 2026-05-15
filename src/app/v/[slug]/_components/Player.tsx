"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

interface Props {
  mp4Url: string;
  poster: string | null;
}

/**
 * Custom-styled HTML5 video player. We intentionally start *paused* with the
 * GIF poster shown — autoplay-with-sound is blocked by every browser, and
 * autoplay-muted-with-a-thumbnail tends to look broken. A big play button gives
 * the prospect a clear action.
 */
export function Player({ mp4Url, poster }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  function start() {
    const v = ref.current;
    if (!v) return;
    setStarted(true);
    v.play().catch(() => {
      // Autoplay failed (rare with sound off) — leave controls visible.
      setStarted(false);
    });
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-black shadow-[0_30px_80px_-30px_rgba(124,58,237,0.45)] ring-1 ring-white/10">
      {/* aspect-video keeps a 16:9 box even before the video metadata loads. */}
      <div className="relative aspect-video w-full">
        <video
          ref={ref}
          controls={started}
          playsInline
          preload="metadata"
          poster={poster ?? undefined}
          className="block h-full w-full bg-black"
        >
          <source src={mp4Url} type="video/mp4" />
          Your browser doesn&apos;t support embedded video.{" "}
          <a href={mp4Url} className="underline">Download the MP4</a>.
        </video>

        {!started && (
          <button
            type="button"
            onClick={start}
            className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/40"
            aria-label="Play video"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-brand-700 shadow-2xl transition-transform group-hover:scale-105">
              <Play size={32} className="ml-1 fill-current" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
