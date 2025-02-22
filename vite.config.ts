import react from "@vitejs/plugin-react-swc";
import path from "node:path";

import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
	preview: {
		port: 3031,
	},
	plugins: [react()],
	server: {
		host: true,
		strictPort: true,
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		outDir: "dist",
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						return "vendor";
					}
				},
			},
		},
		chunkSizeWarningLimit: 1000,
	},
});
