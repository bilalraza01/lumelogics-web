import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  title: string;
  description?: string;
  onSubmit: (email: string) => Promise<void>;
  submitting: boolean;
  error?: string | null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailGate({
  title,
  description,
  onSubmit,
  submitting,
  error,
}: Props) {
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
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="text-center"
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
        Free resource
      </span>

      <h1 className="mt-6 text-balance text-[36px] sm:text-[48px] font-semibold leading-[1.05] tracking-tight text-foreground">
        {title}
      </h1>

      {description && (
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
          {description}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-10 flex max-w-md flex-col items-stretch gap-3"
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
          aria-invalid={showInlineError}
          className="h-12 w-full rounded-md border border-border bg-surface px-4 text-[15px] placeholder:text-muted/60 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/30 disabled:opacity-60"
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
              Sending…
            </>
          ) : (
            <>
              Email me the link <ArrowRight size={16} />
            </>
          )}
        </Button>
        {error && (
          <p className="text-left text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
      </form>

      <p className="mx-auto mt-6 max-w-md text-xs text-muted">
        No spam. We&apos;ll only use your email to send you the resource and the
        occasional Lumelogics update. Unsubscribe anytime.
      </p>
    </motion.div>
  );
}
