import path from 'node:path';
import { createRequire } from 'node:module';

import { defineConfig, normalizePath } from 'vite';
import dsv from "@rollup/plugin-dsv";
import dts from "vite-plugin-dts";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { viteStaticCopy } from 'vite-plugin-static-copy';

const require = createRequire(import.meta.url);

const pdfjsDistPath = path.dirname(require.resolve('pdfjs-dist/package.json'));
const cMapsDir = normalizePath(path.join(pdfjsDistPath, 'cmaps'));

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: "./tsconfig.build.json",
    }),
    dsv(),
    nodePolyfills(),
    viteStaticCopy({
      targets: [
        {
          src: cMapsDir,
          dest: '',
        },
      ],
    }),
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
