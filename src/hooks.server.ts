import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';
import { useServer } from 'vite-sveltekit-node-ws';

import { RedisService, SocketServer } from '$lib/server';
import { GameService } from '$lib/server/game-service';

useServer(
	(server) => {
		const socketServer = new SocketServer(server as HttpServer | HttpsServer);
		const redisService = new RedisService();
		const gameService = new GameService(redisService);
	},
	(path) => path.startsWith('/ws')
);
