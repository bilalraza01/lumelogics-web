import type { Metadata } from "next";

// Per-user results pages should not be indexed.
export const metadata: Metadata = {
  title: "Your AI Readiness Results | Lumelogics",
  robots: { index: false, follow: false },
};

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
