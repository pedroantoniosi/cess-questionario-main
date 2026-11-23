import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/tests/setupTests.ts"],
    css: true,
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/e2e/**",
      // Pre-existing scripts written against `node:test`, not Vitest, and a
      // dead Vite-era test importing a path removed by the Next.js migration.
      // Out of scope for this refactor; excluded rather than rewritten here.
      "tests/ProfileIdentityCard.test.mjs",
      "src/profiles/executor/pages/ExecutorDashboard/ExecutorDashboard.utils.test.ts",
      "src/profiles/analyst/utils/analystAnalytics.utils.test.ts",
    ],
  },
});
