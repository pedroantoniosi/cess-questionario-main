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
            className="text-[#2FBA61] shrink-0"
          />

          <h2 className="font-bold text-3xl md:text-5xl text-white">Solução</h2>
        </div>

        <p className="text-center md:text-start text-white max-w-150">
          Uma metodologia que integra oito dimensões de avaliação e uma
          progressão de maturidade (N1 a N5), gerando indicadores consolidados e
          comparáveis por instalação e para o setor como um todo.
        </p>
      </Container>
    </section>
  );
}
