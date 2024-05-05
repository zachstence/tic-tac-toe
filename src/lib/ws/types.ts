import { z } from 'zod';
import { SchemaByClientEventName, SchemaByServerEventName } from './schemas';

/*
	CLIENT
*/
export enum ClientEventName {
	Test = 'Test',
	Test2 = 'Test2'
}

export type ClientEventByClientEventName = {
	[Event in ClientEventName]: z.infer<(typeof SchemaByClientEventName)[Event]>;
};

export type AnyClientEvent = ClientEventByClientEventName[ClientEventName];
export type ClientEvent<EventName extends ClientEventName> =
	ClientEventByClientEventName[EventName];

export type ClientEventHandler<EventName extends ClientEventName> = (
	event: ClientEvent<EventName>
) => void;

export type ClientEventHandlers = {
	[EventName in ClientEventName]: ClientEventHandler<EventName>;
};

/*
	SERVER
*/
export enum ServerEventName {
	Test = 'Test',
	Test2 = 'Test2'
}

export type ServerEventByServerEventName = {
	[Event in ServerEventName]: z.infer<(typeof SchemaByServerEventName)[Event]>;
};

export type AnyServerEvent = ServerEventByServerEventName[ServerEventName];
export type ServerEvent<EventName extends ServerEventName> =
	ServerEventByServerEventName[EventName];

export type ServerEventHandler<EventName extends ServerEventName> = (
	event: ServerEvent<EventName>
) => void;

export type ServerEventHandlers = {
	[EventName in ServerEventName]: ServerEventHandler<EventName>;
};
