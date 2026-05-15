"use client";

import { Calendar } from "lucide-react";
import { useBooking } from "@/components/ui/BookingModal";

/**
 * Thin client wrapper around the existing global booking modal so the rest of
 * the player page can stay server-rendered. The Calendly URL is owned by
 * `BookingProvider` in [src/components/ui/BookingModal.tsx] — change it once
 * there and it updates everywhere.
 */
export function BookCallCta({ label = "Book a 30-minute call" }: { label?: string }) {
  const { open } = useBooking();
  return (
    <button
      type="button"
      onClick={open}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-500 px-6 text-[15px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_8px_24px_-12px_rgba(124,58,237,0.6)] transition-colors hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <Calendar size={16} />
      {label}
    </button>
  );
}
