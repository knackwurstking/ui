import { defineConfig } from "vite";

export default defineConfig({
    plugins: [],
    clearScreen: false,
    build: {
        rollupOptions: {
            // overwrite default .html entry
            input: "src/ui.js",
            output: [
                {
                    dir: "dist-ui",
                    entryFileNames: "ui.min.js",
                }
            ],
        },
    }
});
