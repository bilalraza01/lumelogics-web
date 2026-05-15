"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { QUESTIONS } from "@/lib/assessment/questions";
import {
  submitAssessment,
  IS_PREVIEW_MODE,
} from "@/lib/api/assessment";
import type { Answers, AssessmentResult } from "@/lib/assessment/types";
import { Intro } from "./_components/Intro";
import { ProgressBar } from "./_components/ProgressBar";
import { QuestionScreen } from "./_components/QuestionScreen";
import { EmailGate } from "./_components/EmailGate";
import { Results } from "./_components/Results";

// Flow steps. Question indices are 0..17.
type Step =
  | { kind: "intro" }
  | { kind: "question"; index: number }
  | { kind: "email_gate" }
  | { kind: "results" };

export default function FreeAssessmentPage() {
  const [step, setStep] = useState<Step>({ kind: "intro" });
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleAnswer = (questionIndex: number, value: number) => {
    const id = QUESTIONS[questionIndex].id;
    setAnswers((prev) => ({ ...prev, [id]: value }));

    const next = questionIndex + 1;
    if (next < QUESTIONS.length) {
      setStep({ kind: "question", index: next });
    } else {
      setStep({ kind: "email_gate" });
    }
  };

  const handleSubmit = async (email: string) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const referral_source =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("utm_source") ??
            undefined
          : undefined;
      const r = await submitAssessment({ email, answers, referral_source });
      setResult(r);
      setStep({ kind: "results" });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong submitting your assessment.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Determine progress + current question for the bar.
  const showProgress =
    step.kind === "question" || step.kind === "email_gate";
  const currentIndex =
    step.kind === "question" ? step.index : QUESTIONS.length - 1;
  const currentQuestion = QUESTIONS[currentIndex];

  return (
    <main className="min-h-screen bg-background">
      {/* Light header — link back to home, no full nav since this is a focused flow */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <Logo />
          <span className="text-xs text-muted">Free assessment</span>
        </Container>
      </header>

      <Container className="py-12 sm:py-20">
        <div className="mx-auto max-w-2xl">
          {showProgress && (
            <div className="mb-10">
              <ProgressBar
                current={
                  step.kind === "question"
                    ? step.index + 1
                    : QUESTIONS.length
                }
                total={QUESTIONS.length}
                dimension={currentQuestion.dimension}
              />
            </div>
          )}

          <AnimatePresence mode="wait">
            {step.kind === "intro" && (
              <Intro
                key="intro"
                onStart={() => setStep({ kind: "question", index: 0 })}
              />
            )}

            {step.kind === "question" && (
              <QuestionScreen
                key={`q-${step.index}`}
                question={QUESTIONS[step.index]}
                onAnswer={(v) => handleAnswer(step.index, v)}
              />
            )}

            {step.kind === "email_gate" && (
              <EmailGate
                key="email-gate"
                onSubmit={handleSubmit}
                submitting={submitting}
                error={submitError}
              />
            )}

            {step.kind === "results" && result && (
              <Results
                key="results"
                result={result}
                isPreview={IS_PREVIEW_MODE}
              />
            )}
          </AnimatePresence>
        </div>
      </Container>
    </main>
  );
}
