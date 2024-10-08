import { defineConfig } from "vite";

export default defineConfig({
    build: {
        outDir: "dist",
        copyPublicDir: false,
        lib: {
            entry: "lib/index.ts",
            fileName: "ui.min",
            formats: ["es"],
        },
    },
    clearScreen: false,
    plugins: [],
});
