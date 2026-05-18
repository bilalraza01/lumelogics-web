import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";

export default function AuditNotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border/60 bg-background/85 backdrop-blur-md">
        <Container className="flex h-16 items-center">
          <Logo />
        </Container>
      </header>
      <Container className="flex flex-1 items-center justify-center py-24">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-[28px] font-bold tracking-tight text-foreground">
            Audit not found
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            This audit link is not valid, or the audit is not available yet. If
            you were expecting to see something here, reply to the email we sent
            you and we will sort it out.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block text-[14px] font-medium text-brand-600 hover:underline"
          >
            Go to lumelogics.com
          </Link>
        </div>
      </Container>
    </main>
  );
}
