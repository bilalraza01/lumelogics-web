import { motion } from "framer-motion";
import { Clock, Sparkles, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  onStart: () => void;
}

const VALUE_PROPS = [
  {
    Icon: Sparkles,
    label: "Personal score",
    body: "0 to 100 across four readiness dimensions. No vague verdicts.",
  },
  {
    Icon: Clock,
    label: "4 minutes",
    body: "18 quick questions. One per screen. No fluff.",
  },
  {
    Icon: UserCheck,
    label: "Operator-built",
    body: "Written by people who deploy AI workflows, not marketers.",
  },
];

export function Intro({ onStart }: Props) {
  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="text-center"
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
        AI Readiness Assessment
      </span>
      <h1 className="mt-6 text-balance text-[36px] sm:text-[48px] font-semibold leading-[1.05] tracking-tight text-foreground">
        How ready is your business for AI?
        <br className="hidden sm:block" />
        <span className="text-brand-600"> Find out in 4 minutes.</span>
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
        18 questions across 4 dimensions. Honest answers get honest results.
        No spam, no upsell on bad-fit scores.
      </p>

      <ul className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
        {VALUE_PROPS.map(({ Icon, label, body }) => (
          <li
            key={label}
            className="rounded-lg border border-border bg-surface p-4 text-left"
          >
            <Icon size={18} className="text-brand-600" strokeWidth={1.75} />
            <div className="mt-3 text-sm font-semibold text-foreground">
              {label}
            </div>
            <div className="mt-1 text-[13px] leading-relaxed text-muted">
              {body}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Button onClick={onStart}>Start the assessment</Button>
      </div>
    </motion.div>
  );
}
