import { defineConfig } from "vite";

export default defineConfig({
    plugins: [],
    clearScreen: false,
    build: {
        rollupOptions: {
            // overwrite default .html entry
            input: "src/index.js",
            output: [
                {
                    dir: "dist-lib",
                    entryFileNames: "lib.min.js",
                }
            ],
        },
    }
});
