import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import ws from 'vite-sveltekit-node-ws';

export default defineConfig({
	plugins: [sveltekit(), ws()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
