import { defineConfig } from "vitest/config";
import dsv from "@rollup/plugin-dsv";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: "./tsconfig.build.json",
    }),
    dsv(),
  ],
  build: {
    lib: {
      entry: "./src/index.tsx",
      formats: ["es", "cjs"],
    },
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      external: ["react"],
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
