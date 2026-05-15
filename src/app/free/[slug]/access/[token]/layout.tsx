import type { Metadata } from "next";

// Per-user resource pages should not be indexed — the URL contains a
// personal token.
export const metadata: Metadata = {
  title: "Your resource | Lumelogics",
  robots: { index: false, follow: false },
};

export default function AccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
