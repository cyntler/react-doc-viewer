import { defineConfig } from "vitest/config";
import dsv from "@rollup/plugin-dsv";
import dts from "vite-plugin-dts";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: "./tsconfig.build.json",
    }),
    dsv(),
    nodePolyfills(),
  ],
  build: {
    lib: {
      entry: "./src/index.tsx",
      formats: ["es", "cjs"],
    },
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react-dom", "react-dom/client"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
