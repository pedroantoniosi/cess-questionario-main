import Title from "../home2/ui/Title";
import Container from "../ui/Container";
import { decisionFeatures } from "./data/content";

export function DecisionSection() {
  return (
    <section
      className="bg-(--cess-green-dark) flex w-full flex-col gap-4 border-white bg-[--cess-green] 
     text-white py-4 md:py-16 "
    >
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <Title variant="light">Inteligência para decisão</Title>
          <p className="max-w-120">
            Gera informações confiáveis e padronizadas, apoiando a Petrobras e
            os fornecedores da cadeia de reciclagem.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {decisionFeatures.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="flex  flex-col gap-4  rounded-2xl border-2 border-gray-200 p-4"
            >
              <div className="flex items-center gap-2">
                <Icon
                  className="shrink-0 text-(--v1-green)"
                  size={42}
                  strokeWidth={2.5}
                />
                <h3 className="max-w-52 text-xl font-bold leading-[1.05]">
                  {title}
                </h3>
              </div>
              <p className="max-w-65 text-[0.93rem] leading-[1.2] text-white/95">
                {description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
