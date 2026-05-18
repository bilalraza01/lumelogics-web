import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { fetchAuditBySlug } from "@/lib/api/audits";
import { AuditShell } from "./_components/AuditShell";
import { Hero } from "./_components/Hero";
import { AiMoment } from "./_components/AiMoment";
import { JourneyStepper } from "./_components/JourneyStepper";
import { SessionCards } from "./_components/SessionCards";
import { DeliverableCard } from "./_components/DeliverableCard";
import { DownloadsGrid } from "./_components/DownloadsGrid";
import { PrototypeBanner } from "./_components/PrototypeBanner";
import { SectionHead } from "./_components/ui";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!SLUG_RE.test(slug)) {
    return { title: "Audit | Lumelogics", robots: { index: false } };
  }
  try {
    const audit = await fetchAuditBySlug(slug);
    if (!audit) return { title: "Audit | Lumelogics", robots: { index: false } };
    return {
      title: `${audit.client_name} | Business Operations Audit | Lumelogics`,
      robots: { index: false, follow: false },
    };
  } catch {
    return { title: "Audit | Lumelogics", robots: { index: false } };
  }
}

export default async function AuditIndexPage({ params }: PageProps) {
  const { slug } = await params;
  if (!SLUG_RE.test(slug)) notFound();

  const audit = await fetchAuditBySlug(slug);
  if (!audit) notFound();

  const c = audit.content;

  return (
    <AuditShell audit={audit}>
      <Hero hero={c.hero} />
      <AiMoment data={c.ai_moment} />
      <JourneyStepper stages={c.journey.stages} />
      <SessionCards sessions={c.sessions} />

      <section className="border-b border-border py-16 sm:py-20">
        <Container>
          <SectionHead
            label="Your deliverables"
            heading="What we built for you"
            sub="Each deliverable below opens a full interactive document."
          />
          <div className="mt-10 space-y-4">
            {c.deliverables.map((d) => (
              <DeliverableCard key={d.key} d={d} slug={slug} />
            ))}
          </div>
        </Container>
      </section>

      <DownloadsGrid downloads={c.downloads} slug={slug} />
      <PrototypeBanner data={c.prototype} />
    </AuditShell>
  );
}
