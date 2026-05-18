import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import type { PublicAudit } from "@/lib/api/audits";

// Sticky nav (logo + client name), optional deliverable crumb with a "Back
// to audit" link, and footer. Used by every /audit view. When `printable`
// the nav/footer carry data-print-hide and the page wraps in .print-doc so
// the comprehensive report prints clean (see globals.css @media print).
export function AuditShell({
  audit,
  crumb,
  printable = false,
  children,
}: {
  audit: PublicAudit;
  crumb?: string;
  printable?: boolean;
  children: React.ReactNode;
}) {
  const slug = audit.slug;
  return (
    <main
      className={`flex min-h-screen flex-col bg-background text-foreground ${
        printable ? "print-doc" : ""
      }`}
    >
      <header
        data-print-hide
        className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md"
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo />
            {crumb && (
              <>
                <span className="hidden text-border sm:inline">/</span>
                <Link
                  href={`/audit/${slug}`}
                  className="hidden text-[13px] text-muted hover:text-foreground sm:inline"
                >
                  Back to audit
                </Link>
              </>
            )}
          </div>
          <span className="truncate text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
            {crumb ? crumb : audit.client_name}
          </span>
        </Container>
      </header>

      <div className="flex-1">{children}</div>

      <footer
        data-print-hide
        className="border-t border-border py-6 text-center text-[12px] text-muted"
      >
        {audit.content.footer.note}
      </footer>
    </main>
  );
}
