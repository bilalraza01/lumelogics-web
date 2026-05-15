"use client";

import { use, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import {
  fetchMagnetAccess,
  type LeadMagnetAccess,
} from "@/lib/api/lead-magnets";
import { ResourceButton } from "./_components/ResourceButton";
import { Vsl } from "./_components/Vsl";

interface PageProps {
  params: Promise<{ slug: string; token: string }>;
}

export default function MagnetAccessPage({ params }: PageProps) {
  const { slug, token } = use(params);

  const [data, setData] = useState<LeadMagnetAccess | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchMagnetAccess(slug, token)
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug, token]);

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <Logo />
          <span className="text-xs text-muted">Your resource</span>
        </Container>
      </header>

      <Container className="py-12 sm:py-20">
        <div className="mx-auto max-w-3xl">
          {loading && <LoadingState />}
          {!loading && error && <ErrorState slug={slug} message={error} />}
          {!loading && data && (
            <>
              <header className="text-center">
                <h1 className="text-balance text-[36px] sm:text-[48px] font-semibold leading-[1.05] tracking-tight text-foreground">
                  {data.title}
                </h1>
                {data.description && (
                  <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
                    {data.description}
                  </p>
                )}

                <div className="mt-10">
                  <ResourceButton
                    download={data.resource.download}
                    url={data.resource.url}
                  />
                </div>

                <p className="mt-4 text-xs text-muted">
                  {data.resource.download
                    ? "Click to download."
                    : "Opens in a new tab."}
                </p>
              </header>

              <Vsl
                videoUrl={data.vsl.video_url}
                headline={data.vsl.headline}
                body={data.vsl.body}
                calendlyUrl={data.calendly_url}
              />

              <div className="mt-16 border-t border-border pt-6 text-center text-sm text-muted">
                <Link
                  href="/"
                  className="text-brand-600 underline-offset-4 hover:underline"
                >
                  ← Back to lumelogics.com
                </Link>
              </div>
            </>
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
      <span className="text-sm">Loading your resource…</span>
    </div>
  );
}

function ErrorState({ slug, message }: { slug: string; message: string }) {
  const isNotFound = message === "not_found";

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
      <h2 className="text-lg font-semibold text-red-900">
        {isNotFound
          ? "This link isn't valid"
          : "We couldn't load this resource"}
      </h2>
      <p className="mt-2 text-sm text-red-800">
        {isNotFound
          ? "The link may have expired or been mistyped. Request a fresh one below."
          : message}
      </p>
      <Link
        href={`/free/${slug}`}
        className="mt-5 inline-block text-sm text-brand-600 underline-offset-4 hover:underline"
      >
        Request a new link →
      </Link>
    </div>
  );
}
