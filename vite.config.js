import { defineConfig } from "vite";

export default defineConfig({
    plugins: [],
    clearScreen: false,
    build: {
        outDir: "dist",
        lib: {
            entry: "src/index.js",
            fileName: "main.min",
            formats: ["es", "cjs"],
        },
    },
});
