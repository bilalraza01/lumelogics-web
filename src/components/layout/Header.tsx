"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useBooking } from "@/components/ui/BookingModal";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Problem", href: "#problem" },
  { label: "Case Studies", href: "#case-studies" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const booking = useBooking();

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Smooth-scroll to anchor sections, accounting for the floating navbar.
  // We do this in JS rather than relying on `scroll-behavior: smooth` because
  // ancestor `overflow` rules in the layout were breaking the CSS approach.
  const scrollToHash = (
    e: React.MouseEvent<HTMLElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    const top =
      el.getBoundingClientRect().top + window.scrollY - 96; // 96 = nav height + breathing room
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", href);
    setOpen(false);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <div className="flex h-14 w-full max-w-5xl items-center justify-between gap-3 rounded-full border border-white/40 bg-white/55 px-2 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_10px_30px_-12px_rgba(20,19,26,0.18)] backdrop-blur-xl">
          <div className="flex items-center rounded-full border border-border/80 bg-surface px-3 py-1.5">
            <Logo />
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToHash(e, item.href)}
                className="text-[13px] text-muted transition-colors hover:text-brand-600"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right cluster: Book an Intro + (mobile-only) hamburger. */}
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              shape="pill"
              onClick={() => {
                setOpen(false);
                booking.open();
              }}
            >
              Book an Intro
            </Button>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-border/70 bg-surface text-foreground transition-colors hover:border-brand-300 md:hidden"
            >
              {/* Cross-fade Menu ↔ X. Both glyphs sit in the same spot;
                  rotation + opacity drives the transition. */}
              <Menu
                size={18}
                className={cn(
                  "absolute transition-[transform,opacity] duration-[350ms] ease-out",
                  open
                    ? "rotate-90 scale-75 opacity-0"
                    : "rotate-0 scale-100 opacity-100",
                )}
              />
              <X
                size={18}
                className={cn(
                  "absolute transition-[transform,opacity] duration-[350ms] ease-out",
                  open
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-75 opacity-0",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — sits BELOW the floating navbar (z-40 < header's z-50)
          and starts under it so the bar stays visible/interactive while open. */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-20 z-40 bg-background md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <nav className="flex flex-col px-6 pt-6">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToHash(e, item.href)}
                className="border-b border-border py-4 text-[22px] font-semibold tracking-tight text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
