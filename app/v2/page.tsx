import { AboutPlatformSection } from "@/components/home2/AboutPlatformSection";
import { DecisionSection } from "@/components/home2/DecisionSection";
import { HeroSection } from "@/components/home2/HeroSection";
import { HowItWorksSection } from "@/components/home2/HowItWorksSection";
import { ParticipantsSection } from "@/components/home2/ParticipantsSection";
import Partners from "@/components/home2/Partners";

export default function v1() {
  return (
    <>
      <Partners />
      <HeroSection />
      <ParticipantsSection />
      <HowItWorksSection />
      <AboutPlatformSection />
      <DecisionSection />
      <Partners />
    </>
  );
}
