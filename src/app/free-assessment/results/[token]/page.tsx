"use client";

import { use, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { fetchResult, IS_PREVIEW_MODE } from "@/lib/api/assessment";
import type { AssessmentResult } from "@/lib/assessment/types";
import { Results } from "../../_components/Results";

interface PageProps {
  params: Promise<{ token: string }>;
}

export default function ResultsByTokenPage({ params }: PageProps) {
  // Next.js 15+ params are async — unwrap with `use()`.
  const { token } = use(params);

  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchResult(token)
      .then((r) => {
        if (!cancelled) setResult(r);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load result.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <Logo />
          <span className="text-xs text-muted">Your results</span>
        </Container>
      </header>

      <Container className="py-12 sm:py-20">
        <div className="mx-auto max-w-2xl">
          {loading && <LoadingState />}
          {!loading && error && <ErrorState message={error} />}
          {!loading && result && (
            <Results result={result} isPreview={IS_PREVIEW_MODE} />
          )}
        </div>
      </Container>
    </main>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20 text-muted">
      <Loader2 size={20} className="mr-2 animate-spin" />
      <span className="text-sm">Loading your results…</span>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
      <h2 className="text-lg font-semibold text-red-900">
        We couldn&apos;t load this result
      </h2>
      <p className="mt-2 text-sm text-red-800">{message}</p>
      <Link
        href="/free-assessment"
        className="mt-5 inline-block text-sm text-brand-600 underline-offset-4 hover:underline"
      >
        Start a new assessment →
      </Link>
    </div>
  );
}
