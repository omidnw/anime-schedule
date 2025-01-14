import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/anime-schedule/",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@services": path.resolve(__dirname, "./src/services"),
			"@contexts": path.resolve(__dirname, "./src/contexts"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
			"@types": path.resolve(__dirname, "./src/types"),
			"@utils": path.resolve(__dirname, "./src/utils"),
		},
	},
	build: {
		outDir: "dist",
		sourcemap: true,
		rollupOptions: {
			input: {
				main: "./index.html",
			},
			output: {
				manualChunks: {
					vendor: ["react", "react-dom", "react-router-dom"],
					components: [
						"./src/components/layout/Header.tsx",
						"./src/components/layout/Footer.tsx",
						"./src/components/ui/Dropdown.tsx",
						"./src/components/YearSearch.tsx",
					],
					pages: [
						"./src/pages/Home.tsx",
						"./src/pages/Schedule.tsx",
						"./src/pages/Settings.tsx",
						"./src/pages/AnimeDetails.tsx",
					],
					services: [
						"./src/services/jikanApi.ts",
						"./src/services/translateService.ts",
					],
					contexts: ["./src/contexts/ThemeContext.tsx"],
				},
				chunkFileNames: "assets/js/[name]-[hash].js",
				entryFileNames: "assets/js/[name]-[hash].js",
				assetFileNames: ({ name }) => {
					if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
						return "assets/images/[name]-[hash][extname]";
					}
					if (/\.css$/.test(name ?? "")) {
						return "assets/css/[name]-[hash][extname]";
					}
					return "assets/[ext]/[name]-[hash][extname]";
				},
			},
		},
		assetsInlineLimit: 4096,
		cssCodeSplit: true,
		minify: "terser",
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
	},
	optimizeDeps: {
		include: [
			"react",
			"react-dom",
			"react-router-dom",
			"@heroicons/react/24/solid",
		],
	},
	publicDir: "public",
});
