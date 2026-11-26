import { Anchor, Recycle, Ship } from "lucide-react";
import Container from "../ui/Container";

export const participants = [
  {
    title: "Estaleiros",
    description:
      "Instalações com capacidade de desmantelamento de unidades offshore.",
    icon: Ship,
  },
  {
    title: "Portos",
    description:
      "Instalações portuárias que apoiam as atividades de recebimento, movimentação e destinação de materiais.",
    icon: Anchor,
  },
  {
    title: "Recicladoras",
    description:
      "Empresas que realizam o processamento, a segregação e a reciclagem dos materiais oriundos do descomissionamento.",
    icon: Recycle,
  },
];

export function Participants() {
  return (
    <section className="py-4 md:py-16 bg-[#003f27]">
      <Container className="flex flex-col gap-8 bg-(--v1-green-dark) md:p-8 md:rounded-4xl">
        <div className="flex flex-col gap-2 py-8">
          <h2 className="text-center text-4xl font-semibold text-white">
            Quem pode participar?
          </h2>
          <p className="max-w-120 text-center mx-auto text-gray-200">
            O cadastro na plataforma é exclusivo para instalações da cadeia de
            reciclagem de plataformas:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {participants.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="flex flex-col gap-4 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/15"
            >
              <span className="w-fit rounded-xl border border-white/15 bg-white/15 p-3 backdrop-blur-sm">
                <Icon className="h-8 w-8 text-white" />
              </span>

              <h3 className="font-bold text-white">{title}</h3>

              <p className="text-sm leading-relaxed text-white/75">
                {description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
