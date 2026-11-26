import { Database, MapPin, TrendingUp } from "lucide-react";
import Container from "../ui/Container";

export const decisionFeatures = [
  {
    title: "Base estruturada de dados",
    description: "Informações consolidadas, comparáveis e rastreáveis.",
    icon: Database,
  },
  {
    title: "Visualização geográfica",
    description: "Mapeamento das capacidades no território nacional.",
    icon: MapPin,
  },
  {
    title: "Indicações de melhorias",
    description:
      "Recomendações práticas para evolução das capacidades da instalação.",
    icon: TrendingUp,
  },
];

export default function Benefits() {
  return (
    <section
      className="relative border-y-2 border-transparent bg-linear-to-r from-[#003F27] via-[#014720]
  to-[#003F27] px-4 py-12 sm:py-16
  before:absolute before:inset-x-0 before:top-0 before:h-0.5
  before:bg-[linear-gradient(to_right,transparent_30%,#fcd34d_50%,transparent_70%)]
  after:absolute after:inset-x-0 after:bottom-0 after:h-0.5
  after:bg-[linear-gradient(to_right,transparent_30%,#fcd34d_50%,transparent_70%)]"
    >
      {" "}
      <Container>
        <div className="flex flex-col gap-3 py-8">
          <h2 className="text-center text-3xl font-semibold text-white sm:text-4xl">
            Inteligência para decisão
          </h2>

          <p className="mx-auto max-w-120 text-center text-gray-200">
            Gera informações confiáveis e padronizadas, apoiando a Petrobras e
            os fornecedores da cadeia de reciclagem.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {decisionFeatures.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-(--v1-green)/40 hover:shadow-lg sm:p-6"
            >
              <div className="flex items-center gap-3">
                <Icon
                  className="shrink-0 text-(--v1-green)"
                  size={38}
                  strokeWidth={2}
                />

                <h3 className="text-lg font-bold leading-tight text-gray-900 sm:text-xl">
                  {title}
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-gray-600">
                {description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
