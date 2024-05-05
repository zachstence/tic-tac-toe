import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';
import { useServer } from 'vite-sveltekit-node-ws';

import { SocketServer } from '$lib/server';

useServer(
	(server) => {
		new SocketServer(server as HttpServer | HttpsServer);
	},
	(path) => path.startsWith('/ws')
);
