import { BlocoPontuacao } from "./types";

interface RadarNiveisProps {
  blocos: BlocoPontuacao[];
  nivelMaximo: number;
  titulo: string;
}

const TAMANHO = 320;
const CENTRO = TAMANHO / 2;
const RAIO = 104;
const RAIO_ROTULO = RAIO + 26;

/** Ponto no eixo `indice` (de `total`), a `raio` do centro. Começa no topo. */
function ponto(indice: number, total: number, raio: number) {
  const angulo = (Math.PI * 2 * indice) / total - Math.PI / 2;
  return {
    x: CENTRO + raio * Math.cos(angulo),
    y: CENTRO + raio * Math.sin(angulo),
  };
}

const paraPontos = (pontos: { x: number; y: number }[]) =>
  pontos.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

/** Gráfico radar em SVG: um eixo por bloco, um anel por nível. */
export default function RadarNiveis({
  blocos,
  nivelMaximo,
  titulo,
}: RadarNiveisProps) {
  const total = blocos.length;

  if (total < 3) {
    return (
      <p className="py-10 text-center text-sm text-gray-400">
        Sem dados para o gráfico.
      </p>
    );
  }

  const escala = Math.max(nivelMaximo, 1);
  const aneis = Array.from({ length: escala }, (_, i) => i + 1);

  const valores = blocos.map((bloco, i) =>
    ponto(
      i,
      total,
      (Math.min(Math.max(bloco.valor, 0), escala) / escala) * RAIO,
    ),
  );

  return (
    <svg
      viewBox={`0 0 ${TAMANHO} ${TAMANHO}`}
      className="h-auto w-full max-w-[320px]"
      role="img"
      aria-label={titulo}
    >
      <title>{titulo}</title>

      {/* Anéis dos níveis */}
      {aneis.map((nivel) => (
        <polygon
          key={nivel}
          points={paraPontos(
            blocos.map((_, i) => ponto(i, total, (nivel / escala) * RAIO)),
          )}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity={0.14}
        />
      ))}

      {/* Eixos */}
      {blocos.map((bloco, i) => {
        const fim = ponto(i, total, RAIO);
        return (
          <line
            key={bloco.rotulo}
            x1={CENTRO}
            y1={CENTRO}
            x2={fim.x}
            y2={fim.y}
            stroke="#FFFFFF"
            strokeOpacity={0.1}
          />
        );
      })}

      {/* Área dos valores */}
      <polygon
        points={paraPontos(valores)}
        fill="var(--color-high)"
        fillOpacity={0.18}
        stroke="var(--color-high)"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {valores.map((p, i) => (
        <circle
          key={blocos[i].rotulo}
          cx={p.x}
          cy={p.y}
          r={4.5}
          fill="var(--color-high)"
          stroke="var(--color-card)"
          strokeWidth={2}
        />
      ))}

      {/* Rótulos dos blocos */}
      {blocos.map((bloco, i) => {
        const p = ponto(i, total, RAIO_ROTULO);
        const ancora =
          Math.abs(p.x - CENTRO) < 1 ? "middle" : p.x > CENTRO ? "start" : "end";

        return (
          <text
            key={bloco.rotulo}
            x={p.x}
            y={p.y}
            textAnchor={ancora}
            dominantBaseline="middle"
            fill="#CBD5E1"
            fontSize={11}
            fontWeight={700}
          >
            {bloco.rotulo}
          </text>
        );
      })}
    </svg>
  );
}
