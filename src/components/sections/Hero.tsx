"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Gauge,
  Target,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type StatCardProps = {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  value: string;
  label: string;
  className?: string;
  delay?: number;
  /** Static rotation in degrees */
  rotate?: number;
  /** Optional scroll-driven y offset shared across cards */
  yOffset?: MotionValue<number>;
};

// Shared pulse timing so every card grows and shrinks together.
const PULSE_DURATION = 2.8;
const PULSE_START = 1.0;

function StatCard({
  Icon,
  value,
  label,
  className,
  delay = 0,
  rotate = 0,
  yOffset,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{
        opacity: 1,
        scale: [1, 1.05, 1],
      }}
      transition={{
        opacity: { duration: 0.6, delay, ease: "easeOut" },
        scale: {
          duration: PULSE_DURATION,
          delay: PULSE_START,
          repeat: Infinity,
          ease: "easeIn",
        },
      }}
      style={{ rotate, y: yOffset }}
      className={cn(
        "clip-tag pointer-events-auto inline-flex w-[230px] items-center gap-3 bg-surface px-4 py-3 [filter:drop-shadow(0_8px_18px_rgba(20,19,26,0.14))]",
        className,
      )}
    >
      <span className="shrink-0 text-brand-600">
        <Icon size={22} />
      </span>
      <div className="min-w-0 leading-tight">
        <div className="truncate text-[16px] text-foreground">{value}</div>
        <div className="truncate text-xs text-muted">{label}</div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  // Page scroll → uniform downward y offset on the floating pills.
  // Linear map first (0..600px scroll → 0..200px y), then a spring smooths it
  // so the pills lag slightly behind scroll and ease into position.
  const { scrollY } = useScroll();
  const pillYRaw = useTransform(scrollY, [0, 600], [0, 200]);
  const pillY = useSpring(pillYRaw, {
    stiffness: 80,
    damping: 25,
    mass: 0.6,
  });

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-36">
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,_rgba(124,58,237,0.10),_transparent_60%)]"
        aria-hidden
      />

      <Container className="relative">
        <div className="relative grid grid-cols-12 items-start gap-6">
          {/* Left floating stat cards */}
          <div className="col-span-3 hidden flex-col items-start gap-20 pt-10 lg:flex">
            <StatCard
              Icon={TrendingUp}
              value="5.2× ROI in 6 weeks"
              label="Operations leader"
              className="ml-2"
              delay={0.15}
              rotate={6}
              yOffset={pillY}
            />
            <StatCard
              Icon={Gauge}
              value="38% faster cycles"
              label="Back-office workflows"
              className="ml-2"
              delay={0.3}
              rotate={-6}
              yOffset={pillY}
            />
          </div>

          {/* Center column */}
          <div className="col-span-12 flex flex-col items-center text-center lg:col-span-6">
            <motion.a
              href="#case-studies"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted transition-colors hover:border-brand-300"
            >
              <span>How we cut $284k of annual ops cost with AI</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700 group-hover:bg-brand-100">
                Read case <ArrowUpRight size={11} />
              </span>
            </motion.a>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-7 text-balance text-[40px] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-[52px]"
            >
              AI Automation that
              <br />
              Delivers <span className="text-brand-600">Measurable</span>
              <br />
              Outcomes
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 max-w-md text-[15px] leading-relaxed text-muted"
            >
              We help operators automate the repetitive and amplify the
              strategic — from discovery and roadmap through to deployed,
              monitored AI workflows.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-8"
            >
              <ButtonLink href="#contact">
                Start your AI rollout <ArrowRight size={16} />
              </ButtonLink>
            </motion.div>
          </div>

          {/* Right floating stat cards */}
          <div className="col-span-3 hidden flex-col items-end gap-20 pt-10 lg:flex">
            <StatCard
              Icon={Sparkles}
              value="+62% throughput"
              label="Customer support team"
              className="mr-2"
              delay={0.2}
              rotate={-6}
              yOffset={pillY}
            />
            <StatCard
              Icon={Target}
              value="3.4× pipeline lift"
              label="Outbound automation"
              className="mr-2"
              delay={0.35}
              rotate={6}
              yOffset={pillY}
            />
          </div>
        </div>

      </Container>
    </section>
  );
}
