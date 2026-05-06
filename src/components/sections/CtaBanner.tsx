import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export function CtaBanner() {
  return (
    <section id="contact" className="bg-background py-20">
      <Container>
        <div className="clip-tag-lg relative bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 px-8 py-12 sm:px-14 sm:py-16">
          {/* Watermark */}
          <div
            className="pointer-events-none absolute -right-6 bottom-0 select-none text-[150px] sm:text-[180px] font-extrabold leading-none tracking-tight text-white/[0.06]"
            aria-hidden
          >
            lume
          </div>
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.10),_transparent_55%)]"
            aria-hidden
          />

          <div className="relative max-w-xl">
            <h3 className="text-[30px] sm:text-[38px] font-semibold leading-[1.1] tracking-tight text-white">
              Start your transformation with our 28-Day AI Audit
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
              Four weeks to map your highest-ROI automation opportunities and
              produce a deployable roadmap your team can ship against.
            </p>
            <div className="mt-7">
              <ButtonLink href="#" variant="onBrand">
                Book an Intro <ArrowRight size={16} />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
