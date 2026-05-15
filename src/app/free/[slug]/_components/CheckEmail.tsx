import { motion } from "framer-motion";
import { Mail } from "lucide-react";

interface Props {
  email: string;
  onResetEmail: () => void;
}

export function CheckEmail({ email, onResetEmail }: Props) {
  return (
    <motion.div
      key="check-email"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="text-center"
    >
      <span className="grid mx-auto h-14 w-14 place-items-center rounded-full bg-brand-50 text-brand-600">
        <Mail size={24} strokeWidth={1.75} />
      </span>

      <h1 className="mt-6 text-balance text-[30px] sm:text-[36px] font-semibold leading-[1.1] tracking-tight text-foreground">
        Check your inbox
      </h1>

      <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-muted">
        We sent a link to{" "}
        <span className="font-semibold text-foreground">{email}</span>. Click
        it to open your resource page.
      </p>
      <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-muted">
        If it doesn&apos;t arrive in a minute or two, check spam.
      </p>

      <button
        type="button"
        onClick={onResetEmail}
        className="mt-8 cursor-pointer text-sm text-brand-600 underline-offset-4 hover:underline"
      >
        Did you mistype your email? Try again →
      </button>
    </motion.div>
  );
}
