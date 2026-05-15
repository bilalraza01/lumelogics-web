import { Container } from "@/components/ui/Container";

const ROW_1 = [
  "How are the products budgeted?",
  "Which products are more suitable for which industries?",
  "What does the rollout timeline actually look like?",
  "Where do we even start with adoption?",
  "How do we measure ROI on AI?",
];

const ROW_2 = [
  "Is my company's IT ready for integration?",
  "Will my team actually adopt this?",
  "How do we keep customer data secure?",
  "What's the expected payback period?",
  "Will it scale across departments?",
];

const ROW_3 = [
  "How do we vet vendors and tools?",
  "What about hallucinations and accuracy?",
  "Should we build, buy, or partner?",
  "Who owns the model after deployment?",
  "How do we handle compliance and audit?",
];

function Pill({ text }: { text: string }) {
  return (
    <div className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-surface px-5 py-2.5 text-[14px] text-foreground shadow-[0_4px_20px_-12px_rgba(20,19,26,0.18)]">
      <span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-brand-100 text-[12px] font-extrabold leading-none text-brand-600">
        ?
      </span>
      <span>{text}</span>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  // Duplicate items so the marquee track loops seamlessly with translateX 0 → -50%.
  const all = [...items, ...items];
  return (
    <div className="fade-edges-x relative w-full overflow-hidden">
      <div
        className="flex w-max animate-marquee gap-3"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {all.map((text, i) => (
          <Pill key={i} text={text} />
        ))}
      </div>
    </div>
  );
}

export function Problem() {
  return (
    <section
      id="problem"
      className="relative overflow-hidden bg-background pt-20 pb-28"
    >
      <Container>
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
            The Problem
          </p>
          <h2 className="mt-3 text-[34px] sm:text-[44px] leading-[1.1] font-semibold tracking-tight text-foreground">
            Hidden barriers to AI success
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            Adopting AI surfaces a long tail of questions about ROI, security,
            and team readiness. We&apos;ve seen them all, and we have answers.
          </p>
        </div>
      </Container>

      {/* Marquee rows are constrained to a max width and fade out at the
          left/right edges (mask gradient) so they blend into the page rather
          than hard-stopping at the viewport edges. Middle row scrolls in the
          opposite direction. */}
      <div className="mx-auto mt-14 max-w-7xl space-y-4">
        <MarqueeRow items={ROW_1} />
        <MarqueeRow items={ROW_2} reverse />
        <MarqueeRow items={ROW_3} />
      </div>
    </section>
  );
}
