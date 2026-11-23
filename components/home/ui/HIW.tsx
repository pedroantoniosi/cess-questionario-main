import Container from "@/components/ui/Container";
import {
  ChartNoAxesCombined,
  ClipboardList,
  ListChecks,
  UserPlus,
} from "lucide-react";
import Title from "./Title";

const hiwData = [
  {
    id: 0,
    text: "Cadastre-se na plataforma para começar a participar.",
    icon: UserPlus,
  },
  {
    id: 1,
    text: "Encontre questionários disponíveis e escolha aqueles que deseja responder.",
    icon: ClipboardList,
  },
  {
    id: 2,
    text: "Responda às perguntas e envie suas respostas pela plataforma.",
    icon: ListChecks,
  },
  {
    id: 3,
    text: "Acompanhe suas contribuições e ajude a gerar resultados para as pesquisas.",
    icon: ChartNoAxesCombined,
  },
];

export default function HIW() {
  return (
    <section>
      <Container className="flex flex-col">
        <div className="flex flex-col-reverse md:grid md:grid-cols-2 items-center gap-8">
          <img
            src="/assets/Questionario.webp"
            className="border-white/10 border md:border-4 rounded-2xl"
            alt=""
          />
          <div className="flex flex-col gap-8">
            <Title children="Como funciona?" />
            <div className="grid md:grid-cols-2 gap-4">
              {hiwData.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className=" flex flex-col gap-2 justify-center rounded-4xl"
                  >
                    <span>
                      <Icon size={40} strokeWidth={1.5} />
                    </span>
                    <p className="text-sm md:text-xl text-gray-300 font-semibold">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
