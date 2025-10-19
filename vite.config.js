import { defineConfig } from "vite";

export default defineConfig({
	build: {
		emptyOutDir: true,
		outDir: "dist",
		copyPublicDir: false,
		lib: {
			name: "ui",
			entry: "lib/index.ts",
			fileName: "ui.min",
			formats: ["umd", "es"],
		},
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					if (assetInfo.name == "style.css")
						return "ui.min.css";
					return assetInfo.name;
				},
			},
		},
	},
	clearScreen: false,
	plugins: [],
});
