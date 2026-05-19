"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate as animateMotion,
  type AnimationPlaybackControls,
} from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useBooking } from "@/components/ui/BookingModal";
import { cn } from "@/lib/utils";

const DRAG_THRESHOLD = 6; // px before a press becomes a drag (lets clicks pass through)
const SWIPE_VELOCITY = 0.3; // px/ms — anything faster than this counts as a flick (~300 px/sec)
const SWIPE_DISTANCE_FRAC = 0.18; // share of `stride` that counts as a deliberate drag
const VELOCITY_FRESHNESS_MS = 100; // ignore velocity if last move was longer ago than this

type Preview =
  | { kind: "marquee"; images: string[] }
  | { kind: "image"; image: string };

type Case = {
  brand: string;
  logo: string;
  headline: string;
  body: string;
  preview: Preview;
};

// Headlines/body are placeholder — replace with real outcomes when ready.
const CASES: Case[] = [
  {
    brand: "Scaleforte",
    logo: "/clients/scaleforte.png",
    headline: "AI rollout for Scaleforte",
    body: "Custom workflows that automate the repetitive and free the team to focus on the work that actually moves revenue.",
    preview: {
      kind: "marquee",
      images: ["/card-1.webp", "/card-2.webp", "/card-3.webp"],
    },
  },
  {
    brand: "MMG Consultancies",
    logo: "/clients/mmg.png",
    headline: "AI workflows at MMG Consultancies",
    body: "Internal automations that compress the time it takes to deliver client work, without giving up control or visibility.",
    preview: {
      kind: "marquee",
      images: ["/card-4.avif", "/card-5.webp", "/card-6.avif"],
    },
  },
  {
    brand: "Octa Accountants",
    logo: "/clients/octa.png",
    headline: "AI for Octa Accountants",
    body: "Document-heavy accounting workflows automated end-to-end, with humans approving the calls that matter.",
    preview: { kind: "image", image: "/card-7.webp" },
  },
];

const GAP = 16; // px between cards
const COPIES = 3; // duplicate the case set to fake an infinite loop
const SECTION_HEIGHT = 800; // px — section height
const CARD_PADDING_Y = 40; // matches `py-10` on the card's inner content
const CARD_HEIGHT = SECTION_HEIGHT - CARD_PADDING_Y * 2; // 800 − 80 = 720

// Viewport-based card width: more peek on desktop, less on smaller screens.
function getCardFraction(viewportWidth: number): number {
  if (viewportWidth >= 1024) return 0.66; // desktop
  if (viewportWidth >= 640) return 0.8; // tablet
  return 0.95; // mobile
}

function PreviewCard({ preview }: { preview: Preview }) {
  if (preview.kind === "image") {
    return (
      <img
        src={preview.image}
        alt=""
        className="mx-auto h-[300px] w-auto object-cover shadow-2xl"
      />
    );
  }
  // Marquee — render images twice for seamless looping using the existing
  // `.animate-marquee` keyframes (translateX 0 → -50%).
  const items = [...preview.images, ...preview.images];
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex w-max animate-marquee gap-3"
        style={{ animationDuration: "26.67s" }}
      >
        {items.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-[300px] w-auto object-cover shadow-2xl"
          />
        ))}
      </div>
    </div>
  );
}

