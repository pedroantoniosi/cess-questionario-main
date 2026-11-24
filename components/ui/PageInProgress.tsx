import Container from "@/components/ui/Container";
import { Construction } from "lucide-react";

export default function EmDesenvolvimento() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-(--cess-green-dark) px-6 py-20">
      {/* Elementos decorativos */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-(--cess-green) opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-(--cess-green) opacity-20 blur-3xl" />

      <Container className="relative flex flex-col items-center text-center">
        {/* Indicador */}
        <div className="mb-8 flex items-center gap-3 rounded-full border border-[#32CA89]/30 bg-[#32CA89]/10 px-5 py-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#32CA89]" />
          <span className="text-sm font-semibold tracking-wide text-[#32CA89]">
            EM DESENVOLVIMENTO
          </span>
        </div>

        {/* Ícone */}
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-[#32CA89]/20 bg-(--cess-green) text-white">
          <Construction size={44} strokeWidth={1.5} className="text-white" />
        </div>

        {/* Conteúdo */}
        <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
          Estamos preparando algo <span className="text-white">especial!</span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-300 sm:text-lg">
          Esta página ainda está em desenvolvimento. Nossa equipe está
          trabalhando para trazer novidades e apresentar este conteúdo em breve.
        </p>

        <div className="mt-10 flex items-center gap-3">
          <span className="h-[3px] w-10 bg-(--cess-green) " />
          <span className="text-sm font-medium tracking-wide text-[#CCFAE2]/60">
            CESS — CONHECIMENTO, INOVAÇÃO E CONEXÃO
          </span>
          <span className="h-[3px] w-10 bg-(--cess-green) " />
        </div>
      </Container>
    </section>
  );
}
