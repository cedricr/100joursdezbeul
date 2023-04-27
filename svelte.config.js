import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

import departements from './src/lib/assets/departements.json?raw' assert {type: 'json'};

const codes = departements.map(elem => elem.code);
const badgeRoutes = codes.map(elem => `/departement/${elem}/badge`);
const routes = badgeRoutes.concat(["*"]);

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
			strict: true
	}),
	    prerender: {
			entries: routes
		}
	}
};

export default config;
