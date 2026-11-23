import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  // O backend invalida a sessão anterior a cada novo login do mesmo usuário
  // ("entrar em outro dispositivo encerra a sessão anterior"), e os specs de
  // E2E reutilizam uma única conta de demonstração por perfil (seed). Logins
  // concorrentes de workers em paralelo derrubam a sessão uns dos outros, por
  // isso a suíte roda com um único worker.
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: "http://localhost:4000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:4000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