function CaseCard({
  data,
  width,
}: {
  data: Case;
  width: number;
}) {
  const booking = useBooking();
  const style: CSSProperties = { width, height: CARD_HEIGHT };
  return (
    <div
      style={style}
      className="relative shrink-0 overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.10),_transparent_55%)]"
        aria-hidden
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center py-10 text-center">
        <img
          src={data.logo}
          alt={data.brand}
          className="h-10 w-auto max-w-[220px] object-contain brightness-0 invert"
        />
        <h3 className="mt-5 text-balance text-[28px] sm:text-[34px] font-semibold leading-[1.15] tracking-tight text-white">
          {data.headline}
        </h3>
        <p className="mt-3 max-w-md text-[14px] leading-relaxed text-white/70">
          {data.body}
        </p>
        <div className="mt-7 w-full">
          <PreviewCard preview={data.preview} />
        </div>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <span className="text-sm text-white/70">Want results like these?</span>
          <Button onClick={booking.open} variant="onBrand" size="sm">
            Book an Intro <ArrowRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CaseStudies() {
  const total = CASES.length;

  // Render the case set `COPIES` times so we always have neighbours to peek
  // on either side of the centred card, no matter how far the user scrolls.
  const allCards = Array.from({ length: COPIES }, () => CASES).flat();

  // Viewport measurement so the card width scales with the actual viewport.
  // `ready` flips true after the first measurement lands, so we can hide the
  // carousel row until alignment is correct (avoids a flash on reload where
  // cards sized for the SSR-default 1024px snap to actual viewport size).
  const [viewportWidth, setViewportWidth] = useState(1024);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const update = () => setViewportWidth(window.innerWidth);
    update();
    setReady(true);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const cardWidth = Math.round(viewportWidth * getCardFraction(viewportWidth));
  const stride = cardWidth + GAP;
  const centerOffset = Math.round((viewportWidth - cardWidth) / 2);

  // ── Marquee-style infinite scroll ─────────────────────────────────────────
  // `x` is unbounded — every click animates it by ±stride and it just keeps
  // growing. `displayX` (below) wraps `x` into a bounded range so the row
  // never translates off-screen, no matter how many times the user clicks.
  // The wrap is mathematically invisible because the card set repeats every
  // `total * stride` pixels: any two `x` values that differ by an exact
  // multiple of `total * stride` render pixel-identical content.
  const x = useMotionValue(0);
  const animationRef = useRef<AnimationPlaybackControls | null>(null);
  // The intended *final* x. Each click advances this by ±stride. Tracking
  // it separately from the animating `x` value prevents misalignment when
  // clicks land mid-spring (otherwise `x.get()` reads a fractional position
  // and the row drifts off the stride grid).
  const targetRef = useRef(0);

  const cycle = total * stride; // length of one full case-set repeat
  const middleAnchor = centerOffset - total * stride; // displayX when x === 0

  const displayX = useTransform(x, (v) => {
    // Map v into the range [-cycle/2, +cycle/2) — the most "central" wrap of
    // each cycle. Adding middleAnchor places the centred card on the middle
    // copy at v=0 and keeps neighbours rendered on both sides.
    const mod = ((v % cycle) + cycle) % cycle;
    const adjusted = mod >= cycle / 2 ? mod - cycle : mod;
    return middleAnchor + adjusted;
  });

  // On viewport resize, keep showing the same case by snapping `x` and the
  // tracked target to the nearest multiple of the *new* stride.
  const prevStrideRef = useRef(stride);
  useEffect(() => {
    if (prevStrideRef.current !== stride) {
      animationRef.current?.stop();
      const steps = Math.round(targetRef.current / prevStrideRef.current);
      targetRef.current = steps * stride;
      x.set(targetRef.current);
      prevStrideRef.current = stride;
    }
  }, [stride, x]);

  const go = useCallback(
    (dir: 1 | -1) => {
      animationRef.current?.stop();
      // Advance the intended target by ±stride, not the live (possibly
      // mid-animation) x value. This guarantees the row always settles on a
      // stride boundary even with rapid clicks.
      targetRef.current = targetRef.current - dir * stride;
      animationRef.current = animateMotion(x, targetRef.current, {
        type: "spring",
        stiffness: 220,
        damping: 32,
        mass: 0.9,
      });
    },
    [x, stride],
  );

  // ── Drag-to-switch ────────────────────────────────────────────────────────
  // Pointer-event driven so it works for both mouse and touch. We only treat
  // the press as a drag once the pointer moves past DRAG_THRESHOLD, otherwise
  // clicks on inner buttons (Book an Intro, arrows) keep working normally.
  const dragRef = useRef<{
    pointerX: number;
    motionX: number;
    active: boolean;
    lastMoveX: number;
    lastMoveTime: number;
    lastVelocity: number; // px/ms; positive = moving right
  } | null>(null);
  const [isClicked, setIsClicked] = useState(false);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragRef.current = {
      pointerX: e.clientX,
      motionX: x.get(),
      active: false,
      lastMoveX: e.clientX,
      lastMoveTime: performance.now(),
      lastVelocity: 0,
    };
    // Flip the cursor the moment the press registers, regardless of whether
    // the user goes on to drag. Reset happens in `onPointerEnd` below.
    setIsClicked(true);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d) return;
    const delta = e.clientX - d.pointerX;
    if (!d.active && Math.abs(delta) >= DRAG_THRESHOLD) {
      d.active = true;
      animationRef.current?.stop();
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        /* some platforms throw if already captured */
      }
    }
    if (d.active) {
      // Update velocity sample BEFORE the position update so we always have
      // a fresh reading at the moment of release.
      const now = performance.now();
      const dt = now - d.lastMoveTime;
      if (dt > 0) d.lastVelocity = (e.clientX - d.lastMoveX) / dt;
      d.lastMoveX = e.clientX;
      d.lastMoveTime = now;

      x.set(d.motionX + delta);
    }
  };

  const onPointerEnd = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d) return;
    const wasDrag = d.active;
    const motionXAtStart = d.motionX;
    const lastVelocity = d.lastVelocity;
    const lastMoveTime = d.lastMoveTime;
    dragRef.current = null;
    // Reset cursor on every release, whether the press turned into a drag or not.
    setIsClicked(false);
    if (!wasDrag) return; // small move = real click; let it pass to children

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* safe to ignore */
    }

    // Decide direction: a fast flick OR a deliberate drag triggers a card
    // change; everything else snaps back to where the drag started.
    // Velocity is ignored if the last pointer move was too long ago — the
    // user paused before releasing, so we shouldn't credit that earlier flick.
    const dx = x.get() - motionXAtStart; // negative = leftward = advance forward
    const v =
      performance.now() - lastMoveTime < VELOCITY_FRESHNESS_MS
        ? lastVelocity
        : 0;

    let direction: -1 | 0 | 1 = 0; // 1 = next card (forward), -1 = previous
    if (v < -SWIPE_VELOCITY || dx < -SWIPE_DISTANCE_FRAC * stride) {
      direction = 1;
    } else if (v > SWIPE_VELOCITY || dx > SWIPE_DISTANCE_FRAC * stride) {
      direction = -1;
    }

    const target = motionXAtStart - direction * stride;
    targetRef.current = target;
    animationRef.current = animateMotion(x, target, {
      type: "spring",
      stiffness: 220,
      damping: 32,
      mass: 0.9,
    });
  };

  return (
    <section
      id="case-studies"
      className="relative flex items-center overflow-hidden bg-background"
      style={{ height: SECTION_HEIGHT }}
    >
      <div className="relative w-full">
        {/* Arrows — kept inside a max-width overlay so they don't sit at the
            extreme edges of huge monitors. */}
        <div className="pointer-events-none absolute inset-0 z-20 mx-auto flex max-w-7xl items-center justify-between px-4">
          <button
            aria-label="Previous case"
            onClick={() => go(-1)}
            className="pointer-events-auto grid h-10 w-10 cursor-pointer place-items-center rounded-md bg-black/55 text-white shadow-md ring-1 ring-white/15 backdrop-blur-md hover:bg-black/75 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            aria-label="Next case"
            onClick={() => go(1)}
            className="pointer-events-auto grid h-10 w-10 cursor-pointer place-items-center rounded-md bg-black/55 text-white shadow-md ring-1 ring-white/15 backdrop-blur-md hover:bg-black/75 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Sliding row — `displayX` is a wrapped MotionValue, so the row
            position stays bounded forever. Pointer handlers add drag-to-switch
            with grab/grabbing cursors. */}
        <motion.div
          className={cn(
            "flex touch-pan-y select-none transition-opacity duration-150",
            isClicked ? "cursor-grabbing" : "cursor-grab",
            ready ? "opacity-100" : "opacity-0",
          )}
          style={{ gap: GAP, x: displayX }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
        >
          {allCards.map((c, i) => (
            <CaseCard key={i} data={c} width={cardWidth} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
