import { z } from 'zod';
import { ServerEventName } from './types';

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
