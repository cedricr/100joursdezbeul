import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
			strict: true,
			paths: {
				base: dev ? '' : process.env.BASE_PATH
			}
		})
	},
	onwarn(warning, defaultHandler) {
		if (warning.code === 'a11y-no-redundant-roles') {
			return;
		}

		defaultHandler(warning);
	}
};

export default config;
