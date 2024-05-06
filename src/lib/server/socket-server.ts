import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';
import { WebSocketServer, WebSocket } from 'ws';
import { nanoid } from 'nanoid';

import { parseClientEvent } from '../events/schemas';
import { type AnyServerEvent, AnyClientEventHandler } from '../events/types';

export class SocketServer {
	private readonly wss: WebSocketServer;

	onEvent?: AnyClientEventHandler;

	private readonly sockets: Record<string, WebSocket> = {};

	constructor(httpServer: HttpServer | HttpsServer) {
		this.wss = new WebSocketServer({ server: httpServer, path: '/ws' });
		this.wss.on('connection', (ws) => {
			const socketId = nanoid();
			this.sockets[socketId] = ws;

			ws.on('message', (data) => {
				const event = parseClientEvent(JSON.parse(data.toString()));
				this.onEvent?.(socketId, event);
			});
		});
	}

	send = (socketId: string, event: AnyServerEvent): void => {
		const ws = this.sockets[socketId];
		ws?.send(JSON.stringify(event));
	};
}
