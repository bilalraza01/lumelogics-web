import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchVideoBySlug, IS_PREVIEW_MODE } from "@/lib/api/videos";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { Player } from "./_components/Player";
import { BookCallCta } from "./_components/BookCallCta";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SLUG_RE = /^[A-Za-z0-9]{6,12}$/;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!SLUG_RE.test(slug)) return { title: "Video | Lumelogics", robots: { index: false } };

  try {
    const video = await fetchVideoBySlug(slug);
    if (!video || !video.mp4_url) {
      return { title: "Video | Lumelogics", robots: { index: false } };
    }
    const name = video.prospect.first_name;
    const title = name
      ? `A quick video for ${name} | Lumelogics`
      : "A quick video for you | Lumelogics";
    return {
      title,
      description: "A short walk-through I recorded for you.",
      robots: { index: false, follow: false },
      openGraph: {
        title,
        type: "video.other",
        images: video.gif_url ? [{ url: video.gif_url }] : undefined,
        videos: video.mp4_url ? [{ url: video.mp4_url, type: "video/mp4" }] : undefined,
      },
      twitter: {
        card: "player",
        title,
        images: video.gif_url ? [video.gif_url] : undefined,
      },
    };
  } catch {
    return { title: "Video | Lumelogics", robots: { index: false } };
  }
}

export default async function VideoPage({ params }: PageProps) {
  const { slug } = await params;
  if (!SLUG_RE.test(slug)) notFound();

  const video = await fetchVideoBySlug(slug);
  if (!video) notFound();

  // Preview mode (no backend) — show a friendly stub so the route still works.
  if (!video.mp4_url) {
    return (
      <PageShell>
        <PreviewStub slug={slug} />
      </PageShell>
    );
  }

  const firstName = video.prospect.first_name;
  const greeting = firstName ? `Hey ${firstName},` : "Hey there,";

  return (
    <PageShell>
      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-[15px] font-medium text-muted sm:text-[17px]">
            {greeting}
          </p>
          <h1 className="mt-2 text-center text-[28px] font-semibold leading-[1.1] tracking-tight text-foreground sm:text-[36px]">
            Here&apos;s a quick video I recorded for you
          </h1>

          <div className="mt-8">
            <Player mp4Url={video.mp4_url} poster={video.gif_url} />
          </div>

          {video.duration_seconds && (
            <p className="mt-4 text-center text-[12px] uppercase tracking-[0.15em] text-muted">
              {video.duration_seconds}-second walk-through
            </p>
          )}

          <section className="mt-16 rounded-2xl border border-border bg-surface p-8 text-center sm:p-10">
            <h2 className="text-balance text-[24px] font-semibold leading-[1.15] tracking-tight text-foreground sm:text-[28px]">
              {firstName ? `${firstName}, want to dig into it on a call?` : "Want to dig into it on a call?"}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
              Thirty minutes, no slides. We&apos;ll look at what I sketched in
              the video against your actual workflow and figure out whether
              there&apos;s a real opportunity to ship something useful, and
              what it would cost.
            </p>
            <div className="mt-6 flex justify-center">
              <BookCallCta />
            </div>
            <p className="mt-4 text-[13px] text-muted">
              Or just reply to my email. I read every one.
            </p>
          </section>

          <p className="mt-10 text-center text-[12px] text-muted">
            Built by{" "}
            <Link href="/" className="text-brand-700 underline-offset-4 hover:underline">
              Lumelogics
            </Link>
            . AI automation for operators who&apos;d rather ship than slideshow.
          </p>
        </div>
      </Container>
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <Logo />
          <span className="text-xs uppercase tracking-[0.18em] text-muted">
            A note from Lumelogics
          </span>
        </Container>
      </header>

      <div className="flex-1">{children}</div>

      <footer className="border-t border-border py-5 text-center text-[12px] text-muted">
        <Link href="/" className="hover:text-foreground">
          lumelogics.com
        </Link>
      </footer>
    </main>
  );
}

function PreviewStub({ slug }: { slug: string }) {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-xl rounded-xl border border-border bg-surface p-8 text-center">
        <h1 className="text-[22px] font-semibold text-foreground">Preview mode</h1>
        <p className="mt-2 text-[14px] text-muted">
          The Rails API isn&apos;t reachable, so we can&apos;t look up{" "}
          <code className="rounded bg-black/[0.05] px-1 py-0.5 text-[12px]">/v/{slug}</code>.
        </p>
        <p className="mt-3 text-[12px] text-muted">
          Set <code className="rounded bg-black/[0.05] px-1 py-0.5">NEXT_PUBLIC_ASSESSMENT_API_URL</code>{" "}
          in <code className="rounded bg-black/[0.05] px-1 py-0.5">.env.local</code> to hit the real backend.
          {!IS_PREVIEW_MODE && " (Or the slug doesn't match any ready video.)"}
        </p>
      </div>
    </Container>
  );
}
