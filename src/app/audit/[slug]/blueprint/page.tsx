import type { Metadata } from "next";
import { AuditShell } from "../_components/AuditShell";
import { BlueprintView } from "../_components/BlueprintView";
import { loadAudit } from "../_components/loadAudit";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `AI blueprint | ${slug} audit | Lumelogics`,
    robots: { index: false, follow: false },
  };
}

export default async function BlueprintPage({ params }: PageProps) {
  const { audit } = await loadAudit(params);
  return (
    <AuditShell audit={audit} crumb="AI blueprint">
      <BlueprintView doc={audit.content} />
    </AuditShell>
  );
}
