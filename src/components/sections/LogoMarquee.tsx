import { Container } from "@/components/ui/Container";

// The platforms Lumelogics builds on. Rendered as styled wordmarks (text)
// rather than logo assets — keeps the implementation light and side-steps
// licensed brand-asset usage.
const STACK = [
  { name: "OpenAI", style: "font-semibold tracking-tight" },
  { name: "Anthropic", style: "font-medium tracking-tight" },
  { name: "Google AI", style: "font-normal tracking-tight" },
  { name: "LangChain", style: "font-bold" },
  { name: "Pinecone", style: "font-medium" },
  { name: "Vercel", style: "font-bold tracking-tight" },
  { name: "Next.js", style: "font-bold tracking-tight" },
  { name: "n8n", style: "font-extrabold tracking-tight" },
  { name: "Supabase", style: "font-semibold" },
  { name: "LangSmith", style: "font-semibold" },
  { name: "OpenClaw", style: "font-semibold" },
  { name: "Nano Banana", style: "font-semibold" },
  { name: "Cowork", style: "font-bold tracking-tight" },
  { name: "Zapier", style: "font-medium" },
  { name: "make", style: "font-semibold" },
];

function LogoItem({ name, style }: { name: string; style: string }) {
  return (
    <span
      className={`whitespace-nowrap text-xl text-foreground/40 hover:text-foreground/70 transition-colors ${style}`}
    >
      {name}
    </span>
  );
}

export function LogoMarquee() {
  // Duplicate for seamless loop
  const items = [...STACK, ...STACK];
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-background py-8">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
        aria-hidden
      />
      <Container className="!max-w-none !px-0">
        <div className="flex w-max animate-marquee items-center gap-14 px-7">
          {items.map((logo, i) => (
            <LogoItem key={`${logo.name}-${i}`} {...logo} />
          ))}
        </div>
      </Container>
    </section>
  );
}
