import Container from "@/components/ui/Container";
import Accordion from "../ui/Accordion";

const accoddionData = [
  {
    id: 0,
    question: "Aqui será inserido a pergunta",
    anwser: "Resposta",
  },
  {
    id: 1,
    question: "Aqui será inserido a pergunta",
    anwser: "Resposta",
  },
  {
    id: 2,
    question: "Aqui será inserido a pergunta",
    anwser: "Resposta",
  },
  {
    id: 3,
    question: "Aqui será inserido a pergunta",
    anwser: "Resposta",
  },
];

export default function FAQ() {
  return (
    <>
      <section className="bg-white text-black py-8">
        <Container className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 py-8">
            <h2 className="text-center text-4xl font-semibold text-black">
              Perguntas Frequentes
            </h2>
          </div>
          {accoddionData.map((item) => (
            <article
              key={item.id}
              className=" rounded-xl text-black font-semibold "
            >
              <Accordion summary={item.question}>
                <span className="text-gray-600 font-normal">{item.anwser}</span>
              </Accordion>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
