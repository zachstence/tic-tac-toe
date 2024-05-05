import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';
import { useServer } from 'vite-sveltekit-node-ws';

import { SocketServer, gameService } from '$lib/server';

useServer(
	(server) => {
		const socketServer = new SocketServer(server as HttpServer | HttpsServer, gameService);
	},
	(path) => path.startsWith('/ws')
);
