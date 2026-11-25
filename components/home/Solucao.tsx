import Container from "@/components/ui/Container";
import { Lightbulb } from "lucide-react";

export default function Solucao() {
  return (
    <section className="py-8 md:py-16 px-4">
      <Container className="p-8 flex flex-col md:flex-row items-center justify-around rounded-2xl bg-(--v1-green-dark) min-h-[35svh]">
        <div className="flex items-center gap-4">
          <Lightbulb
            width={50}
            height={50}
            className="text-(--v1-green) shrink-0"
          />
          <span className="w-0.5 h-12 bg-(--v1-green)"></span>
          <h2 className="font-bold text-3xl md:text-5xl text-white">Solução</h2>
        </div>
        <p className="text-center md:text-start text-white max-w-150">
          Ambiente colaborativo que organiza e consolida informações da cadeia
          de reciclagem de plataformas offshore no Brasil, conectando
          estaleiros, portos e recicladoras e estruturada para análises da
          Petrobras.
        </p>
      </Container>
    </section>
  );
}
