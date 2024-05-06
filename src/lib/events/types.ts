import { z } from 'zod';
import { SchemaByClientEventName, SchemaByServerEventName } from './schemas';

/*
	CLIENT
*/
export enum ClientEventName {
	Join = 'Join',
	Play = 'Play'
}

export type ClientEventByClientEventName = {
	[Event in ClientEventName]: z.infer<(typeof SchemaByClientEventName)[Event]>;
};

export type ClientEvent<EventName extends ClientEventName> =
	ClientEventByClientEventName[EventName];
export type AnyClientEvent = ClientEvent<ClientEventName>;

export type ClientEventHandler<EventName extends ClientEventName> = (
	socketId: string,
	event: ClientEvent<EventName>
) => void;
export type AnyClientEventHandler = ClientEventHandler<ClientEventName>;

export type ClientEventHandlers = {
	[EventName in ClientEventName]: ClientEventHandler<EventName>;
};

/*
	SERVER
*/
export enum ServerEventName {
	GameUpdate = 'GameUpdate'
}

export type ServerEventByServerEventName = {
	[Event in ServerEventName]: z.infer<(typeof SchemaByServerEventName)[Event]>;
};

export type ServerEvent<EventName extends ServerEventName> =
	ServerEventByServerEventName[EventName];
export type AnyServerEvent = ServerEvent<ServerEventName>;

export type ServerEventHandler<EventName extends ServerEventName> = (
	event: ServerEvent<EventName>
) => void;
export type AnyServerEventHandler = ServerEventHandler<ServerEventName>;

export type ServerEventHandlers = {
	[EventName in ServerEventName]: ServerEventHandler<EventName>;
};
