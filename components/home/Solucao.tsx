import Container from "@/components/ui/Container";
import { Info, Lightbulb } from "lucide-react";

export default function Solucao() {
  return (
    <section className="py-8 md:py-16 bg-[#003f27]">
      <Container className="flex flex-col md:flex-row md:justify-between gap-8 min-h-[35svh] md:items-center bg-(--v1-green-dark) rounded-4xl">
        <div className="flex justify-center items-center gap-4">
          <Lightbulb
            width={50}
            height={50}
            className="text-(--v1-green) shrink-0"
          />
          <span className="w-0.5 h-12 bg-(--v1-green)"></span>
          <h2 className="font-bold text-3xl md:text-5xl text-white">Solução</h2>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-center md:text-start text-white max-w-150">
            Ambiente colaborativo que organiza e consolida informações da cadeia
            de reciclagem de plataformas offshore no Brasil, conectando
            estaleiros, portos e recicladoras e estruturada para análises da
            Petrobras.
          </p>
          <p className="flex  gap-2 mt-auto text-(--v1-green) max-w-150 text-xs">
            <span>
              <Info />
            </span>{" "}
            Ao final da participação, cada instalação receberá, de forma
            confidencial, sua avaliação de maturidade, com indicações de
            melhorias.
          </p>
        </div>
      </Container>
    </section>
  );
}
