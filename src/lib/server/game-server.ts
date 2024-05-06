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
			[ClientEventName.Join]: this.handleJoin,
			[ClientEventName.Play]: this.handlePlay
		};

		this.socketServer.onEvent = (ws, event) => {
			const handler = this.handlers[event.eventName];
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			handler(ws, event as any);
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

	handlePlay: ClientEventHandler<ClientEventName.Play> = async (
		socketId,
		{ gameId, position }
	): Promise<void> => {
		const game = await this.gameService.play(gameId, socketId, position);

		game.players.forEach((player) => {
			this.socketServer.send(player.socketId, {
				eventName: ServerEventName.GameUpdate,
				game
			});
		});
	};
}
