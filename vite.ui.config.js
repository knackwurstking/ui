import { defineConfig } from "vite";

export default defineConfig({
    plugins: [],
    clearScreen: false,
    build: {
        outDir: "dist/ui",
        lib: {
            entry: "src/ui.js",
            fileName: "main",
            formats: ["cjs", "es"],
        },
    },
});
