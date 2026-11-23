/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["maplibre-gl"],
  /**
   * `vite build` never type-checked (that was always a separate
   * `npm run typecheck` step); `next build` does by default. Keeping that
   * original split — rather than having the production build newly block on
   * pre-existing type debt unrelated to this framework migration — so
   * `npm run typecheck` remains the place that surfaces it.
   */
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      { source: "/executor/round", destination: "/executor/rodada", permanent: false },
      { source: "/executor/questionnaires", destination: "/executor/questionarios", permanent: false },
      { source: "/executor/executions", destination: "/executor/execucoes", permanent: false },
      { source: "/executor/respondents", destination: "/executor/respondentes", permanent: false },
      { source: "/executor/participants", destination: "/executor/participantes", permanent: false },
      { source: "/executor/settings", destination: "/executor/configuracoes", permanent: false },
      { source: "/executor/history", destination: "/executor/historico", permanent: false },
      { source: "/executor/profile", destination: "/executor/perfil", permanent: false },

      { source: "/analista/participants", destination: "/analista/participantes", permanent: false },
      { source: "/analista/reports", destination: "/analista/relatorios", permanent: false },
      { source: "/analista/questionnaires", destination: "/analista/questionarios", permanent: false },
      { source: "/analista/indicators", destination: "/analista/indicadores", permanent: false },
      { source: "/analista/comparisons", destination: "/analista/comparacoes", permanent: false },
      { source: "/analista/profile", destination: "/analista/perfil", permanent: false },

      { source: "/respondente/profile", destination: "/respondente/perfil", permanent: false },
    ];
  },
};

module.exports = nextConfig;
