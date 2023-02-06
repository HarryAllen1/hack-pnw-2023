import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import fg from 'fast-glob';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		preact({
			devToolsEnabled: true,
			devtoolsInProd: true,
		}),
		{
			name: 'watch-external', // https://stackoverflow.com/questions/63373804/rollup-watch-include-directory/63548394#63548394
			async buildStart() {
				const files = await fg(['src/**/*', 'public/**/*']);
				for (let file of files) {
					this.addWatchFile(file);
				}
			},
		},
	],

	build: {
		sourcemap: true,
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				editor: resolve(__dirname, 'editor.html'),
			},
		},
	},
});
