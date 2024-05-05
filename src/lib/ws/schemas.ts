import { z } from 'zod';
import {
	ClientEventName,
	ServerEventName,
	type AnyClientEvent,
	type AnyServerEvent
} from './types';

/*
	CLIENT
*/
type SchemaByClientEventName = {
	[E in ClientEventName]: z.ZodObject<{ name: z.ZodLiteral<E> }>;
};

export const SchemaByClientEventName = {
	[ClientEventName.Test]: z.object({
		name: z.literal(ClientEventName.Test),
		field: z.string()
	}),
	[ClientEventName.Test2]: z.object({
		name: z.literal(ClientEventName.Test2),
		otherField: z.number()
	})
} satisfies SchemaByClientEventName;

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

/*
	SERVER
*/
type SchemaByServerEventName = {
	[E in ServerEventName]: z.ZodObject<{ name: z.ZodLiteral<E> }>;
};

export const SchemaByServerEventName = {
	[ServerEventName.Test]: z.object({
		name: z.literal(ServerEventName.Test),
		field: z.string()
	}),
	[ServerEventName.Test2]: z.object({
		name: z.literal(ServerEventName.Test2),
		otherField: z.number()
	})
} satisfies SchemaByServerEventName;

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
