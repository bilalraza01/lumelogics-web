import type { Metadata } from "next";
import { AuditShell } from "../_components/AuditShell";
import { ProcessMapView } from "../_components/ProcessMapView";
import { loadAudit, sessionLabeller } from "../_components/loadAudit";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Process map | ${slug} audit | Lumelogics`,
    robots: { index: false, follow: false },
  };
}

export default async function ProcessMapPage({ params }: PageProps) {
  const { audit } = await loadAudit(params);
  return (
    <AuditShell audit={audit} crumb="Process map">
      <ProcessMapView
        pm={audit.content.process_map}
        sessionLabel={sessionLabeller(audit)}
      />
    </AuditShell>
  );
}
