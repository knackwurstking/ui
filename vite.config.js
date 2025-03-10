import { defineConfig } from "vite";

export default defineConfig({
    build: {
        //emptyOutDir: false,
        outDir: "dist/js",
        copyPublicDir: false,
        lib: {
            name: "ui",
            entry: "lib/index.ts",
            fileName: "ui.min",
            formats: ["umd", "es"],
        },
    },
    clearScreen: false,
    plugins: [],
});
