import { z } from 'zod';
import {
	ClientEventName,
	ServerEventName,
	type AnyClientEvent,
	type AnyServerEvent
} from './types';
import { GameSchema } from '$lib/schemas';

/*
	CLIENT
*/
type SchemaByClientEventName = {
	[E in ClientEventName]: z.ZodObject<{ eventName: z.ZodLiteral<E> }>;
};

export const SchemaByClientEventName = {
	[ClientEventName.Join]: z.object({
		eventName: z.literal(ClientEventName.Join),
		gameId: z.string(),
		name: z.string()
	})
} satisfies SchemaByClientEventName;

const BaseClientEventSchema = z.object({
	eventName: z.nativeEnum(ClientEventName)
});

export const getClientEventName = (o: unknown): ClientEventName => {
	const { eventName } = BaseClientEventSchema.parse(o);
	return eventName;
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
	[E in ServerEventName]: z.ZodObject<{ eventName: z.ZodLiteral<E> }>;
};

export const SchemaByServerEventName = {
	[ServerEventName.GameUpdate]: z.object({
		eventName: z.literal(ServerEventName.GameUpdate),
		game: GameSchema
	})
} satisfies SchemaByServerEventName;

const BaseServerEventSchema = z.object({
	eventName: z.nativeEnum(ServerEventName)
});

export const getServerEventName = (o: unknown): ServerEventName => {
	const { eventName } = BaseServerEventSchema.parse(o);
	return eventName;
};

export const parseServerEvent = (o: unknown): AnyServerEvent => {
	const eventName = getServerEventName(o);
	const schema = SchemaByServerEventName[eventName];
	return schema.parse(o);
};
