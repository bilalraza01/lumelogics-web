import type { Metadata } from "next";
import { AuditShell } from "../_components/AuditShell";
import { ReportView } from "../_components/ReportView";
import { loadAudit } from "../_components/loadAudit";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Full report | ${slug} audit | Lumelogics`,
    robots: { index: false, follow: false },
  };
}

export default async function ComprehensiveReportPage({ params }: PageProps) {
  const { audit } = await loadAudit(params);
  return (
    <AuditShell audit={audit} crumb="Full report" printable>
      <ReportView doc={audit.content} />
    </AuditShell>
  );
}
