import Container from "../ui/Container";

export default function Benefits() {
  return (
    <>
      <section>
        <Container>
          <div className="flex flex-col gap-2 py-8">
            <h2 className="text-center text-4xl font-semibold text-black">
              Inteligência para decisão
            </h2>
            <p className="max-w-120 text-center mx-auto text-gray-800">
              Gera informações confiáveis e padronizadas, apoiando a Petrobras e
              os fornecedores da cadeia de reciclagem.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
