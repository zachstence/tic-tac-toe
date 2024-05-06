import { parseServerEvent } from '$lib/events/schemas';
import { AnyClientEvent, AnyServerEventHandler } from '$lib/events/types';

export class Socket {
	private readonly ws: WebSocket;

	private eventQueue: AnyClientEvent[] = [];

	onEvent?: AnyServerEventHandler;

	constructor() {
		this.ws = new WebSocket(`ws${window.origin.slice(4)}/ws`);

		this.ws.onopen = () => {
			this.eventQueue.forEach(this.send);
		};
		this.ws.onmessage = (messageEvent): void => {
			const event = parseServerEvent(JSON.parse(messageEvent.data));
			console.debug('[Socket] handling event', { event });
			this.onEvent?.(event);
		};
	}

	send = (event: AnyClientEvent): void => {
		if (this.ws.readyState === WebSocket.OPEN) {
			console.debug('[Socket] sending event', { event });
			this.ws.send(JSON.stringify(event));
		} else {
			this.eventQueue.push(event);
		}
	};
}
