import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  /** Called when the user submits a syntactically-valid email. Parent owns
   *  the actual API submission + error handling. */
  onSubmit: (email: string) => Promise<void>;
  submitting: boolean;
  /** Optional error from the parent's submit attempt. */
  error?: string | null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailGate({ onSubmit, submitting, error }: Props) {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const isValid = EMAIL_RE.test(email);
  const showInlineError = touched && email !== "" && !isValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;
    await onSubmit(email);
  };

  return (
    <motion.div
      key="email-gate"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="text-center"
    >
      <h2 className="text-balance text-[28px] sm:text-[34px] font-semibold leading-[1.15] tracking-tight text-foreground">
        You&apos;re done. Where should we send your results?
      </h2>
      <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-muted">
        We&apos;ll email you a permanent link to your results. No spam. You
        can unsubscribe anytime.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 flex max-w-md flex-col items-stretch gap-3"
      >
        <input
          type="email"
          autoComplete="email"
          autoFocus
          placeholder="you@yourcompany.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          disabled={submitting}
          className="h-12 w-full rounded-md border border-border bg-surface px-4 text-[15px] placeholder:text-muted/60 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/30 disabled:opacity-60"
          aria-invalid={showInlineError}
        />
        {showInlineError && (
          <p className="text-left text-xs text-red-600">
            Please enter a valid email address.
          </p>
        )}
        <Button type="submit" disabled={!isValid || submitting}>
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Scoring…
            </>
          ) : (
            <>
              See my score <ArrowRight size={16} />
            </>
          )}
        </Button>
        {error && (
          <p className="text-left text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
      </form>
    </motion.div>
  );
}
