import { defineConfig } from "vite";

export default defineConfig({
    build: {
        outDir: "dist",
        lib: {
            entry: "src/index.js",
            fileName: "main.min",
            formats: ["es"],
        },
    },
    clearScreen: false,
    plugins: [],
});
