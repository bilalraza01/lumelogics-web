import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Readiness Assessment for SMBs | Lumelogics",
  description:
    "A free 18-question assessment that tells you whether your business is ready for AI automation, or how far away you are.",
  openGraph: {
    title: "How ready is your business for AI?",
    description:
      "A free 4-minute assessment built for SMB owners. Get a personalized readiness score and a clear path forward.",
    type: "website",
  },
};

export default function FreeAssessmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
