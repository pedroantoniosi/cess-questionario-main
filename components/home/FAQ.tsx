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
      <section>
        <Container className="flex flex-col gap-2">
          {accoddionData.map((item) => (
            <article key={item.id}>
              <Accordion summary={item.question}>{item.anwser}</Accordion>
            </article>
          ))}
        </Container>
      </section>
    </>
  );
}
