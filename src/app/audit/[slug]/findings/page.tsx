import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AuditShell } from "../_components/AuditShell";
import { FindingsBoard } from "../_components/FindingsBoard";
import { loadAudit } from "../_components/loadAudit";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Findings | ${slug} audit | Lumelogics`,
    robots: { index: false, follow: false },
  };
}

export default async function FindingsPage({ params }: PageProps) {
  const { audit } = await loadAudit(params);
  const c = audit.content;
  const sessionLabels: Record<string, string> = {};
  for (const s of c.sessions) sessionLabels[s.id] = s.badge;

  return (
    <AuditShell audit={audit} crumb="Findings">
      <Container className="py-14 sm:py-16">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">
          Session summary
        </p>
        <h1 className="mt-3 text-[clamp(26px,4vw,40px)] font-extrabold tracking-tight text-foreground">
          What we discussed
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
          {c.findings.intro}
        </p>
        <div className="mt-10">
          <FindingsBoard
            categories={c.categories}
            painPoints={c.findings.pain_points}
            optimisations={c.findings.optimisations}
            sessionLabels={sessionLabels}
          />
        </div>
      </Container>
    </AuditShell>
  );
}
