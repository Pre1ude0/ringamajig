import devtoolsJson from "vite-plugin-devtools-json";
import svgr from "vite-plugin-svgr";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [sveltekit(), devtoolsJson(), svgr()],
});
