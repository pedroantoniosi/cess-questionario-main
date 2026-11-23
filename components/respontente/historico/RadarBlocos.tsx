interface SerieRadar {
  id: string;
  nome: string;
  cor: string;
  /** Um valor de 0 a 100 por eixo, na ordem dos eixos. */
  valores: number[];
}

interface RadarBlocosProps {
  eixos: string[];
  series: SerieRadar[];
  titulo: string;
}

const TAMANHO = 320;
const CENTRO = TAMANHO / 2;
const RAIO = 104;
const RAIO_ROTULO = RAIO + 24;
const ANEIS = [20, 40, 60, 80, 100];

function ponto(indice: number, total: number, raio: number) {
  const angulo = (Math.PI * 2 * indice) / total - Math.PI / 2;
  return {
    x: CENTRO + raio * Math.cos(angulo),
    y: CENTRO + raio * Math.sin(angulo),
  };
}

const paraPontos = (pontos: { x: number; y: number }[]) =>
  pontos.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

/** Radar em SVG com uma série por rodada, na escala de 0 a 100%. */
export default function RadarBlocos({ eixos, series, titulo }: RadarBlocosProps) {
  const total = eixos.length;

  if (total < 3 || series.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-gray-400">
        Sem dados para o gráfico.
      </p>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${TAMANHO} ${TAMANHO}`}
      className="h-auto w-full max-w-[320px]"
      role="img"
      aria-label={titulo}
    >
      <title>{titulo}</title>

      {ANEIS.map((anel) => (
        <polygon
          key={anel}
          points={paraPontos(
            eixos.map((_, i) => ponto(i, total, (anel / 100) * RAIO)),
          )}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity={0.14}
        />
      ))}

      {eixos.map((eixo, i) => {
        const fim = ponto(i, total, RAIO);
        return (
          <line
            key={eixo}
            x1={CENTRO}
            y1={CENTRO}
            x2={fim.x}
            y2={fim.y}
            stroke="#FFFFFF"
            strokeOpacity={0.1}
          />
        );
      })}

      {series.map((serie) => {
        const pontos = eixos.map((_, i) =>
          ponto(
            i,
            total,
            (Math.min(Math.max(serie.valores[i] ?? 0, 0), 100) / 100) * RAIO,
          ),
        );

        return (
          <g key={serie.id}>
            <polygon
              points={paraPontos(pontos)}
              fill={serie.cor}
              fillOpacity={0.16}
              stroke={serie.cor}
              strokeWidth={2}
              strokeLinejoin="round"
            />
            {pontos.map((p, i) => (
              <circle
                key={eixos[i]}
                cx={p.x}
                cy={p.y}
                r={4}
                fill={serie.cor}
                stroke="var(--color-card)"
                strokeWidth={2}
              />
            ))}
          </g>
        );
      })}

      {eixos.map((eixo, i) => {
        const p = ponto(i, total, RAIO_ROTULO);
        const ancora =
          Math.abs(p.x - CENTRO) < 1 ? "middle" : p.x > CENTRO ? "start" : "end";

        return (
          <text
            key={eixo}
            x={p.x}
            y={p.y}
            textAnchor={ancora}
            dominantBaseline="middle"
            fill="#CBD5E1"
            fontSize={11}
            fontWeight={700}
          >
            {eixo}
          </text>
        );
      })}
    </svg>
  );
}
