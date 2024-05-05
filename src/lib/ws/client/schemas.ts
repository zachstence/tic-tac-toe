import { z } from 'zod';
import { ClientEventName } from './types';

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
