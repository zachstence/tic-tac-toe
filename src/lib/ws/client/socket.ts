import { ServerEventName, parseServerEvent, type ServerEventHandlers } from '../server/types';
import { ClientEventName, type AnyClientEvent } from './types';

export class Socket {
	private readonly ws: WebSocket;

	private readonly handlers: ServerEventHandlers;

	constructor() {
		this.handlers = {
			[ServerEventName.Test]: () => {
				this.send({
					name: ClientEventName.Test2,
					otherField: 123
				});
			},
			[ServerEventName.Test2]: () => {}
		};

		this.ws = new WebSocket(`ws${window.origin.slice(4)}/ws`);

		this.ws.onmessage = (messageEvent): void => {
			console.log({ messageEvent });
			const event = parseServerEvent(JSON.parse(messageEvent.data));
			const handler = this.handlers[event.name];

			console.debug('[Socket] handling event', { event });

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			handler(event as any);
		};
	}

	send = (event: AnyClientEvent): void => {
		this.ws.send(JSON.stringify(event));
	};
}
