import Card from "@/components/ui/CardProgress";

const versions = [
  {
    title: "Versão V1",
    description:
      "Primeira versão do CESS Questionário, com a estrutura inicial, funcionalidades essenciais e organização dos formulários.",
    authors: ["Pedro Ferreira"],
    date: "2026",
    progress: 50,
    href: "v1",
  },
  {
    title: "Versão V2",
    description:
      "Evolução da plataforma com melhorias na interface, experiência do usuário, organização dos dados e novas funcionalidades.",
    authors: ["Pedro Ferreira"],
    date: "2026",
    progress: 80,
    href: "/v2",
  },
  {
    title: "Versão V3",
    description:
      "Nova geração do CESS Questionário, com aprimoramentos estruturais, modernização visual e novas possibilidades de expansão.",
    authors: ["Pedro Ferreira", "João Gabriel", "Lorenzo Myrrha"],
    date: "2026",
    progress: 30,
    href: "/v3",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-(--cess-green-dark) px-6 py-16">
      <div className="w-full max-w-6xl">
        <header className="mb-14 flex flex-col items-center gap-4 text-center">
          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#5FDB8B]">
            CESS • Questionário
          </span>

          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Versões do CESS Questionário
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
            Explore as diferentes versões do projeto e acompanhe sua evolução,
            desenvolvimento e funcionalidades.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {versions.map((version) => (
            <Card key={version.title} {...version} />
          ))}
        </section>

        <footer className="mt-14 text-center text-xs text-white/50">
          CESS Questionário © 2026
        </footer>
      </div>
    </main>
  );
}
