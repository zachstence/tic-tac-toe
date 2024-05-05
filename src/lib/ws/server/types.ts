import { z } from 'zod';
import { SchemaByServerEventName } from './schemas';

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

const BaseServerEventSchema = z.object({
	name: z.nativeEnum(ServerEventName)
});

export const getServerEventName = (o: unknown): ServerEventName => {
	const { name } = BaseServerEventSchema.parse(o);
	return name;
};

export const parseServerEvent = (o: unknown): AnyServerEvent => {
	const eventName = getServerEventName(o);
	const schema = SchemaByServerEventName[eventName];
	return schema.parse(o);
};
