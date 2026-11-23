import { notFound } from "next/navigation";

import ResponderQuestionario from "@/components/respontente/questionario/responder";
import { mockResponderPorRodada } from "@/components/respontente/questionario/responder/responderData";
import Container from "@/components/ui/Container";

/**
 * Rodadas conhecidas em tempo de build. Enquanto os dados são mockados,
 * vêm do mock; com o backend, passam a vir da API.
 */
export async function generateStaticParams() {
  return Object.keys(mockResponderPorRodada).map((rodadaId) => ({ rodadaId }));
}

/** Todas as perguntas de uma rodada em um único grupo, paginado. */
export default async function RespondentePerguntasPage({
  params,
}: {
  params: Promise<{ rodadaId: string }>;
}) {
  const { rodadaId } = await params;

  if (!(rodadaId in mockResponderPorRodada)) notFound();

  return (
    <Container className="p-0">
      {/* key: zera o estado (página, edição) ao trocar de rodada */}
      <ResponderQuestionario key={rodadaId} rodadaId={rodadaId} />
    </Container>
  );
}

