import { Readable, Writable, writable } from 'svelte/store';
import {
	type ServerEventHandlers,
	ServerEventName,
	ServerEventHandler,
	ClientEventName
} from '../events/types';
import { Game } from '$lib/schemas';
import { Socket } from './socket';

export class GameStore implements Readable<Game> {
	private readonly store: Writable<Game>;

	private readonly handlers: ServerEventHandlers;

	constructor(
		private readonly socket: Socket,
		game: Game
	) {
		this.store = writable(game);

		this.handlers = {
			[ServerEventName.GameUpdate]: this.handleGameUpdate
		};

		this.socket.onEvent = (event) => {
			const handler = this.handlers[event.eventName];
			handler(event);
		};
	}

	subscribe: Readable<Game>['subscribe'] = (run, invalidate) => {
		return this.store.subscribe(run, invalidate);
	};

	join = (gameId: string, name: string): void => {
		this.socket.send({
			eventName: ClientEventName.Join,
			gameId,
			name
		});
	};

	private handleGameUpdate: ServerEventHandler<ServerEventName.GameUpdate> = (event) => {
		this.store.set(event.game);
	};
}
