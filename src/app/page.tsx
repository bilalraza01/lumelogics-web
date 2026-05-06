import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { Services } from "@/components/sections/Services";
import { Problem } from "@/components/sections/Problem";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <LogoMarquee />
        <Services />
        <Problem />
        <CaseStudies />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
