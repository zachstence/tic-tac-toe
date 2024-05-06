import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';

import { GameService } from './game-service';
import { RedisService } from './redis-service';
import { SocketServer } from './socket-server';
import { GameServer } from './game-server';

const redisService = new RedisService();
export const gameService = new GameService(redisService);
export let gameServer: GameServer;

export const bootstrap = (httpServer: HttpServer | HttpsServer): void => {
	const socketServer = new SocketServer(httpServer);
	gameServer = new GameServer(socketServer, gameService);
};
