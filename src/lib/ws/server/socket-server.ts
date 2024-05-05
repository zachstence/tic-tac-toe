import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';
import { WebSocketServer, WebSocket } from 'ws';

import { ClientEventName, parseClientEvent, type ClientEventHandlers } from '../client/types';
import { ServerEventName, type AnyServerEvent } from './types';

export class SocketServer {
	private readonly wss: WebSocketServer;

	private readonly handlers: ClientEventHandlers;

	constructor(httpServer: HttpServer | HttpsServer) {
		this.handlers = {
			[ClientEventName.Test]: () => {},
			[ClientEventName.Test2]: () => {}
		};

		this.wss = new WebSocketServer({ server: httpServer, path: '/ws' });
		this.wss.on('connection', (ws) => {
			ws.on('message', (data) => {
				const event = parseClientEvent(JSON.parse(data.toString()));
				const handler = this.handlers[event.name];

				console.debug('[SocketServer] handling event', { event });

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				handler(event as any);
			});

			this.send(ws, {
				name: ServerEventName.Test,
				field: 'test'
			});
		});
	}

	send = (ws: WebSocket, event: AnyServerEvent): void => {
		ws.send(JSON.stringify(event));
	};
}
