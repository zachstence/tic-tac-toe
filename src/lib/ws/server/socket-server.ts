import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';
import { WebSocketServer, type RawData } from 'ws';

import {
	ClientEventName,
	type ClientEventHandler,
	type ClientEventHandlers
} from '../client/types';
import { ServerEventName, type ServerEvent } from './types';

export class SocketServer {
	private readonly wss: WebSocketServer;

	private readonly handlers: ClientEventHandlers;

	constructor(httpServer: HttpServer | HttpsServer) {
		this.handlers = {
			[ClientEventName.Test]: this.handleTestEvent
		};

		this.wss = new WebSocketServer({ server: httpServer, path: '/ws' });
		this.wss.on('connection', (ws) => {
			ws.on('message', this.handleEvent);
			ws.send(JSON.stringify({ name: ServerEventName.Test, data: {} }));
		});
	}

	broadcast = (event: ServerEvent<ServerEventName>): void => {
		this.wss.clients.forEach((client) => {
			client.send(JSON.stringify(event));
		});
	};

	private handleEvent = (event: RawData): void => {
		console.debug('[SocketServer] handleEvent', { event });
	};

	private handleTestEvent: ClientEventHandler<ClientEventName.Test> = (event): void => {};
}
