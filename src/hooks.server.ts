import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';
import { useServer } from 'vite-sveltekit-node-ws';

import { bootstrap } from '$lib/server';
import { Handle } from '@sveltejs/kit';
import { nanoid } from 'nanoid';

useServer(
	(server) => bootstrap(server as HttpServer | HttpsServer),
	(path) => path.startsWith('/ws')
);

export const handle: Handle = async ({ event, resolve }) => {
	let userId = event.cookies.get('userId');
	if (!userId) {
		userId = nanoid();
		event.cookies.set('userId', userId, { path: '/' });
	}

	event.locals.user = { id: userId };

	return resolve(event);
};
