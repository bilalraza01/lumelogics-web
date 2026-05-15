import { motion } from "framer-motion";
import { DIMENSION_LABELS } from "@/lib/assessment/questions";
import type { Dimension } from "@/lib/assessment/types";

interface Props {
  /** 1-indexed current question number */
  current: number;
  total: number;
  /** Dimension of the current question, for the subtle inline hint */
  dimension: Dimension;
}

export function ProgressBar({ current, total, dimension }: Props) {
  const pct = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-medium text-muted">
          Question {current} of {total}
        </span>
        <span className="text-muted">
          {(Object.keys(DIMENSION_LABELS) as Dimension[]).map((d, i) => (
            <span key={d}>
              {i > 0 && <span className="mx-1.5 text-muted/40">·</span>}
              <span
                className={
                  d === dimension
                    ? "font-semibold text-brand-600"
                    : "text-muted/60"
                }
              >
                {DIMENSION_LABELS[d]}
              </span>
            </span>
          ))}
        </span>
      </div>
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border">
        <motion.div
          className="h-full rounded-full bg-brand-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 140, damping: 22, mass: 0.6 }}
        />
      </div>
    </div>
  );
}
