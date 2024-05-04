import { ClientEventName, type ClientEvent } from './types';

export class Socket {
	private readonly ws: WebSocket;

	private readonly handlers: Record<ClientEventName, () => void>;

	constructor() {
		this.handlers = {
			[ClientEventName.Test]: this.handleTestEvent
		};

		this.ws = new WebSocket(`ws${window.origin.slice(4)}/ws`);
		this.ws.onmessage = (message) => this.handleEvent(JSON.parse(message.data));
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	send = (event: ClientEvent<any>): void => {
		this.ws.send(event.data);
	};

	private handleEvent = (event: MessageEvent): void => {
		console.debug('[Socket] handleEvent', { event });
	};

	private handleTestEvent = (): void => {
		console.log('recieved test event');
	};
}
