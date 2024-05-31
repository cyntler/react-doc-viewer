import { defineConfig } from "vitest/config";
import dsv from "@rollup/plugin-dsv";

export default defineConfig({
  plugins: [dsv()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
