import Container from "@/components/ui/Container";
import { Lightbulb } from "lucide-react";

export default function Solucao() {
  return (
    <section className="relative isolate overflow-hidden bg-white sm:p-16">
      {/* Conteúdo */}
      <Container className="relative z-10 flex flex-col md:flex-row gap-6 items-center justify-between pt-10 pb-24">
        <div className="flex items-center gap-5 text-black">
          <Lightbulb
            width={50}
            height={50}
            className="text-amber-400 shrink-0"
          />

          <div className="h-12 w-1 bg-amber-400" />

          <h2 className="font-bold text-3xl md:text-5xl">Solução</h2>
        </div>

        <p className="text-center md:text-start text-black max-w-150">
          Uma metodologia que integra oito dimensões de avaliação e uma
          progressão de maturidade (N1 a N5), gerando indicadores consolidados e
          comparáveis por instalação e para o setor como um todo.
        </p>
      </Container>

      {/* Onda responsiva */}
      <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 pointer-events-none">
        {/* Mobile */}
        <svg
          className="w-full h-full md:hidden"
          viewBox="0 0 768 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="
              M0 25
              C180 55 330 85 480 65
              C610 48 690 8 768 5
              L768 100
              L0 100
              Z
            "
            fill="#fbbf24"
          />

          <path
            d="
              M0 25
              C180 55 330 85 480 65
              C610 48 690 8 768 5
            "
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Desktop */}
        <svg
          className="hidden md:block w-full h-full"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="
              M0 28
              C240 65 420 88 680 70
              C940 52 1120 5 1440 8
              L1440 100
              L0 100
              Z
            "
            fill="#0B1120"
          />

          <path
            d="
              M0 28
              C240 65 420 88 680 70
              C940 52 1120 5 1440 8
            "
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </section>
  );
}
