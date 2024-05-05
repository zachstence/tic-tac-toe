import { z } from 'zod';
import { SchemaByClientEventName } from './schemas';

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

const BaseClientEventSchema = z.object({
	name: z.nativeEnum(ClientEventName)
});

export const getClientEventName = (o: unknown): ClientEventName => {
	const { name } = BaseClientEventSchema.parse(o);
	return name;
};

export const parseClientEvent = (o: unknown): AnyClientEvent => {
	const eventName = getClientEventName(o);
	const schema = SchemaByClientEventName[eventName];
	return schema.parse(o);
};
