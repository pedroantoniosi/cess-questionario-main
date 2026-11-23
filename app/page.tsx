import FAQ from "@/components/home/FAQ";
import Hero from "@/components/home/Hero";
import Parceiros from "@/components/home/Parceiros";
import Sobre from "@/components/home/Sobre";
import Solucao from "@/components/home/Solucao";
import HIW from "@/components/home/ui/HIW";

export default function Home() {
  return (
    <div className="min-h-svh flex flex-col gap-16 text-black bg-white">
      <Hero />
      <HIW />
      <Sobre />
      <Solucao />
      <FAQ />
      <Parceiros />
    </div>
  );
}
