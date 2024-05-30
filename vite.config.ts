import { defineConfig } from "vitest/config";
import dsv from "@rollup/plugin-dsv";

export default defineConfig({
  plugins: [dsv()],
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
