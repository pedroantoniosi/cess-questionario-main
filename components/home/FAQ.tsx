import Container from "@/components/ui/Container";
import Accordion from "../ui/Accordion";

const accoddionData = [
  {
    id: 0,
    question: "Quem pode se cadastrar?",
    anwser: "Resposta",
  },
  {
    id: 1,
    question: "Que tipo de benefícios a plataforma oferece?",
    anwser: "Resposta",
  },
  {
    id: 2,
    question: "Qual valor de mercado a plataforma agrega?",
    anwser: "Resposta",
  },
  {
    id: 3,
    question: "Quanto custa para participar?",
    anwser: "Resposta",
  },
  {
    id: 4,
    question: "Quão seguro é registrar meus dados?",
    anwser: "Resposta",
  },
];

export default function FAQ() {
  return (
    <>
      <section className="bg-(--v1-green-dark) py-8 text-white">
        <Container className="flex flex-col gap-2 max-w-250">
          <div className="flex flex-col gap-2">
            <h2 className="text-center text-4xl font-semibold mb-4">
              Perguntas Frequentes
            </h2>
          </div>
          {accoddionData.map((item) => (
            <article
              key={item.id}
              className=" rounded-xl font-semibold bg-green-600/20"
            >
              <Accordion summary={item.question}>
                <span className="text-gray-200 font-normal">{item.anwser}</span>
              </Accordion>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
