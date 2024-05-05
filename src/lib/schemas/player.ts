import { z } from 'zod';
import { Position } from './position';

export const PlayerSchema = z.object({
	id: z.string(),
	name: z.string(),
	positions: z.array(Position).max(3)
});
