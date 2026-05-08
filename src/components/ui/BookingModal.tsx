"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const CALENDLY_URL = "https://calendly.com/bilal-raza-lumelogics/30min";

type BookingContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used inside <BookingProvider>");
  }
  return ctx;
}

/**
 * Wraps the app with booking-modal state. The modal markup (and the Calendly
 * inline-widget element it contains) is always rendered, so Calendly can
 * preload its iframe in the background while the page loads — opening the
 * modal is then instant because the calendar UI is already there.
 */
export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <BookingContext.Provider value={{ isOpen, open, close }}>
      {children}

      {/* Always rendered. Visibility is controlled via opacity + pointer-events
          so the Calendly iframe inside stays mounted across opens/closes and
          doesn't have to reload each time. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book an intro call"
        aria-hidden={!isOpen}
        onClick={close}
        className={cn(
          "fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4 backdrop-blur-sm transition-opacity duration-200",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[820px] overflow-hidden rounded-lg bg-surface shadow-2xl"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close booking dialog"
            className="absolute right-3 top-3 z-10 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-black/10 text-foreground transition-colors hover:bg-black/20"
          >
            <X size={18} />
          </button>

          {/* The Calendly script (loaded in app/layout.tsx) auto-detects this
              element by its className + data-url and injects the calendar
              iframe. min-width and height match Calendly's recommendations. */}
          <div
            className="calendly-inline-widget"
            data-url={CALENDLY_URL}
            style={{ minWidth: 320, height: 700 }}
          />
        </div>
      </div>
    </BookingContext.Provider>
  );
}
