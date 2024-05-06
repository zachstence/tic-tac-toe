import {
	ClientEventHandler,
	ClientEventHandlers,
	ClientEventName,
	ServerEventName
} from '$lib/events/types';
import { GameService } from './game-service';
import { SocketServer } from './socket-server';

export class GameServer {
	private readonly handlers: ClientEventHandlers;

	constructor(
		private readonly socketServer: SocketServer,
		private readonly gameService: GameService
	) {
		this.handlers = {
			[ClientEventName.Join]: this.handleJoin
		};

		this.socketServer.onEvent = (ws, event) => {
			const handler = this.handlers[event.eventName];
			handler(ws, event);
		};
	}

	handleJoin: ClientEventHandler<ClientEventName.Join> = async (
		socketId,
		{ gameId, name }
	): Promise<void> => {
		const game = await this.gameService.join(gameId, socketId, name);

		game.players.forEach((player) => {
			this.socketServer.send(player.socketId, {
				eventName: ServerEventName.GameUpdate,
				game
			});
		});
	};
}
