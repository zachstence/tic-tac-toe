import { z } from 'zod';

export const Position = z.object({
	x: z.union([z.literal(0), z.literal(1), z.literal(2)]),
	y: z.union([z.literal(0), z.literal(1), z.literal(2)])
});

export type Position = z.infer<typeof Position>;
