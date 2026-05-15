"use client";

import { use, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { requestMagnet } from "@/lib/api/lead-magnets";
import { EmailGate } from "./_components/EmailGate";
import { CheckEmail } from "./_components/CheckEmail";

// Per-slug copy for the email-gate page. New magnets get added here; the
// authoritative source is still the backend `lead_magnets` row.
const MAGNET_GATE_COPY: Record<string, { title: string; description: string }> = {
  "ai-readiness-playbook": {
    title: "Grab the AI Readiness Playbook",
    description:
      "A 90-day plan for operators who want their business AI-ready. The workflows to document, the data to track, the people to bring along. Drop your email and we'll send you the link.",
  },
};

const FALLBACK_COPY = {
  title: "Grab the resource",
  description:
    "Drop your email and we'll send you the link.",
};

type Step =
  | { kind: "email_gate" }
  | { kind: "check_email"; email: string };

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function FreeMagnetPage({ params }: PageProps) {
  const { slug } = use(params);
  const copy = MAGNET_GATE_COPY[slug] ?? FALLBACK_COPY;

  const [step, setStep] = useState<Step>({ kind: "email_gate" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (email: string) => {
    setSubmitting(true);
    setError(null);
    try {
      const referral_source =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("utm_source") ??
            undefined
          : undefined;
      await requestMagnet(slug, { email, referral_source });
      setStep({ kind: "check_email", email });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "request_failed";
      setError(
        msg === "magnet_not_found"
          ? "That resource isn't available. Check the link and try again."
          : msg === "invalid_email"
            ? "That doesn't look like a valid email address."
            : "Something went wrong sending your email. Try again in a moment.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <Logo />
          <span className="text-xs text-muted">Free resource</span>
        </Container>
      </header>

      <Container className="py-12 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <AnimatePresence mode="wait">
            {step.kind === "email_gate" && (
              <EmailGate
                key="gate"
                title={copy.title}
                description={copy.description}
                onSubmit={handleSubmit}
                submitting={submitting}
                error={error}
              />
            )}
            {step.kind === "check_email" && (
              <CheckEmail
                key="check"
                email={step.email}
                onResetEmail={() => {
                  setError(null);
                  setStep({ kind: "email_gate" });
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </Container>
    </main>
  );
}
