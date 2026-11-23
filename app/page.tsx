import Hero from "@/components/home/Hero";
import Maturidade from "@/components/home/Maturidade";
import Parceiros from "@/components/home/Parceiros";
import Perfis from "@/components/home/Perfis";
import Sobre from "@/components/home/Sobre";
import Solucao from "@/components/home/Solucao";
import HIW from "@/components/home/ui/HIW";

export default function Home() {
  return (
    <div className="min-h-svh flex flex-col gap-16 bg-rh text-white">
      <Hero />
      <HIW />
      <Maturidade />
      <Sobre />
      <Perfis />
      <Solucao />

      {/* <FAQ /> */}
      <Parceiros />
    </div>
  );
}
