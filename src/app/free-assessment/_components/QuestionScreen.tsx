import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Question } from "@/lib/assessment/types";

interface Props {
  question: Question;
  /** Called with the chosen value. yes_no + single_select auto-advance.
   *  slider_1_5 waits for the user to hit Next. */
  onAnswer: (value: number) => void;
}

export function QuestionScreen({ question, onAnswer }: Props) {
  // Slider starts mid-scale, lets the user explicitly commit.
  const [sliderValue, setSliderValue] = useState(3);

  // Reset the slider whenever the question changes.
  useEffect(() => {
    setSliderValue(3);
  }, [question.id]);

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <h2 className="text-balance text-[24px] sm:text-[30px] font-semibold leading-[1.2] tracking-tight text-foreground">
        {question.prompt}
      </h2>

      {question.type === "single_select" && question.options && (
        <ul className="mt-8 grid gap-2.5">
          {question.options.map((opt) => (
            <li key={opt.label}>
              <button
                type="button"
                onClick={() => onAnswer(opt.value)}
                className="group flex w-full cursor-pointer items-center justify-between rounded-lg border border-border bg-surface px-5 py-4 text-left text-[15px] text-foreground transition-colors hover:border-brand-300 hover:bg-brand-50"
              >
                <span>{opt.label}</span>
                <span className="opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowRight size={16} className="text-brand-600" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {question.type === "yes_no" && question.options && (
        <div className="mt-8 grid grid-cols-2 gap-3">
          {question.options.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => onAnswer(opt.value)}
              className="cursor-pointer rounded-lg border border-border bg-surface px-5 py-6 text-center text-[18px] font-semibold text-foreground transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {question.type === "slider_1_5" && (
        <div className="mt-10">
          <div className="text-center text-[44px] font-semibold text-brand-600">
            {sliderValue}
          </div>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className={cn(
              "mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-border",
              "[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5",
              "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
              "[&::-webkit-slider-thumb]:bg-brand-500 [&::-webkit-slider-thumb]:shadow-md",
              "[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5",
              "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full",
              "[&::-moz-range-thumb]:bg-brand-500 [&::-moz-range-thumb]:border-0",
            )}
            aria-valuemin={1}
            aria-valuemax={5}
            aria-valuenow={sliderValue}
            aria-label={question.prompt}
          />
          <div className="mt-3 flex justify-between text-xs text-muted">
            <span>Very resistant</span>
            <span>Enthusiastic adopters</span>
          </div>
          <div className="mt-8 flex justify-center">
            <Button onClick={() => onAnswer(sliderValue)}>
              Next <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
