import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/anime-schedule/",
	build: {
		outDir: "dist",
		assetsDir: "assets",
		rollupOptions: {
			input: {
				main: "index.html",
			},
			output: {
				entryFileNames: `assets/[name].[hash].js`,
				chunkFileNames: `assets/[name].[hash].js`,
				assetFileNames: `assets/[name].[hash].[ext]`,
				manualChunks: {
					react: ["react", "react-dom", "react-router-dom"],
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
					contexts: ["./src/contexts/ThemeContext.tsx"],
				},
			},
		},
	},
});
