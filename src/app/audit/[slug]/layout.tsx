import type { Metadata } from "next";

// Client audit deliverables are private to the client. Never index any
// /audit route (this covers the index and all sub-routes). Per-page titles
// are set by each page's generateMetadata.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
