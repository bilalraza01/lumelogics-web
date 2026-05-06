import {
  Compass,
  Code2,
  ListChecks,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

type Service = {
  Icon: LucideIcon;
  title: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    Icon: Compass,
    title: "AI Audit",
    description:
      "We map where AI moves the needle in your operations and produce a prioritized adoption roadmap.",
  },
  {
    Icon: Code2,
    title: "Custom Builds",
    description:
      "From agents to RAG systems, we ship production-grade AI tailored to your stack and workflows.",
  },
  {
    Icon: ListChecks,
    title: "Delivery & ROI",
    description:
      "We run the rollout, instrument the metrics that matter, and report on ROI from week one.",
  },
  {
    Icon: GraduationCap,
    title: "Enablement",
    description:
      "A 45-day program that turns your team into confident operators of the AI you put in place.",
  },
];

const PARTNERS = [
  { name: "Scaleforte", logo: "/clients/scaleforte.png" },
  { name: "MMG Consultancies", logo: "/clients/mmg.png" },
  { name: "Octa Accountants", logo: "/clients/octa.png" },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative bg-background pt-24 pb-16"
    >
      <Container>
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
            Services
          </p>
          <h2 className="mt-3 text-[34px] sm:text-[42px] leading-[1.1] font-semibold tracking-tight text-foreground">
            Your trusted partner for
            <br />
            AI transformation
          </h2>
        </div>

        <div className="mt-12 relative rounded-md border border-border bg-surface">
          {/* Diagonal stripes at the corners (decorative) */}
          <div className="pointer-events-none absolute -left-px top-0 bottom-0 w-3 diag-stripes" aria-hidden />
          <div className="pointer-events-none absolute -right-px top-0 bottom-0 w-3 diag-stripes" aria-hidden />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
            {SERVICES.map(({ Icon, title, description }) => (
              <div key={title} className="p-7">
                <Icon size={28} className="text-brand-600" strokeWidth={1.75} />
                <h3 className="mt-5 text-[15px] font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-border px-6 py-10">
            <p className="text-center text-sm text-muted">Recent partners</p>
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 items-center justify-items-center gap-8">
              {PARTNERS.map(({ name, logo }) => (
                <img
                  key={name}
                  src={logo}
                  alt={name}
                  className="h-12 w-auto max-w-[200px] object-contain opacity-70 transition-opacity hover:opacity-100"
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
