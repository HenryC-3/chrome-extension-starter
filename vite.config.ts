import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./src/manifest.config";
import zipPack from "vite-plugin-zip-pack";
import packageJson from "./package.json";
const { version, name } = packageJson;

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		crx({ manifest }),
		zipPack({ outDir: "./dist-zip", outFileName: `${name}-v${version}.zip` }),
	],
});
