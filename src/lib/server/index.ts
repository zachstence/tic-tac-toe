import { GameService } from './game-service';
import { RedisService } from './redis-service';

export const redisService = new RedisService();
export const gameService = new GameService(redisService);

export * from './socket-server';
