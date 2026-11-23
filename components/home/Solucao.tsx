import Container from "@/components/ui/Container";
import { Lightbulb } from "lucide-react";

export default function Solucao() {
  return (
    <section className="relative isolate overflow-hidden bg-white sm:p-16">
      {/* Conteúdo */}
      <Container
        className="relative z-10 flex flex-col md:flex-row gap-6 items-center
       justify-between"
      >
        <div className="flex items-center gap-5 text-black">
          <Lightbulb
            width={50}
            height={50}
            className="text-[#2FBA61] shrink-0"
          />

          <h2 className="font-bold text-3xl md:text-5xl">Solução</h2>
        </div>

        <p className="text-center md:text-start text-black max-w-150">
          Uma metodologia que integra oito dimensões de avaliação e uma
          progressão de maturidade (N1 a N5), gerando indicadores consolidados e
          comparáveis por instalação e para o setor como um todo.
        </p>
      </Container>
    </section>
  );
}
