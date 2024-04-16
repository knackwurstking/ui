import { defineConfig } from "vite";

export default defineConfig({
    plugins: [],
    clearScreen: false,
    build: {
        outDir: "dist/lib",
        lib: {
            entry: "src/index.js",
            fileName: "main",
            formats: ["cjs", "es"],
        },
    },
});
