"use client";

interface GraficoMaturidadeProps {
  nivel?: "N1" | "N2" | "N3" | "N4" | "N5";
}

const maturidadeConfig = {
  N5: {
    porcentagem: 0,
    cor: "#EF4444",
    descricao: "Muito baixo",
  },
  N4: {
    porcentagem: 25,
    cor: "#F97316",
    descricao: "Baixo",
  },
  N3: {
    porcentagem: 50,
    cor: "#EAB308",
    descricao: "Intermediário",
  },
  N2: {
    porcentagem: 75,
    cor: "#84CC16",
    descricao: "Alto",
  },
  N1: {
    porcentagem: 100,
    cor: "#22C55E",
    descricao: "Excelente",
  },
};

export default function GraficoMaturidade({
  nivel = "N2",
}: GraficoMaturidadeProps) {
  const maturidade = maturidadeConfig[nivel];

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative flex h-36 w-36 items-center justify-center rounded-full"
        style={{
          background: `conic-gradient(
            ${maturidade.cor} ${maturidade.porcentagem * 3.6}deg,
            #E5E7EB 0deg
          )`,
        }}
      >
        {/* Espaço interno do círculo */}
        <div className="absolute inset-[9px] flex flex-col items-center justify-center rounded-full bg-card">
          <span
            className="text-4xl font-bold"
            style={{ color: maturidade.cor }}
          >
            {nivel}
          </span>

          <span className="text-xs text-gray-500">
            {maturidade.porcentagem}%
          </span>
        </div>
      </div>

      <div className="text-center">
        <span
          className="text-sm font-semibold uppercase tracking-wider"
          style={{ color: maturidade.cor }}
        >
          Nivel de Maturidade
        </span>

        <p className="text-sm font-medium" style={{ color: maturidade.cor }}>
          {maturidade.descricao}
        </p>
      </div>
    </div>
  );
}
