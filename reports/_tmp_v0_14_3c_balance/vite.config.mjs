import { defineConfig } from "vite";

export default defineConfig({
  logLevel: "silent",
  build: {
    ssr: "D:/Proyectos/⚽ Futbol11/reports/_tmp_v0_14_3c_balance/runner.ts",
    outDir: "D:/Proyectos/⚽ Futbol11/reports/_tmp_v0_14_3c_balance/bundle",
    emptyOutDir: false,
    target: "node20",
    minify: false,
    rollupOptions: {
      output: {
        entryFileNames: "runner.mjs",
        format: "esm",
      },
    },
  },
});
