import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free resource | Lumelogics",
  description:
    "Drop your email and we'll send you the link to download the resource.",
  openGraph: {
    title: "Free resource | Lumelogics",
    description: "AI workflow automation playbooks for SMB operators.",
    type: "website",
  },
};

export default function FreeMagnetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
