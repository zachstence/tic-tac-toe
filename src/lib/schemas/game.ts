import { z } from 'zod';
import { PlayerSchema } from './player';

export const GameSchema = z.object({
	players: z.record(z.string(), PlayerSchema)
});
