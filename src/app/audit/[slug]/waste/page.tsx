import type { Metadata } from "next";
import { AuditShell } from "../_components/AuditShell";
import { WasteView } from "../_components/WasteView";
import { loadAudit, sessionLabeller } from "../_components/loadAudit";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Hidden costs | ${slug} audit | Lumelogics`,
    robots: { index: false, follow: false },
  };
}

export default async function WastePage({ params }: PageProps) {
  const { audit } = await loadAudit(params);
  return (
    <AuditShell audit={audit} crumb="Hidden costs">
      <WasteView doc={audit.content} sessionLabel={sessionLabeller(audit)} />
    </AuditShell>
  );
}
