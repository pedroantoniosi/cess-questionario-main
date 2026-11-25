import Benefits from "@/components/home/Benefits";
import FAQ from "@/components/home/FAQ";
import { HeroSection } from "@/components/home/HeroSection";
import { Participants } from "@/components/home/Participants";
import Partners from "@/components/home/Partners";
import Solucao from "@/components/home/Solucao";

export default function page() {
  return (
    <>
      <div className="bg-[#E9E9E9]">
        <HeroSection />
        <Partners />
        <Solucao />
        <Benefits />
        <Participants />

        <FAQ />
      </div>
    </>
  );
}
